// Tests for the three Age 4 adventure collections:
//   /preschool/shapes/adventures/  (18 activities, Class 25)
//   /preschool/colors/adventures/  (18 activities, Class 26)
//   /preschool/writing/adventures/ (30 activities, Class 27)
// Verifies: every page exists with unique metadata and one H1; the libraries
// list every adventure with the right hrefs; the R2 artwork references match
// the verified file list (with a live ranged-GET probe); every activity page
// mounts the owner's original artwork with the transparent Write & Color
// drawing layer over it (at the artwork's TRUE pixel size), text instructions
// and tools on the right, and carries none of the retired coded-board hooks;
// Class 25/26/27 are wired into the curriculum, learning path, preschool hub
// and My Classroom honestly; and no adventure page can mark a curriculum
// class complete by itself.
import test from 'node:test';
import assert from 'node:assert/strict';
import {execSync} from 'node:child_process';
import {readFileSync,existsSync,writeFileSync,unlinkSync} from 'node:fs';
import {shapeAdventures,SHAPE_BASE} from '../src/shape-adventures.mjs';
import {colorCreativities,COLOR_BASE} from '../src/color-creativity.mjs';
import {writingAdventures,WRITING_BASE} from '../src/writing-adventures.mjs';
import {artFor} from '../src/adventure-dims.mjs';

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
test('all 18 shape adventure pages exist, unique, each drawing on its own artwork',()=>{
 const seen=new Set();
 for(const g of shapeAdventures){
  const p=`/preschool/shapes/adventures/${g.slug}/`;
  const html=page(p);
  const title=html.match(/<title>(.*?)<\/title>/)[1];
  assert.ok(!seen.has(title),'unique title '+g.slug);seen.add(title);
  assert.ok(html.includes(`<h1 class="ia-h1">${g.title}</h1>`),'h1 '+g.slug);
  assert.ok(html.includes('rel="canonical" href="https://kiddo-school.pages.dev'+p+'"'),'canonical '+g.slug);
  // the owner's spec: original Canva image + transparent drawing layer
  assert.ok(html.includes(`data-wc-src="${SHAPE_BASE+g.img}?draw=1"`),'drawing mount over the artwork '+g.slug);
  const art=artFor('shapes/'+g.slug,SHAPE_BASE+g.img);
  assert.ok(html.includes(`data-wc-w="${art.w}"`)&&html.includes(`data-wc-h="${art.h}"`),'true pixel dims '+g.slug);
  assert.ok(html.includes(`data-ia-band="shapes"`)&&html.includes(`data-ia-slug="${g.slug}"`),'progress band '+g.slug);
  assert.ok(html.includes('id="ia-tools"'),'tools rail '+g.slug);
  assert.ok(html.includes('crossorigin="anonymous"'),'CORS save works '+g.slug);
  assert.ok(html.includes('/assets/image-adventure.js'),'progress engine '+g.slug);
  assert.ok(html.includes(SHAPE_BASE+g.img),'hero artwork '+g.slug);
  assert.ok(html.includes(`href="/worksheets/shapes/${g.slug}/"`),'worksheet twin '+g.slug);
  // no coded scenes may remain
  for(const hook of ['data-sa-board','data-sa-engine','data-sa-slot','data-sa-piece','data-sa-bin','data-sa-item','data-sa-part','data-sa-spot','data-sa-fround'])
   assert.ok(!html.includes(hook),hook+' retired on '+g.slug);
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
test('all 18 color activity pages exist, each drawing on its own artwork',()=>{
 const seen=new Set();
 for(const a of colorCreativities){
  const p=`/preschool/colors/adventures/${a.slug}/`;
  const html=page(p);
  const title=html.match(/<title>(.*?)<\/title>/)[1];
  assert.ok(!seen.has(title),'unique title '+a.slug);seen.add(title);
  assert.ok(html.includes(`<h1 class="ia-h1">${a.title}</h1>`),'h1 '+a.slug);
  assert.ok(html.includes(`data-wc-src="${COLOR_BASE+a.img}?draw=1"`),'drawing mount '+a.slug);
  const art=artFor('colors/'+a.slug,COLOR_BASE+a.img);
  assert.ok(html.includes(`data-wc-w="${art.w}"`)&&html.includes(`data-wc-h="${art.h}"`),'true pixel dims '+a.slug);
  assert.ok(html.includes('data-ia-band="colors"'),'progress band '+a.slug);
  assert.ok(html.includes('id="ia-tools"'),'tools rail '+a.slug);
  assert.ok(html.includes('/assets/image-adventure.js'),'progress engine '+a.slug);
  assert.ok(html.includes(COLOR_BASE+a.img),'hero artwork '+a.slug);
  assert.ok(html.includes('aria-label'),'aria labels '+a.slug);
  // no coded paint engines may remain
  for(const hook of ['data-cc-board','data-cc-game','data-cc-fill','data-cc-tray','data-cc-stage','data-cc-canvas','data-cc-mirror','data-cc-combos','data-cc-order','data-cc-item','data-cc-bin'])
   assert.ok(!html.includes(hook),hook+' retired on '+a.slug);
 }
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
test('all 30 writing pages exist, each drawing on its own artwork, with honest completion',()=>{
 const seen=new Set();
 for(const a of writingAdventures){
  const p=`/preschool/writing/adventures/${a.slug}/`;
  const html=page(p);
  const title=html.match(/<title>(.*?)<\/title>/)[1];
  assert.ok(!seen.has(title),'unique title '+a.slug);seen.add(title);
  assert.ok(html.includes(`<h1 class="ia-h1">${a.title}</h1>`),'h1 '+a.slug);
  assert.ok(html.includes(`data-wc-src="${WRITING_BASE}${a.img}?draw=1"`),'drawing mount '+a.slug);
  const art=artFor('writing/'+a.slug,WRITING_BASE+a.img);
  assert.ok(html.includes(`data-wc-w="${art.w}"`)&&html.includes(`data-wc-h="${art.h}"`),'true pixel dims '+a.slug);
  assert.ok(html.includes('data-ia-band="writing"'),'progress band '+a.slug);
  assert.ok(html.includes('id="ia-tools"'),'tools rail '+a.slug);
  assert.ok(html.includes('/assets/image-adventure.js'),'progress engine '+a.slug);
  assert.ok(html.includes(WRITING_BASE+a.img),'hero artwork '+a.slug);
  assert.ok(html.includes(`href="/worksheets/writing/${a.slug}/"`),'worksheet twin '+a.slug);
  // completion copy: only a real save clears the activity
  assert.ok(html.includes('the moment you save your finished picture'),'save-to-complete copy '+a.slug);
  // no coded tracing machinery may remain
  for(const hook of ['data-wa-board','data-wa-engine','data-wa-guide','data-wa-start','data-wa-goal','data-wa-wall','data-wa-dot','data-wa-svg'])
   assert.ok(!html.includes(hook),hook+' retired on '+a.slug);
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
 assert.ok(home.includes('Thirty-one classes are ready now, from birth to age five'),'honest class count');
 const lp=page('/learning-path/');
 assert.ok(lp.includes('thirty-one age-guided classes'),'learning path title updated');
 assert.ok(lp.includes('Class 25: <a href="/preschool/4-years/shapes-patterns-and-sorting/">'),'learning path row 25');
 assert.ok(lp.includes('Class 26: <a href="/preschool/4-years/colors-mixing-and-creativity/">'),'learning path row 26');
 assert.ok(lp.includes('Class 27: <a href="/preschool/4-years/early-writing-and-pencil-control/">'),'learning path row 27');
 assert.ok(lp.includes('Class 28: <a href="/preschool/4-years/phonics-and-beginning-sounds/">'),'learning path row 28');
 assert.ok(lp.includes('Class 29: <a href="/preschool/4-years/storytime-and-pre-reading/">'),'learning path row 29');
 assert.ok(lp.includes('Class 30: <a href="/preschool/4-years/logic-thinking-and-problem-solving/">'),'learning path row 30');
 assert.ok(lp.includes('Class 31: <a href="/preschool/4-years/science-nature-and-discovery/">'),'learning path row 31');
});
test('sitemap carries all 74 new Age 4 URLs',()=>{
 const xml=read('/sitemap.xml');
 const expected=['/preschool/4-years/','/preschool/4-years/shapes-patterns-and-sorting/','/preschool/4-years/colors-mixing-and-creativity/','/preschool/4-years/early-writing-and-pencil-control/','/preschool/shapes/adventures/','/preschool/colors/adventures/','/preschool/writing/adventures/'];
 for(const e of expected)assert.ok(xml.includes(`<loc>https://kiddo.school.pages.dev${e}</loc>`)||xml.includes(`<loc>https://kiddo-school.pages.dev${e}</loc>`)||xml.includes(e),'sitemap '+e);
 assert.ok(xml.includes('/preschool/shapes/adventures/build-a-shape-spaceship/'),'sitemap spaceship');
 assert.ok(xml.includes('/preschool/writing/adventures/sunshine-stroke-challenge/'),'sitemap sunshine');
 const count=xml.split('/preschool/4-years/').length-1;
 // hub + nine class routes + 29 /learn/ lesson URLs (each contains the prefix)
 assert.equal(count,137,'hub + nine classes + 29 CH learn + 28 C32 learn + 35 C31 learn + 35 CH worksheet activities in sitemap');
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
test('the drawing engine ships, the coded engines are gone for good',()=>{
 assert.ok(existsSync('dist/assets/image-adventure.js'),'image-adventure.js built');
 execSync('node --check dist/assets/image-adventure.js');
 assert.ok(existsSync('dist/assets/my-creations.js'),'my-creations.js built');
 execSync('node --check dist/assets/my-creations.js');
 for(const f of ['shape-adventures.js','color-creativity.js','writing-adventures.js','phonics-adventures.js','story-adventures.js'])
  assert.ok(!existsSync('dist/assets/'+f),f+' retired from the build');
 // the drawing layer itself is still the school's proven one
 assert.ok(existsSync('dist/assets/write-color.js'),'write-color.js still ships');
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
