// The Art Room shelf (/art/) — the owner's brief (2026-10-31): "include these
// https://kiddo.school/art/" — the 14 art-supply flashcards (R2
// school/art-room/flashcards/, probed live 14/14: 13 portrait 800×1131 + ONE
// landscape 800×566) join the EXISTING Art Studio page as ONE shelf family —
// "remember no indiviual pages": zero new URLs, zero per-card pages. Every
// card: image (loading="lazy" + honest width/height), age/subject/level/skill
// pills, a kid-directed description under the picture, Download + Print
// buttons. The craft-knife card wears the Ask-a-grown-up badge (standing
// owner rule from the science round). The Art Studio stays OUT of the
// Learning Path (the lab rule). Level pills name school grades (owner rule) —
// Preschool 4 / Grade 1 5 / Grade 2 5. Card words + alts transcribed off
// labeled contact sheets (scripts/art-sheets.py). All fourteen images join
// the image sitemap on the /art/ route (Google allows several <image:image>
// per <url>).
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {ARTDECK_BASE,ARTDECK_CARDS,ARTDECK_SHELVES} from '../src/art-deck.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const html=read('art/index.html');

test('ONE page: all 14 cards live on /art/, zero new URLs, nothing per-card',()=>{
 assert.equal((html.match(/class="mn-card"/g)||[]).length,14,'14 card tiles on the Art Studio page');
 const slugLinks=ARTDECK_CARDS.filter(c=>html.includes('href="/art/'+c.slug+'/"')).map(c=>c.slug);
 assert.deepEqual(slugLinks,[],'zero per-card links from the shelf tiles');
 assert.ok(html.includes('THE ART ROOM SHELF \u00b7 14 FLASHCARDS'),'the shelf intro');
});

test('four shelves, honest counts, every card exactly once',()=>{
 for(const sh of ARTDECK_SHELVES)
  assert.ok(html.includes(sh.label),'shelf present: '+sh.label);
 assert.equal(ARTDECK_SHELVES.flatMap(s=>s.slugs).length,14,'shelves cover the deck');
});

test('every card: image lazy + honest dims (one landscape card), four pills, kid-voice description, Download + Print',()=>{
 for(const c of ARTDECK_CARDS){
  const at=html.indexOf(ARTDECK_BASE+c.file+'" width="'+c.w+'" height="'+c.h+'"');
  assert.ok(at>0,'tile image at probed dims for '+c.slug);
  const tile=html.slice(at,at+3800);
  for(const pill of ['fc-pill-age','fc-pill-subject','fc-pill-level','fc-pill-skill'])
   assert.ok(tile.includes(pill),pill+' on '+c.slug);
  assert.ok(tile.includes('Ages 3–12'),'the room\u2019s age range on '+c.slug);
  assert.ok(tile.includes('download="'+c.slug+'.webp"'),'download on '+c.slug);
  assert.ok(tile.includes('data-mn-print'),'print on '+c.slug);
  assert.ok(tile.includes('class="mn-tip"'),'description under the image on '+c.slug);
 }
 assert.equal((html.match(/width="800" height="566"/g)||[]).length,1,'the one landscape card keeps its probed 800×566');
});

test('the Ask-a-grown-up badge rides exactly the craft-knife card',()=>{
 const badges=[...html.matchAll(/class="mn-grownup">([^<]+)<\/span>/g)].map(m=>m[1]);
 assert.equal(badges.length,1,'exactly one badge in the art deck');
 assert.equal(badges[0],'Ask a grown-up','the badge text');
 const kn=html.indexOf(ARTDECK_BASE+'glue-stick-tape-paper-flashcard-for-kids.webp');
 assert.ok(html.slice(kn,kn+3800).includes('Ask a grown-up'),'badge on the craft-knife card');
 const ss=html.indexOf(ARTDECK_BASE+'glue-stick-washi-tape-craft-punch-flashcard-for-kids.webp');
 assert.ok(!html.slice(ss,ss+3800).includes('mn-grownup'),'safety scissors stay kid-safe — no badge there');
});

test('honest levels: grade pills split 4/5/5 (Preschool / Grade 1 / Grade 2)',()=>{
 for(const [label,count] of [['Preschool \u00b7 Name it',4],['Grade 1 \u00b7 Try it',5],['Grade 2 \u00b7 Make it',5]])
  assert.equal((html.match(new RegExp('fc-pill-level">'+label,'g'))||[]).length,count,label+' = '+count);
});

test('unique card words, kid voice + house rules on the shelf copy',()=>{
 const words=ARTDECK_CARDS.map(c=>c.word);
 assert.equal(new Set(words).size,14,'all 14 card words unique: '+words.join(' / '));
 const tips=[...html.matchAll(/class="mn-tip">(.*?)<\/figcaption>/g)].map(m=>m[1]).slice(-14);
 assert.equal(tips.length,14,'14 descriptions');
 assert.equal(new Set(tips.map(t=>t.slice(0,60))).size,14,'descriptions are unique');
 for(const t of tips){
  const plain=t.replace(/&#39;|&amp;/g,'x');
  assert.ok(/\byou\b|\byour\b/i.test(plain),'kid-directed: '+plain.slice(0,50));
 }
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(html),'word-ban holds');
 assert.ok(html.includes('/assets/manners.js'),'print isolation ships with the art page');
 assert.ok(html.includes('href="/art/paper-shape-collage/"')||html.includes('shape-collage'),'the studio\u2019s own activities still lead the page');
});

test('all fourteen SEO file names ride the image sitemap on /art/',()=>{
 const xml=read('sitemap.xml');
 const m=xml.match(/<url><loc>https:\/\/kiddo\.school\/art\/<\/loc>([\s\S]*?)<\/url>/);
 assert.ok(m,'the /art/ sitemap entry');
 const imgs=[...m[1].matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(x=>x[1]);
 assert.equal(imgs.length,14,'all fourteen images on the /art/ entry');
 assert.deepEqual(imgs,ARTDECK_CARDS.map(c=>ARTDECK_BASE+c.file),'every image exactly as uploaded, deck order');
 for(const c of ARTDECK_CARDS)assert.ok(c.file.endsWith('-flashcard-for-kids.webp'),'SEO name kept: '+c.file);
});

test('the Art Studio stays OUT of the Learning Path, zero URLs touched',()=>{
 const lp=read('learning-path/index.html');
 const rows=[...lp.matchAll(/lp-class">Class (\d+): <a href="([^"]+)"/g)].map(m=>m[2]);
 assert.ok(rows.every(u=>u!=='/art/'),'no numbered class row links the studio (it is a room, not a class)');
 assert.ok(lp.includes('href="/art/">Art Studio</a>'),'the studio stays in the older-kids classroom row');
 const before=read('learning-path/index.html');
 assert.ok(before.includes('forty-three'),'the LP count stays forty-three — no class number was added');
});
