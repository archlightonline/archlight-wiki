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

/** Normalize caption text (collapse whitespace, trim). Empty → ''. */
export function cleanCaption(text: string | null | undefined): string {
  return (text ?? '').replace(/\s+/g, ' ').trim();
}

// Width presets — quick consistent sizing. They drive the SAME `width`
// attribute as drag-resize (no new mechanism). 'full' = the container width.
export type WidthPreset = 'small' | 'medium' | 'large' | 'full';

export const WIDTH_PRESETS: { name: WidthPreset; label: string; px: number | 'full' }[] = [
  { name: 'small', label: 'S', px: 240 },
  { name: 'medium', label: 'M', px: 440 },
  { name: 'large', label: 'L', px: 640 },
  { name: 'full', label: 'Full', px: 'full' },
];

/** Resolve a preset to a concrete width, clamped so it never exceeds the
 *  container (so presets stay within 100% — no overflow / no text-wrap layout). */
export function presetWidth(name: WidthPreset, containerWidth: number): number {
  const preset = WIDTH_PRESETS.find((p) => p.name === name);
  const target = !preset || preset.px === 'full' ? containerWidth : preset.px;
  return clampWidth(target, containerWidth);
}

/** A ProseMirror DOMOutputSpec-shaped array (kept @tiptap-free for testing). */
export type ImageSpec = (string | Record<string, unknown> | ImageSpec)[];

/**
 * Build the saved-HTML shape for an image node from its attributes — the exact
 * structure the node's renderHTML emits:
 *   - with a caption → `<figure class="img-center"><img …><figcaption>…</figcaption></figure>`
 *     (alignment class on the FIGURE so image + caption align as one unit), else
 *   - `<img class="img-center" …>` (bare image — current behavior, alignment on the img).
 * Pure so it's unit-testable; `imgAttrs` is the already-merged img attribute map.
 */
export function renderImageSpec(opts: {
  align: ImageAlign | null;
  caption: string | null | undefined;
  imgAttrs: Record<string, unknown>;
}): ImageSpec {
  const alignClass = opts.align ? ALIGN_CLASSES[opts.align] : null;
  const caption = cleanCaption(opts.caption);
  if (caption) {
    return ['figure', alignClass ? { class: alignClass } : {}, ['img', opts.imgAttrs], ['figcaption', {}, caption]];
  }
  if (alignClass) {
    const existing = typeof opts.imgAttrs.class === 'string' && opts.imgAttrs.class ? `${opts.imgAttrs.class} ` : '';
    return ['img', { ...opts.imgAttrs, class: `${existing}${alignClass}` }];
  }
  return ['img', opts.imgAttrs];
}
