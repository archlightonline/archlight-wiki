# Archlight Wiki — Codebase Audit

_Audit date: 2026-05-29. Static analysis only — no files were modified and the app was not run._

This audit covers the source rooted at `archlight_wiki_v534_concepts_static_hosts_fixed/` (the
git working tree, `index.html` + `assets/` + `data/` + `concepts/` + `scripts/` + `dist/`).

---

## 1. Tech stack and file structure

**Stack**
- **No framework, no build pipeline beyond one Python script.** This is a hand-written
  single-page application built from vanilla ES5/ES6 JavaScript, plain CSS, and static HTML.
- **Languages:** JavaScript (28 modules in `assets/js/` + ~6 data modules in `data/`), CSS
  (35 modules), HTML (110 files, but half are duplicated into `dist/`), and one Python 3 file.
- **Dependencies:** Effectively none. The only external dependency is Google Fonts loaded over
  CDN (`fonts.googleapis.com`). There is no `package.json`, no `node_modules`, no npm/yarn, no
  bundler, no test runner, no linter config. The `.gitignore` references `node_modules/` and
  `.venv/` defensively but neither is used.
- **Backend:** **There is none.** No server code, no API, no database. Every byte is served as a
  static file. All "dynamic" behavior runs in the browser; all "persistence" is `localStorage`.

**How it loads.** `index.html` (1,745 lines, ~209 KB) is the shell. It pulls in 35 `<link>`
stylesheets and then, at the bottom, ~40 `<script src>` tags **in a hard-coded dependency order**
(globals must be defined before consumers run). The data modules attach big object literals to
`window` (e.g. `window.ARCHLIGHT_UPDATES_DATA`, `window.ARCHLIGHT_ADMIN_USERS`,
`window.UnlockTasks`); the JS modules are IIFEs that read those globals and register routes.

**Routing.** `assets/js/app.js` is a hash-router. `window.go(id)` resolves a route id, calls its
`render()`, toggles the matching `#pg-<id>` element's `.on` class, and updates `location.hash`.
A page registry (`page-registry.js`) and `navigation.js` define the sidebar/nav model.

**Concept pages.** `concepts/` is a *separate* set of standalone HTML files (design-lab "in-review"
and "legacy" content) with their own shared CSS/JS under `concepts/shared/`. They are linked into
the SPA via `data/concept-routes.js` + `concept-preview-routes.js` rather than inlined.

**Build.** `scripts/build-standalone.py` reads `index.html`, string-replaces each `<link>`/`<script
src>` with the inlined file contents, and writes a single 6.7 MB `dist/archlight_wiki_standalone.html`.
It then `copytree`s `assets/media`, `assets/images`, and all of `concepts/` into `dist/`.

```txt
index.html              SPA shell (~209 KB, 1745 lines)
assets/css/   (35 files, ~1.9 MB combined; wiki-shell.css alone is ~1 MB)
assets/js/    (28 files, ~477 KB combined; admin-panel.js ~100 KB, updates.js ~72 KB)
assets/media/ (~6.8 MB — class/ability icons, awakening art, etc.)
assets/images/
data/         (window-global data: updates-data.js is ~3.95 MB)
concepts/     (110-ish standalone concept HTML pages + concepts/shared/)
scripts/      (build-standalone.py)
dist/         (~68 MB — a committed, generated full duplicate of the site)
```

---

## 2. What works correctly (appears solid)

- **Hash routing & SPA navigation.** `app.js` is coherent: route registration, alias handling,
  deep-link section parsing (`page/section`), sidebar active-state syncing, and a real
  **404 fallback** (`renderFallback`) for unknown routes. This is more complete than typical
  for a hand-rolled router.
- **Client-side search.** `bindSearch()` provides a working type-ahead over page titles/categories
  with a dropdown. (Caveat: title/category only — see §6.)
- **Consistent HTML-escaping helper.** Almost every module defines an `esc()` that escapes
  `& < > " '`, and it is used widely when interpolating data into `innerHTML`. This meaningfully
  reduces XSS exposure for the data-driven content.
- **The contribution editor** (`wiki-editor.js`) is well-structured for what it is: it extracts the
  current page text, offers edit/issue/idea modes, a `contenteditable` formatter, and a
  copy/download report flow. It correctly hides itself on system pages (home, admin, profile, etc.).
- **Defensive global guards.** Modules use `if(window.__flag) return; window.__flag = true;` to
  avoid double-initialization, and lean heavily on optional chaining (`api?.fn?.()`) so a missing
  dependency degrades instead of throwing.
- **Accessibility basics.** Dialogs set `role="dialog"`/`aria-modal`, nav items are keyboard
  operable (Enter/Space), Escape closes modals, and inputs carry `autocomplete` hints.
- **The standalone build script works** and is simple enough to reason about — it produces a
  single-file deliverable suitable for offline/file:// hosting.

---

## 3. Bugs and broken logic

- **`window.openLoginModal` / `doLogoutAll` are defined twice with conflicting bodies.** `app.js`
  sets `window.openLoginModal = function(){ alert('Login tools are not available in this build
  yet.') }` and `window.doLogoutAll = function(){}` (no-ops). `login.js` later overrides both with
  real implementations. It works *only because* the script order in `index.html` loads `login.js`
  after `app.js`. Reorder the tags (or the build's `script_order`) and login silently breaks. This
  is fragile dead code that should be removed from `app.js`.
- **Two divergent admin-user lists.** `data/admin-users.js` defines `fluffyadmin` **and**
  `fluffydrakoz`; the `login.js` fallback (used if the data file isn't present, e.g. some build
  paths) defines **only** `fluffydrakoz`. The two can drift, and `fluffyadmin` would not exist in
  the fallback path.
- **Profile-photo URL is not validated as safe.** In `login.js`, a pasted "image URL" is stored and
  later rendered as `<img src="<esc(url)>">`. `esc()` neutralizes a broken-out attribute, but a
  `javascript:`-style or tracking URL is accepted verbatim; there is no scheme allow-list. Low
  severity for `<img src>` specifically, but it's unvalidated user input persisted to storage.
- **`extractPageText()` hard-caps at 140 chunks / dedupes by lowercased line.** For long pages the
  editor silently truncates the "current text," and legitimately repeated short lines are dropped.
  The generated edit report can therefore misrepresent the page.
- **`titleToPageId()` fuzzy matching can mis-route "featured" pages.** It does substring matching
  (`text.includes(t) || t.includes(text)`), so a short page title that is a substring of another
  can resolve the wrong page for the "Recently Updated" sidebar feature.
- **`document.execCommand` formatting is deprecated** (`wiki-editor.js`). It still works in current
  browsers but is on a deprecation path and behaves inconsistently across engines; the formatter
  will eventually rot.
- **Polling timers never cleared.** `wiki-editor.js` runs `setInterval(updateVisibility, 700)` and a
  capturing document click handler that fires `setTimeout(retarget, 60)` on *every* click. These
  run for the life of the page; combined they cause steady, avoidable churn (see §4).

---

## 4. Performance risks

- **A ~3.95 MB JavaScript data file (`data/updates-data.js`) is loaded synchronously** via a blocking
  `<script src>` in the document. It parses on the main thread before the page is interactive, on
  every visit, even for users who never open the Updates page. This is by far the biggest perf
  problem. It should be lazy-loaded (fetch on demand) or split per year/world.
- **The standalone build is a single 6.7 MB HTML file.** Inlining everything defeats browser
  caching entirely — every visit re-downloads all CSS+JS+data inline. Acceptable for offline use,
  poor for web hosting.
- **`assets/css/wiki-shell.css` is ~1 MB**, and ~1.9 MB of CSS is loaded across 35 separate
  `<link>` requests with no minification and no concatenation in the non-standalone path.
- **Large, unoptimized media.** Several committed GIFs are 2.4–3.1 MB each
  (`professions-media/cutting_wood.gif`, `skinning.gif`, `mining.gif`, `npc.gif`) and multiple PNGs
  exceed 1 MB. No responsive sizes, no WebP/AVIF, no compression pass.
- **Essentially no lazy-loading of images** across the concept pages (only 2 files use
  `loading="lazy"`).
- **Hot timers / per-click work** in `wiki-editor.js` (the 700 ms interval and the capture-phase
  click→`setTimeout` on the whole document) add constant background work.
- **Caching:** there is no service worker, no `manifest.json`, and no cache-busting/versioning on
  asset URLs, so deploys risk stale-asset issues and there is no offline story for the web build.
- **Frequent full-`innerHTML` re-renders.** `admin-panel.js` (29 `innerHTML` writes) and others
  rebuild large DOM subtrees by string concatenation rather than diffing; fine at this scale but a
  cost multiplier as data grows.

---

## 5. Security issues

> Context: this is a static, client-only site with no server trust boundary, so "auth" here is
> purely cosmetic. The findings below matter most if anyone believes the admin gate is real.

- **Hard-coded plaintext admin credentials committed to the repo.**
  `data/admin-users.js` and `login.js` contain:
  - `fluffyadmin` / `archlight-admin` (role `wiki_admin`)
  - `fluffydrakoz` / `archlight2025` (role `wiki_admin`)
  - `tester` / `archlight` (role `contributor`)

  These ship to every browser in plaintext and are visible in page source. **Anyone can read them
  and "log in" as a wiki admin.** Even though the admin panel only writes to `localStorage`, these
  passwords are almost certainly reused elsewhere and should be treated as compromised and rotated.
- **"Authentication" is entirely client-side and trivially bypassable.** Login compares
  `user.password === password` in the browser; the session is just a `localStorage` JSON blob
  (`archlight_clean_login_session`). A user can set `window.currentRole = 'wiki_admin'` in the
  console or write the localStorage key directly to unlock every admin feature. There is no real
  access control — the admin panel must not be relied on to gate anything sensitive.
- **Self-service "registration" stores passwords in plaintext in `localStorage`**
  (`archlight_player_accounts`), per-browser, unencrypted.
- **No Content-Security-Policy, no Subresource Integrity** on the Google Fonts CDN link, and no
  security headers are expressible from static files alone (would need host/CDN config).
- **Unvalidated persisted user input** (profile photo URL, registration display name) — see §3.
- **No secrets-management story.** The credentials living in version control means the git history
  retains them even if removed later.

Net: nothing here is *server*-exploitable because there is no server, but the credentials are a real
secret-exposure problem, and the admin/login system provides a false sense of protection.

---

## 6. Missing features (things a wiki normally has)

- **No real persistence / no actual editing.** The "Edit Page" flow does **not** save anywhere — it
  generates a text report the user copies or downloads for someone to apply manually. There is no
  database, no API, no commit path. This is the single biggest functional gap for a "wiki."
- **No page versioning / history / diffs / rollback** — core to any wiki.
- **No real authentication or authorization** (see §5).
- **Full-text search is absent.** Search matches page *titles and categories* only, not body
  content. No search index.
- **No moderation/review workflow** beyond "copy this text and send it somewhere."
- **No user-generated page creation** — pages are hard-coded routes; contributors cannot add pages.
- **SEO/sharing metadata missing.** `index.html` has **no** `<meta name="description">`, no
  Open Graph, no Twitter cards. As a hash-routed SPA with no SSR/prerender, individual wiki pages
  are also largely invisible to crawlers.
- **No sitemap, no robots.txt, no `manifest.json`, no favicon pipeline, no service worker/offline.**
- **No analytics/telemetry, no error reporting.**
- **No i18n.** Content and UI strings are inline English.
- **No automated tests of any kind**, and no CI.
- _Present and working:_ a 404 fallback page **does** exist (good — often missing).

---

## 7. Code quality issues

- **Pervasive duplicated helpers.** `esc()`, `$`/`q`, `$$`/`qa`, `cleanText()`, and `slugValue()`
  are re-implemented in nearly every module (and inconsistently — some escape 3 chars, some 5).
  These should be one shared utility module.
- **Hard-coded values everywhere:** credentials, the script/CSS load order duplicated between
  `index.html` and `build-standalone.py` (two sources of truth that must be kept in sync by hand),
  magic numbers (140-chunk cap, 700 ms interval, image size limits), and inline color literals.
- **Reliance on global window namespace and load-order.** ~40 scripts communicate through `window.*`
  globals with a brittle, manually-maintained ordering. No module system (no ESM, no bundler).
- **Thin error handling.** The dominant pattern is `try { ... } catch(e){}` — errors are swallowed
  silently (localStorage failures, JSON parse failures, clipboard failures). Failures are invisible
  to both user and developer.
- **Very large files / mixed concerns.** `admin-panel.js` (~100 KB) and `updates.js` (~72 KB) bundle
  rendering, state, parsing, and persistence together. `wiki-shell.css` is ~1 MB.
- **HTML built via long string concatenation** (e.g. the entire login modal is one `'' + '<div...>'
  + ...` chain), which is hard to read/maintain and easy to break escaping in.
- **Inconsistent patterns:** ES5 `var`/IIFE in some files vs. `const`/arrow/optional-chaining in
  others; mixed quote styles; deprecated `document.execCommand`.
- **Dead/placeholder code:** the no-op `openLoginModal`/`doLogoutAll` in `app.js`,
  `REMOVED_LIVE_PAGE_PLACEHOLDERS` describing content that was deleted, and "design lab" stubs.
- **`dist/` (a 68 MB generated artifact) is committed to git**, doubling the entire site —
  including all media — inside the repo. Generated output generally should not be version-controlled
  (the `.gitignore` even has a commented-out `# dist/` line acknowledging this).
- **The 3.95 MB `updates-data.js` is effectively un-reviewable** as a hand-edited source file; it
  reads like a machine-dumped blob (note the `cleanText()` routines that strip `Â`, BOM, and
  `&nbsp;` artifacts — evidence the data was scraped/pasted and is being repaired at runtime).

---

## 8. Overall verdict

**The presentation layer is genuinely decent; the foundation is not a wiki.**

What's good is real: the routing, the theming, the component-by-component UI, the 404 handling, the
consistent escaping, and the breadth of content/polish represent a lot of solid front-end work. If
the goal is *a static marketing/landing/codex site with a fancy themed shell*, much of this is
salvageable as-is.

But measured against "a wiki," the core is missing entirely: **no backend, no persistence, no real
editing, no versioning, no real auth, no full-text search.** The "login/admin/contribute" surface is
an elaborate client-side simulation that writes to `localStorage` and emails-by-copy-paste. You
cannot incrementally bolt durable, multi-user, server-backed wiki semantics onto a pile of
load-order-dependent `window` globals and a 6.7 MB inlined HTML build without substantial rework.

**Recommendation: hybrid — keep the front-end, rebuild the platform.**

- **Do NOT throw away** the CSS/theming, the concept content, the media, and the page/UI components.
  Harvest them.
- **Do rebuild the application skeleton** on a real foundation. Concretely:
  1. **Immediately rotate** the committed admin passwords; purge them from history; stop committing
     `dist/`.
  2. Pick an actual wiki platform or a framework with a backend (e.g. a static-site generator like
     Astro/11ty if it can stay read-only, or a real app + DB + auth if editing/versioning/users are
     required — which the current UI implies they are).
  3. Move the ~4 MB updates dataset out of a blocking script into an on-demand data source.
  4. Replace the 40-globals-in-order architecture with modules/a bundler, and de-duplicate the
     shared helpers.

In short: a **clean rebuild of the architecture** is faster and safer than refactoring the current
glue, but it should be a *port* that reuses the existing visual design and content rather than a
from-scratch redesign. The art and styling are the asset worth keeping; the plumbing is not.

---

### Appendix — quick facts
- Tracked files: ~3,731 (2,480 PNG, 878 GIF, 110 HTML, 87 JS, 85 CSS, 1 PY).
- Repo working tree ~132 MB; `dist/` ~68 MB of that is a committed duplicate.
- Largest source files: `data/updates-data.js` ~3.95 MB, several profession GIFs 2.4–3.1 MB,
  `assets/css/wiki-shell.css` ~1 MB.
- No `package.json`, no tests, no CI, no server code, no external runtime dependencies (Google Fonts
  CDN only).
- Network calls from JS: **none** — the app makes no `fetch`/XHR; all data is baked into `window`.
