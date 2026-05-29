/**
 * Password hashing — bcrypt only, never plaintext (AUDIT §5 fix).
 * Uses `bcryptjs` (pure JS) so there is no native build step on any platform.
 */
import bcrypt from 'bcryptjs';

const COST = 10;

/**
 * A valid bcrypt hash that never matches a real password. Used by login to run
 * a comparison even when the username is unknown, so response time does not
 * reveal whether an account exists.
 */
export const DUMMY_HASH = bcrypt.hashSync('archlight-login-timing-guard', COST);

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, COST);
}

export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
