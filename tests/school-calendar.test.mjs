import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';

const html=readFileSync('dist/school-calendar/index.html','utf8');
const js=readFileSync('dist/assets/calendar.js','utf8');
const mc=readFileSync('dist/my-classroom/index.html','utf8');
const map=readFileSync('dist/sitemap.xml','utf8');

test('school calendar: exact SEO title, one H1, breadcrumbs and schema',()=>{
 assert.ok(html.includes('<title>School Calendar | Kiddo.school</title>'));
 assert.match(html,/<h1>School Calendar<\/h1>/);
 assert.match(html,/"@type":"BreadcrumbList"/);
 assert.match(html,/School Calendar/);
 // Discoverable from My Classroom (never in the main nav)
 assert.match(mc,/href="\/school-calendar\/"/);
 assert.match(mc,/Open the calendar/);
 assert.match(map,/<loc>https:\/\/kiddo\.school\/school-calendar\/<\/loc>/);
 // The page loads its local-time enhancement script
 assert.match(html,/src="\/assets\/calendar\.js(\?v=[0-9]+)?"/);
});



test('no dates are fabricated in the static HTML — all dates are local-time JS',()=>{
 // Check the page's own content (the footer's © line is not a fabricated date)
 const main=html.match(/<main id="main">[\s\S]*<\/main>/)[0];
 // The static page must not bake in any date that would be wrong for someone
 // visiting from another timezone or on another day.
 assert.doesNotMatch(main,/data-sc-today-date>[^<]+</); // date line starts empty
 assert.doesNotMatch(main,/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/);
 assert.doesNotMatch(main,/\b20\d\d\b/);
 // Dates are computed from the visitor's local clock (local Date parts only,
 // never UTC date-string parsing), and the calendar works without storage.
 assert.match(js,/new Date\(d\.getFullYear\(\),d\.getMonth\(\),d\.getDate\(\)\)/);
 assert.ok(!/new Date\('\d{4}-\d{2}-\d{2}'/.test(js));
 assert.ok(!js.includes('localStorage')&&!js.includes('sessionStorage')&&!js.includes('document.cookie')&&!js.includes('fetch('));
 // Deterministic week navigation exists and is driven by the local Monday
 assert.match(js,/data-sc-prev/);assert.match(js,/data-sc-next/);
 assert.match(js,/mondayOf/);
 // Today / Yesterday / Tomorrow chips
 for(const chip of ['Yesterday','Today','Tomorrow'])assert.ok(html.includes(`<strong>${chip}</strong>`),chip);
 assert.match(html,/data-sc-near="yesterday"/);assert.match(html,/data-sc-near="tomorrow"/);
 // Announced politely to screen readers
 assert.match(html,/aria-live="polite"/);
});

test('the one-time reassurance note exists, exactly once',()=>{
 assert.equal((html.match(/Missed a day\?/g)||[]).length,1);
 assert.match(html,/That’s okay\. Pick up whenever you’re ready\./);
});
