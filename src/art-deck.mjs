/* Kiddo School — THE ART ROOM SHELF (/art/): the owner's 14 art-supply
   flashcards (R2 bucket kiddo-school-assets/school/art-room/flashcards/,
   probed LIVE 2026-10-31: 14/14 HTTP 200 image/webp — 13 portrait cards at
   800×1131 and ONE landscape card at 800×566, glue-stick-tape-paper, dims
   carried per file so nothing lies). The owner's brief (2026-10-31):
   "include these https://kiddo.school/art/" — the same shape as the Science
   Lab round, and it gets the same answer: ONE shelf family on the existing
   Art Studio page, zero new URLs, zero per-card pages (standing owner rule
   "remember no indiviual pages"). File names ride EXACTLY as uploaded
   (owner: "they are SEO names for Google Image search"). Every card: image
   (loading="lazy" + honest width/height), age/subject/level/skill pills, a
   small kid-directed description under the picture, and Download + Print
   buttons (manners.js per-card print isolation). The craft-knife card wears
   the Ask-a-grown-up badge (standing owner rule from the science round:
   "add ask a grown up... if anything suspicious for kids" — the knife is the
   one grown-up tool in this deck; safety scissors stay kid-safe). Card words
   + alt text are transcribed off labeled contact sheets
   (scripts/art-sheets.py — every card face read, five labeled items per
   card). Levels name school grades (owner rule: "levels are grade 1,
   grade 2, preschool") — Preschool 4 / Grade 1 5 / Grade 2 5, guarded
   below. The deck serves the whole Art Studio range, Ages 3–12 (the room's
   own tagline). Copy talks to kids directly and uses what USA parents
   search (art flashcards, craft supplies, printable art cards); the
   word-ban ("no sign up", "no paywall", "free to use", "no account", "free
   forever") is a lock. The Art Studio stays OUT of the Learning Path (the
   lab rule) — and all fourteen images join the image sitemap on /art/. */
import {R2} from './adventure-kit.mjs';

export const ARTDECK_BASE=R2+'school/art-room/flashcards/';

/* File order, exactly as the owner uploaded them (sorted); the slug is the
   file name minus the shared -flashcard-for-kids suffix. w/h are the probed
   pixel dimensions per file (the landscape card is honest about it). */
export const ARTDECK_ORDER=['beads-craft-wire-pipe-cleaner','canvas-brush-cleaner-masking-tape','cardboard-tissue-paper-foam-sheet','clay-rolling-pin-modeling-tool',
 'colored-paper-cardboard-tube-tissue-paper','crayons-colored-pencils-marker','glue-stick-tape-paper','glue-stick-washi-tape-craft-punch',
 'ink-bottle-dip-pen-charcoal','light-box-tracing-paper-clipboard','paintbrush-paint-palette-paint-tube','scissors-glue-ruler',
 'stamp-ink-pad-brayer','water-cup-sponge-mixing-tray'];

/* slug → word (the lead the tile shows — the card's own first tool, each
   word unique across the deck), w/h (probed), say (the kid-directed line
   under the image — the card's tools worked into one job), badge ('' |
   'grownup'), alt (SEO alt from the verified artwork). Every face read off
   the contact sheets. */
const CARDS=[
 ['beads-craft-wire-pipe-cleaner',800,1131,'Beads','','Beads thread, craft wire bends into a wiggly shape, pipe cleaners fuzz and twist, googly eyes make crafts look silly, and pom-poms are soft little balls of fun. Count how many beads you can thread onto one pipe cleaner!','A Kiddo School art room flashcard titled Beads: five smiling craft supplies — colorful beads ready to be threaded, a spool of craft wire, a fuzzy pipe cleaner, a pair of googly eyes and a fluffy pom-pom, each with its own caption, drawn for kids.'],
 ['canvas-brush-cleaner-masking-tape',800,1131,'Canvas','','A canvas is a blank space waiting for your big idea, brush cleaner keeps brushes fresh, masking tape holds edges still while you paint, a paint smock protects your clothes and binder clips hold papers together. Tape your design first, then paint right over it — peel the tape and see the crisp lines!','A Kiddo School art room flashcard titled Canvas: a smiling blank canvas, a cup of brush cleaner holding a paintbrush, a roll of pink masking tape, a pink paint smock and a binder clip, each with its own caption, drawn for kids.'],
 ['cardboard-tissue-paper-foam-sheet',800,1131,'Cardboard','','Cardboard is strong enough for big crafty ideas, tissue paper is crinkly and light, foam sheets are soft and springy, origami paper folds into new shapes, and the recycling bin gives old paper a fresh chance. What will your cardboard become — a castle, a car or a robot?','A Kiddo School art room flashcard titled Cardboard: a smiling piece of cardboard, colorful tissue paper, stacked green foam sheets, folded origami paper and a green recycling bin, each with its own caption, drawn for kids.'],
 ['clay-rolling-pin-modeling-tool',800,1131,'Clay','','Clay can become almost anything, a rolling pin flattens it with a friendly roll, a modeling tool carves tiny details, a craft mat protects the table and a storage box keeps supplies from playing hide-and-seek. Squish, roll and carve — what will your clay turn into today?','A Kiddo School art room flashcard titled Clay: a smiling ball of yellow clay, a rolling pin, a yellow modeling tool, a checkered craft mat and a yellow storage box, each with its own caption, drawn for kids.'],
 ['colored-paper-cardboard-tube-tissue-paper',800,1131,'Colored Paper','','Colored paper brings bright backgrounds, a cardboard tube is ready to become a clever sculpture, tissue paper is light and crinkly, foam sheets are springy and craft sticks help build tiny structures. Layer your colored paper, then curl the tube into a rocket or a castle tower!','A Kiddo School art room flashcard titled Colored Paper: stacked smiling colored paper, a cardboard tube, crinkly tissue paper, a soft foam sheet and a purple craft stick, each with its own caption, drawn for kids.'],
 ['crayons-colored-pencils-marker',800,1131,'Crayons','','Crayons color boldly without needing a brush, colored pencils draw bright details with a pointy tip, markers make strong easy-to-see marks, a sharpener gives pencils a fresh point and an eraser makes mistakes disappear. Fill a whole page with every color you own — no white left!','A Kiddo School art room flashcard titled Crayons: three purple crayons, three colored pencils, a fat purple marker, a purple sharpener and an eraser, each with its own caption, drawn for kids.'],
 ['glue-stick-tape-paper',800,566,'Glue Stick','grownup','A glue stick adds stickiness, tape holds things in place, paper is the smooth surface for your ideas, the recycling bin keeps the studio clean — and the craft knife cuts paper safely when closed, which makes it a grown-up\u2019s tool. You stick and tape; the knife waits for a grown-up.','A Kiddo School art room flashcard titled Glue Stick: a smiling glue stick, a roll of blue tape, a happy sheet of paper, a closed blue craft knife and a recycling bin, each with its own caption, drawn for kids.'],
 ['glue-stick-washi-tape-craft-punch',800,1131,'Washi Tape','','A glue stick helps paper pieces stick together, washi tape adds color while it holds, a craft punch cuts out a perfect shape, safety scissors snip safely and neatly, and the recycling bin gives old paper a fresh chance. Punch a star, tape it up, and your page turns into a party!','A Kiddo School art room flashcard titled Washi Tape: a green glue stick, a roll of green washi tape, a green craft punch, green safety scissors and a recycling bin, each with its own caption, drawn for kids.'],
 ['ink-bottle-dip-pen-charcoal',800,1131,'Ink Bottle','','An ink bottle holds dark color, a dip pen makes fancy marks when you dip it, charcoal draws soft smoky lines, pastel chalk makes bright soft colors and a blending stump smooths marks with a gentle rub. Dip, draw one fancy swirl, then smudge your charcoal with a finger — magic!','A Kiddo School art room flashcard titled Ink Bottle: a red ink bottle, an orange dip pen, a stick of black charcoal, three pastel chalks and a white blending stump, each with its own caption, drawn for kids.'],
 ['light-box-tracing-paper-clipboard',800,1131,'Light Box','','A light box shines through paper so you can see the lines, tracing paper lets drawings show through, a clipboard keeps artwork steady, a paper clip holds pages in a tiny team and a label maker gives supplies their proper names. Slide your tracing paper on the light box and follow the lines like a road!','A Kiddo School art room flashcard titled Light Box: a smiling pink light box, a sheet of pink tracing paper, a clipboard, a big pink paper clip and a label maker, each with its own caption, drawn for kids.'],
 ['paintbrush-paint-palette-paint-tube',800,1131,'Paintbrush','','A paintbrush makes swishy marks with its bristles, a paint palette hosts a colorful party for paint, a paint tube squeezes out bright ideas, an easel holds artwork up proudly and an apron protects clothes from messy masterpieces. Load your brush, swish three colors onto the palette and name the new one you mixed!','A Kiddo School art room flashcard titled Paintbrush: a teal paintbrush, a paint palette with colorful dots, a paint tube squeezed into a swirl, a smiling easel and a teal apron, each with its own caption, drawn for kids.'],
 ['scissors-glue-ruler',800,1131,'Scissors','','Scissors snip paper into clever shapes, glue helps pieces stick together, a ruler makes lines straight and tidy, a pencil sketches ideas before they grow and a sketchbook keeps all your art ideas safe. Draw it in pencil, measure it with the ruler, cut it out and glue it up!','A Kiddo School art room flashcard titled Scissors: orange scissors, a bottle of glue, an orange ruler, an orange pencil and a spiral sketchbook, each with its own caption, drawn for kids.'],
 ['stamp-ink-pad-brayer',800,1131,'Stamp','','A stamp prints a picture when you press it down, an ink pad gives stamps their colorful mark, a brayer rolls ink smoothly across a surface, a printing plate holds the design and a drying rack keeps wet artwork safe while it dries. Press, lift, wow — then print a whole row of them!','A Kiddo School art room flashcard titled Stamp: a teal stamp, an ink pad, a teal brayer roller, a printing plate and a drying rack with papers, each with its own caption, drawn for kids.'],
 ['water-cup-sponge-mixing-tray',800,1131,'Water Cup','','A water cup gives paintbrushes a refreshing bath, a sponge soaks up spills like a tiny hero, a mixing tray helps colors meet and make new friends, a paint roller spreads color in one big roll and a spray bottle gives paper a gentle mist. Rinse your brush between colors — then mix your very own brand-new color!','A Kiddo School art room flashcard titled Water Cup: a white water cup, a pink sponge, a mixing tray with colorful paint dots, a pink paint roller and a pink spray bottle, each with its own caption, drawn for kids.'],
].map(([slug,w,h,word,badge,say,alt])=>({slug,file:slug+'-flashcard-for-kids.webp',pageSlug:slug,w,h,word,badge,say,alt}));

/* Guards: exactly the owner's 14 cards in file order, every entry complete,
   all unique, all words unique, the one landscape card honest. */
if(CARDS.length!==14)throw Error('art-deck: expected 14 cards, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==ARTDECK_ORDER.join('|'))throw Error('art-deck: card order does not match ARTDECK_ORDER');
if(new Set(CARDS.map(c=>c.word)).size!==14)throw Error('art-deck: card words must be unique');
if(CARDS.filter(c=>c.h!==1131).map(c=>c.slug).join('|')!=='glue-stick-tape-paper')throw Error('art-deck: only the landscape card may differ from 800x1131');
for(const c of CARDS){
 if(!c.file.endsWith('-flashcard-for-kids.webp'))throw Error('art-deck: SEO file name broken for '+c.slug);
 if(c.alt.length<80)throw Error('art-deck: thin alt for '+c.slug);
 if(c.say.length<60)throw Error('art-deck: thin say for '+c.slug);
 if(!['','grownup'].includes(c.badge))throw Error('art-deck: bad badge for '+c.slug);
}

export const ARTDECK_CARDS=CARDS;
export const artdeckBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));

/* Four shelves, in the order a craft session really runs: the marks first,
   then the paint, then the sticking, then the building and printing to
   finish. Covering the deck exactly once, guarded. */
export const ARTDECK_SHELVES=[
 {id:'draw',label:'THE DRAW &amp; COLOR SHELF \u00b7 3 CARDS',h2:'Tools that make marks.',
  sub:'Drawing',
  hint:'Art flashcards for the mark-makers: crayons, colored pencils and markers, ink and charcoal, and the light box that turns tracing into a game — the drawing supplies kids reach for first, drawn smiling and labeled for little artists.',
  slugs:['crayons-colored-pencils-marker','ink-bottle-dip-pen-charcoal','light-box-tracing-paper-clipboard']},
 {id:'paint',label:'THE PAINT &amp; MIX SHELF \u00b7 3 CARDS',h2:'Brushes, paint and a little water.',
  sub:'Painting',
  hint:'Painting flashcards for kids: the brush and palette, the water cup and sponge that run the paint session, and the canvas with its tape-and-smock setup — everything a kitchen-table studio needs.',
  slugs:['paintbrush-paint-palette-paint-tube','water-cup-sponge-mixing-tray','canvas-brush-cleaner-masking-tape']},
 {id:'stick',label:'THE CUT, GLUE &amp; TAPE SHELF \u00b7 4 CARDS',h2:'Paper craft, held together.',
  sub:'Paper craft',
  hint:'Cutting and sticking flashcards: safety scissors and glue, washi tape and craft punches, colored paper and craft sticks — and one honest rule card: the craft knife is a grown-up\u2019s tool, closed until a grown-up picks it up.',
  slugs:['scissors-glue-ruler','glue-stick-tape-paper','glue-stick-washi-tape-craft-punch','colored-paper-cardboard-tube-tissue-paper']},
 {id:'build',label:'THE BUILD, SHAPE &amp; PRINT SHELF \u00b7 4 CARDS',h2:'Make it stand, squish it, print it.',
  sub:'Building & prints',
  hint:'Building and printmaking flashcards: cardboard and foam for big ideas, clay with its rolling pin, beads and pipe cleaners for tiny fingers, and the stamp-and-ink print shop — the shelf where a craft becomes a keepsake.',
  slugs:['cardboard-tissue-paper-foam-sheet','clay-rolling-pin-modeling-tool','beads-craft-wire-pipe-cleaner','stamp-ink-pad-brayer']}];
{
 const shelved=ARTDECK_SHELVES.flatMap(s=>s.slugs).sort().join('|');
 if(shelved!==ARTDECK_ORDER.slice().sort().join('|'))throw Error('art-deck: shelves must cover the deck exactly once');
}

/* Level pills name school grades (owner 2026-10-31): Preschool = name it (4),
   Grade 1 = try it (5), Grade 2 = make it (5). 4/5/5 guarded. */
const ARTDECK_LEVEL={
 1:['beads-craft-wire-pipe-cleaner','crayons-colored-pencils-marker','paintbrush-paint-palette-paint-tube','scissors-glue-ruler'],
 2:['cardboard-tissue-paper-foam-sheet','colored-paper-cardboard-tube-tissue-paper','glue-stick-washi-tape-craft-punch','stamp-ink-pad-brayer','water-cup-sponge-mixing-tray'],
 3:['canvas-brush-cleaner-masking-tape','clay-rolling-pin-modeling-tool','glue-stick-tape-paper','ink-bottle-dip-pen-charcoal','light-box-tracing-paper-clipboard']};
const ARTDECK_LEVEL_OF=Object.fromEntries([1,2,3].flatMap(l=>ARTDECK_LEVEL[l].map(s=>[s,l])));
const ARTDECK_LEVEL_NAMES={1:'Preschool \u00b7 Name it',2:'Grade 1 \u00b7 Try it',3:'Grade 2 \u00b7 Make it'};
const ARTDECK_LEVEL_BLURB={
 1:'the four first tools — crayons, a paintbrush, safety scissors and beads to thread — the supplies a three-year-old names before kindergarten starts',
 2:'the five trying cards — collage paper, foam and tubes, the glue-stick and punch crew, stamps and the water-cup paint session',
 3:'the five making cards — ink and dip pens, the light box, the tape-resist canvas, clay with its tools, and the one honest knife card'};
const ARTDECK_LEVEL_COUNTS=Object.fromEntries([1,2,3].map(l=>[l,ARTDECK_LEVEL[l].length]));
if(ARTDECK_LEVEL_COUNTS[1]!==4||ARTDECK_LEVEL_COUNTS[2]!==5||ARTDECK_LEVEL_COUNTS[3]!==5)throw Error('art-deck: level sizes drifted '+JSON.stringify(ARTDECK_LEVEL_COUNTS));

/* Skill pill per card (owner: "age, skill if any, level pill, subject pill"). */
const ARTDECK_SKILL={
 'beads-craft-wire-pipe-cleaner':'Threading','canvas-brush-cleaner-masking-tape':'Tape resist',
 'cardboard-tissue-paper-foam-sheet':'Building','clay-rolling-pin-modeling-tool':'Sculpting',
 'colored-paper-cardboard-tube-tissue-paper':'Collage','crayons-colored-pencils-marker':'Coloring',
 'glue-stick-tape-paper':'Sticking','glue-stick-washi-tape-craft-punch':'Shape punching',
 'ink-bottle-dip-pen-charcoal':'Ink drawing','light-box-tracing-paper-clipboard':'Tracing',
 'paintbrush-paint-palette-paint-tube':'Painting','scissors-glue-ruler':'Cutting',
 'stamp-ink-pad-brayer':'Printmaking','water-cup-sponge-mixing-tray':'Color mixing'};
const ARTDECK_SHELF_BY_SLUG=Object.fromEntries(ARTDECK_SHELVES.flatMap(sh=>sh.slugs.map(s=>[s,sh])));
for(const c of CARDS){if(!ARTDECK_SKILL[c.slug])throw Error('art-deck: missing skill for '+c.slug);if(!ARTDECK_LEVEL_OF[c.slug])throw Error('art-deck: missing level for '+c.slug);}

const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

function artTile(c){
 const badge=c.badge==='grownup'?'<span class="mn-grownup">Ask a grown-up</span>':'';
 const pills=`<span class="fc-pillrow"><span class="fc-pill fc-pill-age">Ages 3\u201312</span><span class="fc-pill fc-pill-subject">${esc(ARTDECK_SHELF_BY_SLUG[c.slug].sub)}</span><span class="fc-pill fc-pill-level">${ARTDECK_LEVEL_NAMES[ARTDECK_LEVEL_OF[c.slug]]}</span><span class="fc-pill fc-pill-skill">${esc(ARTDECK_SKILL[c.slug])}</span></span>`;
 return `<figure class="mn-card"><img src="${ARTDECK_BASE}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong>${badge}${pills}<figcaption class="mn-tip">${esc(c.say)}</figcaption><div class="mn-actions"><a class="button" href="${ARTDECK_BASE}${c.file}" download="${c.pageSlug}.webp">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}

/* The shelf family appended to the Art Studio page (/art/), after the
   hands-on activity cards: an intro, the four shelves, and the how-to. NOT
   in the Learning Path (the Science Lab rule) — the studio is a room. */
export function artDeckSection(){
 const intro=`<section class="wrap lesson-section" id="art-shelf"><span class="eyebrow">THE ART ROOM SHELF \u00b7 14 FLASHCARDS</span><h2>Fourteen art-supply flashcards to download and print.</h2><p class="fc-hint">Every card names five real art supplies, drawn smiling and labeled for kids — from crayons and paintbrushes to clay tools, the light box and the print shop. Download takes the full-size card; Print runs just that one card through the printer. The pills answer one glance: the age, the subject, the grade level, the skill it builds — and the craft-knife card wears the Ask-a-grown-up badge, because that tool stays a grown-up\u2019s job.</p></section>`;
 const decks=ARTDECK_SHELVES.map(sh=>`<section class="wrap lesson-section" id="art-${sh.id}"><span class="eyebrow">${sh.label}</span><h2>${sh.h2}</h2><p class="fc-hint">${sh.hint} Download takes the full-size card; Print runs just that one card through the printer. Every pill answers one question: the age, the subject, the grade level, the skill it builds.</p><div class="mn-cards">${sh.slugs.map(s=>artTile(artdeckBySlug[s])).join('')}</div></section>`).join('');
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW TO USE THE ART CARDS</span><h2>Name the tool, then hand it over.</h2><p class="lesson-copy">Pick one card and name all five supplies out loud — the glue stick wants to be called by name. Then give the tool a job: crayons fill a page with color, scissors snip a zigzag, the light box traces a straight road. Print the card and tape it where the making happens, so tomorrow\u2019s artist knows exactly where the supplies live. The studio runs on one big rule — the Ask-a-grown-up badge: everything else on this shelf is yours, and the craft knife waits.</p></section>`;
 return `${intro}${decks}${how}`;
}
