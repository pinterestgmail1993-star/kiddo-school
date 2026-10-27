// animal-categories — EXTRA CLASS (owner 2026-10-21: "lets make extra classes
// places in the community / same the process" + "have take care of ages cuz
// this is important"). The 25 R2 uploads under
// school/extra-classes/animal-categories/flashcards/ (24 family spotter cards
// + cover, probed per file: 23 cards 800×1132 portrait, whales-and-dolphins
// 1100×778 landscape, cover 800×1277) become: (1) the class page
// /extra-classes/animal-categories/ — all 24 families in tour order, the Big
// Sort class game and the 'Same animal, two names' US/UK/CA section
// (ladybug/ladybird, cougar/mountain lion/puma, bunny/rabbit); (2) 24 /learn/
// lessons — a simple guide a KID can follow via LP_REGISTRY; (3)
// /flashcards/animal-categories/ set page + 24 card pages with downloads and
// per-card age pills (13× Ages 3+, 11× Ages 4–5 — assigned per family, not
// per set). Locks: set shape/dims/order, set page groups, 24 card pages with
// unique titles + downloads, lessons with canvas + tour-order prev/next,
// class page sections, extra-classes shelf (seven classes), Ages 4–5 hub
// shelf + sitemap + hub-filter tags + image sitemap.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
import {lpContent} from '../src/flashcards/lp-animal-categories.mjs';
import {EXTRA_CLASSES} from '../src/extra-classes.mjs';
import {FC_TAGS} from '../src/hub-filters.mjs';
const read=f=>readFileSync(f,'utf8');
const readPage=p=>readFileSync('dist'+p+'index.html','utf8');
/* group heads and pills carry '&' — the HTML escapes it */
const escH=s=>s.replace(/&/g,'&amp;');

const set=fcSetBySlug['animal-categories'];
const setHtml=readPage('/flashcards/animal-categories/');
const ORDER=['pets','farm-animals','more-farm-animals','farm-birds','insects','garden-creatures','small-animals','amphibians','birds','fish','sea-creatures','reptiles','big-animals','safari-animals','wild-cats','primates','forest-animals','desert-animals','arctic-animals','australian-animals','whales-and-dolphins','night-animals','rainforest-animals'];
const GROUP_HEADS=['Pets & farm friends','Little crawly creatures','Feathers, fins & scales','Big & wild','Where animals live','Giants & old wonders'];
const LANDSCAPE=['whales-and-dolphins'];

test('animal-categories set: 24 families in tour order at their true probed dims',()=>{
 assert.equal(set.cards.length,23,'23 family cards, cover never counted — dinosaurs retired to their own class (owner 2026-10-25)');
 assert.deepEqual(set.cards.map(c=>c.slug),ORDER,'cards ride in tour order');
 for(const c of set.cards){
  if(LANDSCAPE.includes(c.slug)){assert.equal(c.w,1100,c.slug+' landscape width');assert.equal(c.h,778,c.slug+' landscape height');}
  else{assert.equal(c.w,800,c.slug+' width');assert.equal(c.h,1132,c.slug+' height');}
  assert.match(c.img,/^https:\/\/assets\.kiddo\.school\/school\/extra-classes\/animal-categories\/flashcards\//,c.slug+' lives in the owner folder');
  assert.ok(c.alt.length>60,c.slug+' alt written from the artwork');
  assert.ok(c.ages==='Ages 3+'||c.ages==='Ages 4–5',c.slug+' carries an age pill');
  assert.ok(c.pill&&GROUP_HEADS.includes(c.pill),c.slug+' carries a group pill');
 }
 assert.equal(set.cover.w,800);assert.equal(set.cover.h,1277);
 assert.match(set.coverUrl,/cover\.webp$/,'cover fronts the set');
});

test('animal-categories age pills: the owner said take care of ages — both pills ride, familiar families first',()=>{
 const threes=set.cards.filter(c=>c.ages==='Ages 3+').map(c=>c.slug);
 const fours=set.cards.filter(c=>c.ages==='Ages 4–5').map(c=>c.slug);
 assert.equal(threes.length+fours.length,23,'every card carries exactly one age pill');
 assert.ok(threes.includes('pets')&&threes.includes('farm-animals'),'the familiar families ride Ages 3+');
 assert.ok(fours.includes('primates')&&fours.includes('amphibians'),'the concept families ride Ages 4–5');
 assert.ok(!threes.includes('dinosaurs')&&!set.cards.some(c=>c.slug==='dinosaurs'),'the dinosaurs card retired — it owns /dinosaurs/ now (owner 2026-10-25)');
 assert.ok(setHtml.includes('Ages 3+')&&setHtml.includes('Ages 4–5'),'both pills render on the set page');
});

test('animal-categories set page: six pill groups, age pills, class button, no LP claim',()=>{
 for(const g of GROUP_HEADS)assert.ok(setHtml.includes(escH(g)),'group head '+g);
 assert.ok(setHtml.includes('/extra-classes/animal-categories/'),'class button back to the class');
 assert.ok(!setHtml.includes('LEARNING PATH LESSON'),'no fake Learning Path claim');
 assert.equal((setHtml.match(/class="fc-pillgroup"/g)||[]).length,6,'six pill groups on the set page');
 assert.ok((setHtml.match(/fc-pill-age/g)||[]).length>=23,'age pills ride on every card tile');
 assert.ok(setHtml.includes('23'),'the set size is honest somewhere on the page');
});

test('animal-categories card pages: 24 unique titles, download, pills, print',()=>{
 const titles=new Set();
 for(const c of set.cards){
  const html=readPage(c.url);
  assert.ok(html.includes(c.cardTitle),c.slug+' unique card title');
  titles.add(c.cardTitle);
  assert.ok(html.includes(c.img+'"'),'full-size R2 download image');
  assert.ok(html.toLowerCase().includes('download'),c.slug+' download button');
  assert.ok(html.includes(c.ages),c.slug+' age pill renders');
  assert.ok(html.includes(escH(c.pill)),c.slug+' group pill renders');
  assert.ok(html.includes('/extra-classes/animal-categories/'),'class line back-link');
  assert.ok(html.length>9000,c.slug+' substantial page (not a stub)');
 }
 assert.equal(titles.size,23,'all 23 card titles unique');
});

test('animal-categories lessons: 24 pages under the class, simple kid guide, canvas, tour-order prev/next',()=>{
 assert.equal(Object.keys(lpContent).length,23,'23 lessons in the registry — the dinosaurs lesson moved to its own class');
 for(let i=0;i<set.cards.length;i++){
  const c=set.cards[i];
  const p=`/extra-classes/animal-categories/learn/${c.slug}/`;
  const html=readPage(p);
  assert.ok(html.includes('ANIMAL CATEGORIES LESSON'),c.slug+' lesson eyebrow');
  assert.ok(!html.includes('LEARNING PATH LESSON'),'no Learning Path claim');
  assert.ok(html.includes('/extra-classes/'),'crumbed through Extra Classes');
  assert.ok(/data-wc/.test(html),c.slug+' drawing canvas mounts over the card');
  assert.ok(html.includes(c.img),c.slug+' lesson shows the original card');
  const prev=set.cards[(i-1+23)%23],next=set.cards[(i+1)%23];
  assert.ok(html.includes('learn/'+prev.slug+'/')&&html.includes('learn/'+next.slug+'/'),c.slug+' rides tour-order prev/next');
  for(const f of ['teach','what','know','play','check'])assert.ok(lpContent[c.slug][f]&&lpContent[c.slug][f].length>40,c.slug+' lesson field '+f);
 }
});

test('animal-categories class page: groups, the Big Sort, two-names section, Nature Club hand-off',()=>{
 const html=readPage('/extra-classes/animal-categories/');
 for(const g of GROUP_HEADS)assert.ok(html.includes(escH(g)),'class page group '+g);
 assert.ok(/Big Sort/i.test(html),'the class game is the Big Sort');
 assert.ok(html.includes('ladybird')&&html.includes('mountain lion')&&html.includes('bunny'),'Same animal, two names section (ladybug/ladybird, cougar/mountain lion, bunny/rabbit)');
 assert.ok(html.includes('/flashcards/animal-categories/'),'supporting-resource link to the set');
 assert.ok(html.includes('/extra-classes/'),'back to Extra Classes');
 assert.ok(html.includes('/nature-club/animals/'),'hand-off link to the deeper Nature Club deck');
 const tiles=(html.match(/class="lp-tile"/g)||[]).length;
 assert.equal(tiles,23,'23 lesson tiles on the class page');
});

test('animal-categories rides the extra-classes shelf (seven classes) with honest cover dims',()=>{
 const ac=EXTRA_CLASSES.find(c=>c.name==='Animal Categories');
 assert.ok(ac,'on the EXTRA_CLASSES shelf');
 assert.equal(ac.href,'/extra-classes/animal-categories/');
 assert.equal(ac.w,800);assert.equal(ac.h,1277,'the taller cover dims ride honestly');
 assert.equal(EXTRA_CLASSES.length,11,'eleven extra classes — Manners joined (owner 2026-10-27, one page, no individual URLs)');
 const hub=readPage('/extra-classes/');
 assert.ok(hub.includes('Eleven extra classes'),'hub copy counts ten — Dinosaurs joined (owner 2026-10-25)');
 assert.ok(hub.includes('/extra-classes/animal-categories/'),'hub links the class');
 const lpRow=readPage('/learning-path/');
 assert.ok(lpRow.includes('/extra-classes/animal-categories/'),'Learning Path bonus row links the class');
});

test('animal-categories rides the Ages 4–5 hub shelf, hub filters, and the sitemap',()=>{
 const hub=readPage('/flashcards/');
 assert.ok(hub.includes('/flashcards/animal-categories/'),'set card on the flashcards hub');
 const xml=read('dist/sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/extra-classes/animal-categories/</loc>'),'class in sitemap');
 assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/animal-categories/</loc>'),'set in sitemap');
 for(const c of set.cards){
  assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/animal-categories/'+c.slug+'/</loc>'),'card '+c.slug+' in sitemap');
  assert.ok(xml.includes('<loc>https://kiddo.school/extra-classes/animal-categories/learn/'+c.slug+'/</loc>'),'lesson '+c.slug+' in sitemap');
 }
 assert.ok(xml.includes('<image:loc>https://assets.kiddo.school/school/extra-classes/animal-categories/flashcards/pets.webp'),'image sitemap entry for a family card');
 const tags=FC_TAGS['animal-categories'];
 assert.ok(tags,'hub-filter tags present');
 assert.ok(tags.includes('age-3')&&tags.includes('age-4-5'),'age tags');
 assert.ok(tags.includes('lvl-preschool')&&tags.includes('lvl-prek'),'level tags');
 assert.ok(tags.some(t=>t.startsWith('subj-')),'subject tag');
 assert.ok(tags.some(t=>t.startsWith('skill-')),'skill tag');
});
