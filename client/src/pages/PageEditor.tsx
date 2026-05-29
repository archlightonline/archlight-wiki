import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { useAuth } from '../lib/auth';
import { Breadcrumb } from '../components/Breadcrumb';
import { Markdown } from '../components/Markdown';
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

export function PageEditor({ mode }: { mode: 'create' | 'edit' }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const utils = trpc.useUtils();

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
  const pending = create.isPending || update.isPending;
  const error = create.error || update.error;

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
          { label: mode === 'create' ? 'New page' : `Edit: ${form.title}` },
        ]}
      />
      <h1 className="page-title">{mode === 'create' ? 'New page' : 'Edit page'}</h1>

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
        <textarea
          className="textarea"
          value={form.content}
          onChange={(e) => set({ content: e.target.value })}
          placeholder="# Markdown content…"
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
        <button className="btn ghost" type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
        {mode === 'edit' && <span className="muted">Saving creates a revision snapshot.</span>}
      </div>
    </div>
  );
}
