# Kiddo.school — Pink Classroom asset pack v1

29 original assets: seven activity illustrations (WebP and SVG), seven printable worksheets (PNG and SVG), and one favicon. The pink, golden-yellow and purple artwork matches the selected classroom theme.

## What to make first

1. Handwriting practice: trace A/a and 1/2/3, write a name, draw freely, undo and save an image. No accounts or uploads of children's work.
2. Grow a bean: the first complete hands-on science guide, with a printable observation diary.
3. Expand handwriting one carefully designed letter/number activity at a time after the first screen has been tested with a finger and stylus. Keep the existing six activity guides available.

## What to upload

Unzip the archive on your computer. Upload the CONTENTS of `upload/` to the root of an R2 bucket named `kiddo-school-assets`. Preserve the folders; do not upload the ZIP itself, and do not add `upload/` as an extra object-key prefix.

The root should contain `activities/` and `brand/`. Each activity has four files:

- `activities/science/grow-a-bean/grow-a-bean-activity.webp` — website image
- `activities/science/grow-a-bean/grow-a-bean-activity.svg` — editable vector original
- `activities/science/grow-a-bean/grow-a-bean-worksheet.png` — printable image
- `activities/science/grow-a-bean/grow-a-bean-worksheet.svg` — scalable printable original

The other activity folders are:

- `activities/art/paper-shape-collage/`
- `activities/maths/make-a-pattern/`
- `activities/literacy/story-map/`
- `activities/literacy/handwriting-practice/`
- `activities/nature/sound-map/`
- `activities/engineering/paper-bridge/`

The JSON and CSV manifests contain exact object keys, alt text, dimensions, formats and sizes. Keep these as your asset inventory; they do not need to be uploaded publicly.

## Cloudflare setup

1. Open Cloudflare → Storage & databases → R2 object storage.
2. Create the `kiddo-school-assets` bucket. Upload the folders inside `upload/` while preserving their object keys. If your dashboard upload flow flattens folders, create each prefix and upload its files there; compare one full object key with the manifest before continuing.
3. For testing before owning a domain, Settings → Public Development URL → Enable. This makes the uploaded assets publicly readable.
4. Copy the EXACT public `https://…r2.dev` base URL shown by Cloudflare. Open one complete image URL by adding its manifest object key to confirm it works.
5. Send the public base URL and one working full image URL. Do not send account credentials, API tokens or the private S3 API endpoint. The website still serves its bundled assets until the supplied public path is integrated.
6. For production, after owning the domain, connect a custom domain such as `assets.kiddo.school` through the bucket's Custom Domains settings. The example domain is not registered or configured by this package. Cloudflare's r2.dev endpoint is for development and is rate-limited.

Only put approved public site images and blank worksheets in this bucket. Children's drawings stay on their own devices and are not uploaded by the handwriting activity.

## File details

WebP covers are 1200 × 900. Printable PNG sheets are 1600 × 2200; use portrait orientation and fit to page on A4 or Letter. SVG originals remain sharp at any size. Served MIME types should be image/webp, image/png and image/svg+xml respectively.

Use WebP for website imagery, PNG for easy-to-open print downloads and SVG when a scalable original is useful. Descriptive filenames support understandable image URLs; rankings are not guaranteed. Use the matching descriptive alt text from the manifest on each page.

Version future replacements deliberately (for example `grow-a-bean-activity-v2.webp`) to avoid stale cached images. Keep activity page URLs permanent.

## Official reference

Cloudflare public buckets and custom domains: https://developers.cloudflare.com/r2/buckets/public-buckets/

## Active bean artwork

Public base: https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/activities/science/grow-a-bean/

Eight WebP files: grow-a-bean-cover, how-to-grow-a-bean, my-plant-diary, parts-of-a-bean-plant, bean-plant-life-cycle, how-tall-is-your-plant, my-bean-leaf, decorate-your-plant. The route parts-of-my-plant uses the file parts-of-a-bean-plant.webp. Change beanAssetBase in src/bean-project.mjs and the CSP image origin in scripts/build.mjs if moving to a custom asset domain.

Shape Collage: six WebP images hosted at activities/art/shape-collage/ on the existing public R2 base. Names: shape-collage-cover, how-to-make-a-shape-collage, shape-collage-cutout-shapes, shape-collage-picture-planner, build-a-shape-picture, my-shape-art-story. Display at native 2:3 proportions.

Sound Map assets use activities/nature/sound-map/ on the existing public R2 base. Six portrait WebP images retain 2:3 display proportions: nature-sound-map-cover, how-to-make-a-sound-map, nature-sound-picture-cards, my-listening-diary, my-nature-sound-map, my-sound-patterns.

Story Map: activities/literacy/draw-a-story-map/ on the existing R2 base contains draw-a-story-map-cover, how-to-draw-a-story-map, story-character-cards, my-story-setting, beginning-middle-end-story-map and write-my-story, all .webp, displayed at 2:3 proportions.

Paper Bridge assets: activities/engineering/paper-bridge/ on the existing R2 base, six portrait WebP images: paper-bridge-cover, how-to-build-a-paper-bridge, my-paper-bridge-design, my-bridge-prediction, my-bridge-test-results, improve-my-paper-bridge.

Leaf Rubbing assets use `activities/nature/leaf-rubbing/` on the existing public R2 base. Six portrait WebP images retain 2:3 display proportions: leaf-rubbing-cover, how-to-make-a-leaf-rubbing, compare-two-leaves, look-closely-at-my-leaf, make-a-leaf-creature, my-leaf-rubbing-art. The route how-to-make-a-leaf-rubbing doubles as the guide page download sheet image. Change leafBase in src/leaf-project.mjs and the CSP image origin in scripts/build.mjs if moving to a custom asset domain.

Shadow Detectives assets use `activities/science/shadow-detectives/` on the existing public R2 base. Six portrait WebP images retain 2:3 display proportions: shadow-detectives-cover, how-to-explore-shadows, compare-my-shadows, my-shadow-creature, my-shadow-prediction, trace-my-toy-shadow. The route how-to-explore-shadows doubles as the guide page download sheet image. Change shadowBase in src/shadow-project.mjs and the CSP image origin in scripts/build.mjs if moving to a custom asset domain.

Newborn 1 High-Contrast Cards (first Kiddo School lesson) use `flashcards/black-and-white-baby-cards/` on the existing public R2 base. Twelve square-format WebP images at 1080 x 1350 (4:5): newborn-high-contrast-circle-card, -square-card, -vertical-stripes, -horizontal-stripes, -checkerboard, -concentric-circles, -spiral, -triangle, -target, -eyes, -face, -symmetrical-face. Shown on /newborn/0-6-weeks/high-contrast-cards/ in a one-card-at-a-time class viewer; containers follow the natural 4:5 ratio. Change newbornBase in src/newborn-project.mjs if moving to a custom asset domain.

Faces & Visual Tracking (Newborn 2, lesson 2) uses `flashcards/black-and-white-baby-cards/faces-and-visual-tracking-6-12-weeks/`: cover plus twelve cards (01-eyes ... 12-red-face-detail), all 1414 x 2000 WebP. Colors & First Objects (Infant 1, lesson 3) uses `flashcards/black-and-white-baby-cards/colors-and-first-objects-3-4-months/`: cover plus twelve cards (01-red-circle ... 12-simple-face), all 1414 x 2000 WebP. Both render through the shared lesson engine in src/lessons.mjs; folders are data fields, so future lessons only add a data object.

First Words & Familiar Things (Infant 2, lesson 4) uses `flashcards/black-and-white-baby-cards/first-words-familiar-things-4-6-months/`: cover plus twelve cards (01-ball, 02-cup, 03-spoon, 04-bottle, 05-apple, 06-banana, 07-cat, 08-dog, 09-bird, 10-car, 11-teddy-bear, 12-baby-face), all 1414 x 2000 WebP. Animals & Everyday Objects (Explorer 1, lesson 5) uses `flashcards/black-and-white-baby-cards/animals-everyday-objects-6-9-months/`: cover plus twelve cards (01-cat, 02-dog, 03-bird, 04-fish, 05-duck, 06-cow, 07-ball, 08-shoe, 09-cup, 10-spoon, 11-car, 12-teddy-bear), all 1414 x 2000 WebP. Both render through the shared lesson engine in src/lessons.mjs; folders are data fields, so future lessons only add a data object. Change the lessonsBase helper in src/lessons.mjs and the CSP image origin in scripts/build.mjs if moving to a custom asset domain.

First Actions & Body Parts (Explorer 2, lesson 6) uses `flashcards/black-and-white-baby-cards/first-actions-body-parts-9-12-months/`: cover plus twelve cards (01-hand, 02-foot, 03-eyes, 04-nose, 05-mouth, 06-clapping, 07-waving, 08-eating, 09-drinking, 10-sleeping, 11-pointing, 12-smiling). Cards 06-11 are 794 x 1123, the rest 1414 x 2000 — the same 1:1.414 portrait ratio throughout, and the data records true dimensions per card. First Words: Food & Home (Toddler 1, lesson 7) uses `flashcards/black-and-white-baby-cards/first-words-food-home-12-18-months/`: cover plus twelve cards (01-apple, 02-banana, 03-orange, 04-milk-cup, 05-bread, 06-egg, 07-cup, 08-spoon, 09-shoe, 10-sock, 11-chair, 12-bed), all 1414 x 2000 WebP. Both render through the shared lesson engine in src/lessons.mjs; lesson 7 opens the Toddler path (/toddler/) after the six baby stages.

First Concepts — Big, Small, Up & Down (Toddler 2, lesson 8) uses `flashcards/toddler-learning-cards/first-concepts-18-24-months/` — the first lesson folder outside black-and-white-baby-cards, reached through the toddlerBase helper in src/lessons.mjs (same public R2 base domain, so the CSP image origin is unchanged). Six concept pairs in exact pair order: 01-big/02-small, 03-up/04-down, 05-open/06-closed, 07-full/08-empty, 09-one/10-many, 11-in/12-out, plus cover, all 1414 x 2000 WebP. Verified live: cover and cards 01-11 (12 entries in the asset manifest); 12-out.webp is still missing from R2 and gets a manifest entry after upload. Renders through the shared lesson engine; no new viewer or components.

## Colors & Shapes (Toddler 3, lesson 9)

Colors & Shapes (Age 2, Toddler 3, Think & Talk) uses `flashcards/toddler-learning-cards/colors-and-shapes-age-2/learning-cards/` — reached through the same toddlerBase helper in src/lessons.mjs. Sixteen verified files: cover + 8 color cards (01-red … 08-black, 1414x2000) + 7 shape cards (09-circle, 10-square, 11-triangle at 1414x2000; 12-rectangle, 13-star, 14-heart, 15-oval at 2000x1414 landscape). Files 16-diamond … 24-rectangle-book were probed on R2 and confirmed absent (404) — the class is intentionally built from the 15 learning cards that exist. This is the first interactive toddler class: Learn (two class viewers with parent-voice captions) → Play (find-it tap games) → Find & Match → Take It Off Screen, all data-driven from the `interactive` config in src/lessons.mjs and rendered by toddlerClassBody. A matching printable pack lives at `colors-and-shapes-age-2/printables/` — exactly 8 verified pages (01-cover, 02-color-cards, 03-shape-cards, 04-match-the-colors, 05-match-the-shapes, 06-color-hunt, 07-shape-hunt, 08-take-it-off-screen), all 1414x2000 WebP. The class page renders a Download & Print section (lazy thumbnail grid + pack contents) and a noindex print view at `/toddler/2-years/colors-and-shapes/print/` that stacks the 8 pages in order with per-page print CSS; no PDF exists or is claimed.

## Matching & Sorting (Toddler 4, lesson 10)

Matching & Sorting (Age 2, Toddler 4, Think & Talk) uses `flashcards/toddler-learning-cards/matching-and-sorting-age-2/learning-cards/` through the same toddlerBase helper in src/lessons.mjs. Sixteen verified files, all 1414x2000 WebP: cover + 15 learning cards (01-same-balls … 15-odd-one-out). No extra cards exist in the folder and none are referenced; there are intentionally NO printables for this class yet, so no Download & Print section renders. The class renders from the data-driven `interactive.sections` config (learn / prompt / match section types) via toddlerClassBody: Same & Different and Sort Together as two Learn viewers with parent-voice captions, Find the Match and Find the Different One as prompt-card rounds with big numbered position buttons (aria-labelled, no fake image hitboxes), What Belongs Together as target+choices rounds, then Take It Off Screen, Teacher Note, Principal Note and Class Complete.

## Animals & Sounds (Toddler 5, lesson 11)

Animals & Sounds (Age 2, Toddler 5, Talk & Explore — the subject name comes straight from the user-supplied cover art) uses `flashcards/toddler-learning-cards/animals-and-sounds-age-2/` through the same toddlerBase helper in src/lessons.mjs. NOTE: unlike the two previous Age 2 folders, this prefix has NO `learning-cards/` subfolder — the 21 files sit directly under the class folder. Twenty-one verified files, all 1414 x 2000 WebP: cover + 20 animal cards (01-dog … 20-bird), each card showing the animal, its name and its sound word (Woof! Meow! Moo! Quack! Baa! Oink! Neigh! Cluck! Cock-a-doodle-doo! Ribbit! Roar! Trumpet! Ooh-ooh! Hoot! Buzz! Hiss! Squeak! Hee-haw! Baa! Tweet! — sheep and goat both say Baa, which is why no "who says baa" game round exists). No extra files exist in the folder and none are invented; there are intentionally NO printables for this class yet, so no Download & Print section renders. The class renders from the data-driven `interactive.sections` config (learn / play section types) via toddlerClassBody: three Learn viewers (farm 01-09, wild 10-16, more friends 17-20) with parent-voice captions that match the sound words printed on the cards, plus two tap games (Who says moo? and Find the animal) built from real per-card image choices — every choice is its own R2 card image, so no numbered position buttons or fake hitboxes are needed. Then Take It Off Screen, Teacher Note, Principal Note and Class Complete (next card falls back to the Learning Path until a real lesson 12 exists).
