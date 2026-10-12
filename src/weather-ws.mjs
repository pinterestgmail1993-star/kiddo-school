// Kiddo School — Class 34 · Weather, Seasons & What We Wear: the 23 GENUINE
// worksheets (owner's Canva upload, verified on R2 under
// school/preschool/4-years/weather-seasons-and-what-we-wear/worksheets/,
// all 1414×2000 portrait, probed HTTP 200 image/webp on 2026-10-12 and each
// sheet audited image by image: trace word and numbered sections recorded
// exactly as uploaded). Two pages per sheet: the Learning Path ACTIVITY
// (drawing canvas over the original art, solving guidance beside it) and the
// PRINTABLE library page (download / print / share, NO canvas). The two pages
// never share text, and neither shares text with the Class 34 lesson or
// flashcard-library pages (owner duplicate-content law). cover.webp is the
// collection cover and is never counted as a sheet.
import {R2,crumbNav,esc} from './adventure-kit.mjs';
import {fcCommunityMount} from './flashcards/index.mjs';

export const WS34_CLASS_PATH='/preschool/4-years/weather-seasons-and-what-we-wear/';
export const WS34_WS_CLASS=WS34_CLASS_PATH+'worksheets/';
export const WS34_WS_LIB='/worksheets/weather-seasons-and-what-we-wear/';
export const WS34_WS_BASE=R2+'school/preschool/4-years/weather-seasons-and-what-we-wear/worksheets/';
export const WS34_WS_COVER={file:'cover.webp',w:1414,h:2000,
 alt:'Cover of the Weather and Seasons worksheets set: the title over four labelled season panels — a blossoming spring tree, a bright summer sun, an autumn tree dropping orange leaves and a bare winter tree in falling snow.'};

export const weatherWs=[
{slug:'animals-and-seasons',file:'animals-and-seasons-worksheet.webp',w:1414,h:2000,title:'Animals and Seasons',word:'ANIMAL',trace:'ANIMAL',
 tag:'Match animals to their seasons, spot the hibernator, sort the visitors and trace the word ANIMAL.',
 meta:'A free animals-and-seasons worksheet for ages 4–5: match each animal to its season, circle the hibernating bear, sort the animal cards and trace the word ANIMAL. Print it for a quiet table session.',
 learn:'Seasons change what animals do — eating, sleeping, travelling and hiding all follow the weather.',
 know:'The four season names, and one familiar animal for each — a spring bird, a summer butterfly, an autumn squirrel, a winter bear.',
 why:'Linking animals to seasons builds the idea that living things respond to the world, not just to us — early science thinking on paper.',
 skills:['Season vocabulary','Animal names and habitats','Sorting and matching','Early science reasoning','Word tracing'],
 steps:[['Match','Draw a line from each animal to the season where it belongs.'],['Circle','One animal sleeps all winter — find it and circle it.'],['Sort','Put each animal card into the right season group.'],['Trace','Trace the big dotted word ANIMAL, then write it yourself.'],['Draw','Draw one animal in its seasonal home in the last box.']],
 say:'Every animal has a favourite kind of weather. Let us find out who likes which season.',
 look:'Whether your child matches by colour first (easy) or by thinking about the animal first (a real step up).',
 ask:'Where does the bear go in winter? Which of these animals have you seen for real — and in which season?',
 hint:'Start with the animals your child already knows — the goose and the cat are the easy anchors.',
 tips:'One sheet, one sitting. If the tracing stalls, do the matching first and come back to the word.',
 check:'Point at the bear: what is it doing this season? A right answer with a reason beats a fast guess.',
 real:'On the next walk or park trip, spot one real animal and name its season together.'},
{slug:'autumn-and-winter-sorting',file:'autumn-and-winter-sorting-worksheet.webp',w:1414,h:2000,title:'Autumn and Winter Sorting',word:'AUTUMN',trace:'AUTUMN',
 tag:'Match the seasons, circle the right clothes, sort autumn from winter and trace the word AUTUMN.',
 meta:'A free autumn-and-winter sorting worksheet for ages 4–5: match seasons to pictures, circle the cold-day clothes, sort the two seasons and trace AUTUMN. Free printable, no sign-up.',
 learn:'The two cold seasons look and feel different — and they ask for different clothes.',
 know:'What autumn looks like (falling leaves, wind) versus winter (snow, bare trees), and which clothes belong to each.',
 why:'Sorting two similar-but-different groups sharpens comparison — the skill underneath all later classification.',
 skills:['Comparing two seasons','Clothing vocabulary','Cutting and sorting','Fine motor control','Word tracing'],
 steps:[['Match','Match each season picture to its name.'],['Circle','Circle every piece of clothing a cold day asks for.'],['Sort','Cut and paste each picture into autumn or winter.'],['Trace','Trace the big word AUTUMN and write it on your own.'],['Check','Point at each column and name what makes it that season.']],
 say:'Two chilly seasons, two different looks. Let us sort out which is which.',
 look:'Whether the scarf-and-hat items land in winter — that is the subtle pair.',
 ask:'What do you wear in autumn that you still wear in winter? What changes first?',
 hint:'If sorting stalls, ask "leaves or snow?" — the two pictures sort themselves from that.',
 tips:'Keep the cut pieces in a small bowl so none wander off mid-session.',
 check:'Ask for one thing that belongs to autumn and one to winter — out loud, no paper.',
 real:'On a cool morning, decide together which season it feels like before you dress.'},
{slug:'autumn-weather-and-clothes',file:'autumn-weather-and-clothes-worksheet.webp',w:1414,h:2000,title:'Autumn Weather and Clothes',word:'AUTUMN',trace:'AUTUMN',
 tag:'Match autumn weather to words, circle the cool-day clothes, sort autumn from winter and trace AUTUMN.',
 meta:'A free autumn weather and clothes worksheet for ages 4–5: match the windy-day words, circle cool-day clothes, sort autumn from winter and trace the word AUTUMN. Free printable.',
 learn:'Autumn has its own weather — wind, falling leaves, grey clouds — and its own clothes.',
 know:'The words wind, leaf, cloud and beanie, and the feeling of a cool day versus a cold one.',
 why:'Dressing for the weather is a daily decision; this sheet makes the autumn version of it explicit and practised.',
 skills:['Autumn weather words','Dressing decisions','Sorting','Tracing and writing','Observation'],
 steps:[['Match','Draw a line from each autumn weather picture to its word.'],['Circle','Circle the clothes for a cool autumn day.'],['Sort','Put each picture in the autumn or the winter column.'],['Trace','Trace the word AUTUMN, then write it in the box.'],['Say','Name your own autumn outfit out loud when the sheet is done.']],
 say:'Autumn is the wind-and-leaves season. What does it ask us to wear?',
 look:'For the beanie — some children put it in winter; either answer starts a good talk.',
 ask:'Is today an autumn day or a winter day? How did you know?',
 hint:'The windy tree is the anchor picture — start matching from there.',
 tips:'Follow the sheet with the real thing: check the day together at the door tomorrow morning.',
 check:'Hold up a scarf and a sunhat: which one does autumn want?',
 real:'Build the actual autumn outfit together — each piece named as it goes on.'},
{slug:'cloud-types',file:'cloud-types-worksheet.webp',w:1414,h:2000,title:'Cloud Types',word:'CLOUD',trace:'CLOUD',
 tag:'Match cumulus, stratus and cirrus to their names, circle the fluffy one, sort the clouds and trace CLOUD.',
 meta:'A free cloud types worksheet for ages 4–5: match cumulus, stratus and cirrus to their names, circle the fluffy cloud, sort fluffy from flat and trace the word CLOUD. Free printable.',
 learn:'Clouds come in kinds — fluffy piles, flat layers, wispy streaks — and each has a name.',
 know:'The three cloud names on the sheet (cumulus, stratus, cirrus) and the fluffy-versus-flat contrast.',
 why:'Naming kinds of one thing — clouds — is classification practice with a free daily show overhead.',
 skills:['Cloud names','Observation and comparison','Sorting into groups','Word tracing','Sky vocabulary'],
 steps:[['Match','Draw a line from each cloud picture to its name.'],['Circle','Circle the cloud that looks fluffy.'],['Sort','Cut and paste each cloud into fluffy or flat.'],['Trace','Trace the big dotted word CLOUD and write it too.'],['Look','Match the sheet to a real cloud out of the window.']],
 say:'Clouds are not all the same — some sit in piles, some lie flat. Let us learn their names.',
 look:'For the wispy streaks — cirrus is the one children most often miss.',
 ask:'Which cloud is out today? Does it look like the fluffy pile or the flat layers?',
 hint:'Fluffy like a heap of pillows, flat like pancakes — say both while matching.',
 tips:'Keep the sheet on the window ledge for a week and re-check the real sky with it.',
 check:'Show two clouds from the sheet: which one is stratus? Hands up before answering.',
 real:'Watch the sky at breakfast tomorrow and name every cloud you both see.'},
{slug:'cloudy-weather',file:'cloudy-weather-worksheet.webp',w:1414,h:2000,title:'Cloudy Weather',word:'CLOUDY',trace:'CLOUDY',
 tag:'Circle the cloudy pictures, match the weather, choose the clothes, finish the pattern and trace CLOUDY.',
 meta:'A free cloudy weather worksheet for ages 4–5: circle the cloudy skies, match weather to picture, pick the right clothes, complete the pattern and trace the word CLOUDY. Free printable.',
 learn:'A grey sky is weather too — cloudy has a name, a look and its own clothes.',
 know:'What a cloudy sky looks like next to sunny, rainy and snowy ones, and which clothes fit a grey day.',
 why:'Grey days confuse small children most; naming cloudy gives the day a handle and kills the gloom.',
 skills:['Weather recognition','Clothing choices','Pattern completion','Tracing and writing','Careful looking'],
 steps:[['Circle','Circle every cloudy-sky picture in the grid.'],['Match','Match each weather picture to its word.'],['Choose','Circle the clothes that suit a cloudy day.'],['Trace','Trace the big word CLOUDY and write it on your own.'],['Draw','Finish the pattern boxes, then draw the cloudy sky scene.']],
 say:'The sun is hiding today — that has a name too. Let us find the cloudy pictures.',
 look:'For the almost-cloudy sky — one small grey cloud counts as cloudy here.',
 ask:'What does the sky look like right now? What should we wear for it?',
 hint:'Do the circle hunt first, then the words — seeing before naming.',
 tips:'Take the sheet to a window; real sky beats remembered sky at this age.',
 check:'Ask for one thing cloudy weather is NOT — it proves the sorting stuck.',
 real:'Make tomorrow a forecast: tonight your child predicts sunny or cloudy, and morning checks it.'},
{slug:'daylight-sunrise-sunset',file:'daylight-sunrise-sunset-worksheet.webp',w:1414,h:2000,title:'Daylight: Sunrise and Sunset',word:'DAYLIGHT',trace:'DAYLIGHT',
 tag:'Match the times of day, compare daylight, order the sun arc, trace DAYLIGHT and draw a sunset.',
 meta:'A free daylight worksheet for ages 4–5: match sunrise, noon, sunset and night, compare which day has more daylight and trace the word DAYLIGHT. Free printable, no sign-up.',
 learn:'The sun makes the day; where it sits in the sky tells you the time.',
 know:'Sunrise, noon, sunset and night as positions of the sun — and that summer days are longer.',
 why:'Ordering the day by the sun builds time sense before clocks — the oldest clock there is.',
 skills:['Time-of-day vocabulary','Sun position and shadow sense','Comparing lengths','Tracing and writing','Drawing what you see'],
 steps:[['Match','Draw a line from each sun position to its time of day.'],['Compare','Circle the day with the most daylight.'],['Order','Put the sun-arc pictures in order from morning to night.'],['Trace','Trace the big word DAYLIGHT and write it too.'],['Draw','Draw your own sunset in the last box.']],
 say:'The sun walks across the sky every day. Let us learn its road.',
 look:'For the sun height on the arc — noon sits highest, and that clicks fast once seen.',
 ask:'Where is the sun when we eat breakfast? Where is it at bedtime in summer?',
 hint:'Act it first: one arm slowly overhead from bed to bed is the whole arc.',
 tips:'This sheet pairs with the rainy-day one — short daylight and long daylight in one week.',
 check:'Which comes first, sunrise or sunset? Answer without the sheet.',
 real:'Catch a real sunset once this week and name what you see with the sheet words.'},
{slug:'four-seasons-matching',file:'four-seasons-matching-worksheet.webp',w:1414,h:2000,title:'Four Seasons Matching',word:'WINTER',trace:'WINTER',
 tag:'Match the four seasons to their pictures, circle the snowy one, sort the clothes and trace WINTER.',
 meta:'A free four seasons matching worksheet for ages 4–5: match spring, summer, autumn and winter to their pictures, circle the snowiest season, sort the clothes and trace the word WINTER. Free printable.',
 learn:'The year comes in four seasons, each with its own look, weather and clothes.',
 know:'The four season names and one clear picture clue for each — blossom, beach, falling leaves, snow.',
 why:'The season cycle is the first big pattern a child meets that repeats every year — naming it orders the whole world.',
 skills:['Season names and order','Matching pictures to words','Clothing sorts','Pattern completion','Word tracing'],
 steps:[['Match','Draw a line from each season name to its picture.'],['Circle','Circle the season with the most snow.'],['Sort','Cut and paste the clothes into winter or summer.'],['Trace','Trace the big word WINTER, then write it yourself.'],['Draw','Finish the flower-sun-leaf-snow pattern, then draw a winter scene.']],
 say:'A year has four seasons and each one changes the world outside. Let us match them up.',
 look:'For the tree in every picture — same tree, four different dresses.',
 ask:'Which season is it right now? What will come after it?',
 hint:'The snowman is the fastest anchor — start there and match the rest around it.',
 tips:'Sing the four season names in order before starting; the sheet then checks itself.',
 check:'Name the four seasons in order, out loud, with fingers counting.',
 real:'Start a season wall at home — one drawing per season, added when each arrives.'},
{slug:'ice-frost-melting',file:'ice-frost-melting-worksheet.webp',w:1414,h:2000,title:'Ice, Frost and Melting',word:'ICE',trace:'ICE',
 tag:'Spot the frost, match frozen to melted, order the melt, circle the fast melter and trace the word ICE.',
 meta:'A free ice and melting worksheet for ages 4–5: circle the frost, match frozen to melted, order the melting steps, find what melts ice fastest and trace the word ICE. Free printable.',
 learn:'Ice is water gone cold, and warmth turns it back — melting has an order and a cause.',
 know:'The words frost, melt and puddle, and the idea that warmth (sun, hands, warm air) does the melting.',
 why:'Reversible change — freeze it, melt it — is a first science law children can watch in a glass of water.',
 skills:['State-of-matter words','Ordering a process','Predicting outcomes','Tracing and writing','Observation'],
 steps:[['Circle','Circle the picture that shows frost.'],['Match','Match each frozen thing to its melted version.'],['Order','Put the melting ice pictures in order from start to puddle.'],['Trace','Trace the big word ICE and write it on your own.'],['Draw','Draw what the melted ice shape looks like at the end.']],
 say:'Ice is just water wearing its winter coat. Warmth takes the coat back off.',
 look:'For the hair-dryer versus sun comparison — which melts faster and why.',
 ask:'What made the ice disappear? Where does the puddle come from?',
 hint:'Do the matching with a real ice cube on a saucer beside the sheet.',
 tips:'Freeze a small toy in a cube before the session — the sheet predicts, the cube proves.',
 check:'Cold makes ice and warmth does what? One word, no paper.',
 real:'Leave two ice cubes out — one sunny window, one dark shelf — and race them.'},
{slug:'light-sources',file:'light-sources-worksheet.webp',w:1414,h:2000,title:'Light Sources',word:'LIGHT',trace:'LIGHT',
 tag:'Sort what gives light from what does not, circle the light makers, match them up and trace LIGHT.',
 meta:'A free light sources worksheet for ages 4–5: sort the light makers from the dark things, circle, match and trace the word LIGHT. Free printable for ages 4–5, no sign-up.',
 learn:'Some things make their own light and some only shine when light lands on them.',
 know:'Sun, bulb, candle, firefly, flashlight and lamp as light makers; everyday objects that stay dark.',
 why:'Telling a light source from a lit object is the seed of understanding how seeing works at all.',
 skills:['Light vocabulary','Sorting by property','Matching','Tracing and writing','Night-time confidence'],
 steps:[['Sort','Put each picture into gives light or does not.'],['Circle','Circle every picture that makes its own light.'],['Match','Draw a line from each light word to its picture.'],['Trace','Trace the big word LIGHT and write it in the box.'],['Draw','Design your own lamp in the last panel.']],
 say:'Some things glow all by themselves and some just catch the light. Let us sort them out.',
 look:'For the firefly and the moon talk — if the moon comes up, enjoy it: it reflects, and that is a beautiful argument.',
 ask:'What makes light in your bedroom at night? Where does street light come from?',
 hint:'The dark-path picture at the end is a story starter — who needs the flashlight and why?',
 tips:'Do this one at dusk with the room lamp as the demo.',
 check:'Name two light makers in your kitchen right now.',
 real:'Tonight, list every light you both see on the way to bed — real light-source spotting.'},
{slug:'order-of-seasons-tree-changes',file:'order-of-seasons-tree-changes-worksheet.webp',w:1414,h:2000,title:'Order of Seasons: Tree Changes',word:'SEASON',trace:'SEASON',
 tag:'Put the four trees in season order, circle what changes, match leaf colours and trace the word SEASON.',
 meta:'A free seasons-and-trees worksheet for ages 4–5: order the same tree through spring, summer, autumn and winter, match leaf colours and trace the word SEASON. Free printable.',
 learn:'One tree, four looks — the seasons come in an order and the tree keeps the calendar.',
 know:'The season order (spring, summer, autumn, winter) and the leaf colour that names each.',
 why:'Watching one object change across the cycle makes the sequence real — the tree is the proof.',
 skills:['Season ordering','Observing change over time','Colour matching','Tracing and writing','Prediction'],
 steps:[['Order','Put the four tree pictures in season order, spring first.'],['Circle','Circle everything that changes on the tree.'],['Match','Match each tree to its leaf colours.'],['Trace','Trace the big word SEASON and write it too.'],['Draw','Draw the same tree in two seasons of your choice.']],
 say:'Same tree, four costumes. Let us put the year in order.',
 look:'For the bare winter tree — no leaves is also a season, and that surprises some children.',
 ask:'Which tree is outside your window right now? What comes next for it?',
 hint:'Blossom first, then full green — the order writes itself from the flowers.',
 tips:'Photograph one real tree monthly; the sheet predicts the next photo every time.',
 check:'Which season follows autumn? Say it, then check on the sheet.',
 real:'Adopt the nearest tree: visit it once a month and name its season.'},
{slug:'precipitation-hail-sleet-snow',file:'precipitation-hail-sleet-snow-worksheet.webp',w:1414,h:2000,title:'Precipitation: Hail, Sleet and Snow',word:'HAIL',trace:'HAIL',
 tag:'Name what falls from the sky, sort ice from water, count the snowflakes and trace the word HAIL.',
 meta:'A free precipitation worksheet for ages 4–5: name what falls from storm clouds, sort frozen from liquid, count snowflakes and trace the word HAIL. Free printable for ages 4–5.',
 learn:'Everything that falls from clouds — rain, snow, sleet, hail — has its own name and shape.',
 know:'The four fallers on the sheet and the cold-or-less-cold difference that picks between them.',
 why:'One cloud, four products: this sheet turns a confusing sky into a small, learnable set.',
 skills:['Weather words','Sorting by state','Counting','Tracing and writing','Careful looking'],
 steps:[['Name','Match each falling thing to its word.'],['Sort','Sort the pictures into ice or water.'],['Count','Count the snowflakes and write the number.'],['Trace','Trace the big word HAIL and write it yourself.'],['Draw','Draw the storm cloud and what falls from it.']],
 say:'One cloud can drop four different things. Let us learn their names.',
 look:'For the hail versus sleet difference — small balls versus mixed drops.',
 ask:'What fell last time it rained hard? Did you ever hear hail on the window?',
 hint:'The counting row is the rest break — put it between the two sorts.',
 tips:'Hail is rare in many places: a video clip after the sheet makes the word stick.',
 check:'Which is frozen, rain or hail? Quick hands up.',
 real:'Next rainy day, catch drops on the windowsill and name what kind they are.'},
{slug:'rainbow-and-kite-weather-safety',file:'rainbow-and-kite-weather-safety-worksheet.webp',w:1414,h:2000,title:'Rainbow and Kite Weather Safety',word:'RAINBOW',trace:'RAINBOW',
 tag:'Mark kite-flying weather safe or unsafe, circle the sun protection, match storm words and trace RAINBOW.',
 meta:'A free weather safety worksheet for ages 4–5: mark kite weather safe or unsafe, circle sun protection, match lightning, thunder and rainbow words and trace the word RAINBOW. Free printable.',
 learn:'Weather decides what is safe: kites want calm skies, storms want us inside, sun wants hats.',
 know:'The words safe and unsafe, lightning, thunder, rainbow — and hat-sunglasses shade as sun protection.',
 why:'Safety rules stick when a child sorts them on paper first — the sheet does the rehearsing before real wind does.',
 skills:['Safety judgement','Weather words','Matching','Tracing and writing','Decision making'],
 steps:[['Mark','Read each sky picture and mark it safe or unsafe for kite flying.'],['Circle','Circle the item that protects you from strong sun.'],['Match','Draw a line from lightning, thunder and rainbow to their pictures.'],['Trace','Trace the big word RAINBOW and write it on your own.'],['Draw','Draw your rainbow-after-rain in the last box.']],
 say:'Kites love some skies and hate others. Let us learn which is which.',
 look:'For the storm-cloud judgement — that is the one real safety decision on the sheet.',
 ask:'What do we do when thunder starts? Where is the safest place you know?',
 hint:'Safe means calm sky and open space; unsafe means dark clouds or rain.',
 tips:'Pair the sheet with a real kite on a calm day — the words go live immediately.',
 check:'Dark clouds appear while the kite is up. What happens next? Answer out loud.',
 real:'Name the sun-protection trio — hat, glasses, shade — before the next sunny outing.'},
{slug:'rainy-day-puddle',file:'rainy-day-puddle-worksheet.webp',w:1414,h:2000,title:'Rainy Day Puddle',word:'PUDDLE',trace:'PUDDLE',
 tag:'Match the rainy-day kit, count the raindrops, circle the dressed-for-it child and trace the word PUDDLE.',
 meta:'A free rainy day puddle worksheet for ages 4–5: match the rain gear, count raindrops, circle the child ready for puddles and trace the word PUDDLE. Free printable, no sign-up.',
 learn:'Rain has a kit — boots, coat, umbrella — and the child who wears it gets the puddles.',
 know:'The rain-gear words and the dry-versus-wet contrast between the two children on the sheet.',
 why:'The best rainy-day argument is settled in advance: the sheet makes dressed-for-rain the hero.',
 skills:['Rain gear vocabulary','Counting','Matching','Tracing and writing','Decision making'],
 steps:[['Match','Draw a line from each rain item to its word.'],['Count','Count the raindrops and write the total.'],['Circle','Circle the child who is ready for the puddle.'],['Trace','Trace the big word PUDDLE and write it in the box.'],['Tell','Tell the story of the two children out loud to finish.']],
 say:'Puddle weather has a uniform. Let us find who is wearing it.',
 look:'For the boots — the child without them is the one who stays dry and sad.',
 ask:'What do we put on before puddle jumping? What happens if we forget the boots?',
 hint:'The count is one-touch-per-drop — slow finger, correct total.',
 tips:'Follow the sheet with the real thing: first decent puddle after this session belongs to your child.',
 check:'Name the three things in the rain kit, no paper.',
 real:'Jump one puddle in full kit this week — boots, coat and the word puddle, all used.'},
{slug:'rainy-day-weather-activities',file:'rainy-day-weather-activities-worksheet.webp',w:1414,h:2000,title:'Rainy Day Weather Activities',word:'RAINY',trace:'RAINY',
 tag:'Circle the rainy pictures, finish the weather sentences, trace the weather words and draw the rain.',
 meta:'A free rainy-day activities worksheet for ages 4–5: circle the three rainy pictures, complete the weather sentences, trace the words and draw the cloud with raindrops. Free printable.',
 learn:'Rain is one kind of sky among many — spotting it fast means knowing the others too.',
 know:'Rainy, sunny, snowy, windy and stormy as pictures before words.',
 why:'Sorting one kind out from four look-alikes builds real discrimination, not just recognition.',
 skills:['Weather discrimination','Sentence completion','Word tracing','Drawing','Vocabulary'],
 steps:[['Circle','Circle the three rainy-sky pictures in the grid.'],['Finish','Complete each sentence and circle the right picture.'],['Trace','Trace the big weather words, then write them.'],['Draw','Draw the rain cloud with its raindrops in the box.'],['Say','Name today\'s weather out loud using the sheet words.']],
 say:'Five kinds of sky, one of them rainy. Let us catch it.',
 look:'For the almost-rainy grey sky — the near-miss is the whole exercise.',
 ask:'Which picture is today? What does the sky need to add to become rainy?',
 hint:'Do the circle hunt with a story: where would the umbrella go?',
 tips:'This sheet is the companion to rainy-day-puddle — one names it, one dresses for it.',
 check:'Point at the window: rainy or not rainy, and how do you know?',
 real:'Keep a five-day sky diary with the sheet words as labels.'},
{slug:'seasonal-activities',file:'seasonal-activities-worksheet.webp',w:1414,h:2000,title:'Seasonal Activities',word:'ACTIVITY',trace:'ACTIVITY',
 tag:'Match each activity to its season, spot what needs snow and what needs warmth, and trace ACTIVITY.',
 meta:'A free seasonal activities worksheet for ages 4–5: match sledding, swimming, kite flying and raking to their seasons and trace the word ACTIVITY. Free printable for ages 4–5.',
 learn:'What we do follows the season — sleds wait for snow, pools wait for heat.',
 know:'Sledding, skiing, skating, swimming, biking, raking and kite flying, each tied to its weather.',
 why:'Activities are the child\'s own version of the seasons — this sheet maps their year onto the calendar.',
 skills:['Season-activity matching','Vocabulary','Reasoning about weather needs','Tracing and writing','Prediction'],
 steps:[['Match','Draw a line from each activity to its season.'],['Choose','Circle the activity that needs snow, then the one that needs warm weather.'],['Sort','Say each activity out loud under its season.'],['Trace','Trace the big word ACTIVITY and write it in the box.'],['Plan','Pick one activity from the sheet to try this season.']],
 say:'Every season has its own games. Let us match the game to the sky.',
 look:'For skating versus sledding — both winter, both different needs.',
 ask:'Which of these have you done? Which do you want to try first this year?',
 hint:'Start with the ones your child has done in real life — the rest sort around them.',
 tips:'End by choosing one activity from the sheet and putting it on the family calendar.',
 check:'Swimming needs what kind of weather? Sledding needs what?',
 real:'Do one sheet activity for real this week — the raking or the kite are the easiest.'},
{slug:'seasonal-foods-harvest',file:'seasonal-foods-harvest-worksheet.webp',w:1414,h:2000,title:'Seasonal Foods and Harvest',word:'HARVEST',trace:'HARVEST',
 tag:'Match foods to their season, circle the warm-weather fruit, name the harvest scene and trace HARVEST.',
 meta:'A free seasonal foods and harvest worksheet for ages 4–5: match apple, strawberry, pumpkin and peas to their seasons, circle the warm-weather fruit and trace the word HARVEST. Free printable.',
 learn:'Food follows the seasons too — strawberries in summer, pumpkins in autumn, harvest at the end.',
 know:'Apple, strawberry, pumpkin and peas with their best seasons; the word harvest for the picking time.',
 why:'Knowing where food comes from and when starts at the table — this sheet connects plate to season.',
 skills:['Food and season matching','Vocabulary','Observation of a scene','Tracing and writing','Healthy eating talk'],
 steps:[['Match','Draw a line from each food to the season it grows in.'],['Circle','Circle the fruit that grows in warm weather.'],['Name','Look at the harvest scene and name everything you see.'],['Trace','Trace the big word HARVEST, then write it yourself.'],['Pick','Choose the season box that fits the big picture.']],
 say:'Food has a favourite season too. Let us match the meals to the sky.',
 look:'For the pumpkin — the harvest hero hiding in plain sight.',
 ask:'Which of these foods did you eat this week? Which season was it picked in?',
 hint:'The strawberry is the easy anchor — everyone knows when strawberries come.',
 tips:'Do the sheet before a market trip and hunt one seasonal food for real.',
 check:'Which season fills the baskets? Answer, then check the sheet.',
 real:'Buy one seasonal fruit this week and name its season at the table.'},
{slug:'shadows',file:'shadows-worksheet.webp',w:1414,h:2000,title:'Shadows',word:'SHADOW',trace:'SHADOW',
 tag:'Compare shadow lengths, match shadows to the time of day, circle the shadow maker and trace SHADOW.',
 meta:'A free shadows worksheet for ages 4–5: circle the longer shadow, match shadows to morning, noon and evening, find the light maker and trace the word SHADOW. Free printable.',
 learn:'A shadow is the dark copy light makes when something stands in the way — and it moves with the sun.',
 know:'Long and short, morning-noon-evening, and the rule that light makes shadows happen.',
 why:'Shadows are a child\'s first experiment they can run with their own body — the sheet formalises what the garden already shows.',
 skills:['Shadow logic','Time-of-day matching','Counting','Tracing and writing','Prediction'],
 steps:[['Compare','Circle the longer shadow in each pair.'],['Match','Match each tree shadow to its time of day.'],['Circle','Circle the thing that makes a shadow.'],['Count','Count the shadow shapes and write the totals.'],['Trace','Trace the big word SHADOW, then draw the tree\'s shadow.']],
 say:'Light makes a dark copy of everything it meets. Let us catch some shadows on paper.',
 look:'For the flashlight in the circle row — it makes shadows without the sun, and that is a discovery.',
 ask:'Why is the morning shadow long and the noon shadow short? Where is yours right now?',
 hint:'Long shadow means low sun — say it once, then let the sheet prove it.',
 tips:'Pencil, torch and a toy on the table turn the last box into a live experiment.',
 check:'What do you need to make a shadow? Two things, no paper.',
 real:'Trace each other\'s shadows with chalk at noon and again after tea.'},
{slug:'snowy-weather-winter-clothes',file:'snowy-weather-winter-clothes-worksheet.webp',w:1414,h:2000,title:'Snowy Weather and Winter Clothes',word:'SNOWY',trace:'SNOWY',
 tag:'Circle the snowy skies, match winter words, pick the snow-day clothes, finish the pattern and trace SNOWY.',
 meta:'A free snowy weather and winter clothes worksheet for ages 4–5: circle the snow, match the words, choose the winter clothes and trace the word SNOWY. Free printable, no sign-up.',
 learn:'Snow means a whole outfit: the sky decides, the wardrobe answers.',
 know:'Snowy as a sky word, and mittens, coat, hat and boots as the answer to it.',
 why:'Dressing for snow is the highest-stakes dressing decision of the year — practised here with no cold fingers.',
 skills:['Weather recognition','Winter clothing vocabulary','Pattern completion','Tracing and writing','Planning ahead'],
 steps:[['Circle','Circle every snowy-sky picture.'],['Match','Draw a line from each winter word to its picture.'],['Choose','Circle the clothes for a snowy day.'],['Trace','Trace the big word SNOWY and write it on your own.'],['Draw','Finish the pattern, then draw your snowy-day self.']],
 say:'Snow has a uniform too — and it is the warmest one we own. Let us sort it out.',
 look:'For the almost-snowy cloud — a white cloud is not a snowy sky, and that near-miss teaches.',
 ask:'What do we put on first for snow? What happens if we skip the mittens?',
 hint:'Do the pattern last — it is the reward after the sorting work.',
 tips:'Lay the real snow kit on the bed beside the sheet; match picture to garment one by one.',
 check:'Name three clothes snow demands, out loud, in a hurry.',
 real:'Full snow-dress rehearsal before the first real snow — timed, for fun.'},
{slug:'spring-and-seasons-chart',file:'spring-and-seasons-chart-worksheet.webp',w:1414,h:2000,title:'Spring and Seasons Chart',word:'SPRING',trace:'SPRING',
 tag:'Answer the season questions, match the pictures, circle the spring things and trace the word SPRING.',
 meta:'A free spring and seasons chart worksheet for ages 4–5: read and answer, match the season pictures, circle what you see in spring and trace the word SPRING. Free printable.',
 learn:'Spring has a signature — blossom, rain boots, new flowers — and it follows winter every year.',
 know:'The season order up to spring, and the objects that only appear in it.',
 why:'Spring is the season children can watch arrive day by day — the sheet hands them the checklist.',
 skills:['Season sequencing','Reading simple answers','Observation','Tracing and writing','Vocabulary'],
 steps:[['Answer','Read each season question and answer it.'],['Match','Draw a line from each picture to its season.'],['Circle','Circle everything you might see in spring.'],['Trace','Trace the big word SPRING and write it in the box.'],['Find','Point at the sheet, then out of the window: what has sprung?']],
 say:'Winter ends and spring walks in — flowers, boots and all. Let us find the signs.',
 look:'For the rain boots — spring is the wet, growing season and the boots say so.',
 ask:'What is different outside this week? What do we wear that we did not wear in winter?',
 hint:'The blossom tree is the spring anchor — match everything else around it.',
 tips:'Walk with the sheet: tick each spring thing you both actually spot outside.',
 check:'Which season comes before spring? Which comes after?',
 real:'Pick the first spring flower you see and name the season out loud on the spot.'},
{slug:'summer-hot-and-cold',file:'summer-hot-and-cold-worksheet.webp',w:1414,h:2000,title:'Summer: Hot and Cold',word:'SUMMER',trace:'SUMMER',
 tag:'Circle the summer things, sort hot from cold, trace the word SUMMER and draw a sunny day.',
 meta:'A free summer hot-and-cold worksheet for ages 4–5: circle what belongs to summer, sort hot things from cold, trace the word SUMMER and draw a sunny day. Free printable.',
 learn:'Summer is the hot season — and even summer has cold things, which is what makes sorting fun.',
 know:'Sun hat, sunglasses, ice pop and beach ball for summer; mittens and scarves for the other team.',
 why:'Hot-versus-cold sorting is a thinking skill wearing a swimsuit — the contrast does the teaching.',
 skills:['Hot and cold sorting','Season vocabulary','Tracing and writing','Drawing','Decision making'],
 steps:[['Circle','Circle everything that belongs in summer.'],['Sort','Cut and paste each picture into hot or cold.'],['Trace','Trace the big word SUMMER and write it yourself.'],['Draw','Draw a sunny summer day in the big box.'],['Say','Name your perfect summer day out loud, using the sheet.']],
 say:'Summer is the hot season — but it hides some cold things too. Find them all.',
 look:'For the ice pop — cold, yet pure summer. The best trap on the sheet.',
 ask:'What do you want cold in summer? What do we wear that we hide in winter?',
 hint:'Sort by asking one question: does the sun bring this out or send it away?',
 tips:'Finish at the freezer: a real ice pop is the honourable way to close this session.',
 check:'Name two hot things and two cold things from the sheet, fast.',
 real:'Plan one sheet item into the week — the beach ball or the sun hat both work.'},
{slug:'sunny-summer-weather',file:'sunny-summer-weather-worksheet.webp',w:1414,h:2000,title:'Sunny Summer Weather',word:'HOT',trace:'HOT',
 tag:'Circle the sunny skies, match summer objects, trace HOT and COLD, choose sun-safe clothes and draw summer.',
 meta:'A free sunny summer weather worksheet for ages 4–5: circle the sunny skies, match summer objects, trace the words HOT and COLD and pick the sun-safe outfit. Free printable.',
 learn:'Sunny summer days call for their own kit — and the sky word for it is hot.',
 know:'Sunny versus cloudy recognition, and shorts, sun hat and sunglasses as the sunny-day answer.',
 why:'Sun-safe choices rehearsed on paper become the default at the real door.',
 skills:['Weather recognition','Sun-safety choices','Word tracing','Matching','Drawing'],
 steps:[['Circle','Circle every sunny-sky picture.'],['Match','Draw a line from each object to SUMMER or the other team.'],['Trace','Trace the big words HOT and COLD, then write them.'],['Choose','Circle the clothes for a hot sunny day.'],['Draw','Draw your own perfect summer picture in the box.']],
 say:'The hottest sky has the happiest name. Let us learn what to wear for it.',
 look:'For the jacket in the matching row — it belongs to the other team and that is the test.',
 ask:'What protects your head in summer? What happens if we forget the hat?',
 hint:'The word tracing is two words — do HOT loud, COLD in a shivery voice.',
 tips:'End the session by laying out tomorrow\'s sunny-day outfit for real.',
 check:'Point at the window: hot day or not? Then name one thing to wear.',
 real:'Hat-on-before-door becomes the rule the sheet just taught.'},
{slug:'thermometer-temperature',file:'thermometer-temperature-worksheet.webp',w:1414,h:2000,title:'Thermometer and Temperature',word:'WARM',trace:'WARM',
 tag:'Label the thermometer, circle the hottest one, match hot, warm and cold, and trace the word WARM.',
 meta:'A free thermometer worksheet for ages 4–5: label the thermometer parts, circle the hottest reading, match hot, warm and cold to the scale and trace the word WARM. Free printable.',
 learn:'Temperature has a measuring tool: the higher the red, the hotter the day.',
 know:'The parts of a thermometer and the three words hot, warm and cold as scale positions.',
 why:'Reading a thermometer turns feelings about weather into numbers and order — measurement starts here.',
 skills:['Measurement vocabulary','Comparing readings','Ordering hot to cold','Tracing and writing','Prediction'],
 steps:[['Label','Write the words in the boxes pointing at the thermometer parts.'],['Circle','Circle the thermometer showing the hottest temperature.'],['Match','Draw a line from hot, warm and cold to the right thermometers.'],['Trace','Trace the big word WARM, then write it on your own.'],['Color','Colour the scale strip from cold to hot.']],
 say:'This glass stick knows exactly how warm it is. Let us learn to read it.',
 look:'For the red line height — hottest is simply the tallest red.',
 ask:'Which is warmer today, inside or outside? How would we check?',
 hint:'Cover hot, warm and cold in that order — the scale only climbs.',
 tips:'A real thermometer by the door turns every walk into a reading.',
 check:'Show three fingers as three thermometers: which finger is coldest?',
 real:'Read the real temperature together every morning for a week.'},
{slug:'thunderstorm-safety',file:'thunderstorm-safety-worksheet.webp',w:1414,h:2000,title:'Thunderstorm Safety',word:'THUNDER',trace:'THUNDER',
 tag:'Match the storm words, name what you hear, circle the safe indoor spots and trace the word THUNDER.',
 meta:'A free thunderstorm safety worksheet for ages 4–5: match the storm pictures, name the sound, circle the safe places indoors and trace the word THUNDER. Free printable, age-honest, no scare tactics.',
 learn:'Thunder is the sky\'s big noise, and storms have a safe routine: inside, away from windows, calm.',
 know:'Lightning, thunder and the storm cloud as pictures; indoors as the safe answer every time.',
 why:'Named things stop being monsters — the sheet turns the scariest weather into a known routine.',
 skills:['Storm vocabulary','Safety routine','Matching','Tracing and writing','Emotional readiness'],
 steps:[['Match','Draw a line from each storm word to its picture.'],['Say','Name the sound the storm makes, out loud.'],['Circle','Circle the safe indoor places for storm time.'],['Trace','Trace the big word THUNDER and write it in the box.'],['Tell','Tell the storm plan to your toys, beginning to end.']],
 say:'Thunder is loud but it is far away, and we know exactly what to do. Let us practise.',
 look:'For the indoor spots — kitchen and hallway away from windows are the heroes of this sheet.',
 ask:'What do we do when thunder starts? Where do we sit? Who do we stay with?',
 hint:'Keep the tone matter-of-fact: the sheet is a drill, not a scare.',
 tips:'Rehearse the real storm plan once after the sheet — same words, real rooms.',
 check:'Thunder starts: what are the first two things we do? Answer without the paper.',
 real:'Pick the family storm corner tonight and practise the walk to it once.'},
];

export const weatherWsBySlug=Object.fromEntries(weatherWs.map(w=>[w.slug,w]));
export function weatherWsNeighbours(w){
 const i=weatherWs.indexOf(w);
 return {prev:weatherWs[(i-1+weatherWs.length)%weatherWs.length],next:weatherWs[(i+1)%weatherWs.length]};
}

/* ---------- the Learning Path ACTIVITY page (canvas LEFT, guidance RIGHT) --- */
export function weatherWsActivityBody(w,site){
 const {prev,next}=weatherWsNeighbours(w);
 const enc=encodeURIComponent;
 const pageUrl=site+WS34_WS_CLASS+w.slug+'/';
 const shareTitle=`${w.title} — a free Weather & Seasons worksheet activity for ages 4–5 from Kiddo.school`;
 const stepsHtml=w.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${i+1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
 const pn=`<nav class="fc2-pn" aria-label="Previous and next worksheet activity"><a class="fc2-pn-btn" href="${WS34_WS_CLASS}${prev.slug}/" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.title)}</strong><span>Previous activity</span></a><a class="fc2-pn-btn fc2-pn-next" href="${WS34_WS_CLASS}${next.slug}/" rel="next"><strong>${esc(next.title)}</strong> <span aria-hidden="true">→</span><span>Next activity</span></a></nav>`;
 return `${crumbNav([['Learning Path','/learning-path/'],['Weather, Seasons &amp; What We Wear',WS34_CLASS_PATH],[esc(w.title)+' worksheet']])}
 <div class="page-heading wrap"><span class="eyebrow">WEATHER WORKSHEET ACTIVITY · CLASS 34 · AGES 4–5</span><h1>${esc(w.title)} — solve it right on the sheet.</h1><p>${esc(w.tag)}</p></div>
 <div class="fc2-dual wrap ls-dual">
  <div class="fc2-main">
   <section class="wc-section" aria-label="The worksheet — draw right on it" id="the-activity">
    <div class="wc-head"><span class="eyebrow">THE WORKSHEET — WRITE AND DRAW RIGHT ON IT</span><h2>Your sheet is ready.</h2><p class="lesson-copy">Pick a color or the eraser, then match, circle, count, trace and draw straight on the sheet with your finger, a stylus or the mouse. Press Save my work when you are proud — that is what marks this activity cleared for your child.</p></div>
    <div class="wc-mount" data-wxws-activity="${w.slug}" data-wc data-wc-src="${esc(WS34_WS_BASE+w.file)}?draw=1" data-wc-name="${esc(w.title)} weather seasons worksheet" data-wc-w="${w.w}" data-wc-h="${w.h}" data-wc-toolbar="#wxws-tools" data-wc-restore="weather-seasons/${w.slug}">
     <figure class="fc2-hero ws-hero-art ls-sheet"><img src="${esc(WS34_WS_BASE+w.file)}?draw=1" width="${w.w}" height="${w.h}" alt="The full ${esc(w.title)} weather worksheet: ${esc(w.tag)}" fetchpriority="high" crossorigin="anonymous"></figure>
    </div>
    <noscript><p class="fc-hint">Solving on the sheet needs JavaScript. The printable twin at <a href="${WS34_WS_LIB}${w.slug}/">${WS34_WS_LIB.slice(0,-1)+w.slug+'/'} /</a> always works.</p></noscript>
   </section>
   ${pn}
  </div>
  <aside class="fc2-rail" aria-label="Instructions, drawing tools and saved progress">
   <section class="fc2-block fc2-first-block"><span class="eyebrow">HOW TO DO IT</span><h2>Five little steps.</h2><ol class="fc-steps">${stepsHtml}</ol><p class="fc-hint">Ask a grown-up to read the steps aloud the first time. After that, you know just what to do.</p></section>
   <section class="fc2-block" id="wxws-tools" aria-label="Drawing tools"><span class="eyebrow">YOUR PENCIL CASE</span><h2>Pick your tools.</h2><p class="fc-hint">Pencil, nine crayons, an eraser, undo, redo and clear — the tools appear right here and work on the sheet. Save keeps your finished work as a picture, and your saved work comes back next time.</p></section>
   <section class="fc2-block" data-wxws-progress-block><span class="eyebrow">MY PROGRESS</span><h2>Save it to keep it.</h2><p class="ls-progress-line" data-wxws-progress aria-live="polite">This activity is cleared for you the moment you save your finished sheet. Nothing counts until then — opening the page is just opening the door.</p><p class="ls-progress-done" data-wxws-done hidden><strong>Cleared!</strong> Your saved work for this sheet is in your downloads, and the ribbon is on in <a href="${WS34_CLASS_PATH}">Class 34</a>.</p></section>
   <section class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS ACTIVITY</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this activity on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}" target="_blank" rel="noopener" aria-label="Share this activity on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+pageUrl)}" target="_blank" rel="noopener" aria-label="Share this activity on WhatsApp">WhatsApp</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div></section>
   <section class="fc2-block"><span class="eyebrow">PREFER PAPER?</span><h2>Print the twin.</h2><p class="fc-hint">The same sheet lives in the worksheet library with its download and print buttons: <a href="${WS34_WS_LIB}${w.slug}/">/worksheets/weather-seasons-and-what-we-wear/${w.slug}/</a>. Crayons beat styluses sometimes.</p></section>
  </aside>
 </div>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>What this worksheet teaches.</h2>
  <p class="lesson-copy"><strong>What the child is learning:</strong> ${esc(w.learn)}</p>
  <p class="lesson-copy"><strong>Knowledge to have ready:</strong> ${esc(w.know)}</p>
  <p class="lesson-copy"><strong>Why this activity matters:</strong> ${esc(w.why)}</p>
  <ul class="ws-skills">${w.skills.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>
  <p class="lesson-copy"><strong>What to say before you start:</strong> ${esc(w.say)}</p>
  <p class="lesson-copy"><strong>What to look for on the sheet:</strong> ${esc(w.look)}</p>
  <p class="lesson-copy"><strong>Questions to ask along the way:</strong> ${esc(w.ask)}</p>
  <p class="lesson-copy"><strong>Helpful hints without giving it away:</strong> ${esc(w.hint)}</p>
  <p class="lesson-copy"><strong>Parent tips:</strong> ${esc(w.tips)}</p>
  <p class="lesson-copy"><strong>Understanding check:</strong> ${esc(w.check)}</p>
  <p class="lesson-copy"><strong>Real-life practice:</strong> ${esc(w.real)}</p>
  <p class="lesson-copy">This activity belongs to <a href="${WS34_CLASS_PATH}">Class 34 — Weather, Seasons &amp; What We Wear</a> on the Learning Path. Progress is saved on this device for the child chosen in <a href="/my-classroom/">My Classroom</a> — and only a real save of finished work marks it cleared, never just opening the page.</p>
 </section>
 ${fcCommunityMount(WS34_WS_CLASS+w.slug+'/')}`;
}

/* ---------- the PRINTABLE library page (NO canvas) ---------- */
export function weatherWsPrintableBody(w,site){
 const {prev,next}=weatherWsNeighbours(w);
 const enc=encodeURIComponent;
 const file=WS34_WS_BASE+w.file;
 const pageUrl=site+WS34_WS_LIB+w.slug+'/';
 const shareTitle=`${w.title} Worksheet for Ages 4–5 — free printable from Kiddo.school`;
 const dlName=`weather-seasons-${w.slug}.webp`;
 const stepsHtml=w.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${i+1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
 const pn=`<nav class="fc2-pn" aria-label="Previous and next worksheet"><a class="fc2-pn-btn" href="${WS34_WS_LIB}${prev.slug}/" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.title)}</strong><span>Previous worksheet</span></a><a class="fc2-pn-btn fc2-pn-next" href="${WS34_WS_LIB}${next.slug}/" rel="next"><strong>${esc(next.title)}</strong> <span aria-hidden="true">→</span><span>Next worksheet</span></a></nav>`;
 const share=`<div class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS WORKSHEET</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this worksheet on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}" target="_blank" rel="noopener" aria-label="Share this worksheet on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+pageUrl)}" target="_blank" rel="noopener" aria-label="Share this worksheet on WhatsApp">WhatsApp</a><a class="fc2-share-btn" href="https://pinterest.com/pin/create/button/?url=${enc(pageUrl)}&media=${enc(file)}&description=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Save this worksheet on Pinterest">Pinterest</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div><p class="fc-hint">Share buttons open in a new tab. The copy button copies this page&rsquo;s address — nothing is tracked.</p></div>`;
 return `${crumbNav([['Worksheets','/worksheets/'],['Weather, Seasons &amp; What We Wear',WS34_WS_LIB],[w.title]])}
 <div class="page-heading wrap"><span class="eyebrow">WORKSHEET · CLASS 34 · AGES 4–5</span><h1>${esc(w.title)} Worksheet for Ages 4–5</h1><p>${esc(w.meta)}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main">
   <section class="wc-section" aria-label="This worksheet" id="the-worksheet">
    <div class="wc-head"><span class="eyebrow">THE WORKSHEET</span><h2>The full sheet, exactly as the artist drew it.</h2><p class="lesson-copy">See the whole sheet, download the original file or print it from your browser. Want your child to solve it on screen first? The interactive version lives at <a href="${WS34_WS_CLASS}${w.slug}/">${WS34_WS_CLASS.slice(1)+w.slug+'/'} /</a> — same sheet, drawing layer included.</p></div>
    <figure class="fc2-hero ws-hero-art"><img src="${esc(file)}" width="${w.w}" height="${w.h}" alt="The full ${esc(w.title)} weather worksheet: ${esc(w.tag)}" fetchpriority="high"></figure>
   </section>
   ${pn}
   <section class="fc2-learn" aria-label="About this worksheet">
    <section class="ws-rail-sec" aria-label="How to use"><span class="eyebrow">HOW TO USE IT</span><h2>The five steps on the sheet.</h2><ol class="fc-steps">${stepsHtml}</ol><p class="fc-hint">Before you start, have the words ready: ${esc(w.know)}</p></section>
    <section class="ws-rail-sec" aria-label="Why it helps"><span class="eyebrow">WHY IT HELPS</span><h2>What this worksheet teaches.</h2><p class="lesson-copy">${esc(w.learn)}</p><p class="lesson-copy">${esc(w.why)}</p><ul class="ws-skills">${w.skills.map(s=>`<li>${esc(s)}</li>`).join('')}</ul></section>
    <section class="ws-rail-sec" aria-label="Parent tips and questions"><span class="eyebrow">FOR GROWN-UPS</span><h2>Tips, questions and practice.</h2><p class="lesson-copy"><strong>Say before you start:</strong> ${esc(w.say)}</p><p class="lesson-copy"><strong>Questions to ask:</strong> ${esc(w.ask)}</p><p class="lesson-copy"><strong>Parent tips:</strong> ${esc(w.tips)}</p><p class="lesson-copy"><strong>Home practice:</strong> ${esc(w.real)}</p></section>
   </section>
  </div>
  <aside class="fc2-rail" aria-label="Download, print, share and family feedback">
   <section class="fc2-block fc2-first-block"><span class="eyebrow">TAKE IT TO THE TABLE</span><h2>Download &amp; print.</h2>
    <div class="fc2-actions"><button type="button" class="button ws-dl" data-wxws-download="${esc(file)}" data-wxws-filename="${dlName}">Download original sheet <span aria-hidden="true">↓</span></button><button type="button" class="button button-ghost ws-print" data-wxws-print>Print this sheet <span aria-hidden="true">⌘</span></button></div>
    <p class="fc-hint">The download keeps the original WebP picture, full size (1414×2000, A4 portrait). Print opens your browser&rsquo;s print dialog with just the sheet — no sign-up, nothing stored.</p>
   </section>
   ${share}
   ${fcCommunityMount(WS34_WS_LIB+w.slug+'/')}
   <section class="fc2-block"><span class="eyebrow">PREFER ON SCREEN?</span><h2>Solve it here.</h2><p class="fc-hint">The on-screen version of this sheet — drawing layer, five steps, save-your-work and all — lives at <a href="${WS34_WS_CLASS}${w.slug}/">${WS34_WS_CLASS.slice(1)+w.slug+'/'} /</a>.</p></section>
   <section class="fc2-block"><span class="eyebrow">WHERE THIS FITS</span><h2>The class behind it.</h2><p class="lesson-copy">This worksheet belongs to <a href="${WS34_CLASS_PATH}">Class 34 — Weather, Seasons &amp; What We Wear</a> on the Learning Path, and the whole collection lives at <a href="${WS34_WS_LIB}">/worksheets/weather-seasons-and-what-we-wear/</a>. One finished sheet is a full session — print it, solve it together, and let the fridge door be the gallery.</p></section>
  </aside>
 </div>
 <section class="wrap fc-section" aria-label="More weather worksheets"><span class="eyebrow">MORE WEATHER SHEETS</span><h2>More sheets like this one.</h2>
  <div class="ws-grid">${weatherWs.filter(x=>x.slug!==w.slug).map(x=>`<a class="ws-card" href="${WS34_WS_LIB}${x.slug}/"><span class="ws-card-art"><img src="${esc(WS34_WS_BASE+x.file)}" width="707" height="1000" alt="${esc(x.meta)}" loading="lazy"></span><span class="ws-card-body"><strong>${esc(x.title)} Worksheet</strong><span class="ws-card-meta"><span>Ages 4–5</span><span>Class 34</span></span><span class="ws-card-desc">${esc(x.tag)}</span></span><span class="ws-card-open">View Worksheet <span aria-hidden="true">→</span></span></a>`).join('')}</div>
 </section>`;
}

/* ---------- the /worksheets/ collection page ---------- */
export function weatherWsCategoryBody(){
 const cards=weatherWs.map(w=>`<a class="ws-card" href="${WS34_WS_LIB}${w.slug}/">
  <span class="ws-card-art"><img src="${esc(WS34_WS_BASE+w.file)}" width="707" height="1000" alt="${esc(w.meta)}" loading="lazy"></span>
  <span class="ws-card-body"><strong>${esc(w.title)} Worksheet</strong><span class="ws-card-meta"><span>Ages 4–5</span><span>Class 34</span><span>Weather &amp; Seasons</span></span><span class="ws-card-desc">${esc(w.tag)}</span></span>
  <span class="ws-card-open">View Worksheet <span aria-hidden="true">→</span></span>
 </a>`).join('');
 return `${crumbNav([['Worksheets','/worksheets/'],['Weather, Seasons &amp; What We Wear']])}
 <div class="page-heading wrap"><span class="eyebrow">WEATHER &amp; SEASONS WORKSHEETS · AGES 4–5</span><h1>Weather, Seasons &amp; What We Wear worksheets — free printables for little hands.</h1><p>Twenty-three genuine activity sheets about the sky and the clothes it asks for: match the seasons, circle the right clothes, count, trace and draw. Download the original sheet, print it, or solve every sheet on screen in <a href="${WS34_CLASS_PATH}">Class 34</a> first.</p></div>
 <section class="wrap section compact" aria-label="The weather worksheet collection">
  <figure class="fc2-hero ws-hero-art" style="max-width:640px;margin:0 auto 1.5rem"><img src="${esc(WS34_WS_BASE+WS34_WS_COVER.file)}" width="${WS34_WS_COVER.w}" height="${WS34_WS_COVER.h}" alt="${esc(WS34_WS_COVER.alt)}" fetchpriority="high"></figure>
  <div class="ws-grid">${cards}</div>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>Where these come from.</h2>
  <div class="fc-stages">
   <a class="fc-stage lesson-card-link" href="${WS34_CLASS_PATH}"><div class="fc-stage-pills"><span class="fc-age">Ages 4–5</span><span class="fc-class">Class 34</span></div><h3>Weather, Seasons &amp; What We Wear</h3><p>The class behind these worksheets — 29 step-by-step weather lessons and every sheet solvable on screen with the drawing layer.</p><span class="fc-open">Open Class 34 <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/flashcards/weather-seasons-and-what-we-wear/"><div class="fc-stage-pills"><span class="fc-age">Ages 4–5</span><span class="fc-class">Library</span></div><h3>The Weather Flashcards</h3><p>The matching card collection — what each kind of sky means, why it matters for a preschooler, and a printable card for the fridge.</p><span class="fc-open">Open the flashcards <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/worksheets/"><div class="fc-stage-pills"><span class="fc-age">All ages</span><span class="fc-class">Library</span></div><h3>The Worksheet Library</h3><p>All the school&rsquo;s printable subjects, each with its own page, download and print buttons.</p><span class="fc-open">Browse all worksheets <span aria-hidden="true">↗</span></span></a>
  </div>
 </section>`;
}

/* ---------- schema ---------- */
export function weatherWsSchema(site,w){
 return {'@context':'https://schema.org','@type':'LearningResource',
  name:`${w.title} Worksheet for Ages 4–5`,
  description:w.meta,url:site+WS34_WS_LIB+w.slug+'/',inLanguage:'en',
  learningResourceType:'Worksheet',educationalLevel:'Preschool',teaches:w.skills.join(', '),
  isAccessibleForFree:true,ageRange:'4-5',encodingFormat:'image/webp',contentUrl:WS34_WS_BASE+w.file,image:WS34_WS_BASE+w.file,
  about:{'@type':'Thing',name:'Weather, Seasons & What We Wear'},
  provider:{'@type':'Organization',name:'Kiddo.school',url:site+'/'},
  isPartOf:{'@type':'CreativeWorkSeries',name:'Weather, Seasons & What We Wear (Class 34)',url:site+WS34_CLASS_PATH}};
}
