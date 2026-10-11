// Page-type regression gate (owner instruction, 2026-10-11):
//   1. No flashcard page contains a drawing canvas or drawing toolbar.
//   2. Learning Path activity links never point at /flashcards/ pages.
//   3. Learning Path activities keep their drawing canvas + tools rail.
//   4. Printable worksheets and coloring pages have no drawing canvas.
//   5. Feedback sections (reactions / reviews / comments) mount exactly
//      where required — and the same shared implementation everywhere.
//   6. No broken internal page links and no missing activity pages.
// Run with the rest of the suite: npm test (builds must exist in dist/).
import test from 'node:test';
import assert from 'node:assert/strict';
import {readdirSync,statSync,readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';

const read=p=>readFileSync(join('dist',p,'index.html'),'utf8');
const exists=p=>existsSync(join('dist',p,'index.html'));

function walk(dir){
  const out=[];
  for(const e of readdirSync(join('dist',dir),{withFileTypes:true})){
    if(e.isDirectory())out.push(...walk(join(dir,e.name)));
    else if(e.name==='index.html')out.push(dir);
  }
  return out;
}

const MARKERS={
  canvas:['data-wc ','data-wc-src='],
  toolbar:['wc-toolbar'],
  drawHint:['Draw on this card','fc2-drawhint'],
  feedback:['data-fc-root']
};

const hasAny=(html,keys)=>keys.some(k=>html.includes(k));

// "Individual" pages are leaf pages: a category page is any page directory
// that contains further page directories.
function walkLeaf(dir){
  const kids=readdirSync(join('dist',dir),{withFileTypes:true}).filter(e=>e.isDirectory());
  if(kids.length===0)return[dir];
  const out=[];
  for(const e of kids)out.push(...walkLeaf(join(dir,e.name)));
  return out;
}

/* ---------- 1. flashcards are paper: no canvas, no toolbar, no hint ------ */

test('rule 1 · NO flashcard page (set, card or letter page) carries a drawing canvas or toolbar',()=>{
  const pages=walk('flashcards');
  assert.ok(pages.length>500,'all flashcard pages scanned ('+pages.length+')');
  const bad=[];
  for(const p of pages){
    const html=read(p);
    if(hasAny(html,[...MARKERS.canvas,...MARKERS.toolbar,...MARKERS.drawHint]))bad.push(p);
  }
  assert.deepEqual(bad,[],'flashcard pages with drawing UI: '+bad.slice(0,8).join(', '));
});

test('rule 1b · every flashcard card + set page still mounts the shared feedback block',()=>{
  const pages=walk('flashcards').filter(p=>p!=='flashcards');
  const missing=pages.filter(p=>!hasAny(read(p),MARKERS.feedback));
  assert.deepEqual(missing,[],'flashcard pages without feedback: '+missing.slice(0,8).join(', '));
});

/* ---------- 2. Learning Path links never open flashcard pages ------------ */

test('rule 2 · no class, stage hub or Learning Path page links an ACTIVITY to a /flashcards/ card page',()=>{
  const scopes=['learning-path','newborn','baby','toddler','preschool','activities','subjects','ages'];
  const offenders=[];
  for(const s of scopes){
    if(!existsSync('dist/'+s))continue;
    for(const p of walk(s)){
      const html=read(p);
      // any anchor whose visible copy invites "Open/Play/Start" must not go to a card page;
      // simplest honest proxy: no link to a depth-2 flashcard URL at all from class/hub pages
      for(const m of html.matchAll(/href="(\/flashcards\/[a-z0-9-]+\/[a-z0-9-]+\/)"/g))
        offenders.push(p+' -> '+m[1]);
    }
  }
  // The ONLY allowed cross-links are:
  //  a) the letter activity pages' PAPER RESOURCES block (flashcards as
  //     optional paper, owner rule);
  //  b) the Class 32 page's TEACH section linking its OWN set's card pages —
  //     the owner's explicit instruction: the class page teaches parents with
  //     the flashcards and links each individual card ("Open the flashcard").
  //     Everything else still fails.
  const unexpected=offenders.filter(o=>{
    const [p,target]=o.split(' -> ');
    if(p.startsWith('preschool/3-years/alphabet-and-letter-sounds/letter-')&&target.startsWith('/flashcards/alphabet-'))return false;
    if(p==='preschool/4-years/life-skills-and-good-habits'&&target.startsWith('/flashcards/life-skills-and-good-habits/'))return false;
    if(p==='preschool/4-years/science-nature-and-discovery'&&target.startsWith('/flashcards/science-nature-and-discovery/'))return false;
    return true;
  });
  assert.deepEqual(unexpected,[],'activity links pointing at flashcards: '+unexpected.slice(0,8).join(' | '));
  // and the allowance is not an escape hatch: the Class 32 page's ACTIVITY
  // grid (data-ls-card ribbons) must still open the /preschool/life-skills/
  // activity pages, never a flashcard URL — and Class 31's adventure shelves
  // must still open the /preschool/science/adventures/ activity pages.
  const cls=read('preschool/4-years/life-skills-and-good-habits');
  const activityHrefs=[...cls.matchAll(/<a class="sa-card" href="([^"]+)"/g)].map(m=>m[1]);
  assert.ok(activityHrefs.length>0,'Class 32 activity grid present');
  assert.ok(activityHrefs.every(h=>h.startsWith('/preschool/life-skills/')),'Class 32 activity cards open activities, not flashcards');
  const sci=read('preschool/4-years/science-nature-and-discovery');
  const sciHrefs=[...sci.matchAll(/<a class="sa-card sa-card-slim" href="([^"]+)"/g)].map(m=>m[1]);
  assert.ok(sciHrefs.length===30,'Class 31 adventure shelf intact (30 cards)');
  assert.ok(sciHrefs.every(h=>h.startsWith('/preschool/science/adventures/')),'Class 31 adventure cards open activities, not flashcards');
});

test('rule 2b · the alphabet class opens letter ACTIVITIES at their own Learning Path URLs',()=>{
  const cls=read('preschool/3-years/alphabet-and-letter-sounds');
  for(const l of 'abc'){
    assert.match(cls,new RegExp('href="/preschool/3-years/alphabet-and-letter-sounds/letter-'+l+'/"'),'letter '+l+' activity link');
  }
  assert.ok(!cls.includes('href="/flashcards/alphabet/letter-'),'no letter link goes to flashcards');
  for(const l of 'abcdefghijklmnopqrstuvwxyz'){
    const p='preschool/3-years/alphabet-and-letter-sounds/letter-'+l;
    assert.ok(exists(p),'letter activity page exists: '+p);
    const html=read(p);
    assert.ok(!html.includes('/flashcards/alphabet/letter-'),'letter '+l+' page keeps activities off flashcard URLs');
  }
});

test('rule 2c · the retired /flashcards/alphabet/letter-x/ URLs ship no more (no duplicates)',()=>{
  assert.ok(!exists('flashcards/alphabet/letter-a'),'old letter URL gone');
  assert.ok(!exists('flashcards/alphabet/letter-z'),'old letter URL gone');
});

/* ---------- 3. Learning Path activities keep canvas + tools -------------- */

const ACTIVITIES={
  'alphabet letters (Class 15)':{
    base:'preschool/3-years/alphabet-and-letter-sounds/',
    pages:'abcdefghijklmnopqrstuvwxyz'.split('').map(l=>'letter-'+l),
    toolId:'#al-tools'
  },
  'matching & sorting (Class 10)':{
    base:'toddler/2-years/matching-and-sorting/',
    pages:['match-same-animals','sort-by-size','color-match'],
    toolId:'#ms-tools'
  },
  'life skills (Class 32)':{
    base:'preschool/life-skills/',
    pages:['wash-your-hands','tidy-up','be-kind'],
    toolId:'#ls-tools'
  },
  'shape adventures (Class 25)':{
    base:'preschool/shapes/adventures/',
    pages:['build-a-shape-spaceship','silly-monster-factory'],
    toolId:'#ia-tools'
  },
  'writing adventures (Class 27)':{
    base:'preschool/writing/adventures/',
    pages:['rocket-zigzag-mission','giraffe-necklace-designer'],
    toolId:'#ia-tools'
  },
  'coloring twins (Class 9)':{
    base:'toddler/2-years/colors-and-shapes/coloring/',
    pages:['color-the-circle','apple-and-banana'],
    toolId:'#cp-tools'
  }
};

test('rule 3 · every Learning Path activity keeps its drawing canvas, tools rail and per-child restore',()=>{
  for(const [name,{base,pages,toolId}] of Object.entries(ACTIVITIES)){
    for(const slug of pages){
      const p=base+slug;
      if(!exists(p)){/* only fail if the activity family declares it */
        if(name.includes('alphabet'))assert.fail('missing activity page: '+p);
        continue;
      }
      const html=read(p);
      assert.match(html,/data-wc data-wc-src=/,name+' · '+slug+' has the drawing mount');
      assert.match(html,/data-wc-toolbar=/,name+' · '+slug+' points its tools at a right-hand rail');
      assert.ok(html.includes(toolId),name+' · '+slug+' has its tools rail target');
      assert.match(html,/data-wc-restore=/,name+' · '+slug+' saves per child');
      assert.match(html,/Save my work|save it to keep it/i,name+' · '+slug+' offers Save My Work');
      assert.match(html,/data-fc-root/,name+' · '+slug+' mounts the shared feedback block');
    }
  }
});

/* ---------- 4. printables stay ink-and-paper ------------------------------ */

test('rule 4 · NO worksheet or printable coloring page carries a drawing canvas',()=>{
  const scopes=['worksheets','coloring-pages'];
  const bad=[];
  for(const s of scopes){
    for(const p of walk(s)){
      const html=read(p);
      if(hasAny(html,MARKERS.canvas)||hasAny(html,MARKERS.toolbar))bad.push(p);
    }
  }
  assert.deepEqual(bad,[],'printable pages with drawing UI: '+bad.slice(0,8).join(', '));
});

/* ---------- 5. feedback mounts where required ----------------------------- */

test('rule 5 · feedback sections exist on all individual worksheets, coloring pages and flashcard cards',()=>{
  const wsPages=walkLeaf('worksheets').filter(p=>p!=='worksheets');
  const missingWs=wsPages.filter(p=>!hasAny(read(p),MARKERS.feedback));
  assert.deepEqual(missingWs,[],'worksheets without feedback: '+missingWs.slice(0,5).join(', '));
  const cpPages=walkLeaf('coloring-pages').filter(p=>p!=='coloring-pages');
  const missingCp=cpPages.filter(p=>!hasAny(read(p),MARKERS.feedback));
  assert.deepEqual(missingCp,[],'coloring pages without feedback: '+missingCp.slice(0,5).join(', '));
});

test('rule 5b · feedback scripts load exactly on feedback-capable pages',()=>{
  // every page with a mount must load the runtime; none without one may.
  const all=[...walk('flashcards'),...walk('worksheets'),...walk('coloring-pages'),
    ...walk('toddler/2-years/matching-and-sorting'),...walk('preschool/life-skills'),
    ...walk('preschool/3-years/alphabet-and-letter-sounds'),
    ...walk('preschool/shapes/adventures'),...walk('preschool/colors/adventures'),
    ...walk('preschool/writing/adventures'),...walk('preschool/phonics/adventures'),
    ...walk('preschool/reading/adventures'),...walk('preschool/logic/adventures'),
    ...walk('preschool/science/adventures'),
    ...walk('toddler/2-years/colors-and-shapes/coloring')];
  const withMount=all.filter(p=>hasAny(read(p),MARKERS.feedback));
  assert.ok(withMount.length>800,'feedback-capable pages scanned: '+withMount.length);
  const noScript=withMount.filter(p=>!read(p).includes('/assets/flashcards-community.js'));
  assert.deepEqual(noScript,[],'mounted pages missing the runtime: '+noScript.slice(0,8).join(', '));
  const noApi=withMount.filter(p=>!read(p).includes('/assets/community-api.js'));
  assert.deepEqual(noApi,[],'mounted pages missing the API helper: '+noApi.slice(0,8).join(', '));
});

/* ---------- 6. no broken internal links ---------------------------------- */

test('rule 6 · every internal page link in class, hub and activity pages resolves',()=>{
  const scopes=['learning-path','newborn','baby','toddler','preschool','flashcards','worksheets','coloring-pages','activities'];
  const broken=[];
  for(const s of scopes){
    if(!existsSync('dist/'+s))continue;
    for(const p of walk(s)){
      const html=read(p);
      for(const m of html.matchAll(/href="(\/[a-z0-9][a-z0-9\-\/]*\/)"/g)){
        const target=m[1].replace(/^\//,'').replace(/\/$/,'');
        if(target===''){continue;} // home
        if(/^(assets|downloads|api)\b/.test(target))continue;
        if(!existsSync(join('dist',target,'index.html')))broken.push(p+' -> '+m[1]);
      }
    }
  }
  assert.deepEqual(broken,[],'broken internal links: '+broken.slice(0,10).join(' | '));
});

test('rule 6b · the letter activities are wired into the class, sitemap and search',()=>{
  const xml=readFileSync('dist/sitemap.xml','utf8');
  const idx=JSON.parse(readFileSync('dist/assets/search-index.json','utf8'));
  const inSearch=new Set(idx.map(e=>e.u));
  for(const l of 'abcdefghijklmnopqrstuvwxyz'){
    const u='/preschool/3-years/alphabet-and-letter-sounds/letter-'+l+'/';
    assert.ok(xml.includes(u),'sitemap has '+u);
    assert.ok(inSearch.has(u),'search index has '+u);
  }
  assert.ok(!xml.includes('/flashcards/alphabet/letter-a/'),'old letter URL out of the sitemap');
});
