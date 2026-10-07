import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {starterArt} from '../src/art-wall.mjs';

const html=readFileSync('dist/art-wall/index.html','utf8');

test('art wall shows exactly the eleven starter drawings with exact srcs, alts and dimensions',()=>{
 const imgs=[...html.matchAll(/<li class="aw-piece"><img src="([^"]+)" width="(\d+)" height="(\d+)" alt="([^"]+)" loading="lazy" decoding="async" draggable="false"><\/li>/g)];
 assert.equal(imgs.length,11);
 assert.equal(starterArt.length,11); // never a 12th drawing
 imgs.forEach((m,i)=>{
  const a=starterArt[i];
  assert.equal(m[1],`https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/art-wall/starter-art/${a.file}`);
  assert.equal(m[2],'1587');assert.equal(m[3],'2245');
  assert.equal(m[4],a.alt);
 });
 // No other starter-art references than the eleven exact files
 const refs=[...html.matchAll(/starter-art\/([^"'\s]+)/g)].map(m=>m[1]);
 assert.equal(new Set(refs).size,11);
 // No invented child data anywhere: no names, ages, dates or testimonials, no captions
 assert.doesNotMatch(html,/testimonial/i);
 assert.doesNotMatch(html,/submitted by|posted by|shared by|years old/i);
 // One section label, not repeated under each image
 assert.equal((html.match(/Classroom art/g)||[]).length,1);
});

test('art wall is view only: images are not links and no download, save or print actions exist',()=>{
 const wall=html.match(/<ul class="aw-wall" data-aw-wall>[\s\S]*?<\/ul>/)[0];
 assert.ok(wall);
 assert.doesNotMatch(wall,/<a\s/i); // images are never links to their R2 objects
 assert.ok(!wall.includes('download'));assert.ok(!wall.includes('Download'));
 for(const banned of [/download/i,/print/i,/save image/i,/open original/i,/share/i]){
  // The only "print"-adjacent word allowed is none — the wall offers no such action
  if(banned.source==='print')assert.doesNotMatch(wall,banned);
  else assert.doesNotMatch(html,banned);
 }
 // Whole page: no print/download/save buttons or links to the raw asset
 assert.doesNotMatch(html,/<a[^>]*>[^<]*download/i);
 assert.doesNotMatch(html,/rel="noopener"[^>]*>\s*original/i);
});

test('art wall keeps accessibility: alt text everywhere, no keyboard interference, scoped JS',()=>{
 for(const a of starterArt)assert.match(html,new RegExp(`alt="${a.alt.replace(/[()]/g,'\\$&')}"`));
 const js=readFileSync('dist/assets/art-wall.js','utf8');
 assert.match(js,/dragstart/);assert.match(js,/contextmenu/);
 assert.ok(!js.includes('keydown')); // keyboard behavior untouched
 assert.ok(!js.includes('addEventListener(\'keydown'));
 // Suppression is scoped to the wall, not the whole page
 assert.match(js,/\[data-aw-wall\]/);
 assert.ok(!/document\.addEventListener\('contextmenu'/.test(js));
 // The page loads its enhancement script and the images stay plain content (no tabindex)
 assert.match(html,/src="\/assets\/art-wall\.js"/);
 assert.doesNotMatch(html,/tabindex="0"[^>]*alt="Child-style/);
});

test('art wall is wired in: sitemap, my classroom panel and honest grown-ups note',()=>{
 const map=readFileSync('dist/sitemap.xml','utf8');
 assert.match(map,/<loc>https:\/\/kiddo-school\.pages\.dev\/art-wall\/<\/loc>/);
 const mc=readFileSync('dist/my-classroom/index.html','utf8');
 assert.match(mc,/href="\/art-wall\/"/);
 assert.match(mc,/Visit the Art Wall/);
 assert.match(mc,/ON THE WALL · ART WALL/);
 // Honest framing: classroom examples, not individual children's work; review-first principle
 assert.match(html,/classroom examples made for the wall/);
 assert.match(html,/not artwork by individual children/);
 assert.match(html,/with a grown-up&rsquo;s permission and a quick review first/);
 // No fake submission features (no backend exists — nothing is pretended)
 assert.doesNotMatch(html,/Add Artwork|Upload|upload/i);
 // Breadcrumb schema
 assert.match(html,/"@type":"BreadcrumbList"/);
 assert.match(html,/"Our Art Wall"/);
});
