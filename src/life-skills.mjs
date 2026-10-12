// Kiddo School — Class 32 · Life Skills & Good Habits.
// Thirty planned activity sheets; the six whose artwork the owner has
// uploaded (verified live on R2 under school/life-skills/adventures/, all
// 1414×2000 portrait, audited image by image) are playable and printable
// today. The other numbers stay honestly reserved — nothing is published
// before its real artwork exists, per the school's standing rule.
//
// THE ACTIVITY is the learning-path page: /preschool/life-skills/{slug}/
//   LEFT: the full original sheet (never cropped) with a transparent
//   drawing layer directly on top — pencil, colors, eraser, undo, redo,
//   clear, save; mouse, finger and stylus all work.
//   RIGHT: the title, child-friendly instructions and the drawing tools,
//   with Previous / Next activities.
// THE WORKSHEET page: /worksheets/life-skills/{slug}/ — download the
//   original WebP, print, share and family reactions. No drawing system
//   there and no PDFs: Canva made the artwork, the school adds only the
//   functionality.
// Progress saves per selected child in the site's existing localStorage
// store. Opening a page never completes anything — only a real save of
// the child's own marked-up sheet does.
import {R2,crumbNav,esc} from './adventure-kit.mjs';
import {fcCommunityMount} from './flashcards/index.mjs';
import * as lsFlash from './flashcards/data-life-skills-and-good-habits.mjs';
import {lpContent as lsLp} from './flashcards/lp-life-skills.mjs';

export const FC_SET_URL='/flashcards/life-skills-and-good-habits/';

export const LS_BASE=R2+'school/life-skills/adventures/';
export const LS_CLASS_PATH='/preschool/4-years/life-skills-and-good-habits/';
export const LS_ACT_PATH='/preschool/life-skills/';
export const LS_WS_PATH='/worksheets/life-skills/';

export const LS_PLANNED=30;
/* the sheet numbers whose artwork is not uploaded yet — kept honestly
   reserved; each opens here the day its file lands on the bucket */
export const LS_MISSING=[24];
export const LS_READY=LS_PLANNED-LS_MISSING.length;

const G=o=>o;
export const lifeSkills=[
G({
 num:1,slug:'wash-your-hands',img:'01-wash-your-hands.webp',w:1414,h:2000,
 title:'Wash Your Hands',word:'WASH HANDS',
 tag:'Clean hands before eating, a toothbrush for every child and a breakfast that is really healthy.',
 meta:'A free life-skills worksheet for age 4: circle the child washing hands, match toothbrushes, choose the healthy breakfast, trace WASH HANDS and draw happy faces beside good habits — on screen or on paper.',
 steps:[
  ['Circle','Find the child who washes hands BEFORE eating, and circle them.'],
  ['Match','Draw a line from each child to the toothbrush that is theirs.'],
  ['Choose','One breakfast is healthy and one is a treat — circle the healthy one.'],
  ['Trace','Trace the big words WASH HANDS with your favorite color.'],
  ['Draw','Read every good habit and draw a happy face next to each one you do.']
 ],
 skills:['Hand-washing before eating','Toothbrush ownership','Healthy food choices','Word tracing','Habit awareness'],
 grown:'Ask “when do we wash our hands?” during the day — before eating, after the toilet, after playing outside. The sheet names the habit; the day reinforces it.'
}),
G({
 num:2,slug:'tidy-up',img:'02-tidy-up.webp',w:1414,h:2000,
 title:'Tidy Up',word:'TIDY UP',
 tag:'Every toy has a home — teddy, car, ball and blocks go back where they belong.',
 meta:'A free tidy-up worksheet for preschoolers: circle the child tidying toys, match each toy to its storage box, tick the sharing picture, trace TIDY UP and draw a toy in the box — on screen or on paper.',
 steps:[
  ['Circle','One child is tidying the toys — circle that child.'],
  ['Match','Draw a line from each toy to the box where it lives: teddy, car, ball, blocks.'],
  ['Choose','One picture shows sharing and one shows pulling — tick the sharing one.'],
  ['Trace','Trace the words TIDY UP, nice and slow.'],
  ['Draw','Draw one of your own toys inside the big box.']
 ],
 skills:['Putting toys away','Sorting by where things belong','Noticing kindness','Word tracing','Drawing from life'],
 grown:'Give every toy a named home at your house too. Cleanup becomes a matching game instead of a battle — “which box does the ball live in?”'
}),
G({
 num:4,slug:'be-kind',img:'04-be-kind.webp',w:1414,h:2000,
 title:'Be Kind',word:'BE KIND',
 tag:'Kind words, feeling faces and taking turns — the everyday habits of a good friend.',
 meta:'A free kindness worksheet for age 4: circle the child using kind words, match feeling faces to happy, sad and calm, choose the taking-turns picture, trace BE KIND and draw a smile beside the kind action.',
 steps:[
  ['Circle','Listen to the speech bubbles — circle the child using kind words.'],
  ['Match','Draw a line from each feeling face to its word: happy, sad, calm.'],
  ['Choose','Two children want one truck — tick the picture where they take turns.'],
  ['Trace','Trace the words BE KIND in your best pencil.'],
  ['Draw','One picture shows a kind action — draw a big smile beside it.']
 ],
 skills:['Kind words','Naming feelings','Taking turns','Word tracing','Noticing kindness'],
 grown:'When a real squabble starts, borrow the sheet’s words: “can you find the taking-turns way?” Feelings faces work best named in the moment — “you look like the calm face right now.”'
}),
G({
 num:16,slug:'move-your-body',img:'16-move-your-body.webp',w:1414,h:2000,
 title:'Move Your Body',word:'MOVE YOUR BODY',
 tag:'Run, jump and stretch — spot safe movement, match the poses and choose active play.',
 meta:'A free movement worksheet for preschoolers: circle the child moving safely, match jump, stretch and run to the right pose, choose the active-play picture, trace MOVE YOUR BODY and draw a large ball.',
 steps:[
  ['Circle','Find the child who is moving SAFELY — circle them.'],
  ['Match','Draw a line from each word to the body doing it: jump, stretch, run.'],
  ['Choose','One picture is active play and one is quiet time — circle the active one.'],
  ['Trace','Trace MOVE YOUR BODY, then do one big stretch in real life!'],
  ['Draw','Draw one large ball in the round space — make it as big as you can.']
 ],
 skills:['Safe movement','Action words','Active vs quiet play','Word tracing','Big drawing movements'],
 grown:'Turn the sheet into a game: read a word — jump, stretch, run — and both of you do it. The helmet child on the scooter is your opening for “why do we wear helmets?”'
}),
G({
 num:17,slug:'please-and-thank-you',img:'17-please-and-thank-you.webp',w:1414,h:2000,
 title:'Please and Thank You',word:'PLEASE AND THANK YOU',
 tag:'The magic words — please, thank you and excuse me, matched to the right moment.',
 meta:'A free manners worksheet for age 4: circle the child saying please, match please, thank you and excuse me to the right situation, choose the good-manners picture, trace the words and draw a smile beside the polite action.',
 steps:[
  ['Circle','Read the speech bubbles — circle the child saying PLEASE.'],
  ['Match','Draw a line from each polite phrase to the moment it belongs to.'],
  ['Choose','Two ways to ask for a toy — tick the one with good manners.'],
  ['Trace','Trace PLEASE AND THANK YOU — the longest words on the sheet!'],
  ['Draw','Find the polite action and draw a smile in the circle beside it.']
 ],
 skills:['Magic words','Please, thank you, excuse me','Polite asking','Word tracing','Noticing manners'],
 grown:'Catch them being polite in real life and name it: “you said thank you all by yourself!” The traced words are long — let them finish the sheet feeling strong, not tired.'
}),
G({
 num:25,slug:'ask-for-help',img:'25-ask-for-help.webp',w:1414,h:2000,
 title:'Ask for Help',word:'ASK FOR HELP',
 tag:'Asking a trusted grown-up is a skill — practise the words and pick the right helper.',
 meta:'A free life-skills worksheet for preschoolers: circle the child asking a trusted adult for help, match each situation to the right helper, choose the clear help request, trace ASK FOR HELP and draw a “Help, please” speech bubble.',
 steps:[
  ['Circle','Find the child asking a trusted grown-up for help — circle them.'],
  ['Match','Draw a line from each “I need help…” to the right helper.'],
  ['Choose','One child asks clearly and kindly — tick that picture.'],
  ['Trace','Trace the words ASK FOR HELP.'],
  ['Draw','Draw “Help, please.” inside the big speech bubble.']
 ],
 skills:['Asking for help','Trusted adults','Clear requests','Word tracing','Writing in a speech bubble'],
 grown:'Practise the real words at home: “Can you help me, please?” Praise the asking, not just the solving — children who know how to ask are safer and braver.'
}),
G({
 num:3,slug:'get-ready',img:'03-get-ready.webp',w:1414,h:2000,
 title:'Get Ready',word:'GET READY',
 tag:'Dressing all by yourself, clothes to the right body area and a morning in the right order.',
 meta:'A free getting-dressed worksheet for age 4: circle the child dressing independently, sequence the getting-ready pictures, match clothes to body areas, trace GET READY and draw a star beside the helpful habit — on screen or on paper.',
 steps:[
  ['Circle','Find the child who is dressing all by himself — circle him.'],
  ['Sequence','Think about your morning: put the getting-ready pictures in order, 1, 2, 3.'],
  ['Match','Draw a line from each piece of clothing to the body part where it goes.'],
  ['Trace','Trace the words GET READY with steady, careful lines.'],
  ['Draw','Look at the three habits and draw a star beside the helpful one.']
 ],
 skills:['Dressing independently','Clothes to body areas','Morning sequencing','Word tracing','Spotting helpful habits'],
 grown:'Lay out tomorrow’s clothes together at bedtime and let your child dress themselves in the morning — buttons and zips are exactly the fine-motor work this sheet practises.'
}),
G({
 num:5,slug:'pack-up',img:'05-pack-up.webp',w:1414,h:2000,
 title:'Pack Up',word:'PACK UP',
 tag:'Books, pencils and water bottles to the right pocket — getting ready for school like a pro.',
 meta:'A free pack-up worksheet for preschoolers: circle the child packing school items, match each item to the correct bag pocket, tick the prepared child, trace PACK UP and draw something that belongs in a school bag.',
 steps:[
  ['Circle','Find the child packing her school bag — circle her.'],
  ['Match','Draw a line from each school thing to the pocket where it belongs.'],
  ['Choose','One child is prepared and one is in a muddle — tick the prepared one.'],
  ['Trace','Trace the words PACK UP, nice and slow.'],
  ['Draw','Draw one more thing that belongs in a school bag.']
 ],
 skills:['Packing for school','Matching items to places','Being prepared','Word tracing','Drawing from life'],
 grown:'Pack the real school bag together the night before, naming each item and its pocket — “the bottle lives in the side pocket.” The sheet is the rehearsal; the hallway is the show.'
}),
G({
 num:6,slug:'eat-well',img:'06-eat-well.webp',w:1414,h:2000,
 title:'Eat Well',word:'EAT WELL',
 tag:'Every-day foods and sometimes foods, good table habits and one healthy plate to fill.',
 meta:'A free healthy-eating worksheet for age 4: circle the child eating neatly, sort foods into every day and sometimes, choose the correct spoon and cup use, trace EAT WELL and draw a healthy meal on the plate.',
 steps:[
  ['Circle','Find the child eating neatly at the table — circle them.'],
  ['Sort','Put each picture card in a box: foods we eat every day, and treats for sometimes.'],
  ['Choose','Two children are eating — tick the one using the spoon and cup correctly.'],
  ['Trace','Trace the words EAT WELL in your best pencil.'],
  ['Draw','Draw a healthy food (or two!) on the big empty plate.']
 ],
 skills:['Healthy food choices','Every day vs sometimes foods','Table manners','Word tracing','Drawing healthy meals'],
 grown:'At the next meal, play the same sort for real: “is this an every-day food or a sometimes food?” Naming the rule beats banning the treat.'
}),
G({
 num:7,slug:'stop-look-go',img:'07-stop-look-go.webp',w:1414,h:2000,
 title:'Stop, Look, Go',word:'STOP LOOK GO',
 tag:'Traffic light meanings, waiting at the crossing and choosing the safe place to cross.',
 meta:'A free road-safety worksheet for preschoolers: circle the child waiting at the crossing, match traffic lights to stop, wait and go, choose the safe crossing, trace STOP LOOK GO and draw the line to the safe place to cross.',
 steps:[
  ['Circle','Find the child standing and waiting at the crossing — circle them.'],
  ['Match','Draw a line from each traffic light to its meaning: stop, wait, go.'],
  ['Choose','Tick the picture that shows the safe place to cross the road.'],
  ['Trace','Trace the words STOP LOOK GO — say them out loud as you trace!'],
  ['Draw','Draw a line from the walking child to the safe crossing.']
 ],
 skills:['Traffic light meanings','Waiting to cross','Choosing safe crossings','Word tracing','Road awareness'],
 grown:'Practise the real thing at every crossing this week: “stop, look, listen — now we go together, holding hands.” The words on the sheet become the words of the walk.'
}),
G({
 num:8,slug:'bedtime-routine',img:'08-bedtime-routine.webp',w:1414,h:2000,
 title:'Bedtime Routine',word:'BEDTIME ROUTINE',
 tag:'Teeth, pajamas and a story in the right order — and ticking the calm way to end the day.',
 meta:'A free bedtime worksheet for age 4: circle the child getting ready for bed, sequence the bedtime steps, match each bedtime item to its use, trace BEDTIME ROUTINE and tick the calm bedtime habit — on screen or on paper.',
 steps:[
  ['Circle','Find the child getting ready for bed — look for the pajamas! — and circle them.'],
  ['Sequence','Put the bedtime pictures in order: what comes first, next, last?'],
  ['Match','Draw a line from each bedtime thing to what we do with it.'],
  ['Trace','Trace the words BEDTIME ROUTINE, nice and slowly.'],
  ['Tick','Read the three choices and tick the calm way to end the day.']
 ],
 skills:['Bedtime sequencing','Self-care before sleep','Calm vs busy habits','Word tracing','Matching items to uses'],
 grown:'Photograph your child’s real bedtime order and tape it by the bed — the sheet’s sequence becomes their own routine chart, and lights-out stops being a negotiation.'
}),
G({
 num:9,slug:'stay-safe',img:'09-stay-safe.webp',w:1414,h:2000,
 title:'Stay Safe',word:'STAY SAFE',
 tag:'Safe choices at home — outlets, knives, stairs — and matching every object to its safe use.',
 meta:'A free safety worksheet for age 4: circle the safe choice, match household objects to their safe actions, cross out the unsafe action, trace STAY SAFE and draw a happy face beside the safe habit — on screen or on paper.',
 steps:[
  ['Circle','Look at each pair of pictures and circle the safe choice.'],
  ['Match','Draw a line from each household object to the safe way we handle it.'],
  ['Cross out','Find the unsafe action in each row and cross it out with a big X.'],
  ['Trace','Trace the words STAY SAFE with your steadiest pencil.'],
  ['Draw','Read the four habits and draw a happy face beside each safe one.']
 ],
 skills:['Home safety choices','Safe use of objects','Spotting unsafe actions','Word tracing','Safety habits'],
 grown:'Walk the house together and find two real “grown-ups only” things — naming what is off-limits (and why) works far better than a blanket “no”.'
}),
G({
 num:10,slug:'help-at-home',img:'10-help-at-home.webp',w:1414,h:2000,
 title:'Help at Home',word:'HELP AT HOME',
 tag:'Chores matched to their tools, kind helping hands and one job you can really do.',
 meta:'A free helping-at-home worksheet for preschoolers: circle the child doing a chore, match each chore to its tool, choose the helpful behaviour, trace HELP AT HOME and draw one job you can do — on screen or on paper.',
 steps:[
  ['Circle','Find the child busy helping at home — circle them.'],
  ['Match','Draw a line from each chore to the tool it needs.'],
  ['Choose','Two children want the same toy — tick the one showing helpful behaviour.'],
  ['Trace','Trace the words HELP AT HOME, nice and big.'],
  ['Draw','Draw one job you can really do at your house.']
 ],
 skills:['Helping with chores','Matching chores to tools','Kind behaviour','Word tracing','Job confidence'],
 grown:'Give your child one real, daily job this week — feeding the pet, pairing the socks — and let the sheet’s drawing be the contract they signed.'
}),
G({
 num:11,slug:'care-for-plants',img:'11-care-for-plants.webp',w:1414,h:2000,
 title:'Care for Plants',word:'CARE FOR PLANTS',
 tag:'Water and sunlight for growing things, gentle hands and one new leaf to draw.',
 meta:'A free plant-care worksheet for age 4: circle the child caring for a plant, match water and sunlight to what plants need, choose the gentle care picture, trace CARE FOR PLANTS and draw a leaf on the plant — on screen or on paper.',
 steps:[
  ['Circle','Find the child giving the plant a drink — circle them.'],
  ['Match','Draw a line from the watering can and the sun to what the plant needs.'],
  ['Choose','Look at all three children and tick the one showing gentle care.'],
  ['Trace','Trace the words CARE FOR PLANTS in your best pencil.'],
  ['Draw','The little plant is bare — draw a brand-new leaf on its stem.']
 ],
 skills:['What plants need','Gentle handling','Care and responsibility','Word tracing','Drawing nature'],
 grown:'Start one pot on the windowsill and make your child its official waterer — the first new leaf deserves a celebration.'
}),
G({
 num:12,slug:'listen-well',img:'12-listen-well.webp',w:1414,h:2000,
 title:'Listen Well',word:'LISTEN WELL',
 tag:'Ears ready, follow the instruction the first time — clap, sit, raise your hand.',
 meta:'A free listening worksheet for preschoolers: circle the child listening, match each instruction to the correct action, choose the careful listener, trace LISTEN WELL and draw a happy face beside the good habit — on screen or on paper.',
 steps:[
  ['Circle','Find the child using their listening ears — circle them.'],
  ['Match','Draw a line from each instruction to the child doing it: clap, sit, raise your hand.'],
  ['Choose','One child is listening carefully — tick that picture.'],
  ['Trace','Trace the words LISTEN WELL, nice and carefully.'],
  ['Draw','Draw a happy face beside “I listen and follow directions.”']
 ],
 skills:['Careful listening','Following instructions','Listening positions','Word tracing','Classroom readiness'],
 grown:'Play “instruction of the day”: give two-step directions at home (“hang your coat, then wash your hands”) and celebrate when the first time is the right time.'
}),
G({
 num:13,slug:'my-body-my-rules',img:'13-my-body-my-rules.webp',w:1414,h:2000,
 title:'My Body, My Rules',word:'MY BODY, MY RULES',
 tag:'Asking before touching, comfortable personal space and naming feelings — the foundations of body safety.',
 meta:'A free body-safety worksheet for age 4: circle the child asking before touching, choose the comfortable personal space, match feeling faces to words, trace MY BODY, MY RULES and draw a stop hand beside the safe choice.',
 steps:[
  ['Circle','Find the child asking first — “Can I hug you?” — and circle them.'],
  ['Choose','Tick the picture showing comfortable personal space between friends.'],
  ['Match','Draw a line from each feeling face to its word: happy, worried, unsure.'],
  ['Trace','Trace the words MY BODY, MY RULES — these are important words.'],
  ['Draw','Find the safe choice and draw a big stop hand in the circle beside it.']
 ],
 skills:['Asking before touching','Personal space','Naming feelings','Saying no','Body autonomy'],
 grown:'Teach the family rule that hugs are always askable — relatives included. A child who practises “no, thank you” on a worksheet will use it at a birthday party.'
}),
G({
 num:14,slug:'be-gentle',img:'14-be-gentle.webp',w:1414,h:2000,
 title:'Be Gentle',word:'BE GENTLE',
 tag:'Soft hands for animals, each pet item to its job, and the right food and water to choose.',
 meta:'A free gentle-hands worksheet for age 4: circle the child giving gentle care, match each pet item to its use, choose the correct pet food and water, trace BE GENTLE and draw one thing a pet needs — on screen or on paper.',
 steps:[
  ['Circle','Look how each child treats the animals — circle the one giving gentle care.'],
  ['Match','Draw a line from each pet item to its job: brush, feed, walk.'],
  ['Choose','Tick the food and water that truly belong to a pet.'],
  ['Trace','Trace the words BE GENTLE with soft, careful lines.'],
  ['Draw','Draw one more thing a pet needs to be happy and healthy.']
 ],
 skills:['Gentle hands with animals','Pet care items','Pet needs','Word tracing','Kindness to animals'],
 grown:'Practise the two-finger touch on a real pet or a soft toy — “gently, gently” — and let your child serve the real water bowl, just like the sheet.'
}),
G({
 num:15,slug:'care-for-clothes',img:'15-care-for-clothes.webp',w:1414,h:2000,
 title:'Care for Clothes',word:'CARE FOR CLOTHES',
 tag:'Clean or dirty, every item to its place, and a shirt to draw on the washing line.',
 meta:'A free clothing-care worksheet for preschoolers: circle the clean clothes, match each clothing item to where it belongs, sort pictures into clean and dirty, trace CARE FOR CLOTHES and draw a shirt on the clothes line.',
 steps:[
  ['Circle','Look for the sparkles! Circle the clothes that are clean.'],
  ['Match','Draw a line from each clothing item to its correct place.'],
  ['Sort','Put each picture in a box: the clean basket or the dirty basket.'],
  ['Trace','Trace the words CARE FOR CLOTHES, nice and steadily.'],
  ['Draw','The washing line is half empty — draw a shirt hanging on it.']
 ],
 skills:['Clean vs dirty sorting','Tidying clothes away','Laundry basics','Word tracing','Drawing clothes'],
 grown:'Let your child sort the real laundry into lights and darks, or hang their own shirt on a low hook — sorting games make tidy-up time independent.'
}),
G({
 num:18,slug:'dress-for-weather',img:'18-dress-for-weather.webp',w:1414,h:2000,
 title:'Dress for Weather',word:'DRESS FOR WEATHER',
 tag:'Raincoats for rain, mittens for snow, shorts for sun — matching the day to the clothes.',
 meta:'A free weather worksheet for age 4: circle the rainy-day clothes, match each weather to the right outfit, choose the safe way to stay warm or cool, trace DRESS FOR WEATHER and draw something for a sunny day.',
 steps:[
  ['Circle','Find the things you need on a rainy day — there is more than one! — and circle them.'],
  ['Match','Draw a line from each weather to the clothes that belong with it.'],
  ['Choose','Tick the child who is dressed the safe and comfortable way.'],
  ['Trace','Trace the words DRESS FOR WEATHER in your best pencil.'],
  ['Draw','Draw one more thing you would take on a sunny day.']
 ],
 skills:['Weather and clothing matching','Seasonal dressing','Comfort and safety choices','Word tracing','Drawing for weather'],
 grown:'Make the morning weather check your child’s job: look out the window, name the weather, choose the clothes — the sheet becomes a daily habit.'
}),
G({
 num:19,slug:'calm-down',img:'19-calm-down.webp',w:1414,h:2000,
 title:'Calm Down',word:'CALM DOWN',
 tag:'Naming big feelings, choosing a calm-down action and finding the helpful breath.',
 meta:'A free calm-down worksheet for preschoolers: circle the child using a calm-down choice, match feeling faces to words, choose the helpful breathing action, trace CALM DOWN and draw a calm face beside the good choice.',
 steps:[
  ['Circle','Find the child using a calm-down choice — sitting and breathing — and circle them.'],
  ['Match','Draw a line from each feeling face to its word: happy, angry, sad, calm.'],
  ['Choose','Tick the picture that shows a helpful breathing action.'],
  ['Trace','Trace the words CALM DOWN, slowly — tracing is calm too.'],
  ['Draw','Draw a calm face in the circle beside the good choice.']
 ],
 skills:['Naming feelings','Calm-down choices','Slow breathing','Word tracing','Self-regulation'],
 grown:'Practise the sheet’s breath when your child is ALREADY calm — smell the flower, blow the candle — so the skill is there when the big feelings arrive.'
}),
G({
 num:20,slug:'keep-it-clean',img:'20-keep-it-clean.webp',w:1414,h:2000,
 title:'Keep It Clean',word:'KEEP IT CLEAN',
 tag:'Rubbish in the bin, paper-plastic-glass to the right recycling, and care for nature.',
 meta:'A free tidying-and-recycling worksheet for age 4: circle the child using the bin, match paper, plastic and glass to the correct bins, choose the care-for-nature picture, trace KEEP IT CLEAN and draw something recyclable.',
 steps:[
  ['Circle','Find the child putting rubbish where it belongs — circle them.'],
  ['Match','Draw a line from each material — paper, plastic, glass — to its correct bin.'],
  ['Choose','Tick the picture showing care for nature.'],
  ['Trace','Trace the words KEEP IT CLEAN, nice and bold.'],
  ['Draw','Draw one more thing that can be recycled.']
 ],
 skills:['Using the bin','Sorting for recycling','Care for nature','Word tracing','Environmental habits'],
 grown:'Start a family recycling race: who can put their rubbish in the right bin all week? The sheet’s three colours match many real bins.'
}),
G({
 num:21,slug:'wait-your-turn',img:'21-wait-your-turn.webp',w:1414,h:2000,
 title:'Wait Your Turn',word:'WAIT YOUR TURN',
 tag:'Calm waiting, the turn-taking order on the slide and sharing without grabbing.',
 meta:'A free turn-taking worksheet for preschoolers: circle the child waiting calmly, number the turn-taking pictures in order, choose the sharing picture, trace WAIT YOUR TURN and draw a smile beside the patient choice.',
 steps:[
  ['Circle','Find the child standing and waiting calmly — circle them.'],
  ['Number','Write 1, 2, 3 beside the slide pictures in the right turn-taking order.'],
  ['Choose','Two children and one toy — tick the picture showing sharing a turn.'],
  ['Trace','Trace the words WAIT YOUR TURN, nice and patiently.'],
  ['Draw','Draw a smile in the circle beside the patient choice.']
 ],
 skills:['Waiting calmly','Turn-taking order','Sharing and patience','Word tracing','Emotional control'],
 grown:'Play turn-taking games at home with a visible timer or a song — when the waiting has a shape, patience stops being a battle.'
}),
G({
 num:22,slug:'use-kind-words',img:'22-use-kind-words.webp',w:1414,h:2000,
 title:'Use Kind Words',word:'USE KIND WORDS',
 tag:'Solving small problems kindly — calm talking, helpful actions and one friendly speech bubble.',
 meta:'A free kind-words worksheet for age 4: circle the child using kind problem-solving, match each problem to a helpful action, choose the calm talking picture, trace USE KIND WORDS and draw a friendly speech bubble.',
 steps:[
  ['Circle','Find the children solving the teddy problem together — circle the kind problem-solver.'],
  ['Match','Draw a line from each little problem to the helpful action that fixes it.'],
  ['Choose','Two ways to talk — tick the picture showing calm talking.'],
  ['Trace','Trace the words USE KIND WORDS with your kindest pencil.'],
  ['Draw','Two friends need an idea — draw a speech bubble with a friendly solution.']
 ],
 skills:['Kind problem-solving','Matching problems to solutions','Calm talking','Word tracing','Friendly words'],
 grown:'Arm your child with two real sentences — “can I have a turn when you’re done?” and “let’s build it together” — and notice out loud every time they use one.'
}),
G({
 num:23,slug:'helping-people',img:'23-helping-people.webp',w:1414,h:2000,
 title:'Helping People',word:'HELPING PEOPLE',
 tag:'Doctors, firefighters, teachers and mail carriers — the right helper for every situation.',
 meta:'A free community-helpers worksheet for age 4: circle the right helper for each situation, match each helper to their tool, choose the respectful picture, trace HELPING PEOPLE and draw your own community helper.',
 steps:[
  ['Circle','For each situation, circle the helper who can help: a hurt knee, a fire, a letter to post.'],
  ['Match','Draw a line from each helper to the tool of their job.'],
  ['Choose','One child is respectful and one is rude — tick the respectful one.'],
  ['Trace','Trace the words HELPING PEOPLE, nice and carefully.'],
  ['Draw','Draw your own community helper in the big box — who would you be?']
 ],
 skills:['Community helpers','Helpers and their tools','Respect for helpers','Word tracing','Drawing people'],
 grown:'On your next walk, spot the real helpers — crossings guards, nurses, postal workers — and wave. Respect practised in the street sticks for life.'
}),
G({
 num:26,slug:'tell-the-truth',img:'26-tell-the-truth.webp',w:1414,h:2000,
 title:'Tell the Truth',word:'TELL THE TRUTH',
 tag:'Honest words in tricky moments — broken vase, stolen cookie, low grade — and owning your mistakes.',
 meta:'A free honesty worksheet for age 4: circle the child telling the truth, match each situation to the honest choice, choose the responsible picture, trace TELL THE TRUTH and draw a happy face beside the honest action.',
 steps:[
  ['Circle','Two children say the same words — look at the homework! — and circle the one telling the truth.'],
  ['Match','Draw a line from each tricky situation to the honest thing to say.'],
  ['Choose','Tick the picture showing taking responsibility.'],
  ['Trace','Trace the words TELL THE TRUTH, strong and clear.'],
  ['Draw','Read the three actions and draw a happy face beside the honest one.']
 ],
 skills:['Honesty','Owning mistakes','Responsible choices','Word tracing','Courage to speak truth'],
 grown:'Thank your child for telling the truth EVEN when the news is bad — if honesty is always rewarded, the next truth comes easier.'
}),
G({
 num:27,slug:'take-care',img:'27-take-care.webp',w:1414,h:2000,
 title:'Take Care',word:'TAKE CARE',
 tag:'Gentle hands for books, every school supply to its place, and careful use we can tick.',
 meta:'A free take-care worksheet for preschoolers: circle the child treating books gently, match each school supply to its proper place, choose the careful-use picture, trace TAKE CARE and draw a book on the shelf.',
 steps:[
  ['Circle','One child hugs a book and one tears it — circle the child treating books gently.'],
  ['Match','Draw a line from each school supply to its proper place.'],
  ['Choose','Look at all four pictures and tick the one showing careful use.'],
  ['Trace','Trace the words TAKE CARE with steady, careful lines.'],
  ['Draw','The shelf is empty — draw a book standing on it.']
 ],
 skills:['Caring for books','Tidying supplies','Careful vs careless use','Word tracing','Respect for property'],
 grown:'Give your child one shelf or drawer that is completely theirs to look after — ownership teaches care better than reminders do.'
}),
G({
 num:28,slug:'my-daily-routine',img:'28-my-daily-routine.webp',w:1414,h:2000,
 title:'My Daily Routine',word:'MY DAILY ROUTINE',
 tag:'Morning, afternoon and night in order — and a clock showing morning to draw.',
 meta:'A free daily-routine worksheet for age 4: circle the morning activity, put the routine pictures in order, match morning, afternoon and night to their scenes, trace MY DAILY ROUTINE and draw a morning clock.',
 steps:[
  ['Circle','Find the child starting the day — circle the morning activity.'],
  ['Order','Use the three small pictures to help: write 1, 2, 3 or draw the routine in order.'],
  ['Match','Draw a line from morning, afternoon and night to the right scene.'],
  ['Trace','Trace the words MY DAILY ROUTINE, nice and long.'],
  ['Draw','Draw the clock hands showing a morning time you wake up.']
 ],
 skills:['Daily sequencing','Morning, afternoon, night','Time words','Word tracing','Clock awareness'],
 grown:'Photograph five moments of your child’s real day and shuffle them like cards — your child puts the day back in order, exactly like the sheet.'
}),
G({
 num:29,slug:'play-fair',img:'29-play-fair.webp',w:1414,h:2000,
 title:'Play Fair',word:'PLAY FAIR',
 tag:'Sharing the game, fair choices when things go wrong and shaking hands at the end.',
 meta:'A free fair-play worksheet for preschoolers: circle the children playing fairly, match each game situation to the fair choice, choose the kind winning picture, trace PLAY FAIR and draw a smile beside good sportsmanship.',
 steps:[
  ['Circle','Two games are happening — circle the children playing fairly together.'],
  ['Match','Draw a line from each game problem to the fair choice that fixes it.'],
  ['Choose','Tick the picture showing kind winning or losing.'],
  ['Trace','Trace the words PLAY FAIR in your best pencil.'],
  ['Draw','Draw a smile beside the good sportsmanship choice.']
 ],
 skills:['Fair play','Winning and losing kindly','Resolving game problems','Word tracing','Good sportsmanship'],
 grown:'Model the losing! Let your child see you lose a board game, breathe, and say “good game” — they copy what they watch far more than what they are told.'
}),
G({
 num:30,slug:'save-resources',img:'30-save-resources.webp',w:1414,h:2000,
 title:'Save Resources',word:'SAVE RESOURCES',
 tag:'Taps off, lights off, short showers — matching each action to saving water or electricity.',
 meta:'A free saving-resources worksheet for age 4: circle the child turning off the tap, match each action to saving water or electricity, choose the responsible-use picture, trace SAVE RESOURCES and draw water drops beside the good habits.',
 steps:[
  ['Circle','Find the child who turned the tap off — circle them.'],
  ['Match','Draw a line from each action to what it saves: water or electricity.'],
  ['Choose','Look at all four pictures and tick the responsible use.'],
  ['Trace','Trace the words SAVE RESOURCES, letter by letter.'],
  ['Draw','Read the four habits and draw a water drop beside each good one.']
 ],
 skills:['Saving water','Saving electricity','Responsible habits','Word tracing','Planet care'],
 grown:'Make your child the house’s “lights ranger” for a week — empty room, lights off. Real jobs turn worksheet habits into family habits.'
})
];

export const lsBySlug=Object.fromEntries(lifeSkills.map(a=>[a.slug,a]));

/* neighbours in sheet-number order, wrapping at the ends */
export function lsNeighbours(a){
 const i=lifeSkills.indexOf(a);
 return {prev:lifeSkills[(i-1+lifeSkills.length)%lifeSkills.length],next:lifeSkills[(i+1)%lifeSkills.length]};
}

const stepCards=[
 ['1','Circle it','One right picture to circle — looking closely is the whole game.'],
 ['2','Match them','Draw lines from the left side to the right side.'],
 ['3','Choose one','Two choices — tick or circle the one that fits.'],
 ['4','Trace it','Big tracing words, any color you like.'],
 ['5','Draw it','The last box is all yours — draw!']
];

/* ---------- the Class 32 page ---------- */
export function lifeSkillsClassBody(){
 const cards=lifeSkills.map(a=>`<a class="sa-card" href="${LS_ACT_PATH}${a.slug}/" data-ls-card="${a.slug}">
   <span class="sa-card-num" aria-hidden="true">${a.num}</span>
   <span class="sa-card-done" data-ls-done hidden>Cleared!</span>
   <img src="${LS_BASE}${a.img}" width="707" height="1000" alt="Life Skills &amp; Good Habits sheet ${a.num}: ${esc(a.title)} — ${esc(a.tag)}" loading="lazy">
   <span class="sa-card-body"><strong>${esc(a.title)}</strong><span class="sa-card-tag">${esc(a.tag)}</span><span class="sa-card-skill">Do it on screen with your finger, a stylus or the mouse</span></span>
   <span class="sa-card-play">Start the activity <span aria-hidden="true">→</span></span>
  </a>`).join('');
 const missingNote=LS_MISSING.length===1?`Sheet number ${LS_MISSING[0]} appears here with its own real page the day its artwork is uploaded — nothing is published before its sheet really exists. Every ready activity has a printable twin in the <a href="${LS_WS_PATH}">Life Skills worksheet library</a>.`:LS_MISSING.length>1?`The other ${LS_MISSING.length} sheets (numbers ${LS_MISSING.join(', ')}) appear here with their own real pages the day their artwork is uploaded — nothing is published before its sheet really exists. Every ready activity has a printable twin in the <a href="${LS_WS_PATH}">Life Skills worksheet library</a>.`:`Every planned activity is live, each with its printable twin in the <a href="${LS_WS_PATH}">Life Skills worksheet library</a>.`;
 const missing=`<p class="lesson-note">${LS_READY} of the planned ${LS_PLANNED} activities are ready now. ${missingNote}</p>`;
 return `${crumbNav([['Preschool','/preschool/'],['Age 4','/preschool/4-years/'],['Life Skills &amp; Good Habits']])}
 <article class="wrap lesson-hero"><div class="lesson-hero-copy">
  <span class="eyebrow">CLASS 32 · PRESCHOOL AGES 4–5</span>
  <h1>Life Skills &amp; Good Habits</h1>
  <div class="fc-chips lesson-chips"><span><strong>Age</strong> 4–5 Years</span><span><strong>Class</strong> 32</span><span><strong>Activities</strong> ${LS_READY} live of ${LS_PLANNED}</span><span><strong>Subjects</strong> Hygiene · manners · independence</span></div>
  <p class="lesson-lede">The everyday skills grown-ups use without thinking — washing hands, tidying up, kind words, asking for help — learned the way four-year-olds learn best: on real activity sheets, doing the circle, the match, the trace and the draw all by themselves.</p>
  <p class="lesson-lede">Every activity opens right here on the site: the sheet sits on the left and your child writes, circles, traces and draws straight on top of it. The instructions sit beside them in grown-up read-aloud words. Their finished work saves as a real picture they can keep.</p>
  <div class="lesson-start"><a class="button" href="${LS_ACT_PATH}wash-your-hands/">Start the first activity <span aria-hidden="true">→</span></a><span class="lesson-start-hint">One or two sheets per sitting is a full class.</span></div>
 </div></article>
 <section class="wrap fc-section" id="teach" aria-label="How to teach the 28 life skills">
  <span class="eyebrow">LEARN WITH FLASHCARDS · HOW TO TEACH THE 28 LIFE SKILLS</span>
  <h2>Teach every skill, step by step.</h2>
  <p class="fc-hint">Twenty-eight individual flashcard teaching lessons — each opens on its own page with the original artwork on the left and the full step-by-step guidance on the right: what the skill is, why it matters, what it teaches your child, the words to say, the questions to ask, a practice game and the safety notes. One skill a week is plenty — twenty-eight skills is a school year of good habits.</p>
  <div class="fc2-relrow">${lsFlash.lesson.cards.map((c)=>{const slug=c.file.replace(/\.webp$/,'');const l=lsLp[slug];if(!l)return '';return `<a class="fc2-relcard fcl-nav" href="${LS_CLASS_PATH}learn/${slug}/"><strong>${esc(l.title)}</strong><span>${esc(l.one)}</span><span class="fc-open">Start the lesson <span aria-hidden="true">↗</span></span></a>`;}).join('')}</div>
 </section>
 <section class="wrap lesson-section" id="activities" aria-label="The life skills activities">
  <span class="eyebrow">DO · THE LIFE SKILLS ACTIVITIES</span>
  <h2>Real sheets, done right here.</h2>
  <p class="lesson-copy">Every card below opens its own activity page: sheet on the left, instructions on the right, drawing tools under your child’s fingers. Nothing to print unless you want to — each sheet has a printable twin in the worksheet library.</p>
  <div class="sa-grid">${cards}</div>
  ${missing}
 </section>
 <section class="wrap lesson-section" id="flashcards" aria-label="Supporting resource — the life skills flashcards">
  <span class="eyebrow">SUPPORTING RESOURCE · EXPLORE LIFE SKILLS FLASHCARDS</span>
  <h2>Explore the Life Skills Flashcards.</h2>
  <div class="fc-res">
   <div class="fc-res-copy">
    <p class="lesson-copy">The activities on this page teach HOW to do each skill, step by step, right on the screen. The Life Skills &amp; Good Habits flashcard collection is the take-home half of this class: every card shows what the skill is, why it helps your child’s development, a short parent script to say together and a way to practise it at home that same day.</p>
    <p class="lesson-copy">Show a card at breakfast, practise at the sink, the shoe rack or the car seat — one skill a week turns twenty-eight cards into a whole school year of good habits.</p>
    <div class="hero-actions"><a class="button" href="${FC_SET_URL}">Open the 28 Life Skills Flashcards <span aria-hidden="true">→</span></a></div>
   </div>
   <div class="fc-res-art"><img src="${lsFlash.lesson.r2Base}cover.webp" width="1414" height="2000" alt="The cover of the Life Skills &amp; Good Habits flashcard collection — twenty-eight printable skill cards for ages 4–5." loading="lazy"></div>
  </div>
 </section>
 <section class="wrap lesson-section" id="how-it-works" aria-label="How an activity works">
  <span class="eyebrow">FOR GROWN-UPS</span>
  <h2>Every sheet follows five friendly steps.</h2>
  <p class="lesson-copy">The sheets keep one shape on purpose: after the first sheet your child already knows how to play the next one. The same five moves, new good habits.</p>
  <ol class="fc-steps">${stepCards.map(([n,t,d])=>`<li><span class="fc-stepnum">${n}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('')}</ol>
  <p class="lesson-copy">Nothing is scored and nothing is timed. A sheet your child saved is a sheet finished — the “Cleared!” ribbon is theirs to keep, saved separately for each child you set up in <a href="/my-classroom/">My Classroom</a>.</p>
 </section>
 <section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2>
  <p class="lesson-copy">Life skills are not learned from a poster — they are practised on real days, with real hands. These sheets give the practice a picture: your child circles the child washing hands, and somewhere that evening they will wash theirs with a little more purpose. Keep the words big, the praise specific and the sessions short. The drawing layer is a real pencil as far as a four-year-old is concerned, and saving their finished sheet — their own circles and squiggles over the real artwork — is the proudest ending there is.</p>
  <p class="lesson-copy"><a href="/about/#principal">More from the Principal’s Office <span aria-hidden="true">↗</span></a></p>
 </section>
 <section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>Capable hands, kind habits!</h2>
  <p class="lesson-copy">One sheet or six, every circle and every traced word is a real skill settling in. The shelf remembers exactly where your child left off.</p>
  <div class="hero-actions"><a class="button" href="${LS_WS_PATH}">Browse the printable sheets <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
 </section>`;
}

/* ---------- the interactive activity page (the learning-path experience) ---------- */
export function lifeSkillsActivityBody(a,site){
 const {prev,next}=lsNeighbours(a);
 const enc=encodeURIComponent;
 const pageUrl=site+LS_ACT_PATH+a.slug+'/';
 const shareTitle=`${a.title} — a free Life Skills activity for age 4 from Kiddo.school`;
 const stepsHtml=a.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${i+1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
 const pn=`<nav class="fc2-pn" aria-label="Previous and next activity"><a class="fc2-pn-btn" href="${LS_ACT_PATH}${prev.slug}/" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.title)}</strong><span>Previous activity</span></a><a class="fc2-pn-btn fc2-pn-next" href="${LS_ACT_PATH}${next.slug}/" rel="next"><strong>${esc(next.title)}</strong> <span aria-hidden="true">→</span><span>Next activity</span></a></nav>`;
 return `${crumbNav([['Learning Path','/learning-path/'],[esc(a.title)]])}
 <div class="page-heading wrap"><span class="eyebrow">LIFE SKILLS ACTIVITY ${a.num} \u00b7 CLASS 32 \u00b7 AGES 4\u20135</span><h1>${esc(a.title)}</h1><p>${esc(a.tag)}</p></div>
 <div class="fc2-dual wrap ls-dual">
  <div class="fc2-main">
   <section class="wc-section" aria-label="The activity sheet — draw right on it" id="the-activity">
    <div class="wc-head"><span class="eyebrow">THE ACTIVITY — WRITE AND DRAW RIGHT ON THE SHEET</span><h2>Your sheet is ready.</h2><p class="lesson-copy">Pick a color or the eraser, then circle, match, trace and draw straight on the sheet with your finger, a stylus or the mouse. Press Save my work when you are proud — that is what marks this activity cleared for your child.</p></div>
    <div class="wc-mount" data-ls-activity="${a.slug}" data-wc data-wc-src="${esc(LS_BASE+a.img)}?draw=1" data-wc-name="${esc(a.title)} life skills sheet" data-wc-w="${a.w}" data-wc-h="${a.h}" data-wc-toolbar="#ls-tools" data-wc-restore="life-skills/${a.slug}">
     <figure class="fc2-hero ws-hero-art ls-sheet"><img src="${esc(LS_BASE+a.img)}?draw=1" width="${a.w}" height="${a.h}" alt="The full ${esc(a.title)} activity sheet: ${esc(a.tag)}" fetchpriority="high" crossorigin="anonymous"></figure>
    </div>
    <noscript><p class="fc-hint">Drawing on the sheet needs JavaScript. The printable twin at <a href="${LS_WS_PATH}${a.slug}/">/worksheets/life-skills/${a.slug}/</a> always works.</p></noscript>
   </section>
   ${pn}
  </div>
  <aside class="fc2-rail" aria-label="Instructions, drawing tools and saved progress">
   <section class="fc2-block fc2-first-block"><span class="eyebrow">HOW TO DO IT</span><h2>Five little steps.</h2><ol class="fc-steps">${stepsHtml}</ol><p class="fc-hint">Ask a grown-up to read the steps aloud the first time. After that, you know just what to do.</p></section>
   <section class="fc2-block" id="ls-tools" aria-label="Drawing tools"><span class="eyebrow">YOUR PENCIL CASE</span><h2>Pick your tools.</h2><p class="fc-hint">Pencil, nine crayons, an eraser, undo, redo and clear — the tools appear right here and work on the sheet. Save keeps your finished work as a picture.</p></section>
   <section class="fc2-block" data-ls-progress-block><span class="eyebrow">MY PROGRESS</span><h2>Save it to keep it.</h2><p class="ls-progress-line" data-ls-progress aria-live="polite">This activity is cleared for you the moment you save your finished sheet. Nothing counts until then — opening the page is just opening the door.</p><p class="ls-progress-done" data-ls-done hidden><strong>Cleared!</strong> Your saved work for this sheet is in your downloads, and the ribbon is on in <a href="${LS_CLASS_PATH}">Class 32</a>.</p></section>
   <div class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS ACTIVITY</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this activity on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}" target="_blank" rel="noopener" aria-label="Share this activity on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+pageUrl)}" target="_blank" rel="noopener" aria-label="Share this activity on WhatsApp">WhatsApp</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div></div>
   <section class="fc2-block"><span class="eyebrow">PREFER PAPER?</span><h2>Print the twin.</h2><p class="fc-hint">The same sheet lives in the worksheet library with its download and print buttons: <a href="${LS_WS_PATH}${a.slug}/">/worksheets/life-skills/${a.slug}/</a>. Crayons beat styluses sometimes.</p></section>
  </aside>
 </div>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>What this sheet practises.</h2>
  <p class="lesson-copy">${esc(a.grown)}</p>
  <ul class="ws-skills">${a.skills.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>
  <p class="lesson-copy">This activity belongs to <a href="${LS_CLASS_PATH}">Class 32 — Life Skills &amp; Good Habits</a> on the Learning Path. Progress is saved on this device for the child chosen in <a href="/my-classroom/">My Classroom</a> — and only a real save of finished work marks it cleared, never just opening the page.</p>
 </section>
 ${fcCommunityMount(LS_ACT_PATH+a.slug+'/')}`;
}

/* ---------- the worksheet category + individual worksheet pages ---------- */
export function lifeSkillsWsCategoryBody(){
 const cards=lifeSkills.map(w=>`<a class="ws-card" href="${LS_WS_PATH}${w.slug}/">
  <span class="ws-card-art"><img src="${esc(LS_BASE+w.img)}" width="707" height="1000" alt="${esc(w.meta)}" loading="lazy"></span>
  <span class="ws-card-body"><strong>${esc(w.title)} Worksheet</strong><span class="ws-card-meta"><span>Ages 4–5</span><span>Class 32</span><span>Life Skills</span></span><span class="ws-card-desc">${esc(w.tag)}</span></span>
  <span class="ws-card-open">View Worksheet <span aria-hidden="true">→</span></span>
 </a>`).join('');
 const note=LS_MISSING.length===1?`<p class="lesson-note">${LS_READY} of the planned ${LS_PLANNED} sheets are ready now — the ones whose artwork has been uploaded. Sheet number ${LS_MISSING[0]} appears here the day its artwork lands; nothing is published before it can be printed honestly.</p>`:LS_MISSING.length>1?`<p class="lesson-note">${LS_READY} of the planned ${LS_PLANNED} sheets are ready now — the ones whose artwork has been uploaded. The remaining ${LS_MISSING.length} (numbers ${LS_MISSING.join(', ')}) appear here the day their artwork lands; nothing is published before it can be printed honestly.</p>`:'';
 return `${crumbNav([['Worksheets','/worksheets/'],['Life Skills &amp; Good Habits']])}
 <div class="page-heading wrap"><span class="eyebrow">LIFE SKILLS WORKSHEETS \u00b7 AGES 4\u20135</span><h1>Life Skills &amp; Good Habits worksheets — free printables for little hands.</h1><p>Everyday skills on real activity sheets: wash your hands, tidy up, be kind, move your body, the magic words and asking for help. Download the original sheet, print it, or do it on screen in <a href="${LS_CLASS_PATH}">Class 32</a> first.</p></div>
 <section class="wrap section compact" aria-label="All life skills worksheets">
  <div class="ws-grid">${cards}</div>
  ${note}
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>Where these come from.</h2>
  <div class="fc-stages">
   <a class="fc-stage lesson-card-link" href="${LS_CLASS_PATH}"><div class="fc-stage-pills"><span class="fc-age">Ages 4–5</span><span class="fc-class">Class 32</span></div><h3>Life Skills &amp; Good Habits</h3><p>The class behind these worksheets — do every sheet on screen with the drawing layer before it hits the fridge.</p><span class="fc-open">Open Class 32 <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/worksheets/"><div class="fc-stage-pills"><span class="fc-age">All ages</span><span class="fc-class">Library</span></div><h3>The Worksheet Library</h3><p>All the school’s printable subjects, each with its own page, download and print buttons.</p><span class="fc-open">Browse all worksheets <span aria-hidden="true">↗</span></span></a>
  </div>
 </section>`;
}

export function lifeSkillsWsPageBody(w,site){
 const {prev,next}=lsNeighbours(w);
 const enc=encodeURIComponent;
 const file=LS_BASE+w.img;
 const pageUrl=site+LS_WS_PATH+w.slug+'/';
 const shareTitle=`${w.title} Worksheet for Ages 4–5 — free printable from Kiddo.school`;
 const dlName=`life-skills-${w.slug}.webp`;
 const stepsHtml=w.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${i+1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
 const pn=`<nav class="fc2-pn" aria-label="Previous and next worksheet"><a class="fc2-pn-btn" href="${LS_WS_PATH}${prev.slug}/" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.title)}</strong><span>Previous worksheet</span></a><a class="fc2-pn-btn fc2-pn-next" href="${LS_WS_PATH}${next.slug}/" rel="next"><strong>${esc(next.title)}</strong> <span aria-hidden="true">→</span><span>Next worksheet</span></a></nav>`;
 const share=`<div class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS WORKSHEET</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this worksheet on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}" target="_blank" rel="noopener" aria-label="Share this worksheet on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+pageUrl)}" target="_blank" rel="noopener" aria-label="Share this worksheet on WhatsApp">WhatsApp</a><a class="fc2-share-btn" href="https://pinterest.com/pin/create/button/?url=${enc(pageUrl)}&media=${enc(file)}&description=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Save this worksheet on Pinterest">Pinterest</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div><p class="fc-hint">Share buttons open in a new tab. The copy button copies this page&rsquo;s address \u2014 nothing is tracked.</p></div>`;
 return `${crumbNav([['Worksheets','/worksheets/'],['Life Skills &amp; Good Habits',LS_WS_PATH],[w.title]])}
 <div class="page-heading wrap"><span class="eyebrow">WORKSHEET \u00b7 CLASS 32 \u00b7 AGES 4\u20135</span><h1>${esc(w.title)} Worksheet for Ages 4\u20135</h1><p>${esc(w.meta)}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main">
   <section class="wc-section" aria-label="This worksheet" id="the-worksheet">
    <div class="wc-head"><span class="eyebrow">THE WORKSHEET</span><h2>The full sheet, exactly as the artist drew it.</h2><p class="lesson-copy">See the whole sheet, download the original file or print it from your browser. Want your child to solve it on screen first? The interactive version lives at <a href="${LS_ACT_PATH}${w.slug}/">/preschool/life-skills/${w.slug}/</a> — same sheet, drawing layer included.</p></div>
    <figure class="fc2-hero ws-hero-art"><img src="${esc(file)}" width="${w.w}" height="${w.h}" alt="The full ${esc(w.title)} life-skills worksheet: ${esc(w.tag)}" fetchpriority="high"></figure>
   </section>
   ${pn}
   <section class="fc2-learn" aria-label="About this worksheet"><section class="ws-rail-sec" aria-label="How to use"><span class="eyebrow">HOW TO USE IT</span><h2>The five steps on the sheet.</h2><ol class="fc-steps">${stepsHtml}</ol></section>
   <section class="ws-rail-sec" aria-label="Where this fits"><span class="eyebrow">WHERE THIS FITS</span><h2>The class behind it.</h2><p class="lesson-copy">This worksheet belongs to <a href="${LS_CLASS_PATH}">Class 32 — Life Skills &amp; Good Habits</a> on the Learning Path, and the whole collection lives at <a href="${LS_WS_PATH}">/worksheets/life-skills/</a>. One finished sheet is a full session — print it, solve it together, and let the fridge door be the gallery.</p></section></section>
  </div>
  <aside class="fc2-rail" aria-label="Download, print, share and family feedback">
   <section class="fc2-block fc2-first-block"><span class="eyebrow">TAKE IT TO THE TABLE</span><h2>Download &amp; print.</h2>
    <div class="fc2-actions"><button type="button" class="button ws-dl" data-ls-download="${esc(file)}" data-ls-filename="${dlName}">Download original sheet <span aria-hidden="true">\u2193</span></button><button type="button" class="button button-ghost ws-print" data-ls-print>Print this sheet <span aria-hidden="true">\u2318</span></button></div>
    <p class="fc-hint">The download keeps the original WebP picture, full size (1414\u00d72000, A4 portrait). Print opens your browser&rsquo;s print dialog with just the sheet &mdash; no sign-up, nothing stored.</p>
   </section>
   ${share}
   ${fcCommunityMount(LS_WS_PATH+w.slug+'/')}
   <section class="fc2-block"><span class="eyebrow">PREFER ON SCREEN?</span><h2>Solve it here.</h2><p class="fc-hint">The on-screen version of this sheet \u2014 drawing layer, five steps, save-your-work and all \u2014 lives at <a href="${LS_ACT_PATH}${w.slug}/">/preschool/life-skills/${w.slug}/</a>.</p></section>
  </aside>
 </div>
 <section class="wrap fc-section" aria-label="Related worksheets"><span class="eyebrow">MORE LIFE SKILLS SHEETS</span><h2>More sheets like this one.</h2>
  <div class="ws-grid">${lifeSkills.filter(x=>x.slug!==w.slug).map(x=>`<a class="ws-card" href="${LS_WS_PATH}${x.slug}/"><span class="ws-card-art"><img src="${esc(LS_BASE+x.img)}" width="707" height="1000" alt="${esc(x.meta)}" loading="lazy"></span><span class="ws-card-body"><strong>${esc(x.title)} Worksheet</strong><span class="ws-card-meta"><span>Ages 4–5</span><span>Class 32</span></span><span class="ws-card-desc">${esc(x.tag)}</span></span><span class="ws-card-open">View Worksheet <span aria-hidden="true">→</span></span></a>`).join('')}</div>
 </section>`;
}

/* schema helpers */
export function lifeSkillsWsSchema(site,w){
 return {'@context':'https://schema.org','@type':'LearningResource',
  name:`${w.title} Worksheet for Ages 4\u20135`,
  description:w.metaDescription,url:site+LS_WS_PATH+w.slug+'/',inLanguage:'en',
  learningResourceType:'Worksheet',educationalLevel:'Preschool',teaches:w.skills.join(', '),
  isAccessibleForFree:true,ageRange:'4-5',encodingFormat:'image/webp',contentUrl:LS_BASE+w.img,image:LS_BASE+w.img,
  about:{'@type':'Thing',name:'Life Skills & Good Habits'},
  provider:{'@type':'Organization',name:'Kiddo.school',url:site+'/'},
  isPartOf:{'@type':'CreativeWorkSeries',name:'Life Skills & Good Habits (Class 32)',url:site+LS_CLASS_PATH}};
}
