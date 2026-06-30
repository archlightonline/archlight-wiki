/**
 * Orphaned-upload detection for the manual cleanup script
 * (scripts/cleanup-orphan-uploads.mjs). Kept here as a typechecked, unit-tested
 * module because this is the SAFETY-CRITICAL part: a bug here deletes an in-use
 * image. The .mjs script wires these to the live DB + R2; the logic lives here so
 * the field list is covered by tests and a future field-list regression fails CI.
 *
 * An upload is an orphan iff its KEY is referenced in NO content field AND it is
 * older than the grace period. We match by the object key (uploads/<uuid>.<ext>),
 * NOT the public URL — the key is invariant, so this stays correct even if
 * R2_PUBLIC_BASE_URL later changes. Matching is a case-sensitive literal substring
 * (Postgres strpos), so there are no LIKE-wildcard pitfalls.
 */
import { lt, sql } from 'drizzle-orm';
import type { DB } from '../db';
import { pages, pageRevisions, contributions, users, socialLinks, uploads, type Upload } from '../db/schema';

/**
 * True if `key` appears (case-sensitive literal substring) in ANY field an
 * uploaded image URL could legitimately live in. Checked both when building the
 * candidate list and again immediately before deleting (the race guard).
 *
 * EVERY field that can reference an upload must be here — missing one means
 * deleting a live image. The list is deliberately exhaustive:
 *   - pages.content: ALL pages, incl. unpublished (unpublish is restorable),
 *   - page_revisions.content: ALL revisions (rollback can restore any),
 *   - contributions.proposed_content: ALL statuses incl. rejected (edit-&-resubmit
 *     reuses rejected content), plus both note fields,
 *   - users.avatar_url,
 *   - social_links.url + icon.
 */
export async function isReferenced(db: DB, key: string): Promise<boolean> {
  const found = (rows: unknown[]) => rows.length > 0;

  if (found(await db.select({ id: pages.id }).from(pages)
    .where(sql`strpos(${pages.content}, ${key}) > 0`).limit(1))) return true;

  if (found(await db.select({ id: pageRevisions.id }).from(pageRevisions)
    .where(sql`strpos(${pageRevisions.content}, ${key}) > 0`).limit(1))) return true;

  if (found(await db.select({ id: contributions.id }).from(contributions)
    .where(sql`strpos(${contributions.proposedContent}, ${key}) > 0
      OR strpos(coalesce(${contributions.contributorNote}, ''), ${key}) > 0
      OR strpos(coalesce(${contributions.reviewNote}, ''), ${key}) > 0`).limit(1))) return true;

  if (found(await db.select({ id: users.id }).from(users)
    .where(sql`strpos(coalesce(${users.avatarUrl}, ''), ${key}) > 0`).limit(1))) return true;

  if (found(await db.select({ id: socialLinks.id }).from(socialLinks)
    .where(sql`strpos(${socialLinks.url}, ${key}) > 0
      OR strpos(coalesce(${socialLinks.icon}, ''), ${key}) > 0`).limit(1))) return true;

  return false;
}

/**
 * Uploads older than the grace period that are referenced nowhere. `now` and
 * `graceMs` are injected so this is deterministically testable.
 */
export async function findOrphans(db: DB, opts: { now: number; graceMs: number }): Promise<Upload[]> {
  const cutoff = new Date(opts.now - opts.graceMs);
  const aged = await db.select().from(uploads).where(lt(uploads.createdAt, cutoff));
  const orphans: Upload[] = [];
  for (const u of aged) {
    if (!(await isReferenced(db, u.key))) orphans.push(u);
  }
  return orphans;
}

/**
 * Pure target guard (also used by the script): refuse anything that isn't a
 * postgres:// URL, so the script can never run against local PGlite. Returns the
 * resolved `host/dbname` target for the --confirm-db match.
 */
export function resolveExecuteTarget(env: { DATABASE_URL?: string }):
  | { ok: true; target: string }
  | { ok: false; reason: string } {
  const url = env.DATABASE_URL;
  if (!url) return { ok: false, reason: 'DATABASE_URL is not set. This script requires a remote Postgres target and refuses to run against local PGlite.' };
  let u: URL;
  try { u = new URL(url); } catch { return { ok: false, reason: 'DATABASE_URL is not a valid URL.' }; }
  if (!/^postgres(ql)?:$/i.test(u.protocol)) return { ok: false, reason: `DATABASE_URL must be a postgres:// URL (got "${u.protocol}").` };
  return { ok: true, target: `${u.host}${u.pathname}` };
}
