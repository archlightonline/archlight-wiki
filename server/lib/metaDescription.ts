/**
 * Derive a clean, plain-text description snippet from page content (Markdown OR
 * HTML) for <meta name="description"> / og:description.
 *
 * Server-side and dependency-free (regex only) — deliberately NOT the client's
 * toComparableText (no client import, no marked). Strips code blocks, HTML tags,
 * and Markdown syntax, decodes a few entities, collapses whitespace, and
 * truncates to ~160 chars on a word boundary. Output is PLAIN TEXT; the caller
 * HTML-escapes it before putting it in an attribute.
 */
const DEFAULT_MAX = 160;

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/gi, '&');
}

export function metaDescription(content: string, max = DEFAULT_MAX): string {
  let s = content ?? '';
  s = s.replace(/```[\s\S]*?```/g, ' '); // fenced code blocks
  s = s.replace(/<[^>]+>/g, ' '); // HTML tags
  s = s.replace(/!\[[^\]]*\]\([^)]*\)/g, ' '); // markdown images
  s = s.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1'); // markdown links → link text
  s = s.replace(/^\s*[>#]+\s?/gm, ' '); // heading/blockquote markers
  s = s.replace(/^\s*[-*+]\s+/gm, ' '); // list bullets
  s = s.replace(/[*_`~]+/g, ''); // emphasis / inline-code marks
  s = decodeEntities(s);
  s = s.replace(/\s+/g, ' ').trim(); // collapse all whitespace
  s = s.replace(/\s+([.,;:!?])/g, '$1'); // drop space left before punctuation by tag stripping

  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  // Prefer a word boundary, but don't chop to almost nothing on a very long word.
  const base = lastSpace > max * 0.5 ? cut.slice(0, lastSpace) : cut;
  return base.replace(/[\s.,;:!?-]+$/, '') + '…';
}
