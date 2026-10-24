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
 assert.deepEqual(tiles,FILES,'cards 01–15 ride in file order');
 assert.equal(tiles.length,15,'fifteen card tiles');
});

test('each of the 15 cards opens its four word pages; all 48 words are linked',()=>{
 const cells=main.match(/class="ll-cell"/g)||[];
 assert.equal(cells.length,15,'one cell per card');
 assert.equal((main.match(/class="fc-hint ll-words"/g)||[]).length,15,'a word row under every card');
 for(const w of Object.keys(KEPT)) assert.ok(main.includes(`href="${KEPT[w]}"`),'existing word linked at its own URL: '+w);
 for(const w of NEW_WORDS) assert.ok(main.includes(`href="/flashcards/${w}/"`),'new word linked: '+w);
});

test('the class links back to Class 11, Class 22 and Class 31',()=>{
 assert.ok(main.includes('href="/toddler/2-years/animals-and-sounds/"'),'Class 11 back-link');
 assert.ok(main.includes('href="/preschool/3-years/fruits-and-vegetables/"'),'Class 22 back-link');
 assert.ok(main.includes('href="/preschool/4-years/science-nature-and-discovery/"'),'Class 31 back-link');
});

test('all 43 new word pages exist at /flashcards/<word>/, each linking back to the class',()=>{
 for(const w of NEW_WORDS){
  const p=read(`dist/flashcards/${w}/index.html`);
  assert.ok(p.includes(`<link rel="canonical" href="https://kiddo.school/flashcards/${w}/">`),'canonical: '+w);
  assert.ok(p.includes(`href="${CLASS_PATH}"`),'word page links back to the class: '+w);
  assert.ok(p.includes('Open Look &amp; Learn'),'back button on '+w);
  assert.ok(new RegExp(`src="${R2.replace(/[/]/g,'\\$&')}flashcards/[0-9]{2}-[a-z-]+\\.webp"`).test(p),'card artwork on '+w);
  assert.ok(p.includes('Say it together'),'say block on '+w);
 }
});

test('five words stay in their old homes: no new page, URL unchanged, one link added',()=>{
 for(const [w,url] of Object.entries(KEPT)){
  assert.ok(!existsSync(`dist/flashcards/${w}/index.html`),'no new page replaces the existing one: '+w);
  const p=read('dist'+url+'index.html');
  assert.ok(p.includes(`<link rel="canonical" href="https://kiddo.school${url}">`),'URL untouched: '+url);
  assert.ok(p.includes('href="/look-and-learn/"'),'Look & Learn link added: '+url);
 }
});

test('Classes 11, 22 and 31 all point to Look & Learn',()=>{
 for(const c of ['/toddler/2-years/animals-and-sounds/','/preschool/3-years/fruits-and-vegetables/','/preschool/4-years/science-nature-and-discovery/']){
  const p=read('dist'+c+'index.html');
  assert.ok(p.includes('href="/look-and-learn/"'),'class links the new extra class: '+c);
 }
});

test('wiring: sitemap, search index and the word pages\u2019 unique intros',()=>{
 const sm=read('dist/sitemap.xml');
 assert.ok(sm.includes('https://kiddo.school'+CLASS_PATH),'class in sitemap');
 for(const w of NEW_WORDS) assert.ok(sm.includes(`<loc>https://kiddo.school/flashcards/${w}/</loc>`),'word page in sitemap: '+w);
 const idx=read('dist/assets/search-index.json');
 assert.ok(idx.includes('/look-and-learn/'),'class in search index');
 const samples={'moon':'a banana curve','flamingo':'impossible to watch without copying','wagon':'teddies, snacks, one very tired toddler','bee':'shoulders are flowers','apple':'snack and lesson in the same fruit'};
 for(const [w,s] of Object.entries(samples)) assert.ok(read(`dist/flashcards/${w}/index.html`).includes(s),'fresh intro copy on '+w);
});
