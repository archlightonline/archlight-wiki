import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Table, TableRow, TableHeader, TableCell } from '@tiptap/extension-table';
import Placeholder from '@tiptap/extension-placeholder';
import { renderMarkdown } from '../lib/markdown';
import { trpc } from '../lib/trpc';

// Mirrors the server gate (server/routers/uploads.ts) for fast client feedback.
// The server remains the real authority — never trust these alone.
const UPLOAD_ACCEPT = 'image/png,image/jpeg,image/webp,image/gif';
const ALLOWED_UPLOAD_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

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

function Toolbar({ editor }: { editor: Editor }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const createUploadUrl = trpc.uploads.createUploadUrl.useMutation();

  // Existing option: embed an image by pasting a URL. Kept available.
  const addImage = () => {
    const url = window.prompt('Image URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  // New option: pick a file, get a presigned R2 URL, upload directly, embed the
  // resulting public URL. The server never receives the bytes.
  const handleFile = async (file: File) => {
    setUploadError(null);
    if (!ALLOWED_UPLOAD_TYPES.includes(file.type)) {
      setUploadError('Unsupported image type. Use PNG, JPEG, WebP, or GIF.');
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setUploadError('Image is too large (max 5 MB).');
      return;
    }
    setUploading(true);
    try {
      const { uploadUrl, publicUrl } = await createUploadUrl.mutateAsync({
        filename: file.name,
        contentType: file.type,
        size: file.size,
      });
      // Direct PUT to R2. The Content-Type must match what was signed; the
      // browser sets Content-Length to the file size, which R2 validates against
      // the signed ContentLength (so an oversized body is rejected).
      const res = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });
      if (!res.ok) throw new Error(`Upload failed (${res.status}).`);
      editor.chain().focus().setImage({ src: publicUrl }).run();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // reset so the same file can be re-selected later
    if (file) void handleFile(file);
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
        <Btn title="Link" active={editor.isActive('link')} onClick={setLink}>🔗</Btn>
        <span className="rte-sep" aria-hidden="true" />
        <Btn title="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</Btn>
        <Btn title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</Btn>
        <Btn title="Blockquote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>❝ Quote</Btn>
        <Btn title="Code block" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>{'</>'}</Btn>
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
      </div>
      {uploadError && (
        <div className="rte-upload-error" role="alert">
          {uploadError}
        </div>
      )}
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

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, link: { openOnClick: false } }),
      Image,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({ placeholder: placeholder || 'Write the page content…' }),
    ],
    content: toInitialHtml(value),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      lastEmitted.current = html;
      onChange(html);
    },
  });

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
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="rte-content" />
    </div>
  );
}
