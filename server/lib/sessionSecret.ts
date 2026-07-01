/**
 * Resolve the session-signing secret ONCE at boot, durably.
 *
 * Order:
 *   1. SESSION_SECRET env var (≥16 chars) — the recommended, stable path. Used
 *      verbatim; nothing is written to the DB.
 *   2. Otherwise, a secret PERSISTED in the app_config table: read it if present,
 *      else generate one (crypto.randomBytes) once and store it. Because it lives
 *      in the database (Railway Postgres persists across deploys), it stays stable
 *      across restarts — so sessions are NOT invalidated on every deploy, even if
 *      a fork operator never sets SESSION_SECRET.
 *
 * The resolved value is installed via setSessionSecret() and is the single secret
 * used for all sign/verify calls thereafter. The secret is stored server-side
 * ONLY — never returned to callers, never logged, never sent to the client.
 */
import crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import type { DB } from '../db';
import { appConfig } from '../db/schema';
import { hasEnvSessionSecret, setSessionSecret } from './session';

const SECRET_CONFIG_KEY = 'session_secret';

/** Resolve + install the signing secret. Returns which source was used (never the value). */
export async function ensureSessionSecret(db: DB): Promise<{ source: 'env' | 'db' }> {
  if (hasEnvSessionSecret()) {
    setSessionSecret(process.env.SESSION_SECRET as string);
    return { source: 'env' };
  }
  setSessionSecret(await readOrCreatePersistedSecret(db));
  return { source: 'db' };
}

async function readOrCreatePersistedSecret(db: DB): Promise<string> {
  const existing = await getSecret(db);
  if (existing) return existing;

  // Generate once and store. onConflictDoNothing + re-read makes this safe under
  // a concurrent-boot race: whichever INSERT wins, both processes then read the
  // same stored value.
  const generated = crypto.randomBytes(48).toString('hex');
  await db.insert(appConfig).values({ key: SECRET_CONFIG_KEY, value: generated }).onConflictDoNothing();
  return (await getSecret(db)) ?? generated;
}

async function getSecret(db: DB): Promise<string | null> {
  const [row] = await db
    .select({ value: appConfig.value })
    .from(appConfig)
    .where(eq(appConfig.key, SECRET_CONFIG_KEY))
    .limit(1);
  return row?.value ?? null;
}
