/**
 * Ensures a system admin user exists (id 1 on a fresh DB). The migration sets
 * created_by/updated_by to this user.
 *
 * AUDIT §5 fix: NO hardcoded credentials. The password comes from ADMIN_PASSWORD;
 * if unset, a strong random one is generated and printed ONCE so the operator can
 * log in and change it. The hash is bcrypt — plaintext is never stored.
 */
import crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import type { DB } from '../db';
import { users } from '../db/schema';
import { hashPassword } from './password';

export async function ensureSystemAdmin(db: DB): Promise<number> {
  const [existing] = await db.select().from(users).where(eq(users.role, 'admin')).limit(1);
  if (existing) return existing.id;

  const generated = !process.env.ADMIN_PASSWORD;
  const password = process.env.ADMIN_PASSWORD || crypto.randomBytes(12).toString('base64url');
  const passwordHash = await hashPassword(password);

  const [admin] = await db
    .insert(users)
    .values({
      username: 'admin',
      email: 'admin@archlight.local',
      passwordHash,
      role: 'admin',
      displayName: 'System Admin',
    })
    .returning();

  if (generated) {
    // eslint-disable-next-line no-console
    console.log(
      `\n[bootstrap] Created system admin "admin" with a generated password:\n` +
        `            ${password}\n` +
        `[bootstrap] Set ADMIN_PASSWORD to control this, and change it after first login.\n`,
    );
  }
  return admin.id;
}
