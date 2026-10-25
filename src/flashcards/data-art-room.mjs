// Kiddo School — SCHOOL ROOM · The Art Room: flashcard content. The 27 cards
// are the owner's uploads, verified live on R2 under school/art-room/ (28/28
// objects HTTP 200 image/webp — 27 activity cards + 1 cover — every file
// probed at 800×1131 portrait; the owner uploaded the deck directly into the
// art-room/ folder rather than the brief's school/rooms/art-room/flashcards/,
// so r2Base points at the real location). Filenames are used exactly as
// uploaded — nothing renamed, nothing invented. The cover ("Art Activity
// Flashcards — Create, explore, and have fun" over a red paintbrush, a yellow
// palette, a blue pencil and a glue bottle) fronts the set and is never
// counted as a card. DISPLAY ORDER: cover first, then the 27 cards in file
// order (chalk to watercolors). Every card prints one ACTIVITY line under its
// name; the activity text below is transcribed VERBATIM from the artwork
// (labeled contact sheets, scripts/art-sheets.py) — the deck's own words use
// the card's spelling (colourful, favourite), while every page TITLE uses
// American spelling per the owner's rule (Colored Pencils, Watercolors).
// Three shelves, one deck: the room page /art-room/ hosts the short pages at
// /art-room/<slug>/ (card + the card's activity + back link), the
// /art-room/learn/ lessons (this module's path) carry the step-by-step
// teaching, and the library holds the printable twins at /flashcards/art-room/.
// No text is shared between the three shelves. Owner cross-links (2026-10-25):
// Explore the School (/rooms/), the Coloring Pages hub and the Colors extra
// class point here, and this room links back to all three.
import {R2} from '../adventure-kit.mjs';
import {ART_LIB_A} from './art-lib-a.mjs';
import {ART_LIB_B} from './art-lib-b.mjs';

export const ART_BASE=R2+'school/art-room/';

/* File order, exactly as the owner uploaded them. */
export const ART_ORDER=[
 'chalk','clay','colored-pencils','cotton-balls','craft-sticks','crayon',
 'drawing-pad','easel','eraser','feathers','glue','ink','markers','paintbrush',
 'palette','paper-plate','paper','pencil','ribbon','ruler','scissors','sponge',
 'stamps','stencil','stickers','tape','watercolors'];

/* slug → the card's own ACTIVITY line, transcribed verbatim from the artwork. */
export const ART_ACTIONS={
 'chalk':'Draw a picture with shapes',
 'clay':'Shape a tiny animal',
 'colored-pencils':'Shade a simple object',
 'cotton-balls':'Dab paint to make clouds',
 'craft-sticks':'Build a tiny frame',
 'crayon':'Draw a colourful picture',
 'drawing-pad':'Draw your favourite thing',
 'easel':'Set up your artwork',
 'eraser':'Erase and redraw a shape',
 'feathers':'Glue a colourful texture',
 'glue':'Make a paper collage',
 'ink':'Make a fingerprint picture',
 'markers':'Make bold colourful lines',
 'paintbrush':'Paint a bright background',
 'palette':'Mix two colours together',
 'paper-plate':'Turn it into a funny face',
 'paper':'Fold a simple animal',
 'pencil':'Sketch a simple face',
 'ribbon':'Make a colourful line collage',
 'ruler':'Draw three straight lines',
 'scissors':'Cut out simple shapes',
 'sponge':'Print a repeating pattern',
 'stamps':'Print a row of shapes',
 'stencil':'Trace a simple shape',
 'stickers':'Make a simple picture',
 'tape':'Join two paper shapes',
 'watercolors':'Paint a soft sky'};

export const ART_COVER={file:'cover.webp',w:800,h:1131,
 alt:'Cover of the Art Activity Flashcards set: the words "Art Activity Flashcards — Create, explore, and have fun" over a red paintbrush, a yellow paint palette, a blue pencil and a glue bottle.'};

const CARDS=[
 {slug:'chalk',file:'chalk.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Chalk: a single pink chalk stick lying diagonally, drawn in flat outline style.'},
 {slug:'clay',file:'clay.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Clay: a small purple rabbit shaped from clay, with long ears and a round body.'},
 {slug:'colored-pencils',file:'colored-pencils.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Coloured Pencils: a blue box holding a row of sharpened colored pencils.'},
 {slug:'cotton-balls',file:'cotton-balls.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Cotton Balls: three puffy cloud shapes dabbed out in blue paint.'},
 {slug:'craft-sticks',file:'craft-sticks.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Craft Sticks: a small square frame built from green craft sticks.'},
 {slug:'crayon',file:'crayon.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Crayon: one red-orange crayon standing upright with a paper wrapper around its middle.'},
 {slug:'drawing-pad',file:'drawing-pad.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Drawing Pad: a purple spiral-bound sketch pad with a pencil resting against it.'},
 {slug:'easel',file:'easel.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Easel: an orange wooden easel holding an empty canvas.'},
 {slug:'eraser',file:'eraser.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Eraser: a yellow block eraser with small eraser crumbs beside it.'},
 {slug:'feathers',file:'feathers.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Feathers: one large teal feather lying on its side.'},
 {slug:'glue',file:'glue.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Glue: a purple squeeze bottle of glue with a drop ready at the tip.'},
 {slug:'ink',file:'ink.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Ink: a big pink heart pressed from swirling fingerprint lines.'},
 {slug:'markers',file:'markers.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Markers: three orange markers standing side by side with their caps on.'},
 {slug:'paintbrush',file:'paintbrush.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Paintbrush: a yellow paintbrush with soft bristles pointed down.'},
 {slug:'palette',file:'palette.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Palette: a green painter\u2019s palette with round paint blobs and a thumb hole.'},
 {slug:'paper-plate',file:'paper-plate.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Paper Plate: a pink paper plate seen from above, its rim marked like a sunburst.'},
 {slug:'paper',file:'paper.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Paper: an orange dog folded from one sheet of origami paper.'},
 {slug:'pencil',file:'pencil.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Pencil: a teal pencil sharpened to a point, lying diagonally.'},
 {slug:'ribbon',file:'ribbon.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Ribbon: a bright blue ribbon tied into a bow with two long tails.'},
 {slug:'ruler',file:'ruler.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Ruler: a blue ruler with tick marks, standing on one end.'},
 {slug:'scissors',file:'scissors.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Scissors: a pair of teal scissors standing open, blades up.'},
 {slug:'sponge',file:'sponge.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Sponge: a green wavy sponge covered in little round bubbles.'},
 {slug:'stamps',file:'stamps.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Stamps: a green round stamp printing a row of five stars.'},
 {slug:'stencil',file:'stencil.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Stencil: a blue star-shaped stencil outline, ready to trace.'},
 {slug:'stickers',file:'stickers.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Stickers: an orange six-petal flower sticker with a round center.'},
 {slug:'tape',file:'tape.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Tape: two orange paper squares joined in the middle by a strip of tape.'},
 {slug:'watercolors',file:'watercolors.webp',w:800,h:1131,alt:'An Art Activity flashcard titled Watercolors: a purple watercolor paint box with six round pans and a brush.'}];

/* Guards: file order must hold, every card complete, activities present. */
if(CARDS.length!==27)throw Error('art-room: expected 27 cards, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==ART_ORDER.join('|'))throw Error('art-room: card order does not match ART_ORDER');
for(const c of CARDS){
 if(!ART_ACTIONS[c.slug])throw Error('art-room: missing activity for '+c.slug);
 if(!c.alt||c.alt.length<80)throw Error('art-room: thin alt for '+c.slug);
}

export const lesson={
 r2Base:ART_BASE,
 folder:'',
 path:'/art-room/',
 seoTitle:'Art Activity Flashcards (School Room)',
 cover:{w:800,h:1131},
 cards:CARDS
};

export const meta={
 slug:'art-room',
 name:'Art Room',
 seoTitle:'Art Room for Kids — 27 Art Activity Flashcards with Actions (Ages 2–5)',
 h1:'Art activity flashcards.',
 metaDescription:'Twenty-seven printable art activity flashcards for ages 2–5: crayons, paint, clay, scissors and twenty-three more — every card carries its own make-it activity, an age pill, a short page and a download button. Draw, paint, cut, stick and print your way around the Art Room.',
 lede:'Twenty-seven supplies, twenty-seven things to make with them. Each card names one art-room item — the crayon, the paintbrush, the scissors — and prints one activity under its name: draw a picture with shapes, paint a bright background, cut out simple shapes. Each card page carries the card, its activity and one way to set it up tonight; each item also gets a full lesson and a printable twin in the library. Little hands start with the crayon and the stickers; the studio shelf grows from there.',
 hubBlurb:'Crayons, paint, clay and scissors — twenty-seven art supplies, each with a make-it activity on the card.',
 ageLabel:'2–5 years',
 noun:'Toddlers',
 group:'preschool',
 stageName:null,
 stageHref:null,
 classUrl:'/art-room/',
 classBtn:'Open the Art Room',
 // Lesson-page framing: the Art Room hosts lessons but sits OFF the
 // Learning Path, so its /learn/ pages breadcrumb through School Rooms.
 lessonCrumb:[['School Rooms','/rooms/']],
 lessonEyebrow:'ART ROOM LESSON',
 lessonLine:'room — with every lesson one tap away.',
 pillGroups:[
  ['Draw & color','The tools that make lines and marks: crayons, pencils, markers, chalk and the paper that holds them.',['crayon','colored-pencils','markers','pencil','ink','chalk','drawing-pad','paper']],
  ['Paint & print','The tools that make color spread: brushes, palettes, sponges and the printing crew.',['paintbrush','watercolors','palette','sponge','stamps','cotton-balls']],
  ['Cut, stick & make','The building crew: scissors, glue, tape and all the things they turn into art.',['scissors','glue','tape','paper-plate','craft-sticks','feathers','ribbon','stickers','stencil','clay']],
  ['The studio shelf','The room\u2019s own furniture and fixers: the easel that holds the work, the eraser and the ruler.',['easel','eraser','ruler']]
 ],
 useIdeas:[
  ['One supply, one afternoon','Pick a single card — say, the crayon — and let it run the whole craft time: draw a picture with shapes, trade crayons, draw the same picture with eyes closed. One supply keeps cleanup to one box.'],
  ['Mystery supply bag','Hide three cards in a paper bag, pull one out, name the supply and hunt the house for the real thing. Finding the stapler instead of the tape becomes its own comedy.'],
  ['Activity relay','Deal four cards face down around the table. Everyone moves one seat, turns the card over, and does its activity for five minutes — then the bell rings and the art migrates.'],
  ['Card-memory gallery','After a week of making, lay the used cards out like a gallery and match each artwork to its card. The deck becomes a diary of everything the week made.']
 ],
 downloadHint:'Every card page has its own download button with the full-size image.',
 coverAlt:ART_COVER.alt,
 lessonBlurb:'the Art Room, where every card carries a make-it activity',
 relatedSets:['colors-and-shades','playground']
};

/* Card-page content (WHAT the card is, HOW to run its activity) — authored
   fresh, never shared with the /learn/ lessons or the /art-room/ short
   pages. Split across two modules to keep each file honest to edit. */
export const cards={...ART_LIB_A,...ART_LIB_B};
if(Object.keys(cards).length!==27)throw Error('art-room: expected 27 card copies, got '+Object.keys(cards).length);
