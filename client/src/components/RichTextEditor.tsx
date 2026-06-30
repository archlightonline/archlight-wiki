import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table, TableRow, TableHeader, TableCell } from '@tiptap/extension-table';
import Placeholder from '@tiptap/extension-placeholder';
import { renderMarkdown } from '../lib/markdown';
import { trpc } from '../lib/trpc';
import { ResizableImage } from './ResizableImage';
import { Callout } from './Callout';
import { cleanPastedHtml } from './pasteCleanup';
import { CALLOUT_TYPES, CALLOUT_LABELS, type CalloutType } from './calloutTypes';
import { WIDTH_PRESETS, presetWidth } from './imageAttrs';
import {
  UPLOAD_ACCEPT,
  uploadImageFile,
  imageFilesFrom,
  dataUrlToImageFile,
  DATA_URI_IMAGE_RE,
  type UploadHandlers,
} from './imageUpload';

/**
 * Tiptap block editor. Emits HTML via `onChange`. Existing pages may still be
 * stored as Markdown, so legacy `#`-style content is converted to HTML for
 * editing; new saves are always HTML.
 */
function toInitialHtml(content: string): string {
  const trimmed = (content ?? '').trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('<')) return content; // already HTML
  return renderMarkdown(content); // legacy Markdown → HTML
}

function Btn({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`rte-btn${active ? ' active' : ''}`}
      // Keep the editor selection while clicking toolbar buttons.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor, onUploadError }: { editor: Editor; onUploadError: (msg: string | null) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const createUploadUrl = trpc.uploads.createUploadUrl.useMutation();
  const imageSelected = editor.isActive('image');
  const inTable = editor.isActive('table');

  // Existing option: embed an image by pasting a URL. Kept available.
  const addImage = () => {
    const url = window.prompt('Image URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  // New option: pick a file, get a presigned R2 URL, upload directly, embed the
  // resulting public URL — via the shared uploader (same flow paste/drop use).
  const handleFile = async (file: File) => {
    const publicUrl = await uploadImageFile(file, {
      mutateAsync: createUploadUrl.mutateAsync,
      onError: onUploadError,
      onUploading: setUploading,
    });
    if (publicUrl) editor.chain().focus().setImage({ src: publicUrl }).run();
  };

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // reset so the same file can be re-selected later
    if (file) void handleFile(file);
  };

  // Callout: insert (wraps the selection), switch type, or remove — driven by
  // built-in core commands. One <select> covers insert / type-switch / remove
  // based on whether a callout is active.
  const calloutType = (CALLOUT_TYPES.find((t) => editor.isActive('callout', { type: t })) ?? '') as CalloutType | '';
  const onCalloutChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value as CalloutType | '';
    const chain = editor.chain().focus();
    if (v === '') {
      if (editor.isActive('callout')) chain.lift('callout').run(); // unwrap
    } else if (editor.isActive('callout')) {
      chain.updateAttributes('callout', { type: v }).run(); // switch type
    } else {
      chain.wrapIn('callout', { type: v }).run(); // wrap selection
    }
  };

  // Width presets — quick consistent sizing that drives the same `width`
  // attribute as drag-resize. 'full' uses the editable content width.
  const setImagePreset = (name: Parameters<typeof presetWidth>[0]) => {
    const containerWidth = editor.view.dom.clientWidth || 800;
    editor.chain().focus().updateAttributes('image', { width: presetWidth(name, containerWidth) }).run();
  };

  const setLink = () => {
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Link URL', prev ?? '');
    if (url === null) return; // cancelled
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <>
      <div className="rte-toolbar">
        <Btn title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Btn>
        <Btn title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</Btn>
        <span className="rte-sep" aria-hidden="true" />
        <Btn title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></Btn>
        <Btn title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></Btn>
        <Btn title="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></Btn>
        <Btn title="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></Btn>
        <Btn title="Link" active={editor.isActive('link')} onClick={setLink}>🔗</Btn>
        <span className="rte-sep" aria-hidden="true" />
        <Btn title="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</Btn>
        <Btn title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</Btn>
        <Btn title="Blockquote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>❝ Quote</Btn>
        <Btn title="Code block" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>{'</>'}</Btn>
        <Btn title="Horizontal divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>— HR</Btn>
        <select
          className="rte-select"
          title="Callout box — wraps the selection; pick a type, or blank to remove"
          value={calloutType}
          onChange={onCalloutChange}
        >
          <option value="">Callout…</option>
          {CALLOUT_TYPES.map((t) => (
            <option key={t} value={t}>
              {CALLOUT_LABELS[t]}
            </option>
          ))}
        </select>
        <span className="rte-sep" aria-hidden="true" />
        <Btn title="Insert table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>▦ Table</Btn>
        <Btn title="Insert image by URL" onClick={addImage}>🖼 Image URL</Btn>
        <Btn
          title="Upload an image (PNG, JPEG, WebP, GIF — max 5 MB)"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? '⏳ Uploading…' : '⬆ Upload'}
        </Btn>
        <input
          ref={fileInputRef}
          type="file"
          accept={UPLOAD_ACCEPT}
          style={{ display: 'none' }}
          onChange={onPick}
        />
        <span className="rte-sep" aria-hidden="true" />
        <Btn
          title="Align image left"
          disabled={!imageSelected}
          active={editor.isActive('image', { align: 'left' })}
          onClick={() => editor.chain().focus().updateAttributes('image', { align: 'left' }).run()}
        >
          ⬛⬜⬜
        </Btn>
        <Btn
          title="Align image center"
          disabled={!imageSelected}
          active={editor.isActive('image', { align: 'center' })}
          onClick={() => editor.chain().focus().updateAttributes('image', { align: 'center' }).run()}
        >
          ⬜⬛⬜
        </Btn>
        <Btn
          title="Align image right"
          disabled={!imageSelected}
          active={editor.isActive('image', { align: 'right' })}
          onClick={() => editor.chain().focus().updateAttributes('image', { align: 'right' }).run()}
        >
          ⬜⬜⬛
        </Btn>
        {WIDTH_PRESETS.map((p) => (
          <Btn
            key={p.name}
            title={`Image width: ${p.name}`}
            disabled={!imageSelected}
            onClick={() => setImagePreset(p.name)}
          >
            {p.label}
          </Btn>
        ))}
        {/* Table editing — only shown while the cursor is inside a table. */}
        {inTable && (
          <>
            <span className="rte-sep" aria-hidden="true" />
            <Btn title="Add row above" onClick={() => editor.chain().focus().addRowBefore().run()}>↥ Row</Btn>
            <Btn title="Add row below" onClick={() => editor.chain().focus().addRowAfter().run()}>↧ Row</Btn>
            <Btn title="Add column before" onClick={() => editor.chain().focus().addColumnBefore().run()}>↤ Col</Btn>
            <Btn title="Add column after" onClick={() => editor.chain().focus().addColumnAfter().run()}>↦ Col</Btn>
            <Btn title="Delete row" onClick={() => editor.chain().focus().deleteRow().run()}>⌫ Row</Btn>
            <Btn title="Delete column" onClick={() => editor.chain().focus().deleteColumn().run()}>⌫ Col</Btn>
            <Btn title="Toggle header row" onClick={() => editor.chain().focus().toggleHeaderRow().run()}>⊤ Header</Btn>
            <Btn title="Delete table" onClick={() => editor.chain().focus().deleteTable().run()}>✕ Table</Btn>
          </>
        )}
      </div>
    </>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  // Track our own emitted HTML so the external-sync effect ignores echoes.
  const lastEmitted = useRef<string>('');
  // Upload errors render as a banner ABOVE the editor (not inside the content).
  const [uploadError, setUploadError] = useState<string | null>(null);
  // Busy indicator for paste/drop uploads (the toolbar button has its own).
  const [pasteUploading, setPasteUploading] = useState(false);

  // The editorProps paste/drop handlers below are captured ONCE at useEditor time,
  // so they must NOT close over the mutation/editor/callbacks directly (they'd go
  // stale). Instead they call through these refs, refreshed every render — so they
  // always use the current uploader and editor.
  const createUploadUrl = trpc.uploads.createUploadUrl.useMutation();
  const editorRef = useRef<Editor | null>(null);
  const uploaderRef = useRef<((file: File) => Promise<string | null>) | null>(null);
  useEffect(() => {
    const handlers: UploadHandlers = {
      mutateAsync: createUploadUrl.mutateAsync,
      onError: setUploadError,
      onUploading: setPasteUploading,
    };
    uploaderRef.current = (file) => uploadImageFile(file, handlers);
  });

  // Upload image files, then insert each at `pos` (or the current selection when
  // null). Sequential so multiple images keep their order.
  const uploadAndInsert = async (files: File[], pos: number | null) => {
    const ed = editorRef.current;
    const upload = uploaderRef.current;
    if (!ed || !upload) return;
    if (pos !== null) ed.chain().focus().setTextSelection(pos).run();
    for (const file of files) {
      const url = await upload(file);
      if (url) ed.chain().focus().setImage({ src: url }).run();
    }
  };

  // After a normal paste, rehost inline data: images (base64 carried in the HTML)
  // to R2, replacing each data: src with the public URL so saved content isn't
  // bloated with giant base64 strings. The bytes are already in hand — no network
  // fetch, so no CORS/SSRF surface (external http(s) images are left untouched).
  const rehostDataUriImages = async () => {
    const ed = editorRef.current;
    const upload = uploaderRef.current;
    if (!ed || !upload) return;
    const srcs = new Set<string>();
    ed.state.doc.descendants((node) => {
      const src = node.attrs?.src;
      if (node.type.name === 'image' && typeof src === 'string' && src.startsWith('data:image/')) srcs.add(src);
    });
    for (const src of srcs) {
      const file = dataUrlToImageFile(src);
      if (!file) continue;
      const url = await upload(file);
      if (!url) continue;
      // Re-scan the CURRENT doc and repoint every node still on this data: src.
      const tr = ed.state.tr;
      let changed = false;
      ed.state.doc.descendants((node, nodePos) => {
        if (node.type.name === 'image' && node.attrs?.src === src) {
          tr.setNodeMarkup(nodePos, undefined, { ...node.attrs, src: url });
          changed = true;
        }
      });
      if (changed) ed.view.dispatch(tr);
    }
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, link: { openOnClick: false } }),
      ResizableImage,
      Callout,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({ placeholder: placeholder || 'Write the page content…' }),
    ],
    editorProps: {
      // Clean pasted Word/Docs/web HTML: strip inline styles + empty wrappers so
      // pasted content conforms to the clean schema. The schema still drops
      // unknown nodes/marks; this handles allowed tags arriving with messy styling.
      transformPastedHTML: (html) => cleanPastedHtml(html),
      // Paste image BYTES (e.g. a screenshot) → upload to R2, insert the URL.
      handlePaste: (_view, event) => {
        const files = imageFilesFrom(event.clipboardData?.files);
        if (files.length > 0) {
          void uploadAndInsert(files, null);
          return true; // handled — don't also paste the raw bytes
        }
        // a′: inline data: image(s) in pasted HTML → let the default paste run,
        // then rehost them to R2 (replacing the base64 src). External http(s)
        // <img> and everything else fall through to default handling untouched.
        const html = event.clipboardData?.getData('text/html') ?? '';
        if (DATA_URI_IMAGE_RE.test(html)) {
          queueMicrotask(() => void rehostDataUriImages());
        }
        return false;
      },
      // Drop image BYTES (drag from the desktop) → upload, insert at the drop point.
      handleDrop: (view, event) => {
        const files = imageFilesFrom(event.dataTransfer?.files);
        if (files.length === 0) return false; // let ProseMirror handle non-image drops
        event.preventDefault();
        const at = view.posAtCoords({ left: event.clientX, top: event.clientY });
        void uploadAndInsert(files, at?.pos ?? null);
        return true;
      },
    },
    content: toInitialHtml(value),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      lastEmitted.current = html;
      onChange(html);
    },
  });

  // Keep the editor ref current for the (once-captured) paste/drop handlers.
  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  // Sync externally-provided content (e.g. async-loaded page content) once.
  useEffect(() => {
    if (!editor) return;
    if (value === lastEmitted.current) return; // echo of our own update
    const incoming = toInitialHtml(value);
    if (incoming !== editor.getHTML()) {
      editor.commands.setContent(incoming, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="rte">
        <div className="rte-toolbar" />
        <div className="rte-content" />
      </div>
    );
  }

  return (
    <div className="rte">
      <Toolbar editor={editor} onUploadError={setUploadError} />
      {uploadError && (
        <div className="rte-upload-error" role="alert">
          {uploadError}
        </div>
      )}
      {pasteUploading && (
        <div className="muted" role="status" aria-live="polite" style={{ padding: '6px 0', fontSize: 13 }}>
          Uploading image…
        </div>
      )}
      <EditorContent editor={editor} className="rte-content" />
    </div>
  );
}
