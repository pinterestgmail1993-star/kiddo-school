// Age-4 preschool stage hub (/preschool/4-years/) — layout law.
// Owner 2026-10-25: "what is this layout? check and correct this" — the 15
// class cards were outer <a> anchors containing inner <a> links in their
// description paragraphs. HTML forbids <a> inside <a>, so the browser closed
// each card anchor at its first inner link and the pills/title, paragraph and
// Open-Class span fell out as separate .fc-stages grid items — the torn-apart
// zigzag. A stray early </div> also closed the grid after Class 28, leaving
// Classes 29-38 outside it. These locks keep both bugs dead.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const hub = readFileSync('dist/preschool/4-years/index.html', 'utf8');

const CLASSES = [24,25,26,27,28,29,30,31,32,33,34,35,36,37,38];

test('no card on the Age-4 hub is an anchor — nested <a> can never return',()=>{
  assert.ok(!hub.includes('<a class="fc-stage'), 'cards must not be <a class="fc-stage">');
  // parser walk: an <a> must never start while another <a> is open
  let depth = 0, nested = 0;
  const re = /<\/?a\b[^>]*>/g;
  for(const m of hub.matchAll(re)) m[0][1]==='/' ? depth-- : (depth>0 && nested++, depth++);
  assert.equal(nested, 0, nested+' nested <a> tags in the hub');
});

test('all fifteen classes sit inside ONE .fc-stages grid as whole <article> cards',()=>{
  const grid = hub.slice(hub.indexOf('<div class="fc-stages">'),
                         hub.indexOf('<p class="lesson-note">'));
  assert.ok(grid.length > 0, 'grid + note region exists');
  const cards = grid.match(/<article class="fc-stage lesson-card-link">/g) || [];
  assert.equal(cards.length, 15, '15 whole-card articles inside the grid');
  // div-depth walk from the grid opening: depth must never reach 0 before the
  // last card (the old stray early </div> closed the grid after Class 28)
  let depth = 1;
  const lastCardEnd = grid.lastIndexOf('</article>');
  for(const m of grid.matchAll(/<\/?div\b[^>]*>/g)){
    if(m.index > lastCardEnd) break;
    m[0][1] === '/' ? depth-- : depth++;
    assert.ok(depth > 0, 'grid div still open inside the cards (no early </div>)');
  }
  for(const n of CLASSES){
    assert.ok(grid.includes(`>Class ${n}</span>`), `Class ${n} pill inside the grid`);
  }
});

test('each card navigates via its title link and its Open-Class link — same URL',()=>{
  const urls = ['/preschool/4-years/transportation-and-vehicles/',
    '/preschool/4-years/shapes-patterns-and-sorting/',
    '/preschool/4-years/colors-mixing-and-creativity/',
    '/preschool/4-years/early-writing-and-pencil-control/',
    '/preschool/4-years/phonics-and-beginning-sounds/',
    '/preschool/4-years/storytime-and-pre-reading/',
    '/preschool/4-years/logic-thinking-and-problem-solving/',
    '/preschool/4-years/science-nature-and-discovery/',
    '/preschool/4-years/life-skills-and-good-habits/',
    '/preschool/4-years/community-helpers-and-our-neighborhood/',
    '/preschool/4-years/weather-seasons-and-what-we-wear/',
    '/preschool/4-years/numbers-counting-and-early-math/',
    '/preschool/4-years/animals-and-their-habitats/',
    '/preschool/4-years/sports-movement-and-play/',
    '/preschool/4-years/feelings-and-kindness/'];
  const grid = hub.slice(hub.indexOf('<div class="fc-stages">'),
                         hub.indexOf('<p class="lesson-note">'));
  for(const url of urls){
    const card = grid.slice(grid.indexOf(`href="${url}"`));
    const end  = card.indexOf('</article>');
    const body = card.slice(0, end > -1 ? end : undefined);
    const opens = body.match(new RegExp(`href="${url.replace(/[/.]/g,'\\$&')}"`, 'g')) || [];
    assert.ok(opens.length >= 2, url+' linked from its title and Open-Class line');
  }
});

test('the SEO cross-links inside the card paragraphs survived the fix',()=>{
  // the inline library/flashcard links were the reason the cards broke —
  // they must stay (no whole-card anchor is allowed instead)
  for(const href of ['/flashcards/transportation-and-vehicles/',
                     '/preschool/shapes/adventures/',
                     '/preschool/colors/adventures/',
                     '/preschool/writing/adventures/',
                     '/preschool/phonics/adventures/']){
    assert.ok(hub.includes(`href="${href}"`), 'inner cross-link kept: '+href);
  }
});
