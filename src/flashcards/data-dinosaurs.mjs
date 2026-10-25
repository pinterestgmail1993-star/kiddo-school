// Kiddo School — EXTRA CLASS · Dinosaurs: flashcard content. The 33 cards
// are the owner's uploads, verified live on R2 under
// school/extra-classes/dinosaurs/ (34/34 objects HTTP 200 image/webp — 33
// dinosaur cards + 1 cover — every file probed at 800×1131 portrait; the
// owner uploaded the deck directly into the dinosaurs/ folder, one level
// above the usual flashcards/ subfolder, so r2Base points at the real
// location). Filenames are used exactly as uploaded — nothing renamed,
// nothing invented. The cover ("Dinosaur Flashcards — Move, play, and
// learn" over a purple triceratops, a pink long-neck and a blue
// parasaurolophus) fronts the set and is never counted as a card.
// DISPLAY ORDER is the owner's (2026-10-25): cover first, then six pinned
// dinosaurs — tyrannosaurus-rex, triceratops, stegosaurus, brachiosaurus,
// pterodactyl, velociraptor — then the remaining 27 in file order. Every
// card prints one ACTION line ("Activity: …") under its name; the action
// text below is transcribed VERBATIM from the artwork (labeled contact
// sheets, scripts/dino-sheets.py). Three shelves, one deck: the class page
// /dinosaurs/ hosts the owner's short pages at /dinosaurs/<slug>/ (card +
// the card's action + back link), the /dinosaurs/learn/ lessons (this
// module's path) carry the step-by-step teaching, and the library holds the
// printable twins at /flashcards/dinosaurs/. No text is shared between the
// three shelves. Owner cross-links: Class 36 (Animals & Their Habitats) and
// Animal Categories point here, and this class links back to both; the old
// Animal Categories "Dinosaurs" overview card was retired into this class
// (its two URLs 301 to /dinosaurs/).
import {R2} from '../adventure-kit.mjs';
import {DCARDS_A} from './dino-lib-a.mjs';
import {DCARDS_B} from './dino-lib-b.mjs';

export const DINO_BASE=R2+'school/extra-classes/dinosaurs/';

/* The owner's display order: six pinned, then file order. */
export const DINO_ORDER=[
 'tyrannosaurus-rex','triceratops','stegosaurus','brachiosaurus','pterodactyl','velociraptor',
 'allosaurus','ankylosaurus','archaeopteryx','baryonyx','carnotaurus','centrosaurus','ceratosaurus',
 'compsognathus','corythosaurus','deinonychus','diplodocus','euoplocephalus','giganotosaurus',
 'hadrosaurus','iguanodon','maiasaura','microraptor','mosasaurus','ouranosaurus','oviraptor',
 'pachycephalosaurus','parasaurolophus','plateosaurus','quetzalcoatlus','spinosaurus','styracosaurus',
 'therizinosaurus'];

/* slug → the card's own ACTION line, transcribed verbatim from the artwork. */
export const DINO_ACTIONS={
 'tyrannosaurus-rex':'Stomp like a T. rex',
 'triceratops':'Make three pretend horns',
 'stegosaurus':'Pretend to swish your tail',
 'brachiosaurus':'Reach up high like a Brachiosaurus',
 'pterodactyl':'Flap your arms and glide',
 'velociraptor':'Take three quick dino steps',
 'allosaurus':'Take two giant dino roars',
 'ankylosaurus':'Pretend to swing your club tail',
 'archaeopteryx':'Stretch your wings',
 'baryonyx':'Pretend to catch a fish',
 'carnotaurus':'Make tiny horn poses',
 'centrosaurus':'Make a gentle horn pose',
 'ceratosaurus':'Make a tiny horn pose',
 'compsognathus':'Take five tiny dino steps',
 'corythosaurus':'Pretend to make a trumpet call',
 'deinonychus':'Take quick dino steps',
 'diplodocus':'Stretch your neck up high',
 'euoplocephalus':'Pretend to curl into a ball',
 'giganotosaurus':'Take three giant steps',
 'hadrosaurus':'Pretend to nibble leaves',
 'iguanodon':'Pretend to munch leaves',
 'maiasaura':'Gently care for a baby dino',
 'microraptor':'Flap your little wings',
 'mosasaurus':'Make a big swimming motion',
 'ouranosaurus':'Make a tall back sail',
 'oviraptor':'Pretend to protect an egg',
 'pachycephalosaurus':'Pretend to bump gently',
 'parasaurolophus':'Pretend to make a dino call',
 'plateosaurus':'Reach for the tallest leaves',
 'quetzalcoatlus':'Flap and glide like a giant flyer',
 'spinosaurus':'Make a big sail with your arms',
 'styracosaurus':'Make a brave horn pose',
 'therizinosaurus':'Show your long claws'};

export const DINO_COVER={file:'cover.webp',w:800,h:1131,
 alt:'Cover of the Dinosaurs flashcards set: the words "Dinosaur Flashcards — Move, play, and learn" over a purple triceratops, a pink long-necked dinosaur and a blue parasaurolophus.'};

const CARDS=[
 {slug:'tyrannosaurus-rex',file:'tyrannosaurus-rex.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Tyrannosaurus Rex: a big coral-red hunter with a huge open jaw full of white teeth, tiny front arms and a thick tail.'},
 {slug:'triceratops',file:'triceratops.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Triceratops: a smiling yellow three-horned dinosaur with a big scalloped frill and a sharp beak.'},
 {slug:'stegosaurus',file:'stegosaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Stegosaurus: a green dinosaur with a row of leaf-shaped plates along its back and four spikes at the tip of its tail.'},
 {slug:'brachiosaurus',file:'brachiosaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Brachiosaurus: a blue dinosaur with a very long upright neck reaching high, a small head and a round body on four legs.'},
 {slug:'pterodactyl',file:'pterodactyl.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Pterodactyl: an orange flying reptile in mid-flight with wide pointed wings, a head crest and a long beak.'},
 {slug:'velociraptor',file:'velociraptor.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Velociraptor: a purple running dinosaur with its claws raised and its mouth open in a toothy grin.'},
 {slug:'allosaurus',file:'allosaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Allosaurus: a purple hunter with a wide open mouth of white teeth, a row of spikes down its back and two small front arms.'},
 {slug:'ankylosaurus',file:'ankylosaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Ankylosaurus: a teal armored dinosaur covered in oval studs, its tail raised with a heavy round club at the tip.'},
 {slug:'archaeopteryx',file:'archaeopteryx.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Archaeopteryx: a green feathered dinosaur with both wings spread wide, a long feathered tail and running legs.'},
 {slug:'baryonyx',file:'baryonyx.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Baryonyx: an indigo-blue dinosaur with a long narrow snout, its mouth open wide, and a big claw on one hand.'},
 {slug:'carnotaurus',file:'carnotaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Carnotaurus: an orange-red dinosaur with two horn bumps above its eyes, tiny arms and an open mouth.'},
 {slug:'centrosaurus',file:'centrosaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Centrosaurus: a lime-green dinosaur with a big frill edged in small spikes, a cream beak and one nose horn.'},
 {slug:'ceratosaurus',file:'ceratosaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Ceratosaurus: a deep-pink dinosaur with a small nose horn, a ridged back and an open smiling mouth.'},
 {slug:'compsognathus',file:'compsognathus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Compsognathus: a small teal dinosaur standing on two slim legs with a few spots along its back.'},
 {slug:'corythosaurus',file:'corythosaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Corythosaurus: a bright-blue dinosaur with a rounded crest swept back from the top of its head.'},
 {slug:'deinonychus',file:'deinonychus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Deinonychus: a purple striped dinosaur with a big sickle claw on each foot and its mouth open.'},
 {slug:'diplodocus',file:'diplodocus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Diplodocus: a blue dinosaur with a very long neck, a long whip tail and four sturdy legs.'},
 {slug:'euoplocephalus',file:'euoplocephalus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Euoplocephalus: a green armored dinosaur with a wide studded back and a low club tail.'},
 {slug:'giganotosaurus',file:'giganotosaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Giganotosaurus: a bright-blue giant hunter with a huge head, an open mouth of teeth and a thick tail.'},
 {slug:'hadrosaurus',file:'hadrosaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Hadrosaurus: an orange duck-billed dinosaur standing tall on two legs.'},
 {slug:'iguanodon',file:'iguanodon.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Iguanodon: a light-green dinosaur standing on its hind legs, reaching forward with one hand.'},
 {slug:'maiasaura',file:'maiasaura.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Maiasaura: a mint-green duck-billed dinosaur with a gentle eye and a friendly smile.'},
 {slug:'microraptor',file:'microraptor.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Microraptor: a pink-magenta gliding dinosaur with four spread wings and a long feathered tail.'},
 {slug:'mosasaurus',file:'mosasaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Mosasaurus: a dark-blue sea reptile with long open jaws, four flippers and a shark-like tail.'},
 {slug:'ouranosaurus',file:'ouranosaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Ouranosaurus: a teal dinosaur with a tall rounded sail along its back.'},
 {slug:'oviraptor',file:'oviraptor.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Oviraptor: a light-purple dinosaur with a curved head crest and a fluffy feathered tail.'},
 {slug:'pachycephalosaurus',file:'pachycephalosaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Pachycephalosaurus: a yellow dinosaur with a thick domed head and a bumpy back.'},
 {slug:'parasaurolophus',file:'parasaurolophus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Parasaurolophus: a teal dinosaur with a long tube crest curving back from its head.'},
 {slug:'plateosaurus',file:'plateosaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Plateosaurus: a golden dinosaur with a long neck standing upright, one arm reaching out.'},
 {slug:'quetzalcoatlus',file:'quetzalcoatlus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Quetzalcoatlus: a violet giant flyer with a very long straight beak and huge spread wings.'},
 {slug:'spinosaurus',file:'spinosaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Spinosaurus: a pink-magenta dinosaur with a tall sail on its back and a long crocodile snout.'},
 {slug:'styracosaurus',file:'styracosaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Styracosaurus: an orange dinosaur with a big frill ringed with spikes and one nose horn.'},
 {slug:'therizinosaurus',file:'therizinosaurus.webp',w:800,h:1131,alt:'A Dinosaurs flashcard titled Therizinosaurus: a pink-magenta dinosaur with a small head, a round belly and three very long claws on each hand.'}];

/* Guards: the owner's order must hold, every card complete, actions present. */
if(CARDS.length!==33)throw Error('dinosaurs: expected 33 cards, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==DINO_ORDER.join('|'))throw Error('dinosaurs: card order does not match DINO_ORDER');
for(const c of CARDS){
 if(!DINO_ACTIONS[c.slug])throw Error('dinosaurs: missing action for '+c.slug);
 if(!c.alt||c.alt.length<80)throw Error('dinosaurs: thin alt for '+c.slug);
}

export const lesson={
 r2Base:DINO_BASE,
 folder:'',
 path:'/dinosaurs/',
 seoTitle:'Dinosaurs (Extra Class)',
 cover:{w:800,h:1131},
 cards:CARDS
};

export const meta={
 slug:'dinosaurs',
 name:'Dinosaurs',
 seoTitle:'Dinosaur Flashcards for Kids — 33 Dinosaurs with Move-and-Play Actions (Ages 3–5)',
 h1:'Dinosaur flashcards.',
 metaDescription:'Thirty-three printable dinosaur flashcards for ages 3–5: Tyrannosaurus Rex, Triceratops, Stegosaurus, Brachiosaurus, Pterodactyl, Velociraptor and twenty-seven more — every card carries its own move-and-play action, an age pill, a short page and a download button. Stomp, roar, stretch and glide your way through the whole prehistoric world.',
 lede:'Thirty-three dinosaurs, thirty-three ways to move. Each card names one dinosaur — the famous red hunter, the three-horned friend, the plated one with the swishing tail — and prints one activity under its name: stomp like a T. rex, stretch your neck up high, flap your arms and glide. Each card page carries the card, its action and one way to play it tonight; each dinosaur also gets a full lesson and a printable twin in the library. The deck opens with the six dinosaurs every child asks for first and walks the rest of the prehistoric world from there.',
 hubBlurb:'Thirty-three dinosaurs with a move-and-play action on every card — stomp like a T. rex, glide like a giant flyer, swish your spiked tail.',
 ageLabel:'3–5 years',
 noun:'Dinosaurs',
 group:'preschool',
 stageName:null,
 stageHref:null,
 classUrl:'/dinosaurs/',
 classBtn:'Open the Dinosaurs class',
 lessonCrumb:[['Extra Classes','/extra-classes/']],
 lessonEyebrow:'DINOSAURS LESSON',
 lessonLine:'extra class — every dinosaur card opens its own move-and-play lesson.',
 pillGroups:[
  ['Hunters & chasers','The meat-eating runners: big jaws, quick feet and one giant bite.',['tyrannosaurus-rex','velociraptor','allosaurus','giganotosaurus','ceratosaurus','carnotaurus','baryonyx','deinonychus','compsognathus','spinosaurus']],
  ['Horned, plated & plant eaters','The gentle giants and their armor: long necks, horned frills, back plates, club tails and dome heads.',['triceratops','stegosaurus','brachiosaurus','ankylosaurus','diplodocus','euoplocephalus','iguanodon','hadrosaurus','maiasaura','corythosaurus','parasaurolophus','ouranosaurus','plateosaurus','centrosaurus','styracosaurus','pachycephalosaurus','therizinosaurus','oviraptor']],
  ['Flyers & swimmers','The ones who left the ground and the ones who took to the sea.',['pterodactyl','quetzalcoatlus','microraptor','archaeopteryx','mosasaurus']]
 ],
 useIdeas:[
  ['Dino moves day','Deal five cards face down, turn one over, do its action together, then turn the next. Five minutes later the whole living room has roared, glided and stomped — and nobody noticed it was exercise.'],
  ['Big, bigger, biggest','Line the cards up from smallest to tallest — a five-centimeter Compsognathus to a bus-length Diplodocus. Your child has just built a real size scale without a single worksheet.'],
  ['Roar train','One child picks a card and does its action; everyone else copies and follows behind in a line. When the leader calls another dinosaur, the whole train switches its move.'],
  ['Which one is hiding?','Hold up three cards, name each dinosaur, then turn them face down and slide one away. Which dinosaur is gone? The memory game paleontologists wish they had.'],
  ['Plant eater or hunter?','Sort the deck into two piles by what each dinosaur ate. The toothy ones go left, the leafy ones go right — science sorting, learned with the first sort.']
 ],
 downloadHint:'Every card page has its own download button with the full-size image.',
 coverAlt:DINO_COVER.alt,
 lessonBlurb:'the Dinosaurs extra class, where every card carries its own move-and-play action',
 relatedSets:['animals-and-their-habitats','animal-categories']
};

/* Card-page content (WHAT the card is, HOW to play its action) — authored
   fresh, never shared with the /learn/ lessons or the /dinosaurs/ short
   pages. Split across two modules to keep each file honest to edit. */
export const cards={...DCARDS_A,...DCARDS_B};
if(Object.keys(cards).length!==33)throw Error('dinosaurs: expected 33 card copies, got '+Object.keys(cards).length);
