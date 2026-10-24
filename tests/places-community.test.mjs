// places-in-the-community — EXTRA CLASS · Places in the Community (owner
// request 2026-10-21: "lets make extra classes / places in the community /
// same the process indiviual lesson pages and flashcrads library pages").
// The 29 R2 uploads under school/extra-classes/places-in-the-community/
// flashcards/ (28 place cards + cover, every file probed 800×1132 portrait)
// become: (1) the class page /extra-classes/places-in-the-community/ — all
// 28 places in tour order, the Town Walk class game, and the 'Same place,
// two names' US/UK/CA section; (2) 28 /learn/ lessons — a simple guide a KID
// can follow (what the place is, who works there, what we do there) via
// LP_REGISTRY; (3) /flashcards/places-in-the-community/ set page + 28 card
// pages with downloads, age pills (Ages 3+ / Ages 4–5) and six pill groups.
// Locks: set shape/dims/order, set page groups, 28 card pages with unique
// titles + downloads, US/UK/CA pairs, lessons with canvas + tour-order
// prev/next, class page sections, extra-classes shelf (six classes), Ages
// 4–5 hub shelf + sitemap + hub-filter tags.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
import {lpContent} from '../src/flashcards/lp-places-in-community.mjs';
import {EXTRA_CLASSES} from '../src/extra-classes.mjs';
import {FC_TAGS} from '../src/hub-filters.mjs';
const read=f=>readFileSync(f,'utf8');
const readPage=p=>readFileSync('dist'+p+'index.html','utf8');
/* group heads and pills carry '&' — the HTML escapes it */
const escH=s=>s.replace(/&/g,'&amp;');

const set=fcSetBySlug['places-in-the-community'];
const setHtml=readPage('/flashcards/places-in-the-community/');
const ORDER=['school','library','museum','cinema','hospital','dentists-office','pharmacy','fire-station','police-station','supermarket','bakery','farmers-market','restaurant','pet-shop','bank','post-office','hair-salon','hotel','gas-station','bus-stop','train-station','airport','community-garden','park','playground','recycling-center','sports-center','zoo'];
const GROUP_HEADS=['Learn, read & imagine','Safe & cared for','Food & shopping','Around the town','Getting around','Parks & green places'];

test('places-in-the-community set: 28 cards in tour order, every card 800×1132 portrait',()=>{
 assert.equal(set.cards.length,28,'28 place cards, cover never counted');
 assert.deepEqual(set.cards.map(c=>c.slug),ORDER,'cards ride in tour order');
 for(const c of set.cards){
  assert.equal(c.w,800,c.slug+' width');assert.equal(c.h,1132,c.slug+' height');
  assert.match(c.img,/^https:\/\/assets\.kiddo\.school\/school\/extra-classes\/places-in-the-community\/flashcards\//,c.slug+' lives in the owner folder');
  assert.ok(c.alt.length>60,c.slug+' alt written from the artwork');
  assert.ok(c.ages==='Ages 3+'||c.ages==='Ages 4–5',c.slug+' carries an age pill');
  assert.ok(c.pill&&GROUP_HEADS.includes(c.pill),c.slug+' carries a group pill');
 }
 assert.equal(set.cover.w,800);assert.equal(set.cover.h,1132);
 assert.match(set.coverUrl,/cover\.webp$/,'cover fronts the set');
});

test('places-in-the-community set page: six pill groups, age pills, class button, no LP claim',()=>{
 for(const g of GROUP_HEADS)assert.ok(setHtml.includes(escH(g)),'group head '+g);
 assert.ok(setHtml.includes('/extra-classes/places-in-the-community/'),'class button back to the class');
 assert.ok(!setHtml.includes('LEARNING PATH LESSON'),'no fake Learning Path claim');
 assert.equal((setHtml.match(/class="fc-pillgroup"/g)||[]).length,6,'six pill groups on the set page');
 assert.ok((setHtml.match(/fc-pill-age/g)||[]).length>=28,'age pills ride on every card tile');
 assert.ok(setHtml.includes('28'),'the set size is honest somewhere on the page');
});

test('places-in-the-community card pages: 28 unique titles, download, pills, print',()=>{
 const titles=new Set();
 for(const c of set.cards){
  const html=readPage(c.url);
  assert.ok(html.includes(c.cardTitle),c.slug+' unique card title');
  titles.add(c.cardTitle);
  assert.ok(html.includes(c.img+'"'),'full-size R2 download image');
  assert.ok(html.toLowerCase().includes('download'),c.slug+' download button');
  assert.ok(html.includes(c.ages),c.slug+' age pill renders');
  assert.ok(html.includes(escH(c.pill)),c.slug+' group pill renders');
  assert.ok(html.includes('/extra-classes/places-in-the-community/'),'class line back-link');
  assert.ok(html.length>9000,c.slug+' substantial page (not a stub)');
 }
 assert.equal(titles.size,28,'all 28 card titles unique');
});

test('places-in-the-community teaches the US/UK/CA name pairs where the places carry them',()=>{
 const ci=readPage('/flashcards/places-in-the-community/cinema/');
 assert.ok(/movie theater/i.test(ci),'cinema carries the US name');
 const ph=readPage('/flashcards/places-in-the-community/pharmacy/');
 assert.ok(/drugstore/i.test(ph)&&/chemist/i.test(ph),'pharmacy carries the US and UK names');
 const gs=readPage('/flashcards/places-in-the-community/gas-station/');
 assert.ok(/petrol/i.test(gs),'gas station carries the UK name');
 const dn=readPage('/flashcards/places-in-the-community/dentists-office/');
 assert.ok(/surgery/i.test(dn),"dentist's office carries the UK name");
 const sc=readPage('/flashcards/places-in-the-community/sports-center/');
 assert.ok(/leisure centre/i.test(sc),'sports center carries the UK name');
 const su=readPage('/flashcards/places-in-the-community/supermarket/');
 assert.ok(/trolley/i.test(su),'supermarket carries the UK cart name');
});

test('places-in-the-community lessons: 28 pages under the class, simple kid guide, canvas, tour-order prev/next',()=>{
 assert.equal(Object.keys(lpContent).length,28,'28 lessons in the registry');
 for(let i=0;i<set.cards.length;i++){
  const c=set.cards[i];
  const p=`/extra-classes/places-in-the-community/learn/${c.slug}/`;
  const html=readPage(p);
  assert.ok(html.includes('PLACES IN THE COMMUNITY LESSON'),c.slug+' lesson eyebrow');
  assert.ok(!html.includes('LEARNING PATH LESSON'),'no Learning Path claim');
  assert.ok(html.includes('/extra-classes/'),'crumbed through Extra Classes');
  assert.ok(/data-wc/.test(html),c.slug+' drawing canvas mounts over the card');
  assert.ok(html.includes(c.img),c.slug+' lesson shows the original card');
  const prev=set.cards[(i-1+28)%28],next=set.cards[(i+1)%28];
  assert.ok(html.includes('learn/'+prev.slug+'/')&&html.includes('learn/'+next.slug+'/'),c.slug+' rides tour-order prev/next');
  // the kid-followable guide fields
  for(const f of ['teach','what','know','play','check'])assert.ok(lpContent[c.slug][f]&&lpContent[c.slug][f].length>40,c.slug+' lesson field '+f);
 }
});

test('places-in-the-community class page: groups, Town Walk, two-names section, back-links',()=>{
 const html=readPage('/extra-classes/places-in-the-community/');
 for(const g of GROUP_HEADS)assert.ok(html.includes(escH(g)),'class page group '+g);
 assert.ok(/Town Walk/i.test(html),'the class game is the Town Walk');
 assert.ok(html.includes('movie theater')&&html.includes('leisure centre'),'Same place, two names section');
 assert.ok(html.includes('/flashcards/places-in-the-community/'),'supporting-resource link to the set');
 assert.ok(html.includes('/extra-classes/'),'back to Extra Classes');
 assert.ok(html.includes('/extra-classes/home-and-daily-life/')||html.includes('/extra-classes/kids-games/'),'sister class link');
 const tiles=(html.match(/class="lp-tile"/g)||[]).length;
 assert.equal(tiles,28,'28 lesson tiles on the class page');
});

test('places-in-the-community rides the extra-classes shelf (six classes) with honest cover dims',()=>{
 const pc=EXTRA_CLASSES.find(c=>c.name==='Places in the Community');
 assert.ok(pc,'on the EXTRA_CLASSES shelf');
 assert.equal(pc.href,'/extra-classes/places-in-the-community/');
 assert.equal(EXTRA_CLASSES.length,8,'eight extra classes — Colors joined (owner 2026-10-22)');
 const hub=readPage('/extra-classes/');
 assert.ok(hub.includes('Eight extra classes'),'hub copy counts eight');
 assert.ok(hub.includes('/extra-classes/places-in-the-community/'),'hub links the class');
 const lpRow=readPage('/learning-path/');
 assert.ok(lpRow.includes('/extra-classes/places-in-the-community/'),'Learning Path bonus row links the class');
});

test('places-in-the-community rides the Ages 4–5 hub shelf, hub filters, and the sitemap',()=>{
 const hub=readPage('/flashcards/');
 assert.ok(hub.includes('/flashcards/places-in-the-community/'),'set card on the flashcards hub');
 assert.ok(hub.includes('places-in-the-community'),'set slug tagged on the wall');
 const xml=read('dist/sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/extra-classes/places-in-the-community/</loc>'),'class in sitemap');
 assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/places-in-the-community/</loc>'),'set in sitemap');
 for(const c of set.cards){
  assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/places-in-the-community/'+c.slug+'/</loc>'),'card '+c.slug+' in sitemap');
  assert.ok(xml.includes('<loc>https://kiddo.school/extra-classes/places-in-the-community/learn/'+c.slug+'/</loc>'),'lesson '+c.slug+' in sitemap');
 }
 // image sitemap extension carries the card art
 assert.ok(xml.includes('<image:loc>https://assets.kiddo.school/school/extra-classes/places-in-the-community/flashcards/school.webp'),'image sitemap entry for a place card');
 // hub-filter tags: at least one token per axis, all tokens known
 const tags=FC_TAGS['places-in-the-community'];
 assert.ok(tags,'hub-filter tags present (build fails without them)');
 assert.ok(tags.includes('age-3')&&tags.includes('age-4-5'),'age tags');
 assert.ok(tags.includes('lvl-preschool')&&tags.includes('lvl-prek'),'level tags');
 assert.ok(tags.some(t=>t.startsWith('subj-')),'subject tag');
 assert.ok(tags.some(t=>t.startsWith('skill-')),'skill tag');
});
