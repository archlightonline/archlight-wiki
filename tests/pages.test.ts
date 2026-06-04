import { describe, it, expect, beforeEach } from 'vitest';
import type { Database } from '../server/db';
import type { User } from '../server/db/schema';
import { makeTestDb, callerFor, seedUser } from './helpers';

describe('pages', () => {
  let dbh: Database;
  let admin: User;
  let editor: User;
  let viewer: User;

  beforeEach(async () => {
    dbh = await makeTestDb();
    admin = await seedUser(dbh, { username: 'admin', role: 'admin' });
    editor = await seedUser(dbh, { username: 'editor', role: 'editor' });
    viewer = await seedUser(dbh, { username: 'viewer', role: 'viewer' });
  });

  it('editor creates a page with an auto-generated unique slug; get by slug works', async () => {
    const ed = callerFor(dbh, editor).caller;
    const page = await ed.pages.create({ title: 'My Test Page', content: '# Hi\n\nbody', category: 'Guides', tags: ['alpha'] });
    expect(page.slug).toBe('my-test-page');

    const got = await callerFor(dbh, null).caller.pages.get({ slug: 'my-test-page' });
    expect(got.title).toBe('My Test Page');
    expect(got.category).toBe('Guides');
    expect(got.tags).toContain('alpha');
    expect(got.revisionCount).toBe(1); // creation is recorded as the first revision

    // Duplicate title -> distinct slug.
    const page2 = await ed.pages.create({ title: 'My Test Page', content: 'x' });
    expect(page2.slug).toBe('my-test-page-2');
  });

  it('viewer cannot create a page (editor role gate)', async () => {
    const vw = callerFor(dbh, viewer).caller;
    await expect(vw.pages.create({ title: 'Nope', content: 'x' })).rejects.toThrow(/role/i);
  });

  it('anonymous cannot create a page (auth gate)', async () => {
    const anon = callerFor(dbh, null).caller;
    await expect(anon.pages.create({ title: 'Nope', content: 'x' })).rejects.toThrow(/logged in/i);
  });

  it('creates a revision snapshot on every save (create + each update)', async () => {
    const ed = callerFor(dbh, editor).caller;
    await ed.pages.create({ title: 'Rev Page', content: 'v1' });
    await ed.pages.update({ slug: 'rev-page', content: 'v2', editSummary: 'second pass' });
    await ed.pages.update({ slug: 'rev-page', content: 'v3' });

    const pub = callerFor(dbh, null).caller;
    const got = await pub.pages.get({ slug: 'rev-page' });
    expect(got.content).toBe('v3');

    const revs = await pub.pages.getRevisions({ slug: 'rev-page' });
    expect(revs.length).toBe(3); // one revision per save: v1, v2, v3
    expect(revs[0].editedBy).toBe('editor'); // newest first
    expect(revs[0].number).toBe(3);
    expect(revs[revs.length - 1].number).toBe(1);
  });

  it('admin can roll a page back to a prior revision', async () => {
    const ad = callerFor(dbh, admin).caller;
    await ad.pages.create({ title: 'RB', content: 'original' });
    await ad.pages.update({ slug: 'rb', content: 'changed' });

    const revs = await ad.pages.getRevisions({ slug: 'rb' });
    expect(revs.length).toBe(2); // one revision per save: 'original' then 'changed'
    const original = revs[revs.length - 1]; // oldest = the creation revision
    const rev = await ad.pages.getRevision({ id: original.id });
    expect(rev.content).toBe('original');

    await ad.pages.rollback({ revisionId: original.id });
    const got = await callerFor(dbh, null).caller.pages.get({ slug: 'rb' });
    expect(got.content).toBe('original');
  });

  it('editor cannot delete; admin soft-deletes (unpublish)', async () => {
    const ed = callerFor(dbh, editor).caller;
    await ed.pages.create({ title: 'Del', content: 'x' });
    await expect(ed.pages.delete({ slug: 'del' })).rejects.toThrow(/role/i);

    const ad = callerFor(dbh, admin).caller;
    await ad.pages.delete({ slug: 'del' });
    await expect(callerFor(dbh, null).caller.pages.get({ slug: 'del' })).rejects.toThrow(/not found/i);

    // Privileged users can still see unpublished pages via list.
    const adminList = await ad.pages.list({ includeUnpublished: true });
    expect(adminList.items.some((p) => p.slug === 'del')).toBe(true);
  });

  it('protected pages are admin-only to edit', async () => {
    const ad = callerFor(dbh, admin).caller;
    await ad.pages.create({ title: 'Locked', content: 'x', isProtected: true });
    const ed = callerFor(dbh, editor).caller;
    await expect(ed.pages.update({ slug: 'locked', content: 'y' })).rejects.toThrow(/protected/i);
    const ok = await ad.pages.update({ slug: 'locked', content: 'y' });
    expect(ok.content).toBe('y');
  });

  it('list filters by category and only returns published pages to the public', async () => {
    const ad = callerFor(dbh, admin).caller;
    await ad.pages.create({ title: 'G1', content: 'a', category: 'Guides' });
    await ad.pages.create({ title: 'C1', content: 'b', category: 'Combat' });
    await ad.pages.create({ title: 'Hidden', content: 'c', category: 'Guides', isPublished: false });

    const pub = callerFor(dbh, null).caller;
    const guides = await pub.pages.list({ category: 'Guides' });
    expect(guides.items.map((p) => p.slug).sort()).toEqual(['g1']);
  });
});
