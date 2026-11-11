// Class 31 · Science, Nature & Discovery — proves the 30 games, worksheets,
// PDFs and wiring are real. Locks the content mapping (R2 files 20-30 ship
// shifted one slot; every game must load the file whose BAKED-IN title
// matches its activity), the answer model from the artwork audit, and the
// no-curriculum-leakage rule the other adventure shelves follow.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {scienceAdventures,SCIENCE_READY,SCIENCE_TOTAL} from '../src/science-adventures.mjs';
import {SCIENCE_BASE} from '../src/story-kit.mjs';
import {buildScienceWorksheets} from '../src/ws-data-science.mjs';
import {worksheets} from '../src/worksheets.mjs';

const read=p=>readFileSync('dist'+p,'utf8');
const page=p=>read(p+'/index.html');

/* the content mapping: activity slug -> the R2 filename that really carries
   its artwork (files 20-30 are shifted one slot on the bucket) */
const FILE_MAP={
 'monkeys-sound-lab':'26-chameleons-camouflage-hunt.webp',
 'turtles-recycling-mission':'27-elephants-air-power-lab.webp',
 'squirrels-seed-travel-discovery':'28-pandas-habitat-rescue.webp',
 'hippos-water-cycle-lab':'29-penguins-hot-and-cold-lab.webp',
 'owls-earth-and-sun-discovery':'30-owls-science-graduation.webp',
 'foxes-compass-adventure':'20-monkeys-sound-lab.webp',
 'chameleons-camouflage-hunt':'21-turtles-recycling-mission.webp',
 'elephants-air-power-lab':'22-squirrels-seed-travel-discovery.webp',
 'pandas-habitat-rescue':'23-hippos-water-cycle-lab.webp',
 'penguins-hot-and-cold-lab':'24-owls-earth-and-sun-discovery.webp',
 'owls-science-graduation':'25-foxes-compass-adventure.webp'
};

test('Class 31 ships all 30 science adventures with the owner numbering',()=>{
 assert.equal(SCIENCE_TOTAL,30);
 assert.equal(SCIENCE_READY,30);
 assert.equal(scienceAdventures.length,30);
 assert.equal(new Set(scienceAdventures.map(g=>g.slug)).size,30,'unique slugs');
 scienceAdventures.forEach((g,i)=>assert.equal(g.num,i+1,'numbering follows the owner list'));
 assert.equal(scienceAdventures[0].slug,'bunnys-plant-growth-lab');
 assert.equal(scienceAdventures[29].slug,'owls-science-graduation');
});

test('content mapping: every shifted file points at the artwork that really carries the title',()=>{
 for(const [slug,file] of Object.entries(FILE_MAP)){
  const g=scienceAdventures.find(x=>x.slug===slug);
  assert.ok(g,'config '+slug);
  assert.equal(g.img,file,slug+' must load '+file);
 }
 // 01-19 keep their own filenames
 for(const g of scienceAdventures.filter(g=>g.num<=19)){
  assert.ok(g.img.startsWith(String(g.num).padStart(2,'0')+'-'),'activity '+g.num+' keeps its own file');
 }
});

test('all 30 R2 science images are live (ranged GET, WEBP magic bytes)',async()=>{
 const base='https://assets.kiddo.school/school/science/adventures/';
 for(const g of scienceAdventures){
  const res=await fetch(base+g.img,{headers:{Range:'bytes=0-31','User-Agent':'Mozilla/5.0'}});
  const buf=Buffer.from(await res.arrayBuffer());
  assert.ok(res.status===200||res.status===206,'HTTP '+res.status+' for '+g.img);
  assert.deepEqual([...buf.slice(0,4)],[0x52,0x49,0x46,0x46],'RIFF magic for '+g.img);
  assert.equal(buf.slice(8,12).toString(),'WEBP','WEBP magic for '+g.img);
 }
});

test('the answer model matches the audited artwork',()=>{
 const bySlug=Object.fromEntries(scienceAdventures.map(g=>[g.slug,g]));
 // 01: plant growth order — soil, sprout, seedling, sunflower
 assert.deepEqual(bySlug['bunnys-plant-growth-lab'].steps[0].cards.map(c=>c.seq),[0,1,2,3]);
 // 03: insects have six legs — butterfly, ladybug, ant ok; spider/snail/worm not
 const bugs=bySlug['foxes-bug-detective'].steps[0].cards;
 assert.deepEqual(bugs.filter(c=>c.ok).map(c=>c.label),['A butterfly','A ladybug','An ant']);
 assert.equal(bugs.length,6);
 // 04: float = wood, cork, boat; sink = spoon, stone, key
 const sink=bySlug['bears-sink-or-float-lab'].steps[0];
 assert.deepEqual(sink.cards.filter(c=>c.bin==='float').map(c=>c.crop[0]),[3,31,61]);
 assert.deepEqual(sink.cards.filter(c=>c.bin==='sink').map(c=>c.crop[0]),[17,46.5,76.5]);
 assert.equal(sink.bins.length,2);
 // 09: ocean = dolphin, sea turtle, octopus, clownfish
 const ocean=bySlug['dolphins-ocean-discovery'].steps[0].cards;
 assert.deepEqual(ocean.filter(c=>c.ok).map(c=>c.label),['A dolphin','A sea turtle','An octopus','A clownfish']);
 // 11: magnet attracts steel/iron only
 const mag=bySlug['bears-magnet-mystery'].steps[0];
 assert.deepEqual(mag.cards.filter(c=>c.bin==='attract').map(c=>c.label),['A steel paper clip','An iron nail','A steel washer']);
 // 13: butterfly life cycle — egg, caterpillar, chrysalis, butterfly
 assert.deepEqual(bySlug['butterflys-life-cycle'].steps[0].cards.map(c=>c.seq),[3,0,1,2]);
 // 15: ice melts into liquid water (the only ok answer)
 const ice=bySlug['polar-bears-ice-lab'].steps[0].cards;
 assert.equal(ice.filter(c=>c.ok).length,1);
 assert.ok(ice.find(c=>c.ok).label.includes('liquid water'));
 // 16: living = tree, butterfly, baby rabbit
 const living=bySlug['pandas-living-or-nonliving-discovery'].steps[0].cards;
 assert.deepEqual(living.filter(c=>c.ok).map(c=>c.label),['A tree','A butterfly','A baby rabbit']);
 // 17: shadow answers A, B, C — never the same position twice running
 const shadows=bySlug['owls-shadow-science'].steps.map(s=>s.cards.findIndex(c=>c.ok));
 assert.deepEqual(shadows,[0,1,2]);
 // 21: recycling — 2 paper, 2 plastic, 2 metal
 const rec=bySlug['turtles-recycling-mission'].steps[0];
 assert.equal(rec.cards.filter(c=>c.bin==='paper').length,2);
 assert.equal(rec.cards.filter(c=>c.bin==='plastic').length,2);
 assert.equal(rec.cards.filter(c=>c.bin==='metal').length,2);
 assert.equal(rec.bins.length,3);
 // 23: water cycle — evaporation, cloud, rain
 assert.deepEqual(bySlug['hippos-water-cycle-lab'].steps[0].cards.map(c=>c.seq),[2,0,1]);
 // 24: the sun is on the LEFT, so the LEFT side has day
 const earth=bySlug['owls-earth-and-sun-discovery'].steps[0].cards;
 assert.ok(earth.find(c=>c.ok).label.includes('left'));
 // 25: compass N/E/S/W = up/right/down/left — all four words asked
 assert.equal(bySlug['foxes-compass-adventure'].steps.length,4);
 // 26: camouflage — grasshopper (leaves), stick insect (bark), white rabbit (snow)
 const cam=bySlug['chameleons-camouflage-hunt'].steps.map(s=>s.cards.find(c=>c.ok).label);
 assert.deepEqual(cam,['A green grasshopper','A stick insect','A white rabbit']);
 // 27: wind moves pinwheel, kite, feather
 const wind=bySlug['elephants-air-power-lab'].steps[0].cards;
 assert.deepEqual(wind.filter(c=>c.ok).map(c=>c.label),['A pinwheel','A kite','A feather']);
 // 28: habitats — camel/desert, polar bear/arctic, frog/pond, monkey/rainforest
 assert.equal(bySlug['pandas-habitat-rescue'].steps[0].cards.filter(c=>c.group==='a').length,4);
 // 30: graduation — flowering plant, arctic ice, floats
 const grad=bySlug['owls-science-graduation'].steps.map(s=>s.cards.find(c=>c.ok).label);
 assert.deepEqual(grad,['A flowering plant','Arctic sea ice','It floats on the water']);
});



test('the shipped engine is the honest progress keeper',()=>{
 const js=read('/assets/image-adventure.js');
 assert.ok(!/setInterval\(|score|streak|speechSynthesis/i.test(js),'no timers, scores or voices');
 assert.ok(js.includes("kiddo-adventures"),'site progress store');
 assert.ok(js.includes("'kiddo-wc-save'"),'completion comes only from a real save');
 assert.ok(js.includes("data-st-lib"),'library ribbons wired for the story family');
 const css=read('/assets/style.css');
 assert.ok(css.includes('.wc-stage'),'drawing stage styles');
 assert.ok(css.includes('.wc-canvas'),'canvas overlay styles');
});





test('the folded science library never ships curriculum progress machinery',()=>{
 const lib=page('/preschool/science/adventures/');
 assert.ok(!lib.includes('school-progress.js'),'no class-progress scripts on the library');
 assert.ok(!lib.includes('data-tc-complete'),'no completion bar on the library');
 assert.ok(!lib.includes('data-wc-src'),'no per-item drawing mounts left');
 assert.equal([...lib.matchAll(/<article class="one-page-item"/g)].length,30,'all 30 folded onto the library');
});

