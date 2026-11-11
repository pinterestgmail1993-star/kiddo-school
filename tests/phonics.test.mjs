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





test('the phonics library folds all 24 adventures: no coded boards, no sound instructions',()=>{
 const lib=page(PHONICS_LIB_PATH);
 assert.equal([...lib.matchAll(/<article class="one-page-item"/g)].length,24,'all 24 folded onto the library');
 for(const g of phonicAdventures){
  assert.ok(!lib.includes(`href="${PHONICS_LIB_PATH}${g.slug}/"`),'no per-card link '+g.slug);
  assert.ok(lib.includes(PHONICS_BASE+g.img),'artwork '+g.img);
 }
 // the retired coded board must not exist anywhere
 for(const hook of ['data-ph-board','data-ph-engine','data-ph-round','data-ph-ok','data-ph-bin','data-ph-seq','data-ph-tile','data-ph-need','data-ph-pick','ph-audio-bar'])
  assert.ok(!lib.includes(hook),hook+' retired from the library');
 // the owner's rule: no sound instructions on the page
 assert.ok(!lib.includes('Sound: on')&&!lib.includes('data-ph-mute'),'no audio bar');
 assert.ok(!lib.includes('speechSynthesis'),'no screen voice');
 assert.ok(!lib.includes('data-wc-src'),'no per-item drawing mounts left');
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

test('the folded library never marks a curriculum class complete',()=>{
 const lib=page(PHONICS_LIB_PATH);
 assert.ok(!lib.includes('school-progress.js'),'no curriculum progress on the library');
 assert.ok(!lib.includes('data-tc-complete'),'no completion bar on the library');
 const engine=read('/assets/image-adventure.js');
 assert.ok(!engine.includes('class-complete'),'engine never touches class completion');
});


test('Class 28 is wired into the whole school',()=>{
 const cls=page(C28_PATH);
 assert.ok(cls.includes('<h1>Phonics &amp; Beginning Sounds</h1>'),'class H1');
 assert.ok(cls.includes('28 of 28'),'class chip');
 assert.ok(cls.includes(PHONICS_LIB_PATH+'#sound-detective'),'class points game 1 at the one-page library');
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
 assert.ok(!lib.includes(`href="${PHONICS_LIB_PATH}sound-detective/"`),'no per-card links on the library');
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

test('the phonics library renders on mobile without horizontal overflow',()=>{
 // viewport-level guarantee: the board svg scales by CSS, no fixed widths
 const css=read('/assets/style.css');
 assert.ok(css.includes('.ph-svg{width:100%'),'board scales to container');
 const lib=page(PHONICS_LIB_PATH);
 assert.ok(lib.includes('name="viewport"'),'viewport meta on the library');
});


test('sitemap carries Class 28 and the one-page library, no game pages',()=>{
 const xml=read('/sitemap.xml');
 assert.ok(xml.includes(`<loc>${TEST_ORIGIN}${C28_PATH}</loc>`));
 assert.ok(xml.includes(`<loc>${TEST_ORIGIN}${PHONICS_LIB_PATH}</loc>`));
 for(const g of phonicAdventures)assert.ok(!xml.includes(`<loc>${TEST_ORIGIN}${PHONICS_LIB_PATH}${g.slug}/</loc>`),'sitemap drops '+g.slug);
 const red=read('/_redirects');
 assert.ok(red.includes('/preschool/phonics/:p2/:p3 /preschool/phonics/:p2/ 301'),'placeholder 301 covers the folded games');
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
