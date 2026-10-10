// Kiddo School — Class 31 · Science, Nature & Discovery (ages 4–5).
// Thirty real, playable science games at /preschool/science/adventures/{slug}/.
//
// ARTWORK AUDIT (all 30 files viewed and mapped by CONTENT):
// · Files 01–19 match their own titles.
// · Files 20–30 are shifted one slot: each file carries the NEXT activity's
//   artwork (e.g. 20-monkeys-sound-lab.webp actually shows Fox's Compass
//   Adventure; 26-chameleons-camouflage-hunt.webp actually shows Monkey's
//   Sound Lab). Every game here therefore loads the file whose BAKED-IN
//   title matches its activity — verified tile by tile during the audit —
//   so every page shows the right science on the right art.
// · All artwork is 1748×1240. Baked-in titles/instructions agree with the
//   activity titles below.
// Mechanics: ask (picture questions), order (number the stages), match (two
// columns), multi (tap everything that belongs), sort (tap a picture, then
// its bin) and spot-the-difference is not needed here. Progress saves per
// selected child; opening a page never counts as completing anything.
import {crumbNav,esc} from './adventure-kit.mjs';
import {SCIENCE_BASE,SCIENCE_LIB,C31_PATH,WS31_PATH,board} from './story-kit.mjs';
export {SCIENCE_LIB_PATH,WS31_PATH,C31_PATH} from './story-kit.mjs';
const SCIENCE_LIB_PATH=SCIENCE_LIB;

const W=1748,H=1240;

export const SCIENCE_TOTAL=30;
export const SCIENCE_READY=30;

const G=o=>o;
export const scienceAdventures=[
/* ---------- 01–05: grow, weather, bugs, water, homes ---------- */
G({num:1,slug:'bunnys-plant-growth-lab',img:'01-bunnys-plant-growth-lab.webp',title:'Bunny\u2019s Plant Growth Lab',skill:'How plants grow',
 tag:'Seed, sprout, stem, sunflower \u2014 number the four steps of Bunny\u2019s plant in growing order.',
 say:'Bunny planted a seed and watched it grow! Tap the pictures in growing order: first, next, then, and last.',
 hint:'That\u2019s how a plant grows!',doneTitle:'The plant is fully grown!',doneSub:'Seed, sprout, seedling, sunflower \u2014 you numbered the whole life of a plant.',
 alt:'Four boxes show a plant\u2019s growth \u2014 seeds in soil, a small sprout, a taller seedling, and a tall sunflower \u2014 each with an empty number square below.',
 artNote:'The artwork shows the four stages out of order on purpose, with empty number squares to fill: seeds in soil, sprout, seedling, sunflower.',
 parentNote:'Growth sequencing is science and storytelling at once. Say the stages aloud while tapping, then spot real plants outside \u2014 which stage is the dandelion by the gate in?',
 steps:[{type:'order',ask:'Tap Bunny\u2019s plant in growing order \u2014 first to last.',
  cards:[{label:'Seeds in the soil',crop:[3,11.5,22.5,26],seq:0,say:'First: the seed goes into the soil!'},
         {label:'A small sprout',crop:[26,11.5,45.5,26],seq:1,say:'Next: a tiny sprout pops up!'},
         {label:'A taller seedling with leaves',crop:[49,11.5,68.5,26],seq:2,say:'Then: the seedling grows taller!'},
         {label:'A tall sunflower',crop:[71.5,11.5,91.5,26],seq:3,say:'Last: a great big sunflower!'}]}]}),
G({num:2,slug:'penguins-weather-lab',img:'02-penguins-weather-lab.webp',title:'Penguin\u2019s Weather Lab',skill:'Weather and what we wear',
 tag:'Sunny, rainy, snowy \u2014 match each kind of weather to the clothes that fit it.',
 say:'Look at each weather picture, then tap the clothes that match it. What do we wear on a sunny day?',
 hint:'That\u2019s the right outfit!',doneTitle:'Weather-ready!',doneSub:'Sun hat for sunshine, raincoat for rain, warm coat for snow \u2014 Penguin is dressed for anything.',
 alt:'Three weather cards \u2014 sunny, rainy and snowy \u2014 beside three outfit cards: a warm winter coat with mittens and boots, a raincoat with an umbrella, and a sun hat with sunglasses.',
 parentNote:'Weather-to-clothes matching builds observation plus self-care talk: ask what YOUR child wears on a rainy day, and why umbrellas do not help much in snow.',
 steps:[{type:'match',ask:'Tap a weather picture, then tap the clothes that match it.',
  cards:[{label:'Sunny weather',crop:[2.5,43,33,52],group:'a',pair:'sunny',say:'A sunny day!'},
         {label:'Rainy weather',crop:[2.5,53,33,62],group:'a',pair:'rainy',say:'Rain is falling!'},
         {label:'Snowy weather',crop:[2.5,63,33,72.5],group:'a',pair:'snowy',say:'Snow is falling!'},
         {label:'A warm winter coat, mittens and boots',crop:[59.5,43,97,52.5],group:'b',pair:'snowy'},
         {label:'A raincoat and an umbrella',crop:[59.5,53,97,62],group:'b',pair:'rainy'},
         {label:'A sun hat and sunglasses',crop:[59.5,63,97,72.5],group:'b',pair:'sunny'}]}]}),
G({num:3,slug:'foxes-bug-detective',img:'03-foxes-bug-detective.webp',title:'Fox\u2019s Bug Detective',skill:'What makes an insect',
 tag:'Six creepy-crawlies, one rule \u2014 count the legs and tap every true insect.',
 say:'Fox is counting legs! Insects have six legs. Tap all the insects \u2014 and leave the ones with too many or no legs at all.',
 hint:'Count the legs!',doneTitle:'All insects found!',doneSub:'Butterfly, ladybug and ant have six legs each. Spider has eight, and snails and worms have none!',
 alt:'Six animal cards: butterfly, spider, ladybug, snail, ant and earthworm.',
 artNote:'A genuinely fair insect lesson: the butterfly, ladybug and ant each show six legs; the spider shows eight; the snail and earthworm show none.',
 parentNote:'Counting legs is the classic insect rule. Count together out loud \u2014 six means insect \u2014 and then check a real bug in the garden with the same rule.',
 steps:[{type:'multi',ask:'Insects have six legs. Tap all the insects!',
  cards:[{label:'A butterfly',crop:[2.5,79,31.5,91],ok:true,say:'Six legs \u2014 the butterfly is an insect!'},
         {label:'A spider',crop:[33,79,62.5,91],ok:false,say:'Count again \u2014 eight legs! Spiders are not insects.'},
         {label:'A ladybug',crop:[64.5,79,94,91],ok:true,say:'Six legs \u2014 the ladybug is an insect!'},
         {label:'A snail',crop:[2.5,91.5,31.5,99],ok:false,say:'A snail has no legs at all \u2014 and one big foot!'},
         {label:'An ant',crop:[33,91.5,62.5,99],ok:true,say:'Six legs \u2014 the ant is an insect!'},
         {label:'An earthworm',crop:[64.5,91.5,94,99],ok:false,say:'Worms have no legs \u2014 not insects!'}]}]}),
G({num:4,slug:'bears-sink-or-float-lab',img:'04-bears-sink-or-float-lab.webp',title:'Bear\u2019s Sink or Float Lab',skill:'Predict and test',
 tag:'Wood, metal, cork, stone \u2014 guess first, then sort all six objects into the right tubs.',
 say:'Bear is testing objects in water! Tap a picture, then tap the tub where you think it belongs. What sinks \u2014 and what floats?',
 hint:'What do YOU predict?',doneTitle:'Lab results are in!',doneSub:'The cork, wooden block and boat float. The metal spoon, key and stone sink!',
 alt:'Six object cards \u2014 a wooden cube, a metal spoon, a cork, a stone, a toy boat and a metal key \u2014 above a water tub with a FLOAT bin and a SINK bin.',
 artNote:'This is a prediction game: the child sorts first, and the say-lines confirm the real result. The material is the clue \u2014 wood and cork float; metal and stone sink.',
 parentNote:'Sorting here is only half the fun: drop a spoon and a cork in the bath afterwards and let your child run the real experiment. Ask WHY the heavy-feeling boat still floats.',
 steps:[{type:'sort',ask:'Tap a picture, then tap its tub: float or sink?',
  cards:[{label:'A wooden cube',crop:[3,8,15.5,14.5],bin:'float',say:'Wood floats on water!'},
         {label:'A metal spoon',crop:[17,8,29.5,14.5],bin:'sink',say:'Metal sinks \u2014 plunk!'},
         {label:'A cork',crop:[31,8,44,14.5],bin:'float',say:'Cork is full of tiny air holes \u2014 it floats!'},
         {label:'A stone',crop:[46.5,8,59,14.5],bin:'sink',say:'Stones sink straight down!'},
         {label:'A toy boat',crop:[61,8,74.5,14.5],bin:'float',say:'Boats are built to float!'},
         {label:'A metal key',crop:[76.5,8,94,14.5],bin:'sink',say:'Keys sink \u2014 that\u2019s why they clink at the bottom!'}],
  bins:[{key:'float',label:'FLOAT',crop:[3,26.5,46,34]},{key:'sink',label:'SINK',crop:[49.5,26.5,94,34]}]}]}),
G({num:5,slug:'turtles-animal-homes',img:'05-turtles-animal-homes.webp',title:'Turtle\u2019s Animal Homes',skill:'Animals and habitats',
 tag:'A bird, a bee, a rabbit \u2014 draw each animal to the home it builds or finds.',
 say:'Every animal has a home! Tap an animal, then tap the home where it lives.',
 hint:'That\u2019s where it lives!',doneTitle:'Every animal is home!',doneSub:'The bird nests in a tree, the bee buzzes to the hive, and the rabbit hops underground.',
 alt:'Three animals \u2014 a bird, a bee and a rabbit \u2014 beside three homes: an underground rabbit burrow, a bird nest in a tree, and a beehive.',
 parentNote:'Habitat matching starts the biggest idea in ecology: animals live where their needs are met. Ask which home YOUR child would pick, and why burrows keep rabbits safe.',
 steps:[{type:'match',ask:'Tap an animal, then tap its home.',
  cards:[{label:'The bird',crop:[3,43.5,33,53.5],group:'a',pair:'nest',say:'Tweet! Where does a bird live?'},
         {label:'The bee',crop:[3,53.5,33,62.5],group:'a',pair:'hive',say:'Buzz! Where does a bee live?'},
         {label:'The rabbit',crop:[3,63,33,73.5],group:'a',pair:'burrow',say:'Hop hop! Where does a rabbit live?'},
         {label:'An underground rabbit burrow',crop:[53,43.5,94,53.5],group:'b',pair:'burrow'},
         {label:'A bird nest in a tree',crop:[53,53.5,94,62.5],group:'b',pair:'nest'},
         {label:'A beehive',crop:[53,63,94,73.5],group:'b',pair:'hive'}]}]}),
/* ---------- 06–10: day/night, light, leaves, ocean, senses ---------- */
G({num:6,slug:'owls-day-and-night-discovery',img:'06-owls-day-and-night-discovery.webp',title:'Owl\u2019s Day and Night Discovery',skill:'Day and night',
 tag:'Football in the sun, a sleeping child, butterflies at noon, an owl at midnight \u2014 DAY or NIGHT?',
 say:'Look at each picture. Does it happen in the DAY or at NIGHT? Tap your answer!',
 hint:'Sun means day \u2014 moon means night!',doneTitle:'Day and night sorted!',doneSub:'The football game and butterflies happen by day; sleeping and the owl happen at night.',
 alt:'Four scenes: a boy playing football in the sun, a child sleeping under a moon, butterflies and flowers in daylight, and an owl on a branch at night.',
 parentNote:'Day/night sorting links science to a child\u2019s own routine. Ask when THEY do each thing \u2014 breakfast is a day thing, and so is the school run.',
 steps:[
  {type:'ask',ask:'A boy plays football under a big smiling sun. Day or night?',ctx:[4.5,76,49,87],ctxLabel:'A boy playing football in the sunshine',
   cards:[{label:'DAY',crop:[9,87.3,24,91.7],ok:true,say:'The sun is up \u2014 it\u2019s day!'},
          {label:'NIGHT',crop:[27,87.3,45,91.7],ok:false,say:'Night has the moon \u2014 where is the sun?'}]},
  {type:'ask',ask:'A child sleeps under a crescent moon and stars. Day or night?',ctx:[51.5,76,96,87],ctxLabel:'A child sleeping under a night sky',
   cards:[{label:'DAY',crop:[55,87.3,70,91.7],ok:false,say:'The sun is asleep \u2014 so is the child!'},
          {label:'NIGHT',crop:[73,87.3,91,91.7],ok:true,say:'Moon and stars \u2014 it\u2019s night!'}]},
  {type:'ask',ask:'Butterflies flutter over flowers in bright sunshine. Day or night?',ctx:[4.5,92,49,99.5],ctxLabel:'Butterflies and flowers in daylight',
   cards:[{label:'DAY',crop:[9,87.3,24,91.7],ok:true,say:'Butterflies fly by day!'} ,
          {label:'NIGHT',crop:[27,87.3,45,91.7],ok:false,say:'Butterflies tuck up at night \u2014 this is day!'}]},
  {type:'ask',ask:'An owl watches from its branch under the moon. Day or night?',ctx:[51.5,92,96,99.5],ctxLabel:'An owl perched at night',
   cards:[{label:'DAY',crop:[55,87.3,70,91.7],ok:false,say:'Owls sleep by day \u2014 this is their bedtime!'},
          {label:'NIGHT',crop:[73,87.3,91,91.7],ok:true,say:'The owl wakes when the moon is out!'}]}]}),
G({num:7,slug:'foxes-rainbow-light-lab',img:'07-foxes-rainbow-light-lab.webp',title:'Fox\u2019s Rainbow Light Lab',skill:'What light does',
 tag:'A prism, a flashlight, a sunlit dinosaur \u2014 match each light clue to the picture it makes.',
 say:'Light makes amazing pictures! Tap a light clue, then tap the picture it makes.',
 hint:'Follow the light!',doneTitle:'Light solved!',doneSub:'A prism bends light into a rainbow, a flashlight casts a bright circle, and sunlight paints a shadow.',
 alt:'Three light clues \u2014 a prism splitting light, a flashlight beam, and a sunlit dinosaur \u2014 beside three result pictures: a shadow, a rainbow, and a bright circle.',
 parentNote:'Three genuine light phenomena in one game. Try them at home: a CD or glass of water makes rainbows, a torch makes shadow puppets \u2014 the say-lines set up the experiments.',
 steps:[{type:'match',ask:'Tap a light clue, then tap the picture it makes.',
  cards:[{label:'A prism splitting light',crop:[2.5,10.5,39.5,17.5],group:'a',pair:'rainbow',say:'A prism bends light into all its colours!'},
         {label:'A flashlight beam',crop:[2.5,18,39.5,25],group:'a',pair:'circle',say:'A flashlight shines a bright spot!'},
         {label:'A sunlit dinosaur',crop:[2.5,25.5,39.5,33],group:'a',pair:'shadow',say:'Sunlight is shining on the dinosaur!'},
         {label:'A rainbow',crop:[63,18,97,25],group:'b',pair:'rainbow'},
         {label:'A bright circle of light',crop:[63,25.5,97,33],group:'b',pair:'circle'},
         {label:'A dinosaur shadow',crop:[63,10.5,97,17.5],group:'b',pair:'shadow'}]}]}),
G({num:8,slug:'squirrels-leaf-detective',img:'08-squirrels-leaf-detective.webp',title:'Squirrel\u2019s Leaf Detective',skill:'Leaves and trees',
 tag:'Oak, maple, pine \u2014 match each leaf to the tree it fell from.',
 say:'Squirrel found three leaves! Tap a leaf, then tap the tree it belongs to.',
 hint:'Look at the leaf\u2019s shape!',doneTitle:'All leaves matched!',doneSub:'Pointy oak to oak tree, hand-shaped maple to maple tree, needles to the pine!',
 alt:'Three leaves \u2014 an oak leaf, a maple leaf and pine needles \u2014 beside three trees: pine, oak and maple.',
 parentNote:'Leaf matching is observation training with a real-world hook: collect leaves on a walk and find their trees. Say the leaf-shape clues out loud \u2014 rounded lobes, pointed fingers, needles.',
 steps:[{type:'match',ask:'Tap a leaf, then tap its tree.',
  cards:[{label:'An oak leaf',crop:[3,44.5,35,52.5],group:'a',pair:'oak',say:'Rounded lobes \u2014 an oak leaf!'},
         {label:'A maple leaf',crop:[3,53,35,61],group:'a',pair:'maple',say:'Pointy fingers \u2014 a maple leaf!'},
         {label:'Pine needles',crop:[3,61.5,35,69.5],group:'a',pair:'pine',say:'Thin needles \u2014 from a pine!'},
         {label:'A pine tree',crop:[61,44.5,94,52.5],group:'b',pair:'pine'},
         {label:'An oak tree',crop:[61,53,94,61],group:'b',pair:'oak'},
         {label:'A maple tree',crop:[61,61.5,94,69.5],group:'b',pair:'maple'}]}]}),
G({num:9,slug:'dolphins-ocean-discovery',img:'09-dolphins-ocean-discovery.webp',title:'Dolphin\u2019s Ocean Discovery',skill:'Ocean habitats',
 tag:'Camel, lion, octopus \u2014 tap every animal that really lives in the ocean.',
 say:'Dolphin wants ocean friends! Tap all the animals that live in the sea. Not every animal here likes salty water!',
 hint:'Who swims in the sea?',doneTitle:'Ocean friends found!',doneSub:'Dolphin, sea turtle, octopus and clownfish live in the ocean. Camel and lion stay on dry land!',
 alt:'Six animal cards: dolphin, camel, sea turtle, lion, octopus and clownfish.',
 parentNote:'Habitat sorting with a giggle built in \u2014 a camel in the coral! Ask what each wrong animal needs instead: sand, grass, sunshine.',
 steps:[{type:'multi',ask:'Tap all the animals that live in the ocean!',
  cards:[{label:'A dolphin',crop:[2.5,77,30,89.5],ok:true,say:'Dolphins dive and leap in the sea!'},
         {label:'A camel',crop:[32.5,77,60,89.5],ok:false,say:'Camels cross the sandy desert \u2014 not the sea!'},
         {label:'A sea turtle',crop:[62.5,77,94,89.5],ok:true,say:'Sea turtles paddle all day in the ocean!'},
         {label:'A lion',crop:[2.5,90,30,99],ok:false,say:'Lions roar on the grassy savanna!'},
         {label:'An octopus',crop:[32.5,90,60,99],ok:true,say:'Eight arms for hiding in the rocks!'},
         {label:'A clownfish',crop:[62.5,90,94,99],ok:true,say:'Clownfish dart between the coral!'}]}]}),
G({num:10,slug:'hedgehogs-five-senses-lab',img:'10-hedgehogs-five-senses-lab.webp',title:'Hedgehog\u2019s Five Senses Lab',skill:'The five senses',
 tag:'Eye, ear, nose, tongue, hand \u2014 match each sense to what it lets Hedgehog do.',
 say:'You have five senses! Tap a sense, then tap what it helps you do.',
 hint:'Which body part does that?',doneTitle:'All five senses matched!',doneSub:'Eyes look, ears hear, noses smell, tongues taste, and hands touch!',
 alt:'Five sense organs \u2014 eye, ear, nose, tongue and hand \u2014 beside five hedgehog scenes: smelling a flower, touching a teddy bear, looking at a rainbow, hearing a bell, and tasting watermelon.',
 parentNote:'The five senses are a nursery classic because they are testable everywhere. After the game, play sense roulette: close your eyes and name what you hear, smell or touch.',
 steps:[{type:'match',ask:'Tap a sense, then tap what it helps you do.',
  cards:[{label:'The eye',crop:[3,7.5,26,12.5],group:'a',pair:'look',say:'Eyes look!'},
         {label:'The ear',crop:[3,13,26,18],group:'a',pair:'hear',say:'Ears hear!'},
         {label:'The nose',crop:[3,18.5,26,23.5],group:'a',pair:'smell',say:'Noses smell!'},
         {label:'The tongue',crop:[3,24,26,29],group:'a',pair:'taste',say:'Tongues taste!'},
         {label:'The hand',crop:[3,29.5,26,34.5],group:'a',pair:'touch',say:'Hands touch!'},
         {label:'Hedgehog smelling a flower',crop:[55,7,97,13],group:'b',pair:'smell'},
         {label:'Hedgehog touching a soft teddy bear',crop:[55,13,97,18.5],group:'b',pair:'touch'},
         {label:'Hedgehog looking at a rainbow',crop:[55,18.5,97,24],group:'b',pair:'look'},
         {label:'Hedgehog hearing a ringing bell',crop:[55,24,97,29.5],group:'b',pair:'hear'},
         {label:'Hedgehog tasting a slice of watermelon',crop:[55,29.5,97,35],group:'b',pair:'taste'}]}]}),
/* ---------- 11–15: magnets, seasons, life cycle, tracks, ice ---------- */
G({num:11,slug:'bears-magnet-mystery',img:'11-bears-magnet-mystery.webp',title:'Bear\u2019s Magnet Mystery',skill:'Magnets attract metal',
 tag:'Paper clips, nails, wood, plastic \u2014 sort which objects the magnet will grab.',
 say:'Bear has a big magnet! Tap a picture, then tap the bin where it belongs. What will the magnet grab?',
 hint:'Magnets grab iron and steel!',doneTitle:'Magnet mystery solved!',doneSub:'The steel clip, iron nail and steel washer stick. The pencil, spoon and eraser are left behind!',
 alt:'Six object cards \u2014 a steel paper clip, an iron nail, a steel washer, a wooden pencil, a plastic spoon and a rubber eraser \u2014 with an ATTRACTS bin and a DOES NOT ATTRACT bin.',
 artNote:'Scientifically fair: everything on the ATTRACTS side is iron or steel; the pencil is wood, the spoon plastic, the eraser rubber.',
 parentNote:'Magnets only grab iron and steel \u2014 the name of the material is written right on each card. Say the material names together, then raid the kitchen drawer with a real fridge magnet (spoons first!).',
 steps:[{type:'sort',ask:'Tap a picture, then tap the bin where it belongs.',
  cards:[{label:'A steel paper clip',crop:[21.5,44,38.5,52],bin:'attract',say:'STEEL \u2014 the magnet grabs it!'},
         {label:'An iron nail',crop:[10.5,52.5,35,60],bin:'attract',say:'IRON \u2014 the magnet grabs it!'},
         {label:'A steel washer',crop:[10.5,60,35,67.5],bin:'attract',say:'STEEL \u2014 snapped up by the magnet!'},
         {label:'A wooden pencil',crop:[67.5,44,94,52],bin:'no',say:'Wood is not magnetic \u2014 the magnet ignores it!'},
         {label:'A plastic spoon',crop:[67.5,52.5,94,60],bin:'no',say:'Plastic is not magnetic!'},
         {label:'A rubber eraser',crop:[67.5,60,94,67.5],bin:'no',say:'Rubber is not magnetic either!'}],
  bins:[{key:'attract',label:'ATTRACTS',crop:[3,68.5,45.5,76]},{key:'no',label:'DOES NOT ATTRACT',crop:[49.5,68.5,94,76]}]}]}),
G({num:12,slug:'penguins-seasons-discovery',img:'12-penguins-seasons-discovery.webp',title:'Penguin\u2019s Seasons Discovery',skill:'The four seasons',
 tag:'Blossoms, sunshine, falling leaves, bare snow \u2014 match each season to its tree.',
 say:'The seasons change the trees! Tap a season, then tap the tree picture that matches it.',
 hint:'What does the tree look like?',doneTitle:'A year of trees!',doneSub:'Spring buds, summer green, autumn gold, winter bare \u2014 the whole year in four pictures.',
 alt:'Four season chips \u2014 spring, summer, autumn, winter \u2014 beside four tree pictures: falling colourful leaves, green leaves and sunshine, blossoms and buds, and a bare snowy tree.',
 parentNote:'Season matching turns a year into a story your child can retell. Ask which season comes AFTER each one, and what they wear in the snowy picture.',
 steps:[{type:'match',ask:'Tap a season, then tap the tree that matches.',
  cards:[{label:'SPRING',crop:[4,79,24.5,84],group:'a',pair:'spring',say:'Spring \u2014 new buds!'},
         {label:'SUMMER',crop:[4,84.5,24.5,89.5],group:'a',pair:'summer',say:'Summer \u2014 hot and green!'},
         {label:'AUTUMN',crop:[4,90,24.5,95],group:'a',pair:'autumn',say:'Autumn \u2014 leaves fall!'},
         {label:'WINTER',crop:[4,95.5,24.5,99.5],group:'a',pair:'winter',say:'Winter \u2014 cold and snowy!'},
         {label:'Falling colourful leaves',crop:[61,72.5,97,79.5],group:'b',pair:'autumn'},
         {label:'Green leaves and sunshine',crop:[61,80,97,87],group:'b',pair:'summer'},
         {label:'Blossoms and buds',crop:[61,87.5,97,94.5],group:'b',pair:'spring'},
         {label:'A bare snowy tree',crop:[61,95,97,99.5],group:'b',pair:'winter'}]}]}),
G({num:13,slug:'butterflys-life-cycle',img:'13-butterflys-life-cycle.webp',title:'Butterfly\u2019s Life Cycle',skill:'Life cycles',
 tag:'Egg, caterpillar, chrysalis, butterfly \u2014 number the four stages of a butterfly\u2019s life.',
 say:'A butterfly grows in four steps! Tap the pictures in life order: first, next, then, and last.',
 hint:'Every butterfly starts as an egg!',doneTitle:'Metamorphosis complete!',doneSub:'Egg on a leaf, munching caterpillar, quiet chrysalis \u2014 then wings!',
 alt:'Four boxes show a butterfly\u2019s life cycle \u2014 an adult butterfly, eggs on a leaf, a caterpillar eating a leaf, and a green chrysalis \u2014 each with an empty number square below.',
 artNote:'The artwork deliberately shows the stages out of order: butterfly, eggs, caterpillar, chrysalis. The real order is eggs first, butterfly last.',
 parentNote:'Metamorphosis is the most dramatic growth story in the garden \u2014 retell it with hand actions (egg, munch, sleep, FLUTTER) and then read The Very Hungry Caterpillar together.',
 steps:[{type:'order',ask:'Tap the butterfly\u2019s life in order \u2014 first to last.',
  cards:[{label:'An adult butterfly',crop:[2.5,10,24,24.5],seq:3,say:'Last: the butterfly spreads its wings!'},
         {label:'Eggs on a leaf',crop:[26.5,10,48,24.5],seq:0,say:'First: tiny eggs on a leaf!'},
         {label:'A hungry caterpillar',crop:[50,10,71.5,24.5],seq:1,say:'Next: the caterpillar munches and grows!'},
         {label:'A green chrysalis',crop:[73.5,10,95.5,24.5],seq:2,say:'Then: a rest inside the chrysalis!'}]}]}),
G({num:14,slug:'raccoons-footprint-hunt',img:'14-raccoons-footprint-hunt.webp',title:'Raccoon\u2019s Footprint Hunt',skill:'Animal tracking',
 tag:'Duck, cat, horse \u2014 match each animal to the print its feet leave behind.',
 say:'Whose footprint is that? Tap an animal, then tap the print its feet make!',
 hint:'Look at the feet first!',doneTitle:'Trail solved!',doneSub:'Webbed duck feet, round cat paws, and one big horseshoe hoofprint!',
 alt:'Three animals \u2014 a duck, a cat and a horse \u2014 beside three prints: a hoofprint, a pawprint and a webbed footprint.',
 parentNote:'Tracking is detective play with muddy real-world payoffs: after rain, hunt for prints and guess the maker. Webbed vs paw vs hoof is a shape story worth retelling.',
 steps:[{type:'match',ask:'Tap an animal, then tap its footprint.',
  cards:[{label:'The duck',crop:[3,44,30,53.5],group:'a',pair:'webbed',say:'Quack! Look at my webbed feet!'},
         {label:'The cat',crop:[3,53.5,30,63],group:'a',pair:'paw',say:'Meow! My paws make round prints!'},
         {label:'The horse',crop:[3,63,30,73],group:'a',pair:'hoof',say:'Neigh! My hooves go clip-clop!'},
         {label:'A hoofprint',crop:[60,43,97,53],group:'b',pair:'hoof'},
         {label:'A pawprint',crop:[60,53.5,97,63],group:'b',pair:'paw'},
         {label:'A webbed footprint',crop:[60,63,97,73],group:'b',pair:'webbed'}]}]}),
G({num:15,slug:'polar-bears-ice-lab',img:'15-polar-bears-ice-lab.webp',title:'Polar Bear\u2019s Ice Lab',skill:'Melting and states',
 tag:'The sun is shining on an ice cube \u2014 predict what happens, then hear the science.',
 say:'The sun is warming a big ice cube! What happens when ice gets warm? Tap what you think \u2014 then hear the real answer!',
 hint:'What does the sun do to ice?',doneTitle:'Great thinking, scientist!',doneSub:'Warm ice melts into liquid water \u2014 the same water, just melted. Try it with real ice cubes!',
 alt:'A polar bear in a lab coat beside a bowl with a large ice cube under a smiling sun; three answer cards: liquid water, a rock, and a larger ice cube.',
 artNote:'A prediction set-up: the child commits to an answer first, and the say-line gives the real result \u2014 warm ice melts into liquid water.',
 parentNote:'Predict-then-check is the heart of science. Ask for the prediction BEFORE tapping, then run it for real: an ice cube in a bowl by a sunny window, checked every hour.',
 steps:[{type:'ask',ask:'The sun warms the ice cube. What happens?',ctx:[3,76,64,100],ctxLabel:'A polar bear beside an ice cube in a bowl with the sun above',
  cards:[{label:'It melts into liquid water',crop:[65,74.5,97,82],ok:true,say:'Yes! Warm ice melts into liquid water.'},
         {label:'It turns into a rock',crop:[65,82.5,97,90],ok:false,say:'A rock was never ice \u2014 ice just melts!'},
         {label:'It grows into a larger ice cube',crop:[65,90.5,97,98.5],ok:false,say:'Ice shrinks as it melts \u2014 it cannot grow!'}]}]}),
/* ---------- 16–20: living things, shadows, plant needs, food, sound ---------- */
G({num:16,slug:'pandas-living-or-nonliving-discovery',img:'16-pandas-living-or-nonliving-discovery.webp',title:'Panda\u2019s Living or Nonliving Discovery',skill:'Living and nonliving',
 tag:'Tree, car, rock, rabbit \u2014 tap everything that is truly alive.',
 say:'Panda is sorting the world into LIVING and NONLIVING! Tap all the living things. Living things grow, eat and breathe.',
 hint:'Does it grow and breathe?',doneTitle:'Living things found!',doneSub:'The tree, the butterfly and the baby rabbit are alive. Cars, rocks and chairs never grow!',
 alt:'Six picture cards: a tree, a toy car, a butterfly, a rock, a baby rabbit and a wooden chair.',
 parentNote:'Living/nonliving is the first brick of biology. The best test for a four-year-old: does it GROW, does it EAT, does it BREATHE? A car drinks petrol \u2014 but it never grows!',
 steps:[{type:'multi',ask:'Tap all the living things!',
  cards:[{label:'A tree',crop:[5,8.5,31,19.5],ok:true,say:'A tree is alive \u2014 it grows from a seed!'},
         {label:'A toy car',crop:[34,8.5,60,19.5],ok:false,say:'A car can drive \u2014 but it never grows!'},
         {label:'A butterfly',crop:[64,8.5,91.5,19.5],ok:true,say:'A butterfly is alive \u2014 it flies and sips nectar!'},
         {label:'A rock',crop:[5,20.5,31,31.5],ok:false,say:'Rocks have been here for ages \u2014 but they never grow!'},
         {label:'A baby rabbit',crop:[34,20.5,60,31.5],ok:true,say:'A baby rabbit is alive \u2014 it eats, hops and grows!'},
         {label:'A wooden chair',crop:[64,20.5,91.5,31.5],ok:false,say:'Wood was alive once \u2014 a chair is made, not born!'}]}]}),
G({num:17,slug:'owls-shadow-science',img:'17-owls-shadow-science.webp',title:'Owl\u2019s Shadow Science',skill:'Light and shadows',
 tag:'A teddy, an airplane, a dinosaur \u2014 spot the true shadow each toy casts.',
 say:'A light shines on each toy and makes a shadow! Tap the shadow that really matches the toy.',
 hint:'The shadow has the very same shape!',doneTitle:'Shadow detective!',doneSub:'Teddy\u2019s shadow has round ears, the airplane\u2019s has wings, and the dinosaur\u2019s has a big tail!',
 alt:'Three rows: a teddy bear, an airplane and a toy dinosaur, each with three shadow choices labelled A, B and C.',
 parentNote:'Shadow matching is silhouette geometry \u2014 the outline is the only clue. Torch-and-hand puppet shadows are the perfect next step.',
 steps:[
  {type:'ask',ask:'The teddy bear\u2019s shadow \u2014 which one is it?',ctx:[11,45.5,29,53.5],ctxLabel:'A teddy bear toy',
   cards:[{label:'Shadow A \u2014 a bear shape',crop:[32,45,50,53.5],ok:true,say:'Round ears and tummy \u2014 that\u2019s the teddy!'},
          {label:'Shadow B \u2014 a rabbit shape',crop:[52,45,68,53.5],ok:false,say:'Long ears \u2014 that\u2019s a rabbit, not a teddy!'},
          {label:'Shadow C \u2014 a black circle',crop:[72,45,91,53.5],ok:false,say:'Just a ball \u2014 where are the teddy\u2019s ears?'}]},
  {type:'ask',ask:'The airplane\u2019s shadow \u2014 which one is it?',ctx:[8,54.5,29,62.5],ctxLabel:'A toy airplane',
   cards:[{label:'Shadow A \u2014 a bicycle shape',crop:[30,54.5,50,62.5],ok:false,say:'Two wheels \u2014 that\u2019s a bicycle!'},
          {label:'Shadow B \u2014 an airplane shape',crop:[52,54.5,72,62.5],ok:true,say:'Wings and a tail \u2014 the airplane\u2019s shadow!'},
          {label:'Shadow C \u2014 a flower shape',crop:[73,54.5,91,62.5],ok:false,say:'Petals! Airplanes do not grow in gardens.'}]},
  {type:'ask',ask:'The toy dinosaur\u2019s shadow \u2014 which one is it?',ctx:[8,63.5,29,71.5],ctxLabel:'A toy dinosaur',
   cards:[{label:'Shadow A \u2014 a duck shape',crop:[30,63.5,50,71.5],ok:false,say:'A little duck \u2014 no big tail!'},
          {label:'Shadow B \u2014 a cat shape',crop:[52,63.5,70,71.5],ok:false,say:'Whiskers and pointy ears \u2014 a cat!'},
          {label:'Shadow C \u2014 a dinosaur shape',crop:[72,63.5,91,71.5],ok:true,say:'Big head, thick tail \u2014 dinosaur!'}]}]}),
G({num:18,slug:'elephants-plant-care-lab',img:'18-elephants-plant-care-lab.webp',title:'Elephant\u2019s Plant Care Lab',skill:'What plants need',
 tag:'Water, sunlight, air, candy? \u2014 tap the three things every plant needs to grow.',
 say:'Elephant is caring for a seedling! What does a plant need to grow? Tap all three things \u2014 and nothing else!',
 hint:'Plants drink, soak up sun, and breathe air!',doneTitle:'A happy plant!',doneSub:'Water, sunlight and air \u2014 that\u2019s a plant\u2019s whole shopping list. Candy, cars and shoes stay in the cupboard!',
 alt:'An elephant watering a potted seedling, with six option cards: water, sunlight, air, candy, a toy car, and shoes.',
 parentNote:'Needs-of-a-plant is easy to test for real: one seedling on the windowsill and one in the cupboard. Ask what a child needs to grow \u2014 the list overlaps nicely.',
 steps:[{type:'multi',ask:'Tap the three things a plant needs to grow!',
  cards:[{label:'Water',crop:[3,74.5,24,82.5],ok:true,say:'Every plant drinks water!'},
         {label:'Sunlight',crop:[3,83,24,91],ok:true,say:'Plants catch sunlight to make their food!'},
         {label:'Air',crop:[3,91.5,24,99.5],ok:true,say:'Plants breathe air \u2014 just like us!'},
         {label:'Candy',crop:[72,74.5,95,82.5],ok:false,say:'Plants have a sweet tooth for SUN, not sweets!'},
         {label:'A toy car',crop:[72,83,95,91],ok:false,say:'A car cannot help a seedling grow!'},
         {label:'Shoes',crop:[72,91.5,95,99.5],ok:false,say:'Shoes fit children \u2014 not plants!'}]}]}),
G({num:19,slug:'lions-animal-food-lab',img:'19-lions-animal-food-lab.webp',title:'Lion\u2019s Animal Food Lab',skill:'What animals eat',
 tag:'Rabbit, lion, panda \u2014 match each animal to the food it really eats.',
 say:'Time for animal lunch! Tap an animal, then tap the food it really eats.',
 hint:'Who eats meat? Who munches plants?',doneTitle:'Lunch is served!',doneSub:'The lion munches meat, the rabbit nibbles grass and leafy plants, and the panda crunches bamboo.',
 alt:'Three animals \u2014 a rabbit, a lion and a panda \u2014 beside three foods: bamboo leaves, meat, and grass and leafy plants.',
 parentNote:'Herbivore, carnivore, and the panda\u2019s famous bamboo habit \u2014 three diets, three teeth stories. Ask which one YOUR child eats: usually a bit of everything!',
 steps:[{type:'match',ask:'Tap an animal, then tap the food it eats.',
  cards:[{label:'The rabbit',crop:[3,8.5,33.5,17],group:'a',pair:'grass',say:'Nibble nibble! What does a rabbit eat?'},
         {label:'The lion',crop:[3,17.5,33.5,26],group:'a',pair:'meat',say:'Big roar! What does a lion eat?'},
         {label:'The panda',crop:[3,26.5,33.5,35],group:'a',pair:'bamboo',say:'Munch! What is a panda\u2019s favourite?'},
         {label:'Bamboo leaves',crop:[64,8.5,96,17],group:'b',pair:'bamboo'},
         {label:'Meat',crop:[64,17.5,96,26],group:'b',pair:'meat'},
         {label:'Grass and leafy plants',crop:[64,26.5,96,35],group:'b',pair:'grass'}]}]}),
G({num:20,slug:'monkeys-sound-lab',img:'26-chameleons-camouflage-hunt.webp',title:'Monkey\u2019s Sound Lab',skill:'How sounds are made',
 tag:'Drum, bell, guitar \u2014 match each instrument to the action that makes its sound.',
 say:'Music time! Tap an instrument, then tap the action that makes its sound.',
 hint:'Hit, ring, or pluck?',doneTitle:'The band is playing!',doneSub:'Strike the drum, ring the bell, pluck the guitar \u2014 three ways to make sound!',
 alt:'Three instruments \u2014 a drum, a bell and a guitar \u2014 beside three actions: plucking guitar strings, striking a drum, and ringing a bell.',
 artNote:'Loaded by content: the file named chameleons-camouflage-hunt actually carries this Monkey\u2019s Sound Lab artwork (the R2 export shifted files 20\u201330 by one slot).',
 parentNote:'Every sound is something moving \u2014 shaking, hitting, plucking. Feel it for real: put a hand on a drum while it plays, and watch guitar strings blur.',
 steps:[{type:'match',ask:'Tap an instrument, then tap how it makes sound.',
  cards:[{label:'A drum',crop:[2.5,46,35.5,54],group:'a',pair:'strike',say:'BOOM! What makes a drum boom?'},
         {label:'A bell',crop:[2.5,54.5,35.5,62.5],group:'a',pair:'ring',say:'DING! What makes a bell ring?'},
         {label:'A guitar',crop:[2.5,63,35.5,71],group:'a',pair:'pluck',say:'TWANG! What makes a guitar twang?'},
         {label:'Plucking the guitar strings',crop:[62,45.5,97,54],group:'b',pair:'pluck'},
         {label:'Striking a drum',crop:[62,54.5,97,62.5],group:'b',pair:'strike'},
         {label:'Ringing a bell',crop:[62,63,97,71.5],group:'b',pair:'ring'}]}]}),
/* ---------- 21–25: recycling, seeds, water cycle, Earth, compass ---------- */
G({num:21,slug:'turtles-recycling-mission',img:'27-elephants-air-power-lab.webp',title:'Turtle\u2019s Recycling Mission',skill:'Recycling sorting',
 tag:'Six clean items, three bins \u2014 paper, plastic or metal. Sort them all!',
 say:'Turtle needs a recycling helper! Tap a clean item, then tap its bin: PAPER, PLASTIC, or METAL.',
 hint:'What is it made of?',doneTitle:'Recycling hero!',doneSub:'Paper and cardboard to PAPER, bottles to PLASTIC, cans to METAL \u2014 the planet says thank you!',
 alt:'Six clean items \u2014 a newspaper, a cardboard box, a plastic water bottle, a plastic detergent bottle, an aluminium drink can and a clean steel food can \u2014 above three recycling bins: paper, plastic and metal.',
 artNote:'Loaded by content: the file named elephants-air-power-lab actually carries this Turtle\u2019s Recycling Mission artwork (the R2 export shifted files 20\u201330 by one slot).',
 parentNote:'Real-world science with instant practice: after the game, hunt the kitchen for one paper, one plastic and one metal item and sort them for real. Rinse first \u2014 clean items only!',
 steps:[{type:'sort',ask:'Tap an item, then tap the bin it belongs in.',
  cards:[{label:'A newspaper',crop:[2.5,77.5,17.5,90],bin:'paper',say:'Old news is PAPER \u2014 recycle it!'},
         {label:'A cardboard box',crop:[18.5,77.5,33.5,90],bin:'paper',say:'Cardboard is paper too!'},
         {label:'A plastic water bottle',crop:[35,77.5,50,90],bin:'plastic',say:'A bottle goes with the PLASTIC!'},
         {label:'A plastic detergent bottle',crop:[51.5,77.5,66.5,90],bin:'plastic',say:'Plastic again \u2014 into the PLASTIC bin!'},
         {label:'An aluminium drink can',crop:[68,77.5,83,90],bin:'metal',say:'Aluminium is a shiny METAL!'},
         {label:'A clean steel food can',crop:[84.5,77.5,96.5,90],bin:'metal',say:'Steel is METAL \u2014 it recycles for ever!'}],
  bins:[{key:'paper',label:'PAPER',crop:[26,93.5,47.5,100]},{key:'plastic',label:'PLASTIC',crop:[50.5,93.5,72,100]},{key:'metal',label:'METAL',crop:[74.5,93.5,96,100]}]}]}),
G({num:22,slug:'squirrels-seed-travel-discovery',img:'28-pandas-habitat-rescue.webp',title:'Squirrel\u2019s Seed Travel Discovery',skill:'How seeds travel',
 tag:'Parachutes, boats and hitch-hikers \u2014 match each seed to how it travels.',
 say:'Seeds go on amazing journeys! Tap a seed, then tap the way it travels.',
 hint:'Fly, float, or stick?',doneTitle:'Seed journeys complete!',doneSub:'Dandelion seeds sail on the wind, coconuts float on water, and burrs hitch-hike on fur!',
 alt:'Three seeds \u2014 dandelion seeds, a coconut and a burdock burr \u2014 beside three travel cards: animal fur, water, and wind.',
 artNote:'Loaded by content: the file named pandas-habitat-rescue actually carries this Squirrel\u2019s Seed Travel Discovery artwork (the R2 export shifted files 20\u201330 by one slot).',
 parentNote:'Seed travel explains why plants pop up in odd places. Blow a real dandelion, then check your socks for hitch-hikers after a walk \u2014 both are the same science.',
 steps:[{type:'match',ask:'Tap a seed, then tap how it travels.',
  cards:[{label:'Dandelion seeds',crop:[2.5,7.5,27,16],group:'a',pair:'wind',say:'Fluffy parachutes! How do they travel?'},
         {label:'A coconut',crop:[2.5,16.5,27,25],group:'a',pair:'water',say:'Big and hard \u2014 how does it travel?'},
         {label:'A burdock burr',crop:[2.5,25.5,27,34],group:'a',pair:'fur',say:'Sticky and prickly \u2014 how does it travel?'},
         {label:'On animal fur',crop:[66.5,7.5,95.5,16],group:'b',pair:'fur'},
         {label:'Floating on water',crop:[66.5,16.5,95.5,25],group:'b',pair:'water'},
         {label:'Flying on the wind',crop:[66.5,25.5,95.5,34],group:'b',pair:'wind'}]}]}),
G({num:23,slug:'hippos-water-cycle-lab',img:'29-penguins-hot-and-cold-lab.webp',title:'Hippo\u2019s Water Cycle Lab',skill:'The water cycle',
 tag:'Evaporation, clouds, rain \u2014 number the three steps of water\u2019s endless journey.',
 say:'Water goes round and round! Tap the three steps in order: what happens FIRST, NEXT, and LAST?',
 hint:'The sun lifts water up, clouds form, rain falls!',doneTitle:'The water cycle!',doneSub:'Evaporation lifts the water, clouds form, and rain falls down \u2014 then it all starts again!',
 alt:'Three labelled panels \u2014 rain over a landscape, evaporation with the sun and rising vapour, and cloud formation \u2014 each with an empty number square below.',
 artNote:'Loaded by content: the file named penguins-hot-and-cold-lab actually carries this Hippo\u2019s Water Cycle Lab artwork (the R2 export shifted files 20\u201330 by one slot). The panels sit in the order rain / evaporation / cloud formation; the true cycle order is evaporation first.',
 parentNote:'The water cycle is why we say rain \u201crecycles\u201d itself. Retell it at bath time: steam rises (evaporation!), a cool mirror makes fog (a cloud!), drops slide down (rain!).',
 steps:[{type:'order',ask:'Tap water\u2019s journey in order \u2014 first to last.',
  cards:[{label:'Rain falling on the land',crop:[2.5,45.5,30.5,64],seq:2,say:'Last: the rain falls down again!'},
         {label:'Evaporation \u2014 the sun lifts water up',crop:[32.5,45.5,61,64],seq:0,say:'First: the sun lifts water up as vapour!'},
         {label:'Cloud formation in the sky',crop:[64.5,45.5,93.5,64],seq:1,say:'Next: the vapour makes clouds!'}]}]}),
G({num:24,slug:'owls-earth-and-sun-discovery',img:'30-owls-science-graduation.webp',title:'Owl\u2019s Earth and Sun Discovery',skill:'Day, night and Earth',
 tag:'The sun shines on one side of Earth \u2014 tap the side where it is DAY.',
 say:'The sun always shines on half of Earth! Look which side the sunlight reaches, then tap the side where it is DAY.',
 hint:'Follow the yellow sunbeams!',doneTitle:'A day on Earth!',doneSub:'The sunlit side has day. The dark side has night \u2014 and Earth slowly spins so everyone takes turns!',
 alt:'An astronaut owl watches the sun shine on the left side of a globe; the right side is dark with stars. Two answer cards: the left side of Earth, or the right side.',
 artNote:'Loaded by content: the file named owls-science-graduation actually carries this Owl\u2019s Earth and Sun Discovery artwork (the R2 export shifted files 20\u201330 by one slot). The sun sits on the LEFT, so the left half is lit.',
 parentNote:'This is the real reason for day and night \u2014 not the sun switching off, but a spinning Earth. Play torch-and-ball tonight: the lit half is day, the dark half is night.',
 steps:[{type:'ask',ask:'Which side of Earth has DAY?',ctx:[2,77.5,97,95],ctxLabel:'The sun shining on one side of planet Earth',
  cards:[{label:'The left side, facing the sun',crop:[4.5,96.5,46.5,99.5],ok:true,say:'The sunbeams land there \u2014 it\u2019s DAY on the sunlit side!'},
         {label:'The right side, in the dark',crop:[51.5,96.5,94.5,99.5],ok:false,say:'No sunlight there \u2014 that side is having night!'}]}]}),
G({num:25,slug:'foxes-compass-adventure',img:'20-monkeys-sound-lab.webp',title:'Fox\u2019s Compass Adventure',skill:'Directions',
 tag:'North, east, south, west \u2014 learn which way each arrow points on Fox\u2019s compass.',
 say:'A compass always shows the way! The arrow pointing UP is NORTH, DOWN is SOUTH, RIGHT is EAST, and LEFT is WEST. Tap the direction I ask for!',
 hint:'Up is north \u2014 where does the sun rise? East!',doneTitle:'Navigator Fox!',doneSub:'North up, south down, east right, west left \u2014 you know your way around the world!',
 alt:'A fox beside a big compass with four arrows, and four direction words: east, north, west, south.',
 artNote:'Loaded by content: the file named monkeys-sound-lab actually carries this Fox\u2019s Compass Adventure artwork (the R2 export shifted files 20\u201330 by one slot).',
 parentNote:'Start with the body trick: face the sunrise (east), and north is on your left. Then hide a toy and navigate with \u201ctwo steps north, one step east!\u201d',
 steps:[
  {type:'ask',ask:'Which arrow points UP? Tap the word for that direction!',ctx:[23,45.5,66,68],ctxLabel:'A compass with four arrows',
   cards:[{label:'NORTH',crop:[70,50,89,55],ok:true,say:'The up arrow is NORTH!'},
          {label:'EAST',crop:[70,44,89,49],ok:false,say:'East points to the right \u2014 find the up arrow!'},
          {label:'WEST',crop:[70,56,89,60.5],ok:false,say:'West points left \u2014 which arrow points up?'},
          {label:'SOUTH',crop:[70,61,89,66],ok:false,say:'South points DOWN \u2014 look for the up arrow!'}]},
  {type:'ask',ask:'Which arrow points DOWN? Tap the word for that direction!',ctx:[23,45.5,66,68],ctxLabel:'A compass with four arrows',
   cards:[{label:'NORTH',crop:[70,50,89,55],ok:false,say:'North points up \u2014 which one points down?'},
          {label:'EAST',crop:[70,44,89,49],ok:false,say:'East points right \u2014 keep looking!'},
          {label:'WEST',crop:[70,56,89,60.5],ok:false,say:'West points left \u2014 not down!'},
          {label:'SOUTH',crop:[70,61,89,66],ok:true,say:'The down arrow is SOUTH!'}]},
  {type:'ask',ask:'Which arrow points RIGHT? Tap the word for that direction!',ctx:[23,45.5,66,68],ctxLabel:'A compass with four arrows',
   cards:[{label:'NORTH',crop:[70,50,89,55],ok:false,say:'North is up \u2014 where does the sun rise?'},
          {label:'EAST',crop:[70,44,89,49],ok:true,say:'The right arrow is EAST \u2014 where the sun rises!'},
          {label:'WEST',crop:[70,56,89,60.5],ok:false,say:'West is LEFT \u2014 try again!'},
          {label:'SOUTH',crop:[70,61,89,66],ok:false,say:'South is down \u2014 look right!'}]},
  {type:'ask',ask:'Which arrow points LEFT? Tap the word for that direction!',ctx:[23,45.5,66,68],ctxLabel:'A compass with four arrows',
   cards:[{label:'NORTH',crop:[70,50,89,55],ok:false,say:'North is up \u2014 find the left arrow!'},
          {label:'EAST',crop:[70,44,89,49],ok:false,say:'East is right \u2014 the opposite of the answer!'},
          {label:'WEST',crop:[70,56,89,60.5],ok:true,say:'The left arrow is WEST!'},
          {label:'SOUTH',crop:[70,61,89,66],ok:false,say:'South is down \u2014 look left!'}]}]}),
/* ---------- 26–30: camouflage, air power, habitats, temperature, graduation ---------- */
G({num:26,slug:'chameleons-camouflage-hunt',img:'21-turtles-recycling-mission.webp',title:'Chameleon\u2019s Camouflage Hunt',skill:'Camouflage',
 tag:'Leaves, bark, snow \u2014 in every habitat, tap the animal that blends right in.',
 say:'Some animals hide in plain sight \u2014 that\u2019s camouflage! Look at each habitat, then tap the animal that blends into it.',
 hint:'Match the colours!',doneTitle:'Camouflage hunter!',doneSub:'The green grasshopper hides in leaves, the stick insect vanishes on bark, and the white rabbit melts into snow!',
 alt:'Three habitat photos \u2014 green leaves, tree bark and snow \u2014 above a row of small animal cards: grasshopper, butterflies, ladybugs, a stick insect, a bee, a white rabbit and a frog.',
 artNote:'Loaded by content: the file named turtles-recycling-mission actually carries this Chameleon\u2019s Camouflage Hunt artwork (the R2 export shifted files 20\u201330 by one slot). The snow photo already shows the white rabbit hiding \u2014 a lovely spoiler to point out.',
 parentNote:'Camouflage is evolution a four-year-old can see: same colour = hidden. Play it at home \u2014 which toy vanishes on your sofa? Then look for hidden creatures on your next walk.',
 steps:[
  {type:'ask',ask:'Who hides in the green leaves?',ctx:[2,77.5,31,93.5],ctxLabel:'A photo of green leaves',
   cards:[{label:'A green grasshopper',crop:[2,95.5,12,100],ok:true,say:'Green on green \u2014 the grasshopper vanishes!'},
          {label:'A pink butterfly',crop:[12.5,95.5,22.5,100],ok:false,say:'Pink on green \u2014 easy to spot!'},
          {label:'A red ladybug',crop:[23,95.5,33,100],ok:false,say:'Red on green \u2014 no hiding there!'},
          {label:'A yellow bee',crop:[54.5,95.5,64.5,100],ok:false,say:'Yellow and black \u2014 stand out in leaves!'}]},
  {type:'ask',ask:'Who hides on the brown bark?',ctx:[33,77.5,64.5,93.5],ctxLabel:'A photo of brown tree bark',
   cards:[{label:'A stick insect',crop:[44,95.5,54,100],ok:true,say:'Thin and brown like a twig \u2014 the stick insect!'},
          {label:'A blue butterfly',crop:[33.5,95.5,43.5,100],ok:false,say:'Bright blue on brown bark \u2014 spotted!'},
          {label:'A green frog',crop:[75.5,95.5,85.5,100],ok:false,say:'Green on brown \u2014 the frog stands out!'},
          {label:'A red ladybug',crop:[86,95.5,96,100],ok:false,say:'Red on brown \u2014 not hidden at all!'}]},
  {type:'ask',ask:'Who hides in the white snow?',ctx:[67,77.5,97,93.5],ctxLabel:'A photo of snow',
   cards:[{label:'A white rabbit',crop:[65,95.5,75,100],ok:true,say:'White on white \u2014 the rabbit disappears!'},
          {label:'A green frog',crop:[75.5,95.5,85.5,100],ok:false,say:'Green in snow? Brrr \u2014 and easy to spot!'},
          {label:'A yellow bee',crop:[54.5,95.5,64.5,100],ok:false,say:'A bee in the snow would be very chilly \u2014 and visible!'},
          {label:'A red ladybug',crop:[86,95.5,96,100],ok:false,say:'Red dots on white snow \u2014 spotted instantly!'}]}]}),
G({num:27,slug:'elephants-air-power-lab',img:'22-squirrels-seed-travel-discovery.webp',title:'Elephant\u2019s Air Power Lab',skill:'Wind and moving things',
 tag:'Pinwheels, kites, feathers \u2014 tap everything the wind can move.',
 say:'The wind is blowing! Tap all the things that can move when the wind blows. Heavy things stay put!',
 hint:'Light things fly \u2014 heavy things stay!',doneTitle:'Wind power found!',doneSub:'The pinwheel spins, the kite soars, and the feather floats away. The rock, brick and anvil stay right where they are!',
 alt:'An elephant scientist beside six items: a pinwheel, a rock, a kite, a brick, a feather and a heavy anvil.',
 artNote:'Loaded by content: the file named squirrels-seed-travel-discovery actually carries this Elephant\u2019s Air Power Lab artwork (the R2 export shifted files 20\u201330 by one slot).',
 parentNote:'Wind moves light things \u2014 the start of weather science. Test it: blow a feather across the table, then try a brick! Ask what makes a kite stay UP.',
 steps:[{type:'multi',ask:'Tap everything the wind can move!',
  cards:[{label:'A pinwheel',crop:[29,8.5,49,19.5],ok:true,say:'Whoosh \u2014 the pinwheel spins in the breeze!'},
         {label:'A heavy rock',crop:[51.5,8.5,70.5,19.5],ok:false,say:'Too heavy \u2014 the rock does not budge!'},
         {label:'A kite',crop:[72.5,8.5,92.5,19.5],ok:true,say:'The kite dances high on the wind!'},
         {label:'A heavy brick',crop:[29,20,49,31],ok:false,say:'Bricks stay put \u2014 too heavy for wind!'},
         {label:'A feather',crop:[51.5,20,70.5,31],ok:true,say:'The feather floats away on the softest breeze!'},
         {label:'A heavy anvil',crop:[72.5,20,92.5,31],ok:false,say:'An anvil? Not even a hurricane!'}]}]}),
G({num:28,slug:'pandas-habitat-rescue',img:'23-hippos-water-cycle-lab.webp',title:'Panda\u2019s Habitat Rescue',skill:'Matching habitats',
 tag:'Camel, polar bear, frog, monkey \u2014 rescue every animal by sending it home.',
 say:'The animals are lost! Tap an animal, then tap the place where it lives.',
 hint:'Hot, cold, wet, or green?',doneTitle:'Every animal rescued!',doneSub:'Camel to the desert, polar bear to the ice, frog to the pond, monkey to the rainforest!',
 alt:'Four animals \u2014 a camel, a polar bear, a frog and a monkey \u2014 beside four places: a tropical rainforest, a freshwater pond, a sandy desert, and arctic sea ice and snow.',
 artNote:'Loaded by content: the file named hippos-water-cycle-lab actually carries this Panda\u2019s Habitat Rescue artwork (the R2 export shifted files 20\u201330 by one slot).',
 parentNote:'Habitat matching builds empathy plus geography: ask what would happen if the polar bear swapped with the camel. The giggles carry the learning.',
 steps:[{type:'match',ask:'Tap an animal, then tap where it lives.',
  cards:[{label:'The camel',crop:[2.5,44.5,32,52.5],group:'a',pair:'desert',say:'The camel\u2019s hump loves the hot desert!'},
         {label:'The polar bear',crop:[2.5,52.5,32,60.5],group:'a',pair:'arctic',say:'Brrr! Where is it cold and icy?'},
         {label:'The frog',crop:[2.5,60.5,32,68.5],group:'a',pair:'pond',say:'Ribbit! Frogs love to hop and swim \u2014 where?'},
         {label:'The monkey',crop:[2.5,68.5,32,76.5],group:'a',pair:'forest',say:'Ooh-ooh! Where do monkeys swing?'},
         {label:'A tropical rainforest',crop:[57,43.5,96,51.5],group:'b',pair:'forest'},
         {label:'A freshwater pond',crop:[57,51.5,96,59.5],group:'b',pair:'pond'},
         {label:'A sandy desert',crop:[57,59.5,96,67.5],group:'b',pair:'desert'},
         {label:'Arctic sea ice and snow',crop:[57,67.5,96,76],group:'b',pair:'arctic'}]}]}),
G({num:29,slug:'penguins-hot-and-cold-lab',img:'24-owls-earth-and-sun-discovery.webp',title:'Penguin\u2019s Hot and Cold Lab',skill:'Hot and cold',
 tag:'Soup, ice, cocoa, popsicle \u2014 tap HOT or COLD for each one.',
 say:'Things can be hot or cold! Look at each picture, then tap HOT or COLD.',
 hint:'Steam means hot \u2014 ice means cold!',doneTitle:'Temperature expert!',doneSub:'Soup and cocoa are HOT. The ice bowl and popsicle are COLD. Feel the steam \u2014 it always means hot!',
 alt:'Four picture cards \u2014 a steaming bowl of soup, a bowl of ice cubes, a mug of cocoa with marshmallows, and a blue popsicle \u2014 each with HOT and COLD circles.',
 artNote:'Loaded by content: the file named owls-earth-and-sun-discovery actually carries this Penguin\u2019s Hot and Cold Lab artwork (the R2 export shifted files 20\u201330 by one slot).',
 parentNote:'Temperature talk is safety talk: hot things can burn, and steam is the clue. The safe test for children: use your EYES first \u2014 steam or ice tells you before a finger does.',
 steps:[
  {type:'ask',ask:'A steaming bowl of soup. Hot or cold?',ctx:[25.5,75.5,56,88],ctxLabel:'A bowl of steaming soup',
   cards:[{label:'HOT',crop:[25.5,87.3,38.5,91.5],ok:true,say:'Steam curling up \u2014 the soup is HOT!'},
          {label:'COLD',crop:[40.5,87.3,54.5,91.5],ok:false,say:'Cold food does not steam \u2014 look again!'}]},
  {type:'ask',ask:'A bowl of ice cubes. Hot or cold?',ctx:[59.5,75.5,92.5,88],ctxLabel:'A bowl of ice cubes',
   cards:[{label:'HOT',crop:[25.5,87.3,38.5,91.5],ok:false,say:'Ice cannot be hot \u2014 it would melt!'},
          {label:'COLD',crop:[40.5,87.3,54.5,91.5],ok:true,say:'Ice is frozen water \u2014 very COLD!'}]},
  {type:'ask',ask:'A mug of cocoa with marshmallows. Hot or cold?',ctx:[25.5,90.5,56,99.5],ctxLabel:'A steaming mug of cocoa',
   cards:[{label:'HOT',crop:[25.5,87.3,38.5,91.5],ok:true,say:'Cocoa is best warm \u2014 and steamy!'},
          {label:'COLD',crop:[40.5,87.3,54.5,91.5],ok:false,say:'Cold cocoa? Sip it warm \u2014 this mug steams!'}]},
  {type:'ask',ask:'A frosty blue popsicle. Hot or cold?',ctx:[59.5,90.5,92.5,99.5],ctxLabel:'A blue popsicle',
   cards:[{label:'HOT',crop:[25.5,87.3,38.5,91.5],ok:false,say:'A hot popsicle is just a puddle!'},
          {label:'COLD',crop:[40.5,87.3,54.5,91.5],ok:true,say:'Frozen and frosty \u2014 a COLD treat!'}]}]}),
G({num:30,slug:'owls-science-graduation',img:'25-foxes-compass-adventure.webp',title:'Owl\u2019s Science Graduation',skill:'The grand science challenge',
 tag:'Plant growth, animal habitat, sink or float \u2014 solve all three puzzles and graduate!',
 say:'The final science challenge! Solve all three puzzles to graduate from Owl\u2019s Science Lab!',
 hint:'You know all of these!',doneTitle:'SCIENCE GRADUATE!',doneSub:'Three puzzles solved \u2014 plants grow, polar bears live on ice, and boats float. Hooray for you, scientist!',
 alt:'Three numbered puzzle cards: plant growth with seed and sprout, an animal habitat with a polar bear, and sink or float with a boat \u2014 each with three lettered answers.',
 artNote:'Loaded by content: the file named foxes-compass-adventure actually carries this Owl\u2019s Science Graduation artwork (the R2 export shifted files 20\u201330 by one slot). The three puzzles revisit earlier Class 31 skills.',
 parentNote:'A grand-finale mix: growth sequencing, habitat matching and floating logic \u2014 the whole class in three questions. Celebrate loudly; graduation caps are mandatory.',
 steps:[
  {type:'ask',ask:'Puzzle 1: the seed grew into a sprout. What comes next?',ctx:[3.5,12,31.5,26],ctxLabel:'A seed, an arrow, a sprout, an arrow, and a question mark',
   cards:[{label:'A flowering plant',crop:[4,26.5,31,31],ok:true,say:'Sprouts grow into flowering plants!'},
          {label:'A rock',crop:[4,31.5,31,36],ok:false,say:'A rock never grows \u2014 plants do!'},
          {label:'A toy car',crop:[4,36.5,31,41],ok:false,say:'Cars drive \u2014 they do not grow!'}]},
  {type:'ask',ask:'Puzzle 2: where does this polar bear live?',ctx:[34.5,12,63,26],ctxLabel:'A polar bear standing on ice',
   cards:[{label:'A hot desert',crop:[35,26.5,62.5,31],ok:false,say:'Too hot for a polar bear!'},
          {label:'Arctic sea ice',crop:[35,31.5,62.5,36],ok:true,say:'Icy and cold \u2014 just how polar bears like it!'},
          {label:'A tropical rainforest',crop:[35,36.5,62.5,41],ok:false,say:'Too steamy \u2014 polar bears need their ice!'}]},
  {type:'ask',ask:'Puzzle 3: this toy boat is put in water. What happens?',ctx:[66.5,12,95,26],ctxLabel:'A toy boat sailing on water',
   cards:[{label:'It floats on the water',crop:[67,26.5,94.5,31],ok:true,say:'Boats are built to float \u2014 smooth sailing!'},
          {label:'It sinks to the bottom',crop:[67,31.5,94.5,36],ok:false,say:'A toy boat stays on top \u2014 that\u2019s the point!'},
          {label:'It turns into ice',crop:[67,36.5,94.5,41],ok:false,say:'Only water freezes \u2014 boats stay boats!'}]}]}),
];
export const scienceBySlug=Object.fromEntries(scienceAdventures.map(g=>[g.slug,g]));

/* ---------- pages ---------- */
export function scienceAdventureBody(g){
 const list=scienceAdventures;
 const i=list.findIndex(x=>x.slug===g.slug);
 const prev=list[(i-1+list.length)%list.length];
 const next=list[(i+1)%list.length];
 const ws=WS31_PATH+g.slug+'/';
 return `${crumbNav([['Preschool','/preschool/'],['Science Adventures',SCIENCE_LIB],[g.num+'. '+esc(g.title)]])}
 <article class="wrap lesson-hero sa-hero">
  <div class="sa-hero-art"><img src="${SCIENCE_BASE}${g.img}" width="800" height="568" alt="${esc(g.alt)}" fetchpriority="high"></div>
  <div class="lesson-hero-copy">
   <span class="eyebrow">SCIENCE ADVENTURE ${g.num} · CLASS 31</span>
   <h1>${esc(g.title)}</h1>
   <div class="fc-chips lesson-chips"><span><strong>Age</strong> 4–5 Years</span><span><strong>Class</strong> 31 · Science</span><span><strong>Skill</strong> ${esc(g.skill)}</span></div>
   <p class="lesson-lede">${esc(g.tag)}</p>
   <div class="lesson-start"><a class="button" href="#play">Play the science game <span aria-hidden="true">↓</span></a><a class="button button-ghost" href="${ws}">Print the worksheet <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Play with a finger, a stylus or a mouse. Instructions are spoken aloud.</span></div>
  </div>
 </article>
 <section class="wrap lesson-section" id="play" aria-label="Play ${esc(g.title)}">
  <span class="eyebrow">PLAY · ${esc(g.skill).toUpperCase()}</span>
  <h2>${esc(g.title)}</h2>
  <p class="lesson-copy">${esc(g.say)}</p>
  ${board(SCIENCE_BASE,{...g,band:"science"},W,H)}
  <noscript><p class="sa-noscript">The tapping game needs JavaScript. Everything else on this page works without it \u2014 and the <a href="${ws}">matching worksheet</a> brings this experiment to paper.</p></noscript>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>Why this adventure helps.</h2>
  <p class="lesson-copy">${esc(g.parentNote||'This game trains '+g.skill.toLowerCase()+' on a real science picture: the questions are spoken aloud, the answers are pictures, and a miss brings a gentle hint instead of a penalty. Ask your child to predict out loud before tapping \u2014 the prediction is the science.')}</p>
  ${g.artNote?`<p class="lesson-copy"><strong>Illustration note:</strong> ${esc(g.artNote)}</p>`:''}
  <p class="lesson-copy">Prefer paper? The <a href="${ws}">${esc(g.title)} worksheet</a> prints the same experiment with room to think and draw \u2014 and a grown-up answer line. Printing never marks anything complete.</p>
 </section>
 <nav class="wrap lesson-section sa-prevnext" aria-label="More science adventures">
  <a class="sa-navcard" href="${SCIENCE_LIB}${prev.slug}/"><span class="eyebrow">Previous</span><strong>${esc(prev.title)}</strong></a>
  <a class="sa-navcard" href="${SCIENCE_LIB}"><span class="eyebrow">All adventures</span><strong>Science Library</strong></a>
  <a class="sa-navcard" href="${SCIENCE_LIB}${next.slug}/"><span class="eyebrow">Next</span><strong>${esc(next.title)}</strong></a>
 </nav>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP GOING</span><h2>Where next?</h2>
  <div class="fc-stages">
   <a class="fc-stage lesson-card-link" href="${C31_PATH}"><div class="fc-stage-pills"><span class="fc-age">Age 4–5</span><span class="fc-class">Class 31</span></div><h3>Science, Nature &amp; Discovery</h3><p>The class behind these adventures \u2014 all 30 science games plus off-screen experiment ideas.</p><span class="fc-open">Open Class 31 <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="${ws}"><div class="fc-stage-pills"><span class="fc-age">Age 4–5</span><span class="fc-class">Worksheet</span></div><h3>${esc(g.title)} worksheet</h3><p>The printable twin of this game \u2014 free PDF, print button, parent guide.</p><span class="fc-open">Open the worksheet <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/preschool/logic/adventures/"><div class="fc-stage-pills"><span class="fc-age">Age 4–5</span><span class="fc-class">Class 30</span></div><h3>Logic Adventures</h3><p>Thirty picture puzzles \u2014 the thinking side of science.</p><span class="fc-open">Open the Logic Library <span aria-hidden="true">↗</span></span></a>
  </div>
 </section>`;
}

const heading31=(eyebrow,h1,lede)=>`<div class="page-heading wrap"><span class="eyebrow">${eyebrow}</span><h1>${h1}</h1><p>${lede}</p></div>`;

export function scienceClassBody(){
 const shelves=[
  [1,'Grow and change','Seeds, butterflies and the water cycle \u2014 number the steps of how things grow and travel.',1,1],
  [2,'Weather, water and light','Dress for the weather, catch a rainbow, sort sink from float.',2,7],
  [3,'Leaves, ocean and senses','Match leaves to trees, find ocean friends, and put all five senses to work.',8,10],
  [4,'Magnets, seasons and life cycles','Mysteries of the magnet, the four seasons, and how a butterfly grows.',11,14],
  [5,'Ice, living things and care','Melting ice, living or not, and what every plant needs.',15,18],
  [6,'Food, sound and recycling','Animal lunches, instrument sounds and the recycling bins.',19,21],
  [7,'Journeys and directions','Seeds that travel, the water cycle, Earth\u2019s day side and a compass.',22,25],
  [8,'Camouflage, wind and the castle','Hidden animals, wind power, lost habitats \u2014 and the graduation lab.',26,30]];
 const grad=scienceAdventures.find(g=>g.num===30);
 return `${crumbNav([['Preschool','/preschool/'],['Age 4','/preschool/4-years/'],['Science, Nature &amp; Discovery']])}
 <article class="wrap lesson-hero"><div class="lesson-hero-copy">
  <span class="eyebrow">CLASS 31 · PRESCHOOL AGES 4–5</span>
  <h1>Science, Nature &amp; Discovery</h1>
  <div class="fc-chips lesson-chips"><span><strong>Age</strong> 4–5 Years</span><span><strong>Class</strong> 31 of 31</span><span><strong>Adventures</strong> 30 science games</span><span><strong>Subjects</strong> Plants · animals · weather · light · sound</span></div>
  <p class="lesson-lede">Explore plants, animals, weather, habitats, light, sound, water, and everyday science through playful discovery activities. Thirty real games \u2014 every one played on its own science illustration, with spoken instructions and a printable worksheet twin in the <a href="${WS31_PATH}">Science worksheet library</a>.</p>
  <p class="lesson-lede">Predictions to make, insects to count, magnets to test, habitats to match and one graduation lab \u2014 every question spoken aloud, every answer a picture.</p>
  <div class="lesson-start"><a class="button" href="#adventures">Meet the adventures <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Science is best in short, curious sittings.</span></div>
 </div></article>
 <section class="wrap lesson-section" id="adventures" aria-label="The science adventures">
  <span class="eyebrow">PLAY · THE ${SCIENCE_READY} SCIENCE ADVENTURES</span>
  <h2>Thirty science adventures.</h2>
  <p class="lesson-copy">Start anywhere curiosity points. The shelves run in a gentle order \u2014 grow first, graduate last \u2014 but every game stands alone. Each adventure twins with a printable worksheet at <a href="${WS31_PATH}">/worksheets/science/</a>.</p>
  ${shelves.map((sh,i)=>{const [,t,d,a,b]=sh;const items=scienceAdventures.filter(g=>g.num>=a&&g.num<=b);
   return `<div class="wa-shelf"><h3>${i+1}. ${t}</h3><p class="lesson-copy">${d}</p><div class="sa-grid">${items.map(g=>`<a class="sa-card sa-card-slim" href="${SCIENCE_LIB}${g.slug}/"><img src="${SCIENCE_BASE}${g.img}" width="400" height="284" alt="${esc(g.alt)}" loading="lazy"><span class="sa-card-body"><strong>${g.num}. ${esc(g.title)}</strong><span class="sa-card-skill">${esc(g.skill)}</span></span><span class="sa-card-play">Play <span aria-hidden="true">→</span></span></a>`).join('')}</div></div>`;}).join('')}
  <p class="lesson-note">All ${SCIENCE_READY} adventures are playable and printed today \u2014 Class 31 is complete, every game audited against its own artwork before it shipped.</p>
 </section>
 <section class="wrap lesson-section" id="off-screen" aria-label="Off-screen science play">
  <span class="eyebrow">TAKE IT OFF SCREEN</span>
  <h2>Science play at the kitchen table.</h2>
  <p class="lesson-copy">Drop a spoon and a cork in the bath (04). Melt an ice cube on the windowsill (15). Raid the recycling with a magnet (11, 21). Grow a bean in a jam jar (01, 18). Blow a dandelion and watch the seeds fly (22). Every game here has a real experiment hiding inside it \u2014 the picture is the invitation.</p>
 </section>
 <section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2>
  <p class="lesson-copy">Early science is predicting, testing and talking \u2014 never a quiz. Every game here asks your child to commit to a guess first, and every miss brings a friendly explanation instead of a penalty. The say-lines are written so YOU can steal them for bath time and walks.</p>
  <p class="lesson-copy">The worksheets are the paper twins \u2014 the same experiments with room to predict, circle and draw. <a href="${WS31_PATH}">Browse the science worksheets</a> and print the adventure your child loved. Playing games never marks a class complete; only real game finishes do, and only for the child chosen in <a href="/my-classroom/">My Classroom</a>.</p>
  <p class="lesson-copy"><a href="/about/#principal">More from the Principal\u2019s Office <span aria-hidden="true">↗</span></a></p>
 </section>
 <section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>What a scientist!</h2>
  <p class="lesson-copy">Every solved experiment builds the curiosity real science stands on. The shelves remember where you left off for your chosen child.</p>
  <div class="hero-actions"><a class="button" href="${SCIENCE_LIB}">Play more Science Adventures <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="${WS31_PATH}">Print the science worksheets <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
 </section>`;
}

export function scienceLibraryBody(){
 const shelves=[
  [1,'Grow and change','Seeds, butterflies and the water cycle \u2014 number the steps of how things grow.',1,1],
  [2,'Weather, water and light','Dress for the weather, catch a rainbow, sort sink from float.',2,7],
  [3,'Leaves, ocean and senses','Match leaves to trees, find ocean friends, and put all five senses to work.',8,10],
  [4,'Magnets, seasons and life cycles','Mysteries of the magnet, the four seasons, and how a butterfly grows.',11,14],
  [5,'Ice, living things and care','Melting ice, living or not, and what every plant needs.',15,18],
  [6,'Food, sound and recycling','Animal lunches, instrument sounds and the recycling bins.',19,21],
  [7,'Journeys and directions','Seeds that travel, the water cycle, Earth\u2019s day side and a compass.',22,25],
  [8,'Camouflage, wind and the castle','Hidden animals, wind power, lost habitats \u2014 and the graduation lab.',26,30]];
 return `${crumbNav([['Preschool','/preschool/'],['Science Adventures']])}
 ${heading31('SCIENCE ADVENTURES','Thirty science games you really play.','Plants, weather, magnets, habitats, light and sound \u2014 real discovery games played on our own science artwork, with spoken instructions and no reading required.')}
 <div class="lesson-start"><a class="button" href="${C31_PATH}">This way to Class 31 <span aria-hidden="true">→</span></a><span class="lesson-start-hint">The class that goes with these adventures: Science, Nature &amp; Discovery.</span></div>
 <section class="wrap section compact" data-st-lib aria-label="All science adventures">
  ${shelves.map((sh,i)=>{const [,t,d,a,b]=sh;const items=scienceAdventures.filter(g=>g.num>=a&&g.num<=b);
   return `<div class="wa-shelf"><h2>${i+1}. ${t}</h2><p class="lesson-copy">${d}</p><div class="sa-grid">${items.map(g=>`<a class="sa-card sa-card-slim" href="${SCIENCE_LIB}${g.slug}/"><img src="${SCIENCE_BASE}${g.img}" width="400" height="284" alt="${esc(g.alt)}" loading="lazy"><span class="sa-card-body"><strong>${g.num}. ${esc(g.title)}</strong><span class="sa-card-skill">${esc(g.skill)}</span></span><span class="sa-card-play">Play <span aria-hidden="true">→</span></span></a>`).join('')}</div></div>`;}).join('')}
  <p class="lesson-note">Every card is one real game. Progress saves on this device for the child chosen in <a href="/my-classroom/">My Classroom</a> \u2014 opening a page never counts as playing it.</p>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP GOING</span><h2>More to explore.</h2>
  <div class="fc-stages">
   <a class="fc-stage lesson-card-link" href="${C31_PATH}"><div class="fc-stage-pills"><span class="fc-age">Age 4–5</span><span class="fc-class">Class 31</span></div><h3>Science, Nature &amp; Discovery</h3><p>The class behind these adventures, with off-screen experiment ideas for every game.</p><span class="fc-open">Open Class 31 <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="${WS31_PATH}"><div class="fc-stage-pills"><span class="fc-age">Age 4–5</span><span class="fc-class">Worksheets</span></div><h3>Science worksheets</h3><p>All 30 printable twins with free PDFs, print buttons and grown-up answer lines.</p><span class="fc-open">Open the science worksheets <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/preschool/logic/adventures/"><div class="fc-stage-pills"><span class="fc-age">Age 4–5</span><span class="fc-class">Class 30</span></div><h3>Logic Adventures</h3><p>Thirty picture puzzles with spoken instructions \u2014 the thinking companion shelf.</p><span class="fc-open">Open the Logic Library <span aria-hidden="true">↗</span></span></a>
  </div>
 </section>`;
}
