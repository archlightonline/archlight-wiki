/**
 * Cloudflare R2 object storage (S3-compatible) — presigned-upload helper.
 *
 * The browser asks the server for a short-lived presigned POST (URL + form
 * fields), uploads the file DIRECTLY to R2 as multipart/form-data, then embeds
 * the returned public URL. The server never receives file bytes and nothing is
 * stored in the database.
 *
 * Why presigned POST (not PUT): a POST policy carries a `content-length-range`
 * condition, so R2 itself rejects an oversized body regardless of what size the
 * client claimed. A presigned PUT cannot constrain body length, so the size
 * limit would only be advisory. The policy also pins the Content-Type and key.
 *
 * Configuration comes from the environment (per-module convention, like
 * session.ts): R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET,
 * R2_PUBLIC_BASE_URL. These are read here but only required when an upload is
 * actually generated, so importing the app without R2 configured (local dev /
 * tests) never throws.
 */
import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET = process.env.R2_BUCKET;
const R2_PUBLIC_BASE_URL = process.env.R2_PUBLIC_BASE_URL;

/** True when every R2 variable is present. */
export function isR2Configured(): boolean {
  return Boolean(
    R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY && R2_BUCKET && R2_PUBLIC_BASE_URL,
  );
}

let _client: S3Client | null = null;
function r2Client(): S3Client {
  if (!isR2Configured()) {
    throw new Error(
      'R2 storage is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, ' +
        'R2_SECRET_ACCESS_KEY, R2_BUCKET and R2_PUBLIC_BASE_URL.',
    );
  }
  if (!_client) {
    _client = new S3Client({
      region: 'auto',
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID as string,
        secretAccessKey: R2_SECRET_ACCESS_KEY as string,
      },
    });
  }
  return _client;
}

export interface PresignedUpload {
  /** The multipart POST endpoint (bucket URL) the browser uploads to. */
  uploadUrl: string;
  /**
   * Form fields that MUST be appended to the multipart body (the file field is
   * appended LAST, after these). They carry the signed policy, key and
   * Content-Type — the browser cannot alter them without breaking the signature.
   */
  fields: Record<string, string>;
  /** The permanent public URL the image is served from once uploaded. */
  publicUrl: string;
}

/**
 * Generate a presigned POST for `key`, enforcing:
 *   - body size in [0, maxBytes]  (content-length-range — the REAL size cap,
 *     enforced by R2 on the actual bytes, not the client's claim), and
 *   - Content-Type === contentType (pinned in the policy).
 * `expiresInSeconds` defaults to 300s (5 minutes).
 *
 * Signing is local cryptography — this makes no network call to R2.
 */
export async function createPresignedUpload(opts: {
  key: string;
  contentType: string;
  maxBytes: number;
  expiresInSeconds?: number;
}): Promise<PresignedUpload> {
  const client = r2Client();
  const { url, fields } = await createPresignedPost(client, {
    Bucket: R2_BUCKET as string,
    Key: opts.key,
    // content-length-range is what actually caps the upload at the R2 edge.
    Conditions: [['content-length-range', 0, opts.maxBytes]],
    // Each Field is returned in the form AND pinned as an exact-match policy
    // condition, so the uploaded object's Content-Type must equal this.
    Fields: { 'Content-Type': opts.contentType },
    Expires: opts.expiresInSeconds ?? 300,
  });
  const base = (R2_PUBLIC_BASE_URL as string).replace(/\/+$/, '');
  const publicUrl = `${base}/${opts.key}`;
  return { uploadUrl: url, fields, publicUrl };
}
