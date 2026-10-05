# Pilot verification

## Completed

- Dependency-free Node build: 32 HTML pages, six original activity illustrations and seven printable SVG image sheets.
- Automated tests of all internal page/asset links and fragment targets, permanent activity routes, unique titles/descriptions, image alt text and dimensions, canonical origins, JSON-LD, sitemap coverage and noindex preview safeguards.
- Executed the shipped search script against built activity attributes: case/whitespace normalization, multiword search, subject/age combinations, no-results state, clear/reset, URL-initialized filters, invalid filters, submit handling and safe query encoding.
- Production-origin build and noindex preview build checks.
- Local HTTP checks of all pages/assets and missing-page behavior.
- SVG assets parsed and rasterized for integrity. Bean illustration and bridge worksheet visually inspected; text fit and artwork render correctly.
- No external fonts, stock image dependencies, runtime fetches, analytics, database or app cookies.

## Outstanding before public launch

Real-browser desktop/mobile layout, keyboard interaction, download and print verification is **not yet complete**. The environment had no Chromium binary; its download returned an invalid archive. The separate browser could not access the local preview (`ERR_BLOCKED_BY_CLIENT`). Source/behavior tests are not a substitute for a rendered layout review. No desktop/mobile browser screenshot is claimed.

After opening the local preview or the first Cloudflare review deployment:

1. Check the homepage at 390px, 768px and 1440px widths. Verify no horizontal scrolling or overlapping cards, and that all navigation remains available.
2. Open `/science/grow-a-bean/` and `/engineering/paper-bridge/`. Inspect the supplies panel, long instructions, download section and related activities at phone and desktop widths.
3. Tab from the address bar: skip link, navigation, search inputs, selects, material checkboxes and download links must show focus and work with the keyboard.
4. Search `bean`, combine subject and age filters, force no results, then clear. Refresh a filtered URL and repeat the test. Disable JavaScript and confirm the full catalogue and category navigation are available.
5. Download an SVG; open it in a browser and print with portrait orientation and fit to page on A4 or Letter. Confirm all labels and boxes fit. Test the disclosure for troubleshooting and checklist toggles.
6. Check the browser console and network panel for missing resources or blocked scripts. Check that unknown paths return an actual HTTP 404 on Cloudflare.

The local server intentionally does not emulate Cloudflare `_headers`; verify those response headers after the first deployment. Social previews use a PNG card; crawler-specific preview appearance should also be checked after a public URL exists.

## Pink classroom update

Applied the approved pink, golden-yellow and purple theme. Added on-device handwriting at `/literacy/handwriting-practice/`, with trace prompts, pointer input, undo, clear, guide toggle and PNG download. Added descriptive illustration filenames. Re-ran static integrity/search checks and JavaScript syntax checks. Touch/stylus behavior and the new rendered layout still require real-device review; no handwriting recognition or grading is claimed.

## Seven-activity bean project

Built all seven separate routes and checked drawing areas, typed fields and export controls. Shipped-script tests cover pen-pointer drawing, clearing without erasing typed answers, undo restoration and inclusion of typed text plus drawings in the exported image. All nine automated tests pass. These script tests use a simulated document and do not replace physical touch/stylus or visual layout testing.

## Rainbow image connection

All eight user-hosted R2 WebP URLs returned HTTP 200 and image/webp on 2026-10-05. The content security policy permits images from that exact R2 origin. Seven interactive pages use the new worksheets; the bean cover replaces the old bean illustration. Nine automated tests pass. Physical touch/stylus and rendered layout checks remain outstanding.

## Sink or Float collection

Added the main guide and five interactive activity routes with the six user-hosted WebP images. All six image URLs returned HTTP 200 with image/webp. The build now has 38 pages. Tests cover one preview per activity page, correct water supervision guidance, drawing/export controls, catalogue search, internal links, metadata and sitemap. Physical touch/stylus and rendered layout review remain outstanding.

## Weather Journal

Added six routes using six verified HTTP-200 R2 WebP assets. Activity pages lead with a large single worksheet preview and use white backgrounds, short adjacent guidance, drawing and keyboard fields. Weekly journal clearly explains that work must be saved before leaving. Build: 44 pages. Automated checks cover image ordering, one preview, controls, metadata, links and sitemap. Real-device touch/stylus and visual browser review remain outstanding.

## Mixing Colours

Added the main art guide and five interactive pages. All six R2 image URLs returned HTTP 200 and image/webp. One 2:3 preview per activity; matching-card cutting instructions and paint-specific guidance included. Build now contains 50 pages. Physical touch/stylus and visual browser verification remain outstanding.
