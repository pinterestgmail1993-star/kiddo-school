// Kiddo School — Preschool 8 (Age 3): Fruits & Vegetables.
// Full class at /preschool/3-years/fruits-and-vegetables/, built on the
// sixteen owner-uploaded cards (eight fruits + eight vegetables, no cover
// file — the strawberry card fronts the set). Reuses the site's shared
// pieces: the lesson card viewer (data-lesson-viewer in site.js) for Meet
// the Foods, the calm find-it engine (data-tc-round) for the Fruit or
// Vegetable sort, Find the Food and the buckets, and a small
// progressive-enhancement match board (fruits-class.js) for Match &
// Remember. Colors & Counting is a parent-led chart built only from the
// real cards and verifiable counts. Without JavaScript every activity
// still reads as a script — chips stay hidden, the board is an honest
// pointing chart, and the noscript notes say exactly that. The family
// feedback section and the flashcards pill are injected by the build for
// every class page — the body here ends at the tips section.
import {fruitsLesson,fruitsCardContent} from './flashcards/data-fruits-vegetables.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const base=fruitsLesson.r2Base+fruitsLesson.folder;
const CARDS=fruitsLesson.cards;
const cardBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));
const SET_URL='/flashcards/fruits-and-vegetables/';
const CLASS_PATH=fruitsLesson.path;

const cardImg=(c,extra='')=>`<img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"${extra}>`;
const nameOf=slug=>fruitsCardContent[slug].word;
const crumbNav=(crumbs)=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${crumbs.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${esc(href)}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;

const FRUITS=['apple','banana','orange','strawberry','grapes','watermelon','pineapple','mango'];
const VEGETABLES=['carrot','potato','tomato','cucumber','broccoli','corn','onion','pumpkin'];
const FRUIT_OF=Object.fromEntries([...FRUITS.map(s=>[s,'fruit']),...VEGETABLES.map(s=>[s,'vegetable'])]);

/* ---------- Class game data ---------- */

/* Viewer captions, Meet the Foods: one thing to say, one thing to do —
   per food, in card order. */
const VIEWER=[
 {slug:'apple',say:'A shiny red apple — crunchy, juicy and probably in your kitchen right now.',find:'Count the apples in your fruit bowl together.'},
 {slug:'banana',say:'A yellow banana, curved like a smile.',find:'Say it in three claps: ba-na-na!'},
 {slug:'orange',say:'A round orange — the only food named after its own color.',find:'Sniff an orange peel: sunny!'},
 {slug:'strawberry',say:'A bright red strawberry with its seeds on the outside.',find:'Look at a real one: how many seeds can you count?'},
 {slug:'grapes',say:'A bunch of purple grapes — one word for many little balls.',find:'Share a bunch: one for you, one for me.'},
 {slug:'watermelon',say:'A watermelon slice — green outside, red inside, seeds like tiny buttons.',find:'Tap the seeds on the card: one, two, three…'},
 {slug:'pineapple',say:'A golden pineapple wearing a spiky green crown.',find:'Feel a real one: bumpy on the outside, sweet inside.'},
 {slug:'mango',say:'A golden mango, blushing orange — say it slowly: mmmm-mango.',find:'Squeeze one very gently, like a cheek.'},
 {slug:'carrot',say:'An orange carrot — it grows hiding underground.',find:'Crunch a carrot stick like a rabbit.'},
 {slug:'potato',say:'A brown, spotty potato — lumpy, bumpy and proud of it.',find:'Hold a raw potato: heavy, dusty and hard.'},
 {slug:'tomato',say:'A round red tomato wearing a little green crown.',find:'Roll it very gently: round things roll!'},
 {slug:'cucumber',say:'A long green cucumber — the coolest vegetable in the bowl.',find:'Hold a slice on your hand: cool!'},
 {slug:'broccoli',say:'Broccoli — a little tree you can actually eat.',find:'Hold it upside down: fingers are the trunk!'},
 {slug:'corn',say:'A corn cob with kernels lined up like yellow bricks.',find:'Munch across a row, kernel by kernel.'},
 {slug:'onion',say:'A brown onion — papery outside, layer under layer inside.',find:'Peel one together, skin by skin.'},
 {slug:'pumpkin',say:'A big orange pumpkin — the largest vegetable on the cards.',find:'Pat it like a drum: hard and hollow!'}
];

/* Fruit or Vegetable? — eight rounds, mixed, one food each with two word
   buckets. The shared find-it engine watches the buckets; misses are just
   another look. */
const SORT_ROUNDS=['apple','carrot','grapes','potato','mango','broccoli','watermelon','pumpkin'];

/* Find the Food — five rounds, three real-card choices each, one correct,
   positions varied. */
const FIND_ROUNDS=[
 {ask:'Tap the strawberry!',choices:['strawberry','apple','tomato'],correct:0},
 {ask:'Tap the broccoli!',choices:['carrot','broccoli','cucumber'],correct:1},
 {ask:'Tap the pineapple!',choices:['pineapple','corn','mango'],correct:0},
 {ask:'Tap the onion!',choices:['potato','pumpkin','onion'],correct:2},
 {ask:'Tap the orange!',choices:['banana','orange','grapes'],correct:1}
];

/* Match & Remember — six identical-picture pairs, right column shuffled.
   Tap a food, then find its twin. */
const MATCH_LEFT=['apple','banana','carrot','broccoli','grapes','pumpkin'];
const MATCH_RIGHT=['broccoli','apple','pumpkin','banana','carrot','grapes'];

/* Colors & Counting — color rows built only from the real cards, plus
   verifiable counts (8 fruits, 8 vegetables, row sizes). */
const COLOR_ROWS=[
 {color:'Red foods',items:['apple','strawberry','tomato'],say:'Three red foods — count them: one, two, three!'},
 {color:'Yellow foods',items:['banana','pineapple','corn'],say:'Three yellow foods — count them again!'},
 {color:'Orange foods',items:['orange','carrot','pumpkin'],say:'Three orange foods — the color and the fruit share a name on one of them.'},
 {color:'Green foods',items:['watermelon','cucumber','broccoli'],say:'Three green foods — two of them crunch, one is sweet.'},
 {color:'Purple &amp; brown foods',items:['grapes','potato','onion'],say:'One purple bunch, two brown friends — three cards in this row.'}
];

/* ---------- The class page ---------- */

export function fruitsClassBody(L){
 const chips=[['Age','3 Years'],['Class','Preschool 8'],['Subjects','Fruits &amp; vegetables']];
 const ledes=[
  'Sixteen cards about the foods your child already knows: eight fruits, eight vegetables. Meet them all, sort them into their bowls, find them, match them, line them up by color and count them together — this class follows Body Parts &amp; My Five Senses on the preschool path.',
  'Food words are words children use three times a day. You say the name, your child finds the real thing in the kitchen — and suddenly the flashcards and the fruit bowl are the same game.'
 ];
 const heroInner=`<span class="eyebrow">${esc(L.eyebrow)}</span>
  <h1>${esc(L.h1)}</h1>
  <div class="fc-chips lesson-chips">${chips.map(([k,v])=>`<span><strong>${k}</strong> ${v}</span>`).join('')}</div>
  ${ledes.map(p=>`<p class="lesson-lede">${p}</p>`).join('\n  ')}
  <div class="lesson-start"><a class="button" href="#todays-class">Start Today’s Class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Grown-up nearby, snack nearby — both help.</span></div>`;

 // Meet the Foods: all sixteen cards, group chips (fruits / vegetables) as
 // progressive enhancement, each card carrying its say + find captions.
 const slides=VIEWER.map((v,i)=>{
  const c=cardBySlug[v.slug];
  return `<figure class="lv-card" data-fv-group="${FRUIT_OF[v.slug]}"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}"${i===0?'':' loading="lazy"'} data-lv-say="${esc(v.say)}" data-lv-find="${esc(v.find)}"><figcaption class="lv-word">${esc(nameOf(v.slug))}</figcaption></figure>`;
 }).join('');
 const learnSection=`<section class="wrap lesson-section" id="meet-the-foods" aria-label="Meet the foods">
  <span class="eyebrow">MEET THE FOODS</span>
  <h2>Sixteen foods, one happy market.</h2>
  <p class="lesson-copy">Say each food’s name as it arrives, then hunt for the real one in your kitchen later — the pair is the whole lesson. Use the arrows to wander, or simply scroll: all sixteen cards are below.</p>
  <div class="lv-groups" data-fv-groups hidden><button type="button" class="lv-group-chip is-on" data-fv-group-filter="all" aria-pressed="true">All 16</button><button type="button" class="lv-group-chip" data-fv-group-filter="fruit" aria-pressed="false">Fruits</button><button type="button" class="lv-group-chip" data-fv-group-filter="vegetable" aria-pressed="false">Vegetables</button></div>
  <div class="lv-frame" data-lesson-viewer>
   <div class="lv-stage" data-lv-stage></div>
   <p class="lv-caption" data-lv-caption hidden></p>
   <div class="lv-controls" data-lv-controls><button type="button" class="lv-btn" data-lv-prev>Previous</button><span class="lv-count" data-lv-count aria-live="polite" aria-atomic="true">Card 1 of ${VIEWER.length}</span><button type="button" class="lv-btn" data-lv-next>Next</button></div>
   <div class="lv-actions" data-lv-actions><button type="button" class="lv-btn lv-ghost" data-lv-full>Full screen</button></div>
   <div class="lv-begin"><button type="button" class="button" data-lv-start>Start the food cards</button><span class="lv-beginhint">Or simply scroll: all ${VIEWER.length} cards are below.</span></div>
  </div>
  <div class="lv-grid" data-lv-grid>${slides}</div>
  <div class="tc-hunt"><h3>Say it, then spot it</h3><ul class="lesson-prompts"><li>After every few cards, ask “where do we keep the…?” — bananas on the counter, carrots in the drawer. Food words live in places.</li></ul></div>
 </section>`;

 // Fruit or Vegetable? — the sorting game. One food at a time, two word
 // buckets, the shared find-it engine watching; misses are just another look.
 const sortSection=`<section class="wrap lesson-section tc-game" id="fruit-or-vegetable" aria-label="Play: fruit or vegetable" data-tc-correct="You sorted it!|That’s the one!|Great sorting!" data-tc-incorrect="Look again — where does that food belong?">
  <span class="eyebrow">PLAY · FRUIT OR VEGETABLE?</span>
  <h2>Two bowls, sixteen foods.</h2>
  <p class="lesson-copy">Look at the food, then tap the bowl it belongs in: fruit or vegetable. Say the word out loud before you tap — sorting out loud is sorting twice. There are no points, no timers and nothing to lose.</p>
  ${SORT_ROUNDS.map(slug=>{const c=cardBySlug[slug];const kind=FRUIT_OF[slug];return `<div class="tc-round fv-sort" data-tc-round data-fv-sort="${slug}" data-tc-ask="Is ${esc(nameOf(slug).toLowerCase())} a fruit or a vegetable?">
<p class="tc-ask">Is ${esc(nameOf(slug).toLowerCase())} a fruit or a vegetable?</p>
<figure class="tc-target">${cardImg(c)}</figure>
<div class="tc-choices fv-buckets" role="group" aria-label="Is ${esc(nameOf(slug).toLowerCase())} a fruit or a vegetable? Choose a bowl.">
<button type="button" class="tc-choice fv-bucket" aria-label="The fruit bowl"${kind==='fruit'?' data-tc-correct="true"':''}>Fruit</button>
<button type="button" class="tc-choice fv-bucket" aria-label="The vegetable bowl"${kind==='vegetable'?' data-tc-correct="true"':''}>Vegetable</button>
</div>
<p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p>
</div>`;}).join('')}
  <p class="lesson-note">A secret for the grown-ups: scientists sort the tomato with the fruits, cooks sort it with the vegetables. This class follows the kitchen — and now your child knows there are two right answers in the world.</p>
 </section>`;

 // Find the Food: five find-it rounds with real cards.
 const findSection=`<section class="wrap lesson-section tc-game" id="find-the-food" aria-label="Play: find the food" data-tc-correct="You found it!|That’s the one!|Great looking!" data-tc-incorrect="Look again together — say the word slowly, then try another card.">
  <span class="eyebrow">PLAY · FIND THE FOOD</span>
  <h2>Find the food.</h2>
  <p class="lesson-copy">You say the word, your child taps the card. A miss is just another look — say the word together and try again.</p>
  ${FIND_ROUNDS.map(r=>`<div class="tc-round" data-tc-round data-fv-find="${r.choices[r.correct]}" data-tc-ask="${esc(r.ask)}">
<p class="tc-ask">${r.ask}</p>
<div class="tc-choices" role="group" aria-label="${esc(r.ask)}">${r.choices.map((slug,i)=>{const c=cardBySlug[slug];return `<button type="button" class="tc-choice" aria-label="${esc(nameOf(slug))}"${i===r.correct?' data-tc-correct="true"':''}>${cardImg(c)}</button>`;}).join('')}</div>
<p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p>
</div>`).join('')}
 </section>`;

 // Match & Remember: six identical-picture pairs, tap-tap with calm
 // feedback from fruits-class.js; without JS an honest pointing chart.
 const matchSection=`<section class="wrap lesson-section" id="match-and-remember" aria-label="Play: match and remember">
  <span class="eyebrow">PLAY · MATCH &amp; REMEMBER</span>
  <h2>Find the matching pair.</h2>
  <p class="lesson-copy">Six foods on the left, the same six shuffled on the right. Tap a food, then find its twin. Look closely — apples look alike, but only one matches exactly.</p>
  <div class="match-board" data-fv-match-board>
   <div class="match-col">
    <h3>Pick a food</h3>
    <div class="match-grid">${MATCH_LEFT.map(slug=>{const c=cardBySlug[slug];return `<button type="button" class="op-card fv-match" data-match-pair="${slug}" data-match-side="left" aria-label="${esc(nameOf(slug))}. Tap me, then find my twin.">${cardImg(c)}<span class="op-word">${esc(nameOf(slug))}</span></button>`;}).join('')}</div>
   </div>
   <div class="match-col">
    <h3>Find its twin</h3>
    <div class="match-grid">${MATCH_RIGHT.map(slug=>{const c=cardBySlug[slug];return `<button type="button" class="op-card fv-match" data-match-pair="${slug}" data-match-side="right" aria-label="A mystery food. Are you the twin of the tapped food?">${cardImg(c)}</button>`;}).join('')}</div>
   </div>
  </div>
  <p class="match-status" data-fv-match-status aria-live="polite" hidden></p>
  <noscript><p class="fc-hint">No JavaScript? The board still works: point at a food on the left, then find its twin on the right — and say its name together. Matching by pointing is the same game.</p></noscript>
 </section>`;

 // Colors & Counting: color rows from the real cards + counting prompts.
 const colorsSection=`<section class="wrap lesson-section" id="colors-and-counting" aria-label="Colors and counting">
  <span class="eyebrow">COLORS &amp; COUNTING</span>
  <h2>A rainbow you can eat.</h2>
  <p class="lesson-copy">Foods come in every color. Read each row together, count the cards in it, then try the counting games below — all of them use the sixteen cards you already met.</p>
  <ul class="tc-guide">${COLOR_ROWS.map(row=>`<li class="tc-guide-row">${row.items.map(slug=>{const c=cardBySlug[slug];return `<span class="fv-thumb">${cardImg(c)}</span>`;}).join('')}<div><h3>${row.color}</h3><p class="tc-guide-say">${row.say}</p></div></li>`).join('')}</ul>
  <div class="tc-hunt"><h3>Count together</h3><ul class="lesson-prompts">
   <li>Count the fruits: apple, banana, orange, strawberry, grapes, watermelon, pineapple, mango — eight fruits!</li>
   <li>Count the vegetables: carrot, potato, tomato, cucumber, broccoli, corn, onion, pumpkin — eight too!</li>
   <li>Count any row in the chart above — three foods in every row. Which color is your favorite?</li>
   <li>Watermelon seeds and pumpkin seeds: too many to count — counting them anyway is the fun part.</li>
  </ul></div>
 </section>`;

 const offScreenSection=`<section class="wrap lesson-section" id="off-screen" aria-label="Take it off screen">
  <span class="eyebrow">OFF-SCREEN PLAY</span>
  <h2>The kitchen is the classroom.</h2>
  <p class="lesson-copy">Food words are kitchen words. Pick one of these — five minutes is plenty — and let your child lead the hunt.</p>
  <div class="tc-hunt"><h3>The kitchen food hunt</h3><ul class="lesson-prompts"><li>Take three cards — say an apple, a carrot and a corn — and hunt the kitchen for each one. Hold the real food next to its card: same, same, same!</li></ul></div>
  <div class="tc-hunt"><h3>Two bowls, for real</h3><ul class="lesson-prompts"><li>Set out two bowls and sort the actual shopping: fruit in one, vegetables in the other. The sorting game from today, played with things you can eat afterwards.</li></ul></div>
  <div class="tc-hunt"><h3>Market twin hunt</h3><ul class="lesson-prompts"><li>Take one card to the shop or market and find its twin in the pile. One matched carrot is a whole class.</li></ul></div>
  <div class="tc-hunt"><h3>Wash it together</h3><ul class="lesson-prompts"><li>Before any tasting, wash the fruits and vegetables together at the sink. Rubbing a shiny apple dry is a food-hygiene habit that starts here — and a quiet color-and-count moment too.</li></ul></div>
  <p class="lesson-note"><strong>One safety word for this class:</strong> wash foods before touching mouths, grown-ups do all the cutting, whole grapes and cherry tomatoes are cut small for little mouths, and everyone sits down while eating. Tasting is for real food a grown-up has checked — never anything found on the floor or offered by curiosity.</p>
 </section>`;

 const printSection=`<section class="wrap lesson-section tc-printables" id="printables" aria-label="Print the cards">
  <span class="eyebrow">PRINT THE CARDS</span>
  <h2>Take the market to the kitchen table.</h2>
  <p class="lesson-copy">All sixteen cards print two to a page, in card order, straight from your browser — no PDF, no sign-up, nothing to install. Cut them out and the whole market plays on the table.</p>
  <div class="hero-actions tc-print-actions"><a class="button" href="${CLASS_PATH}print/">View Printable Cards <span aria-hidden="true">↗</span></a><button type="button" class="button button-ghost" data-tc-print-open="${CLASS_PATH}print/?print=1">Print Cards</button></div>
  <p class="lesson-note">Printed cards love fridges, snack cups and shopping bags. The same cards also live in the <a href="${SET_URL}">flashcards library</a>, each with its own page.</p>
 </section>`;

 const teacherNoteSection=`<section class="wrap lesson-section"><span class="eyebrow">TEACHER NOTE</span><h2>One last word from class.</h2><div class="tc-note-block tc-teacher"><p class="tc-say">“What a delicious class! Your child named fruits, sorted vegetables, matched twins and counted a whole rainbow of foods — that is real vocabulary, real math and real healthy-eating practice, all in one. Keep the game alive at every meal: name it, find it, count it. See you in class!”</p><p class="tc-who">— Your Kiddo School teacher</p></div></section>`;
 const principalSection=`<section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2><p class="lesson-copy">Naming and sorting food does something quietly powerful: it makes unfamiliar foods familiar before they ever reach the plate. A child who has said “broccoli”, matched its card and held a real one is far more likely to try a bite — curiosity does the persuading, not pressure. Keep meals free of scores and negotiations: the game is naming, finding, washing and counting, and a food that is only looked at today still counts as a win.</p><p class="lesson-copy"><a href="/about/#principal">More from the Principal’s Office <span aria-hidden="true">↗</span></a></p></section>`;

 const completeSection=`<section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>Delicious work!</h2>
  <p class="lesson-copy">Whether you met four foods or all sixteen, that was the whole class — and stopping early is always allowed. The cards will be right here, and so will the sorting bowls and the match board, whenever you come back. The food words are already busy in your house: in the fruit bowl, in the shopping bag, at every snack.</p>
  <div class="hero-actions"><a class="button" href="#todays-class">Explore Again <span aria-hidden="true">↑</span></a><a class="button button-ghost" href="${SET_URL}">View Food Flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
  <div class="lesson-path"><a class="fc-stage lesson-card-link" href="/preschool/3-years/body-parts-and-five-senses/"><div class="fc-stage-pills"><span class="fc-age">Previous class</span><span class="fc-class">Class 7</span></div><h3>Body Parts &amp; My Five Senses</h3><p>Twenty-four cards about your own body — point-and-find games, the five senses and a sense-matching board.</p><span class="fc-open">Open this class <span aria-hidden="true">↗</span></span></a><a class="fc-stage lesson-card-link" href="/preschool/3-years/"><div class="fc-stage-pills"><span class="fc-age">Where next</span><span class="fc-class">More Age 3 classes</span></div><h3>More preschool classes</h3><p>Revisit Alphabet &amp; Letter Sounds, Numbers &amp; Counting (1–10), Shapes &amp; Patterns, Colors &amp; Color Mixing, Opposites &amp; Comparing, Animals &amp; Their Sounds or Body Parts &amp; My Five Senses — or open the Learning Path to see the whole journey from birth to age three.</p><span class="fc-open">Choose the next class <span aria-hidden="true">↗</span></span></a></div>
 </section>`;

 const tipsSection=`<section class="wrap lesson-section" id="how-to">
  <span class="eyebrow">TIPS FOR PARENTS</span>
  <h2>How to use this class.</h2>
  <p class="lesson-copy">Say the word and hold the real food — the pair is what sticks. “Carrot!” while you both touch a carrot in the drawer teaches faster than the screen alone, because the kitchen makes the word true. Let your child take every tap and every sort, even when the answer looks obvious: the finger teaches the mind.</p>
  <p class="lesson-copy">Then flip the game: your child says a food word and YOU hunt for it. Getting one wrong on purpose — “this tomato is actually an apple, look!” — keeps the sorting game alive for weeks, and being the caller is powerful practice for a three-year-old.</p>
  <p class="lesson-note">Age 3 is a guide, not a deadline. If today’s class was one banana and two claps, today’s class was a success.</p>
 </section>`;

 // Classroom activities: this class's Age 3 magic game.
 const magicGameSection=`<section class="wrap lesson-section" id="classroom-activities" aria-label="Classroom activities">
  <span class="eyebrow">CLASSROOM ACTIVITIES</span>
  <h2>Fill a basket with fruit — magically.</h2>
  <p class="lesson-copy">The fruits from this class have a game of their own. Magic Fruit Basket lets your child meet the eight fruits again, fill a magic basket by tapping or dragging, find the right fruit and count them out loud — then head to the real kitchen.</p>
  <div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/3-years/magic-fruit-basket/">Play the Magic Fruit Basket game <span aria-hidden="true">↗</span></a></div>
 </section>`;

 return `${crumbNav(L.crumbs.slice(0,-1).concat([['Fruits & Vegetables']]))}
 <article class="wrap lesson-hero"><div class="lesson-hero-copy">${heroInner}</div></article>
 ${`<section class="wrap lesson-section" id="todays-class" aria-label="Today’s class">
  <span class="eyebrow">TODAY’S CLASS</span>
  <h2>How today’s class works.</h2>
  <p class="lesson-copy">Eight little steps, in any order that suits you: a welcome from your teacher, all sixteen food cards, a fruit-or-vegetable sorting game, find-the-food, a matching board, colors and counting, off-screen kitchen play, and a warm goodbye. Stop after any step — that is a complete class, and there is never a score at the end.</p>
  <ol class="tc-flow">
   <li><span>1</span> Teacher welcome</li>
   <li><span>2</span> Meet the foods</li>
   <li><span>3</span> Fruit or vegetable?</li>
   <li><span>4</span> Find the food</li>
   <li><span>5</span> Match &amp; remember</li>
   <li><span>6</span> Colors &amp; counting</li>
   <li><span>7</span> Take it off screen</li>
   <li><span>8</span> Class complete</li>
  </ol>
  <div class="tc-note-block tc-teacher"><span class="eyebrow">TEACHER WELCOME</span><p class="tc-say">“Hello, my friend — and hello to you, grown-up helper! Today’s class smells wonderful: sixteen foods are waiting — fruits for one bowl, vegetables for the other, and a whole rainbow to count. Wash your hands and let’s begin!”</p><p class="tc-who">— Your Kiddo School teacher</p></div>
  <div class="lesson-start"><a class="button" href="#meet-the-foods">Begin the class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">First stop: the whole market, sixteen cards long.</span></div>
 </section>`}
 ${learnSection}
 ${sortSection}
 ${findSection}
 ${matchSection}
 ${colorsSection}
 ${offScreenSection}
 ${printSection}
 ${teacherNoteSection}
 ${principalSection}
 ${magicGameSection}
 ${completeSection}
 ${tipsSection}`;
}
