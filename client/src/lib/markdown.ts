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

export function renderMarkdown(md: string): string {
  // Reset the slug-dedup counter for each fresh render so ids are stable
  // regardless of order components render.
  slugCounts.clear();

  const raw = marked.parse(md ?? '', { async: false }) as string;
  return DOMPurify.sanitize(raw, {
    ADD_ATTR: ['id', 'target', 'rel'],
    FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed'],
  });
}
