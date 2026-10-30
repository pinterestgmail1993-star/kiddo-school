// Kiddo School — CLASS 39 · Staying Safe (Ages 4–5): the Learning Path class
// page at /staying-safe/ plus ONE SHORT PAGE PER CARD at /staying-safe/<slug>/
// (owner 2026-10-30: "Create the class page at /staying-safe/ and one short
// page per card at /staying-safe/<slug>/ with a link back"). Numbering per the
// SAME instruction — "do not skip numbers; if Classes 39 and 40 are not live,
// use the next free number": the path runs Classes 1–38 and nothing sits at
// 39 or 40, so this class publishes as CLASS 39. (The owner's card artwork
// prints "Class 41" on its face; the sequence number the school publishes is
// 39 by the owner's own no-skip rule — the artwork can be re-issued any time.)
// The deck was probed LIVE on R2 on 2026-10-30: 19/19 files HTTP 200
// image/webp at school/learning-path/staying-safe/<slug>.webp — the files sit
// at the FOLDER ROOT (no flashcards/ subfolder, no cover file), the owner's
// real upload location, so r2Base points there and everything serves — the
// same quirk as dinosaurs, art-room and clubs. Every file is 800×1131
// portrait. Card words and pill lines are transcribed VERBATIM from the
// artwork via labeled contact sheets. No per-card artwork was renamed and no
// card page exists anywhere else: these short pages are the only per-card
// URLs. Pure addition — zero existing URLs touched.
import {R2} from './adventure-kit.mjs';

export const SSAFE_PATH='/staying-safe/';
export const SSAFE_BASE=R2+'school/learning-path/staying-safe/';
if(!SSAFE_BASE.endsWith('/'))throw Error('staying-safe: base must end with /');

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* The 19 cards. `word` = the page name and tile label; `line` = the rule line
   printed on the card, quoted word for word on the short page; `alt` describes
   the artwork for screen readers and image search. */
const CARDS=[
 {slug:'buckle-up',word:'Buckle Up',line:'Safe in the car',shelf:'road',
  alt:'A Staying Safe flashcard headed Buckle Up: a smiling boy strapped into a purple car seat with the seatbelt across his chest, over a purple banner reading \u201cSafe in the car\u201d.'},
 {slug:'hold-hands-near-roads',word:'Hold Hands Near Roads',line:'A grown-up hand and a small hand, all the way',shelf:'road',
  alt:'A Staying Safe flashcard headed Hold Hands Near Roads: a woman and a young boy holding hands at the edge of a zebra crossing while a purple car waits on the road.'},
 {slug:'traffic-lights',word:'Traffic Lights',line:'Red = stop \u00b7 green = go when safe',shelf:'road',
  alt:'A Staying Safe flashcard headed Traffic Lights: a friendly traffic light with red, yellow and green faces beside badges reading \u201cRed = stop\u201d and \u201cGreen = go when safe\u201d, a small boy with a backpack waiting on a blue zebra crossing.'},
 {slug:'zebra-crossing',word:'Zebra Crossing',line:'Cross safely',shelf:'road',
  alt:'A Staying Safe flashcard headed Zebra Crossing: a boy in a purple hoodie with a teal backpack waving beside a purple pedestrian crossing sign, above a striped zebra crossing and the words \u201cCross safely\u201d.'},
 {slug:'stop-look-listen',word:'Stop, Look, Listen',line:'Stop \u00b7 Look \u00b7 Listen',shelf:'road',
  alt:'A Staying Safe flashcard headed Stop, Look, Listen: a boy in a red shirt raising his hand at the curb between a red car and a dark car, with STOP, LOOK and LISTEN signs above a zebra crossing.'},
 {slug:'stop-at-the-edge',word:'Stop at the Edge',line:'Feet behind the line, every time',shelf:'road',
  alt:'A Staying Safe flashcard headed Stop at the Edge: a boy in a purple cape holding his palm out in a stop gesture at the edge of a gray curb, beside a giant purple STOP sign.'},
 {slug:'walk-dont-run',word:'Walk, Don\u2019t Run',line:'Walking feet near the street',shelf:'road',
  alt:'A Staying Safe flashcard headed Walk, Don\u2019t Run: a boy walking calmly while two purple sneaker characters dash past with motion lines, under purple and red banners reading \u201cWalk\u201d and \u201cDon\u2019t run\u201d.'},
 {slug:'wear-a-helmet',word:'Wear a Helmet',line:'Protect your head',shelf:'road',
  alt:'A Staying Safe flashcard headed Wear a Helmet: a boy in a purple helmet riding a kick scooter with a thumbs-up, over a purple banner reading \u201cProtect your head\u201d.'},
 {slug:'safe-distance',word:'Safe Distance',line:'Give space \u00b7 ask before touching',shelf:'road',
  alt:'A Staying Safe flashcard headed Safe Distance: a golden dog on a leash and a boy holding up a stop palm, a purple double-headed arrow marking the space between them, over badges reading \u201cGive space\u201d and \u201cAsk before touching\u201d.'},
 {slug:'dont-touch',word:'Don\u2019t Touch',line:'Ask a grown-up',shelf:'home',
  alt:'A Staying Safe flashcard headed Don\u2019t Touch: a big red stop hand beside a plug halfway into a wall socket, a boy in a purple cape and a kneeling woman pointing, over banners reading \u201cDon\u2019t touch\u201d and \u201cAsk a grown-up\u201d.'},
 {slug:'hot-things',word:'Hot Things',line:'Steam, stoves and kettles \u2014 look, don\u2019t touch',shelf:'home',
  alt:'A Staying Safe flashcard headed Hot Things: a steaming yellow mug and a startled yellow kettle with a red stop hand between them, over a yellow banner reading \u201cAsk a grown-up\u201d beside a woman and child.'},
 {slug:'medicine-is-not-candy',word:'Medicine Is Not Candy',line:'Ask first \u2014 only a grown-up hands it over',shelf:'home',
  alt:'A Staying Safe flashcard headed Medicine Is Not Candy: a frowning purple medicine bottle with a cross shield holding up a stop hand beside a rainbow candy character, a boy and a kneeling woman between them, over a banner reading \u201cAsk first\u201d.'},
 {slug:'fire-safety',word:'Fire Safety',line:'Notice it \u2192 get out \u2192 tell a grown-up',shelf:'fire',
  alt:'A Staying Safe flashcard headed Fire Safety: a smiling smoke alarm beside the words \u201cStay calm\u201d, an exit runner icon beside \u201cGet out\u201d, a firefighter helmet beside \u201cTell a grown-up\u201d, over an orange banner reading \u201cNotice it \u2192 leave safely\u201d.'},
 {slug:'stop-drop-roll',word:'Stop, Drop, Roll',line:'The three steps every kid knows',shelf:'fire',
  alt:'A Staying Safe flashcard headed Stop, Drop, Roll: a boy in a purple cape shown three times \u2014 standing beside a STOP octagon, crouching beside a down arrow, and rolling on the ground beside circling arrows.'},
 {slug:'safety-hero',word:'Safety Hero',line:'Stop \u00b7 Ask \u00b7 Tell',shelf:'help',
  alt:'A Staying Safe flashcard headed Safety Hero: a boy in a purple cape with a star shield holding a tall card showing three rules \u2014 a stop hand, a question mark and a person icon beside the words Stop, Ask and Tell.'},
 {slug:'ask-for-help',word:'Ask for Help',line:'Tell a trusted grown-up',shelf:'help',
  alt:'A Staying Safe flashcard headed Ask for Help: a boy in a purple cape raising his hand high while a kneeling grown-up gives a thumbs-up, over a purple banner reading \u201cTell a trusted grown-up\u201d.'},
 {slug:'if-youre-lost',word:'If You\u2019re Lost',line:'Stay here \u00b7 find a trusted grown-up \u00b7 say your name',shelf:'help',
  alt:'A Staying Safe flashcard headed If You\u2019re Lost: a green Stay Here sign held up by a hand, a small boy waving and a grown-up with a check mark on his shirt, over green badges reading \u201cFind a trusted grown-up\u201d and \u201cSay your name\u201d.'},
 {slug:'stay-with-your-group',word:'Stay with Your Group',line:'Stay together \u00b7 follow your grown-up',shelf:'help',
  alt:'A Staying Safe flashcard headed Stay with Your Group: a teacher in purple leading a line of children with backpacks, a red stop-hand octagon beside the last straggler, over banners reading \u201cStay together\u201d and \u201cFollow your grown-up\u201d.'},
 {slug:'tell-if-youre-hurt',word:'Tell If You\u2019re Hurt',line:'A hurt that is told gets help',shelf:'help',
  alt:'A Staying Safe flashcard headed Tell If You\u2019re Hurt: a boy sitting with a bandaged knee waving to a kneeling grown-up, over a large purple banner reading \u201cTell\u201d and \u201cIf you\u2019re hurt\u201d.'},
];
const bySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));

/* Teaching order = shelf order below; the short pages' prev/next follow it. */
export const SSAFE_ORDER=CARDS.map(c=>c.slug);
if(SSAFE_ORDER.length!==19)throw Error('staying-safe: expected 19 cards, got '+SSAFE_ORDER.length);
if(new Set(SSAFE_ORDER).size!==19)throw Error('staying-safe: duplicate slugs');

/* The four shelves of the class page, in teaching order. */
const SHELVES=[
 {id:'road',label:'THE ROAD SHELF \u00b7 CARS, CROSSINGS AND BIKES',h2:'Out and about: the road shelf.',
  hint:'Nine cards for every walk, ride and drive: buckle up before the wheels turn, hold hands near roads, read the traffic lights, cross on the zebra, stop-look-listen at the curb, stop at the edge, keep walking feet on the sidewalk, wear a helmet on wheels, and give every dog its space. Tap any card to open its page.'},
 {id:'home',label:'THE HOME SHELF \u00b7 HOT, PLUGGED-IN, MEDICINE',h2:'Indoors: the home shelf.',
  hint:'Three cards for the house: sockets and plugs are don\u2019t-touch, steam and stoves are hot things, and medicine is not candy \u2014 the grown-up hands it over, nobody else. Tap any card to open its page.'},
 {id:'fire',label:'THE FIRE SHELF \u00b7 KNOW IT, DRILL IT',h2:'Fire: know it, drill it.',
  hint:'Two cards that rehearse the scary minute so nobody meets it cold: fire safety (notice it, get out, tell a grown-up) and the stop-drop-roll drill every four-year-old can own. Tap any card to open its page.'},
 {id:'help',label:'THE HELPING SHELF \u00b7 PEOPLE WHO KEEP YOU SAFE',h2:'People: the helping shelf.',
  hint:'Five cards for the moments that need another person: the safety-hero spine (stop, ask, tell), asking for help from a trusted grown-up, what to do if you\u2019re lost, staying with your group, and telling someone when you\u2019re hurt. Tap any card to open its page.'},
];
const shelfCount=Object.fromEntries(SHELVES.map(s=>[s.id,0]));
for(const c of CARDS)shelfCount[c.shelf]++;
if(shelfCount.road!==9||shelfCount.home!==3||shelfCount.fire!==2||shelfCount.help!==5)throw Error('staying-safe: shelf sizes drifted '+JSON.stringify(shelfCount));

/* Short-page copy: one fresh intro and one fresh practice step per card,
   authored here so the 19 pages never share a sentence with each other or
   with the class page. */
const INTRO={
 'buckle-up':'The car seat rule that never takes a day off: the strap goes on before the wheels turn, every ride, both near and far. On this card the buckle clicks and the boy grins \u2014 because being strapped in is the first job of every big-kid passenger.',
 'hold-hands-near-roads':'Small hand in big hand from the door to the door. The card shows the whole deal: a woman and a boy, fingers locked, crossing while the car waits \u2014 because a four-year-old\u2019s grip on a grown-up is the safest strap there is.',
 'traffic-lights':'The street speaks in colors, and this card teaches the two that matter first: red means stop, green means go \u2014 when the road is safe to cross. The smiling light on the card makes the colors easy to love and easier to remember.',
 'zebra-crossing':'The striped road where walkers win. This card shows the crossing sign and the stripes themselves \u2014 the one place a small pedestrian steps out proudly, after a stop and a look both ways.',
 'stop-look-listen':'The three-step curb drill, one card, three signs: STOP at the edge, LOOK left and right, LISTEN for engines before a toe moves. Drilled calmly on quiet walks, it plays back automatically on busy ones.',
 'stop-at-the-edge':'The curb is a cliff to a ball, a scooter and a running four-year-old. The card\u2019s hero plants his palm out at the edge \u2014 the same stop the class practises at every sidewalk, parking lot and driveway.',
 'walk-dont-run':'Near the street, walking feet. The card says it with pictures: one boy strolling while his sneaker pals dash past \u2014 the running belongs on grass and playgrounds, and the walking belongs where cars go.',
 'wear-a-helmet':'Wheels on, helmet on \u2014 scooters, bikes, trikes, all of it. The card\u2019s rider gives a thumbs-up from under a purple helmet because that is the whole argument: the helmet is what lets the ride be fun.',
 'safe-distance':'Dogs are family to their people and strangers to everybody else \u2014 so the card teaches the space: give the dog room, keep the hand to yourself until the owner says yes. Kind for the dog, safe for the child.',
 'dont-touch':'Sockets, plugs, wires and the cleaning shelf: the big red hand on this card covers them all. The rule under the picture is the useful half \u2014 don\u2019t touch, and then what to do instead: ask a grown-up.',
 'hot-things':'Steam is the warning sign a four-year-old can read: the mug, the kettle, the stove top. The card\u2019s red hand says don\u2019t touch, and the yellow banner underneath gives the safe move \u2014 ask a grown-up.',
 'medicine-is-not-candy':'The bottle on this card frowns for a reason: pills and gummies look sweet and are not. The rule is one breath long \u2014 medicine is not candy, ask first \u2014 and the grown-up is the only hand that opens the bottle.',
 'fire-safety':'The fire plan in three calm moves: notice it, get out, tell a grown-up \u2014 with the smoke alarm on the card teaching the sound before any real alarm sounds. Rehearsed twice, it holds for life.',
 'stop-drop-roll':'If clothes ever catch, the body already knows: STOP where you are, DROP to the ground, ROLL over the flames until they are out. Three steps, one drill, practised laughing on the living-room rug \u2014 that is exactly how it should go in.',
 'safety-hero':'The spine of the whole class on one card: STOP when something feels wrong, ASK a grown-up you trust, TELL what happened. The caped hero on the card makes the rules feel like a superpower \u2014 because they are one.',
 'ask-for-help':'Needing help is not being small \u2014 it is the hero move this card shows: a hand up high, a grown-up thumbs-up back. The badge underneath names the target: a TRUSTED grown-up, and naming two or three of those by name is the practice.',
 'if-youre-lost':'Lost has a script, and this card is it: STAY HERE where you were last seen, FIND a trusted grown-up \u2014 a parent, a worker with a name tag, a person with children \u2014 and SAY YOUR NAME out loud. Three lines, rehearsed on errands, kept forever.',
 'stay-with-your-group':'The line on this card is the whole lesson: nobody wanders, everybody walks with the grown-up. Staying with your group is how every outing stays easy \u2014 and the red stop hand catches the one who drifted.',
 'tell-if-youre-hurt':'A hurt that is told gets a bandage; a hurt that is hidden gets worse. The card shows the tell: a boy with a scraped knee waving his grown-up over \u2014 and the banner puts the rule in words a four-year-old can own.'};
const TRY={
 'buckle-up':'Next car ride, hand over the job: your child checks that every belt in the back seat is clicked before you turn the key. The buckle click becomes the ride\u2019s starting bell.',
 'hold-hands-near-roads':'Walk to the mailbox and back with the one rule said out loud: near a road, hands lock. Let your child be the one who reminds YOU \u2014 the day they enforce it, it is theirs.',
 'traffic-lights':'Stand at one light and call the colors together: red \u2014 feet stop, green \u2014 eyes check, then go. Three lights is a full lesson; keep the yellow for a later class.',
 'zebra-crossing':'Cross on the stripes today and let your child lead the ritual: stop at the edge, look both ways, walk straight across the stripes \u2014 no diagonals.',
 'stop-look-listen':'Play the three words at any quiet curb: you say stop, your child looks left and right and then cups an ear. Swap roles so they get to be the caller too.',
 'stop-at-the-edge':'At the next curb, practice the plant: both feet stop a giant step back from the edge, palm out. Ball rolls to the street? It waits there \u2014 the grown-up is the fetcher.',
 'walk-dont-run':'Choose a stretch of sidewalk and make it the walking challenge: who can pass it with the calmest feet? Running waits for the park at the end.',
 'wear-a-helmet':'Pick the helmet together and let the sticker or color be your child\u2019s choice \u2014 a helmet they picked is a helmet they wear. Rule stays: no helmet, no wheels.',
 'safe-distance':'Meet a leashed dog on a walk and run the sequence: stop, ask the owner, wait for the yes. A no is a fine answer too \u2014 wave hello with your hand instead.',
 'dont-touch':'Tour one room and play red-hand detective: your child points at everything a hand must not touch \u2014 sockets, cords, the cleaning shelf \u2014 and practices the words: don\u2019t touch, ask a grown-up.',
 'hot-things':'Kitchen tour, steam edition: find the kettle, the stove, the oven and the mug, and let your child show you the steam from a safe step back. Steam means stop.',
 'medicine-is-not-candy':'Say the rule at vitamin time and mean it: vitamins are medicine too, so the grown-up hands them over. Keep every real bottle up high and out of sight \u2014 the card works best when the house agrees with it.',
 'fire-safety':'Point out the smoke alarm\u2019s home and play its test button together \u2014 the beep is loud, and loud is the point. Then walk the exit route from the bedroom to the front door once, slowly.',
 'stop-drop-roll':'On a rug or the grass, drill the three steps with giggles: stop, drop, roll \u2014 three rolls, then up. Practiced as a game, the move lives in the body if it is ever needed.',
 'safety-hero':'Make the three words the family\u2019s secret code this week: stop, ask, tell. Call one at random across the day \u2014 your child answers with the move and the words.',
 'ask-for-help':'Name the trusted grown-ups out loud: two at home, one or two at school or with the neighbors. Rehearse the sentence \u2014 \u201cI need help, please\u201d \u2014 until it comes out easy.',
 'if-youre-lost':'On the next errand, pick the lost-spot together: the checkout counter, the information desk, a worker with a name tag. Then rehearse the three lines \u2014 stay here, find a trusted grown-up, say my name \u2014 with your child\u2019s full name said proud and loud.',
 'stay-with-your-group':'Next family walk or party, give your child the job of group checker: count the people before you leave and when you arrive. The job makes the rule stick.',
 'tell-if-youre-hurt':'Teach the report: where it hurts, how it happened, and show the spot. Practise on a stuffed animal first \u2014 your child plays the grown-up, the bear reports its sore paw.'};
if(Object.keys(INTRO).length!==19||Object.keys(TRY).length!==19)throw Error('staying-safe: copy decks must cover 19 cards');
for(const s of SSAFE_ORDER){if(!INTRO[s]||!TRY[s])throw Error('staying-safe: missing copy for '+s);}

const imgOf=s=>SSAFE_BASE+s+'.webp';

/* ---- The class page /staying-safe/ -------------------------------------- */
export function ssClassBody(){
 const shelfHtml=sh=>`<section class="wrap lesson-section" id="shelf-${sh.id}"><span class="eyebrow">${sh.label}</span><h2>${sh.h2}</h2><p class="fc-hint">${sh.hint}</p><div class="lp-tiles">${CARDS.filter(c=>c.shelf===sh.id).map(c=>`<a class="lp-tile" href="${SSAFE_PATH}${c.slug}/"><img src="${imgOf(c.slug)}" width="800" height="1131" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong></a>`).join('')}</div></section>`;
 return `<section class="wrap lesson-section"><div class="page-heading"><span class="eyebrow">CLASS 39 \u00b7 AGES 4\u20135 \u00b7 19 SAFETY CARDS</span><h1>Staying Safe.</h1></div></section>
 <section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Nineteen rules, rehearsed until they are reflexes.</h2><p class="lesson-copy">Every card in this class is one safety rule a four-year-old can own: buckle up, hold hands near roads, red means stop, cross on the zebra, stop-look-listen, stop at the edge, walking feet, wear a helmet, give dogs space, don\u2019t touch, hot things, medicine is not candy, fire safety, stop-drop-roll, and the helping spine \u2014 stop, ask, tell \u2014 with ask-for-help, if-you\u2019re-lost, stay-with-your-group and tell-if-you\u2019re-hurt finishing the set. Each card opens its own short page: the card itself, the rule it prints, one way to practise it today, and a link back to this page.</p><p class="lesson-copy">One card a sitting is plenty \u2014 the whole class is a term of five-minute safety talks, and the order runs road first, home second, fire third and people last. Safety is the one subject where rehearsal is the lesson: a rule said at a calm curb is the rule that plays back at a busy one. Nothing here is scary. Everything here is said the way the cards say it \u2014 plainly, warmly, and with the grown-up\u2019s hand somewhere in the picture.</p></section>
 <section class="wrap lesson-section"><span class="eyebrow">WHY REHEARSAL WINS</span><h2>A rule practised calmly is a rule that holds.</h2><p class="lesson-copy">Preschool safety teachers agree on the method: name the rule, act it out, and repeat it in the real place \u2014 the curb, the car, the kitchen. Fear teaches nothing; a drilled routine teaches everything. That is why this class runs on tiny repetitions done cheerfully, one card a week if that is the family\u2019s pace, and why every page ends in something to DO, not just something to know.</p><p class="lesson-copy">The deck\u2019s quiet center is the Safety Hero card: STOP, ASK, TELL. Every other rule in the set hangs off that spine \u2014 stop before the street, ask before touching, tell when something is wrong. If your family keeps only three words from this class, those are the three, and the card to hang on the fridge is <a href="${SSAFE_PATH}safety-hero/">Safety Hero</a>.</p></section>
 ${SHELVES.map(shelfHtml).join('')}
 <section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where this class fits.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/learning-path/">Back to the Learning Path <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/life-skills-and-good-habits/">Class 32 \u00b7 Life Skills &amp; Good Habits <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/community-helpers-and-our-neighborhood/">Class 33 \u00b7 Community Helpers &amp; Our Neighborhood <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/transportation-and-vehicles/">Class 24 \u00b7 Transportation &amp; Vehicles <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/first-glance/">First Glance \u00b7 the Staying-safe sheet <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Class 32 builds the everyday habits this class keeps safe, Class 33 names the helpers a four-year-old can call on \u2014 firefighters, police officers, crossing guards \u2014 and Class 24 spots the vehicles whose rules this class rehearses. The <a href="/first-glance/">First Glance</a> safety sheet holds the same words as pictures, ready for the youngest sibling.</p></section>
 <p class="lesson-note"><strong>Age ranges are a guide, not a test.</strong> Start with the rules your week already meets \u2014 the car, the curb, the kitchen \u2014 and let the card pages do the rehearsing with you.</p>`;
}

/* ---- One short page per card: /staying-safe/<slug>/ ---------------------- */
function ssCrumb(word){return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/learning-path/">Learning Path</a><span aria-hidden="true">/</span><a href="${SSAFE_PATH}">Staying Safe</a><span aria-hidden="true">/</span><span aria-current="page">${esc(word)}</span></nav>`;}

export function ssShortBody(slug){
 const c=bySlug[slug];
 if(!c)throw Error('staying-safe: no card for '+slug);
 const idx=SSAFE_ORDER.indexOf(slug);
 const prev=SSAFE_ORDER[(idx+SSAFE_ORDER.length-1)%SSAFE_ORDER.length];
 const next=SSAFE_ORDER[(idx+1)%SSAFE_ORDER.length];
 const prevC=bySlug[prev],nextC=bySlug[next];
 const lineHtml=esc(c.line).replace(/\u2192/g,'\u2192');
 return `${ssCrumb(c.word)}
 <div class="page-heading wrap"><span class="eyebrow">STAYING SAFE \u00b7 CLASS 39 \u00b7 AGES 4\u20135 \u00b7 CARD ${idx+1} OF 19</span><h1>${esc(c.word)}</h1><p>${INTRO[slug]}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main"><figure class="fc2-hero"><img src="${imgOf(slug)}" width="800" height="1131" alt="${esc(c.alt)}"><figcaption><strong>The ${esc(c.word)} card</strong><span>Staying Safe \u00b7 the rule as the card prints it</span></figcaption></figure>
  <section class="fc2-learn" aria-label="The ${esc(c.word)} rule">
   <div class="fc2-do"><h2>The card says</h2><p class="dino-action">\u201c${lineHtml}\u201d \u2014 printed on the card.</p></div>
   <div class="fc2-do"><h2>Try it today</h2><p>${TRY[slug]}</p></div>
   <div class="fc2-do fc2-note"><h2>Keep going</h2><p>${esc(c.word)} is one of the nineteen rules in <a href="${SSAFE_PATH}">Class 39 \u00b7 Staying Safe</a> \u2014 the class page holds the whole set, one shelf per part of life. Next up: <a href="${SSAFE_PATH}${next}/">${esc(nextC.word)}</a>.</p></div>
  </section></div>
  <aside class="fc2-rail" aria-label="More Staying Safe cards"><section class="fc2-block"><span class="eyebrow">PART OF CLASS 39</span><h2>Eighteen more rules.</h2><p class="fc-hint">Card ${idx+1} of 19 \u00b7 Ages 4\u20135. Every card has its own page, and every page leads back to the class.</p><a class="button" href="${SSAFE_PATH}">Back to Staying Safe <span aria-hidden="true">\u2197</span></a><div class="lesson-linkrow" style-less="true"><a class="button button-ghost" href="${SSAFE_PATH}${prev}/">Previous \u00b7 ${esc(prevC.word)}</a><a class="button button-ghost" href="${SSAFE_PATH}${next}/">Next \u00b7 ${esc(nextC.word)}</a></div><a class="button button-ghost" href="${imgOf(slug)}" download>Download the card <span aria-hidden="true">\u2193</span></a><a class="button button-ghost" href="/learning-path/">The Learning Path <span aria-hidden="true">\u2197</span></a></section></aside>
 </div>`;
}

/* ---- Inbound-link blocks, appended at the three class pages' page() calls
   (the MAN_*_LINK pattern); each card page links back via its rail, and the
   class page's AROUND THE SCHOOL section links back to all four sources. -- */
/* Appended to Class 32 · Life Skills & Good Habits. */
export const SSAFE_LIFE_SKILLS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">THE SAFETY CLASS NEXT DOOR</span><h2>Staying Safe: the rules that guard the habits.</h2><p class="lesson-copy">Class 32 builds the habits a good day runs on; <a href="/staying-safe/">Class 39 \u00b7 Staying Safe</a> guards the body those habits live in: nineteen printable cards for ages 4\u20135 \u2014 buckle up, hot things, medicine is not candy, stop-look-listen, the stop-drop-roll drill \u2014 each with its own short page, the rule quoted from the card and one way to practise it today. Habits here, safety next door: rehearse a rule a week and the whole set sticks.</p></section>`;
/* Appended to Class 24 · Transportation & Vehicles. */
export const SS_TRANSPORT_LINK=`<section class="wrap lesson-section"><span class="eyebrow">SAFER EVERY JOURNEY</span><h2>From spotting vehicles to crossing streets.</h2><p class="lesson-copy">Class 24 names everything that goes; <a href="/staying-safe/">Class 39 \u00b7 Staying Safe</a> teaches the street rules that go with it: nine road cards for ages 4\u20135 \u2014 traffic lights, the zebra crossing, stop-look-listen, hold hands near roads, helmets on wheels \u2014 each on its own page with the rule printed on the card and one practice for the very next walk. Spot the bus, then cross like the card says.</p></section>`;
/* Appended to Class 33 · Community Helpers & Our Neighborhood. */
export const SS_COMMUNITY_LINK=`<section class="wrap lesson-section"><span class="eyebrow">HELPERS AND THEIR RULES</span><h2>The people who help, the rules that call them.</h2><p class="lesson-copy">Class 33 names the helpers \u2014 firefighters, police officers, the crossing guard; <a href="/staying-safe/">Class 39 \u00b7 Staying Safe</a> rehearses the moments that bring them: the helping shelf \u2014 Safety Hero\u2019s stop-ask-tell, ask-for-help, if-you\u2019re-lost, stay-with-your-group and tell-if-you\u2019re-hurt \u2014 plus fire safety\u2019s calm three moves. Helpers here, the asking-for-help words next door.</p></section>`;

/* ---- SEO strings for the 19 short pages (keyword-first titles, the card's
   own intro plus the class tail for descriptions, the artwork alt for og). - */
export function ssShortTitle(slug){
 const c=bySlug[slug];if(!c)throw Error('staying-safe: no card for '+slug);
 return c.word+' \u2014 Safety Card for Kids (Class 39 \u00b7 Staying Safe, Ages 4\u20135)';
}
export function ssShortDesc(slug){
 const c=bySlug[slug];if(!c)throw Error('staying-safe: no card for '+slug);
 return INTRO[slug]+' The rule on the card: \u201c'+c.line+'\u201d \u2014 with one way to practise it today. Part of the 19-card Staying Safe class (Class 39, ages 4\u20135) on the Kiddo.school Learning Path.';
}
export function ssShortAlt(slug){
 const c=bySlug[slug];if(!c)throw Error('staying-safe: no card for '+slug);
 return c.alt;
}
