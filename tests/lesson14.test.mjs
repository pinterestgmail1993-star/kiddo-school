import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {gbLesson,lessons,toddlerBase} from '../src/lessons.mjs';

const site='https://kiddo-school.pages.dev';
const read=f=>readFileSync(f,'utf8');
const html=readFileSync('dist/toddler/2-years/garden-bugs-and-friends/index.html','utf8');
const pv=readFileSync('dist/toddler/2-years/garden-bugs-and-friends/print/index.html','utf8');
const map=readFileSync('dist/sitemap.xml','utf8');
const manifest=JSON.parse(readFileSync('data/asset-manifest.json','utf8'));

test('lesson 14 exists with exact SEO title, one H1, chips and breadcrumb schema',()=>{
 assert.equal(lessons.length,14,'the curriculum is now fourteen classes long');
 assert.ok(html.includes('<title>Garden Bugs &amp; Friends for 2-Year-Olds | Kiddo.school</title>'));
 assert.ok(html.includes('<h1>Garden Bugs &amp; Friends for 2-Year-Olds</h1>'));
 assert.ok(html.includes('TODDLER 8 · LESSON 14'));
 assert.ok(html.includes('<strong>Subject</strong> Nature &amp; Talk'));
 assert.match(html,/"@type":"BreadcrumbList"/);
 assert.match(html,/"@type":"LearningResource"/);
 assert.ok(html.includes(`<meta property="og:image" content="${toddlerBase}garden-bugs-and-friends-age-2/cover.webp">`));
 assert.ok(html.includes(`rel="canonical" href="${site}/toddler/2-years/garden-bugs-and-friends/"`));
});

test('lesson 14 shows exactly the twenty verified R2 cards at their true dimensions',()=>{
 const refs=[...html.matchAll(new RegExp(toddlerBase.replace(/\./g,'\\.')+'garden-bugs-and-friends-age-2/([\\w-]+)\\.webp','g'))].map(m=>m[1]);
 assert.equal(new Set(refs).size,21,'20 cards + cover, no invented assets');
 for(const c of gbLesson.cards){
  assert.ok(html.includes(`/${c.file}`),c.file);
  assert.ok(html.includes(`width="${c.w}" height="${c.h}"`),c.file+' true dims');
  assert.ok(html.includes(`alt="${c.alt}"`),c.file+' alt');
 }
 // The four smaller cards keep their exact 1414x2000 dims (never forced to one size)
 assert.ok(html.includes('width="1414" height="2000"'));
 assert.ok(!html.includes('garden-bugs-and-friends-age-2/learning-cards/'),'no invented subfolders');
 // Cover rendered in the hero, not lazy
 assert.ok(html.includes(`<img src="${toddlerBase}garden-bugs-and-friends-age-2/cover.webp" width="2000" height="1294"`));
});

test('lesson 14 has the real interactive structure: learn, two games, wiggle, facts, off-screen, print',()=>{
 assert.ok(html.includes('Meet the garden friends.'));
 assert.ok(html.includes('Who is hiding?'));
 assert.ok(html.includes('Find the bug.'));
 assert.ok(html.includes('Wiggle &amp; move.'));
 assert.ok(html.includes('Little bug facts.'));
 assert.ok(html.includes('Garden hunt.'));
 assert.ok(html.includes('Print the garden cards.'));
 assert.equal((html.match(/data-tc-round/g)||[]).length,10,'5 match rounds + 5 find rounds');
 assert.ok(html.includes('data-tc-correct="true"'));
 assert.ok(!/Score|Failed|Wrong!|Try again until you pass/.test(html),'no competitive language');
 assert.ok(html.includes('Ladybugs are garden helpers'),'true facts only');
 assert.ok(html.includes('href="/toddler/2-years/garden-bugs-and-friends/print/"'));
 assert.ok(html.includes('data-tc-print-open="/toddler/2-years/garden-bugs-and-friends/print/?print=1"'));
});

test('lesson 14 is wired into the path: previous lesson 13, next none (nothing invented)',()=>{
 assert.ok(html.includes('Previous class'));
 assert.ok(html.includes('href="/toddler/2-years/emotions-and-feelings/"'),'prev links to lesson 13');
 assert.ok(html.includes('Emotions &amp; Feelings'));
 assert.ok(!html.includes('garden-bugs-and-friends/coming-soon'),'no invented lesson 15');
 const l13=read('dist/toddler/2-years/emotions-and-feelings/index.html');
 assert.ok(l13.includes('href="/toddler/2-years/garden-bugs-and-friends/"'),'lesson 13 next card points to lesson 14');
});

test('lesson 14 is discoverable: hubs, learning path, sitemap, print view private',()=>{
 const t3=read('dist/toddler/2-years/index.html');
 assert.ok(t3.includes('href="/toddler/2-years/garden-bugs-and-friends/"'));
 assert.ok(t3.includes('Toddler 3, 4, 5, 6, 7 &amp; 8'));
 const toddler=read('dist/toddler/index.html');
 assert.ok(toddler.includes('href="/toddler/2-years/garden-bugs-and-friends/"'));
 const lp=read('dist/learning-path/index.html');
 assert.ok(lp.includes('Toddler 8')&&lp.includes('href="/toddler/2-years/garden-bugs-and-friends/"'));
 const home=read('dist/index.html');
 assert.ok(home.includes('Twenty-five classes are ready now'),'homepage counts the classes honestly');
 const about=read('dist/about/index.html');
 assert.ok(about.includes('Twenty-five classes from birth to age four are ready today'));
 assert.match(map,/<loc>https:\/\/kiddo-school\.pages\.dev\/toddler\/2-years\/garden-bugs-and-friends\/<\/loc>/);
 assert.ok(!map.includes('garden-bugs-and-friends/print/'),'print view stays out of the sitemap');
 assert.ok(pv.includes('content="noindex,follow"'),'print view noindex');
 assert.ok(pv.includes('PRINTABLE GARDEN BUG CARDS'));
 // ten printed sheets: twenty cards, two to a page
 assert.equal((pv.match(/tc-print-sheet/g)||[]).length,10);
});

test('lesson 14 assets are all in the manifest with real bytes and dims',()=>{
 const entries=manifest.filter(m=>m.key.startsWith('flashcards/toddler-learning-cards/garden-bugs-and-friends-age-2/'));
 assert.equal(entries.length,21);
 for(const c of gbLesson.cards){
  const e=entries.find(m=>m.key.endsWith('/'+c.file));
  assert.ok(e,'manifest entry for '+c.file);
  assert.equal(e.width,c.w);assert.equal(e.height,c.h);
  assert.ok(e.bytes>50000&&e.bytes<200000,'sane real byte size for '+c.file);
 }
});

test('lesson 14 carries the family feedback mount with the correct page path',()=>{
 assert.ok(html.includes('data-cm-root'));
 assert.ok(html.includes('data-page-path="/toddler/2-years/garden-bugs-and-friends/"'));
 assert.ok(html.includes('How was this activity?'));
 assert.ok(html.includes('src="/assets/community.js"'));
 assert.ok(html.includes('src="/assets/community-api.js"'));
 assert.ok(html.includes('data-cm-reaction="love"')&&html.includes('data-cm-reaction="not_for_us"'));
 // accessible names are the text labels, emoji are aria-hidden
 assert.ok(html.includes('aria-hidden="true">😍</span><span>Loved it</span>'));
});
