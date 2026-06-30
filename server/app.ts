/**
 * Express application factory. Separated from the listener (index.ts) so it can
 * be constructed in tests without binding a port.
 *
 * Note: the tRPC Express adapter parses request bodies itself, so we do NOT add
 * a global express.json() (which would consume the stream first).
 */
import express from 'express';
import helmet from 'helmet';
import path from 'node:path';
import fs from 'node:fs';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers';
import { createExpressContextFactory } from './trpc/context';
import type { Database } from './db';

const SOURCE_DIR = path.resolve(process.cwd(), 'archlight_wiki_v534_concepts_static_hosts_fixed');
const CLIENT_DIST = path.resolve(process.cwd(), 'dist');

/**
 * CSP enforcement switch. We currently SHIP REPORT-ONLY: the
 * Content-Security-Policy-Report-Only header logs violations to the browser
 * console but blocks nothing — so we can verify the policy doesn't break the real
 * app (Google Fonts, R2 images/uploads, external hotlinks, editor styles) before
 * enforcing.
 *
 * >>> TO ENFORCE LATER: change this single constant to `false`. <<<
 * That swaps the report-only header for the blocking Content-Security-Policy.
 */
const CSP_REPORT_ONLY = true;

/**
 * Content-Security-Policy directives. Every non-'self' allowance is required by
 * something the app legitimately loads — removing one breaks the app:
 *   • style-src fonts.googleapis.com + font-src fonts.gstatic.com → Google Fonts
 *     (Cinzel / Lora / JetBrains Mono).
 *   • style-src 'unsafe-inline' → ProseMirror/Tiptap runtime-injected <style> and
 *     inline style= attributes (inline styles can't execute JS — accepted low
 *     risk; NOT added to script-src).
 *   • img-src data: https: → external image hotlinks (allowed by design), R2
 *     images, and the editor's transient data: paste preview.
 *   • connect-src *.r2.cloudflarestorage.com → the direct browser→R2 PUT upload.
 *   • script-src stays strict 'self' (all JS is self-hosted; no inline, no eval).
 */
const CSP_DIRECTIVES = {
  defaultSrc: ["'self'"],
  baseUri: ["'self'"],
  objectSrc: ["'none'"],
  frameAncestors: ["'none'"],
  frameSrc: ["'none'"],
  scriptSrc: ["'self'"],
  connectSrc: ["'self'", 'https://*.r2.cloudflarestorage.com'],
  imgSrc: ["'self'", 'data:', 'https:'],
  fontSrc: ["'self'", 'https://fonts.gstatic.com'],
  styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  formAction: ["'self'"],
  upgradeInsecureRequests: [],
};

export function createApp(database: Database): express.Express {
  const app = express();

  // Security headers (helmet), mounted FIRST so they cover the API, static
  // assets, and every SPA response.
  //   • The CSP is PRODUCTION-GATED and REPORT-ONLY (see CSP_REPORT_ONLY): in dev
  //     it is disabled entirely so Vite HMR (inline scripts, eval, websocket) is
  //     not constrained.
  //   • The other headers (nosniff, X-Frame-Options: DENY, Referrer-Policy, HSTS)
  //     apply in ALL environments.
  //   • COEP and the restrictive same-origin CORP are DISABLED — they would block
  //     the cross-origin fonts/images we intentionally allow.
  const isProduction = process.env.NODE_ENV === 'production';
  app.use(
    helmet({
      contentSecurityPolicy: isProduction
        ? { useDefaults: false, reportOnly: CSP_REPORT_ONLY, directives: CSP_DIRECTIVES }
        : false,
      frameguard: { action: 'deny' }, // X-Frame-Options: DENY
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      hsts: { maxAge: 15552000, includeSubDomains: true },
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    }),
  );

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, db: database.kind });
  });

  // tRPC HTTP handler. Mounted at /trpc (used by the client) and also at
  // /api/trpc so the Railway healthcheck (GET /api/trpc/pages.siteStats) resolves.
  const trpc = createExpressMiddleware({
    router: appRouter,
    createContext: createExpressContextFactory(database.db),
  });
  app.use('/trpc', trpc);
  app.use('/api/trpc', trpc);

  // Serve the original (read-only) media so migrated image references that use
  // absolute /assets or /media paths resolve.
  //
  // SECURITY: only the image/media subdirectories are exposed. The old static
  // site's assets/ tree also contains legacy js/ and css/ — and js/ held files
  // with hardcoded credentials (e.g. login.js). Those must NEVER be served, so
  // we mount specific safe subdirectories instead of the whole assets/ folder.
  if (fs.existsSync(SOURCE_DIR)) {
    const assetsDir = path.join(SOURCE_DIR, 'assets');
    app.use('/assets/images', express.static(path.join(assetsDir, 'images')));
    app.use('/assets/media', express.static(path.join(assetsDir, 'media')));
    app.use('/media', express.static(path.join(assetsDir, 'media')));
  }

  // In production, serve the built SPA from dist/ with a history-API fallback.
  if (process.env.NODE_ENV === 'production' && fs.existsSync(CLIENT_DIST)) {
    app.use(express.static(CLIENT_DIST));
    app.get(/^(?!\/(trpc|api|assets|media)).*/, (_req, res) => {
      res.sendFile(path.join(CLIENT_DIST, 'index.html'));
    });
  }

  return app;
}
