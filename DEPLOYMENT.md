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

## Cloudflare references

Checked on 6 October 2026:

- Git integration: https://developers.cloudflare.com/pages/get-started/git-integration/
- Direct Upload and its project-type limitation: https://developers.cloudflare.com/pages/get-started/direct-upload/
- Static HTML: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- Custom domain setup: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Redirect Pages hostname after domain setup: https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/

Dashboard wording can change; select Pages rather than a Worker application.
