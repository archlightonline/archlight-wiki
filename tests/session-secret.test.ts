import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import type { Database } from '../server/db';
import { makeTestDb } from './helpers';
import { appConfig } from '../server/db/schema';
import { signSession, verifySession, setSessionSecret, hasEnvSessionSecret } from '../server/lib/session';
import { ensureSessionSecret } from '../server/lib/sessionSecret';

const KEY = 'session_secret';
const readStored = async (dbh: Database) =>
  dbh.db.select().from(appConfig).where(eq(appConfig.key, KEY));

describe('durable session secret', () => {
  const ORIGINAL = process.env.SESSION_SECRET;
  let dbh: Database;

  beforeEach(async () => {
    dbh = await makeTestDb();
  });
  afterEach(() => {
    if (ORIGINAL === undefined) delete process.env.SESSION_SECRET;
    else process.env.SESSION_SECRET = ORIGINAL;
  });

  it('uses SESSION_SECRET when set — env path unchanged, nothing persisted to the DB', async () => {
    process.env.SESSION_SECRET = 'x'.repeat(40);
    expect(hasEnvSessionSecret()).toBe(true);

    const { source } = await ensureSessionSecret(dbh.db);
    expect(source).toBe('env');

    // Signs + verifies under the env secret.
    const token = signSession(7);
    expect(verifySession(token)).toEqual({ userId: 7 });

    // The env path writes NOTHING to app_config.
    expect(await readStored(dbh)).toHaveLength(0);
  });

  it('persists a DB secret when SESSION_SECRET is unset, and REUSES it across a restart (deploys do not log users out)', async () => {
    delete process.env.SESSION_SECRET;
    expect(hasEnvSessionSecret()).toBe(false);

    // --- Boot #1: generate + persist the durable fallback secret. ---
    expect((await ensureSessionSecret(dbh.db)).source).toBe('db');
    const [stored1] = await readStored(dbh);
    expect(stored1.value.length).toBeGreaterThanOrEqual(16);

    // A user "logs in" before the restart.
    const token = signSession(42);
    expect(verifySession(token)).toEqual({ userId: 42 });

    // --- Simulate a naive process restart: the in-memory secret is replaced by a
    //     fresh per-process random. The pre-restart token now FAILS — this is
    //     exactly the footgun (every deploy would log everyone out). ---
    setSessionSecret(crypto.randomBytes(48).toString('hex'));
    expect(verifySession(token)).toBeNull();

    // --- Boot #2 (post-restart) re-resolves from the SAME database, which still
    //     holds the persisted secret → the pre-restart token verifies again. ---
    expect((await ensureSessionSecret(dbh.db)).source).toBe('db');
    const [stored2] = await readStored(dbh);
    expect(stored2.value).toBe(stored1.value); // same secret, NOT regenerated
    expect(verifySession(token)).toEqual({ userId: 42 }); // session survives the restart
  });

  it('is idempotent: a second boot does not regenerate or duplicate the stored secret', async () => {
    delete process.env.SESSION_SECRET;
    await ensureSessionSecret(dbh.db);
    const [a] = await readStored(dbh);
    await ensureSessionSecret(dbh.db);
    const rows = await readStored(dbh);
    expect(rows).toHaveLength(1);
    expect(rows[0].value).toBe(a.value);
  });

  it('rejects installing a too-short secret (never signs with weak key material)', () => {
    expect(() => setSessionSecret('short')).toThrow(/16 characters/i);
  });
});
