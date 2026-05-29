import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Client lives in client/, builds to dist/ (gitignored). In dev, the API and the
// original static media are proxied to the Express server so the React app and
// tRPC backend run under one origin for cookies. The API target is independent
// of the client's own PORT (set VITE_API_URL to override; default :3001).
const API_TARGET = process.env.VITE_API_URL || 'http://localhost:3001';

export default defineConfig({
  root: 'client',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@server': path.resolve(__dirname, 'server'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/trpc': API_TARGET,
      '/api': API_TARGET,
      // Phase 1: original media/images served by the backend from the read-only
      // source tree so migrated image references resolve instead of 404ing.
      '/media': API_TARGET,
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
