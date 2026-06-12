/**
 * Cloudflare R2 object storage (S3-compatible) — presigned-upload helper.
 *
 * The browser asks the server for a short-lived presigned PUT URL, uploads the
 * file bytes DIRECTLY to R2, then embeds the returned public URL in the page.
 * The server never receives file bytes and nothing is stored in the database.
 *
 * Configuration comes from the environment (per-module convention, like
 * session.ts): R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET,
 * R2_PUBLIC_BASE_URL. These are read here but only required when an upload URL is
 * actually generated, so importing the app without R2 configured (local dev /
 * tests) never throws.
 */
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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
  /** Short-lived presigned PUT URL the browser uploads the file to. */
  uploadUrl: string;
  /** The permanent public URL the image is served from once uploaded. */
  publicUrl: string;
}

/**
 * Generate a presigned PUT URL for `key`, bound to `contentType` (the browser
 * MUST send the same Content-Type header on the PUT or the signature fails), and
 * the matching public URL. `expiresInSeconds` defaults to 300s (5 minutes).
 *
 * Signing is local cryptography — this makes no network call to R2.
 */
export async function createPresignedUpload(opts: {
  key: string;
  contentType: string;
  expiresInSeconds?: number;
}): Promise<PresignedUpload> {
  const client = r2Client();
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: opts.key,
    ContentType: opts.contentType,
  });
  const uploadUrl = await getSignedUrl(client, command, {
    expiresIn: opts.expiresInSeconds ?? 300,
  });
  const base = (R2_PUBLIC_BASE_URL as string).replace(/\/+$/, '');
  const publicUrl = `${base}/${opts.key}`;
  return { uploadUrl, publicUrl };
}
