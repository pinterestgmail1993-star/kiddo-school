# Deploy Kiddo.school to Cloudflare Pages

The site is deployed at https://kiddo-school.pages.dev from the `main` branch of `pinterestgmail1993-star/kiddo-school`. Pushes to `main` trigger an automatic build; a GitHub commit alone does not prove deployment succeeded, so load the new routes after each build.

## Current Pages configuration

- Project URL: https://kiddo-school.pages.dev. Branch: `main`. Framework preset: None.
- Build command: `npm run build`. Output directory: `dist`. Root: repository root.
- Node: 22 or newer (set `NODE_VERSION=22` if required).

## Indexing

`site.config.json` sets `siteUrl` to the Pages URL and, since the first Kiddo School lesson (newborn high-contrast cards), `indexable: true` — the SEO work (canonical URLs, sitemap, structured data) assumes a public site. The Pages environment variable `SITE_INDEXABLE` overrides this config and is currently still `false`, so deploys stay `noindex` until you flip it. To launch indexing: Pages dashboard → Settings → Environment variables → set `SITE_INDEXABLE=true` (or remove it) → retry deployment. Non-main branch builds stay noindex regardless of settings.

## Images and R2

Website imagery is served from the public R2 development URL `https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/` (bucket `kiddo-school-assets`; the bucket name is not part of the public URL). Each activity folder lives under `activities/<subject>/<activity>/` and holds 1024×1536 WebP worksheets; the maths set is at `activities/maths/repeating-pattern/`. The Content-Security-Policy in `scripts/build.mjs` allow-lists this origin. If assets move to a custom domain later, update each `src/*-project.mjs` base and the CSP together, and verify every replacement URL.

## Option A: Git integration (current setup)

1. Commit source, tests and the regenerated `dist/` folder, then push to `main`.
2. Watch the Cloudflare Pages build, then load the actual new routes to confirm.
3. Keep `SITE_INDEXABLE=false` while reviewing; set it to `true` only for launch, then rebuild.

## Option B: direct upload

Use a Pages **Direct Upload** project only deliberately: a Direct Upload project cannot later be switched to Git integration without creating a new project. Upload the **contents** of a freshly built `dist/` folder (with `index.html` at the root), not the repository. Rebuild and re-upload after any change; environment variables do not rewrite already-built HTML.

## Connect a domain when you own it

1. Buy the domain and verify availability and renewal cost with the registrar.
2. Pages project → Custom domains → set up the domain before DNS changes.
3. Follow Cloudflare's DNS instructions; an apex domain such as `kiddo.school` must be a zone in the same Cloudflare account.
4. Wait for the domain and HTTPS certificate to activate.
5. Change `SITE_URL` (or `siteUrl`) to the verified HTTPS origin and rebuild; recheck canonical tags and the sitemap.
6. Redirect other owned hostnames and the old Pages hostname only after the preferred domain works.

## Final checks

- All nine activity guides, their sub-activity pages and all subject/age pages load directly.
- Refreshing an activity URL works; unknown paths return the 404 page and HTTP 404.
- Search, age and subject filters, clear buttons and downloads work on phone and desktop.
- Inspect `build-info.json`, canonical tags, `/sitemap.xml`, `/robots.txt` and response headers.
- Revisit the privacy text before adding forms, analytics or advertisements. No advertising integration or approval is included.

## Community backend (D1 + R2 + Access)

The community features (Principal's Office, Sticky Note Wall, Art Wall submissions, page reviews and comments) run on Pages Functions (`functions/`) with Cloudflare D1 (binding `DB`) and a private R2 bucket (binding `ART_UPLOADS`). Everything is fail-closed and honest: until a binding or migration exists, the affected endpoints return a clear 503 — they never fake success.

### 1. D1 database (binding `DB`)

The production D1 database is `kiddo-school-db`. Its tables are created by `migrations/0001_community.sql` (idempotent `IF NOT EXISTS`; nothing existing is dropped or deleted). Run it once:

- Dashboard: Cloudflare → Storage & Databases → D1 → `kiddo-school-db` → Console → paste the file contents → Run, **or**
- CLI: `npx wrangler d1 execute kiddo-school-db --remote --file migrations/0001_community.sql`

Pages → Settings → Bindings: confirm the D1 binding name is exactly `DB` → `kiddo-school-db`. Tables: `principal_messages`, `sticky_notes`, `art_submissions`, `page_reviews`, `page_comments`, `rate_limits`.

### 2. R2 bucket for submitted artwork (binding `ART_UPLOADS`)

Create a **private** bucket (dashboard → R2 → Create bucket → name it `kiddo-school-community-uploads`; do NOT enable the public r2.dev access) and bind it in Pages → Settings → Bindings → R2 → binding name exactly `ART_UPLOADS`. Pending submissions land under `pending/…` keys and are served only through the Access-protected admin preview or, after approval, `/api/community/art/<id>/image`. The bucket is separate from the public `kiddo-school-assets` bucket that holds the 11 starter drawings; starter art is never written to. Until this binding exists, artwork uploads answer 503 honestly.

### 3. Optional: Turnstile (spam protection)

Set Pages environment variables `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` (Turnstile dashboard → Add site, managed widget). Without them the forms simply skip the human check; the honeypot, same-origin + custom-header CSRF guard, per-IP D1 rate limits and server-side validation remain active.

### Verifying a deployment (no admin needed)

After every deploy — and specifically after adding a new binding, which Pages bakes into NEW deployments only — run the public verification suite from the repo root:

```
node scripts/qa-community-live.mjs
```

It checks the GET endpoints, CSRF guards, validation errors, all five submission endpoints, pending-content privacy (nothing pending is ever publicly readable) and the fail-closed admin. It writes a small number of rows clearly labeled `QA Deploy Check` (plus one bare `x` sticky row if an older version of the script ran) — delete them any time from the D1 console:

```sql
DELETE FROM sticky_notes       WHERE display_name = 'QA Deploy Check' OR message = 'x';
DELETE FROM principal_messages WHERE parent_name   = 'QA Deploy Check';
DELETE FROM page_reviews       WHERE display_name = 'QA Deploy Check';
DELETE FROM page_comments      WHERE display_name = 'QA Deploy Check';
DELETE FROM art_submissions    WHERE display_name = 'QA Deploy Check';
```

### 4. Admin login (username + password — fail-closed)

`/admin/*` and `/api/admin/*` are protected by a server-side session login (`functions/lib/access.js` + `functions/lib/passwords.js`). Until two secrets are configured the admin is a locked door (503) — there is no default account, no hidden URL and nothing to discover.

How it works: the password is stored ONLY as a PBKDF2-HMAC-SHA256 hash (100,000 iterations, random salt) in the `ADMIN_PASSWORD_HASH` secret — never plaintext, never in the repo. Login sets a signed, HttpOnly + Secure + SameSite=Strict session cookie (12-hour expiry). Login attempts are rate-limited per IP in D1 (5 per 10-minute window), the login form carries a CSRF token, and state-changing admin API calls additionally require the same-origin + custom-header guard. Logout expires the cookie.

To set it up:

1. On your own machine, in the repo root, run:

   ```
   node scripts/hash-admin-password.mjs
   ```

   Type a long password (12+ characters) twice. It prints one `ADMIN_PASSWORD_HASH` value. The password itself never touches the repo, GitHub, the shell history, the database or any log.

2. Cloudflare dashboard → Pages → kiddo-school → Settings → Environment variables → Add (production):
   - `ADMIN_USERNAME` — your login name (an email or a username), type **Secret**
   - `ADMIN_PASSWORD_HASH` — the printed value, type **Secret**
   - optional `ADMIN_SESSION_SECRET` — any long random string; when omitted the session-signing key is derived from the password hash (also fine)
3. **Redeploy** — environment variables are baked into NEW deployments only (Deployments → latest → Retry deployment, or push any commit).
4. Load `/admin/` → the login page appears → log in with the username + password → the Kiddo School Admin dashboard shows the five real queues. Use **Log out** when you are done.

If your plan enforces tight CPU limits and login ever returns a 500, regenerate the hash with fewer iterations (`node scripts/hash-admin-password.mjs --iterations 50000`) and update the secret — the parameters travel inside the hash string, so the runtime honors them without code changes. The old Cloudflare Access variables (`CF_ACCESS_TEAM`, `CF_ACCESS_AUD`) and any Access applications for this domain can be removed; the code no longer reads them.

Notes: admin pages/APIs send `X-Robots-Tag: noindex, nofollow`, are excluded from the sitemap, and never appear in the public navigation. Sessions are stateless signed tokens (no session table — the D1 schema is untouched); logout clears the cookie, and the 12-hour expiry bounds anything copied from an unlocked browser.

### 5. Migration status checks

- `GET /api/community/config` → `{"ok":true,"turnstileSiteKey":null|…}` proves the Functions are live.
- Before the migration, submissions answer 503 with the honest "records room isn't connected" message; after it, they return the real success strings.
- The admin dashboard cards show real `COUNT(*)` values from D1 — zeros are real zeros.

## Cloudflare references

Checked on 6 October 2026:

- Git integration: https://developers.cloudflare.com/pages/get-started/git-integration/
- Direct Upload and its project-type limitation: https://developers.cloudflare.com/pages/get-started/direct-upload/
- Static HTML: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- Custom domain setup: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Redirect Pages hostname after domain setup: https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/

Dashboard wording can change; select Pages rather than a Worker application.
