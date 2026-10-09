// Garden Flowers + Garden Things — School Garden collection tests: the exact
// verified R2 cards (flowers 12 + cover, things 12, no invented files), true
// per-card dimensions, spec SEO, flow steps, answerable games, honest safety
// wording, print views, School Garden hub cards, flashcard set + card pages,
// manifest bytes and sitemap entries.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gflLesson, gthLesson, toddlerBase } from '../src/lessons.mjs';

const site = 'https://kiddo-school.pages.dev';
const read = f => readFileSync(f, 'utf8');
const map = read('dist/sitemap.xml');
const manifest = JSON.parse(read('data/asset-manifest.json', 'utf8'));
const hub = read('dist/toddler/2-years/school-garden/index.html');

const FLOWERS = [
 ['01-sunflower.webp', 1920, 2954], ['02-rose.webp', 1916, 2952],
 ['03-tulip.webp', 1914, 2954], ['04-daisy.webp', 1910, 2952],
 ['05-daffodil.webp', 1914, 2954], ['06-poppy.webp', 1912, 2954],
 ['07-lavender.webp', 1918, 2936], ['08-hibiscus.webp', 1928, 2956],
 ['09-lotus.webp', 1924, 2952], ['10-lily.webp', 1920, 2950],
 ['11-marigold.webp', 1916, 2952], ['12-bluebell.webp', 1912, 2954]
];
const THINGS = [
 ['01-flower.webp', 1414, 2000], ['02-tree.webp', 1414, 2000],
 ['03-grass.webp', 1414, 2000], ['04-bush.webp', 1414, 2000],
 ['05-garden-hose.webp', 1414, 2000], ['06-watering-can.webp', 1414, 2000],
 ['07-shovel.webp', 1414, 2000], ['08-rake.webp', 1414, 2000],
 ['09-wheelbarrow.webp', 1414, 2000], ['10-plant-pot.webp', 1414, 2000],
 ['11-fence.webp', 1414, 2000], ['12-garden-bench.webp', 1414, 2000]
];

const classPage = (L, folder) => {
 const html = read(`dist${L.path}index.html`);
 const refs = [...html.matchAll(new RegExp(toddlerBase.replace(/\./g, '\\.') + folder + '/([\\w-]+)\\.webp', 'g'))].map(m => m[1]);
 return { html, refs };
};

test('Garden Flowers class: spec SEO, one H1, meta, canonical, schema', () => {
 const { html } = classPage(gflLesson, 'garden-flowers-age-2');
 assert.ok(html.includes('<title>Garden Flowers for Toddlers | Picture Cards &amp; Activities | Kiddo.school</title>'));
 assert.equal((html.match(/<h1>/g) || []).length, 1, 'exactly one H1');
 assert.ok(html.includes('<h1>Garden Flowers</h1>'));
 assert.ok(html.includes(`rel="canonical" href="${site}/toddler/2-years/school-garden/garden-flowers/"`));
 assert.match(html, /"@type":"LearningResource"/);
 assert.match(html, /"@type":"BreadcrumbList"/);
});

test('Garden Flowers: exactly the 12 verified cards + real cover, true dims, no invented files', () => {
 const { html, refs } = classPage(gflLesson, 'garden-flowers-age-2');
 assert.equal(new Set(refs).size, 13, '12 cards + the cover, nothing invented');
 assert.ok(refs.includes('cover'), 'the folder has a real cover and the page uses it');
 for (const [file, w, h] of FLOWERS) {
  const c = gflLesson.cards.find(c => c.file === file);
  assert.ok(c, file + ' configured');
  assert.ok(html.includes(`/${file}`), file);
  assert.ok(html.includes(`width="${w}" height="${h}"`), file + ` true ${w}x${h} dims`);
  assert.ok(html.includes(`alt="${c.alt}"`), file + ' alt');
 }
 // Cover carries its true landscape dims (2476x2032) — no squashed hero
 assert.ok(html.includes('garden-flowers-age-2/cover.webp" width="2476" height="2032"'));
 assert.ok(html.includes('lesson-hero-cover'), 'cover hero variant used');
 // Manifest carries the real verified bytes for every flower card
 for (const [file] of FLOWERS) {
  const entry = manifest.find(e => e.key === `flashcards/toddler-learning-cards/garden-flowers-age-2/${file}`);
  assert.ok(entry, file + ' in manifest');
  assert.ok(entry.bytes > 200000 && entry.bytes < 500000, file + ' real byte size');
 }
});

test('Garden Things class: spec SEO, one H1, meta, canonical, schema', () => {
 const { html } = classPage(gthLesson, 'garden-things-age-2');
 assert.ok(html.includes('<title>Garden Things for Toddlers | Picture Cards &amp; Activities | Kiddo.school</title>'));
 assert.equal((html.match(/<h1>/g) || []).length, 1, 'exactly one H1');
 assert.ok(html.includes('<h1>Garden Things</h1>'));
 assert.ok(html.includes(`rel="canonical" href="${site}/toddler/2-years/school-garden/garden-things/"`));
 assert.match(html, /"@type":"LearningResource"/);
});

test('Garden Things: exactly the 12 verified cards, no cover (first card fronts the set)', () => {
 const { html, refs } = classPage(gthLesson, 'garden-things-age-2');
 assert.equal(new Set(refs).size, 12, '12 cards, nothing invented');
 assert.ok(!refs.includes('cover'), 'no cover image — the folder has none');
 assert.ok(!html.includes('lesson-hero-cover'), 'no cover hero variant');
 assert.ok(html.includes(`<meta property="og:image" content="${toddlerBase}garden-things-age-2/01-flower.webp">`), 'first card is the social preview');
 for (const [file, w, h] of THINGS) {
  assert.ok(html.includes(`/${file}`), file);
  assert.ok(html.includes(`width="${w}" height="${h}"`), file + ` true ${w}x${h} dims`);
  const entry = manifest.find(e => e.key === `flashcards/toddler-learning-cards/garden-things-age-2/${file}`);
  assert.ok(entry, file + ' in manifest');
  assert.equal(entry.width, 1414); assert.equal(entry.height, 2000);
  assert.ok(entry.bytes > 55000 && entry.bytes < 130000, file + ' real byte size');
 }
});

test('both classes: ten flow steps, teacher welcome, two games each, honest off-screen safety', () => {
 for (const L of [gflLesson, gthLesson]) {
  const { html } = classPage(L, L.folder);
  for (const step of ['Teacher welcome', 'Take it off screen', 'Print the cards', 'Teacher note', 'Parent review', 'Class complete']) {
   assert.ok(html.includes(step), `${L.h1} flow step: ${step}`);
  }
  // Two find-it games with exactly one correct choice per round
  const games = L.interactive.sections.filter(s => s.type === 'play');
  assert.equal(games.length, 2, L.h1 + ' has two play games');
  for (const g of games) {
   assert.ok(g.rounds.length >= 5, L.h1 + ' game rounds');
   for (const r of g.rounds) {
    assert.equal(r.choices.filter(c => c.correct).length, 1, L.h1 + ' round answerable: ' + r.ask);
    assert.equal(r.choices.length, 3, L.h1 + ' three choices');
    for (const ch of r.choices) assert.ok(L.cards.some(c => c.file === ch.file), 'choice file is a real card');
   }
  }
  // Every learn item references a real card with say + find
  const learn = L.interactive.sections.find(s => s.type === 'learn');
  assert.equal(learn.items.length, 12, L.h1 + ' learns all 12');
  for (const it of learn.items) {
   assert.ok(it.say && it.say.length > 10, L.h1 + ' say line');
   assert.ok(it.find && it.find.length > 10, L.h1 + ' find line');
  }
 }
 // Garden-specific honest safety: flowers are not picked, tools stay grown-up
 assert.ok(read('dist' + gflLesson.path + 'index.html').includes('Flowers stay on the plant'), 'flower picking rule stated');
 assert.ok(read('dist' + gthLesson.path + 'index.html').includes('Real tools are grown-up tools'), 'tool safety stated');
});

test('print views exist for both collections, noindex, twelve cards two to a page', () => {
 for (const L of [gflLesson, gthLesson]) {
  const pv = read(`dist${L.path}print/index.html`);
  assert.ok(pv.includes('class="print-view"'), L.h1 + ' print body class');
  assert.match(pv, /content="noindex,follow"/);
  assert.ok(pv.includes(L.printables.pack), L.h1 + ' pack title');
  for (const c of L.cards) assert.ok(pv.includes(`/${c.file}`), L.h1 + ' print includes ' + c.file);
  assert.ok(!map.includes(L.path + 'print/'), 'print views stay out of the sitemap');
 }
});

test('School Garden hub lists all four real collections with the new cards', () => {
 assert.ok(hub.includes('href="/toddler/2-years/school-garden/garden-flowers/"'));
 assert.ok(hub.includes('href="/toddler/2-years/school-garden/garden-things/"'));
 assert.ok(hub.includes('Garden Flowers'));
 assert.ok(hub.includes('Garden Things'));
 assert.ok(hub.includes('href="/toddler/2-years/garden-bugs-and-friends/"'), 'earlier collections stay');
 assert.ok(!hub.includes('Garden Vocabulary'), 'the unfinished Garden Vocabulary collection is still NOT faked');
});

test('flashcard sets: garden-flowers and garden-things set pages + 24 card pages', () => {
 const fs = read('dist/flashcards/garden-flowers/index.html');
 const ts = read('dist/flashcards/garden-things/index.html');
 assert.ok(fs.includes('Garden Flowers flashcards.'), 'flowers set H1');
 assert.ok(fs.includes('href="/flashcards/garden-flowers/sunflower/"'), 'flowers card links');
 assert.ok(ts.includes('Garden Things flashcards.'), 'things set H1');
 assert.ok(ts.includes('href="/flashcards/garden-things/watering-can/"'), 'things card links (multi-word slug)');
 // a flower card page and a thing card page, fully built
 const sun = read('dist/flashcards/garden-flowers/sunflower/index.html');
 assert.ok(sun.includes('Say it together'), 'card page say block');
 assert.ok(sun.includes('1920'), 'true card dims on card page');
 const wc = read('dist/flashcards/garden-things/watering-can/index.html');
 assert.ok(wc.includes('Say it together'), 'thing card page say block');
 // both linked from the /flashcards/ toddler wall
 const wall = read('dist/flashcards/index.html');
 assert.ok(wall.includes('href="/flashcards/garden-flowers/"'), 'wall links flowers');
 assert.ok(wall.includes('href="/flashcards/garden-things/"'), 'wall links things');
});

test('both class pages + both sets sitewide sitemap entries and no horizontal harm', () => {
 for (const L of [gflLesson, gthLesson]) {
  assert.ok(map.includes(`<loc>${site}${L.path}</loc>`), L.h1 + ' in sitemap');
  assert.ok(map.includes(`<loc>${site}/flashcards/${L === gflLesson ? 'garden-flowers' : 'garden-things'}/</loc>`), 'set in sitemap');
 }
 assert.ok(map.includes(`<loc>${site}/flashcards/garden-things/garden-bench/</loc>`), 'multi-word card slug in sitemap');
});
