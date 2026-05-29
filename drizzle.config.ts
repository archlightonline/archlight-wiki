import { defineConfig } from 'drizzle-kit';

// Used by `drizzle-kit generate` / `studio` for portability against a real Postgres
// (e.g. Manus / self-hosted) via DATABASE_URL. The authoritative local push path is
// `pnpm db:push` (scripts/db-push.mjs), which applies server/db/ddl.ts to whichever
// driver is active (PGlite locally, node-postgres when DATABASE_URL is set).
export default defineConfig({
  dialect: 'postgresql',
  schema: './server/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'postgres://localhost:5432/archlight',
  },
  verbose: true,
  strict: true,
});
