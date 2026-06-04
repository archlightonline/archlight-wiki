/**
 * `pnpm db:push` — applies the schema (server/db/ddl.ts) to the active database.
 *
 *   • DATABASE_URL set  → pushes to that Postgres.
 *   • DATABASE_URL unset → creates/updates the local PGlite DB under PGLITE_DIR.
 *
 * Runs under tsx (pnpm script). The register() shim also lets `node db-push.mjs`
 * work directly by enabling TypeScript imports.
 */
import { register } from 'tsx/esm/api';
register();

const { createDatabase } = await import('../server/db/index.ts');
const { ensureSystemAdmin, ensureSocialLinks } = await import('../server/lib/bootstrap.ts');

const database = await createDatabase();
console.log(`[db:push] driver: ${database.kind}`);
await database.ensureSchema();
console.log('[db:push] schema applied (tables + full-text search index).');

const adminId = await ensureSystemAdmin(database.db);
console.log(`[db:push] system admin ensured (user id ${adminId}).`);

await ensureSocialLinks(database.db);
console.log('[db:push] social links seeded.');

await database.close();
console.log('[db:push] done.');
