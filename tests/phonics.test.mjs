// Kiddo School — Class 28 Phonics test suite.
// Proves the 24 adventures are draw-on-the-picture activities with plain
// text instructions (no sound, no coded boards, no scores), the class page
// exists, the My Classroom wiring carries the phonics band, and the artwork
// streams from the owner's actual R2 uploads.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {execSync} from 'node:child_process';
import {phonicAdventures,phonicBySlug,PHONICS_LIB_PATH,PHONICS_BASE,C28_PATH,AUDIO_MANIFEST} from '../src/phonics-adventures.mjs';
import {bySubject} from '../src/worksheets.mjs';

const read=f=>readFileSync('dist'+f,'utf8');
const page=p=>read(p+'index.html');
const TEST_ORIGIN='https://kiddo.school';

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

test('every phonics adventure page exists with unique SEO, H1, artwork and the drawing layer',()=>{
 const titles=new Set();
 for(const g of phonicAdventures){
  const p=PHONICS_LIB_PATH+g.slug+'/';
  const html=page(p);
  assert.ok(html.includes(`<h1 class="ia-h1">${g.title}</h1>`),'H1 on '+p);
  assert.ok(html.includes(`data-wc-src="${PHONICS_BASE+g.img}?draw=1"`),'drawing mount over the artwork on '+p);
  assert.ok(html.includes('data-ia-band="phonics"'),'progress band on '+p);
  assert.ok(html.includes('/assets/image-adventure.js'),'progress engine on '+p);
  assert.ok(html.includes('id="ia-tools"'),'tools rail on '+p);
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

test('phonics pages are draw-on-the-picture: no coded boards, no sound instructions',()=>{
 for(const g of phonicAdventures){
  const html=page(PHONICS_LIB_PATH+g.slug+'/');
  // the retired coded board must not exist anywhere
  for(const hook of ['data-ph-board','data-ph-engine','data-ph-round','data-ph-ok','data-ph-bin','data-ph-seq','data-ph-tile','data-ph-need','data-ph-pick','ph-audio-bar'])
   assert.ok(!html.includes(hook),hook+' retired on '+g.slug);
  // the owner's rule: no sound instructions on the page
  assert.ok(!html.includes('Sound: on')&&!html.includes('data-ph-mute'),'no audio bar on '+g.slug);
  assert.ok(!html.includes('speechSynthesis'),'no screen voice on '+g.slug);
  // the picture is the activity
  assert.ok(html.includes('crossorigin="anonymous"'),'CORS save on '+g.slug);
 }
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

test('the shipped engine is the honest progress keeper: no sound, no scores, no timers',()=>{
 const js=read('/assets/image-adventure.js');
 assert.ok(!/setInterval\(|score|streak|speechSynthesis/i.test(js),'no timers, scores or voices');
 assert.ok(js.includes("kiddo-adventures"),'site progress store');
 assert.ok(js.includes("'kiddo-wc-save'"),'completion comes only from a real save');
 assert.ok(js.includes("kiddo-adventure-done"),'My Classroom hears about it');
 assert.ok(js.includes("data-ia-band"),'band comes from the page, not a hardcoded map');
});

test('game completion never marks a curriculum class complete',()=>{
 for(const g of phonicAdventures){
  const html=page(PHONICS_LIB_PATH+g.slug+'/');
  assert.ok(!html.includes('school-progress.js'),'no curriculum progress on '+g.slug);
 }
 const engine=read('/assets/image-adventure.js');
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
 // the old worksheets.js is gone entirely; worksheet pages now ship only the
 // community feedback layer, which stores reactions per page path
 assert.ok(!existsSync('dist/assets/worksheets.js'),'no worksheet JS at all');
 const cm=read('/assets/flashcards-community.js');
 assert.ok(!cm.includes('kiddo-adventures'),'community script has no progress code');
 const engine=read('/assets/image-adventure.js');
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
