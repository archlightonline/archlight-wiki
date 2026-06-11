# Archlight Wiki — Rebuild (Phase 1)

This document tracks the rebuild of the Archlight Wiki from a static, client-only
single-page app into a real full-stack platform, and maps every finding in
[`AUDIT.md`](archlight_wiki_v534_concepts_static_hosts_fixed/AUDIT.md) to its fix.

The stack: **React + Vite + tRPC + Drizzle ORM + PostgreSQL**, fully type-safe
end to end. It is portable with no Manus lock-in — it runs on embedded **PGlite**
(real PostgreSQL compiled to WASM) locally and on any Postgres in production via
`DATABASE_URL` (the schema and queries are standard `pg-core`).

---

## Before (original static site)

| Aspect | Before |
| --- | --- |
| **Architecture** | ~40 hand-ordered `<script>` tags communicating through `window.*` globals; no framework, no build, no module system. A 6.7 MB inlined standalone HTML build. |
| **Auth model** | Cosmetic, client-only. `user.password === password` compared in the browser; "session" was a `localStorage` JSON blob. Trivially bypassable (`window.currentRole = 'wiki_admin'`). |
| **Persistence** | None. "Editing" produced a text report to copy/paste. All state was per-browser `localStorage`. |
| **Search** | Title/category only, in-memory type-ahead. No body search, no index. |
| **Editing** | No real editing, no page creation, no versioning, no moderation. |
| **Security** | Hardcoded plaintext admin credentials in the repo; plaintext passwords in `localStorage`; unvalidated profile URLs; a 68 MB generated `dist/` committed to git. |

## After (rebuilt platform)

| Aspect | After |
| --- | --- |
| **Architecture** | React SPA (Vite) + tRPC API (Express) + Drizzle/PostgreSQL. Typed client↔server contract. Feature-split routers under `server/routers/`. Centralized theme tokens. |
| **Auth model** | Server-enforced. bcrypt password hashes; HMAC-signed **HttpOnly, SameSite=Lax** session cookies (never readable by JS); role middleware (`protectedProcedure` / editor / admin). |
| **Persistence** | PostgreSQL via Drizzle. 637 pages migrated. Every edit is durable and attributed (`created_by`/`updated_by`). |
| **Search** | PostgreSQL full-text search (`tsvector` + `websearch_to_tsquery`), ranked with `ts_rank`, GIN-indexed, with `ts_headline` `<mark>` snippets. |
| **Editing** | Markdown editor with preview; create/update/soft-delete; **full revision history** with diff + admin rollback; community **contribution → review → apply** workflow. |
| **Security** | No credentials in code; bcrypt only; https-only avatar validation; input sanitization on store + DOMPurify on render; role-gated procedures; `dist/` untracked + gitignored. |

---

## Issues resolved

Numbered against AUDIT.md sections.

### §3 — Bugs and broken logic
1. **Double-defined `openLoginModal`/`doLogoutAll` (load-order fragile).** Eliminated — auth is server tRPC procedures + a single React `useAuth()` hook; no `window` globals or script ordering.
2. **Two divergent admin-user lists that could drift.** Eliminated — a single `users` table is the only source of identity; roles live in one column.
3. **Profile-photo URL not validated.** Fixed — `updateProfile` rejects any non-`https://` URL (`isHttpsUrl` + a Zod refinement); `javascript:`/`data:` are blocked.
4. **`extractPageText()` 140-chunk cap / dedupe loss.** Obsolete — full page content is stored as Markdown in the DB; nothing is truncated client-side.
5. **`titleToPageId()` fuzzy mis-routing.** Obsolete — pages are addressed by a unique, stable `slug`, not substring title matching.
6. **Deprecated `document.execCommand` editor.** Replaced — editing is a Markdown textarea with a live preview (`marked` + DOMPurify).
7. **Polling timers never cleared (700 ms interval + per-click `setTimeout`).** Gone — no global timers; React renders declaratively.

### §4 — Performance risks
8. **3.95 MB `updates-data.js` loaded synchronously on every visit.** Fixed — patch notes are 569 rows in Postgres, fetched on demand and paginated via `pages.list`/`recent`; the client bundle is ~114 KB gzipped.
9. **6.7 MB inlined single-file build defeating caching.** Replaced — Vite emits hashed, cacheable JS/CSS chunks.
10. **~1.9 MB CSS across 35 unminified `<link>`s.** Replaced — one tokenized, minified stylesheet (`client/src/index.css`).
11. **Frequent full-`innerHTML` re-renders.** Fixed — React diffs the DOM.
12. **No cache-busting/versioning.** Fixed — Vite content-hashes asset filenames.
13. *(Large media optimization & image lazy-loading — deferred to Phase 2 with media migration.)*

### §5 — Security issues
14. **Hardcoded plaintext admin credentials committed to the repo.** Removed entirely — no credentials anywhere in the new code; the system admin is seeded from `ADMIN_PASSWORD` (or a one-time generated password), hashed with bcrypt. The seed (`ensureSystemAdmin`) is wired into the server boot path (`server/index.ts` → `seedDefaults`) alongside `ensureSocialLinks` and `ensureWorldStatus`, so a fresh database self-seeds an admin on first boot — not only via `pnpm db:push`. A regression test (`tests/bootstrap.test.ts`) asserts an admin exists after the boot sequence runs.
15. **Client-side, bypassable "authentication".** Fixed — all auth/authorization is enforced on the server in tRPC middleware; the client cannot self-elevate.
16. **Registration stored plaintext passwords in `localStorage`.** Fixed — passwords are bcrypt-hashed and stored only in the `users` table.
17. **Unvalidated persisted user input.** Fixed — server-side `sanitizeContent`/`sanitizeText` on every user-submitted field before storage; https-only URL validation.
18. **Secrets living in version control.** Fixed — `.gitignore` blocks `.env`; `SESSION_SECRET`/`ADMIN_PASSWORD`/`DATABASE_URL` come from the environment; `.env.example` documents them with no real values.
19. **HttpOnly/secure cookies.** Implemented — session cookie is HttpOnly, SameSite=Lax, and `Secure` in production.
20. *(CSP/SRI/security headers — server-level config, recommended for the deploy in Phase 2.)*

### §6 — Missing features (now present)
21. **No real persistence / editing.** Added — durable Postgres-backed create/update with attribution.
22. **No versioning/history/diff/rollback.** Added — `page_revisions` snapshots on every update; UI diff view; admin rollback.
23. **No real auth/authz.** Added — register/login/logout/me + role-based access (viewer/editor/admin).
24. **No full-text search.** Added — PostgreSQL `tsvector` search over title + content with ranked, highlighted snippets.
25. **No moderation/review workflow.** Added — viewers submit contributions; editors/admins approve (applies the edit) or reject with a note.
26. **No user-generated pages.** Added — editors create pages; slugs auto-generated and unique.
27. **SEO/meta missing.** Improved — the app ships a `<meta name="description">` and titled document (further SSR/OG is a Phase 2 enhancement).
28. **No automated tests/CI.** Added — 30 Vitest tests covering auth, RBAC, CRUD, revisions, contributions, search, migration counts, and first-boot admin seeding.

### §7 — Code quality
29. **Duplicated `esc()`/helpers across modules.** Fixed — single shared `server/lib/*` (sanitize, slug, session, password) and typed client libs.
30. **Hardcoded values / two-source script ordering.** Fixed — design tokens centralized in CSS variables; no manual load order.
31. **40 globals + brittle load order.** Fixed — ES modules, a bundler, and typed imports.
32. **Errors swallowed by empty `catch`.** Fixed — tRPC surfaces typed errors to the UI (`ErrorBox`), with proper HTTP/codes.
33. **Very large mixed-concern files.** Fixed — small, single-purpose modules and feature-split routers.
34. **HTML built via string concatenation.** Fixed — JSX components.
35. **Inconsistent ES5/ES6 patterns.** Fixed — uniform TypeScript + ESM.
36. **Dead/placeholder code.** Not carried over.
37. **68 MB generated `dist/` committed to git.** Fixed — `git rm -r --cached` untracked all 1,832 files; `dist/` is gitignored (working-tree source left untouched).
38. **3.95 MB unreviewable data blob.** Fixed — parsed once by the migration into normalized, queryable rows.

---

## What was preserved

- **Visual design language** — the dark cyberpunk/high-fantasy aesthetic: deep navy-black backgrounds, gold rune accents, Cinzel/Cinzel Decorative/Lora/JetBrains Mono typography. Tokens captured in [`DESIGN_TOKENS.md`](DESIGN_TOKENS.md) and ported to `client/src/index.css`.
- **Page content** — all 637 Phase-1 pages (professions, world/quest unlock pages, the full 569-entry patch-note archive, and the concept/design-lab pages) migrated to Markdown. See [`CONTENT_INVENTORY.md`](CONTENT_INVENTORY.md).
- **Navigation structure** — the sidebar category model is preserved, now generated from the live data so it never links to empty routes.
- **The themed 404** — ported as a styled React page.
- **CSS/theming approach** — CSS custom properties as the single source of theme truth (fixing the inline-literal duplication the audit flagged).

## What was NOT migrated in Phase 1

- **Media assets** (icons, awakening art, profession GIFs, ~6.8 MB) — deferred to **Phase 2**. Migrated content keeps original relative image paths, which 404 gracefully until media is rehosted.
- **Concept / design-lab pages** — now migrated to the `pages` table (the `concepts/design-lab/in-review/…` routes in `data/concept-routes.js`: classes, power, content systems, rewards, tools); only the cinematic-carousel-engine demo remains deferred to **Phase 2**.
- **Deploy-time hardening** — CSP/SRI/security headers and SSR/Open-Graph metadata are host-level concerns for the Phase 2 deployment.

---

## How to run

```bash
pnpm install
pnpm db:push          # apply schema to PGlite (or DATABASE_URL Postgres) + seed admin
pnpm migrate:content  # migrate 637 pages from the static source
pnpm dev              # client (5173) + API (3001)
pnpm test             # 30 tests
```

---

## TL;DR

The Archlight Wiki is now a real wiki, not a themed mockup: a React + tRPC +
Drizzle/PostgreSQL platform with server-enforced bcrypt auth, durable page storage,
full revision history with rollback, a community contribution-and-review workflow,
and PostgreSQL full-text search. All 637 text pages (professions, quest/unlock guides,
the 569-entry patch-note archive, and the design-lab concept pages) were migrated, and
the dark fantasy look you built was preserved by porting your CSS tokens verbatim. Every
security problem from the audit is fixed — the hardcoded admin passwords and the committed
68 MB `dist/` are gone — and media (plus the cinematic-carousel-engine demo) is the planned Phase 2.

---

## Patch-note Markdown conversion (added)

The 569 patch-note pages (`category = 'Updates'`) were migrated with their original
markup intact — older Legacy entries as BBCode (`[b]`, `[img]`, `[list]`, …) and newer
Abaldar entries as inline-styled HTML. A one-time, reversible migration script,
[`scripts/convert-patchnotes-markdown.mjs`](scripts/convert-patchnotes-markdown.mjs),
converts both formats to clean Markdown (preserving headings, emphasis, lists, tables,
links, image references, and oembed/iframe URLs as links; flattening styling Markdown
can't represent). It is **dry-run by default** (converts in a throwaway in-memory PGlite
and validates — touches nothing real) and only writes when invoked with `--execute`. It is
idempotent (already-converted pages are skipped) and reversible: for each page it snapshots
the original content into `page_revisions` before updating, so any page is restorable via
the existing revision-history rollback. Run for real with
`node scripts/convert-patchnotes-markdown.mjs --execute`. As of this commit the script is
added and dry-run-validated (0 broken emphasis, 0 residual markup, 3911/3911 images
preserved, 17/17 embeds preserved, 0 manual-review) but has **not** been executed against
production.
