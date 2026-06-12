import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the R2 storage layer so tests NEVER hit real Cloudflare R2 (no network,
// no credentials). The fake echoes the server-generated key into the URLs so we
// can assert the router built a safe key.
vi.mock('../server/lib/storage', () => ({
  createPresignedUpload: vi.fn(async ({ key, contentType }: { key: string; contentType: string }) => ({
    uploadUrl: `https://r2-presigned.test/${key}?X-Amz-Signature=fake&ct=${encodeURIComponent(contentType)}`,
    publicUrl: `https://cdn.test/${key}`,
  })),
  isR2Configured: () => true,
}));

import type { Database } from '../server/db';
import { makeTestDb, callerFor, seedUser } from './helpers';
import { createPresignedUpload } from '../server/lib/storage';

describe('uploads.createUploadUrl', () => {
  let dbh: Database;
  beforeEach(async () => {
    dbh = await makeTestDb();
    vi.clearAllMocks();
  });

  const valid = { filename: 'pic.png', contentType: 'image/png', size: 1024 };

  it('returns a well-formed key/URL for a valid image (editor)', async () => {
    const editor = await seedUser(dbh, { username: 'ed', role: 'editor' });
    const { caller } = callerFor(dbh, editor);
    const res = await caller.uploads.createUploadUrl(valid);
    expect(res.key).toMatch(/^uploads\/[0-9a-f-]{36}\.png$/);
    expect(res.publicUrl).toBe(`https://cdn.test/${res.key}`);
    expect(res.uploadUrl).toContain(res.key);
    expect(res.expiresInSeconds).toBe(300);
    // Presign called with the server-generated key + validated content type, 5-min TTL.
    expect(createPresignedUpload).toHaveBeenCalledWith(
      expect.objectContaining({ key: res.key, contentType: 'image/png', expiresInSeconds: 300 }),
    );
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

  it('allows a file exactly at the 5 MB limit', async () => {
    const editor = await seedUser(dbh, { username: 'ed7', role: 'editor' });
    const { caller } = callerFor(dbh, editor);
    const res = await caller.uploads.createUploadUrl({ filename: 'edge.png', contentType: 'image/png', size: 5 * 1024 * 1024 });
    expect(res.publicUrl).toContain('/uploads/');
  });

  it('allows an admin', async () => {
    const admin = await seedUser(dbh, { username: 'adm', role: 'admin' });
    const { caller } = callerFor(dbh, admin);
    const res = await caller.uploads.createUploadUrl(valid);
    expect(res.uploadUrl).toBeTruthy();
  });

  it('rejects a viewer (editor/admin role gate)', async () => {
    const viewer = await seedUser(dbh, { username: 'vw', role: 'viewer' });
    const { caller } = callerFor(dbh, viewer);
    await expect(caller.uploads.createUploadUrl(valid)).rejects.toThrow(/role/i);
    expect(createPresignedUpload).not.toHaveBeenCalled();
  });

  it('rejects an anonymous caller (auth gate)', async () => {
    const { caller } = callerFor(dbh, null);
    await expect(caller.uploads.createUploadUrl(valid)).rejects.toThrow(/logged in/i);
    expect(createPresignedUpload).not.toHaveBeenCalled();
  });
});
