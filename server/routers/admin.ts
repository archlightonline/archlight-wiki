import { z } from 'zod';
import { and, eq, sql } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { router, adminProcedure } from '../trpc/trpc';
import { users, ROLES } from '../db/schema';
import { publicUser } from '../lib/public-user';

// Guard rationale: never let the last active admin be demoted or deactivated
// (would lock everyone out of admin functions). Enforced inline in each mutation.
export const adminRouter = router({
  listUsers: adminProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.select().from(users).orderBy(users.id);
    return rows.map(publicUser);
  }),

  updateUserRole: adminProcedure
    .input(z.object({ userId: z.number().int(), role: z.enum(ROLES) }))
    .mutation(async ({ ctx, input }) => {
      const [target] = await ctx.db.select().from(users).where(eq(users.id, input.userId)).limit(1);
      if (!target) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found.' });

      if (target.role === 'admin' && input.role !== 'admin') {
        const [{ count }] = await ctx.db
          .select({ count: sql<number>`count(*)::int` })
          .from(users)
          .where(and(eq(users.role, 'admin'), eq(users.isActive, true)));
        if (Number(count) <= 1) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Cannot demote the last remaining admin.' });
        }
      }

      const [updated] = await ctx.db
        .update(users)
        .set({ role: input.role, updatedAt: new Date() })
        .where(eq(users.id, input.userId))
        .returning();
      return publicUser(updated);
    }),

  deactivateUser: adminProcedure
    .input(z.object({ userId: z.number().int(), isActive: z.boolean().default(false) }))
    .mutation(async ({ ctx, input }) => {
      const [target] = await ctx.db.select().from(users).where(eq(users.id, input.userId)).limit(1);
      if (!target) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found.' });

      if (!input.isActive && target.role === 'admin') {
        const [{ count }] = await ctx.db
          .select({ count: sql<number>`count(*)::int` })
          .from(users)
          .where(and(eq(users.role, 'admin'), eq(users.isActive, true)));
        if (Number(count) <= 1) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Cannot deactivate the last remaining admin.' });
        }
      }

      const [updated] = await ctx.db
        .update(users)
        .set({ isActive: input.isActive, updatedAt: new Date() })
        .where(eq(users.id, input.userId))
        .returning();
      return publicUser(updated);
    }),
});
