/**
 * Markdown -> safe HTML for rendering. `marked` does the conversion and
 * `DOMPurify` strips anything dangerous before it touches the DOM — the
 * render-side half of the XSS defense (the server also sanitizes on store).
 *
 * A custom heading renderer injects slug `id` attributes so the TableOfContents
 * anchor links resolve without any DOM scanning.
 */
import { marked, type Renderer } from 'marked';
import DOMPurify from 'dompurify';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const slugCounts = new Map<string, number>();

function headingIdRenderer(text: string): string {
  const base = slugify(text.replace(/<[^>]+>/g, ''));
  const count = (slugCounts.get(base) ?? 0) + 1;
  slugCounts.set(base, count);
  return count > 1 ? `${base}-${count}` : base;
}

const customRenderer: Partial<Renderer> = {
  heading({ text, depth }) {
    // Reset per render call via the closure in renderMarkdown below.
    const id = headingIdRenderer(text);
    const tag = `h${depth}`;
    return `<${tag} id="${id}">${text}</${tag}>\n`;
  },
};

marked.use({ renderer: customRenderer, gfm: true, breaks: true });

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
  // Reset the slug-dedup counter for each fresh render so ids are stable
  // regardless of order components render.
  slugCounts.clear();

  const text = input ?? '';
  // Content from the Tiptap editor is stored as HTML (starts with a tag);
  // legacy content is Markdown. Render each accordingly, then sanitize.
  const isHtml = text.trimStart().startsWith('<');
  const raw = isHtml ? text : (marked.parse(text, { async: false }) as string);
  return DOMPurify.sanitize(raw, {
    // width/height are already in DOMPurify's default allowlist; listing them is
    // belt-and-suspenders for the resizable image (a width attribute), explicit
    // across DOMPurify version bumps. This adds only two numeric HTML attributes
    // — it does not permit any new tag, scheme, or the style attribute.
    ADD_ATTR: ['id', 'target', 'rel', 'width', 'height'],
    FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed'],
  });
}
