/**
 * Manual, dry-run-first cleanup of ORPHANED R2 image uploads.
 *
 * Deletes R2 objects recorded in the `uploads` table that are referenced by NO
 * content anywhere AND are older than a grace period (default 30 days). This is
 * IRREVERSIBLE — a deleted R2 object is gone. The failure mode to prevent at all
 * costs is deleting an IN-USE image, so the detection is deliberately paranoid
 * (searches every field an upload URL could appear in, matches by the invariant
 * object KEY, and re-verifies each candidate immediately before deleting it).
 *
 *   Dry-run (default — lists candidates, writes/deletes NOTHING; read-only):
 *     node scripts/cleanup-orphan-uploads.mjs --confirm-db=<host/dbname>
 *   List-only (even more conservative — just the candidate list, no R2 needed):
 *     node scripts/cleanup-orphan-uploads.mjs --list-only --confirm-db=<host/dbname>
 *   Execute (ACTUALLY deletes R2 objects + their uploads rows):
 *     node scripts/cleanup-orphan-uploads.mjs --execute --confirm-db=<host/dbname>
 *   Tune the grace period (days):
 *     … --grace-days=30
 *
 * ---------------------------------------------------------------------------
 * SAFETY MODEL (mirrors scripts/convert-patchnotes-markdown.mjs)
 *   • Dry-run by DEFAULT. Only --execute deletes anything. Even dry-run connects
 *     to the live DB READ-ONLY (a Proxy makes every write method throw), so it is
 *     structurally impossible for a non-execute run to mutate the DB.
 *   • Hard wrong-target guards, enforced BEFORE connecting (both modes):
 *       (a) DATABASE_URL must be set and postgres:// (refuses local PGlite),
 *       (b) --confirm-db=<host/dbname> must match the resolved target.
 *   • Orphan = key referenced NOWHERE + older than the grace period. "Referenced"
 *     is checked across EVERY field an upload URL can appear in (see isReferenced):
 *       pages.content (ALL pages, incl. unpublished — unpublish is restorable),
 *       page_revisions.content (ALL revisions — rollback can restore any),
 *       contributions.proposed_content (ALL statuses, incl. rejected — the
 *         edit-&-resubmit feature reuses rejected content),
 *       contributions.contributor_note + review_note,
 *       users.avatar_url,
 *       social_links.url + icon.
 *   • Match by the object KEY (uploads/<uuid>.<ext>), NOT the public URL — robust
 *     to a future R2_PUBLIC_BASE_URL change (old content keeps the old base but
 *     the key is invariant). Case-sensitive literal substring (strpos), so no
 *     LIKE-wildcard pitfalls.
 *   • Re-verify before delete (RACE GUARD): in --execute, each candidate's
 *     references are re-checked immediately before its delete call, so an image
 *     embedded between the scan and the delete is NOT reaped.
 *   • Delete order: R2 object FIRST; the uploads row is removed only AFTER the R2
 *     delete succeeds (so the table never claims an object is gone while it isn't).
 *
 * R2 PERMISSIONS: deletion is a DIRECT server call (uploads use presigned PUT, but
 *   delete does not), so the R2 API token MUST have Object Read & Write. An
 *   upload-only/read-only token makes --execute fail with AccessDenied (403). The
 *   dry-run does NOT touch R2, so it needs no R2 permission at all.
 *
 * Do NOT run --execute against production until a human has reviewed the dry-run
 * candidate list.
 * ---------------------------------------------------------------------------
 */
import { pathToFileURL } from 'node:url';
import { register } from 'tsx/esm/api';
register();

const { createDatabase } = await import('../server/db/index.ts');
const schema = await import('../server/db/schema.ts');
const storage = await import('../server/lib/storage.ts');
const { isReferenced, findOrphans, resolveExecuteTarget } = await import('../server/lib/orphanUploads.ts');
const drizzle = await import('drizzle-orm');
const { eq } = drizzle;

const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_GRACE_DAYS = 30;

const args = process.argv.slice(2);
const EXECUTE = args.includes('--execute');
const LIST_ONLY = args.includes('--list-only');
const flagValue = (name) => {
  const pref = `--${name}=`;
  const a = args.find((x) => x.startsWith(pref));
  return a ? a.slice(pref.length) : null;
};
const CONFIRM_DB = flagValue('confirm-db');
const GRACE_DAYS = Number(flagValue('grace-days') ?? DEFAULT_GRACE_DAYS);

// ===========================================================================
// Read-only DB guard — wraps a drizzle db so any write method throws. Used in
// dry-run/list-only so it is structurally impossible to mutate the DB.
// ===========================================================================
const WRITE_METHODS = new Set(['insert', 'update', 'delete', 'transaction']);
export function readOnlyDb(db) {
  return new Proxy(db, {
    get(target, prop, receiver) {
      if (WRITE_METHODS.has(prop)) {
        return () => { throw new Error(`[cleanup] READ-ONLY GUARD: blocked write method "${String(prop)}" in dry-run mode.`); };
      }
      const v = Reflect.get(target, prop, receiver);
      return typeof v === 'function' ? v.bind(target) : v;
    },
  });
}

const ageDays = (createdAt, now) => Math.floor((now - new Date(createdAt).getTime()) / DAY_MS);

// ===========================================================================
// Entry point
// ===========================================================================
async function main() {
  if (EXECUTE && LIST_ONLY) {
    console.error('[cleanup] ABORT — --execute and --list-only are mutually exclusive.');
    process.exit(1);
  }
  if (!Number.isFinite(GRACE_DAYS) || GRACE_DAYS < 0) {
    console.error(`[cleanup] ABORT — --grace-days must be a non-negative number (got "${flagValue('grace-days')}").`);
    process.exit(1);
  }

  // --- Hard wrong-target guards, BEFORE connecting (both dry-run and execute). ---
  const tgt = resolveExecuteTarget(process.env);
  if (!tgt.ok) { console.error('[cleanup] ABORT —', tgt.reason); process.exit(1); }
  if (!CONFIRM_DB) {
    console.error(`[cleanup] ABORT — --confirm-db=<host/dbname> is required and must match the target. Resolved target: "${tgt.target}".`);
    process.exit(1);
  }
  if (CONFIRM_DB !== tgt.target) {
    console.error(`[cleanup] ABORT — --confirm-db="${CONFIRM_DB}" does not match resolved target "${tgt.target}". Refusing to run.`);
    process.exit(1);
  }

  const mode = EXECUTE ? 'EXECUTE (deletes R2 objects + uploads rows)' : LIST_ONLY ? 'LIST-ONLY (read-only)' : 'DRY-RUN (read-only)';
  console.log(`[cleanup] mode confirmed: ${mode} for target: ${tgt.target}. Connecting…`);
  const database = await createDatabase();
  if (database.kind !== 'postgres') {
    console.error('[cleanup] ABORT — connected database is not postgres; refusing to run against local PGlite.');
    await database.close();
    process.exit(1);
  }

  // Dry-run / list-only get a read-only proxy: any write throws.
  const db = EXECUTE ? database.db : readOnlyDb(database.db);
  const now = Date.now();
  const graceMs = GRACE_DAYS * DAY_MS;

  const totalUploads = (await db.select({ id: schema.uploads.id }).from(schema.uploads)).length;
  const orphans = await findOrphans(db, { now, graceMs });

  console.log('--------------------------------------------------------------');
  console.log(`[cleanup] database        : ${database.kind} -> ${tgt.target}`);
  console.log(`[cleanup] grace period    : ${GRACE_DAYS} days (only uploads older than this are eligible)`);
  console.log(`[cleanup] uploads (total) : ${totalUploads}`);
  console.log(`[cleanup] ORPHAN candidates: ${orphans.length}`);
  console.log('--------------------------------------------------------------');

  if (orphans.length === 0) {
    console.log('[cleanup] Nothing to do — no orphaned uploads older than the grace period.');
    await database.close();
    return;
  }

  for (const o of orphans) {
    console.log(
      `  - key=${o.key}  user=${o.userId}  age=${ageDays(o.createdAt, now)}d  size=${o.size}B  ` +
      `referenced=NONE (verified across pages, page_revisions, contributions (+notes), users.avatar_url, social_links.url/icon)`,
    );
  }

  if (!EXECUTE) {
    console.log(`\n[cleanup] ${LIST_ONLY ? 'LIST-ONLY' : 'DRY-RUN'} complete — READ-ONLY. ZERO deletes performed (no R2 objects, no uploads rows).`);
    console.log('[cleanup] NOTE: --execute deletes objects from R2 directly, which requires the R2 API token to have');
    console.log('[cleanup]       Object Read & Write permission. An upload-only token will fail --execute with 403.');
    console.log(`[cleanup] After reviewing the list above, delete for real with:  node scripts/cleanup-orphan-uploads.mjs --execute --confirm-db=${tgt.target}`);
    await database.close();
    return;
  }

  // --- EXECUTE: delete for real. ---
  if (!storage.isR2Configured()) {
    console.error('[cleanup] ABORT — R2 is not configured (missing R2_* env). Cannot delete objects.');
    await database.close();
    process.exit(1);
  }
  console.log('\n[cleanup] --execute: deleting orphaned R2 objects. R2 token must have Object Read & Write…');

  let deleted = 0, reracedSkipped = 0, failed = 0;
  for (const o of orphans) {
    // RACE GUARD: re-verify references RIGHT BEFORE deleting. If an image was
    // embedded since the scan, it is now referenced — skip it, never delete.
    if (await isReferenced(database.db, o.key)) {
      reracedSkipped++;
      console.warn(`[cleanup] SKIP (now referenced — embedded since scan): ${o.key}`);
      continue;
    }
    try {
      await storage.deleteObject(o.key); // R2 delete FIRST
      // Only after the R2 delete succeeds: remove the uploads row.
      await database.db.delete(schema.uploads).where(eq(schema.uploads.id, o.id));
      deleted++;
      console.log(`[cleanup] DELETED: ${o.key}`);
    } catch (err) {
      failed++;
      const msg = err instanceof Error ? err.message : String(err);
      const isAccess = /access ?denied|forbidden|\b403\b|not authorized/i.test(msg);
      console.error(`[cleanup] FAILED to delete ${o.key}: ${msg}`);
      if (isAccess) {
        console.error('[cleanup] This looks like a permissions error. The R2 API token needs Object Read & Write to delete objects.');
        console.error('[cleanup] Aborting the run so you can fix the token before retrying. No uploads row was removed for this object.');
        break;
      }
    }
  }

  console.log(`\n[cleanup] EXECUTED — deleted=${deleted} skipped-now-referenced=${reracedSkipped} failed=${failed}.`);
  await database.close();
  if (failed > 0) process.exit(1);
}

// Only auto-run when invoked directly; stay importable for tests.
const isDirect = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirect) {
  main().catch((err) => {
    console.error('[cleanup] FAILED:', err);
    process.exit(1);
  });
}
