import { describe, it, expect, beforeEach } from 'vitest';
import { eq } from 'drizzle-orm';
import type { Database } from '../server/db';
import { makeTestDb, seedUser } from './helpers';
import { pages, pageRevisions, contributions, users, socialLinks, uploads } from '../server/db/schema';
import { findOrphans, isReferenced, resolveExecuteTarget } from '../server/lib/orphanUploads';

// The object key (uploads/<uuid>.<ext>) and the full public URL it ends up
// embedded as. Detection must match by the KEY (a substring of the URL), so it
// stays correct even if the base URL changes.
const KEY = 'uploads/aaaaaaaa-1111-2222-3333-444444444444.png';
const url = (base: string) => `${base}/${KEY}`;

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 5, 1); // fixed clock for deterministic age
const GRACE = 30 * DAY;
const OLD = new Date(NOW - 60 * DAY); // older than the grace period
const YOUNG = new Date(NOW - 1 * DAY); // within the grace period

describe('orphan-upload detection', () => {
  let dbh: Database;
  let userId: number;

  beforeEach(async () => {
    dbh = await makeTestDb();
    const u = await seedUser(dbh, { username: 'u', role: 'viewer' });
    userId = u.id;
    // The candidate upload — aged past the grace period unless a test overrides.
    await dbh.db.insert(uploads).values({ userId, key: KEY, contentType: 'image/png', size: 123, createdAt: OLD });
  });

  const orphanKeys = async (now = NOW) => (await findOrphans(dbh.db, { now, graceMs: GRACE })).map((o) => o.key);

  it('IS an orphan when referenced nowhere and older than the grace period', async () => {
    expect(await orphanKeys()).toEqual([KEY]);
  });

  it('is NOT an orphan when younger than the grace period (even if referenced nowhere)', async () => {
    await dbh.db.delete(uploads); // replace the aged seed with a young one
    await dbh.db.insert(uploads).values({ userId, key: KEY, contentType: 'image/png', size: 123, createdAt: YOUNG });
    expect(await orphanKeys()).toEqual([]);
  });

  it('is NOT an orphan when referenced by a PUBLISHED page', async () => {
    await dbh.db.insert(pages).values({ slug: 'p1', title: 'P1', content: `<img src="${url('https://cdn.example.com')}">`, isPublished: true });
    expect(await orphanKeys()).toEqual([]);
  });

  it('is NOT an orphan when referenced by an UNPUBLISHED page (unpublish is restorable)', async () => {
    await dbh.db.insert(pages).values({ slug: 'p2', title: 'P2', content: `<img src="${url('https://cdn.example.com')}">`, isPublished: false });
    expect(await orphanKeys()).toEqual([]);
  });

  it('is NOT an orphan when referenced only by an OLD page revision (rollback can restore it)', async () => {
    // Page's CURRENT content has no key; an old revision does.
    const [p] = await dbh.db.insert(pages).values({ slug: 'p3', title: 'P3', content: 'clean current content', isPublished: true }).returning();
    await dbh.db.insert(pageRevisions).values({ pageId: p.id, content: `<img src="${url('https://cdn.example.com')}">`, summary: 'old' });
    expect(await orphanKeys()).toEqual([]);
  });

  it('is NOT an orphan when referenced by a REJECTED contribution (edit-&-resubmit reuses it)', async () => {
    await dbh.db.insert(contributions).values({
      contributorId: userId, proposedContent: `<img src="${url('https://cdn.example.com')}">`, status: 'rejected',
    });
    expect(await orphanKeys()).toEqual([]);
  });

  it('is NOT an orphan when referenced by a contribution note (contributor_note / review_note)', async () => {
    await dbh.db.insert(contributions).values({
      contributorId: userId, proposedContent: 'no image here', status: 'pending', contributorNote: `see ${url('https://cdn.example.com')}`,
    });
    expect(await orphanKeys()).toEqual([]);

    // And via review_note.
    await dbh.db.delete(contributions);
    await dbh.db.insert(contributions).values({
      contributorId: userId, proposedContent: 'no image here', status: 'rejected', reviewNote: `bad: ${url('https://cdn.example.com')}`,
    });
    expect(await orphanKeys()).toEqual([]);
  });

  it('is NOT an orphan when referenced by users.avatar_url', async () => {
    await dbh.db.update(users).set({ avatarUrl: url('https://cdn.example.com') }).where(eq(users.id, userId));
    expect(await orphanKeys()).toEqual([]);
  });

  it('is NOT an orphan when referenced by social_links.url', async () => {
    await dbh.db.insert(socialLinks).values({ key: 'x', label: 'X', url: url('https://cdn.example.com') });
    expect(await orphanKeys()).toEqual([]);
  });

  it('is NOT an orphan when referenced by social_links.icon', async () => {
    await dbh.db.insert(socialLinks).values({ key: 'y', label: 'Y', url: 'https://example.com', icon: url('https://cdn.example.com') });
    expect(await orphanKeys()).toEqual([]);
  });

  it('matches by KEY, not the full URL — still referenced after a base-URL change', async () => {
    // Content embeds the key under a DIFFERENT base URL than any current config.
    await dbh.db.insert(pages).values({ slug: 'p4', title: 'P4', content: `<img src="${url('https://totally-different-domain.test')}">`, isPublished: true });
    expect(await isReferenced(dbh.db, KEY)).toBe(true);
    expect(await orphanKeys()).toEqual([]);
  });

  it('does not false-match a different key', async () => {
    await dbh.db.insert(pages).values({ slug: 'p5', title: 'P5', content: `<img src="${url('https://cdn.example.com').replace('aaaaaaaa', 'bbbbbbbb')}">`, isPublished: true });
    expect(await orphanKeys()).toEqual([KEY]); // the real KEY is still unreferenced
  });
});

describe('resolveExecuteTarget guard', () => {
  it('accepts a postgres:// URL and returns host/dbname', () => {
    expect(resolveExecuteTarget({ DATABASE_URL: 'postgres://user:pw@db.host:5432/wiki' })).toEqual({ ok: true, target: 'db.host:5432/wiki' });
  });
  it('rejects a missing DATABASE_URL', () => {
    const r = resolveExecuteTarget({});
    expect(r.ok).toBe(false);
  });
  it('rejects a non-postgres URL (refuses local PGlite / other drivers)', () => {
    const r = resolveExecuteTarget({ DATABASE_URL: 'mysql://x/y' });
    expect(r.ok).toBe(false);
  });
});
