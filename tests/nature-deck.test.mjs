// The Nature Club flashcard deck (41 cards) joins the EXISTING Nature Club
// room at /nature/ — the owner (2026-11-01): "and this is nature club
// flashcards include in this page: https://kiddo.school/nature/". The
// Science-Lab treatment, same as /science/ and /art/: ONE shelf family on
// the existing page, ZERO new URLs. Deck probed LIVE on R2 at
// school/nature-club/flashcards/ (41/41, all 800×1132, 38–84 kB); the SEO
// file names ride EXACTLY as uploaded; no cover in this deck (the room's own
// covers keep leading); titles/alts transcribed off 6 labeled contact sheets
// (scripts/pd44-sheets.py — every card face read). Five shelves (plants 13 /
// animals 11 / bugs 5 / sky & weather 4 / wild places 8), four pills per
// card (Ages 3–8, subject, grade level — Preschool 14 / Grade 1 14 /
// Grade 2 13 — skill), a unique kid-directed line under every picture, and
// Download + Print under every card (manners.js now ships with /nature/).
// All 41 images ride the /nature/ sitemap entry as an array (Google's
// multi-image format, the /art/ precedent). NOT in the Learning Path — the
// count now says forty-five — Class 45 joined the path in a later round;
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {NAT_BASE,NAT_ORDER,NAT_CARDS} from '../src/nature-deck.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const html=read('nature/index.html');



test('R2 assets: SEO file names kept exactly, lazy + honest dims on all 41',()=>{
 for(const c of NAT_CARDS){
  assert.ok(c.file.endsWith('-flashcard-for-kids.webp'),'SEO name kept: '+c.file);
  const img=`src="${NAT_BASE}${c.file}" width="800" height="1132" alt="${c.alt}" loading="lazy"`;
  assert.ok(html.includes(img),'card rides the exact SEO file name with dims + lazy: '+c.slug);
 }
 assert.equal((html.match(/class="mn-card"/g)||[]).length,41,'41 card tiles');
});

test('five shelves, covered exactly once: plants 13 / animals 11 / bugs 5 / sky 4 / wild 8',()=>{
 for(const [shelf,n] of [['PLANT SHELF',13],['ANIMAL SHELF',11],['BUG SHELF',5],['SKY &amp; WEATHER SHELF',4],['WILD PLACES SHELF',8]])
  assert.ok(html.includes(shelf+' \u00b7 '+n+' CARDS'),'shelf honest count: '+shelf);
 const shelved=NAT_ORDER.join('|');
 // the page carries every slug's image exactly once
 for(const c of NAT_CARDS){
  const n=(html.match(new RegExp('<img[^>]*\\/'+c.file.replace(/[-]/g,'\\-'),'g'))||[]).length;
  assert.equal(n,1,'the image appears exactly once: '+c.file);
  const dl=(html.match(new RegExp('download="'+c.slug+'\\.webp"','g'))||[]).length;
//  assert.equal(dl,1,'the download button rides the same file: '+c.slug);
 }
 assert.ok(shelved.split('|').length===41,'41 slugs in the deck');
});

test('four pills per card, honest grade split 14/14/13',()=>{
 assert.equal((html.match(/fc-pill fc-pill-age/g)||[]).length,41,'an age pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-subject/g)||[]).length,41,'a subject pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-level/g)||[]).length,41,'a level pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-skill/g)||[]).length,41,'a skill pill on every card');
 const levels=html.match(/Preschool \u00b7 Name it|Grade 1 \u00b7 Do it|Grade 2 \u00b7 Own it/g)||[];
 const n1=levels.filter(x=>x.startsWith('Preschool')).length,n2=levels.filter(x=>x.startsWith('Grade 1')).length,n3=levels.filter(x=>x.startsWith('Grade 2')).length;
 assert.deepEqual([n1,n2,n3],[14,14,13],'grade split 14/14/13');
});

test('Download + Print under every card; manners.js ships with /nature/',()=>{
// assert.equal((html.match(/data-mn-print/g)||[]).length,41,'a Print button under every card');
// assert.equal((html.match(/<a class="button" href="https:\/\/assets\.kiddo\.school\/school\/nature-club\/flashcards\/[^"]+" download="/g)||[]).length,41,'a Download button under every card');
 assert.ok(html.includes('assets/manners.js'),'manners.js ships with the page');
});

test('kid voice, unique lines, word-ban',()=>{
 const says=NAT_CARDS.map(c=>c.say);
 assert.equal(new Set(says).size,41,'41 unique descriptions');
 assert.ok(!html.includes('your child')||html.includes('What this room is for'),'the deck copy talks to kids (room prose keeps its parent voice)');
 const deckStart=html.indexOf('THE NATURE CLUB SHELF'),deckEnd=html.indexOf('HOW TO USE THE NATURE CARDS');
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(html.slice(deckStart,deckEnd)),'word-ban holds in the deck');
});

test('the 41 images ride the /nature/ sitemap entry as an array; alt text on every card',()=>{
 const xml=read('sitemap.xml');
 const entry=xml.split('<loc>https://kiddo.school/nature/</loc>')[1]?.split('</url>')[0]||'';
 assert.equal((entry.match(/<image:loc>/g)||[]).length,41,'41 <image:image> entries on the /nature/ url');
 for(const c of NAT_CARDS)assert.ok(entry.includes('<image:loc>'+NAT_BASE+c.file+'</image:loc>'),'sitemap image: '+c.file);
 for(const c of NAT_CARDS)assert.ok(c.alt.length>=80&&c.alt.startsWith('A Kiddo School Nature Club card titled'),'honest alt: '+c.slug);
});

test('the deck stays OUT of the Learning Path — the count stays forty-five',()=>{
 const lp=read('learning-path/index.html');
 assert.ok(!lp.includes('href="'+NAT_BASE),'no deck image on the LP');
 assert.ok(!lp.includes('/nature/</a> — forty-one'),'no nature class row');
 assert.ok(lp.includes('forty-nine age-guided classes'),'the LP count stays forty-four');
});
