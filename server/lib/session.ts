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

// In production SESSION_SECRET MUST be set. In dev we fall back to a random
// per-process secret (sessions simply reset on restart — never a fixed default).
const SECRET =
  process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 16
    ? process.env.SESSION_SECRET
    : crypto.randomBytes(48).toString('hex');

if (process.env.NODE_ENV === 'production' && !process.env.SESSION_SECRET) {
  // eslint-disable-next-line no-console
  console.warn('[session] SESSION_SECRET is not set — using an ephemeral secret. Set it in production.');
}

export function signSession(userId: number, now: number = Date.now()): string {
  const payload = `${userId}.${now + MAX_AGE_MS}`;
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function verifySession(token: string | undefined | null): { userId: number } | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [uid, exp, sig] = parts;
  const expected = crypto.createHmac('sha256', SECRET).update(`${uid}.${exp}`).digest('base64url');
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
