import { useEffect, useRef, type ReactNode } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Table, TableRow, TableHeader, TableCell } from '@tiptap/extension-table';
import Placeholder from '@tiptap/extension-placeholder';
import { renderMarkdown } from '../lib/markdown';

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
  const addImage = () => {
    const url = window.prompt('Image URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
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
      <Btn title="Insert image by URL" onClick={addImage}>🖼 Image</Btn>
    </div>
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
