/**
 * Resolve per-page OG/meta for a wiki slug from the database. Kept separate from
 * app.ts (Express) and ogMeta.ts (pure string helpers) so it's unit-testable with
 * a real DB. Returns null when the page doesn't exist or is NOT published — so
 * unpublished drafts never leak into link previews (the caller falls back to the
 * default site-wide tags).
 */
import { eq } from 'drizzle-orm';
import type { DB } from '../db';
import { pages } from '../db/schema';
import { metaDescription } from './metaDescription';
import { firstImageUrl, absoluteUrl, type PageMeta } from './ogMeta';

const DEFAULT_OG_IMAGE = '/og-default.png';

export async function resolvePageMeta(db: DB, slug: string, origin: string): Promise<PageMeta | null> {
  const [page] = await db
    .select({
      title: pages.title,
      content: pages.content,
      slug: pages.slug,
      isPublished: pages.isPublished,
    })
    .from(pages)
    .where(eq(pages.slug, slug))
    .limit(1);

  // No such page, or an unpublished draft → no per-page meta (default tags used).
  if (!page || !page.isPublished) return null;

  const rawImage = firstImageUrl(page.content);
  const image = rawImage ? absoluteUrl(origin, rawImage) : `${origin}${DEFAULT_OG_IMAGE}`;

  return {
    title: page.title,
    description: metaDescription(page.content),
    url: `${origin}/wiki/${encodeURIComponent(page.slug)}`,
    image,
  };
}
