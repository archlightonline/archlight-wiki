/**
 * Callout / note-box block node (custom — no third-party package).
 *
 * Renders as `<div class="callout callout-note">…</div>` containing normal
 * editable block content (paragraphs/lists/etc.). The variant is stored as a
 * stable class via the `type` attribute's parseHTML/renderHTML, so it persists
 * on reload and round-trips through the server sanitizer + DOMPurify (both allow
 * div + class — no sanitization change needed).
 *
 * Node and mergeAttributes are imported from @tiptap/react, which re-exports
 * @tiptap/core (`export * from '@tiptap/core'`) — so this adds no dependency.
 *
 * No custom commands are declared: the toolbar drives the callout with the
 * built-in core commands (wrapIn / updateAttributes / lift), which avoids a
 * `declare module '@tiptap/core'` augmentation (unresolvable here since core is
 * only a transitive dependency).
 */
import { Node, mergeAttributes } from '@tiptap/react';
import { type CalloutType, DEFAULT_CALLOUT_TYPE, calloutClassAttr, typeFromClass } from './calloutTypes';

export interface CalloutOptions {
  HTMLAttributes: Record<string, unknown>;
}

export const Callout = Node.create<CalloutOptions>({
  name: 'callout',
  group: 'block',
  content: 'block+',
  defining: true,

  addOptions() {
    return { HTMLAttributes: {} };
  },

  addAttributes() {
    return {
      type: {
        default: DEFAULT_CALLOUT_TYPE,
        parseHTML: (element) => typeFromClass(element.getAttribute('class')),
        renderHTML: (attributes) => calloutClassAttr((attributes.type as CalloutType) ?? DEFAULT_CALLOUT_TYPE),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div.callout' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});
