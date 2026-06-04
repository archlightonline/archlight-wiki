/**
 * Dedicated extractor for the Professions codex page. The professions page uses
 * an interactive side-menu + tabbed-panel layout (one readable guide per
 * profession) instead of the numbered .ut-section structure, so it needs its
 * own structured extraction into client/src/pages/wiki/professions-data.ts.
 *
 * Run: node scripts/extract-professions.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '..', 'archlight_wiki_v534_concepts_static_hosts_fixed');

const win = {};
// eslint-disable-next-line no-new-func
new Function('window', readFileSync(path.join(SRC, 'data/concept-routes.js'), 'utf8'))(win);
const route = (win.ARCHLIGHT_CONCEPT_ROUTES || []).find((r) => r.id === 'professions');
const html = readFileSync(path.join(SRC, route.src), 'utf8');

const ENT = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&apos;': "'", '&nbsp;': ' ',
  '&mdash;': '—', '&ndash;': '–', '&hellip;': '…', '&times;': '×', '&rsquo;': '’', '&lsquo;': '‘',
  '&rdquo;': '”', '&ldquo;': '“', '&deg;': '°', '&copy;': '©', '&middot;': '·',
};
const decode = (s) =>
  String(s || '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&[a-z]+;/gi, (m) => ENT[m.toLowerCase()] ?? m);
const strip = (s) => decode(String(s || '').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const grab = (re, s) => strip((s.match(re) || [])[1] || '');

const stripCell = (h) =>
  decode(
    String(h || '')
      .replace(/<span[^>]*class="[^"]*placeholder[^"]*"[^>]*>[\s\S]*?<\/span>/gi, '')
      .replace(/<br\s*\/?>/gi, ' / ')
      .replace(/<[^>]+>/g, ''),
  )
    .replace(/\s+/g, ' ')
    .replace(/^\s*\/\s*|\s*\/\s*$/g, '')
    .trim();

function parseTable(tableHtml) {
  let headers = [...tableHtml.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/gi)].map((m) => strip(m[1]));
  let rows = [];
  for (const tr of tableHtml.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const tds = [...tr[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => stripCell(m[1]));
    if (tds.length) rows.push(tds);
  }
  if (headers.length && rows.length) {
    const keep = headers.map((_, i) => rows.some((r) => (r[i] ?? '').trim() !== ''));
    if (keep.some((k) => !k)) {
      const filt = (arr) => arr.filter((_, i) => keep[i]);
      headers = filt(headers);
      rows = rows.map((r) => filt(r));
    }
  }
  return { headers, rows };
}

// ---- Menu: ordered groups -> profession ids -----------------------------
const items = [...html.matchAll(/<a class="[^"]*" href="#(prof-[^"]+)">([\s\S]*?)<\/a>/g)].map((m) => ({
  id: m[1].replace(/^prof-/, ''),
  label: grab(/<b>([\s\S]*?)<\/b>/, m[2]),
  sub: grab(/<small>([\s\S]*?)<\/small>/, m[2]),
  pos: m.index,
}));
const groupMarkers = [...html.matchAll(/<div class="codex-menu-group">\s*<span>([^<]+)<\/span>/g)].map((m) => ({
  name: strip(m[1]),
  pos: m.index,
}));
const groupFor = (pos) => {
  let g = 'Overview';
  for (const gm of groupMarkers) if (gm.pos < pos) g = gm.name;
  return g;
};
const groupsOrder = [];
const groupMap = {};
for (const it of items) {
  const g = groupFor(it.pos);
  if (!groupMap[g]) {
    groupMap[g] = [];
    groupsOrder.push(g);
  }
  groupMap[g].push(it.id);
}
const groups = groupsOrder.map((name) => ({ name, items: groupMap[name] }));

// ---- Panels: one profession guide each ----------------------------------
const professions = {};
for (const m of html.matchAll(/<article[^>]*class="[^"]*codex-panel[^"]*"[^>]*id="prof-([^"]+)"[^>]*>([\s\S]*?)<\/article>/g)) {
  const id = m[1];
  const body = m[2];
  const menu = items.find((it) => it.id === id) || {};

  const name = grab(/<h3>([\s\S]*?)<\/h3>/, body) || menu.label || id;
  const head = (body.match(/<header[^>]*class="codex-panel-head"[^>]*>([\s\S]*?)<\/header>/) || [])[1] || '';
  const abbr = grab(/<span>([\s\S]*?)<\/span>/, head);
  const kind = grab(/<small>([\s\S]*?)<\/small>/, head);

  // Intro: the first <p> in the reader, before the meta list.
  const reader = (body.match(/<div class="codex-reader">([\s\S]*?)$/) || [])[1] || body;
  const intro = grab(/<p[^>]*>([\s\S]*?)<\/p>/, reader);

  // Meta definition list (Type / Role / Energy / Value).
  const metaHtml = (body.match(/<dl class="codex-meta">([\s\S]*?)<\/dl>/) || [])[1] || '';
  const meta = [...metaHtml.matchAll(/<dt>([\s\S]*?)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/g)].map((d) => ({
    label: strip(d[1]),
    value: strip(d[2]),
  }));

  // Media slot caption.
  const media = grab(/<div class="codex-media-slot"[^>]*>[\s\S]*?<strong>([\s\S]*?)<\/strong>/, body);

  // Mini-chips (old wiki topics).
  const chipsHtml = (body.match(/<div class="codex-mini-chips">([\s\S]*?)<\/div>/) || [])[1] || '';
  const chips = [...chipsHtml.matchAll(/<span>([\s\S]*?)<\/span>/g)].map((c) => strip(c[1])).filter(Boolean);

  // Note-grid cards.
  const noteGrid = (body.match(/<div class="codex-note-grid">([\s\S]*?)<\/div>\s*(?:<h4|<div class="ut-table-wrap|<\/div>)/) || [])[1] || '';
  const notes = [...body.matchAll(/<div class="codex-note">\s*<b>([\s\S]*?)<\/b>([\s\S]*?)<\/div>/g)].map((n) => ({
    title: strip(n[1]),
    text: strip(n[2]),
  }));

  // Tables.
  const tables = [...body.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/g)]
    .map((t) => parseTable(t[0]))
    .filter((t) => t.rows.length);

  professions[id] = { id, name, abbr, kind: kind || menu.sub || '', group: groupFor(menu.pos ?? 0), sub: menu.sub || '', intro, meta, media, chips, notes, tables };
}

const header = `// AUTO-GENERATED by scripts/extract-professions.mjs from the read-only
// professions codex source page. Structured data for ProfessionsPage.
/* eslint-disable */

export interface ProfMeta { label: string; value: string }
export interface ProfNote { title: string; text: string }
export interface ProfTable { headers: string[]; rows: string[][] }
export interface Profession {
  id: string;
  name: string;
  abbr: string;
  kind: string;
  group: string;
  sub: string;
  intro: string;
  meta: ProfMeta[];
  media: string;
  chips: string[];
  notes: ProfNote[];
  tables: ProfTable[];
}
export interface ProfessionGroup { name: string; items: string[] }

export const PROFESSION_GROUPS: ProfessionGroup[] = ${JSON.stringify(groups, null, 2)};

export const PROFESSIONS: Record<string, Profession> = ${JSON.stringify(professions, null, 2)};
`;

const dest = path.resolve(__dirname, '..', 'client', 'src', 'pages', 'wiki', 'professions-data.ts');
writeFileSync(dest, header, 'utf8');
console.log(`Wrote ${dest}`);
console.log(`Groups: ${groups.map((g) => `${g.name}(${g.items.length})`).join(' ')}`);
console.log(`Professions: ${Object.keys(professions).length}`);
for (const p of Object.values(professions)) {
  console.log(`  ${p.id}: meta=${p.meta.length} chips=${p.chips.length} notes=${p.notes.length} tables=${p.tables.length}${p.media ? ' +media' : ''}`);
}
