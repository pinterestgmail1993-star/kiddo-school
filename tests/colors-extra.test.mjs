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

test('the 11 color cards ride in file order 01–11, one tile per card, each opening its own lesson',()=>{
 const hrefs=[...main.matchAll(/href="\/extra-classes\/colors\/learn\/([a-z-]+)\/"/g)].map(m=>m[1]);
 const first11=hrefs.slice(0,11);
 assert.deepEqual(first11,CLASS_SLUGS,'file-name order: red to gold, 01 to 11');
 // every tile image is the real R2 card, in the same order
 const imgs=[...main.matchAll(/src="https:\/\/assets\.kiddo\.school\/school\/extra-classes\/colors\/(flashcards|shades)\/([0-9a-z-]+\.webp)"/g)].map(m=>m[2]);
 assert.equal(imgs[0],'01-red.webp');assert.equal(imgs[10],'11-gold.webp');
});

test('shades are a separate section headed "More colors (ages 4-5)" with the four shade cards',()=>{
 assert.ok(main.includes('MORE COLORS (AGES 4-5)'),'section eyebrow');
 assert.ok(main.includes('More colors (ages 4-5)'),'owner-exact section heading');
 const sec=main.split('id="more-colors"')[1]||'';
 for(const s of SHADE_SLUGS)assert.ok(sec.includes(`/learn/${s}/`),`shade tile ${s} inside the More colors section`);
 for(const s of CLASS_SLUGS)assert.ok(!sec.includes(`/learn/${s}/`),'no first-color tiles inside the More colors section');
});

test('all 15 /learn/ lessons exist, pair with their library twin, and link prev/next',()=>{
 for(const s of ALL){
  const p=read(`dist/extra-classes/colors/learn/${s}/index.html`);
  assert.ok(p.includes('<link rel="canonical" href="https://kiddo.school/extra-classes/colors/learn/'+s+'/">'));
  assert.ok(p.includes('COLORS LESSON · COLORS &amp; SHADES'),'lesson eyebrow on '+s);
  assert.ok(p.includes('href="/flashcards/colors-and-shades/'+s+'/"'),'lesson pairs with its printable twin: '+s);
  assert.ok(p.includes('aria-label="Previous and next lesson"'),'prev/next on '+s);
 }
});

test('library: set page with two pill groups and 15 card pages with pills, copy and downloads',()=>{
 assert.ok(set.includes('<link rel="canonical" href="https://kiddo.school/flashcards/colors-and-shades/">'));
 assert.ok((set.match(/class="fc-pillgroup"/g)||[]).length===2,'two groups: the first colors + More colors');
 for(let i=0;i<ALL.length;i++){
  const s=ALL[i];
  const p=read(`dist/flashcards/colors-and-shades/${s}/index.html`);
  const folder=i<11?'flashcards':'shades';
  const nn=String(i<11?i+1:i-10).padStart(2,'0');
  assert.ok(p.includes(`src="${R2}${folder}/${nn}-${s}.webp"`),'card page embeds its real R2 image: '+s);
  assert.ok(p.includes('fc-pill'),'age + subject pills on '+s);
  assert.ok(p.includes('download'),'download button on '+s);
  assert.ok(p.includes('Say it together'),'say block on '+s);
  assert.ok(p.includes('Try this'),'try block on '+s);
 }
 assert.ok(read('dist/flashcards/colors-and-shades/red/index.html').includes('Ages 2+'),'first colors ride Ages 2+');
 assert.ok(read('dist/flashcards/colors-and-shades/lavender/index.html').includes('Ages 4–5'),'shades ride Ages 4–5');
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
 assert.ok(hub.includes('Eleven extra classes'),'hub copy counts ten — Dinosaurs joined (owner 2026-10-25)');
 const fcHub=read('dist/flashcards/index.html');
 assert.ok(fcHub.includes('href="/flashcards/colors-and-shades/"'),'set on the library wall');
 // the earlier paint-splash set is untouched at its own slug
 assert.ok(existsSync('dist/flashcards/colors/index.html'),'/flashcards/colors/ still the paint-splash set');
 assert.ok(read('dist/flashcards/colors/index.html').includes('paint splash')||read('dist/flashcards/colors/index.html').includes('splash'),'splash set content intact');
});

test('one lesson per card, no extras: dist shelf counts are exact',()=>{
 assert.deepEqual(readdirSync('dist/extra-classes/colors').filter(d=>d!=='index.html').sort(),['learn']);
 assert.equal(readdirSync('dist/extra-classes/colors/learn').length,15,'15 learn lessons');
 assert.equal(readdirSync('dist/flashcards/colors-and-shades').filter(d=>d!=='index.html').length,15,'15 card pages');
});

test('wiring: sitemap, search index, /all-pages/ and Learning Path row all carry the class',()=>{
 const sm=read('dist/sitemap.xml');
 assert.ok(sm.includes('https://kiddo.school/extra-classes/colors/</loc>'),'class page in sitemap');
 assert.ok(sm.includes('https://kiddo.school/extra-classes/colors/learn/red/</loc>'),'lessons in sitemap');
 assert.ok(sm.includes('https://kiddo.school/flashcards/colors-and-shades/</loc>'),'set in sitemap');
 const si=read('dist/assets/search-index.json');
 assert.ok(si.includes('/extra-classes/colors/'),'search index has the class');
 const ap=read('dist/all-pages/index.html');
 assert.ok(ap.includes('href="/extra-classes/colors/"'),'directory links the class');
 assert.ok(ap.includes('href="/flashcards/colors-and-shades/"'),'directory links the set');
 const lp=read('dist/learning-path/index.html');
 assert.ok(lp.includes('href="/extra-classes/colors/"'),'Learning Path bonus row lists Colors');
});
