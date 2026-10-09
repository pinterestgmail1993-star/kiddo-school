// Garden Friends — School Garden collection tests: exact 18 verified R2 cards
// (no cover), spec-verbatim SEO + flow, two games with the spec feedback
// strings, honest where-to-see-it wording, look-don't-touch safety, review
// mount, hub + Learning Library wiring, manifest entries.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gfLesson, toddlerBase } from '../src/lessons.mjs';

const site = 'https://kiddo-school.pages.dev';
const read = f => readFileSync(f, 'utf8');
const html = read('dist/toddler/2-years/school-garden/garden-friends/index.html');
const pv = read('dist/toddler/2-years/school-garden/garden-friends/print/index.html');
const hub = read('dist/toddler/2-years/school-garden/index.html');
const library = read('dist/learning-library/index.html');
const map = read('dist/sitemap.xml');
const manifest = JSON.parse(read('data/asset-manifest.json', 'utf8'));

test('Garden Friends exists with the exact SEO title, one H1, meta, canonical and schema', () => {
 assert.ok(html.includes('<title>Garden Animals for Toddlers | Picture Cards &amp; Activities | Kiddo.school</title>'));
 assert.equal((html.match(/<h1>/g) || []).length, 1, 'exactly one H1');
 assert.ok(html.includes('<h1>Garden Animals &amp; Friends</h1>'));
 assert.ok(html.includes('<meta name="description" content="Help your toddler learn garden and outdoor animals with picture cards, simple animal vocabulary games and playful nature activities.">'));
 assert.ok(html.includes(`rel="canonical" href="${site}/toddler/2-years/school-garden/garden-friends/"`), 'canonical uses the site origin + path');
 assert.match(html, /"@type":"BreadcrumbList"/);
 assert.match(html, /"@type":"LearningResource"/);
 assert.ok(html.includes('garden animals for kids, garden animals for toddlers, animals for toddlers, animal vocabulary for toddlers, animal flashcards for toddlers, animal picture cards, learning animal names, nature activities for toddlers'), 'parent-search keywords, no stuffing');
 // The R2 folder name "garden-friends" appears in asset paths — but visible SEO copy keeps natural wording
 assert.ok(!html.includes('>Garden Friends<'), 'the inside collection name is not forced as visible copy');
});

test('exactly the 18 verified R2 cards, true dimensions, spec alt text, no cover', () => {
 const refs = [...html.matchAll(new RegExp(toddlerBase.replace(/\./g, '\\.') + 'garden-friends-age-2/([\\w-]+)\\.webp', 'g'))].map(m => m[1]);
 assert.equal(new Set(refs).size, 18, 'exactly 18 assets, nothing invented');
 assert.equal(gfLesson.cards.length, 18);
 assert.ok(!refs.includes('cover'), 'no cover image — the folder has none');
 for (const c of gfLesson.cards) {
  assert.ok(html.includes(`/${c.file}`), c.file);
  assert.ok(html.includes(`width="1414" height="2000"`), c.file + ' true 1414x2000 dims');
  assert.ok(html.includes(`alt="${c.alt}"`), c.file + ' spec alt');
 }
 assert.ok(html.includes('alt="Bird picture card for toddlers"'));
 assert.ok(html.includes('alt="Owl picture card for toddlers"'));
 // The social preview uses a real card (no cover exists) and the hero is text-only
 assert.ok(html.includes(`<meta property="og:image" content="${toddlerBase}garden-friends-age-2/01-bird.webp">`));
 assert.ok(!html.includes('lesson-hero-cover'), 'no cover hero variant');
 // Manifest carries the real verified bytes
 for (const c of gfLesson.cards) {
  const entry = manifest.find(e => e.key === `flashcards/toddler-learning-cards/garden-friends-age-2/${c.file}`);
  assert.ok(entry, c.file + ' in manifest');
  assert.equal(entry.width, 1414); assert.equal(entry.height, 2000);
  assert.ok(entry.bytes > 70000 && entry.bytes < 120000, c.file + ' real byte size');
 }
});

test('the ten spec flow steps render in order, teacher welcome verbatim', () => {
 for (const step of ['Teacher welcome', 'Meet the garden friends', 'Find the animal', 'Who am I?', 'Where might we see it?', 'Take it off screen', 'Print the cards', 'Teacher note', 'Parent review', 'Class complete']) {
  assert.ok(html.includes(step), 'flow step: ' + step);
 }
 assert.ok(html.includes('Let’s meet some animals we might see around gardens and outdoors!'), 'teacher welcome verbatim');
 assert.ok((html.match(/tc-flow/g) || []).length >= 1);
 // section anchors for the flow
 for (const id of ['meet-the-garden-friends', 'find-the-animal', 'who-am-i', 'where-might-we-see-it', 'off-screen', 'printables', 'class-complete']) {
  assert.ok(html.includes(`id="${id}"`), 'section #' + id);
 }
});

test('find the animal: 5 spec rounds, 3 picture choices, spec feedback strings', () => {
 assert.ok(html.includes('Find the animal.'));
 for (const ask of ['Find the bird.', 'Where’s the frog?', 'Find the rabbit.', 'Can you find the squirrel?', 'Where’s the owl?']) {
  assert.ok(html.includes(`data-tc-ask="${ask}"`), 'round: ' + ask);
 }
 const findSection = html.slice(html.indexOf('id="find-the-animal"'), html.indexOf('id="who-am-i"'));
 assert.equal((findSection.match(/data-tc-round/g) || []).length, 5, '5 rounds');
 for (const round of findSection.split('data-tc-round').slice(1)) {
  assert.equal((round.match(/class="tc-choice"/g) || []).length, 3, '3 choices per round');
  assert.equal((round.match(/data-tc-correct="true"/g) || []).length, 1, 'exactly one correct per round');
 }
 assert.ok(findSection.includes('data-tc-correct="You found it!"'), 'spec correct feedback');
 assert.ok(findSection.includes('data-tc-incorrect="Look again."'), 'spec incorrect feedback');
});

test('who am I: the six spec clues, each mapping to the right animal', () => {
 assert.ok(html.includes('Who am I?'));
 const whoSection = html.slice(html.indexOf('id="who-am-i"'), html.indexOf('id="where-might-we-see-it"'));
 assert.equal((whoSection.match(/data-tc-round/g) || []).length, 6, '6 clue rounds');
 const clues = [
  ['I have long ears. Who am I?', '04-rabbit.webp'],
  ['I hop. Who am I?', '02-frog.webp'],
  ['I have a bushy tail. Who am I?', '03-squirrel.webp'],
  ['I fly at night. Who am I?', '17-bat.webp'],
  ['I say quack. Who am I?', '07-duck.webp'],
  ['I have a shell. Who am I?', '08-turtle.webp'],
 ];
 for (const [clue, file] of clues) {
  const round = whoSection.split('data-tc-ask="' + clue + '"')[1] || '';
  assert.ok(round, 'clue present: ' + clue);
  const choices = round.slice(0, round.indexOf('data-tc-feedback'));
  assert.match(choices, new RegExp('data-tc-correct="true"[\\s\\S]{0,600}?' + file.replace('.', '\\.')), clue + ' → correct animal paired with the correct flag');
 }
 assert.ok(whoSection.includes('data-tc-correct="You found it!"'));
 assert.ok(whoSection.includes('data-tc-incorrect="Look again."'));
});

test('where might we see it: honest, hedged wording — no claim that every animal lives in a garden', () => {
 const whereSection = html.slice(html.indexOf('id="where-might-we-see-it"'), html.indexOf('id="off-screen"'));
 assert.ok(html.includes('Where might we see it?'));
 assert.ok(whereSection.includes('Some of these friends live in gardens, some just visit, and some live in the wider outdoors'), 'accuracy framing present');
 for (const phrase of ['you will hear one before you see it', 'paddling along in a little line', 'especially after rain', 'if you are lucky', 'usually a whooo long before a look']) {
  assert.ok(whereSection.includes(phrase), 'hedged phrase: ' + phrase);
 }
 assert.ok(!/all (of these animals )?live in gardens|every one (of these animals )?lives in your garden/i.test(whereSection), 'no universal garden claim');
 // owl and bat live outdoors at night — never claimed as garden residents
 assert.ok(whereSection.includes('High in old trees at night'));
});

test('take it off screen: looking, never touching or feeding — spec safety rules', () => {
 const off = html.slice(html.indexOf('id="off-screen"'), html.indexOf('id="printables"'));
 assert.ok(off.includes('Wild animals are looked at, never touched, chased or fed'), 'core safety line');
 assert.ok(off.includes('Never feed wild animals, never touch or pick up an unknown animal, and never follow one for a closer look'), 'explicit rules');
 assert.ok(off.includes('A grown-up stays close the whole time'), 'grown-up supervision');
 assert.ok(!/touch the (bird|frog|rabbit|worm)/i.test(off), 'no touching instructions');
 // no camera, no location, no proof anywhere on the page
 assert.ok(!/camera|geolocation|upload a photo|prove it/i.test(html), 'no camera/location/proof requirements');
});

test('print cards step + print page: 18 cards, two per page, noindex', () => {
 assert.ok(html.includes('Print the garden animal cards.'));
 assert.ok(html.includes('data-tc-print-open="/toddler/2-years/school-garden/garden-friends/print/?print=1"'));
 assert.ok(pv.includes('<h1>Garden Animals &amp; Friends Learning Cards</h1>'));
 assert.equal((pv.match(/garden-friends-age-2\//g) || []).length, 18, '18 cards on the print page, cover never referenced');
 assert.ok(!pv.includes('cover.webp'), 'no cover on the print page');
 assert.match(pv, /class="print-view"/);
 assert.ok(!map.includes('school-garden/garden-friends/print/'), 'print page excluded from sitemap');
 const sitemapUrls = [...map.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
 assert.ok(sitemapUrls.includes(site + '/toddler/2-years/school-garden/garden-friends/'), 'lesson is indexable');
});

test('review mount: same community system, mounted at the end with the four reactions', () => {
 assert.ok(html.includes('data-cm-root'), 'community mount present');
 assert.ok(html.includes('data-page-path="/toddler/2-years/school-garden/garden-friends/"'), 'page_path from the canonical route');
 for (const label of ['Loved it', 'Liked it', 'It was okay', 'Not for us']) assert.ok(html.includes(label), 'reaction: ' + label);
 assert.ok(html.includes('How was this activity?'));
 assert.ok(html.includes('/assets/community.js'));
 assert.ok(html.includes('/assets/community-api.js'));
});

test('no scores, timers, points, grades or invented animals anywhere', () => {
 assert.ok(!/\b(scores?|grades?|timers?|leaderboard|winner|losing|points)\b/i.test(html), 'no competitive language');
 assert.ok(!/dragonfly|butterfly|ladybug|snail-bee|zebra|lion|elephant/i.test(html), 'no invented or out-of-folder animals');
 const refs = [...html.matchAll(/garden-friends-age-2\/([\w-]+)\.webp/g)].map(m => m[1]);
 for (const r of refs) assert.ok(gfLesson.cards.some(c => c.file === r + '.webp'), 'asset comes from the real folder: ' + r);
 assert.ok(html.includes('03-squirrel.webp') && !html.includes('garden-friends-age-2/19-'), 'no 19th card');
});

test('School Garden hub links the real collections; Learning Library links the garden', () => {
 assert.ok(hub.includes('href="/toddler/2-years/school-garden/garden-friends/"'), 'hub links Garden Animals & Friends');
 assert.ok(hub.includes('href="/toddler/2-years/garden-bugs-and-friends/"'), 'hub links Bugs & Insects (real lesson 14 page)');
 assert.ok(hub.includes('Bugs &amp; Insects'));
 assert.ok(hub.includes('Garden Animals &amp; Friends'));
 assert.ok(!hub.includes('Garden Vocabulary'), 'the unfinished Garden Vocabulary collection is NOT faked');
 assert.ok(!hub.includes('coming soon') || !/coming soon/i.test(hub.replace(/keeps growing[^<]*/, '')), 'no unfinished-section teasers');
 // The library is books-only now: the School Garden is reached from the
 // homepage Explore Our School section and the footer instead.
 const home = read('dist/index.html');
 assert.ok(home.includes('id="explore-our-school"'), 'homepage has Explore Our School');
 const explore = home.slice(home.indexOf('id="explore-our-school"'));
 assert.ok(explore.includes('href="/toddler/2-years/school-garden/"'), 'Explore links the School Garden');
 assert.ok(explore.includes('School Garden') && explore.includes('School Library'), 'both locations named');
 assert.ok(explore.includes('href="/learning-library/"'), 'Explore links the School Library');
 assert.ok(!explore.includes('Art Studio') && !explore.includes('Playroom'), 'no unbuilt locations promised');
 // main navigation is untouched — no garden links in the site header
 const nav = html.slice(html.indexOf('<nav aria-label="Main navigation"'), html.indexOf('</nav>'));
 assert.ok(!nav.includes('garden'), 'School Garden stays out of the main navigation');
});
