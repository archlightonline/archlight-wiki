import { router } from '../trpc/trpc';
import { authRouter } from './auth';
import { pagesRouter } from './pages';
import { contributionsRouter } from './contributions';
import { adminRouter } from './admin';

export const appRouter = router({
  auth: authRouter,
  pages: pagesRouter,
  contributions: contributionsRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
