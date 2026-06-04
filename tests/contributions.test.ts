import { describe, it, expect, beforeEach } from 'vitest';
import type { Database } from '../server/db';
import type { User } from '../server/db/schema';
import { makeTestDb, callerFor, seedUser } from './helpers';

describe('contributions', () => {
  let dbh: Database;
  let admin: User;
  let editor: User;
  let viewer: User;

  beforeEach(async () => {
    dbh = await makeTestDb();
    admin = await seedUser(dbh, { username: 'admin', role: 'admin' });
    editor = await seedUser(dbh, { username: 'editor', role: 'editor' });
    viewer = await seedUser(dbh, { username: 'viewer', role: 'viewer' });
    await callerFor(dbh, admin).caller.pages.create({ title: 'Contrib Page', content: 'original content' });
  });

  it('a viewer can submit a proposed edit', async () => {
    const vw = callerFor(dbh, viewer).caller;
    const c = await vw.contributions.submit({ slug: 'contrib-page', proposedContent: 'improved content', note: 'typo fix' });
    expect(c.status).toBe('pending');
    expect(c.contributorId).toBe(viewer.id);
  });

  it('an editor reviews; approval applies the edit and records a revision', async () => {
    const vw = callerFor(dbh, viewer).caller;
    const c = await vw.contributions.submit({ slug: 'contrib-page', proposedContent: 'improved content' });

    const ed = callerFor(dbh, editor).caller;
    const pending = await ed.contributions.list({ status: 'pending' });
    expect(pending.length).toBe(1);
    expect(pending[0].contributor).toBe('viewer');

    const reviewed = await ed.contributions.review({ id: c.id, decision: 'approved', note: 'looks good' });
    expect(reviewed.status).toBe('approved');
    expect(reviewed.reviewedBy).toBe(editor.id);

    const got = await callerFor(dbh, null).caller.pages.get({ slug: 'contrib-page' });
    expect(got.content).toBe('improved content');
    expect(got.revisionCount).toBe(2); // creation revision + old content snapshotted on approval
  });

  it('rejection records the decision without changing the page', async () => {
    const vw = callerFor(dbh, viewer).caller;
    const c = await vw.contributions.submit({ slug: 'contrib-page', proposedContent: 'spam' });
    const ed = callerFor(dbh, editor).caller;
    const reviewed = await ed.contributions.review({ id: c.id, decision: 'rejected', note: 'not helpful' });
    expect(reviewed.status).toBe('rejected');
    const got = await callerFor(dbh, null).caller.pages.get({ slug: 'contrib-page' });
    expect(got.content).toBe('original content');
  });

  it('a viewer cannot list or review contributions (editor role gate)', async () => {
    const vw = callerFor(dbh, viewer).caller;
    await expect(vw.contributions.list({ status: 'pending' })).rejects.toThrow(/role/i);
    await expect(vw.contributions.review({ id: 1, decision: 'approved' })).rejects.toThrow(/role/i);
  });

  it('an already-reviewed contribution cannot be reviewed again', async () => {
    const vw = callerFor(dbh, viewer).caller;
    const c = await vw.contributions.submit({ slug: 'contrib-page', proposedContent: 'x' });
    const ed = callerFor(dbh, editor).caller;
    await ed.contributions.review({ id: c.id, decision: 'approved' });
    await expect(ed.contributions.review({ id: c.id, decision: 'rejected' })).rejects.toThrow(/already/i);
  });
});
