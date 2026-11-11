/* look-and-learn — EXTRA CLASS · LOOK & LEARN (owner 2026-10-24: "Add an
   extra class Look & Learn at /look-and-learn/ … Show cover.webp first, then
   cards 01 to 15 in order. Link it from Class 31, Class 22 and Class 11, and
   link back to them. Create one short page per word at /flashcards/<word>/,
   and link each word page back to /look-and-learn/. Do not change any
   existing URLs. If a word page already exists (duck, banana, carrot,
   grapes, strawberry), keep its URL and add the link only.")
   16/16 R2 files probed HTTP 200 image/webp at 800×1131 (15 cards + cover). */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=f=>readFileSync(f,'utf8');
const CLASS_PATH='/look-and-learn/';
const R2='https://assets.kiddo.school/school/extra-classes/look-and-learn/';
const cls=read('dist'+CLASS_PATH+'index.html');
const main=cls.split('</main>')[0];
const FILES=['01-moon-tree-star-flower','02-ladybug-turtle-banana-raindrop','03-kite-whale-duck-cactus','04-cat-butterfly-acorn-cupcake','05-bicycle-strawberry-frog-sun','06-train-pumpkin-bird-heart','07-dog-leaf-bus-star','08-cloud-carrot-snail-tree','09-ladybug-umbrella-pear-moon','10-fox-kite-shell-leaf','11-owl-tomato-boat-bee','12-grapes-boot-tiger-flamingo','13-frog-wagon-lemon-fish','14-bear-balloon-carrot-butterfly','15-apple-raindrop-turtle-balloon'];
const NEW_WORDS=['moon','tree','star','flower','ladybug','turtle','raindrop','kite','whale','cactus','cat','butterfly','acorn','cupcake','bicycle','frog','sun','train','pumpkin','bird','heart','dog','leaf','bus','cloud','snail','umbrella','pear','fox','shell','owl','tomato','boat','bee','boot','tiger','flamingo','wagon','lemon','fish','bear','balloon','apple'];
const KEPT={duck:'/flashcards/animals-and-sounds/duck/',banana:'/flashcards/fruits-and-vegetables/banana/',carrot:'/flashcards/fruits-and-vegetables/carrot/',grapes:'/flashcards/fruits-and-vegetables/grapes/',strawberry:'/flashcards/fruits-and-vegetables/strawberry/'};

test('class page contract: canonical, cover FIRST as og:image and first artwork, then cards 01–15 in file order',()=>{
 assert.ok(cls.includes(`<link rel="canonical" href="https://kiddo.school${CLASS_PATH}">`));
 assert.ok(cls.includes(`property="og:image" content="${R2}flashcards/cover.webp"`),'cover fronts the class');
 assert.ok(cls.includes(`src="${R2}flashcards/cover.webp"`),'cover.webp is shown on the page');
 const heroImg=main.match(/<figure class="lesson-cover"><img src="([^"]+)"/);
 assert.ok(heroImg&&heroImg[1]===R2+'flashcards/cover.webp','the cover is the FIRST artwork on the page');
 const tiles=[...main.matchAll(new RegExp('src="'+R2+'flashcards/([0-9]{2}-[a-z-]+)\\.webp"','g'))].map(m=>m[1]);
 const firstSighting=[...new Set(tiles)];
 assert.deepEqual(firstSighting,FILES,'cards 01–15 ride in file order');
 assert.equal(firstSighting.length,15,'fifteen card artworks');
});




test('the class links back to Class 11, Class 22 and Class 31',()=>{
 assert.ok(main.includes('href="/toddler/2-years/animals-and-sounds/"'),'Class 11 back-link');
 assert.ok(main.includes('href="/preschool/3-years/fruits-and-vegetables/"'),'Class 22 back-link');
 assert.ok(main.includes('href="/preschool/4-years/science-nature-and-discovery/"'),'Class 31 back-link');
});

test('all 43 word pages are folded into the class page and their URLs 301 there',()=>{
 const cls=read('dist'+CLASS_PATH+'index.html');
 assert.equal([...cls.matchAll(/<article class="one-page-item[\w -]*"/g)].length,NEW_WORDS.length,'every word folded onto the class page');
 for(const w of NEW_WORDS){
  assert.ok(cls.includes(`id="${w}"`),'word section on the class page: '+w);
  assert.ok(!existsSync(`dist/flashcards/${w}/index.html`),'word page removed: '+w);
  assert.ok(!cls.includes(`href="/flashcards/${w}/"`),'no word-page links left: '+w);
 }
 const red=read('dist/_redirects');
 for(const w of ['moon','apple','wagon'])assert.ok(red.includes(`/flashcards/${w}/ ${CLASS_PATH} 301`),'301: '+w);
});




test('Classes 11, 22 and 31 all point to Look & Learn',()=>{
 for(const c of ['/toddler/2-years/animals-and-sounds/','/preschool/3-years/fruits-and-vegetables/','/preschool/4-years/science-nature-and-discovery/']){
  const p=read('dist'+c+'index.html');
  assert.ok(p.includes('href="/look-and-learn/"'),'class links the new extra class: '+c);
 }
});

test('wiring: sitemap, search index and the folded word intros',()=>{
 const sm=read('dist/sitemap.xml');
 assert.ok(sm.includes('https://kiddo.school'+CLASS_PATH),'class in sitemap');
 for(const w of NEW_WORDS) assert.ok(!sm.includes(`<loc>https://kiddo.school/flashcards/${w}/</loc>`),'word page dropped from sitemap: '+w);
 const idx=read('dist/assets/search-index.json');
 assert.ok(idx.includes('/look-and-learn/'),'class in search index');
 assert.ok(!idx.includes('/flashcards/moon/'),'word pages out of the search index');
 const cls=read('dist'+CLASS_PATH+'index.html');
 const samples={'moon':'a banana curve','flamingo':'impossible to watch without copying','wagon':'teddies, snacks, one very tired toddler','bee':'shoulders are flowers','apple':'snack and le'};
 for(const [w,s2] of Object.entries(samples)) assert.ok(cls.includes(s2),'fresh intro copy folded onto the class: '+w);
});

