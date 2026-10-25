// Kiddo School — SCHOOL ROOM · The Art Room: the room page /art-room/, the
// owner's short pages /art-room/<slug>/ (card + the card's activity + back
// link), and the cross-links the owner asked for (2026-10-25): Explore the
// School (/rooms/), the Coloring Pages hub and the Colors extra class point
// here, and this room links back to all three. The hub shows cover.webp
// FIRST, then the 27 cards in file order. Short pages keep the house
// two-home doctrine: the card's ACTIVITY line is quoted verbatim here; the
// teaching words live on the /art-room/learn/ lessons and the library pages
// — no sentence shared between shelves. Owner standing rule (2026-10-24,
// "include these game links in future"): the room body carries games-shelf
// links where they honestly fit — Colour Hunt, Shape Hunt, Shadow Shapes and
// Follow the Leader are all look-and-make games an art room plays.
import {ART_BASE,ART_ORDER,ART_ACTIONS,ART_COVER} from './flashcards/data-art-room.mjs';
import {fcSetBySlug} from './flashcards/index.mjs';

export {ART_ORDER};

export const ART_PATH='/art-room/';
const artSet=fcSetBySlug['art-room'];
if(!artSet)throw Error('art-room: set missing from flashcards SOURCES');
const bySlug=Object.fromEntries(artSet.cards.map(c=>[c.slug,c]));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* Short-page copy: one fresh intro per supply (authored here so the short
   pages and the card pages never drift or repeat). Index by slug. */
const ART_INTRO={
 'chalk':'The outdoor artist\u2019s stick: fat, dusty and impossible to hold wrong. The card keeps it simple — circle sun, square house, triangle roof — and the driveway keeps everything until the next rain.',
 'clay':'The one supply that stands up on its own. Roll a ball, pinch two ears, and the card\u2019s rabbit arrives one squeeze at a time — the oldest art material on Earth, still the best.',
 'colored-pencils':'Crayons that grew up: sharper, quieter, full of side-of-the-lead tricks. Lay one almost flat, sweep, and a flat apple turns round — the card\u2019s whole lesson in one motion.',
 'cotton-balls':'A paintbrush that forgot to be a brush. Dip, dab, lift — the paint lands in puffs, and every puff is a cloud. Two-year-old hands get a win on every single press.',
 'craft-sticks':'Building blocks in disguise. Four sticks and four glue dots turn flat art into standing art — a frame with a picture inside, which is the most motivating cargo there is.',
 'crayon':'Where art begins for most people: no ink, no water, never dries out. The card asks for a colorful picture, and any picture with ten colors on it has earned the word rainbow.',
 'drawing-pad':'The supply that is also a place. Loose pages get lost; a pad keeps the week\u2019s drawings as one growing book — and looking back through it is the first art review anybody takes.',
 'easel':'The furniture that makes a child feel official: paper clipped upright, paint below, both hands free. Standing art dries without smudging, which the family fridge deeply appreciates.',
 'eraser':'The supply that makes second tries free. Draw a shape, rub it away, draw it changed — the same spot gets two ideas, and nobody has to be perfect on the first one.',
 'feathers':'Texture you can hold. Glued onto paper, one feather turns a flat picture into something that flutters when it is picked up — soft on one side, smooth on the other.',
 'glue':'The connective tissue of the whole shelf. Dots, not rivers, and one press-and-wait: the pieces only stay if the hands give them time, which is the first material science any maker learns.',
 'ink':'The only supply that comes from the artist directly. One fingerprint is a stamp the child was born with — press, lift, look at the swirl nobody else has.',
 'markers':'The loud instruments of the drawer: fat lines, deep color, zero pressure. Straight lines hum, zigzags drum, and the cap goes back on with a click that ends every session properly.',
 'paintbrush':'The upgrade that turns coloring into painting. Big sweeps cover the whole page — background first, sky before birds — the same studio order real painters keep.',
 'palette':'The color laboratory. Two old colors, one swirl, and a brand-new color arrives — red plus yellow, blue plus red: chemistry with a thumb hole.',
 'paper-plate':'A face before it is a plate: already round, already smiling-shaped. Eyes up top, nose in the middle, the silliest mouth below — portrait lessons rarely come this friendly.',
 'paper':'The starting material with a superpower: fold it. Two creases make ears, three make it stand — the card\u2019s orange dog began as one flat square, and so does every paper zoo.',
 'pencil':'The quietest, most honest tool: gray lines, easy corrections. An oval, two dots, one curve — and somebody is looking back. Change the mouth and the feeling changes with it.',
 'ribbon':'A line you can bend. Pencil lines imitate curves; ribbon IS one — loops, swoops and zigzags glued where they land, with leftover length for running in the air.',
 'ruler':'The edge that fixes wobbly lines. One hand holds, one hand rides — and the numbers along the side sneak counting into every straight line in the house.',
 'scissors':'The first real machine a child learns to drive: thumb on top, open, close, snip. Fat shapes first, the wavy snake last — steady hands graduate one careful snip at a time.',
 'sponge':'The stamp that fits a whole fist. Dip, press, lift — the same shape marches across the page in rows, and rows of the same shape have a name: pattern.',
 'stamps':'Pictures that repeat themselves. Tap the ink, press down hard, lift straight up — one tool, a whole row of identical stars, and borders grow along every edge of the page.',
 'stencil':'The helper that guarantees the shape. Hold it still, walk the pencil around the edge, lift — a perfect star, made today, with the freehand version arriving on its own later.',
 'stickers':'Art with the hard part removed: the shape is already perfect, the glue is already on. Peel, press, done — and the peeling is the finest finger workout ever disguised as fun.',
 'tape':'The fastener that asks no patience. Rip, press, done — two papers holding hands immediately, and paper chains that end up longer than the builder.',
 'watercolors':'Paint with the volume turned down. More water, softer color: sweep a wet sky across the page, touch color into the wet, and watch it bloom like weather.'
};
if(Object.keys(ART_INTRO).length!==27)throw Error('art-room: expected 27 short-page intros, got '+Object.keys(ART_INTRO).length);
for(const s of ART_ORDER)if(!ART_INTRO[s])throw Error('art-room: no intro for '+s);

/* ---- The /art-room/ room page ------------------------------------------- */
export function artRoomBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">SCHOOL ROOM \u00b7 THE ART ROOM \u00b7 27 CARDS \u00b7 AGES 2\u20135</span><h1>The Art Room — every card carries a thing to make.</h1><p class="lesson-lede">Twenty-seven supplies, twenty-seven activities: draw a picture with shapes, shape a tiny animal, mix two colours together, cut out simple shapes. Every card prints one make-it activity under its name, every supply has its own short page, its own lesson and a printable twin — and the room runs on the youngest rule in the school: make something, make a mess, make it again.</p><div class="lesson-start"><a class="button" href="#the-supplies">Open the supply shelf <span aria-hidden="true">\u2193</span></a><a class="button button-ghost" href="/flashcards/art-room/">The printable set <span aria-hidden="true">\u2197</span></a></div></div><figure class="lesson-cover"><img src="${ART_BASE}${ART_COVER.file}" width="${ART_COVER.w}" height="${ART_COVER.h}" alt="${esc(ART_COVER.alt)}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THIS ROOM WORKS</span><h2>Read the card. Make the thing. Then go deeper.</h2><p class="lesson-copy">Every card in this deck does two jobs: it names one art supply and it prints one activity — a make-it line the card means literally. The short pages on this shelf show each card, quote its activity word for word, and add one way to set the supply up tonight. When one supply becomes a favorite, its <strong>lesson page</strong> carries the full teaching — what the tool is, what the activity secretly trains, the parent script, the questions to ask — and the <strong>library page</strong> holds the printable twin with a download button.</p><p class="lesson-copy">The shelf runs in file order like a real room: the drawing tools first, then the paint and print crew, then the cut-and-stick builders, and the studio furniture at the end. For color work beyond this room, the <a href="/extra-classes/colors/">Colors extra class</a> hunts every shade the house hides, and the <a href="/coloring-pages/">Coloring Pages</a> keep print-and-color days stocked when the paints are still drying from yesterday.</p></section>`;
 const tiles=ART_ORDER.map(s=>{const c=bySlug[s];return `<a class="lp-tile" href="${ART_PATH}${s}/"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong></a>`;}).join('');
 const grid=`<section class="wrap lesson-section" id="the-supplies"><span class="eyebrow">ALL TWENTY-SEVEN SUPPLIES</span><h2>Meet the shelf — cover to watercolors.</h2><p class="fc-hint">Every card in the owner\u2019s file order: chalk, clay, colored pencils and cotton balls open the shelf; crayons, paint, scissors and glue carry the middle; and the studio furniture closes it. Tap any card to open its short page.</p><div class="lp-tiles">${tiles}</div></section>`;
 const games=`<section class="wrap lesson-section"><span class="eyebrow">GAMES THE ART ROOM PLAYS</span><h2>When the glue is drying, play.</h2><p class="lesson-copy">Art time and game time trade places all afternoon, and the school\u2019s <a href="/games/">games shelf</a> holds the rules for the games this room plays best: the <a href="/games/colour-hunt/">Colour Hunt</a> turns the whole house into a color deck, the <a href="/games/shape-hunt/">Shape Hunt</a> finds the shapes chalk pictures are built from, <a href="/games/shadow-shapes/">Shadow Shapes</a> poses drawings against the wall, and <a href="/games/follow-the-leader/">Follow the Leader</a> is a copy-me drawing game with no pencil at all. Full rules on every page — the paint pots can wait.</p></section>`;
 const fit=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where to wander next.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/rooms/">Explore the School — every room, one door each <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/coloring-pages/">Print a Coloring Page for quiet table time <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/extra-classes/colors/">Hunt colors in the Colors extra class <span>· Ages 2–5</span> <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">The Art Room sits on the school\u2019s room shelf beside the Library, the Garden, the Playground and the Music Room. The Colors class is its closest cousin — fifteen spotter sheets for the shades this room paints with — and the Coloring Pages are its quiet corner: bold outlines, one download each, no setup at all.</p></section>`;
 return `${hero}${how}${grid}${games}${fit}<p class="lesson-note"><strong>Making is the curriculum.</strong> Every activity on these cards hides real work — grips, pressure, planning, patience — inside something the child thinks is just today\u2019s craft. Do the thing first; the skills follow the glue.</p>`;
}

/* ---- One short page per supply: card + activity + back link ------------- */
export function artShortBody(slug){
 const c=bySlug[slug];
 if(!c)throw Error('art-room: no card for '+slug);
 const action=ART_ACTIONS[slug];
 return `${crumbArt(c.word)}
 <div class="page-heading wrap"><span class="eyebrow">THE ART ROOM \u00b7 SCHOOL ROOM \u00b7 AGES 2\u20135</span><h1>${esc(c.word)}</h1><p>${ART_INTRO[slug]}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main"><figure class="fc2-hero"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}"><figcaption><strong>The ${esc(c.word)} card</strong><span>Art Activity Flashcards \u00b7 the card\u2019s own activity</span></figcaption></figure>
  <section class="fc2-learn" aria-label="The ${esc(c.word)} card\u2019s activity">
   <div class="fc2-do"><h2>The card\u2019s activity</h2><p class="dino-action">\u201c${esc(action)}\u201d — printed on the card.</p></div>
   <div class="fc2-do"><h2>Make it now</h2><p>Set the supply out and run the card\u2019s activity twice — once slowly, once with full artist confidence. The card is the assignment; the rest of this page is bonus.</p></div>
   <div class="fc2-do fc2-note"><h2>Keep going</h2><p>The ${esc(c.word)} has its own full lesson — what the tool is, what the activity trains, the parent script and the questions to ask — plus a printable card page in the library. Make the thing; the rest follows the favorite.</p></div>
  </section></div>
  <aside class="fc2-rail" aria-label="More art supplies"><section class="fc2-block fc2-first-block"><span class="eyebrow">PART OF THE ART ROOM</span><h2>Twenty-six more supplies.</h2><p class="fc-hint">${esc(c.word)} is one of 27 supplies on the Art Room shelf.</p><a class="button" href="${ART_PATH}">Back to the Art Room <span aria-hidden="true">\u2197</span></a><a class="button button-ghost" href="/art-room/learn/${slug}/">The ${esc(c.word)} lesson <span aria-hidden="true">\u2197</span></a><a class="button button-ghost" href="/flashcards/art-room/${slug}/">Print the card <span aria-hidden="true">\u2197</span></a></section></aside>
 </div>`;
}
function crumbArt(name){return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/rooms/">School Rooms</a><span aria-hidden="true">/</span><a href="${ART_PATH}">Art Room</a><span aria-hidden="true">/</span><span aria-current="page">${esc(name)}</span></nav>`;}

/* ---- Cross-links the owner asked for (2026-10-25) ------------------------ */
/* Appended to the Coloring Pages hub: print-and-color days meet make-it days. */
export const ART_COLORING_LINK=`<section class="wrap lesson-section"><span class="eyebrow">WHEN THE CRAYONS NEED A PROJECT</span><h2>Visit the Art Room.</h2><p class="lesson-copy">Coloring pages are the quiet corner of art time — and the school\u2019s <a href="/art-room/">Art Room</a> is the loud one: twenty-seven supply cards, from crayons to watercolors, each printing its own make-it activity. Draw a picture with shapes, dab paint to make clouds, build a tiny frame — every card comes with a short page, a full lesson and a printable twin, and the deck was made for ages 2\u20135. Print a page here, then let the Art Room tell you what to do with the crayon afterward.</p></section>`;
/* Appended to the Colors extra class: the shades class meets the supply room. */
export const ART_COLORS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">THE ROOM THAT PAINTS WITH THESE COLORS</span><h2>Step into the Art Room.</h2><p class="lesson-copy">The Colors class hunts every shade the house hides — and the school\u2019s <a href="/art-room/">Art Room</a> is where those colors become things: twenty-seven supply cards from crayons to watercolors, each with its own make-it activity. Mix two colors on the palette card, paint a bright background with the brush, dab clouds with cotton balls — every supply has a short page, a full lesson and a printable card, and the whole room rides on ages 2\u20135. Naming colors here, making with them there: the two shelves finish each other.</p></section>`;
