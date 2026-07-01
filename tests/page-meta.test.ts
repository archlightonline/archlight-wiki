import { describe, it, expect, beforeEach } from 'vitest';
import type { Database } from '../server/db';
import { makeTestDb } from './helpers';
import { pages } from '../server/db/schema';
import { resolvePageMeta } from '../server/lib/pageMeta';

const ORIGIN = 'https://wiki.test';

describe('resolvePageMeta', () => {
  let dbh: Database;
  beforeEach(async () => {
    dbh = await makeTestDb();
  });

  it('returns title + description + canonical url + default image for a published page', async () => {
    await dbh.db.insert(pages).values({
      slug: 'combat-guide',
      title: 'Combat Guide',
      content: '# Combat\n\nHow to fight monsters effectively in Archlight.',
      isPublished: true,
    });

    const meta = await resolvePageMeta(dbh.db, 'combat-guide', ORIGIN);
    expect(meta).not.toBeNull();
    expect(meta!.title).toBe('Combat Guide');
    expect(meta!.description).toBe('Combat How to fight monsters effectively in Archlight.');
    expect(meta!.url).toBe('https://wiki.test/wiki/combat-guide');
    expect(meta!.image).toBe('https://wiki.test/og-default.png'); // no image in content → default
  });

  it("uses the page's first image (absolutized) when present", async () => {
    await dbh.db.insert(pages).values({
      slug: 'boss-page',
      title: 'Boss',
      content: '<p>Intro</p><img src="/media/boss.png"> more',
      isPublished: true,
    });
    const meta = await resolvePageMeta(dbh.db, 'boss-page', ORIGIN);
    expect(meta!.image).toBe('https://wiki.test/media/boss.png');
  });

  it('returns null for an UNPUBLISHED page (no draft leak into previews)', async () => {
    await dbh.db.insert(pages).values({
      slug: 'secret-draft',
      title: 'Secret Draft',
      content: 'unreleased content',
      isPublished: false,
    });
    expect(await resolvePageMeta(dbh.db, 'secret-draft', ORIGIN)).toBeNull();
  });

  it('returns null for a nonexistent slug', async () => {
    expect(await resolvePageMeta(dbh.db, 'does-not-exist', ORIGIN)).toBeNull();
  });
});
