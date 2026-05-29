import { z } from 'zod';
import { sql, eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure, protectedProcedure } from '../trpc/trpc';
import { users } from '../db/schema';
import { hashPassword, verifyPassword, DUMMY_HASH } from '../lib/password';
import { publicUser } from '../lib/public-user';
import { isHttpsUrl, sanitizeText } from '../lib/sanitize';

const usernameSchema = z
  .string()
  .trim()
  .min(3, 'Username must be at least 3 characters')
  .max(32)
  .regex(/^[A-Za-z0-9_-]+$/, 'Letters, numbers, underscore and dash only');

const passwordSchema = z.string().min(8, 'Password must be at least 8 characters').max(200);

export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        username: usernameSchema,
        email: z.string().trim().email().max(200),
        password: passwordSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db
        .select({ id: users.id })
        .from(users)
        .where(sql`lower(${users.username}) = ${input.username.toLowerCase()} OR lower(${users.email}) = ${input.email.toLowerCase()}`)
        .limit(1);
      if (existing.length) {
        throw new TRPCError({ code: 'CONFLICT', message: 'Username or email is already taken.' });
      }

      const passwordHash = await hashPassword(input.password); // bcrypt — never plaintext
      const [created] = await ctx.db
        .insert(users)
        .values({
          username: input.username,
          email: input.email,
          passwordHash,
          role: 'viewer', // default role
          displayName: input.username,
        })
        .returning();

      ctx.setSession(created.id);
      return publicUser(created);
    }),

  login: publicProcedure
    .input(z.object({ username: z.string().trim().min(1), password: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const [user] = await ctx.db
        .select()
        .from(users)
        .where(sql`lower(${users.username}) = ${input.username.toLowerCase()}`)
        .limit(1);

      // Verify against a dummy hash when the user is missing to reduce timing leak.
      const ok = user
        ? await verifyPassword(input.password, user.passwordHash)
        : await verifyPassword(input.password, DUMMY_HASH);

      if (!user || !ok) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid username or password.' });
      }
      if (!user.isActive) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'This account is deactivated.' });
      }

      await ctx.db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));
      ctx.setSession(user.id);
      return publicUser({ ...user, lastLoginAt: new Date() });
    }),

  logout: publicProcedure.mutation(({ ctx }) => {
    ctx.clearSession();
    return { ok: true };
  }),

  me: publicProcedure.query(({ ctx }) => (ctx.user ? publicUser(ctx.user) : null)),

  updateProfile: protectedProcedure
    .input(
      z.object({
        displayName: z.string().trim().max(60).optional(),
        // Profile photo URLs must be https only (AUDIT §3 fix).
        avatarUrl: z
          .string()
          .trim()
          .max(500)
          .optional()
          .refine((v) => !v || isHttpsUrl(v), { message: 'Avatar URL must use https://' }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const patch: Record<string, unknown> = { updatedAt: new Date() };
      if (input.displayName !== undefined) patch.displayName = sanitizeText(input.displayName, 60);
      if (input.avatarUrl !== undefined) patch.avatarUrl = input.avatarUrl || null;

      const [updated] = await ctx.db
        .update(users)
        .set(patch)
        .where(eq(users.id, ctx.user.id))
        .returning();
      return publicUser(updated);
    }),
});
