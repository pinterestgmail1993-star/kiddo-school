// Kiddo School — Preschool 7 (Age 3): Body Parts & My Five Senses.
// Full class at /preschool/3-years/body-parts-and-five-senses/, built on the
// twenty-four owner-uploaded cards (fifteen body parts + eight sense words
// + skin doing double duty). Reuses the site's shared pieces: the lesson card
// viewer (data-lesson-viewer in site.js) for Meet Your Body and My Five
// Senses, the calm find-it engine (data-tc-round) for Point & Find and
// Let's Play, and a small progressive-enhancement match board
// (body-parts-class.js) for Match the Sense. Without JavaScript every
// activity still reads as a script — the chips stay hidden, the boards are
// honest pointing charts, and the noscript notes say exactly that. The
// family feedback section and the flashcards pill are injected by the build
// for every class page — the body here ends at the tips section.
import {bodyPartsLesson,bodyPartsCardContent} from './flashcards/data-body-parts.mjs';
import {age3SolveSheets} from './lessons.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const base=bodyPartsLesson.r2Base+bodyPartsLesson.folder;
const CARDS=bodyPartsLesson.cards;
const cardBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));
const SET_URL='/flashcards/body-parts-and-five-senses/';
const CLASS_PATH=bodyPartsLesson.path;

const cardImg=(c,extra='')=>`<img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"${extra}>`;
const nameOf=slug=>bodyPartsCardContent[slug].word;
const crumbNav=(crumbs)=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${crumbs.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${esc(href)}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;

/* ---------- Class game data ---------- */

/* Viewer captions, Meet Your Body: one thing to say, one thing to do —
   per body part. Fifteen cards in card order. */
const BODY_VIEWER=[
 {slug:'head',say:'The head sits on top — it holds your eyes, your ears, your smile and your ideas.',find:'Pat the top of your head — pat, pat!'},
 {slug:'eyes',say:'Two eyes for blinking, winking and finding lost socks.',find:'Blink three times — blink, blink, blink!'},
 {slug:'ears',say:'Two ears, one on each side, catching sounds all day long.',find:'Point to each ear — one, then the other!'},
 {slug:'nose',say:'A nose for smelling and sniffing — and for wiggling, if you can.',find:'Wiggle your nose! Sniff, sniff!'},
 {slug:'mouth',say:'A mouth for smiling, humming, talking and lunch.',find:'Smile as big as this mouth — there it is!'},
 {slug:'tongue',say:'A tongue — it tastes your food and helps you say the word tongue.',find:'Stick your tongue out and say ahh!'},
 {slug:'hair',say:'Hair on top of your head — brush it, pat it, ruffle it.',find:'Pat your hair gently — is it soft?'},
 {slug:'chin',say:'The chin lives under your mouth — a tricky one, well spotted.',find:'Tuck a finger under your chin — found it!'},
 {slug:'cheeks',say:'Two cheeks for smiling wide and getting kisses.',find:'Pat your cheeks — pat, pat!'},
 {slug:'hands',say:'Two hands for clapping, waving, building and helping.',find:'Clap your hands — clap, clap!'},
 {slug:'fingers',say:'Five fingers on every hand — your own counting set.',find:'Wiggle all five fingers — wiggle, wiggle!'},
 {slug:'feet',say:'Two feet for stomping, jumping and tiptoeing.',find:'Stomp both feet — stomp, stomp!'},
 {slug:'toes',say:'Ten toes at the end of your feet, five on each side.',find:'Wiggle your toes — can they wiggle inside your shoes?'},
 {slug:'arms',say:'Two arms for reaching, hugging and stretching high.',find:'Reach your arms up high — sooo tall!'},
 {slug:'legs',say:'Two legs for marching, hopping and running fast.',find:'March your legs — march, march, march!'}
];
/* Group key per body card: face (head..cheeks), hands (hands..toes), limbs. */
const BODY_GROUP={head:'face',eyes:'face',ears:'face',nose:'face',mouth:'face',tongue:'face',hair:'face',chin:'face',cheeks:'face',hands:'hands',fingers:'hands',feet:'hands',toes:'hands',arms:'limbs',legs:'limbs'};

/* Viewer captions, My Five Senses: the five sense words, skin, then three
   everyday doing-words. Nine cards (see, hear, smell, touch, taste, look,
   listen, feel, skin) — the tongue lives in the body viewer above. */
const SENSE_VIEWER=[
 {slug:'see',say:'Eyes see — the butterfly, the sky, your own reflection.',find:'Look around the room. What do you see first?'},
 {slug:'hear',say:'Ears hear — a dog, a song, someone calling your name.',find:'Be very quiet… what do you hear right now?'},
 {slug:'smell',say:'The nose smells — flowers, bananas, fresh bread.',find:'Sniff the air twice — what does it smell like?'},
 {slug:'touch',say:'Skin touches — soft, bumpy, warm and cool.',find:'Touch your sleeve — is it soft or scratchy?'},
 {slug:'taste',say:'The tongue tastes — sweet, salty, sour and yummy.',find:'What did you taste at breakfast?'},
 {slug:'look',say:'Look! Eyes working hard, up close and far away.',find:'Look up high, then look down low — what changed?'},
 {slug:'listen',say:'Listen… cup your ear for the quiet sounds.',find:'Whisper a word — can your grown-up hear it?'},
 {slug:'feel',say:'Feel how soft — or how bumpy — the world is.',find:'Feel three things nearby. Which is softest?'},
 {slug:'skin',say:'Skin covers you from head to toes — and it feels everything.',find:'Gently press a fingertip to the back of your hand — hello, skin!'}
];
/* Group key per sense card: the five senses vs more doing-words. */
const SENSE_GROUP={see:'senses',hear:'senses',smell:'senses',touch:'senses',taste:'senses',skin:'senses',tongue:'senses',look:'words',listen:'words',feel:'words'};

/* Point & Find rounds: touch it on yourself first, then tap the card.
   Three real cards each, exactly one correct, positions varied. */
const POINT_ROUNDS=[
 {ask:'Tap the head!',choices:['head','hands','cheeks'],correct:0},
 {ask:'Tap the hands!',choices:['feet','hands','arms'],correct:1},
 {ask:'Tap the nose!',choices:['nose','ears','chin'],correct:0},
 {ask:'Tap the toes!',choices:['fingers','cheeks','toes'],correct:2},
 {ask:'Tap the mouth!',choices:['chin','mouth','eyes'],correct:1}
];

/* Let's Play rounds: body parts and senses mixed. Positions varied. */
const PLAY_ROUNDS=[
 {ask:'Tap the fingers!',choices:['toes','fingers','chin'],correct:1},
 {ask:'Which card shows smelling?',choices:['smell','see','hear'],correct:0},
 {ask:'Tap the cheeks!',choices:['mouth','ears','cheeks'],correct:2},
 {ask:'Which one shows tasting?',choices:['touch','taste','look'],correct:1},
 {ask:'Tap the feet!',choices:['head','chin','feet'],correct:2}
];

/* Match the Sense board: five sense organs on the left, five sense words
   shuffled on the right. Pairs are keyed by the sense word itself, so the
   board is honest on both sides — no numbering tricks to second-guess. */
const MATCH_LEFT=['eyes','ears','nose','tongue','skin'];
const MATCH_RIGHT=['taste','see','touch','hear','smell'];

/* ---------- The class page ---------- */

export function bodyPartsClassBody(L){
 const chips=[['Age','3 Years'],['Class','Preschool 7'],['Subjects','Body parts &amp; the five senses']];
 const ledes=[
  'Twenty-four cards about the one thing your child knows best: their own body. Meet your head, your hands and your wiggly fingers, meet the five senses that explore the world, point, find and match — this class follows Animals &amp; Their Sounds on the preschool path.',
  'Body-part words are words your child uses all day long: hands for clapping, feet for stomping, ears for listening. You say the word, your child points to it — that is the whole lesson, and it never feels like one.'
 ];
 const heroInner=`<span class="eyebrow">${esc(L.eyebrow)}</span>
  <h1>${esc(L.h1)}</h1>
  <div class="fc-chips lesson-chips">${chips.map(([k,v])=>`<span><strong>${k}</strong> ${v}</span>`).join('')}</div>
  ${ledes.map(p=>`<p class="lesson-lede">${p}</p>`).join('\n  ')}
  <div class="lesson-start"><a class="button" href="#todays-class">Start Today’s Class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Grown-up nearby, little one wriggling like a finger — both work.</span></div>`;

 // Meet Your Body: fifteen body-part cards, group chips (face / hands &
 // feet / arms & legs) as progressive enhancement, each card carrying its
 // say line and its do-it prompt for the shared viewer.
 const bodySlides=BODY_VIEWER.map((v,i)=>{
  const c=cardBySlug[v.slug];
  return `<figure class="lv-card" data-bp-group="${BODY_GROUP[v.slug]}"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}"${i===0?'':' loading="lazy"'} data-lv-say="${esc(v.say)}" data-lv-find="${esc(v.find)}"><figcaption class="lv-word">${esc(nameOf(v.slug))}</figcaption></figure>`;
 }).join('');
 /* SOLVE THE SHEETS — the class's real printable work: the owner asked for
    worksheet-solving guidance here instead of coded games. */
 const solveSection=age3SolveSheets({
  heading:'Solve the body sheets together.',
  copy:'The twenty-four body and sense cards print two to a page, straight from your browser. Printed, cut and named, they are the class\u2019s real worksheets — and on screen, every card page can be drawn on directly.',
  steps:[
   ['Print the cards','Open the printable cards and print all twenty-four, two to a page. Cut them out together, naming each body part as it is cut.'],
   ['Point to your own','Hold up a card — head, chin, knee — and point to that part on your own body. The word lands where the part lives.'],
   ['Try the senses','On the sense cards — see, hear, smell, taste, touch — try each sense out loud: what can you hear right now? One sense a day is a lovely pace.'],
   ['Trace the body','On paper, trace your child\u2019s hand on the back of a card and label the fingers together. On screen, the card page\u2019s Write & Color layer is the crayon.']
  ],
  printHref:'/preschool/3-years/body-parts-and-five-senses/print/',fcHref:'/flashcards/body-parts-and-five-senses/'
 });
 const bodySection=`<section class="wrap lesson-section" id="meet-your-body" aria-label="Meet your body">
  <span class="eyebrow">MEET YOUR BODY</span>
  <h2>Fifteen parts, one amazing kid.</h2>
  <p class="lesson-copy">Say each body part’s name as it arrives, then point to it on yourself — the pointing is the lesson. Use the arrows to wander, or simply scroll: all fifteen cards are below.</p>
  <div class="lv-groups" data-bp-groups hidden><button type="button" class="lv-group-chip is-on" data-bp-group-filter="all" aria-pressed="true">All 15</button><button type="button" class="lv-group-chip" data-bp-group-filter="face" aria-pressed="false">Face &amp; head</button><button type="button" class="lv-group-chip" data-bp-group-filter="hands" aria-pressed="false">Hands &amp; feet</button><button type="button" class="lv-group-chip" data-bp-group-filter="limbs" aria-pressed="false">Arms &amp; legs</button></div>
  <div class="lv-frame" data-lesson-viewer>
   <div class="lv-stage" data-lv-stage></div>
   <p class="lv-caption" data-lv-caption hidden></p>
   <div class="lv-controls" data-lv-controls><button type="button" class="lv-btn" data-lv-prev>Previous</button><span class="lv-count" data-lv-count aria-live="polite" aria-atomic="true">Card 1 of ${BODY_VIEWER.length}</span><button type="button" class="lv-btn" data-lv-next>Next</button></div>
   <div class="lv-actions" data-lv-actions><button type="button" class="lv-btn lv-ghost" data-lv-full>Full screen</button></div>
   <div class="lv-begin"><button type="button" class="button" data-lv-start>Start the body cards</button><span class="lv-beginhint">Or simply scroll: all ${BODY_VIEWER.length} cards are below.</span></div>
  </div>
  <div class="lv-grid" data-lv-grid>${bodySlides}</div>
  <div class="tc-hunt"><h3>Say it, then show it</h3><ul class="lesson-prompts"><li>The pair is the whole game: “hands!” — then clap, clap. “feet!” — then stomp, stomp. Every body part gets a word and an action.</li></ul></div>
 </section>`;

 // Point & Find: touch it on yourself first, then tap the card that shows
 // it. The shared find-it engine — misses are just another look.
 const pointSection=`<section class="wrap lesson-section tc-game" id="point-and-find" aria-label="Play: point and find" data-tc-correct="You found it!|That’s the one!|Great pointing!" data-tc-incorrect="Look again together — point to it on yourself first, then try another card.">
  <span class="eyebrow">PLAY · POINT &amp; FIND</span>
  <h2>Point and find.</h2>
  <p class="lesson-copy">Touch the body part on yourself first — pat your head, wiggle your nose — then tap the card that shows it. A miss is just another look; there are no points, no timers and nothing to lose.</p>
  ${POINT_ROUNDS.map(r=>`<div class="tc-round" data-tc-round data-bp-point="${r.choices[r.correct]}" data-tc-ask="${esc(r.ask)}">
<p class="tc-ask">${r.ask}</p>
<div class="tc-choices" role="group" aria-label="${esc(r.ask)}">${r.choices.map((slug,i)=>{const c=cardBySlug[slug];return `<button type="button" class="tc-choice" aria-label="${esc(nameOf(slug))}"${i===r.correct?' data-tc-correct="true"':''}>${cardImg(c)}</button>`;}).join('')}</div>
<p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p>
</div>`).join('')}
 </section>`;

 // My Five Senses: eight sense cards, chips (five senses / more sense
 // words), each caption explaining one sense in three-year-old words.
 const senseSlides=SENSE_VIEWER.map((v,i)=>{
  const c=cardBySlug[v.slug];
  return `<figure class="lv-card" data-bp-group="${SENSE_GROUP[v.slug]}"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}"${i===0?'':' loading="lazy"'} data-lv-say="${esc(v.say)}" data-lv-find="${esc(v.find)}"><figcaption class="lv-word">${esc(nameOf(v.slug))}</figcaption></figure>`;
 }).join('');
 const sensesSection=`<section class="wrap lesson-section" id="my-five-senses" aria-label="My five senses">
  <span class="eyebrow">MY FIVE SENSES</span>
  <h2>Five ways to know the world.</h2>
  <p class="lesson-copy">Eyes see, ears hear, the nose smells, the tongue tastes, the skin touches — five senses, always working together. Read each card slowly, then try the little experiment it offers.</p>
  <div class="lv-groups" data-bp-groups hidden><button type="button" class="lv-group-chip is-on" data-bp-group-filter="all" aria-pressed="true">All 9</button><button type="button" class="lv-group-chip" data-bp-group-filter="senses" aria-pressed="false">The five senses</button><button type="button" class="lv-group-chip" data-bp-group-filter="words" aria-pressed="false">More sense words</button></div>
  <div class="lv-frame" data-lesson-viewer>
   <div class="lv-stage" data-lv-stage></div>
   <p class="lv-caption" data-lv-caption hidden></p>
   <div class="lv-controls" data-lv-controls><button type="button" class="lv-btn" data-lv-prev>Previous</button><span class="lv-count" data-lv-count aria-live="polite" aria-atomic="true">Card 1 of ${SENSE_VIEWER.length}</span><button type="button" class="lv-btn" data-lv-next>Next</button></div>
   <div class="lv-actions" data-lv-actions><button type="button" class="lv-btn lv-ghost" data-lv-full>Full screen</button></div>
   <div class="lv-begin"><button type="button" class="button" data-lv-start>Start the sense cards</button><span class="lv-beginhint">Or simply scroll: all ${SENSE_VIEWER.length} cards are below.</span></div>
  </div>
  <div class="lv-grid" data-lv-grid>${senseSlides}</div>
  <div class="tc-hunt"><h3>The five senses, in one breath</h3><ul class="lesson-prompts"><li>Eyes see. Ears hear. Nose smells. Tongue tastes. Skin touches. Say it like a little song, with a point for each line — three times through is a whole sense class.</li></ul></div>
 </section>`;

 // Match the Sense: five organs on the left, five sense words shuffled on
 // the right — tap-tap pairing with calm feedback from body-parts-class.js.
 // Without JS it is an honest two-column chart: point at an organ, find its
 // sense word, say them together.
 const senseWord=w=>w.charAt(0).toUpperCase()+w.slice(1);
 const matchSection=`<section class="wrap lesson-section" id="match-the-sense" aria-label="Play: match the sense">
  <span class="eyebrow">PLAY · MATCH THE SENSE</span>
  <h2>Match the body part to its sense.</h2>
  <p class="lesson-copy">Five body parts on the left, five sense words shuffled on the right. Tap a body part, then tap the sense it does. Match all five and every part has found its job — no hurry, no score, just pairs waiting to be found.</p>
  <div class="match-board" data-bp-match-board>
   <div class="match-col">
    <h3>The body parts</h3>
    <div class="match-grid">${MATCH_LEFT.map(slug=>{const c=cardBySlug[slug];return `<button type="button" class="op-card bp-match" data-match-pair="${slug==='eyes'?'see':slug==='ears'?'hear':slug==='nose'?'smell':slug==='tongue'?'taste':'touch'}" data-match-side="left" aria-label="${esc(nameOf(slug))}. Tap me, then find the sense I do.">${cardImg(c)}<span class="op-word">${esc(nameOf(slug))}</span></button>`;}).join('')}</div>
   </div>
   <div class="match-col">
    <h3>Their senses</h3>
    <div class="match-grid">${MATCH_RIGHT.map(w=>`<button type="button" class="op-card bp-match bp-match-word" data-match-pair="${w}" data-match-side="right" aria-label="The sense word ${senseWord(w)}. Are you the sense of the tapped body part?"><span class="an-wordcard">${senseWord(w)}!</span></button>`).join('')}</div>
   </div>
  </div>
  <p class="match-status" data-bp-match-status aria-live="polite" hidden></p>
  <noscript><p class="fc-hint">No JavaScript? The board still works: point at a body part on the left, then find its sense word on the right — and say them together. Matching by pointing is the same game.</p></noscript>
 </section>`;

 // Let's Play: body parts and senses mixed, real cards, one correct each.
 const playSection=`<section class="wrap lesson-section tc-game" id="lets-play" aria-label="Play: body parts and senses" data-tc-correct="You found it!|That’s the one!|Wonderful exploring!" data-tc-incorrect="Try again together — say the word out loud, then look once more.">
  <span class="eyebrow">PLAY · LET’S PLAY</span>
  <h2>Body parts and senses, mixed up.</h2>
  <p class="lesson-copy">Everything from today, shuffled together: body parts to tap, senses to spot. Say each question out loud, let your child take the tap, and celebrate every try.</p>
  ${PLAY_ROUNDS.map(r=>`<div class="tc-round" data-tc-round data-bp-play="${r.choices[r.correct]}" data-tc-ask="${esc(r.ask)}">
<p class="tc-ask">${r.ask}</p>
<div class="tc-choices" role="group" aria-label="${esc(r.ask)}">${r.choices.map((slug,i)=>{const c=cardBySlug[slug];return `<button type="button" class="tc-choice" aria-label="${esc(nameOf(slug))}"${i===r.correct?' data-tc-correct="true"':''}>${cardImg(c)}</button>`;}).join('')}</div>
<p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p>
</div>`).join('')}
 </section>`;

 const offScreenSection=`<section class="wrap lesson-section" id="off-screen" aria-label="Try it off screen">
  <span class="eyebrow">OFF-SCREEN PLAY</span>
  <h2>Your body, live from your living room.</h2>
  <p class="lesson-copy">Body parts and senses are made for away-from-screen play: no toys needed, and the star of the show is standing right in front of you. Pick one of these — two minutes is plenty.</p>
  <div class="tc-hunt"><h3>Simon says, Kiddo edition</h3><ul class="lesson-prompts"><li>“Simon says touch your nose! Simon says clap your hands! Stomp your feet!” — leaving Simon out now and then is the best part, and getting caught means a giggle, not a loss.</li></ul></div>
  <div class="tc-hunt"><h3>A quiet listening minute</h3><ul class="lesson-prompts"><li>Sit together, close your eyes and count the sounds you can hear: a car, a bird, the fridge, a footstep. Ears on, voices off — five seconds to start, longer if it catches on.</li></ul></div>
  <div class="tc-hunt"><h3>A looking walk</h3><ul class="lesson-prompts"><li>On the way anywhere, be sense detectives: find something red, something tiny, something high up, something that smells interesting. Every find gets its sense word said out loud.</li></ul></div>
  <div class="tc-hunt"><h3>The feel basket</h3><ul class="lesson-prompts"><li>Collect three things that feel different — a soft blanket, a smooth spoon, a bumpy sponge. Touch each one and say the word: soft, smooth, bumpy. Eyes closed doubles the fun.</li></ul></div>
  <p class="lesson-note"><strong>One safety word for this class:</strong> hands, ears and noses explore everything, but mouths only taste real food that a grown-up has checked — never anything found on the ground or handed over by curiosity.</p>
 </section>`;

 const printSection=`<section class="wrap lesson-section tc-printables" id="printables" aria-label="Print the cards">
  <span class="eyebrow">PRINT THE CARDS</span>
  <h2>Take the body to the kitchen table.</h2>
  <p class="lesson-copy">All twenty-four cards print two to a page, in card order, straight from your browser — no PDF, no sign-up, nothing to install. Cut them out and the whole class plays on the table.</p>
  <div class="hero-actions tc-print-actions"><a class="button" href="${CLASS_PATH}print/">View Printable Cards <span aria-hidden="true">↗</span></a><button type="button" class="button button-ghost" data-tc-print-open="${CLASS_PATH}print/?print=1">Print Cards</button></div>
  <p class="lesson-note">Printed cards love fridges, bedroom doors and kitchen tables. The same cards also live in the <a href="${SET_URL}">flashcards library</a>, each with its own page.</p>
 </section>`;

 const teacherNoteSection=`<section class="wrap lesson-section"><span class="eyebrow">TEACHER NOTE</span><h2>One last word from class.</h2><div class="tc-note-block tc-teacher"><p class="tc-say">“What a wonderful class! Your child named body parts, pointed to every one of them, and met all five senses — that is real body awareness, and it starts with words. Keep playing through the day: where are your ears? What does the bathwater feel like? See you in class!”</p><p class="tc-who">— Your Kiddo School teacher</p></div></section>`;
 const principalSection=`<section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2><p class="lesson-copy">Body-part words are the beginning of three big things: self-care (hands wash, feet get socks), safety (a child who can say where it hurts is easier to help) and science (the five senses are the first scientific instruments anyone owns). None of this needs a lesson plan — naming body parts while dressing, bathing and walking does the whole job. When your child points and names, answer with the word and one more: “Yes — and what do your ears do?”</p><p class="lesson-copy"><a href="/about/#principal">More from the Principal’s Office <span aria-hidden="true">↗</span></a></p></section>`;

 const completeSection=`<section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>Wonderful exploring!</h2>
  <p class="lesson-copy">Whether you met two body parts or all fifteen, that was the whole class — and stopping early is always allowed. The cards will be right here, and so will the match board, whenever you come back. The body words are already busy in your house: at bath time, at dressing time, at every where-are-your-toes moment.</p>
  <div class="hero-actions"><a class="button" href="#todays-class">Explore Again <span aria-hidden="true">↑</span></a><a class="button button-ghost" href="${SET_URL}">View Body Parts Flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
  <div class="lesson-path"><a class="fc-stage lesson-card-link" href="/preschool/3-years/animals-and-their-sounds/"><div class="fc-stage-pills"><span class="fc-age">Previous class</span><span class="fc-class">Class 6</span></div><h3>Animals &amp; Their Sounds</h3><p>Twelve animal friends with real sounds to hear — a guess-the-animal listening game, a match-the-sound board and off-screen barnyard play.</p><span class="fc-open">Open this class <span aria-hidden="true">↗</span></span></a><a class="fc-stage lesson-card-link" href="/preschool/3-years/fruits-and-vegetables/"><div class="fc-stage-pills"><span class="fc-age">Where next</span><span class="fc-class">Class 8</span></div><h3>Fruits &amp; Vegetables</h3><p>The next preschool class is ready: sixteen food cards — eight fruits, eight vegetables — with sorting bowls, matching twins and a rainbow to count.</p><span class="fc-open">Go to the next class <span aria-hidden="true">↗</span></span></a></div>
 </section>`;

 const tipsSection=`<section class="wrap lesson-section" id="how-to">
  <span class="eyebrow">TIPS FOR PARENTS</span>
  <h2>How to use this class.</h2>
  <p class="lesson-copy">Say the word and point to it — the pair is what sticks. “Head!” while you pat your head teaches faster than any worksheet, because your child’s own body is the picture book. Let your child take the taps in every game, even when the answer looks obvious to you: the finger teaches the mind.</p>
  <p class="lesson-copy">Then flip the game: your child says the word and YOU point. Getting one wrong on purpose — patting your elbow when they say chin — keeps the game alive for weeks, and being the caller is powerful practice for a three-year-old.</p>
  <p class="lesson-note">Age 3 is a guide, not a deadline. If today’s class was two round cheeks and one loud stomp, today’s class was a success.</p>
 </section>`;

 return `${crumbNav(L.crumbs.slice(0,-1).concat([['Body Parts & My Five Senses']]))}
 <article class="wrap lesson-hero"><div class="lesson-hero-copy">${heroInner}</div></article>
 ${`<section class="wrap lesson-section" id="todays-class" aria-label="Today’s class">
  <span class="eyebrow">TODAY’S CLASS</span>
  <h2>How today’s class works.</h2>
  <p class="lesson-copy">Five little steps, in any order that suits you: a welcome from your teacher, the body-part cards, the five senses, solving the body sheets together, off-screen play, and a warm goodbye. Stop after any step — that is a complete class, and there is never a score at the end.</p>
  <ol class="tc-flow">
   <li><span>1</span> Teacher welcome</li>
   <li><span>2</span> Meet your body</li>
   <li><span>3</span> My five senses</li>
   <li><span>4</span> Solve the sheets</li>
   <li><span>5</span> Take it off screen</li>
   <li><span>6</span> Class complete</li>
  </ol>
  <div class="tc-note-block tc-teacher"><span class="eyebrow">TEACHER WELCOME</span><p class="tc-say">“Hello, my friend — and hello to you, grown-up helper! Today’s class is all about YOU: your head, your wiggly fingers, your stomping feet — and the five amazing senses that help you explore the whole world. Hands on your head — let’s go!”</p><p class="tc-who">— Your Kiddo School teacher</p></div>
  <div class="lesson-start"><a class="button" href="#meet-your-body">Begin the class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">First stop: your body, from head to toes.</span></div>
 </section>`}
 ${bodySection}
 ${sensesSection}
 ${solveSection}
 ${offScreenSection}
 ${printSection}
 ${teacherNoteSection}
 ${principalSection}
 ${completeSection}
 ${tipsSection}`;
}
