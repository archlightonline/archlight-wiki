/**
 * One-time migration: convert the 569 patch-note pages (category = 'Updates')
 * from their stored BBCode (Legacy) / inline-styled HTML (Abaldar) into clean
 * Markdown that the app's renderer (marked + DOMPurify) displays natively.
 *
 *   Dry run (default, touches nothing real — fresh in-memory PGlite):
 *     node scripts/convert-patchnotes-markdown.mjs
 *   Execute against the configured Postgres (requires explicit confirmation):
 *     node scripts/convert-patchnotes-markdown.mjs --execute --confirm-db=<host/dbname>
 *
 * ---------------------------------------------------------------------------
 * SAFETY MODEL (hardened after audit)
 *   • Zero side effects beyond the conversion. In --execute mode the script does
 *     NOT create schema and does NOT seed an admin. Revision attribution uses a
 *     READ-ONLY lookup of an existing admin/user id; if none exists it falls back
 *     to updatedBy: null (the column is nullable). The only writes are the
 *     patch-note conversions themselves.
 *   • Convert-inside-transaction. Each page is re-read, re-checked and re-converted
 *     INSIDE its own transaction, and the UPDATE is guarded with
 *     `WHERE id = ? AND content = <the exact content just read>`; if zero rows
 *     update (a concurrent edit happened), that page is rolled back and skipped.
 *     The page is never overwritten from a stale snapshot.
 *   • Hard validation gate. The run aborts before any write if conversion would
 *     leave residual markup, broken emphasis, empty output, OR lose any image or
 *     embed/oembed/iframe URL.
 *   • Hard wrong-target guards (--execute only), enforced BEFORE connecting:
 *       (a) DATABASE_URL must be set and postgres:// (refuses local PGlite),
 *       (b) --confirm-db=<host/dbname> must match the resolved target,
 *       (c) counts must match expectations (Updates===569 && planned===565)
 *           unless --allow-count-mismatch (or --expect-updates/--expect-modify).
 *
 * REVERSIBILITY — explicit revision insert: per page, inside the transaction, the
 *   ORIGINAL content is written to page_revisions ("Pre-conversion original …")
 *   before the page is updated, then the conversion is recorded as a second
 *   revision ("Automated BBCode/HTML → Markdown conversion"). Any page is
 *   restorable via the existing revision-history rollback.
 *
 * IDEMPOTENT: pages that already carry a conversion-marker revision, or whose
 *   conversion is a no-op (already clean Markdown), are skipped. Safe to re-run.
 * ---------------------------------------------------------------------------
 */
import { pathToFileURL } from 'node:url';
import { register } from 'tsx/esm/api';
register();

const { createDatabase } = await import('../server/db/index.ts');
const schema = await import('../server/db/schema.ts');
const { sanitizeContent } = await import('../server/lib/sanitize.ts');
const { uniqueSlug } = await import('../server/lib/slug.ts');
const ex = await import('./extract-content.mjs');
const { htmlToMarkdown } = ex;
const drizzle = await import('drizzle-orm');
const { eq, and } = drizzle;

const CONVERT_SUMMARY = 'Automated BBCode/HTML → Markdown conversion';
const ORIGINAL_SUMMARY = 'Pre-conversion original (BBCode/HTML) — restore this revision to revert';
const EDITED_BY = 'system (automated migration)';
const EXPECTED_UPDATES = 569;
const EXPECTED_MODIFY = 565;

const args = process.argv.slice(2);
const EXECUTE = args.includes('--execute');
const ALLOW_COUNT_MISMATCH = args.includes('--allow-count-mismatch');
const flagValue = (name) => {
  const pref = `--${name}=`;
  const a = args.find((x) => x.startsWith(pref));
  return a ? a.slice(pref.length) : null;
};
const CONFIRM_DB = flagValue('confirm-db');
const EXPECT_UPDATES = Number(flagValue('expect-updates') ?? EXPECTED_UPDATES);
const EXPECT_MODIFY = Number(flagValue('expect-modify') ?? EXPECTED_MODIFY);

// ===========================================================================
// Proven v3 converter
// ===========================================================================
const deamp = (u) => u.replace(/&amp;/g, '&');
const normalizeNewlines = (s) =>
  String(s).replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\r/g, '\n').replace(/\\t/g, '  ').replace(/\r\n?/g, '\n');

// Preserve oembed/iframe media by replacing the WHOLE element with a link, so
// the URL is never trapped inside a tag that tag-stripping later removes.
// Handles BOTH double- and single-quoted attributes.
export function preserveEmbeds(s) {
  let t = s;
  t = t.replace(/<figure[^>]*class\s*=\s*["'][^"']*media[^"']*["'][^>]*>[\s\S]*?<\/figure>/gi, (block) => {
    const m = block.match(/data-oembed-url\s*=\s*["']([^"']+)["']/i) || block.match(/<iframe[^>]*\bsrc\s*=\s*["']([^"']+)["']/i);
    return m ? `\n[Embedded video](${deamp(m[1])})\n` : '';
  });
  t = t.replace(/<div[^>]*data-oembed-url\s*=\s*["']([^"']+)["'][^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, (_, u) => `\n[Embedded video](${deamp(u)})\n`);
  t = t.replace(/<div[^>]*data-oembed-url\s*=\s*["']([^"']+)["'][^>]*>[\s\S]*?<\/div>/gi, (_, u) => `\n[Embedded video](${deamp(u)})\n`);
  // Any other element still carrying data-oembed-url (e.g. span) — keep the URL.
  t = t.replace(/data-oembed-url\s*=\s*["']([^"']+)["']/gi, (_, u) => `\n[Embedded video](${deamp(u)})\n`);
  t = t.replace(/<iframe\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>[\s\S]*?<\/iframe>/gi, (_, u) => `\n[Embedded media](${deamp(u)})\n`);
  t = t.replace(/<iframe\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*\/?>/gi, (_, u) => `\n[Embedded media](${deamp(u)})\n`);
  return t;
}

// Source-level emphasis fix: drop empty emphasis, separate adjacent SEPARATE
// runs so conversion can never emit ***, ****, or bare-asterisk lines, while
// legitimate nested ***bold-italic*** is preserved.
function fixEmphasisSourceBB(s) {
  let t = s;
  for (let i = 0; i < 3; i++) t = t.replace(/\[(b|i|u|s)\](?:\s|&nbsp;| )*\[\/\1\]/gi, '');
  t = t.replace(/(\[\/(?:b|i|u|s)\])(\[(?:b|i|u|s)\])/gi, '$1 $2');
  return t;
}
function fixEmphasisSourceHTML(s) {
  let t = s;
  for (let i = 0; i < 3; i++) t = t.replace(/<(strong|b|em|i|span)\b[^>]*>(?:\s|&nbsp;| )*<\/\1>/gi, '');
  t = t.replace(/(<\/(?:strong|b|em|i)>)(<(?:strong|b|em|i)\b[^>]*>)/gi, '$1 $2');
  return t;
}

function bbcodeToMarkdown(s) {
  let t = s;
  t = t.replace(/\[img[^\]]*\]\s*([\s\S]*?)\s*\[\/img\]/gi, (_, u) => `\n![](${u.trim()})\n`);
  t = t.replace(/\[img=([^\]]+)\]/gi, (_, u) => `\n![](${u.trim()})\n`);
  t = t.replace(/\[url=([^\]]+)\]([\s\S]*?)\[\/url\]/gi, (_, h, x) => `[${x.trim() || h.trim()}](${h.trim()})`);
  t = t.replace(/\[url\]([\s\S]*?)\[\/url\]/gi, (_, h) => `[${h.trim()}](${h.trim()})`);
  t = t.replace(/\[b\]([\s\S]*?)\[\/b\]/gi, (_, x) => (x.trim() ? `**${x.trim()}**` : ''));
  t = t.replace(/\[i\]([\s\S]*?)\[\/i\]/gi, (_, x) => (x.trim() ? `*${x.trim()}*` : ''));
  t = t.replace(/\[s\]([\s\S]*?)\[\/s\]/gi, (_, x) => (x.trim() ? `~~${x.trim()}~~` : ''));
  t = t.replace(/\[quote[^\]]*\]([\s\S]*?)\[\/quote\]/gi, (_, x) => `\n> ${x.trim().replace(/\n/g, '\n> ')}\n`);
  t = t.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, (_, x) => `\n\`\`\`\n${x.trim()}\n\`\`\`\n`);
  t = t.replace(/\[list[^\]]*\]([\s\S]*?)\[\/list\]/gi, (_, inner) => '\n' + inner.replace(/\s*\[\*\]\s*/g, '\n- ').replace(/^\n/, '') + '\n');
  t = t.replace(/\[\*\]/gi, '\n- ').replace(/\[\/\*\]/gi, '');     // stray list-item markers (open + close)
  t = t.replace(/\[hr\]/gi, '\n\n---\n\n');
  t = t.replace(/\[\/?(?:center|left|right|color|size|font|u|sub|sup|spoiler|quote|table|tr|td)[^\]]*\]/gi, '');
  t = t.replace(/\[\/?[a-z][a-z0-9]*(=[^\]]*)?\]/gi, '');          // strip any remaining BBCode markers
  return t;
}

const looksHtml = (s) => /<\/?[a-z!][a-z0-9]*(\s[^>]*)?>/i.test(s);
const looksBb = (s) => /\[\/?[a-z][a-z0-9]*(=[^\]]*)?\]/i.test(s);
const tidy = (md) => md.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').replace(/[ \t]{2,}/g, ' ').trim();

// Last-resort net: kill only real breakage; KEEP valid ***bold-italic***.
function emphasisNet(md) {
  let t = md;
  t = t.replace(/(^|\n)[ \t]*\*{1,2}[ \t]*(?=\n|$)/g, '$1');   // bare * / ** only lines
  t = t.replace(/\*\*[ \t ]*\*\*/g, ' ');                     // empty bold / ****
  t = t.replace(/(^|[\s])\*[ \t ]*\*(?=[\s]|$)/g, '$1 ');     // empty italic
  t = t.replace(/\*{4,}/g, ' ');                                   // 4+ asterisks = always broken
  return tidy(t);
}

function convertBody(body) {
  let t = normalizeNewlines(body);
  t = preserveEmbeds(t);
  if (looksBb(t)) { t = fixEmphasisSourceBB(t); t = bbcodeToMarkdown(t); }
  if (looksHtml(t)) { t = fixEmphasisSourceHTML(t); t = htmlToMarkdown(t); }
  else t = t.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  return emphasisNet(tidy(t));
}

// The migration prepends a clean "**Date:** … · **World:** … · **Type:** …"
// header (already Markdown). Keep it verbatim; convert only the body below it.
export function splitHeader(content) {
  const m = content.match(/^(\*\*Date:\*\*[^\n]*)\n*/);
  if (m) return { header: m[1], body: content.slice(m[0].length) };
  return { header: '', body: content };
}
export function convertFull(stored) {
  const { header, body } = splitHeader(stored);
  const out = convertBody(body);
  return header ? `${header}\n\n${out}`.trim() : out;
}

// ===========================================================================
// INDEPENDENT validator — explicit token lists, NOT the converter's regexes.
// The [*]/[/*] check is tightened to EXACT matches so it never false-positives
// on Markdown link labels like [*Click Here*](url).
// ===========================================================================
const VAL_BB = /\[\/?(?:b|i|u|s|size|color|center|left|right|font|list|img|url|quote|code|table|tr|td|sub|sup|spoiler|hr)\b[^\]]*\]|\[\/?\*\]/i;
const VAL_HTML = /<\/?(?:p|div|span|br|img|figure|strong|b|em|i|a|ul|ol|li|table|tr|td|th|h[1-6]|iframe|style|font|figcaption)\b[^>]*\/?>/i;
const VAL_BROKEN_EMPH = /\*{4,}/;
const VAL_BARE_LINE = /(^|\n)[ \t]*\*+[ \t]*(\n|$)/;
const VAL_EMPTY_EMPH = /\*\*[ \t ]*\*\*/;
export function validate(out) {
  return {
    bb: VAL_BB.test(out),
    html: VAL_HTML.test(out),
    broken: VAL_BROKEN_EMPH.test(out) || VAL_BARE_LINE.test(out) || VAL_EMPTY_EMPH.test(out),
  };
}
const hasSourceMarkup = (s) => VAL_BB.test(s) || VAL_HTML.test(s);

export const rawImgs = (s) => (s.match(/\[img\b/gi) || []).length + (s.match(/<img\b/gi) || []).length;
export const mdImgs = (s) => (s.match(/!\[[^\]]*\]\([^)]*\)/g) || []).length;
export const rawEmbeds = (s) => (s.match(/data-oembed-url|<iframe\b/gi) || []).length;
export const mdEmbedLinks = (s) => (s.match(/\[Embedded (?:video|media)\]\(/g) || []).length;

// ===========================================================================
// Gates (pure, exported so they can be unit-demonstrated)
// ===========================================================================
export function resolveExecuteTarget(env) {
  const url = env.DATABASE_URL;
  if (!url) return { ok: false, reason: 'DATABASE_URL is not set. --execute requires a remote Postgres target and refuses to run against local PGlite.' };
  let u;
  try { u = new URL(url); } catch { return { ok: false, reason: 'DATABASE_URL is not a valid URL.' }; }
  if (!/^postgres(ql)?:$/i.test(u.protocol)) return { ok: false, reason: `DATABASE_URL must be a postgres:// URL (got "${u.protocol}").` };
  return { ok: true, target: `${u.host}${u.pathname}` };
}

export function evaluateGate(report) {
  const reasons = [];
  if (report.resBB.length) reasons.push(`residual BBCode on ${report.resBB.length} page(s)`);
  if (report.resHTML.length) reasons.push(`residual HTML on ${report.resHTML.length} page(s)`);
  if (report.resBroken.length) reasons.push(`broken emphasis on ${report.resBroken.length} page(s)`);
  if (report.imgLoss.length) reasons.push(`image loss on ${report.imgLoss.length} page(s)`);
  if (report.embedLoss.length) reasons.push(`embed/oembed loss on ${report.embedLoss.length} page(s)`);
  if (report.needsReview.length) reasons.push(`empty/near-empty output on ${report.needsReview.length} page(s)`);
  return { clean: reasons.length === 0, reasons };
}

export function evaluateCountGate(updatesCount, planCount, { expectUpdates, expectModify, allow }) {
  if (allow) return { ok: true };
  if (updatesCount !== expectUpdates || planCount !== expectModify) {
    return {
      ok: false,
      reason: `count mismatch: Updates=${updatesCount} (expected ${expectUpdates}), planned=${planCount} (expected ${expectModify}). ` +
        `Re-run with --allow-count-mismatch to override, or set --expect-updates=/--expect-modify=.`,
    };
  }
  return { ok: true };
}

// ===========================================================================
// Read-only planning + reporting (NO writes).
// ===========================================================================
async function planAndReport(db) {
  const updates = (await db.select().from(schema.pages)).filter((r) => r.category === 'Updates');
  const plan = [];
  let alreadyConverted = 0, noop = 0;
  const report = { resBB: [], resHTML: [], resBroken: [], needsReview: [], imgIn: 0, imgOut: 0, embedIn: 0, embedOut: 0, imgLoss: [], embedLoss: [] };

  for (const page of updates) {
    const [marker] = await db
      .select({ id: schema.pageRevisions.id })
      .from(schema.pageRevisions)
      .where(and(eq(schema.pageRevisions.pageId, page.id), eq(schema.pageRevisions.summary, CONVERT_SUMMARY)))
      .limit(1);
    if (marker) { alreadyConverted++; continue; }
    const converted = sanitizeContent(convertFull(page.content));
    if (converted === page.content) { noop++; continue; }
    plan.push({ page, converted });

    const body = splitHeader(page.content).body;
    const v = validate(converted);
    if (v.bb) report.resBB.push(page.slug);
    if (v.html) report.resHTML.push(page.slug);
    if (v.broken) report.resBroken.push(page.slug);
    if (body.trim().length > 30 && convertFull(page.content).replace(/^\*\*Date:[^\n]*\n*/, '').trim().length < 10) {
      report.needsReview.push(`${page.slug} (body=${body.trim().length}ch -> near-empty)`);
    }
    const ri = rawImgs(body), mi = mdImgs(converted);
    report.imgIn += ri; report.imgOut += mi; if (mi < ri) report.imgLoss.push(`${page.slug} in=${ri} out=${mi}`);
    const re = rawEmbeds(body), me = mdEmbedLinks(converted);
    report.embedIn += re; report.embedOut += me; if (me < re) report.embedLoss.push(`${page.slug} in=${re} out=${me}`);
  }
  return { updates, plan, alreadyConverted, noop, report };
}

// ===========================================================================
// Writer — converts and writes INSIDE each per-page transaction (race-safe).
// ===========================================================================
async function writePages(db, plan, attributionId) {
  let modified = 0, skipped = 0, conflicts = 0;
  const anomalies = [];
  for (const { page } of plan) {
    try {
      const result = await db.transaction(async (tx) => {
        // Re-read the CURRENT row inside the transaction.
        const [cur] = await tx.select().from(schema.pages).where(eq(schema.pages.id, page.id)).limit(1);
        if (!cur || cur.category !== 'Updates') return 'skip';
        const [marker] = await tx
          .select({ id: schema.pageRevisions.id })
          .from(schema.pageRevisions)
          .where(and(eq(schema.pageRevisions.pageId, cur.id), eq(schema.pageRevisions.summary, CONVERT_SUMMARY)))
          .limit(1);
        if (marker) return 'skip';

        // Convert + validate the CURRENT content (never a stale snapshot).
        const converted = sanitizeContent(convertFull(cur.content));
        if (converted === cur.content) return 'skip';
        const body = splitHeader(cur.content).body;
        const v = validate(converted);
        if (v.bb || v.html || v.broken || mdImgs(converted) < rawImgs(body) || mdEmbedLinks(converted) < rawEmbeds(body)) {
          throw Object.assign(new Error('per-page validation failed'), { kind: 'validation', slug: cur.slug });
        }

        // 1. Snapshot ORIGINAL (current) content so the page is restorable.
        await tx.insert(schema.pageRevisions).values({ pageId: cur.id, content: cur.content, editedBy: EDITED_BY, summary: ORIGINAL_SUMMARY });
        // 2. Content-guarded update — abort the page if content changed concurrently.
        const updated = await tx.update(schema.pages)
          .set({ content: converted, updatedAt: new Date(), updatedBy: attributionId })
          .where(and(eq(schema.pages.id, cur.id), eq(schema.pages.content, cur.content)))
          .returning({ id: schema.pages.id });
        if (updated.length === 0) throw Object.assign(new Error('concurrent modification'), { kind: 'conflict', slug: cur.slug });
        // 3. Record the conversion revision (required summary).
        await tx.insert(schema.pageRevisions).values({ pageId: cur.id, content: converted, editedBy: EDITED_BY, summary: CONVERT_SUMMARY });
        return 'modified';
      });
      if (result === 'modified') modified++; else skipped++;
    } catch (e) {
      if (e.kind === 'conflict') { conflicts++; console.warn(`[convert] conflict — skipped & rolled back: ${e.slug} (content changed concurrently).`); }
      else if (e.kind === 'validation') { anomalies.push(e.slug); console.error(`[convert] per-page validation failed — rolled back: ${e.slug}`); }
      else throw e;
    }
  }
  return { modified, skipped, conflicts, anomalies };
}

// Read-only attribution lookup — never creates a user.
async function lookupAttributionId(db) {
  const [admin] = await db.select({ id: schema.users.id }).from(schema.users).where(eq(schema.users.role, 'admin')).limit(1);
  if (admin) return admin.id;
  const [any] = await db.select({ id: schema.users.id }).from(schema.users).limit(1);
  return any ? any.id : null;
}

function printReport(report) {
  console.log('\n=== POST-CONVERSION VALIDATION (independent checks) ===');
  console.log(`residual BBCODE tags : ${report.resBB.length}${report.resBB.length ? ' -> ' + report.resBB.join(', ') : ''}`);
  console.log(`residual HTML tags   : ${report.resHTML.length}${report.resHTML.length ? ' -> ' + report.resHTML.join(', ') : ''}`);
  console.log(`broken emphasis      : ${report.resBroken.length}${report.resBroken.length ? ' -> ' + report.resBroken.join(', ') : ''}`);
  console.log(`images               : rawRefs=${report.imgIn} mdImages=${report.imgOut} loss=${report.imgLoss.length} ${report.imgLoss.length ? '-> ' + report.imgLoss.join(', ') : '(0 loss)'}`);
  console.log(`embeds               : inSource=${report.embedIn} asLinks=${report.embedOut} loss=${report.embedLoss.length} ${report.embedLoss.length ? '-> ' + report.embedLoss.join(', ') : '(0 loss)'}`);
  console.log(`needs-manual-review  : ${report.needsReview.length}${report.needsReview.length ? '\n   - ' + report.needsReview.join('\n   - ') : ' (empty)'}`);
}

// ===========================================================================
// Entry point
// ===========================================================================
async function main() {
  let database;

  if (EXECUTE) {
    // --- Hard wrong-target guards, BEFORE connecting to anything. ---
    const tgt = resolveExecuteTarget(process.env);
    if (!tgt.ok) { console.error('[convert] ABORT —', tgt.reason); process.exit(1); }
    if (!CONFIRM_DB) {
      console.error(`[convert] ABORT — --execute requires --confirm-db=<host/dbname> matching the target. Resolved target: "${tgt.target}".`);
      process.exit(1);
    }
    if (CONFIRM_DB !== tgt.target) {
      console.error(`[convert] ABORT — --confirm-db="${CONFIRM_DB}" does not match resolved target "${tgt.target}". Refusing to run.`);
      process.exit(1);
    }
    console.log(`[convert] --execute confirmed for target: ${tgt.target}. Connecting (no schema/admin writes)…`);
    database = await createDatabase();
    if (database.kind !== 'postgres') {
      console.error('[convert] ABORT — connected database is not postgres; refusing to run --execute against local PGlite.');
      await database.close();
      process.exit(1);
    }
  } else {
    console.log('[convert] DRY-RUN (default). No real database will be touched.');
    console.log('[convert] Building a throwaway in-memory PGlite and seeding it from the migration pipeline…');
    database = await createDatabase({ memory: true });
    await database.ensureSchema(); // throwaway DB only — never production
    const conceptPages = [...ex.extractConceptPages(), ...ex.extractClassesPage(), ...ex.extractAddonsPage()];
    const seed = [...ex.extractAllPages(), ...conceptPages];
    const used = new Set();
    for (const p of seed) {
      const slug = uniqueSlug(p.slug, used); used.add(slug);
      await database.db.insert(schema.pages).values({
        slug, title: p.title.slice(0, 200), category: p.category || null,
        subcategory: p.subcategory || null, content: sanitizeContent(p.markdown || ''), isPublished: true,
      });
    }
  }

  const db = database.db;
  const attributionId = await lookupAttributionId(db); // READ-ONLY; never creates a user

  // --- Read-only plan + report. ---
  const { updates, plan, alreadyConverted, noop, report } = await planAndReport(db);

  const targetLabel = EXECUTE
    ? `${database.kind} -> ${resolveExecuteTarget(process.env).target}`
    : `${database.kind} -> in-memory (throwaway — no real DB touched)`;
  console.log('--------------------------------------------------------------');
  console.log(`[convert] mode            : ${EXECUTE ? 'EXECUTE (writing to real DB)' : 'DRY-RUN (throwaway in-memory DB)'}`);
  console.log(`[convert] database        : ${targetLabel}`);
  console.log(`[convert] attribution id  : ${attributionId === null ? 'null (no existing user found; column is nullable)' : attributionId}`);
  console.log(`[convert] Updates pages   : ${updates.length}`);
  console.log(`[convert] already-converted (skipped): ${alreadyConverted}`);
  console.log(`[convert] no-op / already-clean (skipped): ${noop}`);
  console.log(`[convert] WILL MODIFY     : ${plan.length} pages`);
  console.log('--------------------------------------------------------------');

  if (plan.length === 0) {
    console.log('[convert] Nothing to do — all Updates pages are already converted.');
    await database.close();
    return;
  }

  printReport(report);

  // --- Hard gates (enforced in --execute; reported in dry-run). ---
  const gate = evaluateGate(report);
  const countGate = evaluateCountGate(updates.length, plan.length, { expectUpdates: EXPECT_UPDATES, expectModify: EXPECT_MODIFY, allow: ALLOW_COUNT_MISMATCH });
  if (EXECUTE) {
    if (!countGate.ok) { console.error('[convert] ABORT —', countGate.reason); await database.close(); process.exit(1); }
    if (!gate.clean) { console.error('[convert] ABORT — validation gate failed:', gate.reasons.join('; ')); await database.close(); process.exit(1); }
  } else {
    console.log(`\n[convert] validation gate: ${gate.clean ? 'PASS' : 'WOULD ABORT -> ' + gate.reasons.join('; ')}`);
    console.log(`[convert] count gate     : ${countGate.ok ? 'PASS' : 'WOULD ABORT -> ' + countGate.reason}`);
  }

  // --- Writes (in dry-run these go to the throwaway in-memory DB). ---
  const { modified, skipped, conflicts, anomalies } = await writePages(db, plan, attributionId);
  console.log(`\n[convert] writes: modified=${modified} skipped=${skipped} conflicts=${conflicts}${anomalies.length ? ' anomalies=' + anomalies.join(',') : ''}`);

  // Reversibility self-check.
  if (modified > 0) {
    const sample = (await db.select().from(schema.pages)).filter((r) => r.category === 'Updates');
    let recoverable = 0, checked = 0;
    for (const page of sample) {
      const [orig] = await db
        .select({ content: schema.pageRevisions.content })
        .from(schema.pageRevisions)
        .where(and(eq(schema.pageRevisions.pageId, page.id), eq(schema.pageRevisions.summary, ORIGINAL_SUMMARY)))
        .limit(1);
      if (orig) { checked++; if (hasSourceMarkup(orig.content) || orig.content.startsWith('**Date:')) recoverable++; }
    }
    console.log(`Reversibility check  : ${recoverable}/${checked} modified pages have a restorable ORIGINAL revision.`);
  }

  // Idempotency proof (dry-run only): a second plan must be empty.
  if (!EXECUTE && modified > 0) {
    const second = await planAndReport(db);
    console.log(`Idempotency check    : second pass planned=${second.plan.length} (expected 0) -> ${second.plan.length === 0 ? 'PASS' : 'FAIL'}`);
  }

  console.log(`\n[convert] ${EXECUTE ? 'EXECUTED' : 'DRY-RUN complete'} — Updates=${updates.length}, modified=${modified}.`);
  if (!EXECUTE) console.log('[convert] To run for real later:  node scripts/convert-patchnotes-markdown.mjs --execute --confirm-db=<host/dbname>');
  await database.close();
}

// Only auto-run when invoked directly; stay importable for tests/demos.
const isDirect = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirect) {
  main().catch((err) => {
    console.error('[convert] FAILED:', err);
    process.exit(1);
  });
}
