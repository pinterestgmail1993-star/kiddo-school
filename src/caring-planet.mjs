/* Kiddo School — CLASS 47 · Caring for Our Planet (Ages 4–5): the Learning
   Path class page at /caring-for-our-planet/ carrying the WHOLE 30-card deck
   on that one page, plus the parents' shelf at
   /flashcards/caring-for-our-planet/. ZERO per-card URLs — the owner's
   standing rule ("dont make indiviual pages, they are thin to google —
   include all in one page with download, print button, age, skill if any,
   level pill, subject pill, make sections, small descripiton all beneath the
   images"; "dont create individual pages… learning path is lesson for kids
   and flashcard library is for parents thats it"), the same one-page shape
   as Classes 41–43. Numbered 47 by the no-skip rule: Class 46 · Early
   Addition & Subtraction is LIVE on production at
   https://kiddo.school/early-addition-and-subtraction/ (LP row 46, count
   forty-six, probed live before the number was assigned).

   DECK: 31/31 files probed LIVE on R2 at
   school/learning-path/caring-for-our-planet/flashcards/ (30 cards + the
   cover, HTTP 200 image/jpeg, 220–259 kB). THE JPG MASTERS RIDE EXACTLY AS
   UPLOADED — the owner: "The images are JPG, so do not convert or
   re-compress them, and keep the file names exactly as they are." Dims probed
   per file: twenty-three portrait cards at 1414×2000 and SEVEN landscape
   cards at 2000×1414 (the owner: "Show each card at its own size, because
   seven are landscape") — every <img> carries its own honest width/height.

   Titles/alts transcribed off 6 labeled contact sheets (scripts/cfp-sheets.py,
   all 31 faces read): every card prints FIVE labeled eco actions in one
   color family; the card's lead action (the first action in the file name)
   is the card word; the alt lists the printed captions verbatim.

   Inbound links: Class 31 (Science, Nature & Discovery), Class 36 (Animals &
   Their Habitats) and Class 43 (Our Earth & Space) point here; the class page
   links back to all three and the Learning Path. The class count goes
   forty-six → forty-seven. Kid-directed copy; USA search words parents
   actually type (eco flashcards for kids, caring for the planet activities,
   earth day printables, recycling for preschoolers); word-ban locked. */
import {R2} from './adventure-kit.mjs';
import {fcCommunityMount} from './flashcards/community.mjs';

export const CFP_PATH='/caring-for-our-planet/';
export const CFP_BASE=R2+'school/learning-path/caring-for-our-planet/flashcards/';

/* File order, exactly as the owner uploaded them (sorted); the slug is the
   file name minus its common suffix — the owner's own name rule, kept even
   though this class ships ZERO per-card URLs. */
export const CFP_ORDER=['bike-safely-use-rainwater-plant-a-garden','choose-wooden-toys-share-clothes-make-seed-paper',
 'clean-your-bike-use-cloth-napkins-protect-ponds','close-the-tap-share-a-ride-use-both-sides',
 'collect-rain-rescue-a-plant-reuse-jars','eat-local-grow-herbs-use-a-mug',
 'make-a-bat-box-care-for-earthworms-save-riverbanks','make-a-bird-feeder-use-fallen-leaves-choose-local-flowers',
 'make-a-worm-farm-use-a-library-choose-refill-packs','plant-a-pollinator-patch-keep-soil-covered-make-a-nature-journal',
 'plant-a-tree-pick-up-litter-walk-more','plant-bulbs-recycle-cardboard-protect-nests',
 'plant-shrubs-save-scraps-repair-socks','protect-birds-save-the-bees-respect-wildlife',
 'protect-trees-keep-water-clean-respect-the-soil','recycle-glass-protect-butterflies-share-homegrown-food',
 'recycle-metal-eat-all-your-food-use-a-bike-bell','recycle-textiles-catch-dripping-water-choose-unpackaged-food',
 'recycle-tubes-use-a-solar-cooker-repair-backpacks','rescue-insects-grow-beans-swap-clothes',
 'restore-habitats-sort-batteries-use-wind-power','ride-the-bus-recycle-cartons-use-old-boxes',
 'save-seeds-mend-clothes-use-less-plastic','sort-waste-clean-a-beach-use-solar-power',
 'take-a-train-choose-secondhand-save-rain','turn-it-off-save-water-use-less',
 'turn-off-heat-use-daylight-wash-full-loads','turn-off-the-computer-build-a-compost-bin-save-cooking-water',
 'unplug-devices-air-dry-clothes-take-the-stairs','use-a-lunchbox-turn-off-fans-grow-your-own'];

export const CFP_COVER={file:'caring-for-our-planet-flashcards-for-kids-cover.jpg',w:1414,h:2000,
 alt:'Cover of the Kiddo School Caring for Our Planet eco flashcards: a smiling cartoon Earth waving between a blue recycling bin, a happy tree, a water drop and a bee, over the words "Caring for Our Planet — small actions, big difference".'};

/* slug → [word, w, h, color family, subject pill, the card's printed captions
   verbatim (lead first), kid-voice tip (under the image on the class page),
   the try-it job (the parents' shelf tip), SEO alt]. Every face read off the
   contact sheets; the seven landscape cards carry their own 2000×1414. */
const CARDS=[
 ['bike-safely-use-rainwater-plant-a-garden','Bike Safely',1414,2000,'green','Green travel',
  'Bike safely, Use rainwater, Plant a garden, Repair tools, Share books',
  'Helmets on, pedals ready! This card rides a bike, catches rain for the garden, plants seeds, fixes tools and shares books with a friend.',
  'Print it and point at the helmet first — the card teaches the safety rule before the fun ones. Then grab the watering can together: rainwater is free plant drinks.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Bike Safely: the words Bike safely, Use rainwater, Plant a garden, Repair tools and Share books with five smiling green cartoon scenes — a helmeted kid cycling, a rain barrel watering can, a child planting, mended tools and shared books.'],
 ['choose-wooden-toys-share-clothes-make-seed-paper','Choose Wooden Toys',1414,2000,'blue','Green habits',
  'Choose wooden toys, Share clothes, Make seed paper, Dry clothes outside, Store food wisely',
  'Wooden toys last and last. This card shares clothes, makes seed paper, dries the wash in the sunshine and keeps food fresh in boxes.',
  'Print it and play the toy audit: one toy basket, two piles — which toys are wood, which are plastic? Wooden toys can go to a new baby cousin when you outgrow them.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Choose Wooden Toys: the words Choose wooden toys, Share clothes, Make seed paper, Dry clothes outside and Store food wisely with five smiling blue cartoon scenes — a toy block hugging wooden blocks, shirts shared, seed paper, a clothesline and stacked food boxes.'],
 ['clean-your-bike-use-cloth-napkins-protect-ponds','Clean Your Bike',1414,2000,'purple','Caring for animals',
  'Clean your bike, Use cloth napkins, Protect ponds, Share supplies, Care for animals',
  'A shiny bike, a soft cloth napkin, a clean pond. This card scrubs the bike, skips paper napkins, guards the pond, shares school supplies and takes care of animals.',
  'Print it and wash a real bike together — the rag and bucket are the fun part. While you scrub, ask who lives in ponds: frogs, fish, dragonflies. Clean water is their house.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Clean Your Bike: the words Clean your bike, Use cloth napkins, Protect ponds, Share supplies and Care for animals with five smiling purple cartoon scenes — a bicycle washed by a purple character, a cloth napkin, a pond with cattails and a lily, shared pencils and a petted dog.'],
 ['close-the-tap-share-a-ride-use-both-sides','Close the Tap',2000,1414,'blue','Saving water',
  'Close the tap, Share a ride, Use both sides, Fix it, Borrow more',
  'Drip, drip — who left the tap on? This card closes the tap, shares car rides, draws on both sides of the paper, fixes broken things and borrows instead of buying.',
  'Print it and post it by the sink: the card is the tap-closer\u2019s badge. Turn tooth-brushing into a race — can the tap stay off until rinse time?',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Close the Tap: the words Close the tap, Share a ride, Use both sides, Fix it and Borrow more with five smiling blue cartoon scenes — a tap turned off by a water drop, a shared blue car, two-sided paper, a screwdriver fix and a library book to borrow.'],
 ['collect-rain-rescue-a-plant-reuse-jars','Collect Rain',1414,2000,'yellow','Saving water',
  'Collect rain, Rescue a plant, Reuse jars, Donate toys, Pick local fruit',
  'Pitter-patter — free water from the sky! This card collects rain, rescues a thirsty plant, reuses jars, donates outgrown toys and picks local fruit.',
  'Print it and put a bucket outside on the next rainy day. Watch it fill, then water the houseplants with sky water — the card\u2019s rescue-a-plant scene comes true on your windowsill.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Collect Rain: the words Collect rain, Rescue a plant, Reuse jars, Donate toys and Pick local fruit with five smiling yellow cartoon scenes — a rain barrel under an umbrella of drops, a drooping plant watered back to life, a reused jar, a toy donation box and picked fruit in a basket.'],
 ['eat-local-grow-herbs-use-a-mug','Eat Local',2000,1414,'orange','Green habits',
  'Eat local, Grow herbs, Use a mug, Choose reusable, Dress warm',
  'Food from close by tastes like sunshine. This card eats local food, grows herbs on the sill, drinks from one favorite mug, chooses reusable bags and dresses warm instead of turning the heat up.',
  'Print it and plant one herb pot tonight — mint is nearly unkillable. Snipping your own herbs for dinner is the card\u2019s grow-herbs scene, live from your kitchen.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Eat Local: the words Eat local, Grow herbs, Use a mug, Choose reusable and Dress warm with five smiling orange cartoon scenes — an orange with a local-food basket, a potted herb, a cheerful mug, a reusable tote and a warm winter coat.'],
 ['make-a-bat-box-care-for-earthworms-save-riverbanks','Make a Bat Box',1414,2000,'red','Caring for animals',
  'Make a bat box, Care for earthworms, Save riverbanks, Choose repairable goods, Return packaging',
  'Bats eat a thousand mosquitoes a night — true! This card builds bats a wooden house, is gentle with earthworms, plants riverbank grasses, picks toys that can be fixed and returns packaging to the store.',
  'Print it and meet the worms after the next rain — hold one on a damp palm and say thank you. Worms turn old leaves into garden gold, no charge.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Make a Bat Box: the words Make a bat box, Care for earthworms, Save riverbanks, Choose repairable goods and Return packaging with five smiling red cartoon scenes — a bat house on a post, earthworms in dark soil, a planted riverbank, a repaired toaster and a packaging return bin.'],
 ['make-a-bird-feeder-use-fallen-leaves-choose-local-flowers','Make a Bird Feeder',1414,2000,'purple','Caring for animals',
  'Make a bird feeder, Use fallen leaves, Choose local flowers, Clean a park, Reuse old towels',
  'A hungry bird in winter needs a friend. This card makes a bird feeder, rakes fallen leaves for the compost, plants local flowers, cleans the park and turns old towels into rags.',
  'Print it and hang a feeder where the breakfast table can see it. A bird chart by the window turns every seed into a spotting game — the card\u2019s feeder scene, running all winter.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Make a Bird Feeder: the words Make a bird feeder, Use fallen leaves, Choose local flowers, Clean a park and Reuse old towels with five smiling purple cartoon scenes — a wooden feeder with a perched bird, raked leaves, a potted wildflower, a park clean-up and folded towel rags.'],
 ['make-a-worm-farm-use-a-library-choose-refill-packs','Make a Worm Farm',1414,2000,'pink','Caring for animals',
  'Make a worm farm, Use a library, Choose refill packs, Take short showers, Reuse gift paper',
  'Worms are the world\u2019s tiniest farmers. This card builds them a farm, borrows books from the library, picks refill packs, takes quick showers and smooths out gift paper to use again.',
  'Print it and start a jar worm farm with damp soil, a few worms and a dark cupboard — then let them go in the garden a week later. The card\u2019s whole job, done in miniature.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Make a Worm Farm: the words Make a worm farm, Use a library, Choose refill packs, Take short showers and Reuse gift paper with five smiling pink cartoon scenes — a layered worm bin, a library shelf, soap and refill bottles, a short shower and smoothed gift wrap.'],
 ['plant-a-pollinator-patch-keep-soil-covered-make-a-nature-journal','Plant a Pollinator Patch',1414,2000,'green','Planting',
  'Plant a pollinator patch, Keep soil covered, Make a nature journal, Use natural light, Gather native seeds',
  'Bees and butterflies need a flower restaurant. This card plants a pollinator patch, tucks soil under leaves, keeps a nature journal, reads by the window light and gathers native seeds.',
  'Print it and press one flower or leaf into a notebook today — the first page of a nature journal. Date it. In a month the pages will read like a story of your yard.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Plant a Pollinator Patch: the words Plant a pollinator patch, Keep soil covered, Make a nature journal, Use natural light and Gather native seeds with five smiling green cartoon scenes — a bee-friendly flower patch, mulched soil, a child journaling, a sunny window and seeds gathered in a paper bag.'],
 ['plant-a-tree-pick-up-litter-walk-more','Plant a Tree',2000,1414,'green','Planting',
  'Plant a tree, Pick up litter, Walk more, Compost food, Reuse bags',
  'A tree grows for a hundred years — plant one and you give the whole street shade. This card plants trees, picks up litter, walks instead of riding, composts food scraps and reuses bags.',
  'Print it and take a walk-around-the-block litter hunt — gloves on, one bag, ten pieces wins. Then look up: every tree on the street is working for you right now.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Plant a Tree: the words Plant a tree, Pick up litter, Walk more, Compost food and Reuse bags with five smiling green cartoon scenes — a sapling planted by a leaf character, a litter grabber, walking sneakers, a compost bin with peels and a reused shopping bag.'],
 ['plant-bulbs-recycle-cardboard-protect-nests','Plant Bulbs',1414,2000,'yellow','Planting',
  'Plant bulbs, Recycle cardboard, Protect nests, Choose odd fruit, Make a leaf pile',
  'A brown bulb looks like a rock — then it explodes into a tulip. This card plants bulbs, flattens cardboard for recycling, guards bird nests, picks the funny-looking fruit and builds a leaf pile for the hedgehogs.',
  'Print it and plant one bulb in a pot, pointy side up — daffodils forgive beginners. Water it and forget it: spring does the rest, exactly like the card promises.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Plant Bulbs: the words Plant bulbs, Recycle cardboard, Protect nests, Choose odd fruit and Make a leaf pile with five smiling yellow cartoon scenes — bulbs tucked into soil, a cardboard box into a recycling bin, a chick in a nest, a knobbly pear chosen and a leaf pile for hedgehogs.'],
 ['plant-shrubs-save-scraps-repair-socks','Plant Shrubs',1414,2000,'green','Planting',
  'Plant shrubs, Save scraps, Repair socks, Clean a stream, Use a thermos',
  'A shrub is a bird\u2019s hotel and a berry shop in one. This card plants shrubs, saves scraps for the compost, mends socks, cleans the stream and pours hot cocoa from a thermos.',
  'Print it and start the mending basket: one sock with a hole, a grown-up with a needle, five minutes. A mended sock is a badge — the card\u2019s repair-socks scene on your own foot.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Plant Shrubs: the words Plant shrubs, Save scraps, Repair socks, Clean a stream and Use a thermos with five smiling green cartoon scenes — a shrub planted in soil, a scraps bowl, a sock being mended, a stream clean-up and a steaming thermos.'],
 ['protect-birds-save-the-bees-respect-wildlife','Protect Birds',2000,1414,'purple','Caring for animals',
  'Protect birds, Save the bees, Respect wildlife, Keep parks clean, Leave no trace',
  'The birds, the bees, the deer — the whole wild crew. This card protects birds, saves the bees, respects wildlife, keeps the parks clean and leaves no trace behind.',
  'Print it and try a minute of statue-still listening in the park — every bird call you hear is one the card\u2019s protect-birds scene just saved. Count them out loud.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Protect Birds: the words Protect birds, Save the bees, Respect wildlife, Keep parks clean and Leave no trace with five smiling purple cartoon scenes — a birdhouse with a perched bird, a bee on a flower, a gentle deer, a park tidy-up and a packed-out backpack.'],
 ['protect-trees-keep-water-clean-respect-the-soil','Protect Trees',1414,2000,'teal','Caring for nature',
  'Protect trees, Keep water clean, Respect the soil, Save fruit, Use leftovers',
  'Trees are the planet\u2019s lungs. This card hugs trees (gently), keeps water clean, respects the soil and its worms, saves fruit from the trash and turns leftovers into tomorrow\u2019s lunch.',
  'Print it and adopt one tree on your street — bark rubbings, leaf check, a hello every walk. A named tree gets protected for life; that is the card\u2019s whole trick.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Protect Trees: the words Protect trees, Keep water clean, Respect the soil, Save fruit and Use leftovers with five smiling teal cartoon scenes — a hugged tree and a sapling, a netted clean-up by the water, an earthworm in soil, saved fruit and a leftovers box.'],
 ['recycle-glass-protect-butterflies-share-homegrown-food','Recycle Glass',1414,2000,'yellow','Recycling',
  'Recycle glass, Protect butterflies, Share homegrown food, Use a reusable cup, Recycle electronics',
  'Glass can become glass again and again — a bottle\u2019s superpower. This card recycles glass, plants butterfly flowers, shares food from the garden, carries a reusable cup and recycles old electronics.',
  'Print it and sort one real jar into the glass bin — clink! Then plant one butterfly flower (any purple one works) and watch who comes to visit all summer.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Recycle Glass: the words Recycle glass, Protect butterflies, Share homegrown food, Use a reusable cup and Recycle electronics with five smiling yellow cartoon scenes — a glass jar into a recycling bin, a butterfly on a flower, a basket of garden food, a reusable cup and an electronics bin.'],
 ['recycle-metal-eat-all-your-food-use-a-bike-bell','Recycle Metal',1414,2000,'pink','Recycling',
  'Recycle metal, Eat all your food, Use a bike bell, Keep a seed box, Make a bug home',
  'Metal is a treasure that never wears out. This card recycles metal cans, clears the whole plate, rings the bike bell, keeps seeds in a little box and builds a bug home for the winter.',
  'Print it and start a seed box: one envelope per seed from tonight\u2019s dinner — pepper, tomato, pumpkin. Next spring you plant your own groceries, free.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Recycle Metal: the words Recycle metal, Eat all your food, Use a bike bell, Keep a seed box and Make a bug home with five smiling pink cartoon scenes — cans into a metal bin, a clean plate, a bike bell ring, a labeled seed box and an insect hotel.'],
 ['recycle-textiles-catch-dripping-water-choose-unpackaged-food','Recycle Textiles',1414,2000,'blue','Recycling',
  'Recycle textiles, Catch dripping water, Choose unpackaged food, Make a pond, Use a reusable cloth',
  'Old shirts can become new rags — clothes get second lives too. This card recycles textiles, catches the tap\u2019s drips for the plants, picks unpackaged food, makes a mini pond and swaps paper towels for one reusable cloth.',
  'Print it and set a cup under a drippy tap tonight — one night\u2019s drips water a houseplant for days. The card\u2019s catch-dripping-water scene, measured in your own kitchen.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Recycle Textiles: the words Recycle textiles, Catch dripping water, Choose unpackaged food, Make a pond and Use a reusable cloth with five smiling blue cartoon scenes — clothes into a textile bin, a cup catching drips, loose produce in a bag, a mini pond with cattails and a wiped counter.'],
 ['recycle-tubes-use-a-solar-cooker-repair-backpacks','Recycle Tubes',1414,2000,'coral','Recycling',
  'Recycle tubes, Use a solar cooker, Repair backpacks, Grow mushrooms, Keep drains clean',
  'Toilet tubes are treasure — seed pots, marble runs, craft castles. This card recycles tubes, cooks with the sun in a solar cooker, mends backpacks, grows mushrooms and keeps the drains clean.',
  'Print it and turn three tubes into seed pots tonight — fold the bottoms, add soil, one seed each. Plant the whole pot: the tube composts itself, exactly like the card says.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Recycle Tubes: the words Recycle tubes, Use a solar cooker, Repair backpacks, Grow mushrooms and Keep drains clean with five smiling coral cartoon scenes — cardboard tubes into a recycling box, a sunny solar cooker, a mended backpack strap, mushrooms in a pot and a swept drain.'],
 ['rescue-insects-grow-beans-swap-clothes','Rescue Insects',1414,2000,'blue','Caring for animals',
  'Rescue insects, Grow beans, Swap clothes, Reuse wrapping, Wash vegetables',
  'A bee on the windowsill just needs a glass and a piece of paper — slide it out and it buzzes away saved. This card rescues insects, grows beans up strings, swaps clothes with friends, reuses wrapping paper and washes vegetables in a bowl.',
  'Print it and plant one bean in a wet cotton-wool jar — beans sprout in days, the fastest garden there is. Measure the shoot every morning; the card\u2019s grow-beans scene in fast-forward.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Rescue Insects: the words Rescue insects, Grow beans, Swap clothes, Reuse wrapping and Wash vegetables with five smiling blue cartoon scenes — a bee rescued in a jar, bean plants climbing, two friends swapping shirts, reused gift wrap and veggies washed in a bowl.'],
 ['restore-habitats-sort-batteries-use-wind-power','Restore Habitats',1414,2000,'purple','Caring for nature',
  'Restore habitats, Sort batteries, Use wind power, Share garden tools, Thank nature',
  'Every animal needs a home — a hedge, a meadow, a pond. This card restores habitats, sorts batteries into their own bin, points at wind power, shares garden tools and says thank you to nature.',
  'Print it and find the nearest wild thing\u2019s house on your walk — a hedge, a web, a nest — and leave it exactly as it is. Respecting a home is the card\u2019s whole lesson, felt in one minute.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Restore Habitats: the words Restore habitats, Sort batteries, Use wind power, Share garden tools and Thank nature with five smiling purple cartoon scenes — a seedling planted in wild soil, batteries into a sorting bin, a spinning wind turbine, shared trowels and arms open to the sky.'],
 ['ride-the-bus-recycle-cartons-use-old-boxes','Ride the Bus',1414,2000,'pink','Green travel',
  'Ride the bus, Recycle cartons, Use old boxes, Plant wildflowers, Return bottles',
  'One big bus carries as many people as forty cars — beep beep! This card rides the bus, recycles cartons, turns old boxes into toy garages, plants wildflowers and returns bottles for their deposit.',
  'Print it and make one old box earn a second life — a garage, a doll bed, a robot costume. The card\u2019s use-old-boxes scene is the cheapest toy shop there is.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Ride the Bus: the words Ride the bus, Recycle cartons, Use old boxes, Plant wildflowers and Return bottles with five smiling pink cartoon scenes — a happy pink bus, cartons into recycling, a box garage for toy cars, wildflowers planted and bottles returned at a machine.'],
 ['save-seeds-mend-clothes-use-less-plastic','Save Seeds',1414,2000,'pink','Green habits',
  'Save seeds, Mend clothes, Use less plastic, Feed the soil, Carry lunch',
  'One tomato holds a hundred future tomatoes. This card saves seeds, mends clothes with a stitch, says no to plastic, feeds the soil with scraps and carries lunch in a box.',
  'Print it and shake seeds off one dried flower head onto a plate — marvel at how many next-year-flowers fit in a palm. Label an envelope and the garden budget just hit zero.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Save Seeds: the words Save seeds, Mend clothes, Use less plastic, Feed the soil and Carry lunch with five smiling pink cartoon scenes — a seed packet saved, a shirt mended with thread, a waved-off plastic bag, compost fed to soil and a lunchbox carried high.'],
 ['sort-waste-clean-a-beach-use-solar-power','Sort Waste',2000,1414,'teal','Recycling',
  'Sort waste, Clean a beach, Use solar power, Plant native flowers, Teach a friend',
  'The bins are a sorting game: paper, plastic, glass, food. This card sorts waste, cleans a beach, catches sunshine with solar panels, plants native flowers and teaches a friend the game.',
  'Print it and make the bins a relay: one item, run, drop, next — a two-minute game that builds a lifetime habit. The card\u2019s sort-waste scene, played for real.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Sort Waste: the words Sort waste, Clean a beach, Use solar power, Plant native flowers and Teach a friend with five smiling teal cartoon scenes — sorted recycling bins, a beach clean-up bag, a solar panel in sunshine, native flowers in a pot and two kids learning together.'],
 ['take-a-train-choose-secondhand-save-rain','Take a Train',1414,2000,'orange','Green travel',
  'Take a train, Choose secondhand, Save rain, Use food scraps, Plant a hedge',
  'A train glides on one long breath of power — the coziest way to travel. This card takes the train, chooses secondhand clothes, saves rain in a barrel, feeds scraps to the compost and plants a hedge for the birds.',
  'Print it and try one secondhand treasure hunt — a book, a puzzle, a jacket that already has a story. The card\u2019s choose-secondhand scene, and the prices are the best part.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Take a Train: the words Take a train, Choose secondhand, Save rain, Use food scraps and Plant a hedge with five smiling orange cartoon scenes — a fast train with a waving character, a secondhand heart shirt, a rain barrel and watering can, scraps into compost and a hedge planted.'],
 ['turn-it-off-save-water-use-less','Turn It Off',2000,1414,'orange','Saving energy',
  'Turn it off, Save water, Use less, Recycle, Help nature',
  'Lights, screens, taps — everything has an off switch, and the off switch is a superpower. This card turns it off, saves water, uses less, recycles and helps nature.',
  'Print it and play off-switch detective before bed: every light and screen found and switched off earns a point. Three points, three nights — the house bill drops, the planet grins.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Turn It Off: the words Turn it off, Save water, Use less, Recycle and Help nature with five smiling orange cartoon scenes — a bulb at a light switch, a tap turned off, a reusable bag, a recycling bin and the Earth held gently.'],
 ['turn-off-heat-use-daylight-wash-full-loads','Turn Off Heat',1414,2000,'yellow','Saving energy',
  'Turn off heat, Use daylight, Wash full loads, Share toys, Recycle paper',
  'The sun is a free lamp that works all morning. This card turns the heat down, reads by daylight, washes full loads only, shares toys and recycles paper.',
  'Print it and move tonight\u2019s story to the sunniest spot in the house at the sunniest hour — the card\u2019s use-daylight scene, with zero switches touched.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Turn Off Heat: the words Turn off heat, Use daylight, Wash full loads, Share toys and Recycle paper with five smiling yellow cartoon scenes — a thermostat turned down, a sunny window read, a full washing machine, shared toy cars and paper into recycling.'],
 ['turn-off-the-computer-build-a-compost-bin-save-cooking-water','Turn Off the Computer',1414,2000,'green','Saving energy',
  'Turn off the computer, Build a compost bin, Save cooking water, Protect frogs, Use a hand broom',
  'Screens sleep, frogs wake. This card turns the computer off, builds a compost bin, saves the cooking water for the plants, protects the frogs and sweeps with a hand broom.',
  'Print it and give the pasta water a second job — cooled, it waters the plants (no salt, please). The card\u2019s save-cooking-water scene, one pot at a time.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Turn Off the Computer: the words Turn off the computer, Build a compost bin, Save cooking water, Protect frogs and Use a hand broom with five smiling green cartoon scenes — a sleeping screen, a compost bin filled with peels, a pot of saved water, a frog under a leaf umbrella and a swept floor.'],
 ['unplug-devices-air-dry-clothes-take-the-stairs','Unplug Devices',2000,1414,'red','Saving energy',
  'Unplug devices, Air dry clothes, Take the stairs, Eco shop, Refill bottles',
  'Plugged-in chargers sip power all night — unplug and they sleep too. This card unplugs devices, dries clothes on the line, takes the stairs, eco-shops and refills water bottles.',
  'Print it and count the little red standby lights tonight — each one is a tiny mouth sipping power. Unplug three together and the card\u2019s scene comes alive in your hallway.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Unplug Devices: the words Unplug devices, Air dry clothes, Take the stairs, Eco shop and Refill bottles with five smiling red cartoon scenes — a plug pulled from the wall, a shirt on a clothesline, stairs climbed two at a time, a canvas eco-shop bag and bottles at a refill station.'],
 ['use-a-lunchbox-turn-off-fans-grow-your-own','Use a Lunchbox',1414,2000,'coral','Green habits',
  'Use a lunchbox, Turn off fans, Grow your own, Recycle cans, Help in the garden',
  'A lunchbox is a treasure chest you open at noon. This card packs a lunchbox, turns fans off when you leave, grows your own food, recycles cans and helps in the garden.',
  'Print it and let the child pack one whole lunch solo — the proud walk to the table is the point. The card\u2019s use-a-lunchbox scene, served daily.',
  'A Kiddo School Caring for Our Planet eco flashcard for kids titled Use a Lunchbox: the words Use a lunchbox, Turn off fans, Grow your own, Recycle cans and Help in the garden with five smiling coral cartoon scenes — a packed lunchbox, a fan switched off at the wall, a planter of greens, cans into recycling and a trowel in garden soil.'],
].map(([slug,word,w,h,color,sub,captions,say,tryIt,alt])=>({slug,file:slug+'-eco-flashcard-for-kids.jpg',pageSlug:slug,word,w,h,color,sub,captions,say,try:tryIt,alt}));

/* Guards: exactly the owner's 30 cards in file order, every entry complete,
   all unique — and every SEO file name riding untouched. */
if(CARDS.length!==30)throw Error('caring-planet: expected 30 cards, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==CFP_ORDER.join('|'))throw Error('caring-planet: card order does not match CFP_ORDER');
for(const c of CARDS){
 if(!c.file.endsWith('-eco-flashcard-for-kids.jpg'))throw Error('caring-planet: SEO file name broken for '+c.slug);
 if(c.alt.length<80)throw Error('caring-planet: thin alt for '+c.slug);
 if(c.say.length<60)throw Error('caring-planet: thin say for '+c.slug);
 if(c.try.length<60)throw Error('caring-planet: thin try for '+c.slug);
 if(!c.sub)throw Error('caring-planet: missing subject for '+c.slug);
 if(![1414,2000].includes(c.w)||![1414,2000].includes(c.h))throw Error('caring-planet: bad dims for '+c.slug);
}
const LANDSCAPE=CARDS.filter(c=>c.w===2000);
if(LANDSCAPE.length!==7)throw Error('caring-planet: expected 7 landscape cards, got '+LANDSCAPE.length);

export const CFP_CARDS=CARDS;
export const cfpBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));

/* Five shelves, in a kid's day order: planting first (digging is the hook),
   then the critters, the sorting game, the power-down and the every-day
   finish. Every card appears exactly once. */
export const CFP_SHELVES=[
 {id:'planting',label:'THE PLANTING SHELF \u00b7 6 CARDS',h2:'Get your hands in the dirt.',
  hint:'Printable planting flashcards for preschool: plant a tree, plant bulbs, plant shrubs, plant a pollinator patch, collect the rain and restore a habitat \u2014 the caring-for-our-planet cards that start as seeds and end as shade, flowers and homes for wild things.',
  slugs:['plant-a-tree-pick-up-litter-walk-more','plant-bulbs-recycle-cardboard-protect-nests','plant-shrubs-save-scraps-repair-socks','plant-a-pollinator-patch-keep-soil-covered-make-a-nature-journal','restore-habitats-sort-batteries-use-wind-power','collect-rain-rescue-a-plant-reuse-jars']},
 {id:'critters',label:'THE CRITTER SHELF \u00b7 5 CARDS',h2:'Feed the birds. Thank the worms.',
  hint:'Animal-care flashcards for ages 4\u20135: protect birds, make a bat box, make a bird feeder, make a worm farm and rescue insects \u2014 the eco cards where the child becomes the helper every small creature nearby already needs.',
  slugs:['protect-birds-save-the-bees-respect-wildlife','make-a-bat-box-care-for-earthworms-save-riverbanks','make-a-bird-feeder-use-fallen-leaves-choose-local-flowers','make-a-worm-farm-use-a-library-choose-refill-packs','rescue-insects-grow-beans-swap-clothes']},
 {id:'recycle',label:'THE RECYCLE SHELF \u00b7 6 CARDS',h2:'Sort it out.',
  hint:'Recycling flashcards for kids: recycle glass, metal, textiles and tubes, sort the waste and ride the bus \u2014 the caring-for-our-planet cards that turn the bins into a sorting game a four-year-old wins on day one.',
  slugs:['recycle-glass-protect-butterflies-share-homegrown-food','recycle-metal-eat-all-your-food-use-a-bike-bell','recycle-textiles-catch-dripping-water-choose-unpackaged-food','recycle-tubes-use-a-solar-cooker-repair-backpacks','sort-waste-clean-a-beach-use-solar-power','ride-the-bus-recycle-cartons-use-old-boxes']},
 {id:'power',label:'THE POWER-DOWN SHELF \u00b7 6 CARDS',h2:'Flip the switch. Save the power.',
  hint:'Saving-energy flashcards for preschool: turn it off, turn off the heat, turn off the computer, unplug the devices, use a lunchbox and take the train \u2014 the eco cards where the off switch, the light of day and one shared ride become the child\u2019s own superpowers.',
  slugs:['turn-it-off-save-water-use-less','turn-off-heat-use-daylight-wash-full-loads','turn-off-the-computer-build-a-compost-bin-save-cooking-water','unplug-devices-air-dry-clothes-take-the-stairs','use-a-lunchbox-turn-off-fans-grow-your-own','take-a-train-choose-secondhand-save-rain']},
 {id:'everyday',label:'THE EVERY-DAY SHELF \u00b7 7 CARDS',h2:'Small choices, every day.',
  hint:'Everyday eco habits for ages 4\u20135: close the tap, bike safely, choose wooden toys, clean your bike, eat local, save seeds and protect the trees \u2014 the caring-for-our-planet cards that ride along in every ordinary day, no special equipment needed.',
  slugs:['close-the-tap-share-a-ride-use-both-sides','bike-safely-use-rainwater-plant-a-garden','choose-wooden-toys-share-clothes-make-seed-paper','clean-your-bike-use-cloth-napkins-protect-ponds','eat-local-grow-herbs-use-a-mug','save-seeds-mend-clothes-use-less-plastic','protect-trees-keep-water-clean-respect-the-soil']}];

/* Level pills name school grades (owner 2026-10-31): Preschool = name it
   (10), Grade 1 = do it (10), Grade 2 = own it (10). 10/10/10 guarded. */
const CFP_LEVEL={
 'turn-it-off-save-water-use-less':1,'close-the-tap-share-a-ride-use-both-sides':1,
 'recycle-glass-protect-butterflies-share-homegrown-food':1,'plant-a-tree-pick-up-litter-walk-more':1,
 'use-a-lunchbox-turn-off-fans-grow-your-own':1,'protect-birds-save-the-bees-respect-wildlife':1,
 'collect-rain-rescue-a-plant-reuse-jars':1,'bike-safely-use-rainwater-plant-a-garden':1,
 'eat-local-grow-herbs-use-a-mug':1,'unplug-devices-air-dry-clothes-take-the-stairs':1,
 'recycle-metal-eat-all-your-food-use-a-bike-bell':2,'recycle-textiles-catch-dripping-water-choose-unpackaged-food':2,
 'sort-waste-clean-a-beach-use-solar-power':2,'plant-bulbs-recycle-cardboard-protect-nests':2,
 'plant-shrubs-save-scraps-repair-socks':2,'make-a-bird-feeder-use-fallen-leaves-choose-local-flowers':2,
 'save-seeds-mend-clothes-use-less-plastic':2,'choose-wooden-toys-share-clothes-make-seed-paper':2,
 'ride-the-bus-recycle-cartons-use-old-boxes':2,'turn-off-heat-use-daylight-wash-full-loads':2,
 'recycle-tubes-use-a-solar-cooker-repair-backpacks':3,'plant-a-pollinator-patch-keep-soil-covered-make-a-nature-journal':3,
 'restore-habitats-sort-batteries-use-wind-power':3,'make-a-bat-box-care-for-earthworms-save-riverbanks':3,
 'make-a-worm-farm-use-a-library-choose-refill-packs':3,'rescue-insects-grow-beans-swap-clothes':3,
 'turn-off-the-computer-build-a-compost-bin-save-cooking-water':3,'take-a-train-choose-secondhand-save-rain':3,
 'clean-your-bike-use-cloth-napkins-protect-ponds':3,'protect-trees-keep-water-clean-respect-the-soil':3};
/* Skill pill per card (owner: "age, skill if any, level pill, subject pill"). */
const CFP_SKILL={
 'plant-a-tree-pick-up-litter-walk-more':'Planting','plant-bulbs-recycle-cardboard-protect-nests':'Planting',
 'plant-shrubs-save-scraps-repair-socks':'Planting','plant-a-pollinator-patch-keep-soil-covered-make-a-nature-journal':'Planting',
 'restore-habitats-sort-batteries-use-wind-power':'Habitats','collect-rain-rescue-a-plant-reuse-jars':'Saving water',
 'protect-birds-save-the-bees-respect-wildlife':'Caring for animals','make-a-bat-box-care-for-earthworms-save-riverbanks':'Caring for animals',
 'make-a-bird-feeder-use-fallen-leaves-choose-local-flowers':'Caring for animals','make-a-worm-farm-use-a-library-choose-refill-packs':'Caring for animals',
 'rescue-insects-grow-beans-swap-clothes':'Caring for animals','recycle-glass-protect-butterflies-share-homegrown-food':'Recycling',
 'recycle-metal-eat-all-your-food-use-a-bike-bell':'Recycling','recycle-textiles-catch-dripping-water-choose-unpackaged-food':'Recycling',
 'recycle-tubes-use-a-solar-cooker-repair-backpacks':'Reusing','sort-waste-clean-a-beach-use-solar-power':'Sorting',
 'ride-the-bus-recycle-cartons-use-old-boxes':'Green travel','turn-it-off-save-water-use-less':'Saving energy',
 'turn-off-heat-use-daylight-wash-full-loads':'Saving energy','turn-off-the-computer-build-a-compost-bin-save-cooking-water':'Saving energy',
 'unplug-devices-air-dry-clothes-take-the-stairs':'Saving energy','use-a-lunchbox-turn-off-fans-grow-your-own':'Reusing',
 'take-a-train-choose-secondhand-save-rain':'Green travel','close-the-tap-share-a-ride-use-both-sides':'Saving water',
 'bike-safely-use-rainwater-plant-a-garden':'Green travel','choose-wooden-toys-share-clothes-make-seed-paper':'Choosing well',
 'clean-your-bike-use-cloth-napkins-protect-ponds':'Caring for things','eat-local-grow-herbs-use-a-mug':'Choosing well',
 'save-seeds-mend-clothes-use-less-plastic':'Planting','protect-trees-keep-water-clean-respect-the-soil':'Caring for nature'};
const CFP_LEVEL_NAMES={1:'Preschool \u00b7 Name it',2:'Grade 1 \u00b7 Do it',3:'Grade 2 \u00b7 Own it'};
const CFP_LEVEL_BLURB={
 1:'the ten cards to start with — turn it off, close the tap, plant a tree, ride a bike safely — the actions a four-year-old already owns',
 2:'the ten doing cards — sort the waste, make a bird feeder, save the seeds, wash full loads — each one with a job small hands finish',
 3:'the ten bigger cards — build a compost bin, restore a habitat, rescue an insect, take the train — the habits that grow with the child'};
const CFP_LEVEL_COUNTS=Object.fromEntries([1,2,3].map(l=>[l,CARDS.filter(c=>CFP_LEVEL[c.slug]===l).length]));
if(CFP_LEVEL_COUNTS[1]!==10||CFP_LEVEL_COUNTS[2]!==10||CFP_LEVEL_COUNTS[3]!==10)throw Error('caring-planet: level sizes drifted '+JSON.stringify(CFP_LEVEL_COUNTS));
if(Object.keys(CFP_SKILL).length!==30)throw Error('caring-planet: skill deck must cover 30 cards');
for(const c of CARDS){if(!CFP_SKILL[c.slug])throw Error('caring-planet: missing skill for '+c.slug);if(!CFP_LEVEL[c.slug])throw Error('caring-planet: missing level for '+c.slug);}

const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

/* ---- The class page: cover leads, five shelves carry the whole deck,
   every card downloads and prints straight from this page ------------------ */
function tile(c){
 const pills=`<span class="fc-pillrow"><span class="fc-pill fc-pill-age">Ages 4\u20135</span><span class="fc-pill fc-pill-subject">${esc(c.sub)}</span><span class="fc-pill fc-pill-level">${CFP_LEVEL_NAMES[CFP_LEVEL[c.slug]]}</span><span class="fc-pill fc-pill-skill">${esc(CFP_SKILL[c.slug])}</span></span>`;
 return `<figure class="mn-card"><img src="${CFP_BASE}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong>${pills}<figcaption class="mn-tip">${esc(c.say)}</figcaption><div class="mn-actions"><a class="button" href="${CFP_BASE}${c.file}" download="${c.slug}.jpg">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}

export function cfpClassBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">LEARNING PATH \u00b7 CLASS 47 \u00b7 CARING FOR OUR PLANET \u00b7 AGES 4\u20135</span><h1>Caring for Our Planet — thirty printable eco flashcards for kids.</h1><p class="lesson-lede">Thirty printable caring-for-our-planet flashcards for ages four to five, all on this one page, in five shelves: the planting shelf, the critter shelf, the recycle shelf, the power-down shelf and the every-day shelf. Every card shows five small eco actions a child can do TODAY — plant a tree, close the tap, rescue a bee, sort the waste, turn off the light — with Download and Print buttons right under the picture. Small actions, big difference: pick a card, do one thing, and the planet says thank you.</p><div class="lesson-start"><a class="button button-ghost" href="/learning-path/">Back to the Learning Path <span aria-hidden="true">\u2197</span></a></div></div><figure class="lesson-cover"><img src="${CFP_BASE}${CFP_COVER.file}" width="${CFP_COVER.w}" height="${CFP_COVER.h}" alt="${esc(CFP_COVER.alt)}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>One small action. Your hands do it. The planet feels it.</h2><p class="lesson-copy">Caring for our planet is the first science a child can DO with their whole body — before the words ecosystem or compost, comes the feeling of dropping one peel into the compost bin and watching it become soil. Every card in this class prints five small actions in one cheerful color family: the planting cards grow things, the critter cards feed and rescue animals, the recycle cards sort the world into paper, glass and treasure, the power-down cards flip switches off, and the every-day cards ride along from breakfast to bedtime. You do not need a plan — you need a watering can, a windowsill and maybe one very brave worm.</p><p class="lesson-copy">The shelves follow a green day. Planting starts with dirt under the fingernails — a tree, some bulbs, a pollinator patch. The Critter Shelf makes you the hero of the birds, the bees and the earthworms. The Recycle Shelf turns the bins into a sorting relay. Power-Down hunts the switches and taps that secretly sip. And the Every-Day Shelf carries the small stuff — a lunchbox packed with pride, a bike washed with a bucket, seeds saved from tonight\u2019s dinner. Do one card a day and by summer the whole street is greener.</p></section>`;
 const shelfSections=CFP_SHELVES.map(sh=>`<section class="wrap lesson-section" id="shelf-${sh.id}"><span class="eyebrow">${sh.label}</span><h2>${sh.h2}</h2><p class="fc-hint">${sh.hint} Every card shows five labeled eco actions, carries its four pills — age, subject, grade level, skill — and downloads and prints straight from this page at its own size: seven of the cards are wide, the rest are tall, and each one keeps its true shape.</p><div class="mn-cards">${sh.slugs.map(s=>tile(cfpBySlug[s])).join('')}</div></section>`).join('');
 const around=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where the green habits grow up.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/4-years/science-nature-and-discovery/">Science, Nature &amp; Discovery in Class 31 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/animals-and-their-habitats/">Animals &amp; Their Habitats in Class 36 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/earth-and-space/">Our Earth &amp; Space in Class 43 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/learning-path/">The Learning Path <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Class 31 runs the experiments — sink or float, seeds sprouting, the water cycle — and this class turns those discoveries into daily habits. Class 36 walks through the habitats — the meadow, the pond, the ice — and the Critter Shelf here is where you become those animals\u2019 helper. Class 43 flies up to the whole blue planet, and this class is where the blue planet gets personal: your tap, your tree, your street. And when you want the next class, the Learning Path holds all forty-nine in order — and the whole deck prints again from the <a href="/flashcards/caring-for-our-planet/">Caring for Our Planet parents\u2019 shelf</a>.</p></section>`;
 return `${hero}${how}${shelfSections}${around}<p class="lesson-note"><strong>Small actions, big difference.</strong> Every card here hands you one thing the planet can feel by tonight — a seed in the ground, a tap closed tight, a bee rescued with a glass and a steady hand. That is the whole lesson, and it is already yours.</p>`;
}

/* ---- The parents' shelf: the whole deck on ONE library page --------------- */
export const CFP_LIB_SET={slug:'caring-for-our-planet',url:'/flashcards/caring-for-our-planet/',name:'Caring for Our Planet',
 ageLabel:'4–5',stageName:null,
 hubBlurb:'The parents\u2019 shelf for Class 47: all thirty eco flashcards with a download and a print button under every image — age, subject, level and skill pills on each card, printing straight from the shelf, no card pages. The child\u2019s lesson lives in the Caring for Our Planet class.',
 coverUrl:CFP_BASE+CFP_COVER.file,
 cover:{w:CFP_COVER.w,h:CFP_COVER.h,alt:CFP_COVER.alt},
 cards:CARDS.map(c=>({slug:c.slug,word:c.word}))};

function libTile(c){
 const pillRow=`<span class="fc-pillrow"><span class="fc-pill fc-pill-age">Ages 4–5</span><span class="fc-pill fc-pill-subject">${esc(c.sub)}</span><span class="fc-pill fc-pill-level">${CFP_LEVEL_NAMES[CFP_LEVEL[c.slug]]}</span><span class="fc-pill fc-pill-skill">${esc(CFP_SKILL[c.slug])}</span></span>`;
 return `<figure class="mn-card"><img src="${CFP_BASE}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong>${pillRow}<figcaption class="mn-tip">${esc(c.try)}</figcaption><div class="mn-actions"><a class="button" href="${CFP_BASE}${c.file}" download="${c.slug}.jpg">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}

export function cfpLibBody(){
 const intro=`<section class="wrap lesson-section"><p class="lesson-copy">This is the parents\u2019 copy of <a href="/caring-for-our-planet/">Class 47 \u00b7 Caring for Our Planet</a>: all thirty eco flashcards on one shelf, ready to print. You do not need a plan — pick the green habit your week needs most, download the card, and print it full size on A4 or Letter paper. Every card carries one try-it job underneath and four pills on top: the age it suits, the subject it teaches, the grade level to start at, and the skill it builds. The download button takes the full-resolution JPG; the print button runs a single card through your printer with nothing else on the page. There are no card pages to hop through: the shelf is the whole set.</p><p class="lesson-copy">The shelf is yours; the lesson is your child\u2019s. The class page at <a href="/caring-for-our-planet/">Caring for Our Planet</a> teaches each action the way a teacher would — spoken to your child, the eco job named plainly, one small thing to do today — while this wall simply holds the deck for printing. Same thirty cards, two jobs: the lesson lives in the class, the library is where parents print.</p></section>`;
 const levels=`<section class="wrap lesson-section"><span class="eyebrow">THE THREE LEVELS</span><h2>Preschool, Grade 1, Grade 2.</h2><p class="fc-hint">Every card wears a level pill so tonight\u2019s card takes one glance to choose. The levels are a suggested order, not a test — the green job your week needs most is always the right card.</p><ol class="fc-steps"><li><span class="fc-stepnum">01</span><div><h3>${CFP_LEVEL_NAMES[1]}</h3><p>${CFP_LEVEL_BLURB[1]}.</p></div></li><li><span class="fc-stepnum">02</span><div><h3>${CFP_LEVEL_NAMES[2]}</h3><p>${CFP_LEVEL_BLURB[2]}.</p></div></li><li><span class="fc-stepnum">03</span><div><h3>${CFP_LEVEL_NAMES[3]}</h3><p>${CFP_LEVEL_BLURB[3]}.</p></div></li></ol></section>`;
 const heads={planting:'The planting shelf — seeds, shade and flowers.',critters:'The critter shelf — the bird, the bee and the worm.',recycle:'The recycle shelf — the sorting game.',power:'The power-down shelf — the off-switch hunt.',everyday:'The every-day shelf — small choices that add up.'};
 const deck=CFP_SHELVES.map(sh=>{const cards=sh.slugs.map(s=>cfpBySlug[s]);return `<section class="wrap lesson-section"><span class="eyebrow">${sh.label}</span><h2>${heads[sh.id]}</h2><p class="fc-hint">${sh.hint} Download takes the full-resolution JPG; Print runs just that one card through the printer.</p><div class="mn-cards">${cards.map(libTile).join('')}</div></section>`;}).join('');
 const next=`<section class="wrap lesson-section"><span class="eyebrow">WHERE TO NEXT</span><h2>The lesson, the path, the rest of the library.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/caring-for-our-planet/">The Caring for Our Planet class <span>\u00b7 The child\u2019s lesson</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/learning-path/">The Learning Path <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/flashcards/">All flashcard sets <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/flashcards/earth-and-space/">The Our Earth &amp; Space parents\u2019 shelf <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Print a card here, teach the habit there: the <a href="/caring-for-our-planet/">Caring for Our Planet class</a> is the lesson side of this deck — one action a sitting, spoken to your child, with one small thing to do today. Once the deck is up on the fridge, the class page is the manual that makes each habit stick.</p></section>`;
 return `${intro}${levels}${deck}${next}${fcCommunityMount('/flashcards/caring-for-our-planet/')}`;
}

/* ---- Inbound-link blocks, appended at the three classes' page() calls ----- */
/* Appended to Class 31 · Science, Nature & Discovery. */
export const CFP_SCIENCE_LINK=`<section class="wrap lesson-section"><span class="eyebrow">FROM DISCOVERY TO DAILY HABITS</span><h2>Class 47 \u00b7 Caring for Our Planet.</h2><p class="lesson-copy">Class 31 discovers how the world works — seeds sprout, water cycles, magnets pull — and the <a href="/caring-for-our-planet/">Caring for Our Planet class</a> turns those discoveries into habits a four-year-old can do before dinner: thirty printable eco flashcards for ages 4\u20135, from planting a tree and rescuing a bee to sorting the recycling and switching off the lights, every card downloading and printing straight from the class page.</p></section>`;
/* Appended to Class 36 · Animals & Their Habitats. */
export const CFP_HABITATS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">BE THE HELPER THE HABITATS NEED</span><h2>Class 47 \u00b7 Caring for Our Planet.</h2><p class="lesson-copy">Class 36 walks the habitats — the meadow, the pond, the desert, the ice — and the <a href="/caring-for-our-planet/">Caring for Our Planet class</a> hands your child the helper\u2019s job for every one of them: thirty printable eco flashcards for ages 4\u20135 with a bird feeder to hang, a worm farm to build, a pond to keep clean and insects to rescue, every card printing straight from the class page.</p></section>`;
/* Appended to Class 43 · Our Earth & Space. */
export const CFP_EARTH_LINK=`<section class="wrap lesson-section"><span class="eyebrow">THE BLUE PLANET, MADE PERSONAL</span><h2>Class 47 \u00b7 Caring for Our Planet.</h2><p class="lesson-copy">Class 43 flies all the way out to the whole spinning Earth — and the <a href="/caring-for-our-planet/">Caring for Our Planet class</a> brings it home again: thirty printable eco flashcards for ages 4\u20135 where the big blue planet becomes your tap, your tree, your bin and your street, one small action at a time, every card downloading and printing straight from the class page.</p></section>`;
