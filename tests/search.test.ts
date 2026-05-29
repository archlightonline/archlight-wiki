import { describe, it, expect, beforeEach } from 'vitest';
import type { Database } from '../server/db';
import type { User } from '../server/db/schema';
import { makeTestDb, callerFor, seedUser } from './helpers';

describe('full-text search', () => {
  let dbh: Database;
  let admin: User;

  beforeEach(async () => {
    dbh = await makeTestDb();
    admin = await seedUser(dbh, { username: 'admin', role: 'admin' });
    const ad = callerFor(dbh, admin).caller;
    await ad.pages.create({ title: 'Mining', content: 'Use a pickaxe to mine ore veins for ingots and coal.' });
    await ad.pages.create({ title: 'Fishing', content: 'Catch fish with a fishing rod near deep water.' });
    await ad.pages.create({ title: 'Blacksmithing', content: 'Smelt ore into ingots; craft weapons at the anvil.' });
  });

  it('returns ranked results with a highlighted snippet', async () => {
    const pub = callerFor(dbh, null).caller;
    const results = await pub.pages.search({ q: 'pickaxe' });
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].slug).toBe('mining');
    expect(results[0].snippet.toLowerCase()).toContain('pickaxe');
    expect(typeof results[0].rank).toBe('number');
  });

  it('matches body content, ranking the more relevant page first', async () => {
    const pub = callerFor(dbh, null).caller;
    const results = await pub.pages.search({ q: 'ingots' });
    const slugs = results.map((r) => r.slug);
    expect(slugs).toContain('mining');
    expect(slugs).toContain('blacksmithing');
  });

  it('returns an empty array for a blank query', async () => {
    const results = await callerFor(dbh, null).caller.pages.search({ q: '   ' });
    expect(results).toEqual([]);
  });

  it('excludes unpublished pages from results', async () => {
    const ad = callerFor(dbh, admin).caller;
    await ad.pages.create({ title: 'Secret Vault', content: 'hidden dragon treasure hoard' });
    await ad.pages.delete({ slug: 'secret-vault' }); // unpublish
    const results = await callerFor(dbh, null).caller.pages.search({ q: 'treasure' });
    expect(results.find((r) => r.slug === 'secret-vault')).toBeUndefined();
  });
});
