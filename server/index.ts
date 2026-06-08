/** Server entry point: ensure schema, seed defaults, then listen. */
import { pathToFileURL } from 'node:url';
import { createApp } from './app';
import { getDatabase, type Database } from './db';
import { ensureSystemAdmin, ensureSocialLinks, ensureWorldStatus } from './lib/bootstrap';

const PORT = Number(process.env.PORT ?? 3001);

/**
 * Seed first-boot defaults onto a fresh database. Exported so the boot path stays
 * testable: a brand-new DB must self-seed a system admin (ensureSystemAdmin) in
 * addition to the social links and world statuses — otherwise a fresh database
 * boots with an empty users table and nobody can log in.
 */
export async function seedDefaults(database: Database): Promise<void> {
  await ensureSystemAdmin(database.db);
  await ensureSocialLinks(database.db);
  await ensureWorldStatus(database.db);
}

async function main() {
  const database = await getDatabase();
  await database.ensureSchema();
  await seedDefaults(database);
  const app = createApp(database);
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[archlight] API listening on http://localhost:${PORT} (db: ${database.kind})`);
  });
}

// Only auto-start when run as the entry point (e.g. `tsx server/index.ts`); stay
// inert when imported (e.g. by tests asserting the boot sequence).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error('[archlight] failed to start:', err);
    process.exit(1);
  });
}
