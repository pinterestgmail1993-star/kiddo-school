import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync} from 'node:fs';
import {join} from 'node:path';

/* owner 2026-11-12: "clean the whole site · wherever repeated remove it". */
const walk=d=>readdirSync(d).flatMap(n=>{const p=join(d,n);return statSync(p).isDirectory()?walk(p):[p];});
const norm=t=>t.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const home=readFileSync('dist/index.html','utf8');
const main=home.slice(home.indexOf('<main'),home.indexOf('</main>'));

test('homepage: each destination is linked once per section, no repeated section',()=>{
 assert.ok(!main.includes('Real classes, ready right now'),'the repeated Learning Path section is gone');
 assert.equal((main.match(/href="\/learning-path\/"/g)||[]).length,2,'hero + age section only');
 assert.equal((main.match(/href="\/my-classroom\/"/g)||[]).length,1,'My Classroom linked once');
 assert.equal((main.match(/href="\/school-community\/"/g)||[]).length,1,'School Community linked once');
 assert.equal((main.match(/href="\/rooms\/"/g)||[]).length,1,'Explore the School linked once');
 assert.equal((main.match(/href="\/worksheets\/"/g)||[]).length,1,'Worksheets linked once');
});

test('no paragraph repeats three or more times on any page',()=>{
 const bad=[];
 for(const f of walk('dist').filter(f=>f.endsWith('/index.html'))){
  const h=readFileSync(f,'utf8');
  const a=h.indexOf('<main'),b=h.indexOf('</main>');
  if(a<0)continue;
  const c=new Map();
  for(const m of h.slice(a,b).matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/g)){const t=norm(m[1]);if(t.length>40)c.set(t,(c.get(t)||0)+1);}
  for(const [t,n] of c)if(n>=3)bad.push(f+' x'+n+': '+t.slice(0,50));
 }
 assert.deepEqual(bad,[]);
});

test('floating Top and Bottom buttons are on the page',()=>{
 assert.ok(home.includes('data-to-top')&&home.includes('data-to-bottom'));
 assert.ok(readFileSync('dist/assets/site.js','utf8').includes("querySelector('[data-to-bottom]')"));
});
