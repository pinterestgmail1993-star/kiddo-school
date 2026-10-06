// Kiddo School curriculum engine: one reusable, data-driven lesson system.
// Every lesson (and future ones) is pure data: slug/path, age, class, subject,
// cover, R2 folder, cards, parent instructions, previous/next lesson, SEO.
export const lessonsBase='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/black-and-white-baby-cards/';
export const toddlerBase='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/toddler-learning-cards/';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const img=(prefix,file,w,h,alt,eager)=>`<img src="${prefix}${file}" width="${w}" height="${h}" alt="${alt}"${eager?' fetchpriority="high"':' loading="lazy"'}>`;
export const hcLesson={
 path:'/newborn/0-6-weeks/high-contrast-cards/',
 seoTitle:'High Contrast Cards for Newborns (0–6 Weeks)',
 title:'High-Contrast Cards for Newborns (Birth–6 Weeks)',
 h1:'High-Contrast Cards for Newborns',
 description:'Explore black-and-white high-contrast cards for newborns from birth to 6 weeks, with simple activities for early looking, focusing and visual tracking.',
 ogAlt:'Black and white high-contrast smiling face card for newborns from the Kiddo.school Newborn 1 class',
 ogImage:'https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/black-and-white-baby-cards/newborn-high-contrast-face.webp',
 schemaImage:'https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/black-and-white-baby-cards/newborn-high-contrast-face.webp',
 eyebrow:'NEWBORN 1 · LESSON 1',
 crumbs:[['Baby','/baby/'],['Newborn','/newborn/'],['0–6 Weeks','/newborn/0-6-weeks/'],['High-Contrast Cards','/newborn/0-6-weeks/high-contrast-cards/']],
 chips:[['Age','Birth–6 Weeks'],['Subject','See'],['Class','Newborn 1'],['Time','2–5 minutes']],
 ledes:['Newborns see the world in bold shapes long before they see details. These twelve black and white baby flashcards use strong, high-contrast patterns — circles, stripes, checkerboards and friendly faces — because bold contrast is exactly what catches a brand-new baby’s attention. It is the classic newborn visual stimulation activity, turned into a calm two-to-five-minute class: no printing, no setup, just you, your baby and one card at a time.',
  'Show a card, watch, talk softly, and stop when your baby is done. That is the whole class. Nothing to teach and nothing to test — just an easy first step into Kiddo.school, from birth onward.'],
 startHint:'Twelve cards, one at a time. Works beautifully on a phone at arm’s length.',
 viewerLabel:'Today’s class: twelve high-contrast cards',
 viewerHeading:'Twelve cards, one at a time.',
 folder:'',
 eagerFirst:true,
 cards:[
  {order:1,file:'newborn-high-contrast-circle-card.webp',w:1080,h:1350,alt:'Black and white high-contrast circle card for newborns'},
  {order:2,file:'newborn-high-contrast-square-card.webp',w:1080,h:1350,alt:'Black and white high-contrast square card for newborns'},
  {order:3,file:'newborn-high-contrast-vertical-stripes.webp',w:1080,h:1350,alt:'Black and white high-contrast vertical stripes card for newborns'},
  {order:4,file:'newborn-high-contrast-horizontal-stripes.webp',w:1080,h:1350,alt:'Black and white high-contrast horizontal stripes card for newborns'},
  {order:5,file:'newborn-high-contrast-checkerboard.webp',w:1080,h:1350,alt:'Black and white checkerboard pattern card for newborns'},
  {order:6,file:'newborn-high-contrast-concentric-circles.webp',w:1080,h:1350,alt:'Black and white concentric circles card for newborns'},
  {order:7,file:'newborn-high-contrast-spiral.webp',w:1080,h:1350,alt:'Black and white high-contrast spiral card for newborns'},
  {order:8,file:'newborn-high-contrast-triangle.webp',w:1080,h:1350,alt:'Black and white high-contrast triangle card for newborns'},
  {order:9,file:'newborn-high-contrast-target.webp',w:1080,h:1350,alt:'Black and white bullseye target card for newborns'},
  {order:10,file:'newborn-high-contrast-eyes.webp',w:1080,h:1350,alt:'Black and white high-contrast eyes card for newborns'},
  {order:11,file:'newborn-high-contrast-face.webp',w:1080,h:1350,alt:'Black and white high-contrast smiling face card for newborns'},
  {order:12,file:'newborn-high-contrast-symmetrical-face.webp',w:1080,h:1350,alt:'Black and white symmetrical baby face card for newborns'}
 ],
 howTo:{heading:'How to use these cards',steps:[
  ['Hold the card close','Hold the card about 8–12 inches (20–30 cm) from your baby’s face — roughly the distance from your elbow to your fingers. Close, bold and steady is easiest for brand-new eyes.'],
  ['Let your baby look','Let your baby study the image. Some babies stare hard, some go very still, some wiggle with excitement. All of that counts as looking.'],
  ['Move it slowly','When your baby is alert and interested, slowly move a card from side to side, a few centimetres each way, and watch their eyes follow.'],
  ['Stop in time','Stop when your baby looks away, yawns or loses interest. Looking away is how a newborn says “enough for now” — and that is a complete class.'],
  ['Keep it short and calm','Keep the experience short, calm and parent-led. Two to five minutes is plenty at this age, and you can always come back tomorrow.']
 ],note:'<strong>Every baby develops differently.</strong> Ages on Kiddo School are guides, not tests or deadlines. If you ever have a question about your baby’s vision or development, your doctor or health visitor is the right person to ask.'},
 why:'In the first weeks, most of what a newborn sees is soft and blurry, and strong black and white shapes are the easiest images for young eyes to notice. That is why high contrast cards and black and white baby flashcards have been a favourite newborn visual stimulation activity for generations. Following a slow-moving card gives your baby practice at focusing and tracking, and your voice turns the looking into language: circle, stripes, hello face. Nothing here is a lesson or a test — it is a calm minute of shared looking, at exactly your baby’s pace.',
 pills:{heading:'Where to next?',items:[['Newborn Learning','/newborn/'],['0–6 Weeks','/newborn/0-6-weeks/'],['See','/subjects/see/']],after:'<p class="lesson-next"><strong>Next Class →</strong> <a href="/newborn/6-12-weeks/faces-and-visual-tracking/">Faces &amp; Visual Tracking</a> — the next class on your path.</p>'},
 hubBlurb:'Twelve black and white cards, shown one at a time. Two to five minutes, no printing, no setup — just look together.',
 schema:{level:'Newborn (birth–6 weeks)',teaches:'Visual attention, focusing and visual tracking',audience:'Parents of newborns',keywords:'high contrast cards, black and white baby flashcards, newborn visual stimulation, newborn flashcards'}
};
export const fvLesson={
 path:'/newborn/6-12-weeks/faces-and-visual-tracking/',
 seoTitle:'Faces & Visual Tracking for Babies 6–12 Weeks',
 title:'Faces & Visual Tracking for Babies 6–12 Weeks',
 h1:'Faces & Visual Tracking for Babies 6–12 Weeks',
 description:'Explore simple high-contrast faces, patterns and early color cards designed for babies 6–12 weeks, with a short parent-led visual activity.',
 ogAlt:'Cover of the Kiddo School Newborn 2 class Faces and Visual Tracking for babies 6 to 12 weeks, with a bold black spiral card',
 ogImage:lessonsBase+'faces-and-visual-tracking-6-12-weeks/cover.webp',
 schemaImage:lessonsBase+'faces-and-visual-tracking-6-12-weeks/cover.webp',
 eyebrow:'NEWBORN 2 · LESSON 2',
 crumbs:[['Newborn','/newborn/'],['6–12 Weeks','/newborn/6-12-weeks/'],['Faces & Visual Tracking','/newborn/6-12-weeks/faces-and-visual-tracking/']],
 chips:[['Age','6–12 Weeks'],['Subject','See'],['Class','Newborn 2'],['Duration','2–5 minutes']],
 ledes:['Between 6 and 12 weeks, your baby starts to hold a gaze a little longer and follows movement with their eyes. This class uses simple high-contrast faces, gentle patterns and a first taste of strong colour — twelve cards you show one at a time, in a calm two-to-five-minute session whenever it suits you both.',
  'Faces are a baby’s favourite thing to look at, and moving a card slowly from side to side turns that looking into early visual tracking practice. Nothing to teach and nothing to test — just an easy next step from your first class.'],
 startHint:'Twelve cards, one at a time. The cover stays on this page; the class is one tap away.',
 viewerLabel:'Today’s class: twelve faces, patterns and early colour cards',
 viewerHeading:'Twelve cards, one at a time.',
 folder:'faces-and-visual-tracking-6-12-weeks/',
 eagerFirst:false,
 cover:{file:'cover.webp',w:1414,h:2000,alt:'Cover of the Faces and Visual Tracking class for babies 6 to 12 weeks: a bold black spiral card with the Newborn 2 See label from Kiddo School'},
 cards:[
  {order:1,file:'01-eyes.webp',w:1414,h:2000,alt:'Simple high-contrast eyes card for babies'},
  {order:2,file:'02-happy-face.webp',w:1414,h:2000,alt:'Simple high-contrast happy face card for babies'},
  {order:3,file:'03-different-face.webp',w:1414,h:2000,alt:'High-contrast face card for babies'},
  {order:4,file:'04-face-pattern.webp',w:1414,h:2000,alt:'High-contrast symmetrical face pattern for babies'},
  {order:5,file:'05-concentric-circles.webp',w:1414,h:2000,alt:'Black and white concentric circles card for babies'},
  {order:6,file:'06-wavy-lines.webp',w:1414,h:2000,alt:'Black and white wavy line card for babies'},
  {order:7,file:'07-zigzag.webp',w:1414,h:2000,alt:'Black and white zigzag card for babies'},
  {order:8,file:'08-large-dots.webp',w:1414,h:2000,alt:'Large high-contrast dots card for babies'},
  {order:9,file:'09-curved-path.webp',w:1414,h:2000,alt:'High-contrast curved path card for babies'},
  {order:10,file:'10-red-circle.webp',w:1414,h:2000,alt:'Simple red circle visual card for babies'},
  {order:11,file:'11-red-and-black.webp',w:1414,h:2000,alt:'Red and black high-contrast visual card for babies'},
  {order:12,file:'12-red-face-detail.webp',w:1414,h:2000,alt:'Simple face card with red visual detail for babies'}
 ],
 howTo:{heading:'How to use this activity',paragraphs:[
  'Choose a time when your baby is awake, calm and comfortable. Hold the card where your baby can comfortably see it and allow time to look. For tracking activities, move the card slowly from side to side. There is no need to complete every card in one session. Stop when your baby looks away, becomes tired or loses interest.',
  'At this stage, Kiddo School introduces simple faces, high-contrast patterns and a small amount of strong color.'
 ],note:'<strong>Every baby develops differently.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines.'},
 pills:{heading:'Where to next?',items:[['Newborn Learning','/newborn/'],['6–12 Weeks','/newborn/6-12-weeks/'],['See','/subjects/see/']]},
 pathNav:{prev:{title:'High-Contrast Cards',range:'Birth–6 Weeks',href:'/newborn/0-6-weeks/high-contrast-cards/'},next:{title:'Colors & First Objects',range:'3–4 Months',href:'/baby/3-4-months/colors-and-first-objects/'}},
 hubBlurb:'Simple faces, gentle patterns and a first taste of colour, with slow side-to-side tracking. Two to five calm minutes at a time.',
 schema:{level:'Newborn (6–12 weeks)',teaches:'Visual attention, faces and early visual tracking',audience:'Parents of babies',keywords:'faces and visual tracking, high contrast cards for babies, baby visual tracking, newborn visual stimulation'}
};
export const cfoLesson={
 path:'/baby/3-4-months/colors-and-first-objects/',
 seoTitle:'Colors & First Objects for Babies 3–4 Months',
 title:'Colors & First Objects for Babies 3–4 Months',
 h1:'Colors & First Objects for Babies 3–4 Months',
 description:'Explore simple color and first-object flashcards for babies 3–4 months, featuring bold red, yellow and blue visuals and familiar everyday objects.',
 ogAlt:'Cover of the Kiddo School Infant 1 class Colors and First Objects for babies 3 to 4 months, with red, blue and yellow shapes',
 ogImage:lessonsBase+'colors-and-first-objects-3-4-months/cover.webp',
 schemaImage:lessonsBase+'colors-and-first-objects-3-4-months/cover.webp',
 eyebrow:'INFANT 1 · LESSON 3',
 crumbs:[['Baby','/baby/'],['3–4 Months','/baby/3-4-months/'],['Colors & First Objects','/baby/3-4-months/colors-and-first-objects/']],
 chips:[['Age','3–4 Months'],['Subject','See'],['Class','Infant 1'],['Duration','2–5 minutes']],
 ledes:['Around three to four months, many babies begin to notice colour and reach toward the world. This class pairs bold red, yellow and blue with a few familiar objects — a ball, a cup, a spoon, an apple, a teddy — shown one at a time in short, parent-led sessions.',
  'Name what you see if you like, and let your baby look for as long as they want. There is no need to test anything or expect a response: this is shared looking, not a quiz.'],
 startHint:'Twelve cards, one at a time. Short sessions win at this age.',
 viewerLabel:'Today’s class: twelve colour and first-object cards',
 viewerHeading:'Twelve cards, one at a time.',
 folder:'colors-and-first-objects-3-4-months/',
 eagerFirst:false,
 cover:{file:'cover.webp',w:1414,h:2000,alt:'Cover of the Colors and First Objects class for babies 3 to 4 months: red, blue and yellow shapes with the Infant 1 See label from Kiddo School'},
 cards:[
  {order:1,file:'01-red-circle.webp',w:1414,h:2000,alt:'Large red circle visual card for babies'},
  {order:2,file:'02-yellow-circle.webp',w:1414,h:2000,alt:'Large yellow circle visual card for babies'},
  {order:3,file:'03-blue-circle.webp',w:1414,h:2000,alt:'Large blue circle visual card for babies'},
  {order:4,file:'04-three-colors.webp',w:1414,h:2000,alt:'Red yellow and blue color card for babies'},
  {order:5,file:'05-ball.webp',w:1414,h:2000,alt:'Simple colorful ball visual card for babies'},
  {order:6,file:'06-cup.webp',w:1414,h:2000,alt:'Simple blue cup visual card for babies'},
  {order:7,file:'07-spoon.webp',w:1414,h:2000,alt:'Simple spoon visual card for babies'},
  {order:8,file:'08-apple.webp',w:1414,h:2000,alt:'Simple red apple visual card for babies'},
  {order:9,file:'09-sun.webp',w:1414,h:2000,alt:'Simple yellow sun visual card for babies'},
  {order:10,file:'10-ball-and-cup.webp',w:1414,h:2000,alt:'Ball and cup visual card for babies'},
  {order:11,file:'11-teddy-bear.webp',w:1414,h:2000,alt:'Simple teddy bear visual card for babies'},
  {order:12,file:'12-simple-face.webp',w:1414,h:2000,alt:'Simple human face visual card for babies'}
 ],
 howTo:{heading:'How to use this activity',paragraphs:[
  'Choose a time when your baby is awake, calm and comfortable. Show one card at a time and give your baby time to look. You can name familiar objects naturally as you show them, but there is no need to test your baby or expect a response.',
  'This lesson introduces bold red, yellow and blue alongside simple familiar objects. Keep sessions short and follow your baby’s interest.',
  'Stop when your baby looks away, becomes tired, fussy or loses interest.'
 ],note:'<strong>Every baby develops differently.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines.'},
 tryTogether:['Look at the red circle.','Here is the ball.','Can you see the cup?','This is an apple.','Where is the sun?','Hello, teddy.'],
 pills:{heading:'Where to next?',items:[['Baby classes','/baby/'],['3–4 Months','/baby/3-4-months/'],['See','/subjects/see/']]},
 pathNav:{prev:{title:'Faces & Visual Tracking',range:'6–12 Weeks',href:'/newborn/6-12-weeks/faces-and-visual-tracking/'},next:{title:'First Words & Familiar Things',range:'4–6 Months',href:'/baby/4-6-months/first-words-familiar-things/'}},
 hubBlurb:'Bold red, yellow and blue alongside familiar objects — a ball, a cup, a spoon, a teddy. Name them if you like; there is nothing to test.',
 schema:{level:'Infant (3–4 months)',teaches:'Colour noticing, focusing and shared attention',audience:'Parents of babies',keywords:'baby colour cards, first objects flashcards, red yellow blue baby cards, visual activities for infants'}
};
export const fwftLesson={
 path:'/baby/4-6-months/first-words-familiar-things/',
 seoTitle:'First Words & Familiar Things for Babies 4–6 Months',
 title:'First Words & Familiar Things for Babies 4–6 Months',
 h1:'First Words & Familiar Things for Babies 4–6 Months',
 description:'Explore simple familiar-object flashcards for babies 4–6 months, with parent-led talking activities using everyday objects, foods, animals and faces.',
 ogAlt:'Cover of the Kiddo School Infant 2 class First Words and Familiar Things for babies 4 to 6 months, with a red ball, blue cup and yellow banana',
 ogImage:lessonsBase+'first-words-familiar-things-4-6-months/cover.webp',
 schemaImage:lessonsBase+'first-words-familiar-things-4-6-months/cover.webp',
 eyebrow:'INFANT 2 · LESSON 4',
 crumbs:[['Baby','/baby/'],['4–6 Months','/baby/4-6-months/'],['First Words & Familiar Things','/baby/4-6-months/first-words-familiar-things/']],
 chips:[['Age','4–6 Months'],['Subject','Talk'],['Class','Infant 2'],['Duration','2–5 minutes']],
 ledes:['Around four to six months, babies babble back, laugh at familiar faces and start to connect the sounds you make with the things they see. This class uses twelve simple familiar-object flashcards — a ball, a cup, a spoon, a bottle, an apple, a banana, a cat, a dog, a bird, a car, a teddy bear and a friendly baby face — shown one at a time while you name what you see in your own words.',
  'There is no script and nothing to test. You talk, your baby listens, and the little everyday names — ball, cup, dog, hello — slowly grow into your baby’s first words. Short, calm sessions of two to five minutes are all it takes.'],
 startHint:'Twelve cards, one at a time. Name each picture in your own words — short and natural wins.',
 viewerLabel:'Today’s class: twelve familiar-object cards',
 viewerHeading:'Twelve cards, one at a time.',
 folder:'first-words-familiar-things-4-6-months/',
 eagerFirst:false,
 cover:{file:'cover.webp',w:1414,h:2000,alt:'Cover of the First Words and Familiar Things class for babies 4 to 6 months: a red ball, blue cup and yellow banana with the Infant 2 Talk label from Kiddo School'},
 cards:[
  {order:1,file:'01-ball.webp',w:1414,h:2000,alt:'Simple ball flashcard for babies'},
  {order:2,file:'02-cup.webp',w:1414,h:2000,alt:'Simple cup flashcard for babies'},
  {order:3,file:'03-spoon.webp',w:1414,h:2000,alt:'Simple spoon flashcard for babies'},
  {order:4,file:'04-bottle.webp',w:1414,h:2000,alt:'Simple bottle flashcard for babies'},
  {order:5,file:'05-apple.webp',w:1414,h:2000,alt:'Simple apple flashcard for babies'},
  {order:6,file:'06-banana.webp',w:1414,h:2000,alt:'Simple banana flashcard for babies'},
  {order:7,file:'07-cat.webp',w:1414,h:2000,alt:'Simple cat flashcard for babies'},
  {order:8,file:'08-dog.webp',w:1414,h:2000,alt:'Simple dog flashcard for babies'},
  {order:9,file:'09-bird.webp',w:1414,h:2000,alt:'Simple bird flashcard for babies'},
  {order:10,file:'10-car.webp',w:1414,h:2000,alt:'Simple car flashcard for babies'},
  {order:11,file:'11-teddy-bear.webp',w:1414,h:2000,alt:'Simple teddy bear flashcard for babies'},
  {order:12,file:'12-baby-face.webp',w:1414,h:2000,alt:'Simple baby face flashcard for babies'}
 ],
 howTo:{heading:'How to use this activity',paragraphs:[
  'Choose a time when your baby is awake, calm and comfortable. Show one picture at a time and name what you see using simple, natural language. For example, say ‘ball’ or ‘Here is the ball.’ Give your baby time to look and listen.',
  'Repeat words naturally, smile, and respond to your baby’s sounds and expressions. There is no need to test your baby or expect them to say the words.',
  'Keep the activity short and stop when your baby looks away, becomes tired or loses interest.'
 ],note:'<strong>Every baby develops differently.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines.'},
 tryTogether:['Ball. Look at the ball.','Here is your cup.','Can you see the dog?','Hello, baby!'],
 pills:{heading:'Where to next?',items:[['Baby classes','/baby/'],['4–6 Months','/baby/4-6-months/'],['Talk','/subjects/talk/']]},
 pathNav:{prev:{title:'Colors & First Objects',range:'3–4 Months',href:'/baby/3-4-months/colors-and-first-objects/'},next:{title:'Animals & Everyday Objects',range:'6–9 Months',href:'/baby/6-9-months/animals-everyday-objects/'}},
 hubBlurb:'Everyday objects, foods, animals and a friendly face — name what you see together and let the first words grow. Two to five calm minutes.',
 schema:{level:'Infant (4–6 months)',teaches:'First words, listening and early language through familiar objects',audience:'Parents of babies',keywords:'first words flashcards, familiar objects for babies, baby talking activities, 4-6 months baby flashcards'}
};
export const aeoLesson={
 path:'/baby/6-9-months/animals-everyday-objects/',
 seoTitle:'Animals & Everyday Objects for Babies 6–9 Months',
 title:'Animals & Everyday Objects for Babies 6–9 Months',
 h1:'Animals & Everyday Objects for Babies 6–9 Months',
 description:'Explore animal and everyday-object flashcards for babies 6–9 months, with simple parent-led activities for looking, listening and early recognition.',
 ogAlt:'Cover of the Kiddo School Explorer 1 class Animals and Everyday Objects for babies 6 to 9 months, with a cat, a dog and a ball',
 ogImage:lessonsBase+'animals-everyday-objects-6-9-months/cover.webp',
 schemaImage:lessonsBase+'animals-everyday-objects-6-9-months/cover.webp',
 eyebrow:'EXPLORER 1 · LESSON 5',
 crumbs:[['Baby','/baby/'],['6–9 Months','/baby/6-9-months/'],['Animals & Everyday Objects','/baby/6-9-months/animals-everyday-objects/']],
 chips:[['Age','6–9 Months'],['Subject','Talk &amp; Think'],['Class','Explorer 1'],['Duration','3–5 minutes']],
 ledes:['Around six to nine months, babies reach for what interests them, light up at familiar pictures and love a funny animal sound. This class pairs twelve realistic animals with everyday objects — a cat, a dog, a bird, a fish, a duck, a cow, then a ball, a shoe, a cup, a spoon, a car and a teddy bear — shown one at a time while you name what you see and play with simple sounds.',
  'There is no script and nothing to test. Your baby looks and listens, you talk and play, and every little connection — woof, moo, ball, cup — grows early recognition at your baby’s own pace. Short, playful sessions of three to five minutes are all it takes.'],
 startHint:'Twelve cards, one at a time. Name each picture and add an animal sound if you like — short and playful wins.',
 viewerLabel:'Today’s class: twelve animal and everyday-object cards',
 viewerHeading:'Twelve cards, one at a time.',
 folder:'animals-everyday-objects-6-9-months/',
 eagerFirst:false,
 cover:{file:'cover.webp',w:1414,h:2000,alt:'Cover of the Animals and Everyday Objects class for babies 6 to 9 months: a cat, a dog and a ball with the Explorer 1 Talk & Think label from Kiddo School'},
 cards:[
  {order:1,file:'01-cat.webp',w:1414,h:2000,alt:'Realistic cat flashcard for babies'},
  {order:2,file:'02-dog.webp',w:1414,h:2000,alt:'Realistic dog flashcard for babies'},
  {order:3,file:'03-bird.webp',w:1414,h:2000,alt:'Realistic bird flashcard for babies'},
  {order:4,file:'04-fish.webp',w:1414,h:2000,alt:'Realistic fish flashcard for babies'},
  {order:5,file:'05-duck.webp',w:1414,h:2000,alt:'Realistic duck flashcard for babies'},
  {order:6,file:'06-cow.webp',w:1414,h:2000,alt:'Realistic cow flashcard for babies'},
  {order:7,file:'07-ball.webp',w:1414,h:2000,alt:'Ball flashcard for babies'},
  {order:8,file:'08-shoe.webp',w:1414,h:2000,alt:'Shoe flashcard for babies'},
  {order:9,file:'09-cup.webp',w:1414,h:2000,alt:'Cup flashcard for babies'},
  {order:10,file:'10-spoon.webp',w:1414,h:2000,alt:'Spoon flashcard for babies'},
  {order:11,file:'11-car.webp',w:1414,h:2000,alt:'Car flashcard for babies'},
  {order:12,file:'12-teddy-bear.webp',w:1414,h:2000,alt:'Teddy bear flashcard for babies'}
 ],
 howTo:{heading:'How to use this activity',paragraphs:[
  'Sit with your baby when they are awake and comfortable. Show one card at a time and clearly name what you see. Keep your language simple: ‘cat’, ‘dog’, ‘ball’ or ‘Here is the cup.’',
  'For animals, you can also make a simple sound such as ‘woof’ or ‘moo’. For everyday objects, point out the real object later when you see it together.',
  'Give your baby time to look, listen and respond in their own way. There is no need to ask them to identify or name the pictures.',
  'Keep the activity short and stop when your baby loses interest.'
 ],note:'<strong>Every baby develops differently.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines.'},
 tryTogether:['Dog. Woof woof!','Look, a bird.','Here is the ball.','That’s a cup.','Can you see the cow? Moo!'],
 realWorld:{heading:'Find It in Real Life',copy:'Learning can continue away from the screen. When you see one of these animals or objects during your day, point it out and name it naturally.',examples:['See a dog → “Dog!”','Hold baby’s cup → “Your cup.”','Pick up a shoe → “Shoe.”','See a bird outside → “Bird!”']},
 pills:{heading:'Where to next?',items:[['Baby classes','/baby/'],['6–9 Months','/baby/6-9-months/'],['Talk &amp; Think','/subjects/talk-and-think/']]},
 pathNav:{prev:{title:'First Words & Familiar Things',range:'4–6 Months',href:'/baby/4-6-months/first-words-familiar-things/'},next:{title:'First Actions & Body Parts',range:'9–12 Months',href:'/baby/9-12-months/first-actions-body-parts/'}},
 hubBlurb:'Realistic animals alongside a ball, a shoe, a cup and more — name them, add the sounds, and let early recognition grow. Three to five playful minutes.',
 schema:{level:'Infant (6–9 months)',teaches:'Early recognition, listening and first thinking skills through animals and everyday objects',audience:'Parents of babies',keywords:'animal flashcards for babies, everyday objects flashcards, baby talking activities, 6-9 months baby flashcards'}
};
export const fabLesson={
 path:'/baby/9-12-months/first-actions-body-parts/',
 seoTitle:'Body Parts & First Actions for Babies 9–12 Months',
 title:'First Actions & Body Parts for Babies 9–12 Months',
 h1:'First Actions & Body Parts for Babies 9–12 Months',
 description:'Explore body-part and action flashcards for babies 9–12 months, with simple parent-led activities for looking, listening, copying and connecting words with actions.',
 ogAlt:'Cover of the Kiddo School Explorer 2 class First Actions and Body Parts for babies 9 to 12 months, with a baby hand, foot and clapping hands',
 ogImage:lessonsBase+'first-actions-body-parts-9-12-months/cover.webp',
 schemaImage:lessonsBase+'first-actions-body-parts-9-12-months/cover.webp',
 eyebrow:'EXPLORER 2 · LESSON 6',
 crumbs:[['Baby','/baby/'],['9–12 Months','/baby/9-12-months/'],['First Actions & Body Parts','/baby/9-12-months/first-actions-body-parts/']],
 chips:[['Age','9–12 Months'],['Subject','Talk &amp; Think'],['Class','Explorer 2'],['Duration','3–5 minutes']],
 ledes:['Between nine and twelve months, babies become little copiers: they wave, clap, point and love it when you name what they are doing. This class uses twelve simple cards — a hand, a foot, eyes, a nose, a mouth, then clapping, waving, eating, drinking, sleeping, pointing and smiling — shown one at a time while you say the word or do the action together.',
  'There is no script and nothing to test. You talk and play, your baby looks and moves, and the words for their little body and everyday actions grow out of real, happy moments. Short sessions of three to five minutes are all it takes.'],
 startHint:'Twelve cards, one at a time. Say the word, do the action — copy-me play wins at this age.',
 viewerLabel:'Today’s class: twelve body-part and action cards',
 viewerHeading:'Twelve cards, one at a time.',
 folder:'first-actions-body-parts-9-12-months/',
 eagerFirst:false,
 cover:{file:'cover.webp',w:1414,h:2000,alt:'Cover of the First Actions and Body Parts class for babies 9 to 12 months: a baby hand, foot and clapping hands with the Explorer 2 Talk & Think label from Kiddo School'},
 cards:[
  {order:1,file:'01-hand.webp',w:1414,h:2000,alt:'Open hand visual card for babies'},
  {order:2,file:'02-foot.webp',w:1414,h:2000,alt:'Baby foot visual card for babies'},
  {order:3,file:'03-eyes.webp',w:1414,h:2000,alt:'Baby eyes visual card'},
  {order:4,file:'04-nose.webp',w:1414,h:2000,alt:'Nose visual card for babies'},
  {order:5,file:'05-mouth.webp',w:1414,h:2000,alt:'Baby mouth visual card'},
  {order:6,file:'06-clapping.webp',w:794,h:1123,alt:'Baby clapping hands'},
  {order:7,file:'07-waving.webp',w:794,h:1123,alt:'Baby waving a hand'},
  {order:8,file:'08-eating.webp',w:794,h:1123,alt:'Baby eating'},
  {order:9,file:'09-drinking.webp',w:794,h:1123,alt:'Baby drinking'},
  {order:10,file:'10-sleeping.webp',w:794,h:1123,alt:'Sleeping baby'},
  {order:11,file:'11-pointing.webp',w:794,h:1123,alt:'Baby pointing with an index finger'},
  {order:12,file:'12-smiling.webp',w:1414,h:2000,alt:'Smiling baby face'}
 ],
 howTo:{heading:'How to use this activity',paragraphs:[
  'Sit with your baby when they are awake, comfortable and interested. Show one card at a time and say the word or action naturally. Keep your language short and clear.',
  'For example: ‘Hand.’ ‘These are eyes.’ ‘Clap, clap!’ ‘Wave bye-bye.’ ‘Baby is sleeping.’',
  'When possible, connect the picture to your baby’s own body or to an action you can do together. For example, say ‘hand’ while gently showing your own hand, or clap your hands while saying ‘clap’.',
  'Give your baby time to look, listen, move or respond in their own way. There is no need to test them or expect them to copy every action.',
  'Keep the activity short and stop when your baby loses interest.'
 ],note:'<strong>Every baby develops differently.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines.'},
 tryTogether:['Where are your hands? Here are your hands.','Clap, clap!','Wave bye-bye.','Point!','Smile!','Time to sleep.'],
 realWorld:{heading:'Practice in Real Life',copy:'Continue the lesson naturally during your day.',examples:['During dressing: “Foot.”','During bath time: “Hand.”','When someone leaves: “Wave bye-bye.”','During play: “Clap, clap!”','When baby smiles: “Smile!”']},
 pills:{heading:'Where to next?',items:[['Baby classes','/baby/'],['9–12 Months','/baby/9-12-months/'],['Talk &amp; Think','/subjects/talk-and-think/']]},
 pathNav:{prev:{title:'Animals & Everyday Objects',range:'6–9 Months',href:'/baby/6-9-months/animals-everyday-objects/'},next:{title:'First Words: Food & Home',range:'12–18 Months',href:'/toddler/12-18-months/first-words-food-home/'}},
 hubBlurb:'Body parts and first actions — hand, foot, clapping, waving — say the word, do the action, and let your little copier join in. Three to five playful minutes.',
 schema:{level:'Infant (9–12 months)',teaches:'Body-part words, first actions, listening and copying through everyday play',audience:'Parents of babies',keywords:'body parts flashcards for babies, first actions flashcards, baby pointing clapping activities, 9-12 months baby flashcards'}
};
export const fwfhLesson={
 path:'/toddler/12-18-months/first-words-food-home/',
 seoTitle:'First Words for Toddlers 12–18 Months: Food & Home',
 title:'First Words: Food & Home for Toddlers 12–18 Months',
 h1:'First Words: Food & Home for Toddlers 12–18 Months',
 description:'Explore simple food and home vocabulary flashcards for toddlers 12–18 months, with familiar objects and easy parent-led naming activities.',
 ogAlt:'Cover of the Kiddo School Toddler 1 class First Words: Food and Home for toddlers 12 to 18 months, with an apple, a banana and a cup',
 ogImage:lessonsBase+'first-words-food-home-12-18-months/cover.webp',
 schemaImage:lessonsBase+'first-words-food-home-12-18-months/cover.webp',
 eyebrow:'TODDLER 1 · LESSON 7',
 crumbs:[['Toddler','/toddler/'],['12–18 Months','/toddler/12-18-months/'],['First Words: Food & Home','/toddler/12-18-months/first-words-food-home/']],
 chips:[['Age','12–18 Months'],['Subject','Talk &amp; Think'],['Class','Toddler 1'],['Duration','3–5 minutes']],
 ledes:['Between twelve and eighteen months, toddlers point at everything, understand far more than they can say and love hearing you name their world. This class pairs twelve everyday pictures — an apple, a banana, an orange, a cup of milk, bread, an egg, then a cup, a spoon, a shoe, a sock, a chair and a bed — shown one at a time while you say the word simply and clearly.',
  'There is no script and nothing to test. You name it, your toddler looks, points or has a go in their own way, and every calm repetition — apple, cup, shoe, bed — feeds those growing first words. Short, playful sessions of three to five minutes are all it takes.'],
 startHint:'Twelve cards, one at a time. Name it, pause, and let your toddler answer in their own way.',
 viewerLabel:'Today’s class: twelve food and home cards',
 viewerHeading:'Twelve cards, one at a time.',
 folder:'first-words-food-home-12-18-months/',
 eagerFirst:false,
 cover:{file:'cover.webp',w:1414,h:2000,alt:'Cover of the First Words: Food and Home class for toddlers 12 to 18 months: an apple, a banana and a cup with the Toddler 1 Talk & Think label from Kiddo School'},
 cards:[
  {order:1,file:'01-apple.webp',w:1414,h:2000,alt:'Realistic red apple flashcard for toddlers'},
  {order:2,file:'02-banana.webp',w:1414,h:2000,alt:'Realistic banana flashcard for toddlers'},
  {order:3,file:'03-orange.webp',w:1414,h:2000,alt:'Realistic orange fruit flashcard for toddlers'},
  {order:4,file:'04-milk-cup.webp',w:1414,h:2000,alt:'Cup of milk flashcard for toddlers'},
  {order:5,file:'05-bread.webp',w:1414,h:2000,alt:'Bread flashcard for toddlers'},
  {order:6,file:'06-egg.webp',w:1414,h:2000,alt:'Egg flashcard for toddlers'},
  {order:7,file:'07-cup.webp',w:1414,h:2000,alt:'Cup flashcard for toddlers'},
  {order:8,file:'08-spoon.webp',w:1414,h:2000,alt:'Spoon flashcard for toddlers'},
  {order:9,file:'09-shoe.webp',w:1414,h:2000,alt:'Child shoe flashcard for toddlers'},
  {order:10,file:'10-sock.webp',w:1414,h:2000,alt:'Child sock flashcard for toddlers'},
  {order:11,file:'11-chair.webp',w:1414,h:2000,alt:'Child chair flashcard for toddlers'},
  {order:12,file:'12-bed.webp',w:1414,h:2000,alt:'Toddler bed flashcard for toddlers'}
 ],
 howTo:{heading:'How to use this activity',paragraphs:[
  'Show one picture at a time and clearly name what you see. Keep your words short and natural: ‘apple’, ‘banana’, ‘shoe’ or ‘This is your cup.’',
  'Pause after saying the word and give your toddler time to look, point, gesture, make a sound or respond in their own way.',
  'When possible, connect the picture with the real object. If you show the spoon card, find a spoon at home and name it again.',
  'There is no need to test your toddler or require them to repeat every word.'
 ],note:'<strong>Every child develops differently.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines.'},
 tryTogether:['Apple. This is an apple.','Banana. Yum!','Here is your cup.','Spoon.','Where is your shoe?','Bed. Time for sleep.'],
 realWorld:{heading:'Find It at Home',copy:'Turn the flashcards into a real-world activity. After looking at a card, find the same object around your home when appropriate.',examples:['Spoon → find a spoon.','Cup → find your toddler’s cup.','Shoe → find a shoe.','Sock → find a sock.','Chair → point to a chair.','Bed → point to the bed.']},
 pills:{heading:'Where to next?',items:[['Toddler classes','/toddler/'],['12–18 Months','/toddler/12-18-months/'],['Talk &amp; Think','/subjects/talk-and-think/']]},
 pathNav:{prev:{title:'First Actions & Body Parts',range:'9–12 Months',href:'/baby/9-12-months/first-actions-body-parts/'},next:{title:'First Concepts — Big, Small, Up & Down',range:'18–24 Months',href:'/toddler/18-24-months/first-concepts-big-small-up-down/'}},
 hubBlurb:'Everyday foods and home things — apple, cup, spoon, bed — name them, pause, and let the first words grow. Three to five playful minutes.',
 schema:{level:'Toddler (12–18 months)',teaches:'First food and home words, pointing, naming and shared attention',audience:'Parents of toddlers',keywords:'toddler first words flashcards, food words for toddlers, home objects flashcards, 12-18 months toddler activities'}
};
export const fcLesson={
 path:'/toddler/18-24-months/first-concepts-big-small-up-down/',
 seoTitle:'First Concepts for Toddlers 18–24 Months | Big, Small, Up & Down',
 title:'First Concepts for Toddlers 18–24 Months',
 h1:'First Concepts for Toddlers: Big, Small, Up & Down',
 description:'Teach toddlers ages 18–24 months simple early concepts including big and small, up and down, open and closed, full and empty, one and many, and in and out.',
 ogAlt:'Cover of the Kiddo School Toddler 2 class First Concepts: Big, Small, Up and Down for toddlers 18 to 24 months, with a big red ball and a small red ball',
 ogImage:toddlerBase+'first-concepts-18-24-months/cover.webp',
 schemaImage:toddlerBase+'first-concepts-18-24-months/cover.webp',
 eyebrow:'TODDLER 2 · LESSON 8',
 crumbs:[['Toddler','/toddler/'],['18–24 Months','/toddler/18-24-months/'],['First Concepts','/toddler/18-24-months/first-concepts-big-small-up-down/']],
 chips:[['Age','18–24 Months'],['Subject','Think &amp; Talk'],['Class','Toddler 2'],['Duration','3–5 minutes']],
 ledes:['Around eighteen to twenty-four months, toddlers love spotting differences: the big ball and the little ball, the box that opens and shuts, the cup that is full and then empty. This class uses twelve realistic pictures arranged in six concept pairs — big and small, up and down, open and closed, full and empty, one and many, in and out — shown one at a time in exact pair order, so each opposite appears right after its partner and the comparison is easy to see.',
  'There is no script and nothing to test. Show a pair, say the concepts clearly — ‘Big. Small.’ — and give your toddler time to look at the difference. Short, playful sessions of three to five minutes are all it takes.'],
 startHint:'Twelve cards, one at a time, in six matching pairs. Say each concept clearly — short and playful wins.',
 viewerLabel:'Today’s class: twelve first-concept cards',
 viewerHeading:'Twelve cards, one at a time.',
 folder:'first-concepts-18-24-months/',
 r2Base:toddlerBase,
 eagerFirst:false,
 cover:{file:'cover.webp',w:1414,h:2000,alt:'Cover of the First Concepts class for toddlers 18 to 24 months: a big red ball and a small red ball with the Toddler 2 Think and Talk label from Kiddo School'},
 cards:[
  {order:1,concept:'Big',file:'01-big.webp',w:1414,h:2000,alt:'Large object demonstrating the concept big for toddlers'},
  {order:2,concept:'Small',file:'02-small.webp',w:1414,h:2000,alt:'Small object demonstrating the concept small for toddlers'},
  {order:3,concept:'Up',file:'03-up.webp',w:1414,h:2000,alt:'Object positioned up for toddler concept learning'},
  {order:4,concept:'Down',file:'04-down.webp',w:1414,h:2000,alt:'Object positioned down for toddler concept learning'},
  {order:5,concept:'Open',file:'05-open.webp',w:1414,h:2000,alt:'Open object demonstrating the concept open for toddlers'},
  {order:6,concept:'Closed',file:'06-closed.webp',w:1414,h:2000,alt:'Closed object demonstrating the concept closed for toddlers'},
  {order:7,concept:'Full',file:'07-full.webp',w:1414,h:2000,alt:'Full container demonstrating the concept full for toddlers'},
  {order:8,concept:'Empty',file:'08-empty.webp',w:1414,h:2000,alt:'Empty container demonstrating the concept empty for toddlers'},
  {order:9,concept:'One',file:'09-one.webp',w:1414,h:2000,alt:'One object demonstrating the concept one for toddlers'},
  {order:10,concept:'Many',file:'10-many.webp',w:1414,h:2000,alt:'Multiple objects demonstrating the concept many for toddlers'},
  {order:11,concept:'In',file:'11-in.webp',w:1414,h:2000,alt:'Object inside a container demonstrating the concept in for toddlers'},
  {order:12,concept:'Out',file:'12-out.webp',w:1414,h:2000,alt:'Object outside a container demonstrating the concept out for toddlers'}
 ],
 howTo:{heading:'How to Teach First Concepts',paragraphs:[
  'Show the two cards in a pair one after the other and say the concept clearly. For example: ‘Big. Small.’ Give your toddler time to look at the difference.',
  'Repeat the concepts naturally using real objects and everyday moments. You can show a big ball and a small ball, open and close a box, or point out when a cup is full or empty.',
  'Keep the activity playful. Your toddler does not need to name every concept or answer questions correctly.'
 ],note:'<strong>Every child develops differently.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines.'},
 tryTogether:['Big ball. Small ball.','Up! Now down.','Open the box. Close the box.','The cup is full. Now it’s empty.','One duck. Many ducks.','The ball is in. Now the ball is out.'],
 realWorld:{heading:'Practice Around the House',copy:'Keep these activities parent-supervised and simple.',examples:['Big &amp; Small: Find one big object and one small object.','Up &amp; Down: Lift a toy up, then bring it down.','Open &amp; Closed: Open and close a safe box or container together.','Full &amp; Empty: Show a cup with water and an empty cup during an appropriate supervised activity.','One &amp; Many: Show one toy, then a small group of toys.','In &amp; Out: Put a toy in a basket, then take it out.']},
 pills:{heading:'Where to next?',items:[['Toddler classes','/toddler/'],['18–24 Months','/toddler/18-24-months/'],['Think &amp; Talk','/subjects/talk-and-think/']]},
 pathNav:{prev:{title:'First Words: Food & Home',range:'12–18 Months',href:'/toddler/12-18-months/first-words-food-home/'},next:null},
 hubBlurb:'Big and small, up and down, full and empty — six concept pairs in realistic pictures, ready for a short game of say it and look. Three to five playful minutes.',
 schema:{level:'Toddler (18–24 months)',teaches:'Early concepts and opposites through clear visual comparison',audience:'Parents of toddlers',keywords:'first concepts flashcards for toddlers, big and small, opposites for toddlers, toddler comparison activities, 18-24 months activities'}
};
export const lessons=[hcLesson,fvLesson,cfoLesson,fwftLesson,aeoLesson,fabLesson,fwfhLesson,fcLesson];
export function classLessonSchema(site,L){
 return [
  {'@context':'https://schema.org','@type':'LearningResource',name:L.title,description:L.description,url:site+L.path,image:L.schemaImage,inLanguage:'en',learningResourceType:'Interactive baby class',educationalLevel:L.schema.level,isAccessibleForFree:true,educationalUse:'Home learning activity',teaches:L.schema.teaches,audience:{'@type':'Audience',audienceType:L.schema.audience},keywords:L.schema.keywords},
  {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[['Home','/'],...L.crumbs].map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:site+path}))}
 ];
}
const crumbNav=crumbs=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${crumbs.map(([label,href],i)=>`<span aria-hidden="true">/</span>${i===crumbs.length-1?`<span aria-current="page">${esc(label)}</span>`:`<a href="${href}">${esc(label)}</a>`}`).join('')}</nav>`;
export function classLessonBody(L){
 const heroInner=`<span class="eyebrow">${L.eyebrow}</span>
  <h1>${esc(L.h1)}</h1>
  <div class="fc-chips lesson-chips">${L.chips.map(([k,v])=>`<span><strong>${k}</strong> ${v}</span>`).join('')}</div>
  ${L.ledes.map(p=>`<p class="lesson-lede">${p}</p>`).join('\n  ')}
  <div class="lesson-start"><a class="button" href="#todays-class" data-lv-start>Start Today’s Class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">${L.startHint}</span></div>`;
 const hero=L.cover?`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy">${heroInner}</div><figure class="lesson-cover"><img src="${L.ogImage}" width="${L.cover.w}" height="${L.cover.h}" alt="${L.cover.alt}"></figure></article>`:`<article class="wrap lesson-hero">${heroInner}</article>`;
 const viewer=`<section class="wrap lesson-section" id="todays-class" aria-label="${L.viewerLabel}">
  <span class="eyebrow">TODAY’S CLASS</span>
  <h2>${L.viewerHeading}</h2>
  <div class="lv-frame" data-lesson-viewer>
   <div class="lv-stage" data-lv-stage></div>
   <div class="lv-controls" data-lv-controls><button type="button" class="lv-btn" data-lv-prev>Previous</button><span class="lv-count" data-lv-count aria-live="polite" aria-atomic="true">Card 1 of ${L.cards.length}</span><button type="button" class="lv-btn" data-lv-next>Next</button></div>
   <div class="lv-actions" data-lv-actions><button type="button" class="lv-btn lv-ghost" data-lv-full>Full screen</button><button type="button" class="lv-btn lv-ghost" data-lv-finish>Finish</button></div>
   <div class="lv-begin"><button type="button" class="button" data-lv-start>Start Today’s Class</button><span class="lv-beginhint">Or simply scroll: all ${L.cards.length} cards are below.</span></div>
   <p class="lv-done" data-lv-done hidden><strong>Class complete — well done.</strong> However many cards your baby saw, however long it took, that was a full class. Rest is part of it too.</p>
  </div>
  <div class="lv-grid" data-lv-grid>${L.cards.map(c=>`<figure class="lv-card">${img((L.r2Base||lessonsBase)+L.folder,c.file,c.w,c.h,c.alt,L.eagerFirst&&c.order===1)}</figure>`).join('')}</div>
 </section>`;
 const howTo=`<section class="wrap lesson-section" id="how-to">
  <span class="eyebrow">PARENT INSTRUCTIONS</span>
  <h2>${L.howTo.heading}</h2>
  ${L.howTo.steps?`<ol class="fc-steps">${L.howTo.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${String(i+1).padStart(2,'0')}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>`:''}
  ${L.howTo.paragraphs?L.howTo.paragraphs.map(p=>`<p class="lesson-copy">${p}</p>`).join('\n  '):''}
  <p class="lesson-note">${L.howTo.note}</p>
 </section>`;
 const tryTogether=L.tryTogether?`<section class="wrap lesson-section">
  <span class="eyebrow">TRY TOGETHER</span>
  <h2>Little things to say.</h2>
  <p class="fc-hint">Prompts for you, not for the cards — say them softly while your baby looks.</p>
  <ul class="lesson-prompts">${L.tryTogether.map(p=>`<li>${p}</li>`).join('')}</ul>
 </section>`:'';
 const realWorld=L.realWorld?`<section class="wrap lesson-section">
  <span class="eyebrow">REAL-WORLD CONNECTION</span>
  <h2>${L.realWorld.heading}</h2>
  <p class="lesson-copy">${L.realWorld.copy}</p>
  <ul class="lesson-prompts">${L.realWorld.examples.map(p=>`<li>${p}</li>`).join('')}</ul>
 </section>`:'';
 const why=L.why?`<section class="wrap lesson-section fc-why"><span class="eyebrow">THE LITTLE BIT OF LEARNING</span><h2>Why black and white?</h2><p>${L.why}</p></section>`:'';
 const pills=L.pills?`<section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>${L.pills.heading}</h2><div class="lesson-linkrow">${L.pills.items.map(([label,href])=>`<a class="lesson-pill-link" href="${href}">${label}</a>`).join('')}</div>${L.pills.after||''}</section>`:'';
 const pathCard=(kind,n)=>n?`<a class="fc-stage lesson-card-link" href="${n.href}"><div class="fc-stage-pills"><span class="fc-age">${kind}</span><span class="fc-class">${esc(n.range)}</span></div><h3>${esc(n.title)}</h3><span class="fc-open">Open this class <span aria-hidden="true">↗</span></span></a>`:`<div class="fc-stage lesson-soon"><div class="fc-stage-pills"><span class="fc-age">Next lesson</span><span class="fc-class">Coming soon</span></div><h3>Coming soon</h3><p>The next class on this path is still on the drawing table.</p></div>`;
 const pathNav=L.pathNav?`<section class="wrap lesson-section"><span class="eyebrow">YOUR CLASS PATH</span><h2>Keep going, step by step.</h2><div class="lesson-path">${pathCard('Previous lesson',L.pathNav.prev)}${pathCard('Next lesson',L.pathNav.next)}</div></section>`:'';
 return `${crumbNav(L.crumbs)}
 ${hero}
 ${viewer}
 ${howTo}
 ${tryTogether}${realWorld?`\n ${realWorld}`:''}
 ${why}
 ${pills}
 ${pathNav}`;
}
export function lessonStageCard(L,pillLeft,pillRight){
 return `<a class="fc-stage lesson-card-link" href="${L.path}"><div class="fc-stage-pills"><span class="fc-age">${pillLeft}</span><span class="fc-class">${pillRight}</span></div><h3>${esc(L.h1.split(' for ')[0])}</h3><p>${L.hubBlurb}</p><span class="fc-open">Start today’s class <span aria-hidden="true">↗</span></span></a>`;
}
export function stagePageBody({chips,stageLessons,soon,subject}){
 return `<section class="wrap section compact"><div class="fc-chips lesson-chips">${chips.map(([k,v])=>`<span><strong>${k}</strong> ${v}</span>`).join('')}</div>
 <div class="fc-stages">${stageLessons.map(L=>lessonStageCard(L,'Lesson '+(lessons.indexOf(L)+1),subject||'See')).join('')}${soon||''}</div>
 <p class="lesson-note"><strong>Every baby develops differently.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines.</p></section>`;
}
