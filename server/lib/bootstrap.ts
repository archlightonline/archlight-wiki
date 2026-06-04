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
import { users, socialLinks, worldStatus } from '../db/schema';
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

/**
 * Seed the editable topbar social links from the values that were previously
 * hardcoded in WikiLayout. Idempotent: only inserts keys that don't exist yet,
 * so admin edits are never overwritten on restart/db:push.
 */
const DEFAULT_SOCIAL_LINKS = [
  { key: 'discord', label: 'Discord', url: 'https://discord.com', icon: '💬' },
  { key: 'youtube', label: 'YouTube', url: 'https://youtube.com', icon: '▶' },
  { key: 'facebook', label: 'Facebook', url: 'https://facebook.com', icon: 'f' },
  { key: 'website', label: 'Website', url: 'https://archlightonline.com', icon: '🌐' },
];

export async function ensureSocialLinks(db: DB): Promise<void> {
  const existing = await db.select({ key: socialLinks.key }).from(socialLinks);
  const have = new Set(existing.map((r) => r.key));
  const missing = DEFAULT_SOCIAL_LINKS.filter((s) => !have.has(s.key));
  if (missing.length) await db.insert(socialLinks).values(missing);
}

/**
 * Seed the editable topbar world/server statuses from the values previously
 * hardcoded in nav.ts. Idempotent: only inserts keys that don't exist yet.
 */
const DEFAULT_WORLD_STATUS = [
  { key: 'abaldar', name: 'Abaldar', status: 'live' as const, displayName: 'Abaldar' },
  { key: 'legacy', name: 'Legacy', status: 'offline' as const, displayName: 'Legacy' },
  { key: 'hardcore', name: 'Hardcore', status: 'maintenance' as const, displayName: 'Hardcore' },
];

export async function ensureWorldStatus(db: DB): Promise<void> {
  const existing = await db.select({ key: worldStatus.key }).from(worldStatus);
  const have = new Set(existing.map((r) => r.key));
  const missing = DEFAULT_WORLD_STATUS.filter((w) => !have.has(w.key));
  if (missing.length) await db.insert(worldStatus).values(missing);
}
