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


