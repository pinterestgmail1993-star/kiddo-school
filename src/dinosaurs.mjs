// Kiddo School — EXTRA CLASS · Dinosaurs: the class page /dinosaurs/, the
// owner's short pages /dinosaurs/<slug>/ (card + the card's action + back
// link), and the cross-links the owner asked for (2026-10-25): Class 36
// (Animals & Their Habitats) and the Animal Categories class point here,
// and both links come back. The hub shows cover.webp FIRST, then the six
// pinned dinosaurs (Tyrannosaurus Rex, Triceratops, Stegosaurus,
// Brachiosaurus, Pterodactyl, Velociraptor), then the remaining 27 in file
// order. Short pages keep the house two-home doctrine: the card's ACTION
// line is quoted verbatim here; the teaching words live on the /learn/
// lessons and the library pages — no sentence shared between shelves.
// Owner standing rule (2026-10-24, "include these game links in future"):
// the class body carries one games-shelf link where it honestly fits — the
// Animal Walks rules page, the deck's own move-like-an-animal game.
import {DINO_BASE,DINO_ORDER,DINO_ACTIONS,DINO_COVER} from './flashcards/data-dinosaurs.mjs';
import {fcSetBySlug} from './flashcards/index.mjs';

export {DINO_ORDER};

export const DINO_PATH='/dinosaurs/';
const dinoSet=fcSetBySlug['dinosaurs'];
if(!dinoSet)throw Error('dinosaurs: set missing from flashcards SOURCES');
const bySlug=Object.fromEntries(dinoSet.cards.map(c=>[c.slug,c]));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* Short-page copy: one fresh intro per dinosaur (authored here so the short
   pages and the card pages never drift or repeat). Index by slug. */
const DINO_INTRO={
 'tyrannosaurus-rex':'The biggest name in the deck, and the card keeps it simple: stand tall, lift one giant foot, and let the floor have it. Everything else on this card — the huge jaw, the tiny arms, the thick tail — waits inside the stomp.',
 'triceratops':'Three horns on one face, and the card asks for all of them at once. Point them forward gently, show the frill behind, and the friendliest defender of the plant eaters is standing in your living room.',
 'stegosaurus':'The plates make the silhouette and the tail makes the game. Swish it slowly, freeze it still — a dinosaur that carries its defense at the very back and its best party trick everywhere.',
 'brachiosaurus':'The tallest card in the deck asks for the tallest stretch. Up on tiptoes, arms to the ceiling, one leaf picked from a treetop nobody else can reach — that is the whole animal, played in one reach.',
 'pterodactyl':'Wings of stretched skin and one long beak: the sky card. Five flaps, then hold the glide, then land soft on a cliff of couch. Every landing counts; the soft ones count double.',
 'velociraptor':'Small, quick and feathered — the real raptor fits a child\u2019s body perfectly. Three fast steps, a freeze, a look around: speed with an off switch, which is the whole hunter.',
 'allosaurus':'The famous hunter of the age before T. rex, with a jaw that swung wider than almost anything. Two giant roars — one for each side of the territory — and then, quietly, the whisper round.',
 'ankylosaurus':'Armor on the outside, club on the tail: the card asks for one slow, heavy swing. Slow is the rule and the joke — nothing about this dinosaur hurries, and nothing needs to.',
 'archaeopteryx':'The half-way card: dinosaur teeth, bird feathers, one animal. Stretch the wings out wide, bow them one at a time, and glide a little — the family resemblance in motion.',
 'baryonyx':'A crocodile snout, a giant thumb claw and a river full of lunch. The card\u2019s game is patience: paw in the water, a three-count wait, then the scoop. Fishing, the dinosaur way.',
 'carnotaurus':'Two horns above the eyes and arms that barely exist: the bull of the hunters. The card asks for poses — fierce, proud, silly — which is the whole bull, minus the charging.',
 'centrosaurus':'One nose horn, a spiky frill, and a herd of thousands behind it. The pose is gentle on purpose: horns up means hello in a herd this size, and hello happens a lot.',
 'ceratosaurus':'A small horn right on the nose and a hunter\u2019s face around it. Tap the nose, make the pose, stomp three steps — the decorated hunter checks its whole territory one pose at a time.',
 'compsognathus':'The littlest card in the deck: a hunter the size of a chicken. Five tiny steps, counted out loud, in any direction — small feet, quick decisions, the whole dinosaur.',
 'corythosaurus':'A half-moon crest on its head that worked like a trumpet. One long call, and the herd answers back — the deck\u2019s loudest card, played at whatever volume the house allows.',
 'deinonychus':'The banana-curved claw made this hunter famous. Quick steps build to a springy jump, claws up, freeze — the sequence that rewrote the dinosaur books, now a living-room routine.',
 'diplodocus':'Neck one way, whip tail the other, and most of a school bus\u2019s length between them. One arm up, one arm back, and the slowest walk in the deck — the bridge dinosaur crosses the room.',
 'euoplocephalus':'Studs on the back, armor on the eyelids, a club low on the tail. The card\u2019s game is the curl: small, tucked, counted — then unfolded into something enormous again.',
 'giganotosaurus':'Maybe the longest meat eater ever found, from the far south. Three giant steps — heel to toe, honestly giant — turn any hallway into a measurement of the huge.',
 'hadrosaurus':'The classic duck bill, cropping plants in small polite bites. Nibble low, nibble middle, nibble high — three heights, three sounds, one very satisfied plant-eater sigh at the end.',
 'iguanodon':'One of the first dinosaurs science ever named, spike on the thumb and all. Reach, strip the branch, munch — and finish with the thumbs-up that puts the spike where it belongs.',
 'maiasaura':'The good-mother dinosaur, proven by fossils of crowded nests. Cuddle the baby, feed the leaves, tuck it in, pat five times — then swap roles, because being cared for is half the game.',
 'microraptor':'Four wings — arms AND legs — and a glide between trees. Fast flaps, a held spread, a soft landing on the next cushion: the smallest flyer in the deck, played full-size.',
 'mosasaurus':'The sea king of the deck — not a dinosaur, and prouder for it. One big swim stroke, a deep dive, a surface for air, and the snap of jaws built for the ancient ocean.',
 'ouranosaurus':'A sail along its back that may have warmed and cooled the whole animal. Arch up, grow it bigger, grow it BIGGEST — then flop flat and grow it again, which is the fun part.',
 'oviraptor':'Named egg thief, cleared by its own fossil: found sitting on its nest, wings over its eggs. The card\u2019s game is the same job — arms around the egg, slow guardian circles, no letting go.',
 'pachycephalosaurus':'A dome of solid bone, ten fingers thick, on the gentlest bumper in the deck. Pat the dome, stand on one leg, boop softly — the softest bump is the boss.',
 'parasaurolophus':'The tube crest that boomed across valleys — a sound scientists rebuilt and played. Forearm crest up, belly breath, one deep honk; the herd answers, then the whisper-honks begin.',
 'plateosaurus':'One of the first long necks, 210 million years back. Pick the knee leaf, the shoulder leaf, the tiptoe leaf — then down on four legs to graze, the same animal in two postures.',
 'quetzalcoatlus':'The biggest flyer that ever lived, on the ground as tall as a giraffe. Three enormous slow flaps, a five-second glide, and the proud walk — giants never hurry.',
 'spinosaurus':'A sail like a door, a snout like a crocodile, and rivers full of fish. Arms up for the sail, swim low, snap three times — the river giant\u2019s whole routine, in order.',
 'styracosaurus':'Six spikes crowning the frill, one horn on the nose: the deck\u2019s bravest look. Fan the spikes, one brave step, hold for three — then the herd shuffles, brave and gentle together.',
 'therizinosaurus':'Claws half a meter long — the record for any animal ever — on a giant that ate leaves. Wave them slow like feather dusters, hook a high branch down, and serve the salad.'
};
if(Object.keys(DINO_INTRO).length!==33)throw Error('dinosaurs: expected 33 short-page intros, got '+Object.keys(DINO_INTRO).length);
for(const s of DINO_ORDER)if(!DINO_INTRO[s])throw Error('dinosaurs: no intro for '+s);

/* ---- The /dinosaurs/ class page ----------------------------------------- */
export function dinosaursClassBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">EXTRA CLASS \u00b7 DINOSAURS \u00b7 33 CARDS \u00b7 AGES 3\u20135</span><h1>The Dinosaurs class — every card carries its own move.</h1><p class="lesson-lede">Thirty-three dinosaurs, thirty-three ways to move: stomp like a T. rex, make three pretend horns, stretch your neck up high, flap and glide. Every card prints one activity under its name, every dinosaur has its own short page, its own lesson and a printable twin — and the deck opens with the six dinosaurs everybody asks for first.</p><div class="lesson-start"><a class="button" href="#the-dinosaurs">Meet the dinosaurs <span aria-hidden="true">\u2193</span></a><a class="button button-ghost" href="/flashcards/dinosaurs/">The printable set <span aria-hidden="true">\u2197</span></a></div></div><figure class="lesson-cover"><img src="${DINO_BASE}${DINO_COVER.file}" width="${DINO_COVER.w}" height="${DINO_COVER.h}" alt="${esc(DINO_COVER.alt)}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Read the card. Do the move. Then go deeper.</h2><p class="lesson-copy">Every card in this deck does two jobs: it names one dinosaur and it prints one activity — an \u201cActivity:\u201d line the card means literally. The short pages on this shelf show each card, quote its action word for word, and add one way to make the move into tonight\u2019s game. When one dinosaur becomes a favorite, its <strong>lesson page</strong> carries the full teaching — what the name means, the facts a grown-up tells, the parent script, the questions to ask — and the <strong>library page</strong> holds the printable twin with a download button.</p><p class="lesson-copy">The deck opens with the six every child asks for first — the famous red hunter, the three-horned one, the plated one, the tall one, the flyer and the quick one — and then walks the rest of the prehistoric world in file order: armored tanks, trumpet-heads, sail-backs, four-winged gliders and the sea king. For the wild side beyond the Cretaceous, the <a href="/preschool/4-years/animals-and-their-habitats/">Animals &amp; Their Habitats class</a> and the <a href="/extra-classes/animal-categories/">Animal Categories class</a> sort today\u2019s animals the same way this deck sorts the ancient ones.</p></section>`;
 const tiles=DINO_ORDER.map(s=>{const c=bySlug[s];return `<a class="lp-tile" href="${DINO_PATH}${s}/"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong></a>`;}).join('');
 const grid=`<section class="wrap lesson-section" id="the-dinosaurs"><span class="eyebrow">ALL THIRTY-THREE DINOSAURS</span><h2>Meet the deck — six favorites first.</h2><p class="fc-hint">Every card in the owner\u2019s order: Tyrannosaurus Rex, Triceratops, Stegosaurus, Brachiosaurus, Pterodactyl and Velociraptor lead the way, then the rest of the prehistoric world. Tap any card to open its short page.</p><div class="lp-tiles">${tiles}</div></section>`;
 const fit=`<section class="wrap lesson-section"><span class="eyebrow">WHERE THIS CLASS FITS</span><h2>Beside the habitat class and the animal families.</h2><p class="lesson-copy">Dinosaurs sit at one end of the animal story. The <a href="/preschool/4-years/animals-and-their-habitats/learn/rabbit-meadow/">Animals &amp; Their Habitats class</a> walks where animals live today — meadow to ocean to ice — and the <a href="/extra-classes/animal-categories/">Animal Categories class</a> sorts every animal family from pets to primates. This deck adds the ancient cast: who the hunters and plant eaters were, and how a body built for one job can become tonight\u2019s game. For more move-like-an-animal play after the deck is done, the <a href="/games/animal-walks/">Animal Walks rules page</a> on the school\u2019s games shelf turns the same idea into a party game.</p></section>`;
 return `${hero}${how}${grid}${fit}<p class="lesson-note"><strong>Dino moves are real learning.</strong> Every stomp, swish and glide on these cards is a body skill in disguise — do the move first, name the facts second, and let the favorite dinosaur pick the order.</p>`;
}

/* ---- One short page per dinosaur: card + action + back link ------------- */
export function dinoShortBody(slug){
 const c=bySlug[slug];
 if(!c)throw Error('dinosaurs: no card for '+slug);
 const action=DINO_ACTIONS[slug];
 return `${crumbDino(c.word)}
 <div class="page-heading wrap"><span class="eyebrow">DINOSAURS \u00b7 EXTRA CLASS \u00b7 AGES 3\u20135</span><h1>${esc(c.word)}</h1><p>${DINO_INTRO[slug]}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main"><figure class="fc2-hero"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}"><figcaption><strong>The ${esc(c.word)} card</strong><span>Dinosaur Flashcards \u00b7 the card\u2019s own action</span></figcaption></figure>
  <section class="fc2-learn" aria-label="The ${esc(c.word)} card\u2019s action">
   <div class="fc2-do"><h2>The card\u2019s action</h2><p class="dino-action">\u201c${esc(action)}\u201d — printed on the card.</p></div>
   <div class="fc2-do"><h2>Do the move now</h2><p>Stand up, do the action once slowly, then once at full dinosaur power. The card is the whole game — everything else on this page is bonus.</p></div>
   <div class="fc2-do fc2-note"><h2>Keep going</h2><p>The ${esc(c.word)} has its own full lesson — the name, the facts, the parent script and the questions to ask — plus a printable card page in the library. Start with the move; the rest follows the favorite.</p></div>
  </section></div>
  <aside class="fc2-rail" aria-label="More dinosaurs"><section class="fc2-block fc2-first-block"><span class="eyebrow">PART OF THE DINOSAURS CLASS</span><h2>Thirty-two cards to go.</h2><p class="fc-hint">${esc(c.word)} is one of 33 dinosaurs in the deck.</p><a class="button" href="${DINO_PATH}">Back to all dinosaurs <span aria-hidden="true">\u2197</span></a><a class="button button-ghost" href="/dinosaurs/learn/${slug}/">The ${esc(c.word)} lesson <span aria-hidden="true">\u2197</span></a><a class="button button-ghost" href="/flashcards/dinosaurs/${slug}/">Print the card <span aria-hidden="true">\u2197</span></a></section></aside>
 </div>`;
}
function crumbDino(name){return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="${DINO_PATH}">Dinosaurs</a><span aria-hidden="true">/</span><span aria-current="page">${esc(name)}</span></nav>`;}

/* ---- Cross-link appended to Class 36 (owner: "Link from Class 36 … and
   link back") ------------------------------------------------------------- */
export const DINO_CLASS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">AFTER THE HABITAT LESSONS</span><h2>Then meet the dinosaurs.</h2><p class="lesson-copy">Class 36 sorts the animals of today by where they live; the school\u2019s <a href="/dinosaurs/">Dinosaurs extra class</a> adds the ancient cast with thirty-three cards a child can move to — stomp like a T. rex, make three pretend horns, glide like a giant flyer. Every card prints its own activity, every dinosaur has a lesson and a printable card, and the deck opens with the six favorites. When today\u2019s habitat lesson ends, let the Cretaceous take the last five minutes.</p></section>`;
