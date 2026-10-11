// Kiddo School — the /search/ page searches the WHOLE school. Verifies the
// build-time index (dist/assets/search-index.json) covers every real,
// indexable page — books, classes, Circle Time, drawing lessons, flashcards,
// the School Garden, activities and the pages parents need — matches the
// sitemap exactly, excludes noindex utility views, and that the search page
// ships the mount + script that render those results client-side (escaped,
// capped, kind-labeled) with the same search field. Runs against dist/
// after `npm run build`.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';

const read=f=>readFileSync(f,'utf8');
const sitemap=read('dist/sitemap.xml');
const site=JSON.parse(read('dist/build-info.json')).siteUrl;
const searchPage=read('dist/search/index.html');
const script=read('dist/assets/search-page.js');

let index;
test('the whole-school index exists and every entry is honest and buildable',()=>{
 const raw=read('dist/assets/search-index.json');
 index=JSON.parse(raw);
 assert.ok(Array.isArray(index)&&index.length>100,'the index covers a real school, not a stub');
 const seen=new Set();
 for(const p of index){
  assert.ok(p.u&&p.u.startsWith('/')&&p.u.endsWith('/'),'every entry is an absolute site path: '+p.u);
  assert.ok(!seen.has(p.u),'no duplicate entries: '+p.u);seen.add(p.u);
  assert.ok(p.t&&p.t.length>2&&p.t.length<130,'a real title for '+p.u);
  assert.ok(p.d&&p.d.length>10,'a real description for '+p.u);
  assert.ok(p.k&&/^[A-Za-z ]+$/.test(p.k),'a friendly kind label for '+p.u);
  assert.ok(existsSync('dist'+p.u+'index.html'),'every indexed path really built: '+p.u);
 }
});

test('the index matches the sitemap exactly — nothing hidden, nothing invented',()=>{
 const sitemapPaths=new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[0].slice(site.length+5,-6)));
 const indexPaths=new Set(index.map(p=>p.u));
 assert.deepEqual(indexPaths,sitemapPaths,'searchable = sitemap: books, classes and activities are all searchable');
});

test('the school’s real rooms are searchable, utility views are not',()=>{
 const byPath=Object.fromEntries(index.map(p=>[p.u,p]));
 assert.equal(byPath['/'].k,'School home');
 assert.equal(byPath['/library/books/age-2/my-first-colors/'].k,'Book','My First Colors is searchable');
 assert.equal(byPath['/library/books/age-2/bunny-finds-a-friend/'].k,'Book','Bunny Finds a Friend is searchable');
 assert.equal(byPath['/how-to-draw-a-cat/'].k,'Drawing lesson');
 assert.equal(byPath['/how-to-draw-a-dog/'].k,'Drawing lesson');
 assert.equal(byPath['/toddler/2-years/circle-time/hello-school/'].k,'Circle Time');
 assert.equal(byPath['/toddler/2-years/school-garden/garden-flowers/'].k,'School Garden');
 assert.equal(byPath['/toddler/2-years/'].k,'Class');
 assert.equal(byPath['/science/grow-a-bean/how-to-grow-a-bean/'].k,'Activity');
 assert.equal(byPath['/flashcards/'].k,'Flashcards');
 assert.equal(byPath['/learning-path/'].k,'School page');
 assert.equal(byPath['/grown-ups/'].k,'School page');
 assert.equal(byPath['/privacy/'].k,'School page','parents can find the privacy page');
 assert.ok(!byPath['/search/'],'the search page does not search itself');
 assert.ok(!byPath['/404.html'],'no error pages in the index');
 assert.ok(!index.some(p=>p.u.endsWith('/print/')),'print views stay out');
 assert.ok(!byPath['/my-school-bag/'],'noindex tools stay out');
});

test('the search page ships the whole-school results mount and script',()=>{
 assert.match(searchPage,/src="\/assets\/search-page\.js"/,'the whole-school script is wired');
 assert.match(searchPage,/SEARCH THE WHOLE SCHOOL/,'the search page names its job');
 assert.match(searchPage,/Search every book, class, drawing lesson, flashcard set, worksheet and activity/);
 assert.match(searchPage,/for="query">Search the whole school</,'the field invites the whole school');
 assert.match(searchPage,/data-search-idea="caterpillar"/,'search ideas ship as one-tap chips');
 assert.match(searchPage,/kiddo-no-search-results/,'the school no-results artwork anchors the hero');
 assert.match(searchPage,/data-sr-empty/,'the empty state offers honest next steps');
 assert.match(searchPage,/data-site-search hidden/,'the results mount ships hidden until there is a query');
 assert.match(searchPage,/data-sr-count aria-live="polite"/,'result counts are announced');
 assert.match(searchPage,/data-sr-list/);
 assert.match(searchPage,/id="drawing"/,'the Drawing shelf still shares this page');
 assert.match(searchPage,/name="subject"/,'activity subject filter still works on the search page');
 assert.match(searchPage,/name="age"/,'activity age filter still works on the search page');
});

test('the search script: fetches the index, escapes results, caps the list, keeps everything in the browser',()=>{
 assert.match(script,/fetch\('\/assets\/search-index\.json'\)/);
 assert.match(script,/toLocaleLowerCase/,'case-insensitive matching like the cupboard');
 assert.match(script,/words\.every/,'multi-word queries must fully match');
 assert.match(script,/esc\(/,'every rendered string is escaped');
 assert.match(script,/slice\(0, 40\)/,'the list is capped so it stays calm');
 assert.match(script,/places? '.' across the school'|' place' : ' places'/,'a friendly result count');
 assert.match(script,/sr-kind/,'results show what they are');
 assert.doesNotMatch(script,/localStorage|sessionStorage|document\.cookie|XMLHttpRequest|analytics/i,'no storage, no tracking');
});
