/**
 * Server-side input sanitization for user-submitted content (AUDIT §5/§3 fix).
 *
 * Content is Markdown that may embed raw HTML. We neutralize the dangerous
 * subset before storage: script/style/iframe/object/embed/noscript elements,
 * inline event handlers (on*=), and javascript:/vbscript:/data: URLs in
 * href/src. This is defense-in-depth — the client also sanitizes on render
 * (DOMPurify) before injecting HTML into the DOM.
 */
const DANGEROUS_TAGS = 'script|style|iframe|object|embed|noscript|template';
const CONTROL_CHARS = new RegExp('[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]', 'g');

export function sanitizeContent(input: string): string {
  if (!input) return '';
  let s = String(input);

  // Remove dangerous elements together with their contents.
  s = s.replace(new RegExp(`<\\s*(${DANGEROUS_TAGS})[^>]*>[\\s\\S]*?<\\s*/\\s*\\1\\s*>`, 'gi'), '');
  // Remove any stray/self-closing dangerous tags.
  s = s.replace(new RegExp(`<\\s*/?\\s*(${DANGEROUS_TAGS})[^>]*>`, 'gi'), '');

  // Strip inline event-handler attributes (onclick=, onerror=, ...).
  s = s.replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, '');
  s = s.replace(/\son[a-z]+\s*=\s*'[^']*'/gi, '');
  s = s.replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, '');

  // Neutralize dangerous URL schemes in href/src.
  s = s.replace(
    /\b(href|src)\s*=\s*(["'])\s*(?:javascript|vbscript|data)\s*:[^"']*\2/gi,
    '$1=$2#blocked$2',
  );
  s = s.replace(/\b(href|src)\s*=\s*(?:javascript|vbscript|data)\s*:[^\s>]+/gi, '$1=#blocked');

  return s;
}

/** Collapse/trim a short free-text field (titles, summaries, notes). */
export function sanitizeText(input: string, maxLen = 500): string {
  return String(input ?? '')
    .replace(CONTROL_CHARS, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLen);
}

/** Avatar / profile photo URLs must be https only (AUDIT §3 fix). */
export function isHttpsUrl(url: string): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === 'https:';
  } catch {
    return false;
  }
}
