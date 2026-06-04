import { z } from 'zod';
import { asc, eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure, adminProcedure } from '../trpc/trpc';
import { worldStatus, WORLD_STATUSES } from '../db/schema';
import { sanitizeText } from '../lib/sanitize';

export const worldStatusRouter = router({
  /** Public: topbar world badges / selector read these. */
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(worldStatus).orderBy(asc(worldStatus.id));
  }),

  /** Admin: change a world's status and display name by key. */
  update: adminProcedure
    .input(
      z.object({
        key: z.string().trim().min(1).max(50),
        status: z.enum(WORLD_STATUSES),
        displayName: z.string().trim().min(1).max(80),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [updated] = await ctx.db
        .update(worldStatus)
        .set({ status: input.status, displayName: sanitizeText(input.displayName, 80), updatedAt: new Date() })
        .where(eq(worldStatus.key, input.key))
        .returning();
      if (!updated) throw new TRPCError({ code: 'NOT_FOUND', message: 'World not found.' });
      return updated;
    }),
});
