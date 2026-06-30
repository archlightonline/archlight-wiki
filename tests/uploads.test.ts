import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the R2 storage layer so tests NEVER hit real Cloudflare R2 (no network,
// no credentials). The fake returns a presigned-PUT shape (url + publicUrl) and
// echoes the server-generated key + the signed content-length into the URL so
// we can assert the router built a safe key and signed the size. Note:
// content-length IS signed; content-type is NOT signed by the S3 presigner (so
// the fake's SignedHeaders deliberately omit it).
vi.mock('../server/lib/storage', () => ({
  createPresignedUpload: vi.fn(
    async ({ key, contentLength }: { key: string; contentType: string; contentLength: number }) => ({
      uploadUrl:
        `https://r2-presigned.test/${key}` +
        `?X-Amz-SignedHeaders=content-length%3Bhost` +
        `&len=${contentLength}`,
      publicUrl: `https://cdn.test/${key}`,
    }),
  ),
  isR2Configured: () => true,
}));

import { eq } from 'drizzle-orm';
import type { Database } from '../server/db';
import { uploads as uploadsTable } from '../server/db/schema';
import { makeTestDb, callerFor, seedUser } from './helpers';
import { createPresignedUpload } from '../server/lib/storage';

describe('uploads.createUploadUrl', () => {
  let dbh: Database;
  beforeEach(async () => {
    dbh = await makeTestDb();
    vi.clearAllMocks();
  });

  const valid = { filename: 'pic.png', contentType: 'image/png', size: 1024 };

  it('returns a well-formed presigned PUT URL for a valid image (editor)', async () => {
    const editor = await seedUser(dbh, { username: 'ed', role: 'editor' });
    const { caller } = callerFor(dbh, editor);
    const res = await caller.uploads.createUploadUrl(valid);
    expect(res.key).toMatch(/^uploads\/[0-9a-f-]{36}\.png$/);
    expect(res.publicUrl).toBe(`https://cdn.test/${res.key}`);
    // Presigned PUT: a single signed URL (no multipart form fields).
    expect(res.uploadUrl).toContain(res.key);
    expect(res).not.toHaveProperty('fields');
    expect(res.expiresInSeconds).toBe(300);
    // The router passes the validated content-type and the exact declared size
    // to the signer. Only Content-Length is actually signed/enforced at R2;
    // content-type is the server-side allowlist gate (below), NOT pinned on the
    // PUT — see the accepted-residual-risk note in server/routers/uploads.ts.
    expect(createPresignedUpload).toHaveBeenCalledWith(
      expect.objectContaining({
        key: res.key,
        contentType: 'image/png',
        contentLength: valid.size,
        expiresInSeconds: 300,
      }),
    );
    expect(res.uploadUrl).toContain('content-length'); // size is signed
  });

  it('derives the extension from content-type, never the filename', async () => {
    const editor = await seedUser(dbh, { username: 'ed2', role: 'editor' });
    const { caller } = callerFor(dbh, editor);
    // Filename tries to smuggle an executable extension; key must be a clean .webp.
    const res = await caller.uploads.createUploadUrl({ filename: 'evil.php.exe', contentType: 'image/webp', size: 2048 });
    expect(res.key).toMatch(/^uploads\/[0-9a-f-]{36}\.webp$/);
    expect(res.key).not.toContain('evil');
    expect(res.key).not.toContain('exe');
  });

  it('maps each allowed image type to its safe extension', async () => {
    const editor = await seedUser(dbh, { username: 'ed3', role: 'editor' });
    const { caller } = callerFor(dbh, editor);
    const cases: Array<[string, string]> = [
      ['image/png', 'png'],
      ['image/jpeg', 'jpg'],
      ['image/webp', 'webp'],
      ['image/gif', 'gif'],
    ];
    for (const [contentType, ext] of cases) {
      const res = await caller.uploads.createUploadUrl({ filename: 'x', contentType, size: 100 });
      expect(res.key.endsWith(`.${ext}`)).toBe(true);
    }
  });

  it('rejects non-image content types (no presign issued)', async () => {
    const editor = await seedUser(dbh, { username: 'ed4', role: 'editor' });
    const { caller } = callerFor(dbh, editor);
    await expect(
      caller.uploads.createUploadUrl({ filename: 'a.pdf', contentType: 'application/pdf', size: 10 }),
    ).rejects.toThrow(/unsupported image type/i);
    await expect(
      caller.uploads.createUploadUrl({ filename: 'a.html', contentType: 'text/html', size: 10 }),
    ).rejects.toThrow(/unsupported image type/i);
    expect(createPresignedUpload).not.toHaveBeenCalled();
  });

  it('rejects SVG specifically', async () => {
    const editor = await seedUser(dbh, { username: 'ed5', role: 'editor' });
    const { caller } = callerFor(dbh, editor);
    await expect(
      caller.uploads.createUploadUrl({ filename: 'x.svg', contentType: 'image/svg+xml', size: 10 }),
    ).rejects.toThrow(/unsupported image type/i);
    expect(createPresignedUpload).not.toHaveBeenCalled();
  });

  it('rejects files larger than 5 MB (no presign issued)', async () => {
    const editor = await seedUser(dbh, { username: 'ed6', role: 'editor' });
    const { caller } = callerFor(dbh, editor);
    await expect(
      caller.uploads.createUploadUrl({ filename: 'big.png', contentType: 'image/png', size: 5 * 1024 * 1024 + 1 }),
    ).rejects.toThrow(/too large|5 ?MB/i);
    expect(createPresignedUpload).not.toHaveBeenCalled();
  });

  it('allows a file exactly at the 5 MB limit and signs that exact length', async () => {
    const editor = await seedUser(dbh, { username: 'ed7', role: 'editor' });
    const { caller } = callerFor(dbh, editor);
    const res = await caller.uploads.createUploadUrl({ filename: 'edge.png', contentType: 'image/png', size: 5 * 1024 * 1024 });
    expect(res.publicUrl).toContain('/uploads/');
    expect(createPresignedUpload).toHaveBeenCalledWith(
      expect.objectContaining({ contentLength: 5 * 1024 * 1024 }),
    );
  });

  it('allows an admin', async () => {
    const admin = await seedUser(dbh, { username: 'adm', role: 'admin' });
    const { caller } = callerFor(dbh, admin);
    const res = await caller.uploads.createUploadUrl(valid);
    expect(res.uploadUrl).toBeTruthy();
  });

  it('allows a viewer under the limit and records the upload', async () => {
    const viewer = await seedUser(dbh, { username: 'vw', role: 'viewer' });
    const { caller } = callerFor(dbh, viewer);
    const res = await caller.uploads.createUploadUrl(valid);
    expect(res.uploadUrl).toBeTruthy();
    // A durable uploads row was recorded for this user.
    const rows = await dbh.db.select().from(uploadsTable).where(eq(uploadsTable.userId, viewer.id));
    expect(rows.length).toBe(1);
    expect(rows[0].key).toBe(res.key);
    expect(rows[0].contentType).toBe('image/png');
    expect(rows[0].size).toBe(valid.size);
  });

  it('rate-limits a viewer over the hourly cap (5/h) with TOO_MANY_REQUESTS', async () => {
    const viewer = await seedUser(dbh, { username: 'vwh', role: 'viewer' });
    const { caller } = callerFor(dbh, viewer);
    // 5 succeed (the hourly cap), the 6th is rejected.
    for (let i = 0; i < 5; i++) await caller.uploads.createUploadUrl(valid);
    await expect(caller.uploads.createUploadUrl(valid)).rejects.toThrow(/upload limit reached.*hour/i);
    const rows = await dbh.db.select().from(uploadsTable).where(eq(uploadsTable.userId, viewer.id));
    expect(rows.length).toBe(5); // the rejected 6th recorded nothing
  });

  it('rate-limits a viewer over the daily cap (15/day) with TOO_MANY_REQUESTS', async () => {
    const viewer = await seedUser(dbh, { username: 'vwd', role: 'viewer' });
    // Seed 15 uploads spread over the past day (older than an hour, so the hourly
    // cap doesn't trip first) — the next one must hit the daily cap.
    const now = Date.now();
    for (let i = 0; i < 15; i++) {
      await dbh.db.insert(uploadsTable).values({
        userId: viewer.id,
        key: `uploads/seed-${i}.png`,
        contentType: 'image/png',
        size: 1024,
        createdAt: new Date(now - (90 + i) * 60 * 1000), // 1.5h–~4h ago
      });
    }
    const { caller } = callerFor(dbh, viewer);
    await expect(caller.uploads.createUploadUrl(valid)).rejects.toThrow(/daily upload limit reached/i);
  });

  it('concurrent viewer uploads cannot exceed the cap (transactional check+insert)', async () => {
    const viewer = await seedUser(dbh, { username: 'vwcc', role: 'viewer' });
    const { caller } = callerFor(dbh, viewer);
    // Fire more requests than the hourly cap "at once". The per-user advisory
    // xact lock serializes the check+insert so the recorded count can never exceed
    // the cap — no viewer bursts past it.
    const results = await Promise.allSettled(
      Array.from({ length: 8 }, () => caller.uploads.createUploadUrl(valid)),
    );
    const fulfilled = results.filter((r) => r.status === 'fulfilled').length;
    const rows = await dbh.db.select().from(uploadsTable).where(eq(uploadsTable.userId, viewer.id));

    // The invariant that matters: never more recorded uploads than the cap.
    expect(rows.length).toBeLessThanOrEqual(5);
    // Every success recorded exactly one row (no signed-but-unrecorded leaks).
    expect(fulfilled).toBe(rows.length);
    // NOTE: PGlite is single-connection, so this can't simulate TRUE parallel
    // transactions (same caveat as the contribution double-approval test). It
    // verifies the transactional check+insert holds the cap under overlapping
    // calls; the pg_advisory_xact_lock is the correct serialization mechanism on
    // production Postgres, where requests really are concurrent.
  });

  it('does NOT rate-limit an editor (trusted) even past the viewer caps, and records uploads', async () => {
    const editor = await seedUser(dbh, { username: 'edrl', role: 'editor' });
    const { caller } = callerFor(dbh, editor);
    // Well beyond the viewer hourly cap of 5 — all succeed.
    for (let i = 0; i < 8; i++) await caller.uploads.createUploadUrl(valid);
    const rows = await dbh.db.select().from(uploadsTable).where(eq(uploadsTable.userId, editor.id));
    expect(rows.length).toBe(8);
  });

  it('rejects an anonymous caller (auth gate) — no upload recorded', async () => {
    const { caller } = callerFor(dbh, null);
    await expect(caller.uploads.createUploadUrl(valid)).rejects.toThrow(/logged in/i);
    expect(createPresignedUpload).not.toHaveBeenCalled();
  });
});
