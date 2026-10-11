// Kiddo School — My Work: the child's desk. Draw & Scribble (a real drawing
// canvas) and Trace & Follow (real finger/mouse tracing). Creative play, not a
// test: no scoring, no accuracy, no right or wrong. One screen, one moment.
export const myWorkBase='/toddler/2-years/my-work/';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const crumbs=(parts)=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${href}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
const bcSchema=(site,parts)=>({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[['Home','/'],...parts].map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:site+path}))});

const mcCrumbs=[['Toddler','/toddler/'],['Age 2','/toddler/2-years/'],['My Work',myWorkBase]];

/* --------------------------------------------------------------- MY WORK */
export const myWorkHub={
 path:myWorkBase,
 seoTitle:'My Work — Activities for 2-Year-Olds',
 title:'My Work — Activities for 2-Year-Olds',
 h1:'My Work',
 description:'Two simple things to make at your Kiddo School desk: a drawing canvas to scribble on and gentle finger tracing for 2-year-olds. Both work with fingers and touch.',
 eyebrow:'AT YOUR DESK · AGE 2',
 intro:'Let’s make something!',
 hint:'Read the prompt aloud and do it together. Your toddler does not need to read.',
 choices:[
  {href:'draw-and-scribble/',kind:'Draw & Scribble',say:'Pick a color and make a picture.',tile:'mw-tile-draw'},
  {href:'trace-and-follow/',kind:'Trace & Follow',say:'Follow the line with your finger.',tile:'mw-tile-trace'}
 ],
 schema:{keywords:'drawing activities for 2 year olds, toddler drawing activity, scribble activity for toddlers, online drawing for toddlers, creative activities for 2 year olds, tracing for 2 year olds, toddler tracing activities, line tracing for toddlers, pre-writing activities for toddlers, finger tracing activities'}
};
export function myWorkHubBody(H){
 return `${crumbs(mcCrumbs)}
 <section class="wrap section compact"><span class="eyebrow">${H.eyebrow}</span>
 <h1>${esc(H.h1)}</h1>
 <p class="mw-lede">${H.intro}</p>
 <p class="fc-hint">${H.hint}</p>
 <div class="mw-choices">
  ${H.choices.map(c=>`<a class="mw-choice" href="${myWorkBase}${c.href}"><span class="mw-tile ${c.tile}" aria-hidden="true">${c.tile==='mw-tile-draw'
   ?'<svg viewBox="0 0 120 90" width="120" height="90" focusable="false"><path d="M14 62 C 30 22, 52 20, 60 44 S 92 74, 106 34" fill="none" stroke="#c9452c" stroke-width="9" stroke-linecap="round"/><path d="M18 74 C 40 58, 74 82, 102 62" fill="none" stroke="#33628c" stroke-width="9" stroke-linecap="round"/></svg>'
   :'<svg viewBox="0 0 120 90" width="120" height="90" focusable="false"><path d="M12 45 H 108" fill="none" stroke="#8a8f7a" stroke-width="7" stroke-linecap="round" stroke-dasharray="2 16"/><path d="M12 45 C 34 45, 34 45, 44 45" fill="none" stroke="#c9452c" stroke-width="12" stroke-linecap="round"/></svg>'}</span>
  <span class="mw-choice-copy"><strong>${esc(c.kind)}</strong><span>${c.say}</span></span>
  <span class="fc-open">Open <span aria-hidden="true">↗</span></span></a>`).join('\n  ')}
 </div>
 <div class="hero-actions"><a class="button button-ghost" href="/my-classroom/">Back to My Classroom</a></div>
 </section>`;
}

/* ------------------------------------------------------ DRAW & SCRIBBLE */
const DRAW_PROMPTS=['Make some rain!','Draw a big circle.','Make lots of dots!','Draw some wiggly lines.','Draw something happy.','Make a colorful picture!'];
export const drawScribble={
 path:myWorkBase+'draw-and-scribble/',
 seoTitle:'Draw & Scribble for 2-Year-Olds',
 title:'Draw & Scribble for 2-Year-Olds',
 h1:'Draw & Scribble',
 description:'A big, simple online drawing canvas for 2-year-olds: thick toddler-friendly brush, clear colors, eraser and undo. Scribble together — it is creative play, not a test.',
 eyebrow:'MY WORK · DRAW & SCRIBBLE',
 hint:'Read the prompt aloud and draw together. Any kind of drawing is the right drawing.',
 prompts:DRAW_PROMPTS,
 promptLabel:'Today’s idea',
 colors:[['Ink','#343b30'],['Red','#c9452c'],['Yellow','#dda233'],['Green','#4a7c3f'],['Blue','#33628c']],
 schema:{keywords:'drawing activities for 2 year olds, toddler drawing activity, online drawing for toddlers, scribble activity for toddlers, creative activities for 2 year olds'}
};
export function drawScribbleBody(D){
 const toolBtn=(label,attr,svg)=>`<button type="button" class="mw-tool" ${attr} aria-label="${label}" title="${label}" hidden>${svg}</button>`;
 return `${crumbs([...mcCrumbs,['Draw & Scribble',null]])}
 <section class="wrap section compact"><span class="eyebrow">${D.eyebrow}</span>
 <h1>${esc(D.h1)}</h1>
 <p class="fc-hint">${D.hint}</p>
 <div class="mw-draw" data-mw-draw>
  <script type="application/json" data-mw-prompts>${JSON.stringify(D.prompts)}</script>
  <p class="mw-nojs" data-mw-nojs>This one needs JavaScript. Open it in your browser to draw.</p>
  <div class="mw-promptbar"><span class="mw-prompt-label">${D.promptLabel}</span><p class="mw-prompt" data-mw-prompt>${D.prompts[0]}</p>
   <button type="button" class="button button-ghost mw-small" data-mw-idea hidden>New Idea</button></div>
  <div class="mw-canvas-frame"><canvas class="mw-canvas" data-mw-canvas aria-label="Drawing canvas. Draw here with your finger."></canvas></div>
  <div class="mw-tools" data-mw-tools>
   <div class="mw-colors" role="group" aria-label="Colors">
    ${D.colors.map(([name,hex],i)=>`<button type="button" class="mw-color${i===0?' is-on':''}" data-mw-color="${hex}" style="--swatch:${hex}" aria-label="${name} color" aria-pressed="${i===0?'true':'false'}" hidden></button>`).join('')}
    <button type="button" class="mw-color mw-eraser" data-mw-eraser aria-label="Eraser" aria-pressed="false" hidden><svg viewBox="0 0 24 24" width="22" height="22" focusable="false" aria-hidden="true"><path d="M15.5 4.5 20 9 9.5 19.5H5V15z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8 12l4.5 4.5" stroke="currentColor" stroke-width="2"/></svg></button>
   </div>
   <div class="mw-edit">
    ${toolBtn('Undo','data-mw-undo','<svg viewBox="0 0 24 24" width="22" height="22" focusable="false" aria-hidden="true"><path d="M8 5 3 10l5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 10h11a6 6 0 0 1 0 12h-3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>')}
    ${toolBtn('Clear page','data-mw-clear','<svg viewBox="0 0 24 24" width="22" height="22" focusable="false" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>')}
   </div>
  </div>
  <div class="mw-donebar"><button type="button" class="button" data-mw-done hidden>I’m Done</button></div>
  <p class="mw-devicenote fc-hint" data-mw-devicenote hidden>Saved on this device.</p>
  <div class="mw-panel" data-mw-donepanel hidden>
   <p class="mw-cheer">Nice creating!</p>
   <div class="hero-actions mw-donerow">
    <button type="button" class="button" data-mw-save hidden>Save to School Bag</button>
    <button type="button" class="button button-ghost" data-mw-again hidden>Draw Again</button>
    <a class="button button-ghost" href="${myWorkBase}">Back to My Work</a>
   </div>
   <p class="mw-live" data-mw-live aria-live="polite"></p>
   <div class="mw-aftermath" data-mw-aftermath hidden>
    <div class="hero-actions"><button type="button" class="button" data-mw-keep hidden>Keep Drawing</button>
    <a class="button" href="/my-school-bag/" data-mw-openbag hidden>Open School Bag</a></div>
   </div>
  </div>
 </section>`;
}

/* ------------------------------------------------------- TRACE & FOLLOW */
const PATHS=[
 {id:'straight',label:'Straight line',d:'M300 40 L300 320',say:'Trace the line. Up and down.'},
 {id:'across',label:'Across',d:'M60 180 L540 180',say:'Trace the line. Side to side.'},
 {id:'wavy',label:'Wavy line',d:'M60 180 C 120 90, 180 90, 240 180 S 360 270, 420 180 S 500 110, 540 150',say:'Trace the wiggly line.'},
 {id:'zigzag',label:'Zigzag',d:'M60 270 L 160 100 L 260 270 L 360 100 L 460 270 L 540 140',say:'Trace the zigzag.'},
 {id:'circle',label:'Big circle',d:'M300 60 a 120 120 0 1 1 -0.01 0',say:'Trace the circle. Round and round.'},
 {id:'curve',label:'Simple curve',d:'M80 280 Q 300 20 520 280',say:'Trace the curve.'}
];
export const traceFollow={
 path:myWorkBase+'trace-and-follow/',
 seoTitle:'Tracing for 2-Year-Olds — Trace & Follow',
 title:'Tracing for 2-Year-Olds — Trace & Follow',
 h1:'Trace & Follow',
 description:'Gentle finger tracing for 2-year-olds: six big dashed lines to follow with a finger or a mouse. Loose tracing is perfect — this is practice, not a test.',
 eyebrow:'MY WORK · TRACE & FOLLOW',
 hint:'Trace the big line with your finger. Wobbly is wonderful.',
 paths:PATHS,
 doneWord:'Nice tracing!'
};
export function traceFollowBody(T){
 const sections=T.paths.map((p,i)=>`
  <section class="mw-trace-step" data-trace-step="${p.id}" aria-label="Path ${i+1} of ${T.paths.length}: ${esc(p.label)}"${i===0?'':' hidden'}>
   <h2>${esc(p.label)}</h2>
   <p class="fc-hint">${p.say}</p>
   <div class="mw-trace-frame">
    <svg viewBox="0 0 600 360" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false"><path d="${p.d}" pathLength="100" class="mw-tracepath"/></svg>
    <canvas class="mw-trace-canvas" data-trace-canvas aria-label="Tracing area over the ${esc(p.label.toLowerCase())}"></canvas>
   </div>
   <div class="mw-trace-actions">
    <button type="button" class="button" data-trace-done hidden>Done!</button>
    <button type="button" class="button button-ghost" data-trace-next hidden>Next</button>
   </div>
  </section>`).join('\n');
 return `${crumbs([...mcCrumbs,['Trace & Follow',null]])}
 <section class="wrap section compact"><span class="eyebrow">${T.eyebrow}</span>
 <h1>${esc(T.h1)}</h1>
 <p class="fc-hint">${T.hint}</p>
 <div class="mw-trace" data-mw-trace>
  <p class="mw-nojs" data-mw-nojs>This one needs JavaScript. Open it in your browser to trace.</p>
  <p class="mw-live" data-mw-live aria-live="polite"></p>
  <p class="mw-count" data-trace-count hidden>Path 1 of ${T.paths.length}</p>
  ${sections}
  <div class="mw-panel" data-trace-complete hidden>
   <p class="mw-cheer">Nice tracing!</p>
   <p>That is all six paths. More tracing can wait — it will be here another day.</p>
   <div class="hero-actions"><a class="button" href="${myWorkBase}">Back to My Work</a><a class="button button-ghost" href="${myWorkBase}draw-and-scribble/">Draw &amp; Scribble</a><a class="button button-ghost" href="/my-classroom/">Back to My Classroom</a></div>
  </div>
 </section>`;
}
export {bcSchema};
