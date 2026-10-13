// Kiddo School — the worksheet generator (/worksheet-generator/).
// Two machines, both built live in the visitor's browser (no backend):
//   · Word Search — word shelves from our classes or the grown-up's own list
//   · Math Practice — sums tuned to a level, with an answer page
// The shell below is server-rendered (options, tabs, copy); the sheet itself
// is drawn by public/assets/wsgen.js using public/assets/wsgen-core.js.
// CSP law: no inline styles, no inline handlers, no inline scripts — ever.
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const crumbNav=parts=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${esc(href)}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
const heading=(eyebrow,title,desc)=>`<div class="page-heading wrap"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${desc}</p></div>`;

/* pill group: label + radio set, styled purely with classes */
const pillGroup=(name,options,checked,legend)=>`<fieldset class="wsgen-fieldset"><legend class="wsgen-legend">${legend}</legend><div class="wsgen-pills">${options.map(o=>`<label class="wsgen-pill"><input type="radio" name="${o.name||name}" value="${o.v}"${o.v===checked?' checked':''}><span>${o.label}</span></label>`).join('')}</div></fieldset>`;

const THEMES=[
 {v:'habitats',label:'Animals &amp; their homes · Class 36'},
 {v:'helpers',label:'Community Helpers · Class 33'},
 {v:'weather',label:'Weather words · Class 34'},
 {v:'colors',label:'Colors &amp; shapes'},
 {v:'sounds',label:'First words &amp; sounds'},
 {v:'custom',label:'My own words'}
];

function wordSearchPanel(){
 return `<section class="wsgen-panel" id="wsgen-panel-words" data-wsgen-panel="words">
  <div class="wsgen-options">
   <h2 class="wsgen-card-title">Word search</h2>
   <p class="wsgen-hint">Pick a shelf of words from our classes, or type your own. Every shuffle makes a brand-new puzzle.</p>
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
   <div class="wsgen-actions"><button type="button" class="button" id="wsgen-ws-print">Print the puzzle <span aria-hidden="true">⌘</span></button><button type="button" class="button button-ghost" id="wsgen-ws-png">Save puzzle as picture <span aria-hidden="true">↓</span></button><button type="button" class="button button-ghost" id="wsgen-ws-png-key">Save answers as picture <span aria-hidden="true">↓</span></button></div>
  </div>
 </section>`;
}

function mathPanel(){
 return `<section class="wsgen-panel is-hidden" id="wsgen-panel-math" data-wsgen-panel="math">
  <div class="wsgen-options">
   <h2 class="wsgen-card-title">Math practice</h2>
   <p class="wsgen-hint">Choose the operation and how far the numbers may go. The answer page prints underneath for the grown-up.</p>
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
   <div class="wsgen-actions"><button type="button" class="button" id="wsgen-math-print">Print the sums <span aria-hidden="true">⌘</span></button><button type="button" class="button button-ghost" id="wsgen-math-png">Save sums as picture <span aria-hidden="true">↓</span></button><button type="button" class="button button-ghost" id="wsgen-math-png-key">Save answers as picture <span aria-hidden="true">↓</span></button></div>
  </div>
 </section>`;
}

export function worksheetGeneratorBody(){
 return `${crumbNav([['Worksheets','/worksheets/'],['Worksheet Generator']])}
 ${heading('THE WORKSHEET GENERATOR','Make your own worksheet in one minute.','Pick words or sums, shuffle until it feels right, then print it or save it as a picture. Built right here in your browser — free, no sign-up, nothing uploaded, and it even works offline once the page has loaded.')}
 <div class="wsgen-tabs wrap" role="tablist" aria-label="Choose a worksheet machine">
  <button type="button" class="wsgen-tab is-active" id="wsgen-tab-words" role="tab" aria-selected="true" aria-controls="wsgen-panel-words">Word search</button>
  <button type="button" class="wsgen-tab" id="wsgen-tab-math" role="tab" aria-selected="false" aria-controls="wsgen-panel-math">Math practice</button>
 </div>
 <div class="wrap section compact">
  ${wordSearchPanel()}
  ${mathPanel()}
  <noscript><p class="lesson-note wrap"><strong>One small step:</strong> the generator draws worksheets inside your browser, so it needs JavaScript switched on. Everything else on Kiddo.school works without it.</p></noscript>
 </div>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>How the generator works.</h2>
  <p class="lesson-copy">Every sheet is made on your device — the words and sums never leave it. <strong>Shuffle</strong> deals a fresh layout from the same words, so siblings can each get their own puzzle. <strong>Print</strong> opens just the sheet on A4 or US Letter (the answer page follows when the box is ticked), and the picture buttons save PNG files you can drop into a slide, a message or a folder for later.</p>
  <p class="lesson-copy">The word shelves follow our classes: the habitat animals from <a href="/preschool/4-years/animals-and-their-habitats/">Class 36</a>, the helpers from <a href="/preschool/4-years/community-helpers-and-our-neighborhood/">Class 33</a>, the weather words from <a href="/preschool/4-years/weather-seasons-and-what-we-wear/">Class 34</a>. Printed worksheets never mark anything complete in <a href="/my-classroom/">My Classroom</a> — paper is for tables, kitchens and fridge doors.</p>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">COMING NEXT</span><h2>More machines are on the drawing board.</h2>
  <p class="lesson-copy">Tracing sheets with the letters your child is practising, matching pairs drawn from our own artwork, and a name-writing sheet for the proudest signature in the house. The word search and the sums machine come first — tell us which one should follow.</p>
 </section>`;
}
