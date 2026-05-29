import type { User } from '../db/schema';

/** A user record safe to send to clients — never includes the password hash. */
export type PublicUser = Omit<User, 'passwordHash'>;

export function publicUser(u: User): PublicUser {
  const { passwordHash: _omit, ...rest } = u;
  return rest;
}
