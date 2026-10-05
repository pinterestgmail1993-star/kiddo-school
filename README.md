# KIDDO.SCHOOL

**Make · Learn · Discover.** A pink classroom-style static activity website for children and the adults learning alongside them.

## Pilot contents

- 25 static HTML pages: homepage, subject and age collections, searchable activity catalogue, six complete activity guides, grown-up guidance, about, privacy and a real 404 page.
- Six original SVG illustrations and seven printable SVG activity sheets; no external asset hosting required.
- Accessible native controls, labelled search and filters, skip link, visible focus styles, reduced-motion support and print styles.
- Permanent activity URLs, descriptive metadata, canonical tags, structured data, robots.txt and sitemap.xml.
- No database, accounts, server functions, tracking scripts, external fonts or build dependencies.

The six activities are Grow a bean, Make a shape collage, Make a repeating pattern, Draw a story map, Make a sound map and Build a paper bridge.

## Run locally

Install Node.js 22 or newer. No `npm install` is required for the site itself.

```sh
npm run build
npm test
npm run preview
```

Open http://localhost:4173. Root-relative links require a web server; double-clicking HTML files is not a supported preview method.

The on-screen handwriting practice at `/literacy/handwriting-practice/` supports pointer input, undo, guide lines and local PNG export. Physical touch/stylus testing remains needed. Read [ASSETS.md](ASSETS.md) for the 29-file R2 asset pack and folder structure.

The checked-in `dist/` folder is the complete prebuilt **preview** website. It has indexing disabled until the real public URL is known. Cloudflare Pages is connected at https://kiddo-school.pages.dev; production commits trigger a build. Indexing stays disabled during review.

## Publish later

Read [DEPLOYMENT.md](DEPLOYMENT.md). You can use Cloudflare Pages before buying a domain. Keep this repository private; Pages can build from a private GitHub repository. The deployed website itself will be public unless you separately configure access restrictions.

Set the real public origin in `site.config.json` or the `SITE_URL` environment variable. Set `indexable` to `true` (or `SITE_INDEXABLE=true`) only when ready to publish. Rebuild so every canonical URL and the sitemap use that origin. With no origin configured, the build uses localhost and blocks indexing. Search and error pages remain noindex. Cloudflare branches other than `main` remain noindex.

## Edit and extend

- `data/activities.json`: content, age groups, materials, steps, adaptations and sheet labels. Each slug is permanent; preserve it after publishing.
- `scripts/build.mjs`: page templates, subject definitions, age groups and SEO output.
- `scripts/illustrations.mjs`: original SVG artwork and printable image generation.
- `public/assets/style.css`: scrapbook design and responsive styles.
- `public/assets/site.js`: browser-only search and filtering.
- `scripts/serve.mjs`: local preview server; not used by Cloudflare.
- `tests/`: static integrity and shipped-search-script behavior checks.

Run build and tests after changes, and commit both source and regenerated `dist/`. The current pilot has deliberately fixed counts and subject collections; update navigation, homepage counts and tests when adding more activities. Each activity should retain a useful introduction, complete materials and instructions, specific safety notes, learning explanation, age adaptations and a real download.

## Assets and permissions

Illustrations and activity sheets in this repository were created for this pilot; no stock photographs or external fonts are used. The website allows visitors to print the activity sheets for personal and classroom use. No broad open-source license is granted for the entire repository. Cloudflare asset URLs can be incorporated later when supplied; do not substitute guessed URLs.

## Verification status

See [VERIFICATION.md](VERIFICATION.md) for checks performed and the outstanding real-browser visual review. This pilot makes no claims about AdSense approval, accreditation, owner identity or testimonials.
