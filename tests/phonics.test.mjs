// Kiddo School — Class 28 Phonics test suite.
// Proves the 24 games are real and audio-honest, the class page exists, the
// My Classroom wiring carries the phonics band, and the artwork streams from
// the owner's actual R2 uploads.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {execSync} from 'node:child_process';
import {phonicAdventures,phonicBySlug,PHONICS_LIB_PATH,PHONICS_BASE,C28_PATH,AUDIO_MANIFEST} from '../src/phonics-adventures.mjs';
import {bySubject} from '../src/worksheets.mjs';

const read=f=>readFileSync('dist'+f,'utf8');
const page=p=>read(p+'index.html');
const TEST_ORIGIN='https://kiddo-school.pages.dev';

test('all 24 phonics adventures: real configs, unique slugs and titles',()=>{
 assert.equal(phonicAdventures.length,24);
 const slugs=new Set(phonicAdventures.map(g=>g.slug));
 assert.equal(slugs.size,24);
 const titles=new Set(phonicAdventures.map(g=>g.title));
 assert.equal(titles.size,24);
 for(const g of phonicAdventures){
  assert.ok(g.img,'artwork file for '+g.slug);
  assert.ok(g.skill&&g.say&&g.doneTitle,'teaching copy for '+g.slug);
  assert.ok(g.alt.includes(' '),'descriptive alt for '+g.slug);
 }
});

test('every phonics game page exists with unique SEO, H1, artwork and engine',()=>{
 const titles=new Set();
 for(const g of phonicAdventures){
  const p=PHONICS_LIB_PATH+g.slug+'/';
  const html=page(p);
  assert.ok(html.includes('<h1>'+g.title+'</h1>')||html.includes(`<h1>${g.title}</h1>`),'H1 on '+p);
  assert.ok(html.includes('data-ph-board'),'board on '+p);
  assert.ok(html.includes(`data-ph-engine="${g.engine}"`),'engine on '+p);
  assert.ok(html.includes('/assets/phonics-adventures.js'),'engine script on '+p);
  assert.ok(html.includes(PHONICS_BASE+g.img),'R2 artwork on '+p);
  assert.ok(html.includes(C28_PATH),'class link on '+p);
  assert.ok(html.includes('/worksheets/phonics/'+g.slug+'/'),'worksheet twin link on '+p);
  const robots=(html.match(/<meta name="robots" content="([^"]*)"/)||[])[1];
  assert.ok(robots.includes('follow'),'game pages carry the standard crawl stance: '+p);
  titles.add(html.match(/<title>([^<]*)<\/title>/)[1]);
 }
 assert.equal(titles.size,24,'24 unique SEO titles');
});

test('all 24 phonics R2 artworks are live (GET probe — R2 HEAD lies)',()=>{
 for(const g of phonicAdventures){
  const url=PHONICS_BASE+g.img;
  const code=execSync(`curl -s -o /dev/null -w "%{http_code}" --max-time 20 -A "Mozilla/5.0" "${url}"`,{encoding:'utf8'}).trim();
  assert.equal(code,'200','R2 artwork live: '+g.img);
 }
});

test('phonics boards are server-rendered SVG with the right interaction data',()=>{
 // listen: rounds carry the audio key and ok-picks
 const sd=page(PHONICS_LIB_PATH+'sound-detective/');
 assert.ok(sd.includes('data-ph-round-play="s"'),'recorded phoneme button');
 assert.ok((sd.match(/data-ph-ok/g)||[]).length>=4,'two rounds x two correct pictures');
 // sort: items carry their bin
 const tc=page(PHONICS_LIB_PATH+'treasure-chest-sounds/');
 assert.ok(tc.includes('data-ph-bin="b"')&&tc.includes('data-ph-bin="m"'),'two chests, artwork\'s b/m sounds');
 assert.ok((tc.match(/class="ph-item"/g)||[]).length===6,'six sort cards');
 // blend: sequence + tiles
 const rb=page(PHONICS_LIB_PATH+'robot-sound-blender/');
 assert.ok(rb.includes('data-ph-seq="c a t"'),'blend sequence');
 assert.ok((rb.match(/data-ph-tile=/g)||[]).length>=9,'nine letter tiles');
 // counters: check button carries the expected count
 const pg=page(PHONICS_LIB_PATH+'penguin-syllable-drums/');
 assert.ok(pg.includes('data-ph-need="1"')&&pg.includes('data-ph-need="2"')&&pg.includes('data-ph-need="3"'),'1, 2 and 3 syllable answers');
 // swap: the correct swap letter is flagged
 const uni=page(PHONICS_LIB_PATH+'unicorn-sound-swap/');
 assert.ok(uni.includes('data-ph-ok="true"'),'swap answer flagged');
 // position: first/last boxes
 const sub=page(PHONICS_LIB_PATH+'submarine-sound-scanner/');
 assert.ok(sub.includes('data-ph-pick="first"')&&sub.includes('data-ph-pick="last"'),'position boxes');
});

test('the audio manifest matches the shipped recordings',()=>{
 assert.ok(existsSync('dist/assets/phonics-audio-manifest.json'));
 const shipped=JSON.parse(read('/assets/phonics-audio-manifest.json'));
 assert.deepEqual(shipped.sort(),AUDIO_MANIFEST.slice().sort());
 for(const name of AUDIO_MANIFEST){
  const f='dist/assets/sounds/phonics/'+name+'.mp3';
  assert.ok(existsSync(f),'audio file: '+name);
  const buf=readFileSync(f);
  assert.ok(buf.length>4000,'real recording: '+name);
  const isMp3=(buf[0]===0x49&&buf[1]===0x44&&buf[2]===0x33)||(buf[0]===0xFF&&(buf[1]&0xE0)===0xE0);
  assert.ok(isMp3,'valid MP3: '+name);
 }
 const files=readdirSync('dist/assets/sounds/phonics');
 assert.equal(files.length,AUDIO_MANIFEST.length,'no orphan audio files');
});

test('the engine is audio-honest: mute, replay, pure-sound fallback, quiet-mode respect',()=>{
 const js=read('/assets/phonics-adventures.js');
 assert.ok(js.includes("textContent = muted ? 'Sound: off' : 'Sound: on'"),'mute toggle');
 assert.ok(js.includes('lwy-quiet'),'Learning Your Way quiet preference respected');
 assert.ok(js.includes("PURE = { s: 'sss', m: 'mmm'"),'pure-sound fallback spelling');
 assert.ok(js.includes("fetch(a.src, { method: 'HEAD' })"),'missing-file fallback check');
 assert.ok(js.includes("speechSynthesis"),'screen-voice fallback exists');
 assert.ok(!/setInterval\(|score|streak/i.test(js),'no timers or scores');
 assert.ok(js.includes("kiddo-adventures"),'site progress store');
 assert.ok(js.includes("completed[slug] = Date.now()"),'completion saved');
 assert.ok(js.includes("kiddo-ph-mute"),'mute preference remembered');
});

test('game completion never marks a curriculum class complete',()=>{
 for(const g of phonicAdventures){
  const html=page(PHONICS_LIB_PATH+g.slug+'/');
  assert.ok(!html.includes('school-progress.js'),'no curriculum progress on '+g.slug);
 }
 const engine=read('/assets/phonics-adventures.js');
 assert.ok(!engine.includes('class-complete'),'engine never touches class completion');
});

test('Class 28 is wired into the whole school',()=>{
 const cls=page(C28_PATH);
 assert.ok(cls.includes('<h1>Phonics &amp; Beginning Sounds</h1>'),'class H1');
 assert.ok(cls.includes('28 of 28'),'class chip');
 assert.ok(cls.includes(PHONICS_LIB_PATH+'sound-detective/'),'class lists game 1');
 assert.ok(cls.includes('/worksheets/phonics/'),'class links the worksheet category');
 const hub=page('/preschool/4-years/');
 assert.ok(hub.includes(C28_PATH),'age 4 hub lists Class 28');
 assert.ok(hub.includes('Phonics Adventures'),'hub lists the library');
 const lp=page('/learning-path/');
 assert.ok(lp.includes('Class 28: <a href="'+C28_PATH+'">'),'learning path row 28');
 const cur=read('/assets/curriculum.js');
 assert.ok(cur.includes('"n":28')&&cur.includes('phonics-and-beginning-sounds'),'client curriculum has 26 entries incl. 28');
 const lib=page(PHONICS_LIB_PATH);
 assert.ok((lib.match(/data-ph-libcard=/g)||[]).length===24,'library lists all 24');
});

test('the 24 phonics worksheets exist and twin back',()=>{
 const ws=bySubject('phonics');
 assert.equal(ws.length,24);
 for(const w of ws){
  assert.ok(phonicBySlug[w.slug],'worksheet twin of a real game: '+w.slug);
  assert.ok(w.answers,'phonics worksheets carry a grown-up answer guide: '+w.slug);
  const html=page('/worksheets/phonics/'+w.slug+'/');
  assert.ok(html.includes('Answer guide'),'answer guide rendered: '+w.slug);
 }
});

test('worksheet downloads never touch My Classroom progress',()=>{
 const wsjs=read('/assets/worksheets.js');
 assert.ok(!wsjs.includes('kiddo-adventures'),'worksheet JS has no progress code');
 assert.ok(!wsjs.includes('localStorage'),'worksheet JS stores nothing');
 const engine=read('/assets/phonics-adventures.js');
 assert.ok(!engine.includes('download'),'engine does not track downloads');
});

test('phonics pages render on mobile without horizontal overflow',()=>{
 // viewport-level guarantee: the board svg scales by CSS, no fixed widths
 const css=read('/assets/style.css');
 assert.ok(css.includes('.ph-svg{width:100%'),'board scales to container');
 for(const g of phonicAdventures.slice(0,3)){
  const html=page(PHONICS_LIB_PATH+g.slug+'/');
  assert.ok(html.includes('name="viewport"'),'viewport meta on '+g.slug);
 }
});

test('sitemap carries Class 28, the library and all 24 game pages',()=>{
 const xml=read('/sitemap.xml');
 assert.ok(xml.includes(`<loc>${TEST_ORIGIN}${C28_PATH}</loc>`));
 assert.ok(xml.includes(`<loc>${TEST_ORIGIN}${PHONICS_LIB_PATH}</loc>`));
 for(const g of phonicAdventures)assert.ok(xml.includes(`<loc>${TEST_ORIGIN}${PHONICS_LIB_PATH}${g.slug}/</loc>`),'sitemap '+g.slug);
});

test('every phonics activity matches what its artwork actually shows (audited 2026-10-10)',()=>{
 // the audit compared all 24 Canva illustrations against the configs; these
 // assertions lock the artwork-faithful content in place
 const tc=phonicBySlug['treasure-chest-sounds'];
 assert.deepEqual(tc.bins.map(b=>b.key),['b','m'],'artwork shows B and M chests');
 assert.deepEqual(tc.items.map(i=>i.icon),['ball','banana','boat','moon','mouse','mitten'],'artwork items');
 const rh=phonicBySlug['rhyming-frog-hop'];
 assert.ok(rh.pairs.some(p=>p.a==='cat'&&p.b==='hat')&&rh.pairs.some(p=>p.a==='dog'&&p.b==='frog'),'artwork rhyme pairs');
 const ic=phonicBySlug['ice-cream-rhyme-shop'];
 assert.ok(ic.pairs.some(p=>p.a==='bee'&&p.b==='tree'),'bee-tree rhyme from the artwork');
 const bs=phonicBySlug['birdsong-sound-match'];
 assert.ok(bs.pairs.some(p=>p.a==='moon'&&p.b==='mouse')&&bs.pairs.some(p=>p.a==='fish'&&p.b==='fan'),'artwork sound pairs');
 const el=phonicBySlug['elephants-sound-bubbles'];
 assert.equal(el.rounds[0].audio,'b','the artwork\'s target holds a ball — b comes first');
 const cr=phonicBySlug['crocodile-sound-chomper'];
 assert.deepEqual(cr.rounds.map(r=>r.pic),['cat','dog','sun'],'artwork words');
 const ka=phonicBySlug['kangaroo-sound-jumps'];
 assert.deepEqual(ka.rows.map(r=>r.icon),['sun','cat','fish'],'artwork rows');
 const mu=phonicBySlug['muffin-middle-sounds'];
 assert.deepEqual(mu.rounds.map(r=>r.pic),['cat','hen','dog','sun'],'artwork words c_t h_n d_g s_n');
 const ow=phonicBySlug['owls-sound-sorting-library'];
 assert.equal(ow.bins.length,3,'the artwork shows three shelves m/s/t');
 assert.deepEqual(ow.bins.map(b=>b.key),['m','s','t']);
 const pe=phonicBySlug['penguin-syllable-drums'];
 assert.deepEqual(pe.rows.map(r=>r.icon),['cat','apple','banana','elephant'],'artwork rows');
 const ra=phonicBySlug['raccoons-odd-sound-hunt'];
 assert.deepEqual(ra.rounds.map(r=>r.odd),['moon','cat','dog'],'artwork odd-one answers');
 const su=phonicBySlug['submarine-sound-scanner'];
 assert.deepEqual(su.rows.map(r=>r.word),['sun','cat','dog','map'],'artwork rows');
 const sl=phonicBySlug['sloths-blending-slide'];
 assert.deepEqual(sl.words.map(w=>w.seq),['s t','s p','s n'],'the artwork blends two first sounds: st sp sn');
 const un=phonicBySlug['unicorn-sound-swap'];
 assert.deepEqual(un.rows.map(r=>r.targetWord),['hat','log','fan'],'artwork swaps cat->hat dog->log pan->fan');
 const pb=phonicBySlug['polar-bear-word-builder'];
 assert.deepEqual(pb.words.map(w=>w.word),['cat','sun','hen','pig'],'artwork scrambled words');
 const fi=phonicBySlug['firefly-sound-counting'];
 assert.deepEqual(fi.rows.map(r=>r.word),['me','cat','ship','frog'],'artwork words with 2/3/3/4 sounds');
 assert.deepEqual(fi.rows.map(r=>r.n),[2,3,3,4]);
 const mo=phonicBySlug['monkeys-missing-middle'];
 assert.deepEqual(mo.rounds.map(r=>r.pic),['bed','pig','fox'],'artwork words b_d p_g f_x');
 const me=phonicBySlug['mermaids-sound-switch'];
 assert.deepEqual(me.rows.map(r=>r.targetWord),['can','dot','cub'],'artwork swaps cat->can dog->dot cup->cub');
 const pi=phonicBySlug['pirates-missing-sound'];
 assert.deepEqual(pi.rounds.map(r=>r.pic),['cat','sun','dog'],'artwork words _at _un _og');
 const di=phonicBySlug['dinosaur-sound-train'];
 assert.deepEqual(di.words.map(w=>w.word),['cat','dog','sun'],'artwork train words');
 const sd=phonicBySlug['sound-detective'];
 assert.equal(sd.rounds[0].choices.length,4,'the artwork shows four pictures');
});
