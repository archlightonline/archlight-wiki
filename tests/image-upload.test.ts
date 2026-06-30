import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  uploadImageFile,
  imageFilesFrom,
  parseDataUrl,
  dataUrlToImageFile,
  DATA_URI_IMAGE_RE,
  ALLOWED_UPLOAD_TYPES,
  MAX_UPLOAD_BYTES,
} from '../client/src/components/imageUpload';

// A minimal File-like stand-in (the uploader only reads name/type/size and hands
// the object to fetch as the body — no real File needed for these unit tests).
const fakeFile = (over: Partial<{ name: string; type: string; size: number }> = {}) =>
  ({ name: 'shot.png', type: 'image/png', size: 1234, ...over }) as unknown as File;

afterEach(() => {
  vi.restoreAllMocks();
});

describe('uploadImageFile', () => {
  it('rejects an unsupported type before requesting a URL', async () => {
    const onError = vi.fn();
    const mutateAsync = vi.fn();
    const url = await uploadImageFile(fakeFile({ type: 'image/svg+xml' }), { mutateAsync, onError });
    expect(url).toBeNull();
    expect(mutateAsync).not.toHaveBeenCalled();
    expect(onError).toHaveBeenLastCalledWith(expect.stringMatching(/unsupported image type/i));
  });

  it('rejects an oversized file before requesting a URL', async () => {
    const onError = vi.fn();
    const mutateAsync = vi.fn();
    const url = await uploadImageFile(fakeFile({ size: MAX_UPLOAD_BYTES + 1 }), { mutateAsync, onError });
    expect(url).toBeNull();
    expect(mutateAsync).not.toHaveBeenCalled();
    expect(onError).toHaveBeenLastCalledWith(expect.stringMatching(/too large/i));
  });

  it('uploads via presigned PUT and returns the public URL on success', async () => {
    const onError = vi.fn();
    const onUploading = vi.fn();
    const mutateAsync = vi.fn().mockResolvedValue({ uploadUrl: 'https://r2/put', publicUrl: 'https://cdn/img.png' });
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);

    const url = await uploadImageFile(fakeFile(), { mutateAsync, onError, onUploading });

    expect(url).toBe('https://cdn/img.png');
    expect(mutateAsync).toHaveBeenCalledWith({ filename: 'shot.png', contentType: 'image/png', size: 1234 });
    expect(fetchMock).toHaveBeenCalledWith('https://r2/put', expect.objectContaining({ method: 'PUT' }));
    expect(onError).toHaveBeenCalledWith(null); // cleared, never set to a message
    expect(onUploading).toHaveBeenNthCalledWith(1, true);
    expect(onUploading).toHaveBeenLastCalledWith(false);
  });

  it('surfaces a failed PUT through onError and returns null', async () => {
    const onError = vi.fn();
    const mutateAsync = vi.fn().mockResolvedValue({ uploadUrl: 'https://r2/put', publicUrl: 'https://cdn/img.png' });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 413 }));

    const url = await uploadImageFile(fakeFile(), { mutateAsync, onError });
    expect(url).toBeNull();
    expect(onError).toHaveBeenLastCalledWith(expect.stringMatching(/413/));
  });

  it('surfaces a rejected createUploadUrl (e.g. viewer hitting the editor gate) gracefully', async () => {
    const onError = vi.fn();
    const mutateAsync = vi.fn().mockRejectedValue(new Error('This action requires the editor role.'));
    const url = await uploadImageFile(fakeFile(), { mutateAsync, onError });
    expect(url).toBeNull();
    expect(onError).toHaveBeenLastCalledWith(expect.stringMatching(/editor role/i));
  });

  it('the allowlist excludes SVG (matches the server gate)', () => {
    expect(ALLOWED_UPLOAD_TYPES).not.toContain('image/svg+xml');
    expect(ALLOWED_UPLOAD_TYPES).toEqual(['image/png', 'image/jpeg', 'image/webp', 'image/gif']);
  });
});

describe('imageFilesFrom', () => {
  it('keeps only image/* entries and tolerates null', () => {
    const list = [fakeFile({ type: 'image/png' }), fakeFile({ type: 'text/plain' }), fakeFile({ type: 'image/gif' })] as unknown as FileList;
    expect(imageFilesFrom(list).map((f) => f.type)).toEqual(['image/png', 'image/gif']);
    expect(imageFilesFrom(null)).toEqual([]);
  });
});

describe('parseDataUrl / dataUrlToImageFile / DATA_URI_IMAGE_RE', () => {
  // 1x1 transparent PNG.
  const png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M8AAAMBAQDJ/pLvAAAAAElFTkSuQmCC';

  it('decodes a base64 data: URL to mime + bytes', () => {
    const parsed = parseDataUrl(png);
    expect(parsed?.mime).toBe('image/png');
    expect(parsed!.bytes.length).toBeGreaterThan(0);
    // PNG signature.
    expect(Array.from(parsed!.bytes.slice(0, 4))).toEqual([0x89, 0x50, 0x4e, 0x47]);
  });

  it('returns null for a non-data URL', () => {
    expect(parseDataUrl('https://example.com/a.png')).toBeNull();
  });

  it('builds an image File from a data: image URL', () => {
    const file = dataUrlToImageFile(png, 'x');
    expect(file).not.toBeNull();
    expect(file!.type).toBe('image/png');
    expect(file!.name).toBe('pasted-x.png');
    expect(file!.size).toBeGreaterThan(0);
  });

  it('refuses to build a File from a non-image data: URL', () => {
    expect(dataUrlToImageFile('data:text/plain;base64,aGk=')).toBeNull();
  });

  it('detects inline data: images in pasted HTML, but not external http images', () => {
    expect(DATA_URI_IMAGE_RE.test(`<p><img src="${png}"></p>`)).toBe(true);
    expect(DATA_URI_IMAGE_RE.test('<p><img src="https://other-site.com/x.png"></p>')).toBe(false);
  });
});
