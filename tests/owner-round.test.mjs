// The owner's newest asks, guarded:
//  1. Write & Color: the drawing layer ships, mounts on every worksheet page
//     and every flashcard card page, and the engine has the full tool set
//     (pencil, crayons, eraser, undo, clear, save) with pointer events.
//  2. The four alphabet letter-set pages with clean URLs and per-card
//     download buttons.
//  3. The learning path links every class 1-22 to its flashcard set.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';
import {alphabetVariantSets} from '../src/flashcards/data-alphabet-variants.mjs';

const root = 'dist';
const read = p => readFileSync(join(root, p), 'utf8');
const page = p => read(join(p, 'index.html').replace(/\/\//g, '/'));

test('write-color.js ships and carries the whole tool set', () => {
  const js = read('assets/write-color.js');
  assert.ok(js.includes('data-wc'), 'mounts on [data-wc]');
  assert.ok(js.includes('pointerdown') && js.includes('pointermove') && js.includes('setPointerCapture'), 'pointer events (mouse, finger, stylus)');
  assert.ok(js.includes('touch-action') || js.includes("touchstart"), 'touch is held still while drawing');
  assert.ok(js.includes('destination-out'), 'eraser really erases');
  assert.ok(js.includes("'Undo'") && js.includes("'Clear'") && js.includes("'Save my work'"), 'undo, clear and save exist');
  assert.ok(js.includes('history.push'), 'undo is real history');
  assert.ok(js.includes('toBlob'), 'save produces a real PNG');
  assert.ok(js.includes('never leaves the'), 'honest privacy comment');
});

test('worksheet pages are download-first: the sheet shows whole, no drawing layer there', () => {
  /* the owner set the rule: worksheet pages are for download and print;
     solving on screen happens on the class activity pages (Class 32) */
  const html = page('worksheets/shapes/build-a-shape-spaceship');
  assert.ok(!html.includes('data-wc '), 'no drawing mount on a worksheet page');
  assert.match(html, /class="fc2-hero ws-hero-art"/, 'the sheet shows whole');
  assert.match(html, /Download Worksheet/, 'PDF download stays');
  assert.match(html, /Print Worksheet/, 'print button stays');
  const ls = page('worksheets/life-skills/wash-your-hands');
  assert.ok(!ls.includes('data-wc '), 'no drawing mount on a life-skills worksheet page');
  assert.match(ls, /data-ls-download/, 'life-skills download serves the original WebP');
  assert.match(ls, /data-ls-print/, 'life-skills print button present');
});

test('no flashcard card page mounts a drawing layer (owner rule: flashcards are paper)', () => {
  for (const u of ['flashcards/alphabet/apple', 'flashcards/colors/red', 'flashcards/animals-everyday-objects/cat', 'flashcards/numbers-and-counting/five', 'flashcards/alphabet-uppercase/letter-a', 'flashcards/alphabet-tracing/letter-b']) {
    const html = page(u);
    assert.ok(!html.includes('data-wc'), u + ' has no drawing mount');
    assert.ok(!html.includes('Draw on this card'), u + ' has no drawing hint');
    assert.match(html, /data-fc-root/, u + ' keeps the family feedback block');
  }
});

test('the six alphabet letter sets exist with clean URLs, real R2 files and tap-through grids', () => {
  assert.equal(alphabetVariantSets.length, 6, 'six letter sets: uppercase, lowercase, pair, objects, sounds, tracing');
  const slugs = alphabetVariantSets.map(v => v.slug);
  for (const s of ['alphabet-uppercase', 'alphabet-lowercase', 'alphabet-letters', 'alphabet-objects', 'alphabet-sounds', 'alphabet-tracing'])
    assert.ok(slugs.includes(s), 'set exists: ' + s);
  assert.ok(!slugs.includes('alphabet-silhouette'), 'the coded silhouette set is retired');
  for (const v of alphabetVariantSets) {
    const html = page(v.url.slice(1));
    assert.equal((html.match(/class="fcv-card" href="/g) || []).length, 26, v.url + ' shows all 26 cards as whole-card links');
    assert.equal((html.match(/data-fc-dl/g) || []).length, 0, v.url + ' grid has no download buttons (they live on the card pages)');
    assert.ok(html.includes('SHARE THIS SET'), v.url + ' has sharing buttons');
    assert.ok(!html.includes('/assets/fc-variants/'), v.url + ' uses no coded cut images');
    for (const c of v.cards) {
      assert.match(c.img, /^https:\/\/assets\.kiddo\.school\/school\/alphabet\/[a-z]\/(uppercase|lowercase|pair|object|picture|sound|tracing)\.png$/, v.url + ' card points at the owner\'s R2 file: ' + c.slug);
      const cardHtml = page(c.url.slice(1));
      assert.ok(cardHtml.includes('src="' + c.img + '"'), c.url + ' shows the same real file');
      assert.ok(cardHtml.includes('data-fc-dl'), c.url + ' download is wired for real saving');
      assert.ok(cardHtml.includes('data-tc-print-view'), c.url + ' has a print button');
      assert.ok(!cardHtml.includes('data-wc'), c.url + ' has no drawing layer (flashcards are paper)');
      assert.ok(cardHtml.includes('data-fc-root'), c.url + ' mounts the family feedback block');
    }
    const xml = read('sitemap.xml');
    assert.ok(xml.includes(`<loc>https://kiddo.school${v.url}</loc>`), v.url + ' is indexable');
  }
});

test('the same letter has a DIFFERENT page and file per letter set (the lowercase-a bug)', () => {
  const bySlug = Object.fromEntries(alphabetVariantSets.map(v => [v.slug, v]));
  const urls = new Set(), imgs = new Set();
  for (const s of alphabetVariantSets) {
    const c = s.cards[0]; // letter a
    urls.add(c.url); imgs.add(c.img);
  }
  assert.equal(urls.size, 6, 'six distinct card pages for the same letter');
  assert.equal(imgs.size, 6, 'six distinct images for the same letter');
  const lc = bySlug['alphabet-lowercase'].cards[0], up = bySlug['alphabet-uppercase'].cards[0];
  assert.equal(lc.url, '/flashcards/alphabet-lowercase/letter-a/', 'lowercase a page uses the letter slug');
  assert.equal(up.url, '/flashcards/alphabet-uppercase/letter-a/', 'uppercase A page uses the letter slug');
  assert.notEqual(lc.url, up.url, 'lowercase a page ≠ uppercase A page');
  assert.notEqual(lc.img, up.img, 'lowercase a image ≠ uppercase A image');
  assert.ok(lc.img.includes('/lowercase.png'), 'lowercase set serves lowercase.png');
  assert.ok(up.img.includes('/uppercase.png'), 'uppercase set serves uppercase.png');
  assert.ok(!up.cardTitle.includes('Apple'), 'uppercase A page is not titled Apple');
  assert.ok(up.cardTitle.includes('Uppercase Letter A'), 'uppercase A page is titled Uppercase Letter A');
  const tr = bySlug['alphabet-tracing'].cards[0];
  assert.ok(tr.img.includes('/tracing.png'), 'tracing set serves tracing.png');
  const ob = bySlug['alphabet-objects'].cards[0];
  assert.ok(/\/(object|picture)\.png$/.test(ob.img), 'objects set serves the owner object/picture file');
  assert.equal(ob.slug, 'apple', 'objects set keeps the correct word slug');
});

test('the retired silhouette URL is gone (no redirect, no page)', () => {
  const red = read('_redirects');
  assert.ok(!red.includes('/flashcards/alphabet-silhouette/'), 'no redirect rules ship — only corrected URLs exist');
  assert.ok(!existsSync(join(root, 'flashcards/alphabet-silhouette')), 'no stale silhouette page ships');
});

test('the learning path links every class 1-22 to its flashcard set', () => {
  const lp = page('learning-path');
  const pairs = [
    ['Newborn 1', '/flashcards/black-and-white-baby-cards/'],
    ['Newborn 2', '/flashcards/faces-and-visual-tracking/'],
    ['Infant 1', '/flashcards/colors-and-first-objects/'],
    ['Infant 2', '/flashcards/first-words-familiar-things/'],
    ['Baby 1', '/flashcards/animals-everyday-objects/'],
    ['Baby 2', '/flashcards/first-actions-body-parts/'],
    ['Toddler 1', '/flashcards/first-words-food-home/'],
    ['Toddler 2', '/flashcards/first-concepts/'],
    ['Toddler 3', '/flashcards/colors-and-shapes/'],
    ['Toddler 4', '/flashcards/matching-and-sorting/'],
    ['Toddler 5', '/flashcards/animals-and-sounds/'],
    ['Toddler 6', '/flashcards/vehicles-and-sounds/'],
    ['Toddler 7', '/flashcards/emotions-and-feelings/'],
    ['Toddler 8', '/flashcards/garden-bugs-and-friends/'],
    ['Class 15', '/flashcards/alphabet/'],
    ['Class 16', '/flashcards/numbers-and-counting/'],
    ['Class 17', '/flashcards/shapes/'],
    ['Class 18', '/flashcards/colors/'],
    ['Class 19', '/flashcards/opposites/'],
    ['Class 20', '/flashcards/animal-sounds/'],
    ['Class 21', '/flashcards/body-parts-and-five-senses/'],
    ['Class 22', '/flashcards/fruits-and-vegetables/'],
  ];
  for (const [label, url] of pairs) assert.ok(lp.includes(`href="${url}"`), 'learning path links ' + label + ' → ' + url);
});

test('the flashcards hub is organised by learning-path stage', () => {
  const hub = page('flashcards');
  for (const section of ['Newborn · Birth to 12 weeks', 'Infants · 3 to 6 months', 'Babies · 6 to 12 months', 'Toddlers · 12 to 24 months', 'Preschool · Age 3'])
    assert.ok(hub.includes(section), 'hub stage section: ' + section);
  for (const s of ['faces-and-visual-tracking', 'colors-and-first-objects', 'first-words-familiar-things', 'animals-everyday-objects', 'first-actions-body-parts', 'first-words-food-home'])
    assert.ok(hub.includes(`/flashcards/${s}/`), 'hub lists the new baby set ' + s);
});

test('the learning-path class pages teach solving, not games', () => {
  for (const p of ['toddler/2-years/colors-and-shapes', 'toddler/2-years/garden-bugs-and-friends', 'preschool/3-years/alphabet-and-letter-sounds', 'preschool/3-years/fruits-and-vegetables']) {
    const html = page(p);
    assert.ok(html.includes('id="solve-the-sheets"'), p + ' teaches how to solve the sheets');
    assert.ok(!html.includes('data-tc-round'), p + ' renders no coded games');
    assert.ok(html.includes('Write &amp; Color'), p + ' names the on-screen drawing layer');
  }
});
