import { describe, it, expect, beforeEach } from 'vitest';
import type { Database } from '../server/db';
import { makeTestDb, callerFor, seedUser } from './helpers';

describe('auth', () => {
  let dbh: Database;
  beforeEach(async () => {
    dbh = await makeTestDb();
  });

  it('registers a new viewer, issues a session, and never returns the hash', async () => {
    const { caller, session } = callerFor(dbh, null);
    const user = await caller.auth.register({
      username: 'alice',
      email: 'alice@example.com',
      password: 'supersecret',
    });
    expect(user.role).toBe('viewer');
    expect(user).not.toHaveProperty('passwordHash');
    expect(session.userId).toBe(user.id);
  });

  it('logs in with the correct password', async () => {
    const seeded = await seedUser(dbh, { username: 'bob', password: 'rightpass1' });
    const { caller, session } = callerFor(dbh, null);
    const user = await caller.auth.login({ username: 'bob', password: 'rightpass1' });
    expect(user.id).toBe(seeded.id);
    expect(session.userId).toBe(seeded.id);
  });

  it('rejects login with the wrong password', async () => {
    await seedUser(dbh, { username: 'carol', password: 'rightpass1' });
    const { caller } = callerFor(dbh, null);
    await expect(caller.auth.login({ username: 'carol', password: 'WRONGPASS' })).rejects.toThrow(/invalid/i);
  });

  it('rejects login for unknown users', async () => {
    const { caller } = callerFor(dbh, null);
    await expect(caller.auth.login({ username: 'ghost', password: 'whatever1' })).rejects.toThrow(/invalid/i);
  });

  it('rejects a duplicate username on register', async () => {
    await seedUser(dbh, { username: 'dave' });
    const { caller } = callerFor(dbh, null);
    await expect(
      caller.auth.register({ username: 'dave', email: 'dave2@example.com', password: 'supersecret' }),
    ).rejects.toThrow(/taken/i);
  });

  it('logout clears the session', async () => {
    const u = await seedUser(dbh, { username: 'erin' });
    const { caller, session } = callerFor(dbh, u);
    await caller.auth.logout();
    expect(session.cleared).toBe(true);
  });

  it('updateProfile enforces https-only avatar URLs', async () => {
    const u = await seedUser(dbh, { username: 'frank' });
    const { caller } = callerFor(dbh, u);
    await expect(caller.auth.updateProfile({ avatarUrl: 'http://insecure.example/x.png' })).rejects.toThrow(/https/i);
    await expect(caller.auth.updateProfile({ avatarUrl: 'javascript:alert(1)' })).rejects.toThrow();
    const ok = await caller.auth.updateProfile({ avatarUrl: 'https://secure.example/x.png', displayName: 'Frank' });
    expect(ok.avatarUrl).toBe('https://secure.example/x.png');
    expect(ok.displayName).toBe('Frank');
  });

  it('me returns null when anonymous and the user when authed', async () => {
    expect(await callerFor(dbh, null).caller.auth.me()).toBeNull();
    const u = await seedUser(dbh, { username: 'gina' });
    const me = await callerFor(dbh, u).caller.auth.me();
    expect(me?.username).toBe('gina');
  });
});
