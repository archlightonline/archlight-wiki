import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { useAuth } from '../lib/auth';
import { Breadcrumb } from '../components/Breadcrumb';
import { Markdown } from '../components/Markdown';
import { RichTextEditor } from '../components/RichTextEditor';
import { Loading, ErrorBox } from '../components/ui';

interface Form {
  title: string;
  category: string;
  subcategory: string;
  tags: string;
  content: string;
  editSummary: string;
  isProtected: boolean;
}

const EMPTY: Form = { title: '', category: '', subcategory: '', tags: '', content: '', editSummary: '', isProtected: false };

/**
 * Per-contribution-type presentation for the create editor. The Contribute page
 * deep-links here with ?type=improvement|fix|report|draft so the heading, intro,
 * and content placeholder reflect what the contributor set out to do.
 */
const TYPE_META: Record<string, { heading: string; badge: string; blurb: string; placeholder: string }> = {
  improvement: {
    heading: 'Suggest a Page Improvement',
    badge: '💡 Improvement',
    blurb: 'Share a useful improvement for a page — a missing note, clearer explanation, source location, or better example.',
    placeholder: '# Describe the improvement\n\nWhich page, and what would make it better?',
  },
  fix: {
    heading: 'Submit a Page Fix',
    badge: '✏️ Fix',
    blurb: 'Provide the actual fix — replacement text, a corrected number, or a clear step-by-step correction.',
    placeholder: '# Provide the corrected content\n\nWhat is wrong now, and what should it say instead?',
  },
  report: {
    heading: 'Report a Page Issue',
    badge: '🐛 Report',
    blurb: 'Tell us what is wrong on an existing page so an editor can act on it.',
    placeholder: '# Describe the issue\n\nWhich page, and what is wrong (wrong value, broken link, unclear step)?',
  },
  draft: {
    heading: 'Draft a Missing Page',
    badge: '📄 Draft',
    blurb: 'Create a useful starter draft for a missing quest, system, class, dungeon, profession, or item.',
    placeholder: '# Markdown content…',
  },
};

export function PageEditor({ mode }: { mode: 'create' | 'edit' }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAdmin } = useAuth();
  const utils = trpc.useUtils();

  const contribType = mode === 'create' ? searchParams.get('type') ?? '' : '';
  const typeMeta = TYPE_META[contribType];

  const existing = trpc.pages.get.useQuery({ slug: slug! }, { enabled: mode === 'edit', retry: false });
  const [form, setForm] = useState<Form>(EMPTY);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && existing.data) {
      const p = existing.data;
      setForm({
        title: p.title,
        category: p.category ?? '',
        subcategory: p.subcategory ?? '',
        tags: (p.tags ?? []).join(', '),
        content: p.content,
        editSummary: '',
        isProtected: p.isProtected,
      });
    }
  }, [existing.data?.slug]);

  const onDone = (p: { slug: string }) => {
    utils.pages.get.invalidate({ slug: p.slug });
    navigate(`/wiki/${p.slug}`);
  };
  const create = trpc.pages.create.useMutation({ onSuccess: onDone });
  const update = trpc.pages.update.useMutation({ onSuccess: onDone });
  // Archive = unpublish (admin-only, reversible). Hides the page from the wiki/
  // search but keeps it + its history; restore from Admin → Page protection.
  const archive = trpc.pages.update.useMutation({
    onSuccess: () => {
      utils.pages.list.invalidate();
      if (slug) utils.pages.get.invalidate({ slug });
      navigate('/admin/pages');
    },
  });
  const pending = create.isPending || update.isPending;
  const error = create.error || update.error || archive.error;

  const archivePage = () => {
    if (!slug) return;
    const ok = window.confirm(
      'Archive this page? It will be hidden from the wiki and search but kept and recoverable. ' +
        'You can restore it from Admin → Page protection.',
    );
    if (ok) archive.mutate({ slug, isPublished: false });
  };

  if (mode === 'edit' && existing.isLoading) return <Loading />;

  const set = (patch: Partial<Form>) => setForm((f) => ({ ...f, ...patch }));
  const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean);

  const save = () => {
    if (mode === 'create') {
      create.mutate({
        title: form.title,
        content: form.content,
        category: form.category || undefined,
        subcategory: form.subcategory || undefined,
        tags,
        isProtected: isAdmin ? form.isProtected : undefined,
      });
    } else {
      update.mutate({
        slug: slug!,
        title: form.title,
        content: form.content,
        category: form.category || null,
        subcategory: form.subcategory || null,
        tags,
        editSummary: form.editSummary || undefined,
        isProtected: isAdmin ? form.isProtected : undefined,
      });
    }
  };

  return (
    <div className="container">
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Dashboard', to: '/admin' },
          { label: mode === 'create' ? typeMeta?.heading ?? 'New page' : `Edit: ${form.title}` },
        ]}
      />
      <h1 className="page-title">{mode === 'create' ? typeMeta?.heading ?? 'New page' : 'Edit page'}</h1>
      {typeMeta && (
        <div className="editor-type-note">
          <span className="badge">{typeMeta.badge}</span>
          <span className="muted">{typeMeta.blurb}</span>
        </div>
      )}

      <div className="split">
        <label className="field">
          <span>Title</span>
          <input className="input" value={form.title} onChange={(e) => set({ title: e.target.value })} />
        </label>
        <label className="field">
          <span>Category</span>
          <input className="input" value={form.category} onChange={(e) => set({ category: e.target.value })} />
        </label>
      </div>
      <div className="split">
        <label className="field">
          <span>Subcategory</span>
          <input className="input" value={form.subcategory} onChange={(e) => set({ subcategory: e.target.value })} />
        </label>
        <label className="field">
          <span>Tags (comma-separated)</span>
          <input className="input" value={form.tags} onChange={(e) => set({ tags: e.target.value })} />
        </label>
      </div>

      <div className="toolbar">
        <button className={`tab${!preview ? ' active' : ''}`} onClick={() => setPreview(false)} type="button">
          Write
        </button>
        <button className={`tab${preview ? ' active' : ''}`} onClick={() => setPreview(true)} type="button">
          Preview
        </button>
      </div>

      {preview ? (
        <div className="card">
          <Markdown content={form.content} />
        </div>
      ) : (
        <RichTextEditor
          value={form.content}
          onChange={(html) => set({ content: html })}
          placeholder="Write the page content — use the toolbar for headings, lists, tables, and images…"
        />
      )}

      {mode === 'edit' && (
        <label className="field" style={{ marginTop: 16 }}>
          <span>Edit summary</span>
          <input
            className="input"
            value={form.editSummary}
            maxLength={200}
            placeholder="Briefly describe this change (saved with the revision)"
            onChange={(e) => set({ editSummary: e.target.value })}
          />
        </label>
      )}

      {isAdmin && (
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '12px 0' }}>
          <input type="checkbox" checked={form.isProtected} onChange={(e) => set({ isProtected: e.target.checked })} />
          <span className="muted">🛡️ Protected (admin-only edit)</span>
        </label>
      )}

      {error && <ErrorBox error={error} />}
      <div className="toolbar">
        <button className="btn primary" disabled={pending || !form.title.trim()} onClick={save}>
          {pending ? 'Saving…' : mode === 'create' ? 'Create page' : 'Save changes'}
        </button>
        <button
          className="btn ghost"
          type="button"
          onClick={() => navigate(mode === 'edit' && slug ? `/wiki/${slug}` : '/')}
        >
          Cancel
        </button>
        {mode === 'edit' && isAdmin && slug && (
          <button className="btn danger" type="button" disabled={archive.isPending} onClick={archivePage}>
            {archive.isPending ? 'Archiving…' : '🗃 Archive page'}
          </button>
        )}
        {mode === 'edit' && <span className="muted">Saving creates a revision snapshot.</span>}
      </div>
    </div>
  );
}
