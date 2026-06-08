import { describe, it, expect, beforeEach } from 'vitest';
import { eq } from 'drizzle-orm';
import type { Database } from '../server/db';
import { users } from '../server/db/schema';
import { seedDefaults } from '../server/index';
import { makeTestDb } from './helpers';

describe('boot bootstrap', () => {
  let dbh: Database;
  beforeEach(async () => {
    dbh = await makeTestDb();
  });

  it('seeds a system admin on a fresh database via the boot sequence', async () => {
    // Fresh DB: no users yet.
    const before = await dbh.db.select().from(users);
    expect(before).toHaveLength(0);

    // Run the exact seeding sequence the server runs on boot.
    await seedDefaults(dbh);

    // At least one admin must exist afterward, or nobody could ever log in.
    const admins = await dbh.db.select().from(users).where(eq(users.role, 'admin'));
    expect(admins.length).toBeGreaterThanOrEqual(1);
    expect(admins[0].role).toBe('admin');
  });

  it('is idempotent — re-running the boot sequence does not duplicate the admin', async () => {
    await seedDefaults(dbh);
    await seedDefaults(dbh);
    const admins = await dbh.db.select().from(users).where(eq(users.role, 'admin'));
    expect(admins).toHaveLength(1);
  });
});
