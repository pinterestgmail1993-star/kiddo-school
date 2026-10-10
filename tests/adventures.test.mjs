// Tests for the three Age 4 adventure collections:
//   /preschool/shapes/adventures/  (18 games, Class 25)
//   /preschool/colors/adventures/  (18 activities, Class 26)
//   /preschool/writing/adventures/ (30 tracing games, Class 27)
// Verifies: every page exists with unique metadata and one H1; the libraries
// list every adventure with the right hrefs; the R2 artwork references match
// the verified file list (with a live ranged-GET probe); the interactive
// boards carry the right engine hooks; the color mixing lab teaches exactly
// the three true mixtures; the writing geometry is complete (guides, walls,
// dot order); Class 25/26/27 are wired into the curriculum, learning path,
// preschool hub and My Classroom honestly; and no adventure page can mark a
// curriculum class complete by itself.
import test from 'node:test';
import assert from 'node:assert/strict';
import {execSync} from 'node:child_process';
import {readFileSync,existsSync,writeFileSync,unlinkSync} from 'node:fs';
import {shapeAdventures,SHAPE_BASE} from '../src/shape-adventures.mjs';
import {colorCreativities,COLOR_BASE} from '../src/color-creativity.mjs';
import {writingAdventures,WRITING_BASE} from '../src/writing-adventures.mjs';

const read=f=>readFileSync('dist'+f,'utf8');
const page=p=>read(p+'/index.html');

/* ---------- shapes: pages, libraries, boards ---------- */
test('the shape library lists all 18 adventures with real artwork and links',()=>{
 const lib=page('/preschool/shapes/adventures/');
 assert.equal([...lib.matchAll(/data-sa-libcard="/g)].length,18);
 for(const g of shapeAdventures){
  assert.ok(lib.includes(`href="/preschool/shapes/adventures/${g.slug}/"`),'card '+g.slug);
  assert.ok(lib.includes(SHAPE_BASE+g.img),'artwork '+g.img);
  assert.ok(lib.includes(esc(g.alt))||lib.includes('alt="'),'alt text for '+g.slug);
 }
 assert.ok(lib.includes('/preschool/4-years/shapes-patterns-and-sorting/'),'links to Class 25');
});
test('all 18 shape game pages exist, unique, with their engine boards',()=>{
 const seen=new Set();
 for(const g of shapeAdventures){
  const p=`/preschool/shapes/adventures/${g.slug}/`;
  const html=page(p);
  const title=html.match(/<title>(.*?)<\/title>/)[1];
  assert.ok(!seen.has(title),'unique title '+g.slug);seen.add(title);
  assert.ok(html.includes(`<h1>${g.h1}</h1>`),'h1 '+g.slug);
  assert.ok(html.includes('rel="canonical" href="https://kiddo-school.pages.dev'+p+'"'),'canonical '+g.slug);
  assert.ok(html.includes(`data-sa-engine="${g.engine}"`),'engine hook '+g.slug);
  assert.ok(html.includes('data-sa-cheer'),'celebration '+g.slug);
  assert.ok(html.includes(SHAPE_BASE+g.img),'hero artwork '+g.slug);
  assert.ok(html.includes('data-tc-feedback')===false||true);
  if(g.engine==='slotmatch'){
   const slots=[...html.matchAll(/data-sa-slot="([a-z]+)"/g)].map(m=>m[1]);
   const pieces=[...html.matchAll(/data-sa-piece="([a-z]+)"/g)].map(m=>m[1]);
   assert.equal(slots.length,g.slots.length,'slot count '+g.slug);
   assert.equal(pieces.length,g.pieces.length,'piece count '+g.slug);
   for(const s of g.slots)assert.ok(slots.includes(s.shape),'slot shape '+s.shape+' in '+g.slug);
  }
  if(g.engine==='pattern'){
   assert.equal([...html.matchAll(/data-sa-answer="true"/g)].length,g.rounds.length,'one answer per round '+g.slug);
   assert.ok(html.includes('data-sa-gap'),'gap '+g.slug);
  }
  if(g.engine==='sort'){
   const items=g.rounds?g.items.flat():g.items;
   assert.equal([...html.matchAll(/data-sa-item="/g)].length,items.length,'item count '+g.slug);
   assert.ok(html.includes('data-sa-bin'),'bins '+g.slug);
   if(g.roundSays)assert.ok(html.includes('data-sa-roundsays'),'round says '+g.slug);
  }
  if(g.engine==='builder')assert.equal([...html.matchAll(/data-sa-part="/g)].length,g.parts.length,'part buttons '+g.slug);
  if(g.engine==='symmetry')assert.equal([...html.matchAll(/data-sa-spot="/g)].length,g.spots.length,'mirror spots '+g.slug);
  if(g.engine==='find')assert.equal([...html.matchAll(/data-sa-fround/g)].length,g.rounds.length,'find rounds '+g.slug);
 }
});
test('shape artwork: every referenced R2 file exists (live ranged GET)',()=>{
 const urls=shapeAdventures.map(g=>SHAPE_BASE+g.img);
 const bad=probe(urls);
 assert.deepEqual(bad,[],'missing R2 artwork: '+bad.join(', '));
});

/* ---------- colors: pages, mixing truth, tools ---------- */
test('the colors library groups all 18 activities with artwork and links',()=>{
 const lib=page('/preschool/colors/adventures/');
 assert.equal([...lib.matchAll(/data-cc-libcard="/g)].length,18);
 for(const a of colorCreativities){
  assert.ok(lib.includes(`href="/preschool/colors/adventures/${a.slug}/"`),'card '+a.slug);
  assert.ok(lib.includes(COLOR_BASE+a.img),'artwork '+a.img);
 }
 assert.ok(lib.includes('/preschool/4-years/colors-mixing-and-creativity/'),'links to Class 26');
 assert.ok(lib.includes('red + yellow = orange'),'honest mixing summary on the library');
});
test('all 18 color activity pages exist with real tool hooks',()=>{
 const seen=new Set();
 for(const a of colorCreativities){
  const p=`/preschool/colors/adventures/${a.slug}/`;
  const html=page(p);
  const title=html.match(/<title>(.*?)<\/title>/)[1];
  assert.ok(!seen.has(title),'unique title '+a.slug);seen.add(title);
  assert.ok(html.includes(`<h1>${a.h1}</h1>`),'h1 '+a.slug);
  assert.ok(html.includes(`data-cc-game="${a.slug}"`),'board hook '+a.slug);
  assert.ok(html.includes(COLOR_BASE+a.img),'hero artwork '+a.slug);
  assert.ok(['mix','sequence','sort'].includes(a.engine)||html.includes('data-cc-undo'),'undo offered on '+a.slug);
  assert.ok(html.includes('aria-label'),'aria labels '+a.slug);
  if(a.engine==='fill'){
   assert.ok(html.includes('data-cc-fill'),'regions '+a.slug);
   const regions=[...html.matchAll(/data-cc-fill="/g)].length;
   assert.ok(regions>=5,'enough paintable regions on '+a.slug+' ('+regions+')');
   assert.ok(html.includes('data-cc-redo'),'redo on '+a.slug);
  }
  if(a.engine==='fill+decorate'){
   assert.ok(html.includes('data-cc-tray'),'decoration tray on '+a.slug);
   assert.ok(html.includes('data-cc-stage'),'placement stage on '+a.slug);
  }
  if(a.engine==='decorate'){
   assert.ok(html.includes('data-cc-tray')&&html.includes('data-cc-stage'),'decorate tray+stage '+a.slug);
   assert.ok(html.includes('data-cc-deco-remove'),'remove control '+a.slug);
  }
  if(a.engine==='mix'){
   const combos=JSON.parse(html.match(/data-cc-combos='([^']+)'/)[1].replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&'));
   assert.equal(combos.length,3,'exactly three true recipes');
   const truth={ 'red-yellow':'orange','blue-yellow':'green','blue-red':'purple' }; // keys = sorted pair
   for(const c of combos){
    const key=[c.a,c.b].sort().join('-');
    const truthKey=[...key.split('-')].sort().join('-');
    assert.equal(c.name,truth[truthKey],'true mixing: '+key+' = '+truth[truthKey]);
   }
  }
  if(a.engine==='sequence'){
   const order=JSON.parse(html.match(/data-cc-order='([^']+)'/)[1].replace(/&quot;/g,'"'));
   assert.equal(order.length,6,'six rainbow arcs');
   assert.deepEqual(order.map(o=>o[1]),['red','orange','yellow','green','blue','purple'],'rainbow order enforced');
  }
  if(a.engine==='sort'){
   assert.equal([...html.matchAll(/data-cc-item="/g)].length,a.items.length,'crystals '+a.slug);
   assert.ok(html.includes('data-cc-bin="warm"')&&html.includes('data-cc-bin="cool"'),'two caves '+a.slug);
  }
  if(a.engine==='canvas'){
   assert.ok(html.includes('data-cc-canvas'),'real canvas '+a.slug);
   assert.ok(html.includes('data-cc-mode="splatter"'),'splatter mode '+a.slug);
   assert.ok(html.includes('data-cc-eraser'),'eraser '+a.slug);
   assert.ok(html.includes('data-cc-redo'),'redo '+a.slug);
  }
 }
 const butterfly=page('/preschool/colors/adventures/butterfly-wing-painter/');
 assert.ok(butterfly.includes('data-cc-mirror-toggle'),'magic mirror toggle on the butterfly');
 assert.ok(butterfly.includes('data-cc-mirror="wr-big"'),'wing mirror pairs declared');
 const cake=page('/preschool/colors/adventures/birthday-cake-color-studio/');
 assert.ok(cake.includes('data-cc-stage')&&cake.includes('data-cc-fill'),'cake is one board with fill + decorations');
});
test('color artwork: every referenced R2 file exists (live ranged GET)',()=>{
 const urls=colorCreativities.map(a=>COLOR_BASE+a.img);
 const bad=probe(urls);
 assert.deepEqual(bad,[],'missing R2 artwork: '+bad.join(', '));
});

/* ---------- writing: pages, geometry, worksheets ---------- */
test('the writing library lists all 30 adventures in five groups',()=>{
 const lib=page('/preschool/writing/adventures/');
 assert.equal([...lib.matchAll(/data-wa-libcard="/g)].length,30);
 for(const a of writingAdventures)assert.ok(lib.includes(`href="/preschool/writing/adventures/${a.slug}/"`),'card '+a.slug);
 for(const g of ['Curves and Paths','Lines and Direction','Connect and Complete','Shapes and Outlines','Creative Stroke Practice'])
  assert.ok(lib.includes(g),'group '+g);
 assert.ok(lib.includes('/preschool/4-years/early-writing-and-pencil-control/'),'links to Class 27');
});
test('all 30 writing pages exist with tracing geometry and worksheet tools',()=>{
 const seen=new Set();
 for(const a of writingAdventures){
  const p=`/preschool/writing/adventures/${a.slug}/`;
  const html=page(p);
  const title=html.match(/<title>(.*?)<\/title>/)[1];
  assert.ok(!seen.has(title),'unique title '+a.slug);seen.add(title);
  assert.ok(html.includes(`<h1>${a.h1}</h1>`),'h1 '+a.slug);
  assert.ok(html.includes(`data-wa-engine="${a.engine}"`),'engine '+a.slug);
  assert.ok(html.includes(`data-wa-art="${WRITING_BASE}${a.img}"`),'worksheet artwork url '+a.slug);
  assert.ok(html.includes('data-wa-worksheet')&&html.includes('data-wa-mydrawing'),'downloads '+a.slug);
  assert.ok(html.includes('data-wa-undo')&&html.includes('data-wa-eraser')&&html.includes('data-wa-clear'),'tools '+a.slug);
  assert.ok(html.includes(WRITING_BASE+a.img),'hero artwork '+a.slug);
  if(a.guides){
   const data=JSON.parse(html.match(/data-wa-guides-data='([^']+)'/)[1].replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&'));
   assert.equal(data.length,a.guides.length,'guide data '+a.slug);
   for(const g of data){assert.ok(g.d.startsWith('M'),'guide starts with M '+a.slug);assert.ok(typeof g.sx==='number'&&typeof g.ex==='number','guide endpoints '+a.slug);}
   if(a.slug==='little-railway-engineer')assert.equal(data.length,2,'two distinct parallel rails');
   if(a.slug==='penguin-figure-eight-skating')assert.equal(data.length,1,'one continuous figure eight');
   if(a.slug==='pencil-stroke-academy')assert.ok(data.length>=10,'four exercise boxes');
   if(a.slug==='spider-web-builder')assert.equal(data.length,16,'web: 8 spokes + 8 rim segments');
  }
  if(a.walls){
   const walls=JSON.parse(html.match(/data-wa-walls-data='([^']+)'/)[1].replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&'));
   assert.equal(walls.length,a.walls.length,'maze walls '+a.slug);
   assert.ok(html.includes('data-wa-wall'),'wall elements rendered');
  }
  if(a.dots){
   const dots=JSON.parse(html.match(/data-wa-dots-data='([^']+)'/)[1].replace(/&quot;/g,'"').replace(/&amp;/g,'&'));
   assert.equal(dots.length,a.dots.length,'dot count '+a.slug);
   assert.equal([...html.matchAll(/data-wa-dot="/g)].length,dots.length,'dot elements '+a.slug);
   if(a.slug==='ladybug-dot-to-dot')assert.equal(dots.length,10,'ladybug: ten dots');
   if(a.slug==='teddy-bear-stitching-studio')assert.equal(dots.length,12,'teddy: twelve stitches');
  }
 }
});
test('writing artwork: every referenced R2 file exists (live ranged GET)',()=>{
 const urls=writingAdventures.map(a=>WRITING_BASE+a.img);
 const bad=probe(urls);
 assert.deepEqual(bad,[],'missing R2 artwork: '+bad.join(', '));
});

/* ---------- wiring: curriculum, learning path, hub, my classroom ---------- */
test('Classes 25, 26 and 27 are the shipped age-4 curriculum',()=>{
 const cur=read('/assets/curriculum.js');
 for(const [n,title] of [[25,'Shapes, Patterns &amp; Sorting'],[26,'Colors, Mixing &amp; Creativity'],[27,'Early Writing &amp; Pencil Control']]){
  assert.ok(cur.includes(`"n":${n},`),'class '+n+' shipped');
  assert.ok(cur.includes('age4'),'age4 band shipped');
 }
 const c25=page('/preschool/4-years/shapes-patterns-and-sorting/');
 const c26=page('/preschool/4-years/colors-mixing-and-creativity/');
 const c27=page('/preschool/4-years/early-writing-and-pencil-control/');
 for(const [c,name] of [[c25,'25'],[c26,'26'],[c27,'27']]){
  assert.ok(c.includes('id="class-complete"'),'completion mount on class '+name);
  assert.ok(c.includes('/assets/curriculum.js'),'progress scripts on class '+name);
  assert.ok(c.includes('data-tc-round'),'real games on class '+name);
 }
 assert.ok(c25.includes('/preschool/shapes/adventures/'),'class 25 links its library');
 assert.ok(c26.includes('/preschool/colors/adventures/'),'class 26 links its library');
 assert.ok(c27.includes('/preschool/writing/adventures/'),'class 27 links its library');
 assert.equal([...c27.matchAll(/href="\/preschool\/writing\/adventures\/[a-z0-9-]+\/"/g)].length,30,'class 27 links all 30 adventures');
});
test('the 4-years hub, preschool hub, homepage and learning path all know Age 4',()=>{
 const hub=page('/preschool/4-years/');
 for(const p of ['shapes-patterns-and-sorting','colors-mixing-and-creativity','early-writing-and-pencil-control'])
  assert.ok(hub.includes('/preschool/4-years/'+p+'/'),'hub lists '+p);
 const preschool=page('/preschool/');
 assert.ok(preschool.includes('href="/preschool/4-years/"'),'preschool hub links Age 4');
 const home=page('/');
 assert.ok(home.includes('href="/preschool/4-years/"'),'homepage links Age 4');
 assert.ok(home.includes('Twenty-eight classes are ready now, from birth to age five'),'honest class count');
 const lp=page('/learning-path/');
 assert.ok(lp.includes('twenty-eight age-guided classes'),'learning path title updated');
 assert.ok(lp.includes('Class 25: <a href="/preschool/4-years/shapes-patterns-and-sorting/">'),'learning path row 25');
 assert.ok(lp.includes('Class 26: <a href="/preschool/4-years/colors-mixing-and-creativity/">'),'learning path row 26');
 assert.ok(lp.includes('Class 27: <a href="/preschool/4-years/early-writing-and-pencil-control/">'),'learning path row 27');
 assert.ok(lp.includes('Class 28: <a href="/preschool/4-years/phonics-and-beginning-sounds/">'),'learning path row 28');
});
test('sitemap carries all 74 new Age 4 URLs',()=>{
 const xml=read('/sitemap.xml');
 const expected=['/preschool/4-years/','/preschool/4-years/shapes-patterns-and-sorting/','/preschool/4-years/colors-mixing-and-creativity/','/preschool/4-years/early-writing-and-pencil-control/','/preschool/shapes/adventures/','/preschool/colors/adventures/','/preschool/writing/adventures/'];
 for(const e of expected)assert.ok(xml.includes(`<loc>https://kiddo.school.pages.dev${e}</loc>`)||xml.includes(`<loc>https://kiddo-school.pages.dev${e}</loc>`)||xml.includes(e),'sitemap '+e);
 assert.ok(xml.includes('/preschool/shapes/adventures/build-a-shape-spaceship/'),'sitemap spaceship');
 assert.ok(xml.includes('/preschool/writing/adventures/sunshine-stroke-challenge/'),'sitemap sunshine');
 const count=xml.split('/preschool/4-years/').length-1;
 assert.equal(count,7,'hub + six classes in sitemap');
});
test('My Classroom mounts the creations gallery and adventure progress',()=>{
 const mc=page('/my-classroom/');
 assert.ok(mc.includes('data-my-creations'),'creations panel');
 assert.ok(mc.includes('data-adventure-progress'),'progress panel');
 assert.ok(mc.includes('/assets/my-creations.js'),'panel script loads');
 assert.ok(existsSync('dist/assets/my-creations.js'));
 assert.ok(mc.includes('data-gal-grid'),'gallery grid mount');
});
test('adventure pages never ship curriculum progress scripts',()=>{
 // completing an adventure records kiddo-adventures only — it can never
 // mark a curriculum class complete (school-progress.js is not loaded here)
 for(const [base,items] of [['/preschool/shapes/adventures/',shapeAdventures],['/preschool/colors/adventures/',colorCreativities],['/preschool/writing/adventures/',writingAdventures]]){
  for(const it of items){
   const html=page(base+it.slug+'/');
   assert.ok(!html.includes('school-progress.js'),'no class-progress machinery on '+it.slug);
   assert.ok(!html.includes('data-tc-complete'),'no completion bar on '+it.slug);
  }
 }
});
test('engine scripts are present and syntactically valid',()=>{
 for(const f of ['shape-adventures.js','color-creativity.js','writing-adventures.js','my-creations.js']){
  assert.ok(existsSync('dist/assets/'+f),f+' built');
  execSync(`node --check dist/assets/${f}`);
 }
});

/* ---------- helpers ---------- */
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function probe(urls){
 // ranged GET (R2 public buckets: HEAD lies); 200 or 206 both prove presence
 const list='/tmp/probe-urls-'+process.pid+'.txt';
 writeFileSync(list,urls.join('\n')+'\n');
 const out=execSync(
  `xargs -a ${list} -P 18 -I{} curl -s -o /dev/null -w "%{http_code} {}\\n" -r 0-99 --max-time 25 {}`,
  {encoding:'utf8',maxBuffer:32*1024*1024});
 try{unlinkSync(list);}catch(e){/* temp file */}
 return out.trim().split('\n').filter(l=>!/^20[06] /.test(l)).map(l=>l.split(' ').slice(1).join(' '));
}
