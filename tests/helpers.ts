import { createDatabase, type Database } from '../server/db';
import { appRouter } from '../server/routers';
import { createCallerFactory } from '../server/trpc/trpc';
import type { Context } from '../server/trpc/context';
import { users, type User, type Role } from '../server/db/schema';
import { hashPassword } from '../server/lib/password';

const createCaller = createCallerFactory(appRouter);

/** Fresh ephemeral in-memory PGlite per call, schema applied. No external PG. */
export async function makeTestDb(): Promise<Database> {
  const database = await createDatabase({ memory: true });
  await database.ensureSchema();
  return database;
}

export interface CallerBundle {
  caller: ReturnType<typeof createCaller>;
  /** Captures what the procedures did with the session (login/logout). */
  session: { userId: number | null; cleared: boolean };
}

/** Build a tRPC caller acting as `user` (or anonymous when null). */
export function callerFor(database: Database, user: User | null): CallerBundle {
  const session = { userId: null as number | null, cleared: false };
  const ctx: Context = {
    db: database.db,
    user,
    setSession: (id: number) => {
      session.userId = id;
    },
    clearSession: () => {
      session.cleared = true;
    },
  };
  return { caller: createCaller(ctx), session };
}

/** Insert a user directly (bypasses register validation) for role-based tests. */
export async function seedUser(
  database: Database,
  opts: { username: string; role?: Role; password?: string; email?: string; isActive?: boolean },
): Promise<User> {
  const passwordHash = await hashPassword(opts.password ?? 'password123');
  const [u] = await database.db
    .insert(users)
    .values({
      username: opts.username,
      email: opts.email ?? `${opts.username}@test.local`,
      passwordHash,
      role: opts.role ?? 'viewer',
      displayName: opts.username,
      isActive: opts.isActive ?? true,
    })
    .returning();
  return u;
}
