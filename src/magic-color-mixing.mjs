// Kiddo School — Magic Color Mixing (Age 3 interactive game).
// /preschool/3-years/magic-color-mixing/ — a paint-mixing game drawn
// entirely with CSS and inline SVG: NO image assets, no R2 files. Children
// tap two paint splashes (red, yellow, blue), watch them combine in the
// pot (red+yellow=orange, blue+yellow=green, red+blue=purple) and hear a
// friendly explanation. The three recipes are taught as PAINT colors —
// the same honest note the Colors & Color Mixing class uses: screens mix
// light, paints mix pigment. magic-color-mixing.js is progressive
// enhancement; without JavaScript every recipe is visible as a chart and
// the noscript note says the pot needs JavaScript. No scores, no timers.
const COLORS={
 red:{hex:'#d93a3a',word:'Red'},
 yellow:{hex:'#f5c531',word:'Yellow'},
 blue:{hex:'#2f6fd0',word:'Blue'}
};
const RECIPES=[
 {a:'red',b:'yellow',result:'orange',hex:'#f07f28',say:'Red and yellow make ORANGE — like the fruit with the very same name!'},
 {a:'blue',b:'yellow',result:'green',hex:'#4d9e3f',say:'Blue and yellow make GREEN — the color of leaves and grass!'},
 {a:'red',b:'blue',result:'purple',hex:'#8f4fc0',say:'Red and blue make PURPLE — like a bunch of grapes!'}
];
const BLOB='M50 5 C66 1 86 12 91 30 C96 47 86 58 89 72 C92 88 74 97 55 94 C40 92 32 98 20 90 C8 82 5 64 9 49 C13 34 10 22 20 13 C29 5 40 7 50 5 Z';
const splash=(hex,label,extra='')=>`<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path class="mg-blob" d="${BLOB}" fill="${hex}" ${extra}/></svg>`;

export const magicColor={
 path:'/preschool/3-years/magic-color-mixing/',
 seoTitle:'Magic Color Mixing — a Paint Mixing Game for 3 Year Olds',
 h1:'Magic Color Mixing',
 description:'Mix colors like paint with your preschooler: tap two splashes — red, yellow or blue — watch them combine into orange, green or purple, then try real paint off screen. No scores, no sign-up.',
 eyebrow:'PRESCHOOL · AGE 3 · CLASS 4 MAGIC GAME',
 crumbs:[['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Colors & Color Mixing','/preschool/3-years/colors-and-color-mixing/'],['Magic Color Mixing',null]],
 ogImage:null,
 ogAlt:'Three paint splashes in red, yellow and blue mixing into orange, green and purple — the Magic Color Mixing game from Kiddo School',
 classPath:'/preschool/3-years/colors-and-color-mixing/',
 classTitle:'Colors &amp; Color Mixing'
};

export function magicColorBody(G){
 const hero=`<section class="wrap section compact">
  <span class="eyebrow">${G.eyebrow}</span>
  <h1>${G.h1}</h1>
  <p class="mw-lede">Pick two paint colors, tap Mix, and watch the magic happen. What does red and yellow make together? Grown-ups read the words; little ones do the choosing and the tapping.</p>
  <div class="mg-game" data-mg-game="color-mixing">
   <p class="mg-live" data-mg-live aria-live="polite"></p>
   <div class="mg-screens">`;

 const welcome=`<section class="mg-screen" data-mg-screen="welcome" aria-label="Welcome to Magic Color Mixing">
   <div class="mg-cover" role="img" aria-label="Three big paint splashes: red, yellow and blue">
    <svg viewBox="0 0 300 120" aria-hidden="true" focusable="false"><path class="mg-blob" d="${BLOB}" fill="#d93a3a" transform="translate(4,12) scale(1.05)"/><path class="mg-blob" d="${BLOB}" fill="#f5c531" transform="translate(106,6) scale(1.05)"/><path class="mg-blob" d="${BLOB}" fill="#2f6fd0" transform="translate(202,14) scale(1.05)"/></svg>
    <figcaption class="fc-hint">Red, yellow and blue — the three magic paints.</figcaption>
   </div>
   <div class="mg-actions" style="justify-content:center"><button type="button" class="button" data-mg-go="lab">Start Mixing <span aria-hidden="true">↗</span></button></div>
   <p class="mg-hint" style="text-align:center">No scores, no timers — just color magic.</p>
  </section>`;

 const lab=`<section class="mg-screen" data-mg-screen="lab" aria-label="The mixing pot">
   <span class="eyebrow">THE MIXING POT</span>
   <h2>Choose two colors to mix.</h2>
   <p class="lesson-copy">Tap one splash, then tap another. Both will jump into the pot — then press Mix!</p>
   <div class="mg-palette" role="group" aria-label="Choose two paint colors">
    ${Object.entries(COLORS).map(([slug,c])=>`<button type="button" class="mg-splash" data-mg-color="${slug}" aria-pressed="false" aria-label="${c.word} paint — tap to choose it">${splash(c.hex)}<span class="mg-tile-word">${c.word}</span></button>`).join('')}
   </div>
   <div class="mg-pot" data-mg-pot>
    <svg class="mg-pot-svg" viewBox="0 0 220 190" aria-hidden="true" focusable="false">
     <path d="M62 22 C70 8 90 12 92 26 C110 20 128 24 132 36 C148 32 160 44 154 56 L60 56 C54 44 54 30 62 22 Z" fill="rgba(52,59,48,.14)"/>
     <path class="mg-drip mg-drip-a" d="M78 30 C84 22 96 22 100 30 C106 44 100 58 89 74 C78 58 72 44 78 30 Z" fill="rgba(52,59,48,.18)"/>
     <path class="mg-drip mg-drip-b" d="M120 30 C126 22 138 22 142 30 C148 44 142 58 131 74 C120 58 114 44 120 30 Z" fill="rgba(52,59,48,.18)"/>
     <path d="M30 96 C30 78 70 66 110 66 C150 66 190 78 190 96 L180 150 C176 170 148 182 110 182 C72 182 44 170 40 150 Z" fill="#fffdf5" stroke="#343b30" stroke-width="5"/>
     <ellipse cx="110" cy="96" rx="80" ry="26" fill="#f4efe3" stroke="#343b30" stroke-width="5"/>
     <path class="mg-result-blob is-waiting" data-mg-result d="${BLOB}" transform="translate(72,68) scale(0.78)" fill="rgba(52,59,48,.25)"/>
    </svg>
    <p class="mg-result-name" data-mg-result-name aria-live="polite">The pot is waiting…</p>
    <p class="mg-hint" data-mg-result-say>Pick two splashes to begin.</p>
    <div class="mg-actions" style="justify-content:center">
     <button type="button" class="button" data-mg-mix disabled>Mix It! <span aria-hidden="true">✦</span></button>
     <button type="button" class="button button-ghost" data-mg-again>Try Another Mix</button>
    </div>
   </div>
   <div class="mg-recipes-wrap" style="margin-top:26px">
    <h3>All three magic recipes</h3>
    <p class="lesson-copy">The pot keeps no secrets — here is every recipe, ready to check after each mix.</p>
    <ul class="mg-recipes">${RECIPES.map(r=>`<li><span class="mg-recipe"><span class="mg-mini" style="background:${COLORS[r.a].hex}"></span> + <span class="mg-mini" style="background:${COLORS[r.b].hex}"></span> = <span class="mg-mini" style="background:${r.hex}"></span> <strong>${COLORS[r.a].word} + ${COLORS[r.b].word} = ${r.result.charAt(0).toUpperCase()+r.result.slice(1)}</strong></span></li>`).join('')}</ul>
   </div>
   <div class="mg-next"><button type="button" class="button" data-mg-go="offscreen">Off-Screen Play <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const offscreen=`<section class="mg-screen" data-mg-screen="offscreen" aria-label="Off-screen paint mixing">
   <span class="eyebrow">OFF-SCREEN PLAY</span>
   <h2>Real paint, real mixing.</h2>
   <p class="lesson-copy">The screen mixes light; real paints mix pigment — and real paint is the good kind of messy. Try the screen recipe with actual paint!</p>
   <div class="tc-hunt"><h3>Repeat the screen mix</h3><ul class="lesson-prompts"><li>Put out red, yellow and blue washable paint. Ask “what did red and yellow make on the screen?” — then find out for real, one spoonful at a time.</li></ul></div>
   <div class="tc-hunt"><h3>Guess before you mix</h3><ul class="lesson-prompts"><li>Before every mix, let your child guess the result out loud. A wrong guess is a fine guess — the surprise is the lesson.</li></ul></div>
   <div class="tc-hunt"><h3>Paint a color card</h3><ul class="lesson-prompts"><li>Paint the new color onto paper and write its name together. Three mixes later, you have a color-mixing chart made by your child.</li></ul></div>
   <p class="lesson-note"><strong>One safety word for this game:</strong> use washable, child-safe paints, cover the table, keep paint away from mouths, and wash hands when the mixing is done. A grown-up stays close — mixing is a two-person magic show.</p>
   <div class="mg-next"><button type="button" class="button" data-mg-go="complete">Finish the Magic <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const complete=`<section class="mg-screen" data-mg-screen="complete" aria-label="Activity complete">
   <span class="eyebrow">ACTIVITY COMPLETE</span>
   <h2>Three recipes, one little artist!</h2>
   <p class="lesson-copy">You mixed orange, green and purple from just three brave colors. Whether you mixed once or twenty times, you now know the painter&rsquo;s biggest secret: new colors were hiding inside the old ones all along.</p>
   <div class="mg-actions"><button type="button" class="button" data-mg-replay>Play Again <span aria-hidden="true">↺</span></button><a class="button button-ghost" href="${G.classPath}">Back to Colors &amp; Color Mixing <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
   <div class="lesson-path">
    <a class="fc-stage lesson-card-link" href="${G.classPath}"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Class 4</span></div><h3>Colors &amp; Color Mixing</h3><p>The full class: twelve color pairs, find-the-color, the mix pot and a rainbow to explore.</p><span class="fc-open">Open this class <span aria-hidden="true">↗</span></span></a>
    <a class="fc-stage lesson-card-link" href="/preschool/3-years/"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Magic games</span></div><h3>More magic games</h3><p>Try Magic Fruit Basket, Magic Animal Playground or Magic Shape Builder — every Age 3 game lives on the stage shelf.</p><span class="fc-open">Choose another game <span aria-hidden="true">↗</span></span></a>
   </div>
  </section>`;

 return `${hero}
${welcome}
${lab}
${offscreen}
${complete}
   </div>
   <noscript><p class="fc-hint">No JavaScript? The pot needs it to bubble — but all three recipes are in the chart above, and real paint works without any screen at all.</p></noscript>
  </div>
 </section>
 <section class="wrap lesson-section" id="for-grown-ups" aria-label="About this game">
  <span class="eyebrow">FOR GROWN-UPS</span>
  <h2>Why only three colors?</h2>
  <p class="lesson-copy">Red, yellow and blue are the classic preschool painting trio — the colors children actually hold in their hands at the kitchen table, so the screen game and the paint set tell the same story. Three choices also keep the game decidable for a three-year-old: every pair makes something new, so every choice is a good one.</p>
  <p class="lesson-copy">Like the paint-mixing pot in the Colors &amp; Color Mixing class, this game is honest about screens: monitors mix light, paints mix pigment, and the two do not mix quite the same way. The off-screen paint activity is where the lesson becomes finger-deep and true — the game builds the want, the kitchen table builds the knowing.</p>
  <p class="lesson-note">There is nothing to win here. If your child mixes the same pair eleven times, that is eleven wins.</p>
 </section>`;
}
