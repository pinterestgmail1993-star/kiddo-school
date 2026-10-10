// Kiddo School — Preschool 2 (Age 3): Numbers & Counting (1–10).
// Full class at /preschool/3-years/numbers-and-counting/, built on the ten
// owner-uploaded number cards. Reuses the site's existing interactive
// pieces: the lesson card viewer (data-lesson-viewer in site.js) for Learn,
// and the calm find-it game engine (data-tc-round) for Find the Number and
// Count and Match. Number tiles and dot groups are programmatic — no new
// images are invented. Number Order is enhanced by /assets/numbers-class.js;
// without JavaScript the tiles simply show in order as a counting line.
import {numbersLesson,numbersCardContent} from './flashcards/data-numbers.mjs';
import {age3SolveSheets} from './lessons.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const base=numbersLesson.r2Base+numbersLesson.folder;
const CARDS=numbersLesson.cards;
const cardBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));
const contentOf=slug=>numbersCardContent[slug];
const SET_URL='/flashcards/numbers-and-counting/';
const CLASS_PATH=numbersLesson.path;

const crumbNav=parts=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${esc(href)}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
const heading=(eyebrow,title,desc)=>`<div class="page-heading wrap"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${desc}</p></div>`;
const numTile=(n,{correct=false,big=false}={})=>`<button type="button" class="tc-choice tc-letter${big?' tc-letter-big':''}"${correct?' data-tc-correct="true"':''} aria-label="The number ${esc(n)}"><span aria-hidden="true">${esc(n)}</span></button>`;
const dotGroup=n=>{
 const rows=n<=3?[n]:n===4?[2,2]:n===5?[3,2]:[3,3];
 return `<span class="dots" aria-hidden="true">${rows.map(r=>`<span class="dot-row">${'<span class="dot"></span>'.repeat(r)}</span>`).join('')}</span><span class="vh">A group of ${n} dots to count</span>`;
};

/* ---------- Class game data ---------- */

// PLAY — FIND THE NUMBER. One target numeral, three big choices, calm
// feedback. Every round names the picture from that number's own card.
const findRounds=[
 {say:'Can you find the number 1? One — like one apple!',nums:[['1',true],['4',false],['7',false]]},
 {say:'Where is the number 3? Three little cats!',nums:[['5',false],['2',false],['3',true]]},
 {say:'Find the number 5. Five — a whole hand!',nums:[['5',true],['6',false],['2',false]]},
 {say:'Where is the number 7? Seven flowers!',nums:[['1',false],['7',true],['4',false]]},
 {say:'Now a bigger one — find 8. Eight frogs!',nums:[['8',true],['6',false],['9',false]]},
 {say:'Find the number 10. Ten butterflies!',nums:[['1',false],['10',true],['7',false]]}
];

// PRACTICE — COUNT AND MATCH. A small group of dots, then three numerals.
// The parent reads the ask and counts aloud with the child — the dots are
// always mathematically correct, laid out in tidy uncrowded rows.
const countMatchRounds=[
 {count:2,say:'Let’s count the dots together: one, two! Tap the number 2.',choices:['1','2','3']},
 {count:3,say:'Count with me: one, two, three! Tap the number 3.',choices:['2','3','4']},
 {count:4,say:'Two rows of two. Count them: one, two, three, four! Tap the number 4.',choices:['3','4','5']},
 {count:5,say:'A row of three and a row of two. Count them all — five! Tap the number 5.',choices:['4','5','6']},
 {count:6,say:'Two little rows of three. Count them: all the way to six! Tap the number 6.',choices:['5','6','7']}
];

// PRACTICE — NUMBER ORDER. Two boards: 1–5 first, 1–10 when ready. The
// tiles are rendered in order as an honest no-JS counting line;
// /assets/numbers-class.js shuffles them into the tap-in-order game.
const orderBoards=[
 {max:5,say:'Let’s line up 1 to 5. Point at each number and say it — then, if you feel like a game, put them back in order!'},
 {max:10,say:'Ready for 1 to 10? A longer line — count along, or tap them back into order one at a time.'}
];

/* ---------- The class page ---------- */

export function numbersClassBody(L){
 const chips=[['Age','3 Years'],['Class','Preschool 2'],['Subjects','Counting &amp; number recognition']];
 const ledes=[
  'Ten counting cards, printable number sheets to solve and a pocketful of real-life counting ideas. This class follows Alphabet &amp; Letter Sounds on the preschool path — same calm pacing, now with numbers.',
  'You do not need to reach ten today. Counting one to three with a pointing finger is a genuine maths lesson at three; five is a triumph; ten is a party. Let your child set the pace.'
 ];
 const heroInner=`<span class="eyebrow">${esc(L.eyebrow)}</span>
  <h1>${esc(L.h1)}</h1>
  <div class="fc-chips lesson-chips">${chips.map(([k,v])=>`<span><strong>${k}</strong> ${v}</span>`).join('')}</div>
  ${ledes.map(p=>`<p class="lesson-lede">${p}</p>`).join('\n  ')}
  <div class="lesson-start"><a class="button" href="#todays-class">Start Today’s Class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Grown-up nearby, little one on the lap or hopping like a frog — both work.</span></div>`;

 // Learn the Numbers: 10 real cards in order, each with its own counting
 // prompt. Group chips (1–5 / 6–10) filter the grid via numbers-class.js;
 // without JavaScript all 10 cards simply show.
 const slides=CARDS.map((c,i)=>{
  const d=contentOf(c.slug);
  return `<figure class="lv-card" data-num-group="${i<5?'1-5':'6-10'}"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}"${i===0?'':' loading="lazy"'} data-lv-say="${esc(d.say)}" data-lv-find="${esc('Can you point to the big '+c.numeral+' and the word '+d.word.split(' ')[0].toLowerCase()+'?')}"></figure>`;
 }).join('');
 /* SOLVE THE SHEETS — the class's real printable work: the owner asked for
    worksheet-solving guidance here instead of coded games. */
 const solveSection=age3SolveSheets({
  heading:'Solve the number sheets together.',
  copy:'The ten number cards print two to a page, straight from your browser. Printed, cut and counted, they are the class\u2019s real worksheets — and on screen, every card page can be drawn on directly.',
  steps:[
   ['Print the cards','Open the printable cards and print all ten, two to a page. Cut them out together, counting up as each number is cut.'],
   ['Count the pictures','Each card carries its own little group — one apple, two ducks, three cats. Count the pictures aloud together before naming the numeral.'],
   ['Build the staircase','Lay the cards in a line from 1 to 10 on the floor. Gaps and swaps are welcome — putting right a wobbly staircase is the thinking work.'],
   ['Match card to things','Pick a card and find its count in the house: one spoon, five ladybugs on a page. Then trace the numeral on the card page with the Write & Color layer.']
  ],
  printHref:'/preschool/3-years/numbers-and-counting/print/',fcHref:'/flashcards/numbers-and-counting/'
 });
 const learnSection=`<section class="wrap lesson-section" id="learn-the-numbers" aria-label="Learn the numbers">
  <span class="eyebrow">LEARN THE NUMBERS</span>
  <h2>Ten counting cards, from 1 to 10.</h2>
  <p class="lesson-copy">Every card shows a big numeral, the number word and the right number of things to count. Use the arrows to wander through them in order — or tap a group below to count just a few at a time. Counting to five and stopping is a complete visit.</p>
  <div class="lv-frame" data-lesson-viewer>
   <div class="lv-stage" data-lv-stage></div>
   <p class="lv-caption" data-lv-caption hidden></p>
   <div class="lv-controls" data-lv-controls><button type="button" class="lv-btn" data-lv-prev>Previous</button><span class="lv-count" data-lv-count aria-live="polite" aria-atomic="true">Card 1 of ${CARDS.length}</span><button type="button" class="lv-btn" data-lv-next>Next</button></div>
   <div class="lv-actions" data-lv-actions><button type="button" class="lv-btn lv-ghost" data-lv-full>Full screen</button></div>
   <div class="lv-begin"><button type="button" class="button" data-lv-start>Start the number cards</button><span class="lv-beginhint">Or simply scroll: all ${CARDS.length} cards are below.</span></div>
  </div>
  <div class="lv-groups" role="group" aria-label="Show a smaller group of numbers" data-num-groups hidden>
   <button type="button" class="lv-group-chip is-on" data-nm-group="all" aria-pressed="true">All 10</button>
   <button type="button" class="lv-group-chip" data-nm-group="1-5" aria-pressed="false">1–5</button>
   <button type="button" class="lv-group-chip" data-nm-group="6-10" aria-pressed="false">6–10</button>
  </div>
  <div class="lv-grid" data-lv-grid>${slides}</div>
 </section>`;

 const findSection=`<section class="wrap lesson-section tc-game" id="find-the-number" aria-label="Play: find the number" data-tc-correct="You found it!|Great finding!|Number spotted!" data-tc-incorrect="Let’s look together.">
  <span class="eyebrow">PLAY · FIND THE NUMBER</span>
  <h2>Find the number.</h2>
  <p class="lesson-copy">One number at a time, three big choices. Say the number’s name together, then let your child tap it. A miss is just a look-again — there are no points, no timers and nothing to lose.</p>
  ${findRounds.map(r=>`<div class="tc-round" data-tc-round data-tc-ask="${esc(r.say)}"><p class="tc-ask">${r.say}</p><div class="tc-choices" role="group" aria-label="${esc(r.say)}">${r.nums.map(([n,ok])=>numTile(n,{correct:ok,big:true})).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`).join('')}
 </section>`;

 const countMatchSection=`<section class="wrap lesson-section tc-game" id="count-and-match" aria-label="Practice: count and match" data-tc-correct="That’s the one!|Perfect counting!|You matched it!" data-tc-incorrect="Let’s count them again — slowly, one number per dot.">
  <span class="eyebrow">PRACTICE · COUNT AND MATCH</span>
  <h2>Count and match.</h2>
  <p class="lesson-copy">Count the dots out loud together — one number per dot, pointing as you go — then tap the numeral that says how many. The groups are small and tidy on purpose; counting a calm row beats counting a crowd.</p>
  ${countMatchRounds.map(r=>`<div class="tc-round tc-match" data-tc-round data-tc-ask="${esc(r.say)}"><p class="tc-ask">${r.say}</p><figure class="tc-target tc-target-dots"><span class="eyebrow">COUNT THE DOTS</span>${dotGroup(r.count)}</figure><div class="tc-choices" role="group" aria-label="${esc(r.say)}">${r.choices.map(n=>numTile(n,{correct:n===String(r.count)})).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`).join('')}
 </section>`;

 const orderSection=`<section class="wrap lesson-section tc-game" id="number-order" aria-label="Practice: number order">
  <span class="eyebrow">PRACTICE · NUMBER ORDER</span>
  <h2>Putting numbers in order.</h2>
  <p class="lesson-copy">Numbers have a happy queue: 1, 2, 3, 4, 5... Start with the short line, and try the long one whenever your child is ready. There is no timer here — the numbers are patient.</p>
  ${orderBoards.map(b=>`<div class="tc-round ord-board" data-ord-board data-ord-max="${b.max}"><p class="tc-ask">${b.say}</p><div class="ord-pool" data-ord-pool role="group" aria-label="Number tiles from 1 to ${b.max}, shown in order">${Array.from({length:b.max},(_,i)=>`<span class="ord-tile" aria-hidden="true">${i+1}</span>`).join('')}</div><p class="ord-status" data-ord-status role="status" aria-live="polite" hidden></p></div>`).join('')}
  <noscript><p class="fc-hint">The tap-to-order game needs JavaScript. Without it, the tiles simply line up in order — perfect for pointing and counting together.</p></noscript>
 </section>`;

 const offScreenSection=`<section class="wrap lesson-section" id="off-screen" aria-label="Take it off screen">
  <span class="eyebrow">TAKE IT OFF SCREEN</span>
  <h2>Counting that lives in your house.</h2>
  <p class="lesson-copy">Real counting sticks best away from the screen, in short playful moments with things you already own. Pick one of these — two minutes is plenty — and follow your child’s lead.</p>
  <div class="tc-hunt"><h3>Count three toys</h3><ul class="lesson-prompts"><li>Line up three favourite toys and count them slowly, pointing at each one.</li><li>One number per toy is the whole game — the toys do not need to sit still for long.</li></ul></div>
  <div class="tc-hunt"><h3>Count steps together</h3><ul class="lesson-prompts"><li>Stairs, garden steps, hallway hops — count them out loud as you go.</li><li>“One... two... three!” with every step turns any staircase into a counting game.</li></ul></div>
  <div class="tc-hunt"><h3>Count fingers</h3><ul class="lesson-prompts"><li>Hold up one hand and count each finger slowly — five is the hand number.</li><li>Finish with a high-five: “Five! High-five!” The clap makes it stick.</li></ul></div>
  <div class="tc-hunt"><h3>Count blocks as you stack</h3><ul class="lesson-prompts"><li>Stack blocks one by one and say the number every time one lands.</li><li>When the tower falls, count again — rebuilds are free extra lessons in disguise.</li></ul></div>
  <div class="tc-hunt"><h3>Five in a row</h3><ul class="lesson-prompts"><li>Put five safe objects in a row — pebbles, spoons, cars — and point to each while counting.</li><li>A straight line helps your child see what has been counted and what is left.</li></ul></div>
  <p class="lesson-note">Stay close, keep it playful and stop while it is still fun. There is nothing to finish here.</p>
 </section>`;

 const printSection=`<section class="wrap lesson-section tc-printables" id="printables" aria-label="Print the cards">
  <span class="eyebrow">PRINT THE CARDS</span>
  <h2>Take the numbers to the kitchen table.</h2>
  <p class="lesson-copy">All ten counting cards can be printed two to a page, in order, straight from your browser — no PDF, no sign-up, nothing to install.</p>
  <div class="hero-actions tc-print-actions"><a class="button" href="${CLASS_PATH}print/">View Printable Cards <span aria-hidden="true">↗</span></a><button type="button" class="button button-ghost" data-tc-print-open="${CLASS_PATH}print/?print=1">Print Cards</button></div>
  <p class="lesson-note">Printed cards love fridges, bedroom doors and kitchen tables. The same cards also live in the <a href="${SET_URL}">flashcards library</a>, each with its own page.</p>
 </section>`;

 const teacherNoteSection=`<section class="wrap lesson-section"><span class="eyebrow">TEACHER NOTE</span><h2>One last word from class.</h2><div class="tc-note-block tc-teacher"><p class="tc-say">“You did some lovely counting today. Try spotting numbers together while you play — on doors, on clocks, in the shops. Numbers are everywhere once you start looking.”</p><p class="tc-who">— Your Kiddo School teacher</p></div></section>`;
 const principalSection=`<section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2><p class="lesson-copy">At three, counting is rhythm, not arithmetic: one number per object, said slowly, is the entire curriculum. If your child skips a number or recounts the same duck twice, that is completely on track — the pointing-and-saying skill grows through play, and every gentle recount is real practice. The games here give calm feedback with no scores, and every dot group in Count and Match is mathematically exact, because counting accuracy matters more than decoration.</p><p class="lesson-copy"><a href="/about/#principal">More from the Principal’s Office <span aria-hidden="true">↗</span></a></p></section>`;

 const completeSection=`<section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>Lovely counting!</h2>
  <p class="lesson-copy">Whether you counted to three or all the way to ten, that was the whole class — and stopping early is always allowed. The numbers will be right here whenever you come back.</p>
  <div class="hero-actions"><a class="button" href="#todays-class">Play Again <span aria-hidden="true">↑</span></a><a class="button button-ghost" href="${SET_URL}">View Number Flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
  <div class="lesson-path"><a class="fc-stage lesson-card-link" href="/learning-path/"><div class="fc-stage-pills"><span class="fc-age">Where next</span><span class="fc-class">The path so far</span></div><h3>Back to the Learning Path</h3><p>See the whole journey from birth to age three, and find the next class whenever your child is ready.</p><span class="fc-open">Open the Learning Path <span aria-hidden="true">↗</span></span></a></div>
 </section>`;

 // Classroom activities: this class keeps its learning on the page and in
 // real life — the off-screen hunts below are the practice.

 const tipsSection=`<section class="wrap lesson-section" id="how-to">
  <span class="eyebrow">TIPS FOR PARENTS</span>
  <h2>How to use this class.</h2>
  <p class="lesson-copy">Sit together for the card viewing, and let your child do the pointing and the tapping in the games — even when the answer looks obvious to you. The finger teaches the eye, and being the one who knows is the fun part.</p>
  <p class="lesson-copy">Count everything slowly, with one number per thing: apples, ducks, fingers, stairs. If a count goes wrong, simply start again from one with a smile — nobody is keeping score, least of all the cards.</p>
  <p class="lesson-note">Age 3 is a guide, not a deadline. If today’s class was two numbers and a staircase, today’s class was a success.</p>
 </section>`;

 return `${crumbNav([['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Numbers & Counting']])}
 <article class="wrap lesson-hero"><div class="lesson-hero-copy">${heroInner}</div></article>
 ${`<section class="wrap lesson-section" id="todays-class" aria-label="Today’s class">
  <span class="eyebrow">TODAY’S CLASS</span>
  <h2>How today’s class works.</h2>
  <p class="lesson-copy">Four little steps, in any order that suits you: a welcome from your teacher, the number cards, solving the number sheets together, an off-screen hunt, and a warm goodbye. Stop after any step — that is a complete class, and there is never a score at the end.</p>
  <ol class="tc-flow">
   <li><span>1</span> Teacher welcome</li>
   <li><span>2</span> Learn the numbers</li>
   <li><span>3</span> Solve the sheets</li>
   <li><span>4</span> Take it off screen</li>
   <li><span>5</span> Class complete</li>
  </ol>
  <div class="tc-note-block tc-teacher"><span class="eyebrow">TEACHER WELCOME</span><p class="tc-say">“Hello, my friend — and hello to you, grown-up helper! Today we’re counting. We’ll look at numbers and count pictures together. Start with the numbers your child enjoys.”</p><p class="tc-who">— Your Kiddo School teacher</p></div>
  <div class="lesson-start"><a class="button" href="#learn-the-numbers">Begin the class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">First stop: the number cards.</span></div>
 </section>`}
 ${learnSection}
 ${solveSection}
 ${offScreenSection}
 ${printSection}
 ${teacherNoteSection}
 ${principalSection}
 ${completeSection}
 ${tipsSection}`;
}
