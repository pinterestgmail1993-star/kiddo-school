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

test('every worksheet page mounts the drawing layer over the true-size artwork', () => {
  const html = page('worksheets/shapes/build-a-shape-spaceship');
  assert.match(html, /data-wc data-wc-src="https:\/\/pub-f2fcb7[^"]+"/, 'mount points at the real sheet');
  assert.match(html, /data-wc-w="1264" data-wc-h="1264"/, 'canvas is the artwork\u2019s own pixel size (this sheet is square)');
  assert.match(html, /crossorigin="anonymous"/, 'image loads with CORS so save can combine it');
  assert.match(html, /src="\/assets\/write-color\.js" defer/, 'engine script ships on the page');
  assert.match(html, /noscript/, 'honest no-JS note');
});

test('every flashcard card page mounts the drawing layer too', () => {
  for (const u of ['flashcards/alphabet/apple', 'flashcards/colors/red', 'flashcards/animals-everyday-objects/cat', 'flashcards/numbers-and-counting/five']) {
    const html = page(u);
    assert.match(html, /data-wc data-wc-src=/, u + ' has a drawing mount');
    assert.match(html, /Draw on this card/, u + ' explains the layer honestly');
  }
});

test('the four alphabet letter sets exist with clean URLs and per-card downloads', () => {
  for (const v of alphabetVariantSets) {
    const html = page(v.url.slice(1));
    assert.equal((html.match(/class="fcv-card"/g) || []).length, 26, v.url + ' shows all 26 cards');
    assert.equal((html.match(/download="kiddo-alphabet-/g) || []).length, 26, v.url + ' every card has its own download');
    assert.ok(html.includes('SHARE THIS SET'), v.url + ' has sharing buttons');
    for (const c of v.cards) {
      assert.ok(existsSync(join(root, 'assets/fc-variants', v.cards[0].img.split('/')[3], c.slug + '.webp')), v.url + ' card file ships: ' + c.slug);
    }
    const xml = read('sitemap.xml');
    assert.ok(xml.includes(`<loc>https://kiddo-school.pages.dev${v.url}</loc>`), v.url + ' is indexable');
  }
});

test('the learning path links every class 1-22 to its flashcard set', () => {
  const lp = page('learning-path');
  const pairs = [
    ['Newborn 1', '/flashcards/black-and-white-baby-cards/'],
    ['Newborn 2', '/flashcards/faces-and-visual-tracking/'],
    ['Infant 1', '/flashcards/colors-and-first-objects/'],
    ['Infant 2', '/flashcards/first-words-familiar-things/'],
    ['Explorer 1', '/flashcards/animals-everyday-objects/'],
    ['Explorer 2', '/flashcards/first-actions-body-parts/'],
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
  for (const section of ['Newborn · Birth to 12 weeks', 'Infants · 3 to 6 months', 'Explorers · 6 to 12 months', 'Toddlers · 12 to 24 months', 'Preschool · Age 3'])
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
