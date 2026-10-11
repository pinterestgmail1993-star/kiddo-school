// Kiddo School — Class 26 worksheet specs (18 Colors & Creativity activities).
// Every outline picture on paper is the SAME subject the online activity
// paints, and the mixing sheet uses the game's true recipes
// (red+yellow=orange, yellow+blue=green, blue+red=purple).
import {colorCreativities,COLOR_BASE} from './color-creativity.mjs';
import {SUBJECTS} from './ws-common.mjs';

const S=SUBJECTS.colors;

const defs={
 'chameleon-color-magic':{
  lede:'A chameleon waiting for its colors: pick from your key and paint each part \u2014 it changes color either way.',
  learn:'On screen the chameleon changes color with a tap; on paper your child is the magic. Choosing colors for each body part and naming them out loud turns one coloring sheet into a dozen color-word rehearsals.',
  skills:['Naming colors while using them','Making deliberate color choices','Coloring inside clear regions','Describing choices (\u201cwhy purple?\u201d)'],
  task:'Color the chameleon with your color key \u2014 every part a different color if you like.',
  wsType:'colorKey',ws:{art:'chameleon',artH:340,tip:'Chameleons change colors to match their mood. What mood is yours?'},
  answers:'No wrong colors \u2014 the goal is naming each color as it is used. Ask for the color words: head, tail, legs.'
 },
 'rainbow-paint-laboratory':{
  lede:'Three true paint recipes to solve and color: red + yellow makes\u2026 you finish the experiment.',
  learn:'The laboratory\u2019s recipes are real paint science, and the sheet makes your child predict before coloring: guess the mixture, color the surprise circle, write the color word. Prediction is the scientific habit \u2014 sneaked in with crayons.',
  skills:['Predicting a color mixture','Knowing red+yellow, yellow+blue, blue+red','Writing color words (with help)','Testing predictions with real paint'],
  task:'Color the surprise circle in each recipe and write the new color.',
  wsType:'mix',ws:{recipes:[{a:'red',b:'yellow',hint:'Red + Yellow makes\u2026'},{a:'yellow',b:'blue',hint:'Yellow + Blue makes\u2026'},{a:'blue',b:'red',hint:'Blue + Red makes\u2026'}],tip:'Guess first! Then color the surprise circle. Got real paint? Test every recipe.'},
  answers:'Red + yellow = orange. Yellow + blue = green. Blue + red = purple \u2014 the same three discoveries the game celebrates.'
 },
 'butterfly-wing-painter':{
  lede:'A butterfly with empty wings: color the sections, and try making both wings match like the Magic Mirror.',
  learn:'The game\u2019s Magic Mirror paints both wings the same; the sheet asks your child to be the mirror \u2014 matching each left-wing section with the same color on the right. Symmetry plus color naming in one calm activity.',
  skills:['Symmetry: matching left to right','Color naming and repeating a color on purpose','Coloring medium-sized regions','Checking work against the mirror line'],
  task:'Color the butterfly \u2014 can you make both wings match?',
  wsType:'colorKey',ws:{art:'butterflyArt',artH:360,tip:'The Magic Mirror rule: whatever color a left-wing section gets, its right twin gets too.'},
  answers:'A matching butterfly has the same color on mirrored sections. Mismatched wings are still wonderful \u2014 ask which wing your child likes better.'
 },
 'rainbow-sundae-studio':{
  lede:'Design the silliest sundae in town: color the scoops, add the sprinkles, invent a flavor name.',
  learn:'The sundae studio is pure creative choice, and paper keeps it that way: color the scoops, draw toppings, name the flavor. Naming an invented flavor is early expressive language wearing an ice-cream costume.',
  skills:['Making and describing creative choices','Coloring scoops and toppings','Inventing and saying a flavor name','Enjoying the process without a \u201ccorrect\u201d answer'],
  task:'Color and decorate the sundae, then design your own in the empty bowls.',
  wsType:'decorate',ws:{art:'sundae',artH:320,taskTitle:'Now design two more sundaes.',frames:2,frameHints:['Sundae two: what flavor?','The ultimate sundae \u2014 go wild']},
  answers:'Any sundae is correct. Ask: what flavor is it? Who would eat it first?'
 },
 'paint-the-ocean':{
  lede:'An ocean friend waiting for color: fill each section from your key \u2014 the outlines stay, just like the game.',
  learn:'Staying inside the lines is the quiet skill of the ocean game, and the sheet practices exactly that: clear sections, big enough for real four-year-old brush control. Naming each color as it fills builds the words along the way.',
  skills:['Coloring inside defined regions','Color naming','Choosing colors with intention','Pencil and crayon control'],
  task:'Color the ocean picture with your color key.',
  wsType:'colorKey',ws:{art:'fish',artH:350,tip:'Big sections first, small last \u2014 that is how real painters do it.'},
  answers:'Any colors work. Challenge for a second copy: use only cool colors (blue, green, purple) \u2014 is the water colder now?'
 },
 'little-pottery-artist':{
  lede:'A pot fresh off the wheel: paint it, pattern it, then design two more of your own.',
  learn:'The pottery game paints a pot; the sheet paints one pot AND hands over two empty ones. Repeating a design in your own way is where copying turns into invention \u2014 watch what your child keeps and what they change.',
  skills:['Decorating with patterns (stripes, spots, zigzags)','Color choices and repeating them','Designing variations of an idea','Pencil control on curves'],
  task:'Paint the pot, then design two more pots any way you like.',
  wsType:'decorate',ws:{art:'vase',artH:330,taskTitle:'Now design two pots of your own.',frames:2,frameHints:['Add stripes, spots or zigzags','Free design \u2014 anything goes']},
  answers:'There is no wrong pot. Ask your child to name each design: \u201cthis one is the spotty pot.\u201d'
 },
 'rainbow-weather-machine':{
  lede:'Seven arcs, seven colors, one rainbow: color it in order and the machine makes sunshine.',
  learn:'The weather machine builds a rainbow in order; the sheet asks your child to color seven numbered arcs in the same red-to-purple order. Number order plus color order in one job \u2014 say both aloud: \u201cone red, two orange\u2026\u201d',
  skills:['Rainbow color order (red, orange, yellow, green, blue, purple)','Following numbered steps','Counting 1\u20137 while coloring','Careful arc coloring'],
  task:'Color the rainbow arcs in number order with the color list.',
  wsType:'sequence',ws:{colors:['red','orange','yellow','green','blue','purple'],boxH:300,tip:'Start at arc 1 (red, the biggest) and count your way up.'},
  answers:'The order is red, orange, yellow, green, blue, purple \u2014 the same six the machine asks for. (Real rainbows hide a seventh, indigo, between blue and purple.)'
 },
 'birdhouse-painting-workshop':{
  lede:'A birdhouse ready for tenants: paint the walls and roof, then draw who moves in.',
  learn:'The workshop pairs coloring with care for birds, and the sheet keeps both: paint the birdhouse, then draw its new resident in the frame. Caring-made art gets described with more words \u2014 ask who moves in and why.',
  skills:['Coloring a multi-part picture','Making up a small story (who lives here?)','Drawing a simple bird or friend','Talking about caring for real birds'],
  task:'Paint the birdhouse, then draw its new bird in the frame.',
  wsType:'decorate',ws:{art:'birdhouse',artH:330,taskTitle:'Who moves in? Draw them here.',frames:1,frameHints:['Your birdhouse\u2019s new resident']},
  answers:'Any bird (or squirrel!) is welcome. Real birdhouses are best left unpainted outside \u2014 a nice fact for your young painter.'
 },
 'crystal-cave-colors':{
  lede:'Warm colors or cool colors? Sort the cave\u2019s treasures into the right crystal jars.',
  learn:'The cave game sorts warm from cool; the sheet does it with cut-and-glue cards. Sorting by color TEMPERATURE is a big-deal art idea made simple: things that feel like sunshine versus things that feel like water.',
  skills:['Sorting warm vs cool colors','Scissor and glue practice','Saying the rule: \u201cwarm like fire, cool like water\u201d','Checking a sorted group'],
  task:'Cut the cards. Glue warm things in the warm jar, cool things in the cool jar.',
  wsType:'sort',ws:{items:[{icon:'sun'},{icon:'star'},{icon:'flower'},{icon:'cloud'},{icon:'fish'},{icon:'crystal'}],bins:[{label:'Warm like sunshine',icon:'sun'},{label:'Cool like water',icon:'crystal'}],binTint0:'#fdeeee',binTint1:'#eaf2fb',tip:'Warm colors remind you of fire and sun. Cool colors remind you of water and ice.'},
  answers:'Warm: sun, star, flower. Cool: cloud, fish, crystal. If your child argues the star could be cool at night \u2014 that is real art talk.'
 },
 'little-fashion-designer':{
  lede:'A plain t-shirt on the design table: add colors and patterns, then sketch your second collection.',
  learn:'The designer game fills a tee with color; the sheet adds pattern-making: stripes, spots, zigzags, whatever your child invents. Describing the design (\u201cstripes because\u2026\u201d) is the language bonus hidden in the fun.',
  skills:['Designing with color AND pattern','Naming patterns','Making two related designs','Pencil control for stripes and spots'],
  task:'Design the t-shirt, then create your second look.',
  wsType:'decorate',ws:{art:'tee',artH:330,taskTitle:'Now design look number two.',frames:2,frameHints:['Look 2: stripes? spots? both?','Your showstopper design']},
  answers:'Every design is fashion. Ask your child to present the collection: what is it called, who is it for?'
 },
 'color-changing-car-wash':{
  lede:'The car changes color in every wash! Color it your favorite, then draw the next wash.',
  learn:'The car-wash game repaints the car on loop; the sheet freezes one moment for coloring and leaves room for \u201cthe next wash\u201d. Predicting what color comes NEXT keeps the game\u2019s surprise alive on paper.',
  skills:['Choosing and naming a favorite color','Predicting a sequence','Drawing simple shapes (car, bubbles)','Talking about a favorite and why'],
  task:'Color the car, then draw what color the next wash makes it.',
  wsType:'decorate',ws:{art:'car',artH:300,taskTitle:'The next wash changes the color. Draw it!',frames:2,frameHints:['The same car, new color','One more wash \u2014 what now?']},
  answers:'No wrong colors \u2014 the car changes every wash! Ask: which color is your favorite and why?'
 },
 'magical-lantern-festival':{
  lede:'Festival lanterns wait for their glow: color them bright, then design one more for the party.',
  learn:'Lanterns glow against the night, so this sheet invites the boldest colors your child owns. Designing an extra lantern repeats the festival’s make-your-own spirit \u2014 and bright-on-white coloring is lovely pencil-control practice.',
  skills:['Using bright colors with purpose','Decorating with patterns','Designing a variation','Talking about light and dark'],
  task:'Color the lantern bright, then design another for the festival.',
  wsType:'decorate',ws:{art:'lantern',artH:330,taskTitle:'Design one more lantern for the festival.',frames:2,frameHints:['Lantern two: what pattern?','The biggest lantern at the festival']},
  answers:'Bright colors glow best. Ask: what pattern would YOUR festival lantern wear?'
 },
 'magic-flower-color-garden':{
  lede:'A flower with empty petals: color them one by one and count your colors at the end.',
  learn:'Petal-by-petal coloring is the garden game\u2019s pace, and it suits paper perfectly: each petal is one small decision, one color name, one careful fill. The final count turns the whole sheet into a color survey.',
  skills:['Petal-by-petal coloring','Color naming each time','Counting the colors used','Staying inside petal curves'],
  task:'Color every petal \u2014 then count how many different colors you used.',
  wsType:'colorKey',ws:{art:'flower',artH:350,tip:'Can you use a different color for every petal? Count them at the end!'},
  answers:'Count the DISTINCT colors your child used (petals can share). More than five different colors is flower-garden gold.'
 },
 'jellyfish-glow-party':{
  lede:'A jellyfish ready to glow: color the bell, pick the tentacle ribbons, make the party shine.',
  learn:'The glow party is about color on dark water; the sheet lets your child color the jellyfish and decide the tentacle ribbons. Long wavy tentacles are sneaky-good pencil practice \u2014 slow curves, no rushing.',
  skills:['Coloring a dome shape carefully','Tracing wavy lines with control','Choosing a color plan (bell vs ribbons)','Imagining underwater light'],
  task:'Color the jellyfish and its ribbon tentacles for the glow party.',
  wsType:'colorKey',ws:{art:'jellyfish',artH:360,tip:'Glow colors are the brightest ones you have \u2014 the party is at night!'},
  answers:'Any colors glow underwater. Ask: does your jellyfish glow pink, green or rainbow?'
 },
 'splatter-paint-playground':{
  lede:'Dot, dot, splat! Finish the splatter paintings \u2014 with pencils at the table or real paint if you are brave.',
  learn:'The splatter canvas is free painting; the sheet keeps that freedom with three frames and zero rules. If real paint is an option, dots and splats with a cotton bud are the low-mess version of the game\u2019s joy.',
  skills:['Free mark-making with confidence','Filling a page with intentional dots','Trying tools: cotton buds, brush ends, fingertips','Knowing there is no wrong painting'],
  task:'Finish the splatter painting \u2014 then make your own in the frames.',
  wsType:'decorate',ws:{art:'splat',artH:300,taskTitle:'Your splatter studio \u2014 three empty canvases.',frames:3,frameHints:['Canvas 2','Canvas 3','The masterpiece']},
  answers:'Nothing to check \u2014 every splatter counts. Title each canvas together if your artist is willing.'
 },
 'kite-design-studio':{
  lede:'A kite ready for the sky: design it with colors and patterns, then draw the wind carrying it.',
  learn:'The kite studio designs then flies; the sheet designs then imagines. Coloring the kite is the craft, drawing it in the sky is the story \u2014 and between them your child has practiced both design thinking and narrative.',
  skills:['Designing a symmetrical object','Pattern and color choices','Drawing motion (a flying kite)','Telling the story of a windy day'],
  task:'Design the kite, then draw it flying in your frame.',
  wsType:'decorate',ws:{art:'kite',artH:340,taskTitle:'Where is it flying? Draw the scene.',frames:2,frameHints:['Your kite over the park','The highest kite ever']},
  answers:'Real kites are symmetric \u2014 check both halves match. Then ask where the kite is going.'
 },
 'rainbow-fish-aquarium':{
  lede:'Design a whole aquarium: color the fish, draw the plants and rocks, make a home worth visiting.',
  learn:'The aquarium game decorates a fish\u2019s whole world, and the sheet gives the same double job: color the fish, then build the scene around it. Scene-building is sequencing and spatial thinking in art clothing.',
  skills:['Coloring and designing one subject','Adding a scene around it (plants, sand, bubbles)','Planning where things go','Proudly presenting a finished world'],
  task:'Color the fish, then draw its aquarium home in the frame.',
  wsType:'decorate',ws:{art:'fish',artH:300,taskTitle:'Now draw the whole aquarium.',frames:2,frameHints:['Plants, sand, bubbles\u2026','A friend for your fish']},
  answers:'Any aquarium is a good aquarium. Ask your child to be the tour guide: what is where, and why?'
 },
 'birthday-cake-color-studio':{
  lede:'A birthday cake, no candles yet: color the cake, add decorations, draw the candles and count them.',
  learn:'The cake studio colors and decorates; the sheet adds candles \u2014 which means drawing, counting, and the all-important question: how old is the birthday star? Coloring a celebration is social-emotional practice hiding in frosting.',
  skills:['Coloring and decorating a cake','Drawing candles and counting them','Talking about birthdays and celebrations','Fine motor for small details'],
  task:'Color and decorate the cake, then draw the candles \u2014 how many?',
  wsType:'decorate',ws:{art:'cake',artH:320,taskTitle:'Add the candles. How many? Draw them!',frames:2,frameHints:['The birthday cake for someone you love','A cake with LOTS of candles']},
  answers:'Count the drawn candles together. If your child draws one for every family member \u2014 that is a math story worth hearing.'
 }
};

export const colorWorksheets=colorCreativities.map(a=>{
 const d=defs[a.slug];
 return {
  slug:a.slug,num:a.num,subject:S.key,title:a.title,
  art:{img:COLOR_BASE+a.img,alt:a.alt},
  game:{path:`${S.gameLib}${a.slug}/`,title:a.title},
  classNum:S.classNum,classPath:S.classPath,classTitle:S.classTitle,
  seoTitle:`${a.title} Worksheet \u2014 Free Printable Coloring Activity for Age 4 (Class 26)`,
  metaDescription:`Free printable ${a.title} worksheet for 4-year-olds. ${d.lede} Part of Class 26: Colors, Mixing & Creativity at Kiddo.school \u2014 download the PDF, print it, or play the online studio.`,
  lede:d.lede,learn:d.learn,skills:d.skills,task:d.task,
  wsType:d.wsType,ws:d.ws,answers:d.answers
 };
});
