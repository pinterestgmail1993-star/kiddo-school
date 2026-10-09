// Kiddo School — Magic Fruit Basket (Age 3 interactive game).
// /preschool/3-years/magic-fruit-basket/ — built on the ten owner-uploaded
// transparent WebP illustrations in
// school/interactive-activities/magic-fruit-basket-age-3/ (all probed
// 1264×1264). Seven screens: welcome, Meet the Fruits (tap to hear the
// name), Fill the Basket (drag or tap), Find the Fruit, Count the Fruits,
// off-screen kitchen play and a celebration. Find and Count rounds run on
// the site's shared find-it engine (data-tc-round in site.js); the screen
// flow, speech and basket physics live in magic-fruit-basket.js as
// progressive enhancement — without JavaScript every screen is visible and
// reads as a scroll-through activity. No scores, no timers, no streaks,
// and no download buttons for the game assets. Fruit names are spoken by
// the device's own screen voice (speechSynthesis) with visible text
// alternatives — never claimed to be recordings.
const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const P='school/interactive-activities/magic-fruit-basket-age-3/';
const W=1264,H=1264;

export const magicFruit={
 path:'/preschool/3-years/magic-fruit-basket/',
 seoTitle:'Magic Fruit Basket — a Fruit Game for 3 Year Olds',
 h1:'Magic Fruit Basket',
 description:'A gentle fruit game for 3-year-olds: meet eight fruits, fill a magic basket by tapping or dragging, play find-the-fruit and count together — with off-screen kitchen play. No scores, no sign-up.',
 eyebrow:'PRESCHOOL · AGE 3 · CLASS 8 MAGIC GAME',
 crumbs:[['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Fruits & Vegetables','/preschool/3-years/fruits-and-vegetables/'],['Magic Fruit Basket',null]],
 ogImage:R2+P+'10-fruit-basket-cover.webp',
 ogAlt:'Cover of the Magic Fruit Basket game: a woven basket surrounded by colorful fruit illustrations',
 classPath:'/preschool/3-years/fruits-and-vegetables/',
 classTitle:'Fruits &amp; Vegetables'
};

const FRUITS=[
 {slug:'apple',file:'01-apple.webp',bg:'#f7d9d4',alt:'A shiny red apple with a small green leaf and a brown stem',say:'A shiny red apple — crunch, crunch!'},
 {slug:'banana',file:'02-banana.webp',bg:'#f6ecc4',alt:'A yellow banana, gently curved like a smile',say:'A yellow banana, curved like a smile.'},
 {slug:'orange',file:'03-orange.webp',bg:'#f8e0bd',alt:'A round orange with a dimpled peel and a little green leaf',say:'A round orange — the fruit with its own color.'},
 {slug:'strawberry',file:'04-strawberry.webp',bg:'#f7d9d4',alt:'A bright red strawberry with its seeds dotted on the outside',say:'A bright red strawberry with seeds on the outside.'},
 {slug:'grapes',file:'05-grapes.webp',bg:'#e9dff0',alt:'A bunch of purple grapes hanging from a small stem',say:'A bunch of purple grapes — one word for many little balls.'},
 {slug:'watermelon',file:'06-watermelon.webp',bg:'#dcead2',alt:'A watermelon slice with green rind, pink flesh and black seeds',say:'A watermelon slice — green outside, red inside.'},
 {slug:'pineapple',file:'07-pineapple.webp',bg:'#f8e8bd',alt:'A golden pineapple wearing a spiky green crown',say:'A golden pineapple wearing a spiky crown.'},
 {slug:'mango',file:'08-mango.webp',bg:'#f8e0bd',alt:'A golden mango blushing orange with a small leaf',say:'A golden mango — say it slowly: mmmm-mango.'}
];
const img=(f,cls='',eager=false)=>`<img src="${R2+P+f.file}" width="${W}" height="${H}" alt="${f.alt}"${eager?'':' loading="lazy"'}${cls?` class="${cls}"`:''}>`;

const FIND_ROUNDS=[
 {ask:'Tap the apple!',choices:['apple','orange','mango'],correct:0},
 {ask:'Tap the pineapple!',choices:['grapes','pineapple','banana'],correct:1},
 {ask:'Tap the watermelon!',choices:['watermelon','strawberry','orange'],correct:0},
 {ask:'Tap the grapes!',choices:['mango','apple','grapes'],correct:2},
 {ask:'Tap the strawberry!',choices:['banana','strawberry','pineapple'],correct:1}
];
const COUNT_ROUNDS=[
 {fruit:'apple',n:3,ask:'How many apples?'},
 {fruit:'banana',n:2,ask:'How many bananas?'},
 {fruit:'grapes',n:5,ask:'How many bunches of grapes?'},
 {fruit:'strawberry',n:4,ask:'How many strawberries?'}
];

export function magicFruitBody(G){
 const hero=`<section class="wrap section compact">
  <span class="eyebrow">${G.eyebrow}</span>
  <h1>${G.h1}</h1>
  <p class="mw-lede">Eight fruits, one basket and a little bit of magic. Meet the fruits, fill the basket, find them, count them — then hunt for real fruit in your kitchen. Grown-ups read the words; little ones do the tapping.</p>
  <div class="mg-game" data-mg-game="fruit-basket">
   <p class="mg-live" data-mg-live aria-live="polite"></p>
   <div class="mg-screens">`;

 const welcome=`<section class="mg-screen" data-mg-screen="welcome" aria-label="Welcome to the Magic Fruit Basket">
   <figure class="mg-cover"><img src="${R2+P}10-fruit-basket-cover.webp" width="${W}" height="${H}" alt="The Magic Fruit Basket cover: a woven basket surrounded by colorful fruit illustrations" fetchpriority="high"><figcaption class="fc-hint">Welcome to the Magic Fruit Basket!</figcaption></figure>
   <div class="mg-actions" style="justify-content:center"><button type="button" class="button" data-mg-go="meet">Start Playing <span aria-hidden="true">↗</span></button></div>
   <p class="mg-hint" style="text-align:center">No scores, no timers — just fruit play.</p>
  </section>`;

 const meet=`<section class="mg-screen" data-mg-screen="meet" aria-label="Meet the fruits">
   <span class="eyebrow">STEP 2 · MEET THE FRUITS</span>
   <h2>Eight fruits are waiting to say hello.</h2>
   <p class="lesson-copy">Tap a fruit to hear its name spoken out loud. Say it together — then tap the next one. Which fruit do you have at home?</p>
   <div class="mg-tiles">${FRUITS.map(f=>`<button type="button" class="mg-tile" data-mg-say="${f.slug}" style="background:${f.bg}" aria-label="Tap to hear the ${f.slug} name">${img(f)}<span class="mg-tile-word">${f.slug.charAt(0).toUpperCase()+f.slug.slice(1)}</span></button>`).join('')}</div>
   <p class="mg-hint">The names are spoken by your device&rsquo;s friendly screen voice. The words on each card are the text alternative — read them together any time.</p>
   <div class="mg-next"><button type="button" class="button" data-mg-go="fill">Fill the Basket <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const fill=`<section class="mg-screen" data-mg-screen="fill" aria-label="Fill the basket">
   <span class="eyebrow">STEP 3 · FILL THE BASKET</span>
   <h2>Put every fruit in the magic basket.</h2>
   <p class="lesson-copy">Drag a fruit into the basket — or tap the fruit, then tap the basket. Watch it land with a gentle pop!</p>
   <div class="mg-basket-stage">
    <div class="mg-basket" data-mg-basket>
     <img src="${R2+P}09-fruit-basket.webp" width="${W}" height="${H}" alt="An empty woven basket with a rope handle, waiting to be filled" loading="lazy">
     <span class="mg-landed" data-mg-landed aria-hidden="true"></span>
    </div>
    <p class="mg-basket-count" data-mg-basket-count aria-live="polite">The basket is empty.</p>
    <p class="mg-hint" data-mg-basket-hint>Tap a fruit below, then tap the basket. (Dragging works too.)</p>
    <div class="mg-tray" data-mg-tray role="group" aria-label="Fruits to put in the basket">${FRUITS.map(f=>`<button type="button" class="mg-fruit" data-mg-fruit="${f.slug}" data-mg-drop="${f.slug}" aria-label="${f.slug.charAt(0).toUpperCase()+f.slug.slice(1)} — tap me, then tap the basket">${img(f)}<span>${f.slug.charAt(0).toUpperCase()+f.slug.slice(1)}</span></button>`).join('')}</div>
   </div>
   <div class="mg-next"><button type="button" class="button" data-mg-go="find" hidden>Find the Fruit <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const find=`<section class="mg-screen" data-mg-screen="find" aria-label="Find the fruit" data-tc-correct="You found it!|That’s the one!|Great looking!" data-tc-incorrect="Look again together — say the fruit’s name slowly, then try another card.">
   <span class="eyebrow">STEP 4 · FIND THE FRUIT</span>
   <h2>Find the fruit.</h2>
   <p class="lesson-copy">You read the words, your child taps the fruit. A miss is just another look.</p>
   ${FIND_ROUNDS.map(r=>`<div class="tc-round" data-tc-round data-tc-ask="${r.ask}">
<p class="tc-ask">${r.ask}</p>
<div class="tc-choices" role="group" aria-label="${r.ask}">${r.choices.map((slug,i)=>{const f=FRUITS.find(x=>x.slug===slug);return `<button type="button" class="tc-choice" aria-label="${f.slug.charAt(0).toUpperCase()+f.slug.slice(1)}"${i===r.correct?' data-tc-correct="true"':''}>${img(f)}</button>`;}).join('')}</div>
<p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p>
</div>`).join('')}
   <div class="mg-next"><button type="button" class="button" data-mg-go="count">Count the Fruits <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const count=`<section class="mg-screen" data-mg-screen="count" aria-label="Count the fruits" data-tc-correct="You counted it!|That’s the number!|Great counting!" data-tc-incorrect="Count them together on your fingers — then tap the number.">
   <span class="eyebrow">STEP 5 · COUNT THE FRUITS</span>
   <h2>Count them out loud.</h2>
   <p class="lesson-copy">Point at each fruit and count: one… two… three… then tap the number you said.</p>
   ${COUNT_ROUNDS.map(r=>{const f=FRUITS.find(x=>x.slug===r.fruit);return `<div class="tc-round" data-tc-round data-tc-ask="${r.ask}" data-mg-count="${r.n}">
<p class="tc-ask">${r.ask}</p>
<div class="mg-count-row" aria-hidden="true">${Array.from({length:r.n},()=>img(f)).join('')}</div>
<div class="mg-numbers" role="group" aria-label="${r.ask} Choose a number.">${[1,2,3,4,5].map(n=>`<button type="button" class="tc-choice mg-num" aria-label="${n}"${n===r.n?' data-tc-correct="true"':''}>${n}</button>`).join('')}</div>
<p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p>
</div>`;}).join('')}
   <div class="mg-next"><button type="button" class="button" data-mg-go="offscreen">Off-Screen Play <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const offscreen=`<section class="mg-screen" data-mg-screen="offscreen" aria-label="Off-screen fruit play">
   <span class="eyebrow">STEP 6 · OFF-SCREEN PLAY</span>
   <h2>The kitchen fruit hunt.</h2>
   <p class="lesson-copy">The magic continues away from the screen. Pick one of these — five minutes is plenty — and let your child lead.</p>
   <div class="tc-hunt"><h3>Basket hunt</h3><ul class="lesson-prompts"><li>Take a real basket or bowl and hunt the kitchen together: an apple, a banana, whatever fruit lives with you. Every find goes in with a proud “plop!” — just like the game.</li></ul></div>
   <div class="tc-hunt"><h3>Guess my fruit</h3><ul class="lesson-prompts"><li>Hide a fruit behind your back and give clues: “It is yellow and curved like a smile!” Let your child guess — then swap roles and let them be the tricky one.</li></ul></div>
   <div class="tc-hunt"><h3>Count the fruit bowl</h3><ul class="lesson-prompts"><li>Pour out the fruit bowl and count it together: how many apples? How many altogether? Real fruit beats flashcards every time.</li></ul></div>
   <p class="lesson-note"><strong>One safety word for this game:</strong> wash fruits before touching mouths, grown-ups do all the cutting, whole grapes are cut small for little mouths, and everyone sits down while eating. Tasting is for real food a grown-up has checked — never anything you find on the floor.</p>
   <div class="mg-next"><button type="button" class="button" data-mg-go="complete">Finish the Magic <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const complete=`<section class="mg-screen" data-mg-screen="complete" aria-label="Activity complete">
   <span class="eyebrow">STEP 7 · ACTIVITY COMPLETE</span>
   <h2>The basket is magic — and so are you!</h2>
   <p class="lesson-copy">You met eight fruits, filled the basket, found them hiding and counted them out loud. Whether you played one step or all of them, that was real learning — and there was never a score to worry about. The real basket in your kitchen is waiting for its next fruit hunt.</p>
   <div class="mg-actions"><button type="button" class="button" data-mg-replay>Play Again <span aria-hidden="true">↺</span></button><a class="button button-ghost" href="${G.classPath}">Back to Fruits &amp; Vegetables <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
   <div class="lesson-path">
    <a class="fc-stage lesson-card-link" href="${G.classPath}"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Class 8</span></div><h3>Fruits &amp; Vegetables</h3><p>The full class: sixteen food cards, a fruit-or-vegetable sorting game, matching twins and color rows.</p><span class="fc-open">Open this class <span aria-hidden="true">↗</span></span></a>
    <a class="fc-stage lesson-card-link" href="/preschool/3-years/"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Magic games</span></div><h3>More magic games</h3><p>Try Magic Counting Garden, Animal Sound Safari or Look & Draw — Magic Shapes — every Age 3 game lives on the stage shelf.</p><span class="fc-open">Choose another game <span aria-hidden="true">↗</span></span></a>
   </div>
  </section>`;

 return `${hero}
${welcome}
${meet}
${fill}
${find}
${count}
${offscreen}
${complete}
   </div>
   <noscript><p class="fc-hint">No JavaScript? Every screen is right here — read them top to bottom, tap what you can, and play the kitchen hunt for real. The magic works on paper too.</p></noscript>
  </div>
 </section>
 <section class="wrap lesson-section" id="for-grown-ups" aria-label="About this game">
  <span class="eyebrow">FOR GROWN-UPS</span>
  <h2>How the magic works.</h2>
  <p class="lesson-copy">This game uses the eight fruit illustrations from the Fruits &amp; Vegetables class — the same pictures your child may already know from their <a href="/flashcards/fruits-and-vegetables/">flashcard pages</a>. Tapping a fruit speaks its name with your device&rsquo;s built-in screen voice; if your device is quiet or you prefer it, the name is always written right there on the card, and saying it in your own voice is even better.</p>
  <p class="lesson-copy">Fill the Basket works by tapping (tap the fruit, then tap the basket) or by dragging, so both big-desktop mice and small-tablet fingers are welcome. Nothing is graded: the counter on the basket only counts how many fruits have landed, and misses simply mean another try.</p>
  <p class="lesson-note">Playing side by side beats playing alone at this age. Ask “which one is your favorite?” — and let the kitchen finish the lesson.</p>
 </section>`;
}
