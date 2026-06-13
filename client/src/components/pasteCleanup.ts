/**
 * Conservative paste cleanup for `editorProps.transformPastedHTML`.
 *
 * Pasting from Word / Google Docs / the web dumps allowed tags carrying messy
 * inline `style` attributes and empty wrapper elements. ProseMirror's schema
 * already drops unknown nodes/marks on paste; this additionally cleans the
 * *allowed* tags so pasted content matches the clean schema and doesn't
 * reintroduce inline-styled markup.
 *
 * Deliberately minimal — it only:
 *   1. strips inline `style="…"` attributes, and
 *   2. removes EMPTY <span>/<p> wrappers (whitespace / &nbsp; / <br> only).
 * It never removes real text content; structural tags (p, headings, lists,
 * strong/em, a, tables, img, …) and their text are preserved. Pasted external
 * images are untouched (they still come through as <img src> exactly as before —
 * routing those to R2 is a separate, deferred item).
 *
 * Pure string transform (regex) so it runs in the browser AND is unit-testable
 * in the Node test environment without a DOM.
 */
export function cleanPastedHtml(html: string): string {
  let s = html;

  // 1. Strip inline style attributes (single- or double-quoted, or bare).
  s = s.replace(/\s+style\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');

  // 2. Remove empty <span>/<p> wrappers — repeat to catch nesting like
  //    <p><span> </span></p>. "Empty" = only whitespace, &nbsp;, or <br>.
  const emptyWrapper = /<(span|p)\b[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/\1>/gi;
  let prev: string;
  do {
    prev = s;
    s = s.replace(emptyWrapper, '');
  } while (s !== prev);

  return s;
}
