import { z } from 'zod';
import { and, asc, desc, eq, inArray, sql } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure, editorProcedure, adminProcedure } from '../trpc/trpc';
import { pages, pageRevisions, pageTags, users } from '../db/schema';
import type { Context } from '../trpc/context';
import { slugify, uniqueSlug } from '../lib/slug';
import { sanitizeContent, sanitizeText } from '../lib/sanitize';

function isPrivileged(ctx: Context): boolean {
  return !!ctx.user && (ctx.user.role === 'admin' || ctx.user.role === 'editor');
}

async function loadPageBySlug(ctx: Context, slug: string) {
  const [page] = await ctx.db.select().from(pages).where(eq(pages.slug, slug)).limit(1);
  return page ?? null;
}

/** Rows helper: drizzle's execute() returns {rows} on both pg and pglite. */
function rowsOf<T = Record<string, unknown>>(res: unknown): T[] {
  const r = res as { rows?: T[] };
  return (r.rows ?? (res as T[])) || [];
}

export const pagesRouter = router({
  list: publicProcedure
    .input(
      z
        .object({
          category: z.string().optional(),
          tag: z.string().optional(),
          page: z.number().int().min(1).default(1),
          pageSize: z.number().int().min(1).max(100).default(20),
          includeUnpublished: z.boolean().default(false),
        })
        .default({}),
    )
    .query(async ({ ctx, input }) => {
      const showUnpublished = input.includeUnpublished && isPrivileged(ctx);

      let pageIdFilter: number[] | null = null;
      if (input.tag) {
        const tagged = await ctx.db
          .select({ pid: pageTags.pageId })
          .from(pageTags)
          .where(eq(pageTags.tag, input.tag));
        pageIdFilter = tagged.map((t) => t.pid);
        if (pageIdFilter.length === 0) {
          return { items: [], total: 0, page: input.page, pageSize: input.pageSize };
        }
      }

      const conds = [];
      if (!showUnpublished) conds.push(eq(pages.isPublished, true));
      if (input.category) conds.push(eq(pages.category, input.category));
      if (pageIdFilter) conds.push(inArray(pages.id, pageIdFilter));
      const where = conds.length ? and(...conds) : undefined;

      const items = await ctx.db
        .select({
          id: pages.id,
          title: pages.title,
          slug: pages.slug,
          category: pages.category,
          subcategory: pages.subcategory,
          updatedAt: pages.updatedAt,
          isPublished: pages.isPublished,
        })
        .from(pages)
        .where(where)
        .orderBy(asc(pages.title))
        .limit(input.pageSize)
        .offset((input.page - 1) * input.pageSize);

      const [countRow] = await ctx.db
        .select({ count: sql<number>`count(*)::int` })
        .from(pages)
        .where(where);

      return { items, total: Number(countRow?.count ?? 0), page: input.page, pageSize: input.pageSize };
    }),

  /** Distinct categories with published-page counts — powers the sidebar & browser. */
  categories: publicProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db
      .select({ category: pages.category, count: sql<number>`count(*)::int` })
      .from(pages)
      .where(eq(pages.isPublished, true))
      .groupBy(pages.category)
      .orderBy(asc(pages.category));
    return rows
      .filter((r) => r.category)
      .map((r) => ({ category: r.category as string, count: Number(r.count) }));
  }),

  /** Most recently updated published pages (optionally within a category). */
  recent: publicProcedure
    .input(z.object({ category: z.string().optional(), limit: z.number().int().min(1).max(50).default(8) }).default({}))
    .query(async ({ ctx, input }) => {
      const conds = [eq(pages.isPublished, true)];
      if (input.category) conds.push(eq(pages.category, input.category));
      return ctx.db
        .select({
          id: pages.id,
          slug: pages.slug,
          title: pages.title,
          category: pages.category,
          subcategory: pages.subcategory,
          updatedAt: pages.updatedAt,
        })
        .from(pages)
        .where(and(...conds))
        .orderBy(desc(pages.updatedAt), desc(pages.id))
        .limit(input.limit);
    }),

  /** Public site-wide counts for the home page. */
  siteStats: publicProcedure.query(async ({ ctx }) => {
    const count = async (where: ReturnType<typeof eq> | undefined, table = pages) => {
      const [r] = await ctx.db.select({ c: sql<number>`count(*)::int` }).from(table as typeof pages).where(where);
      return Number(r?.c ?? 0);
    };
    const totalPages = await count(eq(pages.isPublished, true));
    const updates = await count(and(eq(pages.isPublished, true), eq(pages.category, 'Updates')));
    const [rev] = await ctx.db.select({ c: sql<number>`count(*)::int` }).from(pageRevisions);
    const [usr] = await ctx.db.select({ c: sql<number>`count(*)::int` }).from(users).where(eq(users.isActive, true));
    return { pages: totalPages, updates, revisions: Number(rev?.c ?? 0), contributors: Number(usr?.c ?? 0) };
  }),

  get: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
    const page = await loadPageBySlug(ctx, input.slug);
    if (!page || (!page.isPublished && !isPrivileged(ctx))) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Page not found.' });
    }
    const [countRow] = await ctx.db
      .select({ count: sql<number>`count(*)::int` })
      .from(pageRevisions)
      .where(eq(pageRevisions.pageId, page.id));

    let lastEditor: string | null = null;
    if (page.updatedBy) {
      const [u] = await ctx.db
        .select({ displayName: users.displayName, username: users.username })
        .from(users)
        .where(eq(users.id, page.updatedBy))
        .limit(1);
      lastEditor = u?.displayName || u?.username || null;
    }
    const tags = await ctx.db.select({ tag: pageTags.tag }).from(pageTags).where(eq(pageTags.pageId, page.id));

    return {
      ...page,
      revisionCount: Number(countRow?.count ?? 0),
      lastEditor,
      tags: tags.map((t) => t.tag),
    };
  }),

  create: editorProcedure
    .input(
      z.object({
        title: z.string().trim().min(1).max(200),
        content: z.string().default(''),
        category: z.string().trim().max(100).optional(),
        subcategory: z.string().trim().max(100).optional(),
        tags: z.array(z.string().trim().min(1).max(50)).max(30).optional(),
        isProtected: z.boolean().optional(),
        isPublished: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const base = slugify(input.title);
      const existing = await ctx.db
        .select({ slug: pages.slug })
        .from(pages)
        .where(sql`${pages.slug} = ${base} OR ${pages.slug} LIKE ${base + '-%'}`);
      const slug = uniqueSlug(input.title, new Set(existing.map((e) => e.slug)));

      const [created] = await ctx.db
        .insert(pages)
        .values({
          slug,
          title: sanitizeText(input.title, 200),
          category: input.category ?? null,
          subcategory: input.subcategory ?? null,
          content: sanitizeContent(input.content),
          createdBy: ctx.user.id,
          updatedBy: ctx.user.id,
          isProtected: input.isProtected ?? false,
          isPublished: input.isPublished ?? true,
        })
        .returning();

      if (input.tags?.length) {
        await ctx.db.insert(pageTags).values(input.tags.map((tag) => ({ pageId: created.id, tag })));
      }
      return created;
    }),

  update: editorProcedure
    .input(
      z.object({
        slug: z.string(),
        title: z.string().trim().min(1).max(200).optional(),
        content: z.string().optional(),
        category: z.string().trim().max(100).nullish(),
        subcategory: z.string().trim().max(100).nullish(),
        tags: z.array(z.string().trim().min(1).max(50)).max(30).optional(),
        editSummary: z.string().trim().max(200).optional(),
        isProtected: z.boolean().optional(),
        isPublished: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const page = await loadPageBySlug(ctx, input.slug);
      if (!page) throw new TRPCError({ code: 'NOT_FOUND', message: 'Page not found.' });
      if (page.isProtected && ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'This page is protected (admin-only edit).' });
      }

      // Snapshot the CURRENT content as a revision BEFORE saving the new content.
      await ctx.db.insert(pageRevisions).values({
        pageId: page.id,
        content: page.content,
        editedBy: ctx.user.id,
        editSummary: sanitizeText(input.editSummary ?? '', 200) || null,
      });

      const patch: Record<string, unknown> = { updatedAt: new Date(), updatedBy: ctx.user.id };
      if (input.title !== undefined) patch.title = sanitizeText(input.title, 200);
      if (input.content !== undefined) patch.content = sanitizeContent(input.content);
      if (input.category !== undefined) patch.category = input.category;
      if (input.subcategory !== undefined) patch.subcategory = input.subcategory;
      if (input.isProtected !== undefined && ctx.user.role === 'admin') patch.isProtected = input.isProtected;
      if (input.isPublished !== undefined && ctx.user.role === 'admin') patch.isPublished = input.isPublished;

      const [updated] = await ctx.db.update(pages).set(patch).where(eq(pages.id, page.id)).returning();

      if (input.tags !== undefined) {
        await ctx.db.delete(pageTags).where(eq(pageTags.pageId, page.id));
        if (input.tags.length) {
          await ctx.db.insert(pageTags).values(input.tags.map((tag) => ({ pageId: page.id, tag })));
        }
      }
      return updated;
    }),

  delete: adminProcedure.input(z.object({ slug: z.string() })).mutation(async ({ ctx, input }) => {
    const page = await loadPageBySlug(ctx, input.slug);
    if (!page) throw new TRPCError({ code: 'NOT_FOUND', message: 'Page not found.' });
    // Soft delete (AUDIT: real platform keeps history) — unpublish, never hard-delete.
    await ctx.db
      .update(pages)
      .set({ isPublished: false, updatedAt: new Date(), updatedBy: ctx.user.id })
      .where(eq(pages.id, page.id));
    return { ok: true, slug: page.slug };
  }),

  search: publicProcedure
    .input(z.object({ q: z.string(), category: z.string().optional(), limit: z.number().int().min(1).max(50).default(20) }))
    .query(async ({ ctx, input }) => {
      const q = input.q.trim();
      if (!q) return [] as Array<{ id: number; slug: string; title: string; category: string | null; snippet: string; rank: number }>;

      const tsq = sql`websearch_to_tsquery('english', ${q})`;
      const doc = sql`to_tsvector('english', coalesce(${pages.title}, '') || ' ' || coalesce(${pages.content}, ''))`;
      const res = await ctx.db.execute(sql`
        SELECT id, slug, title, category, subcategory, updated_at,
          ts_rank(${doc}, ${tsq}) AS rank,
          ts_headline('english', content, ${tsq},
            'MaxFragments=2, MinWords=4, MaxWords=18, StartSel=<mark>, StopSel=</mark>') AS snippet
        FROM pages
        WHERE is_published = true AND ${doc} @@ ${tsq}
        ${input.category ? sql`AND category = ${input.category}` : sql``}
        ORDER BY rank DESC
        LIMIT ${input.limit}
      `);
      return rowsOf<{
        id: number;
        slug: string;
        title: string;
        category: string | null;
        subcategory: string | null;
        updated_at: string;
        rank: number;
        snippet: string;
      }>(res).map((r) => ({
        id: Number(r.id),
        slug: r.slug,
        title: r.title,
        category: r.category,
        subcategory: r.subcategory,
        updatedAt: r.updated_at,
        rank: Number(r.rank),
        snippet: r.snippet,
      }));
    }),

  getRevisions: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
    const page = await loadPageBySlug(ctx, input.slug);
    if (!page) throw new TRPCError({ code: 'NOT_FOUND', message: 'Page not found.' });
    const rows = await ctx.db
      .select({
        id: pageRevisions.id,
        editSummary: pageRevisions.editSummary,
        createdAt: pageRevisions.createdAt,
        editorName: users.displayName,
        editorUsername: users.username,
      })
      .from(pageRevisions)
      .leftJoin(users, eq(users.id, pageRevisions.editedBy))
      .where(eq(pageRevisions.pageId, page.id))
      .orderBy(desc(pageRevisions.createdAt), desc(pageRevisions.id));
    return rows.map((r) => ({
      id: r.id,
      editSummary: r.editSummary,
      createdAt: r.createdAt,
      editor: r.editorName || r.editorUsername || 'unknown',
    }));
  }),

  getRevision: publicProcedure.input(z.object({ id: z.number().int() })).query(async ({ ctx, input }) => {
    const [rev] = await ctx.db.select().from(pageRevisions).where(eq(pageRevisions.id, input.id)).limit(1);
    if (!rev) throw new TRPCError({ code: 'NOT_FOUND', message: 'Revision not found.' });
    return rev;
  }),

  rollback: adminProcedure
    .input(z.object({ revisionId: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const [rev] = await ctx.db.select().from(pageRevisions).where(eq(pageRevisions.id, input.revisionId)).limit(1);
      if (!rev) throw new TRPCError({ code: 'NOT_FOUND', message: 'Revision not found.' });
      const [page] = await ctx.db.select().from(pages).where(eq(pages.id, rev.pageId)).limit(1);
      if (!page) throw new TRPCError({ code: 'NOT_FOUND', message: 'Page not found.' });

      // Preserve the pre-rollback state as its own revision so rollback is itself undoable.
      await ctx.db.insert(pageRevisions).values({
        pageId: page.id,
        content: page.content,
        editedBy: ctx.user.id,
        editSummary: `Rollback to revision #${rev.id}`,
      });
      const [updated] = await ctx.db
        .update(pages)
        .set({ content: rev.content, updatedAt: new Date(), updatedBy: ctx.user.id })
        .where(eq(pages.id, page.id))
        .returning();
      return updated;
    }),
});
