import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
const root=resolve('dist');
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?files(join(dir,entry.name)):[join(dir,entry.name)]);}
const htmlFiles=files(root).filter(f=>f.endsWith('.html'));
const activities=JSON.parse(readFileSync('data/activities.json','utf8'));
const info=JSON.parse(readFileSync('dist/build-info.json','utf8'));
const read=f=>readFileSync(f,'utf8');
test('all HTML pages, eleven permanent activity routes and activity sheets',()=>{
 assert.equal(htmlFiles.length,3890);assert.equal(activities.length,11);
 for(const a of activities){assert.ok(existsSync(`dist/${a.subject}/${a.slug}/index.html`));assert.ok(existsSync(`dist/downloads/${a.slug}.svg`));assert.ok(a.steps.length>=5);assert.ok(a.safety.length>50);}
});
test('every local link, image, stylesheet, script and fragment resolves',()=>{
 let checked=0;
 for(const file of htmlFiles){const html=read(file);
  for(const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)){
   const value=match[1];if(!value.startsWith('/')&&!value.startsWith('#'))continue;
   const [path,fragment]=value.split('#');
   let target=path?join(root,path.split('?')[0]):file;if(target.endsWith('/'))target+='index.html';
   assert.ok(existsSync(target),`${file}: missing ${value}`);
   if(fragment)assert.ok(read(target).includes(`id="${fragment}"`),`${file}: missing anchor ${value}`);
   checked++;
  }
 }
 assert.ok(checked>500);
});
test('unique descriptive metadata, one heading, valid structured data, and absolute canonical URLs',()=>{
 const titles=new Set(),descriptions=new Set();
 for(const file of htmlFiles){const html=read(file);
  assert.equal([...html.matchAll(/<h1[ >]/g)].length,1,file);
  const title=html.match(/<title>(.*?)<\/title>/)[1];assert.ok(!titles.has(title),title);titles.add(title);
  const desc=html.match(/name="description" content="([^"]+)"/)[1];assert.ok(desc.length>45);assert.ok(!descriptions.has(desc));descriptions.add(desc);
  const canonical=html.match(/rel="canonical" href="([^"]+)"/)[1];assert.equal(new URL(canonical).origin,info.siteUrl);
  for(const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g))assert.ok(Array.isArray(JSON.parse(match[1])));
  for(const tag of html.matchAll(/<img\b[^>]+>/g)){assert.match(tag[0],/alt="[^"]*"/);assert.match(tag[0],/width="\d+"/);assert.match(tag[0],/height="\d+"/);if(/alt=""/.test(tag[0]))assert.match(tag[0],/aria-hidden="true"/,'decorative images must be aria-hidden');}
  assert.match(html,/<html lang="en">/);assert.match(html,/class="skip"/);
 }
});
test('sitemap includes all indexable pages and excludes search and errors',()=>{
 const xml=read('dist/sitemap.xml');const links=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
 // Exact-count lock: update when the owner approves new classes/pages
 // (+104 for Class 29 Sight Words: 52 lessons + 52 card pages (the set page replaces the old flat page); +1 for the Sight Word Flashcards page; 1,372 at 8aee5894; +60 for Class 33; +20 for the Class 35 /learn/ counting lessons; +46 for Class 36: hub, class page, 22 /learn/ lessons, set page, 22 card pages; +13 for the 6 Class 36 habitat worksheets: 6 activities + 6 printables + collection; +5 for the generator: hub + word-search + math-practice + tracing + matching-pairs pages; +1 for the Sight Words lesson hub — the 52 lessons moved URLs, count unchanged; +27 for Class 28 Phonics: set page + 26 A–Z letter-sound card pages; +26 for the Class 28 /learn/ letter-sound lessons at .../learn/{letter-card}/; +55 for Class 23 · The Music Room: the /music-room/ room page, the set page and 53 card pages; +35 for the Playground + School Rooms: the /rooms/ hub, the /playground/ room page, the set page and 32 card pages; +167 for Class 37: class page + 40 Sports /learn/ lessons + the /flashcards/sports/ set page + 40 sports card pages + 53 Music Room /learn/ lessons + 32 Playground /learn/ lessons; +211 for this commit: the /extra-classes/ hub + Class 24 Transportation & Vehicles (class page + 32 spotter /learn/ lessons + set page + 32 card pages) + the Toddler Room (room page + 35 /learn/ lessons + set page + 35 card pages) + the Kitchen (room page + 35 /learn/ lessons + set page + 35 card pages); +31 for the Classroom set: the /flashcards/classroom/ set page + 30 object/good-habit card pages; +1 for Who Works at My School — the School Community people page; +46 for the Doctor Visit extra class: the /extra-classes/doctor-visit/ class page, the /flashcards/doctor-visit/ set page, 22 card pages and 22 /learn/ lessons in visit order; +84 for the Home and Daily Life extra class: the /extra-classes/home-and-daily-life/ class page, the /flashcards/home-and-daily-life/ set page, 41 card pages and 41 /learn/ lessons in tour order; +97 for the animal round (owner 2026-10-21): the Animal Categories extra class (class page + set page + 24 card pages + 24 /learn/ lessons) and the Nature Club club hub + Animals class page + set page + 22 card pages + 22 /learn/ spotter lessons; +1 for /all-pages/ — the complete directory (owner 2026-10-21: 'all links in one place'), every page linked from one browsable, searchable page); +1 for /first-glance/ (owner 2026-10-22): the 58 first-picture sheets as ONE standalone page — no individual card pages); +32 for the Colors extra class (owner 2026-10-22): the /extra-classes/colors/ class page + the /flashcards/colors-and-shades/ set page + 15 card pages + 15 /learn/ lessons; +72 for Class 38 · Feelings & Kindness (owner 2026-10-23): the /preschool/4-years/feelings-and-kindness/ class page + 35 /learn/ lessons + the /flashcards/feelings-and-kindness/ set page + 35 card pages; +44 for Look & Learn (owner 2026-10-24): the /look-and-learn/ extra class page + 43 short word pages at /flashcards/<word>/ — duck, banana, carrot, grapes and strawberry kept their existing URLs (link only, no new page); +36 for Kids Games rules (owner 2026-10-24): the /games/ hub + 35 rule pages; +101 for the Dinosaurs extra class (owner 2026-10-25): the /dinosaurs/ class page + 33 short pages + 33 /learn/ lessons + the /flashcards/dinosaurs/ set page + 33 card pages, minus 2 retired Animal Categories dinosaurs URLs (card + lesson, both 301 to /dinosaurs/); +83 for the Art Room school room (owner 2026-10-25): the /art-room/ room page + 27 short pages + 27 /learn/ lessons + the /flashcards/art-room/ set page + 27 card pages); +1 for the Manners extra class (owner 2026-10-27): the /manners/ single page — the owner’s standing rule that day bans individual pages, so the class is ONE URL with all 32 cards, tips, downloads and per-card printing on it; Ten→Eleven extra-classes copy).
 assert.equal(links.length,3872);assert.equal(new Set(links).size,3872);
 for(const link of links){const u=new URL(link);assert.equal(u.origin,info.siteUrl);assert.ok(existsSync(join(root,u.pathname,'index.html')));assert.ok(!u.pathname.includes('/search'),'no /search/ pages in the sitemap (word-search pages are fine)');}
 assert.ok(!links.some(l=>l.includes('/admin')||l.includes('/api/')),'no admin or API routes in sitemap');
 assert.ok(links.includes(info.siteUrl+'/school-community/'),'school community is indexable');
 assert.ok(links.includes(info.siteUrl+'/toddler/2-years/school-garden/'),'School Garden hub is indexable');
 assert.ok(links.includes(info.siteUrl+'/toddler/2-years/school-garden/garden-friends/'),'Garden Animals & Friends is indexable');
 assert.ok(links.includes(info.siteUrl+'/toddler/2-years/school-garden/garden-flowers/'),'Garden Flowers is indexable');
 assert.ok(links.includes(info.siteUrl+'/toddler/2-years/school-garden/garden-things/'),'Garden Things is indexable');
 assert.ok(links.includes(info.siteUrl+'/flashcards/garden-flowers/'),'the Garden Flowers flashcard set is indexable');
 assert.ok(links.includes(info.siteUrl+'/flashcards/garden-flowers/sunflower/'),'a garden flowers card page is indexable');
 assert.ok(links.includes(info.siteUrl+'/preschool/3-years/body-parts-and-five-senses/'),'Body Parts & My Five Senses is indexable');
 assert.ok(links.includes(info.siteUrl+'/flashcards/body-parts-and-five-senses/'),'the Body Parts flashcard set is indexable');
 assert.ok(links.includes(info.siteUrl+'/flashcards/body-parts-and-five-senses/head/'),'a body parts card page is indexable');
 assert.ok(links.includes(info.siteUrl+'/library/books/age-2/my-first-colors/'),'My First Colors is indexable');
 assert.ok(links.includes(info.siteUrl+'/how-to-draw-a-cat/'),'the cat drawing tutorial is indexable');
 assert.ok(links.includes(info.siteUrl+'/how-to-draw-a-dog/'),'the dog drawing tutorial is indexable');
 assert.ok(!links.some(l=>l.includes('/print/')),'print views stay out of the sitemap');
});
test('search-engine site verification tags ship on every page',()=>{
 const bing=/<meta name="msvalidate\.01" content="5DE868038A534F9B50CB7A36D36CE85D">/;
 const pinterest=/<meta name="p:domain_verify" content="4b42f69f64ac6d4601f67e5bacd845c1">/;
 for(const file of htmlFiles){const html=read(file);
  assert.match(html,bing,'Bing Webmaster verification missing on '+file);
  assert.match(html,pinterest,'Pinterest verification missing on '+file);
 }
});
test('preview safeguards, no missing content, and static-only runtime',()=>{
 if(!info.indexable){assert.match(read('dist/robots.txt'),/Disallow: \//);assert.match(read('dist/_headers'),/X-Robots-Tag: noindex/);for(const file of htmlFiles)assert.match(read(file),/content="noindex,follow"/);}
 else{assert.match(read('dist/robots.txt'),/Allow: \//);assert.match(read('dist/index.html'),/content="index,follow"/);}
 for(const file of htmlFiles){assert.doesNotMatch(read(file),/TODO|lorem ipsum|Activity preview|AdSense approved|testimonial/i);
  // Emoji are banned in copy, EXCEPT the two Circle Time rhythm glyphs (👏 U+1F44F, 👋 U+1F44B)
  // that the Hello School! spec requires, and the FOUR family-feedback reaction emoji
  // (😍 U+1F60D, 😊 U+1F60A, 😐 U+1F610, 😕 U+1F615) whose accessible labels are the
  // real control names — the emoji are never the only label. All other emoji stay banned.
  assert.doesNotMatch(read(file),/[\u{1F300}-\u{1F44A}\u{1F44C}-\u{1F44E}\u{1F450}-\u{1F609}\u{1F60B}-\u{1F60C}\u{1F60E}-\u{1F60F}\u{1F611}-\u{1F614}\u{1F616}-\u{1FAFF}]/u);}
 const js=read('dist/assets/site.js');assert.doesNotMatch(js,/fetch\(|localStorage|sessionStorage|document.cookie/);
});
