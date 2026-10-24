// nature-club-animals — NATURE CLUB · Animals (owner 2026-10-21: "make both
// lesson, and libarary pages / have take care of ages cuz this is important"
// + "include the cover in both"). The 22 R2 uploads under
// school/nature-club/animals/flashcards/ (all spotter cards, probed per file:
// 19 at 800×1132 portrait, birds-of-prey / australian-birds /
// mountain-animals-2 at 1100×778 landscape) become: (1) the club hub
// /nature-club/ — the wild side of the school beside Extra Classes, mirroring
// the owner's own R2 layout; (2) the class page /nature-club/animals/ — all
// 22 groups in walk order, the Spotter's Walk class game and the 'Same
// animal, two names' section (reindeer/caribou, moose/elk, shrimp/prawn,
// buzzard/vulture); (3) 22 /learn/ spotter lessons via LP_REGISTRY; (4)
// /flashcards/nature-club-animals/ set page + 22 card pages. THE SET HAS NO
// COVER OF ITS OWN — it fronts the Animal Categories cover (owner: "include
// the cover in both") and that choice is locked here. Age pills per card:
// the deeper deck leans Ages 4–5 (17 cards), five friendly groups ride Ages
// 3+. Locks: set shape/dims/order, borrowed cover, set page groups, 22 card
// pages, lessons with canvas + walk-order prev/next, class page + club hub,
// sitemap + hub-filter tags + image sitemap.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
import {lpContent} from '../src/flashcards/lp-nature-club-animals.mjs';
import {EXTRA_CLASSES} from '../src/extra-classes.mjs';
import {FC_TAGS} from '../src/hub-filters.mjs';
const read=f=>readFileSync(f,'utf8');
const readPage=p=>readFileSync('dist'+p+'index.html','utf8');
/* group heads and pills carry '&' — the HTML escapes it */
const escH=s=>s.replace(/&/g,'&amp;');

const set=fcSetBySlug['nature-club-animals'];
const setHtml=readPage('/flashcards/nature-club-animals/');
const ORDER=['birds-of-prey','garden-birds','desert-birds','australian-birds','coastal-animals','river-animals','wetland-animals','crustaceans','shellfish','deep-sea-animals','pollinators','invertebrates','spiders-and-ticks','dog-family','deer-and-grazers','rodents','african-grassland-animals','south-american-animals','arctic-animals-2','cave-animals','mountain-animals-1','mountain-animals-2'];
const GROUP_HEADS=['Birds of the world','By the water','Little crawlies','Fur families','Wild homes'];
const LANDSCAPE=['birds-of-prey','australian-birds','mountain-animals-2'];

test('nature-club-animals set: 22 groups in walk order at their true probed dims',()=>{
 assert.equal(set.cards.length,22,'22 spotter cards, cover never counted');
 assert.deepEqual(set.cards.map(c=>c.slug),ORDER,'cards ride in walk order');
 for(const c of set.cards){
  if(LANDSCAPE.includes(c.slug)){assert.equal(c.w,1100,c.slug+' landscape width');assert.equal(c.h,778,c.slug+' landscape height');}
  else{assert.equal(c.w,800,c.slug+' width');assert.equal(c.h,1132,c.slug+' height');}
  assert.match(c.img,/^https:\/\/assets\.kiddo\.school\/school\/nature-club\/animals\/flashcards\//,c.slug+' lives in the owner folder (the club sits beside extra-classes, mirroring the R2 layout)');
  assert.ok(c.alt.length>60,c.slug+' alt written from the artwork');
  assert.ok(c.ages==='Ages 3+'||c.ages==='Ages 4–5',c.slug+' carries an age pill');
  assert.ok(c.pill&&GROUP_HEADS.includes(c.pill),c.slug+' carries a group pill');
 }
});

test('nature-club-animals fronts the Animal Categories cover — owner: include the cover in both',()=>{
 assert.match(set.coverUrl,/animal-categories\/flashcards\/cover\.webp$/,'the one cover serves both decks');
 assert.equal(set.cover.w,800);assert.equal(set.cover.h,1277,'borrowed cover dims probed honestly');
});

test('nature-club-animals age pills: the deeper deck leans Ages 4–5, five friendly groups ride Ages 3+',()=>{
 const threes=set.cards.filter(c=>c.ages==='Ages 3+').map(c=>c.slug);
 const fours=set.cards.filter(c=>c.ages==='Ages 4–5').map(c=>c.slug);
 assert.equal(threes.length+fours.length,22,'every card carries exactly one age pill');
 assert.equal(fours.length,17,'seventeen deeper-deck cards ride Ages 4–5');
 assert.equal(threes.length,5,'five friendly groups ride Ages 3+');
 assert.ok(threes.includes('garden-birds'),'garden birds are for the youngest spotters');
 assert.ok(setHtml.includes('Ages 3+')&&setHtml.includes('Ages 4–5'),'both pills render on the set page');
});

test('nature-club-animals set page: five pill groups, class button, no LP claim',()=>{
 for(const g of GROUP_HEADS)assert.ok(setHtml.includes(escH(g)),'group head '+g);
 assert.ok(setHtml.includes('/nature-club/animals/'),'class button back to the class');
 assert.ok(!setHtml.includes('LEARNING PATH LESSON'),'no fake Learning Path claim');
 assert.equal((setHtml.match(/class="fc-pillgroup"/g)||[]).length,5,'five pill groups on the set page');
 assert.ok((setHtml.match(/fc-pill-age/g)||[]).length>=22,'age pills ride on every card tile');
 assert.ok(setHtml.includes('22'),'the set size is honest somewhere on the page');
});

test('nature-club-animals card pages: 22 unique titles, download, pills, class back-link',()=>{
 const titles=new Set();
 for(const c of set.cards){
  const html=readPage(c.url);
  assert.ok(html.includes(c.cardTitle),c.slug+' unique card title');
  titles.add(c.cardTitle);
  assert.ok(html.includes(c.img+'"'),'full-size R2 download image');
  assert.ok(html.toLowerCase().includes('download'),c.slug+' download button');
  assert.ok(html.includes(c.ages),c.slug+' age pill renders');
  assert.ok(html.includes(escH(c.pill)),c.slug+' group pill renders');
  assert.ok(html.includes('/nature-club/animals/'),'class line back-link');
  assert.ok(html.length>9000,c.slug+' substantial page (not a stub)');
 }
 assert.equal(titles.size,22,'all 22 card titles unique');
});

test('nature-club-animals lessons: 22 spotter pages, canvas, walk-order prev/next, kid guide fields',()=>{
 assert.equal(Object.keys(lpContent).length,22,'22 lessons in the registry');
 for(let i=0;i<set.cards.length;i++){
  const c=set.cards[i];
  const p=`/nature-club/animals/learn/${c.slug}/`;
  const html=readPage(p);
  assert.ok(html.includes('NATURE CLUB LESSON'),c.slug+' lesson eyebrow');
  assert.ok(!html.includes('LEARNING PATH LESSON'),'no Learning Path claim');
  assert.ok(html.includes('/nature-club/'),'crumbed through the Nature Club');
  assert.ok(/data-wc/.test(html),c.slug+' drawing canvas mounts over the card');
  assert.ok(html.includes(c.img),c.slug+' lesson shows the original card');
  const prev=set.cards[(i-1+22)%22],next=set.cards[(i+1)%22];
  assert.ok(html.includes('learn/'+prev.slug+'/')&&html.includes('learn/'+next.slug+'/'),c.slug+' rides walk-order prev/next');
  for(const f of ['teach','what','know','play','check'])assert.ok(lpContent[c.slug][f]&&lpContent[c.slug][f].length>40,c.slug+' lesson field '+f);
 }
});

test('nature club: hub and class page with the Spotter Walk, two-names, and the borrowed cover',()=>{
 const hub=readPage('/nature-club/');
 assert.ok(hub.includes('/nature-club/animals/'),'hub links the Animals class');
 assert.ok(hub.includes('/extra-classes/animal-categories/'),'hub sends newcomers to Animal Categories first');
 assert.ok(hub.includes('animal-categories/flashcards/cover.webp'),'club hub fronts the borrowed cover');
 const html=readPage('/nature-club/animals/');
 for(const g of GROUP_HEADS)assert.ok(html.includes(escH(g)),'class page group '+g);
 assert.ok(/Spotter/i.test(html),'the class game is the Spotter\u2019s Walk');
 assert.ok(html.includes('caribou')&&html.includes('elk')&&html.includes('prawn')&&html.includes('vulture'),'Same animal, two names section (reindeer/caribou, moose/elk, shrimp/prawn, buzzard/vulture)');
 assert.ok(html.includes('/flashcards/nature-club-animals/'),'supporting-resource link to the set');
 assert.ok(html.includes('/nature-club/'),'back to the Nature Club');
 assert.ok(html.includes('/extra-classes/animal-categories/'),'start-here link to Animal Categories');
 const tiles=(html.match(/class="lp-tile"/g)||[]).length;
 assert.equal(tiles,22,'22 lesson tiles on the class page');
 assert.ok(!EXTRA_CLASSES.some(c=>c.name==='Nature Club'),'the club is a club, not an extra class — it sits beside the shelf');
});

test('nature-club-animals rides the flashcards hub, hub filters, and the sitemap',()=>{
 const hub=readPage('/flashcards/');
 assert.ok(hub.includes('/flashcards/nature-club-animals/'),'set card on the flashcards hub');
 const xml=read('dist/sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/nature-club/</loc>'),'club hub in sitemap');
 assert.ok(xml.includes('<loc>https://kiddo.school/nature-club/animals/</loc>'),'class in sitemap');
 assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/nature-club-animals/</loc>'),'set in sitemap');
 for(const c of set.cards){
  assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/nature-club-animals/'+c.slug+'/</loc>'),'card '+c.slug+' in sitemap');
  assert.ok(xml.includes('<loc>https://kiddo.school/nature-club/animals/learn/'+c.slug+'/</loc>'),'lesson '+c.slug+' in sitemap');
 }
 assert.ok(xml.includes('<image:loc>https://assets.kiddo.school/school/nature-club/animals/flashcards/garden-birds.webp'),'image sitemap entry for a spotter card');
 const tags=FC_TAGS['nature-club-animals'];
 assert.ok(tags,'hub-filter tags present');
 assert.ok(tags.includes('age-3')&&tags.includes('age-4-5'),'age tags');
 assert.ok(tags.includes('lvl-preschool')&&tags.includes('lvl-prek'),'level tags');
 assert.ok(tags.some(t=>t.startsWith('subj-')),'subject tag');
 assert.ok(tags.some(t=>t.startsWith('skill-')),'skill tag');
});
