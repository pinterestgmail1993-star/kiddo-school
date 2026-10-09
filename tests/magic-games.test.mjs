// Magic games (Age 3) — Fruit Basket, Color Mixing, Animal Playground
// (Animal Sound Safari), Look & Draw — Magic Shapes, Number Garden (Magic
// Counting Garden), Opposites Adventure (Magic Opposites Finder). Guards
// for the six interactive game pages, their real R2 assets (exact owner
// filenames, true probed dimensions), honest audio (only real recordings
// claimed), genuinely playable structure (basket physics, find/count
// honesty, listen rounds, real drawing tools), whole-school wiring
// (classes, stage shelf, learning path, library, My Classroom, sitemap),
// calm-mode / reduced-motion gates, and the no-score / no-timer /
// no-download rules.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';

const root=resolve('dist');
const read=p=>readFileSync(resolve(root,p),'utf8');

const fruit=read('preschool/3-years/magic-fruit-basket/index.html');
const color=read('preschool/3-years/magic-color-mixing/index.html');
const animal=read('preschool/3-years/magic-animal-playground/index.html');
const shape=read('preschool/3-years/magic-shape-builder/index.html');
const garden=read('preschool/3-years/magic-number-garden/index.html');
const opposites=read('preschool/3-years/magic-opposites-adventure/index.html');
const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/interactive-activities';
const FB=['01-apple.webp','02-banana.webp','03-orange.webp','04-strawberry.webp','05-grapes.webp','06-watermelon.webp','07-pineapple.webp','08-mango.webp','09-fruit-basket.webp','10-fruit-basket-cover.webp'];
const AP=['01-dog.webp','02-cat.webp','03-cow.webp','04-duck.webp','05-sheep.webp','06-frog.webp','07-animal-playground-cover.webp'];
const SB=['01-shape-house.webp','02-shape-rocket.webp','03-shape-tree.webp','04-shape-robot.webp','05-shape-butterfly.webp','06-magic-shape-builder-cover.webp'];
const NG=['01-pink-flower.webp','02-blue-butterfly.webp','03-yellow-bee.webp','04-red-ladybug.webp','05-green-watering-can.webp','06-magic-number-garden-cover.webp'];
const OA=['01-red-ball.webp','02-green-tree.webp','03-yellow-pencil.webp','04-clear-glass.webp','05-soup-bowl.webp','06-blue-door.webp','07-magic-opposites-adventure-cover.webp'];
const FRUIT_SLUGS=['apple','banana','orange','strawberry','grapes','watermelon','pineapple','mango'];
const stage=read('preschool/3-years/index.html');
const lp=read('learning-path/index.html');
const library=read('learning-library/index.html');
const classroom=read('my-classroom/index.html');
const sitemap=read('sitemap.xml');
const c3=read('preschool/3-years/shapes-and-patterns/index.html');
const c4=read('preschool/3-years/colors-and-color-mixing/index.html');
const c6=read('preschool/3-years/animals-and-their-sounds/index.html');
const c8=read('preschool/3-years/fruits-and-vegetables/index.html');
const css=read('assets/style.css');

const clean=h=>h
 .replace(/No scores, no timers[^.<]*/g,'')
 .replace(/no scores, no timers and no sign-up/g,'')
 .replace(/no scores, no timers, no streaks/g,'')
 .replace(/never a score to worry about/g,'')
 .replace(/no score at the end/g,'')
 .replace(/there was never a score/g,'')
 .replace(/nothing to win here/g,'')
 .replace(/no scores, no sign-up/g,'');

test('magic fruit basket: spec page with all ten real R2 assets at true dims',()=>{
 assert.ok(fruit.includes('rel="canonical" href="https://kiddo-school.pages.dev/preschool/3-years/magic-fruit-basket/"'));
 assert.ok(fruit.includes('<title>Magic Fruit Basket — a Fruit Game for 3 Year Olds | Kiddo.school</title>'));
 assert.ok(fruit.includes('<h1>Magic Fruit Basket</h1>'));
 assert.ok(fruit.includes('PRESCHOOL · AGE 3 · CLASS 8 MAGIC GAME'));
 for(const f of FB)assert.ok(fruit.includes(R2+'/magic-fruit-basket-age-3/'+f),f);
 assert.ok(fruit.includes('width="1264" height="1264"'),'true probed dims on the square cards');
 assert.ok(fruit.includes('data-mg-game="fruit-basket"'));
 assert.equal([...fruit.matchAll(/data-mg-screen="/g)].length,7,'seven screens');
 for(const id of ['welcome','meet','fill','find','count','offscreen','complete'])assert.ok(fruit.includes('data-mg-screen="'+id+'"'),id);
 assert.ok(fruit.includes('/assets/magic-fruit-basket.js'));
 assert.ok(fruit.includes('data-cm-root data-page-path="/preschool/3-years/magic-fruit-basket/"'),'family feedback mount');
 assert.ok(fruit.includes('href="/preschool/3-years/fruits-and-vegetables/"'),'links back to Class 8');
 assert.ok(fruit.includes('The kitchen fruit hunt'),'off-screen kitchen play');
 assert.ok(fruit.includes('wash fruits before touching mouths'),'food safety note');
 assert.ok(!fruit.includes('aria-label="undefined"'),'no broken aria-labels');
});

test('magic fruit basket: meet, fill, find and count are genuinely playable and honest',()=>{
 assert.equal([...fruit.matchAll(/data-mg-say="/g)].length,8,'eight tap-to-hear fruits');
 for(const s of FRUIT_SLUGS)assert.ok(fruit.includes('data-mg-say="'+s+'"'),'meet tile '+s);
 assert.equal([...fruit.matchAll(/data-mg-drop="/g)].length,8,'eight basket fruits');
 assert.ok(fruit.includes('09-fruit-basket.webp')&&fruit.includes('data-mg-basket'),'real empty basket is the drop zone');
 // find rounds: five rounds, exactly one correct each, ask names the answer
 const findRounds=[...fruit.matchAll(/data-tc-round data-tc-ask="(Tap the [a-z]+!)">[\s\S]*?<\/div>\s*<p class="tc-feedback"/g)];
 assert.equal([...fruit.matchAll(/data-tc-ask="Tap the/g)].length,5,'five find rounds');
 const askSegs=fruit.split('data-tc-round').slice(1,6);
 for(const seg of askSegs){
  const ask=seg.match(/data-tc-ask="Tap the ([a-z]+)!"/)[1];
  assert.equal([...seg.matchAll(/data-tc-correct="true"/g)].length,1,'exactly one correct in '+ask);
  assert.ok(seg.includes('aria-label="'+ask.charAt(0).toUpperCase()+ask.slice(1)+'" data-tc-correct="true"')||seg.includes('aria-label="'+ask+'"'),'round names the answer: '+ask);
 }
 // count rounds: the claimed number matches the rendered images exactly
 const counts=[...fruit.matchAll(/data-mg-count="(\d)"/g)].map(m=>+m[1]);
 assert.deepEqual(counts,[3,2,5,4],'four counting rounds, one to five');
 for(const n of counts){
  const seg=fruit.slice(fruit.indexOf('data-mg-count="'+n+'"'));
  const row=seg.slice(0,seg.indexOf('data-tc-feedback'));
  assert.equal([...row.matchAll(/<img /g)].length,n,'counting row shows exactly '+n);
  const numSeg=row.slice(row.indexOf('mg-numbers'));
  assert.equal([...numSeg.matchAll(/data-tc-correct="true"/g)].length,1,'exactly one correct number for '+n);
  assert.ok(numSeg.includes('>'+n+'<'),'the correct number tile is '+n);
 }
});

test('magic color mixing: pure CSS/SVG, three true paint recipes, nothing faked',()=>{
 assert.ok(color.includes('rel="canonical" href="https://kiddo-school.pages.dev/preschool/3-years/magic-color-mixing/"'));
 assert.ok(color.includes('<h1>Magic Color Lab</h1>'));
 assert.ok(color.includes('PRESCHOOL · AGE 3 · CLASS 4 MAGIC GAME'));
 assert.ok(!color.includes(R2),'no R2 assets at all — the game is drawn by CSS/SVG');
 assert.ok(!color.includes('<img'),'no bitmap images on the page');
 const recipes=[...color.matchAll(/data-mg-recipe|mg-mini/g)];
 assert.ok(recipes.length>=9,'three recipes charted with mini blobs');
 // recipes stated in text, paint-true: R+Y=O, B+Y=G, R+B=P
 assert.ok(color.includes('<strong>Red + Yellow = Orange</strong>'));
 assert.ok(color.includes('<strong>Blue + Yellow = Green</strong>'));
 assert.ok(color.includes('<strong>Red + Blue = Purple</strong>'));
 assert.ok(color.includes('data-mg-color="red"')&&color.includes('data-mg-color="yellow"')&&color.includes('data-mg-color="blue"'));
 assert.ok(color.includes('data-mg-mix'),'real Mix button');
 assert.ok(color.includes('data-mg-again'),'Try Another Mix');
 assert.ok(color.includes('data-mg-replay'),'replay offered');
 assert.ok(color.includes('monitors mix light, paints mix pigment')||color.includes('screens mix light, paints mix pigment')||color.includes('The screen mixes light; real paints mix pigment'),'screen-vs-paint honesty');
 assert.ok(color.includes('washable, child-safe paints'),'paint safety note');
 assert.ok(color.includes('data-cm-root data-page-path="/preschool/3-years/magic-color-mixing/"'),'family feedback mount');
 assert.ok(color.includes('/assets/magic-color-mixing.js'));
 assert.ok(color.includes('href="/preschool/3-years/colors-and-color-mixing/"'),'links back to Class 4');
});

test('magic animal playground: real recordings only where they exist, honest words elsewhere',()=>{
 assert.ok(animal.includes('rel="canonical" href="https://kiddo-school.pages.dev/preschool/3-years/magic-animal-playground/"'));
 assert.ok(animal.includes('<h1>Animal Sound Safari</h1>'));
 for(const f of AP)assert.ok(animal.includes(R2+'/magic-animal-playground-age-3/'+f),f);
 assert.ok(animal.includes('width="1080" height="1080"'),'true probed dims');
 // the R2 filenames are shifted one slot against their contents (verified
 // visually): cat=03-cow.webp, cow=04-duck.webp, duck=05-sheep.webp,
 // sheep=06-frog.webp, frog=07-…-cover.webp, group cover=02-cat.webp.
 // The page must map by CONTENT so every animal card shows the right
 // picture — the duck card must show the duck, never the cow.
 const MAP={cat:'03-cow.webp',cow:'04-duck.webp',duck:'05-sheep.webp',sheep:'06-frog.webp',frog:'07-animal-playground-cover.webp'};
 for(const [a,f] of Object.entries(MAP))assert.ok(animal.includes(f),a+' uses its content-correct file '+f);
 assert.ok(animal.includes('10-fruit-basket-cover')===false);
 assert.ok(animal.includes('07-animal-playground-cover.webp" width="1080" height="1080" alt="A small green frog')||animal.includes('alt="A small green frog ready to hop"'),'the frog card shows the frog picture');
 assert.ok(animal.includes('welcome')&&animal.includes('02-cat.webp'),'the group illustration fronts the welcome screen');
 // all six recordings are claimed and all six files really ship
 for(const a of ['dog','cat','cow','sheep','duck','frog']){
  assert.ok(!animal.includes(a+'.mp3'),'page carries no hardcoded mp3 URL for '+a+' (playback resolves at runtime)');
  assert.ok(existsSync(resolve(root,'assets/sounds/animals/'+a+'.mp3')),'recording ships: '+a);
 }
 // sound words are the visible text alternatives
 for(const w of ['Woof, woof!','Meow!','Moo!','Quack, quack!','Baa!','Ribbit, ribbit!'])assert.ok(animal.includes(w),'sound word on the card: '+w);
 assert.ok(!animal.includes('stretchs'),'no misspelled movement word');
 assert.ok(animal.includes('stretches'),'cat stretches (fixed)');
 // the listening game uses all six real recordings
 assert.equal([...animal.matchAll(/data-mg-listen="/g)].length,6,'six listen rounds');
 for(const m of animal.matchAll(/data-mg-listen="([a-z]+)"/g))assert.ok(['dog','cat','cow','sheep','duck','frog'].includes(m[1]),'listen round uses a real recording: '+m[1]);
 const listenSegs=animal.split('data-mg-listen=').slice(1);
 for(const seg of listenSegs){
  const round=seg.slice(0,seg.indexOf('</section>'));
  assert.equal([...round.matchAll(/data-mg-correct="true"/g)].length,1,'exactly one correct animal per listen round');
  assert.equal([...round.matchAll(/data-mg-play="/g)].length,1,'each round has its play control');
 }
 assert.equal([...animal.matchAll(/data-tc-ask="Tap the/g)].length,5,'five find rounds');
 const findSegs=animal.split('data-tc-round').slice(1,6);
 for(const seg of findSegs){
  const ask=seg.match(/data-tc-ask="Tap the ([a-z]+)!"/)[1];
  assert.equal([...seg.matchAll(/data-tc-correct="true"/g)].length,1,'one correct in '+ask);
 }
 // movement vocabulary per animal
 for(const v of ['trot','stretch','sway','waddle','bounce','hop'])assert.ok(animal.includes('mgm-'+v),'movement '+v);
 assert.ok(animal.includes('data-cm-root data-page-path="/preschool/3-years/magic-animal-playground/"'));
 assert.ok(animal.includes('/assets/magic-animal-playground.js'));
 assert.ok(animal.includes('href="/preschool/3-years/animals-and-their-sounds/"'),'links back to Class 6');
 assert.ok(animal.includes('Calm Mode toggle in the footer')||animal.includes('parent Calm Mode toggle'),'calm mode mentioned');
});

test('look & draw — magic shapes: five reference pictures, a real white drawing canvas and honest tools',()=>{
 assert.ok(shape.includes('rel="canonical" href="https://kiddo-school.pages.dev/preschool/3-years/magic-shape-builder/"'));
 assert.ok(shape.includes('<h1>Look & Draw — Magic Shapes</h1>'));
 for(const f of SB)assert.ok(shape.includes(R2+'/magic-shape-builder-age-3/'+f),f);
 assert.ok(shape.includes('data-mg-game="look-draw"'));
 // nine screens: welcome, choose, five draw rounds, offscreen, complete
 for(const id of ['welcome','choose','draw-house','draw-tree','draw-rocket','draw-robot','draw-butterfly','offscreen','complete'])assert.ok(shape.includes('data-mg-screen="'+id+'"'),id);
 // the old shape-placement puzzle is fully gone
 assert.ok(!shape.includes('data-sb-slot')&&!shape.includes('data-sb-piece')&&!shape.includes('sb-board'),'no slot/piece puzzle markup remains');
 assert.ok(!shape.includes('tap its spot'),'no drag-into-slots language remains');
 // five draw layouts, one per design, each with a 900×900 white canvas
 const order=[...shape.matchAll(/data-ld-draw="([a-z]+)"/g)].map(m=>m[1]);
 assert.deepEqual(order,['house','tree','rocket','robot','butterfly'],'five drawing rounds in order');
 assert.equal([...shape.matchAll(/<canvas data-ld-canvas width="900" height="900"/g)].length,5,'five big square canvases');
 // each round: six color buttons, three brush sizes, eraser, undo, clear, save
 for(const d of order){
  const seg=shape.slice(shape.indexOf('data-ld-draw="'+d+'"'));
  const segEnd=seg.indexOf('data-ld-draw="',12);
  const round=segEnd<0?seg:seg.slice(0,segEnd);
  assert.equal([...round.matchAll(/data-ld-color="/g)].length,6,d+': six color buttons');
  for(const c of ['#e04b3f','#f5c531','#5aa7d6','#4a9e4f','#f07f28','#8f4fc0'])assert.ok(round.includes('data-ld-color="'+c+'"'),d+': color '+c);
  assert.equal([...round.matchAll(/data-ld-size="/g)].length,3,d+': three brush sizes');
  for(const t of ['data-ld-eraser','data-ld-undo','data-ld-clear','data-ld-save','data-ld-how'])assert.ok(round.includes(t),d+': '+t);
  assert.ok(round.includes('Can you find the shapes in your drawing?'),d+': parent prompt present');
  assert.ok(round.includes('Look at this — then draw your own.'),d+': reference travels with the canvas');
  assert.ok(round.includes('data-ld-steps'),d+': written how-to steps');
  // next picture keeps the session flowing (house wraps to close the loop)
  assert.ok(round.includes('Next picture: the'),'next picture button on '+d);
 }
 // save downloads ONLY the child's canvas: the client engine never embeds
 // or links a reference image, and the page itself has no download attribute
 const engine=readFileSync(resolve(root,'assets/magic-shape-builder.js'),'utf8');
 assert.ok(engine.includes('toBlob')&&engine.includes('a.download'),'save uses a real canvas download');
 assert.ok(!engine.includes(R2),'the engine never touches the reference images');
 assert.ok(!shape.includes('download="'),'page markup carries no download attributes');
 // canvas must stay white and untouchable-by-scroll: CSS guarantees
 assert.ok(css.includes('.ld-canvas-wrap canvas{display:block;width:100%;height:auto;aspect-ratio:1/1;background:#ffffff;touch-action:none'),'canvas is white, square and pointer-locked');
 assert.ok(css.includes('.ld-canvas-wrap{position:relative;border:2px solid var(--ink);background:#ffffff'),'canvas wrapper is white too');
 // honest session note: drawings persist while the page is open
 assert.ok(shape.includes('drawings stay on this page until you close it')||shape.includes('stay saved while this page is open'),'session persistence disclosed');
 assert.ok(shape.includes('Big paper, big shapes'),'off-screen paper drawing');
 assert.ok(shape.includes('data-cm-root data-page-path="/preschool/3-years/magic-shape-builder/"'));
 assert.ok(shape.includes('/assets/magic-shape-builder.js'));
 assert.ok(shape.includes('href="/preschool/3-years/shapes-and-patterns/"'),'links back to Class 3');
 assert.ok(shape.includes('href="/my-classroom/"'),'My Classroom link');
 assert.ok(!shape.includes('aria-label="undefined"'),'no broken aria-labels');
});


test('magic number garden: six real R2 assets, four genuinely playable counting activities',()=>{
 assert.ok(garden.includes('rel="canonical" href="https://kiddo-school.pages.dev/preschool/3-years/magic-number-garden/"'));
 assert.ok(garden.includes('<h1>Magic Counting Garden</h1>'));
 assert.ok(garden.includes('PRESCHOOL · AGE 3 · CLASS 2 MAGIC GAME'));
 for(const f of NG)assert.ok(garden.includes(R2+'/magic-number-garden-age-3/'+f),f);
 assert.ok(garden.includes('width="1080" height="1080"'),'true probed dims');
 assert.ok(garden.includes('data-mg-game="number-garden"'));
 for(const id of ['welcome','count','plant','find','water','offscreen','complete'])assert.ok(garden.includes('data-mg-screen="'+id+'"'),id);
 // count rounds: rendered item count equals the asked count exactly
 const counts=[...garden.matchAll(/data-ng-count="(\d+)"/g)].map(m=>+m[1]);
 assert.deepEqual(counts,[3,5,8,10],'count rounds climb to ten');
 for(const n of counts){
  const seg=garden.slice(garden.indexOf('data-ng-count="'+n+'"'));
  const row=seg.slice(0,seg.indexOf('ng-roundmsg'));
  assert.equal([...row.matchAll(/data-ng-tap/g)].length,n,'count round shows exactly '+n+' tappable items');
  assert.ok(row.includes('Tap each'),round_name(row));
  function round_name(){}
 }
 // plant rounds: the asked numbers
 const plants=[...garden.matchAll(/data-ng-plant="(\d+)"/g)].map(m=>+m[1]);
 assert.deepEqual(plants,[4,2,6],'plant rounds');
 // plant plots hold exactly 8 spots
 for(const p of plants){
  const seg=garden.slice(garden.indexOf('data-ng-plant="'+p+'"'));
  const row=seg.slice(0,seg.indexOf('ng-roundmsg'));
  assert.equal([...row.matchAll(/data-ng-spot/g)].length,8,'plant plot has 8 spots for '+p);
 }
 // find rounds: exactly one group holds the asked number; groups render their counts
 const finds=[...garden.matchAll(/data-tc-ask="Which group has (\d+)\?"/g)].map(m=>+m[1]);
 assert.deepEqual(finds,[4,2,7,5],'find rounds');
 for(const m of garden.matchAll(/data-tc-ask="Which group has (\d+)\?"/g)){
  const seg=garden.slice(garden.indexOf(m[0]));
  const segEnd=seg.indexOf('data-tc-feedback');
  const round=seg.slice(0,segEnd);
  const num=+m[1];
  const groups=[...round.matchAll(/aria-label="A group of (\d+) [a-z]+"/g)].map(x=>+x[1]);
  assert.equal(groups.filter(x=>x===num).length,1,'exactly one group of '+num);
  // each group's rendered mini count matches its label
  const labels=[...round.matchAll(/aria-label="A group of (\d+)/g)].map(x=>+x[1]);
  const minis=[...round.matchAll(/class="tc-choice ng-group"[^>]*>[\s\S]*?<\/button>/g)].map(b=>[...b[0].matchAll(/ng-mini/g)].length);
  assert.deepEqual(minis,labels,'group mini counts match their labels: '+labels);
 }
 // water rounds: can + spots
 const waters=[...garden.matchAll(/data-ng-water="(\d+)"/g)].map(m=>+m[1]);
 assert.deepEqual(waters,[3,5],'water rounds');
 assert.ok(garden.includes('05-green-watering-can.webp'),'the watering can illustration is the water button');
 for(const w of waters){
  const seg=garden.slice(garden.indexOf('data-ng-water="'+w+'"'));
  const row=seg.slice(0,seg.indexOf('ng-roundmsg'));
  assert.equal([...row.matchAll(/data-ng-wspot/g)].length,8,'water plot has 8 spots for '+w);
 }
 assert.ok(garden.includes('count real leaves')||garden.includes('Leaf hunt'),'off-screen leaf counting');
 assert.ok(garden.includes('data-cm-root data-page-path="/preschool/3-years/magic-number-garden/"'),'family feedback mount');
 assert.ok(garden.includes('/assets/magic-number-garden.js'));
 assert.ok(garden.includes('href="/preschool/3-years/numbers-and-counting/"'),'links back to Class 2');
 assert.ok(!garden.includes('aria-label="undefined"'),'no broken aria-labels');
});

test('magic opposites adventure: six opposites that really transform',()=>{
 assert.ok(opposites.includes('rel="canonical" href="https://kiddo-school.pages.dev/preschool/3-years/magic-opposites-adventure/"'));
 assert.ok(opposites.includes('<h1>Magic Opposites Finder</h1>'));
 assert.ok(opposites.includes('PRESCHOOL · AGE 3 · CLASS 5 MAGIC GAME'));
 for(const f of OA)assert.ok(opposites.includes(R2+'/magic-opposites-adventure-age-3/'+f),f);
 assert.ok(opposites.includes('width="1080" height="1080"'),'true probed dims');
 assert.ok(opposites.includes('data-mg-game="opposites-adventure"'));
 for(const id of ['welcome','bigsmall','tallshort','longshort','fullempty','hotcold','openclosed','match','offscreen','complete'])assert.ok(opposites.includes('data-mg-screen="'+id+'"'),id);
 // four transformation stations with both states wired
 for(const k of ['ball','pencil','glass','door'])assert.ok(opposites.includes('data-oa-toggle="'+k+'"'),'station: '+k);
 for(const s of ['data-oa-set="big"','data-oa-set="small"','data-oa-set="long"','data-oa-set="short"','data-oa-set="full"','data-oa-set="empty"','data-oa-set="open"','data-oa-set="closed"'])assert.ok(opposites.includes(s),s);
 assert.ok(opposites.includes('oa-water'),'glass has a real water fill');
 assert.ok(opposites.includes('oa-doorleaf')&&opposites.includes('oa-room'),'door swings open over a revealed room');
 // tap rounds: tall/short trees + hot/cold soups + six challenge rounds
 assert.equal([...opposites.matchAll(/data-tc-ask="Tap the (TALL|SHORT) tree!"/g)].length,2,'two tree rounds');
 assert.equal([...opposites.matchAll(/data-tc-ask="Tap the (HOT|COLD) soup!"/g)].length,2,'two soup rounds');
 const rounds=[...opposites.matchAll(/data-tc-round data-tc-ask="The word is ([A-Z]+) — tap the opposite!"/g)].map(m=>m[1]);
 assert.deepEqual(rounds,['BIG','TALL','LONG','FULL','HOT','OPEN'],'six challenge rounds, one per opposite');
 for(const m of opposites.matchAll(/data-tc-round data-tc-ask="The word is ([A-Z]+)[^"]*">[\s\S]*?<p class="tc-feedback"/g)){
  assert.equal([...m[0].matchAll(/data-tc-correct="true"/g)].length,1,'exactly one opposite choice in round '+m[1]);
 }
 // safety + honesty
 assert.ok(opposites.includes('tasting is always a grown-up'),'hot soup safety');
 assert.ok(opposites.includes('Fill and pour')||opposites.includes('fill a cup and empty it'),'off-screen fill-and-pour');
 assert.ok(opposites.includes('crops to just the object')||opposites.includes('shown through a quiet window'),'banner-crop disclosed to grown-ups');
 assert.ok(opposites.includes('data-cm-root data-page-path="/preschool/3-years/magic-opposites-adventure/"'),'family feedback mount');
 assert.ok(opposites.includes('/assets/magic-opposites-adventure.js'));
 assert.ok(opposites.includes('href="/preschool/3-years/opposites-and-comparing/"'),'links back to Class 5');
 assert.ok(!opposites.includes('aria-label="undefined"'),'no broken aria-labels');
});

test('magic games respect calm mode, reduced motion and the no-score/no-timer/no-download promises',()=>{
 for(const [name,html] of [['fruit',fruit],['color',color],['animal',animal],['shape',shape],['garden',garden],['opposites',opposites]]){
  assert.doesNotMatch(clean(html),/\bscore\b|\btimer\b|\bstreak\b|leaderboard|countdown/i,name+' stays score-free');
  assert.ok(!html.includes('setInterval'),'no timers in '+name);
  assert.ok(!html.includes('download="'),'no download buttons for game assets in '+name);
  assert.ok(html.includes('body class')===false||true);
 }
 // the shared CSS gates every new animation behind calm-mode and reduced-motion
 assert.ok(css.includes('body.calm-mode .mg-landed.mg-pop'),'calm-mode gate for the basket pop');
 assert.ok(css.includes('body.calm-mode button.mg-animal.is-moving img'),'calm-mode gate for animal movement');
 assert.ok(css.includes('body.calm-mode .mg-mixing .mg-drip-a'),'calm-mode gate for the mixing drips');
 assert.ok(css.includes('body.calm-mode .ng-itembtn.is-pop'),'calm-mode gate for the garden pops');
 assert.ok(css.includes('button.ld-color,button.ld-size,button.ld-tool{transition:none}'),'reduced-motion gate covers the drawing tools');
 assert.ok(/@media\(prefers-reduced-motion:reduce\)\{[^}]*mg-landed[^}]*\}/.test(css),'reduced-motion gate for the magic animations');
});

test('magic games are wired into the whole school',()=>{
 // stage shelf lists all six
 for(const g of ['magic-number-garden','magic-shape-builder','magic-color-mixing','magic-animal-playground','magic-opposites-adventure','magic-fruit-basket']){
  assert.ok(stage.includes('href="/preschool/3-years/'+g+'/"'),'stage shelf: '+g);
  assert.ok(lp.includes('href="/preschool/3-years/'+g+'/"'),'learning path: '+g);
  assert.ok(library.includes('href="/preschool/3-years/'+g+'/"'),'learning library: '+g);
  assert.ok(classroom.includes('href="/preschool/3-years/'+g+'/"'),'my classroom: '+g);
  assert.ok(sitemap.includes('<loc>https://kiddo-school.pages.dev/preschool/3-years/'+g+'/</loc>'),'sitemap: '+g);
 }
 assert.ok(stage.includes('The magic games'),'stage section heading');
 assert.ok(lp.includes('Age 3 magic games'),'learning path row label');
 assert.ok(classroom.includes('ON THE SHELF · MAGIC GAMES'),'my classroom panel');
 // each class links its own game (under its real name)
 assert.ok(c3.includes('href="/preschool/3-years/magic-shape-builder/"')&&c3.includes('Play Look &amp; Draw — Magic Shapes'),'Class 3 links its game');
 assert.ok(c4.includes('href="/preschool/3-years/magic-color-mixing/"')&&c4.includes('Play the Magic Color Lab game'),'Class 4 links its game');
 assert.ok(c6.includes('href="/preschool/3-years/magic-animal-playground/"')&&c6.includes('Play the Animal Sound Safari game'),'Class 6 links its game');
 assert.ok(c8.includes('href="/preschool/3-years/magic-fruit-basket/"')&&c8.includes('Play the Magic Fruit Basket game'),'Class 8 links its game');
 const c2=read('preschool/3-years/numbers-and-counting/index.html');
 const c5=read('preschool/3-years/opposites-and-comparing/index.html');
 assert.ok(c2.includes('href="/preschool/3-years/magic-number-garden/"')&&c2.includes('Play the Magic Counting Garden game'),'Class 2 links its game');
 assert.ok(c5.includes('href="/preschool/3-years/magic-opposites-adventure/"')&&c5.includes('Play the Magic Opposites Finder game'),'Class 5 links its game');
 // the magic games shelf is separate everywhere it appears
 assert.ok(lp.includes('lp-row lp-magic')&&lp.includes('outside the class sequence'),'learning path magic shelf is separated');
 assert.ok(library.includes('Magic Games · playful practice for Age 3'),'library has its own magic games shelf');
});
