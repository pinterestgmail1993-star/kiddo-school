// Kiddo School — Preschool 6 (Age 3): Animals & Their Sounds.
// Full class at /preschool/3-years/animals-and-their-sounds/, built on the
// twelve owner-uploaded cards (nine with real recordings in
// /assets/sounds/animals/). Reuses the site's shared pieces: the lesson card
// viewer (data-lesson-viewer in site.js) for Meet the animals, the calm
// find-it engine (data-tc-round) for Guess the animal, and a small
// progressive-enhancement match board (animal-sounds-class.js) for Match &
// Learn. The sound board buttons are real controls wired to real recordings;
// without JavaScript every activity still reads as a script, and the three
// animals whose recordings are still on the way say so honestly. The family
// feedback section and the flashcards pill are injected by the build for
// every class page — the body here ends at the tips section.
import {animalsLesson} from './flashcards/data-animals.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const base=animalsLesson.r2Base+animalsLesson.folder;
const CARDS=animalsLesson.cards;
const cardBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));
const SET_URL='/flashcards/animal-sounds/';
const CLASS_PATH=animalsLesson.path;

const cardImg=(c,extra='')=>`<img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"${extra}>`;
const nameOf=c=>c.slug.charAt(0).toUpperCase()+c.slug.slice(1); // every animal slug is one word
const crumbNav=(crumbs)=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${crumbs.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${esc(href)}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
const soundSrc=c=>`/assets/sounds/animals/${c.audio}.mp3`;
const playBtn=(c,label,replay)=>`<button type="button" class="an-play${replay?' an-play-round':''}" data-an-sound="${c.slug}" data-an-src="${soundSrc(c)}" aria-label="Play the ${esc(c.slug)} sound, then play it again"><span class="an-play-icon" aria-hidden="true">▶</span><span class="an-play-label">${esc(label)}</span><span class="an-replay">Play again</span></button>`;

/* ---------- Class game data ---------- */

/* Viewer captions: one thing to say, one thing to find — per animal. */
const VIEWER={
 dog:{say:'Woof! The dog says woof — your turn: woof, woof!',find:'Find a dog in a book, a toy or out the window — say woof when you spot one!'},
 cat:{say:'Meow! Stretch it out: meee-ow!',find:'Walk on quiet cat feet across the room — cats step without a sound.'},
 cow:{say:'Moo! Open wide and let it rumble: moooo!',find:'Moo high, then moo low — which moo sounds more like a cow?'},
 sheep:{say:'Baa! A wobbly baa: baa-aa-aa!',find:'Bounce while you baa — sheep move in a little hop, so the sound hops too.'},
 duck:{say:'Quack, quack! A short, sharp quack!',find:'Waddle three steps, then quack — waddle, waddle, quack!'},
 chicken:{say:'Cluck, cluck, cluck! The hen says bok, bok, bok!',find:'Peck like a hen: little fast head-nods while you cluck.'},
 horse:{say:'Neigh! Start high and slide down: nneigh!',find:'Clip-clop your tongue — can you trot a steady horse beat?'},
 pig:{say:'Oink, oink! Snort it from the nose: oink-oink!',find:'Wrinkle your nose and sniff-sniff-snort — pigs find snacks with their snout.'},
 lion:{say:'Roooaaar! Start soft, end loud — a friendly roar!',find:'Paws up, big breath, roar together — then try a whisper-roar.'},
 elephant:{say:'Pbbbfft! Elephants trumpet — blow a big airy Pbbbfft!',find:'Swing one arm like a trunk and trumpet while it swings up.'},
 frog:{say:'Ribbit, ribbit! A bouncy little ribbit!',find:'Crouch and hop — one hop, one ribbit. How far can you hop?'},
 bird:{say:'Tweet, tweet! A little high tweet-tweet-tweet!',find:'Be silent for ten seconds and count the birds you hear.'}
};

/* Guess rounds: the sound plays, three real cards to choose from, exactly
   one correct. Every target has a real recording (duck, elephant and frog
   wait for theirs, so they never headline a listening round). */
const GUESS_ROUNDS=[
 {target:'dog',choices:['dog','cat','cow'],correct:0,ask:'Listen — woof, woof! Who is hiding behind the sound?'},
 {target:'cow',choices:['cow','sheep','horse'],correct:0,ask:'A long, slow moo. Tap the animal that says it!'},
 {target:'cat',choices:['horse','cat','sheep'],correct:1,ask:'A soft little meow. Who do you hear?'},
 {target:'lion',choices:['lion','pig','duck'],correct:0,ask:'A big roar in the distance! Tap the animal.'},
 {target:'horse',choices:['sheep','cow','horse'],correct:2,ask:'A whinny that slides down — which animal?'},
 {target:'bird',choices:['bird','frog','chicken'],correct:0,ask:'Tweet, tweet, tweet — a little song. Who is it?'}
];

/* Match board: six animals on the left, their six sound words shuffled on
   the right. Pairs are keyed by the sound word itself, so the board is
   honest on both sides — no numbering tricks to second-guess. */
const MATCH_LEFT=['dog','cow','sheep','duck','lion','frog'];
const MATCH_RIGHT=['quack','moo','ribbit','woof','baa','roar'];
const SOUND_WORD={woof:'Woof!',meow:'Meow!',moo:'Moo!',baa:'Baa!',quack:'Quack!',cluck:'Cluck!',neigh:'Neigh!',oink:'Oink!',roar:'Roar!',trumpet:'Trumpet!',ribbit:'Ribbit!',tweet:'Tweet!'};

const soundWordOf=c=>({dog:'woof',cat:'meow',cow:'moo',sheep:'baa',duck:'quack',chicken:'cluck',horse:'neigh',pig:'oink',lion:'roar',elephant:'trumpet',frog:'ribbit',bird:'tweet'})[c.slug];

/* ---------- The class page ---------- */

export function animalsClassBody(L){
 const chips=[['Age','3 Years'],['Class','Preschool 6'],['Subjects','Animals &amp; their sounds']];
 const ledes=[
  'Twelve animal friends on twelve picture cards — a dog, a cat, a cow, a sheep, a duck, a chicken, a horse, a pig, a lion, an elephant, a frog and a bird. Hear real animal sounds, guess who is hiding behind each one, match animals to their voices and take the whole farmyard off screen: this class follows Opposites &amp; Comparing on the preschool path.',
  'Animal sounds are the first words many children read — a woof or a moo is a word your child can say perfectly, right now. Say every sound together, make them loud and make them silly, and let the animal do the talking.'
 ];
 const heroInner=`<span class="eyebrow">${esc(L.eyebrow)}</span>
  <h1>${esc(L.h1)}</h1>
  <div class="fc-chips lesson-chips">${chips.map(([k,v])=>`<span><strong>${k}</strong> ${v}</span>`).join('')}</div>
  ${ledes.map(p=>`<p class="lesson-lede">${p}</p>`).join('\n  ')}
  <div class="lesson-start"><a class="button" href="#todays-class">Start Today’s Class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Grown-up nearby, little one on the lap or stomping like an elephant — both work.</span></div>`;

 // Meet the animals: all twelve cards in the grid, group chips (farm/wild)
 // as progressive enhancement, each card carrying its say line and its
 // find-it prompt for the shared viewer.
 const slides=CARDS.map((c,i)=>{
  const d=VIEWER[c.slug];
  return `<figure class="lv-card" data-an-group="${/^(dog|cat|cow|sheep|duck|chicken|horse|pig)$/.test(c.slug)?'farm':'wild'}"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}"${i===0?'':' loading="lazy"'} data-lv-say="${esc(d.say)}" data-lv-find="${esc(d.find)}"><figcaption class="lv-word">${esc(nameOf(c))}</figcaption></figure>`;
 }).join('');
 const learnSection=`<section class="wrap lesson-section" id="meet-the-animals" aria-label="Meet the animals">
  <span class="eyebrow">MEET THE ANIMALS</span>
  <h2>Twelve animal friends.</h2>
  <p class="lesson-copy">Say each animal’s name as it arrives, then make its sound together — any version your child likes is the right version. Use the arrows to wander, or simply scroll: all twelve cards are below.</p>
  <div class="lv-groups" data-an-groups hidden><button type="button" class="lv-group-chip is-on" data-an-group-filter="all" aria-pressed="true">All 12</button><button type="button" class="lv-group-chip" data-an-group-filter="farm" aria-pressed="false">Farm friends</button><button type="button" class="lv-group-chip" data-an-group-filter="wild" aria-pressed="false">Wild ones</button></div>
  <div class="lv-frame" data-lesson-viewer>
   <div class="lv-stage" data-lv-stage></div>
   <p class="lv-caption" data-lv-caption hidden></p>
   <div class="lv-controls" data-lv-controls><button type="button" class="lv-btn" data-lv-prev>Previous</button><span class="lv-count" data-lv-count aria-live="polite" aria-atomic="true">Card 1 of ${CARDS.length}</span><button type="button" class="lv-btn" data-lv-next>Next</button></div>
   <div class="lv-actions" data-lv-actions><button type="button" class="lv-btn lv-ghost" data-lv-full>Full screen</button></div>
   <div class="lv-begin"><button type="button" class="button" data-lv-start>Start the animal cards</button><span class="lv-beginhint">Or simply scroll: all ${CARDS.length} cards are below.</span></div>
  </div>
  <div class="lv-grid" data-lv-grid>${slides}</div>
  <div class="tc-hunt"><h3>Say the sounds together</h3><ul class="lesson-prompts"><li>Farm friends first: woof, meow, moo, baa, quack, cluck, neigh, oink — the sounds that happen at a farm, all day long.</li><li>Wild ones next: roar, trumpet, ribbit and tweet — big voices from the jungle, the pond and the trees outside your window.</li></ul></div>
 </section>`;

 // Listen: hear the sounds — the real sound board. Nine animals have
 // recordings; duck, elephant and frog get an honest "on the way" note
 // instead of a fake control.
 const soundCards=CARDS.filter(c=>c.audio).map(c=>`<div class="an-sound-card"><figure class="an-sound-img">${cardImg(c)}<figcaption class="lv-word">${esc(nameOf(c))}</figcaption></figure>${playBtn(c,'Play the '+soundWordOf(c).replace('!',''))}</div>`).join('');
 const soundSection=`<section class="wrap lesson-section" id="hear-the-sounds" aria-label="Hear the sounds">
  <span class="eyebrow">LISTEN · HEAR THE SOUNDS</span>
  <h2>Press play, then press it again.</h2>
  <p class="lesson-copy">These are real animal sounds. Tap play, listen together, then say the sound in your own voice — your voice is the one your child is learning from, so make it big. Play it again and again; repetition is the whole game.</p>
  <div class="an-sound-board" data-an-sound-board>${soundCards}</div>
  <noscript><p class="fc-hint">The sound buttons need JavaScript. Everything else works without it — and making the sounds yourselves is the best part anyway.</p></noscript>
  <p class="lesson-note">Duck, elephant and frog are on the cards above, and their recordings are on the way — until then, you make the quack, the trumpet and the ribbit yourselves. You are probably better at it anyway.</p>
 </section>`;

 // Play: guess the animal — the shared find-it engine with a replay button
 // in every round. Three real cards, one correct, misses are just listens.
 const guessSection=`<section class="wrap lesson-section tc-game" id="guess-the-animal" aria-label="Play: guess the animal" data-tc-correct="You found it!|That’s the one!|Great listening!" data-tc-incorrect="Listen once more — what does that animal really say?">
  <span class="eyebrow">PLAY · GUESS THE ANIMAL</span>
  <h2>Guess the animal.</h2>
  <p class="lesson-copy">Play the mystery sound, listen carefully, then tap the animal it belongs to. A miss is just another listen — there are no points, no timers and nothing to lose.</p>
  ${GUESS_ROUNDS.map(r=>{const t=cardBySlug[r.target];return `<div class="tc-round" data-tc-round data-an-guess="${r.target}" data-tc-ask="${esc(r.ask)}">
<p class="tc-ask">${r.ask}</p>
${playBtn(t,'Play the sound',true)}
<div class="tc-choices" role="group" aria-label="${esc(r.ask)}">${r.choices.map((slug,i)=>{const c=cardBySlug[slug];return `<button type="button" class="tc-choice" aria-label="${esc(nameOf(c))}"${i===r.correct?' data-tc-correct="true"':''}>${cardImg(c)}</button>`;}).join('')}</div>
<p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p>
</div>`;}).join('')}
 </section>`;

 // Play: match & learn — six animals, six sound words, tap-tap pairing with
 // calm feedback from animal-sounds-class.js. Without JS it is an honest
 // two-column chart: point at an animal, find its sound, say it together.
 const matchSection=`<section class="wrap lesson-section" id="match-animals-sounds" aria-label="Play: match animals to sounds">
  <span class="eyebrow">PLAY · MATCH &amp; LEARN</span>
  <h2>Match the animal to its sound.</h2>
  <p class="lesson-copy">Six animals on the left, six sound words shuffled on the right. Tap an animal, then tap the sound it makes. Match all six and every animal has found its voice — no hurry, no score, just pairs waiting to be found.</p>
  <div class="match-board" data-an-match-board>
   <div class="match-col">
    <h3>The animals</h3>
    <div class="match-grid">${MATCH_LEFT.map(s=>{const c=cardBySlug[s];return `<button type="button" class="op-card an-match" data-match-pair="${soundWordOf(c)}" data-match-side="left" aria-label="${esc(nameOf(c))}. Tap me, then find my sound.">${cardImg(c)}<span class="op-word">${esc(nameOf(c))}</span></button>`;}).join('')}</div>
   </div>
   <div class="match-col">
    <h3>Their sounds</h3>
    <div class="match-grid">${MATCH_RIGHT.map(sw=>`<button type="button" class="op-card an-match an-match-word" data-match-pair="${sw}" data-match-side="right" aria-label="The sound ${SOUND_WORD[sw]} Are you the sound of the tapped animal?"><span class="an-wordcard">${SOUND_WORD[sw]}</span></button>`).join('')}</div>
   </div>
  </div>
  <p class="match-status" data-an-match-status aria-live="polite" hidden></p>
  <noscript><p class="fc-hint">No JavaScript? The board still works: point at an animal on the left, then find its sound on the right — and say the sound together. Matching by pointing is the same game.</p></noscript>
 </section>`;

 const offScreenSection=`<section class="wrap lesson-section" id="off-screen" aria-label="Take it off screen">
  <span class="eyebrow">OFF-SCREEN PLAY</span>
  <h2>Be the animal.</h2>
  <p class="lesson-copy">Animal sounds are made for away-from-screen play: loud, physical and impossible to get wrong. Pick one of these — two minutes is plenty — and follow your child’s lead.</p>
  <div class="tc-hunt"><h3>Old MacDonald, live from your kitchen</h3><ul class="lesson-prompts"><li>Pick any three animals from the cards and sing their verse: “Old MacDonald had a farm — and on that farm he had a… dog!” Your child picks the next animal and supplies the sound.</li></ul></div>
  <div class="tc-hunt"><h3>Move like the animal</h3><ul class="lesson-prompts"><li>Draw a card and move like the picture: gallop like the horse, waddle like the duck, prowl like the lion, hop like the frog. You take turns calling the animal; the other one moves.</li></ul></div>
  <div class="tc-hunt"><h3>Sound walk</h3><ul class="lesson-prompts"><li>On the way to school or the shops, listen for real animals — a dog on a porch, birds in the trees. Say the animal word and its sound together each time you spot one.</li></ul></div>
  <div class="tc-hunt"><h3>Zoo box guess</h3><ul class="lesson-prompts"><li>Put two or three animal toys (or drawn cards) in a box. One of you hides an animal and makes its sound; the other reaches in and finds the right one by ear.</li></ul></div>
  <p class="lesson-note">Stay close, keep it playful and stop while it is still fun. There is nothing to finish here.</p>
 </section>`;

 const printSection=`<section class="wrap lesson-section tc-printables" id="printables" aria-label="Print the cards">
  <span class="eyebrow">PRINT THE CARDS</span>
  <h2>Take the animals to the kitchen table.</h2>
  <p class="lesson-copy">All twelve cards print two to a page, in card order, straight from your browser — no PDF, no sign-up, nothing to install. Cut them out and the whole set plays on the table.</p>
  <div class="hero-actions tc-print-actions"><a class="button" href="${CLASS_PATH}print/">View Printable Cards <span aria-hidden="true">↗</span></a><button type="button" class="button button-ghost" data-tc-print-open="${CLASS_PATH}print/?print=1">Print Cards</button></div>
  <p class="lesson-note">Printed cards love fridges, bedroom doors and kitchen tables. The same cards also live in the <a href="${SET_URL}">flashcards library</a>, each with its own page.</p>
 </section>`;

 const teacherNoteSection=`<section class="wrap lesson-section"><span class="eyebrow">TEACHER NOTE</span><h2>One last word from class.</h2><div class="tc-note-block tc-teacher"><p class="tc-say">“What a noisy, wonderful class! Your child heard real animals and answered every one of them in their own voice — that back-and-forth IS the lesson. Keep the sounds alive on your walks: a dog, a bird, a cow behind a fence. See you in class!”</p><p class="tc-who">— Your Kiddo School teacher</p></div></section>`;
 const principalSection=`<section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2><p class="lesson-copy">Sound play is language practice wearing a costume: every woof your child makes exercises the same listening, breath control and word-making skills that sentences need later. If your child repeats one sound forty times, that is not a hiccup — that is the lesson working. The recordings here are real animals, but your voice is the one that counts: play the sound once, then answer it in your own voice so your child can copy a human.</p><p class="lesson-copy"><a href="/about/#principal">More from the Principal’s Office <span aria-hidden="true">↗</span></a></p></section>`;

 const completeSection=`<section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>Wonderful listening!</h2>
  <p class="lesson-copy">Whether you met two animals or all twelve, that was the whole class — and stopping early is always allowed. The sounds will be right here, and so will the match board, whenever you come back. The animal voices are already busy in your house: at the window, in the bath, in every storybook.</p>
  <div class="hero-actions"><a class="button" href="#todays-class">Explore Again <span aria-hidden="true">↑</span></a><a class="button button-ghost" href="${SET_URL}">View Animal Flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
  <div class="lesson-path"><a class="fc-stage lesson-card-link" href="/preschool/3-years/body-parts-and-five-senses/"><div class="fc-stage-pills"><span class="fc-age">Where next</span><span class="fc-class">Class 7</span></div><h3>Body Parts &amp; My Five Senses</h3><p>The next preschool class is ready: twenty-four cards about your own body — point-and-find games, the five senses and a sense-matching board.</p><span class="fc-open">Go to the next class <span aria-hidden="true">↗</span></span></a></div>
 </section>`;

 const tipsSection=`<section class="wrap lesson-section" id="how-to">
  <span class="eyebrow">TIPS FOR PARENTS</span>
  <h2>How to use this class.</h2>
  <p class="lesson-copy">Play the sound once, then answer it yourself: the recording catches attention, your voice teaches. Say the animal’s name and its sound together — “dog… woof!” — and give your child the tap in every game, even when the answer looks obvious to you. The finger teaches the ear.</p>
  <p class="lesson-copy">Then hand the class over: your child presses play and YOU guess. Getting one wrong on purpose — “a cow says tweet!” — keeps the game alive for weeks, and being the quiz master is powerful practice for a three-year-old.</p>
  <p class="lesson-note">Age 3 is a guide, not a deadline. If today’s class was one big woof and one bigger roar, today’s class was a success.</p>
 </section>`;

 return `${crumbNav(L.crumbs.slice(0,-1).concat([['Animals & Their Sounds']]))}
 <article class="wrap lesson-hero"><div class="lesson-hero-copy">${heroInner}</div></article>
 ${`<section class="wrap lesson-section" id="todays-class" aria-label="Today’s class">
  <span class="eyebrow">TODAY’S CLASS</span>
  <h2>How today’s class works.</h2>
  <p class="lesson-copy">Seven little steps, in any order that suits you: a welcome from your teacher, the animal cards, real sounds to hear, a guess-the-animal game, a match board, off-screen play, and a warm goodbye. Stop after any step — that is a complete class, and there is never a score at the end.</p>
  <ol class="tc-flow">
   <li><span>1</span> Teacher welcome</li>
   <li><span>2</span> Meet the animals</li>
   <li><span>3</span> Listen: hear the sounds</li>
   <li><span>4</span> Play: guess the animal</li>
   <li><span>5</span> Play: match animals to sounds</li>
   <li><span>6</span> Take it off screen</li>
   <li><span>7</span> Class complete</li>
  </ol>
  <div class="tc-note-block tc-teacher"><span class="eyebrow">TEACHER WELCOME</span><p class="tc-say">“Hello, my friend — and hello to you, grown-up helper! Today the classroom is a barnyard: we will meet twelve animal friends, listen to their real sounds and make every single one of them ourselves. Woof, moo, roar — ready when you are!”</p><p class="tc-who">— Your Kiddo School teacher</p></div>
  <div class="lesson-start"><a class="button" href="#meet-the-animals">Begin the class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">First stop: the animal cards. Or jump straight to the sounds below.</span></div>
 </section>`}
 ${learnSection}
 ${soundSection}
 ${guessSection}
 ${matchSection}
 ${offScreenSection}
 ${printSection}
 ${teacherNoteSection}
 ${principalSection}
 ${completeSection}
 ${tipsSection}`;
}
