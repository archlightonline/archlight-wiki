/**
 * Markdown -> safe HTML for rendering. `marked` does the conversion and
 * `DOMPurify` strips anything dangerous in the browser before it touches the
 * DOM — the render-side half of the XSS defense (the server also sanitizes on
 * store). `marked` + `dompurify` are the two added deps justified for a wiki
 * that renders user-authored Markdown.
 */
import { marked } from 'marked';
import DOMPurify from 'dompurify';

marked.setOptions({ gfm: true, breaks: true });

export function renderMarkdown(md: string): string {
  const raw = marked.parse(md ?? '', { async: false }) as string;
  return DOMPurify.sanitize(raw, {
    ADD_ATTR: ['target', 'rel'],
    // Keep <mark> (search highlight) and standard formatting; drop scripts etc.
    FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed'],
  });
}
