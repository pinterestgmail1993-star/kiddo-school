// Kiddo School — the worksheet generator (hub + four machine pages).
// Every machine runs live in the visitor's browser (no backend):
//   · Word Search     /worksheet-generator/word-search/
//   · Math Practice   /worksheet-generator/math-practice/
//   · Tracing         /worksheet-generator/tracing/
//   · Matching Pairs  /worksheet-generator/matching-pairs/
// The shells below are server-rendered (options, copy); sheets are drawn by
// public/assets/wsgen.js (word search + math) and public/assets/wsgen-more.js
// (tracing + matching) on top of public/assets/wsgen-core.js.
// Every sheet can be printed, saved as a PNG — or solved right on the screen.
// CSP law: no inline styles, no inline handlers, no inline scripts — ever.
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const crumbNav=parts=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${esc(href)}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
const heading=(eyebrow,title,desc)=>`<div class="page-heading wrap"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${desc}</p></div>`;

/* pill group: label + radio set, styled purely with classes */
const pillGroup=(name,options,checked,legend)=>`<fieldset class="wsgen-fieldset"><legend class="wsgen-legend">${legend}</legend><div class="wsgen-pills">${options.map(o=>`<label class="wsgen-pill"><input type="radio" name="${o.name||name}" value="${o.v}"${o.v===checked?' checked':''}><span>${o.label}</span></label>`).join('')}</div></fieldset>`;

const GEN='/worksheet-generator/';
const MACHINES=[
 {href:GEN+'word-search/',title:'Word search maker',desc:'Hide our class words — or your own list — in a letter grid. Solve it on screen or print it for the table.'},
 {href:GEN+'math-practice/',title:'Math practice maker',desc:'Adding and take-away sheets tuned to your child\u2019s level, with an answer page for the grown-up. Tap the answers on screen too.'},
 {href:GEN+'tracing/',title:'Tracing sheet maker',desc:'Letters, numbers, class words and the proudest name in the house — trace on paper, or trace with a finger right on the screen.'},
 {href:GEN+'matching-pairs/',title:'Matching pairs maker',desc:'Draw the line between helpers and their tools, animals and their homes — or match the pairs by tapping on screen.'}
];
const siblingLinks=skip=>`<section class="wrap lesson-section"><span class="eyebrow">MORE MACHINES</span><h2>The other worksheet machines.</h2><div class="wsgen-hub">${MACHINES.filter(m=>!skip.some(s=>m.href.indexOf(s)>-1)).map(m=>`<a class="wsgen-hubcard" href="${m.href}"><h3>${m.title}</h3><p>${m.desc}</p><span class="wsgen-hublink">Open the machine <span aria-hidden="true">→</span></span></a>`).join('')}</div></section>`;

/* structured data: Home > Worksheets > Worksheet Generator > machine */
export function genBc(site,name,machinePath){
 return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
  {'@type':'ListItem',position:1,name:'Home',item:site+'/'},
  {'@type':'ListItem',position:2,name:'Worksheets',item:site+'/worksheets/'},
  {'@type':'ListItem',position:3,name:'Worksheet Generator',item:site+GEN},
  {'@type':'ListItem',position:4,name:name,item:site+machinePath}]};
}
export function genHubBc(site){
 return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
  {'@type':'ListItem',position:1,name:'Home',item:site+'/'},
  {'@type':'ListItem',position:2,name:'Worksheets',item:site+'/worksheets/'},
  {'@type':'ListItem',position:3,name:'Worksheet Generator',item:site+GEN}]};
}

/* ---------- the hub: four machines on one shelf ---------- */
export function generatorHubBody(){
 return `${crumbNav([['Worksheets','/worksheets/'],['Worksheet Generator']])}
 ${heading('THE WORKSHEET GENERATOR','Four little machines that make worksheets.','Pick a machine, choose your options, shuffle until it feels right — then solve it on the screen, print it, or save it as a picture. Every sheet is built right here in your browser: nothing is uploaded, and the machines even work offline once the page has loaded.')}
 <div class="wrap section compact">
  <div class="wsgen-hub">
   ${MACHINES.map(m=>`<a class="wsgen-hubcard" href="${m.href}"><h3>${m.title}</h3><p>${m.desc}</p><span class="wsgen-hublink">Open the machine <span aria-hidden="true">→</span></span></a>`).join('')}
  </div>
  <noscript><p class="lesson-note"><strong>One small step:</strong> the machines draw worksheets inside your browser, so they need JavaScript switched on. Everything else on Kiddo.school works without it.</p></noscript>
 </div>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>How the machines work.</h2>
  <p class="lesson-copy">Each machine starts from the words and numbers our classes actually teach: the habitat animals from <a href="/preschool/4-years/animals-and-their-habitats/">Class 36</a>, the helpers from <a href="/preschool/4-years/community-helpers-and-our-neighborhood/">Class 33</a>, the weather words from <a href="/preschool/4-years/weather-seasons-and-what-we-wear/">Class 34</a>. <strong>Shuffle</strong> deals a fresh sheet from the same options, so siblings can each get their own. <strong>Solve on screen</strong> turns the sheet into a gentle game — tap the letters, tap the answers, connect the pairs — and <strong>print</strong> or <strong>save as picture</strong> put it on paper for the kitchen table and the fridge door.</p>
  <p class="lesson-copy">Printed worksheets never mark anything complete in <a href="/my-classroom/">My Classroom</a> — paper is for tables, kitchens and fridge doors. The on-screen versions are just for fun, and nothing gets collected — the drawing stays on your screen and nowhere else.</p>
 </section>`;
}

/* ---------- machine 1: word search ---------- */
const THEMES=[
 {v:'habitats',label:'Animals &amp; their homes · Class 36'},
 {v:'helpers',label:'Community Helpers · Class 33'},
 {v:'weather',label:'Weather words · Class 34'},
 {v:'colors',label:'Colors &amp; shapes'},
 {v:'sounds',label:'First words &amp; sounds'},
 {v:'custom',label:'My own words'}
];

export function wordSearchPageBody(){
 return `${crumbNav([['Worksheets','/worksheets/'],['Worksheet Generator',GEN],['Word search maker']])}
 ${heading('THE WORKSHEET GENERATOR','Word search maker.','Pick a shelf of words from our classes, or type your own. Every shuffle makes a brand-new puzzle — solve it on the screen, print it, or save it as a picture.')}
 <div class="wrap section compact">
  <section class="wsgen-panel" id="wsgen-panel-words" data-wsgen-panel="words">
   <div class="wsgen-options">
    <h2 class="wsgen-card-title">Build the puzzle</h2>
    <p class="wsgen-hint">Words come from the shelves our classes teach, or from your own list. Every shuffle makes a new layout.</p>
    <label class="wsgen-label" for="wsgen-theme">Word shelf</label>
    <select id="wsgen-theme" class="wsgen-select">${THEMES.map(t=>`<option value="${t.v}">${t.label}</option>`).join('')}</select>
    <div id="wsgen-custom-wrap" class="wsgen-custom is-hidden">
     <label class="wsgen-label" for="wsgen-custom">Your words — up to 12, letters only</label>
     <textarea id="wsgen-custom" class="wsgen-text" rows="4" placeholder="GRANDMA, GARDEN, TOMATO, WORM…" spellcheck="false"></textarea>
    </div>
    ${pillGroup('wsgen-size',[{v:'8',label:'8 × 8 · little ones'},{v:'10',label:'10 × 10'},{v:'12',label:'12 × 12 · big kids'}],'8','Puzzle size')}
    ${pillGroup('wsgen-dirs',[{v:'easy',label:'Across &amp; down'},{v:'hard',label:'Diagonals too'}],'easy','Which ways can words hide?')}
    <label class="wsgen-label" for="wsgen-ws-title">Title on the sheet</label>
    <input id="wsgen-ws-title" class="wsgen-text" type="text" value="Animal Word Search" maxlength="60">
    <label class="wsgen-check"><input type="checkbox" id="wsgen-ws-key" checked><span>Add the answer page</span></label>
    <div class="wsgen-actions"><button type="button" class="button" id="wsgen-ws-shuffle">Shuffle a new puzzle <span aria-hidden="true">↻</span></button></div>
   </div>
   <div class="wsgen-out">
    <div class="wsgen-sheet" id="wsgen-ws-sheet" aria-label="Word search preview"></div>
    <p class="wsgen-status" id="wsgen-ws-status" aria-live="polite"></p>
    <div class="wsgen-actions wsgen-actions-center"><button type="button" class="button" id="wsgen-ws-solve">Solve on screen <span aria-hidden="true">▶</span></button><button type="button" class="button button-ghost" id="wsgen-ws-print">Print the puzzle <span aria-hidden="true">⌘</span></button><button type="button" class="button button-ghost" id="wsgen-ws-png">Save puzzle as picture <span aria-hidden="true">↓</span></button><button type="button" class="button button-ghost" id="wsgen-ws-png-key">Save answers as picture <span aria-hidden="true">↓</span></button></div>
   </div>
  </section>
  <noscript><p class="lesson-note"><strong>One small step:</strong> the puzzle is built inside your browser, so it needs JavaScript switched on. Everything else on Kiddo.school works without it.</p></noscript>
 </div>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><p class="lesson-copy"><strong>Solve on screen</strong> turns the grid into a gentle game: your child taps the first and last letter of a word they spot, and the whole word lights up and ticks off the list. Nothing is scored or stored — the puzzle is theirs. <strong>Print</strong> opens just the sheet on A4 or US Letter (with the answer page behind it when the box is ticked), and the picture buttons save PNG files you can drop into a slide, a message or a folder for later. The word shelves follow our classes: habitat animals from <a href="/preschool/4-years/animals-and-their-habitats/">Class 36</a>, helpers from <a href="/preschool/4-years/community-helpers-and-our-neighborhood/">Class 33</a>, weather words from <a href="/preschool/4-years/weather-seasons-and-what-we-wear/">Class 34</a>.</p></section>
 ${siblingLinks(['word-search'])}`;
}

/* ---------- machine 2: math practice ---------- */
export function mathPageBody(){
 return `${crumbNav([['Worksheets','/worksheets/'],['Worksheet Generator',GEN],['Math practice maker']])}
 ${heading('THE WORKSHEET GENERATOR','Math practice maker.','Choose the operation and how far the numbers may go. Solve the sums on screen, or print the sheet — the answer page prints underneath for the grown-up.')}
 <div class="wrap section compact">
  <section class="wsgen-panel" id="wsgen-panel-math" data-wsgen-panel="math">
   <div class="wsgen-options">
    <h2 class="wsgen-card-title">Build the sums</h2>
    <p class="wsgen-hint">Adding and take-away, tuned to a level: sums never climb past the ceiling you pick, and take-away never goes below zero.</p>
    ${pillGroup('wsgen-op',[{v:'add',label:'Adding'},{v:'sub',label:'Take away'},{v:'mixed',label:'Mixed'}],'add','Operation')}
    ${pillGroup('wsgen-level',[{v:'10',label:'within 10'},{v:'20',label:'within 20'},{v:'100',label:'within 100'}],'10','How big may the numbers be?')}
    ${pillGroup('wsgen-count',[{v:'12',label:'12 sums'},{v:'16',label:'16 sums'},{v:'20',label:'20 sums'}],'12','How many sums?')}
    <label class="wsgen-label" for="wsgen-math-title">Title on the sheet</label>
    <input id="wsgen-math-title" class="wsgen-text" type="text" value="Math Practice" maxlength="60">
    <label class="wsgen-check"><input type="checkbox" id="wsgen-math-key" checked><span>Add the answer page</span></label>
    <div class="wsgen-actions"><button type="button" class="button" id="wsgen-math-shuffle">Shuffle new sums <span aria-hidden="true">↻</span></button></div>
   </div>
   <div class="wsgen-out">
    <div class="wsgen-sheet" id="wsgen-math-sheet" aria-label="Math practice preview"></div>
    <p class="wsgen-status" id="wsgen-math-status" aria-live="polite"></p>
    <div class="wsgen-actions wsgen-actions-center"><button type="button" class="button" id="wsgen-math-solve">Solve on screen <span aria-hidden="true">▶</span></button><button type="button" class="button button-ghost" id="wsgen-math-print">Print the sums <span aria-hidden="true">⌘</span></button><button type="button" class="button button-ghost" id="wsgen-math-png">Save sums as picture <span aria-hidden="true">↓</span></button><button type="button" class="button button-ghost" id="wsgen-math-png-key">Save answers as picture <span aria-hidden="true">↓</span></button></div>
   </div>
  </section>
  <noscript><p class="lesson-note"><strong>One small step:</strong> the sums are built inside your browser, so they need JavaScript switched on. Everything else on Kiddo.school works without it.</p></noscript>
 </div>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><p class="lesson-copy"><strong>Solve on screen</strong> gives every sum three little answer bubbles — tap the right one and it locks in green; a wrong tap just wiggles and hands the turn back. It is practice, not a test: nothing is stored or scored. <strong>Print</strong> lays the sums out three to a row on A4 or US Letter with the answer page behind them when the box is ticked, and the picture buttons save PNG files for later. Start within 10 for first counters, and move up when the page starts feeling easy.</p></section>
 ${siblingLinks(['math-practice'])}`;
}

/* ---------- machine 3: tracing ---------- */
const TRACE_SHELF_OPTS=[
 {v:'habitats',label:'Animals &amp; their homes · Class 36'},
 {v:'helpers',label:'Community Helpers · Class 33'},
 {v:'weather',label:'Weather words · Class 34'},
 {v:'colors',label:'Color words'},
 {v:'numbers',label:'Number words'}
];

export function tracingPageBody(){
 return `${crumbNav([['Worksheets','/worksheets/'],['Worksheet Generator',GEN],['Tracing sheet maker']])}
 ${heading('THE WORKSHEET GENERATOR','Tracing sheet maker.','Letters, numbers, class words — and the proudest name in the house. Trace on paper, or trace with a finger right on the screen.')}
 <div class="wrap section compact">
  <section class="wsgen-panel" id="wsgen-panel-trace" data-wsgen-panel="trace">
   <div class="wsgen-options">
    <h2 class="wsgen-card-title">Build the sheet</h2>
    <p class="wsgen-hint">One solid example to read, dashed letters to follow, then a blank line to try alone.</p>
    ${pillGroup('wsgen-tmode',[{v:'letters',label:'Letters'},{v:'numbers',label:'Numbers'},{v:'name',label:'My name'},{v:'words',label:'Class words'}],'letters','What are we tracing?')}
    <div id="wsgen-tletters-wrap">
     <label class="wsgen-label" for="wsgen-tletters">Letters to practise — up to 10</label>
     <input id="wsgen-tletters" class="wsgen-text" type="text" value="ABCDEFGH" maxlength="20" spellcheck="false">
     ${pillGroup('wsgen-tcase',[{v:'upper',label:'BIG letters'},{v:'lower',label:'little letters'}],'upper','Which shape?')}
    </div>
    <div id="wsgen-tname-wrap" class="is-hidden">
     <label class="wsgen-label" for="wsgen-tname">The name to trace — up to 12 letters</label>
     <input id="wsgen-tname" class="wsgen-text" type="text" value="" maxlength="12" placeholder="Type a name…" spellcheck="false">
    </div>
    <div id="wsgen-twords-wrap" class="is-hidden">
     <label class="wsgen-label" for="wsgen-tshelf">Word shelf</label>
     <select id="wsgen-tshelf" class="wsgen-select">${TRACE_SHELF_OPTS.map(t=>`<option value="${t.v}">${t.label}</option>`).join('')}</select>
    </div>
    <label class="wsgen-label" for="wsgen-ttitle">Title on the sheet</label>
    <input id="wsgen-ttitle" class="wsgen-text" type="text" value="Tracing Practice" maxlength="60">
    <div class="wsgen-actions"><button type="button" class="button" id="wsgen-trace-shuffle">Shuffle a new sheet <span aria-hidden="true">↻</span></button></div>
   </div>
   <div class="wsgen-out">
    <div class="wsgen-sheet" id="wsgen-trace-sheet" aria-label="Tracing sheet preview"></div>
    <p class="wsgen-status" id="wsgen-trace-status" aria-live="polite"></p>
    <div class="wsgen-actions wsgen-actions-center"><button type="button" class="button button-ghost" id="wsgen-trace-print">Print the sheet <span aria-hidden="true">⌘</span></button><button type="button" class="button button-ghost" id="wsgen-trace-png">Save sheet as picture <span aria-hidden="true">↓</span></button></div>
    <div class="wsgen-tracepad">
     <h3 class="wsgen-tracepad-title">Trace it with a finger <span aria-hidden="true">✎</span></h3>
     <p class="wsgen-hint">Follow the dashed shape with a finger, a mouse or a stylus — then clear it and try again.</p>
     <div class="wsgen-trace-chips" id="wsgen-trace-chips"></div>
     <canvas id="wsgen-trace-canvas" class="wsgen-trace-canvas" width="560" height="360"></canvas>
     <div class="wsgen-actions wsgen-actions-center"><button type="button" class="button" id="wsgen-trace-clear">Clear <span aria-hidden="true">↺</span></button><button type="button" class="button button-ghost" id="wsgen-trace-next">Next one <span aria-hidden="true">→</span></button></div>
    </div>
   </div>
  </section>
  <noscript><p class="lesson-note"><strong>One small step:</strong> the tracing sheet is built inside your browser, so it needs JavaScript switched on. Everything else on Kiddo.school works without it.</p></noscript>
 </div>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><p class="lesson-copy">Each row reads the same way: one solid example to look at, dashed shapes to follow, and a blank stretch of line to try alone. The <strong>finger-tracing pad</strong> under the sheet is for practice that costs no paper — nothing is scored, and the Clear button forgives everything. Print gives a full A4 or US Letter sheet, and the picture button saves a PNG. For name practice, type your child\u2019s name once and shuffle as many sheets as you like; the words shelf follows our classes, from <a href="/preschool/4-years/animals-and-their-habitats/">Class 36</a> animals to <a href="/preschool/4-years/community-helpers-and-our-neighborhood/">Class 33</a> helpers.</p></section>
 ${siblingLinks(['tracing'])}`;
}

/* ---------- machine 4: matching pairs ---------- */
const MATCH_SHELF_OPTS=[
 {v:'letters',label:'BIG letters &amp; little letters'},
 {v:'numbers',label:'Numbers &amp; count the dots'},
 {v:'helpers',label:'Helpers &amp; their tools · Class 33'},
 {v:'homes',label:'Animals &amp; their homes · Class 36'},
 {v:'weather',label:'Weather &amp; what we wear · Class 34'}
];

export function matchingPageBody(){
 return `${crumbNav([['Worksheets','/worksheets/'],['Worksheet Generator',GEN],['Matching pairs maker']])}
 ${heading('THE WORKSHEET GENERATOR','Matching pairs maker.','Two columns, one line each: draw the line on paper — or tap the pairs together on the screen.')}
 <div class="wrap section compact">
  <section class="wsgen-panel" id="wsgen-panel-match" data-wsgen-panel="match">
   <div class="wsgen-options">
    <h2 class="wsgen-card-title">Build the pairs</h2>
    <p class="wsgen-hint">The left column stays put, the right column shuffles — so every sheet is a fresh little puzzle.</p>
    <label class="wsgen-label" for="wsgen-mshelf">Pair shelf</label>
    <select id="wsgen-mshelf" class="wsgen-select">${MATCH_SHELF_OPTS.map(t=>`<option value="${t.v}">${t.label}</option>`).join('')}</select>
    ${pillGroup('wsgen-mcount',[{v:'5',label:'5 pairs'},{v:'8',label:'8 pairs'}],'5','How many pairs?')}
    <label class="wsgen-label" for="wsgen-mtitle">Title on the sheet</label>
    <input id="wsgen-mtitle" class="wsgen-text" type="text" value="Matching Pairs" maxlength="60">
    <label class="wsgen-check"><input type="checkbox" id="wsgen-match-key" checked><span>Add the answer page</span></label>
    <div class="wsgen-actions"><button type="button" class="button" id="wsgen-match-shuffle">Shuffle new pairs <span aria-hidden="true">↻</span></button></div>
   </div>
   <div class="wsgen-out">
    <div class="wsgen-sheet" id="wsgen-match-sheet" aria-label="Matching pairs preview"></div>
    <p class="wsgen-status" id="wsgen-match-status" aria-live="polite"></p>
    <div class="wsgen-actions wsgen-actions-center"><button type="button" class="button" id="wsgen-match-solve">Solve on screen <span aria-hidden="true">▶</span></button><button type="button" class="button button-ghost" id="wsgen-match-print">Print the pairs <span aria-hidden="true">⌘</span></button><button type="button" class="button button-ghost" id="wsgen-match-png">Save pairs as picture <span aria-hidden="true">↓</span></button><button type="button" class="button button-ghost" id="wsgen-match-png-key">Save answers as picture <span aria-hidden="true">↓</span></button></div>
   </div>
  </section>
  <noscript><p class="lesson-note"><strong>One small step:</strong> the pairs are built inside your browser, so they need JavaScript switched on. Everything else on Kiddo.school works without it.</p></noscript>
 </div>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><p class="lesson-copy">On paper, your child draws one line per pair from the left column to the right — a proper pencil skill, and the answer page lines them up for checking. <strong>Solve on screen</strong> turns the same sheet into a tapping game: tap a card on the left, its partner on the right, and the pair joins with a bright line. A wrong tap just wiggles and hands the turn back; nothing is scored or stored. The shelves follow our classes — helpers and their tools from <a href="/preschool/4-years/community-helpers-and-our-neighborhood/">Class 33</a>, animals and homes from <a href="/preschool/4-years/animals-and-their-habitats/">Class 36</a>, weather and what we wear from <a href="/preschool/4-years/weather-seasons-and-what-we-wear/">Class 34</a> — plus big-and-little letters for first readers.</p></section>
 ${siblingLinks(['matching-pairs'])}`;
}
