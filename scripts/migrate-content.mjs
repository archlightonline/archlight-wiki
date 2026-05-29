/**
 * Content migration — reads the READ-ONLY static site and inserts every Phase-1
 * page into the `pages` table via direct DB calls (not tRPC).
 *
 *   Sources (see extract-content.mjs):
 *     • index.html  → 11 professions + quests (HTML → Markdown)
 *     • unlocks-tasks-pages.js → world/unlock/quest pages
 *     • updates-data.js → one page per patch-note entry ("Updates")
 *   Deferred to Phase 2: concept/design-lab pages + media assets.
 *
 * Idempotent: pages whose slug already exists are skipped. All pages are
 * published, created_by/updated_by = system admin (id 1). Prints a report.
 *
 * Run with `pnpm migrate:content` (or `node scripts/migrate-content.mjs`).
 */
import { register } from 'tsx/esm/api';
register();

const { createDatabase } = await import('../server/db/index.ts');
const { ensureSystemAdmin } = await import('../server/lib/bootstrap.ts');
const schema = await import('../server/db/schema.ts');
const { sanitizeContent, sanitizeText } = await import('../server/lib/sanitize.ts');
const { uniqueSlug } = await import('../server/lib/slug.ts');
const { extractAllPages } = await import('./extract-content.mjs');

const database = await createDatabase();
await database.ensureSchema();
const db = database.db;
const adminId = await ensureSystemAdmin(db);

const pages = extractAllPages();
console.log(`[migrate] extracted ${pages.length} Phase-1 pages; inserting...`);

const existing = await db.select({ slug: schema.pages.slug }).from(schema.pages);
const used = new Set(existing.map((e) => e.slug));

let migrated = 0;
let skipped = 0;
let errors = 0;
const errorList = [];
const byCategory = {};

for (const p of pages) {
  try {
    if (used.has(p.slug)) {
      skipped++;
      continue;
    }
    const slug = uniqueSlug(p.slug, used);
    used.add(slug);

    const [row] = await db
      .insert(schema.pages)
      .values({
        slug,
        title: sanitizeText(p.title, 200),
        category: p.category || null,
        subcategory: p.subcategory || null,
        content: sanitizeContent(p.markdown || ''),
        createdBy: adminId,
        updatedBy: adminId,
        isPublished: true,
      })
      .returning({ id: schema.pages.id });

    const tags = [...new Set((p.tags || []).filter(Boolean).map((t) => String(t)))].slice(0, 10);
    if (tags.length) {
      await db.insert(schema.pageTags).values(tags.map((tag) => ({ pageId: row.id, tag })));
    }

    migrated++;
    byCategory[p.category] = (byCategory[p.category] || 0) + 1;
    if (migrated % 100 === 0) console.log(`  ...${migrated} migrated`);
  } catch (err) {
    errors++;
    errorList.push(`${p.id}: ${err?.message ?? err}`);
  }
}

console.log('\n========== MIGRATION REPORT ==========');
console.log(`Pages migrated : ${migrated}`);
console.log(`Pages skipped  : ${skipped} (slug already existed)`);
console.log(`Conversion errs: ${errors}`);
console.log('By category    :');
for (const [cat, n] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
  console.log(`   ${cat.padEnd(20)} ${n}`);
}
if (errorList.length) {
  console.log('\nErrors:');
  for (const e of errorList.slice(0, 50)) console.log('   - ' + e);
}
console.log('======================================\n');

await database.close();
