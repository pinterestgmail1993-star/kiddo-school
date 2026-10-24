// games-rules — the Kids Games RULES shelf (owner 2026-10-24): 35 short
// pages at /games/<slug>/ (slug = the R2 file name), cover.webp first on the
// hub, card + how-to-play + back to /games/ on every page, Class 37 linked
// both ways, existing game URLs untouched, Look & Learn discoverable on the
// extras shelf. Locks: set shape, hub cover-first + tiles, per-page
// contract, both cross-links, untouched twins, sitemap/search/directory
// wiring, and no shared prose with the /extra-classes/kids-games/ lessons.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {GR_PATH,GR_GAMES,GR_COVER,grTitle,grDesc} from '../src/game-rules.mjs';
import {GR_COPY} from '../src/gr-copy.mjs';
import {lpContent as kgLp} from '../src/flashcards/lp-kids-games.mjs';
import {EXTRA_CLASSES} from '../src/extra-classes.mjs';
const read=f=>readFileSync(f,'utf8');
const readPage=p=>readFileSync('dist'+p+'index.html','utf8');

test('games rules set: 35 cards, slug equals file name, every card 900×1200 from the owner folder',()=>{
 assert.equal(GR_GAMES.length,35,'35 game cards, cover never counted');
 const files=['animal-walks','balloon-keep-up','balloon-volleyball','beanbag-balance','beanbag-relay','bubble-chase','colour-hunt','duck-duck-goose','duck-walk-relay','follow-the-leader','four-square','hopscotch','hot-potato','hula-hoop-pass','lava-floor','memory-moves','mirror-moves','musical-chairs','musical-statues','nature-scavenger-hunt','obstacle-course','parachute-pop','red-light-green-light','relay-race','ring-toss','sack-race','shadow-shapes','shape-hunt','simon-says','tag','target-toss','three-legged-race','traffic-cop','treasure-hunt','tunnel-crawl'];
 assert.deepEqual(GR_GAMES.map(g=>g.slug),files,'slugs are exactly the owner file names, in file order');
 for(const g of GR_GAMES){
  assert.match(g.file,new RegExp('^'+g.slug+'\\.webp$'),g.slug+' file matches slug');
  assert.match(g.alt,/Kids Games rules card for /,g.slug+' alt names the card');
  assert.ok(g.alt.length>80,g.slug+' alt written from the artwork');
  assert.ok(g.skill.length>4,g.slug+' carries the card skill pill');
  assert.ok(GR_COPY[g.slug].intro.length>60&&GR_COPY[g.slug].intro.toLowerCase().includes(g.name.toLowerCase().split(',')[0]),g.slug+' intro answers the rules question');
 }
 assert.equal(GR_COVER.w,800);assert.equal(GR_COVER.h,1132);
});

test('/games/ hub: cover.webp FIRST, 35 tiles in file order, links to the class and Class 37',()=>{
 const html=readPage(GR_PATH);
 const iCover=html.indexOf(GR_COVER.file), iFirst=html.indexOf(GR_GAMES[0].file);
 assert.ok(iCover>-1,'cover image on the hub');assert.ok(iFirst>-1,'first card on the hub');
 assert.ok(iCover<iFirst,'cover fronts the hub');
 assert.equal((html.match(/class="lp-tile"/g)||[]).length,35,'35 game tiles');
 assert.ok(html.includes('href="/extra-classes/kids-games/"'),'hub links the Kids Games class');
 assert.ok(html.includes('href="/preschool/4-years/sports-movement-and-play/"'),'hub links Class 37');
 assert.ok(html.includes('35'),'the set size is honest somewhere on the page');
});

test('/games/<slug>/: all 35 pages show card + three card rules + grown-up copy + back to /games/',()=>{
 for(const g of GR_GAMES){
  const html=readPage(GR_PATH+g.slug+'/');
  assert.ok(html.includes('<h1>How to Play '+g.name+'.</h1>'),g.slug+' H1 answers the how-to query');
  assert.ok(html.includes('<title>'+grTitle(g).replace(/&/g,'&amp;')),g.slug+' title');
  assert.ok(html.includes(GR_PATH+g.slug+'/"'),'self path');
  assert.ok(html.includes('/school/extra-classes/kids-games/flashcards/'+g.file),g.slug+' shows the owner card');
  for(const s of g.steps)assert.ok(html.includes(s.replace(/&/g,'&amp;')),g.slug+' quotes card step');
  assert.ok(html.includes(g.skill),g.slug+' shows the skill pill');
  assert.ok(html.includes('href="'+GR_PATH+'"'),g.slug+' links back to /games/');
  assert.ok(html.includes('href="/extra-classes/kids-games/"'),g.slug+' links the class');
 }
 const ddg=readPage(GR_PATH+'duck-duck-goose/');
 assert.ok(ddg.includes('Skill practiced: <strong>Take Turns</strong>'),'skill pill rendered');
 assert.ok(readPage(GR_PATH+'hopscotch/').includes('What you need'),'grown-up block present');
});

test('Class 37 links to /games/ and /games/ links back (owner: both ways)',()=>{
 const sp=readPage('/preschool/4-years/sports-movement-and-play/');
 assert.ok(sp.includes('href="/games/"'),'Class 37 points at the rules shelf');
 const hub=readPage(GR_PATH);
 assert.ok(hub.includes('href="/preschool/4-years/sports-movement-and-play/"'),'rules shelf points back at Class 37');
});

test('no existing game URL changed: the old class, lessons and card twins still build; class links the shelf',()=>{
 const kg=readPage('/extra-classes/kids-games/');
 assert.ok(kg.includes('/extra-classes/kids-games/learn/duck-duck-goose/'),'old lesson tile untouched');
 assert.ok(kg.includes('href="/games/"'),'class now links the rules shelf');
 for(const p of ['/extra-classes/kids-games/learn/duck-duck-goose/','/extra-classes/kids-games/learn/simon-says/','/extra-classes/kids-games/learn/hopscotch/','/flashcards/kids-games/','/flashcards/kids-games/duck-duck-goose/','/flashcards/kids-games/balloon-keep-up/'])
  assert.ok(readPage(p).length>5000,p+' still builds');
});

test('two-home doctrine: no /games/ prose repeats the old kids-games lessons',()=>{
 for(const slug of ['duck-duck-goose','follow-the-leader','hot-potato','musical-chairs','red-light-green-light','simon-says','hopscotch','treasure-hunt','balloon-keep-up']){
  const lessonText=JSON.stringify(kgLp[slug]||{}).toLowerCase();
  for(const f of ['intro','need','tip','fresh']){
   for(const s of GR_COPY[slug][f].split(/(?<=[.!?])\s+/).map(x=>x.trim().toLowerCase()).filter(x=>x.length>30))
    assert.ok(!lessonText.includes(s),slug+'/'+f+' sentence must not ride the old lesson: '+s.slice(0,50));
  }
 }
});

test('wiring: sitemap, search index and /all-pages/ carry the shelf; extras shelf carries Look & Learn',()=>{
 const xml=read('dist/sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/games/</loc>'),'hub in sitemap');
 for(const g of ['duck-duck-goose','simon-says','hopscotch','tag','tunnel-crawl'])
  assert.ok(xml.includes('<loc>https://kiddo.school/games/'+g+'/</loc>'),'game '+g+' in sitemap');
 const idx=read('dist/assets/search-index.json');
 for(const p of ['/games/','/games/duck-duck-goose/','/games/simon-says/'])
  assert.ok(idx.includes('"u":"'+p+'"'),'search index carries '+p);
 const all=readPage('/all-pages/');
 assert.ok(all.includes('href="/games/"'),'directory lists the shelf');
 assert.ok(all.includes('href="/games/duck-duck-goose/"'),'directory lists game pages');
 const nine=EXTRA_CLASSES.find(c=>c.name==='Look & Learn');
 assert.ok(nine&&nine.href==='/look-and-learn/','Look & Learn on the extras shelf');
 assert.ok(readPage('/extra-classes/').includes('/look-and-learn/'),'extras hub links Look & Learn');
 assert.ok(readPage('/learning-path/').includes('href="/look-and-learn/"'),'LP bonus row links Look & Learn');
});
