import { z } from 'zod';
import { asc, eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure, adminProcedure } from '../trpc/trpc';
import { socialLinks } from '../db/schema';

export const socialLinksRouter = router({
  /** Public: topbar reads these for its social buttons. */
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(socialLinks).orderBy(asc(socialLinks.id));
  }),

  /** Admin: change a link's URL by key. */
  update: adminProcedure
    .input(z.object({ key: z.string().trim().min(1).max(50), url: z.string().trim().url().max(500) }))
    .mutation(async ({ ctx, input }) => {
      const [updated] = await ctx.db
        .update(socialLinks)
        .set({ url: input.url, updatedAt: new Date() })
        .where(eq(socialLinks.key, input.key))
        .returning();
      if (!updated) throw new TRPCError({ code: 'NOT_FOUND', message: 'Social link not found.' });
      return updated;
    }),
});
