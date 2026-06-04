import { router } from '../trpc/trpc';
import { authRouter } from './auth';
import { pagesRouter } from './pages';
import { contributionsRouter } from './contributions';
import { adminRouter } from './admin';
import { socialLinksRouter } from './socialLinks';

export const appRouter = router({
  auth: authRouter,
  pages: pagesRouter,
  contributions: contributionsRouter,
  admin: adminRouter,
  socialLinks: socialLinksRouter,
});

export type AppRouter = typeof appRouter;
