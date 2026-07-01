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
import type { Request } from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers';
import { createExpressContextFactory } from './trpc/context';
import { resolvePageMeta } from './lib/pageMeta';
import { injectMeta } from './lib/ogMeta';
import type { Database } from './db';

const SOURCE_DIR = path.resolve(process.cwd(), 'archlight_wiki_v534_concepts_static_hosts_fixed');
const CLIENT_DIST = path.resolve(process.cwd(), 'dist');

// The DB-backed page route we inject per-page OG/meta for. Other routes (/,
// /category/…, /browse, dedicated concept pages) fall through to default tags.
const WIKI_SLUG_RE = /^\/wiki\/([^/]+)\/?$/;

/**
 * Absolute https origin for og:url / og:image. Prefer PUBLIC_BASE_URL (each fork
 * sets its own); else derive from the request — requires app.set('trust proxy')
 * so req.protocol reflects X-Forwarded-Proto behind Railway's proxy (otherwise it
 * reads http).
 */
function resolveOrigin(req: Request): string {
  const env = process.env.PUBLIC_BASE_URL;
  if (env) return env.replace(/\/+$/, '');
  return `${req.protocol}://${req.get('host')}`;
}

/**
 * CSP enforcement switch. NOW ENFORCING: the blocking Content-Security-Policy
 * header is sent (not the report-only variant). The policy was validated in
 * report-only on production first — no real app resources (Google Fonts, R2
 * images/uploads, external hotlinks, editor styles) are blocked; only dead legacy
 * images and old http: references are, which is intended. Enforcing also activates
 * `upgrade-insecure-requests`, auto-upgrading any http: reference to https:.
 *
 * To revert to report-only (log-but-don't-block), set this back to `true`.
 */
const CSP_REPORT_ONLY = false;

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
  // Trust the Railway proxy so req.protocol / req.get('host') reflect the real
  // external https origin (used to build absolute og:url / og:image).
  app.set('trust proxy', true);

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
  // Static assets (JS/CSS/images incl. /og-default.png) are served by
  // express.static FIRST — they never reach the fallback, so meta injection only
  // ever touches HTML navigations.
  if (process.env.NODE_ENV === 'production' && fs.existsSync(CLIENT_DIST)) {
    app.use(express.static(CLIENT_DIST));

    // Cache the built index.html once at boot; the fallback rewrites a copy.
    const indexHtml = fs.readFileSync(path.join(CLIENT_DIST, 'index.html'), 'utf8');

    app.get(/^(?!\/(trpc|api|assets|media)).*/, async (req, res) => {
      // For a published /wiki/:slug page, inject per-page OG/meta (escaped) so
      // crawlers show a rich preview. Everything else — unknown/unpublished slug,
      // home, category, etc. — serves the default shell tags. Any lookup failure
      // falls through to the default rather than erroring the page.
      const match = WIKI_SLUG_RE.exec(req.path);
      if (match) {
        try {
          const slug = decodeURIComponent(match[1]);
          const meta = await resolvePageMeta(database.db, slug, resolveOrigin(req));
          if (meta) {
            res.type('html').send(injectMeta(indexHtml, meta));
            return;
          }
        } catch {
          // fall through to the default shell
        }
      }
      res.type('html').send(indexHtml);
    });
  }

  return app;
}
