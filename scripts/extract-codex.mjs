/**
 * Generic extractor for the "codex" concept pages (Professions, Guilds). These
 * use an interactive side-menu + tabbed-panel layout (one readable guide per
 * entry) instead of the numbered .ut-section structure, so each needs its own
 * structured extraction into client/src/pages/wiki/<id>-data.ts.
 *
 * Run: node scripts/extract-codex.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '..', 'archlight_wiki_v534_concepts_static_hosts_fixed');

const win = {};
// eslint-disable-next-line no-new-func
new Function('window', readFileSync(path.join(SRC, 'data/concept-routes.js'), 'utf8'))(win);
const ROUTES = win.ARCHLIGHT_CONCEPT_ROUTES || [];

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

function parseCodex(routeId, prefix) {
  const route = ROUTES.find((r) => r.id === routeId);
  const html = readFileSync(path.join(SRC, route.src), 'utf8');
  const linkRe = new RegExp(`<a class="[^"]*" href="#(${prefix}-[^"]+)">([\\s\\S]*?)</a>`, 'g');
  const items = [...html.matchAll(linkRe)].map((m) => ({
    id: m[1].replace(new RegExp(`^${prefix}-`), ''),
    label: grab(/<b>([\s\S]*?)<\/b>/, m[2]),
    sub: grab(/<small>([\s\S]*?)<\/small>/, m[2]),
    pos: m.index,
  }));
  const groupMarkers = [...html.matchAll(/<div class="codex-menu-group">\s*<span>([^<]+)<\/span>/g)].map((m) => ({
    name: strip(m[1]),
    pos: m.index,
  }));
  const groupFor = (pos) => {
    let g = '';
    for (const gm of groupMarkers) if (gm.pos < pos) g = gm.name;
    return g; // '' = ungrouped (rendered without a heading)
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

  const entries = {};
  const panelRe = new RegExp(`<article[^>]*class="[^"]*codex-panel[^"]*"[^>]*id="${prefix}-([^"]+)"[^>]*>([\\s\\S]*?)</article>`, 'g');
  for (const m of html.matchAll(panelRe)) {
    const id = m[1];
    const body = m[2];
    const menu = items.find((it) => it.id === id) || {};

    const name = grab(/<h3>([\s\S]*?)<\/h3>/, body) || menu.label || id;
    const head = (body.match(/<header[^>]*class="codex-panel-head"[^>]*>([\s\S]*?)<\/header>/) || [])[1] || '';
    const abbr = grab(/<span>([\s\S]*?)<\/span>/, head);
    const kind = grab(/<small>([\s\S]*?)<\/small>/, head) || menu.sub || '';

    const reader = (body.match(/<div class="codex-reader">([\s\S]*?)$/) || [])[1] || body;
    const intro = grab(/<p[^>]*>([\s\S]*?)<\/p>/, reader);

    const metaHtml = (body.match(/<dl class="codex-meta">([\s\S]*?)<\/dl>/) || [])[1] || '';
    const meta = [...metaHtml.matchAll(/<dt>([\s\S]*?)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/g)].map((d) => ({
      label: strip(d[1]),
      value: strip(d[2]),
    }));

    const media = grab(/<div class="codex-media-slot"[^>]*>[\s\S]*?<strong>([\s\S]*?)<\/strong>/, body);

    // Chips: support both mini-chips and chip-grid variants.
    const chipBlocks = [...body.matchAll(/<div class="codex-(?:mini-chips|chip-grid)">([\s\S]*?)<\/div>/g)]
      .map((c) => c[1])
      .join(' ');
    const chips = [...chipBlocks.matchAll(/<span>([\s\S]*?)<\/span>/g)].map((c) => strip(c[1])).filter(Boolean);

    const notes = [...body.matchAll(/<div class="codex-note">\s*<b>([\s\S]*?)<\/b>([\s\S]*?)<\/div>/g)].map((n) => ({
      title: strip(n[1]),
      text: strip(n[2]),
    }));

    const tables = [...body.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/g)]
      .map((t) => parseTable(t[0]))
      .filter((t) => t.rows.length);

    entries[id] = { id, name, abbr, kind, group: groupFor(menu.pos ?? 0), sub: menu.sub || '', intro, meta, media, chips, notes, tables };
  }

  return { groups, entries };
}

function emit(routeId, prefix, destName) {
  const { groups, entries } = parseCodex(routeId, prefix);
  const header = `// AUTO-GENERATED by scripts/extract-codex.mjs from the read-only
// ${routeId} codex source page. Structured data for the dedicated codex page.
/* eslint-disable */

export interface CodexMeta { label: string; value: string }
export interface CodexNote { title: string; text: string }
export interface CodexTable { headers: string[]; rows: string[][] }
export interface CodexEntry {
  id: string;
  name: string;
  abbr: string;
  kind: string;
  group: string;
  sub: string;
  intro: string;
  meta: CodexMeta[];
  media: string;
  chips: string[];
  notes: CodexNote[];
  tables: CodexTable[];
}
export interface CodexGroup { name: string; items: string[] }

export const CODEX_GROUPS: CodexGroup[] = ${JSON.stringify(groups, null, 2)};

export const CODEX_ENTRIES: Record<string, CodexEntry> = ${JSON.stringify(entries, null, 2)};
`;
  const dest = path.resolve(__dirname, '..', 'client', 'src', 'pages', 'wiki', destName);
  writeFileSync(dest, header, 'utf8');
  console.log(`Wrote ${dest}`);
  console.log(`  Groups: ${groups.map((g) => `${g.name}(${g.items.length})`).join(' ')}`);
  console.log(`  Entries: ${Object.keys(entries).length}`);
  for (const e of Object.values(entries)) {
    console.log(`    ${e.id}: meta=${e.meta.length} chips=${e.chips.length} notes=${e.notes.length} tables=${e.tables.length}${e.media ? ' +media' : ''}`);
  }
}

emit('professions', 'prof', 'professions-data.ts');
emit('guilds', 'guild', 'guilds-data.ts');
