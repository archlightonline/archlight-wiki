import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { AddressInfo } from 'node:net';
import type { Server } from 'node:http';
import type { Database } from '../server/db';
import { makeTestDb } from './helpers';
import { createApp } from '../server/app';

/**
 * Boots the real Express app on an ephemeral port and returns the base URL +
 * server (so each test can pick the NODE_ENV it needs before createApp reads it).
 */
async function startApp(db: Database): Promise<{ server: Server; base: string }> {
  const app = createApp(db);
  const server = app.listen(0);
  await new Promise<void>((resolve) => server.once('listening', () => resolve()));
  const { port } = server.address() as AddressInfo;
  return { server, base: `http://127.0.0.1:${port}` };
}

const stop = (server: Server) => new Promise<void>((resolve) => server.close(() => resolve()));

describe('security headers', () => {
  let dbh: Database;
  let server: Server | null = null;
  const ORIGINAL_ENV = process.env.NODE_ENV;

  beforeEach(async () => {
    dbh = await makeTestDb();
  });
  afterEach(async () => {
    if (server) await stop(server);
    server = null;
    process.env.NODE_ENV = ORIGINAL_ENV;
  });

  it('sets the non-CSP security headers in ALL environments', async () => {
    process.env.NODE_ENV = 'development';
    const started = await startApp(dbh);
    server = started.server;
    const res = await fetch(`${started.base}/api/health`);

    expect(res.headers.get('x-content-type-options')).toBe('nosniff');
    expect(res.headers.get('x-frame-options')).toBe('DENY');
    expect(res.headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin');
    const hsts = res.headers.get('strict-transport-security') ?? '';
    expect(hsts).toContain('max-age=15552000');
    expect(hsts).toContain('includeSubDomains');
    // COEP / restrictive CORP must be OFF (they'd break cross-origin fonts/images).
    expect(res.headers.get('cross-origin-embedder-policy')).toBeNull();
    expect(res.headers.get('cross-origin-resource-policy')).toBeNull();
  });

  it('in production, ENFORCES the CSP (blocking header, not report-only)', async () => {
    process.env.NODE_ENV = 'production';
    const started = await startApp(dbh);
    server = started.server;
    const res = await fetch(`${started.base}/api/health`);

    const csp = res.headers.get('content-security-policy');
    expect(csp).toBeTruthy();
    // Report-only header must be ABSENT — we now block, not just report.
    expect(res.headers.get('content-security-policy-report-only')).toBeNull();

    // Spot-check the directives that keep the app working.
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self'");
    expect(csp).toContain('connect-src');
    expect(csp).toContain('https://*.r2.cloudflarestorage.com');
    expect(csp).toContain('img-src');
    expect(csp).toContain('data:');
    expect(csp).toContain('https://fonts.gstatic.com');
    expect(csp).toContain('https://fonts.googleapis.com');
    expect(csp).toContain("'unsafe-inline'"); // style-src only
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain('upgrade-insecure-requests');
  });

  it('does NOT apply any CSP in development (so Vite HMR is not constrained)', async () => {
    process.env.NODE_ENV = 'development';
    const started = await startApp(dbh);
    server = started.server;
    const res = await fetch(`${started.base}/api/health`);

    expect(res.headers.get('content-security-policy')).toBeNull();
    expect(res.headers.get('content-security-policy-report-only')).toBeNull();
    // …but the other security headers still apply in dev.
    expect(res.headers.get('x-content-type-options')).toBe('nosniff');
  });
});
