/**
 * Express application factory. Separated from the listener (index.ts) so it can
 * be constructed in tests without binding a port.
 *
 * Note: the tRPC Express adapter parses request bodies itself, so we do NOT add
 * a global express.json() (which would consume the stream first).
 */
import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers';
import { createExpressContextFactory } from './trpc/context';
import type { Database } from './db';

const SOURCE_DIR = path.resolve(process.cwd(), 'archlight_wiki_v534_concepts_static_hosts_fixed');
const CLIENT_DIST = path.resolve(process.cwd(), 'dist');

export function createApp(database: Database): express.Express {
  const app = express();

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
