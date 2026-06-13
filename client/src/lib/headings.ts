/**
 * Shared heading utilities for the in-page Table of Contents.
 *
 * The wiki stores a MIX of content formats: legacy patch notes are Markdown
 * (`## Heading`), while pages created in the Tiptap editor are HTML (`<h2>`).
 * Both the renderer (lib/markdown.ts, which injects anchor ids) and the ToC
 * parser (wiki-components/TableOfContents.tsx) must agree on the SAME slug id for
 * a given heading, or ToC links won't scroll. Centralizing the logic here is what
 * guarantees that agreement.
 *
 * Pure string functions (no DOM, no React) so they're unit-testable in Node.
 */

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

/** True for editor-saved HTML content (mirrors lib/markdown.ts's check). */
export function isHtmlContent(content: string): boolean {
  return content.trimStart().startsWith('<');
}

/** Slug from heading text — lowercase, strip punctuation, hyphenate spaces. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * A slugger with per-instance de-duplication: the 1st `foo` → `foo`, the 2nd →
 * `foo-2`, etc. A fresh instance is used per render/parse so ids are stable and
 * the renderer and parser, walking the same headings in order, produce identical
 * ids.
 */
export function createSlugger(): (text: string) => string {
  const seen = new Map<string, number>();
  return (text: string): string => {
    const base = slugifyHeading(text);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    return count > 1 ? `${base}-${count}` : base;
  };
}

/** Plain text from a heading's inner HTML (strip tags, decode common entities). */
function htmlHeadingText(inner: string): string {
  return inner
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Plain text from a Markdown heading (strip bold/italic/code markers). */
function markdownHeadingText(raw: string): string {
  return raw
    .trim()
    .replace(/\*\*?|__?|`/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Fresh instances per call — a shared stateful global regex would carry
// `lastIndex` between an exec-loop and `.replace`.
const htmlHeadingRe = () => /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi;

/**
 * Extract ToC entries from page content — handles BOTH HTML (`<h2>/<h3>`) and
 * Markdown (`## `/`### `). Ids match what `addHeadingIdsToHtml` writes on the
 * rendered headings.
 */
export function parseHeadings(content: string): TocEntry[] {
  const slug = createSlugger();
  const entries: TocEntry[] = [];

  if (isHtmlContent(content)) {
    const re = htmlHeadingRe();
    let m: RegExpExecArray | null;
    while ((m = re.exec(content)) !== null) {
      const level = Number(m[1]) as 2 | 3;
      const text = htmlHeadingText(m[3]);
      if (!text) continue;
      entries.push({ id: slug(text), text, level });
    }
  } else {
    for (const line of content.split('\n')) {
      const m = line.match(/^(#{2,3})\s+(.+)/);
      if (!m) continue;
      const level = m[1].length as 2 | 3;
      const text = markdownHeadingText(m[2]);
      if (!text) continue;
      entries.push({ id: slug(text), text, level });
    }
  }
  return entries;
}

/**
 * Inject slug-based `id` attributes onto `<h2>/<h3>` in an HTML string so the
 * rendered headings are anchor targets. Uses the same slugger walk as
 * `parseHeadings`, so the ids match the ToC links. Any pre-existing id is
 * replaced to stay aligned with the parser (stored content has none in practice).
 */
export function addHeadingIdsToHtml(html: string): string {
  const slug = createSlugger();
  return html.replace(htmlHeadingRe(), (full, level, attrs, inner) => {
    const text = htmlHeadingText(inner);
    if (!text) return full; // skip empty headings (no id, don't advance the slugger)
    const id = slug(text);
    const cleanedAttrs = String(attrs).replace(/\s*\bid\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');
    return `<h${level}${cleanedAttrs} id="${id}">${inner}</h${level}>`;
  });
}
