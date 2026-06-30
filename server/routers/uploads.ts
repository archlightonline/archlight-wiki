import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { and, eq, gte, sql } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { router, protectedProcedure } from '../trpc/trpc';
import { uploads } from '../db/schema';
import { createPresignedUpload } from '../lib/storage';

/**
 * Image upload — presigned-URL flow. The client asks for a presigned PUT URL,
 * uploads the file directly to R2, then embeds the returned public URL. The
 * server never receives the bytes.
 *
 * ACCESS: any authenticated user (protectedProcedure) — viewers can upload within
 * the contribution flow. Viewers (the less-trusted tier) are RATE-LIMITED below;
 * editors/admins (trusted) are not. Every issued upload is recorded in the
 * `uploads` table (durable count for the limit; groundwork for orphan cleanup).
 *
 * SECURITY — what is enforced where:
 *   • size: the declared size is checked here (<= 5 MB) and that exact value is
 *     signed as Content-Length into the PUT, so R2 rejects a body that doesn't
 *     match — the size ceiling is enforced at R2, not merely client-declared.
 *   • object key + extension: generated server-side (uploads/<uuid>.<ext>) and
 *     signed into the URL; the client cannot change them.
 *   • content-type: validated against the allowlist HERE, before signing, as a
 *     first gate.
 *   • rate: viewers are capped per hour/day (and per-day total bytes); see below.
 *
 * ACCEPTED RESIDUAL RISK (known — not an oversight):
 *   The content-type allowlist is NOT enforced at the R2 upload itself. The AWS
 *   S3 presigner excludes content-type from the SigV4 signature by default, so a
 *   caller could request a URL for an allowed type (e.g. image/png) and then PUT
 *   bytes of a different type. This risk is UNCHANGED by opening the gate to
 *   viewers, and is still accepted because:
 *     - uploads remain authenticated (protectedProcedure) and viewer-rate-limited;
 *     - the file extension is fixed by the server-signed key, so the object is
 *       always served under an image extension; and
 *     - page content is sanitized at render time (DOMPurify) — the mitigating
 *       control against a mismatched payload.
 *   Post-upload content validation is intentionally NOT added.
 */

/** Allowed image content-types → safe file extension. SVG is intentionally
 *  excluded (it can carry scripts). The extension is derived from the validated
 *  content-type, never from the user's filename, to avoid extension injection. */
const ALLOWED_TYPES: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const PRESIGN_TTL_SECONDS = 300; // 5 minutes

// Viewer upload rate limits (tunable). Editors/admins are exempt. Sliding windows
// counted from the durable `uploads` table, so they survive restarts/redeploys.
const VIEWER_UPLOADS_PER_HOUR = 5;
const VIEWER_UPLOADS_PER_DAY = 15;
// Secondary defense-in-depth bound. At the current count caps the daily storage is
// already bounded (15 × 5 MB = 75 MB), so this only binds if the count caps are
// raised — it keeps storage bounded under future tuning.
const VIEWER_BYTES_PER_DAY = 100 * 1024 * 1024; // ~100 MB/day
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

// Arbitrary namespace for this subsystem's Postgres advisory locks. The viewer
// rate-limit lock is pg_advisory_xact_lock(UPLOAD_LOCK_NS, userId) — the two-int
// form keeps upload locks from colliding with any future advisory lock keyed by
// userId alone.
const UPLOAD_LOCK_NS = 4271;

export const uploadsRouter = router({
  /**
   * Issue a short-lived presigned PUT URL for a validated image. Any authenticated
   * user; viewers are rate-limited (editors/admins are not). Records the upload.
   *
   * CONCURRENCY: the viewer limit is a count-then-insert, which would race if two
   * same-user requests both read the pre-limit count before either inserts. The
   * whole check+sign+record runs in ONE transaction that first takes a Postgres
   * advisory xact lock keyed by userId — so concurrent same-user requests
   * serialize, each seeing the prior one's committed row, and a viewer cannot
   * burst past the caps. Different users hash to different lock keys and never
   * block each other. The lock auto-releases at transaction end.
   */
  createUploadUrl: protectedProcedure
    .input(
      z.object({
        filename: z.string().trim().min(1).max(255),
        contentType: z.string().trim().min(1).max(100),
        size: z.number().int().positive(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const ext = ALLOWED_TYPES[input.contentType];
      if (!ext) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Unsupported image type. Allowed: PNG, JPEG, WebP, GIF.',
        });
      }
      if (input.size > MAX_BYTES) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Image is too large. Maximum size is 5 MB.',
        });
      }

      const userId = ctx.user.id;
      const role = ctx.user.role;
      // Unique, safe key — never uses the raw user filename.
      const key = `uploads/${randomUUID()}.${ext}`;

      return await ctx.db.transaction(async (tx) => {
        // Serialize concurrent same-user requests so the count below already
        // reflects any concurrently-committed upload. (PGlite is single-connection
        // so this is uncontended in tests/dev; the serialization matters on real
        // Postgres in production. Both support pg_advisory_xact_lock — PGlite is
        // real PostgreSQL compiled to WASM.)
        await tx.execute(sql`SELECT pg_advisory_xact_lock(${UPLOAD_LOCK_NS}, ${userId})`);

        // Viewer rate limit (editors/admins are trusted — skipped). Over any cap →
        // throw, which rolls back the tx: no URL signed, no row recorded.
        if (role === 'viewer') {
          const now = Date.now();
          const hourAgo = new Date(now - HOUR_MS);
          const dayAgo = new Date(now - DAY_MS);

          const [{ c: hourCount }] = await tx
            .select({ c: sql<number>`count(*)::int` })
            .from(uploads)
            .where(and(eq(uploads.userId, userId), gte(uploads.createdAt, hourAgo)));
          if (hourCount >= VIEWER_UPLOADS_PER_HOUR) {
            throw new TRPCError({
              code: 'TOO_MANY_REQUESTS',
              message: `Upload limit reached (${VIEWER_UPLOADS_PER_HOUR} per hour). Please try again later.`,
            });
          }

          const [day] = await tx
            .select({
              c: sql<number>`count(*)::int`,
              bytes: sql<number>`coalesce(sum(${uploads.size}), 0)::bigint`,
            })
            .from(uploads)
            .where(and(eq(uploads.userId, userId), gte(uploads.createdAt, dayAgo)));
          if (day.c >= VIEWER_UPLOADS_PER_DAY) {
            throw new TRPCError({
              code: 'TOO_MANY_REQUESTS',
              message: `Daily upload limit reached (${VIEWER_UPLOADS_PER_DAY} per day). Please try again tomorrow.`,
            });
          }
          if (Number(day.bytes) + input.size > VIEWER_BYTES_PER_DAY) {
            throw new TRPCError({
              code: 'TOO_MANY_REQUESTS',
              message: 'Daily upload size limit reached. Please try again tomorrow.',
            });
          }
        }

        // Sign the presigned PUT. Local crypto (no network / no R2 state), so it's
        // fine to hold the lock across it. ContentLength is signed, so R2 rejects a
        // body that doesn't match the server-capped (<= 5 MB) size. A signing
        // failure throws → tx rolls back → no row recorded.
        let signed: { uploadUrl: string; publicUrl: string };
        try {
          signed = await createPresignedUpload({
            key,
            contentType: input.contentType,
            contentLength: input.size,
            expiresInSeconds: PRESIGN_TTL_SECONDS,
          });
        } catch {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Image uploads are not available right now.',
          });
        }

        // Record the issued upload INSIDE the tx, so it commits before the lock is
        // released and the next serialized same-user request counts it. All roles
        // recorded (durable rate-limit backing + object inventory for cleanup).
        await tx.insert(uploads).values({ userId, key, contentType: input.contentType, size: input.size });

        return { uploadUrl: signed.uploadUrl, publicUrl: signed.publicUrl, key, expiresInSeconds: PRESIGN_TTL_SECONDS };
      });
    }),
});
