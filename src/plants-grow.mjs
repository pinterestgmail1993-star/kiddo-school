/* Kiddo School — CLASS 48 · Plants & How They Grow (Ages 4–5): the Learning
   Path class page at /plants-and-how-they-grow/ carrying the WHOLE 41-card
   deck on that one page, plus the parents' shelf at
   /flashcards/plants-and-how-they-grow/. ZERO per-card URLs — the owner's
   standing rule ("dont make indiviual pages, they are thin to google —
   include all in one page with download, print button, age, skill if any,
   level pill, subject pill, make sections, small descripiton all beneath the
   images"; "learning path is lesson for kids and flashcard library is for
   parents thats it"), reaffirmed in the Class 48 brief itself ("no indiviual
   pages ok"), the same one-page shape as Classes 41–47.

   NUMBERING (owner gate verbatim: "Add Class 49 … as the next class number
   after Class 48. If Class 48 is not live, tell me before assigning
   numbers."): Class 48 was NOT live — production probed 2026-11-02 showed
   the LP ending at Class 47 · Caring for Our Planet (row 47, count word
   forty-seven), and no Class 48 exists in the repo, the sitemap or
   production. By the site's own no-skip rule (unique, strictly increasing,
   no gap — the same rule that numbered Classes 39, 46 and 47) the honest
   next number is 48, NOT 49; assigning 49 would leave Class 48 a hole in
   the sequence the integrity test exists to prevent. The owner is told this
   in the round report; the number rides DISPLAY COPY ONLY — the URLs
   (/plants-and-how-they-grow/) carry no class number, so a renumber is one
   commit with zero URL changes.

   DECK: 42/42 files probed LIVE on R2 at
   school/learning-path/plants-and-how-they-grow/flashcards/ (41 cards + the
   cover, HTTP 200 image/jpeg, every file exactly 1414×2000 portrait,
   byte sizes matching the owner's R2 panel to the kB). THE JPG MASTERS RIDE
   EXACTLY AS UPLOADED — the owner: "The images are JPG, so do not convert
   or re-compress them, and keep the file names exactly as they are." Two
   panel names differ from the objects R2 actually serves: the panel lists
   how-plants-make-food-plant-flashcard-for-kids.jpg and
   how-plants-reproduce-plant-flashcard-for-kids.jpg, but the live objects
   (byte-matched to the panel's own sizes, 159 kB / 172 kB) are
   how-plants-make-food-flashcard-for-kids.jpg and
   how-plants-reproduce-flashcard-for-kids.jpg — the real R2 names are the
   truth and ride unchanged; the owner is told. Dims probed per file —
   every card is portrait 1414×2000 (the A4 print ratio), no landscape
   cards in this deck.

   Titles/alts transcribed off 7 labeled contact sheets
   (scripts/plants-sheets.py — all 42 faces read; every card prints a title
   and four labeled plant words; the card printed "Plant Neighbours" keeps
   its own British spelling in the alt, verbatim).

   Inbound links: Class 31 (Science, Nature & Discovery), Class 36 (Animals
   & Their Habitats) and Class 22 (Fruits & Vegetables) point here; the
   class page links back to all three and the Learning Path. The class
   count goes forty-seven → forty-eight. Kid-directed copy; USA search
   words parents actually type (plant flashcards for kids, how plants grow
   activities, garden printables for preschoolers); word-ban locked. */
import {R2} from './adventure-kit.mjs';
import {fcCommunityMount} from './flashcards/community.mjs';

export const PGP_PATH='/plants-and-how-they-grow/';
export const PGP_BASE=R2+'school/learning-path/plants-and-how-they-grow/flashcards/';

/* File order, exactly as the owner uploaded them (sorted); the slug is the
   file name minus its common suffix — the owner's own name rule, kept even
   though this class ships ZERO per-card URLs. */
export const PGP_ORDER=['a-plants-life-cycle','a-plants-water-path','bud-bloom-flower-pollen-growth-stages',
 'bulbs-and-tubers-plant','flower-fruit-seed-new-plant-growth-stages','flower-parts-plant',
 'flowers-make-seeds-plant','garden-helpers-plant','how-cacti-survive-plant','how-plants-make-food',
 'how-plants-reproduce','how-seeds-travel-plant','how-vines-grow-plant','inside-a-leaf-plant',
 'inside-a-seed-plant','leaf-shapes-plant','mosses-and-ferns-plant','parts-of-a-tree-plant',
 'plant-clues','plant-defenses','plant-homes','plant-life-in-winter','plant-neighbors',
 'plant-protection','plants-and-soil','plants-in-the-desert','plants-in-the-pond',
 'plants-in-the-rainforest','plants-that-eat-insects','plants-that-spread',
 'plants-through-the-seasons','root-jobs-plant','seed-crack-root-sprout-growth-stages',
 'seed-root-grows-water-strong-roots-growth-stages','seed-root-shoot-sprout-growth-stages',
 'sprout-stem-leaf-young-plant-growth-stages','stem-jobs-plant','the-pollination-path-plant',
 'trees-through-time-plant','what-plants-need','why-plants-make-fruit'];

export const PGP_COVER={file:'plants-and-how-they-grow-flashcards-for-kids-cover.jpg',w:1414,h:2000,
 alt:'Cover of the Kiddo School Plants & How They Grow flashcards: a brown seed, a spreading root web, a green sprout in soil and a blooming yellow flower, over the words "Plants & How They Grow — Flashcards".'};

/* slug → [word, w, h, subject pill, the card's printed words verbatim (the
   title first where the card prints one), kid-voice line (under the image
   on the class page), the try-it job (the parents' shelf tip), badge,
   SEO alt]. Every face read off the contact sheets; every card is portrait
   1414×2000. */
const CARDS=[
 ['a-plants-life-cycle','A Plant\u2019s Life Cycle','Growth stages',
  'Seed, Seedling, Mature Plant, New Seeds',
  'Big brown seed, tiny green seedling, tall mature plant — and then new seeds to start it all over. This card walks the whole circle of a plant\u2019s life, one step at a time.',
  'Print it and plant one real seed in a cup today — the card\u2019s four steps become your windowsill timeline. Add a sticker to the cup every time the plant reaches the next step.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled A Plant\u2019s Life Cycle: the words Seed, Seedling, Mature Plant and New Seeds beside a brown seed, a sprout in a soil mound, a leafy mature plant and an open pod dropping fresh seeds.'],
 ['a-plants-water-path','A Plant\u2019s Water Path','Plant care',
  'Rain, Root, Stem, Leaf',
  'Drip drop — the rain falls DOWN and the water climbs UP! This card follows one drink of water from the cloud through the roots, up the stem and out to the thirsty leaf.',
  'Print it and stand a celery stalk in colored water — the leaf tips change color before bedtime. The card\u2019s water path, running live in your kitchen.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled A Plant\u2019s Water Path: the words Rain, Root, Stem and Leaf beside a blue rain cloud with falling drops, a spreading brown root, a green stem with young leaves and one big water-carrying leaf.'],
 ['bud-bloom-flower-pollen-growth-stages','Bud, Bloom & Pollen','Growth stages',
  'Bud, Bloom, Flower, Pollen',
  'A tight purple bud opens into a bloom, opens wide into a flower, and dusts the air with golden pollen. This card shows a flower\u2019s four big moments, straight down the page.',
  'Print it and hunt for all four stages on one rose bush or balcony plant — a bud, a bloom, an open flower, a dusty center. One plant, the card\u2019s whole story.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Bud, Bloom & Pollen: the words Bud, Bloom, Flower and Pollen beside a closed purple bud, an opening violet bloom, a wide-open flower and a dusty stamen scattering golden pollen.'],
 ['bulbs-and-tubers-plant','Bulbs and Tubers','Plant care',
  'Bulb, Tuber, Sprout, Store Food',
  'An onion bulb and a lumpy potato are secret lunchboxes — food tucked away underground. This card shows how bulbs and tubers sleep, store their food, then sprout when the moment is right.',
  'Print it and sprout a toothpick potato over a jar of water on the windowsill — roots first, leaves next. The card\u2019s store-food secret, unpacking itself in front of you.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Bulbs and Tubers: the words Bulb, Tuber, Sprout and Store Food beside a purple onion bulb, a lumpy sprouting potato, a green sprout rising from soil and a cut bulb showing its packed layers.'],
 ['flower-fruit-seed-new-plant-growth-stages','Flower to New Plant','Growth stages',
  'Flower, Fruit, Seed, New Plant',
  'The flower fades, the fruit swells, the seed waits inside — and a brand-new plant begins. This card is the whole tomato story, from blossom on the vine to sprout in the soil.',
  'Print it and slice one tomato together — count the seeds inside, dry a few on the windowsill and plant them. The card\u2019s new-plant step happens at your house.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Flower to New Plant: the words Flower, Fruit, Seed and New Plant beside a white blossom, a ripe red tomato cut open, a scatter of cream seeds and a young sprout pushing out of a soil mound.'],
 ['flower-parts-plant','Flower Parts','Plant parts',
  'Petal, Sepal, Stamen, Pistil',
  'Every flower is a tiny machine: petals to wave hello, a sepal holding on underneath, the stamen\u2019s dusty gold and the pistil waiting in the middle. This card names all four parts.',
  'Print it and take one big flower apart petal by petal — find the dusty stamen and the fat pistil with a fingertip. The card\u2019s diagram, dissected on the kitchen table.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Flower Parts: the words Petal, Sepal, Stamen and Pistil beside one pink petal, a green sepal cup, yellow-tipped stamens on stalks and the green pistil with an ovary at its base.'],
 ['flowers-make-seeds-plant','Flowers Make Seeds','Flowers & seeds',
  'Flower, Pollen, Seed, Pod',
  'A flower is a seed factory in disguise: pollen meets pistil, the petals drop, and a pod swells full of next year\u2019s flowers. This card follows the seed-making magic.',
  'Print it and let one basil or lettuce plant bolt — grow tall, flower and fill its pods. Shake the dry pods into an envelope: free seeds for next season.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Flowers Make Seeds: the words Flower, Pollen, Seed and Pod beside an open purple flower, golden pollen heads, a smooth pale seed and a green pod swelling with round peas.'],
 ['garden-helpers-plant','Garden Helpers','Plant defense',
  'Bee, Butterfly, Bird, Worm',
  'The garden never works alone! The bee carries pollen, the butterfly visits too, the bird snaps up pests and the worm mixes the soil. This card introduces the whole helper crew.',
  'Print it and count the helpers on your next garden walk — bees, butterflies, birds, worms. Four spotted means the garden is thriving; fewer, and it is time to plant more flowers.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Garden Helpers: the words Bee, Butterfly, Bird and Worm beside a striped buzzing bee, an orange monarch butterfly, a blue songbird and a smiling pink earthworm.'],
 ['how-cacti-survive-plant','How Cacti Survive','Wild places',
  'Store Water, Thick Skin, Shallow Roots, Spines',
  'The desert is the driest classroom on Earth, and the cactus still passes the test! This card shows its four tricks: stored water, thick skin, wide shallow roots and fierce spines.',
  'Print it and touch (gently!) a real cactus or succulent at a garden center — feel the thick skin. The card\u2019s store-water trick, testable with one careful fingertip.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled How Cacti Survive: the words Store Water, Thick Skin, Shallow Roots and Spines beside a tall saguaro cactus, a cut pad showing its thick green skin, a prickly pear with wide surface roots and a spined barrel cactus.'],
 ['how-plants-make-food','How Plants Make Food','Plant care',
  'Light, Water, Air, Sugar',
  'Plants cook with sunshine! Light, water and air go in — sweet sugar comes out, and the plant eats its own cooking. This card is photosynthesis, drawn kid-simple.',
  'Print it and grow two bean seedlings for a week — one on the sunny sill, one in the dark cupboard. The pale one proves the card\u2019s light ingredient better than any words.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled How Plants Make Food: the words Light, Water, Air and Sugar beside a shining yellow sun, a blue water drop, curling breeze lines and a green leaf making sugar.'],
 ['how-plants-reproduce','How Plants Reproduce','Flowers & seeds',
  'Seed, Spore, Cutting, Runner',
  'Plants make more plants four ways: a seed, a dusty spore, a snipped cutting that grows its own roots and a runner crawling off to start a baby. This card names them all.',
  'Print it and snip one mint or geranium cutting, pop it in a glass of water and wait for roots. The card\u2019s cutting trick, rooting on your windowsill in two weeks.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled How Plants Reproduce: the words Seed, Spore, Cutting and Runner beside a sprouting bean seed, a fern leaf dotted with spores, a snipped stem rooting in water and a strawberry runner stretching to a new plantlet.'],
 ['how-seeds-travel-plant','How Seeds Travel','Flowers & seeds',
  'Wind, Water, Animals, Bursting',
  'A seed\u2019s whole job is to go on a journey! This card rides the wind with the dandelion, floats away with the coconut, hitches a ride on a berry-munching bird and bursts out of a crunchy pod.',
  'Print it and go on a seed-travel walk — a helicopter maple seed, a sticky burr on your sock, a dandelion clock to blow. Watch the card\u2019s wind riders take off.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled How Seeds Travel: the words Wind, Water, Animals and Bursting beside a dandelion clock losing its seeds, a coconut bobbing on blue waves, a bird swallowing red berries and a seed pod bursting open.'],
 ['how-vines-grow-plant','How Vines Grow','Plant defense',
  'Climb, Curl, Grab, Reach',
  'A vine never stands still — it climbs, curls into little springs, grabs hold with tendrils and reaches for the light. This card follows one vine\u2019s grip from the ground to the top.',
  'Print it and wind a bean or sweet-pea seedling up a bamboo cane, then check its grip every day. The card\u2019s climb-curl-grab cycle, live on your balcony.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled How Vines Grow: the words Climb, Curl, Grab and Reach beside a vine winding up a pole, a curling tendril spring, a tendril grabbing a stem and a young vine reaching upward.'],
 ['inside-a-leaf-plant','Inside a Leaf','Plant parts',
  'Blade, Veins, Chlorophyll, Oxygen',
  'A leaf is a green power plant! The blade catches the light, the veins carry the water, chlorophyll works the green magic and oxygen puffs out as a gift. This card looks inside.',
  'Print it and hold one big leaf up to the sun — find the vein map and the see-through spaces between. The card\u2019s blade-and-veins plan, backlit for real.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Inside a Leaf: the words Blade, Veins, Chlorophyll and Oxygen beside a smooth green blade, a veined leaf showing its network, a close-up of green chlorophyll cells and floating O2 bubbles.'],
 ['inside-a-seed-plant','Inside a Seed','Plant parts',
  'Seed Coat, Embryo, Food Store, Moisture',
  'A seed is a suitcase with a baby plant packed inside! The coat is the suitcase, the embryo is the baby, the food store is the lunch and moisture wakes it all up. This card unzips it.',
  'Print it and soak two bean seeds overnight, then open one — find the baby embryo and the lunch-box food store with a fingernail. The card\u2019s inside, unpacked.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Inside a Seed: the words Seed Coat, Embryo, Food Store and Moisture beside a whole brown bean, a cut seed showing the curled embryo, its golden food store and a drop of moisture inside the coat.'],
 ['leaf-shapes-plant','Leaf Shapes','Plant parts',
  'Round, Long, Spiky, Heart',
  'Leaves come in shapes like a leafy alphabet: round as a plate, long as a feather, spiky as a dinosaur and heart-shaped for the trees that love you. This card sorts them.',
  'Print it and collect one leaf of every shape on your next walk — round, long, spiky, heart. Four leaves taped into the nature journal make the card\u2019s chart real.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Leaf Shapes: the words Round, Long, Spiky and Heart beside four green leaves — a round one, a long narrow one, a jagged spiky one and one shaped like a valentine.'],
 ['mosses-and-ferns-plant','Mosses and Ferns','Wild places',
  'Spores, Fronds, Shade, Moisture',
  'Before there were flowers, there were mosses and ferns — the soft, old-timey plants! They make spores instead of seeds and love the shadiest, dampest corners. This card pays them a visit.',
  'Print it and find the shadiest, dampest corner of a park or garden — moss cushions and fern fronds wait there. Peek under a frond: the card\u2019s spore dots are real.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Mosses and Ferns: the words Spores, Fronds, Shade and Moisture beside a moss capsule puffing spores, a lacy fern frond, a cool shaded glen and one blue water drop.'],
 ['parts-of-a-tree-plant','Parts of a Tree','Plant parts',
  'Trunk, Branch, Twig, Crown',
  'A tree is the tallest plant a kid will ever meet! The trunk holds it up, the branches reach out, the twigs hold the leaves and the crown wears them all like a green hat. This card names every floor.',
  'Print it and hug a real tree — then look up: trunk to branches to twigs to crown, the card\u2019s four layers read bottom to top with your neck.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Parts of a Tree: the words Trunk, Branch, Twig and Crown beside a thick barky trunk, a leafy branch, a single twig with buds and the full round crown of a green tree.'],
 ['plant-clues','Plant Clues','Plant defense',
  'Ring, Bark, Leaf, Root',
  'Every plant leaves clues! A stump\u2019s rings count its birthdays, bark is its armor, a leaf is its kitchen and the roots tell you where it drinks. This card is detective training.',
  'Print it and count the rings on a real stump or a cut log — one dark ring per year. The card\u2019s age clue, counted with a fingertip, one birthday at a time.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Plant Clues: the words Ring, Bark, Leaf and Root beside a cut stump showing its rings, a rough bark panel, a single green leaf and a spreading root system.'],
 ['plant-defenses','Plant Defenses','Plant defense',
  'Thorns, Toxin, Taste, Camouflage',
  'Plants cannot run away, so they defend themselves! Thorns say keep off, some plants make a bitter toxin, some leaves taste terrible and one plant pretends to be a twig. This card is plant self-defense.',
  'Print it and hunt for defenses on a walk with a grown-up — spot the thorns, sniff (never taste!) the strong herbs, and look twice at the twig that is really an insect. Look, point, name: the card\u2019s whole game.',
  'grownup',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Plant Defenses: the words Thorns, Toxin, Taste and Camouflage beside a thorny stem, a white trumpet flower with toxic leaves, a jagged bitter-tasting leaf and a stick insect pretending to be a twig.'],
 ['plant-homes','Plant Homes','Wild places',
  'Forest, Desert, Meadow, Wetland',
  'Plants have addresses too! Forests, deserts, meadows and wetlands are four very different plant neighborhoods — and every plant fits its home perfectly. This card is the map.',
  'Print it and name the plant home on your next three walks — which one was a meadow, a forest, a wetland? Naming homes on real walks turns the card into a field guide.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Plant Homes: the words Forest, Desert, Meadow and Wetland beside a leafy green forest, a cactus between sandy dunes, a flower-filled meadow and a wetland pond with cattails.'],
 ['plant-life-in-winter','Plant Life in Winter','Plant care',
  'Rest, Roots, Bud, Spring',
  'Winter looks empty, but the plants are just asleep! Trees rest, roots keep drinking below the frost, buds wait on the bare twigs — and spring wakes everyone up. This card is the long winter nap.',
  'Print it and adopt one bare tree in late winter — visit it weekly and watch for the bud burst the card promises. The day the buds crack, winter is officially over.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Plant Life in Winter: the words Rest, Roots, Bud and Spring beside a bare tree in snow, roots drinking under the frost line, a tight brown bud on a twig and the first snowdrop blooming into spring.'],
 ['plant-neighbors','Plant Neighbours','Plant care',
  'Shade, Support, Compete, Share',
  'Plants are neighbors — some are kind and some are pushy! Big leaves give shade, a vine borrows a stem for support, roots compete underground and some plants share their patch. This card watches the street.',
  'Print it and plant one fast seed beside a slow one in the same pot — watch the card\u2019s compete-and-share story play out over two weeks. Who hogs, and who helps?',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Plant Neighbours (printed on the card in British spelling): the words Shade, Support, Compete and Share beside a small plant resting in a big one\u2019s shade, a vine climbing a stake, two root systems wrestling underground and two flowering plants sharing one border.'],
 ['plant-protection','Plant Protection','Plant defense',
  'Thorns, Waxy Leaf, Bark, Deep Roots',
  'A plant wears its armor every day: thorns on the stem, a waxy coat on the leaf, thick bark on the trunk and deep roots holding on tight. This card points at the armor.',
  'Print it and do a bark rubbing on your next walk — the armor pattern lands right on the paper. Feel a waxy leaf and point at thorns from a safe distance.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Plant Protection: the words Thorns, Waxy Leaf, Bark and Deep Roots beside a thorny rose stem, a glossy rain-beaded leaf, rough bark on a trunk and a tree holding on with deep spreading roots.'],
 ['plants-and-soil','Plants and Soil','Plant care',
  'Sand, Clay, Loam, Compost',
  'Soil is not just dirt — it is the plant\u2019s dinner table! Sandy soil drains fast, clay holds tight, loam is just right and compost is the feast on top. This card sorts the ground under your feet.',
  'Print it and fill three jars with soil from three spots — garden, park, flowerbed. Compare them to the card: sandy, clay or lovely loam? Compost goes on top as dessert.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Plants and Soil: the words Sand, Clay, Loam and Compost beside a golden sand pile, a red-brown clay block, a crumbly loam mound with a sprout and a dark compost heap with leaves and a worm.'],
 ['plants-in-the-desert','Plants in the Desert','Wild places',
  'Cactus, Succulent, Deep Root, Night Bloom',
  'The desert blooms anyway! A cactus stores its drinks, a succulent wears a thick coat, deep roots hunt for water far below and one flower saves itself for the cool of night. This card crosses the dunes.',
  'Print it and visit a garden center\u2019s cactus house — count the card\u2019s four desert tricks on real plants. In a hot summer, keep one store-bought cactus for its single night bloom.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Plants in the Desert: the words Cactus, Succulent, Deep Root and Night Bloom beside a tall saguaro, a rosette succulent, a root ball reaching deep below a pot and a pale night-blooming flower on a cactus.'],
 ['plants-in-the-pond','Plants in the Pond','Wild places',
  'Lily Pad, Reed, Duckweed, Water Lily',
  'Ponds are plant cities! Lily pads float like rafts, reeds stand tall at the edge, duckweed dots the water green and the water lily wears the crown. This card paddles through.',
  'Print it and scoop a jar of pond water on your next walk — a duckweed speck or a lily leaf rides home. Watch the jar for a day: the card\u2019s floating city lives in it.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Plants in the Pond: the words Lily Pad, Reed, Duckweed, Water Lily beside a notched lily pad floating, brown-tipped reeds, green duckweed specks dotting the water and a pink water lily in bloom.'],
 ['plants-in-the-rainforest','Plants in the Rainforest','Wild places',
  'Canopy, Vine, Fern, Moss',
  'The rainforest is a plant tower: the leafy canopy up top, vines climbing between the floors, ferns filling the shade below and moss on every damp corner. This card climbs the tower.',
  'Print it and build the rainforest floors in a shoebox — moss glued low, paper ferns in the middle, a green canopy high. The card\u2019s four layers, standing on your table.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Plants in the Rainforest: the words Canopy, Vine, Fern and Moss beside a tall rainforest canopy, a twisty vine climbing, a lacy green fern and a soft mossy mound.'],
 ['plants-that-eat-insects','Plants That Eat Insects','Wild places',
  'Trap, Attract, Close, Digest',
  'Some plants snack on bugs — really! They smell sweet to attract a visitor, snap shut in a trap, close tight and take their slow time digesting. This card dines with the Venus flytrap.',
  'Print it and watch a real flytrap hunt at a garden center — patience is the game. Touch one trap with a fallen (dead) fly and count to ten: the card\u2019s close-up catch, live.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Plants That Eat Insects: the words Trap, Attract, Close and Digest beside a snapping flytrap with a fly inside, a sweet-smelling pitcher plant, a closed spiky trap and a purple pitcher slowly digesting.'],
 ['plants-that-spread','Plants That Spread','Flowers & seeds',
  'Runner, Root, Seed, Spore',
  'Plants never stay in one place forever — they spread! Strawberry runners crawl along the ground, roots push sideways, seeds fly and ferns puff their spores. This card maps the slow takeover.',
  'Print it and follow one strawberry runner all summer — pot the baby plantlet once it roots. The card\u2019s runner story, handing you a free new strawberry plant.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Plants That Spread: the words Runner, Root, Seed, Spore beside a strawberry runner rooting a baby plant, a wide-spreading root system, a dandelion seed on its parachute and a fern releasing spore dust.'],
 ['plants-through-the-seasons','Plants Through the Seasons','Plant care',
  'Spring, Summer, Autumn, Winter',
  'One tree, four costumes! Pink spring blossom, green summer shade, crunchy autumn leaves and bare winter branches. This card watches one tree dress for the whole year.',
  'Print it and photograph the same tree four times a year — one photo per season, taped beside the card. By next spring you own a real seasons journal.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Plants Through the Seasons: the words Spring, Summer, Autumn and Winter beside a blossoming pink tree, a full green summer tree, an orange-and-yellow autumn tree and a bare winter tree in snow.'],
 ['root-jobs-plant','Root Jobs','Plant parts',
  'Anchor, Absorb, Store, Branch',
  'Under the ground, roots work all day: they anchor the plant in a storm, absorb the water, store the spare food and branch out hunting for more. This card digs down.',
  'Print it and pull one weed gently after rain — the whole root system rides up. Match it to the card: anchor, absorb, store, branch. Weeds teach the best root lessons.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Root Jobs: the words Anchor, Absorb, Store, Branch beside roots gripping a soil block, blue water drops soaking into thirsty roots, a fat carrot storing its food and a root system branching wide.'],
 ['seed-crack-root-sprout-growth-stages','Seed to Sprout','Growth stages',
  'Seed, Crack, Root, Sprout',
  'Pop! The seed cracks, a root dives down and a sprout pushes up to the light. This card is the first four days of a plant\u2019s whole life, one brave step at a time.',
  'Print it and stand one bean against a damp paper towel in a jar — watch the crack, the root and the sprout across five days. The card in fast-forward, on your windowsill.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Seed to Sprout: the words Seed, Crack, Root and Sprout beside a smooth yellow seed, the same seed cracking open, a white root diving down and a green sprout with two leaves reaching up.'],
 ['seed-root-grows-water-strong-roots-growth-stages','Seed to Strong Roots','Growth stages',
  'Seed, Root Grows, Water, Strong Roots',
  'Before a plant can stand tall it needs a strong base! The seed sleeps, the root grows down, water feeds it and strong roots grip the soil. This card cheers for the part nobody sees.',
  'Print it and lift one sprouted bean out of its jar garden — count the root hairs the card calls strong roots. Then replant it gently: roots hate the open air.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Seed to Strong Roots: the words Seed, Root Grows, Water, Strong Roots beside a seed tucked in a soil mound, a white root growing down, rain drops watering a seedling and a bushy grip of strong roots.'],
 ['seed-root-shoot-sprout-growth-stages','Root, Shoot, Sprout','Growth stages',
  'Seed, Root, Shoot, Sprout',
  'Down goes the root, up comes the shoot — a seed works in both directions at once! This card shows the underground half and the skyward half meeting at the soil line.',
  'Print it and plant beans in a clear-sided cup pressed against the glass — the card\u2019s root AND shoot both grow in view. A daily check-in makes it a two-week serial.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Root, Shoot, Sprout: the words Seed, Root, Shoot and Sprout beside a brown seed, its white root diving down, a pale shoot climbing up and a leafy sprout standing in the soil.'],
 ['sprout-stem-leaf-young-plant-growth-stages','Sprout to Young Plant','Growth stages',
  'Sprout, Stem, Leaf, Young Plant',
  'The sprout stretches, the stem straightens, the first true leaves unfold — and suddenly it IS a young plant. This card catches a garden\u2019s proudest week.',
  'Print it and measure your seedling every morning with a brick tower — one brick a day tells the story. The card\u2019s sprout-to-plant race, scored in bricks.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Sprout to Young Plant: the words Sprout, Stem, Leaf and Young Plant beside a curling sprout, a straightening stem in soil, the first true leaves opening and a strong young plant with many leaves.'],
 ['stem-jobs-plant','Stem Jobs','Plant parts',
  'Support, Carry, Lift, Bend',
  'The stem is the plant\u2019s busiest worker: it supports the leaves, carries the water, lifts the flowers up to the sun and bends in the wind without snapping. This card gives the stem its medal.',
  'Print it and stand one white flower in colored water — the petals change color overnight, proof of the card\u2019s carry-job. The stem keeps working, even in a vase.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Stem Jobs: the words Support, Carry, Lift and Bend beside a sturdy tree stem, a stem carrying red berries, a tall sunflower lifted to the sun and a bellflower bending gracefully.'],
 ['the-pollination-path-plant','The Pollination Path','Flowers & seeds',
  'Visitor, Pollen Dust, Flower Match, New Seed',
  'Buzz, land, dust, match, seed! A visitor lands on a flower, picks up golden pollen dust, matches it to the next flower — and a new seed begins. This card follows the bee\u2019s whole errand.',
  'Print it and watch one flower for five quiet minutes — any visitor counts. Where it flies next is the card\u2019s pollination path, live in your garden.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled The Pollination Path: the words Visitor, Pollen Dust, Flower Match and New Seed beside a bee landing on a pink flower, a dusty anther shaking pollen, two blossoms matched together and a seed pod opening with fresh seeds.'],
 ['trees-through-time-plant','Trees Through Time','Wild places',
  'Ring, Bark, Trunk, Age',
  'Trees are time travelers! A ring counts a year, bark records every storm, the trunk grows a little thicker every season and the age adds up for a hundred years. This card reads the calendar.',
  'Print it and find the oldest tree on your street — estimate by trunk width, one inch per year. The card\u2019s age math turns every walk into a history hunt.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Trees Through Time: the words Ring, Bark, Trunk and Age beside a cut trunk showing its rings, a rough bark panel, a sturdy brown trunk and a golden old tree with wide-spread roots.'],
 ['what-plants-need','What Plants Need','Plant care',
  'Sunlight, Water, Air, Space',
  'Every plant asks for the same four things: sunlight to eat, water to drink, air to breathe and space to grow. This card is the plant\u2019s whole shopping list.',
  'Print it and post it by the windowsill garden — every watering day, point at what the plant got today: sun, water, air and room to grow. The checklist runs itself.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled What Plants Need: the words Sunlight, Water, Air and Space beside a shining yellow sun, a blue water drop, curling breeze lines and a young plant with room to spread.'],
 ['why-plants-make-fruit','Why Plants Make Fruit','Flowers & seeds',
  'Protect, Feed, Attract, Spread',
  'Fruit is a seed\u2019s bodyguard AND its delivery service! The fruit protects the seed, feeds the animals who carry it, attracts them with color and sweetness and spreads the seeds far and wide. This card bites into the why.',
  'Print it and dissect one apple at snack time — find the seeds the fruit protects. Count them, plant two, and the card\u2019s whole why grows on your sill.',
  '',
  'A Kiddo School Plants & How They Grow plant flashcard for kids titled Why Plants Make Fruit: the words Protect, Feed, Attract and Spread beside a green apple guarding its seeds, a red strawberry to feed a hungry visitor, a bee visiting purple grapes and a pea pod scattering its seeds.'],
].map(([slug,word,sub,captions,say,tryIt,badge,alt])=>({slug,file:slug+'-flashcard-for-kids.jpg',pageSlug:slug,word,w:1414,h:2000,sub,captions,say,try:tryIt,badge,alt}));

/* Guards: exactly the owner's 41 cards in file order, every entry complete,
   all unique — and every SEO file name riding untouched. */
if(CARDS.length!==41)throw Error('plants-grow: expected 41 cards, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==PGP_ORDER.join('|'))throw Error('plants-grow: card order does not match PGP_ORDER');
for(const c of CARDS){
 if(!c.file.endsWith('-flashcard-for-kids.jpg'))throw Error('plants-grow: SEO file name broken for '+c.slug);
 if(c.alt.length<80)throw Error('plants-grow: thin alt for '+c.slug);
 if(c.say.length<60)throw Error('plants-grow: thin say for '+c.slug);
 if(c.try.length<60)throw Error('plants-grow: thin try for '+c.slug);
 if(!c.sub)throw Error('plants-grow: missing subject for '+c.slug);
 if(c.w!==1414||c.h!==2000)throw Error('plants-grow: bad dims for '+c.slug);
 if(!['','grownup'].includes(c.badge))throw Error('plants-grow: bad badge for '+c.slug);
}
if(CARDS.filter(c=>c.badge==='grownup').length!==1)throw Error('plants-grow: exactly one Ask-a-grown-up card expected (the toxin card)');
if(new Set(CARDS.map(c=>c.word)).size!==41)throw Error('plants-grow: duplicate card word');
if(new Set(CARDS.map(c=>c.alt)).size!==41)throw Error('plants-grow: duplicate alt');

export const PGP_CARDS=CARDS;
export const pgpBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));

/* Six shelves, in a young gardener's order: watch it grow first (seeds are
   the hook), then the parts, the care, the flowers and seeds, the wild
   places and the self-defense finish. Every card appears exactly once. */
export const PGP_SHELVES=[
 {id:'growing',label:'THE GROWING SHELF \u00b7 6 CARDS',h2:'Watch a seed become a plant.',
  hint:'Seed-growth flashcards for preschool: a seed cracks, the root dives, the shoot climbs, the sprout stretches and the young plant stands — the plants-and-how-they-grow cards that walk a child down the whole road from packet to plant, in order, one stage a card.',
  slugs:['seed-crack-root-sprout-growth-stages','seed-root-shoot-sprout-growth-stages','seed-root-grows-water-strong-roots-growth-stages','sprout-stem-leaf-young-plant-growth-stages','a-plants-life-cycle','flower-fruit-seed-new-plant-growth-stages']},
 {id:'parts',label:'THE PLANT PARTS SHELF \u00b7 7 CARDS',h2:'Look closer at one plant.',
  hint:'Plant-anatomy flashcards for kids: the trunk, the root jobs, the stem jobs, inside a leaf, leaf shapes, inside a seed and the flower\u2019s own parts — the cards that turn one everyday plant into a machine a four-year-old can name piece by piece.',
  slugs:['parts-of-a-tree-plant','root-jobs-plant','stem-jobs-plant','inside-a-leaf-plant','leaf-shapes-plant','inside-a-seed-plant','flower-parts-plant']},
 {id:'care',label:'THE PLANT CARE SHELF \u00b7 7 CARDS',h2:'Sunlight, water, air and good ground.',
  hint:'Plant-care flashcards for ages 4\u20135: what plants need, the water path, how plants cook with light, soil sorts, bulbs and tubers, the seasons and the long winter nap — the cards that hand a child the gardener\u2019s checklist in words they own.',
  slugs:['what-plants-need','a-plants-water-path','how-plants-make-food','plants-and-soil','bulbs-and-tubers-plant','plants-through-the-seasons','plant-life-in-winter']},
 {id:'seeds',label:'THE FLOWERS &amp; SEEDS SHELF \u00b7 7 CARDS',h2:'From blossom to brand-new seed.',
  hint:'Flower-and-seed flashcards for kids: the bud that blooms, the bee\u2019s pollination errand, the seed factory, the reason fruit exists, the seed-travel wind riders, the slow spread and the four ways plants make more plants — the cards where the garden\u2019s next generation gets made.',
  slugs:['bud-bloom-flower-pollen-growth-stages','the-pollination-path-plant','flowers-make-seeds-plant','why-plants-make-fruit','how-seeds-travel-plant','plants-that-spread','how-plants-reproduce']},
 {id:'wild',label:'THE WILD PLACES SHELF \u00b7 8 CARDS',h2:'Where plants live, wild and wonderful.',
  hint:'Habitat flashcards for young naturalists: the four plant homes, the desert\u2019s stored drinks, the pond\u2019s floating city, the rainforest tower, the soft old mosses and ferns, the cactus\u2019s survival kit, the plants that snack on bugs and the trees that keep time — the wild side of the deck.',
  slugs:['plant-homes','plants-in-the-desert','plants-in-the-pond','plants-in-the-rainforest','mosses-and-ferns-plant','how-cacti-survive-plant','plants-that-eat-insects','trees-through-time-plant']},
 {id:'defense',label:'THE PLANT DEFENSE SHELF \u00b7 6 CARDS',h2:'How plants stay safe, and who helps.',
  hint:'Plant-defense flashcards for kids: the armor a plant wears, the tricks it plays, the clues it leaves behind, the neighbors it lives with, the grip of a growing vine and the garden\u2019s helper crew — the cards where plants stop being scenery and start being survivors.',
  slugs:['plant-protection','plant-defenses','plant-clues','plant-neighbors','how-vines-grow-plant','garden-helpers-plant']}];

/* Coverage guard: the shelves carry the whole deck exactly once. */
const SHELVED=PGP_SHELVES.flatMap(s=>s.slugs).sort().join('|');
if(SHELVED!==PGP_ORDER.slice().sort().join('|'))throw Error('plants-grow: shelves do not cover the deck exactly once');
if(PGP_SHELVES.map(s=>s.slugs.length).join(',')!=='6,7,7,7,8,6')throw Error('plants-grow: shelf sizes drifted');

/* Level pills name school grades (owner 2026-10-31): Preschool = name it
   (14), Grade 1 = do it (14), Grade 2 = own it (13). 14/14/13 guarded. */
const PGP_LEVEL={
 'a-plants-life-cycle':1,'what-plants-need':1,'plant-homes':1,'flower-parts-plant':1,
 'parts-of-a-tree-plant':1,'leaf-shapes-plant':1,'plants-and-soil':1,'garden-helpers-plant':1,
 'plants-through-the-seasons':1,'how-seeds-travel-plant':1,'inside-a-seed-plant':1,
 'flowers-make-seeds-plant':1,'why-plants-make-fruit':1,'plant-clues':1,
 'seed-crack-root-sprout-growth-stages':2,'seed-root-shoot-sprout-growth-stages':2,
 'sprout-stem-leaf-young-plant-growth-stages':2,'a-plants-water-path':2,'root-jobs-plant':2,
 'stem-jobs-plant':2,'plant-life-in-winter':2,'the-pollination-path-plant':2,
 'bulbs-and-tubers-plant':2,'plants-in-the-pond':2,'plant-neighbors':2,'how-vines-grow-plant':2,
 'inside-a-leaf-plant':2,'plant-protection':2,
 'seed-root-grows-water-strong-roots-growth-stages':3,'flower-fruit-seed-new-plant-growth-stages':3,
 'bud-bloom-flower-pollen-growth-stages':3,'how-plants-make-food':3,'how-plants-reproduce':3,
 'plants-that-spread':3,'plants-in-the-desert':3,'plants-in-the-rainforest':3,
 'mosses-and-ferns-plant':3,'how-cacti-survive-plant':3,'plants-that-eat-insects':3,
 'trees-through-time-plant':3,'plant-defenses':3};
/* Skill pill per card (owner: "age, skill if any, level pill, subject pill"). */
const PGP_SKILL={
 'a-plants-life-cycle':'Sequencing','a-plants-water-path':'Explaining',
 'bud-bloom-flower-pollen-growth-stages':'Sequencing','bulbs-and-tubers-plant':'Observation',
 'flower-fruit-seed-new-plant-growth-stages':'Sequencing','flower-parts-plant':'Naming parts',
 'flowers-make-seeds-plant':'Explaining','garden-helpers-plant':'Animal teams',
 'how-cacti-survive-plant':'Comparing','how-plants-make-food':'Explaining',
 'how-plants-reproduce':'Sorting','how-seeds-travel-plant':'Sorting',
 'how-vines-grow-plant':'Observation','inside-a-leaf-plant':'Naming parts',
 'inside-a-seed-plant':'Naming parts','leaf-shapes-plant':'Sorting',
 'mosses-and-ferns-plant':'Comparing','parts-of-a-tree-plant':'Naming parts',
 'plant-clues':'Spotting patterns','plant-defenses':'Comparing',
 'plant-homes':'Matching','plant-life-in-winter':'Watching growth',
 'plant-neighbors':'Comparing','plant-protection':'Observation',
 'plants-and-soil':'Sorting','plants-in-the-desert':'Matching',
 'plants-in-the-pond':'Matching','plants-in-the-rainforest':'Matching',
 'plants-that-eat-insects':'Spotting patterns','plants-that-spread':'Explaining',
 'plants-through-the-seasons':'Watching growth','root-jobs-plant':'Naming parts',
 'seed-crack-root-sprout-growth-stages':'Watching growth',
 'seed-root-grows-water-strong-roots-growth-stages':'Watching growth',
 'seed-root-shoot-sprout-growth-stages':'Watching growth',
 'sprout-stem-leaf-young-plant-growth-stages':'Watching growth',
 'stem-jobs-plant':'Naming parts','the-pollination-path-plant':'Explaining',
 'trees-through-time-plant':'Spotting patterns','what-plants-need':'Care taking',
 'why-plants-make-fruit':'Explaining'};
const PGP_LEVEL_NAMES={1:'Preschool \u00b7 Name it',2:'Grade 1 \u00b7 Do it',3:'Grade 2 \u00b7 Own it'};
const PGP_LEVEL_BLURB={
 1:'the fourteen naming cards — what plants need, the plant\u2019s parts, the plant homes — the words a four-year-old points at and owns',
 2:'the fourteen doing cards — jar gardens, celery races, bark rubbings, bud watches — each one with a job small hands finish in a day',
 3:'the thirteen bigger cards — how plants cook with light, the four ways to make a new plant, the desert\u2019s survival kit — the ideas that grow with the child'};
const PGP_LEVEL_COUNTS=Object.fromEntries([1,2].map(l=>[l,CARDS.filter(c=>PGP_LEVEL[c.slug]===l).length]));
PGP_LEVEL_COUNTS[3]=CARDS.length-PGP_LEVEL_COUNTS[1]-PGP_LEVEL_COUNTS[2];
if(PGP_LEVEL_COUNTS[1]!==14||PGP_LEVEL_COUNTS[2]!==14||PGP_LEVEL_COUNTS[3]!==13)throw Error('plants-grow: level sizes drifted '+JSON.stringify(PGP_LEVEL_COUNTS));
if(Object.keys(PGP_SKILL).length!==41)throw Error('plants-grow: skill deck must cover 41 cards');
for(const c of CARDS){if(!PGP_SKILL[c.slug])throw Error('plants-grow: missing skill for '+c.slug);if(!PGP_LEVEL[c.slug])throw Error('plants-grow: missing level for '+c.slug);}

const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

/* ---- The class page: cover leads, six shelves carry the whole deck,
   every card downloads and prints straight from this page ------------------ */
function tile(c){
 const badge=c.badge==='grownup'?'<span class="mn-grownup">Ask a grown-up</span>':'';
 const pills=`<span class="fc-pillrow"><span class="fc-pill fc-pill-age">Ages 4\u20135</span><span class="fc-pill fc-pill-subject">${esc(c.sub)}</span><span class="fc-pill fc-pill-level">${PGP_LEVEL_NAMES[PGP_LEVEL[c.slug]]}</span><span class="fc-pill fc-pill-skill">${esc(PGP_SKILL[c.slug])}</span></span>`;
 return `<figure class="mn-card"><img src="${PGP_BASE}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong>${badge}${pills}<figcaption class="mn-tip">${esc(c.say)}</figcaption><div class="mn-actions"><a class="button" href="${PGP_BASE}${c.file}" download="${c.slug}.jpg">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}

export function pgpClassBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">LEARNING PATH \u00b7 CLASS 48 \u00b7 PLANTS &amp; HOW THEY GROW \u00b7 AGES 4\u20135</span><h1>Plants &amp; How They Grow — forty-one printable plant flashcards for kids.</h1><p class="lesson-lede">Forty-one printable plant flashcards for ages four to five, all on this one page, in six shelves: the growing shelf, the plant parts shelf, the plant care shelf, the flowers and seeds shelf, the wild places shelf and the plant defense shelf. Every card shows a plant idea a child can hold in one hand TODAY — a seed to crack open, a celery race to run, a bud to watch burst, a root to count — with Download and Print buttons right under the picture. Pick a card, dig in, and the garden does the teaching.</p><div class="lesson-start"><a class="button button-ghost" href="/learning-path/">Back to the Learning Path <span aria-hidden="true">\u2197</span></a></div></div><figure class="lesson-cover"><img src="${PGP_BASE}${PGP_COVER.file}" width="${PGP_COVER.w}" height="${PGP_COVER.h}" alt="${esc(PGP_COVER.alt)}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>One card. One look. One thing to try with your own hands.</h2><p class="lesson-copy">Plants are the first science a child can grow — before the words germinate or chlorophyll, comes the feeling of a bean seed cracking open in a jam jar and a root diving down while a shoot climbs up. Every card in this class prints a plant idea with four labeled words: the growing cards walk the seed\u2019s road stage by stage, the parts cards open the plant like a machine, the care cards hand over the gardener\u2019s checklist, the flowers-and-seeds cards follow the bee\u2019s errand, the wild-places cards travel from desert to pond to rainforest, and the defense cards show how plants fight back. You do not need a garden — you need one jar, one bean and a sunny window.</p><p class="lesson-copy">The shelves follow a young gardener\u2019s year. The Growing Shelf starts with the crack-pop-sprout moment every kid remembers forever. The Plant Parts Shelf looks closer — root jobs, stem jobs, the leaf\u2019s green magic, the seed\u2019s packed lunch. The Plant Care Shelf sorts soil, follows the water and waits out the winter. The Flowers &amp; Seeds Shelf runs the bee\u2019s errand from blossom to brand-new seed. The Wild Places Shelf crosses the desert, the pond and the rainforest. And the Plant Defense Shelf meets the survivors — thorns, armor, camouflage and the helper crew who keep the whole garden standing. Do one card a day, and by summer the windowsill is a jungle.</p></section>`;
 const shelfSections=PGP_SHELVES.map(sh=>`<section class="wrap lesson-section" id="shelf-${sh.id}"><span class="eyebrow">${sh.label}</span><h2>${sh.h2}</h2><p class="fc-hint">${sh.hint} Every card shows its four labeled plant words, carries its four pills — age, subject, grade level, skill — and downloads and prints straight from this page at full A4 print size, every card in the deck a tall portrait card that keeps its true shape.</p><div class="mn-cards">${sh.slugs.map(s=>tile(pgpBySlug[s])).join('')}</div></section>`).join('');
 const around=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where the plant lessons grow up.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/4-years/science-nature-and-discovery/">Science, Nature &amp; Discovery in Class 31 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/animals-and-their-habitats/">Animals &amp; Their Habitats in Class 36 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/3-years/fruits-and-vegetables/">Fruits &amp; Vegetables in Class 22 <span>\u00b7 Ages 3\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/learning-path/">The Learning Path <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Class 31 runs the experiments — seeds sprouting, sink or float, the water cycle — and this class names the plant science those experiments ride on. Class 36 walks the animal habitats, and the Wild Places Shelf here is the plants\u2019 half of the same map: the desert, the pond, the forest. Class 22 names the fruits and vegetables, and this class shows WHY the fruit exists — every apple is a seed\u2019s bodyguard. And when you want the next class, the Learning Path holds all forty-nine in order — and the whole deck prints again from the <a href="/flashcards/plants-and-how-they-grow/">Plants &amp; How They Grow parents\u2019 shelf</a>.</p></section>`;
 return `${hero}${how}${shelfSections}${around}<p class="lesson-note"><strong>Plant a card, grow a gardener.</strong> Every card here hands you one thing the windowsill can prove by bedtime — a seed cracked open, a root counted, a bud watched into flower. That is the whole lesson, and it is already yours.</p>`;
}

/* ---- The parents' shelf: the whole deck on ONE library page --------------- */
export const PGP_LIB_SET={slug:'plants-and-how-they-grow',url:'/flashcards/plants-and-how-they-grow/',name:'Plants & How They Grow',
 ageLabel:'4–5',stageName:null,
 hubBlurb:'The parents\u2019 shelf for Class 48: all forty-one plant flashcards with a download and a print button under every image — age, subject, level and skill pills on each card, printing straight from the shelf, no card pages. The child\u2019s lesson lives in the Plants & How They Grow class.',
 coverUrl:PGP_BASE+PGP_COVER.file,
 cover:{w:PGP_COVER.w,h:PGP_COVER.h,alt:PGP_COVER.alt},
 cards:CARDS.map(c=>({slug:c.slug,word:c.word}))};

function libTile(c){
 const badge=c.badge==='grownup'?'<span class="mn-grownup">Ask a grown-up</span>':'';
 const pillRow=`<span class="fc-pillrow"><span class="fc-pill fc-pill-age">Ages 4–5</span><span class="fc-pill fc-pill-subject">${esc(c.sub)}</span><span class="fc-pill fc-pill-level">${PGP_LEVEL_NAMES[PGP_LEVEL[c.slug]]}</span><span class="fc-pill fc-pill-skill">${esc(PGP_SKILL[c.slug])}</span></span>`;
 return `<figure class="mn-card"><img src="${PGP_BASE}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong>${badge}${pillRow}<figcaption class="mn-tip">${esc(c.try)}</figcaption><div class="mn-actions"><a class="button" href="${PGP_BASE}${c.file}" download="${c.slug}.jpg">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}

export function pgpLibBody(){
 const intro=`<section class="wrap lesson-section"><p class="lesson-copy">This is the parents\u2019 copy of <a href="/plants-and-how-they-grow/">Class 48 \u00b7 Plants &amp; How They Grow</a>: all forty-one plant flashcards on one shelf, ready to print. Pick the plant idea your week needs most, download the card and print it full size on A4 or Letter paper — every card carries one try-it job underneath and four pills on top: the age it suits, the subject it teaches, the grade level to start at and the skill it builds. The download button takes the full-resolution JPG; the print button runs a single card through your printer with nothing else on the page. There are no card pages to hop through: the shelf is the whole set.</p><p class="lesson-copy">The shelf is yours; the lesson is the child\u2019s. The class page at <a href="/plants-and-how-they-grow/">Plants &amp; How They Grow</a> teaches each idea the way a teacher would — spoken to your child, the plant word named plainly, one small thing to try today — while this wall simply holds the deck for printing. Same forty-one cards, two jobs: the lesson lives in the class, the library is where parents print.</p></section>`;
 const levels=`<section class="wrap lesson-section"><span class="eyebrow">THE THREE LEVELS</span><h2>Preschool, Grade 1, Grade 2.</h2><p class="fc-hint">Every card wears a level pill so tonight\u2019s card takes one glance to choose. The levels are a suggested order, not a test — the plant job your week needs most is always the right card.</p><ol class="fc-steps"><li><span class="fc-stepnum">01</span><div><h3>${PGP_LEVEL_NAMES[1]}</h3><p>${PGP_LEVEL_BLURB[1]}.</p></div></li><li><span class="fc-stepnum">02</span><div><h3>${PGP_LEVEL_NAMES[2]}</h3><p>${PGP_LEVEL_BLURB[2]}.</p></div></li><li><span class="fc-stepnum">03</span><div><h3>${PGP_LEVEL_NAMES[3]}</h3><p>${PGP_LEVEL_BLURB[3]}.</p></div></li></ol></section>`;
 const heads={growing:'The growing shelf — from seed crack to young plant.',parts:'The plant parts shelf — root jobs, stem jobs, leaf magic.',care:'The plant care shelf — the gardener\u2019s checklist.',seeds:'The flowers & seeds shelf — the bee\u2019s errand, the next generation.',wild:'The wild places shelf — desert, pond, rainforest.',defense:'The plant defense shelf — armor, tricks and helpers.'};
 const deck=PGP_SHELVES.map(sh=>{const cards=sh.slugs.map(s=>pgpBySlug[s]);return `<section class="wrap lesson-section"><span class="eyebrow">${sh.label}</span><h2>${heads[sh.id]}</h2><p class="fc-hint">${sh.hint} Download takes the full-resolution JPG; Print runs just that one card through the printer.</p><div class="mn-cards">${cards.map(libTile).join('')}</div></section>`;}).join('');
 const next=`<section class="wrap lesson-section"><span class="eyebrow">WHERE TO NEXT</span><h2>The lesson, the path, the rest of the library.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/plants-and-how-they-grow/">The Plants &amp; How They Grow class <span>\u00b7 The child\u2019s lesson</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/learning-path/">The Learning Path <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/flashcards/">All flashcard sets <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/flashcards/caring-for-our-planet/">The Caring for Our Planet parents\u2019 shelf <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Print a card here, teach the idea there: the <a href="/plants-and-how-they-grow/">Plants &amp; How They Grow class</a> is the lesson side of this deck — one card a sitting, spoken to your child, with one small thing to try today. Once the deck is up on the fridge, the class page is the manual that makes each idea stick.</p></section>`;
 return `${intro}${levels}${deck}${next}${fcCommunityMount('/flashcards/plants-and-how-they-grow/')}`;
}

/* ---- Inbound-link blocks, appended at the three classes' page() calls ----- */
/* Appended to Class 31 · Science, Nature & Discovery. */
export const PGP_SCIENCE_LINK=`<section class="wrap lesson-section"><span class="eyebrow">THE PLANT SCIENCE, NAMED</span><h2>Class 48 \u00b7 Plants &amp; How They Grow.</h2><p class="lesson-copy">Class 31 runs the experiments — seeds sprouting in jars, sink or float, the water cycle — and the <a href="/plants-and-how-they-grow/">Plants &amp; How They Grow class</a> names the plant science those experiments ride on: forty-one printable plant flashcards for ages 4\u20135, from a seed cracking open to the bee\u2019s pollination errand, every card downloading and printing straight from the class page.</p></section>`;
/* Appended to Class 36 · Animals & Their Habitats. */
export const PGP_HABITATS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">THE PLANTS\u2019 HALF OF THE HABITAT MAP</span><h2>Class 48 \u00b7 Plants &amp; How They Grow.</h2><p class="lesson-copy">Class 36 walks the animal habitats — the meadow, the pond, the desert, the ice — and the <a href="/plants-and-how-they-grow/">Plants &amp; How They Grow class</a> maps the same world from the plants\u2019 side: forty-one printable plant flashcards for ages 4\u20135 with a cactus\u2019s survival kit, a pond\u2019s floating city and a rainforest\u2019s four floors, every card printing straight from the class page.</p></section>`;
/* Appended to Class 22 · Fruits & Vegetables. */
export const PGP_FRUITS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">WHY THE FRUIT EXISTS</span><h2>Class 48 \u00b7 Plants &amp; How They Grow.</h2><p class="lesson-copy">Class 22 names the fruits and vegetables on the table, and the <a href="/plants-and-how-they-grow/">Plants &amp; How They Grow class</a> tells the story behind them: forty-one printable plant flashcards for ages 4\u20135 where every apple is a seed\u2019s bodyguard, every carrot is a root\u2019s lunchbox and every pea pod is a seed pod waiting to spread — every card downloading and printing straight from the class page.</p></section>`;
