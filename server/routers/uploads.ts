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
 * SECURITY: all limits are enforced HERE on the server. The client mirrors them
 * only for fast feedback — never trust the client.
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
        // The declared-size check above is only a fast first gate; the real cap
        // is the presigned POST's content-length-range, enforced by R2 itself.
        const { uploadUrl, fields, publicUrl } = await createPresignedUpload({
          key,
          contentType: input.contentType,
          maxBytes: MAX_BYTES,
          expiresInSeconds: PRESIGN_TTL_SECONDS,
        });
        return { uploadUrl, fields, publicUrl, key, expiresInSeconds: PRESIGN_TTL_SECONDS };
      } catch {
        // Misconfiguration / signing failure — do not leak internals.
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Image uploads are not available right now.',
        });
      }
    }),
});
