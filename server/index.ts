/** Server entry point: ensure schema, then listen. */
import { createApp } from './app';
import { getDatabase } from './db';

const PORT = Number(process.env.PORT ?? 3001);

async function main() {
  const database = await getDatabase();
  await database.ensureSchema();
  const app = createApp(database);
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[archlight] API listening on http://localhost:${PORT} (db: ${database.kind})`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('[archlight] failed to start:', err);
  process.exit(1);
});
