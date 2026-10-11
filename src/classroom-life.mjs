// Kiddo School — classroom life: Our Classroom (the class-rules poster: seven
// tiny practice activities), Let's Explore (the door: eight real-world
// missions that send families AWAY from the screen) and the Sticky Note Wall
// (the notice wall: CSS-built notes + a parent submission form).
// Everything here is practice together — no scores, no behavior grading.
export const ourClassroomBase='/toddler/2-years/our-classroom/';
export const exploreBase='/toddler/2-years/lets-explore/';
export const wallBase='/sticky-note-wall/';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const crumbs=(parts)=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${href}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
const bcSchema=(site,parts)=>({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[['Home','/'],...parts].map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:site+path}))});
const age2Crumbs=[['Toddler','/toddler/'],['Age 2','/toddler/2-years/']];
const say=(line,who)=>`<div class="ct-sayblock"><p class="ct-say">“${line}”</p>${who?'<p class="ct-who">'+who+'</p>':''}</div>`;
const completeRow=()=>`<div class="oc-complete" data-oc-complete hidden><p class="mw-cheer">Nice practice!</p>
 <div class="hero-actions"><button type="button" class="button" data-oc-tryanother hidden>Try Another</button>
 <a class="button button-ghost" href="/my-classroom/">Back to My Classroom</a></div></div>`;

/* ---------------------------------------------------------- OUR CLASSROOM */
const RULES=[
 {id:'listen',name:'We Listen',tile:'oc-ic-listen'},
 {id:'kind',name:'We Are Kind',tile:'oc-ic-kind'},
 {id:'turns',name:'We Take Turns',tile:'oc-ic-turns'},
 {id:'gentle',name:'Gentle Hands',tile:'oc-ic-gentle'},
 {id:'tidy',name:'We Tidy Up',tile:'oc-ic-tidy'},
 {id:'help',name:'We Help',tile:'oc-ic-help'},
 {id:'together',name:'We Try Together',tile:'oc-ic-together'}
];
const ruleIcon=tile=>{
 const art={
  'oc-ic-listen':'<path d="M28 52c0-10 7-16 16-16s16 6 16 16" fill="none" stroke="#33628c" stroke-width="6" stroke-linecap="round"/><circle cx="44" cy="58" r="5" fill="#33628c"/>',
  'oc-ic-kind':'<path d="M44 70C30 58 22 50 22 40a12 12 0 0 1 22-6 12 12 0 0 1 22 6c0 10-8 18-22 30z" fill="#c9452c"/>',
  'oc-ic-turns':'<circle cx="30" cy="45" r="15" fill="#dda233"/><path d="M60 45a15 15 0 1 1 15 15" fill="none" stroke="#4a7c3f" stroke-width="6" stroke-linecap="round"/>',
  'oc-ic-gentle':'<circle cx="44" cy="44" r="17" fill="#d9a066"/><circle cx="38" cy="41" r="2.6" fill="#343b30"/><circle cx="50" cy="41" r="2.6" fill="#343b30"/><path d="M38 50c4 3 8 3 12 0" fill="none" stroke="#343b30" stroke-width="2.4" stroke-linecap="round"/><circle cx="62" cy="30" r="4.5" fill="#c9452c"/>',
  'oc-ic-tidy':'<rect x="20" y="46" width="48" height="22" rx="5" fill="none" stroke="#33628c" stroke-width="5"/><circle cx="34" cy="34" r="8" fill="#dda233"/><rect x="52" y="26" width="14" height="14" rx="3" fill="#4a7c3f"/>',
  'oc-ic-help':'<path d="M24 60c6-8 14-8 20 0 6-8 14-8 20 0" fill="none" stroke="#c9452c" stroke-width="6" stroke-linecap="round"/><path d="M22 36h44" stroke="#8a8f7a" stroke-width="5" stroke-linecap="round"/>',
  'oc-ic-together':'<circle cx="28" cy="42" r="11" fill="#33628c"/><circle cx="60" cy="42" r="11" fill="#4a7c3f"/><path d="M39 42h10" stroke="#8a8f7a" stroke-width="4" stroke-linecap="round"/>'
 }[tile];
 return `<svg viewBox="0 0 88 88" width="76" height="76" focusable="false" aria-hidden="true"><circle cx="44" cy="44" r="41" fill="#fffdf5" stroke="#ccc5b5" stroke-width="2"/>${art}</svg>`;
};
export const ourClassroom={
 path:ourClassroomBase,
 seoTitle:'Our Classroom — Simple Activities for 2-Year-Olds',
 title:'Our Classroom — Simple Activities for 2-Year-Olds',
 h1:'Our Classroom',
 description:'Practice listening, taking turns, helping and tidying up with simple parent-and-toddler activities in the Kiddo School classroom.',
 eyebrow:'ON THE WALL · CLASS RULES',
 intro:'We learn and play together.',
 practice:'Let’s practice!',
 rules:RULES,
 listenPrompts:['Clap your hands.','Touch your head.','Wave hello.'],
 kindSituations:[
  {situ:'Someone drops a toy.',ask:'What can we do?',good:'Help pick it up',other:'Walk away',goodSay:'That was helpful.',otherSay:'We can help.'},
  {situ:'Someone feels sad.',ask:'What can we do?',good:'Sit with them',other:'Take their toy',goodSay:'That can be kind.',otherSay:'We can help.'}
 ],
 turnsSay:['Your turn!','Grown-up’s turn!'],
 gentleSay:'Pat the teddy gently.',
 gentleDone:'Soft and gentle.',
 tidyAsk:'Where do the toys go?',
 tidyDone:'All tidy!',
 helpAsk:'Can you help put the books away?',
 helpDone:'Thanks for helping!',
 patterns:[['👏','👋','👏'],['👋','👏','👏']],
 patternSay:['Clap, wave, clap!','Wave, clap, clap!'],
 togetherDone:'We tried together!',
 allDone:'We learned and played together!'
};
export function ourClassroomBody(O){
 const chooser=RULES.map(r=>`<button type="button" class="oc-rule" data-oc-open="${r.id}"><span class="oc-rule-icon">${ruleIcon(r.tile)}</span><span class="mw-choice-copy"><strong>${r.name}</strong></span></button>`).join('');
 const act=(id,body)=>`<section class="oc-act" id="oc-${id}" data-oc-act="${id}" aria-label="${esc(RULES.find(r=>r.id===id).name)}">${body}${completeRow()}</section>`;
 const sections=
  act('listen',`<h2>We Listen</h2><p class="oc-ask">Listen and do!</p>
   <div class="oc-seq">${O.listenPrompts.map((p,i)=>`<div class="oc-step" data-oc-step${i===0?'':' hidden'}><p class="ct-big">${p}</p><div class="ct-actions"><button type="button" class="button" data-oc-did${i===0?'':' hidden'}>I Did It!</button></div></div>`).join('')}</div>`)
 +act('kind',`<h2>We Are Kind</h2>${O.kindSituations.map((s,i)=>`
   <div class="oc-kindstep" data-oc-kindstep${i===0?'':' hidden'}>
    <p class="oc-ask">${s.situ}</p><p class="ct-big">${s.ask}</p>
    <div class="oc-choices"><button type="button" class="button" data-oc-kindgood data-say="${s.goodSay}" hidden>${s.good}</button>
    <button type="button" class="button button-ghost" data-oc-kindother data-say="${s.otherSay}" hidden>${s.other}</button></div>
    <p class="mw-live" data-oc-kindsay aria-live="polite"></p>
    <button type="button" class="button" data-oc-kindnext hidden>Next</button>
   </div>`).join('')}`)
 +act('turns',`<h2>We Take Turns</h2><p class="oc-ask">Take turns with your grown-up. Tap the ball when it is your turn.</p>
   <p class="oc-turnsay mw-live" data-oc-turnsay aria-live="polite">Your turn!</p>
   <button type="button" class="oc-ball" data-oc-ball aria-label="The turn ball. Tap it."><span class="oc-ball-inner"></span></button>`)
 +act('gentle',`<h2>Gentle Hands</h2><p class="oc-ask">${O.gentleSay}</p>
   <button type="button" class="oc-teddy" data-oc-teddy aria-label="Pat the teddy gently">
    <svg viewBox="0 0 120 110" width="170" height="156" focusable="false" aria-hidden="true">
     <circle cx="30" cy="26" r="13" fill="#c9a077"/><circle cx="90" cy="26" r="13" fill="#c9a077"/>
     <circle cx="60" cy="46" r="34" fill="#d9b68c"/><circle cx="48" cy="40" r="4" fill="#343b30"/><circle cx="72" cy="40" r="4" fill="#343b30"/>
     <ellipse cx="60" cy="52" rx="9" ry="7" fill="#f4efe3"/><path d="M60 49v5" stroke="#343b30" stroke-width="2" stroke-linecap="round"/>
     <ellipse cx="60" cy="92" rx="30" ry="22" fill="#d9b68c"/>
     <path class="oc-heart" data-oc-heart x="0" d="M92 84c-6-5-10-9-10-14a6 6 0 0 1 10-3 6 6 0 0 1 10 3c0 5-4 9-10 14z" fill="#c9452c"/>
    </svg></button>
   <p class="mw-live" data-oc-gentlesay aria-live="polite"></p>`)
 +act('tidy',`<h2>We Tidy Up</h2><p class="oc-ask">${O.tidyAsk}</p>
   <div class="oc-room"><div class="oc-boxzone" data-oc-zone="box" aria-label="The toy box. Put toys here.">
     <span class="oc-boxlabel">Toy box</span></div>
    <div class="oc-toys">
     ${['Ball','Block','Teddy'].map((n,i)=>`<button type="button" class="oc-toy" data-oc-toy="${n}" aria-label="${n}. Put me in the toy box.">
      ${i===0?'<svg viewBox="0 0 60 60" width="60" height="60" focusable="false" aria-hidden="true"><circle cx="30" cy="30" r="22" fill="#c9452c"/><path d="M14 22a22 22 0 0 1 32 0" fill="#f4efe3"/></svg>'
       :i===1?'<svg viewBox="0 0 60 60" width="60" height="60" focusable="false" aria-hidden="true"><rect x="12" y="12" width="36" height="36" rx="5" fill="#33628c"/><rect x="12" y="26" width="36" height="8" fill="#f4efe3"/></svg>'
       :'<svg viewBox="0 0 60 60" width="60" height="60" focusable="false" aria-hidden="true"><circle cx="30" cy="24" r="16" fill="#d9b68c"/><circle cx="25" cy="22" r="2.4" fill="#343b30"/><circle cx="35" cy="22" r="2.4" fill="#343b30"/><ellipse cx="30" cy="46" rx="15" ry="11" fill="#d9b68c"/></svg>'}
     </button>`).join('')}
    </div></div>
   <p class="mw-live" data-oc-tidysay aria-live="polite"></p>
   <p class="fc-hint">Drag a toy into the box — or tap the toy, then tap the box.</p>`)
 +act('help',`<h2>We Help</h2><p class="oc-ask">${O.helpAsk}</p>
   <div class="oc-room"><div class="oc-shelfzone" data-oc-zone="shelf" aria-label="The bookshelf. Put books here.">
     <span class="oc-boxlabel">Bookshelf</span></div>
    <div class="oc-toys">
     ${['Red book','Blue book','Green book'].map((n,i)=>`<button type="button" class="oc-toy" data-oc-toy="${n}" aria-label="${n}. Put me on the bookshelf.">
      <svg viewBox="0 0 60 60" width="60" height="60" focusable="false" aria-hidden="true"><rect x="16" y="10" width="28" height="40" rx="3" fill="${['#c9452c','#33628c','#4a7c3f'][i]}"/><rect x="22" y="16" width="16" height="4" rx="2" fill="#f4efe3"/></svg>
     </button>`).join('')}
    </div></div>
   <p class="mw-live" data-oc-helpsay aria-live="polite"></p>
   <p class="fc-hint">Drag a book to the shelf — or tap the book, then tap the shelf.</p>`)
 +act('together',`<h2>We Try Together</h2><p class="oc-ask">Make this pattern together.</p>
   <div class="oc-pattern" data-oc-pattern aria-hidden="true"></div>
   <p class="ct-big" data-oc-patternsay>${O.patternSay[0]}</p>
   <div class="ct-actions"><button type="button" class="button button-ghost" data-oc-againpat hidden>Again</button></div>`);
 return `${crumbs([...age2Crumbs,['Our Classroom',null]])}
 <section class="wrap section compact"><span class="eyebrow">${O.eyebrow}</span>
 <h1>${esc(O.h1)}</h1>
 ${say(O.intro,'— Your Kiddo School teacher')}
 <p class="mw-lede">${O.practice}</p>
 <p class="fc-hint">Grown-ups read the words. Practice together — every little try counts.</p>
 <p class="mw-live" data-oc-live aria-live="polite"></p>
 <p class="oc-alldone" data-oc-alldone hidden>${O.allDone}</p>
 <div class="oc-grid" data-oc-grid>${chooser}</div>
 ${sections}
 </section>`;
}

/* ----------------------------------------------------------- LET'S EXPLORE */
const MISSIONS=[
 {id:'color',name:'Color Hunt',say:'Find colors around you.',tile:'le-ic-color'},
 {id:'shape',name:'Shape Hunt',say:'Find shapes around you.',tile:'le-ic-shape'},
 {id:'sound',name:'Sound Hunt',say:'Listen carefully.',tile:'le-ic-sound'},
 {id:'size',name:'Big & Small Hunt',say:'Find big and little things.',tile:'le-ic-size'},
 {id:'soft',name:'Find Something Soft',say:'Feel something cozy.',tile:'le-ic-soft'},
 {id:'animal',name:'Animal Hunt',say:'Spot an animal.',tile:'le-ic-animal'},
 {id:'move',name:'Move Like an Animal',say:'Stomp, hop and stretch.',tile:'le-ic-move'},
 {id:'outside',name:'Look Outside',say:'Peek out the window.',tile:'le-ic-outside'}
];
const missionIcon=tile=>{
 const art={
  'le-ic-color':'<circle cx="34" cy="42" r="16" fill="#c9452c"/><circle cx="62" cy="42" r="16" fill="#33628c"/>',
  'le-ic-shape':'<circle cx="30" cy="44" r="14" fill="none" stroke="#dda233" stroke-width="6"/><path d="M62 30 78 58H46z" fill="none" stroke="#33628c" stroke-width="6" stroke-linejoin="round"/>',
  'le-ic-sound':'<path d="M30 54c8-16 30-16 38 0" fill="none" stroke="#4a7c3f" stroke-width="6" stroke-linecap="round"/><circle cx="49" cy="34" r="6" fill="#dda233"/>',
  'le-ic-size':'<circle cx="36" cy="46" r="18" fill="#33628c"/><circle cx="70" cy="52" r="9" fill="#dda233"/>',
  'le-ic-soft':'<path d="M26 52a10 10 0 0 1 2-19 12 12 0 0 1 23-3 10 10 0 0 1 13 10 9 9 0 0 1-4 12z" fill="#fffdf5" stroke="#8a8f7a" stroke-width="4"/>',
  'le-ic-animal':'<ellipse cx="38" cy="52" rx="9" ry="11" fill="#d9a066"/><ellipse cx="58" cy="48" rx="8" ry="10" fill="#d9a066"/><ellipse cx="74" cy="52" rx="8" ry="10" fill="#d9a066"/><path d="M44 30a12 12 0 0 1 20 0c3 5 2 12-10 12s-13-7-10-12z" fill="#d9a066"/>',
  'le-ic-move':'<path d="M26 60c4-10 10-16 18-16M52 36l8 8-8 8" fill="none" stroke="#c9452c" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="74" cy="60" r="6" fill="#c9452c"/>',
  'le-ic-outside':'<rect x="24" y="24" width="40" height="40" rx="4" fill="none" stroke="#33628c" stroke-width="6"/><path d="M44 24v40M24 44h40" stroke="#33628c" stroke-width="4"/><circle cx="36" cy="36" r="5" fill="#dda233"/>'
 }[tile];
 return `<svg viewBox="0 0 88 88" width="76" height="76" focusable="false" aria-hidden="true"><circle cx="44" cy="44" r="41" fill="#fffdf5" stroke="#ccc5b5" stroke-width="2"/>${art}</svg>`;
};
export const letsExplore={
 path:exploreBase,
 seoTitle:'Let’s Explore — Activities for 2-Year-Olds',
 title:'Let’s Explore — Activities for 2-Year-Olds',
 h1:'Let’s Explore',
 description:'Try simple real-world activities with your 2-year-old, from color and shape hunts to listening, movement and exploring together.',
 eyebrow:'OUT THE DOOR · AGE 2',
 intro:'Pick a mission. Then put the screen down and explore together.',
 safety:'Stay together while you explore.',
 goExplore:'Go explore!',
 together:'You explored together!',
 missions:MISSIONS,
 colors:['red','blue','yellow','green'],
 shapes:['circle','square','triangle'],
 moves:['Walk slowly like an elephant.','Hop like a frog.','Stretch tall like a giraffe.','Waddle like a duck.'],
 outside:['a tree','a cloud','a car','a bird']
};
const missionVisual=id=>{
 const v={
  color:'<circle cx="70" cy="70" r="46" data-le-swatch fill="#c9452c"/>',
  shape:'<circle cx="70" cy="70" r="44" fill="none" stroke="#8a8f7a" stroke-width="7" stroke-dasharray="2 20" stroke-linecap="round" data-le-shape="circle"/>',
  sound:'<path d="M28 84c12-26 72-26 84 0" fill="none" stroke="#4a7c3f" stroke-width="8" stroke-linecap="round"/><circle cx="70" cy="52" r="12" fill="#dda233"/>',
  size:'<circle cx="52" cy="76" r="34" fill="#33628c"/><circle cx="106" cy="86" r="17" fill="#dda233"/>',
  soft:'<path d="M36 88a16 16 0 0 1 4-31 20 20 0 0 1 38-5 16 16 0 0 1 21 17 15 15 0 0 1-7 19z" fill="#fffdf5" stroke="#8a8f7a" stroke-width="6"/>',
  animal:'<ellipse cx="52" cy="88" rx="13" ry="17" fill="#d9a066"/><ellipse cx="82" cy="82" rx="11" ry="15" fill="#d9a066"/><ellipse cx="108" cy="88" rx="11" ry="15" fill="#d9a066"/><path d="M56 44a20 20 0 0 1 32 0c5 8 3 19-16 19s-21-11-16-19z" fill="#d9a066"/>',
  move:'<path d="M36 96c6-16 16-26 29-26M70 58l13 12-13 12" fill="none" stroke="#c9452c" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><circle cx="112" cy="96" r="9" fill="#c9452c"/>',
  outside:'<rect x="30" y="26" width="80" height="80" rx="6" fill="#dce3cf" stroke="#33628c" stroke-width="7"/><path d="M70 26v80M30 66h80" stroke="#33628c" stroke-width="5"/><circle cx="50" cy="46" r="9" fill="#dda233"/><path d="M84 96l8-18 8 18z" fill="#4a7c3f"/>'
 }[id];
 return `<svg viewBox="0 0 140 140" width="180" height="180" focusable="false" aria-hidden="true" class="le-visual-art">${v}</svg>`;
};
export function letsExploreBody(L){
 const cards=MISSIONS.map((m,i)=>`<a class="le-mission" href="#le-${m.id}" data-le-open="${m.id}"><span class="oc-rule-icon">${missionIcon(m.tile)}</span><span class="mw-choice-copy"><strong>${m.name}</strong><span>${m.say}</span></span></a>`).join('');
 const view=id=>{
  const head={
   color:`<p class="le-instruction">Can you find something <strong data-le-color>red</strong>?</p><div class="le-go"><button type="button" class="button" data-le-go hidden>Go Find It!</button></div>
    <div class="le-away" data-le-away hidden><p class="le-big">${L.goExplore}</p>${missionVisual('color')}<div class="ct-actions"><button type="button" class="button" data-le-found hidden>I Found One!</button></div></div>
    <div class="le-back" data-le-back hidden><p class="ct-big">What did you find?</p><p class="fc-hint">Talk about it together.</p>
     <div class="ct-actions"><button type="button" class="button button-ghost" data-le-another hidden>Find Another Color</button><button type="button" class="button" data-le-did hidden>We Did It!</button></div></div>`,
   shape:`<p class="le-instruction">Can you find a <strong data-le-shape-word>circle</strong>?</p><div class="le-go"><button type="button" class="button" data-le-go hidden>Go Find It!</button></div>
    <div class="le-away" data-le-away hidden><p class="le-big">${L.goExplore}</p>${missionVisual('shape')}<div class="ct-actions"><button type="button" class="button" data-le-found hidden>I Found One!</button></div></div>
    <div class="le-back" data-le-back hidden><p class="ct-big">Show each other what you found.</p>
     <div class="ct-actions"><button type="button" class="button button-ghost" data-le-another hidden>Find Another Shape</button><button type="button" class="button" data-le-did hidden>We Did It!</button></div></div>`,
   sound:`<p class="le-instruction">Be very quiet. What can you hear?</p><p class="fc-hint">Listen together.</p>
    <div class="le-go"><button type="button" class="button" data-le-listen hidden>We’re Listening</button></div>
    <div class="le-away" data-le-away hidden><p class="le-big">We’re listening.</p>${missionVisual('sound')}<div class="ct-actions"><button type="button" class="button" data-le-found hidden>We Heard Something!</button></div></div>
    <div class="le-back" data-le-back hidden><p class="ct-big">Was it loud or quiet?</p><p class="fc-hint">Just talk together.</p>
     <div class="ct-actions"><button type="button" class="button" data-le-did hidden>We Did It!</button></div></div>`,
   size:`<p class="le-instruction" data-le-size-step>Find something big.</p><div class="le-go"><button type="button" class="button" data-le-go hidden>Go Find It!</button></div>
    <div class="le-away" data-le-away hidden><p class="le-big">${L.goExplore}</p>${missionVisual('size')}<div class="ct-actions"><button type="button" class="button" data-le-sizefound hidden>Found It!</button></div></div>
    <div class="le-back" data-le-back hidden><p class="ct-big">Which one was bigger?</p><p class="fc-hint">Talk about it together.</p>
     <div class="ct-actions"><button type="button" class="button" data-le-did hidden>We Did It!</button></div></div>`,
   soft:`<p class="le-instruction">Can you find something soft?</p><div class="le-go"><button type="button" class="button" data-le-go hidden>Go Find It!</button></div>
    <div class="le-away" data-le-away hidden><p class="le-big">${L.goExplore}</p>${missionVisual('soft')}<div class="ct-actions"><button type="button" class="button" data-le-found hidden>I Found One!</button></div></div>
    <div class="le-back" data-le-back hidden><p class="ct-big">Touch it together. How does it feel?</p>
     <div class="ct-actions"><button type="button" class="button" data-le-did hidden>We Did It!</button></div></div>`,
   animal:`<p class="le-instruction">Can you spot an animal?</p><p class="fc-hint">It can be outside, in a book, or on a toy.</p>
    <div class="le-go"><button type="button" class="button" data-le-go hidden>Go Find It!</button></div>
    <div class="le-away" data-le-away hidden><p class="le-big">${L.goExplore}</p>${missionVisual('animal')}<div class="ct-actions"><button type="button" class="button" data-le-found hidden>We Found One!</button></div></div>
    <div class="le-back" data-le-back hidden><p class="ct-big">What animal did you find?</p><p class="fc-hint">What sound does it make? Say it together.</p>
     <div class="ct-actions"><button type="button" class="button" data-le-did hidden>We Did It!</button></div></div>`,
   move:`<p class="le-instruction" data-le-move>Can you move like an elephant?</p>
    <div class="le-go"><button type="button" class="button" data-le-go hidden>Go Find It!</button></div>
    <div class="le-away" data-le-away hidden><p class="le-big">${L.goExplore}</p>${missionVisual('move')}<div class="ct-actions"><button type="button" class="button button-ghost" data-le-another hidden>Another Animal</button><button type="button" class="button" data-le-did hidden>We Did It!</button></div></div>`,
   outside:`<p class="le-instruction">Look outside together.</p><p class="fc-hint">Can you spot <strong data-le-outside>a tree</strong>?</p>
    <div class="le-go"><button type="button" class="button" data-le-go hidden>Go Find It!</button></div>
    <div class="le-away" data-le-away hidden><p class="le-big">${L.goExplore}</p>${missionVisual('outside')}
     <div class="ct-actions"><button type="button" class="button button-ghost" data-le-another hidden>Try Something Else</button><button type="button" class="button" data-le-found hidden>We Spotted One!</button></div></div>
    <div class="le-back" data-le-back hidden><p class="ct-big">What did you see?</p><p class="fc-hint">Talk about it together.</p>
     <div class="ct-actions"><button type="button" class="button" data-le-did hidden>We Did It!</button></div></div>`
  }[id];
  const m=MISSIONS.find(x=>x.id===id);
  return `<section class="le-view" id="le-${id}" data-le-view="${id}" aria-label="${esc(m.name)}">
   <span class="eyebrow">MISSION</span><h2>${esc(m.name)}</h2>
   ${head}
   <div class="oc-complete" data-le-complete hidden><p class="mw-cheer">${L.together}</p>
    <div class="hero-actions"><button type="button" class="button" data-le-anothermission hidden>Another Mission</button>
    <a class="button button-ghost" href="/my-classroom/">Back to My Classroom</a></div></div>
   <div class="ct-actions"><button type="button" class="button button-ghost" data-le-backgrid hidden>Choose a different mission</button></div>
  </section>`;
 };
 return `${crumbs([...age2Crumbs,['Let’s Explore',null]])}
 <section class="wrap section compact"><span class="eyebrow">${L.eyebrow}</span>
 <h1>${esc(L.h1)}</h1>
 <p class="mw-lede">${L.intro}</p>
 <p class="fc-hint">${L.safety}</p>
 <script type="application/json" data-le-pools>${JSON.stringify({colors:L.colors,shapes:L.shapes,moves:L.moves,outside:L.outside})}</script>
 <div class="oc-grid le-grid" data-le-grid>${cards}</div>
 ${MISSIONS.map(m=>view(m.id)).join('\n')}
 </section>`;
}

/* -------------------------------------------------------- STICKY NOTE WALL */
const STARTER_NOTES=[
 'I LOVE SCHOOL!! ♥','i made a BIG circle today!!','MOOOOO!','I found a RED car!!!',
 'look!! I drew a cat :)','I like circle time ♥','I was a frog HOP HOP!!','my favrit animal is a DINOSAUR!!',
 'I helped clean up :)','I can count 1 2 3 !!!','school is FUNNNN ♥','I found a tiny bug!!','can we learn DINOSAURS pleeease??'
];
export const stickyWall={
 path:wallBase,
 seoTitle:'Sticky Note Wall',
 title:'Sticky Note Wall',
 h1:'Our Sticky Note Wall',
 description:'See little notes from the Kiddo School community and send a note for our classroom wall.',
 eyebrow:'THE NOTICE WALL',
 intro:'Little notes from our school community.',
 examplesLabel:'Classroom examples',
 notes:STARTER_NOTES,
 form:{
  heading:'Add a Note',
  name:'Child’s display name',
  nameHelp:'Use a first name, nickname or initials. Don’t include private information.',
  message:'Your note',
  confirm:'I’m the parent or guardian and I’m okay with this note being reviewed for the public Sticky Note Wall.',
  send:'Send Note',
  counter:'characters left'
 }
};
export function stickyWallBody(W){
 const notes=W.notes.map(n=>`<li class="wall-note"><span class="wall-text">${esc(n)}</span></li>`).join('');
 return `${crumbs([['Sticky Note Wall',null]])}
 <section class="wrap section compact"><span class="eyebrow">${W.eyebrow}</span>
 <h1>${esc(W.h1)}</h1>
 <p class="mw-lede">${W.intro}</p>
 <div class="wall-board">
  <p class="wall-examples-label">${W.examplesLabel}</p>
  <ul class="wall-notes">${notes}</ul>
 </div>
 <div class="wall-board" data-wall-family-wrap hidden>
  <p class="wall-examples-label">From our families</p>
  <ul class="wall-notes" data-wall-family></ul>
 </div>
 <div class="wall-formwrap" id="add-a-note">
  <h2>${W.form.heading}</h2>
  <p class="fc-hint" data-wall-nojs>Sending a note needs JavaScript.</p>
  <p class="fc-hint">Notes are read by the school office before they go up. Only the display name and the note appear on the wall.</p>
  <form class="wall-form" data-wall-form novalidate>
   <label for="wall-name">${W.form.name} <span class="wall-optional">(optional)</span></label>
   <input id="wall-name" name="displayName" type="text" maxlength="24" autocomplete="off">
   <p class="fc-hint wall-help">${W.form.nameHelp}</p>
   <label for="wall-message">${W.form.message}</label>
   <textarea id="wall-message" name="message" maxlength="120" rows="3" required></textarea>
   <p class="fc-hint wall-count" data-wall-count aria-live="polite">120 ${W.form.counter}</p>
   <label class="wall-confirm"><input type="checkbox" name="confirm" required> ${W.form.confirm}</label>
   <p class="wall-hp" aria-hidden="true"><label for="wall-company">Company</label><input id="wall-company" name="company" type="text" tabindex="-1" autocomplete="off"></p>
   <p class="mw-live" data-wall-live aria-live="polite"></p>
   <button type="button" class="button" data-wall-send>${W.form.send}</button>
  </form>
 </div>
 <div class="hero-actions"><a class="button button-ghost" href="/my-classroom/">Back to My Classroom</a></div>
 </section>`;
}
export {bcSchema};
