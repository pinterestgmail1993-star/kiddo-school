// dinosaurs — the EXTRA CLASS Dinosaurs (owner 2026-10-25): 33 cards on R2
// at school/extra-classes/dinosaurs/ (the deck sits one level above the
// usual flashcards/ subfolder — the owner's real upload location), cover
// first, six pinned dinosaurs leading the grid, one short page per
// dinosaur at /dinosaurs/<slug>/ (slug = file name) showing the card, the
// card's ACTION line verbatim and a link back to /dinosaurs/, individual
// /learn/ lessons via LP_REGISTRY, individual library cards at
// /flashcards/dinosaurs/ with age pills, Class 36 and Animal Categories
// linked both ways, the old AC 'dinosaurs' overview card REMOVED (its two
// URLs 301 to /dinosaurs/), no existing URL changed otherwise.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {DINO_ORDER,DINO_ACTIONS,DINO_COVER} from '../src/flashcards/data-dinosaurs.mjs';
import {lpContent as dinoLp} from '../src/flashcards/lp-dinosaurs.mjs';
import {fcSetBySlug,fcSetCard} from '../src/flashcards/index.mjs';
import {EXTRA_CLASSES} from '../src/extra-classes.mjs';
const read=f=>readFileSync(f,'utf8');
const readPage=p=>readFileSync('dist'+p+'index.html','utf8');
const set=fcSetBySlug['dinosaurs'];
const R2BASE='https://assets.kiddo.school/school/extra-classes/dinosaurs/';

const PINNED=['tyrannosaurus-rex','triceratops','stegosaurus','brachiosaurus','pterodactyl','velociraptor'];
const REST=['allosaurus','ankylosaurus','archaeopteryx','baryonyx','carnotaurus','centrosaurus','ceratosaurus','compsognathus','corythosaurus','deinonychus','diplodocus','euoplocephalus','giganotosaurus','hadrosaurus','iguanodon','maiasaura','microraptor','mosasaurus','ouranosaurus','oviraptor','pachycephalosaurus','parasaurolophus','plateosaurus','quetzalcoatlus','spinosaurus','styracosaurus','therizinosaurus'];

test('dinosaurs set: 33 cards, slug = file name, owner order with six pinned first, real R2 art',()=>{
 assert.equal(set.cards.length,33,'33 dinosaur cards, cover never counted');
 assert.deepEqual(DINO_ORDER,[...PINNED,...REST],'owner order: six pinned, then file order');
 for(const c of set.cards){
  assert.match(c.file,new RegExp('^'+c.slug+'\\.webp$'),c.slug+' file matches slug');
  assert.match(c.img,/^https:\/\/assets\.kiddo\.school\/school\/extra-classes\/dinosaurs\//,c.slug+' serves from the owner folder');
  assert.equal(c.w,800);assert.equal(c.h,1131);
  assert.ok(c.alt.length>80,c.slug+' alt written from the artwork');
  assert.equal(c.ages,'Ages 3+',c.slug+' carries the age pill');
 }
 assert.equal(DINO_COVER.w,800);assert.equal(DINO_COVER.h,1131);
 assert.ok(DINO_COVER.alt.includes('Dinosaur Flashcards'),'cover alt honest');
});

test('every card carries its own ACTION line, transcribed verbatim from the artwork',()=>{
 // The exact lines read off the labeled contact sheets (scripts/dino-sheets.py):
 const exact={'tyrannosaurus-rex':'Stomp like a T. rex','triceratops':'Make three pretend horns',
  'stegosaurus':'Pretend to swish your tail','brachiosaurus':'Reach up high like a Brachiosaurus',
  'pterodactyl':'Flap your arms and glide','velociraptor':'Take three quick dino steps',
  'allosaurus':'Take two giant dino roars','ankylosaurus':'Pretend to swing your club tail',
  'archaeopteryx':'Stretch your wings','baryonyx':'Pretend to catch a fish',
  'carnotaurus':'Make tiny horn poses','centrosaurus':'Make a gentle horn pose',
  'ceratosaurus':'Make a tiny horn pose','compsognathus':'Take five tiny dino steps',
  'corythosaurus':'Pretend to make a trumpet call','deinonychus':'Take quick dino steps',
  'diplodocus':'Stretch your neck up high','euoplocephalus':'Pretend to curl into a ball',
  'giganotosaurus':'Take three giant steps','hadrosaurus':'Pretend to nibble leaves',
  'iguanodon':'Pretend to munch leaves','maiasaura':'Gently care for a baby dino',
  'microraptor':'Flap your little wings','mosasaurus':'Make a big swimming motion',
  'ouranosaurus':'Make a tall back sail','oviraptor':'Pretend to protect an egg',
  'pachycephalosaurus':'Pretend to bump gently','parasaurolophus':'Pretend to make a dino call',
  'plateosaurus':'Reach for the tallest leaves','quetzalcoatlus':'Flap and glide like a giant flyer',
  'spinosaurus':'Make a big sail with your arms','styracosaurus':'Make a brave horn pose',
  'therizinosaurus':'Show your long claws'};
 assert.deepEqual(DINO_ACTIONS,exact,'all 33 actions verbatim');
 for(const c of set.cards)assert.ok(DINO_ACTIONS[c.slug].length>10,c.slug+' action present');
});

test('/dinosaurs/ hub: cover FIRST, six pinned lead the 33 tiles, links back to Class 36 + Animal Categories',()=>{
 const html=readPage('/dinosaurs/');
 const iCover=html.indexOf('dinosaurs/cover.webp'), iFirst=html.indexOf('dinosaurs/tyrannosaurus-rex.webp');
 assert.ok(iCover>-1&&iFirst>-1,'cover + first card render');
 assert.ok(iCover<iFirst,'cover fronts the hub');
 const positions=PINNED.concat(['allosaurus']).map(s=>html.indexOf('dinosaurs/'+s+'.webp'));
 assert.deepEqual(positions,[...positions].sort((a,b)=>a-b),'pinned six lead, allosaurus starts the file order');
 assert.equal((html.match(/class="lp-tile"/g)||[]).length,33,'33 tiles');
 assert.ok(html.includes('href="/preschool/4-years/animals-and-their-habitats/"'),'links Class 36');
 assert.ok(html.includes('href="/extra-classes/animal-categories/"'),'links Animal Categories');
 assert.ok(html.includes('href="/games/animal-walks/"'),'games-shelf link (owner standing rule)');
 assert.ok(html.includes('href="/flashcards/dinosaurs/"'),'links the printable set');
});







test('Class 36 and Animal Categories point at /dinosaurs/ — and the class links back to both',()=>{
 const c36=readPage('/preschool/4-years/animals-and-their-habitats/');
 assert.ok(c36.includes('href="/dinosaurs/"'),'Class 36 links the dinosaurs class');
 const ac=readPage('/extra-classes/animal-categories/');
 assert.ok(ac.includes('href="/dinosaurs/"'),'Animal Categories links the dinosaurs class');
});

test('the old AC dinosaurs card is REMOVED: 23 cards left, both URLs 301, copy honest',()=>{
 assert.equal(fcSetBySlug['animal-categories'].cards.length,23,'Animal Categories now has 23 cards');
 assert.ok(!fcSetBySlug['animal-categories'].cards.some(c=>c.slug==='dinosaurs'),'dinosaurs card gone from the set');
 assert.ok(!existsSync('dist/flashcards/animal-categories/dinosaurs/index.html'),'no dead card page');
 assert.ok(!existsSync('dist/extra-classes/animal-categories/learn/dinosaurs/index.html'),'no dead lesson');
 const red=read('public/_redirects');
 for(const gone of ['/flashcards/animal-categories/dinosaurs/ /dinosaurs/ 301','/extra-classes/animal-categories/learn/dinosaurs/ /dinosaurs/ 301'])
  assert.ok(red.includes(gone),'301 for '+gone.split(' ')[0]);
 const acSetHtml=readPage('/flashcards/animal-categories/');
 assert.ok(acSetHtml.includes('Twenty-three printable animal-categories flashcards'),'set copy shows the honest count');
 assert.ok(readPage('/extra-classes/animal-categories/').includes('twenty-three'),'class copy says twenty-three');
});


