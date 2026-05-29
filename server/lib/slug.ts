/** URL-safe slug from a page title. Stable, ASCII, max 80 chars. */
export function slugify(input: string): string {
  const base = String(input ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip combining accents
    .replace(/[‘’'"]/g, '') // smart/straight quotes
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '');
  return base || 'page';
}

/**
 * Ensure a slug is unique among existing slugs by appending -2, -3, ... .
 * `existing` is the set of slugs already taken.
 */
export function uniqueSlug(base: string, existing: Set<string>): string {
  const slug = slugify(base);
  if (!existing.has(slug)) return slug;
  let n = 2;
  while (existing.has(`${slug}-${n}`)) n++;
  return `${slug}-${n}`;
}
