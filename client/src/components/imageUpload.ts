/**
 * Shared image-upload helper for the rich-text editor.
 *
 * The upload flow (client pre-check → presigned PUT URL via uploads.createUploadUrl
 * → direct PUT to R2 → public URL) used to live inline in the toolbar's upload
 * button. It's extracted here so the toolbar button AND the paste/drop handlers
 * all route image bytes through the SAME flow — inheriting the server-side type
 * allowlist (no SVG), the 5 MB cap, and the editorProcedure auth gate.
 *
 * No bytes ever touch our server; nothing is stored in the DB. External image
 * URLs are NOT handled here — rehosting them would require fetching arbitrary
 * URLs (CORS client-side / SSRF server-side), which is deliberately out of scope.
 */

// Mirrors the server gate (server/routers/uploads.ts) for fast client feedback.
// The server remains the real authority — never trust these alone.
export const UPLOAD_ACCEPT = 'image/png,image/jpeg,image/webp,image/gif';
export const ALLOWED_UPLOAD_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

/** The shape of trpc.uploads.createUploadUrl.useMutation().mutateAsync. */
export type CreateUploadUrl = (input: {
  filename: string;
  contentType: string;
  size: number;
}) => Promise<{ uploadUrl: string; publicUrl: string }>;

export interface UploadHandlers {
  mutateAsync: CreateUploadUrl;
  /** Surface an error message (or null to clear) — same banner the button uses. */
  onError: (msg: string | null) => void;
  /** Optional busy toggle for an uploading indicator. */
  onUploading?: (busy: boolean) => void;
}

/**
 * Validate, request a presigned URL, PUT the bytes to R2, and return the public
 * URL — or null on any failure (with onError already called). Mirrors the
 * client-side type/size pre-checks for fast feedback; the server re-validates.
 *
 * A non-editor (viewer) hits the editorProcedure gate inside mutateAsync, which
 * rejects — the error surfaces through onError exactly like the button, so
 * paste/drop fails gracefully with a clear message rather than silently.
 */
export async function uploadImageFile(file: File, h: UploadHandlers): Promise<string | null> {
  h.onError(null);
  if (!ALLOWED_UPLOAD_TYPES.includes(file.type)) {
    h.onError('Unsupported image type. Use PNG, JPEG, WebP, or GIF.');
    return null;
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    h.onError('Image is too large (max 5 MB).');
    return null;
  }
  h.onUploading?.(true);
  try {
    const { uploadUrl, publicUrl } = await h.mutateAsync({
      filename: file.name,
      contentType: file.type,
      size: file.size,
    });
    // Direct PUT to R2. Content-Length (the file size) is validated by R2 against
    // the server-signed ContentLength — the real size ceiling. See storage.ts.
    const res = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type },
    });
    if (!res.ok) throw new Error(`Upload failed (${res.status}).`);
    return publicUrl;
  } catch (err) {
    h.onError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    return null;
  } finally {
    h.onUploading?.(false);
  }
}

/** Image files (type image/*) from a FileList — used by paste/drop handlers. */
export function imageFilesFrom(list: FileList | null | undefined): File[] {
  if (!list) return [];
  return Array.from(list).filter((f) => f.type.startsWith('image/'));
}

/** Matches pasted HTML carrying at least one inline base64/data-URI image. */
export const DATA_URI_IMAGE_RE = /<img\b[^>]*\bsrc\s*=\s*["']?\s*data:image\//i;

export interface ParsedDataUrl {
  mime: string;
  bytes: Uint8Array;
}

/**
 * Decode a `data:` URL into its MIME type and raw bytes (base64 or percent-
 * encoded). Pure — no DOM — so it's unit-testable. Returns null if it isn't a
 * data: URL or can't be decoded.
 */
export function parseDataUrl(dataUrl: string): ParsedDataUrl | null {
  const m = /^data:([^;,]*)(;base64)?,([\s\S]*)$/i.exec(dataUrl);
  if (!m) return null;
  const mime = m[1] || 'application/octet-stream';
  const isBase64 = Boolean(m[2]);
  const data = m[3];
  try {
    if (isBase64) {
      const bin = atob(data);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return { mime, bytes };
    }
    return { mime, bytes: new TextEncoder().encode(decodeURIComponent(data)) };
  } catch {
    return null;
  }
}

/**
 * Turn a `data:image/...` URL into a File suitable for uploadImageFile, so inline
 * base64 images get rehosted to R2 instead of bloating saved content. Returns
 * null for non-image or undecodable data URLs (left as-is). The bytes are already
 * in hand — no network fetch, so no CORS/SSRF surface.
 */
export function dataUrlToImageFile(dataUrl: string, nameHint = 'image'): File | null {
  const parsed = parseDataUrl(dataUrl);
  if (!parsed || !parsed.mime.startsWith('image/')) return null;
  const ext = parsed.mime.split('/')[1] || 'png';
  return new File([parsed.bytes as BlobPart], `pasted-${nameHint}.${ext}`, { type: parsed.mime });
}

export type RehostOutcome = { ok: true; url: string } | { ok: false; reason: string };

/**
 * Decide what to do with one inline `data:` image: decode it, fail fast on a
 * non-image / undecodable / oversized blob (the size pre-check runs BEFORE
 * building the File or attempting an upload), then upload via `upload`.
 *
 * Pure decision logic (no DOM/editor) so it's unit-testable. The caller applies
 * the result to the document: on `ok` repoint the node's src to the R2 URL; on
 * failure REMOVE the node — never leave the base64 blob in the editor. `reason`
 * is a user-facing message for the error banner.
 */
export async function rehostDataUri(
  src: string,
  upload: (file: File) => Promise<string | null>,
): Promise<RehostOutcome> {
  const parsed = parseDataUrl(src);
  if (!parsed || !parsed.mime.startsWith('image/')) {
    return { ok: false, reason: 'A pasted image could not be decoded and was removed.' };
  }
  // Fail fast on size using the decoded byte length, before building the File.
  if (parsed.bytes.length > MAX_UPLOAD_BYTES) {
    return { ok: false, reason: 'A pasted image was too large (max 5 MB) and was removed.' };
  }
  if (!ALLOWED_UPLOAD_TYPES.includes(parsed.mime)) {
    return { ok: false, reason: 'A pasted image had an unsupported type and was removed.' };
  }
  const file = dataUrlToImageFile(src);
  if (!file) return { ok: false, reason: 'A pasted image could not be processed and was removed.' };
  const url = await upload(file);
  if (!url) return { ok: false, reason: 'A pasted image could not be uploaded and was removed.' };
  return { ok: true, url };
}
