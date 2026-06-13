/**
 * Pure (DOM-free) helpers for the callout node's type ↔ class mapping.
 *
 * Mirrors the image-align pattern: the callout type is stored as a stable CSS
 * class on a <div class="callout callout-note">…</div> (a div + class), which
 * round-trips through the server sanitizer and render-time DOMPurify untouched.
 * Keeping the parse/render logic here (no React / no @tiptap imports) lets it be
 * unit-tested in the Node environment.
 */
export type CalloutType = 'note' | 'tip' | 'warning' | 'important';

export const CALLOUT_TYPES: CalloutType[] = ['note', 'tip', 'warning', 'important'];

export const DEFAULT_CALLOUT_TYPE: CalloutType = 'note';

export const CALLOUT_CLASSES: Record<CalloutType, string> = {
  note: 'callout-note',
  tip: 'callout-tip',
  warning: 'callout-warning',
  important: 'callout-important',
};

export const CALLOUT_LABELS: Record<CalloutType, string> = {
  note: 'Note',
  tip: 'Tip',
  warning: 'Warning',
  important: 'Important',
};

const CLASS_TO_TYPE: Record<string, CalloutType> = {
  'callout-note': 'note',
  'callout-tip': 'tip',
  'callout-warning': 'warning',
  'callout-important': 'important',
};

/** renderHTML for the node → the full class string, e.g. "callout callout-tip". */
export function calloutClassAttr(type: CalloutType): { class: string } {
  return { class: `callout ${CALLOUT_CLASSES[type] ?? CALLOUT_CLASSES[DEFAULT_CALLOUT_TYPE]}` };
}

/** parseHTML for the node ← the element's class list (falls back to the default). */
export function typeFromClass(className: string | null | undefined): CalloutType {
  if (className) {
    for (const cls of className.split(/\s+/)) {
      if (CLASS_TO_TYPE[cls]) return CLASS_TO_TYPE[cls];
    }
  }
  return DEFAULT_CALLOUT_TYPE;
}
