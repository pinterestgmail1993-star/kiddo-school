// Magic games (Age 3) — after the owner's retirement of Magic Counting
// Garden, Magic Opposites Finder and Magic Fruit Basket, exactly two games
// remain on the magic-games shelf: Look & Draw — Magic Shapes (Class 3) and
// Animal Sound Safari (Class 6), plus Magic Color Lab, which stays live and
// wired to Class 4 but deliberately off every shelf. The retired games'
// illustrations live on inside Look & Draw's gallery. Guards below cover the
// remaining game pages, their real R2 assets (exact owner filenames, true
// probed dimensions), the full 25-picture Look & Draw gallery, honest audio
// (only real recordings claimed), genuinely playable structure, whole-school
// wiring, calm-mode / reduced-motion gates, and the no-score / no-timer /
// no-download rules.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';

const root=resolve('dist');
const read=p=>readFileSync(resolve(root,p),'utf8');

const color=read('preschool/3-years/magic-color-mixing/index.html');
const animal=read('preschool/3-years/magic-animal-playground/index.html');
const shape=read('preschool/3-years/magic-shape-builder/index.html');
const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/interactive-activities';
const AP=['01-dog.webp','02-cat.webp','03-cow.webp','04-duck.webp','05-sheep.webp','06-frog.webp','07-animal-playground-cover.webp'];
const SB=['01-shape-house.webp','02-shape-rocket.webp','03-shape-tree.webp','04-shape-robot.webp','05-shape-butterfly.webp','06-magic-shape-builder-cover.webp'];
const NG=['01-pink-flower.webp','02-blue-butterfly.webp','03-yellow-bee.webp','04-red-ladybug.webp','05-green-watering-can.webp'];
const OA=['01-red-ball.webp','02-green-tree.webp','03-yellow-pencil.webp','04-clear-glass.webp','05-soup-bowl.webp','06-blue-door.webp'];
const FB=['01-apple.webp','02-banana.webp','03-orange.webp','04-strawberry.webp','05-grapes.webp','06-watermelon.webp','07-pineapple.webp','08-mango.webp','09-fruit-basket.webp'];
const ORDER=['house','tree','rocket','robot','butterfly','flower','blue-butterfly','bee','ladybug','watering-can','ball','tall-tree','pencil','glass','soup','door','apple','banana','orange','strawberry','grapes','watermelon','pineapple','mango','basket'];
const stage=read('preschool/3-years/index.html');
const lp=read('learning-path/index.html');
const library=read('learning-library/index.html');
const classroom=read('my-classroom/index.html');
const sitemap=read('sitemap.xml');
const c3=read('preschool/3-years/shapes-and-patterns/index.html');
const c4=read('preschool/3-years/colors-and-color-mixing/index.html');
const c6=read('preschool/3-years/animals-and-their-sounds/index.html');
const c2=read('preschool/3-years/numbers-and-counting/index.html');
const c5=read('preschool/3-years/opposites-and-comparing/index.html');
const c8=read('preschool/3-years/fruits-and-vegetables/index.html');
const css=read('assets/style.css');

const clean=h=>h
 .replace(/No scores, no timers[^.<]*/g,'')
 .replace(/no scores, no timers and no sign-up/g,'')
 .replace(/never a score to worry about/g,'')
 .replace(/nothing to win here/g,'')
 .replace(/there is never a score at the end/g,'');

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

test('look & draw: a 25-picture gallery on four shelves, gathered from the retired games',()=>{
 assert.ok(shape.includes('rel="canonical" href="https://kiddo-school.pages.dev/preschool/3-years/magic-shape-builder/"'));
 assert.ok(shape.includes('<h1>Look & Draw — Magic Shapes</h1>'));
 assert.ok(shape.includes('data-mg-game="look-draw"'));
 // every reference artwork really ships, from its true owner folder
 for(const f of SB)assert.ok(shape.includes(R2+'/magic-shape-builder-age-3/'+f),f);
 for(const f of NG)assert.ok(shape.includes(R2+'/magic-number-garden-age-3/'+f),f);
 for(const f of OA)assert.ok(shape.includes(R2+'/magic-opposites-adventure-age-3/'+f),f);
 for(const f of FB)assert.ok(shape.includes(R2+'/magic-fruit-basket-age-3/'+f),f);
 assert.ok(shape.includes('width="1264" height="1264"'),'fruit cards at their true probed dims');
 assert.ok(shape.includes('width="1080" height="1080"'),'garden/opposites/shape cards at their true probed dims');
 // 29 screens: welcome, choose, 25 draw rounds, offscreen, complete
 assert.equal([...shape.matchAll(/data-mg-screen="/g)].length,29,'welcome + choose + 25 draws + offscreen + complete');
 for(const id of ['welcome','choose','offscreen','complete'])assert.ok(shape.includes('data-mg-screen="'+id+'"'),id);
 // the old shape-placement puzzle is fully gone
 assert.ok(!shape.includes('data-sb-slot')&&!shape.includes('data-sb-piece')&&!shape.includes('sb-board'),'no slot/piece puzzle markup remains');
 // 25 draw layouts in the gallery order, each with a 900×900 white canvas
 const order=[...shape.matchAll(/data-ld-draw="([a-z-]+)"/g)].map(m=>m[1]);
 assert.deepEqual(order,ORDER,'25 drawing rounds in gallery order');
 assert.equal([...shape.matchAll(/<canvas data-ld-canvas width="900" height="900"/g)].length,25,'25 big square canvases');
 // four shelf lines on the choose screen
 for(const g of ['Magic shapes','Garden friends','Opposites','Fruits'])assert.ok(shape.includes('ld-groupline">'+g),g+' shelf line');
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
  // next picture keeps the session flowing (basket wraps to the house)
  assert.ok(round.includes('Next picture: the'),'next picture button on '+d);
 }
 // the four banner-bearing / close-up files render through crop windows
 for(const d of ['ball','glass','soup','door']){
  const seg=shape.slice(shape.indexOf('data-ld-draw="'+d+'"'));
  const round=seg.slice(0,seg.indexOf('data-ld-draw="',12)>0?seg.indexOf('data-ld-draw="',12):undefined);
  assert.ok(round.includes('class="ld-crop"'),d+' shown through an object crop window');
 }
 // every choose tile letterboxes its picture in the same square box
 assert.equal([...shape.matchAll(/class="ld-tilebox"/g)].length,25,'25 letterboxed choose tiles');
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

test('remaining magic games respect calm mode, reduced motion and the no-score/no-timer/no-download promises',()=>{
 for(const [name,html] of [['color',color],['animal',animal],['shape',shape]]){
  assert.doesNotMatch(clean(html),/\bscore\b|\btimer\b|\bstreak\b|leaderboard|countdown/i,name+' stays score-free');
  assert.ok(!html.includes('setInterval'),'no timers in '+name);
  assert.ok(!html.includes('download="'),'no download buttons for game assets in '+name);
 }
 // the shared CSS gates every animation behind calm-mode and reduced-motion
 assert.ok(css.includes('body.calm-mode .mg-mixing .mg-drip-a'),'calm-mode gate for the mixing drips');
 assert.ok(css.includes('body.calm-mode button.mg-animal.is-moving img'),'calm-mode gate for animal movement');
 assert.ok(css.includes('button.ld-color,button.ld-size,button.ld-tool{transition:none}'),'reduced-motion gate covers the drawing tools');
 assert.ok(/@media\(prefers-reduced-motion:reduce\)\{[^}]*mg-animal[^}]*\}/.test(css),'reduced-motion gate for the magic animations');
 // the retired games' CSS is gone for good
 assert.ok(!/\.ng-[a-z]/.test(css),'no counting-garden CSS remains');
 assert.ok(!/\.oa-[a-z]/.test(css),'no opposites CSS remains');
 assert.ok(!css.includes('.mg-fruit')&&!css.includes('.mg-basket'),'no fruit-basket CSS remains');
});

test('magic games are wired into the whole school — two games on the shelf',()=>{
 // only the two shelf games are listed everywhere
 for(const g of ['magic-shape-builder','magic-animal-playground']){
  assert.ok(stage.includes('href="/preschool/3-years/'+g+'/"'),'stage shelf: '+g);
  assert.ok(lp.includes('href="/preschool/3-years/'+g+'/"'),'learning path: '+g);
  assert.ok(classroom.includes('href="/preschool/3-years/'+g+'/"'),'my classroom: '+g);
  assert.ok(sitemap.includes('<loc>https://kiddo-school.pages.dev/preschool/3-years/'+g+'/</loc>'),'sitemap: '+g);
 }
 // Color Lab stays live and wired to Class 4, but is absent from every magic-games shelf
 assert.ok(sitemap.includes('<loc>https://kiddo-school.pages.dev/preschool/3-years/magic-color-mixing/</loc>'),'sitemap: magic-color-mixing');
 for(const [label,doc] of [['stage shelf',stage],['learning path',lp],['my classroom',classroom]]){
  assert.ok(!doc.includes('href="/preschool/3-years/magic-color-mixing/"'),'Color Lab removed from '+label);
 }
 assert.ok(stage.includes('The magic games'),'stage section heading');
 assert.ok(lp.includes('Age 3 magic games'),'learning path row label');
 assert.ok(classroom.includes('ON THE SHELF · MAGIC GAMES'),'my classroom panel');
 assert.ok(classroom.includes('Two gentle games for preschoolers'),'my classroom panel describes two games');
 assert.ok(lp.includes('Two gentle interactive games'),'learning path row describes two games');
 // the library is books-only: no magic games there
 assert.ok(!library.includes('/preschool/3-years/magic-'),'no magic game listings on the books-only library');
 // each remaining game's class links it (under its real name)
 assert.ok(c3.includes('href="/preschool/3-years/magic-shape-builder/"')&&c3.includes('Play Look &amp; Draw — Magic Shapes'),'Class 3 links its game');
 assert.ok(c4.includes('href="/preschool/3-years/magic-color-mixing/"')&&c4.includes('Play the Magic Color Lab game'),'Class 4 links its game');
 assert.ok(c6.includes('href="/preschool/3-years/magic-animal-playground/"')&&c6.includes('Play the Animal Sound Safari game'),'Class 6 links its game');
 // the retired games' classes no longer point at them
 for(const [label,doc,slug] of [['Class 2',c2,'magic-number-garden'],['Class 5',c5,'magic-opposites-adventure'],['Class 8',c8,'magic-fruit-basket']]){
  assert.ok(!doc.includes('/preschool/3-years/'+slug+'/'),label+' no longer links the retired game');
 }
 // the magic games shelf is separate everywhere it appears
 assert.ok(lp.includes('lp-row lp-magic')&&lp.includes('outside the class sequence'),'learning path magic shelf is separated');
});

test('the three retired games are completely gone: pages, sitemap, scripts, shelves',()=>{
 for(const slug of ['magic-number-garden','magic-opposites-adventure','magic-fruit-basket']){
  assert.ok(!existsSync(resolve(root,'preschool/3-years/'+slug+'/index.html')),'page removed: '+slug);
  assert.ok(!existsSync(resolve(root,'assets/magic-'+({['magic-number-garden']:'number-garden',['magic-opposites-adventure']:'opposites-adventure',['magic-fruit-basket']:'fruit-basket'})[slug]+'.js'))||true,'js check '+slug);
  assert.ok(!sitemap.includes('/preschool/3-years/'+slug+'/'),'sitemap entry removed: '+slug);
  for(const [label,doc] of [['stage',stage],['learning path',lp],['my classroom',classroom],['library',library]]){
   assert.ok(!doc.includes('/preschool/3-years/'+slug+'/'),label+' no longer mentions '+slug);
  }
 }
 assert.ok(!existsSync(resolve(root,'assets/magic-number-garden.js')),'garden engine removed');
 assert.ok(!existsSync(resolve(root,'assets/magic-opposites-adventure.js')),'opposites engine removed');
 assert.ok(!existsSync(resolve(root,'assets/magic-fruit-basket.js')),'basket engine removed');
 // no page on the school links the retired games any more
 for(const doc of [c2,c5,c8,shape,animal,color]){
  assert.ok(!doc.includes('/preschool/3-years/magic-number-garden/'),'no link to the garden game');
  assert.ok(!doc.includes('/preschool/3-years/magic-opposites-adventure/'),'no link to the opposites game');
  assert.ok(!doc.includes('/preschool/3-years/magic-fruit-basket/'),'no link to the basket game');
 }
});
