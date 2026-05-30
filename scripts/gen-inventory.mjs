/**
 * Generates CONTENT_INVENTORY.md from the static source (and marks migrated
 * status by reading the live database). Run: `node scripts/gen-inventory.mjs`.
 */
import { register } from 'tsx/esm/api';
register();
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  extractIndexPages,
  extractUnlockPages,
  extractUpdatePages,
  extractConceptPages,
  extractClassesPage,
  extractAddonsPage,
} from './extract-content.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Read migrated slugs from the DB (best-effort; empty if not yet migrated).
let migratedSlugs = new Set();
try {
  const { createDatabase } = await import('../server/db/index.ts');
  const { sql } = await import('drizzle-orm');
  const database = await createDatabase();
  const res = await database.db.execute(sql`select slug from pages`);
  migratedSlugs = new Set((res.rows ?? res).map((r) => r.slug));
  await database.close();
} catch (e) {
  console.warn('[inventory] could not read DB (run db:push + migrate first):', e.message);
}

const idx = extractIndexPages();
const unlocks = extractUnlockPages();
const updates = extractUpdatePages();
const concept = [...extractConceptPages(), ...extractClassesPage(), ...extractAddonsPage()];
const content = [...idx, ...unlocks];
const status = (slug) => (migratedSlugs.has(slug) ? '✅' : '⬜');

const row = (p) =>
  `| \`${p.id}\` | ${p.title.replace(/\|/g, '\\|')} | ${p.category} | ${p.subcategory ?? '—'} | ${p.markdown.length.toLocaleString()} | ${p.source} | ${status(p.slug)} |`;

// Update breakdowns.
const byWorld = {};
const byYear = {};
const byType = {};
for (const u of updates) {
  const world = u.subcategory ?? 'Unknown';
  byWorld[world] = (byWorld[world] || 0) + 1;
  const year = (u.title.match(/20\d\d/) || u.tags.join(' ').match(/20\d\d/) || ['?'])[0];
  byYear[year] = (byYear[year] || 0) + 1;
  const type = u.tags[1] ?? 'unknown';
  byType[type] = (byType[type] || 0) + 1;
}
const updatesByYear = {};
for (const u of updates) {
  const y = (u.id.match(/20\d\d/) || ['unknown'])[0];
  (updatesByYear[y] ||= []).push(u);
}

const lines = [];
lines.push('# Content Inventory — Archlight Wiki (Phase 1 migration checklist)');
lines.push('');
lines.push(`_Generated ${new Date().toISOString().slice(0, 10)} from \`archlight_wiki_v534_concepts_static_hosts_fixed/\` (read-only source)._`);
lines.push('');
lines.push('Status legend: ✅ migrated into the `pages` table · ⬜ not yet migrated.');
lines.push('');
lines.push('## Summary');
lines.push('');
lines.push('| Source | Pages | Category |');
lines.push('| --- | ---: | --- |');
lines.push(`| \`index.html\` inline content | ${idx.length} | Activities (professions) + quests |`);
lines.push(`| \`data/unlocks-tasks-pages.js\` | ${unlocks.length} | world / unlock / quest pages |`);
lines.push(`| \`data/updates-data.js\` | ${updates.length} | Updates (one page per patch note) |`);
lines.push(`| \`concepts/design-lab/in-review/…\` | ${concept.length} | Concept pages (Classes, Power, Content, Equipment, Rewards, …) |`);
lines.push(`| **Total** | **${content.length + updates.length + concept.length}** | |`);
lines.push(`| Migrated so far | ${[...content, ...updates, ...concept].filter((p) => migratedSlugs.has(p.slug)).length} | |`);
lines.push('');
lines.push('**Now migrated:** the concept/design-lab pages (Classes, Power, Content, Equipment, Professions, Guilds, Rewards, Tools) under `concepts/design-lab/in-review/…`, converted from HTML/JS to Markdown. **Still deferred:** media assets (most are "Image later" placeholders in the source) and the cinematic-carousel-engine demo.');
lines.push('');
lines.push('---');
lines.push('');
lines.push(`## Hand-authored content pages (${content.length})`);
lines.push('');
lines.push('| ID / slug | Title | Category | Subcategory | Content (chars) | Source | Migrated |');
lines.push('| --- | --- | --- | --- | ---: | --- | :---: |');
for (const p of content) lines.push(row(p));
lines.push('');
lines.push('---');
lines.push('');
lines.push(`## Concept / design-lab pages (${concept.length})`);
lines.push('');
lines.push('Migrated from `concepts/design-lab/in-review/…` (HTML/JS → Markdown), reachable from the sidebar nav. Page screenshots remain "Image later" placeholders in the source.');
lines.push('');
lines.push('| ID / slug | Title | Category | Content (chars) | Migrated |');
lines.push('| --- | --- | --- | ---: | :---: |');
for (const p of [...concept].sort((a, b) => (a.category + a.id).localeCompare(b.category + b.id))) {
  lines.push(`| \`${p.id}\` | ${p.title.replace(/\|/g, '\\|')} | ${p.category} | ${p.markdown.length.toLocaleString()} | ${status(p.slug)} |`);
}
lines.push('');
lines.push('---');
lines.push('');
lines.push(`## Updates / patch notes (${updates.length})`);
lines.push('');
lines.push('Each entry in `data/updates-data.js` becomes one page under the **Updates** category with slug `update-<entryId>`.');
lines.push('');
lines.push('**By world:** ' + Object.entries(byWorld).map(([k, v]) => `${k} (${v})`).join(' · '));
lines.push('');
lines.push('**By type:** ' + Object.entries(byType).map(([k, v]) => `${k} (${v})`).join(' · '));
lines.push('');
lines.push('**By year:**');
lines.push('');
lines.push('| Year | Count |');
lines.push('| --- | ---: |');
for (const y of Object.keys(updatesByYear).sort()) lines.push(`| ${y} | ${updatesByYear[y].length} |`);
lines.push('');
for (const y of Object.keys(updatesByYear).sort()) {
  lines.push(`<details><summary><strong>${y}</strong> — ${updatesByYear[y].length} updates</summary>`);
  lines.push('');
  lines.push('| ID / slug | Title | World | Migrated |');
  lines.push('| --- | --- | --- | :---: |');
  for (const u of updatesByYear[y]) {
    lines.push(`| \`${u.slug}\` | ${u.title.replace(/\|/g, '\\|')} | ${u.subcategory ?? '—'} | ${status(u.slug)} |`);
  }
  lines.push('');
  lines.push('</details>');
  lines.push('');
}

writeFileSync(path.join(ROOT, 'CONTENT_INVENTORY.md'), lines.join('\n'), 'utf8');
console.log(`Wrote CONTENT_INVENTORY.md (${content.length} content pages + ${updates.length} updates).`);
