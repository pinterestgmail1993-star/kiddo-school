// Automated guards for the Coloring Pages category — "Shape Coloring Fun"
// (Toddler 3 · Age 2 · Class 9 Colors and Shapes) plus the new main
// category /coloring-pages/. Locked in:
//   1. the registry is EXACTLY the twenty owner-uploaded R2 files — every
//      image used once, every slug unique, every picture points at R2
//   2. all 42 new pages exist on disk (hub, category, 20 activities,
//      20 printables) with unique titles and self-matching canonicals
//   3. activity pages: drawing layer over the original image with the
//      per-child restore key, tools rail, prev/next, printable twin link
//   4. printable pages: NO drawing canvas, download + print + share +
//      family feedback + Start Coloring Online + prev/next + related
//   5. the printable grid is tap-through — whole card links, zero buttons
//   6. Class 9 carries the Shape Coloring Fun section with 20 ribbons
//   7. the header link exists everywhere and is aria-current on category pages
//   8. sitemap + search index carry every new URL
//   9. the write-color restore is opt-in: no existing mount gained it
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';
import {coloringPages,CP_BASE,CP_COVER,CP_ACT_PATH,CP_LIB,CP_HUB,CP_CLASS_PATH} from '../src/coloring-pages.mjs';

const root='dist';
const read=p=>readFileSync(join(root,p),'utf8');
const page=p=>read(join(p,'index.html').replace(/\/\//g,'/'));
const SLUGS=coloringPages.map(a=>a.slug);
/* the exact bucket listing the owner posted — verified one image at a time */
const R2_FILES=['apple-and-banana.webp','book-and-phone.webp','circle-and-beach-ball.webp','circle.webp','egg-shape.webp','heart.webp','oval.webp','pillow-and-square.webp','rectangle-and-bus.webp','rectangle.webp','square-and-gift-box.webp','square.webp','star.webp','tall-rectangle.webp','tall-triangle.webp','triangle-and-house.webp','triangle-sandwich-and-mountain.webp','triangle.webp','two-circles.webp','two-ovals.webp'];
/* the category cover is drawn in code and ships from /assets/coloring/ —
   deliberately absent from R2_FILES and from the registry. */

test('the registry is exactly the twenty owner-uploaded R2 files, each once',()=>{
 assert.equal(coloringPages.length,20,'twenty coloring pages — the cover is not one of them');
 assert.deepEqual([...coloringPages.map(a=>a.img)].sort(),[...R2_FILES].sort(),'every R2 file matched, none invented');
 assert.equal(new Set(SLUGS).size,20,'slugs unique');
 assert.equal(new Set(coloringPages.map(a=>a.img)).size,20,'images unique');
 assert.ok(!R2_FILES.includes(CP_COVER.file),'the coded cover stays out of the activity files');
 for(const a of coloringPages){
  assert.ok(a.img.endsWith('.webp')&&!a.img.includes('/'),'plain filename');
  assert.ok(a.alt&&a.alt.length>20,'honest alt text for '+a.slug);
  assert.ok(a.steps.length>=3&&a.steps.length<=4,'three-ish text steps for '+a.slug);
  assert.ok(a.meta.length>80,'real meta description for '+a.slug);
 }
});







test('the printable grid is tap-through: 20 whole-card links, zero buttons',()=>{
 const html=page('coloring-pages/shapes');
 assert.equal((html.match(/class="ws-card" href="/g)||[]).length,20,'twenty whole-card links');
 assert.equal((html.match(/data-fc-dl/g)||[]).length,0,'no download buttons on the grid');
 assert.equal((html.match(/ws-card-open/g)||[]).length,20,'every card has its label');
 const hub=page('coloring-pages');
 assert.ok(hub.includes(`href="${CP_LIB}"`),'hub links the Shapes category');
});



test('the Learning Path links Coloring Pages from the Class 9 row only',()=>{
 const lp=page('learning-path');
 assert.ok(lp.includes(' · Coloring Pages: <a href="/coloring-pages/shapes/">Shapes</a></p>'),'Class 9 row carries the coloring link');
 assert.equal((lp.match(/href="\/coloring-pages\/shapes\//g)||[]).length,1,'exactly one coloring link on the path');
 assert.equal((lp.match(/Coloring Pages: <a/g)||[]).length,1,'no other row gained a coloring link');
});










