import { z } from 'zod';
import { and, desc, eq, sql } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { router, protectedProcedure, editorProcedure } from '../trpc/trpc';
import { contributions, pages, pageRevisions, users } from '../db/schema';
import { sanitizeContent, sanitizeText } from '../lib/sanitize';
import { slugify, uniqueSlug } from '../lib/slug';

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
          contributorNote: note,
        })
        .returning();
      return created;
    }),

  /**
   * Any logged-in user proposes a brand-NEW page (no existing page). Stored as a
   * contribution with a null pageId + a proposedTitle; the page is created when
   * an editor approves it (see `review`). Same sanitization as page content.
   */
  submitNewPage: protectedProcedure
    .input(
      z.object({
        title: z.string().trim().min(1).max(200),
        proposedContent: z.string().min(1).max(100_000),
        note: z.string().max(500).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const note = input.note ? sanitizeText(input.note, 500) : null;
      const [created] = await ctx.db
        .insert(contributions)
        .values({
          pageId: null,
          proposedTitle: sanitizeText(input.title, 200),
          contributorId: ctx.user.id,
          proposedContent: sanitizeContent(input.proposedContent),
          status: 'pending',
          contributorNote: note,
        })
        .returning();
      return created;
    }),

  /** The current user's own contribution history (for their profile). */
  mine: protectedProcedure.query(async ({ ctx }) => {
    const [me] = await ctx.db
      .select({ seenAt: users.contributionsSeenAt })
      .from(users)
      .where(eq(users.id, ctx.user.id))
      .limit(1);
    const seenAt = me?.seenAt ?? null;
    const rows = await ctx.db
      .select({
        id: contributions.id,
        status: contributions.status,
        contributorNote: contributions.contributorNote,
        reviewNote: contributions.reviewNote,
        createdAt: contributions.createdAt,
        reviewedAt: contributions.reviewedAt,
        pageSlug: pages.slug,
        pageTitle: pages.title,
        proposedTitle: contributions.proposedTitle,
        // The contributor's own submitted content — so Profile can show it and
        // pre-fill an edit-and-resubmit. Scoped to ctx.user.id below (own data).
        proposedContent: contributions.proposedContent,
        // Reviewed since the user last viewed their contributions → "new" to them.
        isNew: sql<boolean>`(${contributions.reviewedAt} IS NOT NULL${
          seenAt ? sql` AND ${contributions.reviewedAt} > ${seenAt}` : sql``
        })`,
      })
      .from(contributions)
      .leftJoin(pages, eq(pages.id, contributions.pageId))
      .where(eq(contributions.contributorId, ctx.user.id))
      .orderBy(desc(contributions.createdAt));
    return rows;
  }),

  /**
   * Count of the current user's contributions that were REVIEWED (approved or
   * rejected) since they last viewed their contributions — drives the unread
   * feedback badge. Aggregate "N since you last looked" (v1 scope).
   */
  unreadCount: protectedProcedure.query(async ({ ctx }) => {
    const [me] = await ctx.db
      .select({ seenAt: users.contributionsSeenAt })
      .from(users)
      .where(eq(users.id, ctx.user.id))
      .limit(1);
    const seenAt = me?.seenAt ?? null;
    const [row] = await ctx.db
      .select({ count: sql<number>`count(*)::int` })
      .from(contributions)
      .where(
        and(
          eq(contributions.contributorId, ctx.user.id),
          sql`${contributions.reviewedAt} IS NOT NULL`,
          ...(seenAt ? [sql`${contributions.reviewedAt} > ${seenAt}`] : []),
        ),
      );
    return { count: Number(row?.count ?? 0) };
  }),

  /** Mark the current user's contribution feedback as seen — clears the badge. */
  markContributionsSeen: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.update(users).set({ contributionsSeenAt: new Date() }).where(eq(users.id, ctx.user.id));
    return { ok: true };
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
          proposedTitle: contributions.proposedTitle,
          contributorNote: contributions.contributorNote,
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
   * records it as a new revision; approving a NEW-page proposal creates the page.
   * admin/editor.
   *
   * Concurrency-safe & atomic: the whole operation runs in ONE transaction. It
   * first atomically *claims* the contribution with an
   * `UPDATE … WHERE id = ? AND status = 'pending'` — so if two reviewers race,
   * only the first matches a row; the second sees zero rows and does nothing (no
   * second page created). The page create + first revision + contribution link
   * all happen in that same transaction, so any failure (incl. a unique-slug
   * collision) rolls the entire thing back — never a half-created/orphaned page.
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
      const editorName = ctx.user.displayName || ctx.user.username || 'unknown';

      return await ctx.db.transaction(async (tx) => {
        // 1. Atomically claim the PENDING contribution. The status guard means a
        //    racing second reviewer matches zero rows and never reaches the work
        //    below — so no duplicate page is created.
        // reviewNote is now the reviewer's note exclusively (the contributor's
        // note lives in contributorNote), so it's safe to set unconditionally —
        // it can no longer clobber the contributor's submission note.
        const claimPatch: Record<string, unknown> = {
          status: input.decision,
          reviewedBy: ctx.user.id,
          reviewedAt: new Date(),
          reviewNote: input.note ? sanitizeText(input.note, 500) : null,
        };

        const [claimed] = await tx
          .update(contributions)
          .set(claimPatch)
          .where(and(eq(contributions.id, input.id), eq(contributions.status, 'pending')))
          .returning();

        if (!claimed) {
          // Either the contribution doesn't exist, or it was already reviewed
          // (the race loser / a repeat review). Distinguish for a clear message.
          const [exists] = await tx
            .select({ id: contributions.id })
            .from(contributions)
            .where(eq(contributions.id, input.id))
            .limit(1);
          throw new TRPCError({
            code: exists ? 'BAD_REQUEST' : 'NOT_FOUND',
            message: exists ? 'This contribution has already been reviewed.' : 'Contribution not found.',
          });
        }

        if (input.decision !== 'approved') return claimed;

        // 2a. Edit to an existing page — snapshot revision + apply content.
        if (claimed.pageId) {
          const [page] = await tx.select().from(pages).where(eq(pages.id, claimed.pageId)).limit(1);
          if (page) {
            await tx.insert(pageRevisions).values({
              pageId: page.id,
              content: claimed.proposedContent,
              editedBy: editorName,
              summary: `Approved contribution #${claimed.id}`,
            });
            await tx
              .update(pages)
              .set({ content: claimed.proposedContent, updatedAt: new Date(), updatedBy: ctx.user.id })
              .where(eq(pages.id, page.id));
          }
          return claimed;
        }

        // 2b. New-page proposal — create the page (unique slug from the title),
        //     record its first revision, and link the contribution to it. A
        //     unique-slug collision throws here and rolls back the whole tx
        //     (claim included), leaving no orphaned page.
        if (claimed.proposedTitle) {
          const base = slugify(claimed.proposedTitle);
          const existing = await tx
            .select({ slug: pages.slug })
            .from(pages)
            .where(sql`${pages.slug} = ${base} OR ${pages.slug} LIKE ${base + '-%'}`);
          const slug = uniqueSlug(claimed.proposedTitle, new Set(existing.map((e) => e.slug)));
          const [createdPage] = await tx
            .insert(pages)
            .values({
              slug,
              title: sanitizeText(claimed.proposedTitle, 200),
              content: claimed.proposedContent,
              createdBy: ctx.user.id,
              updatedBy: ctx.user.id,
              isPublished: true,
            })
            .returning();
          await tx.insert(pageRevisions).values({
            pageId: createdPage.id,
            content: claimed.proposedContent,
            editedBy: editorName,
            summary: `Created from contribution #${claimed.id}`,
          });
          const [linked] = await tx
            .update(contributions)
            .set({ pageId: createdPage.id })
            .where(eq(contributions.id, claimed.id))
            .returning();
          return linked;
        }

        return claimed;
      });
    }),
});
