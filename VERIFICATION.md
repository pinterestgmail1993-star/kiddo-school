# Pilot verification

## Completed

- Dependency-free Node build: 24 HTML pages, six original activity illustrations and six printable SVG image sheets.
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
