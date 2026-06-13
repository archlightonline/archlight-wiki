/**
 * Image node with drag-to-resize handles, left/center/right alignment, and an
 * optional plain-text caption.
 *
 * Extends the installed @tiptap/extension-image (v3) — no new dependency. The
 * `width` (numeric attr), `align` (class), and `caption` (text) attributes are
 * declared in the schema with parseHTML/renderHTML so ProseMirror PRESERVES them
 * across reloads. Saved HTML is one of:
 *   - `<img src="…" width="320" class="img-center">`  (no caption), or
 *   - `<figure class="img-center"><img src="…" width="320"><figcaption>…</figcaption></figure>`
 * Both round-trip through the server sanitizer and render-time DOMPurify
 * untouched — div/figure/figcaption/img + class/width are all already allowed by
 * both, so NO sanitization change is needed (verified).
 *
 * The visual editing UI (resize handles + caption field) is a
 * ReactNodeViewRenderer NodeView. getHTML() serializes from the schema's
 * renderHTML (not the NodeView), so editor-only UI never leaks into saved HTML.
 */
import { useRef, type ChangeEvent, type PointerEvent as ReactPointerEvent } from 'react';
import Image from '@tiptap/extension-image';
import { ReactNodeViewRenderer, NodeViewWrapper, mergeAttributes, type NodeViewProps } from '@tiptap/react';
import type { DOMOutputSpec } from '@tiptap/pm/model';
import {
  type ImageAlign,
  ALIGN_CLASSES,
  widthToAttr,
  widthFromAttr,
  alignFromClass,
  cleanCaption,
  renderImageSpec,
  clampWidth,
  MIN_IMAGE_WIDTH,
} from './imageAttrs';

/** The <img> element for a matched node — the element itself, or the inner img
 *  of a matched <figure>. Lets the attribute parsers handle both shapes. */
function imgOf(el: HTMLElement): HTMLElement | null {
  return el.matches('img') ? el : el.querySelector('img');
}

function ImageNodeView({ node, updateAttributes, selected, editor }: NodeViewProps) {
  const src = node.attrs.src as string;
  const alt = (node.attrs.alt as string | null) ?? '';
  const title = (node.attrs.title as string | null) ?? undefined;
  const width = node.attrs.width as number | null;
  const align = node.attrs.align as ImageAlign | null;
  const caption = (node.attrs.caption as string | null) ?? '';

  const imgRef = useRef<HTMLImageElement>(null);

  const startResize = (e: ReactPointerEvent, side: 'left' | 'right') => {
    // Desktop-pointer resize. Don't start a ProseMirror drag or text selection.
    e.preventDefault();
    e.stopPropagation();
    const img = imgRef.current;
    if (!img) return;

    const startX = e.clientX;
    const startWidth = img.getBoundingClientRect().width;
    const container = img.closest('.ProseMirror') as HTMLElement | null;
    const maxWidth = container?.clientWidth ?? startWidth;
    const dir = side === 'right' ? 1 : -1;

    const onMove = (ev: PointerEvent) => {
      const next = clampWidth(startWidth + (ev.clientX - startX) * dir, maxWidth);
      updateAttributes({ width: next });
    };
    const stop = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', stop);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);
  };

  const onCaption = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    updateAttributes({ caption: v === '' ? null : v });
  };

  const active = selected && editor.isEditable;

  return (
    <NodeViewWrapper
      className={`rte-img-wrap${align ? ' ' + ALIGN_CLASSES[align] : ''}${selected ? ' is-selected' : ''}`}
      data-align={align ?? undefined}
    >
      <span className="rte-img-figure">
        <span className="rte-img-frame">
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            title={title}
            draggable={false}
            style={{ width: width ? `${width}px` : undefined }}
          />
          {active && (
            <>
              <span className="rte-img-handle rte-img-handle-l" onPointerDown={(e) => startResize(e, 'left')} aria-hidden="true" />
              <span className="rte-img-handle rte-img-handle-r" onPointerDown={(e) => startResize(e, 'right')} aria-hidden="true" />
            </>
          )}
        </span>
        {active ? (
          // Editable caption field (plain text). Stop events from reaching
          // ProseMirror so typing/clicks act on the input, not the document.
          <input
            className="rte-caption-input"
            placeholder="Add a caption…"
            value={caption}
            onChange={onCaption}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          />
        ) : caption ? (
          <figcaption className="rte-img-caption">{caption}</figcaption>
        ) : null}
      </span>
    </NodeViewWrapper>
  );
}

export const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      // Re-declare src/alt/title to read from the inner <img> when the matched
      // element is a <figure> (caption case).
      src: {
        default: null,
        parseHTML: (element) => imgOf(element)?.getAttribute('src') ?? null,
        renderHTML: (attributes) => (attributes.src ? { src: attributes.src } : {}),
      },
      alt: {
        default: null,
        parseHTML: (element) => imgOf(element)?.getAttribute('alt') ?? null,
        renderHTML: (attributes) => (attributes.alt ? { alt: attributes.alt } : {}),
      },
      title: {
        default: null,
        parseHTML: (element) => imgOf(element)?.getAttribute('title') ?? null,
        renderHTML: (attributes) => (attributes.title ? { title: attributes.title } : {}),
      },
      width: {
        default: null,
        parseHTML: (element) => widthFromAttr(imgOf(element)?.getAttribute('width')),
        renderHTML: (attributes) => widthToAttr(attributes.width as number | null),
      },
      align: {
        default: null,
        // Alignment class is on the outer element (figure when captioned, else img).
        parseHTML: (element) => alignFromClass(element.getAttribute('class')),
        // Placed by the node's renderHTML (on figure or img), not here.
        renderHTML: () => ({}),
      },
      caption: {
        default: null,
        parseHTML: (element) =>
          element.matches('figure') ? cleanCaption(element.querySelector('figcaption')?.textContent) || null : null,
        // Rendered into <figcaption> by the node's renderHTML, not as an attribute.
        renderHTML: () => ({}),
      },
    };
  },

  parseHTML() {
    return [
      // A <figure> that contains an <img> → a captioned (or plain) image node.
      { tag: 'figure', getAttrs: (el) => ((el as HTMLElement).querySelector('img') ? {} : false) },
      // A bare image.
      { tag: 'img[src]' },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const imgAttrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes);
    return renderImageSpec({
      align: node.attrs.align as ImageAlign | null,
      caption: node.attrs.caption as string | null,
      imgAttrs,
    }) as unknown as DOMOutputSpec;
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});

export { MIN_IMAGE_WIDTH };
