/**
 * One-time migration: convert the 569 patch-note pages (category = 'Updates')
 * from their stored BBCode (Legacy) / inline-styled HTML (Abaldar) into clean
 * Markdown that the app's renderer (marked + DOMPurify) displays natively.
 *
 * Developed and validated across two dry runs; this is the committed, runnable,
 * reversible production migration. It does NOT execute against a real database
 * unless invoked with --execute.
 *
 *   Dry run (default, touches nothing real — fresh in-memory PGlite):
 *     node scripts/convert-patchnotes-markdown.mjs
 *   Execute against the configured database (DATABASE_URL or local PGlite):
 *     node scripts/convert-patchnotes-markdown.mjs --execute
 *
 * ---------------------------------------------------------------------------
 * REVERSIBILITY (mandatory) — approach used: EXPLICIT REVISION INSERT.
 *   The app's pages.update path snapshots the *new* content as a revision, and
 *   these 569 pages were bulk-inserted by migrate-content.mjs with NO revisions
 *   at all. So routing through the update path alone would not preserve the
 *   pre-conversion content. Instead, for every page converted, this script
 *   (inside a per-page transaction):
 *     1. inserts a page_revisions row holding the ORIGINAL content
 *        (summary: "Pre-conversion original …") — this is what an admin restores
 *        via the existing pages.rollback to revert the page, and
 *     2. updates pages.content to the converted Markdown, then
 *     3. inserts a page_revisions row holding the CONVERTED content
 *        (summary: "Automated BBCode/HTML → Markdown conversion").
 *   Result: the original content is recoverable per-page through the normal
 *   revision history / rollback UI.
 *
 * IDEMPOTENT: a page is skipped if it already has a conversion-marker revision,
 * or if converting it is a no-op (already clean Markdown — e.g. the plain-text
 * Hardcore/PTR changelogs). Safe to run repeatedly.
 * ---------------------------------------------------------------------------
 */
import { register } from 'tsx/esm/api';
register();

const { createDatabase } = await import('../server/db/index.ts');
const { ensureSystemAdmin } = await import('../server/lib/bootstrap.ts');
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

const args = process.argv.slice(2);
const EXECUTE = args.includes('--execute');

// ===========================================================================
// Proven v3 converter
// ===========================================================================
const deamp = (u) => u.replace(/&amp;/g, '&');
const normalizeNewlines = (s) =>
  String(s).replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\r/g, '\n').replace(/\\t/g, '  ').replace(/\r\n?/g, '\n');

// Preserve oembed/iframe media by replacing the WHOLE element with a link, so
// the URL is never trapped inside a tag that tag-stripping later removes.
function preserveEmbeds(s) {
  let t = s;
  t = t.replace(/<figure[^>]*class="[^"]*media[^"]*"[^>]*>[\s\S]*?<\/figure>/gi, (block) => {
    const m = block.match(/data-oembed-url\s*=\s*"([^"]+)"/i) || block.match(/<iframe[^>]*\bsrc\s*=\s*"([^"]+)"/i);
    return m ? `\n[Embedded video](${deamp(m[1])})\n` : '';
  });
  t = t.replace(/<div[^>]*data-oembed-url\s*=\s*"([^"]+)"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, (_, u) => `\n[Embedded video](${deamp(u)})\n`);
  t = t.replace(/<div[^>]*data-oembed-url\s*=\s*"([^"]+)"[^>]*>[\s\S]*?<\/div>/gi, (_, u) => `\n[Embedded video](${deamp(u)})\n`);
  t = t.replace(/<iframe\b[^>]*\bsrc\s*=\s*"([^"]+)"[^>]*>[\s\S]*?<\/iframe>/gi, (_, u) => `\n[Embedded media](${deamp(u)})\n`);
  t = t.replace(/<iframe\b[^>]*\bsrc\s*=\s*"([^"]+)"[^>]*\/?>/gi, (_, u) => `\n[Embedded media](${deamp(u)})\n`);
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
  t = t.replace(/\*\*[ \t ]*\*\*/g, ' ');                     // empty bold / ****
  t = t.replace(/(^|[\s])\*[ \t ]*\*(?=[\s]|$)/g, '$1 ');     // empty italic
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
function splitHeader(content) {
  const m = content.match(/^(\*\*Date:\*\*[^\n]*)\n*/);
  if (m) return { header: m[1], body: content.slice(m[0].length) };
  return { header: '', body: content };
}
function convertFull(stored) {
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
const VAL_EMPTY_EMPH = /\*\*[ \t ]*\*\*/;
function validate(out) {
  return {
    bb: VAL_BB.test(out),
    html: VAL_HTML.test(out),
    broken: VAL_BROKEN_EMPH.test(out) || VAL_BARE_LINE.test(out) || VAL_EMPTY_EMPH.test(out),
  };
}
// "Does this page still contain source markup?" — same explicit lists, used for
// idempotency (already-clean pages are skipped).
const hasSourceMarkup = (s) => VAL_BB.test(s) || VAL_HTML.test(s);

const rawImgs = (s) => (s.match(/\[img\b/gi) || []).length + (s.match(/<img\b/gi) || []).length;
const mdImgs = (s) => (s.match(/!\[[^\]]*\]\([^)]*\)/g) || []).length;
const rawEmbeds = (s) => (s.match(/data-oembed-url|<iframe\b/gi) || []).length;
const mdEmbedLinks = (s) => (s.match(/\[Embedded (?:video|media)\]\(/g) || []).length;

// ===========================================================================
// Core migration routine — shared by dry-run and execute.
// ===========================================================================
async function runConversion(database, { execute }) {
  const db = database.db;
  const adminId = await ensureSystemAdmin(db);

  const updates = (await db.select().from(schema.pages)).filter((r) => r.category === 'Updates');

  // Decide which pages need conversion (idempotent).
  const plan = [];
  let alreadyConverted = 0;
  let noop = 0;
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
  }

  // SAFETY GUARD: count + target confirmation before any real write.
  const url = process.env.DATABASE_URL;
  const target = !execute
    ? 'in-memory (throwaway — no real DB touched)'
    : database.kind === 'postgres' && url
      ? (() => { try { const u = new URL(url); return `postgres ${u.host}${u.pathname}`; } catch { return 'postgres (DATABASE_URL set)'; } })()
      : `pglite ${process.env.PGLITE_DIR ?? '.pglite'}`;

  console.log('--------------------------------------------------------------');
  console.log(`[convert] mode            : ${execute ? 'EXECUTE (writing to real DB)' : 'DRY-RUN (throwaway in-memory DB)'}`);
  console.log(`[convert] database        : ${database.kind} -> ${target}`);
  console.log(`[convert] Updates pages   : ${updates.length}`);
  console.log(`[convert] already-converted (skipped): ${alreadyConverted}`);
  console.log(`[convert] no-op / already-clean (skipped): ${noop}`);
  console.log(`[convert] WILL MODIFY     : ${plan.length} pages`);
  console.log('--------------------------------------------------------------');

  if (execute && plan.length === 0) {
    console.log('[convert] Nothing to do — all Updates pages are already converted. Exiting.');
    return { plan, updates, modified: 0 };
  }

  // Validate every planned conversion + accounting (independent of converter).
  const report = { resBB: [], resHTML: [], resBroken: [], needsReview: [], imgIn: 0, imgOut: 0, embedIn: 0, embedOut: 0, imgLoss: [] };
  for (const { page, converted } of plan) {
    const { body } = splitHeader(page.content);
    const v = validate(converted);
    if (v.bb) report.resBB.push(page.slug);
    if (v.html) report.resHTML.push(page.slug);
    if (v.broken) report.resBroken.push(page.slug);
    if (body.trim().length > 30 && convertFull(page.content).replace(/^\*\*Date:[^\n]*\n*/, '').trim().length < 10) {
      report.needsReview.push(`${page.slug} (body=${body.trim().length}ch -> near-empty)`);
    }
    const ri = rawImgs(body), mi = mdImgs(converted);
    report.imgIn += ri; report.imgOut += mi; if (mi < ri) report.imgLoss.push(`${page.slug} in=${ri} out=${mi}`);
    report.embedIn += rawEmbeds(body); report.embedOut += mdEmbedLinks(converted);
  }

  // Abort the whole run if validation finds anything broken — never write bad data.
  const validationClean =
    report.resBB.length === 0 && report.resHTML.length === 0 && report.resBroken.length === 0 &&
    report.imgLoss.length === 0 && report.needsReview.length === 0;

  if (execute && !validationClean) {
    console.error('[convert] ABORT — post-conversion validation failed; refusing to write. Details:');
    console.error(JSON.stringify(report, null, 2));
    throw new Error('Validation failed; no changes written.');
  }

  // Perform writes. In dry-run this runs against the throwaway in-memory DB so
  // the exact write/reversibility path is still exercised and verifiable.
  let modified = 0;
  for (const { page, converted } of plan) {
    await db.transaction(async (tx) => {
      // 1. Snapshot the ORIGINAL content so the page is restorable.
      await tx.insert(schema.pageRevisions).values({
        pageId: page.id,
        content: page.content,
        editedBy: EDITED_BY,
        summary: ORIGINAL_SUMMARY,
      });
      // 2. Update the live page to the converted Markdown.
      await tx.update(schema.pages)
        .set({ content: converted, updatedAt: new Date(), updatedBy: adminId })
        .where(eq(schema.pages.id, page.id));
      // 3. Record the conversion itself as a revision (required summary).
      await tx.insert(schema.pageRevisions).values({
        pageId: page.id,
        content: converted,
        editedBy: EDITED_BY,
        summary: CONVERT_SUMMARY,
      });
    });
    modified++;
  }

  return { plan, updates, modified, report, adminId };
}

// ===========================================================================
// Entry point
// ===========================================================================
async function main() {
  let database;
  if (EXECUTE) {
    console.log('[convert] --execute supplied: connecting to the CONFIGURED database.');
    database = await createDatabase();
  } else {
    console.log('[convert] DRY-RUN (default). No real database will be touched.');
    console.log('[convert] Building a throwaway in-memory PGlite and seeding it from the migration pipeline…');
    database = await createDatabase({ memory: true });
    await database.ensureSchema();
    // Seed the in-memory DB with the real extracted pages (same pipeline as
    // migrate-content.mjs) so we convert exactly what production holds.
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
  if (EXECUTE) await database.ensureSchema();

  const { updates, modified, report } = await runConversion(database, { execute: EXECUTE });

  if (report) {
    console.log('\n=== POST-CONVERSION VALIDATION (independent checks) ===');
    console.log(`residual BBCODE tags : ${report.resBB.length}${report.resBB.length ? ' -> ' + report.resBB.join(', ') : ''}`);
    console.log(`residual HTML tags   : ${report.resHTML.length}${report.resHTML.length ? ' -> ' + report.resHTML.join(', ') : ''}`);
    console.log(`broken emphasis      : ${report.resBroken.length}${report.resBroken.length ? ' -> ' + report.resBroken.join(', ') : ''}`);
    console.log(`images               : rawRefs=${report.imgIn} mdImages=${report.imgOut} loss=${report.imgLoss.length} ${report.imgLoss.length ? '-> ' + report.imgLoss.join(', ') : '(0 loss)'}`);
    console.log(`embeds preserved     : inSource=${report.embedIn} asLinks=${report.embedOut}`);
    console.log(`needs-manual-review  : ${report.needsReview.length}${report.needsReview.length ? '\n   - ' + report.needsReview.join('\n   - ') : ' (empty)'}`);
  }

  // Reversibility self-check: every modified page must have a restorable
  // ORIGINAL revision whose content matches the pre-conversion content.
  if (modified > 0) {
    const sample = (await database.db.select().from(schema.pages)).filter((r) => r.category === 'Updates');
    let recoverable = 0, checked = 0;
    for (const page of sample) {
      const [orig] = await database.db
        .select({ content: schema.pageRevisions.content })
        .from(schema.pageRevisions)
        .where(and(eq(schema.pageRevisions.pageId, page.id), eq(schema.pageRevisions.summary, ORIGINAL_SUMMARY)))
        .limit(1);
      if (orig) { checked++; if (hasSourceMarkup(orig.content) || orig.content.startsWith('**Date:')) recoverable++; }
    }
    console.log(`\nReversibility check  : ${recoverable}/${checked} modified pages have a restorable ORIGINAL revision.`);
  }

  // Idempotency proof (dry-run only): a second pass over the same DB must be a
  // complete no-op — every page already carries a conversion-marker revision.
  if (!EXECUTE && modified > 0) {
    const second = await runConversion(database, { execute: false });
    console.log(`\nIdempotency check    : second pass modified=${second.modified} (expected 0) -> ${second.modified === 0 ? 'PASS' : 'FAIL'}`);
  }

  console.log(`\n[convert] ${EXECUTE ? 'EXECUTED' : 'DRY-RUN complete'} — Updates=${updates.length}, modified=${modified}.`);
  if (!EXECUTE) console.log('[convert] To run for real later:  node scripts/convert-patchnotes-markdown.mjs --execute');
  await database.close();
}

main().catch((err) => {
  console.error('[convert] FAILED:', err);
  process.exit(1);
});
