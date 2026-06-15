/**
 * Drizzle ORM schema — typed table definitions used for all queries.
 *
 * Standard `drizzle-orm/pg-core` (plain PostgreSQL) so it is fully portable to
 * Manus / any self-hosted Postgres — no Manus-specific constructs. The matching
 * CREATE statements live in ./ddl.ts (authoritative for `pnpm db:push` and tests).
 * Keep the two in sync: column names/types here must mirror the DDL there.
 *
 * Roles and contribution status are modeled as TEXT columns with a TS-level enum
 * union (and a CHECK constraint in ddl.ts) rather than native PG enum types —
 * idempotent to create and trivially portable.
 */
import { sql } from 'drizzle-orm';
import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const ROLES = ['admin', 'editor', 'viewer'] as const;
export type Role = (typeof ROLES)[number];

export const CONTRIBUTION_STATUSES = ['pending', 'approved', 'rejected'] as const;
export type ContributionStatus = (typeof CONTRIBUTION_STATUSES)[number];

export const WORLD_STATUSES = ['live', 'offline', 'maintenance'] as const;
export type WorldStatusValue = (typeof WORLD_STATUSES)[number];

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    username: text('username').notNull(),
    email: text('email').notNull(),
    passwordHash: text('password_hash').notNull(), // bcrypt only — never plaintext
    role: text('role', { enum: ROLES }).notNull().default('viewer'),
    displayName: text('display_name'),
    avatarUrl: text('avatar_url'), // validated https-only before storage
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
    isActive: boolean('is_active').notNull().default(true),
  },
  (t) => ({
    usernameUq: uniqueIndex('users_username_uq').on(t.username),
    emailUq: uniqueIndex('users_email_uq').on(t.email),
  }),
);

export const pages = pgTable(
  'pages',
  {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    category: text('category'),
    subcategory: text('subcategory'),
    content: text('content').notNull().default(''), // markdown
    createdBy: integer('created_by').references(() => users.id),
    updatedBy: integer('updated_by').references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    isPublished: boolean('is_published').notNull().default(true),
    isProtected: boolean('is_protected').notNull().default(false), // admin-only edit
  },
  (t) => ({
    slugUq: uniqueIndex('pages_slug_uq').on(t.slug),
    categoryIdx: index('pages_category_idx').on(t.category),
    // PostgreSQL full-text search index (tsvector) over title + content.
    // Declared here for documentation/portability; created by ddl.ts as a GIN
    // expression index named pages_search_index.
    searchIdx: index('pages_search_index').using(
      'gin',
      sql`to_tsvector('english', coalesce(${t.title}, '') || ' ' || coalesce(${t.content}, ''))`,
    ),
  }),
);

export const pageRevisions = pgTable(
  'page_revisions',
  {
    id: serial('id').primaryKey(),
    pageId: integer('page_id')
      .notNull()
      .references(() => pages.id, { onDelete: 'cascade' }),
    content: text('content').notNull(), // full snapshot
    editedBy: text('edited_by'), // user display name at edit time (denormalised)
    editedAt: timestamp('edited_at', { withTimezone: true }).notNull().defaultNow(),
    summary: text('summary'), // optional short summary
  },
  (t) => ({
    pageIdx: index('page_revisions_page_idx').on(t.pageId),
  }),
);

export const pageTags = pgTable(
  'page_tags',
  {
    id: serial('id').primaryKey(),
    pageId: integer('page_id')
      .notNull()
      .references(() => pages.id, { onDelete: 'cascade' }),
    tag: text('tag').notNull(),
  },
  (t) => ({
    pageIdx: index('page_tags_page_idx').on(t.pageId),
    tagIdx: index('page_tags_tag_idx').on(t.tag),
  }),
);

export const contributions = pgTable(
  'contributions',
  {
    id: serial('id').primaryKey(),
    // Null for a NEW-page proposal (no existing page yet). Set to the created
    // page's id when such a proposal is approved.
    pageId: integer('page_id').references(() => pages.id, { onDelete: 'cascade' }),
    // Proposed title for a NEW-page proposal (null for edits to existing pages).
    proposedTitle: text('proposed_title'),
    contributorId: integer('contributor_id')
      .notNull()
      .references(() => users.id),
    proposedContent: text('proposed_content').notNull(),
    status: text('status', { enum: CONTRIBUTION_STATUSES }).notNull().default('pending'),
    reviewedBy: integer('reviewed_by').references(() => users.id),
    reviewNote: text('review_note'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  },
  (t) => ({
    statusIdx: index('contributions_status_idx').on(t.status),
    pageIdx: index('contributions_page_idx').on(t.pageId),
  }),
);

/** Editable social links shown in the topbar (DB-backed so admins can change URLs). */
export const socialLinks = pgTable(
  'social_links',
  {
    id: serial('id').primaryKey(),
    key: text('key').notNull(), // discord, youtube, facebook, website
    label: text('label').notNull(),
    url: text('url').notNull(),
    icon: text('icon'),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    keyUq: uniqueIndex('social_links_key_uq').on(t.key),
  }),
);

/** Editable world/server status shown in the topbar (DB-backed). */
export const worldStatus = pgTable(
  'world_status',
  {
    id: serial('id').primaryKey(),
    key: text('key').notNull(), // abaldar, legacy, hardcore
    name: text('name').notNull(),
    status: text('status', { enum: WORLD_STATUSES }).notNull().default('live'),
    displayName: text('display_name').notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    keyUq: uniqueIndex('world_status_key_uq').on(t.key),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Page = typeof pages.$inferSelect;
export type NewPage = typeof pages.$inferInsert;
export type PageRevision = typeof pageRevisions.$inferSelect;
export type Contribution = typeof contributions.$inferSelect;
export type SocialLink = typeof socialLinks.$inferSelect;
export type WorldStatus = typeof worldStatus.$inferSelect;
