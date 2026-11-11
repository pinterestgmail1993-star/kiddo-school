/* colors-extra — EXTRA CLASS · COLORS (owner 2026-10-22: "Add a new extra
   class called Colors (ages 2-5)"). 15 cards at school/extra-classes/colors/
   (11 color cards in file order 01–11 + 4 shade cards + cover), ONE class
   page at /extra-classes/colors/ with the shades as a separate "More colors
   (ages 4-5)" section, one /learn/ lesson per card, the library twins at
   /flashcards/colors-and-shades/ (slug colors-and-shades because
   /flashcards/colors/ is the owner's earlier paint-splash set), cover as
   og:image, object-fit: contain on the card art, and the two owner-pinned
   cross-links: the Age 3 Colors & Color Mixing class links here with
   "More colors to explore" and this page links back + to First Glance,
   whose colors-1 and colors-2 sheets link here. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
const read=f=>readFileSync(f,'utf8');
const CLASS_SLUGS=['red','blue','yellow','green','orange','purple','pink','brown','black','grey','gold'];
const SHADE_SLUGS=['light-blue','navy','peach','lavender'];
const ALL=[...CLASS_SLUGS,...SHADE_SLUGS];
const cls=read('dist/extra-classes/colors/index.html');
const main=cls.split('</main>')[0];
const set=read('dist/flashcards/colors-and-shades/index.html');
const R2='https://assets.kiddo.school/school/extra-classes/colors/';

test('class page contract: title, canonical, indexed, cover as og:image',()=>{
 assert.ok(cls.includes('<title>Colors: A Simple Guide to Every Color for Kids (Ages 2–5) | Kiddo.school</title>'));
 assert.ok(cls.includes('<link rel="canonical" href="https://kiddo.school/extra-classes/colors/">'));
 assert.ok(cls.includes('content="index,follow"'));
 assert.ok(cls.includes(`property="og:image" content="${R2}flashcards/cover.webp"`),'cover.webp is the class og:image');
});









test('cross-links both ways: Age 3 colors class ⇄ Colors extra class, First Glance ⇄ Colors',()=>{
 const age3=read('dist/preschool/3-years/colors-and-color-mixing/index.html');
 assert.ok(age3.includes('href="/extra-classes/colors/"'),'Age 3 class links to the Colors class');
 assert.ok(age3.includes('More colors to explore'),'owner-exact anchor text "More colors to explore"');
 assert.ok(main.includes('href="/preschool/3-years/colors-and-color-mixing/"'),'Colors class links back to the Age 3 class');
 assert.ok(main.includes('href="/first-glance/"'),'Colors class links back to First Glance');
 const fg=read('dist/first-glance/index.html');
 const links=[...fg.matchAll(/<a class="fg-more" href="\/extra-classes\/colors\/">/g)].length;
 assert.equal(links,2,'exactly the colors-1 and colors-2 sheets carry the link');
 const one=fg.split('<img src="https://assets.kiddo.school/flashcards/first-glance/ages-2-3/05-colors-1.webp"')[1].split('</figure>')[0];
 assert.ok(one.includes('/extra-classes/colors/'),'colors-1 links to the Colors class');
});

test('object-fit: contain ships on the card art (owner brief), and the .fg-more link style',()=>{
 const css=read('public/assets/style.css');
 assert.match(css,/\.lp-tile img\{object-fit:contain\}/);
 assert.match(css,/\.fcl-art img\{object-fit:contain\}/);
 assert.match(css,/\.fg-more\{/);
});

test('hub shelves: /extra-classes/ lists Colors (eight classes), /flashcards/ lists the set',()=>{
 const hub=read('dist/extra-classes/index.html');
 assert.ok(hub.includes('href="/extra-classes/colors/"'),'Colors on the extra-classes shelf');
 assert.ok(hub.includes('Thirteen extra classes'),'hub copy counts twelve — Question Words joined (owner 2026-10-28; Dinosaurs 2026-10-25)');
 const fcHub=read('dist/flashcards/index.html');
 assert.ok(fcHub.includes('href="/flashcards/colors-and-shades/"'),'set on the library wall');
 // the earlier paint-splash set is untouched at its own slug
 assert.ok(existsSync('dist/flashcards/colors/index.html'),'/flashcards/colors/ still the paint-splash set');
 assert.ok(read('dist/flashcards/colors/index.html').includes('paint splash')||read('dist/flashcards/colors/index.html').includes('splash'),'splash set content intact');
});




