/**
 * Authoritative, idempotent schema DDL for the wiki database.
 *
 * Why raw DDL instead of `drizzle-kit push`? It must run identically against two
 * drivers — embedded PGlite (local dev/test) and node-postgres (production) — and
 * be re-runnable per test suite. Plain `CREATE ... IF NOT EXISTS` is the most
 * predictable, driver-agnostic way to do that. This mirrors ./schema.ts exactly;
 * `pnpm db:push` (scripts/db-push.mjs) and the test harness both apply it.
 *
 * Roles/status use TEXT + CHECK rather than native enum types so the statements
 * stay idempotent and portable.
 */
export const DDL_STATEMENTS: string[] = [
  `CREATE TABLE IF NOT EXISTS users (
    id            serial PRIMARY KEY,
    username      text NOT NULL,
    email         text NOT NULL,
    password_hash text NOT NULL,
    role          text NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin','editor','viewer')),
    display_name  text,
    avatar_url    text,
    created_at    timestamptz NOT NULL DEFAULT now(),
    updated_at    timestamptz NOT NULL DEFAULT now(),
    last_login_at timestamptz,
    contributions_seen_at timestamptz,
    is_active     boolean NOT NULL DEFAULT true
  )`,
  // Idempotent add for databases created before the contribution-feedback badge.
  // Nullable/additive; safe to re-run; no-op once the column is present.
  `ALTER TABLE users ADD COLUMN IF NOT EXISTS contributions_seen_at timestamptz`,
  `CREATE UNIQUE INDEX IF NOT EXISTS users_username_uq ON users (lower(username))`,
  `CREATE UNIQUE INDEX IF NOT EXISTS users_email_uq ON users (lower(email))`,

  `CREATE TABLE IF NOT EXISTS pages (
    id           serial PRIMARY KEY,
    slug         text NOT NULL,
    title        text NOT NULL,
    category     text,
    subcategory  text,
    content      text NOT NULL DEFAULT '',
    created_by   integer REFERENCES users(id),
    updated_by   integer REFERENCES users(id),
    created_at   timestamptz NOT NULL DEFAULT now(),
    updated_at   timestamptz NOT NULL DEFAULT now(),
    is_published boolean NOT NULL DEFAULT true,
    is_protected boolean NOT NULL DEFAULT false
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS pages_slug_uq ON pages (slug)`,
  `CREATE INDEX IF NOT EXISTS pages_category_idx ON pages (category)`,
  // PostgreSQL full-text search (tsvector) over title + content.
  `CREATE INDEX IF NOT EXISTS pages_search_index ON pages
    USING gin (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, '')))`,

  `CREATE TABLE IF NOT EXISTS page_revisions (
    id         serial PRIMARY KEY,
    page_id    integer NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    content    text NOT NULL,
    edited_by  text,
    edited_at  timestamptz NOT NULL DEFAULT now(),
    summary    text
  )`,
  `CREATE INDEX IF NOT EXISTS page_revisions_page_idx ON page_revisions (page_id)`,

  `CREATE TABLE IF NOT EXISTS page_tags (
    id      serial PRIMARY KEY,
    page_id integer NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    tag     text NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS page_tags_page_idx ON page_tags (page_id)`,
  `CREATE INDEX IF NOT EXISTS page_tags_tag_idx ON page_tags (tag)`,

  `CREATE TABLE IF NOT EXISTS contributions (
    id               serial PRIMARY KEY,
    page_id          integer REFERENCES pages(id) ON DELETE CASCADE,
    proposed_title   text,
    contributor_id   integer NOT NULL REFERENCES users(id),
    proposed_content text NOT NULL,
    status           text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
    reviewed_by      integer REFERENCES users(id),
    contributor_note text,
    review_note      text,
    created_at       timestamptz NOT NULL DEFAULT now(),
    reviewed_at      timestamptz
  )`,
  // Idempotent add for databases created before proposed_title existed (new-page
  // proposals). Safe to re-run; no-op once the column is present.
  `ALTER TABLE contributions ADD COLUMN IF NOT EXISTS proposed_title text`,
  // Idempotent add for databases created before contributor_note existed. Splits
  // the formerly-overloaded review_note (which held BOTH the contributor's
  // submission note and the reviewer's decision reason) into two columns.
  `ALTER TABLE contributions ADD COLUMN IF NOT EXISTS contributor_note text`,
  // One-time, idempotent backfill of the SAFE/unambiguous case only: for PENDING
  // rows, review_note unambiguously holds the contributor's note (no reviewer has
  // touched it yet), so move it to contributor_note. Reviewed rows are left
  // untouched — their review_note is the reviewer's note (or ambiguous; we don't
  // guess). The `contributor_note IS NULL` guard makes this a no-op once applied.
  `UPDATE contributions
      SET contributor_note = review_note, review_note = NULL
    WHERE status = 'pending' AND contributor_note IS NULL AND review_note IS NOT NULL`,
  `CREATE INDEX IF NOT EXISTS contributions_status_idx ON contributions (status)`,
  `CREATE INDEX IF NOT EXISTS contributions_page_idx ON contributions (page_id)`,

  // Image-upload records — durable backing for per-viewer upload rate-limits
  // (survives restarts/redeploys) and groundwork for orphan-file cleanup.
  `CREATE TABLE IF NOT EXISTS uploads (
    id           serial PRIMARY KEY,
    user_id      integer NOT NULL REFERENCES users(id),
    key          text NOT NULL,
    content_type text NOT NULL,
    size         integer NOT NULL,
    created_at   timestamptz NOT NULL DEFAULT now()
  )`,
  // Indexed on (user_id, created_at) — the exact shape of the sliding-window
  // rate-limit count (recent uploads for one user).
  `CREATE INDEX IF NOT EXISTS uploads_user_created_idx ON uploads (user_id, created_at)`,

  // Durable server-only key/value config. Holds the fallback session-signing
  // secret when SESSION_SECRET is unset, so it survives restarts/redeploys.
  `CREATE TABLE IF NOT EXISTS app_config (
    key        text PRIMARY KEY,
    value      text NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS social_links (
    id         serial PRIMARY KEY,
    key        text NOT NULL,
    label      text NOT NULL,
    url        text NOT NULL,
    icon       text,
    updated_at timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS social_links_key_uq ON social_links (key)`,

  `CREATE TABLE IF NOT EXISTS world_status (
    id           serial PRIMARY KEY,
    key          text NOT NULL,
    name         text NOT NULL,
    status       text NOT NULL DEFAULT 'live' CHECK (status IN ('live','offline','maintenance')),
    display_name text NOT NULL,
    updated_at   timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS world_status_key_uq ON world_status (key)`,
];
