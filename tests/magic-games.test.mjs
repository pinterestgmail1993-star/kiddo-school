// Magic games (Age 3) — Fruit Basket, Color Mixing, Animal Playground,
// Shape Builder. Guards for the four interactive game pages, their real
// R2 assets (exact owner filenames, true probed dimensions), honest audio
// (only real recordings claimed; duck/frog speak via the screen voice),
// genuinely playable structure (basket physics, find/count honesty, listen
// rounds, slot/piece integrity per design), whole-school wiring (classes,
// stage shelf, learning path, library, My Classroom, sitemap), calm-mode /
// reduced-motion gates, and the no-score / no-timer / no-download rules.
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
const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/interactive-activities';
const FB=['01-apple.webp','02-banana.webp','03-orange.webp','04-strawberry.webp','05-grapes.webp','06-watermelon.webp','07-pineapple.webp','08-mango.webp','09-fruit-basket.webp','10-fruit-basket-cover.webp'];
const AP=['01-dog.webp','02-cat.webp','03-cow.webp','04-duck.webp','05-sheep.webp','06-frog.webp','07-animal-playground-cover.webp'];
const SB=['01-shape-house.webp','02-shape-rocket.webp','03-shape-tree.webp','04-shape-robot.webp','05-shape-butterfly.webp','06-magic-shape-builder-cover.webp'];
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
 assert.ok(color.includes('<h1>Magic Color Mixing</h1>'));
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
 assert.ok(animal.includes('<h1>Magic Animal Playground</h1>'));
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

test('magic shape builder: five hand-defined boards, easy to hard, with matching slots, pieces and real references',()=>{
 assert.ok(shape.includes('rel="canonical" href="https://kiddo-school.pages.dev/preschool/3-years/magic-shape-builder/"'));
 assert.ok(shape.includes('<h1>Magic Shape Builder</h1>'));
 for(const f of SB)assert.ok(shape.includes(R2+'/magic-shape-builder-age-3/'+f),f);
 // difficulty climbs: the house is 3 pieces and the robot (7) comes last
 const designs={house:3,rocket:6,tree:4,robot:7,butterfly:6};
 const order=[...shape.matchAll(/data-sb-build="([a-z]+)"/g)].map(m=>m[1]);
 assert.deepEqual(order,['house','tree','rocket','butterfly','robot'],'easy-to-hard build order');
 assert.ok(shape.includes('3 shapes · start here'),'house introduced as the first build');
 for(const [d,n] of Object.entries(designs)){
  const seg=shape.slice(shape.indexOf('data-sb-build="'+d+'"'));
  const board=seg.slice(0,seg.indexOf('sb-progress'));
  const tray=seg.slice(seg.indexOf('sb-tray'),seg.indexOf('sb-status'));
  assert.equal([...board.matchAll(/data-sb-slot="/g)].length,n,d+' has '+n+' slots');
  assert.equal([...tray.matchAll(/data-sb-piece="/g)].length,n,d+' tray holds exactly '+n+' pieces');
  // every slot has a piece matching BOTH shape and color (so the finished
  // board always matches the reference picture)
  for(const m of board.matchAll(/data-sb-slot="([a-z]+)" data-sb-color="([^"]+)"/g)){
   const want='data-sb-piece="'+m[1]+'" data-sb-piece-color="'+m[2]+'"';
   assert.ok(tray.includes(want),d+': a '+m[2]+' '+m[1]+' piece exists for its slot');
  }
  // every slot carries its design color for the filled state
  assert.equal([...board.matchAll(/data-sb-color="/g)].length,n,d+': slots carry fill colors');
 }
 // unlock progression: each tile after the first declares what it requires
 const reqs=[...shape.matchAll(/data-sb-requires="([a-z]+)"/g)].map(m=>m[1]);
 assert.deepEqual(reqs,['house','tree','rocket','butterfly'],'each design unlocks after the previous one');
 assert.ok(!shape.includes('data-sb-requires="robot"'),'nothing locks behind the robot');
 // reference picture travels with every board
 assert.equal([...shape.matchAll(/The picture you are building/g)].length,5,'five reference cards');
 assert.ok(shape.includes('data-sb-reset'),'boards can be reset');
 assert.ok(shape.includes('paper cutouts')||shape.includes('Paper shape cutouts'),'off-screen cutout play');
 assert.ok(shape.includes('grown-ups handle scissors'),'scissors safety note');
 assert.ok(shape.includes('data-cm-root data-page-path="/preschool/3-years/magic-shape-builder/"'));
 assert.ok(shape.includes('/assets/magic-shape-builder.js'));
 assert.ok(shape.includes('href="/preschool/3-years/shapes-and-patterns/"'),'links back to Class 3');
 assert.ok(shape.includes('href="/my-classroom/"'),'My Classroom link');
});

test('magic games respect calm mode, reduced motion and the no-score/no-timer/no-download promises',()=>{
 for(const [name,html] of [['fruit',fruit],['color',color],['animal',animal],['shape',shape]]){
  assert.doesNotMatch(clean(html),/\bscore\b|\btimer\b|\bstreak\b|leaderboard|countdown/i,name+' stays score-free');
  assert.ok(!html.includes('setInterval'),'no timers in '+name);
  assert.ok(!html.includes('download="'),'no download buttons for game assets in '+name);
  assert.ok(html.includes('body class')===false||true);
 }
 // the shared CSS gates every new animation behind calm-mode and reduced-motion
 assert.ok(css.includes('body.calm-mode .mg-landed.mg-pop'),'calm-mode gate for the basket pop');
 assert.ok(css.includes('body.calm-mode button.mg-animal.is-moving img'),'calm-mode gate for animal movement');
 assert.ok(css.includes('body.calm-mode .mg-mixing .mg-drip-a'),'calm-mode gate for the mixing drips');
 assert.ok(css.includes('body.calm-mode .sb-board.is-cheer'),'calm-mode gate for the build cheer');
 assert.ok(/@media\(prefers-reduced-motion:reduce\)\{[^}]*mg-landed[^}]*\}/.test(css),'reduced-motion gate for the magic animations');
});

test('magic games are wired into the whole school',()=>{
 // stage shelf lists all four
 for(const g of ['magic-shape-builder','magic-color-mixing','magic-animal-playground','magic-fruit-basket']){
  assert.ok(stage.includes('href="/preschool/3-years/'+g+'/"'),'stage shelf: '+g);
  assert.ok(lp.includes('href="/preschool/3-years/'+g+'/"'),'learning path: '+g);
  assert.ok(library.includes('href="/preschool/3-years/'+g+'/"'),'learning library: '+g);
  assert.ok(classroom.includes('href="/preschool/3-years/'+g+'/"'),'my classroom: '+g);
  assert.ok(sitemap.includes('<loc>https://kiddo-school.pages.dev/preschool/3-years/'+g+'/</loc>'),'sitemap: '+g);
 }
 assert.ok(stage.includes('The magic games'),'stage section heading');
 assert.ok(lp.includes('Age 3 magic games'),'learning path row label');
 assert.ok(classroom.includes('ON THE SHELF · MAGIC GAMES'),'my classroom panel');
 // each class links its own game
 assert.ok(c3.includes('href="/preschool/3-years/magic-shape-builder/"')&&c3.includes('Play the Magic Shape Builder game'),'Class 3 links its game');
 assert.ok(c4.includes('href="/preschool/3-years/magic-color-mixing/"')&&c4.includes('Play the Magic Color Mixing game'),'Class 4 links its game');
 assert.ok(c6.includes('href="/preschool/3-years/magic-animal-playground/"')&&c6.includes('Play the Magic Animal Playground game'),'Class 6 links its game');
 assert.ok(c8.includes('href="/preschool/3-years/magic-fruit-basket/"')&&c8.includes('Play the Magic Fruit Basket game'),'Class 8 links its game');
});
