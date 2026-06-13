/**
 * Pure (DOM-free) helpers for the resizable/alignable image node.
 *
 * These ARE the logic the Tiptap node's `parseHTML`/`renderHTML` delegate to, so
 * they encode the save→parse round-trip: `width` is stored as a numeric HTML
 * attribute (NOT inline style) and alignment as a stable class (img-left/center/
 * right). Keeping them here (no React / no @tiptap imports) lets them be unit
 * tested in the Node test environment without a DOM or new dependencies.
 */
export type ImageAlign = 'left' | 'center' | 'right';

export const ALIGN_CLASSES: Record<ImageAlign, string> = {
  left: 'img-left',
  center: 'img-center',
  right: 'img-right',
};

const CLASS_TO_ALIGN: Record<string, ImageAlign> = {
  'img-left': 'left',
  'img-center': 'center',
  'img-right': 'right',
};

/** Smallest width an image may be dragged to (px). */
export const MIN_IMAGE_WIDTH = 50;

/** renderHTML for the `width` attribute → { width: "320" } or {} when unset. */
export function widthToAttr(width: number | null | undefined): Record<string, string> {
  return width != null && Number.isFinite(width) && width > 0 ? { width: String(Math.round(width)) } : {};
}

/** parseHTML for the `width` attribute ← the element's width attribute value. */
export function widthFromAttr(value: string | null | undefined): number | null {
  if (!value) return null;
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** renderHTML for the `align` attribute → { class: "img-center" } or {} when unset. */
export function alignToAttr(align: ImageAlign | null | undefined): Record<string, string> {
  return align ? { class: ALIGN_CLASSES[align] } : {};
}

/** parseHTML for the `align` attribute ← the element's class list. */
export function alignFromClass(className: string | null | undefined): ImageAlign | null {
  if (!className) return null;
  for (const cls of className.split(/\s+/)) {
    if (CLASS_TO_ALIGN[cls]) return CLASS_TO_ALIGN[cls];
  }
  return null;
}

/** Clamp a dragged width to [MIN_IMAGE_WIDTH, max] (max = container width). */
export function clampWidth(width: number, max: number): number {
  const hi = Number.isFinite(max) && max > MIN_IMAGE_WIDTH ? max : Number.MAX_SAFE_INTEGER;
  return Math.max(MIN_IMAGE_WIDTH, Math.min(Math.round(width), hi));
}
