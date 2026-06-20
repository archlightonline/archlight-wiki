/**
 * Normalize page content (HTML OR Markdown) to comparable per-block plain text
 * for diffing in the review queue.
 *
 * Why: a contribution's proposedContent is HTML (the editor emits HTML), while a
 * legacy page's current content may be Markdown. Diffing the raw strings churns
 * over the format/tag mismatch and over one-line HTML. Normalizing BOTH sides to
 * the same plain text — one line per block — makes the line-diff show the real
 * content change.
 *
 * Markdown is parsed to HTML with `marked` (the DOM-free markdown→HTML half of
 * lib/markdown.ts's renderMarkdown; DOMPurify is intentionally skipped here since
 * we strip every tag anyway). That keeps this module pure and unit-testable in
 * Node — no DOM dependency.
 */
import { marked } from 'marked';

// Block-level boundaries → one line per block (paragraph, heading, list item,
// table cell/row, blockquote, code block, figure/caption, and br/hr).
const BLOCK_BOUNDARY = /<\/(?:p|h[1-6]|li|blockquote|pre|tr|td|th|div|figure|figcaption)>|<(?:br|hr)\s*\/?>/gi;

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/gi, '&');
}

/** HTML or Markdown → clean per-block plain text (one block per line). */
export function toComparableText(content: string): string {
  const src = content ?? '';
  // Markdown → HTML (HTML passes through unchanged), matching renderMarkdown's
  // own "starts with a tag" detection.
  const html = src.trimStart().startsWith('<') ? src : (marked.parse(src, { async: false }) as string);

  return decodeEntities(
    html
      .replace(BLOCK_BOUNDARY, '\n') // block end → line break
      .replace(/<[^>]+>/g, ''), // strip remaining inline tags
  )
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .filter((line) => line.length > 0)
    .join('\n');
}
