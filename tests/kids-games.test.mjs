// kids-games — EXTRA CLASS · Kids Games (owner request 2026-10-18: "now next
// is games extra classes / so in lesson a simple guide for kids how to play
// this game / and for individual library flashcards the same we are doing /
// and age and other pills accordingly"). The 27 R2 uploads under
// school/extra-classes/kids-games/flashcards/ (26 game cards + cover, every
// file probed 800×1132 portrait) become: (1) the class page
// /extra-classes/kids-games/ — all 26 games in tour order, the Game Day class
// game, and the 'Same game, two names' US/UK/CA section; (2) 26 /learn/
// lessons — a simple how-to-play guide a KID can follow (what you need, the
// steps, one way to make it fresh) via LP_REGISTRY; (3) /flashcards/kids-games/
// set page + 26 card pages with downloads, age pills (Ages 3+ / Ages 4–5) and
// six pill groups. Locks: set shape/dims/order, set page groups, 26 card
// pages with unique titles + downloads, US/UK/CA pairs, lessons with canvas +
// tour-order prev/next, class page sections, extra-classes shelf (five
// classes), Ages 4–5 hub shelf + sitemap + hub-filter tags.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
import {lpContent} from '../src/flashcards/lp-kids-games.mjs';
import {EXTRA_CLASSES} from '../src/extra-classes.mjs';
import {FC_TAGS} from '../src/hub-filters.mjs';
const read=f=>readFileSync(f,'utf8');
const readPage=p=>readFileSync('dist'+p+'index.html','utf8');
/* group heads and pills carry '&' — the HTML escapes it */
const escH=s=>s.replace(/&/g,'&amp;');

const set=fcSetBySlug['kids-games'];
const setHtml=readPage('/flashcards/kids-games/');
const ORDER=['balloon-keep-up','beanbag-toss','bowling','hoop-toss','paper-plane-target','duck-duck-goose','follow-the-leader','freeze-dance','hide-and-seek','hot-potato','musical-chairs','red-light-green-light','bingo','fishing','four-in-a-row','memory-match','rock-paper-scissors','tic-tac-toe','maze','puzzle','spot-the-difference','treasure-hunt','charades','simon-says','hopscotch','jump-rope'];
const GROUP_HEADS=['Throw, roll & aim','Run, chase & freeze','Table & take turns','Look, find & solve','Act, guess & listen','Playground & outdoors'];

test('kids-games set: 26 cards in tour order, every card 800×1132 portrait',()=>{
 assert.equal(set.cards.length,26,'26 game cards, cover never counted');
 assert.deepEqual(set.cards.map(c=>c.slug),ORDER,'cards ride in tour order');
 for(const c of set.cards){
  assert.equal(c.w,800,c.slug+' width');assert.equal(c.h,1132,c.slug+' height');
  assert.match(c.img,/^https:\/\/assets\.kiddo\.school\/school\/extra-classes\/kids-games\/flashcards\//,c.slug+' lives in the owner folder');
  assert.ok(c.alt.length>60,c.slug+' alt written from the artwork');
  assert.ok(c.ages==='Ages 3+'||c.ages==='Ages 4–5',c.slug+' carries an age pill');
  assert.ok(c.pill&&GROUP_HEADS.includes(c.pill),c.slug+' carries a group pill');
 }
 assert.equal(set.cover.w,800);assert.equal(set.cover.h,1132);
 assert.match(set.coverUrl,/cover\.webp$/,'cover fronts the set');
});

test('kids-games set page: six pill groups, age pills, class button, no LP claim',()=>{
 for(const g of GROUP_HEADS)assert.ok(setHtml.includes(escH(g)),'group head '+g);
 assert.ok(setHtml.includes('/extra-classes/kids-games/'),'class button back to the class');
 assert.ok(!setHtml.includes('LEARNING PATH LESSON'),'no fake Learning Path claim');
 assert.equal((setHtml.match(/class="fc-pillgroup"/g)||[]).length,6,'six pill groups on the set page');
 assert.ok((setHtml.match(/fc-pill-age/g)||[]).length>=26,'age pills ride on every card tile');
 assert.ok(setHtml.includes('26'),'the set size is honest somewhere on the page');
});

test('kids-games card pages: 26 unique titles, download, pills, print',()=>{
 const titles=new Set();
 for(const c of set.cards){
  const html=readPage(c.url);
  assert.ok(html.includes(c.cardTitle),c.slug+' unique card title');
  titles.add(c.cardTitle);
  assert.ok(html.includes(c.img+'"'),'full-size R2 download image');
  assert.ok(html.toLowerCase().includes('download'),c.slug+' download button');
  assert.ok(html.includes(c.ages),c.slug+' age pill renders');
  assert.ok(html.includes(escH(c.pill)),c.slug+' group pill renders');
  assert.ok(html.includes('/extra-classes/kids-games/'),'class line back-link');
  assert.ok(html.length>9000,c.slug+' substantial page (not a stub)');
 }
 assert.equal(titles.size,26,'all 26 card titles unique');
});

test('kids-games teaches the US/UK/CA name pairs where the games carry them',()=>{
 const tt=readPage('/flashcards/kids-games/tic-tac-toe/');
 assert.ok(/noughts and crosses/i.test(tt),'tic-tac-toe carries the UK name');
 const jr=readPage('/flashcards/kids-games/jump-rope/');
 assert.ok(/skipping rope/i.test(jr),'jump rope carries the UK name');
 const pp=readPage('/flashcards/kids-games/paper-plane-target/');
 assert.ok(/paper aeroplane/i.test(pp),'paper plane carries the UK name');
 const fd=readPage('/flashcards/kids-games/freeze-dance/');
 assert.ok(/musical statues/i.test(fd),'freeze dance carries the UK name');
 const fr=readPage('/flashcards/kids-games/four-in-a-row/');
 assert.ok(/Connect Four/i.test(fr),'four in a row names the boxed version');
});

test('kids-games lessons: 26 pages under the class, simple kid guide, canvas, tour-order prev/next',()=>{
 assert.equal(Object.keys(lpContent).length,26,'26 lessons in the registry');
 for(let i=0;i<set.cards.length;i++){
  const c=set.cards[i];
  const p=`/extra-classes/kids-games/learn/${c.slug}/`;
  const html=readPage(p);
  assert.ok(html.includes('KIDS GAMES LESSON'),c.slug+' lesson eyebrow');
  assert.ok(!html.includes('LEARNING PATH LESSON'),'no Learning Path claim');
  assert.ok(html.includes('/extra-classes/'),'crumbed through Extra Classes');
  assert.ok(/data-wc/.test(html),c.slug+' drawing canvas mounts over the card');
  assert.ok(html.includes(c.img),c.slug+' lesson shows the original card');
  const prev=set.cards[(i-1+26)%26],next=set.cards[(i+1)%26];
  assert.ok(html.includes('learn/'+prev.slug+'/')&&html.includes('learn/'+next.slug+'/'),c.slug+' rides tour-order prev/next');
  // the kid-followable guide fields
  for(const f of ['teach','what','know','play','check'])assert.ok(lpContent[c.slug][f]&&lpContent[c.slug][f].length>40,c.slug+' lesson field '+f);
 }
});

test('kids-games class page: groups, Game Day, two-names section, back-links',()=>{
 const html=readPage('/extra-classes/kids-games/');
 for(const g of GROUP_HEADS)assert.ok(html.includes(escH(g)),'class page group '+g);
 assert.ok(/Game Day/i.test(html),'the class game is Game Day');
 assert.ok(html.includes('noughts and crosses')&&html.includes('skipping rope'),'Same game, two names section');
 assert.ok(html.includes('/flashcards/kids-games/'),'supporting-resource link to the set');
 assert.ok(html.includes('/extra-classes/'),'back to Extra Classes');
 assert.ok(html.includes('/extra-classes/home-and-daily-life/')||html.includes('/extra-classes/doctor-visit/'),'sister class link');
 const tiles=(html.match(/class="lp-tile"/g)||[]).length;
 assert.equal(tiles,26,'26 lesson tiles on the class page');
});

test('kids-games rides the extra-classes shelf (five classes) with honest cover dims',()=>{
 const kg=EXTRA_CLASSES.find(c=>c.name==='Kids Games');
 assert.ok(kg,'on the EXTRA_CLASSES shelf');
 assert.equal(kg.href,'/extra-classes/kids-games/');
 assert.equal(EXTRA_CLASSES.length,13,'thirteen extra classes — Sequence Stories joined (owner 2026-10-29; Question Words 2026-10-28, Manners 2026-10-27, one page, no individual URLs)');
 const hub=readPage('/extra-classes/');
 assert.ok(hub.includes('Thirteen extra classes'),'hub copy counts twelve — Question Words joined (owner 2026-10-28; Dinosaurs 2026-10-25)');
 assert.ok(hub.includes('/extra-classes/kids-games/'),'hub links the class');
 const lpRow=readPage('/learning-path/');
 assert.ok(lpRow.includes('/extra-classes/kids-games/'),'Learning Path bonus row links the class');
});

test('kids-games rides the Ages 4–5 hub shelf, hub filters, and the sitemap',()=>{
 const hub=readPage('/flashcards/');
 assert.ok(hub.includes('/flashcards/kids-games/'),'set card on the flashcards hub');
 assert.ok(hub.includes('kids-games'),'set slug tagged on the wall');
 const xml=read('dist/sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/extra-classes/kids-games/</loc>'),'class in sitemap');
 assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/kids-games/</loc>'),'set in sitemap');
 for(const c of set.cards){
  assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/kids-games/'+c.slug+'/</loc>'),'card '+c.slug+' in sitemap');
  assert.ok(xml.includes('<loc>https://kiddo.school/extra-classes/kids-games/learn/'+c.slug+'/</loc>'),'lesson '+c.slug+' in sitemap');
 }
 // image sitemap extension carries the card art
 assert.ok(xml.includes('<image:loc>https://assets.kiddo.school/school/extra-classes/kids-games/flashcards/balloon-keep-up.webp'),'image sitemap entry for a game card');
 // hub-filter tags: at least one token per axis, all tokens known
 const tags=FC_TAGS['kids-games'];
 assert.ok(tags,'hub-filter tags present (build fails without them)');
 assert.ok(tags.includes('age-3')&&tags.includes('age-4-5'),'age tags');
 assert.ok(tags.includes('lvl-preschool')&&tags.includes('lvl-prek'),'level tags');
 assert.ok(tags.some(t=>t.startsWith('subj-')),'subject tag');
 assert.ok(tags.some(t=>t.startsWith('skill-')),'skill tag');
});
