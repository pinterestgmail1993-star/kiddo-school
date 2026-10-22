/* First Glance — the owner's 58 first-picture sheets (R2 bucket
   kiddo-school-assets/flashcards/first-glance/, uploaded 2026-10-22).
   A separate, standalone showcase: ALL 58 sheets live on ONE page
   (/first-glance/) — no individual card pages by owner instruction.
   Each sheet is a printable card grid (2x2 or 4x2) with a labelled
   picture and its word. Words below are read off the artwork itself,
   so alts and descriptions can never drift from the real images. */

export const FG_BASE='https://assets.kiddo.school/flashcards/first-glance/';
export const FG_W=800,FG_H=1132,FG_LW=1100,FG_LH=778;

/* card fields: n file number · slug file slug · t display title ·
   w words shown on the sheet (drives the alt text) · d one-line
   parent description · sub subject pill · sk skills line ·
   lw landscape sheet (1100x778) — everything else is 800x1132. */
export const FG_AGES_2_3={
 band:'Ages 2–3',folder:'ages-2-3',
 intro:'Thirty-two sheets of the words toddlers meet first. Sit together, point at a picture, say the word, and let your child say it back. Five sweet minutes beat a long lesson every time.',
 cards:[
  {n:'01',slug:'pets',t:'Pets',w:['Cat','Dog','Bird','Fish'],d:'Four friendly first pets — the animals most toddlers meet before anything else.',sub:'Animals',sk:'first words · animal sounds · pointing'},
  {n:'02',slug:'fruit',t:'Fruit',w:['Apple','Banana','Orange','Strawberry'],d:'Snack-time words with big, bright fruit little hands already know.',sub:'Food',sk:'naming · colors · snack talk'},
  {n:'03',slug:'feelings',t:'Feelings',w:['Happy','Sad','Angry','Calm'],d:'Four faces for four feelings — the starting point of every big-emotion talk.',sub:'Feelings',sk:'naming feelings · empathy · faces'},
  {n:'04',slug:'shapes',t:'Shapes',w:['Circle','Square','Triangle','Star'],d:'Circle, square, triangle, star — the four shapes hiding in every toy box.',sub:'Shapes',sk:'shape spotting · matching · words'},
  {n:'05',slug:'colors-1',t:'Colors · 1',w:['Red','Blue','Yellow','Green'],d:'The first four colors as bold, simple dots — easy to name, easier to spot.',sub:'Colors',sk:'color naming · looking closely'},
  {n:'06',slug:'numbers-1-4',t:'Numbers 1–4',w:['One','Two','Three','Four'],d:'Giant numerals one to four with their words — counting starts here.',sub:'Numbers',sk:'counting · number words'},
  {n:'07',slug:'face-parts',t:'Face parts',w:['Eye','Ear','Nose','Mouth'],d:'Eye, ear, nose, mouth — the sheet that turns bath time into "where is your nose?"',sub:'My body',sk:'body awareness · pointing'},
  {n:'08',slug:'clothes-1',t:'Clothes · 1',w:['Shirt','Shoes','Hat','Socks'],d:'Getting-dressed words: shirt, shoes, hat and socks.',sub:'Everyday things',sk:'dressing words · self-care'},
  {n:'09',slug:'size',t:'Big & small',w:['Big','Small','Tall','Short'],d:'First comparing words — big and small, tall and short, with shapes that show them.',sub:'Opposites',sk:'comparing · opposites'},
  {n:'10',slug:'hot-cold-wet-dry',t:'Hot, cold, wet & dry',w:['Hot','Cold','Wet','Dry'],d:'Touch words toddlers need all day: hot, cold, wet and dry.',sub:'Opposites',sk:'touch words · safety talk'},
  {n:'11',slug:'basic-food',t:'First foods',w:['Milk','Bread','Water','Rice'],d:'The foods on every high chair: milk, bread, water and rice.',sub:'Food',sk:'mealtime words · naming'},
  {n:'12',slug:'zoo-animals',t:'Zoo animals',w:['Lion','Elephant','Monkey','Zebra'],d:'Lion, elephant, monkey and zebra — the zoo in four roars.',sub:'Animals',sk:'animal names · sounds · pretend play'},
  {n:'13',slug:'body-parts',t:'Body parts',w:['Hand','Foot','Arm','Leg'],d:'Hand, foot, arm and leg — for "clap your hands" and "stomp your feet".',sub:'My body',sk:'body awareness · action words'},
  {n:'14',slug:'colors-2',t:'Colors · 2',w:['Red','Blue','Green','Purple'],d:'Four more colors, purple included — the second step after the first dots.',sub:'Colors',sk:'color naming · sorting'},
  {n:'15',slug:'vegetables',t:'Vegetables',w:['Potato','Carrot','Corn','Tomato'],d:'Potato, carrot, corn and tomato — friendly faces for fussy eaters.',sub:'Food',sk:'food words · colors'},
  {n:'16',slug:'small-animals',t:'Small animals',w:['Frog','Turtle','Rabbit','Bear'],d:'Frog, turtle, rabbit and bear — small enough to hold in a story.',sub:'Animals',sk:'animal names · hopping play'},
  {n:'17',slug:'tableware',t:'At the table',w:['Cup','Plate','Spoon','Bowl'],d:'Cup, plate, spoon and bowl — the words of every family meal.',sub:'Everyday things',sk:'mealtime words · helping'},
  {n:'18',slug:'weather',t:'Weather words',w:['Sunny','Rainy','Windy','Snowy'],d:'Sunny, rainy, windy, snowy — the talk you have at the window every morning.',sub:'Weather',sk:'weather words · daily talk'},
  {n:'19',slug:'family',t:'My family',w:['Mother','Father','Sister','Brother'],d:'The people who matter most: mother, father, sister and brother.',sub:'Family',sk:'family words · who-is-who'},
  {n:'20',slug:'instruments-1',t:'Instruments · 1',w:['Drum','Piano','Guitar','Trumpet'],d:'Drum, piano, guitar and trumpet — for little musicians who bang everything.',sub:'Music',sk:'instrument names · listening'},
  {n:'21',slug:'insects-1',t:'Insects',w:['Bee','Butterfly','Ant','Ladybug'],d:'Bee, butterfly, ant and ladybug — the garden helpers under the magnifying glass.',sub:'Animals',sk:'minibeast words · garden walks'},
  {n:'22',slug:'sea-animals',t:'Sea animals',w:['Whale','Dolphin','Octopus','Seahorse'],d:'Whale, dolphin, octopus and seahorse — wonders from under the waves.',sub:'Animals',sk:'animal names · bath-time play'},
  {n:'23',slug:'vehicles-1',t:'Vehicles · 1',w:['Car','Bus','Train','Airplane'],d:'Car, bus, train and airplane — the four every "vroom!" is about.',sub:'Vehicles',sk:'vehicle names · sounds'},
  {n:'24',slug:'furniture',t:'Furniture',w:['Bed','Chair','Table','Door'],d:'Bed, chair, table and door — naming the rooms your child lives in.',sub:'Home',sk:'home words · tidy-up talk'},
  {n:'25',slug:'actions-1',t:'Action words · 1',w:['Run','Jump','Walk','Clap'],d:'Run, jump, walk and clap — say the word, then do it together.',sub:'Actions',sk:'verbs · moving · follow-me play'},
  {n:'26',slug:'nature-1',t:'Nature · 1',w:['Tree','Flower','Mountain','River'],d:'Tree, flower, mountain and river — the big outdoors in four pictures.',sub:'Nature',sk:'outdoor words · walks'},
  {n:'27',slug:'farm-animals',t:'Farm animals',w:['Cow','Pig','Sheep','Horse'],d:'Cow, pig, sheep and horse — with the moo, oink, baa and neigh that go with them.',sub:'Animals',sk:'animal sounds · naming'},
  {n:'28',slug:'school-supplies',t:'School supplies',w:['Book','Pencil','Eraser','Ruler'],d:'Book, pencil, eraser and ruler — little ones feel very grown up naming these.',sub:'School',sk:'school words · pretend class'},
  {n:'29',slug:'toys',t:'Toys',w:['Ball','Teddy Bear','Blocks','Doll','Toy Car','Kite','Puzzle','Balloon'],d:'Eight toy-box favorites, from teddy bear to balloon — clean-up time just got easier.',sub:'Play',sk:'toy names · tidy-up talk'},
  {n:'30',slug:'fruit-and-veg-extras',t:'More fruit & veg',w:['Pear','Watermelon','Lemon','Pineapple','Broccoli','Cucumber','Juice','Tea'],d:'Eight more foods to try — pear, watermelon, broccoli and friends.',sub:'Food',sk:'food words · tasting talk'},
  {n:'31',slug:'bugs',t:'Bugs',w:['Snail','Spider','Caterpillar','Worm','Grasshopper','Firefly','Mosquito','Beetle'],d:'Eight crawly friends: snail, spider, caterpillar, worm and more.',sub:'Animals',sk:'minibeast words · looking closely'},
  {n:'32',slug:'baby-animals',t:'Baby animals',w:['Puppy','Kitten','Chick','Calf','Lamb','Piglet','Duckling','Foal'],d:'Puppy, kitten, chick, calf — eight baby animals, twice the "awww".',sub:'Animals',sk:'animal babies · matching mothers'},
 ]};

export const FG_AGES_4_5={
 band:'Ages 4–5',folder:'ages-4-5',
 intro:'Twenty-six sheets that stretch a preschooler’s world: seasons, jobs, letters, positions, safety and more. Ask "which one is…?" and "what comes next?" to turn naming into thinking.',
 cards:[
  {n:'01',slug:'seasons',t:'The four seasons',w:['Spring','Summer','Autumn','Winter'],d:'Spring, summer, autumn and winter — talk about what each season wears and brings.',sub:'Seasons',sk:'season names · weather talk'},
  {n:'02',slug:'up-down-in-out',t:'Up, down, in & out',w:['Up','Down','In','Out'],d:'Direction words with clear arrows: up, down, in and out.',sub:'Positions',sk:'direction words · movement'},
  {n:'03',slug:'times-of-day',t:'Times of day',w:['Morning','Afternoon','Evening','Night'],d:'Morning, afternoon, evening and night — the day laid out in four pictures.',sub:'Time',sk:'daily order · routine talk'},
  {n:'04',slug:'jobs-1',t:'Jobs · 1',w:['Doctor','Teacher','Firefighter','Chef'],d:'Doctor, teacher, firefighter and chef — the heroes your child already admires.',sub:'Jobs',sk:'community helpers · pretend play'},
  {n:'05',slug:'letters-a-d',t:'Letters A, B, C & D',w:['A','B','C','D'],d:'The first four letters, big and bold — where the alphabet gets its start.',sub:'Letters',sk:'letter shapes · sounds'},
  {n:'06',slug:'places',t:'Places we go',w:['Home','School','Park','Shop'],d:'Home, school, park and shop — the map of your child’s week.',sub:'Places',sk:'place names · errand talk'},
  {n:'07',slug:'daily-routine',t:'My day',w:['Brush Teeth','Wash Hands','Take a Bath','Comb Hair','Put On Shoes','Eat','Sleep','Tidy Up'],d:'Eight routine cards from brushing teeth to tidy-up — the day in the order it happens.',sub:'Routines',sk:'sequencing · self-care'},
  {n:'08',slug:'vehicles-2',t:'Vehicles · 2',w:['Truck','Boat','Helicopter','Tractor','Fire Truck','Ambulance','Police Car','Motorbike'],d:'Eight vehicles that siren, chug and fly — trucks, boats and rescue heroes.',sub:'Vehicles',sk:'vehicle names · sounds'},
  {n:'09',slug:'sports',t:'Sports & movement',w:['Swimming','Football','Cycling','Dancing','Climbing','Throwing','Kicking','Catching'],d:'Swimming, football, dancing and more — eight ways strong bodies move.',sub:'Sports',sk:'action words · gross motor'},
  {n:'10',slug:'home-objects',t:'Around the home',w:['Lamp','Clock','Window','Sofa','TV','Key','Towel','Bin'],d:'Eight things in every room: lamp, clock, sofa, key and friends.',sub:'Home',sk:'household words · spotting'},
  {n:'11',slug:'feelings-2',t:'More feelings',w:['Surprised','Scared','Shy','Proud','Excited','Tired','Hungry','Sick'],d:'Eight more feelings, from proud to sick — richer words for bigger kids.',sub:'Feelings',sk:'naming feelings · empathy'},
  {n:'12',slug:'instruments-2',t:'Instruments · 2',w:['Violin','Flute','Xylophone','Tambourine','Bell','Maracas','Harp','Accordion'],d:'Violin, flute, xylophone and maracas — eight sounds to listen for.',sub:'Music',sk:'instrument names · listening'},
  {n:'13',slug:'clothes-2',t:'More clothes',w:['Dress','Jacket','Gloves','Scarf','Boots','Pajamas','Swimsuit','Glasses'],d:'Dress, jacket, gloves and pajamas — getting dressed by the weather.',sub:'Everyday things',sk:'clothing words · seasons',lw:true},
  {n:'14',slug:'body-2',t:'More body parts',w:['Hair','Teeth','Tongue','Finger','Knee','Elbow','Neck','Tummy'],d:'Hair, teeth, tongue, knee and more — naming beyond the basics.',sub:'My body',sk:'body awareness · hygiene talk',lw:true},
  {n:'15',slug:'food-and-snacks',t:'Food & snacks',w:['Egg','Cheese','Pizza','Cake','Cookie','Ice Cream','Sandwich','Soup'],d:'Egg, cheese, pizza, cake — eight favorites for kitchen conversations.',sub:'Food',sk:'food words · sometimes-foods talk',lw:true},
  {n:'16',slug:'art-supplies',t:'Art supplies',w:['Crayon','Paintbrush','Scissors','Glue','Paper','Marker','Backpack','Paint'],d:'Crayon, paintbrush, scissors and glue — the tools of every craft table.',sub:'Making',sk:'craft words · how-to talk',lw:true},
  {n:'17',slug:'family-2',t:'More family',w:['Baby','Grandmother','Grandfather','Aunt','Uncle','Friend','Boy','Girl'],d:'Grandparents, aunt, uncle and friend — the whole circle of people.',sub:'Family',sk:'family words · who-is-who',lw:true},
  {n:'18',slug:'kitchen',t:'In the kitchen',w:['Fork','Knife','Pot','Pan','Glass','Bottle','Kettle','Toaster'],d:'Fork, knife, pot and pan — real kitchen words for little helpers.',sub:'Kitchen',sk:'kitchen words · helping cook',lw:true},
  {n:'19',slug:'jobs-2',t:'Jobs · 2',w:['Nurse','Farmer','Pilot','Builder','Baker','Mechanic','Vet','Postman'],d:'Nurse, farmer, pilot, baker — eight more jobs to dream about.',sub:'Jobs',sk:'community helpers · pretend play'},
  {n:'20',slug:'positions',t:'Position words',w:['On','Under','Behind','Next To','In Front','Between','Top','Bottom'],d:'On, under, behind, between — the words that make "where?" answerable.',sub:'Positions',sk:'spatial words · hide-and-seek talk'},
  {n:'21',slug:'celebrations',t:'Celebrations',w:['Birthday Cake','Gift','Candles','Eid Moon','Lantern','Fireworks','Party Hat','Sweets'],d:'Birthday cake, gifts, Eid moon and lanterns — the things every party shares.',sub:'Celebrations',sk:'festival words · counting down'},
  {n:'22',slug:'safety',t:'Staying safe',w:['Stop Sign','Traffic Light','Zebra Crossing','Helmet','Seatbelt','Fire','Hot Stove','Hand Wash Sign'],d:'Stop sign, seatbelt, helmet and more — safety words that stick.',sub:'Safety',sk:'safety rules · street talk'},
  {n:'23',slug:'actions-2',t:'Action words · 2',w:['Eat','Drink','Sit','Stand','Push','Pull','Open','Close'],d:'Eat, drink, push, pull — eight verbs your child does a hundred times a day.',sub:'Actions',sk:'verbs · follow-me play'},
  {n:'24',slug:'nature-2',t:'Nature · 2',w:['Leaf','Grass','Rock','Sand','Wave','Lake','Cloud','Forest'],d:'Leaf, grass, wave, cloud — take this one on your next walk.',sub:'Nature',sk:'outdoor words · exploring'},
  {n:'25',slug:'beach',t:'At the beach',w:['Shell','Starfish','Crab','Bucket','Sunglasses','Sandcastle','Jellyfish','Shark'],d:'Shell, starfish, crab and sandcastle — pack it for the seaside.',sub:'Beach',sk:'beach words · holiday talk'},
  {n:'26',slug:'playground',t:'At the playground',w:['Slide','Swing','Seesaw','Sandbox','Monkey Bars','Climbing Frame','Ball Pit','Merry-Go-Round'],d:'Slide, swing, seesaw, sandbox — name it, then go play it.',sub:'Play',sk:'playground words · turn-taking'},
 ]};

export const FG_TOTAL=FG_AGES_2_3.cards.length+FG_AGES_4_5.cards.length;
