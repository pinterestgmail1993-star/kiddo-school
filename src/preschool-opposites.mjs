// Kiddo School — Preschool 5 (Age 3): Opposites & Comparing.
// Full class at /preschool/3-years/opposites-and-comparing/, built on the
// twelve owner-uploaded cards (six honest opposite pairs, every card and the
// cover probed at 1024×768 landscape). Reuses the site's shared pieces: the
// lesson card viewer (data-lesson-viewer in site.js) for Learn the pairs, the
// calm find-it engine (data-tc-round) for Tap the opposite and Compare two
// pictures, and a small progressive-enhancement match board
// (opposites-class.js) for Match opposite pairs. The board is an honest
// two-column chart without JavaScript — pointing works, nothing depends on
// a script that might not load.
import {oppositesLesson,oppositesCardContent} from './flashcards/data-opposites.mjs';
import {age3SolveSheets} from './lessons.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const base=oppositesLesson.r2Base+oppositesLesson.folder;
const CARDS=oppositesLesson.cards;
const cardBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));
const contentOf=slug=>oppositesCardContent[slug];
const SET_URL='/flashcards/opposites/';
const CLASS_PATH=oppositesLesson.path;

const crumbNav=parts=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${esc(href)}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
const heading=(eyebrow,title,desc)=>`<div class="page-heading wrap"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${desc}</p></div>`;
// A real card as a choice (button) or as a face (quiet figure) — always the
// true 1024×768 landscape ratio, never cropped, never stretched.
const cardImg=(c,alt,extra='')=>`<img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(alt)}" loading="lazy"${extra}>`;
const cardChoice=(c,correct,label,extra='')=>`<button type="button" class="tc-choice${extra?' '+extra:''}"${correct?' data-tc-correct="true"':''} aria-label="${esc(label||c.word)}">${cardImg(c,c.alt)}</button>`;

/* ---------- Class game data ---------- */

// PLAY — TAP THE OPPOSITE. One target card, three real picture cards to
// choose from: find the opposite among two look-alike neighbours. Each round
// hides exactly one correct answer; feedback comes from the shared engine.
const tapRounds=[
 {slug:'big-ball',say:'Here is the BIG ball. Tap the opposite — the small one!'},
 {slug:'tall-tree',say:'A tall tree, reaching for the sky. Tap its opposite!'},
 {slug:'long-pencil',say:'A long pencil, stretching across the card. Which card is the opposite?'},
 {slug:'full-glass',say:'The glass is FULL to the top. Tap the opposite!'},
 {slug:'hot-soup',say:'Hot soup — careful, it steams! Tap the cold opposite.'},
 {slug:'open-door',say:'An OPEN door — come in! Tap its opposite.'}
];

// PRACTICE — COMPARE TWO PICTURES. Two real cards, one comparing question.
// The bigger, the taller, the longer — the words this class is really about.
const compareRounds=[
 {a:'big-ball',b:'small-ball',ask:'Two balls! Tap the ball that is BIGGER.',firstCorrect:true},
 {a:'tall-tree',b:'short-tree',ask:'Two trees! Tap the tree that is TALLER.',firstCorrect:false},
 {a:'long-pencil',b:'short-pencil',ask:'Two pencils! Tap the pencil that is LONGER.',firstCorrect:true}
];

// PLAY — MATCH OPPOSITE PAIRS. Six cards on the left, their six opposites
// shuffled on the right. Without JS the board is an honest chart for
// pointing; with JS, tap a card and then its opposite — pairs lock in with
// calm feedback. Pair numbers keep the matching honest on both sides.
const matchLeft=['big-ball','tall-tree','long-pencil','full-glass','hot-soup','open-door'];
const matchRightOrder=[5,6,1,2,4,3]; // pair numbers, deliberately unaligned
const PAIR_WORD={1:'big ball and small ball',2:'tall tree and short tree',3:'long pencil and short pencil',4:'full glass and empty glass',5:'hot soup and cold ice cream',6:'open door and closed door'};
const pairNum=slug=>({ 'big-ball':1,'small-ball':1,'tall-tree':2,'short-tree':2,'long-pencil':3,'short-pencil':3,'full-glass':4,'empty-glass':4,'hot-soup':5,'cold-ice-cream':5,'open-door':6,'closed-door':6 })[slug];
const oppositeOf=c=>CARDS.find(x=>pairNum(x.slug)===pairNum(c.slug)&&x.slug!==c.slug);

/* ---------- The class page ---------- */

export function oppositesClassBody(L){
 const chips=[['Age','3 Years'],['Class','Preschool 5'],['Subjects','Opposites &amp; comparing']];
 const ledes=[
  'Twelve cards in six honest opposite pairs — big and small, tall and short, long and short, full and empty, hot and cold, open and closed. Printable opposite sheets to compare at the table, and a house full of things to compare: this class follows Colors &amp; Color Mixing on the preschool path.',
  'Opposites only work side by side, so show every pair together: the big ball next to the small ball, the open door next to the closed one. Start with the pair your child already feels — full and empty at snack time is a fine one — and let the rest of the set wait its turn.'
 ];
 const heroInner=`<span class="eyebrow">${esc(L.eyebrow)}</span>
  <h1>${esc(L.h1)}</h1>
  <div class="fc-chips lesson-chips">${chips.map(([k,v])=>`<span><strong>${k}</strong> ${v}</span>`).join('')}</div>
  ${ledes.map(p=>`<p class="lesson-lede">${p}</p>`).join('\n  ')}
  <div class="lesson-start"><a class="button" href="#todays-class">Start Today’s Class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Grown-up nearby, little one on the lap or wandering the room — both work.</span></div>`;

 // Learn the pairs: twelve slides in strict pair order, so each opposite
 // appears right after its partner and the comparison is one glance away.
 // Each img carries its say line and its find-it prompt for the viewer —
 // the same contract the baby, toddler and colors classes use.
 const slides=CARDS.map((c,i)=>{
  const d=contentOf(c.slug);
  const say=i%2===0?d.say:`${d.word}! ${contentOf(CARDS[i-1].slug).word}’s opposite — say both together!`;
  return `<figure class="lv-card" data-op-group="${i<6?'measure':'everyday'}"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}"${i===0?'':' loading="lazy"'} data-lv-say="${esc(say)}" data-lv-find="${esc(d.spot)}"><figcaption class="lv-word">${esc(d.word)}</figcaption></figure>`;
 }).join('');
 /* SOLVE THE SHEETS — the class's real printable work: the owner asked for
    worksheet-solving guidance here instead of coded games. */
 const solveSection=age3SolveSheets({
  heading:'Solve the opposite sheets together.',
  copy:'The six opposite pairs print two to a page, straight from your browser. Printed, cut and compared, they are the class\u2019s real worksheets — and on screen, every card page can be drawn on directly.',
  steps:[
   ['Print the pairs','Open the printable cards and print all twelve, two to a page. Cut them out together, saying each word as it is cut.'],
   ['Lay the pairs side by side','Put big next to little, tall next to short. Comparing two real cards is where the word difference actually means something.'],
   ['Act the pair out','Arms wide for big, arms close for small; a tall stretch, a short crouch. Bodies learn opposites fastest.'],
   ['Find them at home','Find one pair in the house — a full cup and an empty cup is the classic. Then draw the pair on the card page with the Write & Color layer.']
  ],
  printHref:'/preschool/3-years/opposites-and-comparing/print/',fcHref:'/flashcards/opposites/'
 });
 const learnSection=`<section class="wrap lesson-section" id="learn-the-pairs" aria-label="Learn the opposite pairs">
  <span class="eyebrow">LEARN THE PAIRS</span>
  <h2>Six pairs, twelve cards, one glance apart.</h2>
  <p class="lesson-copy">Every opposite arrives with its partner: big ball then small ball, tall tree then short tree. Say both words in one breath — “big ball… small ball!” — and let your child point at the difference before you move on. Use the arrows to wander, or simply scroll: all twelve cards are below.</p>
  <div class="lv-groups" data-op-groups hidden><button type="button" class="lv-group-chip is-on" data-op-group="all" aria-pressed="true">All 12</button><button type="button" class="lv-group-chip" data-op-group="measure" aria-pressed="false">Measuring words</button><button type="button" class="lv-group-chip" data-op-group="everyday" aria-pressed="false">Everyday opposites</button></div>
  <div class="lv-frame" data-lesson-viewer>
   <div class="lv-stage" data-lv-stage></div>
   <p class="lv-caption" data-lv-caption hidden></p>
   <div class="lv-controls" data-lv-controls><button type="button" class="lv-btn" data-lv-prev>Previous</button><span class="lv-count" data-lv-count aria-live="polite" aria-atomic="true">Card 1 of ${CARDS.length}</span><button type="button" class="lv-btn" data-lv-next>Next</button></div>
   <div class="lv-actions" data-lv-actions><button type="button" class="lv-btn lv-ghost" data-lv-full>Full screen</button></div>
   <div class="lv-begin"><button type="button" class="button" data-lv-start>Start the opposite cards</button><span class="lv-beginhint">Or simply scroll: all ${CARDS.length} cards are below.</span></div>
  </div>
  <div class="lv-grid" data-lv-grid>${slides}</div>
  <div class="tc-hunt"><h3>Say the pairs together</h3><ul class="lesson-prompts"><li>${PAIR_WORD[1]}, ${PAIR_WORD[2]}, ${PAIR_WORD[3]} — the measuring words. Hold your arms wide for big, pinch two fingers for small.</li><li>${PAIR_WORD[4]}, ${PAIR_WORD[5]}, ${PAIR_WORD[6]} — the everyday opposites. These three already happen at your house every single day.</li></ul></div>
 </section>`;

 const tapSection=`<section class="wrap lesson-section tc-game" id="tap-the-opposite" aria-label="Play: tap the opposite" data-tc-correct="You found it!|That’s the opposite!|Great spotting!" data-tc-incorrect="Let’s look together — say the word first, then find its partner.">
  <span class="eyebrow">PLAY · TAP THE OPPOSITE</span>
  <h2>Tap the opposite.</h2>
  <p class="lesson-copy">One card on the left, three cards to choose from. Say the word on the big card out loud, then tap its opposite. A miss is just a look-again — there are no points, no timers and nothing to lose.</p>
  ${tapRounds.map((r,ri)=>{const target=cardBySlug[r.slug];const answer=oppositeOf(target);const others=CARDS.filter(c=>pairNum(c.slug)!==pairNum(r.slug));const k=CARDS.indexOf(target);const trio=[answer,others[(k*3)%others.length],others[(k*5+1)%others.length]];const picks=trio.map((_,i)=>trio[(i+k)%3]).map(c=>c===answer?{c,ok:true}:{c,ok:false});return `<div class="tc-round" data-tc-round data-tc-ask="${esc(r.say)}"><p class="tc-ask">${r.say}</p><figure class="tc-target"><span class="eyebrow">THE CARD</span>${cardImg(target,target.alt)}</figure><div class="tc-choices" role="group" aria-label="${esc(r.say)}">${picks.map(({c,ok})=>cardChoice(c,ok)).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`;}).join('')}
 </section>`;

 const compareSection=`<section class="wrap lesson-section tc-game" id="compare-two-pictures" aria-label="Practice: compare two pictures" data-tc-correct="That’s the one!|Perfect comparing!|You saw the difference!" data-tc-incorrect="Try another one — say the comparing word slowly first.">
  <span class="eyebrow">PRACTICE · COMPARE TWO PICTURES</span>
  <h2>Compare two pictures.</h2>
  <p class="lesson-copy">Two pictures, one comparing question: which ball is bigger? Which tree is taller? Which pencil is longer? Comparing words are the real treasure in this class — bigger, taller, longer — because they turn two cards into one conversation.</p>
  ${compareRounds.map(r=>{const A=cardBySlug[r.a],B=cardBySlug[r.b];const first=r.firstCorrect?A:B,second=r.firstCorrect?B:A;return `<div class="tc-round tc-compare" data-tc-round data-tc-ask="${esc(r.ask)}"><p class="tc-ask">${r.ask}</p><div class="tc-choices" role="group" aria-label="${esc(r.ask)}">${cardChoice(first,r.firstCorrect,null,'tc-op')}${cardChoice(second,!r.firstCorrect,null,'tc-op')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`;}).join('')}
  <p class="lesson-note">The trick that makes comparing stick: say both words in one breath — “big ball, small ball” — then ask the question. The pair does the teaching; the question just points at it.</p>
 </section>`;

 const matchSection=`<section class="wrap lesson-section" id="match-opposite-pairs" aria-label="Play: match opposite pairs">
  <span class="eyebrow">PLAY · MATCH OPPOSITE PAIRS</span>
  <h2>Match the opposite pairs.</h2>
  <p class="lesson-copy">Six cards on the left, their opposites shuffled on the right. Tap a card, then tap the card on the right that is its exact opposite. Match all six and the whole set is one big family of twos — no hurry, no score, just pairs waiting to be found.</p>
  <div class="match-board" data-match-board>
   <div class="match-col">
    <h3>The cards</h3>
    <div class="match-grid">${matchLeft.map(s=>{const c=cardBySlug[s],d=contentOf(s);return `<button type="button" class="op-card" data-match-pair="${pairNum(s)}" data-match-side="left" aria-label="${esc(d.word)}. Tap me, then find my opposite.">${cardImg(c,c.alt)}<span class="op-word">${esc(d.word)}</span></button>`;}).join('')}</div>
   </div>
   <div class="match-col">
    <h3>Their opposites</h3>
    <div class="match-grid">${matchRightOrder.map(n=>{const s=CARDS.find(c=>pairNum(c.slug)===n&&c.slug!==matchLeft[n-1]).slug;const c=cardBySlug[s],d=contentOf(s);return `<button type="button" class="op-card" data-match-pair="${n}" data-match-side="right" aria-label="${esc(d.word)}. Are you the opposite of the tapped card?">${cardImg(c,c.alt)}<span class="op-word">${esc(d.word)}</span></button>`;}).join('')}</div>
   </div>
  </div>
  <p class="match-status" data-match-status aria-live="polite" hidden></p>
  <noscript><p class="fc-hint">No JavaScript? The board still works: point at a card on the left, then find its opposite on the right — and say both words together. Matching by pointing is the same game.</p></noscript>
 </section>`;

 const offScreenSection=`<section class="wrap lesson-section" id="off-screen" aria-label="Take it off screen">
  <span class="eyebrow">TAKE IT OFF SCREEN</span>
  <h2>Opposites that live in your house.</h2>
  <p class="lesson-copy">Comparing words stick away from the screen, on real things your child can hold, pour, knock and line up. Pick one of these — two minutes is plenty — and follow your child’s lead.</p>
  <div class="tc-hunt"><h3>The big-and-small basket</h3><ul class="lesson-prompts"><li>Collect two sizes of the same things: a big spoon and a small one, a big book and a small one, a big sock and a little one. Drop them in a basket.</li><li>Pull them out one at a time and sort into two piles, saying the words each time: “big spoon — small spoon!” Your child does the sorting; you do the announcing.</li></ul></div>
  <div class="tc-hunt"><h3>Fill and pour</h3><ul class="lesson-prompts"><li>Sink, bath or a bowl on a towel: fill a cup right to the top and say “full!” Then pour it out slowly — “empty!” — and do the whole story again.</li><li>Spilling is part of the lesson, so the towel is part of the game. Full and empty are sink words; the cards just introduce them.</li></ul></div>
  <div class="tc-hunt"><h3>Hot and cold kitchen talk</h3><ul class="lesson-prompts"><li>Warm toast in one hand, cold yogurt in the other: “warm… cold!” A warm bath and a cool drink work just as well. Your child names the pair; you keep every truly hot thing far away.</li><li>Say it as a game, not a warning — the word “hot” lands best when it is about comparing soup and ice cream, not about being told off.</li></ul></div>
  <div class="tc-hunt"><h3>Open, shut them</h3><ul class="lesson-prompts"><li>Cupboard doors, box lids, books and your own two hands all play this game: shout “open!” and “closed!” together as each one happens.</li><li>Real front doors stay a grown-up job — slow and supervised. Books and hands can open and shut as fast as your child likes.</li></ul></div>
  <p class="lesson-note">Stay close, keep it playful and stop while it is still fun. There is nothing to finish here.</p>
 </section>`;

 const printSection=`<section class="wrap lesson-section tc-printables" id="printables" aria-label="Print the cards">
  <span class="eyebrow">PRINT THE CARDS</span>
  <h2>Take the opposites to the kitchen table.</h2>
  <p class="lesson-copy">All twelve cards print two to a page, in pair order, straight from your browser — no PDF, no sign-up, nothing to install. Cut them out and the whole set plays on the table.</p>
  <div class="hero-actions tc-print-actions"><a class="button" href="${CLASS_PATH}print/">View Printable Cards <span aria-hidden="true">↗</span></a><button type="button" class="button button-ghost" data-tc-print-open="${CLASS_PATH}print/?print=1">Print Cards</button></div>
  <p class="lesson-note">Printed cards love fridges, bedroom doors and kitchen tables. The same cards also live in the <a href="${SET_URL}">flashcards library</a>, each with its own page.</p>
 </section>`;

 const teacherNoteSection=`<section class="wrap lesson-section"><span class="eyebrow">TEACHER NOTE</span><h2>One last word from class.</h2><div class="tc-note-block tc-teacher"><p class="tc-say">“What a day of comparing! Big and small, full and empty — your child spotted differences everywhere today, and every single one counts. Keep the words alive at snack time and bathtime, and let your child win the comparing game sometimes. See you in class!”</p><p class="tc-who">— Your Kiddo School teacher</p></div></section>`;
 const principalSection=`<section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2><p class="lesson-copy">At three, comparing is body-first: arms stretched wide for big, fingers pinched for small, a whole-body crouch for short. The words settle fastest when they ride on real actions — pouring, measuring, knocking — which is why the games here lead back to your kitchen and bathroom. If your child mixes up tall and long, that is exactly on track: the differences between comparing words take years, and the joy of announcing “bigger!” matters more today than getting every word right. Everything gives calm feedback with no scores, and the match board works with pointing alone.</p><p class="lesson-copy"><a href="/about/#principal">More from the Principal’s Office <span aria-hidden="true">↗</span></a></p></section>`;

 const completeSection=`<section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>Wonderful comparing!</h2>
  <p class="lesson-copy">Whether you met two pairs or all six, that was the whole class — and stopping early is always allowed. The cards will be right here, and so will the match board, whenever you come back. The comparing words are already busy in your house: at snack time, in the bath, at every door.</p>
  <div class="hero-actions"><a class="button" href="#todays-class">Explore Again <span aria-hidden="true">↑</span></a><a class="button button-ghost" href="${SET_URL}">View Opposite Flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
  <div class="lesson-path"><a class="fc-stage lesson-card-link" href="/preschool/3-years/"><div class="fc-stage-pills"><span class="fc-age">Where next</span><span class="fc-class">More Age 3 classes</span></div><h3>More preschool classes</h3><p>Revisit Alphabet &amp; Letter Sounds, Numbers &amp; Counting (1–10), Shapes &amp; Patterns or Colors &amp; Color Mixing — or open the Learning Path to see the whole journey from birth to age three.</p><span class="fc-open">Choose the next class <span aria-hidden="true">↗</span></span></a></div>
 </section>`;

 // Classroom activities: this class keeps its learning on the page and in
 // real life — the off-screen hunts below are the practice.

 const tipsSection=`<section class="wrap lesson-section" id="how-to">
  <span class="eyebrow">TIPS FOR PARENTS</span>
  <h2>How to use this class.</h2>
  <p class="lesson-copy">Show every pair side by side and say both words in one breath — “big ball, small ball”. The two words together are what make an opposite stick; a single word on its own is just a name. Let your child do the tapping in the games, even when the answer looks obvious to you — the finger teaches the eye.</p>
  <p class="lesson-copy">Then hand the game over: your child shows two cards and asks YOU which is bigger. Getting one wrong on purpose keeps the game alive for weeks, and being the quiz master is powerful practice for a three-year-old.</p>
  <p class="lesson-note">Age 3 is a guide, not a deadline. If today’s class was one full cup and one empty one at the sink, today’s class was a success.</p>
 </section>`;

 return `${crumbNav([['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Opposites & Comparing']])}
 <article class="wrap lesson-hero"><div class="lesson-hero-copy">${heroInner}</div></article>
 ${`<section class="wrap lesson-section" id="todays-class" aria-label="Today’s class">
  <span class="eyebrow">TODAY’S CLASS</span>
  <h2>How today’s class works.</h2>
  <p class="lesson-copy">Four little steps, in any order that suits you: a welcome from your teacher, the opposite pairs, solving the opposite sheets together, an off-screen hunt, and a warm goodbye. Stop after any step — that is a complete class, and there is never a score at the end.</p>
  <ol class="tc-flow">
   <li><span>1</span> Teacher welcome</li>
   <li><span>2</span> Learn the opposite pairs</li>
   <li><span>3</span> Solve the sheets</li>
   <li><span>4</span> Take it off screen</li>
   <li><span>5</span> Class complete</li>
  </ol>
  <div class="tc-note-block tc-teacher"><span class="eyebrow">TEACHER WELCOME</span><p class="tc-say">“Hello, my friend — and hello to you, grown-up helper! Today we are playing the opposite game: big and little, full and empty, open and shut. Show each pair side by side, say both words together, and let your child shout the difference. Ready?”</p><p class="tc-who">— Your Kiddo School teacher</p></div>
  <div class="lesson-start"><a class="button" href="#learn-the-pairs">Begin the class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">First stop: the opposite pairs.</span></div>
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
