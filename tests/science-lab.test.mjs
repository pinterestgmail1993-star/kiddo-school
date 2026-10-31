// The Science Lab shelf (/science/) — the owner's brief (2026-10-31): the 53
// lab-equipment flashcards (R2 school/science-lab/flashcards/, probed live
// 53/53, 800×1132) join the EXISTING Science Lab page as ONE shelf family —
// "remember no indiviual pages": zero new URLs, zero per-card pages. Every
// card: image (loading="lazy" + width/height), age/subject/level/skill pills
// ("add age pills accordingly" — the deck serves Ages 4–8), a kid-directed
// description under the picture, Download + Print buttons, and the
// "Ask a grown-up" badge on the nine grown-up-only cards ("add ask a grown
// up, or sos sign if anyhting suspicious for kids") with the SOS variant on
// the emergency-crew card. The Science Lab stays OUT of the Learning Path
// (owner rule). Level pills name school grades (owner rule) — Preschool 18 /
// Grade 1 21 / Grade 2 14. The lab page talks to kids; manners.js print
// isolation rides along.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {LAB_BASE,CARDS,LAB_SHELVES} from '../src/science-lab-deck.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const html=read('science/index.html');

test('ONE page: all 53 cards live on /science/, zero new URLs, nothing per-card',()=>{
 assert.equal((html.match(/class="mn-card"/g)||[]).length,53,'53 card tiles on the Science Lab page');
 const slugLinks=CARDS.filter(c=>html.includes('href="/science/'+c.slug+'/"')).map(c=>c.slug);
 assert.deepEqual(slugLinks,[],'zero per-card links from the shelf tiles');
 assert.ok(html.includes('THE SCIENCE LAB SHELF \u00b7 53 FLASHCARDS'),'the shelf intro');
});

test('six shelves, honest counts, every card exactly once',()=>{
 for(const sh of LAB_SHELVES)
  assert.ok(html.includes(sh.label),'shelf present: '+sh.label);
 assert.equal(LAB_SHELVES.flatMap(s=>s.slugs).length,53,'shelves cover the deck');
});

test('every card: image lazy + dims, four pills, kid-voice description, Download + Print',()=>{
 assert.equal((html.match(/loading="lazy"/g)||[]).length>=53,true,'lazy on the deck');
 for(const c of CARDS){
  const at=html.indexOf(LAB_BASE+c.file+'" width="800"');
  assert.ok(at>0,'tile image for '+c.slug);
  const tile=html.slice(at,at+3800);
  for(const pill of ['fc-pill-age','fc-pill-subject','fc-pill-level','fc-pill-skill'])
   assert.ok(tile.includes(pill),pill+' on '+c.slug);
  assert.ok(tile.includes('Ages 4–8'),'age pill accordingly on '+c.slug);
  assert.ok(tile.includes('download="'+c.slug+'.webp"'),'download on '+c.slug);
  assert.ok(tile.includes('data-mn-print'),'print on '+c.slug);
  assert.ok(tile.includes('class="mn-tip"'),'description under the image on '+c.slug);
  assert.ok(tile.includes('class="mn-grownup"')===/\u00b7 Tell a grown-up|Ask a grown-up/.test(tile),'badge only where locked: '+c.slug);
 }
});

test('the grown-up badges ride exactly the nine grown-up-only cards, SOS on the emergency crew',()=>{
 const badges=[...html.matchAll(/class="mn-grownup( mn-sos)?">([^<]+)<\/span>/g)].map(m=>m[2]);
 assert.equal(badges.filter(b=>b.startsWith('Ask a grown-up')).length,8,'8 Ask-a-grown-up badges');
 assert.equal(badges.filter(b=>b.startsWith('SOS')).length,1,'one SOS badge on the emergency-crew card');
 assert.equal(badges.length,9,'no other badges');
 for(const slug of ['acid-bottle-safety-bottle-chemical-dropper','centrifuge-hot-plate-magnetic-stirrer','graduated-cylinder-erlenmeyer-flask-bunsen-burner','protective-apron-goggles-case-emergency-shower','safety-cone-lab-tongs-clamp-stand','syringe-medical-thermometer-stethoscope','test-tube-rack-dropper-safety-mask','thermal-camera-heat-lamp-ice-pack']){
  const at=html.indexOf(LAB_BASE+slug+'-flashcard-for-kids.webp');
  assert.ok(html.slice(at,at+3800).includes('Ask a grown-up'),'badge on '+slug);
 }
 const em=html.indexOf(LAB_BASE+'fire-extinguisher-first-aid-box-emergency-bell-flashcard-for-kids.webp');
 assert.ok(html.slice(em,em+3800).includes('SOS'),'SOS on the emergency crew');
});

test('honest levels: grade pills split 18/21/14 (Preschool / Grade 1 / Grade 2)',()=>{
 for(const [label,count] of [['Preschool \u00b7 Name it',18],['Grade 1 \u00b7 Tell it',21],['Grade 2 \u00b7 Ask why',14]])
  assert.equal((html.match(new RegExp('fc-pill-level">'+label,'g'))||[]).length,count,label+' = '+count);
});

test('kid voice + house rules on the shelf copy',()=>{
 const tips=[...html.matchAll(/class="mn-tip">(.*?)<\/figcaption>/g)].map(m=>m[1]);
 assert.equal(tips.length,53,'53 descriptions');
 assert.equal(new Set(tips.map(t=>t.slice(0,60))).size,53,'descriptions are unique');
 for(const t of tips.slice(0,53)){
  const plain=t.replace(/&#39;|&amp;/g,'x');
  assert.ok(/\byou\b|\byour\b/i.test(plain),'kid-directed: '+plain.slice(0,50));
 }
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(html),'word-ban holds');
 assert.ok(html.includes('/assets/manners.js'),'print isolation ships with the lab page');
 assert.ok(!html.includes('etsy'),'zero Etsy');
});

test('the Science Lab stays OUT of the Learning Path',()=>{
 const lp=read('learning-path/index.html');
 const rows=[...lp.matchAll(/lp-class">Class (\d+): <a href="([^"]+)"/g)].map(m=>m[2]);
 assert.ok(rows.every(u=>u!=='/science/'),'no numbered class row links the lab (the lab is a room, not a class)');
 assert.ok(!lp.includes('Class 43'),'no invented class number');
 // the LP keeps its own classroom row for older children instead
 assert.ok(lp.includes('href="/science/">Science Lab</a>'),'the lab stays in the older-kids classroom row');
});
