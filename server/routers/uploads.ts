import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { TRPCError } from '@trpc/server';
import { router, editorProcedure } from '../trpc/trpc';
import { createPresignedUpload } from '../lib/storage';

/**
 * Image upload — presigned-URL flow. The client asks for a presigned PUT URL,
 * uploads the file directly to R2, then embeds the returned public URL. The
 * server never receives the bytes; nothing is stored in the database.
 *
 * SECURITY — what is enforced where:
 *   • size: the declared size is checked here (<= 5 MB) and that exact value is
 *     signed as Content-Length into the PUT, so R2 rejects a body that doesn't
 *     match — the size ceiling is enforced at R2, not merely client-declared.
 *   • object key + extension: generated server-side (uploads/<uuid>.<ext>) and
 *     signed into the URL; the client cannot change them.
 *   • content-type: validated against the allowlist HERE, before signing, as a
 *     first gate.
 *
 * ACCEPTED RESIDUAL RISK (v1, known — not an oversight):
 *   The content-type allowlist is NOT enforced at the R2 upload itself. The AWS
 *   S3 presigner excludes content-type from the SigV4 signature by default, so a
 *   caller could request a URL for an allowed type (e.g. image/png) and then PUT
 *   bytes of a different type. We accept this for v1 because:
 *     - uploads are editor/admin-only (editorProcedure), not public;
 *     - the file extension is fixed by the server-signed key, so the object is
 *       always served under an image extension; and
 *     - page content is sanitized at render time (DOMPurify) — see the recon
 *       notes — which is the mitigating control against a mismatched payload.
 *   Post-upload content validation is intentionally NOT added in v1.
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

export const uploadsRouter = router({
  /** Issue a short-lived presigned PUT URL for a validated image. Editors/admins only. */
  createUploadUrl: editorProcedure
    .input(
      z.object({
        filename: z.string().trim().min(1).max(255),
        contentType: z.string().trim().min(1).max(100),
        size: z.number().int().positive(),
      }),
    )
    .mutation(async ({ input }) => {
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

      // Unique, safe key — never uses the raw user filename.
      const key = `uploads/${randomUUID()}.${ext}`;

      try {
        // The declared-size check above gates the value we SIGN. ContentLength is
        // signed into the PUT, so R2 rejects the upload unless the actual body
        // length matches this server-capped (<= 5 MB) value — real enforcement,
        // not just the client's claim.
        const { uploadUrl, publicUrl } = await createPresignedUpload({
          key,
          contentType: input.contentType,
          contentLength: input.size,
          expiresInSeconds: PRESIGN_TTL_SECONDS,
        });
        return { uploadUrl, publicUrl, key, expiresInSeconds: PRESIGN_TTL_SECONDS };
      } catch {
        // Misconfiguration / signing failure — do not leak internals.
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Image uploads are not available right now.',
        });
      }
    }),
});
