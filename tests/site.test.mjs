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
test('50 HTML pages, nine permanent activity routes and activity sheets',()=>{
 assert.equal(htmlFiles.length,50);assert.equal(activities.length,9);
 for(const a of activities){assert.ok(existsSync(`dist/${a.subject}/${a.slug}/index.html`));assert.ok(existsSync(`dist/downloads/${a.slug}.svg`));assert.ok(a.steps.length>=5);assert.ok(a.safety.length>50);}
});
test('every local link, image, stylesheet, script and fragment resolves',()=>{
 let checked=0;
 for(const file of htmlFiles){const html=read(file);
  for(const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)){
   const value=match[1];if(!value.startsWith('/')&&!value.startsWith('#'))continue;
   const [path,fragment]=value.split('#');
   let target=path?join(root,path):file;if(target.endsWith('/'))target+='index.html';
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
  for(const tag of html.matchAll(/<img\b[^>]+>/g)){assert.match(tag[0],/alt="[^"]+"/);assert.match(tag[0],/width="\d+"/);assert.match(tag[0],/height="\d+"/);}
  assert.match(html,/<html lang="en">/);assert.match(html,/class="skip"/);
 }
});
test('sitemap includes all indexable pages and excludes search and errors',()=>{
 const xml=read('dist/sitemap.xml');const links=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
 assert.equal(links.length,48);assert.equal(new Set(links).size,48);
 for(const link of links){const u=new URL(link);assert.equal(u.origin,info.siteUrl);assert.ok(existsSync(join(root,u.pathname,'index.html')));assert.ok(!u.pathname.includes('search'));}
});
test('preview safeguards, no missing content, and static-only runtime',()=>{
 if(!info.indexable){assert.match(read('dist/robots.txt'),/Disallow: \//);assert.match(read('dist/_headers'),/X-Robots-Tag: noindex/);for(const file of htmlFiles)assert.match(read(file),/content="noindex,follow"/);}
 else{assert.match(read('dist/robots.txt'),/Allow: \//);assert.match(read('dist/index.html'),/content="index,follow"/);}
 for(const file of htmlFiles){assert.doesNotMatch(read(file),/TODO|lorem ipsum|Activity preview|AdSense approved|testimonial/i);assert.doesNotMatch(read(file),/[\u{1F300}-\u{1FAFF}]/u);}
 const js=read('dist/assets/site.js');assert.doesNotMatch(js,/fetch\(|localStorage|sessionStorage|document.cookie/);
});
