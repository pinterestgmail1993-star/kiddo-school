/* Kiddo School — the NATURE CLUB flashcard deck joins the Nature Club room
   at /nature/ (owner 2026-11-01: "and this is nature club flashcards include
   in this page: https://kiddo.school/nature/"). The Science-Lab treatment,
   same as /science/ and /art/: ONE shelf family on the existing page, zero
   new URLs. The deck was probed LIVE on R2 on 2026-11-01: 41/41 files HTTP
   200 image/webp at school/nature-club/flashcards/ — every file exactly
   800×1132, 38–84 kB — file names ride EXACTLY as uploaded (owner: "they are
   SEO names for Google Image search"); no cover came with this deck (the
   room's own covers keep leading), and card titles + alt text were
   transcribed verbatim off the artwork via 6 labeled contact sheets
   (scripts/pd44-sheets.py — every card face read: the intro line, the word,
   and all five labeled scenes per card). Every card is a full mn-card tile:
   image (loading="lazy" + honest probed width/height), word, FOUR pills
   (Ages 3–8 · subject · Preschool/Grade 1/Grade 2 · skill), a unique
   kid-directed description under the picture, and Download + Print buttons
   (manners.js per-card print isolation — /nature/ now ships the script).
   All forty-one images ride the /nature/ sitemap entry as an array (Google's
   documented multi-image-per-url format, the /art/ precedent). Copy uses
   what USA parents search (nature flashcards printable, plants and animals
   for kids, insect flashcards) and talks to kids directly; the owner's
   word-ban is a lock. NOT in the Learning Path (the lab rule) — no class
   number, the count stays forty-four. */
import {R2} from './adventure-kit.mjs';

export const NAT_BASE=R2+'school/nature-club/flashcards/';

/* File order, exactly as the owner uploaded them (sorted). */
export const NAT_ORDER=['acorn-plant','bamboo-plant','bee-insect','bird-animal','butterfly-insect',
 'cactus-plant','cloud-weather','coconut-plant','deer-animal','dragonfly-insect','fern-plant',
 'firefly-insect','flower-plant','fox-animal','frog-animal','frozen-lake-nature','hedgehog-animal',
 'ladybug-insect','leaf-plant','maple-leaf-plant','moss-plant','mountain-nature','mushroom-nature',
 'ocean-nature','otter-animal','penguin-animal','pinecone-plant','puddle-weather','rabbit-animal',
 'rainbow-weather','rainforest-nature','river-nature','sea-turtle-animal','seed-plant','snail-animal',
 'sunflower-plant','sunset-sky','tree-plant','volcano-nature','waterfall-nature','whale-animal'];

const W=800,H=1132;
/* slug → word (the card's printed lead), sub (subject pill), say (the
   description under the image — kid-directed, one job), alt (SEO alt from
   the verified artwork). Every face read off the contact sheets. */
const CARDS=[
 ['acorn-plant','Acorn','Plants','An acorn is the seed of an oak tree, wearing a little cap. Squirrels collect them for winter food — and the ones they forget can grow into a whole new oak. Find an acorn cap and see if it fits your fingertip!','A Kiddo School Nature Club card titled Acorn: the word Acorn with five labeled scenes — Little cap, Smooth nut, Oak tree, Forest floor and Squirrel snack.'],
 ['bamboo-plant','Bamboo','Plants','Bamboo is a grass that grows taller than a house, with hollow stems pandas love to munch. Some bamboo grows so fast you could almost watch it! Stretch up tall like a bamboo stalk — how straight can you stand?','A Kiddo School Nature Club card titled Bamboo: the word Bamboo with five labeled scenes — Hollow stem, Green leaves, Fast growth, Panda snack and Tall stalk.'],
 ['bee-insect','Bee','Bugs','A bee visits flowers to collect nectar and pollen, carrying pollen from one flower to the next so plants can make seeds and fruit. Bees live together and make honey. Bee kind today — do one helpful job, just like a bee!','A Kiddo School Nature Club card titled Bee: the word Bee with five labeled scenes — Stripy body, Busy wings, Flower visit, Honeycomb and Pollen basket.'],
 ['bird-animal','Bird','Animals','A bird has feathers, wings and a beak, and most birds build nests and lay eggs. Some fly fast, some sing, and each one has its own way of moving. Listen outside — how many different bird songs can you count?','A Kiddo School Nature Club card titled Bird: the word Bird with five labeled scenes — Feather coat, Pointy beak, Flappy wings, Bird nest and Happy song.'],
 ['butterfly-insect','Butterfly','Bugs','A butterfly begins as a tiny egg, hatches into a hungry caterpillar, then rests inside a chrysalis and comes out with beautiful wings. A whole new body, one card! Act out the butterfly life cycle: curl up small, then burst out with flappy wings.','A Kiddo School Nature Club card titled Butterfly: the word Butterfly with five labeled scenes — Tiny egg, Hungry caterpillar, Cocoon, Bright wings and Flower snack.'],
 ['cactus-plant','Cactus','Plants','A cactus lives in the hot desert and stores water inside its thick green body. Its waxy skin and spines keep the water safe. Blow on your hands like you are warming a tiny desert — cactus weather!','A Kiddo School Nature Club card titled Cactus: the word Cactus with five labeled scenes — Spiky skin, Water store, Pink flower, Desert sun and Tough plant.'],
 ['cloud-weather','Cloud','Sky & weather','A cloud is made of tiny water drops floating high in the sky. Warm air carries them up, where they gather into shapes — some bring rain, some just drift by. Lie on your back and find an animal shape in the clouds!','A Kiddo School Nature Club card titled Cloud: the word Cloud with five labeled scenes — Water drops, Fluffy shape, Wind ride, Rain cloud and Silly face.'],
 ['coconut-plant','Coconut','Plants','A coconut grows on a tall palm tree in warm places. Its hard shell protects the white flesh and sweet water inside, and palm trees wave across the beach shore. Pretend to climb a palm tree — what can you see from the top?','A Kiddo School Nature Club card titled Coconut: the word Coconut with five labeled scenes — Palm tree, Hard shell, White flesh, Coconut water and Tropical beach.'],
 ['deer-animal','Deer','Animals','A deer lives in forests and grasslands and uses strong legs to run and jump. Deer eat leaves, grass and fruit, and the antlers can fall off and grow again. Take the quietest deer steps you can — soft, slow, listening.','A Kiddo School Nature Club card titled Deer: the word Deer with five labeled scenes — Soft fur, Pointy ears, Branching antlers, Forest path and Leaf snack.'],
 ['dragonfly-insect','Dragonfly','Bugs','A dragonfly has a long body, big eyes and four clear wings, and it can fly forward, backward and sideways — a tiny helicopter! It hunts tiny insects near ponds and streams. Hover around the room like a dragonfly: quick zips and sudden stops.','A Kiddo School Nature Club card titled Dragonfly: the word Dragonfly with five labeled scenes — Shiny wings, Big eyes, Water home, Tiny legs and Fast flyer.'],
 ['fern-plant','Fern','Plants','A fern is a leafy plant that loves cool, damp, shady spots. Instead of flowers it spreads tiny spores, and new leaves start as curled shapes that slowly open. Curl your arms in like a fiddlehead, then unfurl slowly — be a fern!','A Kiddo School Nature Club card titled Fern: the word Fern with five labeled scenes — Curly frond, Green leaf, Tiny spores, Damp shade and Forest floor.'],
 ['firefly-insect','Firefly','Bugs','A firefly is a small beetle that makes light in its body and blinks signals to its friends at night — fireflies talk with their own twinkly lights. When the room gets dark tonight, blink like a firefly: on, off, on, off!','A Kiddo School Nature Club card titled Firefly: the word Firefly with five labeled scenes — Glowing tail, Tiny wings, Night sky, Long grass and Blinking light.'],
 ['flower-plant','Flower','Plants','A flower is the colorful part of many plants. Its petals attract bees and butterflies, and flowers turn sunlight, water and air into growth — then make seeds. Smell the nearest flower or fruit and give it a compliment!','A Kiddo School Nature Club card titled Flower: the word Flower with five labeled scenes — Soft petals, Green stem, Flower scent, Busy bee and Tiny pollen.'],
 ['fox-animal','Fox','Animals','A fox is a clever mammal with a busy tail, pointy ears and sharp senses. Foxes live in forests, mountains and even towns, and at night they use their noses to find food. Prowl like a fox on your night walk — soft paws, sharp eyes!','A Kiddo School Nature Club card titled Fox: the word Fox with five labeled scenes — Fluffy tail, Pointy ears, Warm fur, Forest home and Night walk.'],
 ['frog-animal','Frog','Animals','A frog is an amphibian — at home in water and on land — with big eyes and a sticky tongue for catching insects. Frogs begin life as tadpoles and grow legs as they change. Crouch and do three frog hops: croak included!','A Kiddo School Nature Club card titled Frog: the word Frog with five labeled scenes — Big eyes, Sticky tongue, Webbed feet, Lily pad and Hoppy jump.'],
 ['frozen-lake-nature','Frozen Lake','Wild places','A lake can freeze when the weather turns cold enough — its surface becomes ice that may cover the top while water stays underneath, and fish wait out the winter below. When the weather warms, the ice melts and the lake sparkles again. Float one flat hand over the other — ice above, water below!','A Kiddo School Nature Club card titled Frozen Lake: the words Frozen Lake with five labeled scenes — Icy surface, Cold water, Snowy edge, Winter bird and Melting drops.'],
 ['hedgehog-animal','Hedgehog','Animals','A hedgehog is a small mammal covered in stiff spines that help protect it. It snuffles for insects and worms and can curl into a tight, prickly ball. Curl up small like a hedgehog, then unroll and snuffle three times!','A Kiddo School Nature Club card titled Hedgehog: the word Hedgehog with five labeled scenes — Pointy spines, Tiny nose, Round body, Leaf nest and Night walk.'],
 ['ladybug-insect','Ladybug','Bugs','A ladybug is a small beetle with a round red-and-black body. Ladybugs help gardens by eating tiny pests, and they crawl, fly and hide under leaves. Count the spots you would paint on your own ladybug — then check the garden for a real one!','A Kiddo School Nature Club card titled Ladybug: the word Ladybug with five labeled scenes — Red shell, Black spots, Tiny legs, Leaf home and Aphid snack.'],
 ['leaf-plant','Leaf','Plants','A leaf is the plant part that makes food using sunlight, water and air — like a little solar kitchen. Leaves can be smooth, pointy, round or fuzzy, and they may change color in autumn. Catch a falling leaf this autumn and check its veins with a magnifier!','A Kiddo School Nature Club card titled Leaf: the word Leaf with five labeled scenes — Green shape, Leaf veins, Sunlight, Fresh air and Leaf bug.'],
 ['maple-leaf-plant','Maple Leaf','Plants','A maple leaf grows on a maple tree with several pointy sections called lobes. In autumn the green stops and the leaf can turn yellow, orange or red before falling. What color would YOUR autumn maple leaf be? Draw it!','A Kiddo School Nature Club card titled Maple Leaf: the words Maple Leaf with five labeled scenes — Pointy lobes, Leaf veins, Green summer, Red autumn and Tree branch.'],
 ['moss-plant','Moss','Plants','Moss is a small green plant that grows in damp, shady places, covering rocks, soil and fallen logs with a soft carpet. Its tiny parts help it soak up water. Pat the ground outside — you might find a moss cushion softer than any pillow!','A Kiddo School Nature Club card titled Moss: the word Moss with five labeled scenes — Soft green carpet, Damp rock, Tiny stems, Shady home and Forest floor.'],
 ['mountain-nature','Mountain','Wild places','A mountain is a very high part of the land, with rocky sides, snowy tops and windy peaks. Mountain goats are built to climb steep ground, and from far away a mountain looks like Earth wearing a giant pointy hat. Build a mountain of pillows and climb it gently!','A Kiddo School Nature Club card titled Mountain: the word Mountain with five labeled scenes — Pointy peak, Rocky side, Snow cap, Mountain goat and Cloudy top.'],
 ['mushroom-nature','Mushroom','Wild places','A mushroom is a fungus, not a plant, growing in damp soil or on fallen wood, and its cap releases tiny spores. Wild mushrooms can be poisonous — children should never touch or eat one without an adult\u2019s help. Look for mushrooms on your next walk and just look — a photographer\u2019s hunt!','A Kiddo School Nature Club card titled Mushroom: the word Mushroom with five labeled scenes — Round cap, Short stem, Forest floor, Tiny spores and Damp hideout.'],
 ['ocean-nature','Ocean','Wild places','The ocean is a huge body of salty water covering much of Earth, home to fish, turtles, whales, crabs and sea plants. Waves move when wind pushes the water, and sunlight helps plants grow near the surface. Float like a whale, then snap like a crab — the ocean\u2019s whole neighborhood in one game!','A Kiddo School Nature Club card titled Ocean: the word Ocean with five labeled scenes — Wavy water, Silly fish, Coral home, Seaweed and Bubbly air.'],
 ['otter-animal','Otter','Animals','An otter is a playful mammal that lives in rivers, lakes, wetlands and oceans. Its thick fur keeps it warm, its webbed feet help it swim, and it floats on its back while eating. Lie back and float like an otter — belly up, snacking!','A Kiddo School Nature Club card titled Otter: the word Otter with five labeled scenes — Thick fur, Webbed paws, River home, Floating back and Shell snack.'],
 ['penguin-animal','Penguin','Animals','A penguin is a bird that cannot fly through the air, but its wings work like flippers and it swims like a champion. Penguins live mostly in cold southern places, and their waddle is a funny way to travel. Waddle across the room with your heels together — penguin parade!','A Kiddo School Nature Club card titled Penguin: the word Penguin with five labeled scenes — Black feathers, White belly, Flappy wings, Icy home and Waddly walk.'],
 ['pinecone-plant','Pinecone','Plants','A pinecone grows on a pine tree and protects tiny seeds inside its scales. When the cone dries, its scales open and the seeds spread — and squirrels collect the cones. Open your hands slowly like a pinecone waking up, then close tight — now let the seeds go!','A Kiddo School Nature Club card titled Pinecone: the word Pinecone with five labeled scenes — Wooden scales, Pine tree, Tiny seeds, Forest floor and Squirrel snack.'],
 ['puddle-weather','Puddle','Sky & weather','A puddle is a small pool of water that forms when rain collects on the ground. Puddles reflect the sky, become homes for tiny creatures for a short time, and slowly evaporate back into the air. Stomp ONE careful puddle-jump next rainy day — then watch the ripples settle!','A Kiddo School Nature Club card titled Puddle: the word Puddle with five labeled scenes — Rainwater, Shiny surface, Tiny splash, Worm friend and Cloud reflection.'],
 ['rabbit-animal','Rabbit','Animals','A rabbit is a small mammal with long ears, soft fur and strong back legs for hopping quickly away from danger. Rabbits dig burrows for shelter and eat plants like grass and leaves. Do three silent rabbit hops, then freeze with your long ears listening!','A Kiddo School Nature Club card titled Rabbit: the word Rabbit with five labeled scenes — Floppy ears, Soft fur, Strong legs, Burrow home and Carrot snack.'],
 ['rainbow-weather','Rainbow','Sky & weather','A rainbow appears when sunlight shines through raindrops in the air — the light spreads into many colors. You often see one after rain when the sun comes out. Paint a rainbow with your arms: big sweeping arcs, every color you know!','A Kiddo School Nature Club card titled Rainbow: the word Rainbow with five labeled scenes — Sunlight, Raindrops, Red band, Blue band and Rainbow smile.'],
 ['rainforest-nature','Rainforest','Wild places','A rainforest is a warm, wet forest with lots of rain and many different plants and animals — tall trees, monkeys, insects and birds in layers, like a giant green apartment building. Rainforests make oxygen and store carbon for the whole planet. Climb the layers: forest floor, up the trunk, out on a branch — where does your monkey live?','A Kiddo School Nature Club card titled Rainforest: the word Rainforest with five labeled scenes — Tall trees, Rainy leaves, Monkey friend, Vine swing and Forest layers.'],
 ['river-nature','River','Wild places','A river is flowing water moving across the land, beginning in hills or mountains and traveling toward a lake, sea or ocean. Rivers give water to plants, animals and people — home for fish and a highway for boats. Swoosh your arms like river water from one side of the room to the other — no dry spots!','A Kiddo School Nature Club card titled River: the word River with five labeled scenes — Moving water, Riverbank, Smooth stone, Fish home and Bridge.'],
 ['sea-turtle-animal','Sea Turtle','Animals','A sea turtle is a reptile that lives mostly in the ocean. Its hard shell protects its body, its flippers swim long distances, and females return to sandy beaches to lay their eggs. Flap your flippers slowly — sea turtles never rush, and they still cross the whole ocean.','A Kiddo School Nature Club card titled Sea Turtle: the words Sea Turtle with five labeled scenes — Hard shell, Strong flippers, Ocean swim, Sandy nest and Sea grass.'],
 ['seed-plant','Seed','Plants','A seed is a tiny beginning of a new plant. With water, air, warmth and soil, a root grows down and a shoot grows up — into a flower, a tree or a snack. Curl up small like a seed, then sprout slowly: root hands down, shoot arms up!','A Kiddo School Nature Club card titled Seed: the word Seed with five labeled scenes — Tiny seed, Soft soil, Little root, Green sprout and Tall plant.'],
 ['snail-animal','Snail','Animals','A snail is a small animal with a soft body and a hard shell it carries on its back, sliding along on a trail of mucus. Its feelers explore the world, and it travels slowly but always brings its home. Do the world\u2019s slowest snail race with somebody — last one to the wall wins!','A Kiddo School Nature Club card titled Snail: the word Snail with five labeled scenes — Spiral shell, Soft body, Feelers, Slow steps and Leaf snack.'],
 ['sunflower-plant','Sunflower','Plants','A sunflower loves sunshine. Its tall stem holds up a big yellow flower that bees visit for nectar while the flower makes seeds. Sunflowers even turn toward the light as they grow. Stand tall, face the window, and smile like a sunflower at the sky!','A Kiddo School Nature Club card titled Sunflower: the word Sunflower with five labeled scenes — Big yellow face, Tiny seeds, Tall stem, Busy bee and Happy petals.'],
 ['sunset-sky','Sunset','Sky & weather','A sunset happens when the sun appears to move below the horizon at the end of the day, and the sky can turn yellow, orange, pink or red. The sun is not really shrinking — Earth is turning! Watch the sky at dinner time tonight and name every color you see.','A Kiddo School Nature Club card titled Sunset: the word Sunset with five labeled scenes — Low sun, Warm glow, Orange sky, Long shadows and Night coming.'],
 ['tree-plant','Tree','Plants','A tree is a big plant with a strong trunk, branches and leaves. Its roots hold it in the ground and help it drink, trees give us oxygen, shade, fruit and homes for animals, and a tree can stand quietly for many years. Hug a tree (or a lamppost!) and feel how strong it is.','A Kiddo School Nature Club card titled Tree: the word Tree with five labeled scenes — Strong trunk, Wiggly branches, Fresh leaves, Cool shade and Silly squirrel.'],
 ['volcano-nature','Volcano','Wild places','A volcano is an opening in Earth\u2019s crust where hot melted rock can come out. Volcanoes can build mountains, and some rumble and erupt like Earth blowing off steam. Shake, shake, shake… POP! Erupt your arms like lava flowing down a mountain — slow and swirly.','A Kiddo School Nature Club card titled Volcano: the word Volcano with five labeled scenes — Rocky cone, Hot lava, Smoke cloud, Crater top and Earth power.'],
 ['waterfall-nature','Waterfall','Wild places','A waterfall forms when water flows over a steep drop in the land, tumbling down rocks and pooling below — nature\u2019s sparkling staircase. Waterfalls slowly wear the rock away and shape the land. Pour an invisible waterfall from high hands to low hands, then listen: whoosh, splash, sparkle!','A Kiddo School Nature Club card titled Waterfall: the word Waterfall with five labeled scenes — Falling water, Rocky cliff, Misty spray, River pool and Rainbow shine.'],
 ['whale-animal','Whale','Animals','A whale is a very large mammal that lives in the ocean, breathing air through a blowhole on top of its head, so it must come to the surface. Whales talk with loud calls and songs that travel far underwater. Take a big breath, then sing one long whale note — how far can your song travel?','A Kiddo School Nature Club card titled Whale: the word Whale with five labeled scenes — Huge body, Tail flukes, Ocean home, Blowhole and Whale song.'],
].map(([slug,word,sub,say,alt])=>({slug,file:slug+'-flashcard-for-kids.webp',pageSlug:slug,word,sub,say,alt}));

/* Guards: exactly the owner's 41 cards in file order, every entry complete,
   all unique — and every SEO file name riding untouched. */
if(CARDS.length!==41)throw Error('nature-deck: expected 41 cards, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==NAT_ORDER.join('|'))throw Error('nature-deck: card order does not match NAT_ORDER');
for(const c of CARDS){
 if(!c.file.endsWith('-flashcard-for-kids.webp'))throw Error('nature-deck: SEO file name broken for '+c.slug);
 if(c.alt.length<80)throw Error('nature-deck: thin alt for '+c.slug);
 if(c.say.length<60)throw Error('nature-deck: thin say for '+c.slug);
 if(!c.sub)throw Error('nature-deck: missing subject for '+c.slug);
}

export const NAT_CARDS=CARDS;
export const natBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));

/* Five shelves, in a walk order: the plants first, then the animals and the
   bugs that live among them, the sky above, and the wild places to finish. */
export const NAT_SHELVES=[
 {id:'plants',label:'THE PLANT SHELF \u00b7 13 CARDS',h2:'From tiny seeds to tall trees.',
  hint:'Printable plant flashcards for kids: acorn and seed, bamboo and fern, cactus and coconut, flower, leaf and tree — the plant words a nature walk meets first, each with a way to try it today.',
  slugs:['acorn-plant','bamboo-plant','cactus-plant','coconut-plant','fern-plant','flower-plant','leaf-plant','maple-leaf-plant','moss-plant','pinecone-plant','seed-plant','sunflower-plant','tree-plant']},
 {id:'animals',label:'THE ANIMAL SHELF \u00b7 11 CARDS',h2:'Fur, feathers and flippers.',
  hint:'Printable animal flashcards for kids: bird and deer, fox and rabbit, frog and snail, otter and penguin, sea turtle and whale — the animal words that turn a walk into a safari.',
  slugs:['bird-animal','deer-animal','fox-animal','frog-animal','hedgehog-animal','otter-animal','penguin-animal','rabbit-animal','sea-turtle-animal','snail-animal','whale-animal']},
 {id:'bugs',label:'THE BUG SHELF \u00b7 5 CARDS',h2:'The small ones with big jobs.',
  hint:'Printable insect flashcards for kids: bee, butterfly, dragonfly, firefly and ladybug — the helpful bugs that pollinate, glow and guard the garden, named and loved.',
  slugs:['bee-insect','butterfly-insect','dragonfly-insect','firefly-insect','ladybug-insect']},
 {id:'sky',label:'THE SKY &amp; WEATHER SHELF \u00b7 4 CARDS',h2:'Look up together.',
  hint:'Weather flashcards for kids: clouds and rainbows, puddles after rain and the sunset that ends a nature day — the sky words every walk finishes with.',
  slugs:['cloud-weather','puddle-weather','rainbow-weather','sunset-sky']},
 {id:'wild',label:'THE WILD PLACES SHELF \u00b7 8 CARDS',h2:'Where the wild things grow.',
  hint:'Nature flashcards for kids: mountain and river, ocean and waterfall, rainforest, frozen lake, volcano and mushroom — the wild places that make the whole world a classroom.',
  slugs:['frozen-lake-nature','mountain-nature','mushroom-nature','ocean-nature','rainforest-nature','river-nature','volcano-nature','waterfall-nature']}];
{
 const shelved=NAT_SHELVES.flatMap(s=>s.slugs).sort().join('|');
 if(shelved!==NAT_ORDER.slice().sort().join('|'))throw Error('nature-deck: shelves must cover the deck exactly once');
}

/* Level pills name school grades (owner 2026-10-31): Preschool = name it
   (14), Grade 1 = do it (14), Grade 2 = own it (13). 14/14/13 guarded. */
const NAT_LEVEL={
 'bird-animal':1,'flower-plant':1,'tree-plant':1,'bee-insect':1,'butterfly-insect':1,
 'rabbit-animal':1,'frog-animal':1,'snail-animal':1,'leaf-plant':1,'cloud-weather':1,
 'rainbow-weather':1,'puddle-weather':1,'sunflower-plant':1,'mushroom-nature':1,
 'acorn-plant':2,'seed-plant':2,'fern-plant':2,'cactus-plant':2,'pinecone-plant':2,
 'bamboo-plant':2,'coconut-plant':2,'moss-plant':2,'maple-leaf-plant':2,'deer-animal':2,
 'fox-animal':2,'otter-animal':2,'penguin-animal':2,'whale-animal':2,
 'dragonfly-insect':3,'firefly-insect':3,'ladybug-insect':3,'hedgehog-animal':3,
 'sea-turtle-animal':3,'frozen-lake-nature':3,'mountain-nature':3,'ocean-nature':3,
 'rainforest-nature':3,'river-nature':3,'volcano-nature':3,'waterfall-nature':3,'sunset-sky':3};
/* Skill pill per card. */
const NAT_SKILL={
 'acorn-plant':'Plant words','bamboo-plant':'Plant words','bee-insect':'Bug hunt',
 'bird-animal':'Animal names','butterfly-insect':'Life cycle','cactus-plant':'Plant words',
 'cloud-weather':'Weather words','coconut-plant':'Plant words','deer-animal':'Animal names',
 'dragonfly-insect':'Bug hunt','fern-plant':'Plant words','firefly-insect':'Bug hunt',
 'flower-plant':'Plant words','fox-animal':'Animal names','frog-animal':'Life cycle',
 'frozen-lake-nature':'Nature words','hedgehog-animal':'Animal names','ladybug-insect':'Bug hunt',
 'leaf-plant':'Plant words','maple-leaf-plant':'Seasons','moss-plant':'Plant words',
 'mountain-nature':'Nature words','mushroom-nature':'Nature words','ocean-nature':'Habitats',
 'otter-animal':'Animal names','penguin-animal':'Animal names','pinecone-plant':'Plant words',
 'puddle-weather':'Weather words','rabbit-animal':'Animal names','rainbow-weather':'Weather words',
 'rainforest-nature':'Habitats','river-nature':'Habitats','sea-turtle-animal':'Animal names',
 'seed-plant':'Life cycle','snail-animal':'Animal names','sunflower-plant':'Plant words',
 'sunset-sky':'Weather words','tree-plant':'Plant words','volcano-nature':'Earth science',
 'waterfall-nature':'Nature words','whale-animal':'Animal names'};
const NAT_LEVEL_NAMES={1:'Preschool \u00b7 Name it',2:'Grade 1 \u00b7 Do it',3:'Grade 2 \u00b7 Own it'};
const NAT_LEVEL_COUNTS=Object.fromEntries([1,2,3].map(l=>[l,CARDS.filter(c=>NAT_LEVEL[c.slug]===l).length]));
if(NAT_LEVEL_COUNTS[1]!==14||NAT_LEVEL_COUNTS[2]!==14||NAT_LEVEL_COUNTS[3]!==13)throw Error('nature-deck: level sizes drifted '+JSON.stringify(NAT_LEVEL_COUNTS));
if(Object.keys(NAT_SKILL).length!==41)throw Error('nature-deck: skill deck must cover 41 cards');
for(const c of CARDS){if(!NAT_SKILL[c.slug])throw Error('nature-deck: missing skill for '+c.slug);if(!NAT_LEVEL[c.slug])throw Error('nature-deck: missing level for '+c.slug);}

const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

/* ---- The shelf family appended to the Nature Club room (/nature/) --------- */
function natTile(c){
 const pills=`<span class="fc-pillrow"><span class="fc-pill fc-pill-age">Ages 3\u20138</span><span class="fc-pill fc-pill-subject">${esc(c.sub)}</span><span class="fc-pill fc-pill-level">${NAT_LEVEL_NAMES[NAT_LEVEL[c.slug]]}</span><span class="fc-pill fc-pill-skill">${esc(NAT_SKILL[c.slug])}</span></span>`;
 return `<figure class="mn-card"><img src="${NAT_BASE}${c.file}" width="${W}" height="${H}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong>${pills}<figcaption class="mn-tip">${esc(c.say)}</figcaption><div class="mn-actions"><a class="button" href="${NAT_BASE}${c.file}" download="${c.slug}.webp">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}

export function natureDeckSection(){
 const intro=`<section class="wrap lesson-section" id="nature-shelf"><span class="eyebrow">THE NATURE CLUB SHELF \u00b7 41 FLASHCARDS</span><h2>Forty-one nature flashcards to download and print.</h2><p class="fc-hint">Every card names one thing you can meet outside — from acorns and ferns to penguins and waterfalls — drawn smiling and labeled for kids. Download takes the full-size card; Print runs just that one card through the printer. The pills answer one glance: the age, the subject, the grade level, the skill it builds.</p></section>`;
 const decks=NAT_SHELVES.map(sh=>`<section class="wrap lesson-section" id="nature-${sh.id}"><span class="eyebrow">${sh.label}</span><h2>${sh.h2}</h2><p class="fc-hint">${sh.hint}</p><div class="mn-cards">${sh.slugs.map(s=>natTile(natBySlug[s])).join('')}</div></section>`).join('');
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW TO USE THE NATURE CARDS</span><h2>Name it outside, then try its tiny job.</h2><p class="lesson-copy">Pick one card before the walk and learn its word — then meet it for real outside. The acorn card wants you to find an acorn cap; the puddle card waits for the next rainy day. At home, print the card and post it where the day begins. The small job under each picture is the whole habit of nature: look closely, name what you see, and let the outside do the teaching.</p></section>`;
 return `${intro}${decks}${how}`;
}
