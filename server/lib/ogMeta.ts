/**
 * Open Graph / Twitter-card meta injection for the SPA shell.
 *
 * Pure string helpers (no DB, no Express) so they're unit-testable. app.ts's
 * production SPA-fallback uses these to rewrite dist/index.html per page for
 * crawlers. Every injected value is HTML-attribute-escaped at the injection site
 * — the required defense so a page title/description containing `"` or `>` cannot
 * break out of the attribute or inject markup.
 */

const SITE_NAME = 'Archlight Wiki';

/** Escape the five characters that matter inside an HTML attribute / text node. */
export function escapeHtml(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** First image URL referenced in content (HTML <img src> or Markdown ![](url)), or null. */
export function firstImageUrl(content: string): string | null {
  if (!content) return null;
  const html = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i.exec(content);
  if (html) return html[1].trim();
  const md = /!\[[^\]]*\]\(\s*([^)\s]+)/.exec(content);
  if (md) return md[1].trim();
  return null;
}

/** Make a possibly-relative URL absolute against `origin` (already-absolute URLs pass through). */
export function absoluteUrl(origin: string, url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('//')) return `https:${url}`;
  return `${origin}${url.startsWith('/') ? '' : '/'}${url}`;
}

export interface PageMeta {
  title: string;
  description: string;
  url: string;
  image: string;
  siteName?: string;
}

/** Build the escaped <meta> block (OG + Twitter + description). */
export function buildMetaTags(m: PageMeta): string {
  const site = escapeHtml(m.siteName ?? SITE_NAME);
  const t = escapeHtml(m.title);
  const d = escapeHtml(m.description);
  const u = escapeHtml(m.url);
  const img = escapeHtml(m.image);
  return [
    `<meta name="description" content="${d}" data-og="1" />`,
    `<meta property="og:type" content="article" data-og="1" />`,
    `<meta property="og:site_name" content="${site}" data-og="1" />`,
    `<meta property="og:title" content="${t}" data-og="1" />`,
    `<meta property="og:description" content="${d}" data-og="1" />`,
    `<meta property="og:url" content="${u}" data-og="1" />`,
    `<meta property="og:image" content="${img}" data-og="1" />`,
    `<meta name="twitter:card" content="summary_large_image" data-og="1" />`,
    `<meta name="twitter:title" content="${t}" data-og="1" />`,
    `<meta name="twitter:description" content="${d}" data-og="1" />`,
    `<meta name="twitter:image" content="${img}" data-og="1" />`,
  ].join('\n    ');
}

/**
 * Inject per-page meta into the index.html template: rewrite <title>, drop the
 * default site-wide <meta name="description"> (so it isn't duplicated), and insert
 * the built block just before </head>. Pure — takes the template string in.
 */
export function injectMeta(template: string, m: PageMeta): string {
  const site = m.siteName ?? SITE_NAME;
  let html = template;
  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(m.title)} — ${escapeHtml(site)}</title>`,
  );
  html = html.replace(/[ \t]*<meta\s+name=["']description["'][^>]*>\s*/i, '');
  html = html.replace(/<\/head>/i, `    ${buildMetaTags(m)}\n  </head>`);
  return html;
}
