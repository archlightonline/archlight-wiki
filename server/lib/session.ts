/**
 * Stateless, HMAC-signed session tokens carried in an HttpOnly cookie.
 *
 * AUDIT §5 fixes: tokens are signed server-side (cannot be forged from the
 * console), delivered as HttpOnly + SameSite=Lax cookies (never readable by JS),
 * and the signing secret comes from SESSION_SECRET (no hardcoded secret).
 */
import crypto from 'node:crypto';

export const SESSION_COOKIE = 'archlight_session';
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
export const MIN_SECRET_LENGTH = 16;

/** The SESSION_SECRET env value iff present and long enough — else null. */
function envSecret(): string | null {
  const s = process.env.SESSION_SECRET;
  return s && s.length >= MIN_SECRET_LENGTH ? s : null;
}

// The resolved HMAC signing secret — the SINGLE source of key material for all
// sign/verify calls. Initialized to the env secret if set, else a per-process
// random so the module is always usable (e.g. unit tests that don't run boot).
//
// IMPORTANT: at server boot, ensureSessionSecret() (server/lib/sessionSecret.ts)
// replaces a missing-env value with a DURABLE, DB-persisted secret via
// setSessionSecret() — so restarts/redeploys don't rotate the key and log users
// out. The secret is never exported, never logged, never sent to the client.
let secret: string = envSecret() ?? crypto.randomBytes(48).toString('hex');

/** True when a valid SESSION_SECRET env var is set (the recommended path). */
export function hasEnvSessionSecret(): boolean {
  return envSecret() !== null;
}

/**
 * Replace the signing secret with a resolved durable value (env or DB-persisted).
 * Called once at boot by ensureSessionSecret(). Rejects too-short key material so
 * we never sign with a weak secret. This changes WHERE the secret comes from; the
 * HMAC sign/verify logic below is unchanged.
 */
export function setSessionSecret(value: string): void {
  if (!value || value.length < MIN_SECRET_LENGTH) {
    throw new Error('Refusing to set a session secret shorter than 16 characters.');
  }
  secret = value;
}

export function signSession(userId: number, now: number = Date.now()): string {
  const payload = `${userId}.${now + MAX_AGE_MS}`;
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function verifySession(token: string | undefined | null): { userId: number } | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [uid, exp, sig] = parts;
  const expected = crypto.createHmac('sha256', secret).update(`${uid}.${exp}`).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  if (Date.now() > Number(exp)) return null;
  const userId = Number(uid);
  if (!Number.isInteger(userId) || userId <= 0) return null;
  return { userId };
}

/** Cookie attributes shared by set/clear. Secure only in production (localhost is http). */
export function sessionCookieOptions(): {
  httpOnly: true;
  sameSite: 'lax';
  path: '/';
  secure: boolean;
  maxAge: number;
} {
  return {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: Math.floor(MAX_AGE_MS / 1000),
  };
}
