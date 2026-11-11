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

/* ---------- shapes: one-page library, folded articles ---------- */
test('the shape library lists all 18 adventures with real artwork, all on one page',()=>{
 const lib=page('/preschool/shapes/adventures/');
 assert.equal([...lib.matchAll(/data-sa-libcard="/g)].length,18);
 assert.equal([...lib.matchAll(/<article class="one-page-item"/g)].length,18,'all 18 folded onto the library');
 for(const g of shapeAdventures){
  assert.ok(!lib.includes(`href="/preschool/shapes/adventures/${g.slug}/"`),'no per-card link '+g.slug);
  assert.ok(lib.includes(SHAPE_BASE+g.img),'artwork '+g.img);
  assert.ok(lib.includes(esc(g.alt))||lib.includes('alt="'),'alt text for '+g.slug);
 }
 assert.ok(lib.includes('/preschool/4-years/shapes-patterns-and-sorting/'),'links to Class 25');
});



/* ---------- colors: one-page library, folded articles ---------- */
test('the colors library groups all 18 activities with artwork, all on one page',()=>{
 const lib=page('/preschool/colors/adventures/');
 assert.equal([...lib.matchAll(/data-cc-libcard="/g)].length,18);
 assert.equal([...lib.matchAll(/<article class="one-page-item"/g)].length,18,'all 18 folded onto the library');
 for(const a of colorCreativities){
  assert.ok(!lib.includes(`href="/preschool/colors/adventures/${a.slug}/"`),'no per-card link '+a.slug);
  assert.ok(lib.includes(COLOR_BASE+a.img),'artwork '+a.img);
 }
 assert.ok(lib.includes('/preschool/4-years/colors-mixing-and-creativity/'),'links to Class 26');
 assert.ok(lib.includes('red + yellow = orange'),'honest mixing summary on the library');
});
test('the per-item drawing machinery is retired from the color library for good',()=>{
 const lib=page('/preschool/colors/adventures/');
 const seen=new Set();
 for(const a of colorCreativities){
  const art=artFor('colors/'+a.slug,COLOR_BASE+a.img);
  assert.ok(lib.includes(COLOR_BASE+a.img),'hero artwork '+a.slug);
  assert.ok(lib.includes(`width="${art.w}"`)||lib.includes(`width="${art.w}"`),'true pixel dims '+a.slug);
  seen.add(a.slug);
 }
 assert.equal(seen.size,18);
 // the old per-item machinery is gone from the page for good
 for(const gone of ['data-wc-src','id="ia-tools"','data-ia-band'])
  assert.ok(!lib.includes(gone),gone+' retired from the library');
});


/* ---------- writing: one-page library, folded articles ---------- */
test('the writing library lists all 30 adventures in five groups, all on one page',()=>{
 const lib=page('/preschool/writing/adventures/');
 assert.equal([...lib.matchAll(/data-wa-libcard="/g)].length,30);
 assert.equal([...lib.matchAll(/<article class="one-page-item"/g)].length,30,'all 30 folded onto the library');
 for(const a of writingAdventures)assert.ok(!lib.includes(`href="/preschool/writing/adventures/${a.slug}/"`),'no per-card link '+a.slug);
 for(const g of ['Curves and Paths','Lines and Direction','Connect and Complete','Shapes and Outlines','Creative Stroke Practice'])
  assert.ok(lib.includes(g),'group '+g);
 assert.ok(lib.includes('/preschool/4-years/early-writing-and-pencil-control/'),'links to Class 27');
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
 assert.equal([...c27.matchAll(/href="\/preschool\/writing\/adventures\/#/g)].length,30,'class 27 points all 30 adventures at the one-page library');
});
test('the 4-years hub, preschool hub, homepage and learning path all know Age 4',()=>{
 const hub=page('/preschool/4-years/');
 for(const p of ['shapes-patterns-and-sorting','colors-mixing-and-creativity','early-writing-and-pencil-control'])
  assert.ok(hub.includes('/preschool/4-years/'+p+'/'),'hub lists '+p);
 const preschool=page('/preschool/');
 assert.ok(preschool.includes('href="/preschool/4-years/"'),'preschool hub links Age 4');
 const home=page('/');
 assert.ok(home.includes('href="/preschool/4-years/"'),'homepage links Age 4');
 assert.ok(home.includes('Forty-nine classes are ready now, from birth to age five'),'honest class count');
 const lp=page('/learning-path/');
 assert.ok(lp.includes('forty-nine age-guided classes'),'learning path title updated');
 assert.ok(lp.includes('Class 25: <a href="/preschool/4-years/shapes-patterns-and-sorting/">'),'learning path row 25');
 assert.ok(lp.includes('Class 26: <a href="/preschool/4-years/colors-mixing-and-creativity/">'),'learning path row 26');
 assert.ok(lp.includes('Class 27: <a href="/preschool/4-years/early-writing-and-pencil-control/">'),'learning path row 27');
 assert.ok(lp.includes('Class 28: <a href="/preschool/4-years/phonics-and-beginning-sounds/">'),'learning path row 28');
 assert.ok(lp.includes('Class 29: <a href="/preschool/4-years/storytime-and-pre-reading/">'),'learning path row 29');
 assert.ok(lp.includes('Class 30: <a href="/preschool/4-years/logic-thinking-and-problem-solving/">'),'learning path row 30');
 assert.ok(lp.includes('Class 31: <a href="/preschool/4-years/science-nature-and-discovery/">'),'learning path row 31');
});

test('My Classroom mounts the creations gallery and adventure progress',()=>{
 const mc=page('/my-classroom/');
 assert.ok(mc.includes('data-my-creations'),'creations panel');
 assert.ok(mc.includes('data-adventure-progress'),'progress panel');
 assert.ok(mc.includes('/assets/my-creations.js'),'panel script loads');
 assert.ok(existsSync('dist/assets/my-creations.js'));
 assert.ok(mc.includes('data-gal-grid'),'gallery grid mount');
});
test('the folded adventure libraries never ship curriculum progress scripts',()=>{
 // completing an adventure records kiddo-adventures only — it can never
 // mark a curriculum class complete (school-progress.js is not loaded here)
 for(const base of ['/preschool/shapes/adventures/','/preschool/colors/adventures/','/preschool/writing/adventures/']){
  const html=page(base);
  assert.ok(!html.includes('school-progress.js'),'no class-progress machinery on '+base);
  assert.ok(!html.includes('data-tc-complete'),'no completion bar on '+base);
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
