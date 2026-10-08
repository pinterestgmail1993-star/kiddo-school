// Kiddo School — Preschool (Age 3) hub pages and the first preschool class:
// Alphabet & Letter Sounds at /preschool/3-years/alphabet-and-letter-sounds/.
// The class reuses the site's existing interactive pieces: the lesson card
// viewer (data-lesson-viewer in site.js) for Learn the Letters, and the calm
// find-it game engine (data-tc-round) for the letter and matching games.
// Letter tiles are programmatic text buttons — no new images are invented.
// Classes 2 (Numbers & Counting) and 3 (Shapes & Patterns) live in
// preschool-numbers.mjs and preschool-shapes.mjs; the hub bodies here list
// the whole Age 3 stage.
import {alphabetLesson,alphabetCardContent} from './flashcards/data-alphabet.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const base=alphabetLesson.r2Base+alphabetLesson.folder;
const CARDS=alphabetLesson.cards;
const cardBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));
const wordOf=slug=>alphabetCardContent[slug].word;
const SET_URL='/flashcards/alphabet/';
const CLASS_PATH=alphabetLesson.path;

const crumbNav=parts=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${esc(href)}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
const heading=(eyebrow,title,desc)=>`<div class="page-heading wrap"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${desc}</p></div>`;
const letterTile=(l,{correct=false,big=false}={})=>`<button type="button" class="tc-choice tc-letter${big?' tc-letter-big':''}"${correct?' data-tc-correct="true"':''} aria-label="The letter ${esc(l)}"><span aria-hidden="true">${esc(l)}</span></button>`;
const letterFace=(l,{big=false}={})=>`<span class="tc-letter-face${big?' tc-letter-big':''}" aria-hidden="true">${esc(l)}</span>`;
const picChoice=(c,correct=false)=>`<button type="button" class="tc-choice"${correct?' data-tc-correct="true"':''} aria-label="${esc(wordOf(c.slug))}"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"></button>`;

/* ---------- Class game data ---------- */

// PLAY — FIND THE LETTER. One target letter, three big choices, calm feedback.
// Later rounds use lowercase on purpose: little a, t, w and e are letters
// three-year-olds meet in their own books every day.
const findRounds=[
 {say:'Can you find the letter B? Buh — like ball!',letters:[['B',true],['D',false],['P',false]]},
 {say:'Where is the letter M? Mmm — like moon!',letters:[['N',false],['M',true],['W',false]]},
 {say:'Find the letter S. Sss — like sun!',letters:[['S',true],['C',false],['G',false]]},
 {say:'Where is the letter F? Fff — like fish!',letters:[['E',false],['F',true],['L',false]]},
 {say:'Now the little a — the small one! Aaa — like apple.',letters:[['a',true],['c',false],['o',false]]},
 {say:'Find the little t. Tuh — like turtle!',letters:[['t',true],['f',false],['l',false]]},
 {say:'Where is the little w? Wuh — like whale!',letters:[['w',true],['v',false],['m',false]]},
 {say:'Find the little e. Eh — like elephant!',letters:[['e',true],['a',false],['s',false]]}
];

// PRACTICE — MATCH THE PICTURE. A letter tile on the left; three real card
// pictures to choose from. Every correct answer begins with that letter's
// sound as taught on its own card — no tricky cases.
const matchRounds=[
 {letter:'a',say:'The letter a says aaa — like apple. Tap the picture that starts with aaa!',target:'apple',choices:['apple','ball','cat']},
 {letter:'c',say:'The letter c says kuh — like cat. Tap the picture that starts with kuh!',target:'cat',choices:['cat','dog','sun']},
 {letter:'d',say:'The letter d says duh — like dog. Tap the picture that starts with duh!',target:'dog',choices:['dog','van','moon']},
 {letter:'s',say:'The letter s says sss — like sun. Tap the picture that starts with sss!',target:'sun',choices:['sun','pig','nest']},
 {letter:'b',say:'The letter b says buh — like ball. Tap the picture that starts with buh!',target:'ball',choices:['ball','kite','whale']},
 {letter:'f',say:'The letter f says fff — like fish. Tap the picture that starts with fff!',target:'fish',choices:['fish','queen','zebra']}
];

// PRACTICE — BIG AND LITTLE. A few pairs at a time: find the lowercase
// partner of the big letter. Distractors are visually distinct at first,
// then closer — no penalty for a miss, just a gentle look again.
const bigLittleRounds=[
 {big:'A',say:'Big A, little a! Tap the little a.',littles:[['a',true],['s',false],['c',false]]},
 {big:'B',say:'Big B, little b — tap the little b.',littles:[['b',true],['p',false],['h',false]]},
 {big:'H',say:'Big H, little h — can you find it?',littles:[['h',true],['n',false],['r',false]]},
 {big:'M',say:'Big M, little m — tap the little m.',littles:[['m',true],['w',false],['n',false]]},
 {big:'T',say:'Big T, little t — where is it hiding?',littles:[['t',true],['f',false],['l',false]]},
 {big:'E',say:'Big E, little e — tap the little e!',littles:[['e',true],['c',false],['o',false]]}
];

/* ---------- The class page ---------- */

export function alphabetClassBody(L){
 const chips=[['Age','3 Years'],['Class','Preschool 1'],['Subjects','Letters, sounds &amp; matching']];
 const ledes=[
  'Twenty-six alphabet cards, three gentle games and a whole pile of familiar things to name. This is the first preschool class on the path — built for three-year-old pacing, which means short, playful and always allowed to stop.',
  'You do not need to teach the whole alphabet today. Start with a few letters that catch your child’s eye — the first letter of their name is the classic winner — and let the rest wait for next time.'
 ];
 const heroInner=`<span class="eyebrow">${esc(L.eyebrow)}</span>
  <h1>${esc(L.h1)}</h1>
  <div class="fc-chips lesson-chips">${chips.map(([k,v])=>`<span><strong>${k}</strong> ${v}</span>`).join('')}</div>
  ${ledes.map(p=>`<p class="lesson-lede">${p}</p>`).join('\n  ')}
  <div class="lesson-start"><a class="button" href="#todays-class">Start Today’s Class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Grown-up nearby, little one on the lap or roaming — both work.</span></div>`;

 // Learn the Letters: 26 real cards in order, each with a caption line to say
 // and a find-the-letters prompt. Group chips (A–F … Y–Z) filter the grid
 // below via /assets/alphabet-class.js; without JavaScript all 26 show.
 const groupOf=letter=>{const i=letter.charCodeAt(0)-97;return i<6?'a-f':i<12?'g-l':i<18?'m-r':i<23?'s-x':'y-z';};
 const slides=CARDS.map((c,i)=>{
  const up=c.letter.toUpperCase(),lo=c.letter;
  return `<figure class="lv-card" data-letter-group="${groupOf(lo)}"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}"${i===0?'':' loading="lazy"'} data-lv-say="${esc(up+' is for '+wordOf(c.slug)+'!')}" data-lv-find="${esc('Can you find the big '+up+' and the little '+lo+'?')}"></figure>`;
 }).join('');
 const learnSection=`<section class="wrap lesson-section" id="learn-the-letters" aria-label="Learn the letters">
  <span class="eyebrow">LEARN THE LETTERS</span>
  <h2>Twenty-six cards, from A to Z.</h2>
  <p class="lesson-copy">Every letter is here with its big form and its little form, a friendly picture and the word. Use the arrows to wander through them in order — or tap a group below to look at just a few letters at a time. Five cards is a fine lesson; twenty-six is a feast.</p>
  <div class="lv-frame" data-lesson-viewer>
   <div class="lv-stage" data-lv-stage></div>
   <p class="lv-caption" data-lv-caption hidden></p>
   <div class="lv-controls" data-lv-controls><button type="button" class="lv-btn" data-lv-prev>Previous</button><span class="lv-count" data-lv-count aria-live="polite" aria-atomic="true">Card 1 of ${CARDS.length}</span><button type="button" class="lv-btn" data-lv-next>Next</button></div>
   <div class="lv-actions" data-lv-actions><button type="button" class="lv-btn lv-ghost" data-lv-full>Full screen</button></div>
   <div class="lv-begin"><button type="button" class="button" data-lv-start>Start the letter cards</button><span class="lv-beginhint">Or simply scroll: all ${CARDS.length} cards are below.</span></div>
  </div>
  <div class="lv-groups" role="group" aria-label="Show a smaller group of letters" data-alphabet-groups hidden>
   <button type="button" class="lv-group-chip is-on" data-al-group="all" aria-pressed="true">All 26</button>
   <button type="button" class="lv-group-chip" data-al-group="a-f" aria-pressed="false">A–F</button>
   <button type="button" class="lv-group-chip" data-al-group="g-l" aria-pressed="false">G–L</button>
   <button type="button" class="lv-group-chip" data-al-group="m-r" aria-pressed="false">M–R</button>
   <button type="button" class="lv-group-chip" data-al-group="s-x" aria-pressed="false">S–X</button>
   <button type="button" class="lv-group-chip" data-al-group="y-z" aria-pressed="false">Y–Z</button>
  </div>
  <div class="lv-grid" data-lv-grid>${slides}</div>
 </section>`;

 const findSection=`<section class="wrap lesson-section tc-game" id="find-the-letter" aria-label="Play: find the letter" data-tc-correct="You found it!|Great finding!|Letter spotted!" data-tc-incorrect="Let’s look together.">
  <span class="eyebrow">PLAY · FIND THE LETTER</span>
  <h2>Find the letter.</h2>
  <p class="lesson-copy">One letter at a time, three big choices. Say the letter’s name together, then let your child tap it. A miss is just a look-again — there are no points, no timers and nothing to lose.</p>
  ${findRounds.map(r=>`<div class="tc-round" data-tc-round data-tc-ask="${esc(r.say)}"><p class="tc-ask">${r.say}</p><div class="tc-choices" role="group" aria-label="${esc(r.say)}">${r.letters.map(([l,ok])=>letterTile(l,{correct:ok,big:true})).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`).join('')}
 </section>`;

 const matchSection=`<section class="wrap lesson-section tc-game" id="match-the-picture" aria-label="Practice: match the picture" data-tc-correct="That’s the one!|Perfect match!|You matched it!" data-tc-incorrect="Try another picture — say the sound slowly.">
  <span class="eyebrow">PRACTICE · MATCH THE PICTURE</span>
  <h2>Match the picture.</h2>
  <p class="lesson-copy">Say the letter’s sound, then find the picture that starts with it. Every picture here is one of the real alphabet cards, and every correct answer begins the way its own card teaches.</p>
  ${matchRounds.map(r=>`<div class="tc-round tc-match" data-tc-round data-tc-ask="${esc(r.say)}"><p class="tc-ask">${r.say}</p><figure class="tc-target tc-target-letter"><span class="eyebrow">THE LETTER</span>${letterFace(r.letter,{big:true})}</figure><div class="tc-choices" role="group" aria-label="${esc(r.say)}">${r.choices.map(s=>picChoice(cardBySlug[s],s===r.target)).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`).join('')}
 </section>`;

 const bigLittleSection=`<section class="wrap lesson-section tc-game" id="big-and-little" aria-label="Practice: big and little letters" data-tc-correct="Perfect pair!|That’s its baby!|Big and little — well done!" data-tc-incorrect="Not that one — look for the little shape of the big letter.">
  <span class="eyebrow">PRACTICE · BIG AND LITTLE</span>
  <h2>Big and little letters.</h2>
  <p class="lesson-copy">Every letter has a big form and a little form — same letter, different size. A few pairs at a time: find the little letter that belongs to the big one.</p>
  ${bigLittleRounds.map(r=>`<div class="tc-round" data-tc-round data-tc-ask="${esc(r.say)}"><p class="tc-ask">${r.say}</p><div class="tc-choices" role="group" aria-label="${esc(r.say)}">${letterFace(r.big,{big:true})}<span class="tc-pair-arrow" aria-hidden="true">→</span>${r.littles.map(([l,ok])=>letterTile(l,{correct:ok})).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`).join('')}
 </section>`;

 const offScreenSection=`<section class="wrap lesson-section" id="off-screen" aria-label="Take it off screen">
  <span class="eyebrow">TAKE IT OFF SCREEN</span>
  <h2>Letters that live in your house.</h2>
  <p class="lesson-copy">The alphabet sticks best away from the screen, in short playful moments. Pick one of these — two minutes is plenty — and follow your child’s lead.</p>
  <div class="tc-hunt"><h3>Find their own letter</h3><ul class="lesson-prompts"><li>Say the first letter of your child’s name and look for it on cups, clothes and cereal boxes.</li><li>“That’s your letter!” is the whole game — and it never gets old.</li></ul></div>
  <div class="tc-hunt"><h3>Letter hunt on a book cover</h3><ul class="lesson-prompts"><li>Hold up a favourite picture book and ask, “Can you find a letter you know on the cover?”</li><li>Any letter they spot is a win — name it warmly and move on.</li></ul></div>
  <div class="tc-hunt"><h3>Playdough letters</h3><ul class="lesson-prompts"><li>Roll a long rope of playdough and bend it into the first letter of your child’s name — or today’s favourite card letter.</li><li>Letters you can squeeze are letters you remember.</li></ul></div>
  <div class="tc-hunt"><h3>Letters out in the world</h3><ul class="lesson-prompts"><li>On a walk or a shop trip, point out letters on signs and packaging — “Look, an S like sun!”</li><li>Keep it light: one or two letters per outing is exactly right.</li></ul></div>
  <p class="lesson-note">Stay close, keep it playful and stop while it is still fun. There is nothing to finish here.</p>
 </section>`;

 const printSection=`<section class="wrap lesson-section tc-printables" id="printables" aria-label="Print the cards">
  <span class="eyebrow">PRINT THE CARDS</span>
  <h2>Take the alphabet to the kitchen table.</h2>
  <p class="lesson-copy">All twenty-six cards can be printed two to a page, in order, straight from your browser — no PDF, no sign-up, nothing to install.</p>
  <div class="hero-actions tc-print-actions"><a class="button" href="${CLASS_PATH}print/">View Printable Cards <span aria-hidden="true">↗</span></a><button type="button" class="button button-ghost" data-tc-print-open="${CLASS_PATH}print/?print=1">Print Cards</button></div>
  <p class="lesson-note">Printed cards love fridges, bedroom doors and kitchen tables. The same cards also live in the <a href="${SET_URL}">flashcards library</a>, each with its own page.</p>
 </section>`;

 const completeSection=`<section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>Nice exploring!</h2>
  <p class="lesson-copy">You can come back to these letters anytime — they will be right here. Whether you met three letters or all twenty-six, that was the whole class, and stopping early is always allowed.</p>
  <div class="hero-actions"><a class="button" href="#todays-class">Explore Again <span aria-hidden="true">↑</span></a><a class="button button-ghost" href="${SET_URL}">View Alphabet Flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
  <div class="lesson-path"><a class="fc-stage lesson-card-link" href="/learning-path/"><div class="fc-stage-pills"><span class="fc-age">Where next</span><span class="fc-class">The path so far</span></div><h3>Back to the Learning Path</h3><p>Revisit the baby and toddler classes, or stop by the toddler Age 2 stages — the whole journey stays open.</p><span class="fc-open">Open the Learning Path <span aria-hidden="true">↗</span></span></a></div>
 </section>`;

 const teacherNoteSection=`<section class="wrap lesson-section"><span class="eyebrow">TEACHER NOTE</span><h2>One last word from class.</h2><div class="tc-note-block tc-teacher"><p class="tc-say">“Letters are neighbours, not lessons — wave at a few each day and they introduce themselves. See you at class two!”</p><p class="tc-who">— Your Kiddo School teacher</p></div></section>`;
 const principalSection=`<section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2><p class="lesson-copy">At three, letter play is recognition play: naming, noticing and tapping — not drilling or handwriting. If your child mixes up b and d, or loves Q only for its tail, that is exactly on track. The games here give calm feedback with no scores, and every sound claim on the cards is kept honest — including x, which mostly ends words rather than starting them.</p><p class="lesson-copy"><a href="/about/#principal">More from the Principal’s Office <span aria-hidden="true">↗</span></a></p></section>`;

 const tipsSection=`<section class="wrap lesson-section" id="how-to">
  <span class="eyebrow">TIPS FOR PARENTS</span>
  <h2>How to use this class.</h2>
  <p class="lesson-copy">Sit together for the card viewing — laps are the best seats in the house. Let your child do the tapping in the games, even when the answer looks obvious to you; the finger teaches the eye.</p>
  <p class="lesson-copy">Name the letter and say its sound in the same breath — “B, and it says buh” — then move on quickly. Letter names and letter sounds are both worth knowing, and mixing them in play keeps either one from feeling like a test.</p>
  <p class="lesson-note">Age 3 is a guide, not a deadline. If today’s class is two letters and a game of find-the-letter, today’s class was a success.</p>
 </section>`;

 return `${crumbNav([['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Alphabet & Letter Sounds']])}
 <article class="wrap lesson-hero"><div class="lesson-hero-copy">${heroInner}</div></article>
 ${`<section class="wrap lesson-section" id="todays-class" aria-label="Today’s class">
  <span class="eyebrow">TODAY’S CLASS</span>
  <h2>How today’s class works.</h2>
  <p class="lesson-copy">Seven little steps, in any order that suits you: a welcome from your teacher, the letter cards, two gentle find-and-match games, big-and-little letters, an off-screen hunt, and a warm goodbye. Stop after any step — that is a complete class, and there is never a score at the end.</p>
  <ol class="tc-flow">
   <li><span>1</span> Teacher welcome</li>
   <li><span>2</span> Learn the letters</li>
   <li><span>3</span> Play: find the letter</li>
   <li><span>4</span> Practice: match the picture</li>
   <li><span>5</span> Practice: big and little</li>
   <li><span>6</span> Take it off screen</li>
   <li><span>7</span> Class complete</li>
  </ol>
  <div class="tc-note-block tc-teacher"><span class="eyebrow">TEACHER WELCOME</span><p class="tc-say">“Hello, my friend — and hello to you, grown-up helper! Today we are playing with letters. Start with a few that catch your child’s eye; you can always come back for more.”</p><p class="tc-who">— Your Kiddo School teacher</p></div>
  <div class="lesson-start"><a class="button" href="#learn-the-letters">Begin the class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">First stop: the letter cards. Or jump straight to a game below.</span></div>
 </section>`}
 ${learnSection}
 ${findSection}
 ${matchSection}
 ${bigLittleSection}
 ${offScreenSection}
 ${printSection}
 ${teacherNoteSection}
 ${principalSection}
 ${completeSection}
 ${tipsSection}`;
}

/* ---------- Preschool hub (/preschool/) and Age 3 stage (/preschool/3-years/) ---------- */

export function preschoolHubBody(){
 return `${crumbNav([['Preschool']])}
 ${heading('THE NEXT STAGE','Preschool: the school grows up.','Kiddo School began with newborn eyes and grew through the toddler years. Preschool is the next stage of the same school — same calm pacing, same parent-led classes, now with letters, numbers, shapes, patterns and colors.')}
 <section class="wrap section compact"><div class="fc-stages">
  <a class="fc-stage lesson-card-link" href="/preschool/3-years/"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Preschool</span></div><h3>Age 3</h3><p>Four classes ready now: letters and sounds, counting to ten, shapes with patterns, and colors with mixing — always playful, never a test.</p><span class="fc-open">Open Age 3 <span aria-hidden="true">↗</span></span></a>
  <div class="fc-stage lesson-soon"><div class="fc-stage-pills"><span class="fc-age">Coming soon</span><span class="fc-class">More classes</span></div><h3>More preschool classes are on the drawing table</h3><p>Age 3 is just getting started. Meanwhile, the toddler stages and the <a href="/activities/">activity classrooms</a> have plenty to explore.</p></div>
 </div>
 <p class="lesson-note"><strong>Age ranges are guides, not tests.</strong> If your child is two and curious about letters, or four and new to Kiddo School — welcome in; start where it is fun.</p></section>`;
}

export function preschoolStageBody(){
 const classCards=[
  {href:'/preschool/3-years/alphabet-and-letter-sounds/',cls:'Class 1',title:'Alphabet &amp; Letter Sounds',copy:'Twenty-six alphabet cards, three gentle find-and-match games and easy activities for home — one short class, no score at the end.'},
  {href:'/preschool/3-years/numbers-and-counting/',cls:'Class 2',title:'Numbers &amp; Counting (1–10)',copy:'Ten counting cards, find-the-number, count-and-match and putting numbers in order — counting games with calm feedback and no scores.'},
  {href:'/preschool/3-years/shapes-and-patterns/',cls:'Class 3',title:'Shapes &amp; Patterns',copy:'Twelve shape cards, find-and-match games and playful AB and AAB patterns with simple shape tiles — pattern play at preschool pace.'},
  {href:'/preschool/3-years/colors-and-color-mixing/',cls:'Class 4',title:'Colors &amp; Color Mixing',copy:'Twelve color pairs — a splash and a matching picture — find-and-match games, a paint-mixing pot (red + yellow = orange) and a rainbow to explore.'}
 ];
 const setCards=[
  {href:'/flashcards/alphabet/',title:'Alphabet Flashcards A–Z',copy:'Every letter card has its own page with the picture, the words to say together and a download button — print the whole set from the class.'},
  {href:'/flashcards/numbers-and-counting/',title:'Numbers 1–10 Flashcards',copy:'One to ten with apples, ducks and butterflies — every counting card has its own page, its own prompt and its own download.'},
  {href:'/flashcards/shapes/',title:'Shape Flashcards',copy:'Twelve shapes from circle to octagon, each with its own page, a real-life shape hunt and a download button.'},
  {href:'/flashcards/colors/',title:'Color Flashcards',copy:'Twelve colors from red to rainbow — every card pairs a paint splash with a real-world picture, each with its own page and downloads.'}
 ];
 return `${crumbNav([['Preschool','/preschool/'],['Age 3']])}
 ${heading('PRESCHOOL · AGE 3','Age 3: letters, numbers, shapes and patterns.','The preschool stage of Kiddo School. Three-year-olds love to name, spot and show off what they know — so this stage starts with the alphabet, keeps counting calm, makes patterns a game and mixes colors like paint, at exactly their pace.')}
 <section class="wrap section compact"><div class="fc-chips lesson-chips"><span><strong>Age</strong> 3 Years</span><span><strong>Stage</strong> Preschool</span><span><strong>Status</strong> Four classes ready now</span></div>
 <h2 class="lesson-classheading">The classes</h2>
 <div class="fc-stages">${classCards.map(c=>`<a class="fc-stage lesson-card-link" href="${c.href}"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">${c.cls}</span></div><h3>${c.title}</h3><p>${c.copy}</p><span class="fc-open">Start today’s class <span aria-hidden="true">↗</span></span></a>`).join('')}
 </div>
 <h2 class="lesson-classheading">The flashcards</h2>
 <div class="fc-stages">${setCards.map(c=>`<a class="fc-stage lesson-card-link" href="${c.href}"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Flashcards</span></div><h3>${c.title}</h3><p>${c.copy}</p><span class="fc-open">Open the flashcards <span aria-hidden="true">↗</span></span></a>`).join('')}
 </div>
 <p class="lesson-note">Looking for earlier stages? The <a href="/toddler/2-years/">Age 2 classes</a> and the full <a href="/learning-path/">Learning Path</a> are right where you left them.</p></section>`;
}
