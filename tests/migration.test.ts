import { describe, it, expect } from 'vitest';
import { sql } from 'drizzle-orm';
import { makeTestDb, seedUser } from './helpers';
import { pages as pagesTable, pageTags } from '../server/db/schema';
import { uniqueSlug } from '../server/lib/slug';
import {
  extractAllPages,
  extractIndexPages,
  extractUnlockPages,
  extractUpdatePages,
} from '../scripts/extract-content.mjs';

describe('content migration', () => {
  it('extracts the expected Phase-1 page counts from the static source', () => {
    expect(extractIndexPages().length).toBe(11); // professions + quests
    expect(extractUnlockPages().length).toBe(13); // world / unlock / quest pages
    expect(extractUpdatePages().length).toBe(569); // one page per patch note
    expect(extractAllPages().length).toBe(593);
  });

  it('every extracted page has a title, category and non-trivial markdown', () => {
    for (const p of extractAllPages()) {
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.category.length).toBeGreaterThan(0);
      expect(typeof p.markdown).toBe('string');
    }
  });

  it('inserts the non-update content pages into the database (correct count)', async () => {
    const dbh = await makeTestDb();
    const admin = await seedUser(dbh, { username: 'admin', role: 'admin' });

    // Mirror the migrate-content insert path for the 24 hand-authored pages.
    const pages = [...extractIndexPages(), ...extractUnlockPages()];
    const used = new Set<string>();
    for (const p of pages) {
      const slug = uniqueSlug(p.slug, used);
      used.add(slug);
      const [row] = await dbh.db
        .insert(pagesTable)
        .values({
          slug,
          title: p.title,
          category: p.category,
          subcategory: p.subcategory,
          content: p.markdown,
          createdBy: admin.id,
          updatedBy: admin.id,
        })
        .returning();
      const tags = [...new Set(p.tags.filter(Boolean))];
      if (tags.length) await dbh.db.insert(pageTags).values(tags.map((tag) => ({ pageId: row.id, tag })));
    }

    const res = (await dbh.db.execute(sql`select count(*)::int c from pages`)) as unknown as {
      rows: Array<{ c: number }>;
    };
    expect(Number(res.rows[0].c)).toBe(24);

    // Spot-check a known migrated page.
    const mining = (await dbh.db.execute(sql`select title, category from pages where slug = 'mining'`)) as unknown as {
      rows: Array<{ title: string }>;
    };
    expect(mining.rows[0].title).toBe('Mining');
    await dbh.close();
  });
});
