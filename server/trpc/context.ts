/**
 * Request context. Deliberately decoupled from Express so procedures are unit-
 * testable: anything that issues/clears a session does so via setSession /
 * clearSession, which the Express adapter wires to HttpOnly cookies and tests
 * wire to an in-memory capture.
 */
import { parse } from 'cookie';
import { eq } from 'drizzle-orm';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import type { DB } from '../db';
import { users, type User } from '../db/schema';
import { SESSION_COOKIE, signSession, verifySession, sessionCookieOptions } from '../lib/session';

export interface Context {
  db: DB;
  user: User | null;
  /** Issue a signed session cookie for the given user. */
  setSession: (userId: number) => void;
  /** Clear the session cookie (logout). */
  clearSession: () => void;
}

async function resolveUser(db: DB, token: string | undefined): Promise<User | null> {
  const session = verifySession(token);
  if (!session) return null;
  const rows = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);
  const u = rows[0];
  return u && u.isActive ? u : null;
}

/** Builds the Express context creator, binding the active database. */
export function createExpressContextFactory(db: DB) {
  return async ({ req, res }: CreateExpressContextOptions): Promise<Context> => {
    const cookies = parse(req.headers.cookie ?? '');
    const user = await resolveUser(db, cookies[SESSION_COOKIE]);
    return {
      db,
      user,
      setSession: (userId: number) => {
        res.cookie(SESSION_COOKIE, signSession(userId), sessionCookieOptions());
      },
      clearSession: () => {
        res.clearCookie(SESSION_COOKIE, { path: '/' });
      },
    };
  };
}
