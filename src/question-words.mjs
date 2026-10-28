// Kiddo School — EXTRA CLASS · Question Words: the class page at
// /question-words/ (owner brief 2026-10-28: cover.webp first, then the six
// core cards who/what/when/where/why/how, then the rest) PLUS the parents'
// shelf at /flashcards/question-words/. The owner restated the standing rule
// for this class in one line: "same — no individual pages." So the module
// builds exactly two URLs: the class page and the library shelf — nothing
// per card anywhere. The class page: cover first (owner rule), then the six
// core questions in the owner's order, then the ten more questions in file
// order — the artwork, the word, one concrete way to ask it tonight, and a
// Download + Print control under every image. The shelf: the same sixteen
// tiles with the same buttons, spoken to parents. Print prints JUST that
// card (the deck-agnostic assets/manners.js handler: data-mn-print →
// body.mn-printing + .mn-print-card + @media print rules in style.css);
// download serves the full-size webp. The 17 files were probed live on R2
// at school/extra-classes/question-words/ (17/17 HTTP 200 image/webp, every
// file 800×1131 portrait — the brief's …/question-words/flashcards/ folder
// is empty; the bucket holds the files one level up, the same quirk as the
// Task-12 cafeteria brief). Owner cross-links: Class 21 Body Parts & My
// Five Senses, Class 29 Storytime & Pre-Reading and Class 30 Logic,
// Thinking & Problem-Solving point at the class, and the class links back
// to all three. Owner doctrine: the class page is the lesson for the child;
// the shelf is the parents' printing copy.
import {R2} from './adventure-kit.mjs';
import {fcCommunityMount} from './flashcards/community.mjs';

export const QW_PATH='/question-words/';
export const QW_BASE=R2+'school/extra-classes/question-words/';

/* The owner's order: the six core questions first, then the rest in file
   order exactly as uploaded. */
export const QW_CORE=['who','what','when','where','why','how'];
export const QW_MORE=['how-many','how-much','how-old','what-happened',
 'what-next','what-time','where-are-you','which','who-are-you','whose-turn'];
export const QW_ORDER=[...QW_CORE,...QW_MORE];

const W=800,H=1131;
/* slug → display word, alt (from the artwork on the labeled contact sheets,
   scripts/probe-qw.py) and the ask-it-tonight tip — one concrete way to run
   the question at home. Every tip is unique; no two share a sentence. */
const CARDS=[
 ['who','Who?','A Kiddo School question word flashcard titled Who?: a boy with wild flame-blue hair holds both hands to his cheeks, mouth wide open in astonishment.','Play knock-knock at a real door: \u201cWho is it?\u201d Family members answer in silly voices and your child names who before the door opens — a game where the question itself is the fun.'],
 ['what','What?','A Kiddo School question word flashcard titled What?: a boy in a red cap scratches his head with a puzzled look and one eyebrow raised.','Point at anything on a walk — \u201cWhat is that?\u201d — then let your child hold the question. The asker learns as much as the answerer, so swap jobs every few steps.'],
 ['when','When?','A Kiddo School question word flashcard titled When?: a sleepy boy in a yellow polka-dot nightcap yawns behind his hand.','Answer when-questions with the day\u2019s rhythm: \u201cWhen do we brush teeth? After dinner.\u201d Routines teach when better than any clock face at this age.'],
 ['where','Where?','A Kiddo School question word flashcard titled Where?: a boy wears a green map over his head like a scarf and scratches his head, puzzled.','Hide a toy and ask \u201cWhere is the bear?\u201d — under, behind, inside the cushion. Every little hunt around the house trains a where-word.'],
 ['why','Why?','A Kiddo School question word flashcard titled Why?: a boy looks up with a thoughtful face, one finger resting on his chin.','When the whys arrive, answer one, then flip it back: \u201cWhy do YOU think?\u201d You get their theory, and they get practice doing the asking.'],
 ['how','How?','A Kiddo School question word flashcard titled How?: a boy with a tall swoosh of teal hair stands with his hands on his hips and a can-do grin.','Ask \u201cHow do you\u2026?\u201d about things they can show you — how do you wash hands, how do you jump high. Acting the answer out is the whole lesson.'],
 ['how-many','How Many?','A Kiddo School question word flashcard titled How Many?: a boy stands behind a pile of apples with one balanced on his head, counting them up.','Count the snack plate: \u201cHow many crackers?\u201d Two to five is plenty, and lining them up in a row makes every number visible.'],
 ['how-much','How Much?','A Kiddo School question word flashcard titled How Much?: a boy holds both hands to his cheeks, mouth wide open in a happy gasp.','Open a toy shop: \u201cHow much is this one?\u201d — \u201cOne coin, please.\u201d How-much bundles counting and pretending into a single question.'],
 ['how-old','How Old?','A Kiddo School question word flashcard titled How Old?: a smiling grandfather with round glasses winks and waves, drawn all in sunny yellow.','Ask about the family: \u201cHow old is Grandpa? How old are you?\u201d Holding up fingers for every answer turns the question into a counting game.'],
 ['what-happened','What Happened?','A Kiddo School question word flashcard titled What Happened?: a boy jumps back startled, both hands up, little motion lines around him.','When the tower falls, ask \u201cWhat happened?\u201d and let the story come out — even a wobbly retell builds the words for explaining a wobble.'],
 ['what-next','What Next?','A Kiddo School question word flashcard titled What Next?: a boy leans forward mid-run with a huge grin, ready for whatever comes.','Pause mid-story and ask \u201cWhat happens next?\u201d Guessing the next page is the first step to telling whole stories alone.'],
 ['what-time','What Time?','A Kiddo School question word flashcard titled What Time?: a boy holds up a round clock with both hands, mouth open in surprise.','Make what-time a routine word: snack time, bath time, bed time. The clock face can wait — the words for the day\u2019s times come first.'],
 ['where-are-you','Where Are You?','A Kiddo School question word flashcard titled Where Are You?: a child hides under a blanket and peeks over the edge with just their eyes showing.','Play hide-and-seek with words: the seeker calls \u201cWhere are you?\u201d and the hider may answer with one clue. Peekaboo is where this question begins.'],
 ['which','Which?','A Kiddo School question word flashcard titled Which?: a boy taps his chin with one finger, thinking hard about a choice.','Offer two real choices: \u201cWhich cup — the red one or the blue one?\u201d Which-questions need two things on the table, so put them there.'],
 ['who-are-you','Who Are You?','A Kiddo School question word flashcard titled Who Are You?: a boy flexes both arms proudly, eyes closed and a big grin on his face.','Practise introductions with teddy bears: \u201cHello — who are you?\u201d \u201cI am Teddy.\u201d A child who can say their own name meets the whole playground.'],
 ['whose-turn','Whose Turn?','A Kiddo School question word flashcard titled Whose Turn?: a boy stretches one arm up in the air eagerly, waving for his turn.','Before a game, ask round the circle: \u201cWhose turn is it?\u201d — \u201cMine!\u201d Knowing whose turn it is stands for half of fair play.']]
 .map(([slug,word,alt,tip])=>({slug,file:slug+'.webp',word,alt,tip,core:QW_CORE.includes(slug)}));

export const QW_CARDS=CARDS;
export const qwBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));

export const QW_COVER={file:'cover.webp',w:800,h:1131,
 alt:'Cover of the Kiddo School Wh-Question Flashcards set: a curious boy scratches his head beneath a big golden question mark, over the words "Wh-Question Flashcards".'};

/* Guards: the deck must be exactly the owner's 16 uploads in the owner's
   order (six core first, then file order), every card complete. */
if(CARDS.length!==16)throw Error('question-words: expected 16 cards, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==QW_ORDER.join('|'))throw Error('question-words: card order does not match QW_ORDER');
if(CARDS.filter(c=>c.core).length!==6)throw Error('question-words: expected exactly 6 core cards');
if(CARDS.findIndex(c=>c.slug==='who')!==0)throw Error('question-words: who must lead the deck');
for(const c of CARDS){
 if(c.alt.length<80)throw Error('question-words: thin alt for '+c.slug);
 if(c.tip.length<40)throw Error('question-words: thin tip for '+c.slug);
}

const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

/* ---- The card tile — same house markup as the manners deck ---------------- */
function cardTile(c){
 return `<figure class="mn-card"><img src="${QW_BASE}${c.file}" width="${W}" height="${H}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong><figcaption class="mn-tip">${esc(c.tip)}</figcaption><div class="mn-actions"><a class="button" href="${QW_BASE}${c.file}" download="${c.slug}.webp">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}

/* ---- The class page (the lesson) ------------------------------------------ */
export function questionWordsBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">EXTRA CLASS \u00b7 QUESTION WORDS \u00b7 16 CARDS \u00b7 AGES 3\u20135</span><h1>Question words flashcards — the sixteen questions little kids ask first.</h1><p class="lesson-lede">Sixteen printable question word cards for ages three to five: who, what, when, where, why and how lead the deck, and ten more questions — how many, whose turn, what happens next — follow behind. Every card below prints free, downloads as a full-size image and carries one plain tip on how to ask it together tonight. The whole class lives on this single page.</p><div class="lesson-start"><a class="button button-ghost" href="/extra-classes/">More extra classes <span aria-hidden="true">\u2197</span></a></div></div><figure class="lesson-cover"><img src="${QW_BASE}${QW_COVER.file}" width="${QW_COVER.w}" height="${QW_COVER.h}" alt="${esc(QW_COVER.alt)}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Print the card. Ask the question. All week long.</h2><p class="lesson-copy">Pick one question card a week and pin it to the fridge at your child\u2019s eye level. Ask it yourself a few times a day — at snack time, in the bath, on the walk — then hand the question over: children who get to do the asking learn the word twice as fast. A question card on the fridge gets noticed every single day, and noticed is how words stick.</p><p class="lesson-copy">The six core questions come first because they open every conversation your child will ever have: who, what, when, where, why and how. The ten that follow grow out of real life — counting crackers, taking turns, hiding under a blanket — so print them in any order your days need. Everything on this page is free to print at home, today.</p></section>`;
 const cards=`<section class="wrap lesson-section"><span class="eyebrow">THE CARDS \u00b7 16 QUESTIONS</span><h2>Every question, its tip, and the button to print it.</h2><p class="fc-hint">Each tile is the card itself: the artwork prints at full size with the Download button, and Print runs just that one card through your printer. The tip under each card is the whole lesson — one way to ask it tonight.</p><h3 class="mn-shelf-title">Ask these six first</h3><div class="mn-cards">${CARDS.filter(c=>c.core).map(cardTile).join('')}</div><h3 class="mn-shelf-title">More questions for bigger talkers</h3><div class="mn-cards">${CARDS.filter(c=>!c.core).map(cardTile).join('')}</div></section>`;
 const around=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where the questions are asked next.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/3-years/body-parts-and-five-senses/">Where is your nose? in Class 21 <span>· Ages 3–4</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/storytime-and-pre-reading/">Questions about the story in Class 29 <span>· Ages 4–5</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/logic-thinking-and-problem-solving/">Why and how in Class 30 <span>· Ages 4–5</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/flashcards/question-words/">The parents\u2019 shelf in the library <span>· All 16 cards</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/extra-classes/">All the extra classes <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Class 21 answers questions about your child\u2019s own body, Class 29 asks who and what-next about every story, and Class 30 thinks through why and how — the question cards hand your child the words to join in. This page is the lesson: it teaches each question the way a teacher would. Parents who want the whole deck on one wall will find it on the <a href="/flashcards/question-words/">parents\u2019 shelf in the flashcards library</a>: the same sixteen cards, downloading and printing straight from there.</p></section>`;
 return `${hero}${how}${cards}${around}<p class="lesson-note"><strong>A question is an invitation.</strong> Every card on this page hands your child the words to start one — and a child who asks is a child who is already learning.</p>`;
}

/* ---- Cross-links the owner asked for (2026-10-28) ------------------------- */
/* Appended to Class 21 · Body Parts & My Five Senses. */
export const QW_BODY_PARTS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">QUESTIONS ABOUT ME</span><h2>Where is your nose? How many fingers?</h2><p class="lesson-copy">Class 21 names the body; the school\u2019s <a href="/question-words/">Question Words flashcards</a> ask about it: sixteen printable question cards for ages 3–5 — where is your nose, how many fingers, who is in the mirror — each with a one-line tip on how to ask it tonight, a download button and one-tap printing, all on a single page. The words here, the questions next door: the two classes finish each other.</p></section>`;
/* Appended to Class 29 · Storytime & Pre-Reading Comprehension. */
export const QW_STORYTIME_LINK=`<section class="wrap lesson-section"><span class="eyebrow">QUESTIONS ABOUT THE STORY</span><h2>Who is in the story? What happens next?</h2><p class="lesson-copy">Story comprehension runs on question words — and the <a href="/question-words/">Question Words flashcards</a> print them: sixteen question cards for ages 3–5, from who and what-next for retelling to why and how for guessing the ending, every card carrying an ask-it-tonight tip, a download button and a print button on one free page. The stories here, the questions next door.</p></section>`;
/* Appended to Class 30 · Logic, Thinking & Problem-Solving. */
export const QW_LOGIC_LINK=`<section class="wrap lesson-section"><span class="eyebrow">THINKING QUESTIONS</span><h2>Why did it fall? How does it work?</h2><p class="lesson-copy">Every puzzle in Class 30 starts with a why or a how — the <a href="/question-words/">Question Words flashcards</a> hand over the words: sixteen printable question cards for ages 3–5, each with a concrete way to ask it tonight, a download button and one-tap printing on a single page. Thinking here, asking next door: the two decks grow the same habit.</p></section>`;

/* ---- The parents' shelf in the library (/flashcards/question-words/) ------- */
/* Owner 2026-10-28: "same — no individual pages", the manners treatment.
   The shelf IS the set page: the whole deck on one wall, Download + Print
   under every image, nothing linking away per card. Voice split (owner
   doctrine): the class page is the lesson for the child; this shelf is the
   parents' printing copy. No cover figure here (house library convention). */
export const QW_LIB_SET={slug:'question-words',url:'/flashcards/question-words/',name:'Question Words',
 ageLabel:'3–5',stageName:null,
 hubBlurb:'The parents\u2019 shelf: all sixteen question word cards with a download and a print button under every image, printing straight from the shelf — no card pages. The child\u2019s lesson lives in the Question Words class.',
 coverUrl:QW_BASE+QW_COVER.file,
 cover:{w:QW_COVER.w,h:QW_COVER.h,alt:QW_COVER.alt},
 cards:CARDS.map(c=>({slug:c.slug,word:c.word}))};

export function questionWordsLibBody(){
 const intro=`<section class="wrap lesson-section"><p class="lesson-copy">This is the parents\u2019 copy of the Question Words class: all sixteen cards on one shelf, ready to print. You do not need a plan — pick the question your days need most, download the card, and print it full size on A4 or Letter paper. Every card carries its ask-it-tonight tip underneath, so the how-to rides along with the picture, and the print button runs a single card through your printer with nothing else on the page. There are no card pages to hop through: the shelf is the whole set.</p><p class="lesson-copy">The shelf is yours; the lesson is your child\u2019s. The class page at <a href="/question-words/">Question Words</a> teaches each question the way a teacher would — the six core questions first, then the ten that grow out of real life — while this wall simply holds the deck for printing. Same cards, two jobs: the lesson lives in the class, the library is where parents print.</p></section>`;
 const cards=`<section class="wrap lesson-section"><span class="eyebrow">THE DECK \u00b7 16 QUESTIONS</span><h2>Every card, its tip, and the buttons.</h2><p class="fc-hint">Download takes the full-size card image; Print runs just that one card through the printer. Nothing opens a new page — the shelf is the whole set.</p><div class="mn-cards">${CARDS.map(cardTile).join('')}</div></section>`;
 const next=`<section class="wrap lesson-section"><span class="eyebrow">WHERE TO NEXT</span><h2>The lesson, the hall, the rest of the library.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/question-words/">The Question Words class <span>· The child\u2019s lesson</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/extra-classes/">All the extra classes <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/flashcards/">All flashcard sets <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Print a card here, teach the question there: the <a href="/question-words/">Question Words class</a> is the lesson side of this deck — one card a week pinned at your child\u2019s eye level, with the words to say and the game to play. Once the deck is up on the fridge, the class page is the manual that makes each card stick.</p></section>`;
 return `${intro}${cards}${next}${fcCommunityMount('/flashcards/question-words/')}`;
}
