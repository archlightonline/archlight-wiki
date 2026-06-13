/**
 * Markdown -> safe HTML for rendering. `marked` does the conversion (for legacy
 * Markdown pages) and `DOMPurify` strips anything dangerous before it touches the
 * DOM — the render-side half of the XSS defense (the server also sanitizes).
 *
 * Anchor ids: `addHeadingIdsToHtml` injects slug `id`s onto <h2>/<h3> for BOTH
 * Markdown-rendered and editor-saved HTML content, using the same slug logic the
 * TableOfContents parser uses (lib/headings.ts) — so ToC links resolve on every
 * page regardless of stored format.
 */
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { addHeadingIdsToHtml } from './headings';

marked.use({ gfm: true, breaks: true });

/**
 * Sanitize a server-built search snippet before rendering it as HTML. The
 * snippet only ever needs the <mark> highlight tags ts_headline injects, so we
 * allow nothing else — any HTML from page content is stripped. (Same DOMPurify
 * defense as renderMarkdown, scoped tighter for snippets.)
 */
export function sanitizeSnippet(html: string): string {
  return DOMPurify.sanitize(html ?? '', { ALLOWED_TAGS: ['mark'], ALLOWED_ATTR: [] });
}

export function renderMarkdown(input: string): string {
  const text = input ?? '';
  // Content from the Tiptap editor is stored as HTML (starts with a tag);
  // legacy content is Markdown. Render each to HTML, then add heading ids (a
  // fresh slugger per call keeps ids stable), then sanitize.
  const isHtml = text.trimStart().startsWith('<');
  const html = isHtml ? text : (marked.parse(text, { async: false }) as string);
  const raw = addHeadingIdsToHtml(html);
  return DOMPurify.sanitize(raw, {
    // width/height are already in DOMPurify's default allowlist; listing them is
    // belt-and-suspenders for the resizable image (a width attribute), explicit
    // across DOMPurify version bumps. This adds only two numeric HTML attributes
    // — it does not permit any new tag, scheme, or the style attribute.
    ADD_ATTR: ['id', 'target', 'rel', 'width', 'height'],
    FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed'],
  });
}
