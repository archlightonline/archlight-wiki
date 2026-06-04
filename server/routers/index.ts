import { router } from '../trpc/trpc';
import { authRouter } from './auth';
import { pagesRouter } from './pages';
import { contributionsRouter } from './contributions';
import { adminRouter } from './admin';
import { socialLinksRouter } from './socialLinks';
import { worldStatusRouter } from './worldStatus';

export const appRouter = router({
  auth: authRouter,
  pages: pagesRouter,
  contributions: contributionsRouter,
  admin: adminRouter,
  socialLinks: socialLinksRouter,
  worldStatus: worldStatusRouter,
});

export type AppRouter = typeof appRouter;
