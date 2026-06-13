/**
 * Image node with drag-to-resize handles and left/center/right alignment.
 *
 * Extends the installed @tiptap/extension-image (v3) — no new dependency. The
 * `width` (numeric attribute) and `align` (class) attributes are declared in the
 * schema with parseHTML/renderHTML so ProseMirror PRESERVES them across reloads;
 * without that, width is dropped when the editor reopens. Saved HTML therefore
 * looks like `<img src="…" width="320" class="img-center">` — a width attribute
 * and a class, not inline style — which round-trips through the server sanitizer
 * and render-time DOMPurify untouched.
 *
 * The visual editing UI (resize handles) is a ReactNodeViewRenderer NodeView,
 * from the installed @tiptap/react v3. getHTML() serializes from the schema's
 * renderHTML, not the NodeView, so the handles never leak into saved content.
 */
import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import Image from '@tiptap/extension-image';
import { ReactNodeViewRenderer, NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import {
  type ImageAlign,
  ALIGN_CLASSES,
  widthToAttr,
  widthFromAttr,
  alignToAttr,
  alignFromClass,
  clampWidth,
  MIN_IMAGE_WIDTH,
} from './imageAttrs';

function ImageNodeView({ node, updateAttributes, selected, editor }: NodeViewProps) {
  const src = node.attrs.src as string;
  const alt = (node.attrs.alt as string | null) ?? '';
  const title = (node.attrs.title as string | null) ?? undefined;
  const width = node.attrs.width as number | null;
  const align = node.attrs.align as ImageAlign | null;

  const imgRef = useRef<HTMLImageElement>(null);

  const startResize = (e: ReactPointerEvent, side: 'left' | 'right') => {
    // Desktop-pointer resize. Don't start a ProseMirror drag or text selection.
    e.preventDefault();
    e.stopPropagation();
    const img = imgRef.current;
    if (!img) return;

    const startX = e.clientX;
    const startWidth = img.getBoundingClientRect().width;
    // Max = the editable content width, so an image can't exceed 100% container.
    const container = img.closest('.ProseMirror') as HTMLElement | null;
    const maxWidth = container?.clientWidth ?? startWidth;
    // Dragging the right handle right grows; the left handle is mirrored.
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

  const showHandles = selected && editor.isEditable;

  return (
    <NodeViewWrapper
      className={`rte-img-wrap${align ? ' ' + ALIGN_CLASSES[align] : ''}${selected ? ' is-selected' : ''}`}
      data-align={align ?? undefined}
    >
      <span className="rte-img-frame">
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          title={title}
          draggable={false}
          style={{ width: width ? `${width}px` : undefined }}
        />
        {showHandles && (
          <>
            <span
              className="rte-img-handle rte-img-handle-l"
              onPointerDown={(e) => startResize(e, 'left')}
              aria-hidden="true"
            />
            <span
              className="rte-img-handle rte-img-handle-r"
              onPointerDown={(e) => startResize(e, 'right')}
              aria-hidden="true"
            />
          </>
        )}
      </span>
    </NodeViewWrapper>
  );
}

export const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => widthFromAttr(element.getAttribute('width')),
        renderHTML: (attributes) => widthToAttr(attributes.width as number | null),
      },
      align: {
        default: null,
        parseHTML: (element) => alignFromClass(element.getAttribute('class')),
        renderHTML: (attributes) => alignToAttr(attributes.align as ImageAlign | null),
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});

export { MIN_IMAGE_WIDTH };
