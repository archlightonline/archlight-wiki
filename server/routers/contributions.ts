import { z } from 'zod';
import { and, desc, eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { router, protectedProcedure, editorProcedure } from '../trpc/trpc';
import { contributions, pages, pageRevisions, users } from '../db/schema';
import { sanitizeContent, sanitizeText } from '../lib/sanitize';

export const contributionsRouter = router({
  /** Any logged-in user (incl. viewers) proposes an edit to an existing page. */
  submit: protectedProcedure
    .input(z.object({ slug: z.string(), proposedContent: z.string().min(1).max(100_000), note: z.string().max(500).optional() }))
    .mutation(async ({ ctx, input }) => {
      const [page] = await ctx.db.select().from(pages).where(eq(pages.slug, input.slug)).limit(1);
      if (!page) throw new TRPCError({ code: 'NOT_FOUND', message: 'Page not found.' });

      const note = input.note ? sanitizeText(input.note, 500) : null;
      const [created] = await ctx.db
        .insert(contributions)
        .values({
          pageId: page.id,
          contributorId: ctx.user.id,
          proposedContent: sanitizeContent(input.proposedContent),
          status: 'pending',
          reviewNote: note,
        })
        .returning();
      return created;
    }),

  /** The current user's own contribution history (for their profile). */
  mine: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db
      .select({
        id: contributions.id,
        status: contributions.status,
        reviewNote: contributions.reviewNote,
        createdAt: contributions.createdAt,
        reviewedAt: contributions.reviewedAt,
        pageSlug: pages.slug,
        pageTitle: pages.title,
      })
      .from(contributions)
      .leftJoin(pages, eq(pages.id, contributions.pageId))
      .where(eq(contributions.contributorId, ctx.user.id))
      .orderBy(desc(contributions.createdAt));
    return rows;
  }),

  /** Pending (or any status) contributions for the review queue. admin/editor. */
  list: editorProcedure
    .input(z.object({ status: z.enum(['pending', 'approved', 'rejected', 'all']).default('pending') }).default({}))
    .query(async ({ ctx, input }) => {
      const where = input.status === 'all' ? undefined : eq(contributions.status, input.status);
      const rows = await ctx.db
        .select({
          id: contributions.id,
          status: contributions.status,
          proposedContent: contributions.proposedContent,
          reviewNote: contributions.reviewNote,
          createdAt: contributions.createdAt,
          reviewedAt: contributions.reviewedAt,
          pageSlug: pages.slug,
          pageTitle: pages.title,
          contributor: users.displayName,
          contributorUsername: users.username,
        })
        .from(contributions)
        .leftJoin(pages, eq(pages.id, contributions.pageId))
        .leftJoin(users, eq(users.id, contributions.contributorId))
        .where(where)
        .orderBy(desc(contributions.createdAt));
      return rows.map((r) => ({ ...r, contributor: r.contributor || r.contributorUsername || 'unknown' }));
    }),

  /**
   * Approve or reject. Approving applies the proposed content to the page and
   * records it as a new revision (so the contribution workflow is end-to-end).
   * admin/editor.
   */
  review: editorProcedure
    .input(
      z.object({
        id: z.number().int(),
        decision: z.enum(['approved', 'rejected']),
        note: z.string().max(500).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [contribution] = await ctx.db
        .select()
        .from(contributions)
        .where(eq(contributions.id, input.id))
        .limit(1);
      if (!contribution) throw new TRPCError({ code: 'NOT_FOUND', message: 'Contribution not found.' });
      if (contribution.status !== 'pending') {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'This contribution has already been reviewed.' });
      }

      if (input.decision === 'approved' && contribution.pageId) {
        const [page] = await ctx.db.select().from(pages).where(eq(pages.id, contribution.pageId)).limit(1);
        if (page) {
          await ctx.db.insert(pageRevisions).values({
            pageId: page.id,
            content: contribution.proposedContent,
            editedBy: ctx.user.displayName || ctx.user.username || 'unknown',
            summary: `Approved contribution #${contribution.id}`,
          });
          await ctx.db
            .update(pages)
            .set({ content: contribution.proposedContent, updatedAt: new Date(), updatedBy: ctx.user.id })
            .where(eq(pages.id, page.id));
        }
      }

      const [updated] = await ctx.db
        .update(contributions)
        .set({
          status: input.decision,
          reviewedBy: ctx.user.id,
          reviewNote: input.note ? sanitizeText(input.note, 500) : contribution.reviewNote,
          reviewedAt: new Date(),
        })
        .where(eq(contributions.id, contribution.id))
        .returning();
      return updated;
    }),
});
