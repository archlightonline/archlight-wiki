import { trpc } from './trpc';

export type Role = 'admin' | 'editor' | 'viewer';

/** Current-user hook backed by the `auth.me` query (deduped by react-query). */
export function useAuth() {
  const me = trpc.auth.me.useQuery(undefined, { staleTime: 60_000 });
  const user = me.data ?? null;
  const role = (user?.role ?? null) as Role | null;
  return {
    user,
    role,
    isLoading: me.isLoading,
    isAuthed: !!user,
    isAdmin: role === 'admin',
    isEditor: role === 'admin' || role === 'editor',
    refetch: me.refetch,
  };
}
