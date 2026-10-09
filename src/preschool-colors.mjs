// Kiddo School — Preschool 4 (Age 3): Colors & Color Mixing.
// Full class at /preschool/3-years/colors-and-color-mixing/, built on the
// twenty-four owner-uploaded cards (twelve splash + twelve picture cards).
// Reuses the site's existing interactive pieces: the lesson card viewer
// (data-lesson-viewer in site.js) for Learn Colors, the calm find-it game
// engine (data-tc-round) for Find the Color and Match Colors, and a small
// progressive-enhancement mixer (colors-class.js) for Mix Colors. Color
// tiles are programmatic CSS swatches — no new images are invented, and
// the mixer never depends on a picture that might not load.
import {colorsLesson,colorsCardContent} from './flashcards/data-colors.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const base=colorsLesson.r2Base+colorsLesson.folder;
const CARDS=colorsLesson.cards;
const cardBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));
const contentOf=slug=>colorsCardContent[slug];
const SET_URL='/flashcards/colors/';
const CLASS_PATH=colorsLesson.path;
const COLOR_NAME={red:'red',blue:'blue',yellow:'yellow',green:'green',orange:'orange',purple:'purple',pink:'pink',brown:'brown',black:'black',white:'white',gray:'gray',rainbow:'rainbow'};
const RAINBOW=['red','orange','yellow','green','blue','purple'];

const crumbNav=parts=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${esc(href)}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
const heading=(eyebrow,title,desc)=>`<div class="page-heading wrap"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${desc}</p></div>`;
// A programmatic paint-splash swatch: as a choice it is a real button;
// as a face it is a quiet span. Pure CSS — the game never waits on images.
const colorFace=(s,{correct=false,asChoice=false}={})=>asChoice
 ?`<button type="button" class="tc-choice tc-color"${correct?' data-tc-correct="true"':''} aria-label="The color ${esc(COLOR_NAME[s])}"><span class="color-face cf-${s}" aria-hidden="true"></span></button>`
 :`<span class="color-face cf-${s}${correct?' is-target':''}" role="img" aria-label="The color ${esc(COLOR_NAME[s])}"></span>`;
const picChoice=(c,correct=false)=>`<button type="button" class="tc-choice"${correct?' data-tc-correct="true"':''} aria-label="${esc(contentOf(c.slug).picWord)}"><img src="${base}${c.picFile}" width="${c.w}" height="${c.h}" alt="${esc(c.picAlt)}" loading="lazy"></button>`;
const splashChoice=(c,correct=false)=>`<button type="button" class="tc-choice"${correct?' data-tc-correct="true"':''} aria-label="The ${esc(COLOR_NAME[c.slug])} splash card"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"></button>`;

/* ---------- Class game data ---------- */

// PLAY — FIND THE COLOR. One target, three big swatches, calm feedback.
// Distinct colors first, then closer pairs once the game feels easy.
const findRounds=[
 {say:'Find red! The color of strawberries and fire trucks.',choices:[['red',true],['blue',false],['yellow',false]]},
 {say:'Where is blue? The color of the sky.',choices:[['red',false],['blue',true],['green',false]]},
 {say:'Find yellow — the color of the sun!',choices:[['green',false],['yellow',true],['blue',false]]},
 {say:'Now find green. The color of leaves and grass!',choices:[['green',true],['red',false],['purple',false]]},
 {say:'A tricky one: find pink — red’s softer twin.',choices:[['red',false],['pink',true],['white',false]]},
 {say:'Last one — find gray, the elephant’s color!',choices:[['black',false],['gray',true],['brown',false]]}
];

// PRACTICE — MATCH COLORS. A real splash card on the left; three real
// picture cards to choose from. Splash → world, exactly like the cards do.
const matchRounds=[
 {slug:'red',say:'Here is the red splash. Tap the red thing!'},
 {slug:'blue',say:'A blue splash — which picture is blue?'},
 {slug:'yellow',say:'Yellow splash! Find the yellow picture.'},
 {slug:'green',say:'Here is green. Tap the green thing!'},
 {slug:'orange',say:'An orange splash — where is the orange picture?'},
 {slug:'brown',say:'Brown splash! Which one is the brown thing?'}
];

// PLAY — MIX COLORS. Three paint recipes, exactly as specified: these are
// PAINT results — the colors you get mixing real paints at the table.
const mixes=[
 {a:'red',b:'yellow',makes:'orange',say:'Red and yellow are both warm and loud together. Dip one hand in each... and stir! Orange, like the fruit and the splash card.'},
 {a:'blue',b:'yellow',makes:'green',say:'Blue and yellow meet in the middle... green! The color of leaves, grass and frogs.'},
 {a:'red',b:'blue',makes:'purple',say:'Red and blue make the fancy one — purple! Grapes, plums and flowers.'}
];

/* ---------- The class page ---------- */

export function colorsClassBody(L){
 const chips=[['Age','3 Years'],['Class','Preschool 4'],['Subjects','Colors &amp; color mixing']];
 const ledes=[
  'Twenty-four cards in twelve color pairs, three gentle games and a real mixing experiment — this class follows Shapes &amp; Patterns on the preschool path. Red, blue and yellow are old friends by now; today they learn to mix.',
  'These mixing results are paint colors — the kind you get with real paints at the craft table. Start with the two colors your child already names best, and let the rest of the set wait its turn.'
 ];
 const heroInner=`<span class="eyebrow">${esc(L.eyebrow)}</span>
  <h1>${esc(L.h1)}</h1>
  <div class="fc-chips lesson-chips">${chips.map(([k,v])=>`<span><strong>${k}</strong> ${v}</span>`).join('')}</div>
  ${ledes.map(p=>`<p class="lesson-lede">${p}</p>`).join('\n  ')}
  <div class="lesson-start"><a class="button" href="#todays-class">Start Today’s Class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Grown-up nearby, little one on the lap or wandering the room — both work.</span></div>`;

 // Learn Colors: 24 slides — the eleven color splashes first, then the
 // eleven matching pictures, then the two rainbow cards as the finale.
 const splashSlides=CARDS.filter(c=>c.slug!=='rainbow').map((c,i)=>{
  const d=contentOf(c.slug);
  return `<figure class="lv-card" data-cl-group="splash"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}"${i===0?'':' loading="lazy"'} data-lv-say="${esc(d.say)}" data-lv-find="${esc('Say '+d.word.toLowerCase()+' — then find something this color in the room!')}"></figure>`;
 }).join('');
 const picSlides=CARDS.filter(c=>c.slug!=='rainbow').map(c=>{
  const d=contentOf(c.slug);
  return `<figure class="lv-card" data-cl-group="picture"><img src="${base}${c.picFile}" width="${c.w}" height="${c.h}" alt="${esc(c.picAlt)}" loading="lazy" data-lv-say="${esc(d.sayPic)}" data-lv-find="${esc('Where else does '+d.word.toLowerCase()+' hide in your house?')}"></figure>`;
 }).join('');
 const rainbowSlides=CARDS.filter(c=>c.slug==='rainbow').map(c=>{
  const d=contentOf(c.slug);
  return `<figure class="lv-card" data-cl-group="rainbow"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy" data-lv-say="${esc(d.say)}" data-lv-find="Say all six colors together — red, orange, yellow, green, blue, purple!"></figure>`+
         `<figure class="lv-card" data-cl-group="rainbow"><img src="${base}${c.picFile}" width="${c.w}" height="${c.h}" alt="${esc(c.picAlt)}" loading="lazy" data-lv-say="${esc(d.sayPic)}" data-lv-find="Draw a rainbow together — six crayons, six arcs!"></figure>`;
 }).join('');
 const slides=splashSlides+picSlides+rainbowSlides;
 const learnSection=`<section class="wrap lesson-section" id="learn-colors" aria-label="Learn colors">
  <span class="eyebrow">LEARN COLORS</span>
  <h2>Eleven splashes, eleven pictures, one rainbow.</h2>
  <p class="lesson-copy">First the pure color — a big, unmissable splash with its name. Then the same color living on a real thing: a red apple, a blue car, a gray elephant. Use the arrows to wander, or simply scroll. Name each color, then let your child spot it in the room before moving on.</p>
  <div class="lv-groups" data-cl-groups hidden><button type="button" class="lv-group-chip is-on" data-cl-group="all" aria-pressed="true">All 24</button><button type="button" class="lv-group-chip" data-cl-group="splash" aria-pressed="false">The splashes</button><button type="button" class="lv-group-chip" data-cl-group="picture" aria-pressed="false">The pictures</button><button type="button" class="lv-group-chip" data-cl-group="rainbow" aria-pressed="false">The rainbow</button></div>
  <div class="lv-frame" data-lesson-viewer>
   <div class="lv-stage" data-lv-stage></div>
   <p class="lv-caption" data-lv-caption hidden></p>
   <div class="lv-controls" data-lv-controls><button type="button" class="lv-btn" data-lv-prev>Previous</button><span class="lv-count" data-lv-count aria-live="polite" aria-atomic="true">Card 1 of ${CARDS.length*2}</span><button type="button" class="lv-btn" data-lv-next>Next</button></div>
   <div class="lv-actions" data-lv-actions><button type="button" class="lv-btn lv-ghost" data-lv-full>Full screen</button></div>
   <div class="lv-begin"><button type="button" class="button" data-lv-start>Start the color cards</button><span class="lv-beginhint">Or simply scroll: all ${CARDS.length*2} cards are below.</span></div>
  </div>
  <div class="lv-grid" data-lv-grid>${slides}</div>
 </section>`;

 const findSection=`<section class="wrap lesson-section tc-game" id="find-the-color" aria-label="Play: find the color" data-tc-correct="You found it!|Great spotting!|Color found!" data-tc-incorrect="Let’s look together.">
  <span class="eyebrow">PLAY · FIND THE COLOR</span>
  <h2>Find the color.</h2>
  <p class="lesson-copy">Say the color out loud, then let your child tap the matching splash. A miss is just a look-again — there are no points, no timers and nothing to lose. The last two rounds get sneaky: pink hides near red, and gray hides between black and white.</p>
  ${findRounds.map(r=>`<div class="tc-round" data-tc-round data-tc-ask="${esc(r.say)}"><p class="tc-ask">${r.say}</p><div class="tc-choices" role="group" aria-label="${esc(r.say)}">${r.choices.map(([s,ok])=>colorFace(s,{correct:ok,asChoice:true})).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`).join('')}
 </section>`;

 const matchSection=`<section class="wrap lesson-section tc-game" id="match-colors" aria-label="Practice: match colors" data-tc-correct="That’s the one!|Perfect match!|You matched it!" data-tc-incorrect="Try another picture — say the color’s name slowly.">
  <span class="eyebrow">PRACTICE · MATCH COLORS</span>
  <h2>Match the splash to its picture.</h2>
  <p class="lesson-copy">A real splash card on the left, three picture cards on the right. Say the color’s name, then tap the picture where that color lives. This is the heart of the whole class: a color is not just a splash — it is a thing in the world.</p>
  ${matchRounds.map(r=>{const target=cardBySlug[r.slug];const wrong=CARDS.filter(c=>c.slug!==r.slug&&c.slug!=='rainbow');const k=CARDS.indexOf(target);const picks=[target,wrong[(k*3)%wrong.length],wrong[(k*5+1)%wrong.length]];return `<div class="tc-round tc-match" data-tc-round data-tc-ask="${esc(r.say)}"><p class="tc-ask">${r.say}</p><figure class="tc-target tc-target-splash"><span class="eyebrow">THE SPLASH</span><img src="${base}${target.file}" width="${target.w}" height="${target.h}" alt="${esc(target.alt)}" loading="lazy"></figure><div class="tc-choices" role="group" aria-label="${esc(r.say)}">${picks.map(c=>picChoice(c,c.slug===r.slug)).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`;}).join('')}
 </section>`;

 const mixSection=`<section class="wrap lesson-section tc-game" id="mix-colors" aria-label="Play: mix colors">
  <span class="eyebrow">PLAY · MIX COLORS</span>
  <h2>Mix colors.</h2>
  <p class="lesson-copy">Two splashes walk into a pot... and make a brand-new color. These are <strong>paint colors</strong> — the results you get when you mix real paints at the table, the way this class does it off screen. Tap “Mix them!” and see what the pair becomes.</p>
  <div class="mix-board" data-mix-board>
   ${mixes.map(m=>`<div class="mix-station" data-mix data-mix-a="${m.a}" data-mix-b="${m.b}" data-mix-makes="${m.makes}">
    <div class="mix-drops">
     <span class="mix-drop md-${m.a}" aria-hidden="true"></span><span class="mix-plus" aria-hidden="true">+</span>
     <span class="mix-drop md-${m.b}" aria-hidden="true"></span><span class="mix-plus" aria-hidden="true">=</span>
     <span class="mix-drop mix-result md-${m.makes}" data-mix-result aria-hidden="true"></span>
    </div>
    <p class="mix-line"><strong>${esc(COLOR_NAME[m.a])}</strong> + <strong>${esc(COLOR_NAME[m.b])}</strong> make <strong data-mix-word>${esc(COLOR_NAME[m.makes])}</strong></p>
    <button type="button" class="button" data-mix-mix>Mix them!</button>
    <p class="tc-feedback" data-mix-feedback aria-live="polite" hidden>${esc(m.say)}</p>
   </div>`).join('')}
  </div>
  <p class="lesson-note">One grown-up honesty note: screens mix colors with light, paints mix with pigment — so this page shows the paint results your child will actually get at the craft table. Real mixing happens off screen, in step six.</p>
 </section>`;

 const rainbowSection=`<section class="wrap lesson-section" id="rainbow" aria-label="Rainbow activity">
  <span class="eyebrow">RAINBOW ACTIVITY</span>
  <h2>Every color at once.</h2>
  <p class="lesson-copy">The rainbow is the whole class in one arc: red, orange, yellow, green, blue, purple — in that famous order. Point at each stripe together and say its color, then tap the stripes below to check them off.</p>
  <div class="rb-board" data-rainbow-board>
   <ol class="rb-strip" role="list" aria-label="The six rainbow colors in order: red, orange, yellow, green, blue, purple.">
    ${RAINBOW.map((s,i)=>`<li class="rb-chip cf-${s}" data-rb-color="${s}"><span class="rb-num" aria-hidden="true">${i+1}</span><span class="rb-name">${esc(COLOR_NAME[s])}</span><span class="rb-check" aria-hidden="true">✓</span></li>`).join('')}
   </ol>
   <p class="tc-feedback" data-rb-status aria-live="polite" hidden></p>
  </div>
  <div class="tc-hunt"><h3>Rainbow spotting</h3><ul class="lesson-prompts"><li>After rain, look for the real thing — sun plus shower makes rainbows, and one in the sky is a whole lesson.</li><li>No rainbow outside? Draw one together: six crayons, six arcs, any size of paper. A rainbow from memory counts.</li></ul></div>
 </section>`;

 const offScreenSection=`<section class="wrap lesson-section" id="off-screen" aria-label="Take it off screen">
  <span class="eyebrow">TAKE IT OFF SCREEN</span>
  <h2>Colors that live in your house.</h2>
  <p class="lesson-copy">Color words stick away from the screen, in short playful hunts with real things. Pick one of these — two minutes is plenty — and follow your child’s lead.</p>
  <div class="tc-hunt"><h3>The color of the day</h3><ul class="lesson-prompts"><li>Pick one color card in the morning and hunt that color all day: clothes, cups, cars, cushions.</li><li>Keep a running count out loud — “that’s four red things!” — and let your child shout each new find.</li></ul></div>
  <div class="tc-hunt"><h3>Real paint mixing</h3><ul class="lesson-prompts"><li>Two blobs of washable, child-safe paint on paper — red and yellow first. Let your child swirl them with a brush or a finger and watch orange arrive.</li><li>Then blue + yellow, then red + blue. Grown-up job: stay close, protect the table, and let your child do ALL the stirring. No wiping mid-mix — the brown surprise can wait for another day.</li></ul></div>
  <div class="tc-hunt"><h3>Color snack plate</h3><ul class="lesson-prompts"><li>Snack time becomes color time: red strawberries, yellow banana, green cucumber, orange segments — name each color as you serve it.</li><li>Let your child build a plate of one single color for their teddy. Appetites and attention spans both welcome.</li></ul></div>
  <div class="tc-hunt"><h3>Laundry sort</h3><ul class="lesson-prompts"><li>Sorting socks by color is a real color lesson disguised as a chore. Whites here, darks there — your child is now a color sorter.</li><li>Mismatched socks are fine. The game is the naming, not the pairing.</li></ul></div>
  <p class="lesson-note">Stay close, keep it playful and stop while it is still fun. There is nothing to finish here.</p>
 </section>`;

 const printSection=`<section class="wrap lesson-section tc-printables" id="printables" aria-label="Print the cards">
  <span class="eyebrow">PRINT THE CARDS</span>
  <h2>Take the colors to the kitchen table.</h2>
  <p class="lesson-copy">All twelve color pairs print one pair to a page — the splash beside its matching picture — straight from your browser. No PDF, no sign-up, nothing to install.</p>
  <div class="hero-actions tc-print-actions"><a class="button" href="${CLASS_PATH}print/">View Printable Cards <span aria-hidden="true">↗</span></a><button type="button" class="button button-ghost" data-tc-print-open="${CLASS_PATH}print/?print=1">Print Cards</button></div>
  <p class="lesson-note">Printed cards love fridges, bedroom doors and kitchen tables. The same cards also live in the <a href="${SET_URL}">flashcards library</a>, each with its own page.</p>
 </section>`;

 const teacherNoteSection=`<section class="wrap lesson-section"><span class="eyebrow">TEACHER NOTE</span><h2>One last word from class.</h2><div class="tc-note-block tc-teacher"><p class="tc-say">“You did some lovely color spotting today. Colors are hiding everywhere now — in snacks, socks and the sky. Keep naming them together, and save a little paint for tomorrow. See you in class!”</p><p class="tc-who">— Your Kiddo School teacher</p></div></section>`;
 const principalSection=`<section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2><p class="lesson-copy">At three, color learning is naming and noticing, not color theory: eleven color words, met one at a time in real places, do more than any worksheet. The mixing games here are previews, not tests — red + yellow = orange is worth knowing at the paint table, and nobody needs to memorize it first. Everything gives calm feedback with no scores, and the color swatches are drawn by the page itself, so the games never depend on a picture that might not load.</p><p class="lesson-copy"><a href="/about/#principal">More from the Principal’s Office <span aria-hidden="true">↗</span></a></p></section>`;

 const completeSection=`<section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>Wonderful color spotting!</h2>
  <p class="lesson-copy">Whether you met two colors or all twelve, that was the whole class — and stopping early is always allowed. The splashes will be right here, and so will the mixing pot, whenever you come back. Next stop on the preschool path: opposites — where big meets small and full meets empty.</p>
  <div class="hero-actions"><a class="button" href="#todays-class">Explore Again <span aria-hidden="true">↑</span></a><a class="button button-ghost" href="${SET_URL}">View Color Flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
  <div class="lesson-path"><a class="fc-stage lesson-card-link" href="/preschool/3-years/opposites-and-comparing/"><div class="fc-stage-pills"><span class="fc-age">Where next</span><span class="fc-class">Class 5</span></div><h3>Opposites &amp; Comparing</h3><p>The next preschool class is ready: six honest opposite pairs — big and small, full and empty, open and closed — with comparing games to play together.</p><span class="fc-open">Go to the next class <span aria-hidden="true">↗</span></span></a></div>
 </section>`;

 const tipsSection=`<section class="wrap lesson-section" id="how-to">
  <span class="eyebrow">TIPS FOR PARENTS</span>
  <h2>How to use this class.</h2>
  <p class="lesson-copy">Sit together for the card viewing, and let your child do the tapping in the games — even when the answer looks obvious to you. Saying the color word while touching something that color is the fastest route in: “red strawberry”, “blue cup”, “yellow banana”.</p>
  <p class="lesson-copy">Save the mixing for the very end, or for a day with paints on the table. Mixing is the reward for knowing the ingredients — and wiping up together is part of the lesson too.</p>
  <p class="lesson-note">Age 3 is a guide, not a deadline. If today’s class was one red thing found in the garden, today’s class was a success.</p>
 </section>`;

 // Classroom activities: this class's Age 3 magic game.
 const magicGameSection=`<section class="wrap lesson-section" id="classroom-activities" aria-label="Classroom activities">
  <span class="eyebrow">CLASSROOM ACTIVITIES</span>
  <h2>Mix paint colors — without the mess.</h2>
  <p class="lesson-copy">The class mix pot now has a game of its own. Magic Color Lab lets your child tap two paint splashes — red, yellow or blue — and watch them combine into orange, green or purple, with a friendly explanation for every recipe.</p>
  <div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/3-years/magic-color-mixing/">Play the Magic Color Lab game <span aria-hidden="true">↗</span></a></div>
 </section>`;

 return `${crumbNav([['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Colors & Color Mixing']])}
 <article class="wrap lesson-hero"><div class="lesson-hero-copy">${heroInner}</div></article>
 ${`<section class="wrap lesson-section" id="todays-class" aria-label="Today’s class">
  <span class="eyebrow">TODAY’S CLASS</span>
  <h2>How today’s class works.</h2>
  <p class="lesson-copy">Eight little steps, in any order that suits you: a welcome from your teacher, the color cards, two find-and-match games, the mixing pot, a rainbow to explore, an off-screen hunt, and a warm goodbye. Stop after any step — that is a complete class, and there is never a score at the end.</p>
  <ol class="tc-flow">
   <li><span>1</span> Teacher welcome</li>
   <li><span>2</span> Learn colors</li>
   <li><span>3</span> Play: find the color</li>
   <li><span>4</span> Practice: match colors</li>
   <li><span>5</span> Play: mix colors</li>
   <li><span>6</span> Rainbow activity</li>
   <li><span>7</span> Take it off screen</li>
   <li><span>8</span> Class complete</li>
  </ol>
  <div class="tc-note-block tc-teacher"><span class="eyebrow">TEACHER WELCOME</span><p class="tc-say">“Hello, my friend — and hello to you, grown-up helper! Today we’re playing with colors. We’ll look at splashes, find colors in pictures, and even mix a few — like real paints. Start with the colors your child already loves.”</p><p class="tc-who">— Your Kiddo School teacher</p></div>
  <div class="lesson-start"><a class="button" href="#learn-colors">Begin the class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">First stop: the color cards. Or jump straight to a game below.</span></div>
 </section>`}
 ${learnSection}
 ${findSection}
 ${matchSection}
 ${mixSection}
 ${rainbowSection}
 ${offScreenSection}
 ${printSection}
 ${teacherNoteSection}
 ${principalSection}
 ${magicGameSection}
 ${completeSection}
 ${tipsSection}`;
}
