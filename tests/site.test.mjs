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

test('owner 2026-10-28: the /ages/ filter shells are noindex,follow and out of the sitemap — and no tag or filter URL pages exist anywhere',()=>{
 const locs=[...read('dist/sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
 for(const p of ['/ages/','/ages/3-5/','/ages/6-8/','/ages/9-12/']){
  assert.ok(existsSync(`dist${p}index.html`),'the page still exists for parents: '+p);
  assert.match(read(`dist${p}index.html`),/content="noindex,follow"/,'noindex,follow on '+p);
  assert.ok(!locs.some(l=>l.endsWith(p)),'/ages/ pages stay out of the sitemap: '+p);
 }
 for(const banned of ['dist/tag/index.html','dist/tags/index.html','dist/filter/index.html','dist/filters/index.html'])assert.ok(!existsSync(banned),'no tag/filter URL pages may exist: '+banned);
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
test('umami download + print events fire from site.js (owner 2026-11-01)',()=>{
 const js=read('dist/assets/site.js');
 // PRINT: one wrapper on the one function every print flow calls — and the
 // wrap guard means manners.js buttons (which call window.print themselves)
 // count exactly once.
 assert.match(js,/!window\.print\.__kiddoTracked/);
 assert.match(js,/send\('print'\)/);
 assert.match(js,/realPrint\(\)/);
 // DOWNLOAD: capture-phase delegation on every <a download>, firing before
 // navigation, with the SEO file name as the event's data — the anchor's own
 // download attribute wins (the synthesized flows set it to the real name),
 // the plain R2 card links fall back to their SEO href basename.
 assert.match(js,/closest\('a\[download\]'\)/);
 assert.match(js,/send\('download', \{ file/);
 assert.match(js,/getAttribute\('download'\)/);
 assert.match(js,/true\);$/m);
 // Events ride the real tracker, guarded — never a bare global call.
 assert.match(js,/window\.umami && typeof window\.umami\.track === 'function'/);
 assert.match(js,/catch \(e\)/);
});
