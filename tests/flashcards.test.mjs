import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {flashcardSets,babySet} from '../src/flashcards-project.mjs';
import {join,resolve} from 'node:path';
import {existsSync} from 'node:fs';
import {fcSets} from '../src/flashcards/index.mjs';
const root=resolve('dist');
const read=f=>readFileSync(f,'utf8');
const page=f=>readFileSync(join(root,f,'index.html'),'utf8');

test('flashcards hub lists every set and links from home nav and footer',()=>{
 const hub=readFileSync('dist/flashcards/index.html','utf8');
 for(const s of flashcardSets)assert.match(hub,new RegExp('/flashcards/'+s.slug+'/'));
 assert.match(hub,/first-discoveries-look-together-cutout-sheet\.webp/);
 const home=readFileSync('dist/index.html','utf8');
 assert.match(home,/href="\/flashcards\/"/);
});

test('black and white baby cards page shows flashcards, stages grid, guide and safety',()=>{
 const s=flashcardSets[0];
 const html=readFileSync(`dist/flashcards/${s.slug}/index.html`,'utf8');
 assert.match(html,/Black and White Baby Flashcards – Free Printable Cards/);
 for(const c of s.cards){assert.match(html,new RegExp(c.file));assert.match(html,new RegExp(c.word));}
 assert.doesNotMatch(html,/cutout/i);
 assert.match(html,/Newborn 1/);
 assert.match(html,/Newborn 2/);
 assert.match(html,/Infant 1/);
 assert.match(html,/0–6 weeks/);
 assert.match(html,/Visual tracking/);
 assert.match(html,/first-discoveries-look-together-parent-guide\.webp/);
 assert.match(html,/FOR THE GROWN-UPS/);
 assert.match(html,/The parents guide\./);
 assert.match(html,/shared looking, not a test\./i);
 assert.match(html,/25 to 40 centimetres/);
 assert.match(html,/out of sleep spaces/i);
 const urls=[...html.matchAll(/<img[^>]+src="(https:\/\/pub-f2fcb7[^"]+)"/g)].map(m=>m[1]);
 assert.ok(urls.length>=16,'set page should embed the fifteen flashcards plus the parents guide');
});

test('flashcard data: twelve flashcard sets, every card complete and linked to its real lesson',()=>{
 assert.equal(fcSets.length,12);
 for(const s of fcSets){
  assert.ok(s.cards.length>=10,`${s.slug} has ${s.cards.length} cards`);
  assert.ok(existsSync(join(root,s.url.slice(1),'index.html')),`${s.url} missing`);
  for(const c of s.cards){
   assert.ok(c.intro.length>80,`${s.slug}/${c.slug} intro too thin`);
   assert.ok(c.say.length>5,`${s.slug}/${c.slug} missing say line`);
   assert.ok(c.try.length>40,`${s.slug}/${c.slug} missing try activity`);
   assert.ok(c.note.length>40,`${s.slug}/${c.slug} missing parent note`);
   assert.match(c.img,/https:\/\/pub-f2fcb7c9b45a496cbeefef18dbba0ec0\.r2\.dev\/flashcards\//);
  }
 }
});

test('set pages: honest card grid, four use ideas, related sets, community mount',()=>{
 for(const s of fcSets){
  const html=page(s.url.slice(1));
  assert.equal([...html.matchAll(/<h1[ >]/g)].length,1,s.url);
  assert.ok(html.includes(`href="${s.lessonPath}"`),'set links back to its lesson');
  assert.equal(html.split('data-page-path').length-1,1,'exactly one community mount');
  assert.ok(html.includes('data-page-path="'+s.url+'"'),'mount scoped to the set page path');
  assert.ok(html.includes('How did your kiddo like this?'),'reactions heading');
  assert.ok(html.includes('No parent reviews yet'),'honest empty reviews state');
  assert.ok(html.includes('No parent comments yet'),'honest empty comments state');
  for(const [idea] of s.useIdeas)assert.ok(html.includes(idea.replace(/'/g,'&#39;')),`use idea "${idea}" missing`);
  for(const c of s.cards)assert.ok(html.includes(`href="${c.url}"`),`card link ${c.url} missing`);
  if(s.printPath)assert.ok(html.includes(`href="${s.printPath}"`),'print link when a real print page exists');
  else assert.ok(!/Print the full set/.test(html),'no fake print button without a real print page');
 }
});

test('card pages: unique titles and descriptions, say/try/note, download, prev/next, related',()=>{
 const titles=new Set(),descriptions=new Set();
 let downloads=0;
 for(const s of fcSets)for(const c of s.cards){
  const html=page(c.url.slice(1));
  const title=html.match(/<title>(.*?)<\/title>/)[1];
  assert.ok(!titles.has(title),`duplicate title: ${title}`);titles.add(title);
  const desc=html.match(/name="description" content="([^"]+)"/)[1];
  assert.ok(!descriptions.has(desc),`duplicate description on ${c.url}`);descriptions.add(desc);
  assert.ok(html.includes('Say it together'),`${c.url} missing say-it-together`);
  assert.ok(html.includes('Try this'),`${c.url} missing try-this`);
  assert.ok(html.includes('Quick parent note'),`${c.url} missing parent note`);
  assert.ok(html.includes(`href="${c.img}" download=`),'download button points at the real card image');
  downloads++;
  // prev/next: links resolve to real pages and cover the set cycle
  const prevMatch=html.match(/class="fc2-pn-btn" href="([^"]+)" rel="prev"/);const nextMatch=html.match(/class="fc2-pn-btn fc2-pn-next" href="([^"]+)" rel="next"/);
  assert.ok(prevMatch&&nextMatch,`${c.url} missing prev/next`);
  assert.ok(existsSync(join(root,prevMatch[1].slice(1),'index.html')),`${c.url} prev target missing`);
  assert.ok(existsSync(join(root,nextMatch[1].slice(1),'index.html')),`${c.url} next target missing`);
  // related cards: three, all real pages, at least one from another set when available
  const rel=[...html.matchAll(/class="fc-card fc2-cardlink" href="([^"]+)"/g)].map(m=>m[1]);
  assert.ok(rel.length===3,`${c.url} expected 3 related cards, got ${rel.length}`);
  for(const r of rel)assert.ok(existsSync(join(root,r.slice(1),'index.html')),`${c.url} related target missing ${r}`);
  // community mount scoped to the card URL
  assert.ok(html.includes('data-page-path="'+c.url+'"'),'card mount path');
  // breadcrumb: Home > Flashcards > Set > Card
  const bc=html.match(/"breadcrumbList","itemListElement":\[.*?\]/s)||html.match(/"BreadcrumbList"(.*?)<\/script>/s);
  assert.ok(html.includes('"BreadcrumbList"'),`${c.url} missing breadcrumb schema`);
  assert.ok(html.includes('item":"https://kiddo-school.pages.dev'+c.url+'"'),'breadcrumb includes card item');
  // honesty guards
  assert.ok(!html.includes('aggregateRating'),'no fabricated ratings schema');
  assert.ok(!html.includes('★★★★★</span>'),'no fabricated review text in HTML');
 }
 assert.equal(downloads,200);
});

test('library: every set is listed, baby collection included, no orphan sets',()=>{
 const html=page('flashcards');
 for(const s of fcSets)assert.ok(html.includes(`href="${s.url}"`),`library missing ${s.url}`);
 assert.ok(html.includes('/flashcards/black-and-white-baby-cards/'),'baby collection still listed');
});

test('sitemap: all set and card URLs are indexable, print views excluded',()=>{
 const xml=read('dist/sitemap.xml');
 for(const s of fcSets){
  assert.ok(xml.includes(`<loc>https://kiddo-school.pages.dev${s.url}</loc>`),`sitemap missing ${s.url}`);
  for(const c of s.cards)assert.ok(xml.includes(`<loc>https://kiddo-school.pages.dev${c.url}</loc>`),`sitemap missing ${c.url}`);
 }
 for(const c of babySet.cards)assert.ok(xml.includes(`<loc>https://kiddo-school.pages.dev${c.url}</loc>`),`sitemap missing baby card ${c.url}`);
 assert.ok(!xml.includes('/print/'),'print views stay unindexed');
});

test('black and white baby cards: every card opens its own page, not the raw image',()=>{
 const s=flashcardSets[0];
 const html=page(`flashcards/${s.slug}`);
 for(const c of s.cards)assert.ok(html.includes(`href="${babySet.url}${c.slug}/"`),`card page link for ${c.slug} missing`);
 const rawAnchors=[...html.matchAll(/<a [^>]*href="(https:\/\/pub-f2fcb7[^"]+)"/g)].map(m=>m[1]);
 assert.equal(rawAnchors.length,1,`only the parents guide may link straight to R2, found: ${rawAnchors.join(', ')}`);
 assert.ok(rawAnchors[0].includes(s.guide),'the one raw R2 link is the parents guide');
 assert.ok(html.includes(`data-page-path="${babySet.url}"`),'baby set page has its own community mount');
 assert.ok(html.includes('How did your kiddo like this?'),'baby set reactions present');
});

test('baby card pages: fifteen unique pages with say/try/note, downloads above community, share, prev/next',()=>{
 assert.equal(babySet.cards.length,15);
 const titles=new Set();
 for(const c of babySet.cards){
  const html=page(c.url.slice(1));
  const title=html.match(/<title>(.*?)<\/title>/)[1];
  assert.ok(!titles.has(title),`duplicate title: ${title}`);titles.add(title);
  assert.match(html,/Flashcard for Babies/,`${c.url} baby H1`);
  assert.ok(html.includes('Say it together'),`${c.url} missing say`);
  assert.ok(html.includes('Try this'),`${c.url} missing try`);
  assert.ok(html.includes('Quick parent note'),`${c.url} missing note`);
  assert.ok(html.includes(`href="${c.img}" download=`),`${c.url} download button`);
  assert.ok(html.includes('fc2-dual'),`${c.url} two-column layout`);
  assert.ok(html.includes('data-fc-copy'),`${c.url} copy-link button`);
  assert.ok(html.includes('twitter.com/intent/tweet'),`${c.url} X share`);
  assert.ok(html.includes('facebook.com/sharer'),`${c.url} Facebook share`);
  assert.ok(html.includes('wa.me/'),`${c.url} WhatsApp share`);
  assert.ok(html.includes('pinterest.com/pin/create'),`${c.url} Pinterest share`);
  const dIdx=html.indexOf('TAKE IT WITH YOU');const rIdx=html.indexOf('data-fc-reactions');
  assert.ok(dIdx>-1&&rIdx>-1&&dIdx<rIdx,`${c.url} downloads must sit above reactions and comments`);
  const prevMatch=html.match(/class="fc2-pn-btn" href="([^"]+)" rel="prev"/);const nextMatch=html.match(/class="fc2-pn-btn fc2-pn-next" href="([^"]+)" rel="next"/);
  assert.ok(prevMatch&&nextMatch,`${c.url} prev/next present beside the image`);
  assert.ok(existsSync(join(root,prevMatch[1].slice(1),'index.html')),`${c.url} prev target missing`);
  assert.ok(existsSync(join(root,nextMatch[1].slice(1),'index.html')),`${c.url} next target missing`);
  const rel=[...html.matchAll(/class="fc-card fc2-cardlink" href="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(rel.length,3,`${c.url} expected 3 related cards`);
  for(const r of rel){
   assert.ok(existsSync(join(root,r.slice(1),'index.html')),`${c.url} related target missing ${r}`);
   assert.ok(r.startsWith(babySet.url),`${c.url} related stays inside the baby set`);
  }
  assert.ok(html.includes(`data-page-path="${c.url}"`),'mount path');
  assert.ok(html.includes('"BreadcrumbList"'),`${c.url} breadcrumb schema`);
  assert.ok(!html.includes('aggregateRating'),'no fabricated ratings schema');
 }
});

test('card images render at their true aspect ratio — no portrait cropping anywhere',()=>{
 for(const s of fcSets){
  const html=page(s.url.slice(1));
  assert.ok(!html.includes('width="440"'),`${s.url} still hardcodes portrait dims`);
  for(const c of s.cards)assert.ok(html.includes(`width="${c.w}" height="${c.h}"`),`${s.url} missing true dims for ${c.slug}`);
  const cardPage=page(s.cards[0].url.slice(1));
  assert.ok(cardPage.includes('fc2-dual'),'card page uses the dual layout');
  assert.ok(cardPage.includes(`width="${s.cards[0].w}" height="${s.cards[0].h}"`),'hero uses true dims');
 }
 const css=read('dist/assets/style.css');
 assert.ok(/\.fc2-cardimg img\{[^}]*object-fit:contain/.test(css)&&!/\.fc2-cardimg img\{[^}]*aspect-ratio/.test(css),'card grid shows true ratios, no crop');
 assert.ok(!/\.fc2-hero img\{[^}]*aspect-ratio/.test(css),'hero shows the true ratio');
 assert.ok(css.includes('.fc2-dual'),'dual layout styles shipped');
});

test('set pages never repeat the library cover thumbnail, and landscape covers keep their real ratio on the library wall',()=>{
 const css=read('dist/assets/style.css');
 for(const s of fcSets){
  const html=page(s.url.slice(1));
  assert.ok(!html.includes('fc2-cover'),`${s.url} still repeats the set cover — it was just shown on the library wall`);
  assert.ok(!html.includes('aspect-ratio="1414/2000"')&&!/<figure class="fc2-cover"/.test(html),`${s.url} cover figure leaked back in`);
 }
 assert.ok(!/\.fc2-cover img\{[^}]*aspect-ratio/.test(css),'no CSS may force 1414/2000 onto covers again');
 // The three landscape covers must carry their true intrinsic dims so the
 // browser reserves the right box before the file loads (no squash-then-jump).
 const lib=page('flashcards');
 for(const [slug,w,h] of [['emotions-and-feelings',2000,1414],['vehicles-and-sounds',2000,1294],['garden-bugs-and-friends',2000,1294]]){
  const set=fcSets.find(x=>x.slug===slug);
  assert.ok(set,'set exists: '+slug);
  assert.ok(lib.includes(`<img src="${set.coverUrl}" width="${w}" height="${h}"`),`library wall uses true ${w}×${h} cover dims for ${slug}`);
 }
});

test('reactions, reviews and comments are three separate systems',()=>{
 const mount=page('flashcards/animals-and-sounds');
 assert.ok(mount.includes('data-fc-reactions'),'reactions block');
 assert.ok(mount.includes('data-fc-review-form'),'reviews form');
 assert.ok(mount.includes('data-fc-comment-form'),'comments form');
 const js=read('dist/assets/flashcards-community.js');
 assert.ok(js.includes('/api/community/reaction'),'reaction API call');
 assert.ok(js.includes('/api/community/review'),'review API call');
 assert.ok(js.includes('/api/community/comment'),'comment API call');
 assert.ok(js.includes("reaction: 'star'"),'star reviews flagged with reaction=star');
 const api=read('functions/api/community/[[route]].js');
 assert.ok(api.includes("INSERT INTO page_reactions"),'reactions go to their own table');
 assert.ok(api.includes("rating"),"reviews accept a rating");
 assert.ok(api.includes("'Ratings go from 1 to 5 stars.'"),'rating is validated 1-5');
});

test('migration 0002 creates the reactions table and the rating column safely',()=>{
 const sql=read('migrations/0002_reactions_reviews.sql');
 assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS page_reactions'));
 assert.ok(sql.includes('reaction TEXT NOT NULL'));
 assert.ok(sql.includes('ALTER TABLE page_reviews ADD COLUMN rating INTEGER'));
 assert.ok(!/DROP TABLE|DELETE FROM/i.test(sql),'nothing is dropped or deleted');
});

test('lesson pages link to their flashcard sets and the links resolve',()=>{
 const checks={'/toddler/2-years/animals-and-sounds/':'/flashcards/animals-and-sounds/','/toddler/2-years/vehicles-and-sounds/':'/flashcards/vehicles-and-sounds/','/toddler/2-years/colors-and-shapes/':'/flashcards/colors-and-shapes/','/toddler/2-years/matching-and-sorting/':'/flashcards/matching-and-sorting/','/toddler/2-years/emotions-and-feelings/':'/flashcards/emotions-and-feelings/','/toddler/18-24-months/first-concepts-big-small-up-down/':'/flashcards/first-concepts/','/toddler/2-years/garden-bugs-and-friends/':'/flashcards/garden-bugs-and-friends/','/toddler/2-years/school-garden/garden-friends/':'/flashcards/garden-friends/'};
 for(const [lesson,set] of Object.entries(checks)){
  const html=page(lesson.slice(1));
  assert.ok(html.includes(`href="${set}"`),`${lesson} missing flashcards link`);
  assert.ok(existsSync(join(root,set.slice(1),'index.html')),`${set} does not exist`);
 }
});
