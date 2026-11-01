/* Kiddo School — CLASS 46 · Early Addition & Subtraction (Ages 4–5): the
   Learning Path class page at /early-addition-and-subtraction/ carrying the
   WHOLE 30-sum deck on that one page (both 10 − 3 artworks on its tile),
   plus the parents' shelf at /flashcards/early-addition-and-subtraction/.
   ZERO per-card URLs — the owner's standing rule ("dont make indiviual
   pages, they are thin to google… learning path is lesson for kids and
   flashcard library is for parents thats it"), the same one-page shape as
   Classes 41–43; the earlier short-page round was rolled back and the
   removed sum URLs 301 in _redirects. NUMBERING (owner rule: "If Class 44
   is not live, tell me before assigning numbers"): Class 44 · Position &
   Direction Words
   was re-probed LIVE at /prepositions/ (HTTP 200) before this module was
   written — and Class 45 · Family & Friends went LIVE at
   /family-and-friends/ earlier the same day (LP row 45, count forty-five),
   so the honest next number by the site's own no-skip rule is 46; the
   owner's literal "45" was REJECTED because Class 45 already exists and
   two Class 45s would duplicate the sequence and break the count. The
   owner is told all of this in the round report, and the number rides
   display copy only — the URLs carry no class number, so a renumber is one
   commit with zero URL changes. The class count goes forty-five →
   forty-six. DECK probed live on R2 on 2026-11-01: 32/32 files HTTP 200
   image/jpeg at school/learning-path/early-addition-and-subtraction/
   flashcards/ — 31 card files + the cover, every file exactly 1414×2000
   (the A4 print ratio), 140–219 kB master JPGs. THE JPG MASTERS RIDE
   EXACTLY AS UPLOADED (owner: "The images are JPG, so do not convert or
   re-compress them, and keep the file names exactly as they are"). THE
   10-MINUS-3 PAIR: the deck uploads TWO different artworks for the same
   sum — 10-minus-3-subtraction-flashcard-for-kids.jpg AND …-kids-2.jpg
   (different bytes, 31.65% of pixels differ — a second drawing, not a
   re-upload), and BOTH map to the same <sum> "10-minus-3" under the
   owner's URL rule, so they share ONE short page that shows the sum drawn
   two ways; both masters join the image sitemap on that URL. No seo.csv
   came with the deck, so titles/alts were transcribed off 2 labeled
   contact sheets (scripts/eas-sheets.py — every card face read: the
   number characters, the scene and the printed equation, e.g. "1 + 2 ="
   and "10 - 7 = ?"). The artwork never prints the answer — every card
   leaves it blank (two cards print "?") — so the copy below never spoils
   it either: working the sum out IS the game, and the try-it jobs reveal
   the answer only inside a real thing the child can count, hold or eat.
   The cover is the class page's main image (owner rule) and fronts the
   og:image; every short page carries its own card as og:image.
   Copy uses what USA parents search (addition and subtraction flashcards,
   printable math flashcards for kindergarten, early math for preschool)
   and talks to kids directly; the owner's word-ban ("no sign up", "no
   paywall", "free to use", "no account", "free forever") is a lock, and
   the owner asked for the most humane language the school has.
   Inbound links: Class 35 (Numbers, Counting & Early Math), Class 42
   (Measuring & Money) and Class 30 (Logic, Thinking & Problem-Solving)
   point here; the class page links back to all three and the Learning
   Path, and every short page links back to the class page. */
import {R2} from './adventure-kit.mjs';
import {fcCommunityMount} from './flashcards/community.mjs';

export const EAS_PATH='/early-addition-and-subtraction/';
export const EAS_BASE=R2+'school/learning-path/early-addition-and-subtraction/flashcards/';

/* File order as uploaded (sorted); the slug is the sum at the start of the
   file name — the owner's own URL rule. Both 10-minus-3 artworks ride one
   slug, so the deck is 31 files → 30 sums. */
export const EAS_ORDER=['1-plus-2','3-plus-1','4-plus-1','1-plus-4','2-plus-3','1-plus-5',
 '3-plus-3','2-plus-5','5-plus-2','3-plus-4','2-plus-6','6-plus-2','5-plus-3','4-plus-5',
 '5-plus-4','6-plus-4',
 '5-minus-2','6-minus-1','7-minus-1','8-minus-2','8-minus-3','9-minus-4','9-minus-5',
 '10-minus-1','10-minus-2','10-minus-3','10-minus-4','10-minus-6','10-minus-7','10-minus-8'];

export const EAS_COVER={file:'early-addition-and-subtraction-flashcards-for-kids-cover.jpg',w:1414,h:2000,
 alt:'Cover of the Kiddo School Early Addition & Subtraction flashcards: smiling cartoon number characters around a big plus sign, over the words Early Addition & Subtraction Flashcards.'};

const W=1414,H=2000;
const FILE_SUFFIX={addition:'-addition-flashcard-for-kids.jpg',subtraction:'-subtraction-flashcard-for-kids.jpg'};
/* slug → sum (the card's printed equation, verbatim), kind (subject pill),
   scene (the artwork, verbatim off the contact sheets — the tile caption),
   say (the description under the image — kid-directed, never spoils the
   answer), try (the short page's TRY IT TODAY — the answer shows up inside
   a real thing the child counts), level/skill ride the maps below. The
   10-minus-3 entry carries a SECOND artwork (scene2 → file2/alt2). */
const CARDS=[
 ['1-plus-2','1 + 2','Addition','a smiling blue 1 waving hello beside a smiling yellow 2','One little friend meets two more — count them all on your fingers and shout the total! The smallest sums are where every math adventure starts.','Set out 1 cracker and 2 crackers at snack time — count them together and munch all 3.'],
 ['3-plus-1','3 + 1','Addition','a purple 3 hugging a small yellow 1 with a purple plus between them','Three friends and one more squeeze in — just count on! Adding one is the easiest step on the whole staircase of numbers.','Do 3 big claps, then 1 tiny clap — how many claps was that altogether?'],
 ['4-plus-1','4 + 1','Addition','a purple 4 wearing a party hat beside a teal 1','It is a party: 4 friends and 1 guest of honor! When one side of the plus is a 1, the answer is simply the next number up.','Count 4 steps across the kitchen, then 1 giant step — where did you land?'],
 ['1-plus-4','1 + 4','Addition','a purple 1 pushing a big yellow plus sign toward a yellow 4 peeking from a doorway','Add 1 and 4 and the answer hides right behind the plus sign. Count the 1, count the 4, then count them all in one long line.','Hold up 1 finger on one hand and 4 on the other — fold them together and count the handful.'],
 ['2-plus-3','2 + 3','Addition','a teal 2 and a blue 3 riding an orange plus-sign seesaw','Two and three balance out to a whole team of five. Seesaw sums teach the secret early: the order never changes the answer.','Line up 2 toy cars and 3 toy cars in one row and count the whole traffic jam.'],
 ['1-plus-5','1 + 5','Addition','a purple 1 hugging a big smiling yellow 5 with a small yellow plus','One plus five is a whole high-five and one more. Big numbers turn friendly fast when you start from the five and count one more on.','Count 5 blocks into a tower, then sneak 1 more on top — how tall is the tower now?'],
 ['3-plus-3','3 + 3','Addition','two yellow 3s bumping heads with dizzy stars, over a purple plus sign','Two threes bump heads and make six — you just met a double! Doubles are memory magic: know 3 plus 3 and half of addition gets easier.','Roll 3 buttons on the table, then 3 more right beside them — count the pair and say the double out loud.'],
 ['2-plus-5','2 + 5','Addition','a yellow 2 and a purple 5 standing beside a purple plus sign','Start at 5 and count on two more! Counting on from the bigger number is the fastest feet in all of addition.','Jump 5 times, then 2 more — count every jump out loud and land on the answer.'],
 ['5-plus-2','5 + 2','Addition','a yellow 2 balancing on top of a purple 5','A 2 balancing on a 5! Start at the bigger number and count the little one on top — that is the trick every big kid uses.','Count 5 crayons, then drop 2 more in the box — count on from 5 to find the whole stash.'],
 ['3-plus-4','3 + 4','Addition','a purple 3 hugging a yellow 4 with a yellow plus above them','Keep counting after the 3: four, five, six, seven — friends in total. Every sum inside 10 is a story your fingers can tell.','Stack 3 books, then 4 more — count the whole stack before it wobbles!'],
 ['2-plus-6','2 + 6','Addition','a purple 2 and a yellow 6 with a big purple plus sign between them','Six is already a lot — so park the 6 in your head and count on two fingers. That is counting on, and you just did it.','Find 6 spoons, then add 2 more from the drawer — count on from 6 to get the whole pile.'],
 ['6-plus-2','6 + 2','Addition','a yellow 6 and a purple 2 balancing on a purple seesaw','Six strong plus two more! See-saw sums prove it: 6 plus 2 and 2 plus 6 land on the very same number.','Park 6 toys in a row, then roll 2 more in — count on until the traffic jam is counted.'],
 ['5-plus-3','5 + 3','Addition','a yellow 5 and a purple 3 sitting on a yellow plus-sign seesaw','Five plus three seesaws to the answer. Whenever a sum feels big, start from the 5 — it is the strongest number your fingers own.','One whole hand: 5 fingers up, now press 3 more from the other hand — count them all.'],
 ['4-plus-5','4 + 5','Addition','a yellow 4 and a purple 5 smiling around a purple plus sign','Four and five together are just one sleepy step away from 10. Sums like this train your brain for the big ten-family ones.','Put 4 crackers and 5 crackers on a plate — count them, then share them out fair!'],
 ['5-plus-4','5 + 4','Addition','a purple 5 running with a yellow 4 and a purple plus sign','Five runs, four follows — 9 in total, just one shy of 10. Race sums like this are the fast lane to knowing your tens.','Hop 5 times on one foot and 4 on the other — every hop is a number, so what did you land on?'],
 ['6-plus-4','6 + 4','Addition','a purple 6 and a yellow 4 cheering around a big yellow plus sign','Six and four are the famous ten pair! When a sum makes exactly 10, your brain does a little firework — learn these and addition gets easy.','Count 6 blocks, add 4 more, and count the tower — a perfect make-ten stack!'],
 ['5-minus-2','5 - 2','Subtraction','a red 5 writing the 2 with a big pencil while a teal 3 watches','The 5 is literally writing the answer! First the taking away, then the writing — exactly how your grown-up shows it on paper.','Draw 5 circles, cross out 2 with one big line — count the ones still open.'],
 ['6-minus-1','6 - 1','Subtraction','a big pink 6 with a green 1 beside it and a blue 5 peeking','One hops off and 6 becomes its next-door neighbor. Taking one away always lands you on the number just below — the easiest subtraction there is.','Count 6 hops, then skip 1 by standing still — count the hops you actually did.'],
 ['7-minus-1','7 - 1','Subtraction','a purple 7 and a purple 6 waving while a yellow 1 walks off with a suitcase','The 1 packed a suitcase and left! One-away sums are stepping stones: every answer is just the neighbor below.','Line up 7 toys, send 1 on a trip to the other room — count the crew that stays.'],
 ['8-minus-2','8 - 2','Subtraction','two yellow 2s sneaking away from a purple 8 while a yellow 6 laughs','The two 2s sneak off and the 6 laughs! Subtraction stories are the funniest ones: somebody is always sneaking somewhere.','Count 8 snacks into a bowl, sneak 2 when nobody is looking — how many remain for me?'],
 ['8-minus-3','8 - 3','Subtraction','a purple 8 carrying three yellow 3s on its back beside a purple 5','The 8 carries three 3s and a 5 waits its turn. Count backwards if you like: seven, six, five — done!','Count backwards from 8 while taking away 3 jumps — land on the answer and bow.'],
 ['9-minus-4','9 - 4','Subtraction','a purple 9 holding yellow 4s like balloons beside a purple 5','The 9 lets 4 balloon-friends fly off and keeps holding the rest. Halfway to ten — and if they flew back, they would make 9 again.','Blow up 9 imaginary balloons, let 4 fly away — count the string-pullers left.'],
 ['9-minus-5','9 - 5','Subtraction','a yawning yellow 9 with purple 5s around it and a yellow 4','Even the 9 is yawning — 5 leave and 4 stay awake. And if you know that 4 plus 5 makes 9, you already knew this one backwards.','Yawn 9 times like the card, stop at 5 — count the yawns you skipped. Sleepy math!'],
 ['10-minus-1','10 - 1','Subtraction','a purple 1 running away from a waving yellow 10','Ten waves goodbye to 1 — who is left? Taking 1 away from 10 is your first back-from-ten step, and the ten-family loves it.','Count 10 toes, wiggle 1 away — how many toes are still working?'],
 ['10-minus-2','10 - 2','Subtraction','a purple 2 sneaking behind a yellow 10 while a purple 8 peeks','Two sneaks off from 10 and 8 peeks out to watch. The ten-family is the royal family of subtraction — learn these and you rule the number line.','Stack 10 socks, hide 2 behind your back — count the pile that is left.'],
 ['10-minus-3','10 - 3','Subtraction','a purple 10 and a purple 7 pointing up while little yellow 3s run off','Three leave the party of 10 and the 7 keeps pointing at the door. Say it fast: ten, take away three, and count what stays.','Blow 10 bubbles, pop 3 with a clap — count the survivors still floating.'],
 ['10-minus-4','10 - 4','Subtraction','a purple 10 holding a door open while four yellow 4s file out and a yellow 6 waves','Four 4s march out the door and a 6 waves goodbye. The door scene makes take-away easy to SEE — that is why it prints it twice.','Hold up all 10 fingers, tuck 4 down — count the fingers still standing.'],
 ['10-minus-6','10 - 6','Subtraction','a yellow 4 waving while a crowd of purple 6s leaves through the door','Half the crew leaves — and look: what stayed and what left together make 10 again. Take-away and make-ten are best friends.','Lay 10 coins, spend 6 on a pretend toy — count your change.'],
 ['10-minus-7','10 - 7','Subtraction','a purple 10 at an open door while purple 7s march out and a yellow 3 waves','The card even asks the question for you — it prints a "?" after the equals! Seven out the door, and the ones waving goodbye are the answer, hiding in plain sight.','Put 10 raisins on your plate, munch 7 — count the last survivors before you eat them too.'],
 ['10-minus-8','10 - 8','Subtraction','a dizzy purple 10 waving purple 8s away with stars around and a yellow 2 cheering','Eight leave in a dizzy hurry and just 2 are left cheering. And 2 plus 8 climbs right back to 10 — subtraction runs backwards into addition!','Take 10 steps across the room, redo 8 of them backwards — how far from the start are you?'],
].map(([slug,sum,kind,scene,say,tryIt])=>{
 const kindKey=kind==='Addition'?'addition':'subtraction';
 const file=slug+FILE_SUFFIX[kindKey];
 const alt=`A Kiddo School ${kind} flashcard for kids: ${scene}, over the printed sum ${sum} =.`;
 const card={slug,file,pageSlug:slug,sum,kind,scene,say,try:tryIt,alt,w:W,h:H};
 if(slug==='10-minus-3'){
  card.file2='10-minus-3-subtraction-flashcard-for-kids-2.jpg';
  card.scene2='a waving purple 10 with three little yellow 3s marching off and a smiling yellow 7';
  card.alt2=`A second Kiddo School Subtraction flashcard for kids: ${card.scene2}, over the printed sum 10 - 3 =.`;
 }
 return card;
});

/* Guards: exactly the owner's 30 sums (31 card files + the cover = 32 R2
   files), every entry complete, all unique — and every SEO file name riding
   untouched, JPG, no rename. */
if(CARDS.length!==30)throw Error('early-addition: expected 30 sums, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==EAS_ORDER.join('|'))throw Error('early-addition: sum order does not match EAS_ORDER');
const ADD=CARDS.filter(c=>c.kind==='Addition'),SUB=CARDS.filter(c=>c.kind==='Subtraction');
if(ADD.length!==16||SUB.length!==14)throw Error('early-addition: shelf split drifted '+ADD.length+'/'+SUB.length);
for(const c of CARDS){
 for(const f of [c.file,c.file2].filter(Boolean)){
  if(!f.endsWith('.jpg'))throw Error('early-addition: master must stay JPG for '+c.slug);
  if(!f.startsWith(c.slug+'-'))throw Error('early-addition: file does not start with the sum for '+c.slug);
  if(!f.endsWith('-addition-flashcard-for-kids.jpg')&&!f.endsWith('-subtraction-flashcard-for-kids.jpg')&&f!==c.file2)throw Error('early-addition: SEO file name broken for '+c.slug);
 }
 if(c.alt.length<80)throw Error('early-addition: thin alt for '+c.slug);
 if(c.say.length<60)throw Error('early-addition: thin say for '+c.slug);
 if(c.try.length<40)throw Error('early-addition: thin try for '+c.slug);
 if(!c.scene||c.scene.length<30)throw Error('early-addition: thin scene for '+c.slug);
}

export const EAS_CARDS=CARDS;
export const easBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));

/* Two shelves, exactly as the owner asked: Addition first, Subtraction
   second, each in teach-me order (small sums first, the ten-family last). */
export const EAS_SHELVES=[
 {id:'addition',label:'THE ADDITION SHELF \u00b7 16 CARDS',h2:'Sums that build up.',
  hint:'Printable addition flashcards for kindergarten and preschool: every sum inside 10, from tiny 1-plus friends to the famous make-ten pair 6 + 4. The answer is never printed — working it out is the whole game, one card at a time.',
  slugs:['1-plus-2','3-plus-1','4-plus-1','1-plus-4','2-plus-3','1-plus-5','3-plus-3','2-plus-5','5-plus-2','3-plus-4','2-plus-6','6-plus-2','5-plus-3','4-plus-5','5-plus-4','6-plus-4']},
 {id:'subtraction',label:'THE SUBTRACTION SHELF \u00b7 14 CARDS',h2:'Sums that take away.',
  hint:'Printable subtraction flashcards for ages 4–5: one-away sums to warm up, sneaking middles, and the whole take-from-ten family — the 10 − 3 card even ships as two drawings. Somebody is always sneaking out the door, and counting who stays is the game.',
  slugs:['5-minus-2','6-minus-1','7-minus-1','8-minus-2','8-minus-3','9-minus-4','9-minus-5','10-minus-1','10-minus-2','10-minus-3','10-minus-4','10-minus-6','10-minus-7','10-minus-8']}];
{
 const shelved=EAS_SHELVES.flatMap(s=>s.slugs).sort().join('|');
 if(shelved!==EAS_ORDER.slice().sort().join('|'))throw Error('early-addition: shelves must cover the deck exactly once');
}

/* Level pills name school grades (owner 2026-10-31): Preschool = name it
   (6), Grade 1 = do it (12), Grade 2 = own it (12). 6/12/12 guarded. */
const EAS_LEVEL={
 '1-plus-2':1,'3-plus-1':1,'4-plus-1':1,'1-plus-4':1,'2-plus-3':1,'5-minus-2':1,
 '1-plus-5':2,'2-plus-5':2,'3-plus-3':2,'3-plus-4':2,'4-plus-5':2,'5-plus-2':2,
 '6-minus-1':2,'7-minus-1':2,'8-minus-2':2,'8-minus-3':2,'9-minus-4':2,'9-minus-5':2,
 '2-plus-6':3,'5-plus-3':3,'5-plus-4':3,'6-plus-2':3,'6-plus-4':3,
 '10-minus-1':3,'10-minus-2':3,'10-minus-3':3,'10-minus-4':3,'10-minus-6':3,'10-minus-7':3,'10-minus-8':3};
/* Skill pill per card (owner: "age, skill if any, level pill, subject pill"). */
const EAS_SKILL={
 '1-plus-2':'Counting','3-plus-1':'Counting on','4-plus-1':'Counting on','1-plus-4':'Counting',
 '2-plus-3':'Counting','1-plus-5':'Counting on','3-plus-3':'Doubles','2-plus-5':'Counting on',
 '5-plus-2':'Counting on','3-plus-4':'Counting on','2-plus-6':'Counting on','6-plus-2':'Counting on',
 '5-plus-3':'Number bonds','4-plus-5':'Number bonds','5-plus-4':'Number bonds','6-plus-4':'Make ten',
 '5-minus-2':'Take away','6-minus-1':'Take away','7-minus-1':'Take away','8-minus-2':'Take away',
 '8-minus-3':'Backwards counting','9-minus-4':'Take away','9-minus-5':'Number bonds',
 '10-minus-1':'Back from ten','10-minus-2':'Back from ten','10-minus-3':'Back from ten',
 '10-minus-4':'Back from ten','10-minus-6':'Back from ten','10-minus-7':'Back from ten','10-minus-8':'Back from ten'};
const EAS_LEVEL_NAMES={1:'Preschool \u00b7 Name it',2:'Grade 1 \u00b7 Do it',3:'Grade 2 \u00b7 Own it'};
const EAS_LEVEL_BLURB={
 1:'the six sums to start with — all inside 5, the ones a four-year-old can count on one hand',
 2:'the twelve doing sums — every fact inside 10, each one ready for fingers, snacks and counting-on',
 3:'the twelve bigger sums — the make-ten pair and the whole take-from-ten family, the facts that make Grade 1 math feel easy'};
const EAS_LEVEL_COUNTS=Object.fromEntries([1,2,3].map(l=>[l,CARDS.filter(c=>EAS_LEVEL[c.slug]===l).length]));
if(EAS_LEVEL_COUNTS[1]!==6||EAS_LEVEL_COUNTS[2]!==12||EAS_LEVEL_COUNTS[3]!==12)throw Error('early-addition: level sizes drifted '+JSON.stringify(EAS_LEVEL_COUNTS));
if(Object.keys(EAS_SKILL).length!==30)throw Error('early-addition: skill deck must cover 30 sums');
for(const c of CARDS){if(!EAS_SKILL[c.slug])throw Error('early-addition: missing skill for '+c.slug);if(!EAS_LEVEL[c.slug])throw Error('early-addition: missing level for '+c.slug);}

const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const sumIndex=slug=>EAS_ORDER.indexOf(slug)+1;

/* ---- The class page: cover leads, two shelves carry the whole deck on
   ONE page, zero per-card URLs — the owner's standing rule. The 10 − 3 sum
   ships as TWO artworks; both print from its tile right here. -------------- */
function tile(c){
 const pills=`<span class="fc-pillrow"><span class="fc-pill fc-pill-age">Ages 4\u20135</span><span class="fc-pill fc-pill-subject">${esc(c.kind)}</span><span class="fc-pill fc-pill-level">${EAS_LEVEL_NAMES[EAS_LEVEL[c.slug]]}</span><span class="fc-pill fc-pill-skill">${esc(EAS_SKILL[c.slug])}</span></span>`;
 const secondArt=c.file2?`<div class="mn-card-pair"><img src="${EAS_BASE}${c.file2}" width="${W}" height="${H}" alt="${esc(c.alt2)}" loading="lazy"><a class="button" href="${EAS_BASE}${c.file2}" download="${c.slug}-2.jpg">Download the second drawing <span aria-hidden="true">\u2193</span></a></div>`:'';
 return `<figure class="mn-card"><img src="${EAS_BASE}${c.file}" width="${W}" height="${H}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.sum)}</strong>${pills}<figcaption class="mn-tip">${esc(c.say)}</figcaption>${secondArt}<div class="mn-actions"><a class="button" href="${EAS_BASE}${c.file}" download="${c.slug}.jpg">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}

export function easClassBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">LEARNING PATH \u00b7 CLASS 46 \u00b7 EARLY ADDITION &amp; SUBTRACTION \u00b7 AGES 4\u20135</span><h1>Early addition &amp; subtraction for kids — thirty printable math cards that never spoil the answer.</h1><p class="lesson-lede">Thirty printable addition and subtraction flashcards for ages four to five, all on this one page, in two shelves. Sixteen sums that build up, fourteen that take away, from tiny 1 + 2 to the whole take-from-ten family. Every card shows smiling cartoon numbers acting the sum out and prints the equation with the answer LEFT BLANK — working it out is the game, and every card downloads and prints straight from this page with a real thing to count, hold or munch to find it. Pick a card, print it, and the kitchen table becomes a math lab.</p><div class="lesson-start"><a class="button button-ghost" href="/learning-path/">Back to the Learning Path <span aria-hidden="true">\u2197</span></a></div></div><figure class="lesson-cover"><img src="${EAS_BASE}${EAS_COVER.file}" width="${EAS_COVER.w}" height="${EAS_COVER.h}" alt="${esc(EAS_COVER.alt)}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>The answer is never on the card. That is the trick.</h2><p class="lesson-copy">Every card in this class prints a smiling number story — a 1 running away from a 10, two 3s bumping heads — and the equation underneath ends in a blank: 3 + 4 = ___. Nothing to look up, nothing filled in. Your child counts it out, and the moment they land on the number themselves is the moment it sticks. You do not need a desk for this class. You need fingers, snacks, toy cars and one honest staircase to jump down.</p><p class="lesson-copy">The two shelves follow how sums grow. The Addition shelf starts inside 5 — one more, two more, the first double — and climbs to the famous ten pair 6 + 4. The Subtraction shelf starts with one hopping off, meets the sneaking middles, and finishes with the take-from-ten family, where 10 itself waves its friends goodbye. The 10 − 3 sum even ships as two different drawings, and both print right here on the class page.</p></section>`;
 const shelfSections=EAS_SHELVES.map(sh=>`<section class="wrap lesson-section" id="shelf-${sh.id}"><span class="eyebrow">${sh.label}</span><h2>${sh.h2}</h2><p class="fc-hint">${sh.hint} Every card carries its four pills — age, subject, grade level, skill — and its Download + Print buttons right under the picture, straight from this page.</p><div class="mn-cards">${sh.slugs.map(s=>tile(easBySlug[s])).join('')}</div></section>`).join('');
 const around=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where these sums grow up.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/4-years/numbers-counting-and-early-math/">Counting lessons in Class 35 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/measuring-and-money/">Measuring &amp; Money in Class 42 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/logic-thinking-and-problem-solving/">Thinking games in Class 30 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/learning-path/">The Learning Path <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Class 35 counts from one apple to twenty figs — the numbers this class finally adds and takes away. Class 42 spends sums as money and measures with them, and Class 30 turns thinking itself into games. Learn a sum here, meet it again everywhere. And when you want the next class, the Learning Path holds all forty-nine in order — and the whole deck prints again from the <a href="/flashcards/early-addition-and-subtraction/">Early Addition &amp; Subtraction parents\u2019 shelf</a>.</p></section>`;
 return `${hero}${how}${shelfSections}${around}<p class="lesson-note"><strong>Math is caught at the kitchen table, not taught at a desk.</strong> Every card here hands you a sum to act out with real things — and your grown-up\u2019s whole job is to count out loud with you until the answer shows up on its own.</p>`;
}

/* ---- The parents' shelf: the whole deck on ONE library page. The lib tips
   are the sums' try-it jobs (the class page's tiles carry the say lines)
   — no sentence shared between the two pages. ------------------------------ */
export const EAS_LIB_SET={slug:'early-addition-and-subtraction',url:'/flashcards/early-addition-and-subtraction/',name:'Early Addition & Subtraction',
 ageLabel:'4–5',stageName:null,
 hubBlurb:'The parents\u2019 shelf for Class 46: all thirty addition-and-subtraction cards with a download and a print button under every image — age, subject, level and skill pills on each card, printing straight from the shelf, no card pages. The child\u2019s lesson lives in the Early Addition & Subtraction class.',
 coverUrl:EAS_BASE+EAS_COVER.file,
 cover:{w:EAS_COVER.w,h:EAS_COVER.h,alt:EAS_COVER.alt},
 cards:CARDS.map(c=>({slug:c.slug,word:c.sum}))};

function libTile(c){
 const pillRow=`<span class="fc-pillrow"><span class="fc-pill fc-pill-age">Ages 4–5</span><span class="fc-pill fc-pill-subject">${esc(c.kind)}</span><span class="fc-pill fc-pill-level">${EAS_LEVEL_NAMES[EAS_LEVEL[c.slug]]}</span><span class="fc-pill fc-pill-skill">${esc(EAS_SKILL[c.slug])}</span></span>`;
 const secondArt=c.file2?`<div class="mn-card-pair"><img src="${EAS_BASE}${c.file2}" width="${W}" height="${H}" alt="${esc(c.alt2)}" loading="lazy"><a class="button" href="${EAS_BASE}${c.file2}" download="${c.slug}-2.jpg">Download the second drawing <span aria-hidden="true">\u2193</span></a></div>`:'';
 return `<figure class="mn-card"><img src="${EAS_BASE}${c.file}" width="${W}" height="${H}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.sum)}</strong>${pillRow}<figcaption class="mn-tip">${esc(c.try)}</figcaption>${secondArt}<div class="mn-actions"><a class="button" href="${EAS_BASE}${c.file}" download="${c.slug}.jpg">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}

export function easLibBody(){
 const intro=`<section class="wrap lesson-section"><p class="lesson-copy">This is the parents\u2019 copy of <a href="/early-addition-and-subtraction/">Class 46 \u00b7 Early Addition &amp; Subtraction</a>: all thirty math cards on one shelf, ready to print. You do not need a plan — pick the sum tonight\u2019s snack can act out, download the card, and print it full size on A4 or Letter paper. Every card carries one try-it job underneath and four pills on top: the age it suits, the subject it teaches, the grade level to start at, and the skill it builds. The download button takes the full-resolution JPG; the print button runs a single card through your printer with nothing else on the page. There are no card pages to hop through: the shelf is the whole set.</p><p class="lesson-copy">The shelf is yours; the lesson is your child\u2019s. The class page at <a href="/early-addition-and-subtraction/">Early Addition &amp; Subtraction</a> teaches each sum the way a teacher would — the number story spoken out loud, the answer left blank on purpose, one real thing to count — while this wall simply holds the deck for printing. Same thirty cards, two jobs: the lesson lives in the class, the library is where parents print.</p></section>`;
 const levels=`<section class="wrap lesson-section"><span class="eyebrow">THE THREE LEVELS</span><h2>Preschool, Grade 1, Grade 2.</h2><p class="fc-hint">Every card wears a level pill so tonight\u2019s card takes one glance to choose. The levels are a suggested order, not a test — the sum your snack can act out is always the right card.</p><ol class="fc-steps"><li><span class="fc-stepnum">01</span><div><h3>${EAS_LEVEL_NAMES[1]}</h3><p>${EAS_LEVEL_BLURB[1]}.</p></div></li><li><span class="fc-stepnum">02</span><div><h3>${EAS_LEVEL_NAMES[2]}</h3><p>${EAS_LEVEL_BLURB[2]}.</p></div></li><li><span class="fc-stepnum">03</span><div><h3>${EAS_LEVEL_NAMES[3]}</h3><p>${EAS_LEVEL_BLURB[3]}.</p></div></li></ol></section>`;
 const heads={addition:'Sums that build up.',subtraction:'Sums that take away.'};
 const deck=EAS_SHELVES.map(sh=>{const cards=sh.slugs.map(s=>easBySlug[s]);return `<section class="wrap lesson-section"><span class="eyebrow">${sh.label}</span><h2>${heads[sh.id]}</h2><p class="fc-hint">${sh.hint} Download takes the full-resolution JPG; Print runs just that one card through the printer.</p><div class="mn-cards">${cards.map(libTile).join('')}</div></section>`;}).join('');
 const next=`<section class="wrap lesson-section"><span class="eyebrow">WHERE TO NEXT</span><h2>The lesson, the path, the rest of the library.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/early-addition-and-subtraction/">The Early Addition &amp; Subtraction class <span>\u00b7 The child\u2019s lesson</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/learning-path/">The Learning Path <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/flashcards/">All flashcard sets <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/flashcards/numbers-counting-and-early-math/">The Numbers &amp; Counting parents\u2019 shelf <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Print a card here, teach the sum there: the <a href="/early-addition-and-subtraction/">Early Addition &amp; Subtraction class</a> is the lesson side of this deck — one sum a sitting, spoken to your child, counted out on real things. Once the deck is up on the fridge, the class page is the manual that makes each sum stick.</p></section>`;
 return `${intro}${levels}${deck}${next}${fcCommunityMount('/flashcards/early-addition-and-subtraction/')}`;
}

/* ---- Inbound-link blocks, appended at the three classes' page() calls ----- */
/* Appended to Class 35 · Numbers, Counting & Early Math. */
export const EAS_COUNTING_LINK=`<section class="wrap lesson-section"><span class="eyebrow">FROM COUNTING CARDS TO REAL SUMS</span><h2>Class 46 \u00b7 Early Addition &amp; Subtraction.</h2><p class="lesson-copy">Class 35 counts from one apple to twenty figs — and the <a href="/early-addition-and-subtraction/">Early Addition &amp; Subtraction class</a> is where those numbers finally meet a plus sign. Thirty printable math flashcards for ages 4\u20135, every card on the one class page, every answer left blank for your child to count out on real things.</p></section>`;
/* Appended to Class 42 · Measuring & Money. */
export const EAS_MEASURE_LINK=`<section class="wrap lesson-section"><span class="eyebrow">THE SUMS BEHIND THE MONEY</span><h2>Class 46 \u00b7 Early Addition &amp; Subtraction.</h2><p class="lesson-copy">Class 42 measures, sorts and spends — and every coin count and ruler tick inside it runs on the facts the <a href="/early-addition-and-subtraction/">Early Addition &amp; Subtraction class</a> prints as cards: thirty printable sums for ages 4\u20135, from 1 + 2 to the whole take-from-ten family, each with a way to try it on real things today.</p></section>`;
/* Appended to Class 30 · Logic, Thinking & Problem-Solving. */
export const EAS_LOGIC_LINK=`<section class="wrap lesson-section"><span class="eyebrow">SUMS ARE THINKING GAMES</span><h2>Class 46 \u00b7 Early Addition &amp; Subtraction.</h2><p class="lesson-copy">Class 30 turns thinking itself into games — and a sum with its answer left blank IS a thinking game. The <a href="/early-addition-and-subtraction/">Early Addition &amp; Subtraction class</a> prints thirty of them for ages 4\u20135: smiling number stories on one side, a blank on the other, and a kitchen-table way to work each one out.</p></section>`;
