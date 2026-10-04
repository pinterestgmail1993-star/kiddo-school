# Deploy Kiddo.school to Cloudflare Pages

Nothing has been deployed. You do not need to buy a domain before previewing the site.

## Option A: connect the private GitHub repository

This is convenient if future GitHub commits should update the site automatically.

1. In Cloudflare, open Workers & Pages and create a **Pages** project using Git integration.
2. Authorize access to `pinterestgmail1993-star/kiddo-school`. The repository can remain private.
3. Select production branch `main`, framework preset **None**, build command `npm run build`, build output directory `dist`, and leave the root directory at the repository root. Use Node.js 22 or newer (set `NODE_VERSION=22` if needed).
4. For the first preview, leave `SITE_URL` unset and indexing disabled. Deploy to obtain your actual `https://...pages.dev` address. The first build deliberately has localhost canonicals and noindex protections; it is a review build, not an SEO launch.
5. Copy the actual production Pages URL. Add `SITE_URL` with that origin only, without a path. Keep `SITE_INDEXABLE=false` while reviewing. Rebuild. Canonicals and sitemap now use the real preview address.
6. Perform the browser checks in VERIFICATION.md. When ready to launch, set `SITE_INDEXABLE=true` for the production environment and rebuild. Keep preview environment indexing disabled.

Use environment variables rather than changing the source config if you prefer. `SITE_URL` overrides `site.config.json`; `SITE_INDEXABLE=false` always disables indexing. Non-main Cloudflare branch builds are noindex regardless of the production setting.

## Option B: upload the finished files yourself

Use a Pages **Direct Upload** project if you prefer uploading folders or ZIP files manually. Choose this deliberately: Cloudflare documents that a Direct Upload project cannot later be switched to Git integration without making a new project.

1. Use the repository's prebuilt `dist/` folder for an initial review upload. Upload the **contents of dist**, not the source repository. `index.html` must be at the upload root.
2. In Workers & Pages, create a Pages application using drag and drop. Upload the `dist` folder (or a ZIP containing its contents) and deploy.
3. Send back the actual Pages URL, or set it yourself in `site.config.json` as `siteUrl`, then run `npm run build` and upload the regenerated `dist/` folder. Leave `indexable: false` until review is complete.
4. When ready to launch, set `indexable: true`, rebuild, run `npm test`, and upload again. Direct Upload has no build step after upload; environment variables there do not rewrite already-built HTML.

All images, scripts and download sheets are bundled. No database, R2 bucket, Worker, Pages Function or paid image service is required for this pilot.

## Connect a domain when you own it

1. Buy your chosen domain; verify availability and renewal cost with the registrar. The website does not assume you own `kiddo.school` yet.
2. Open your Pages project → Custom domains → Set up a custom domain. Add the domain there before setting up DNS.
3. Follow Cloudflare's DNS instructions. For an apex domain such as `kiddo.school`, Cloudflare requires the domain to be a zone in the same Cloudflare account with its nameservers configured. A subdomain can use a CNAME pointing to the Pages hostname according to the setup flow.
4. Wait for the domain and HTTPS certificate to become active.
5. Change `SITE_URL` (or `siteUrl`) to the verified HTTPS domain and rebuild/redeploy. Check the canonical tag and sitemap again.
6. Pick one preferred hostname. Configure redirects for other owned hostnames and the old production Pages hostname using Cloudflare's documented redirect method, after the preferred domain works. Do not redirect to a domain you have not registered and activated.

## Final checks

- Homepage, all six activity URLs and all subject/age pages load directly.
- Refreshing an activity URL works; unknown paths return the 404 page and HTTP 404 (no SPA catch-all).
- Search, age and subject filters, clear buttons and downloads work on a phone and desktop.
- Inspect `build-info.json`: correct origin and intended `indexable` status.
- Inspect page canonical tags, `/sitemap.xml`, `/robots.txt` and response headers.
- Keep the repository private. Publishing a website does not require changing repository visibility.
- Privacy text must be revisited if you add forms, analytics, advertisements or external services. No advertising integration or approval is included.

## Cloudflare references

Checked on 4 October 2026:

- Git integration: https://developers.cloudflare.com/pages/get-started/git-integration/
- Direct Upload and its project-type limitation: https://developers.cloudflare.com/pages/get-started/direct-upload/
- Static HTML: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- Custom domain setup: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Redirect Pages hostname after domain setup: https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/

Dashboard wording can change; select Pages rather than a Worker application.
