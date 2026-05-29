/**
 * tRPC initialization, shared procedures and role-based access middleware.
 *
 * AUDIT §5 fix: authorization is enforced on the server. `protectedProcedure`
 * requires a valid session; `editorProcedure` and `adminProcedure` additionally
 * gate by role. Viewers cannot reach editor procedures; editors cannot reach
 * admin procedures — verified by tests.
 */
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import type { Context } from './context';
import type { Role, User } from '../db/schema';

const t = initTRPC.context<Context>().create({ transformer: superjson });

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;

/** Requires an authenticated, active user. Narrows ctx.user to non-null. */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in.' });
  }
  return next({ ctx: { ...ctx, user: ctx.user as User } });
});

function roleProcedure(...allowed: Role[]) {
  return t.procedure.use(({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in.' });
    }
    if (!allowed.includes(ctx.user.role)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `Requires role: ${allowed.join(' or ')}.`,
      });
    }
    return next({ ctx: { ...ctx, user: ctx.user as User } });
  });
}

/** admin or editor */
export const editorProcedure = roleProcedure('admin', 'editor');
/** admin only */
export const adminProcedure = roleProcedure('admin');
