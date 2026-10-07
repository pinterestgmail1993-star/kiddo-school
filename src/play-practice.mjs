// Kiddo School — Play & Practice: three real toddler games built only from
// existing Kiddo.school learning cards. Every image keeps its true pixel
// dimensions from the lesson data, so nothing is ever cropped or stretched.
import {csLesson,anLesson,vhLesson,fwfhLesson} from './lessons.mjs';
export const playBase='/toddler/2-years/play-and-practice/';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const crumbs=(parts)=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${href}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
const bcSchema=(site,parts)=>({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[['Home','/'],...parts].map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:site+path}))});

const SETS={
 an:{lesson:anLesson,names:['Dog','Cat','Cow','Duck','Sheep','Pig','Horse','Chicken','Rooster','Frog','Lion','Elephant','Monkey','Owl','Bee','Snake','Mouse','Donkey','Goat','Bird']},
 cs:{lesson:csLesson,names:['Red','Blue','Yellow','Green','Orange','Purple','Pink','Black','Circle','Square','Triangle','Rectangle','Star','Heart','Oval']},
 vh:{lesson:vhLesson,names:null}, // vehicle cards carry their own name
 fwfh:{lesson:fwfhLesson,names:['Apple','Banana','Orange','Milk cup','Bread','Egg','Cup','Spoon','Shoe','Sock','Chair','Bed']}
};
export const cardOf=(set,order)=>{
 const S=SETS[set];const c=S.lesson.cards[order-1];
 return {file:c.file,w:c.w,h:c.h,alt:c.alt,name:S.names?S.names[order-1]:c.name,src:S.lesson.r2Base+S.lesson.folder+c.file};
};
const imgOf=c=>`<img src="${c.src}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy">`;

/* Round configurations — target file + three choices, correct answer at a
   varying position. Ten configs; a play session uses five of them. */
const MATCH=[['vh',1,[1,2,9]],['vh',2,[4,2,8]],['vh',9,[15,17,9]],['an',1,[1,2,3]],['an',4,[6,4,5]],['an',12,[11,10,12]],['cs',1,[1,2,3]],['cs',9,[10,9,11]],['fwfh',2,[1,4,2]],['fwfh',1,[1,5,6]]];
const DIFF=[['an',1,2],['an',4,3],['an',5,6],['vh',1,2],['vh',9,8],['vh',15,17],['cs',1,2],['cs',9,11],['cs',13,14],['fwfh',1,2]];

function gameCrumbs(){return [['Toddler','/toddler/'],['Age 2','/toddler/2-years/'],['Play & Practice',playBase]];}

/* ------------------------------------------------------ PLAY & PRACTICE */
export const playHub={
 path:playBase,
 seoTitle:'Learning Games for 2-Year-Olds',
 title:'Learning Games for 2-Year-Olds',
 h1:'Play & Practice',
 description:'Three gentle learning games for 2-year-olds: matching, sorting and spot-the-different, made with the familiar Kiddo School learning cards. Play together — no scores, no pressure.',
 eyebrow:'AT THE TOY SHELF · AGE 2',
 intro:'Pick a game!',
 games:[
  {href:'match-it/',name:'Match It',say:'Find the same one.',tile:'pp-tile-match'},
  {href:'sort-it/',name:'Sort It',say:'Put things together.',tile:'pp-tile-sort'},
  {href:'whats-different/',name:'What’s Different?',say:'Find the one that’s different.',tile:'pp-tile-diff'}
 ]
};
const gameTile=tile=>tile==='pp-tile-match'
 ?'<svg viewBox="0 0 120 90" width="120" height="90" focusable="false" aria-hidden="true"><circle cx="38" cy="45" r="22" fill="#c9452c"/><circle cx="82" cy="45" r="22" fill="none" stroke="#c9452c" stroke-width="6" stroke-dasharray="1 12" stroke-linecap="round"/></svg>'
 :tile==='pp-tile-sort'
 ?'<svg viewBox="0 0 120 90" width="120" height="90" focusable="false" aria-hidden="true"><rect x="12" y="52" width="42" height="26" rx="5" fill="none" stroke="#33628c" stroke-width="5"/><rect x="66" y="52" width="42" height="26" rx="5" fill="none" stroke="#4a7c3f" stroke-width="5"/><circle cx="33" cy="28" r="13" fill="#33628c"/><path d="M87 15 74 40h26z" fill="#4a7c3f"/></svg>'
 :'<svg viewBox="0 0 120 90" width="120" height="90" focusable="false" aria-hidden="true"><circle cx="30" cy="40" r="17" fill="#dda233"/><circle cx="64" cy="40" r="17" fill="#dda233"/><path d="M92 24 105 56H79z" fill="#33628c"/></svg>';
export function playHubBody(H){
 return `${crumbs([['Toddler','/toddler/'],['Age 2','/toddler/2-years/'],['Play & Practice',null]])}
 <section class="wrap section compact"><span class="eyebrow">${H.eyebrow}</span>
 <h1>${esc(H.h1)}</h1>
 <p class="mw-lede">${H.intro}</p>
 <div class="pp-choices">
  ${H.games.map(g=>`<a class="mw-choice" href="${playBase}${g.href}"><span class="mw-tile ${g.tile}" aria-hidden="true">${gameTile(g.tile)}</span>
  <span class="mw-choice-copy"><strong>${esc(g.name)}</strong><span>${g.say}</span></span>
  <span class="fc-open">Play <span aria-hidden="true">↗</span></span></a>`).join('\n  ')}
 </div>
 <p class="fc-hint">Grown-ups read the words. Little ones do the rest.</p>
 <div class="hero-actions"><a class="button button-ghost" href="/my-classroom/">Back to My Classroom</a></div>
 </section>`;
}

/* -------------------------------------------------------------- MATCH IT */
export const matchIt={
 path:playBase+'match-it/',
 seoTitle:'Matching Game for 2-Year-Olds',
 title:'Matching Game for 2-Year-Olds',
 h1:'Match It',
 description:'A gentle matching game for 2-year-olds: find the same picture among three big choices, using the familiar Kiddo School animal, vehicle, color and everyday-object cards.',
 eyebrow:'PLAY & PRACTICE · MATCH IT',
 ask:'Find the same one.',
 found:'You found it!',
 again:'Look again.',
 done:'Nice playing!'
};
export function matchItBody(M){
 const rounds=MATCH.map(([set,t,choices],i)=>{
  const target=cardOf(set,t);
  const opts=choices.map(o=>({card:cardOf(set,o),correct:o===t}));
  return `<section class="pp-round" data-round${i===0?'':' hidden'} aria-label="Round ${i+1}">
   <p class="pp-ask">${M.ask}</p>
   <div class="pp-target"><figure class="pp-card">${imgOf(target)}</figure></div>
   <div class="pp-choices-row">
    ${opts.map(o=>`<button type="button" class="pp-choice" data-pp-choice${o.correct?' data-pp-correct':''} aria-label="${esc(o.card.name)}"${i===0?'':' disabled'}>${imgOf(o.card)}</button>`).join('')}
   </div>
  </section>`;
 }).join('\n');
 return `${crumbs([...gameCrumbs(),['Match It',null]])}
 <section class="wrap section compact"><span class="eyebrow">${M.eyebrow}</span>
 <h1>${esc(M.h1)}</h1>
 <p class="fc-hint">Grown-ups read the words. Little ones tap the picture.</p>
 <div class="pp-game" data-pp-game="match">
  <p class="mw-live" data-pp-live aria-live="polite"></p>
  <p class="pp-count" data-pp-count hidden>Round 1 of 5</p>
  ${rounds}
  <div class="pp-next"><button type="button" class="button" data-pp-next hidden>Next</button></div>
  <div class="mw-panel" data-pp-complete hidden>
   <p class="mw-cheer">Nice playing!</p>
   <div class="hero-actions"><button type="button" class="button" data-pp-replay>Play Again</button>
   <a class="button button-ghost" href="${playBase}">Choose Another Game</a>
   <a class="button button-ghost" href="/my-classroom/">Back to My Classroom</a></div>
  </div>
 </section>
 <p class="fc-hint">More matching lives in the <a href="${csLesson.path}">Colors &amp; Shapes</a> and <a href="${anLesson.path}">Animals &amp; Sounds</a> classes.</p>
 </section>`;
}

/* --------------------------------------------------------------- SORT IT */
const SORT=[
 {a:{label:'Animals',set:'an',order:3},b:{label:'Vehicles',set:'vh',order:1},
  items:[['an',1],['vh',1],['an',3],['vh',2],['an',12],['vh',9]]},
 {a:{label:'Food',set:'fwfh',order:1},b:{label:'Animals',set:'an',order:1},
  items:[['fwfh',1],['an',2],['fwfh',5],['an',4],['fwfh',6],['an',20]]},
 {a:{label:'Circles',set:'cs',order:9},b:{label:'Triangles',set:'cs',order:11},
  items:[['cs',9],['cs',11],['cs',9],['cs',11]]}
];
export const sortIt={
 path:playBase+'sort-it/',
 seoTitle:'Sorting Game for 2-Year-Olds',
 title:'Sorting Game for 2-Year-Olds',
 h1:'Sort It',
 description:'A first sorting game for 2-year-olds: put each picture with its group — animals or vehicles, food or animals, circles or triangles. Drag or tap, with big friendly cards.',
 eyebrow:'PLAY & PRACTICE · SORT IT',
 ask:'Where does it go?',
 done:'Nice playing!'
};
export function sortItBody(S){
 const zone=(z,cls)=>{const c=cardOf(z.set,z.order);return `<div class="pp-zone ${cls}" data-pp-zone="${esc(z.label)}">
   <figure class="pp-zone-thumb">${imgOf(c)}</figure><span class="pp-zone-label">${esc(z.label)}</span></div>`;};
 const rounds=SORT.map((r,i)=>{
  const a=cardOf(r.a.set,r.a.order),b=cardOf(r.b.set,r.b.order);
  const items=r.items.map(([set,o],j)=>{const c=cardOf(set,o);
   const group=set===r.a.set&&o===r.a.order?'a':set===r.b.set&&o===r.b.order?'b':set===r.a.set?'a':'b';
   return `<button type="button" class="pp-item" data-pp-item="${esc(c.name)}" data-pp-group="${group}" aria-label="${esc(c.name)}"${j===0?'':' hidden'}>${imgOf(c)}</button>`;}).join('');
  return `<section class="pp-round" data-round data-sort-round="${esc(r.a.label)}|${esc(r.b.label)}"${i===0?'':' hidden'} aria-label="Sorting round ${i+1}: ${esc(r.a.label)} and ${esc(r.b.label)}">
   <p class="pp-ask">${S.ask}</p>
   <div class="pp-zones">${zone(r.a,'pp-zone-a')}${zone(r.b,'pp-zone-b')}</div>
   <div class="pp-tray"><div class="pp-item-slot" data-pp-slot>${items}</div></div>
  </section>`;
 }).join('\n');
 return `${crumbs([...gameCrumbs(),['Sort It',null]])}
 <section class="wrap section compact"><span class="eyebrow">${S.eyebrow}</span>
 <h1>${esc(S.h1)}</h1>
 <p class="fc-hint">Drag the picture into its group — or tap the picture, then tap the group.</p>
 <div class="pp-game" data-pp-game="sort">
  <p class="mw-live" data-pp-live aria-live="polite"></p>
  <p class="pp-count" data-pp-count hidden>Round 1 of ${SORT.length}</p>
  ${rounds}
  <div class="pp-next"><button type="button" class="button" data-pp-next hidden>Next</button></div>
  <div class="mw-panel" data-pp-complete hidden>
   <p class="mw-cheer">Nice playing!</p>
   <div class="hero-actions"><button type="button" class="button" data-pp-replay>Play Again</button>
   <a class="button button-ghost" href="${playBase}">Choose Another Game</a>
   <a class="button button-ghost" href="/my-classroom/">Back to My Classroom</a></div>
  </div>
 </section>
 <p class="fc-hint">Sorting grows out of the <a href="${csLesson.path}">Colors &amp; Shapes</a> and <a href="${fwfhLesson.path}">First Words: Food &amp; Home</a> classes.</p>
 </section>`;
}

/* ------------------------------------------------------- WHAT'S DIFFERENT */
export const whatsDifferent={
 path:playBase+'whats-different/',
 seoTitle:'What’s Different? Toddler Game',
 title:'What’s Different? Toddler Game',
 h1:'What’s Different?',
 description:'A same-and-different game for 2-year-olds: three big pictures, two the same and one clearly different, made with familiar Kiddo School learning cards.',
 eyebrow:'PLAY & PRACTICE · WHAT’S DIFFERENT?',
 ask:'Which one is different?',
 found:'You found the different one!',
 again:'Look again.',
 done:'Nice playing!'
};
export function whatsDifferentBody(W){
 const rounds=DIFF.map(([set,same,odd],i)=>{
  const pics=[same,same,odd].map(o=>({card:cardOf(set,o),odd:o===odd}));
  // vary which slot the different one sits in
  const slots=[[0,1,2],[1,2,0],[2,0,1]][i%3];
  const ordered=slots.map(s=>pics[s]);
  return `<section class="pp-round" data-round${i===0?'':' hidden'} aria-label="Round ${i+1}">
   <p class="pp-ask">${W.ask}</p>
   <div class="pp-choices-row">
    ${ordered.map(p=>`<button type="button" class="pp-choice" data-pp-choice${p.odd?' data-pp-different':''} aria-label="${esc(p.card.name)}"${i===0?'':' disabled'}>${imgOf(p.card)}</button>`).join('')}
   </div>
  </section>`;
 }).join('\n');
 return `${crumbs([...gameCrumbs(),['What’s Different?',null]])}
 <section class="wrap section compact"><span class="eyebrow">${W.eyebrow}</span>
 <h1>${esc(W.h1)}</h1>
 <p class="fc-hint">Two pictures are the same. One is different.</p>
 <div class="pp-game" data-pp-game="diff">
  <p class="mw-live" data-pp-live aria-live="polite"></p>
  <p class="pp-count" data-pp-count hidden>Round 1 of 5</p>
  ${rounds}
  <div class="pp-next"><button type="button" class="button" data-pp-next hidden>Next</button></div>
  <div class="mw-panel" data-pp-complete hidden>
   <p class="mw-cheer">Nice playing!</p>
   <div class="hero-actions"><button type="button" class="button" data-pp-replay>Play Again</button>
   <a class="button button-ghost" href="${playBase}">Choose Another Game</a>
   <a class="button button-ghost" href="/my-classroom/">Back to My Classroom</a></div>
  </div>
 </section>
 <p class="fc-hint">Same and different starts in the <a href="/toddler/2-years/matching-and-sorting/">Matching &amp; Sorting</a> class.</p>
 </section>`;
}
export {bcSchema};
