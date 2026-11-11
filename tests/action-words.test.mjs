// Class 49 · Action Words (/action-words/) — the owner's brief 2026-11-02:
// the class page + ONE SHORT PAGE PER CARD at /action-words/<slug>/ with a
// link back, the owner's words verbatim: "Create one short page per card at
// /action-words/<slug>/ with a link back, where <slug> is the file name
// without '-action-words-flashcard-for-kids.jpg', for example
// /action-words/run-jump-climb-push/." The short-page shape is the site's
// own Class 39 · Staying Safe precedent. NUMBERING (owner gate verbatim:
// "Add Class 49 'Action Words' (ages 4-5) to the Learning Path as the next
// class number after Class 48. If Class 48 is not live, tell me before
// assigning numbers."): Class 48 · Plants & How They Grow WAS probed LIVE
// (LP row 48, count word forty-eight) before 49 was assigned — the honest
// next number by the no-skip rule; the number rides display copy only (the
// URL carries no class number). Deck probed LIVE on R2 at
// school/learning-path/action-words/ (24/24 — HTTP 200 image/jpeg, every
// file exactly 1414×2000 portrait, byte sizes matching the owner's panel to
// the kB); THE JPG MASTERS RIDE EXACTLY AS UPLOADED (owner: "The images are
// JPG, so do not convert or re-compress them, and keep the file names
// exactly as they are"). FOLDER: the brief said …/flashcards/ but the live
// bucket keeps the deck at the folder ROOT (probed 404 at …/flashcards/,
// 200 at the root — the Class-39 quirk); the real R2 location is the truth
// and the owner is told. Titles/words/alts transcribed off 4 labeled
// contact sheets (scripts/aw-sheets.py — all 24 faces read; every card
// prints four or five labeled action scenes, no title banner). The FIRST
// card of the deck (bite-chew-smell-touch-feel, the owner's R2 panel row 1)
// is the class page's main image. Inbound links: Classes 37, 6, 32 — all
// three link back. LP count forty-eight → forty-nine.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {AW_PATH,AW_BASE,AW_ORDER,AW_CARDS,awBySlug,awShortTitle,awShortDesc} from '../src/action-words.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const html=read('action-words/index.html');
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));





test('numbering: Class 49 sits after Class 48 on the LP, the count says forty-nine everywhere',()=>{
 const lp=read('learning-path/index.html');
 const rows=[...lp.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.deepEqual(rows,[...Array(49).keys()].map(i=>i+1),'LP sequence is exactly 1\u201349, no gap');
 const i48=lp.indexOf('Class 48: <a href="/plants-and-how-they-grow/">'),i49=lp.indexOf('Class 49: <a href="/action-words/">');
 assert.ok(i48>0&&i49>i48,'row 49 sits after row 48');
 assert.ok(lp.includes('forty-nine age-guided classes')&&lp.includes('Forty-nine classes are ready now'),'LP count words say forty-nine');
 assert.ok(read('index.html').includes('Forty-nine classes are ready now, from birth to age five'),'homepage lede says forty-nine');
 assert.ok(read('about/index.html').includes('Forty-nine classes'),'About page says forty-nine');
});











test('inbound links: Class 37, Class 6 and Class 32 each carry their Class 49 block',()=>{
 assert.ok(read('preschool/4-years/sports-movement-and-play/index.html').includes('href="/action-words/"'),'Class 37 points here');
 assert.ok(read('baby/9-12-months/first-actions-body-parts/index.html').includes('href="/action-words/"'),'Class 6 points here');
 assert.ok(read('preschool/4-years/life-skills-and-good-habits/index.html').includes('href="/action-words/"'),'Class 32 points here');
});


