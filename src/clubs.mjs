// Kiddo School — SCHOOL ROOM · The Clubs: the room page /clubs/, the
// owner's short pages /clubs/<slug>/ (card + the card's skill + back link),
// and the cross-links the owner asked for (2026-10-25): Explore the School
// (/rooms/) and the Learning Path's Growing-up classrooms row point here,
// and this room links back to both. The hub shows cover.webp FIRST, then the
// 15 Ages 3+ clubs in the owner's order, then the 30 Ages 6+ clubs in file
// order — the age split is the room's whole architecture (owner: "take care
// of ages carefully"). Short pages keep the house two-home doctrine: the
// card's SKILL pill is quoted verbatim here; the teaching words live on the
// /clubs/learn/ lessons and the library pages — no sentence shared between
// shelves. Owner standing rule (2026-10-24): games-shelf links where they
// honestly fit. Fencing and archery carry "Ask a grown-up and a trained
// coach" (owner safety rule).
import {CLUBS_BASE,CLUBS_ORDER,CLUBS_SKILLS,CLUBS_YOUNG,CLUBS_COACH,CLUBS_COACH_LINE,CLUBS_COVER} from './flashcards/data-clubs.mjs';
import {fcSetBySlug} from './flashcards/index.mjs';

export {CLUBS_ORDER};

export const CLUBS_PATH='/clubs/';
const clubSet=fcSetBySlug['clubs'];
if(!clubSet)throw Error('clubs: set missing from flashcards SOURCES');
const bySlug=Object.fromEntries(clubSet.cards.map(c=>[c.slug,c]));
const ageOf=Object.fromEntries(clubSet.cards.map(c=>[c.slug,c.ages]));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* Short-page copy: one fresh intro per club (authored here so the short
   pages and the card pages never drift or repeat). Index by slug. */
const CLUBS_INTRO={
 'art':'The maker\u2019s hour, every week: paint, paper, glue and whatever the imagination orders. The card hands the club its two skills — Painting & Creativity — and tonight\u2019s session needs nothing but a sheet and a welcome mess.',
 'music':'The beat lives in the house already: pots, shakers, a lap that drumming works on. The card names the club\u2019s pair — Rhythm & Sound — and ten minutes of echo claps turns any evening into music club.',
 'dance':'Feelings go through the legs before they reach the words. The card prints the club\u2019s pair — Movement & Expression — and one song with a freeze rule fills the hallway with dancing statues.',
 'sports':'One ball, one buddy, one rule: play WITH people. The card carries the club\u2019s pair — Teamwork & Fitness — and a living-room pass-and-count is the whole first practice.',
 'drama':'The pretend box, opened wide. The card names the club\u2019s pair — Stories & Confidence — and one borrowed character with a silly walk gives the quietest child the loudest voice in the house.',
 'gardening':'The slowest club in the school: a seed, a pot, water, and days of watching. The card carries the pair — Nature & Care — and a bean in a clear cup starts the patience this week.',
 'cooking':'The kitchen, handed over: stirring, pouring, spreading, tasting. The card prints the pair — Food & Independence — and one dish the child truly cooked is the club\u2019s entire entrance exam.',
 'ballet':'Strong arms, quiet feet. The card names the pair — Balance & Grace — and first position plus a plate of pretend hot soup turns the hallway into a stage.',
 'yoga':'The slow-down club. The card carries the pair — Calm & Wellbeing — and three animal breaths plus one wobbly tree pose settle the wiggliest evening in the house.',
 'swimming':'The water class with the safety spine. The card prints the pair — Confidence & Safety — and the pool rules recited on the deck are the first stroke of every visit.',
 'reading':'The everywhere club: a couch, a bed, a bus seat — any book opens a branch. The card carries the pair — Imagine & Learn — and ten minutes with the child\u2019s own choice is the whole session.',
 'crafts':'The box of leftovers, promoted to a workshop. The card names the pair — Make & Explore — and a cardboard tube\u2019s next life as a zoo animal is tonight\u2019s project.',
 'drawing':'First we look, then we draw. The card prints the pair — See & Create — and one real object studied for ten silent seconds starts every session in the club.',
 'baking':'The careful kitchen: cups leveled, flour clouds, the oven\u2019s magic. The card carries the pair — Measure & Create — and one batch with the child on measuring duty ends warm.',
 'singing':'The instrument everyone already owns. The card names the pair — Voice & Confidence — and one hummed glide from low to high opens every session of the club.',
 'archery':'The steady-hands sport — and a with-a-coach club: real bows live at the range where trained coaches and proper gear wait. The card names the pair — Aim & Focus — and beanbag targets train the aim at home first.',
 'astronomy':'The look-up club that meets after bedtime. The card prints the pair — Wonder & Discovery — and a moon diary with tonight\u2019s date on the first page starts the schedule.',
 'bird-watching':'The quiet hunt: binoculars, a window, and patience that lets the birds forget you. The card carries the pair — Observe & Discover — and a tally sheet by the glass starts the notebook.',
 'calligraphy':'Slow pens, letters treated like small drawings. The card names the pair — Letters & Patience — and one letter written ten beautiful ways fills tonight\u2019s page.',
 'chess':'The board of six armies. The card prints the pair — Focus & Strategy — and a pawns-only game teaches the littlest pieces\u2019 big work before the full army arrives.',
 'choir':'Singing with company: many voices, one song. The card carries the pair — Voice & Harmony — and one round of Row Your Boat weaves the family into a choir tonight.',
 'climbing':'The wall sport with the strictest safety net. The card names the pair — Courage & Movement — and the three-point rule walked up the stairs is the first climbing lesson.',
 'coding':'The giving-instructions club. The card prints the pair — Logic & Discovery — and a robot-parent sandwich program (obeyed literally) is the funniest debugging lesson ever run.',
 'cycling':'The two-wheel club. The card carries the pair — Balance & Adventure — and a helmet ceremony plus one long feet-up glide is how every rider starts.',
 'debate':'The arguing-nicely club. The card prints the pair — Speak & Listen — and one silly question with two reasons per side is all tonight\u2019s debate needs.',
 'fencing':'The sword sport with the strictest manners — salute first, mask on, then lightning feet. The card names the pair — Agility & Focus — and the footwork drills train at home while the blades wait at the club with a trained coach.',
 'fashion-design':'The wearable-ideas club. The card carries the pair — Imagine & Create — and one design brief (RAINY DAY) with three sketched answers opens tonight\u2019s collection.',
 'filmmaking':'The studio club: a story, any camera, a premiere on the couch. The card prints the pair — Imagine & Tell — and a three-scene plan shot in one take each is tonight\u2019s whole film.',
 'first-aid':'The helping club. The card carries the pair — Help & Care — and one stuffed patient with a pretend scrape runs the check-call-care drill from scratch.',
 'gymnastics':'The body-control club. The card names the pair — Strength & Flexibility — and four animal warm-ups followed by one safe roll start the practice on any soft ground.',
 'horse-riding':'The half-ton-friend club. The card prints the pair — Courage & Care — and the greeting ritual (side, soft voice, flat hand) happens on the ground long before any riding.',
 'journaling':'The notebook club: one page a day for whatever matters. The card carries the pair — Reflect & Express — and three lines (saw, felt, hope) keep the habit alive.',
 'lego':'The brick club. The card names the pair — Build & Create — and the sort-first rule plus one rebuild challenge turns the same pieces into a brand-new idea.',
 'martial-arts':'The respect-first club: bow in, listen hard, practice slow. The card prints the pair — Discipline & Strength — and one three-move kata at honey speed is tonight\u2019s whole class.',
 'nature-crafts':'The walk-first club: gather gently, make second. The card carries the pair — Collect & Create — and one bag of fallen leaves becomes tonight\u2019s gallery.',
 'photography':'The frame club: look, choose, click. The card names the pair — Observe & Create — and a five-photo hunt (something red, something tiny...) is the whole session.',
 'poetry':'Few lines, big feelings. The card prints the pair — Words & Feelings — and a five-line list poem read in the biggest voice in the house is tonight\u2019s reading.',
 'pottery':'The mud-that-becomes-things club. The card carries the pair — Shape & Imagine — and one pinch pot, turned slowly, is the oldest trick in the book and still the first.',
 'puppetry':'The backstage club: build the character, give it a voice, hide. The card names the pair — Create & Perform — and a sock with button eyes plus a doorway stage books tonight\u2019s show.',
 'robotics':'The build-a-helper club. The card prints the pair — Build & Invent — and five house robots spotted by name (dishwasher, toaster...) open the design conversation.',
 'science':'The question club: guess, test, observe. The card carries the pair — Explore & Experiment — and a ten-object sink-or-float census with written guesses is tonight\u2019s lab.',
 'skateboarding':'The rolling club that climbs its courage one surface at a time. The card names the pair — Balance & Confidence — and carpet stance is where every rider starts.',
 'table-tennis':'The small-table, fast-ball club. The card prints the pair — React & Play — and a cooperative rally chasing the family record beats any scoreboard.',
 'tennis':'The court club that starts at the wall. The card carries the pair — Move & Compete — and the racket-control ladder (ten bounces, ten on the edge) is the first rung.',
 'volunteering':'The helping-others club. The card names the pair — Share & Support — and two baskets (KEEP and GIVE) sorted by the child start this week\u2019s project.'};
if(Object.keys(CLUBS_INTRO).length!==45)throw Error('clubs: expected 45 short-page intros, got '+Object.keys(CLUBS_INTRO).length);
for(const s of CLUBS_ORDER)if(!CLUBS_INTRO[s])throw Error('clubs: no intro for '+s);

/* ---- The /clubs/ room page ---------------------------------------------- */
export function clubsRoomBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">SCHOOL ROOM \u00b7 THE CLUBS \u00b7 45 CARDS \u00b7 AGES 3\u201312</span><h1>The Clubs — every card opens a hobby.</h1><p class="lesson-lede">Forty-five after-school clubs on forty-five cards: art, music, dance and thirteen more for the youngest members, then chess, coding, fencing and the rest for ages 6 and up. Every card prints the two skills its club trains — Aim &amp; Focus, Calm &amp; Wellbeing, Measure &amp; Create — every club has its own short page, its own lesson and a printable twin, and the room was built for choosing: try one, keep one, grow one.</p><div class="lesson-start"><a class="button" href="#the-club-shelves">Open the club shelves <span aria-hidden="true">\u2193</span></a><a class="button button-ghost" href="/flashcards/clubs/">The printable set <span aria-hidden="true">\u2197</span></a></div></div><figure class="lesson-cover"><img src="${CLUBS_BASE}${CLUBS_COVER.file}" width="${CLUBS_COVER.w}" height="${CLUBS_COVER.h}" alt="${esc(CLUBS_COVER.alt)}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THIS ROOM WORKS</span><h2>Pick a club. Read its skills. Try it this week.</h2><p class="lesson-copy">Every card in this deck does two jobs: it names one club and it prints the two skills that club trains, right under the picture. The room splits by age the way the school does: the first shelf holds the fifteen clubs made for the youngest members — tagged <strong>Ages 3+</strong> — and the second shelf holds the thirty clubs for older members, tagged <strong>Ages 6+</strong>. When one club becomes a favorite, its <strong>lesson page</strong> carries the full teaching — what the club is, what the skills secretly train, the parent script, the questions to ask — and the <strong>library page</strong> holds the printable twin with a download button.</p><p class="lesson-copy">A word on safety, because it matters here: some clubs are coach clubs. <strong>Fencing and archery always run with a trained coach and proper equipment</strong> — their pages say so — and swimming, climbing and horse riding belong wherever trained adults and the right gear are standard. The card starts the hobby; the grown-ups keep it safe.</p></section>`;
 const youngTiles=CLUBS_YOUNG.map(s=>{const c=bySlug[s];return `<a class="lp-tile" href="${CLUBS_PATH}${s}/"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong></a>`;}).join('');
 const olderTiles=CLUBS_ORDER.filter(s=>!CLUBS_YOUNG.includes(s)).map(s=>{const c=bySlug[s];return `<a class="lp-tile" href="${CLUBS_PATH}${s}/"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong></a>`;}).join('');
 const shelves=`<section class="wrap lesson-section" id="the-club-shelves"><span class="eyebrow">THE YOUNG CLUB SHELF \u00b7 AGES 3+</span><h2>Fifteen clubs for the youngest members.</h2><p class="fc-hint">Art, music, dance, sports, drama, gardening, cooking, ballet, yoga, swimming, reading, crafts, drawing, baking and singing — the fifteen clubs that work from age three, in the order the school recommends trying them. Tap any card to open its short page.</p><div class="lp-tiles">${youngTiles}</div></section><section class="wrap lesson-section"><span class="eyebrow">THE OLDER CLUB SHELF \u00b7 AGES 6+</span><h2>Thirty clubs for ages 6 and up.</h2><p class="fc-hint">From archery to volunteering — the strategy clubs, the workshop clubs, the coach-led sports and the word clubs. Younger members wait for these; the skills are worth the wait.</p><div class="lp-tiles">${olderTiles}</div></section>`;
 const games=`<section class="wrap lesson-section"><span class="eyebrow">GAMES THE CLUBS PLAY</span><h2>Warm-ups from the games shelf.</h2><p class="lesson-copy">Club time and game time trade places all afternoon, and the school\u2019s <a href="/games/">games shelf</a> holds the rules for the warm-ups every club borrows: <a href="/games/animal-walks/">Animal Walks</a> opens dance, drama and yoga bodies, <a href="/games/musical-statues/">Musical Statues</a> trains the freeze every performance needs, <a href="/games/relay-race/">Relay Race</a> is sports club\u2019s favorite drill, <a href="/games/obstacle-course/">Obstacle Course</a> is gymnastics night at home, and <a href="/games/simon-says/">Simon Says</a> sharpens the listening every club runs on. Full rules on every page.</p></section>`;
 const fit=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where to wander next.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/rooms/">Explore the School — every room, one door each <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/learning-path/">The Growing-up classrooms on the Learning Path <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/art/">Visit the Art Studio <span>· ages 3–12</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/science/">Run an experiment in the Science Lab <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/nature/">Go outside with the Nature Club <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">The Clubs sit on the school\u2019s room shelf beside the Library, the Garden, the Playground, the Music Room and the Art Room — and they belong to the Growing-up classrooms the Learning Path points to: the Art Studio, the Science Lab and the Nature Club are the neighbors a new hobby grows into.</p></section>`;
 return `${hero}${how}${shelves}${games}${fit}<p class="lesson-note"><strong>A hobby is a curriculum.</strong> Every card here hides real work — focus, patience, practice, courage — inside something the child thinks is just their club. Try the thing first; the skills follow the fun.</p>`;
}

/* ---- One short page per club: card + skill + back link ------------------- */
export function clubShortBody(slug){
 const c=bySlug[slug];
 if(!c)throw Error('clubs: no card for '+slug);
 const skill=CLUBS_SKILLS[slug];
 const coach=CLUBS_COACH.includes(slug);
 const coachBlock=coach?`<div class="fc2-do fc2-note fcl-safety"><h2>Before anything flies</h2><p><strong>${esc(CLUBS_COACH_LINE)}</strong> — real equipment is fitted, checked and supervised by experts, and every proper session happens under a coach\u2019s eye. Home drills train the aim and the feet; the gear waits.</p></div>`:'';
 return `${crumbClub(c.word)}
 <div class="page-heading wrap"><span class="eyebrow">THE CLUBS \u00b7 SCHOOL ROOM \u00b7 ${esc(ageOf[slug]).toUpperCase()}</span><h1>${esc(c.word)}</h1><p>${CLUBS_INTRO[slug]}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main"><figure class="fc2-hero"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}"><figcaption><strong>The ${esc(c.word)} card</strong><span>Extra-Curricular Activities \u00b7 the card\u2019s own skill pill</span></figcaption></figure>
  <section class="fc2-learn" aria-label="The ${esc(c.word)} card\u2019s skills">
   <div class="fc2-do"><h2>The card\u2019s skills</h2><p class="dino-action">\u201c${esc(skill)}\u201d — printed on the card.</p></div>
   ${coachBlock}
   <div class="fc2-do"><h2>Try it this week</h2><p>Pick the club\u2019s smallest honest step and run it once — one session, one dish, one game, one page. The card is the invitation; this week is the reply.</p></div>
   <div class="fc2-do fc2-note"><h2>Keep going</h2><p>The ${esc(c.word)} club has its own full lesson — what the club is, what the skills train, the parent script and the questions to ask — plus a printable card page in the library. Try the club; the rest follows the favorite.</p></div>
  </section></div>
  <aside class="fc2-rail" aria-label="More clubs"><section class="fc2-block fc2-first-block"><span class="eyebrow">PART OF THE CLUBS</span><h2>Forty-four more clubs.</h2><p class="fc-hint">${esc(c.word)} is one of 45 clubs in the room, tagged ${esc(ageOf[slug])}.</p><a class="button" href="${CLUBS_PATH}">Back to the Clubs <span aria-hidden="true">\u2197</span></a><a class="button button-ghost" href="/clubs/learn/${slug}/">The ${esc(c.word)} lesson <span aria-hidden="true">\u2197</span></a><a class="button button-ghost" href="/flashcards/clubs/${slug}/">Print the card <span aria-hidden="true">\u2197</span></a></section></aside>
 </div>`;
}
function crumbClub(name){return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/rooms/">School Rooms</a><span aria-hidden="true">/</span><a href="${CLUBS_PATH}">Clubs</a><span aria-hidden="true">/</span><span aria-current="page">${esc(name)}</span></nav>`;}

/* ---- The Growing-up row link (owner 2026-10-25): the Learning Path's
   "Classrooms for older children" row points here, next to Art Studio,
   Science Lab and Nature Club. Appended to that row in build.mjs. ---------- */
export const CLUBS_GROWING_LINK=`The Clubs room joins the Growing-up shelf too: <a href="/clubs/">forty-five clubs at /clubs/</a> — from art and baking for the youngest members to chess, coding and fencing for ages 6 and up, each card naming the skills its club trains.`;
