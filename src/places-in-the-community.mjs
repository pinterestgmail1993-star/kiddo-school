// Kiddo School — EXTRA CLASS · Places in the Community: the class page. A
// bonus class beside the core Learning Path (like the Toddler Room, the
// Kitchen Helper, the Doctor Visit, Home and Daily Life and Kids Games). The
// page walks all 28 places in the set's tour order — LEARN, READ & IMAGINE →
// SAFE & CARED FOR → FOOD & SHOPPING → AROUND THE TOWN → GETTING AROUND →
// PARKS & GREEN PLACES — the way a real trip across town unfolds, starting
// at the place a child already knows. Every tile opens one
// /extra-classes/places-in-the-community/learn/ lesson: a simple guide a KID
// can follow (what the place is, who works there, what we do there). Every
// lesson's card twin lives in the flashcards library. THE US/UK/CA PAIRS are
// taught in the open: movie theater/cinema, drugstore/chemist, gas/petrol
// station, dentist's surgery/office, leisure centre/sports center,
// cart/trolley, rubbish/garbage, post box/mailbox, pet store/pet shop,
// aeroplane/airplane — one place, two names, both right. All 28 cards ride
// at their true probed dims (800×1132 portrait) and NO inline styles.
import {lesson as pcLesson} from './flashcards/data-places-in-community.mjs';
import {lpContent as pcLp} from './flashcards/lp-places-in-community.mjs';

export const PC_PATH='/extra-classes/places-in-the-community/';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* The six groups of the tour — headings and blurbs written fresh for the
   class page (never reused from the set page's pillGroups). */
const GROUPS=[
 ['Learn, read & imagine','The places that fill a young mind: the school you already know, the library that lends, the museum that keeps old wonders and the cinema where pictures grow enormous.',['school','library','museum','cinema']],
 ['Safe & cared for','The places that help us: the hospital, the dentist, the pharmacy, and the two stations whose people come running when the town needs them most.',['hospital','dentists-office','pharmacy','fire-station','police-station']],
 ['Food & shopping','Where the town buys and eats: the big supermarket, the bakery that smells like morning, the farmers&rsquo; market, the restaurant and the shop full of whiskers.',['supermarket','bakery','farmers-market','restaurant','pet-shop']],
 ['Around the town','The quiet squares on the map that make everything work: the bank, the post office, the hair salon and the hotel where visitors sleep.',['bank','post-office','hair-salon','hotel']],
 ['Getting around','How the town moves: the gas station that feeds the car, the bus stop, the train station and the airport where the sky begins.',['gas-station','bus-stop','train-station','airport']],
 ['Parks & green places','The town&rsquo;s fresh air: the garden we grow together, the park, the playground, the recycling center, the sports center and the zoo.',['community-garden','park','playground','recycling-center','sports-center','zoo']]
];

export function placesCommunityBody(){
 const base=pcLesson.r2Base;
 const bySlug=Object.fromEntries(pcLesson.cards.map(c=>[c.slug,c]));
 const group=(title,blurb,slugs)=>`<div class="fc-pillgroup"><div class="fc-pillgroup-head"><span class="fc-pill fc-pill-age fc-pill-big">${esc(title)}</span><p class="fc-hint">${esc(blurb)}</p></div><div class="lp-tiles">${slugs.map(s=>{const c=bySlug[s];const l=pcLp[s];return `<a class="lp-tile" href="${PC_PATH}learn/${c.slug}/"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(l.title.replace(/^The | Lesson$/g,'').replace(/&rsquo;/g,'&rsquo;'))}</strong></a>`;}).join('')}</div></div>`;
 return `<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Every place in town — with a lesson on its card.</h2><p class="lesson-copy">The Places in the Community class is a bonus class, kept beside the main learning path like the Kitchen Helper and the Doctor Visit: the regular classes stay the core sequence, and this one is for the days when somebody asks <em>what is that building?</em> Twenty-eight places a town is made of — the library, the fire station, the bakery, the bus stop, the park — each one on its own card, and each card opens a simple lesson a kid can follow: what the place is, who works there, what we do there, step by step, and one way to play it at home tonight.</p><p class="lesson-copy">The places run in tour order on purpose. The learning places come first, because school is the building your child already owns; then the helping places, where doctors, dentists and the two stations keep everyone safe; then the food-and-shopping run; the quiet squares that make a town work; the ways the town moves; and the last group is the fresh air — gardens, parks, playgrounds, the zoo. By the end, the whole map of the town sits in one deck of cards.</p></section>
 <section class="wrap lesson-section" id="the-places"><span class="eyebrow">THE PLACES, SIX WALKS OF TOWN</span><h2>Twenty-eight cards, six kinds of places.</h2><p class="fc-hint">Twenty-eight places in six groups, in the order a real trip across town unfolds. Tap any picture and it opens its own simple lesson — the original card on the left, and the kid-followable guide on the right.</p>
  ${group(...GROUPS[0])}
  ${group(...GROUPS[1])}
  ${group(...GROUPS[2])}
  ${group(...GROUPS[3])}
  ${group(...GROUPS[4])}
  ${group(...GROUPS[5])}
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">THE CLASS GAME</span><h2>The Town Walk: build a street on the floor.</h2><p class="lesson-copy">Stack the cards face down. Draw the top one, place it at the end of a growing "street" across the floor, and say what happens there — <em>at the bakery, I buy bread! At the fire station, the truck sleeps!</em> Card by card the street grows around the room until all twenty-eight places stand in a row, and then comes the best part: walk the whole town, end to end, and greet every stop on the way. Grown-ups walk it too — the losing shoe and the wrong turn are all part of the map.</p></section>
 <section class="wrap lesson-section"><span class="eyebrow">SAME PLACE, TWO NAMES</span><h2>Movie theater and cinema. Both are right.</h2><p class="lesson-copy">Places travel even less than games do — the building never moves, but its name crosses the ocean and changes clothes. This class says so out loud. The <strong>cinema</strong> is the <strong>movie theater</strong>; the <strong>pharmacy</strong> is the <strong>drugstore</strong> or the <strong>chemist&rsquo;s</strong>; the <strong>gas station</strong> sells <strong>petrol</strong> across the ocean; the <strong>dentist&rsquo;s office</strong> is the <strong>dentist&rsquo;s surgery</strong> in the UK; the <strong>sports center</strong> plays as the <strong>leisure centre</strong>; the <strong>shopping cart</strong> is a <strong>trolley</strong>; the <strong>garbage</strong> and <strong>trash</strong> are the <strong>rubbish</strong>; the street box is a <strong>mailbox</strong> or a <strong>post box</strong>; the <strong>pet shop</strong> is a <strong>pet store</strong>; and the <strong>airplane</strong> flies as the <strong>aeroplane</strong>. Whichever your family says, your child hears both — and learns early that places, like words, come in kinds.</p></section>
 <section class="wrap fc-section fc-res"><div class="fc-res-copy"><span class="eyebrow">SUPPORTING RESOURCE</span><h2>Print the places cards.</h2><p class="fc-hint">Every lesson has a matching flashcard in the library: the original artwork as a printable card with a download button and short notes for grown-ups. Keep the deck near the front door — before any errand day, the town is already in your pocket.</p><div class="fc2-actions"><a class="button" href="/flashcards/places-in-the-community/">Open the Places in the Community flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/extra-classes/">Back to Extra Classes <span aria-hidden="true">↗</span></a></div></div><div class="fc-res-art"><img src="${base}cover.webp" width="800" height="1132" alt="Cover of the Places in the Community flashcards set: the words Places in the Community over a little house with a tree." loading="lazy"></div></section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>More classes, more town.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/extra-classes/home-and-daily-life/">Walk through the Home and Daily Life class <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/extra-classes/kids-games/">Play the Kids Games class <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/flashcards/community-helpers-and-our-neighborhood/">Meet the people behind the places <span>· Community helpers set</span> <span aria-hidden="true">↗</span></a></div></section>
 <p class="lesson-note"><strong>Age ranges are a guide, not a test.</strong> Start with the places your child already loves, follow the questions, follow the child — and before any real visit, pull the matching card and read its lesson together: a place that is half-familiar before you arrive is a friend, not a stranger.</p>`;
}
