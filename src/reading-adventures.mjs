// Kiddo School — Class 29 · Storytime & Pre-Reading Comprehension (ages 4–5).
// Twenty-nine real, playable story games at
// /preschool/reading/adventures/{slug}/, built on the owner's Canva
// illustrations (29 of 30 verified on R2 under school/reading/adventures/ —
// the fox artwork ships under 'foxes-…' filenames, audited and mapped. 24 is
// Unicorn's Story Choice Garden per the owner's numbering; its artwork is not
// uploaded yet, so the slot is honestly reserved, never faked).
// Every game plays the REAL artwork: prompts are spoken, picture cards are
// sprite-cropped straight out of the illustration, and answers were verified
// against the actual art during the artwork audit. Progress saves per
// selected child; opening a page never counts as completing anything.
import {crumbNav,celebrate,esc} from './adventure-kit.mjs';
import {READING_BASE,READING_LIB,C29_PATH,WS29_PATH,board} from './story-kit.mjs';
export {READING_LIB_PATH,WS29_PATH,C29_PATH} from './story-kit.mjs';
const READING_LIB_PATH=READING_LIB;

const W=1920,H=1080;

export const READING_TOTAL=30;
export const READING_READY=29;
export const READING_PENDING=[
 {num:24,slug:'unicorns-story-choice-garden',title:'Unicorn\u2019s Story Choice Garden'}
];

const G=o=>o;
export const readingAdventures=[
G({num:1,slug:'bunnys-growing-garden',img:'01-bunnys-growing-garden.webp',title:'Bunny\u2019s Growing Garden',skill:'Story sequencing',
 tag:'Plant the seed, water the sprout, watch the flower grow \u2014 tap Bunny\u2019s day in the right order.',
 say:'Bunny planted a seed, watered it, and a flower grew! Tap the pictures in story order: first, next, and last.',
 hint:'Yes! That comes next in Bunny\u2019s story.',doneTitle:'The story is in order!',doneSub:'Seed, water, flower \u2014 you retold Bunny\u2019s whole day.',
 alt:'Three garden panels: Bunny watering a sprout, Bunny kneeling with a seed, and Bunny beside a grown pink flower, with number boxes below.',
 steps:[{type:'order',ask:'Tap the story in order \u2014 what happened first, next, and last?',
  cards:[{label:'Bunny waters the little sprout',crop:[2.34,15.93,26.25,73.24],seq:1,say:'First Bunny planted the seed, then watered the sprout.'},
         {label:'Bunny plants the seed in the soil',crop:[26.2,13.15,51.72,73.24],seq:0,say:'Planting the seed comes first!'},
         {label:'Bunny\u2019s flower has grown',crop:[50.73,13.15,76.25,73.24],seq:2,say:'And the flower grew \u2014 last of all!'}]}]}),
G({num:2,slug:'teddys-missing-backpack',img:'02-teddys-missing-backpack.webp',title:'Teddy\u2019s Missing Backpack',skill:'Using picture clues',
 tag:'Look around Teddy\u2019s room, follow the clues, and find where the backpack waits.',
 say:'Teddy\u2019s backpack is missing! Look at the room, then tap the card that shows where Teddy should look.',
 hint:'You found the clue!',doneTitle:'Backpack found!',doneSub:'The clues pointed right to the hook by the door.',
 alt:'Teddy in a playroom with the red backpack on a hook, and three cards: the hook with the backpack, a toy shelf, and a craft table.',
 steps:[{type:'ask',ask:'Where should Teddy look for the backpack? Tap the card with the clue.',ctx:[3,19,97,60],ctxLabel:'Teddy\u2019s playroom with the backpack on the hook',
  cards:[{label:'The hook by the door \u2014 with the backpack',crop:[6.25,57.87,31.2,95.09],ok:true,say:'The backpack is on the hook!'},
         {label:'The toy shelf',crop:[34.64,57.87,61.3,95.09],ok:false,say:'The shelf has toys, but not the backpack.'},
         {label:'The craft table',crop:[63.96,57.87,93.49,95.09],ok:false,say:'Crayons live there \u2014 keep looking!'}]}]}),
G({num:3,slug:'little-lions-feelings',img:'03-little-lions-feelings.webp',title:'Little Lion\u2019s Feelings',skill:'Feelings in stories',
 tag:'A gift, a dropped ice cream, a popped balloon \u2014 match each story to the feeling it brings.',
 say:'Match each story to Little Lion\u2019s feeling. Tap the story first, then the face.',
 hint:'That\u2019s how that story feels!',doneTitle:'Every feeling matched!',doneSub:'You read Little Lion\u2019s stories like a feelings detective.',
 alt:'Three story cards \u2014 a gift, a dropped ice cream, a popped balloon \u2014 beside three lion faces: surprised, happy and sad.',
 steps:[{type:'match',ask:'Tap a story, then tap the face that matches the feeling.',
  cards:[{label:'Little Lion gets a present',crop:[3.5,16.5,35,42.5],group:'a',pair:'happy',say:'A present feels happy!'},
         {label:'Little Lion drops the ice cream',crop:[3.5,43.5,35,69.5],group:'a',pair:'sad',say:'A dropped ice cream feels sad.'},
         {label:'The balloon pops with a bang',crop:[3.5,70.5,35,95],group:'a',pair:'surprised',say:'A pop makes you surprised!'},
         {label:'Surprised face',crop:[78.5,16.5,94.5,42.5],group:'b',pair:'surprised'},
         {label:'Happy face',crop:[78.5,43.5,94.5,69],group:'b',pair:'happy'},
         {label:'Sad face',crop:[78.5,70.5,94.5,95],group:'b',pair:'sad'}]}]}),
G({num:4,slug:'foxs-rainy-day-surprise',img:'04-foxes-rainy-day-surprise.webp',title:'Fox\u2019s Rainy Day Surprise',skill:'Predicting what happens next',
 tag:'The sun was out, then the rain came down \u2014 predict what Fox does next with the umbrella he found.',
 say:'First it was sunny. Then the rain came, and Fox found a blue umbrella by the bench. What will Fox do next? Tap the picture that fits the story.',
 hint:'That fits the story!',doneTitle:'You predicted it!',doneSub:'Rainy day, empty bench, blue umbrella \u2014 of course Fox opens it up.',
 alt:'Two story pictures show Fox in the sun and then Fox in the rain beside a bench with a blue umbrella; three answer cards show Fox under an umbrella, Fox sunbathing at the beach, and a child building a snowman.',
 artNote:'The artwork tells the story twice \u2014 sunny first, rainy second \u2014 and leaves the umbrella on the bench as the clue. Answer B (beach) and C (snowman) are wonderfully silly wrong turns.',
 parentNote:'Prediction is the comprehension move strong readers make without noticing. Ask your child to point at the clue in the story picture before tapping \u2014 the umbrella on the bench is the whole proof.',
 steps:[{type:'ask',ask:'It was sunny \u2014 then the rain came down. What will Fox do next?',ctx:[22.5,18,91.5,57],ctxLabel:'Story pictures: Fox in the sun, then rain with a blue umbrella on the bench',
  cards:[{label:'Fox opens the blue umbrella',crop:[4.5,59.5,34.5,96],ok:true,say:'The rain came, so Fox opens the umbrella!'},
         {label:'Fox sunbathes at the beach',crop:[35.5,59.5,65.5,96],ok:false,say:'It is raining here \u2014 no beach today!'},
         {label:'A child builds a snowman',crop:[66,59.5,96,96],ok:false,say:'Snow is a different story \u2014 this one is rain!'}]}]}),
G({num:5,slug:'owls-storybook-world',img:'05-owls-storybook-world.webp',title:'Owl\u2019s Storybook World',skill:'Characters and settings',
 tag:'A goldfish, a farmer, an astronaut \u2014 send every character to the place where their story happens.',
 say:'Match each character to where their story happens. Tap the character, then the place.',
 hint:'That\u2019s where that story lives!',doneTitle:'Every story found its place!',doneSub:'Fish to the sea, farmer to the farm, astronaut to space.',
 alt:'A goldfish, a farmer and an astronaut beside three places: night sky, a red barn farm, and an underwater scene.',
 steps:[{type:'match',ask:'Tap a character, then tap where their story happens.',
  cards:[{label:'The goldfish',crop:[6.56,17.59,26.88,42.31],group:'a',pair:'sea',say:'A goldfish story happens under the sea!'},
         {label:'The farmer',crop:[9.95,40.65,26.88,64.81],group:'a',pair:'farm',say:'The farmer works on the farm!'},
         {label:'The astronaut',crop:[6.56,62.5,26.88,87.87],group:'a',pair:'space',say:'Astronauts fly up to space!'},
         {label:'Night sky with planets',crop:[61.82,19.81,93.12,42.13],group:'b',pair:'space'},
         {label:'The red barn farm',crop:[64.74,40.09,91.88,64.26],group:'b',pair:'farm'},
         {label:'Under the sea',crop:[64.74,62.04,91.88,87.41],group:'b',pair:'sea'}]}]}),
G({num:6,slug:'puppys-helping-hands',img:'06-puppys-helping-hands.webp',title:'Puppy\u2019s Helping Hands',skill:'Problem and solution',
 tag:'A stuck ball, scattered crayons, a thirsty friend \u2014 tap the best way for Puppy to help.',
 say:'Look at each problem, then tap the best way for Puppy to help.',
 hint:'That\u2019s a kind way to help!',doneTitle:'Three kind helps!',doneSub:'Puppy fetched the ball, tidied the crayons and brought water. What a helper!',
 alt:'Three problems \u2014 a ball under a bench, crayons on the floor, a rabbit who needs water \u2014 each with two puppy choices.',
 parentNote:'Each round shows a small problem, then two things Puppy could do. One is helpful, one walks away \u2014 talking about WHY the kind choice helps is where the comprehension grows.',
 steps:[
  {type:'ask',ask:'The ball is stuck under the bench. What should Puppy do?',shuffle:true,ctx:[2,21,27.5,41],ctxLabel:'A kitten with a ball stuck under a bench',
   cards:[{label:'Puppy reaches under and gets the ball',crop:[27.81,18.52,52.14,43.33],ok:true,say:'Helping hands fetch the ball!'},
          {label:'Puppy walks away',crop:[51.3,18.52,75.68,43.33],ok:false,say:'The kitten still needs that ball.'}]},
  {type:'ask',ask:'Crayons are all over the floor. What should Puppy do?',shuffle:true,ctx:[2,44,27.5,64.5],ctxLabel:'A duckling beside scattered crayons',
   cards:[{label:'Puppy picks the crayons up',crop:[27.81,41.48,52.14,66.94],ok:true,say:'Tidying up is a big help!'},
          {label:'Puppy steps over them',crop:[51.3,41.48,75.68,66.94],ok:false,say:'Oops \u2014 that doesn\u2019t help the crayons.'}]},
  {type:'ask',ask:'Rabbit is thirsty after playing. What should Puppy do?',shuffle:true,ctx:[2,67,27.5,88.5],ctxLabel:'A tired rabbit sitting by the slide',
   cards:[{label:'Puppy brings Rabbit water',crop:[27.81,64.35,52.14,91.02],ok:true,say:'Water for a thirsty friend!'},
          {label:'Puppy drinks it all himself',crop:[51.3,64.35,75.68,91.02],ok:false,say:'Rabbit was the thirsty one!'}]}]}),
G({num:7,slug:'squirrels-mixed-up-morning',img:'07-squirrels-mixed-up-morning.webp',title:'Squirrel\u2019s Mixed-Up Morning',skill:'Story sequencing',
 tag:'Wake up, brush teeth, eat breakfast, head to school \u2014 put Squirrel\u2019s morning back in order.',
 say:'Squirrel\u2019s morning is mixed up! Tap the pictures in story order: first, next, then, and last.',
 hint:'That\u2019s the next thing Squirrel does!',doneTitle:'Morning fixed!',doneSub:'Wake up, brush, breakfast, off to school \u2014 a perfect morning order.',
 alt:'Four morning panels: eating cereal, walking to preschool, waking up in bed, and brushing teeth, with number boxes below.',
 steps:[{type:'order',ask:'Tap Squirrel\u2019s morning in order \u2014 first to last.',
  cards:[{label:'Squirrel eats breakfast',crop:[0.99,28.15,20.89,67.87],seq:2,say:'Breakfast comes after brushing teeth.'},
         {label:'Squirrel walks to preschool',crop:[19.58,18.8,39.9,67.87],seq:3,say:'Off to school \u2014 last stop!'},
         {label:'Squirrel wakes up stretching',crop:[38.59,18.7,58.85,67.87],seq:0,say:'Mornings start with waking up!'},
         {label:'Squirrel brushes teeth',crop:[57.5,18.7,78.96,67.87],seq:1,say:'Brush those teeth next!'}]}]}),
G({num:8,slug:'giraffes-picture-detective',img:'08-giraffes-picture-detective.webp',title:'Giraffe\u2019s Picture Detective',skill:'Looking for details',
 tag:'Balloons, a kite, a swing \u2014 look closely at the playground and answer three picture questions.',
 say:'Look carefully at the playground, then answer the questions. Look first \u2014 the answers hide in the picture!',
 hint:'You spotted it!',doneTitle:'Case solved!',doneSub:'Two balloons, a blue kite, and Rabbit on the swing.',
 alt:'A playground scene with Giraffe holding two red balloons, a blue kite, a slide and Rabbit on the swing, with three question rows.',
 parentNote:'The three answers are all visible in the scene: count the balloons, name the kite\u2019s color, and see who sits on the swing. Ask your child to point before tapping.',
 steps:[
  {type:'ask',ask:'How many balloons is Giraffe holding?',ctx:[2,14,75.5,58],ctxLabel:'The playground scene',
   cards:[{label:'One balloon',crop:[32.5,60.5,40.5,69],ok:false,say:'Count again \u2014 there is one more!'},
          {label:'Two balloons',crop:[45.83,59.44,55.1,70],ok:true,say:'Two red balloons!'},
          {label:'Three balloons',crop:[60.83,59.44,70.1,70],ok:false,say:'Almost \u2014 count the balloons one more time.'}]},
  {type:'ask',ask:'What color is the kite?',ctx:[2,14,75.5,58],ctxLabel:'The playground scene',
   cards:[{label:'Red',crop:[31.72,69.35,42.71,80.56],ok:false,say:'Red is the balloons. What about the kite up high?'},
          {label:'Blue',crop:[45.21,69.35,56.25,80.56],ok:true,say:'The kite is blue!'},
          {label:'Green',crop:[59.17,69.35,70.78,80.56],ok:false,say:'Green is the tree \u2014 look up at the kite!'}]},
  {type:'ask',ask:'Who is sitting on the swing?',ctx:[2,14,75.5,58],ctxLabel:'The playground scene',
   cards:[{label:'The rabbit',crop:[26.25,81.11,43.7,94.81],ok:true,say:'Rabbit is on the swing!'},
          {label:'The cat',crop:[43.96,81.11,59.01,94.81],ok:false,say:'No cat today \u2014 who has the long ears?'},
          {label:'The dog',crop:[58.39,81.11,74.06,94.81],ok:false,say:'Not the dog \u2014 look for the fluffy tail.'}]}]}),
G({num:9,slug:'ducklings-cause-and-effect',img:'09-ducklings-cause-and-effect.webp',title:'Duckling\u2019s Cause & Effect',skill:'Cause and effect',
 tag:'A drooping flower, a muddy puddle, a sailing boat \u2014 match what happened to why it happened.',
 say:'Match what happened to why it happened. Tap the picture first, then the reason.',
 hint:'That\u2019s why it happened!',doneTitle:'Every why found!',doneSub:'Sun made the flower droop, rain made the puddle, wind pushed the boat.',
 alt:'What-happened cards \u2014 a drooping flower, a muddy puddle, a sailboat \u2014 beside why cards: wind, sun and rain.',
 steps:[{type:'match',ask:'Tap what happened, then tap why it happened.',
  cards:[{label:'The flower is drooping',crop:[3.18,20.83,23.91,47.31],group:'a',pair:'sun',say:'Hot sun made the flower droopy.'},
         {label:'The path is a muddy puddle',crop:[3.18,44.72,23.91,73.24],group:'a',pair:'rain',say:'Rain made the puddle!'},
         {label:'The boat sails on the water',crop:[3.18,69.63,23.91,95.83],group:'a',pair:'wind',say:'Wind pushes the boat along.'},
         {label:'The wind blows',crop:[84.38,20.83,96.77,47.31],group:'b',pair:'wind'},
         {label:'The sun shines',crop:[84.38,44.72,96.82,73.24],group:'b',pair:'sun'},
         {label:'The rain falls',crop:[84.38,69.63,96.82,95.83],group:'b',pair:'rain'}]}]}),
G({num:10,slug:'hedgehogs-story-map',img:'10-hedgehogs-story-map.webp',title:'Hedgehog\u2019s Story Map',skill:'Who, where, what',
 tag:'Find WHO the story is about, WHERE it happens, and WHAT happened \u2014 a real story map.',
 say:'Every story has a who, a where, and a what. Look at Hedgehog\u2019s scene and tap the answer for each row.',
 hint:'That\u2019s the story map answer!',doneTitle:'Story map complete!',doneSub:'Hedgehog, in the garden, found an apple.',
 alt:'Hedgehog by an apple tree, with three labelled rows: WHO?, WHERE? and WHAT HAPPENED?, each with three picture cards.',
 steps:[
  {type:'ask',ask:'WHO is this story about?',ctx:[4.5,16.5,88.5,42],ctxLabel:'Hedgehog beside the apple tree',
   cards:[{label:'Hedgehog',crop:[8.85,43.15,32.6,56.76],ok:true,say:'The story is about Hedgehog!'},
          {label:'Fox',crop:[33.33,43.15,57.14,56.76],ok:false,say:'Fox isn\u2019t in this scene.'},
          {label:'Bear',crop:[57.81,43.15,81.61,56.76],ok:false,say:'Bear isn\u2019t in this scene.'}]},
  {type:'ask',ask:'WHERE does the story happen?',ctx:[4.5,16.5,88.5,42],ctxLabel:'Hedgehog beside the apple tree',
   cards:[{label:'The garden',crop:[8.85,56.11,32.6,70.37],ok:true,say:'A garden, with a fence and flowers!'},
          {label:'The beach',crop:[33.33,56.11,57.14,70.37],ok:false,say:'No sand or sea here.'},
          {label:'The bedroom',crop:[57.81,56.11,81.61,70.37],ok:false,say:'This story happens outside.'}]},
  {type:'ask',ask:'WHAT happened in the story?',ctx:[4.5,16.5,88.5,42],ctxLabel:'Hedgehog beside the apple tree',
   cards:[{label:'Found an apple',crop:[8.85,69.44,32.6,85],ok:true,say:'Hedgehog found an apple!'},
          {label:'Flew a kite',crop:[33.33,69.44,57.14,85],ok:false,say:'No kite in this story.'},
          {label:'Built a snowman',crop:[57.81,69.44,81.61,85],ok:false,say:'Too sunny for snow here!'}]}]}),
G({num:11,slug:'mouses-story-retelling-train',img:'11-mouses-story-retelling-train.webp',title:'Mouse\u2019s Story Retelling Train',skill:'Beginning, middle, end',
 tag:'Mixing, baking, munching \u2014 load each picture onto the right train car: beginning, middle or end.',
 say:'Mouse baked cookies! Tap the pictures in story order to load the train: beginning, middle, and end.',
 hint:'Right car!',doneTitle:'The retelling train is loaded!',doneSub:'Mix the batter, bake the cookies, then munch \u2014 beginning, middle, end.',
 alt:'A train with BEGINNING, MIDDLE and END cars, and three mouse pictures: stirring batter, baking cookies, eating a cookie.',
 steps:[{type:'order',ask:'Tap the story in order \u2014 beginning, middle, end.',
  cards:[{label:'Mouse mixes the batter',crop:[12.92,58.52,28.54,93.89],seq:0,say:'Beginning: mix the batter!'},
         {label:'Mouse bakes the cookies',crop:[38.96,58.52,52.08,93.89],seq:1,say:'Middle: bake them in the oven!'},
         {label:'Mouse munches a cookie',crop:[66.67,58.52,85.78,93.89],seq:2,say:'End: munch, munch, munch!'}]}]}),
G({num:12,slug:'little-bears-big-decision',img:'12-little-bears-big-decision.webp',title:'Little Bear\u2019s Big Decision',skill:'Best-choice thinking',
 tag:'A crying friend, a busy road, a spill \u2014 tap the best thing for Little Bear to do next.',
 say:'Look at what happened, then tap the best thing for Little Bear to do next.',
 hint:'That\u2019s the kind, safe choice!',doneTitle:'Three good decisions!',doneSub:'Comfort a friend, cross with a grown-up, clean up together.',
 alt:'Three problem scenes each with two choices: comforting a crying friend, crossing the road, and cleaning a spill.',
 parentNote:'Each round pairs a small problem with a safe or kind choice and a careless one. Ask your child to say the choice out loud before tapping \u2014 saying it is the comprehension.',
 steps:[
  {type:'ask',ask:'Friend is crying over a broken toy. What should Little Bear do?',ctx:[2,19,27.5,41.5],ctxLabel:'A crying bear cub with a broken toy',
   cards:[{label:'Comfort Friend and help',crop:[27.76,16.3,52.71,44.17],ok:true,say:'Helping a sad friend is the kind choice!'},
          {label:'Laugh about the toy',crop:[51.25,16.3,76.2,44.17],ok:false,say:'Laughing would make Friend sadder.'}]},
  {type:'ask',ask:'The road is busy with cars. What should Little Bear do?',ctx:[2,43,27.5,63.5],ctxLabel:'Little Bear waiting at a crossing with cars',
   cards:[{label:'Run across alone',crop:[27.76,40.46,52.71,65.93],ok:false,say:'Running across a busy road is not safe!'},
          {label:'Cross with a grown-up',crop:[51.25,40.46,76.2,65.93],ok:true,say:'Holding a grown-up\u2019s hand is how we cross!'}]},
  {type:'ask',ask:'Oh no \u2014 the cup tipped over. What should Little Bear do?',ctx:[2,65.5,27.5,90.5],ctxLabel:'A spilled cup on the floor',
   cards:[{label:'Help wipe it up',crop:[27.76,62.5,52.71,93.43],ok:true,say:'Cleaning up together \u2014 a great decision!'},
          {label:'Walk away and leave it',crop:[51.25,62.5,76.2,93.43],ok:false,say:'Someone might slip. Let\u2019s clean it!'}]}]}),
G({num:13,slug:'beavers-story-bridge',img:'13-beavers-story-bridge.webp',title:'Beaver\u2019s Story Bridge',skill:'First and last',
 tag:'Gather logs, build the bridge, cross the river \u2014 tap what happened FIRST and what happened LAST.',
 say:'Beaver built a bridge! First gather the logs, then build, then cross. Tap what happened first, and what happened last.',
 hint:'You remembered the story!',doneTitle:'FIRST and LAST found!',doneSub:'First the logs were gathered; last, Beaver crossed the finished bridge.',
 alt:'Three numbered beaver panels \u2014 gathering logs, building the bridge, crossing it \u2014 with FIRST and LAST question rows of small pictures.',
 steps:[
  {type:'ask',ask:'What happened FIRST?',cards:[
   {label:'Beaver gathers logs by the pile',crop:[1.46,63.89,16.51,98.15],ok:true,say:'First, gather the logs!'},
   {label:'Beaver places logs in the water',crop:[15.42,63.89,30.52,98.15],ok:false,say:'That comes after gathering.'},
   {label:'Beaver crosses the finished bridge',crop:[29.43,63.89,44.53,98.15],ok:false,say:'Crossing is the very last part!'}]},
  {type:'ask',ask:'What happened LAST?',cards:[
   {label:'Beaver crosses the finished bridge',crop:[50.78,63.8,64.01,98.15],ok:true,say:'Last of all, a happy crossing!'},
   {label:'Beaver gathers logs',crop:[62.92,63.8,78.02,98.15],ok:false,say:'Gathering was the first part.'},
   {label:'Beaver places logs in the water',crop:[76.93,63.8,92.03,98.15],ok:false,say:'That was the building part \u2014 not last.'}]}]}),
G({num:14,slug:'rabbits-hidden-clues',img:'14-rabbits-hidden-clues.webp',title:'Rabbit\u2019s Hidden Clues',skill:'What do you need?',
 tag:'Snowy, rainy, hungry \u2014 read Rabbit\u2019s clues and tap the thing Rabbit needs.',
 say:'Look at each clue, then tap what Rabbit needs.',
 hint:'That\u2019s just the thing!',doneTitle:'Three needs found!',doneSub:'A warm coat for snow, an umbrella for rain, a sandwich for hunger.',
 alt:'Three clue scenes \u2014 Rabbit cold in snow, Rabbit in the rain, Rabbit hungry at the table \u2014 with item cards: coat, sunglasses, ball, umbrella, ice cream, teddy, sandwich, soap, toothbrush.',
 steps:[
  {type:'ask',ask:'Rabbit is cold in the snow. What does Rabbit need?',ctx:[2,17.5,27.5,42],ctxLabel:'Rabbit shivering in the snow',
   cards:[{label:'A warm coat',crop:[32.34,15.37,48.59,44.91],ok:true,say:'A coat keeps Rabbit warm!'},
          {label:'Sunglasses',crop:[47.86,15.46,64.11,44.91],ok:false,say:'Sunglasses are for sun, not snow.'},
          {label:'A beach ball',crop:[63.33,15.37,79.64,44.91],ok:false,say:'A ball is fun, but it won\u2019t warm Rabbit up.'}]},
  {type:'ask',ask:'It is raining and Rabbit\u2019s feet are wet. What does Rabbit need?',ctx:[2,44,27.5,68],ctxLabel:'Rabbit in the rain by a puddle',
   cards:[{label:'An umbrella',crop:[32.34,41.11,48.59,70.83],ok:true,say:'An umbrella keeps the rain off!'},
          {label:'An ice cream',crop:[47.86,41.11,64.11,70.83],ok:false,say:'Brrr \u2014 ice cream would make it colder!'},
          {label:'A teddy bear',crop:[63.33,41.11,79.64,70.83],ok:false,say:'Cuddly, but it won\u2019t stop the rain.'}]},
  {type:'ask',ask:'Rabbit\u2019s tummy is rumbling. What does Rabbit need?',ctx:[2,69.5,27.5,93],ctxLabel:'Rabbit dreaming of carrots at an empty plate',
   cards:[{label:'A sandwich',crop:[32.34,66.67,48.59,95.74],ok:true,say:'A sandwich for a hungry tummy!'},
          {label:'Soap',crop:[47.86,66.67,64.11,95.74],ok:false,say:'Soap is for washing \u2014 not for eating!'},
          {label:'A toothbrush',crop:[63.33,66.67,79.64,95.74],ok:false,say:'That comes after eating!'}]}]}),
G({num:15,slug:'penguins-silly-story-fix',img:'15-penguins-silly-story-fix.webp',title:'Penguin\u2019s Silly Story Fix',skill:'Does it make sense?',
 tag:'A toothbrush on a sneaker, a bicycle in a nest \u2014 tap the picture that makes the story make sense.',
 say:'One picture makes sense, one is silly. Tap the picture that makes the story right!',
 hint:'Now the story makes sense!',doneTitle:'All fixed!',doneSub:'Teeth get brushed, nests get sticks, and thirsty puppies drink water.',
 alt:'Three story starts each with a sensible choice and a silly one: brushing teeth or a sneaker, nest sticks or a bicycle, a water bowl or a toy box.',
 parentNote:'This game is pure story logic: one choice keeps the story sensible, one is deliberately silly. The giggles are the point \u2014 silly stories are memorable stories.',
 steps:[
  {type:'ask',ask:'A boy has a toothbrush. What makes sense?',ctx:[2,17.5,30,42],ctxLabel:'A boy with a toothbrush and toothpaste',
   cards:[{label:'Brushing his teeth',crop:[29.27,18.15,53.65,44.91],ok:true,say:'That\u2019s what toothbrushes are for!'},
          {label:'Brushing his sneaker',crop:[51.25,18.15,76.2,44.91],ok:false,say:'Silly! Sneakers don\u2019t need brushing.'}]},
  {type:'ask',ask:'The bird is building a nest. What makes sense?',ctx:[2,44,30,68],ctxLabel:'A bird beside an empty nest with a twig',
   cards:[{label:'Weaving a twig into the nest',crop:[51.25,41.11,76.2,70.83],ok:true,say:'Nests are built from twigs!'},
          {label:'Parking a bicycle in the nest',crop:[29.27,41.11,53.65,70.83],ok:false,say:'Silly! A bicycle will never fit.'}]},
  {type:'ask',ask:'The puppy is thirsty. What makes sense?',ctx:[2,70,30,92.5],ctxLabel:'A puppy thinking of a glass of water',
   cards:[{label:'Drinking from the water bowl',crop:[29.27,67.22,53.65,95.19],ok:true,say:'A water bowl for a thirsty puppy!'},
          {label:'Diving into the toy box',crop:[51.25,67.22,76.2,95.19],ok:false,say:'Silly! Toy boxes are dry as dust.'}]}]}),
G({num:16,slug:'butterflys-story-journey',img:'16-butterflys-story-journey.webp',title:'Butterfly\u2019s Story Journey',skill:'Story order on a journey',
 tag:'Garden to pond to forest to meadow \u2014 tap the stops on Butterfly\u2019s journey, in order, and skip the silly ones.',
 say:'Butterfly visits the pond, the forest, the flower field, and the sunny meadow. Tap the journey stops in order \u2014 and skip the places a butterfly would never go!',
 hint:'A lovely stop on the journey!',doneTitle:'What a journey!',doneSub:'Pond, forest, flower field, meadow \u2014 bedrooms and kitchens are for people!',
 alt:'Butterfly in a flower garden, with journey stops: pond, forest, flower field, sunny meadow, and silly places: bedroom, kitchen, snowy mountain.',
 parentNote:'Journey games train story ORDER plus common sense: butterflies visit ponds and meadows, never bedrooms. The three indoor stops answer with a giggle and never a penalty.',
 steps:[{type:'order',ask:'Tap Butterfly\u2019s journey stops in the right order. Some places are silly!',ctx:[1,26.5,16.5,84],ctxLabel:'Butterfly in the flower garden',
  cards:[{label:'The pond',crop:[16.46,25,31.51,64.17],seq:0,say:'First stop: the pond!'},
         {label:'The forest',crop:[30.94,25,45.99,64.17],seq:1,say:'Next, through the shady forest.'},
         {label:'The flower field',crop:[45.42,25,60.52,64.17],seq:2,say:'Then the flower field \u2014 butterfly\u2019s favorite!'},
         {label:'The sunny meadow',crop:[59.79,19.54,77.19,90.83],seq:3,say:'Last: the sunny meadow. What a trip!'},
         {label:'The bedroom',crop:[16.46,58.24,31.51,95.46],bad:true,say:'A butterfly in a bedroom? Silly!'},
         {label:'The kitchen',crop:[30.94,58.24,45.99,95.56],bad:true,say:'Kitchens are for cooking, not fluttering!'},
         {label:'The snowy mountain',crop:[45.42,58.24,60.52,95.56],bad:true,say:'Brrr! Butterflies skip the snow.'}]}]}),
G({num:17,slug:'raccoons-memory-challenge',img:'17-raccoons-memory-challenge.webp',title:'Raccoon\u2019s Memory Challenge',skill:'Story memory',
 tag:'A red blanket, two apples, a blue cup \u2014 look hard, then tap what you remember.',
 say:'Look at Raccoon\u2019s picnic and remember everything. Then answer the questions from memory!',
 hint:'You remembered!',doneTitle:'Memory champion!',doneSub:'A red blanket, two apples, and a cup \u2014 you remembered it all.',
 alt:'Raccoon on a red picnic blanket with a banana, two apples and a blue cup under a tree, with three memory questions.',
 parentNote:'Memory games build the mental picture-making that reading comprehension runs on. Cover the picture between questions and let your child answer from memory.',
 steps:[
  {type:'ask',ask:'What color is the blanket?',ctx:[2,17,97.5,57.5],ctxLabel:'Raccoon\u2019s picnic scene',
   cards:[{label:'Red',crop:[42.6,58.06,55.36,72.31],ok:true,say:'A red checkered blanket!'},
          {label:'Blue',crop:[56.61,58.06,69.38,72.31],ok:false,say:'Blue is the cup \u2014 the blanket is another color.'},
          {label:'Yellow',crop:[70.1,58.06,82.86,72.31],ok:false,say:'Yellow is the banana. Look again at the blanket.'}]},
  {type:'ask',ask:'How many apples are there?',ctx:[2,17,97.5,57.5],ctxLabel:'Raccoon\u2019s picnic scene',
   cards:[{label:'One apple',crop:[42.6,72.13,55.36,81.57],ok:false,say:'Count the apples one more time.'},
          {label:'Two apples',crop:[56.61,70.09,69.38,83.8],ok:true,say:'Two shiny apples!'},
          {label:'Three apples',crop:[70.1,70.09,82.86,83.8],ok:false,say:'Almost \u2014 count again slowly.'}]},
  {type:'ask',ask:'What is Raccoon drinking from?',ctx:[2,17,97.5,57.5],ctxLabel:'Raccoon\u2019s picnic scene',
   cards:[{label:'A cup',crop:[42.6,84.26,55.36,95.83],ok:true,say:'A little blue cup!'},
          {label:'A bottle',crop:[56.61,81.57,69.38,95.83],ok:false,say:'No bottle at this picnic.'},
          {label:'A bowl',crop:[70.1,81.57,82.86,95.83],ok:false,say:'No bowl either \u2014 Raccoon holds a cup.'}]}]}),
G({num:18,slug:'dragons-story-ending-studio',img:'18-dragons-story-ending-studio.webp',title:'Dragon\u2019s Story Ending Studio',skill:'Story endings',
 tag:'A planted seed, baking day, a bike ride \u2014 tap the ending that truly fits each story.',
 say:'Every story needs the right ending. Look at what Dragon did, then tap the ending that fits.',
 hint:'What a fitting ending!',doneTitle:'Studio complete!',doneSub:'Seeds grow into flowers, ovens bake pies, and bike rides zoom along.',
 alt:'Three story starts \u2014 planting and watering, mixing and baking, helmet and bike \u2014 each with two endings: a flower or a bicycle, a snowman or a pie in the oven, a ride or a fish.',
 steps:[
  {type:'ask',ask:'Dragon planted and watered a seed. Which ending fits?',ctx:[2,20.5,48.5,42],ctxLabel:'Dragon planting a seed and watering the sprout',
   cards:[{label:'A flower blooms',crop:[48.12,17.87,67.81,44.54],ok:true,say:'Watered seeds grow into flowers!'},
          {label:'A bicycle appears',crop:[65.94,17.87,87.97,44.54],ok:false,say:'Silly \u2014 seeds don\u2019t grow bicycles!'}]},
  {type:'ask',ask:'Dragon mixed flour and eggs, then opened the oven. Which ending fits?',ctx:[2,44,48.5,64.5],ctxLabel:'Dragon mixing batter with a purple dragon at the oven',
   cards:[{label:'A pie baked in the oven',crop:[65.94,41.48,87.97,66.94],ok:true,say:'Flour and eggs make a lovely pie!'},
          {label:'A snowman in the oven',crop:[48.12,41.48,67.81,66.94],ok:false,say:'Silly! A snowman would melt!'}]},
  {type:'ask',ask:'Dragon put on a helmet and climbed on the bike. Which ending fits?',ctx:[2,66,48.5,89.5],ctxLabel:'Dragon wearing a helmet beside a bicycle',
   cards:[{label:'A ride down the park path',crop:[48.12,63.15,67.81,92.31],ok:true,say:'Helmets on \u2014 away we go!'},
          {label:'A splash in the pond',crop:[65.94,63.15,87.97,92.31],ok:false,say:'That fish swims; Dragon rides!'}]}]}),
G({num:19,slug:'foxs-story-shadow-mystery',img:'19-foxes-story-shadow-mystery.webp',title:'Fox\u2019s Story Shadow Mystery',skill:'Reading picture clues',
 tag:'Muddy footprints, an empty cookie plate, a tipped flowerpot \u2014 three mysteries, solved with clues.',
 say:'Detective Fox has three mysteries! Look at each clue picture, then tap what really happened.',
 hint:'That\u2019s what the clues say!',doneTitle:'Case closed!',doneSub:'The puppy tracked mud, the boy ate the cookies, and the kitten tipped the pot. Mystery solved!',
 alt:'Three numbered clue pictures \u2014 muddy footprints by an open door, a plate of cookie crumbs, and a tipped flowerpot with a kitten \u2014 each above two answer cards.',
 parentNote:'Each round shows one clue and two possible stories. The clue rules out one of them, and saying WHY out loud (\u201cthe footprints are muddy, so it was the puppy!\u201d) is the inference skill growing in real time.',
 steps:[
  {type:'ask',ask:'Muddy footprints walk in from the garden door. Who made them?',ctx:[1.5,29,32,59],ctxLabel:'Clue 1: muddy footprints leading in from the open garden door',
   cards:[{label:'The puppy with muddy paws',crop:[1.5,61,16.5,97.5],ok:true,say:'Muddy paws make muddy footprints!'},
          {label:'The butterfly at the window',crop:[17,61,31.5,97.5],ok:false,say:'Butterflies are far too light for muddy prints!'}]},
  {type:'ask',ask:'The cookie plate is empty \u2014 only crumbs are left. Who ate the cookies?',ctx:[34,29,65,59],ctxLabel:'Clue 2: a plate with cookie crumbs and cookies scattered on the table',
   cards:[{label:'The airplane flying by',crop:[35,61,49.5,97.5],ok:false,say:'Airplanes fly past cookies \u2014 they never nibble!'},
          {label:'The boy munching a cookie',crop:[50,61,64.5,97.5],ok:true,say:'Crumb trails lead to cookie munchers!'}]},
  {type:'ask',ask:'The flowerpot is tipped over and the kitten ran. What happened?',ctx:[67.5,29,99,59],ctxLabel:'Clue 3: a tipped pink flowerpot with spilled soil and a kitten jumping away',
   cards:[{label:'The kitten tipped the pot over',crop:[68.5,61,82.5,97.5],ok:true,say:'The kitten bumped the pot and scampered off!'},
          {label:'A balloon carried the pot away',crop:[83.5,61,98.5,97.5],ok:false,say:'Balloons float up \u2014 they do not tip pots!'}]}]}),
G({num:20,slug:'turtles-story-timeline',img:'20-turtles-story-timeline.webp',title:'Turtle\u2019s Story Timeline',skill:'Before and after',
 tag:'Pack the basket, picnic, wash the dishes \u2014 tap what happened BEFORE the picnic and AFTER it.',
 say:'Turtle is having a picnic! Tap what happened before the picnic, and what happens after.',
 hint:'Right part of the story!',doneTitle:'Timeline complete!',doneSub:'Pack the basket before, wash the dishes after.',
 alt:'Turtle eating a sandwich at a picnic, with BEFORE and AFTER question rows of small turtle pictures.',
 artNote:'Printed art quirk we fixed in play: the best "after the picnic" answer (washing the dishes) sits in the Before row of the illustration. The game and worksheet use that picture for the after question so the story logic stays right.',
 steps:[
  {type:'ask',ask:'What happened BEFORE the picnic?',cards:[
   {label:'Turtle packs the picnic basket',crop:[3.02,57.96,23.91,95.09],ok:true,say:'Packing the basket comes before!'},
   {label:'Turtle washes dishes',crop:[22.55,57.96,43.44,95.09],ok:false,say:'Dishes come after a picnic \u2014 keep that one for later!'},
   {label:'Turtle sleeps',crop:[42.03,57.96,62.92,95.09],ok:false,say:'Sleepy time is for after supper!'}]},
  {type:'ask',ask:'What happens AFTER the picnic?',cards:[
   {label:'Turtle washes the dishes',crop:[22.55,57.96,43.44,95.09],ok:true,say:'After the picnic, dishes get washed!'},
   {label:'Turtle buys food at the market',crop:[63.49,57.96,77.45,95.65],ok:false,say:'Buying food happens before a picnic.'},
   {label:'Turtle packs the basket',crop:[3.02,57.96,23.91,95.09],ok:false,say:'Packing came first \u2014 remember?'}]}]}),
G({num:21,slug:'koalas-character-detective',img:'21-koalas-character-detective.webp',title:'Koala\u2019s Character Detective',skill:'Characters and actions',
 tag:'A gardener, a baker, a mail carrier \u2014 match each character to the job they did in the story.',
 say:'Match each character to what they did. Tap the character, then the job.',
 hint:'That\u2019s their job!',doneTitle:'Case closed!',doneSub:'Rabbit gardens, Bear bakes, and Bird delivers the mail.',
 alt:'A gardening rabbit, a baking bear and a mail-bird beside three action cards: a bird at a mailbox, a rabbit watering flowers, a bear with a cake.',
 steps:[{type:'match',ask:'Tap a character, then tap what they did.',
  cards:[{label:'Rabbit in gardening gloves',crop:[4.27,17.87,25.57,41.67],group:'a',pair:'water',say:'Rabbit waters the garden!'},
         {label:'Bear with a whisk',crop:[4.27,39.35,25.57,66.02],group:'a',pair:'cake',say:'Bear bakes the cake!'},
         {label:'The bluebird with a letter',crop:[4.27,62.69,25.57,91.2],group:'a',pair:'mail',say:'Bird delivers the mail!'},
         {label:'Bird at the mailbox',crop:[54.37,13.8,77.55,41.67],group:'b',pair:'mail'},
         {label:'Rabbit watering flowers',crop:[56,42,76,63.5],group:'b',pair:'water'},
         {label:'Bear decorating a cake',crop:[56,65.5,76,88.5],group:'b',pair:'cake'}]}]}),
G({num:22,slug:'elephants-story-surprise',img:'22-elephants-story-surprise.webp',title:'Elephant\u2019s Story Surprise',skill:'Story questions',
 tag:'A party hat, three candles, a gift from Monkey \u2014 answer the questions about Elephant\u2019s surprise.',
 say:'Look at Elephant\u2019s party, then answer the questions. The picture holds every answer!',
 hint:'You found it in the story!',doneTitle:'Story solved!',doneSub:'A purple hat, three candles, and the gift came from Monkey.',
 alt:'An elephant in a purple party hat beside a monkey holding a gift, a cake with three candles and a balloon, with three question rows.',
 steps:[
  {type:'ask',ask:'What color is Elephant\u2019s hat?',ctx:[4.5,12.5,95.5,60],ctxLabel:'Elephant\u2019s surprise party',
   cards:[{label:'Purple',crop:[58.8,57.04,75.62,71.85],ok:true,say:'A purple party hat!'},
          {label:'Red',crop:[74.06,57.04,87.4,71.85],ok:false,say:'Red is the balloon \u2014 check the hat.'},
          {label:'Green',crop:[86.09,57.04,92.71,71.85],ok:false,say:'Green is the leaves. Look at the hat!'}]},
  {type:'ask',ask:'How many candles are on the cake?',ctx:[4.5,12.5,95.5,60],ctxLabel:'Elephant\u2019s surprise party',
   cards:[{label:'Two candles',crop:[58.8,69.63,75.62,81.94],ok:false,say:'Count the little flames again.'},
          {label:'Three candles',crop:[74.06,69.63,87.4,81.94],ok:true,say:'One, two, three candles!'},
          {label:'Four candles',crop:[86.09,69.63,92.71,83.24],ok:false,say:'Almost \u2014 count once more.'}]},
  {type:'ask',ask:'Who brought the present?',ctx:[4.5,12.5,95.5,60],ctxLabel:'Elephant\u2019s surprise party',
   cards:[{label:'Monkey',crop:[57.71,81.02,75.73,95.93],ok:true,say:'Monkey brought the gift!'},
          {label:'Rabbit',crop:[74.06,81.02,87.4,95.93],ok:false,say:'No rabbit at this party.'},
          {label:'Fox',crop:[86.09,81.02,92.76,95.93],ok:false,say:'No fox either \u2014 who is holding the box?'}]}]}),
G({num:23,slug:'pandas-picture-story-puzzle',img:'23-pandas-picture-story-puzzle.webp',title:'Panda\u2019s Picture Story Puzzle',skill:'Story sequencing',
 tag:'Find the box, build the kite, hold it high, fly it \u2014 put Panda\u2019s kite day in order.',
 say:'Panda built a kite! Tap the pictures in story order: first, next, then, and last.',
 hint:'The story grows!',doneTitle:'Puzzle solved!',doneSub:'Find the box, build the kite, hold it high, then fly it!',
 alt:'Four panda panels \u2014 flying a kite, opening a box of kite parts, holding the finished kite, gluing kite pieces \u2014 with number boxes below.',
 steps:[{type:'order',ask:'Tap Panda\u2019s kite story in order \u2014 first to last.',
  cards:[{label:'Panda flies the kite',crop:[1.82,17.69,20.89,71.39],seq:3,say:'Flying comes last \u2014 after building!'},
         {label:'Panda finds the box of kite parts',crop:[19.58,17.31,39.9,71.39],seq:0,say:'First: find the box of parts!'},
         {label:'Panda holds the finished kite',crop:[38.59,17.41,58.85,71.39],seq:2,say:'Hold it high \u2014 almost ready!'},
         {label:'Panda glues the kite together',crop:[57.55,17.31,77.86,71.39],seq:1,say:'Next: build the kite!'}]}]}),
G({num:25,slug:'otters-story-treasure-hunt',img:'25-otters-story-treasure-hunt.webp',title:'Otter\u2019s Story Treasure Hunt',skill:'Story clues',
 tag:'A blue bucket, two ducks, a red boat \u2014 follow Otter\u2019s story clues to the treasure.',
 say:'Look at Otter\u2019s river story, then tap the right clue for each question.',
 hint:'Treasure clue found!',doneTitle:'Treasure found!',doneSub:'A blue bucket, two ducks, and a boat floating by.',
 alt:'Otter with a blue bucket on a riverbank with a red boat and two ducks, with three question rows.',
 steps:[
  {type:'ask',ask:'What color is Otter\u2019s bucket?',ctx:[3,17.5,97,57],ctxLabel:'Otter\u2019s river scene',
   cards:[{label:'Blue',crop:[61.51,57.59,75.42,71.85],ok:true,say:'A blue bucket!'},
          {label:'Red',crop:[75.57,57.59,88.33,71.85],ok:false,say:'Red is the boat \u2014 the bucket is another color.'},
          {label:'Yellow',crop:[87.66,57.59,96.98,71.85],ok:false,say:'No yellow bucket here \u2014 look again!'}]},
  {type:'ask',ask:'How many ducks are swimming?',ctx:[3,17.5,97,57],ctxLabel:'Otter\u2019s river scene',
   cards:[{label:'One duck',crop:[61.51,69.54,75.42,83.61],ok:false,say:'Count the little ducks again.'},
          {label:'Two ducks',crop:[75.57,69.54,88.33,83.7],ok:true,say:'Two ducks, side by side!'},
          {label:'Three ducks',crop:[87.66,69.54,96.98,83.61],ok:false,say:'Almost \u2014 count them one more time.'}]},
  {type:'ask',ask:'What is floating on the river?',ctx:[3,17.5,97,57],ctxLabel:'Otter\u2019s river scene',
   cards:[{label:'A boat',crop:[60.31,81.57,77.14,95.83],ok:true,say:'A little red boat!'},
          {label:'A ball',crop:[75.68,83.06,87.29,95.83],ok:false,say:'No ball on this river.'},
          {label:'A kite',crop:[86.61,81.57,96.93,95.83],ok:false,say:'Kites fly in the sky, not on rivers!'}]}]}),
G({num:26,slug:'ladybugs-missing-story-scene',img:'26-ladybugs-missing-story-scene.webp',title:'Ladybug\u2019s Missing Story Scene',skill:'Missing story part',
 tag:'Seed, then a mystery middle, then a sunflower \u2014 tap the picture that completes the story.',
 say:'A piece of Ladybug\u2019s story is missing! What happens between the seed and the big sunflower?',
 hint:'That completes the story!',doneTitle:'Story complete!',doneSub:'Plant the seed, water the sprout, and a sunflower grows!',
 alt:'Ladybug planting a seed, a question mark, and Ladybug beside a tall sunflower \u2014 with three choices: watering a sprout, a toy airplane, a snowman.',
 steps:[{type:'ask',ask:'What belongs in the middle of the story?',ctx:[2,20,74.5,58],ctxLabel:'The seed, a question mark, and the sunflower',
  cards:[{label:'Ladybug waters the little sprout',crop:[2.6,55.37,27.34,97.5],ok:true,say:'Watering helps the flower grow!'},
         {label:'Ladybug plays with a toy airplane',crop:[25.1,55.37,52.34,97.5],ok:false,say:'Fun, but it won\u2019t grow a sunflower!'},
         {label:'Ladybug builds a snowman',crop:[49.53,55.37,77.4,97.5],ok:false,say:'Silly \u2014 snowmen don\u2019t help flowers!'}]}]}),
G({num:27,slug:'dolphins-story-questions',img:'27-dolphins-story-questions.webp',title:'Dolphin\u2019s Story Questions',skill:'Who, where, what',
 tag:'A big splash in the ocean \u2014 find WHO jumped, WHERE it happened, and WHAT Dolphin did.',
 say:'Look at Dolphin\u2019s ocean story. Tap who jumped, where it happened, and what Dolphin did!',
 hint:'Story answer found!',doneTitle:'All three answered!',doneSub:'Dolphin jumped over a wave, in the ocean!',
 alt:'A dolphin leaping a wave beside a turtle, with three question boxes: WHO jumped?, WHERE did it happen?, WHAT did the dolphin do?',
 steps:[
  {type:'ask',ask:'WHO jumped?',ctx:[4.5,16.5,95.5,57.5],ctxLabel:'Dolphin leaping over a wave',
   cards:[{label:'The dolphin',crop:[2.24,65.19,12.71,93.7],ok:true,say:'Dolphin jumped!'},
          {label:'The shark',crop:[11.72,65.19,22.71,92.22],ok:false,say:'No shark in this story.'},
          {label:'The crab',crop:[21.67,65.19,33.28,93.7],ok:false,say:'Crabs scuttle, they don\u2019t leap waves!'}]},
  {type:'ask',ask:'WHERE did it happen?',ctx:[4.5,16.5,95.5,57.5],ctxLabel:'Dolphin leaping over a wave',
   cards:[{label:'In the ocean',crop:[33.75,65.19,44.22,92.22],ok:true,say:'In the big blue ocean!'},
          {label:'In the forest',crop:[43.23,65.19,54.22,92.22],ok:false,say:'Forests have no waves.'},
          {label:'In the desert',crop:[53.23,65.19,64.22,92.22],ok:false,say:'No ocean in the desert!'}]},
  {type:'ask',ask:'WHAT did the dolphin do?',ctx:[4.5,16.5,95.5,57.5],ctxLabel:'Dolphin leaping over a wave',
   cards:[{label:'Jumped over a wave',crop:[66.72,65.19,77.71,93.7],ok:true,say:'Jumped over a wave \u2014 splash!'},
          {label:'Slept in a bed',crop:[76.72,65.19,87.71,91.85],ok:false,say:'Silly \u2014 dolphins sleep in the sea!'},
          {label:'Climbed a tree',crop:[86.72,65.19,97.71,93.7],ok:false,say:'Dolphins never climb trees!'}]}]}),
G({num:28,slug:'squirrels-story-connections',img:'28-squirrels-story-connections.webp',title:'Squirrel\u2019s Story Connections',skill:'Problem and solution',
 tag:'A thirsty rabbit, a fallen nest, a wobbly wheel \u2014 connect every problem to its fix.',
 say:'Every problem has a solution! Tap a problem, then tap the picture that fixes it.',
 hint:'Problem solved!',doneTitle:'All connected!',doneSub:'Water for the rabbit, the nest back in the tree, the car fixed good as new.',
 alt:'Three problems \u2014 a rabbit with an empty glass, a bird by a fallen nest, a car with a wheel off \u2014 beside three solutions.',
 steps:[{type:'match',ask:'Tap a problem, then tap its solution.',
  cards:[{label:'The rabbit is thirsty',crop:[3.12,20.93,26.2,44.54],group:'a',pair:'water',say:'A glass of water fixes thirsty!'},
         {label:'The nest fell from the tree',crop:[3.12,42.41,26.2,69.07],group:'a',pair:'nest',say:'Back to the tree it goes!'},
         {label:'The car lost its wheel',crop:[3.07,66.3,26.2,93.61],group:'a',pair:'fix',say:'Fix the wheel \u2014 good as new!'},
         {label:'Helping the nest back up',crop:[53.28,17.87,78.18,44.54],group:'b',pair:'nest'},
         {label:'Fixing the little car',crop:[55,45,76.5,66.5],group:'b',pair:'fix'},
         {label:'A glass of water',crop:[55,69,76.5,91],group:'b',pair:'water'}]}]}),
G({num:29,slug:'little-deers-story-paths',img:'29-little-deers-story-paths.webp',title:'Little Deer\u2019s Story Paths',skill:'Story choices',
 tag:'Rain at the window \u2014 help Little Deer pick the story path: inside, umbrella, then out into the rain.',
 say:'Little Deer watches the rain. Choose the right story path \u2014 three choices lead to a rainy-day walk!',
 hint:'The story follows you!',doneTitle:'The path is found!',doneSub:'Watch the rain, take the umbrella, open it \u2014 off for a puddle stroll.',
 alt:'Little Deer at a rainy window, then three A/B choice circles \u2014 window or beach, umbrella or goggles, open umbrella or snowman \u2014 ending with Deer walking under an umbrella.',
 parentNote:'This is a choose-the-path game: at each fork one choice keeps the rainy-day story sensible. Ask your child to tell you WHY before tapping \u2014 the retelling is the comprehension.',
 steps:[
  {type:'ask',ask:'Rain taps at the window. Which path fits the rainy day?',ctx:[2.5,26.5,16.5,68.5],ctxLabel:'Little Deer watching the rain from the window',
   cards:[{label:'Stay and watch the rain',crop:[23.18,27.59,32.4,52.31],ok:true,say:'A rainy-day story starts at the window!'},
          {label:'Off to the beach',crop:[19.22,49.07,32.4,78.8],ok:false,say:'A beach day needs sun \u2014 it\u2019s raining!'}]},
  {type:'ask',ask:'Little Deer wants to walk in the rain. What comes next?',cards:[
   {label:'Take the umbrella',crop:[32.03,27.59,45.42,52.31],ok:true,say:'An umbrella \u2014 just right for rain!'},
   {label:'Put on swimming goggles',crop:[32.03,49.07,45.42,78.8],ok:false,say:'Goggles are for swimming pools!'}]},
  {type:'ask',ask:'One more choice before the walk!',cards:[
   {label:'Open the umbrella',crop:[45.05,27.59,58.33,52.31],ok:true,say:'Open it up \u2014 off into the rain!'},
   {label:'Build a snowman',crop:[45.05,49.07,58.39,78.8],ok:false,say:'Snowmen need snow, not rain!'}]}]}),
G({num:30,slug:'storybook-castle-challenge',img:'30-storybook-castle-challenge.webp',title:'Storybook Castle Challenge',skill:'The grand story challenge',
 tag:'Three story challenges guard the castle: order the story, read the feeling, pick what happens next.',
 say:'Three story challenges! What happens first, how does the character feel, and what happens next?',
 hint:'Challenge passed!',doneTitle:'Castle unlocked!',doneSub:'Seeds come first, gifts bring joy, and the umbrella opens before the walk.',
 alt:'The storybook castle with three challenge rows: what happens first, how the character feels, what happens next.',
 parentNote:'A gentle finale that mixes three story skills: sequencing, feelings, and prediction. Celebrate each shield earned \u2014 three in a row unlocks the castle!',
 steps:[
  {type:'ask',ask:'Challenge one: WHAT HAPPENS FIRST?',cards:[
   {label:'A child plants a seed',crop:[34.11,19.17,53.85,42.78],ok:true,say:'Planting comes first!'},
   {label:'A flower blooms',crop:[20.47,19.17,35,42.78],ok:false,say:'Blooming is the last part!'},
   {label:'A child waters a sprout',crop:[52.6,19.17,72.34,42.78],ok:false,say:'Watering comes after planting.'}]},
  {type:'ask',ask:'Challenge two: the rabbit gets a gift. HOW DOES THE CHARACTER FEEL?',ctx:[17.5,46.5,32.5,62.5],ctxLabel:'A rabbit holding a gift',
   cards:[{label:'Happy',crop:[33.59,44.54,46.35,64.35],ok:true,say:'A gift brings happy!'},
          {label:'Sad',crop:[47.6,44.54,60.36,64.35],ok:false,say:'Sad is for dropped ice creams!'},
          {label:'Angry',crop:[60.57,44.54,73.33,64.35],ok:false,say:'Angry is for broken toys.'}]},
  {type:'ask',ask:'Challenge three: Fox stands in the rain with an umbrella. WHAT HAPPENS NEXT?',ctx:[17.5,66,32.5,90.5],ctxLabel:'Fox in the rain under a closed umbrella',
   cards:[{label:'Fox opens the umbrella',crop:[33.07,63.06,53.39,93.43],ok:true,say:'Open it up and stay dry!'},
          {label:'Fox builds a snowman',crop:[52.08,63.06,72.4,93.43],ok:false,say:'In the rain? Snowmen need snow!'}]}]})
];

export const readingBySlug=Object.fromEntries(readingAdventures.map(g=>[g.slug,g]));

/* ---------- pages ---------- */
export function readingClassBody(){
 const shelves=[
  [1,'First stories','Sequencing, clues, feelings and settings \u2014 the earliest comprehension moves.',1,5],
  [2,'Helping and deciding','Problem and solution, kind choices, and what makes sense.',6,10],
  [3,'Retelling','Beginning, middle, end \u2014 putting stories back together.',11,15],
  [4,'Journeys and memory','Story paths, memory challenges, endings and timelines.',16,20],
  [5,'Characters and questions','Who did what, where, and why \u2014 with a grand castle finale.',21,30]];
 const pending=READING_PENDING.map(p=>`<li><strong>${p.num}. ${esc(p.title)}</strong> \u2014 artwork on its way; the game and worksheet appear here the day it lands.</li>`).join('');
 return `${crumbNav([['Preschool','/preschool/'],['Age 4','/preschool/4-years/'],['Storytime &amp; Pre-Reading']])}
 <article class="wrap lesson-hero"><div class="lesson-hero-copy">
  <span class="eyebrow">CLASS 29 · PRESCHOOL AGES 4–5</span>
  <h1>Storytime &amp; Pre-Reading Comprehension</h1>
  <div class="fc-chips lesson-chips"><span><strong>Age</strong> 4–5 Years</span><span><strong>Class</strong> 29 of 30</span><span><strong>Adventures</strong> 29 story games</span><span><strong>Subjects</strong> Sequencing · feelings · retelling</span></div>
  <p class="lesson-lede">Build early reading comprehension through picture stories, sequencing, predictions, characters, emotions, memory, and problem-solving. Twenty-nine real games \u2014 every one played on its own storybook illustration, with spoken instructions and a printable worksheet twin in the <a href="${WS29_PATH}">Reading worksheet library</a>.</p>
  <p class="lesson-lede">No reading needed: every prompt is spoken aloud and every answer is a picture. Grown-ups get the story behind each game on its page.</p>
  <div class="lesson-start"><a class="button" href="#adventures">Meet the adventures <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">One or two stories per sitting is a full session.</span></div>
 </div></article>
 <section class="wrap lesson-section" id="adventures" aria-label="The storytime adventures">
  <span class="eyebrow">PLAY · THE ${READING_READY} STORYTIME ADVENTURES</span>
  <h2>Twenty-nine story adventures.</h2>
  <p class="lesson-copy">Start anywhere your child\u2019s curiosity points. The shelves run in a gentle skill order \u2014 sequences before inferences \u2014 but every game stands alone. Each adventure twins with a printable worksheet at <a href="${WS29_PATH}">/worksheets/reading/</a>.</p>
  ${shelves.map((sh,i)=>{const [t,d,a,b]=sh;const items=readingAdventures.filter(g=>g.num>=a&&g.num<=b);
   return `<div class="wa-shelf"><h3>${i+1}. ${t}</h3><p class="lesson-copy">${d}</p><div class="sa-grid">${items.map(g=>`<a class="sa-card sa-card-slim" href="${READING_LIB}${g.slug}/"><img src="${READING_BASE}${g.img}" width="400" height="284" alt="${esc(g.alt)}" loading="lazy"><span class="sa-card-body"><strong>${g.num}. ${esc(g.title)}</strong><span class="sa-card-skill">${esc(g.skill)}</span></span><span class="sa-card-play">Play <span aria-hidden="true">→</span></span></a>`).join('')}</div></div>`;}).join('')}
  <p class="lesson-note">${READING_READY} of the planned ${READING_TOTAL} adventures are playable now. Reserved until its artwork arrives: <ul class="ws-skills">${pending}</ul> Nothing is published before it can be played and printed honestly \u2014 adventure 24 (Unicorn\u2019s Story Choice Garden) keeps its number and slug for when its artwork is uploaded.</p>
 </section>
 <section class="wrap lesson-section" id="off-screen" aria-label="Off-screen story play">
  <span class="eyebrow">TAKE IT OFF SCREEN</span>
  <h2>Story play at bedtime and in the car.</h2>
  <div class="tc-hunt"><h3>Retell the day in three</h3><ul class="lesson-prompts"><li>Bedtime recap in three steps: first we\u2026, then we\u2026, last we\u2026. Sequencing practice with your own day.</li><li>Let your child pick the three \u2014 their order, their story.</li></ul></div>
  <div class="tc-hunt"><h3>What happens next?</h3><ul class="lesson-prompts"><li>Pause a picture book before the last page and guess the ending \u2014 exactly what Dragon\u2019s Ending Studio plays.</li><li>Silly endings welcome; then find the one that fits.</li></ul></div>
  <p class="lesson-note">Comprehension grows from talking about stories, not from quizzing them. Follow the \u201cwhy do you think so?\u201d wherever it leads.</p>
 </section>
 <section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2>
  <p class="lesson-copy">Pre-reading comprehension is talking, not testing: who is this about, where are we, what happened first, what happens next? Every game here asks one of those questions with pictures instead of print, and speaks its instructions aloud so no reading is required to play.</p>
  <p class="lesson-copy">The worksheets are the paper twins \u2014 the same picture stories with room to retell, draw and write. <a href="${WS29_PATH}">Browse the reading worksheets</a> and print the adventure your child loved. Playing games never marks a class complete; only real game finishes do, and only for the child chosen in <a href="/my-classroom/">My Classroom</a>.</p>
  <p class="lesson-copy"><a href="/about/#principal">More from the Principal\u2019s Office <span aria-hidden="true">↗</span></a></p>
 </section>
 <section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>What a storyteller!</h2>
  <p class="lesson-copy">Every retold story builds the comprehension that real reading stands on. The shelves remember where you left off for your chosen child.</p>
  <div class="hero-actions"><a class="button" href="${READING_LIB}">Play more Storytime Adventures <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="${WS29_PATH}">Print the reading worksheets <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
 </section>`;
}

export function readingLibraryBody(){
 return `${crumbNav([['Preschool','/preschool/'],['Storytime Adventures']])}
 ${heading29('STORYTIME ADVENTURES','Twenty-nine story games you play with pictures.','Sequencing, clues, feelings, retelling, memory and story paths \u2014 real comprehension games played on our own storybook artwork, with spoken instructions and no reading required.')}
 <div class="lesson-start"><a class="button" href="${C29_PATH}">This way to Class 29 <span aria-hidden="true">→</span></a><span class="lesson-start-hint">The class that goes with these adventures: Storytime &amp; Pre-Reading Comprehension.</span></div>
 <section class="wrap section compact" data-st-lib aria-label="All storytime adventures">
  <div class="sa-grid">
  ${readingAdventures.map(g=>`<a class="sa-card" href="${READING_LIB}${g.slug}/" data-st-libcard="${g.slug}">
    <span class="sa-card-num" aria-hidden="true">${g.num}</span>
    <span class="sa-card-done" data-sa-done hidden>Cleared!</span>
    <img src="${READING_BASE}${g.img}" width="800" height="568" alt="${esc(g.alt)}" loading="lazy">
    <span class="sa-card-body"><strong>${esc(g.title)}</strong><span class="sa-card-tag">${esc(g.tag)}</span><span class="sa-card-skill">${esc(g.skill)}</span></span>
    <span class="sa-card-play">Play <span aria-hidden="true">→</span></span>
  </a>`).join('')}
  </div>
  <p class="lesson-note">Every card is one real game. ${READING_READY} of the planned ${READING_TOTAL} adventures are playable now \u2014 24, Unicorn's Story Choice Garden, joins the moment its artwork is uploaded. Progress is saved on this device for the child chosen in <a href="/my-classroom/">My Classroom</a>.</p>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>What each game practises.</h2>
  <p class="lesson-copy">The collection climbs one slope: ordering stories (Bunny\u2019s garden, Squirrel\u2019s morning, Panda\u2019s kite, Mouse\u2019s train), reading picture clues (Teddy\u2019s backpack, Rabbit\u2019s needs, Giraffe\u2019s detective, Otter\u2019s hunt), matching feelings and characters (Little Lion, Owl\u2019s world, Koala\u2019s detective), reasoning about problems and best choices (Puppy\u2019s helping hands, Little Bear\u2019s decision, Squirrel\u2019s connections), and remembering, predicting and fixing stories (Raccoon\u2019s memory, Dragon\u2019s endings, Penguin\u2019s silly fixes, Turtle\u2019s timeline, Ladybug\u2019s missing scene, Little Deer\u2019s paths) \u2014 up to the castle challenge that mixes them all.</p>
  <p class="lesson-copy">Say the prompt aloud with the game, ask \u201cwhy do you think so?\u201d, and let the giggles at the silly answers do the teaching. Every worksheet twin prints without a screen.</p>
 </section>`;
}
const heading29=(eyebrow,title,desc)=>`<div class="page-heading wrap"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${desc}</p></div>`;

export function readingAdventureBody(g){
 const list=readingAdventures;
 const i=list.findIndex(x=>x.slug===g.slug);
 const prev=list[(i-1+list.length)%list.length];
 const next=list[(i+1)%list.length];
 const ws=WS29_PATH+g.slug+'/';
 return `${crumbNav([['Preschool','/preschool/'],['Storytime Adventures',READING_LIB],[g.num+'. '+esc(g.title)]])}
 <article class="wrap lesson-hero sa-hero">
  <div class="sa-hero-art"><img src="${READING_BASE}${g.img}" width="800" height="568" alt="${esc(g.alt)}" fetchpriority="high"></div>
  <div class="lesson-hero-copy">
   <span class="eyebrow">STORYTIME ADVENTURE ${g.num} · CLASS 29</span>
   <h1>${esc(g.title)}</h1>
   <div class="fc-chips lesson-chips"><span><strong>Age</strong> 4–5 Years</span><span><strong>Class</strong> 29 · Storytime</span><span><strong>Skill</strong> ${esc(g.skill)}</span></div>
   <p class="lesson-lede">${esc(g.tag)}</p>
   <div class="lesson-start"><a class="button" href="#play">Play the story game <span aria-hidden="true">↓</span></a><a class="button button-ghost" href="${ws}">Print the worksheet <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Play with a finger, a stylus or a mouse. Instructions are spoken aloud.</span></div>
  </div>
 </article>
 <section class="wrap lesson-section" id="play" aria-label="Play ${esc(g.title)}">
  <span class="eyebrow">PLAY · ${esc(g.skill).toUpperCase()}</span>
  <h2>${esc(g.title)}</h2>
  <p class="lesson-copy">${esc(g.say)}</p>
  ${board(READING_BASE,{...g,band:"reading"},W,H)}
  <noscript><p class="sa-noscript">The tapping game needs JavaScript. Everything else on this page works without it \u2014 and the <a href="${ws}">matching worksheet</a> brings this adventure to paper.</p></noscript>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>Why this adventure helps.</h2>
  <p class="lesson-copy">${esc(g.parentNote||'This game trains '+g.skill.toLowerCase()+' on the story picture itself: the questions are spoken aloud, the answers are pictures, and a miss brings a gentle hint instead of a penalty. Ask your child to say the answer out loud before tapping \u2014 the retelling is where comprehension really grows.')}</p>
  ${g.artNote?`<p class="lesson-copy"><strong>Illustration note:</strong> ${esc(g.artNote)}</p>`:''}
  <p class="lesson-copy">Prefer paper? The <a href="${ws}">${esc(g.title)} worksheet</a> prints the same story with room to retell and draw \u2014 and a grown-up answer line. Printing never marks anything complete.</p>
 </section>
 <nav class="wrap lesson-section sa-prevnext" aria-label="More storytime adventures">
  <a class="sa-navcard" href="${READING_LIB}${prev.slug}/"><span class="eyebrow">Previous</span><strong>${esc(prev.title)}</strong></a>
  <a class="sa-navcard" href="${READING_LIB}"><span class="eyebrow">All adventures</span><strong>Storytime Library</strong></a>
  <a class="sa-navcard" href="${READING_LIB}${next.slug}/"><span class="eyebrow">Next</span><strong>${esc(next.title)}</strong></a>
 </nav>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP GOING</span><h2>Where next?</h2>
  <div class="fc-stages">
   <a class="fc-stage lesson-card-link" href="${C29_PATH}"><div class="fc-stage-pills"><span class="fc-age">Age 4–5</span><span class="fc-class">Class 29</span></div><h3>Storytime &amp; Pre-Reading</h3><p>The class behind these adventures \u2014 all story games plus off-screen retelling ideas.</p><span class="fc-open">Open Class 29 <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="${ws}"><div class="fc-stage-pills"><span class="fc-age">Age 4–5</span><span class="fc-class">Worksheet</span></div><h3>${esc(g.title)} worksheet</h3><p>The printable twin of this game \u2014 free PDF, print button, parent guide.</p><span class="fc-open">Open the worksheet <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/preschool/phonics/adventures/"><div class="fc-stage-pills"><span class="fc-age">Age 4–5</span><span class="fc-class">Class 28</span></div><h3>Phonics Adventures</h3><p>Twenty-four listening games with real sound \u2014 the sounds side of getting ready to read.</p><span class="fc-open">Open the Phonics Library <span aria-hidden="true">↗</span></span></a>
  </div>
 </section>`;
}
