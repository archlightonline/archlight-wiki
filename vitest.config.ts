import { defineConfig } from 'vitest/config';

// Server/integration tests run in Node against an in-memory PGlite database
// (see tests/helpers/db.ts). No external Postgres required.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    globals: true,
    testTimeout: 30_000,
    hookTimeout: 30_000,
    fileParallelism: false, // each suite spins its own PGlite; keep memory bounded
  },
});
