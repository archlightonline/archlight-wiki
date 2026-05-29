/**
 * Database connection — portable across drivers with no Manus lock-in.
 *
 *   • DATABASE_URL set  → node-postgres pool (production: Manus / self-hosted PG)
 *   • DATABASE_URL unset → embedded PGlite (real PostgreSQL WASM) under PGLITE_DIR
 *
 * Both expose the identical Drizzle query API and run the same ddl.ts.
 */
import { drizzle as drizzlePglite, type PgliteDatabase } from 'drizzle-orm/pglite';
import { drizzle as drizzleNodePg, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PGlite } from '@electric-sql/pglite';
import { sql } from 'drizzle-orm';
import * as schema from './schema';
import { DDL_STATEMENTS } from './ddl';

export type DB = PgliteDatabase<typeof schema> | NodePgDatabase<typeof schema>;

export interface Database {
  db: DB;
  kind: 'pglite' | 'postgres';
  ensureSchema(): Promise<void>;
  close(): Promise<void>;
}

async function applyDdl(db: DB): Promise<void> {
  for (const stmt of DDL_STATEMENTS) {
    await db.execute(sql.raw(stmt));
  }
}

export interface CreateDatabaseOptions {
  /** Explicit Postgres connection string. Falls back to DATABASE_URL env. */
  url?: string;
  /** PGlite data directory. Falls back to PGLITE_DIR env or `.pglite`. */
  pgliteDir?: string;
  /** Force an ephemeral in-memory PGlite (used by tests). */
  memory?: boolean;
}

export async function createDatabase(opts: CreateDatabaseOptions = {}): Promise<Database> {
  const url = opts.url ?? process.env.DATABASE_URL;

  if (url) {
    const { Pool } = await import('pg');
    const pool = new Pool({ connectionString: url });
    const db = drizzleNodePg(pool, { schema }) as DB;
    return {
      db,
      kind: 'postgres',
      ensureSchema: () => applyDdl(db),
      close: () => pool.end(),
    };
  }

  const dataDir = opts.memory ? undefined : opts.pgliteDir ?? process.env.PGLITE_DIR ?? '.pglite';
  const client = new PGlite(dataDir);
  const db = drizzlePglite(client, { schema }) as DB;
  return {
    db,
    kind: 'pglite',
    ensureSchema: () => applyDdl(db),
    close: () => client.close(),
  };
}

// Lazy process-wide singleton used by the running server and the scripts.
let _instance: Promise<Database> | null = null;
export function getDatabase(): Promise<Database> {
  if (!_instance) _instance = createDatabase();
  return _instance;
}

export { schema };
