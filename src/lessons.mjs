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
 ledes:['Around four to six months, babies babble back, laugh at familiar faces and start to connect the sounds you make with the things they see. This class uses eleven simple familiar-object flashcards — a ball, a cup, a spoon, a bottle, an apple, a banana, a cat, a dog, a bird, a car and a teddy bear — shown one at a time while you name what you see in your own words.',
  'There is no script and nothing to test. You talk, your baby listens, and the little everyday names — ball, cup, dog, hello — slowly grow into your baby’s first words. Short, calm sessions of two to five minutes are all it takes.'],
 startHint:'Eleven cards, one at a time. Name each picture in your own words — short and natural wins.',
 viewerLabel:'Today’s class: eleven familiar-object cards',
 viewerHeading:'Eleven cards, one at a time.',
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
  {order:11,file:'11-teddy-bear.webp',w:1414,h:2000,alt:'Simple teddy bear flashcard for babies'}
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
 ogImage:lessonsBase+'animals-everyday-objects-6-9-months/01-cat.webp',
 schemaImage:lessonsBase+'animals-everyday-objects-6-9-months/01-cat.webp',
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
 cover:{file:'01-cat.webp',w:1414,h:2000,alt:'The cat card that fronts the Animals and Everyday Objects class for babies 6 to 9 months — a realistic cat portrait from Kiddo School'},
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
 ledes:['Between twelve and eighteen months, toddlers point at everything, understand far more than they can say and love hearing you name their world. This class pairs eleven everyday pictures — an apple, a banana, an orange, a cup of milk, bread, an egg, then a cup, a spoon, a shoe, a sock and a chair — shown one at a time while you say the word simply and clearly.',
  'There is no script and nothing to test. You name it, your toddler looks, points or has a go in their own way, and every calm repetition — apple, cup, shoe, chair — feeds those growing first words. Short, playful sessions of three to five minutes are all it takes.'],
 startHint:'Eleven cards, one at a time. Name it, pause, and let your toddler answer in their own way.',
 viewerLabel:'Today’s class: eleven food and home cards',
 viewerHeading:'Eleven cards, one at a time.',
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
  {order:11,file:'11-chair.webp',w:1414,h:2000,alt:'Child chair flashcard for toddlers'}
 ],
 howTo:{heading:'How to use this activity',paragraphs:[
  'Show one picture at a time and clearly name what you see. Keep your words short and natural: ‘apple’, ‘banana’, ‘shoe’ or ‘This is your cup.’',
  'Pause after saying the word and give your toddler time to look, point, gesture, make a sound or respond in their own way.',
  'When possible, connect the picture with the real object. If you show the spoon card, find a spoon at home and name it again.',
  'There is no need to test your toddler or require them to repeat every word.'
 ],note:'<strong>Every child develops differently.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines.'},
 tryTogether:['Apple. This is an apple.','Banana. Yum!','Here is your cup.','Spoon.','Where is your shoe?','Sock. Peek-a-boo toes.'],
 realWorld:{heading:'Find It at Home',copy:'Turn the flashcards into a real-world activity. After looking at a card, find the same object around your home when appropriate.',examples:['Spoon → find a spoon.','Cup → find your toddler’s cup.','Shoe → find a shoe.','Sock → find a sock.','Chair → point to a chair.','Orange → find an orange in the fruit bowl.']},
 pills:{heading:'Where to next?',items:[['Toddler classes','/toddler/'],['12–18 Months','/toddler/12-18-months/'],['Talk &amp; Think','/subjects/talk-and-think/']]},
 pathNav:{prev:{title:'First Actions & Body Parts',range:'9–12 Months',href:'/baby/9-12-months/first-actions-body-parts/'},next:{title:'First Concepts — Big, Small, Up & Down',range:'18–24 Months',href:'/toddler/18-24-months/first-concepts-big-small-up-down/'}},
 hubBlurb:'Everyday foods and home things — apple, cup, spoon, chair — name them, pause, and let the first words grow. Three to five playful minutes.',
 schema:{level:'Toddler (12–18 months)',teaches:'First food and home words, pointing, naming and shared attention',audience:'Parents of toddlers',keywords:'toddler first words flashcards, food words for toddlers, home objects flashcards, 12-18 months toddler activities'}
};
export const fcLesson={
 path:'/toddler/18-24-months/first-concepts-big-small-up-down/',
 seoTitle:'First Concepts for Toddlers 18–24 Months | Big, Small, Up & Down',
 title:'First Concepts for Toddlers 18–24 Months',
 h1:'First Concepts for Toddlers: Big, Small, Up & Down',
 description:'Teach toddlers ages 18–24 months simple early concepts including big and small, up and down, open and closed, full and empty, one and many, and in.',
 ogAlt:'Cover of the Kiddo School Toddler 2 class First Concepts: Big, Small, Up and Down for toddlers 18 to 24 months, with a big red ball and a small red ball',
 ogImage:toddlerBase+'first-concepts-18-24-months/cover.webp',
 schemaImage:toddlerBase+'first-concepts-18-24-months/cover.webp',
 eyebrow:'TODDLER 2 · LESSON 8',
 crumbs:[['Toddler','/toddler/'],['18–24 Months','/toddler/18-24-months/'],['First Concepts','/toddler/18-24-months/first-concepts-big-small-up-down/']],
 chips:[['Age','18–24 Months'],['Subject','Think &amp; Talk'],['Class','Toddler 2'],['Duration','3–5 minutes']],
 ledes:['Around eighteen to twenty-four months, toddlers love spotting differences: the big ball and the little ball, the box that opens and shuts, the cup that is full and then empty. This class uses eleven realistic pictures arranged in concept pairs — big and small, up and down, open and closed, full and empty, one and many, and in — shown one at a time in pair order, so each opposite appears right after its partner and the comparison is easy to see. Then the last game continues off screen: put a toy in a basket, take it out, and do it again.',
  'There is no script and nothing to test. Show a pair, say the concepts clearly — ‘Big. Small.’ — and give your toddler time to look at the difference. Short, playful sessions of three to five minutes are all it takes.'],
 startHint:'Eleven cards, one at a time, in matching pairs. Say each concept clearly — short and playful wins.',
 viewerLabel:'Today’s class: eleven first-concept cards',
 viewerHeading:'Eleven cards, one at a time.',
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
  {order:11,concept:'In',file:'11-in.webp',w:1414,h:2000,alt:'Object inside a container demonstrating the concept in for toddlers'}
 ],
 howTo:{heading:'How to Teach First Concepts',paragraphs:[
  'Show the two cards in a pair one after the other and say the concept clearly. For example: ‘Big. Small.’ Give your toddler time to look at the difference.',
  'Repeat the concepts naturally using real objects and everyday moments. You can show a big ball and a small ball, open and close a box, or point out when a cup is full or empty.',
  'Keep the activity playful. Your toddler does not need to name every concept or answer questions correctly.'
 ],note:'<strong>Every child develops differently.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines.'},
 tryTogether:['Big ball. Small ball.','Up! Now down.','Open the box. Close the box.','The cup is full. Now it’s empty.','One duck. Many ducks.','The ball is in the basket. Now take it out!'],
 realWorld:{heading:'Practice Around the House',copy:'Keep these activities parent-supervised and simple.',examples:['Big &amp; Small: Find one big object and one small object.','Up &amp; Down: Lift a toy up, then bring it down.','Open &amp; Closed: Open and close a safe box or container together.','Full &amp; Empty: Show a cup with water and an empty cup during an appropriate supervised activity.','One &amp; Many: Show one toy, then a small group of toys.','In &amp; Out: Put a toy in a basket, then take it out.']},
 pills:{heading:'Where to next?',items:[['Toddler classes','/toddler/'],['18–24 Months','/toddler/18-24-months/'],['Think &amp; Talk','/subjects/talk-and-think/']]},
 pathNav:{prev:{title:'First Words: Food & Home',range:'12–18 Months',href:'/toddler/12-18-months/first-words-food-home/'},next:{title:'Colors & Shapes',range:'Age 2',href:'/toddler/2-years/colors-and-shapes/'}},
 hubBlurb:'Big and small, up and down, full and empty — concept pairs in realistic pictures, ready for a short game of say it and look. Three to five playful minutes.',
 schema:{level:'Toddler (18–24 months)',teaches:'Early concepts and opposites through clear visual comparison',audience:'Parents of toddlers',keywords:'first concepts flashcards for toddlers, big and small, opposites for toddlers, toddler comparison activities, 18-24 months activities'}
};
export const csLesson={
 path:'/toddler/2-years/colors-and-shapes/',
 seoTitle:'Colors and Shapes for 2-Year-Olds',
 title:'Colors and Shapes for 2-Year-Olds (Toddler 3)',
 h1:'Colors and Shapes for 2-Year-Olds',
 description:'Explore colors and basic shapes with your 2-year-old through simple visual learning, matching games and playful real-world activities from Kiddo School.',
 ogAlt:'Cover of the Kiddo School Toddler 3 class Colors and Shapes for 2-year-olds, with a red circle, a blue square and a yellow star',
 ogImage:toddlerBase+'colors-and-shapes-age-2/learning-cards/cover.webp',
 schemaImage:toddlerBase+'colors-and-shapes-age-2/learning-cards/cover.webp',
 eyebrow:'TODDLER 3 · LESSON 9',
 crumbs:[['Toddler','/toddler/'],['Age 2','/toddler/2-years/'],['Colors & Shapes','/toddler/2-years/colors-and-shapes/']],
 chips:[['Age','2 Years'],['Subject','Think &amp; Talk'],['Class','Toddler 3'],['Duration','3–5 minutes']],
 ledes:['At two, everyday life becomes a classroom: the red cup, the round plate, the square window. This class explores eight colors and seven shapes through a short sequence your toddler can join in — look at the cards together, play a few big-button find-it games, match a pair, then take the learning off screen and find colors and shapes around your home.',
  'There is no reading required and nothing to test. You say the words, your toddler taps and points, and every round ends in encouragement, never a score. Short, playful sessions of three to five minutes are all it takes.'],
 startHint:'Look, play, match, then head off screen. Short and playful wins.',
 viewerLabel:'Today’s class: colors and shapes for two-year-olds',
 viewerHeading:'Today’s class.',
 folder:'colors-and-shapes-age-2/learning-cards/',
 r2Base:toddlerBase,
 eagerFirst:false,
 cover:{file:'cover.webp',w:1414,h:2000,alt:'Colors and Shapes class for 2-year-olds at Kiddo School'},
 cards:[
  {order:1,file:'01-red.webp',w:1414,h:2000,alt:'Red color learning card for toddlers'},
  {order:2,file:'02-blue.webp',w:1414,h:2000,alt:'Blue color learning card for toddlers'},
  {order:3,file:'03-yellow.webp',w:1414,h:2000,alt:'Yellow color learning card for toddlers'},
  {order:4,file:'04-green.webp',w:1414,h:2000,alt:'Green color learning card for toddlers'},
  {order:5,file:'05-orange.webp',w:1414,h:2000,alt:'Orange color learning card for toddlers'},
  {order:6,file:'06-purple.webp',w:1414,h:2000,alt:'Purple color learning card for toddlers'},
  {order:7,file:'07-pink.webp',w:1414,h:2000,alt:'Pink color learning card for toddlers'},
  {order:8,file:'08-black.webp',w:1414,h:2000,alt:'Black color learning card for toddlers'},
  {order:9,file:'09-circle.webp',w:1414,h:2000,alt:'Circle shape learning card for toddlers'},
  {order:10,file:'10-square.webp',w:1414,h:2000,alt:'Square shape learning card for toddlers'},
  {order:11,file:'11-triangle.webp',w:1414,h:2000,alt:'Triangle shape learning card for toddlers'},
  {order:12,file:'12-rectangle.webp',w:2000,h:1414,alt:'Rectangle shape learning card for toddlers'},
  {order:13,file:'13-star.webp',w:2000,h:1414,alt:'Star shape learning card for toddlers'},
  {order:14,file:'14-heart.webp',w:2000,h:1414,alt:'Heart shape learning card for toddlers'},
  {order:15,file:'15-oval.webp',w:2000,h:1414,alt:'Oval shape learning card for toddlers'}
 ],
 interactive:{
  colors:[
   {file:'01-red.webp',w:1414,h:2000,alt:'Red color learning card for toddlers',say:'Red.',find:'Can you find something red?'},
   {file:'02-blue.webp',w:1414,h:2000,alt:'Blue color learning card for toddlers',say:'Blue.',find:'Can you find something blue?'},
   {file:'03-yellow.webp',w:1414,h:2000,alt:'Yellow color learning card for toddlers',say:'Yellow.',find:'Can you find something yellow?'},
   {file:'04-green.webp',w:1414,h:2000,alt:'Green color learning card for toddlers',say:'Green.',find:'Can you find something green?'},
   {file:'05-orange.webp',w:1414,h:2000,alt:'Orange color learning card for toddlers',say:'Orange.',find:'Can you find something orange?'},
   {file:'06-purple.webp',w:1414,h:2000,alt:'Purple color learning card for toddlers',say:'Purple.',find:'Can you find something purple?'},
   {file:'07-pink.webp',w:1414,h:2000,alt:'Pink color learning card for toddlers',say:'Pink.',find:'Can you find something pink?'},
   {file:'08-black.webp',w:1414,h:2000,alt:'Black color learning card for toddlers',say:'Black.',find:'Can you find something black?'}
  ],
  shapes:[
   {file:'09-circle.webp',w:1414,h:2000,alt:'Circle shape learning card for toddlers',say:'Circle.',find:'Can you trace the circle in the air with your finger?'},
   {file:'10-square.webp',w:1414,h:2000,alt:'Square shape learning card for toddlers',say:'Square.',find:'Can you trace the square in the air with your finger?'},
   {file:'11-triangle.webp',w:1414,h:2000,alt:'Triangle shape learning card for toddlers',say:'Triangle.',find:'Can you trace the triangle in the air with your finger?'},
   {file:'12-rectangle.webp',w:2000,h:1414,alt:'Rectangle shape learning card for toddlers',say:'Rectangle.',find:'Can you trace the rectangle in the air with your finger?'},
   {file:'13-star.webp',w:2000,h:1414,alt:'Star shape learning card for toddlers',say:'Star.',find:'Can you twinkle like a star?'},
   {file:'14-heart.webp',w:2000,h:1414,alt:'Heart shape learning card for toddlers',say:'Heart.',find:'Can you draw a heart on my hand?'},
   {file:'15-oval.webp',w:2000,h:1414,alt:'Oval shape learning card for toddlers',say:'Oval.',find:'Can you trace the oval in the air with your finger?'}
  ],
  playColors:{rounds:[
   {ask:'Find red.',say:'Red. Can you find red?',choices:[{file:'01-red.webp',name:'Red',correct:true},{file:'03-yellow.webp',name:'Yellow'},{file:'02-blue.webp',name:'Blue'}]},
   {ask:'Where is blue?',say:'Blue. Where is blue?',choices:[{file:'02-blue.webp',name:'Blue',correct:true},{file:'04-green.webp',name:'Green'},{file:'07-pink.webp',name:'Pink'}]},
   {ask:'Can you find yellow?',say:'Yellow. Can you find yellow?',choices:[{file:'03-yellow.webp',name:'Yellow',correct:true},{file:'08-black.webp',name:'Black'},{file:'05-orange.webp',name:'Orange'}]}
  ]},
  playShapes:{rounds:[
   {ask:'Find the circle.',say:'Find the circle.',choices:[{file:'09-circle.webp',name:'Circle',correct:true},{file:'10-square.webp',name:'Square'},{file:'13-star.webp',name:'Star'}]},
   {ask:'Which one is the star?',say:'Which one is the star?',choices:[{file:'13-star.webp',name:'Star',correct:true},{file:'14-heart.webp',name:'Heart'},{file:'11-triangle.webp',name:'Triangle'}]},
   {ask:'Can you find the triangle?',say:'Can you find the triangle?',choices:[{file:'11-triangle.webp',name:'Triangle',correct:true},{file:'12-rectangle.webp',name:'Rectangle'},{file:'15-oval.webp',name:'Oval'}]}
  ]},
  matchColor:{rounds:[
   {ask:'Find the same color.',say:'Here is blue. Find the same color.',target:{file:'02-blue.webp',name:'Blue'},choices:[{file:'02-blue.webp',name:'Blue',correct:true},{file:'04-green.webp',name:'Green'}]},
   {ask:'Find the same color.',say:'Here is pink. Find the same color.',target:{file:'07-pink.webp',name:'Pink'},choices:[{file:'07-pink.webp',name:'Pink',correct:true},{file:'03-yellow.webp',name:'Yellow'}]}
  ]},
  matchShape:{rounds:[
   {ask:'Find the same shape.',say:'Here is the circle. Find the same shape.',target:{file:'09-circle.webp',name:'Circle'},choices:[{file:'09-circle.webp',name:'Circle',correct:true},{file:'11-triangle.webp',name:'Triangle'}]},
   {ask:'Find the same shape.',say:'Here is the heart. Find the same shape.',target:{file:'14-heart.webp',name:'Heart'},choices:[{file:'14-heart.webp',name:'Heart',correct:true},{file:'10-square.webp',name:'Square'}]}
  ]},
  offScreen:{heading:'Find colors and shapes around you.',copy:'The class continues away from the screen. Pick one or two hunts during the day and keep them playful — there is nothing to collect and nothing to prove.',colorHunt:['Can you find something red?','Find something blue.','Can you spot something yellow?'],shapeHunt:['Can you find a circle in the room? A plate, a clock or a wheel is a good place to start.','Can you find something shaped like a rectangle? Try a book, a door or a box.'],note:'Keep hunts short and stay close by. Any noticing counts — naming one red thing together is a complete class.'},
  teacher:{welcome:'Today we’re exploring colors and shapes! Let’s look, find and play together.',note:'Colors and shapes are everywhere. Keep naming the ones you notice together today.'},
  principal:{note:'Short, playful moments are enough. Use these printable activities whenever you’d like to continue exploring away from the screen.'},
  complete:{heading:'Class complete!',copy:'Nice exploring colors and shapes together.'},
  tips:{heading:'Tips for parents.',items:[
   'Let your child lead. Some two-year-olds will tap eagerly, others would rather watch you tap for a while. Both are doing the class.',
   'Say the color or shape name clearly and keep it short: ‘Red.’ ‘Circle.’ Repetition over days matters more than getting through everything today.',
   'Wrong taps are part of playing. The class never shows a score, a cross or a fail — a gentle ‘let’s look together’ keeps it fun.',
   'Stop while it is still fun. If your toddler wanders off, the class is done for now; you can always come back tomorrow.',
   '<strong>Age ranges are a guide.</strong> Kiddo School classes are invitations to explore, not tests or developmental deadlines. Children learn at their own pace.'
  ]}
 },
 printables:{
  heading:'Download &amp; Print.',
  intro:'Continue the class away from the screen with printable color cards, shape cards, matching activities and simple hunts to explore together.',
  pack:'Colors &amp; Shapes Printable Activity Pack',
  meta:'Age 2 · Toddler 3 · Think &amp; Talk',
  audience:'Made for you to print and use with your child — eight pages, one activity per page.',
  folder:'colors-and-shapes-age-2/printables/',
  note:'Printing tip: use your browser’s Print button and choose “Fit to page” on A4 or Letter paper. The pack prints one activity per page, in order — no account, and nothing to install.',
  pages:[
   {file:'01-cover.webp',title:'Cover',alt:'Colors and Shapes printable activity pack for 2-year-olds'},
   {file:'02-color-cards.webp',title:'Color Cards',alt:'Printable color cards for toddlers with labeled colors'},
   {file:'03-shape-cards.webp',title:'Shape Cards',alt:'Printable shape cards for toddlers with labeled basic shapes'},
   {file:'04-match-the-colors.webp',title:'Match the Colors',alt:'Match the Colors printable activity for 2-year-olds'},
   {file:'05-match-the-shapes.webp',title:'Match the Shapes',alt:'Match the Shapes printable activity for 2-year-olds'},
   {file:'06-color-hunt.webp',title:'Color Hunt',alt:'Color Hunt printable activity for toddlers'},
   {file:'07-shape-hunt.webp',title:'Shape Hunt',alt:'Shape Hunt printable activity for toddlers'},
   {file:'08-take-it-off-screen.webp',title:'Take It Off Screen',alt:'Take It Off Screen colors and shapes activity for toddlers'}
  ]
 },
 howTo:{heading:'Tips for Parents',paragraphs:[
  'Sit together in a comfortable spot and let your child hold or tap where they can. Start with the color cards, say each color clearly, and pause — the pause is where your toddler answers in their own way.',
  'Keep the games light. A wrong tap is simply a chance to look together, and every round ends with encouragement rather than a score.',
  'When the on-screen games are done, take the class off screen: hunt for colors and shapes around your home during an everyday moment.',
  'There is no need to finish every section in one sitting, and no need for your toddler to name every color or shape.'
 ],note:'<strong>Age ranges are a guide.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines. Children learn at their own pace.'},
 pills:{heading:'Where to next?',items:[['Toddler classes','/toddler/'],['Age 2','/toddler/2-years/'],['Think &amp; Talk','/subjects/talk-and-think/']]},
 pathNav:{prev:{title:'First Concepts — Big, Small, Up & Down',range:'18–24 Months',href:'/toddler/18-24-months/first-concepts-big-small-up-down/'},next:{title:'Matching & Sorting',range:'Age 2',href:'/toddler/2-years/matching-and-sorting/'}},
 hubBlurb:'Eight colors, seven shapes, big-button find-it games and real-world hunts — a first interactive class made for two-year-old hands. Three to five playful minutes.',
 schema:{level:'Toddler (age 2)',teaches:'Color names, shape names and early matching through look, find and match play',audience:'Parents of toddlers',keywords:'colors and shapes for 2 year olds, toddler color activities, shapes for toddlers, matching games for toddlers, toddler learning activities'}
};
export const msLesson={
 path:'/toddler/2-years/matching-and-sorting/',
 seoTitle:'Matching and Sorting for 2-Year-Olds',
 title:'Matching and Sorting for 2-Year-Olds (Toddler 4)',
 h1:'Matching and Sorting for 2-Year-Olds',
 description:'Explore matching and sorting with your 2-year-old through simple visual activities for colors, shapes, everyday objects and things that belong together.',
 ogAlt:'Cover of the Kiddo School Toddler 4 class Matching and Sorting for 2-year-olds, with a shape-sorter box and three matching blocks',
 ogImage:toddlerBase+'matching-and-sorting-age-2/learning-cards/cover.webp',
 schemaImage:toddlerBase+'matching-and-sorting-age-2/learning-cards/cover.webp',
 eyebrow:'TODDLER 4 · LESSON 10',
 crumbs:[['Toddler','/toddler/'],['Age 2','/toddler/2-years/'],['Matching & Sorting','/toddler/2-years/matching-and-sorting/']],
 chips:[['Age','2 Years'],['Subject','Think &amp; Talk'],['Class','Toddler 4'],['Duration','3–5 minutes']],
 ledes:['By two, children notice that things match: two balls, two cups, two socks that go on two feet. This class turns that noticing into a short game — looking at same and different, finding the match, sorting by color and shape, grouping fruit and animals, and spotting the one that is different.',
  'There is no reading and nothing to test. You ask the question, your toddler taps or points, and every round ends in encouragement, never a score. Three to five playful minutes is plenty.'],
 startHint:'Look, find, sort, then head off screen. Short and playful wins.',
 viewerLabel:'Today’s class: matching and sorting for two-year-olds',
 viewerHeading:'Today’s class.',
 folder:'matching-and-sorting-age-2/learning-cards/',
 r2Base:toddlerBase,
 eagerFirst:false,
 cover:{file:'cover.webp',w:1414,h:2000,alt:'Matching and Sorting class for 2-year-olds at Kiddo School'},
 cards:[
  {order:1,file:'01-same-balls.webp',w:1414,h:2000,alt:'Two matching red balls for a toddler same-and-match activity'},
  {order:2,file:'02-same-apples.webp',w:1414,h:2000,alt:'Two matching red apples for a toddler matching activity'},
  {order:3,file:'03-same-cups.webp',w:1414,h:2000,alt:'Two matching blue cups for a toddler matching activity'},
  {order:4,file:'04-different-apple-banana.webp',w:1414,h:2000,alt:'Apple and banana for a toddler same-and-different activity'},
  {order:5,file:'05-different-animals.webp',w:1414,h:2000,alt:'Cat and dog for a toddler same-and-different activity'},
  {order:6,file:'06-different-shapes.webp',w:1414,h:2000,alt:'Circle and triangle for a toddler different-shapes activity'},
  {order:7,file:'07-match-red.webp',w:1414,h:2000,alt:'Red color matching activity with visual choices'},
  {order:8,file:'08-match-blue.webp',w:1414,h:2000,alt:'Blue color matching activity with visual choices'},
  {order:9,file:'09-match-circle.webp',w:1414,h:2000,alt:'Circle matching activity with basic shape choices'},
  {order:10,file:'10-match-triangle.webp',w:1414,h:2000,alt:'Triangle matching activity with basic shape choices'},
  {order:11,file:'11-sort-by-color.webp',w:1414,h:2000,alt:'Red and blue objects for a toddler sorting-by-color activity'},
  {order:12,file:'12-sort-by-shape.webp',w:1414,h:2000,alt:'Circles and squares for a toddler sorting-by-shape activity'},
  {order:13,file:'13-fruit-together.webp',w:1414,h:2000,alt:'Apple, banana, car and shoe for a toddler grouping activity'},
  {order:14,file:'14-animals-together.webp',w:1414,h:2000,alt:'Cat, dog, cup and ball for a toddler grouping activity'},
  {order:15,file:'15-odd-one-out.webp',w:1414,h:2000,alt:'Three bananas and one apple for a toddler odd-one-out activity'}
 ],
 interactive:{
  flow:{intro:'Seven little steps, in order: a welcome from your teacher, same and different, find the match, sort together, what belongs together, find the different one, then take it off screen. Stop after any step — that is a complete class, and there is never a score at the end.',
   steps:[['1','Teacher welcome'],['2','Same &amp; different'],['3','Find the match'],['4','Sort together'],['5','What belongs together'],['6','Find the different one'],['7','Take it off screen']],
   beginHref:'#same-different',beginHint:'Grown-up nearby, toddler on the lap, phone at a comfy distance.'},
  teacher:{welcome:'Today we’re going to find things that match and things that are different. Let’s look together!',note:'Matching happens everywhere. Try noticing things that are the same, different or belong together during your day.'},
  principal:{note:'There’s no need to turn matching into a test. Notice patterns together during play, tidying up, getting dressed and everyday routines.'},
  complete:{heading:'Class complete!',copy:'Nice matching and sorting together.'},
  offScreen:{heading:'Take it off screen.',copy:'Let’s find things that belong together. The class continues in real life with ordinary household objects — pick one or two during the day and keep it playful. Nothing to buy, nothing to collect and nothing to prove.',groups:[
   {title:'A matching hunt',items:['Find two matching socks.','Find two spoons.','Put two red toys together.','Find two things that are the same shape.','Put toy animals together.','Find one object that is different from the others.']}
  ],note:'Stay close by and follow your child’s lead. Any noticing counts — finding two matching socks together is a complete class.'},
  sections:[
   {type:'learn',id:'same-different',eyebrow:'LEARN · SAME &amp; DIFFERENT',heading:'Same and different.',copy:'Six cards to look at together: three pairs that are the same, three pairs that are different. Say what you see in your own words and pause — the questions are for you, and nothing here is a quiz.',label:'same and different',items:[
    {file:'01-same-balls.webp',say:'Look — these are the same.',find:'Can you point to both balls?'},
    {file:'02-same-apples.webp',say:'These two match.',find:'Can you touch each apple as you say apple?'},
    {file:'03-same-cups.webp',say:'Look — two same cups.',find:'Can you point to both cups?'},
    {file:'04-different-apple-banana.webp',say:'An apple and a banana.',find:'Are these the same or different?'},
    {file:'05-different-animals.webp',say:'A cat and a dog.',find:'Are these the same or different?'},
    {file:'06-different-shapes.webp',say:'A circle and a triangle.',find:'Look at what is different.'}
   ]},
   {type:'prompt',id:'find-match',eyebrow:'PLAY · FIND THE MATCH',heading:'Find the match.',copy:'One big picture up top, then tap the answer underneath. Say the question in your own words and let your child take their time — every round ends in encouragement, never a score.',rounds:[
    {ask:'Can you find the red one?',say:'Here is red. Can you find the red one below?',file:'07-match-red.webp',correct:1,positions:['The red ball','The blue ball','The yellow ball']},
    {ask:'Find the blue square.',say:'Here is blue. Find the blue square below.',file:'08-match-blue.webp',correct:2,positions:['The yellow square','The blue square','The red square']},
    {ask:'Which one matches the circle?',say:'Here is a circle. Which one matches the circle below?',file:'09-match-circle.webp',correct:2,positions:['The triangle','The circle','The square']},
    {ask:'Can you find the triangle?',say:'Here is a triangle. Can you find the triangle below?',file:'10-match-triangle.webp',correct:3,positions:['The circle','The square','The triangle']}
   ]},
   {type:'learn',id:'sort-together',eyebrow:'SORT TOGETHER',heading:'Sorting colors and shapes.',copy:'Sorting starts gently: noticing that some things go together and some do not. Talk through each card in your own words — pointing, helping and finishing each other’s taps is all playing.',label:'sorting',items:[
    {file:'11-sort-by-color.webp',say:'Two red balls, two blue balls.',find:'Which ones are the same color? Can we put the red ones together?'},
    {file:'12-sort-by-shape.webp',say:'Circles here, squares there.',find:'Which shapes belong together? Can you find the two circles?'}
   ]},
   {type:'match',id:'belongs',eyebrow:'WHAT BELONGS TOGETHER?',heading:'What belongs together?',copy:'Show the big picture, then ask which one shows the things that belong together. Fruit stay together and animals stay together — naming the group is enough for a two-year-old.',rounds:[
    {ask:'Which picture shows the fruit?',say:'Apple and banana are fruit. Which picture shows the fruit together?',target:{file:'13-fruit-together.webp',name:'Fruit together'},choices:[{file:'13-fruit-together.webp',name:'Fruit together',correct:true},{file:'14-animals-together.webp',name:'Animals together'}]},
    {ask:'Which picture shows the animals?',say:'Cat and dog are animals. Which picture shows the animals together?',target:{file:'14-animals-together.webp',name:'Animals together'},choices:[{file:'14-animals-together.webp',name:'Animals together',correct:true},{file:'13-fruit-together.webp',name:'Fruit together'}]}
   ]},
   {type:'prompt',id:'different-one',eyebrow:'FIND THE DIFFERENT ONE',heading:'Find the different one.',copy:'Three bananas and one apple. Ask your child which one is different, then tap the answer together — first, second, third or fourth. Pointing at the picture and tapping along counts too.',rounds:[
    {ask:'Which one is different?',say:'Three bananas and one apple. Which one is different?',file:'15-odd-one-out.webp',correct:4,positions:['A banana','A banana','A banana','The apple']}
   ]}
  ]
 },
 howTo:{heading:'Tips for Parents',paragraphs:[
  'Sit together where your child can see and reach. Start with the same-and-different cards, say what you see out loud, and pause — the pause is where your toddler answers in their own way.',
  'The tap games use big numbered buttons under each picture. Read the question, then let your child tap. A wrong tap is simply a chance to look together; the class never shows a score, a cross or a fail.',
  'Sorting language stays simple: same, different, match, together. You do not need category words like fruit or animal — although hearing them in passing is a bonus, not a lesson.',
  'When the on-screen games are done, take the class off screen: match the socks, sort the spoons, find the toy that is different during tidy-up time.',
  'There is no need to finish every section in one sitting, and no need for your toddler to name every color or shape.'
 ],note:'<strong>Age ranges are a guide.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines. Children learn at their own pace.'},
 pills:{heading:'Where to next?',items:[['Toddler classes','/toddler/'],['Age 2','/toddler/2-years/'],['Think &amp; Talk','/subjects/talk-and-think/']]},
 pathNav:{prev:{title:'Colors & Shapes',range:'Age 2',href:'/toddler/2-years/colors-and-shapes/'},next:{title:'Animals & Sounds',range:'Age 2',href:'/toddler/2-years/animals-and-sounds/'}},
 hubBlurb:'Same and different, big-button find-the-match games, gentle sorting and an odd-one-out finish — noticing relationships, made for two-year-old hands. Three to five playful minutes.',
 schema:{resourceType:'Interactive toddler class',level:'Toddler (age 2)',teaches:'Same and different, matching colors and shapes, sorting and grouping, and spotting the odd one out through look, find and sort play',audience:'Parents of toddlers',keywords:'matching and sorting for 2 year olds, toddler matching activities, sorting activities for toddlers, same and different activities, odd one out for toddlers, toddler learning activities'}
};
export const anLesson={
 path:'/toddler/2-years/animals-and-sounds/',
 seoTitle:'Animals and Sounds for 2-Year-Olds',
 title:'Animals and Sounds for 2-Year-Olds (Toddler 5)',
 h1:'Animals and Sounds for 2-Year-Olds',
 description:'Meet twenty animals and make their sounds together. Farm friends, wild animals and two gentle tap games, made for two-year-olds and their grown-ups.',
 ogAlt:'Cover of the Kiddo School Toddler 5 class Animals and Sounds for 2-year-olds, with a puppy, a cow, a kitten and a lamb',
 ogImage:toddlerBase+'animals-and-sounds-age-2/cover.webp',
 schemaImage:toddlerBase+'animals-and-sounds-age-2/cover.webp',
 eyebrow:'TODDLER 5 · LESSON 11',
 crumbs:[['Toddler','/toddler/'],['Age 2','/toddler/2-years/'],['Animals & Sounds','/toddler/2-years/animals-and-sounds/']],
 chips:[['Age','2 Years'],['Subject','Talk &amp; Explore'],['Class','Toddler 5'],['Duration','3–5 minutes']],
 subject:'Talk &amp; Explore',
 ledes:['Moo, woof, quack! At two, animal sounds are a game your toddler can already play. This class meets twenty animals — farm friends, wild ones and a few little extras — with big cards, two tap games and sounds to try all day.',
  'There is no reading and nothing to test. You ask, your toddler answers — with the sound, the name, a point or a giggle. Three to five playful minutes is plenty.'],
 startHint:'Moo first. Your toddler will join in.',
 startLabel:'Start Class',
 viewerLabel:'Today’s class: animals and sounds for two-year-olds',
 viewerHeading:'Today’s class.',
 folder:'animals-and-sounds-age-2/',
 r2Base:toddlerBase,
 eagerFirst:false,
 cover:{file:'cover.webp',w:1414,h:2000,alt:'Animals and Sounds class for 2-year-olds at Kiddo School'},
 cards:[
  {order:1,file:'01-dog.webp',w:1414,h:2000,alt:'A dog saying woof for a toddler animal sounds activity'},
  {order:2,file:'02-cat.webp',w:1414,h:2000,alt:'A cat saying meow for a toddler animal sounds activity'},
  {order:3,file:'03-cow.webp',w:1414,h:2000,alt:'A cow saying moo for a toddler animal sounds activity'},
  {order:4,file:'04-duck.webp',w:1414,h:2000,alt:'A duck saying quack for a toddler animal sounds activity'},
  {order:5,file:'05-sheep.webp',w:1414,h:2000,alt:'A sheep saying baa for a toddler animal sounds activity'},
  {order:6,file:'06-pig.webp',w:1414,h:2000,alt:'A pig saying oink for a toddler animal sounds activity'},
  {order:7,file:'07-horse.webp',w:1414,h:2000,alt:'A horse saying neigh for a toddler animal sounds activity'},
  {order:8,file:'08-chicken.webp',w:1414,h:2000,alt:'A chicken saying cluck for a toddler animal sounds activity'},
  {order:9,file:'09-rooster.webp',w:1414,h:2000,alt:'A rooster saying cock-a-doodle-doo for a toddler animal sounds activity'},
  {order:10,file:'10-frog.webp',w:1414,h:2000,alt:'A frog saying ribbit for a toddler animal sounds activity'},
  {order:11,file:'11-lion.webp',w:1414,h:2000,alt:'A lion saying roar for a toddler animal sounds activity'},
  {order:12,file:'12-elephant.webp',w:1414,h:2000,alt:'An elephant trumpeting for a toddler animal sounds activity'},
  {order:13,file:'13-monkey.webp',w:1414,h:2000,alt:'A monkey saying ooh-ooh for a toddler animal sounds activity'},
  {order:14,file:'14-owl.webp',w:1414,h:2000,alt:'An owl saying hoot for a toddler animal sounds activity'},
  {order:15,file:'15-bee.webp',w:1414,h:2000,alt:'A bee saying buzz for a toddler animal sounds activity'},
  {order:16,file:'16-snake.webp',w:1414,h:2000,alt:'A snake hissing for a toddler animal sounds activity'},
  {order:17,file:'17-mouse.webp',w:1414,h:2000,alt:'A mouse saying squeak for a toddler animal sounds activity'},
  {order:18,file:'18-donkey.webp',w:1414,h:2000,alt:'A donkey saying hee-haw for a toddler animal sounds activity'},
  {order:19,file:'19-goat.webp',w:1414,h:2000,alt:'A goat saying baa for a toddler animal sounds activity'},
  {order:20,file:'20-bird.webp',w:1414,h:2000,alt:'A bird saying tweet for a toddler animal sounds activity'}
 ],
 interactive:{
  flow:{intro:'Seven little steps, in order: a welcome from your teacher, farm animals, a sounds game, wild animals, a find-it game, four more friends, then off screen. Every step stands on its own.',
   steps:[['1','Teacher welcome'],['2','Farm animals'],['3','Who says moo?'],['4','Wild animals'],['5','Find the animal'],['6','A few more friends'],['7','Take it off screen']],
   beginHref:'#farm-animals',beginLabel:'Meet the animals',beginHint:'Toddler on your lap, phone at a comfy distance.'},
  teacher:{welcome:'Let’s meet some animals! Can you make their sounds with me?',note:'If your child can’t make a sound yet, make it for them. Listening is learning too.'},
  principal:{note:'You don’t need to cover every card today. Follow what your child enjoys.'},
  complete:{heading:'Class complete!',copy:'Nice animal sounds together.'},
  offScreen:{heading:'Animals are everywhere.',copy:'Spot a bird outside? Listen together. Once you start listening, animals show up all day — no plan needed.',groups:[
   {title:'Try one today',items:[
    'Pass a dog on the way to the shop? Whisper woof.',
    'Moo at breakfast. Quack at bath time.',
    'Act out an animal. Can they guess which one?',
    'Reading an animal book? Make every sound together.'
   ]}
  ],note:'Keep it playful and stay close by. One animal noticed together is a complete class.'},
  sections:[
   {type:'learn',id:'farm-animals',eyebrow:'LEARN · FARM ANIMALS',heading:'Meet the farm animals.',copy:'Old friends first — the dog, the cat, the cow. Say the name, then make the sound together.',label:'the farm animals',items:[
    {file:'01-dog.webp',say:'The dog says woof.',find:'Your turn — woof woof!'},
    {file:'02-cat.webp',say:'The cat says meow.',find:'Can you say meow?'},
    {file:'03-cow.webp',say:'The cow says moo.',find:'Your turn — moo!'},
    {file:'04-duck.webp',say:'The duck says quack.',find:'Can you say quack?'},
    {file:'05-sheep.webp',say:'The sheep says baa.',find:'Your turn — baa!'},
    {file:'06-pig.webp',say:'The pig says oink.',find:'Can you oink?'},
    {file:'07-horse.webp',say:'The horse says neigh.',find:'Your turn — neigh!'},
    {file:'08-chicken.webp',say:'The chicken says cluck.',find:'Can you cluck?'},
    {file:'09-rooster.webp',say:'The rooster says cock-a-doodle-doo!',find:'A big one — try it together!'}
   ]},
   {type:'play',id:'who-says',eyebrow:'PLAY · WHO SAYS MOO?',heading:'Who says moo?',copy:'Say the sound out loud, then let your child tap the animal.',rounds:[
    {ask:'Who says moo?',say:'Moo!',choices:[{file:'01-dog.webp',name:'The dog'},{file:'03-cow.webp',name:'The cow',correct:true},{file:'04-duck.webp',name:'The duck'}]},
    {ask:'Who says quack?',say:'Who says quack?',choices:[{file:'02-cat.webp',name:'The cat'},{file:'05-sheep.webp',name:'The sheep'},{file:'04-duck.webp',name:'The duck',correct:true}]},
    {ask:'Who says woof?',say:'Who says woof?',choices:[{file:'01-dog.webp',name:'The dog',correct:true},{file:'06-pig.webp',name:'The pig'},{file:'03-cow.webp',name:'The cow'}]},
    {ask:'Who says meow?',say:'Who says meow?',choices:[{file:'07-horse.webp',name:'The horse'},{file:'02-cat.webp',name:'The cat',correct:true},{file:'09-rooster.webp',name:'The rooster'}]}
   ]},
   {type:'learn',id:'wild-animals',eyebrow:'LEARN · WILD ANIMALS',heading:'Meet the wild animals.',copy:'Now for the loud ones — roars and trumpets welcome.',label:'the wild animals',items:[
    {file:'10-frog.webp',say:'The frog says ribbit.',find:'Your turn — ribbit!'},
    {file:'11-lion.webp',say:'The lion says roar.',find:'A big roar — your turn!'},
    {file:'12-elephant.webp',say:'The elephant trumpets!',find:'Swing your arm like a trunk.'},
    {file:'13-monkey.webp',say:'The monkey says ooh-ooh!',find:'Your turn — ooh-ooh!'},
    {file:'14-owl.webp',say:'The owl says hoot.',find:'Can you hoot?'},
    {file:'15-bee.webp',say:'The bee says buzz.',find:'Your turn — buzz!'},
    {file:'16-snake.webp',say:'The snake says hiss.',find:'Your turn — hiss!'}
   ]},
   {type:'play',id:'find-animal',eyebrow:'PLAY · FIND THE ANIMAL',heading:'Find the animal.',copy:'Now by name. You say the animal, your child taps it.',rounds:[
    {ask:'Find the lion.',say:'Find the lion!',choices:[{file:'16-snake.webp',name:'The snake'},{file:'11-lion.webp',name:'The lion',correct:true},{file:'12-elephant.webp',name:'The elephant'}]},
    {ask:'Find the elephant.',say:'Find the elephant!',choices:[{file:'12-elephant.webp',name:'The elephant',correct:true},{file:'13-monkey.webp',name:'The monkey'},{file:'10-frog.webp',name:'The frog'}]},
    {ask:'Find the owl.',say:'Find the owl!',choices:[{file:'15-bee.webp',name:'The bee'},{file:'14-owl.webp',name:'The owl',correct:true},{file:'13-monkey.webp',name:'The monkey'}]},
    {ask:'Find the snake.',say:'Find the snake!',choices:[{file:'11-lion.webp',name:'The lion'},{file:'10-frog.webp',name:'The frog'},{file:'16-snake.webp',name:'The snake',correct:true}]}
   ]},
   {type:'learn',id:'more-animals',eyebrow:'LEARN · A FEW MORE FRIENDS',heading:'A few more friends.',copy:'Four friends to finish — including one very loud hee-haw.',label:'a few more friends',items:[
    {file:'17-mouse.webp',say:'The mouse says squeak.',find:'A tiny squeak — your turn!'},
    {file:'18-donkey.webp',say:'The donkey says hee-haw!',find:'Can you say hee-haw?'},
    {file:'19-goat.webp',say:'The goat says baa.',find:'Just like the sheep!'},
    {file:'20-bird.webp',say:'The bird says tweet.',find:'Tweet tweet — your turn!'}
   ]}
  ]
 },
 howTo:{heading:'Tips for Parents',paragraphs:[
  'Sounds come before names. Moo usually arrives before cow — both count as talking.',
  'Add the body: flap like a duck, gallop like a horse, stomp like an elephant. It all counts.',
  'A wrong tap is just a chance to look together. The class never shows a score or a cross.'
 ],note:'<strong>Age ranges are a guide.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines. Children learn at their own pace.'},
 pills:{heading:'Where to next?',items:[['Toddler classes','/toddler/'],['Age 2','/toddler/2-years/'],['Learning Path','/learning-path/']]},
 pathNav:{prev:{title:'Matching & Sorting',range:'Age 2',href:'/toddler/2-years/matching-and-sorting/'},next:{title:'Vehicles & Sounds',range:'Age 2',href:'/toddler/2-years/vehicles-and-sounds/'}},
 hubBlurb:'Twenty animals with big sounds and two tap games — meet the farm, roar with the wild ones, then listen for animals outside. Made for two-year-old hands.',
 schema:{resourceType:'Interactive toddler class',level:'Toddler (age 2)',teaches:'Animal names and their sounds through look, name and make-the-sound play',audience:'Parents of toddlers',keywords:'animal sounds for 2 year olds, animals for toddlers, animal sounds activity, animal names for toddlers, toddler learning activities'}
};
export const vhLesson={
 path:'/toddler/2-years/vehicles-and-sounds/',
 seoTitle:'Vehicles and Sounds for 2-Year-Olds',
 title:'Vehicles and Sounds for 2-Year-Olds (Toddler 6)',
 h1:'Vehicles and Sounds for 2-Year-Olds',
 description:'Explore cars, buses, trains and more with colorful vehicle cards, simple sound games and playful activities for 2-year-olds.',
 ogAlt:'Vehicles and Sounds class for 2-year-olds at Kiddo School',
 ogImage:toddlerBase+'vehicles-and-sounds-age-2/cover.webp',
 schemaImage:toddlerBase+'vehicles-and-sounds-age-2/cover.webp',
 eyebrow:'TODDLER 6 · LESSON 12',
 crumbs:[['Toddler','/toddler/'],['Age 2','/toddler/2-years/'],['Vehicles & Sounds','/toddler/2-years/vehicles-and-sounds/']],
 chips:[['Age','2 Years'],['Subject','Talk &amp; Explore'],['Class','Toddler 6'],['Duration','3–5 minutes']],
 subject:'Talk &amp; Explore',
 ledes:['Beep beep! Vroom! Choo choo! At two, vehicles are sound machines on wheels, wings and water — and this class meets twenty of them, with big cards and three quick games.',
  'Nothing to read and nothing to test. A sound in, a sound back — a tap, a point or a giggle all count. A few playful minutes is plenty.'],
 startHint:'Beep beep first. Works every time.',
 startLabel:'Start Class',
 folder:'vehicles-and-sounds-age-2/',
 r2Base:toddlerBase,
 eagerFirst:false,
 cover:{file:'cover.webp',w:2000,h:1294,alt:'Vehicles and Sounds class for 2-year-olds at Kiddo School'},
 cards:[
  {order:1,file:'01-car.webp',name:'Car',sound:'Beep beep!',w:2000,h:1294,alt:'Cartoon car learning card labeled Car with Beep beep'},
  {order:2,file:'02-bus.webp',name:'Bus',sound:'Beep beep!',w:2000,h:1294,alt:'Cartoon bus learning card labeled Bus with Beep beep'},
  {order:3,file:'03-truck.webp',name:'Truck',sound:'Rumble!',w:2000,h:1294,alt:'Cartoon truck learning card labeled Truck with Rumble'},
  {order:4,file:'04-fire-truck.webp',name:'Fire Truck',sound:'Nee-naw!',w:2000,h:1294,alt:'Cartoon fire truck learning card labeled Fire Truck with Nee-naw'},
  {order:5,file:'05-ambulance.webp',name:'Ambulance',sound:'Nee-naw!',w:2000,h:1294,alt:'Cartoon ambulance learning card labeled Ambulance with Nee-naw'},
  {order:6,file:'06-police-car.webp',name:'Police Car',sound:'Woo-woo!',w:2000,h:1294,alt:'Cartoon police car learning card labeled Police Car with Woo-woo'},
  {order:7,file:'07-motorcycle.webp',name:'Motorcycle',sound:'Vroom!',w:2000,h:1294,alt:'Cartoon motorcycle learning card labeled Motorcycle with Vroom'},
  {order:8,file:'08-bicycle.webp',name:'Bicycle',sound:'Ring ring!',w:2000,h:1294,alt:'Cartoon bicycle learning card labeled Bicycle with Ring ring'},
  {order:9,file:'09-train.webp',name:'Train',sound:'Choo choo!',w:2000,h:1294,alt:'Cartoon train learning card labeled Train with Choo choo'},
  {order:10,file:'10-tractor.webp',name:'Tractor',sound:'Rumble!',w:2000,h:1294,alt:'Cartoon tractor learning card labeled Tractor with Rumble'},
  {order:11,file:'11-excavator.webp',name:'Excavator',sound:'Dig dig!',w:2000,h:1294,alt:'Cartoon excavator learning card labeled Excavator with Dig dig'},
  {order:12,file:'12-dump-truck.webp',name:'Dump Truck',sound:'Rumble!',w:2000,h:1294,alt:'Cartoon dump truck learning card labeled Dump Truck with Rumble'},
  {order:13,file:'13-airplane.webp',name:'Airplane',sound:'Whoosh!',w:2000,h:1294,alt:'Cartoon airplane learning card labeled Airplane with Whoosh'},
  {order:14,file:'14-helicopter.webp',name:'Helicopter',sound:'Whirr!',w:2000,h:1294,alt:'Cartoon helicopter learning card labeled Helicopter with Whirr'},
  {order:15,file:'15-boat.webp',name:'Boat',sound:'Splash!',w:2000,h:1294,alt:'Cartoon boat learning card labeled Boat with Splash'},
  {order:16,file:'16-ship.webp',name:'Ship',sound:'Toot toot!',w:2000,h:1294,alt:'Cartoon ship learning card labeled Ship with Toot toot'},
  {order:17,file:'17-rocket.webp',name:'Rocket',sound:'Whoosh!',w:2000,h:1294,alt:'Cartoon rocket learning card labeled Rocket with Whoosh'},
  {order:18,file:'18-taxi.webp',name:'Taxi',sound:'Beep beep!',w:2000,h:1294,alt:'Cartoon taxi learning card labeled Taxi with Beep beep'},
  {order:19,file:'19-van.webp',name:'Van',sound:'Vroom!',w:2000,h:1294,alt:'Cartoon van learning card labeled Van with Vroom'},
  {order:20,file:'20-scooter.webp',name:'Scooter',sound:'Zoom!',w:2000,h:1294,alt:'Kick scooter learning card labeled Scooter with Zoom'}
 ],
 interactive:{
  flow:{intro:'Ten little steps, in order: a welcome from your teacher, the vehicles in three small groups, three quick games, then a hunt off screen and cards to print. Every step stands on its own.',
   steps:[['1','Teacher welcome'],['2','Meet the vehicles'],['3','Make the sounds'],['4','Vehicles that work'],['5','Who makes this sound?'],['6','Boats, planes and a rocket'],['7','Find the vehicle'],['8','Where does it go?'],['9','Take it off screen'],['10','Print the cards']],
   beginHref:'#meet-the-vehicles',beginLabel:'Meet the vehicles',beginHint:'Toddler on your lap, phone at a comfy distance.'},
  teacher:{welcome:'Let’s meet some vehicles! Can you make their sounds with me?',note:'Keep naming the vehicles you notice together today.'},
  principal:{note:'Your child doesn’t need to learn every card today. Follow what catches their interest.'},
  complete:{heading:'Class complete!',copy:'Nice beeps, toots and choo choos together.'},
  offScreen:{heading:'Vehicle hunt.',copy:'Look out the window or take a walk. Spot a car, bus or truck and name it together.',groups:[
   {title:'Try one today',items:[
    'Count the buses you see.',
    'Listen for a beep.',
    'Pretend to drive a car.',
    'Make a train go choo choo.',
    'Spot something that flies.'
   ]}
  ],note:'Keep it playful and stay close by. One spotted bus is a complete class.'},
  sections:[
   {type:'learn',id:'meet-the-vehicles',eyebrow:'LEARN · MEET THE VEHICLES',heading:'Meet the vehicles.',copy:'Cars and rescue friends first. Say the name and the sound, then let your toddler have a go.',label:'the vehicles',items:[
    {file:'01-car.webp',say:'The car goes beep beep.',find:'Your turn — beep beep!'},
    {file:'02-bus.webp',say:'The bus goes beep beep as well.',find:'Can you beep like a bus?'},
    {file:'03-truck.webp',say:'The truck goes rumble.',find:'Rumble rumble — your turn!'},
    {file:'04-fire-truck.webp',say:'The fire truck goes nee-naw!',find:'Nee-naw, nee-naw!'},
    {file:'05-ambulance.webp',say:'The ambulance goes nee-naw too.',find:'Nee-naw — louder!'},
    {file:'06-police-car.webp',say:'The police car goes woo-woo.',find:'Woo-woo — your turn!'}
   ]},
   {type:'learn',id:'make-the-sounds',eyebrow:'PLAY · MAKE THE SOUNDS',heading:'Make the sounds.',copy:'Five sounds to try. Make it big, wait a beat, and see what comes back.',label:'the sounds',items:[
    {file:'01-car.webp',say:'Beep beep!',find:'Can you beep like a car?'},
    {file:'09-train.webp',say:'Choo choo!',find:'Choo choo — louder!'},
    {file:'07-motorcycle.webp',say:'Vroom!',find:'Vroom vroom — your turn!'},
    {file:'16-ship.webp',say:'Toot toot!',find:'Can you toot like a big ship?'},
    {file:'14-helicopter.webp',say:'Whirr!',find:'Whirr — round and round!'}
   ]},
   {type:'learn',id:'working-vehicles',eyebrow:'LEARN · VEHICLES THAT WORK',heading:'Vehicles that work.',copy:'Wheels, tracks and diggers. These ones rumble, ring and dig.',label:'the working vehicles',items:[
    {file:'07-motorcycle.webp',say:'The motorcycle goes vroom!',find:'Vroom — your turn!'},
    {file:'08-bicycle.webp',say:'The bicycle goes ring ring.',find:'Ring ring — your turn!'},
    {file:'09-train.webp',say:'The train goes choo choo!',find:'You made this sound — choo choo!'},
    {file:'10-tractor.webp',say:'The tractor goes rumble.',find:'Slow and loud — rumble!'},
    {file:'11-excavator.webp',say:'The excavator goes dig dig.',find:'Dig with your hands — dig dig!'},
    {file:'12-dump-truck.webp',say:'The dump truck goes rumble too.',find:'A big rumble — can you do it?'}
   ]},
   {type:'play',id:'who-makes-this-sound',eyebrow:'PLAY · WHO MAKES THIS SOUND?',heading:'Who makes this sound?',copy:'Say the sound out loud, then let your child tap the vehicle.',rounds:[
    {ask:'Who goes choo choo?',say:'Who goes choo choo?',choices:[{file:'06-police-car.webp',name:'The police car'},{file:'09-train.webp',name:'The train',correct:true},{file:'03-truck.webp',name:'The truck'}]},
    {ask:'Who goes beep beep?',say:'Who goes beep beep?',choices:[{file:'01-car.webp',name:'The car',correct:true},{file:'15-boat.webp',name:'The boat'},{file:'10-tractor.webp',name:'The tractor'}]},
    {ask:'Who goes vroom?',say:'Who goes vroom?',choices:[{file:'02-bus.webp',name:'The bus'},{file:'16-ship.webp',name:'The ship'},{file:'07-motorcycle.webp',name:'The motorcycle',correct:true}]},
    {ask:'Who goes toot toot?',say:'Who goes toot toot?',choices:[{file:'08-bicycle.webp',name:'The bicycle'},{file:'16-ship.webp',name:'The ship',correct:true},{file:'18-taxi.webp',name:'The taxi'}]},
    {ask:'Who goes whirr?',say:'Who goes whirr?',choices:[{file:'14-helicopter.webp',name:'The helicopter',correct:true},{file:'11-excavator.webp',name:'The excavator'},{file:'05-ambulance.webp',name:'The ambulance'}]},
    {ask:'Who goes ring ring?',say:'Who goes ring ring?',choices:[{file:'13-airplane.webp',name:'The airplane'},{file:'19-van.webp',name:'The van'},{file:'08-bicycle.webp',name:'The bicycle',correct:true}]}
   ]},
   {type:'learn',id:'sky-vehicles',eyebrow:'LEARN · SKY, WATER AND A ROCKET',heading:'Boats, planes and a rocket.',copy:'Now for the flyers, floaters and zoomers — up, away and all around.',label:'the flyers and floaters',items:[
    {file:'13-airplane.webp',say:'The airplane goes whoosh!',find:'Arms out — whoosh!'},
    {file:'14-helicopter.webp',say:'The helicopter goes whirr.',find:'Spin your hand — whirr!'},
    {file:'15-boat.webp',say:'The boat goes splash!',find:'A little splash — your turn!'},
    {file:'16-ship.webp',say:'The big ship goes toot toot!',find:'Toot toot — your turn!'},
    {file:'17-rocket.webp',say:'The rocket goes whoosh!',find:'Up, up and away — whoosh!'},
    {file:'18-taxi.webp',say:'The taxi goes beep beep.',find:'Just like the car!'},
    {file:'19-van.webp',say:'The van goes vroom.',find:'Vroom vroom — your turn!'},
    {file:'20-scooter.webp',say:'The scooter goes zoom!',find:'Zoom — here we go!'}
   ]},
   {type:'play',id:'find-the-vehicle',eyebrow:'PLAY · FIND THE VEHICLE',heading:'Find the vehicle.',copy:'Now by name. You say the vehicle, your child taps it.',rounds:[
    {ask:'Find the bus.',say:'Find the bus!',choices:[{file:'05-ambulance.webp',name:'The ambulance'},{file:'02-bus.webp',name:'The bus',correct:true},{file:'12-dump-truck.webp',name:'The dump truck'}]},
    {ask:'Where’s the airplane?',say:'Where is the airplane?',choices:[{file:'13-airplane.webp',name:'The airplane',correct:true},{file:'09-train.webp',name:'The train'},{file:'20-scooter.webp',name:'The scooter'}]},
    {ask:'Can you find the tractor?',say:'Can you find the tractor?',choices:[{file:'01-car.webp',name:'The car'},{file:'16-ship.webp',name:'The ship'},{file:'10-tractor.webp',name:'The tractor',correct:true}]},
    {ask:'Find the boat.',say:'Find the boat!',choices:[{file:'18-taxi.webp',name:'The taxi'},{file:'15-boat.webp',name:'The boat',correct:true},{file:'07-motorcycle.webp',name:'The motorcycle'}]}
   ]},
   {type:'play',id:'where-does-it-go',eyebrow:'PLAY · WHERE DOES IT GO?',heading:'Where does it go?',copy:'One last idea: road, tracks, water or sky. You ask the question, your child picks the vehicle.',rounds:[
    {ask:'Which one goes on tracks?',say:'Which one goes on tracks?',choices:[{file:'01-car.webp',name:'The car'},{file:'09-train.webp',name:'The train',correct:true},{file:'15-boat.webp',name:'The boat'}]},
    {ask:'Which one flies in the sky?',say:'Which one flies in the sky?',choices:[{file:'13-airplane.webp',name:'The airplane',correct:true},{file:'03-truck.webp',name:'The truck'},{file:'18-taxi.webp',name:'The taxi'}]},
    {ask:'Which one goes on water?',say:'Which one goes on water?',choices:[{file:'10-tractor.webp',name:'The tractor'},{file:'20-scooter.webp',name:'The scooter'},{file:'15-boat.webp',name:'The boat',correct:true}]}
   ]}
  ]
 },
 printables:{
  mode:'cards',
  heading:'Print the vehicle cards.',
  intro:'Print the cards for vehicle hunts, matching and sound games.',
  pack:'Vehicle Learning Cards',
  meta:'Age 2 · Toddler 6 · Talk &amp; Explore',
  audience:'Made for you to print and use with your child — twenty cards, two to a page.',
  note:'The same twenty cards from today’s class, two to a page. Any paper works — cards just need to be big enough to point at.'
 },
 howTo:{heading:'Tips for Parents',paragraphs:[
  'A toddler who answers every vehicle with vroom is doing the class exactly right. Any sound back is them talking.',
  'Bring sounds into the body — steer a car, chug your arms like a train, rock like a boat. Movement helps words stick.',
  'Repeats are the point. The tenth choo choo is still funny — and still teaching.'
 ],note:'<strong>Age ranges are a guide.</strong> Go at your child’s pace.'},
 pills:{heading:'Where to next?',items:[['Toddler classes','/toddler/'],['Age 2','/toddler/2-years/'],['Learning Path','/learning-path/']]},
 pathNav:{prev:{title:'Animals & Sounds',range:'Age 2',href:'/toddler/2-years/animals-and-sounds/'},next:{title:'Emotions & Feelings',range:'Age 2',href:'/toddler/2-years/emotions-and-feelings/'}},
 hubBlurb:'Beep beep! Twenty vehicles with big sounds and three quick games — cars, trains, boats and one loud rocket.',
 schema:{resourceType:'Interactive toddler class',level:'Toddler (age 2)',teaches:'Vehicle names and their sounds through look, say and tap-along play',audience:'Parents of toddlers',keywords:'vehicles for toddlers, vehicle sounds, transportation activities for toddlers, vehicle learning cards, printable vehicle cards'}
};
export const emLesson={
 path:'/toddler/2-years/emotions-and-feelings/',
 seoTitle:'Emotions & Feelings for 2-Year-Olds',
 title:'Emotions & Feelings for 2-Year-Olds (Toddler 7)',
 h1:'Emotions & Feelings for 2-Year-Olds',
 description:'Help your 2-year-old explore feelings with simple emotion cards, face-matching games and printable activities you can use together.',
 ogAlt:'Emotions and Feelings class for 2-year-olds at Kiddo School',
 ogImage:toddlerBase+'emotions-and-feelings-age-2/cover.webp',
 schemaImage:toddlerBase+'emotions-and-feelings-age-2/cover.webp',
 eyebrow:'TODDLER 7 · LESSON 13',
 crumbs:[['Toddler','/toddler/'],['Age 2','/toddler/2-years/'],['Emotions & Feelings','/toddler/2-years/emotions-and-feelings/']],
 chips:[['Age','2 Years'],['Subject','Talk &amp; Connect'],['Class','Toddler 7'],['Duration','3–5 minutes']],
 subject:'Talk &amp; Connect',
 ledes:['Happy, sad, angry, excited — little feelings can have big names. Look at the faces together and give those feelings simple words.',
  'Nothing to read and nothing to fix. You name the feeling, your toddler makes the face — a point or a giggle counts. Stop whenever they have had enough.'],
 startHint:'Start with happy — the one they know best.',
 startLabel:'Start Class',
 folder:'emotions-and-feelings-age-2/',
 r2Base:toddlerBase,
 eagerFirst:false,
 cover:{file:'cover.webp',w:2000,h:1414,alt:'Emotions and Feelings class for 2-year-olds at Kiddo School'},
 cards:[
  {order:1,file:'01-happy.webp',name:'Happy',phrase:'I feel happy!',w:2000,h:1414,alt:'2D illustrated child showing a happy feeling'},
  {order:2,file:'02-sad.webp',name:'Sad',phrase:'I feel sad.',w:2000,h:1414,alt:'2D illustrated child showing a sad feeling'},
  {order:3,file:'03-angry.webp',name:'Angry',phrase:'I feel angry.',w:2000,h:1414,alt:'2D illustrated child showing an angry feeling'},
  {order:4,file:'04-scared.webp',name:'Scared',phrase:'I feel scared.',w:2000,h:1414,alt:'2D illustrated child showing a scared feeling'},
  {order:5,file:'05-surprised.webp',name:'Surprised',phrase:'Oh!',w:2000,h:1414,alt:'2D illustrated child showing a surprised feeling'},
  {order:6,file:'06-excited.webp',name:'Excited',phrase:'I’m excited!',w:2000,h:1414,alt:'2D illustrated child showing an excited feeling'},
  {order:7,file:'07-tired.webp',name:'Tired',phrase:'I’m tired.',w:2000,h:1414,alt:'2D illustrated child showing a tired feeling'},
  {order:8,file:'08-calm.webp',name:'Calm',phrase:'I feel calm.',w:2000,h:1414,alt:'2D illustrated child showing a calm feeling'},
  {order:9,file:'09-shy.webp',name:'Shy',phrase:'I feel shy.',w:2000,h:1414,alt:'2D illustrated child showing a shy feeling'},
  {order:10,file:'10-silly.webp',name:'Silly',phrase:'I feel silly!',w:2000,h:1414,alt:'2D illustrated child showing a silly feeling'},
  {order:11,file:'11-proud.webp',name:'Proud',phrase:'I did it!',w:2000,h:1414,alt:'2D illustrated child showing a proud feeling'},
  {order:12,file:'12-worried.webp',name:'Worried',phrase:'I’m worried.',w:2000,h:1414,alt:'2D illustrated child showing a worried feeling'},
  {order:13,file:'13-frustrated.webp',name:'Frustrated',phrase:'This is hard.',w:2000,h:1414,alt:'2D illustrated child showing a frustrated feeling'},
  {order:14,file:'14-confused.webp',name:'Confused',phrase:'Hmm?',w:2000,h:1414,alt:'2D illustrated child showing a confused feeling'},
  {order:15,file:'15-bored.webp',name:'Bored',phrase:'I’m bored.',w:2000,h:1414,alt:'2D illustrated child showing a bored feeling'},
  {order:16,file:'16-hurt.webp',name:'Hurt',phrase:'Ouch!',w:2000,h:1414,alt:'2D illustrated child showing a mild hurt feeling'},
  {order:17,file:'17-loved.webp',name:'Loved',phrase:'I feel loved.',w:2000,h:1414,alt:'2D illustration showing a child feeling loved'},
  {order:18,file:'18-friendly.webp',name:'Friendly',phrase:'Hello!',w:2000,h:1414,alt:'2D illustrated child giving a friendly wave'},
  {order:19,file:'19-kind.webp',name:'Kind',phrase:'I can help.',w:2000,h:1414,alt:'2D illustration showing a child being kind and helpful'},
  {order:20,file:'20-brave.webp',name:'Brave',phrase:'I can try.',w:2000,h:1414,alt:'2D illustrated child showing bravery by trying'}
 ],
 interactive:{
  flow:{intro:'Eight little steps, in order: a welcome from your teacher, all twenty feelings, two quick games, faces to make, a few words that help, then off screen and cards to print. Every step stands on its own.',
   steps:[['1','Teacher welcome'],['2','Meet the feelings'],['3','How do they feel?'],['4','Find the feeling'],['5','Faces &amp; feelings'],['6','What can we do?'],['7','Take it off screen'],['8','Print the cards']],
   beginHref:'#meet-the-feelings',beginLabel:'Meet the feelings',beginHint:'Faces work best up close — toddler on your lap.'},
  teacher:{welcome:'Let’s look at some faces. How do they feel?',note:'When the next wobble arrives — and it will — you both have words for it now.'},
  principal:{note:'Your child doesn’t need to name every feeling. You’re simply giving them words they can grow into.'},
  complete:{heading:'Class complete!',copy:'All those feelings together — happy, sad, silly and brave.'},
  offScreen:{heading:'Feelings in our day.',copy:'Name feelings when they naturally come up today.',groups:[
   {title:'Try one today',items:[
    '“You’re smiling. You look happy!”',
    '“That was frustrating.”',
    '“You look tired.”',
    '“Are you feeling excited?”',
    'Make silly faces together in a mirror.'
   ]}
  ],note:'You name it and move on — no quizzing, no waiting for an answer. One feeling shared together is a complete class.'},
  sections:[
   {type:'learn',id:'meet-the-feelings',eyebrow:'LEARN · MEET THE FEELINGS',heading:'Meet the feelings.',copy:'Twenty faces, one at a time. Look together, say the feeling word, then try the face yourselves.',label:'the feelings',items:[
    {file:'01-happy.webp',say:'A grin from ear to ear.',find:'Can you make that face?'},
    {file:'02-sad.webp',say:'A down, droopy sort of day.',find:'Have you felt like this?'},
    {file:'03-angry.webp',say:'Fists balled, eyebrows down.',find:'Can you scrunch your face?'},
    {file:'04-scared.webp',say:'Wide eyes, arms tucked in.',find:'Everyone feels scared sometimes.'},
    {file:'05-surprised.webp',say:'Whoa — what was that?',find:'Can you look surprised?'},
    {file:'06-excited.webp',say:'Too wiggly to sit still.',find:'What makes you feel this way?'},
    {file:'07-tired.webp',say:'Slow blinks, one big yawn.',find:'Can you yawn like that?'},
    {file:'08-calm.webp',say:'Quiet hands, cozy heart.',find:'Peaceful as a sleeping cat.'},
    {file:'09-shy.webp',say:'A little peek from behind.',find:'New people can feel like a lot.'},
    {file:'10-silly.webp',say:'Goofy and loving it.',find:'Can you be silly too?'},
    {file:'11-proud.webp',say:'Chest up, chin high.',find:'A job well done looks like this.'},
    {file:'12-worried.webp',say:'Hmm — what if…',find:'Whisper “I’m here.”'},
    {file:'13-frustrated.webp',say:'When it just will not fit.',find:'Some things take practice.'},
    {file:'14-confused.webp',say:'A tilted head and a shrug.',find:'Can you make a puzzled face?'},
    {file:'15-bored.webp',say:'Nothing feels fun right now.',find:'It happens to everyone.'},
    {file:'16-hurt.webp',say:'Holding a sore knee.',find:'Cuddles and a kiss make it better.'},
    {file:'17-loved.webp',say:'Snuggled in tight.',find:'Who do you love?'},
    {file:'18-friendly.webp',say:'Arms up, big smile — hi there!',find:'Can you wave like that?'},
    {file:'19-kind.webp',say:'Helping with little hands.',find:'Can you share like that?'},
    {file:'20-brave.webp',say:'Standing up tall and having a go.',find:'Show me your brave pose!'}
   ]},
   {type:'match',id:'how-do-they-feel',eyebrow:'PLAY · HOW DO THEY FEEL?',heading:'How do they feel?',copy:'A face up top, the same feeling below. You ask the question, your child taps the match.',rounds:[
    {ask:'How do they feel?',say:'How do they feel?',target:{file:'01-happy.webp',name:'The happy face'},choices:[{file:'01-happy.webp',name:'The happy face',correct:true},{file:'02-sad.webp',name:'The sad face'}]},
    {ask:'How do they feel?',say:'How do they feel?',target:{file:'03-angry.webp',name:'The angry face'},choices:[{file:'08-calm.webp',name:'The calm face'},{file:'03-angry.webp',name:'The angry face',correct:true}]},
    {ask:'How do they feel?',say:'How do they feel?',target:{file:'04-scared.webp',name:'The scared face'},choices:[{file:'04-scared.webp',name:'The scared face',correct:true},{file:'06-excited.webp',name:'The excited face'}]},
    {ask:'How do they feel?',say:'How do they feel?',target:{file:'07-tired.webp',name:'The tired face'},choices:[{file:'10-silly.webp',name:'The silly face'},{file:'07-tired.webp',name:'The tired face',correct:true}]},
    {ask:'How do they feel?',say:'How do they feel?',target:{file:'12-worried.webp',name:'The worried face'},choices:[{file:'11-proud.webp',name:'The proud face'},{file:'12-worried.webp',name:'The worried face',correct:true},{file:'08-calm.webp',name:'The calm face'}]}
   ]},
   {type:'play',id:'find-the-feeling',eyebrow:'PLAY · FIND THE FEELING',heading:'Find the feeling.',copy:'Now by name. You say the feeling, your child taps the face.',rounds:[
    {ask:'Find happy.',say:'Find happy!',choices:[{file:'02-sad.webp',name:'The sad face'},{file:'01-happy.webp',name:'The happy face',correct:true},{file:'03-angry.webp',name:'The angry face'}]},
    {ask:'Where’s sad?',say:'Where is sad?',choices:[{file:'02-sad.webp',name:'The sad face',correct:true},{file:'08-calm.webp',name:'The calm face'}]},
    {ask:'Can you find tired?',say:'Can you find tired?',choices:[{file:'05-surprised.webp',name:'The surprised face'},{file:'07-tired.webp',name:'The tired face',correct:true},{file:'06-excited.webp',name:'The excited face'}]},
    {ask:'Find surprised.',say:'Find surprised!',choices:[{file:'05-surprised.webp',name:'The surprised face',correct:true},{file:'10-silly.webp',name:'The silly face'}]},
    {ask:'Where’s calm?',say:'Where is calm?',choices:[{file:'07-tired.webp',name:'The tired face'},{file:'08-calm.webp',name:'The calm face',correct:true},{file:'01-happy.webp',name:'The happy face'}]}
   ]},
   {type:'learn',id:'faces-and-feelings',eyebrow:'PLAY · FACES &amp; FEELINGS',heading:'Faces &amp; feelings.',copy:'Now your turn — no tapping needed. Make the face together and see who looks silliest.',label:'the faces',items:[
    {file:'01-happy.webp',say:'Can you make a happy face?',find:'Wide awake and smiling!'},
    {file:'05-surprised.webp',say:'Show me surprised!',find:'Hands on cheeks — gasp!'},
    {file:'06-excited.webp',say:'Show me your excited face!',find:'Jumpy, bouncy, loud.'},
    {file:'08-calm.webp',say:'Can you look calm like this?',find:'Soft face, slow breath.'},
    {file:'07-tired.webp',say:'What does tired look like?',find:'Heavy eyes, droopy shoulders.'},
    {file:'10-silly.webp',say:'Can you make a silly face?',find:'The sillier the better.'}
   ]},
   {type:'guide',id:'what-can-we-do',eyebrow:'TOGETHER · WHAT CAN WE DO?',heading:'What can we do?',copy:'No scripts needed. When feelings run big, one calm sentence is enough — a few to keep in your pocket.',items:[
    {file:'02-sad.webp',feeling:'Sad',phrase:'Want a hug?'},
    {file:'03-angry.webp',feeling:'Angry',phrase:'Let’s slow down together.'},
    {file:'04-scared.webp',feeling:'Scared',phrase:'Stay close.'},
    {file:'13-frustrated.webp',feeling:'Frustrated',phrase:'Let’s try together.'},
    {file:'07-tired.webp',feeling:'Tired',phrase:'Maybe it’s time for a rest.'}
   ]}
  ]
 },
 printables:{
  mode:'cards',
  heading:'Print the feeling cards.',
  intro:'Print the cards for simple feeling games and conversations.',
  pack:'Feelings Learning Cards',
  meta:'Age 2 · Toddler 7 · Talk &amp; Connect',
  audience:'Made for you to print and use with your child — twenty cards, two to a page.',
  note:'The same twenty cards from today’s class — handy for a quiet feeling chat at the kitchen table.',
  printEyebrow:'PRINTABLE FEELING CARDS',
  printAria:'The twenty feeling cards'
 },
 howTo:{heading:'Tips for Parents',paragraphs:[
  'All feelings are welcome here. Angry, sad and scared are not bad feelings — they are simply feelings, and every one of them has a name.',
  'Go face first. Pull the expression yourself and your toddler will copy it — copying comes long before naming.',
  'Name your own feelings too. “I’m happy you’re here” or “I’m tired tonight” — your face is the best flashcard in the house.'
 ],note:'<strong>Age ranges are a guide.</strong> Go at your child’s pace.'},
 pills:{heading:'Where to next?',items:[['Toddler classes','/toddler/'],['Age 2','/toddler/2-years/'],['Learning Path','/learning-path/']]},
 pathNav:{prev:{title:'Vehicles & Sounds',range:'Age 2',href:'/toddler/2-years/vehicles-and-sounds/'},next:{title:'Garden Bugs & Friends',range:'Age 2',href:'/toddler/2-years/garden-bugs-and-friends/'}},
 hubBlurb:'Twenty feelings with friendly faces and two quick games — name them together, make the faces, then spot those feelings in your own day. Made for two-year-olds.',
 schema:{resourceType:'Interactive toddler class',level:'Toddler (age 2)',teaches:'Feeling words — happy, sad, angry, scared and more — through looking, face-making and naming together',audience:'Parents of toddlers',keywords:'emotions for 2 year olds, feelings for toddlers, emotion cards for toddlers, feelings activities for toddlers, printable emotion cards, teaching feelings to toddlers, emotion faces for toddlers, social emotional activities for 2 year olds'}
};
// Lesson 14 — Garden Bugs & Friends (Toddler 8, Age 2, Nature & Talk).
// Twenty cards + cover, all HEAD-verified (HTTP 200) at
// toddlerBase+folder, byte sizes matching the Cloudflare dashboard, with
// dimensions parsed from each WebP: eighteen cards at 1587x2245, four
// (ant, caterpillar, dragonfly, grasshopper) at 1414x2000, cover 2000x1294.
export const gbLesson={
 path:'/toddler/2-years/garden-bugs-and-friends/',
 seoTitle:'Garden Bugs & Friends for 2-Year-Olds',
 title:'Garden Bugs & Friends for 2-Year-Olds (Toddler 8)',
 h1:'Garden Bugs & Friends for 2-Year-Olds',
 description:'Meet twenty little garden friends with your 2-year-old — a bee, a butterfly, a snail and more — with look-and-name cards, two gentle games and a garden hunt for after class.',
 ogAlt:'Garden Bugs and Friends class for 2-year-olds at Kiddo School',
 ogImage:toddlerBase+'garden-bugs-and-friends-age-2/cover.webp',
 schemaImage:toddlerBase+'garden-bugs-and-friends-age-2/cover.webp',
 eyebrow:'TODDLER 8 · LESSON 14',
 crumbs:[['Toddler','/toddler/'],['Age 2','/toddler/2-years/'],['Garden Bugs &amp; Friends','/toddler/2-years/garden-bugs-and-friends/']],
 chips:[['Age','2 Years'],['Subject','Nature &amp; Talk'],['Class','Toddler 8'],['Duration','3–5 minutes']],
 subject:'Nature &amp; Talk',
 ledes:['There is a whole little world wobbling around the garden. Meet it together, one friendly face at a time — a busy bee, a slow snail, a roly-poly that rolls right up.',
  'Nothing to read and nothing to prepare. You say the name, your toddler points or giggles — a moment on a card counts, and the real garden can wait until you step outside.'],
 startHint:'Start with the bee — the one that is probably already buzzing in their books.',
 startLabel:'Start Class',
 folder:'garden-bugs-and-friends-age-2/',
 r2Base:toddlerBase,
 eagerFirst:false,
 cover:{file:'cover.webp',w:2000,h:1294,alt:'Garden Bugs and Friends class for 2-year-olds at Kiddo School'},
 cards:[
  {order:1,file:'01-bee.webp',name:'Bee',phrase:'Buzz, buzz!',w:1587,h:2245,alt:'2D illustration of a friendly smiling bee'},
  {order:2,file:'02-butterfly.webp',name:'Butterfly',phrase:'Flutter, flutter!',w:1587,h:2245,alt:'2D illustration of an orange and black butterfly'},
  {order:3,file:'03-ladybug.webp',name:'Ladybug',phrase:'Tiny red beetle!',w:1587,h:2245,alt:'2D illustration of a red spotted ladybug'},
  {order:4,file:'04-snail.webp',name:'Snail',phrase:'Slow and steady.',w:1587,h:2245,alt:'2D illustration of a smiling snail with a brown shell'},
  {order:5,file:'05-ant.webp',name:'Ant',phrase:'March, march!',w:1414,h:2000,alt:'2D illustration of a small black ant'},
  {order:6,file:'06-caterpillar.webp',name:'Caterpillar',phrase:'Munch, munch!',w:1414,h:2000,alt:'2D illustration of a green caterpillar'},
  {order:7,file:'07-dragonfly.webp',name:'Dragonfly',phrase:'Zoom!',w:1414,h:2000,alt:'2D illustration of a dragonfly with shiny wings'},
  {order:8,file:'08-grasshopper.webp',name:'Grasshopper',phrase:'Boing!',w:1414,h:2000,alt:'2D illustration of a green grasshopper ready to jump'},
  {order:9,file:'09-beetle.webp',name:'Beetle',phrase:'A shiny little friend.',w:1587,h:2245,alt:'2D illustration of a round shiny beetle'},
  {order:10,file:'10-spider.webp',name:'Spider',phrase:'Eight wiggly legs!',w:1587,h:2245,alt:'2D illustration of a friendly spider'},
  {order:11,file:'11-moth.webp',name:'Moth',phrase:'A soft night flyer.',w:1587,h:2245,alt:'2D illustration of a soft brown moth'},
  {order:12,file:'12-cricket.webp',name:'Cricket',phrase:'Chirp, chirp!',w:1587,h:2245,alt:'2D illustration of a chirping cricket'},
  {order:13,file:'13-roly-poly.webp',name:'Roly-poly',phrase:'Roll up!',w:1587,h:2245,alt:'2D illustration of a grey roly-poly pill bug'},
  {order:14,file:'14-firefly.webp',name:'Firefly',phrase:'A tiny light in the dark.',w:1587,h:2245,alt:'2D illustration of a glowing firefly'},
  {order:15,file:'15-praying-mantis.webp',name:'Praying mantis',phrase:'Arms up, hello!',w:1587,h:2245,alt:'2D illustration of a green praying mantis'},
  {order:16,file:'16-centipede.webp',name:'Centipede',phrase:'So many legs!',w:1587,h:2245,alt:'2D illustration of a long centipede with many legs'},
  {order:17,file:'17-earthworm.webp',name:'Earthworm',phrase:'Wiggle, wiggle!',w:1587,h:2245,alt:'2D illustration of a pink earthworm'},
  {order:18,file:'18-bird.webp',name:'Bird',phrase:'A garden visitor.',w:1587,h:2245,alt:'2D illustration of a bluebird on a branch'},
  {order:19,file:'19-frog.webp',name:'Frog',phrase:'Ribbit, ribbit!',w:1587,h:2245,alt:'2D illustration of a green frog'},
  {order:20,file:'20-squirrel.webp',name:'Squirrel',phrase:'Twitchy tail!',w:1587,h:2245,alt:'2D illustration of a squirrel with a fluffy tail'}
 ],
 interactive:{
  flow:{intro:'Eight little steps, in order: a welcome from your teacher, all twenty garden friends, two quick games, a wiggle-and-move break, a few bug facts, then off to the real garden and cards to print. Every step stands on its own.',
   steps:[['1','Teacher welcome'],['2','Meet the garden friends'],['3','Who is hiding?'],['4','Find the bug'],['5','Wiggle & move'],['6','Little bug facts'],['7','Take it off screen'],['8','Print the cards']],
   beginHref:'#meet-the-garden-friends',beginLabel:'Meet the garden friends',beginHint:'Cards work best up close — toddler on your lap.'},
  teacher:{welcome:'Let’s meet some little garden friends. Who is this?',note:'Next time you step outside, the whole garden is a name-them-together game.'},
  principal:{note:'Your child doesn’t need every bug name to stick. You’re opening a door to the small world at their feet — curiosity does the rest.'},
  complete:{heading:'Class complete!',copy:'From the buzzy bee to the twitchy-tailed squirrel — what a little garden tour.'},
  offScreen:{heading:'Garden hunt.',copy:'Take the names outside — or to a window, a book or a video if the garden is far away.',groups:[
   {title:'Try one today',items:[
    'Look for a bee visiting a flower.',
    'Count the snails after it rains.',
    'Find a bird and say hello to it.',
    'Wiggle like a worm, then hop like a grasshopper.',
    'Peek under a stone for a roly-poly — look, then gently roll it back.'
   ]}
  ],note:'One found friend is a complete hunt. If nothing turns up, the squirrel outside the window counts too.'},
  sections:[
   {type:'learn',id:'meet-the-garden-friends',eyebrow:'LEARN · MEET THE GARDEN FRIENDS',heading:'Meet the garden friends.',copy:'Twenty little friends, one at a time. Say the name clearly, make the sound together, and let your toddler point, giggle or move along.',label:'the garden friends',items:[
    {file:'01-bee.webp',say:'A fuzzy striped friend that visits flowers.',find:'Can you buzz like a bee?'},
    {file:'02-butterfly.webp',say:'Wings like painted sunshine.',find:'Can you flutter your arms?'},
    {file:'03-ladybug.webp',say:'Tiny, round and red with dots.',find:'Can you count her spots?'},
    {file:'04-snail.webp',say:'Carries its little house everywhere.',find:'Can you move in slow motion?'},
    {file:'05-ant.webp',say:'Small, strong and always busy.',find:'Can you march like an ant?'},
    {file:'06-caterpillar.webp',say:'Munch, munch — all day long.',find:'Can you munch like a caterpillar?'},
    {file:'07-dragonfly.webp',say:'Shiny wings and a speedy zoom.',find:'Can you zoom around the room?'},
    {file:'08-grasshopper.webp',say:'Legs made for big jumps.',find:'Can you jump like a grasshopper?'},
    {file:'09-beetle.webp',say:'A shiny little coat of armor.',find:'Can you rub your shiny arms?'},
    {file:'10-spider.webp',say:'Eight legs, all of them wiggly.',find:'Can you wiggle eight legs?'},
    {file:'11-moth.webp',say:'A soft flyer who loves the night.',find:'Can you flap your quiet wings?'},
    {file:'12-cricket.webp',say:'Sings with tiny wings — chirp!',find:'Can you chirp like a cricket?'},
    {file:'13-roly-poly.webp',say:'Rolls into a little ball when shy.',find:'Can you curl up in a ball?'},
    {file:'14-firefly.webp',say:'Carries its own tiny lantern.',find:'Can you blink your light on and off?'},
    {file:'15-praying-mantis.webp',say:'Stands tall with arms folded — hello!',find:'Can you fold your arms up high?'},
    {file:'16-centipede.webp',say:'So many legs, all going somewhere.',find:'Can you wiggle all your legs?'},
    {file:'17-earthworm.webp',say:'Wiggles deep in the garden soil.',find:'Can you wiggle like a worm?'},
    {file:'18-bird.webp',say:'A garden visitor with a song.',find:'Can you tweet like a bird?'},
    {file:'19-frog.webp',say:'Sits by the pond and says ribbit.',find:'Can you hop like a frog?'},
    {file:'20-squirrel.webp',say:'A fluffy tail that never sits still.',find:'Can you twitch your squirrel tail?'}
   ]},
   {type:'match',id:'who-is-hiding',eyebrow:'PLAY · WHO IS HIDING?',heading:'Who is hiding?',copy:'A friend up top, the same friend below. You ask the question, your child taps the match.',rounds:[
    {ask:'Who is hiding?',say:'Who is hiding?',target:{file:'01-bee.webp',name:'The bee'},choices:[{file:'02-butterfly.webp',name:'The butterfly'},{file:'01-bee.webp',name:'The bee',correct:true}]},
    {ask:'Who is hiding?',say:'Who is hiding?',target:{file:'03-ladybug.webp',name:'The ladybug'},choices:[{file:'03-ladybug.webp',name:'The ladybug',correct:true},{file:'09-beetle.webp',name:'The beetle'},{file:'04-snail.webp',name:'The snail'}]},
    {ask:'Who is hiding?',say:'Who is hiding?',target:{file:'19-frog.webp',name:'The frog'},choices:[{file:'18-bird.webp',name:'The bird'},{file:'19-frog.webp',name:'The frog',correct:true}]},
    {ask:'Who is hiding?',say:'Who is hiding?',target:{file:'17-earthworm.webp',name:'The earthworm'},choices:[{file:'16-centipede.webp',name:'The centipede'},{file:'17-earthworm.webp',name:'The earthworm',correct:true},{file:'06-caterpillar.webp',name:'The caterpillar'}]},
    {ask:'Who is hiding?',say:'Who is hiding?',target:{file:'20-squirrel.webp',name:'The squirrel'},choices:[{file:'20-squirrel.webp',name:'The squirrel',correct:true},{file:'18-bird.webp',name:'The bird'}]}
   ]},
   {type:'play',id:'find-the-bug',eyebrow:'PLAY · FIND THE BUG',heading:'Find the bug.',copy:'Now by name. You say the friend, your child taps it.',rounds:[
    {ask:'Find the butterfly.',say:'Find the butterfly!',choices:[{file:'01-bee.webp',name:'The bee'},{file:'02-butterfly.webp',name:'The butterfly',correct:true},{file:'11-moth.webp',name:'The moth'}]},
    {ask:'Where is the snail?',say:'Where is the snail?',choices:[{file:'04-snail.webp',name:'The snail',correct:true},{file:'13-roly-poly.webp',name:'The roly-poly'}]},
    {ask:'Can you find the spider?',say:'Can you find the spider?',choices:[{file:'10-spider.webp',name:'The spider',correct:true},{file:'05-ant.webp',name:'The ant'},{file:'15-praying-mantis.webp',name:'The praying mantis'}]},
    {ask:'Find the frog.',say:'Find the frog!',choices:[{file:'19-frog.webp',name:'The frog',correct:true},{file:'18-bird.webp',name:'The bird'}]},
    {ask:'Where is the firefly?',say:'Where is the firefly?',choices:[{file:'14-firefly.webp',name:'The firefly',correct:true},{file:'12-cricket.webp',name:'The cricket'},{file:'07-dragonfly.webp',name:'The dragonfly'}]}
   ]},
   {type:'learn',id:'wiggle-and-move',eyebrow:'PLAY · WIGGLE &amp; MOVE',heading:'Wiggle &amp; move.',copy:'No tapping needed now — this is the get-up-and-move part. Copy the friend together and see who wobbles most.',label:'the moves',items:[
    {file:'02-butterfly.webp',say:'Flutter around the room!',find:'Big, slow arm wings.'},
    {file:'08-grasshopper.webp',say:'Jump, jump, jump!',find:'Crouch low — and boing!'},
    {file:'04-snail.webp',say:'Now sloooow motion.',find:'Slow as honey.'},
    {file:'13-roly-poly.webp',say:'Roll into a tiny ball.',find:'Knees hugged tight.'},
    {file:'19-frog.webp',say:'Hop like you have a pond to cross.',find:'One, two, ribbit!'},
    {file:'20-squirrel.webp',say:'Twitch your fluffy tail.',find:'A little wiggle behind you.'}
   ]},
   {type:'guide',id:'little-bug-facts',eyebrow:'TOGETHER · LITTLE BUG FACTS',heading:'Little bug facts.',copy:'Five true things to share while you look — little facts stick when they come with a face.',items:[
    {file:'03-ladybug.webp',feeling:'Ladybug',phrase:'Ladybugs are garden helpers — they eat tiny pests off the plants.'},
    {file:'04-snail.webp',feeling:'Snail',phrase:'A snail’s shell is its house, and it carries it everywhere it goes.'},
    {file:'01-bee.webp',feeling:'Bee',phrase:'Bees visit flowers to make honey — and help gardens grow.'},
    {file:'14-firefly.webp',feeling:'Firefly',phrase:'A firefly makes its own light so it can glow at night.'},
    {file:'17-earthworm.webp',feeling:'Earthworm',phrase:'Earthworms wiggle through the soil and keep it cozy for roots.'}
   ]}
  ]
 },
 printables:{
  mode:'cards',
  heading:'Print the garden cards.',
  intro:'Print the cards for simple naming games and garden-hunt warm-ups.',
  pack:'Garden Bugs &amp; Friends Learning Cards',
  meta:'Age 2 · Toddler 8 · Nature &amp; Talk',
  audience:'Made for you to print and use with your child — twenty cards, two to a page.',
  note:'The same twenty cards from today’s class — handy for a quiet naming chat at the kitchen table.',
  printEyebrow:'PRINTABLE GARDEN BUG CARDS',
  printAria:'The twenty garden bug and friends cards'
 },
 howTo:{heading:'Tips for Parents',paragraphs:[
  'Follow your toddler’s favourites. If they want the snail five times in a row, the snail five times in a row it is — repetition is how little ones learn.',
  'Sounds before facts. Buzzing, hopping and wiggling teach the names better than any explanation, so be as silly as your toddler needs you to be.',
  'Bring the class outside when you can. A found ladybug, a heard cricket or a visiting bird turns every name on these cards into something real.'
 ],note:'<strong>Age ranges are a guide.</strong> Go at your child’s pace.'},
 pills:{heading:'Where to next?',items:[['Toddler classes','/toddler/'],['Age 2','/toddler/2-years/'],['Learning Path','/learning-path/']]},
 pathNav:{prev:{title:'Emotions & Feelings',range:'Age 2',href:'/toddler/2-years/emotions-and-feelings/'},next:null},
 hubBlurb:'Twenty little garden friends — a bee, a butterfly, a snail and more — with two gentle games and a garden hunt for after class. Made for two-year-olds.',
 schema:{resourceType:'Interactive toddler class',level:'Toddler (age 2)',teaches:'Garden creature names — bee, butterfly, ladybug, snail and more — through looking, naming, matching and moving together',audience:'Parents of toddlers',keywords:'garden bugs for 2 year olds, insect activities for toddlers, bug flashcards for toddlers, bug activities for 2 year olds, nature activities for toddlers, teaching bugs to toddlers, printable bug cards, garden animals for toddlers'}
};
export const lessons=[hcLesson,fvLesson,cfoLesson,fwftLesson,aeoLesson,fabLesson,fwfhLesson,fcLesson,csLesson,msLesson,anLesson,vhLesson,emLesson,gbLesson];
// School Garden collection — Garden Animals & Friends (Age 2). This is NOT a
// numbered Learning Path lesson: it lives in the School Garden alongside the
// real garden collections and is exported separately on purpose. SEO copy
// uses natural parent-search wording (garden animals, animals for toddlers) —
// "Garden Friends" is the collection's inside name, not a phrase to force.
// There is NO cover image in the R2 folder (verified 404) and none is claimed.
export const gfLesson={
 path:'/toddler/2-years/school-garden/garden-friends/',
 seoTitle:'Garden Animals for Toddlers | Picture Cards & Activities',
 title:'Garden Animals for Toddlers | Picture Cards & Activities',
 h1:'Garden Animals & Friends',
 description:'Help your toddler learn garden and outdoor animals with picture cards, simple animal vocabulary games and playful nature activities.',
 ogAlt:'Garden animals picture cards for toddlers from Kiddo School',
 ogImage:toddlerBase+'garden-friends-age-2/01-bird.webp',
 schemaImage:toddlerBase+'garden-friends-age-2/01-bird.webp',
 eyebrow:'SCHOOL GARDEN · GARDEN FRIENDS',
 crumbs:[['Toddler','/toddler/'],['Age 2','/toddler/2-years/'],['School Garden','/toddler/2-years/school-garden/'],['Garden Animals & Friends']],
 chips:[['Age','2 Years'],['Subject','Nature &amp; Talk'],['Class','School Garden'],['Duration','3–5 minutes']],
 subject:'Nature &amp; Talk',
 ledes:['A bird in the hedge, a worm after the rain, an owl you might only hear — meet the animals that live around gardens and the great outdoors, one big picture at a time.',
  'Nothing to prepare and nothing to read to your toddler. You say the name, they point or hop — a moment on a card counts, and the real outdoors can wait for your next walk.'],
 startHint:'Start with the bird — the easiest friend to spot from a window.',
 startLabel:'Start the Class',
 folder:'garden-friends-age-2/',
 r2Base:toddlerBase,
 eagerFirst:false,
 cover:null,
 cards:[
  {order:1,file:'01-bird.webp',name:'Bird',phrase:'Tweet, tweet!',w:1414,h:2000,alt:'Bird picture card for toddlers'},
  {order:2,file:'02-frog.webp',name:'Frog',phrase:'Ribbit, ribbit!',w:1414,h:2000,alt:'Frog picture card for toddlers'},
  {order:3,file:'03-squirrel.webp',name:'Squirrel',phrase:'Twitchy tail!',w:1414,h:2000,alt:'Squirrel picture card for toddlers'},
  {order:4,file:'04-rabbit.webp',name:'Rabbit',phrase:'Big ears, quick hops!',w:1414,h:2000,alt:'Rabbit picture card for toddlers'},
  {order:5,file:'05-hedgehog.webp',name:'Hedgehog',phrase:'Prickly little friend!',w:1414,h:2000,alt:'Hedgehog picture card for toddlers'},
  {order:6,file:'06-worm.webp',name:'Worm',phrase:'Wiggle, wiggle!',w:1414,h:2000,alt:'Worm picture card for toddlers'},
  {order:7,file:'07-duck.webp',name:'Duck',phrase:'Quack, quack!',w:1414,h:2000,alt:'Duck picture card for toddlers'},
  {order:8,file:'08-turtle.webp',name:'Turtle',phrase:'Slow and steady.',w:1414,h:2000,alt:'Turtle picture card for toddlers'},
  {order:9,file:'09-mouse.webp',name:'Mouse',phrase:'Squeak, squeak!',w:1414,h:2000,alt:'Mouse picture card for toddlers'},
  {order:10,file:'10-mole.webp',name:'Mole',phrase:'Dig, dig, dig!',w:1414,h:2000,alt:'Mole picture card for toddlers'},
  {order:11,file:'11-lizard.webp',name:'Lizard',phrase:'Sunning on a rock.',w:1414,h:2000,alt:'Lizard picture card for toddlers'},
  {order:12,file:'12-toad.webp',name:'Toad',phrase:'A bumpy little hopper.',w:1414,h:2000,alt:'Toad picture card for toddlers'},
  {order:13,file:'13-chipmunk.webp',name:'Chipmunk',phrase:'Cheeks full of snacks!',w:1414,h:2000,alt:'Chipmunk picture card for toddlers'},
  {order:14,file:'14-raccoon.webp',name:'Raccoon',phrase:'Clever little paws!',w:1414,h:2000,alt:'Raccoon picture card for toddlers'},
  {order:15,file:'15-deer.webp',name:'Deer',phrase:'Quiet in the woods.',w:1414,h:2000,alt:'Deer picture card for toddlers'},
  {order:16,file:'16-snake.webp',name:'Snake',phrase:'A long, slow slither.',w:1414,h:2000,alt:'Snake picture card for toddlers'},
  {order:17,file:'17-bat.webp',name:'Bat',phrase:'A night-time flyer.',w:1414,h:2000,alt:'Bat picture card for toddlers'},
  {order:18,file:'18-owl.webp',name:'Owl',phrase:'Whooo is awake at night?',w:1414,h:2000,alt:'Owl picture card for toddlers'}
 ],
 interactive:{
  flow:{intro:'Ten little steps, in order: a welcome from your teacher, all eighteen garden friends, two gentle games, a look-don’t-touch outdoors hunt, cards to print, a note from your teacher and one last check-in from you. Stop after any step — that is a complete class.',
   steps:[['1','Teacher welcome'],['2','Meet the garden friends'],['3','Find the animal'],['4','Who am I?'],['5','Where might we see it?'],['6','Take it off screen'],['7','Print the cards'],['8','Teacher note'],['9','Parent review'],['10','Class complete']],
   beginHref:'#meet-the-garden-friends',beginLabel:'Meet the garden friends',beginHint:'Cards work best up close — toddler on your lap.'},
  teacher:{welcome:'Let’s meet some animals we might see around gardens and outdoors!',note:'A duck on the pond, a bird in the hedge — every walk becomes a naming game. You do not need a garden; a window and a little patience will do.'},
  principal:{note:'Your toddler does not need every animal name to stick. Saying words while they look and hop is the whole lesson — the vocabulary rides along, and no garden is required. Some of these friends live in gardens, some only visit, and some live in the wider outdoors — all of that is fine to wonder about together.'},
  complete:{heading:'Class complete!',copy:'From the twitchy squirrel to the owl you may only ever hear — what a little tour of the outdoors.'},
  offScreen:{heading:'A look-don’t-touch nature hunt.',copy:'Take the names outside — or to a window, a book or a video if the outdoors is far away. Wild animals are looked at, never touched, chased or fed.',groups:[
   {title:'Try one today',items:[
    'Spot a bird from the window and say its name together.',
    'Watch a squirrel’s tail twitch in the park.',
    'After rain, look for a worm on the path — look with your eyes, then walk on by.',
    'At dusk, look up and search for bats — pointing and whispering is plenty.',
    'Hop like a frog and wiggle like a worm yourselves — the safest animals to touch are you two.'
   ]}
  ],note:'Never feed wild animals, never touch or pick up an unknown animal, and never follow one for a closer look. A grown-up stays close the whole time — one spotted friend is a complete hunt.'},
  sections:[
   {type:'learn',id:'meet-the-garden-friends',eyebrow:'LEARN · MEET THE GARDEN FRIENDS',heading:'Meet the garden friends.',copy:'Eighteen big picture cards, one at a time. Say the name clearly, make the sound together, and let your toddler point, giggle or move along.',label:'the garden friends',items:[
    {file:'01-bird.webp',say:'A feathered friend with a song.',find:'Can you flap your wings?'},
    {file:'02-frog.webp',say:'Sits by the pond and hops high.',find:'Can you hop like a frog?'},
    {file:'03-squirrel.webp',say:'A bushy tail and quick little feet.',find:'Can you twitch your squirrel tail?'},
    {file:'04-rabbit.webp',say:'Long ears that listen for you.',find:'Can you hop two times?'},
    {file:'05-hedgehog.webp',say:'A tiny friend with prickly spikes.',find:'Can you curl up small?'},
    {file:'06-worm.webp',say:'Wiggles through the garden soil.',find:'Can you wiggle like a worm?'},
    {file:'07-duck.webp',say:'Paddles on the water — quack!',find:'Can you waddle like a duck?'},
    {file:'08-turtle.webp',say:'Carries its home on its back.',find:'Can you go slow… so slow?'},
    {file:'09-mouse.webp',say:'Small, quick and squeaky.',find:'Can you tiptoe like a mouse?'},
    {file:'10-mole.webp',say:'Digs tunnels under the ground.',find:'Can you dig with your paws?'},
    {file:'11-lizard.webp',say:'Loves to warm up in the sun.',find:'Can you freeze like a lizard?'},
    {file:'12-toad.webp',say:'A bumpy friend who likes damp spots.',find:'Can you make a big hop?'},
    {file:'13-chipmunk.webp',say:'Carries snacks in its cheeks.',find:'Can you puff up your cheeks?'},
    {file:'14-raccoon.webp',say:'Clever paws that explore at night.',find:'Can you pat your clever paws?'},
    {file:'15-deer.webp',say:'Gentle steps through the quiet woods.',find:'Can you take soft deer steps?'},
    {file:'16-snake.webp',say:'Slithers along without any legs.',find:'Can you slither side to side?'},
    {file:'17-bat.webp',say:'Wakes up when the sun goes down.',find:'Can you flap your night wings?'},
    {file:'18-owl.webp',say:'A wise looker who loves the night.',find:'Can you turn your head slowly… whooo?'}
   ]},
   {type:'play',id:'find-the-animal',eyebrow:'PLAY · FIND THE ANIMAL',heading:'Find the animal.',copy:'Three big pictures, one question. You say the animal, your child taps it — a wrong tap simply means look together.',correctFeedback:'You found it!',incorrectFeedback:'Look again.',rounds:[
    {ask:'Find the bird.',say:'Find the bird.',choices:[{file:'07-duck.webp',name:'The duck'},{file:'01-bird.webp',name:'The bird',correct:true},{file:'17-bat.webp',name:'The bat'}]},
    {ask:'Where’s the frog?',say:'Where’s the frog?',choices:[{file:'02-frog.webp',name:'The frog',correct:true},{file:'08-turtle.webp',name:'The turtle'},{file:'07-duck.webp',name:'The duck'}]},
    {ask:'Find the rabbit.',say:'Find the rabbit.',choices:[{file:'13-chipmunk.webp',name:'The chipmunk'},{file:'05-hedgehog.webp',name:'The hedgehog'},{file:'04-rabbit.webp',name:'The rabbit',correct:true}]},
    {ask:'Can you find the squirrel?',say:'Can you find the squirrel?',choices:[{file:'03-squirrel.webp',name:'The squirrel',correct:true},{file:'14-raccoon.webp',name:'The raccoon'},{file:'13-chipmunk.webp',name:'The chipmunk'}]},
    {ask:'Where’s the owl?',say:'Where’s the owl?',choices:[{file:'18-owl.webp',name:'The owl',correct:true},{file:'17-bat.webp',name:'The bat'},{file:'01-bird.webp',name:'The bird'}]}
   ]},
   {type:'play',id:'who-am-i',eyebrow:'PLAY · WHO AM I?',heading:'Who am I?',copy:'A little clue, then three friends. Say the clue slowly and let your child solve it — every guess is a good guess.',correctFeedback:'You found it!',incorrectFeedback:'Look again.',rounds:[
    {ask:'I have long ears. Who am I?',say:'I have long ears. Who am I?',choices:[{file:'15-deer.webp',name:'The deer'},{file:'04-rabbit.webp',name:'The rabbit',correct:true},{file:'03-squirrel.webp',name:'The squirrel'}]},
    {ask:'I hop. Who am I?',say:'I hop. Who am I?',choices:[{file:'06-worm.webp',name:'The worm'},{file:'02-frog.webp',name:'The frog',correct:true},{file:'07-duck.webp',name:'The duck'}]},
    {ask:'I have a bushy tail. Who am I?',say:'I have a bushy tail. Who am I?',choices:[{file:'14-raccoon.webp',name:'The raccoon'},{file:'03-squirrel.webp',name:'The squirrel',correct:true},{file:'15-deer.webp',name:'The deer'}]},
    {ask:'I fly at night. Who am I?',say:'I fly at night. Who am I?',choices:[{file:'17-bat.webp',name:'The bat',correct:true},{file:'01-bird.webp',name:'The bird'},{file:'07-duck.webp',name:'The duck'}]},
    {ask:'I say quack. Who am I?',say:'I say quack. Who am I?',choices:[{file:'07-duck.webp',name:'The duck',correct:true},{file:'02-frog.webp',name:'The frog'},{file:'01-bird.webp',name:'The bird'}]},
    {ask:'I have a shell. Who am I?',say:'I have a shell. Who am I?',choices:[{file:'05-hedgehog.webp',name:'The hedgehog'},{file:'08-turtle.webp',name:'The turtle',correct:true},{file:'12-toad.webp',name:'The toad'}]}
   ]},
   {type:'guide',id:'where-might-we-see-it',eyebrow:'TOGETHER · WHERE MIGHT WE SEE IT?',heading:'Where might we see it?',copy:'Some of these friends live in gardens, some just visit, and some live in the wider outdoors — here is where to look, gently and from a distance.',items:[
    {file:'01-bird.webp',feeling:'Bird',phrase:'Hedges, parks and balconies — you will hear one before you see it.'},
    {file:'03-squirrel.webp',feeling:'Squirrel',phrase:'Up in the trees of any leafy park, tail twitching.'},
    {file:'07-duck.webp',feeling:'Duck',phrase:'On ponds and canals, paddling along in a little line.'},
    {file:'04-rabbit.webp',feeling:'Rabbit',phrase:'At the edges of meadows and gardens, early in the morning.'},
    {file:'02-frog.webp',feeling:'Frog',phrase:'Near ponds, puddles and damp grass, especially after rain.'},
    {file:'06-worm.webp',feeling:'Worm',phrase:'In the soil and under flowerpots after it rains — look, then leave them be.'},
    {file:'05-hedgehog.webp',feeling:'Hedgehog',phrase:'In hedges and leaf piles after dark, if you are lucky.'},
    {file:'17-bat.webp',feeling:'Bat',phrase:'Flitting through the evening sky just after sunset.'},
    {file:'18-owl.webp',feeling:'Owl',phrase:'High in old trees at night — usually a whooo long before a look.'}
   ]}
  ]
 },
 printables:{
  mode:'cards',
  heading:'Print the garden animal cards.',
  intro:'Print the cards for simple naming games and window-spotting warm-ups.',
  pack:'Garden Animals &amp; Friends Learning Cards',
  meta:'Age 2 · School Garden · Nature &amp; Talk',
  audience:'Made for you to print and use with your child — eighteen cards, two to a page.',
  note:'The same eighteen cards from today’s class — handy for a quiet naming chat at the kitchen table.',
  printEyebrow:'PRINTABLE GARDEN ANIMAL CARDS',
  printAria:'The eighteen garden animals and friends cards'
 },
 howTo:{heading:'Tips for Parents',paragraphs:[
  'Follow your toddler’s favourites. If the frog gets five rounds in a row, the frog gets five rounds in a row — repetition is how little ones learn.',
  'Sounds and movement before facts. Hopping, wiggling and quacking teach the names better than any explanation, so be as silly as your toddler needs you to be.',
  'Keep it honest and gentle: some of these animals live in gardens, some just visit and some stay far outdoors — and all of them stay wild. Looking is the game; touching, feeding and chasing are not part of it.'
 ],note:'<strong>Age ranges are a guide.</strong> Go at your child’s pace.'},
 pills:{heading:'Where to next?',items:[['School Garden','/toddler/2-years/school-garden/'],['Age 2 classes','/toddler/2-years/'],['Library','/learning-library/']]},
 hubBlurb:'Eighteen garden and outdoor animals — a bird, a frog, a squirrel and more — with two gentle games and a look-don’t-touch nature hunt. Made for two-year-olds.',
 schema:{resourceType:'Interactive toddler class',level:'Toddler (age 2)',teaches:'Animal names for toddlers — bird, frog, squirrel, rabbit and more — through looking, naming and playing together',audience:'Parents of toddlers',keywords:'garden animals for kids, garden animals for toddlers, animals for toddlers, animal vocabulary for toddlers, animal flashcards for toddlers, animal picture cards, learning animal names, nature activities for toddlers'}
};

export const gflLesson={
 path:'/toddler/2-years/school-garden/garden-flowers/',
 seoTitle:'Garden Flowers for Toddlers | Picture Cards & Activities',
 title:'Garden Flowers for Toddlers | Picture Cards & Activities',
 h1:'Garden Flowers',
 description:'Walk through the flower garden with your 2-year-old — twelve big, bright blooms to name together, with two gentle games and a look-and-smell hunt for outside.',
 ogAlt:'Garden flowers picture cards for toddlers from Kiddo School',
 ogImage:toddlerBase+'garden-flowers-age-2/cover.webp',
 schemaImage:toddlerBase+'garden-flowers-age-2/cover.webp',
 eyebrow:'SCHOOL GARDEN · GARDEN FLOWERS',
 crumbs:[['Toddler','/toddler/'],['Age 2','/toddler/2-years/'],['School Garden','/toddler/2-years/school-garden/'],['Garden Flowers']],
 chips:[['Age','2 Years'],['Subject','Nature &amp; Talk'],['Class','School Garden'],['Duration','3–5 minutes']],
 subject:'Nature &amp; Talk',
 ledes:['Big yellow sunflowers, roses, tulips and bluebells — the flower bed is full of names waiting to be learned. Twelve bright blooms, one big picture at a time.',
  'Nothing to prepare and nothing to read. You say the flower name, your toddler points, sniffs the air or giggles — a moment on a card counts, and the real garden can wait for your next walk.'],
 startHint:'Start with the sunflower — the tallest friend in the bed.',
 startLabel:'Start the Class',
 folder:'garden-flowers-age-2/',
 r2Base:toddlerBase,
 eagerFirst:false,
 cover:{file:'cover.webp',w:2476,h:2032,alt:'Garden Flowers class for 2-year-olds at Kiddo School'},
 cards:[
  {order:1,file:'01-sunflower.webp',name:'Sunflower',phrase:'Tall and yellow!',w:1920,h:2954,alt:'Sunflower picture card for toddlers'},
  {order:2,file:'02-rose.webp',name:'Rose',phrase:'Sniff, sniff — lovely!',w:1916,h:2952,alt:'Rose picture card for toddlers'},
  {order:3,file:'03-tulip.webp',name:'Tulip',phrase:'A cup of pink!',w:1914,h:2954,alt:'Tulip picture card for toddlers'},
  {order:4,file:'04-daisy.webp',name:'Daisy',phrase:'White petals, round gold middle.',w:1910,h:2952,alt:'Daisy picture card for toddlers'},
  {order:5,file:'05-daffodil.webp',name:'Daffodil',phrase:'Golden trumpet!',w:1914,h:2954,alt:'Daffodil picture card for toddlers'},
  {order:6,file:'06-poppy.webp',name:'Poppy',phrase:'Bright as red can be.',w:1912,h:2954,alt:'Poppy picture card for toddlers'},
  {order:7,file:'07-lavender.webp',name:'Lavender',phrase:'Purple and calm.',w:1918,h:2936,alt:'Lavender picture card for toddlers'},
  {order:8,file:'08-hibiscus.webp',name:'Hibiscus',phrase:'Big as a saucer!',w:1928,h:2956,alt:'Hibiscus picture card for toddlers'},
  {order:9,file:'09-lotus.webp',name:'Lotus',phrase:'Floating on the pond.',w:1924,h:2952,alt:'Lotus picture card for toddlers'},
  {order:10,file:'10-lily.webp',name:'Lily',phrase:'Elegant and white.',w:1920,h:2950,alt:'Lily picture card for toddlers'},
  {order:11,file:'11-marigold.webp',name:'Marigold',phrase:'A ball of orange!',w:1916,h:2952,alt:'Marigold picture card for toddlers'},
  {order:12,file:'12-bluebell.webp',name:'Bluebell',phrase:'Little blue bells.',w:1912,h:2954,alt:'Bluebell picture card for toddlers'}
 ],
 interactive:{
  flow:{intro:'Ten little steps, in order: a welcome from your teacher, all twelve flowers, two gentle games, a look-and-smell walk, cards to print, a note from your teacher and one last check-in from you. Stop after any step — that is a complete class.',
   steps:[['1','Teacher welcome'],['2','Meet the flowers'],['3','Find the flower'],['4','Who am I?'],['5','Where flowers grow'],['6','Take it off screen'],['7','Print the cards'],['8','Teacher note'],['9','Parent review'],['10','Class complete']],
   beginHref:'#meet-the-flowers',beginLabel:'Meet the flowers',beginHint:'Cards work best up close — toddler on your lap.'},
  teacher:{welcome:'Let’s walk through the flower garden! Can you say their names with me?',note:'Roses to bluebells — every walk becomes a naming game. You do not need a garden; a window box, a park or a bunch of flowers at home works beautifully.'},
  principal:{note:'Your toddler does not need every flower name to stick. Big, bright pictures and your voice are doing the teaching — the words ride along, and one favourite flower repeated happily is a complete lesson.'},
  complete:{heading:'Class complete!',copy:'From the tall sunflower to the little bluebells — what a colourful walk.'},
  offScreen:{heading:'A look-and-smell flower hunt.',copy:'Take the names outside — or to a window box, a park or a bunch of flowers at home. Flowers are for looking at and smelling, not picking.',groups:[
   {title:'Try one today',items:[
    'Spot a flower on your walk and say its colour together.',
    'Smell a rose or a herb together — snif, snif, what does it smell like?',
    'Count the petals on a daisy — one, two, three… as far as your toddler goes.',
    'Find a bee visiting a flower and watch it quietly — the bee is working.',
    'Point at every yellow flower you can find, then try pink.'
   ]}
  ],note:'Flowers stay on the plant — picking is for grown-ups. One flower noticed and named together is a complete hunt, and a grown-up stays close the whole time.'},
  sections:[
   {type:'learn',id:'meet-the-flowers',eyebrow:'LEARN · MEET THE FLOWERS',heading:'Meet the flowers.',copy:'Twelve big, bright blooms, one at a time. Say the name clearly, and let your toddler point, sniff the air or sign along.',label:'the flowers',items:[
    {file:'01-sunflower.webp',say:'Tall and yellow, with a big brown middle.',find:'Can you reach up tall like a sunflower?'},
    {file:'02-rose.webp',say:'A rose — snif, snif, it smells lovely.',find:'Can you sniff the air like smelling a rose?'},
    {file:'03-tulip.webp',say:'A tulip is shaped like a little cup.',find:'Can you cup your hands like a tulip?'},
    {file:'04-daisy.webp',say:'White petals and a round gold middle.',find:'Can you make a big circle with your arms?'},
    {file:'05-daffodil.webp',say:'A daffodil blows its golden trumpet.',find:'Can you trumpet like a daffodil?'},
    {file:'06-poppy.webp',say:'A poppy is bright, bright red.',find:'Can you say a big hello-red?'},
    {file:'07-lavender.webp',say:'Lavender is purple and smells calm.',find:'Can you take one slow, calm breath?'},
    {file:'08-hibiscus.webp',say:'A hibiscus is big as a saucer.',find:'Can you open your hands wide, wide, wide?'},
    {file:'09-lotus.webp',say:'A lotus floats on the pond.',find:'Can you float your hand on the air like water?'},
    {file:'10-lily.webp',say:'A lily stands elegant and white.',find:'Can you stand up tall and still like a lily?'},
    {file:'11-marigold.webp',say:'A marigold is a ball of orange.',find:'Can you roll your hands round and round?'},
    {file:'12-bluebell.webp',say:'Bluebells are little blue bells.',find:'Can you ding-dong like a little bell?'}
   ]},
   {type:'play',id:'find-the-flower',eyebrow:'PLAY · FIND THE FLOWER',heading:'Find the flower.',copy:'Three big blooms, one question. You say the flower, your child taps it — a wrong tap simply means look together.',correctFeedback:'You found it!',incorrectFeedback:'Look again.',rounds:[
    {ask:'Find the sunflower.',say:'Find the sunflower.',choices:[{file:'04-daisy.webp',name:'The daisy'},{file:'01-sunflower.webp',name:'The sunflower',correct:true},{file:'12-bluebell.webp',name:'The bluebell'}]},
    {ask:'Where is the rose?',say:'Where is the rose?',choices:[{file:'02-rose.webp',name:'The rose',correct:true},{file:'06-poppy.webp',name:'The poppy'},{file:'03-tulip.webp',name:'The tulip'}]},
    {ask:'Find the bluebells.',say:'Find the bluebells.',choices:[{file:'07-lavender.webp',name:'The lavender'},{file:'09-lotus.webp',name:'The lotus'},{file:'12-bluebell.webp',name:'The bluebell',correct:true}]},
    {ask:'Can you find the marigold?',say:'Can you find the marigold?',choices:[{file:'11-marigold.webp',name:'The marigold',correct:true},{file:'05-daffodil.webp',name:'The daffodil'},{file:'10-lily.webp',name:'The lily'}]},
    {ask:'Where is the lotus?',say:'Where is the lotus?',choices:[{file:'09-lotus.webp',name:'The lotus',correct:true},{file:'08-hibiscus.webp',name:'The hibiscus'},{file:'04-daisy.webp',name:'The daisy'}]}
   ]},
   {type:'play',id:'who-am-i',eyebrow:'PLAY · WHO AM I?',heading:'Who am I?',copy:'A little clue, then three blooms. Say the clue slowly and let your child solve it — every guess is a good guess.',correctFeedback:'You found it!',incorrectFeedback:'Look again.',rounds:[
    {ask:'I am tall and yellow. Who am I?',say:'I am tall and yellow. Who am I?',choices:[{file:'03-tulip.webp',name:'The tulip'},{file:'01-sunflower.webp',name:'The sunflower',correct:true},{file:'06-poppy.webp',name:'The poppy'}]},
    {ask:'I smell lovely. Who am I?',say:'I smell lovely. Who am I?',choices:[{file:'02-rose.webp',name:'The rose',correct:true},{file:'11-marigold.webp',name:'The marigold'},{file:'10-lily.webp',name:'The lily'}]},
    {ask:'I am shaped like a cup. Who am I?',say:'I am shaped like a cup. Who am I?',choices:[{file:'03-tulip.webp',name:'The tulip',correct:true},{file:'04-daisy.webp',name:'The daisy'},{file:'07-lavender.webp',name:'The lavender'}]},
    {ask:'I float on the pond. Who am I?',say:'I float on the pond. Who am I?',choices:[{file:'08-hibiscus.webp',name:'The hibiscus'},{file:'09-lotus.webp',name:'The lotus',correct:true},{file:'05-daffodil.webp',name:'The daffodil'}]},
    {ask:'My bells are blue. Who am I?',say:'My bells are blue. Who am I?',choices:[{file:'12-bluebell.webp',name:'The bluebell',correct:true},{file:'07-lavender.webp',name:'The lavender'},{file:'06-poppy.webp',name:'The poppy'}]},
    {ask:'I am a ball of orange. Who am I?',say:'I am a ball of orange. Who am I?',choices:[{file:'11-marigold.webp',name:'The marigold',correct:true},{file:'01-sunflower.webp',name:'The sunflower'},{file:'10-lily.webp',name:'The lily'}]}
   ]},
   {type:'guide',id:'where-flowers-grow',eyebrow:'TOGETHER · WHERE FLOWERS GROW',heading:'Where flowers grow.',copy:'Flowers turn up in the most ordinary places — here is where to look, gently and without picking.',items:[
    {file:'01-sunflower.webp',feeling:'Sunflower',phrase:'In gardens and on farms, standing taller than you by summer.'},
    {file:'04-daisy.webp',feeling:'Daisy',phrase:'Right in the grass — little white stars on any lawn.'},
    {file:'07-lavender.webp',feeling:'Lavender',phrase:'In purple rows in gardens; bees visit it all day long.'},
    {file:'09-lotus.webp',feeling:'Lotus',phrase:'On warm, still ponds — floating on a big green pad.'},
    {file:'12-bluebell.webp',feeling:'Bluebell',phrase:'In woods in spring, ringing blue under the trees.'},
    {file:'02-rose.webp',feeling:'Rose',phrase:'In rose beds and parks — smell first, touch very gently if a grown-up says it is okay.'}
   ]}
  ]
 },
 printables:{
  mode:'cards',
  heading:'Print the garden flower cards.',
  intro:'Print the cards for simple naming games and colour-spotting warm-ups.',
  pack:'Garden Flowers Learning Cards',
  meta:'Age 2 · School Garden · Nature &amp; Talk',
  audience:'Made for you to print and use with your child — twelve cards, two to a page.',
  note:'The same twelve flowers from today’s class — handy for a quiet naming chat at the kitchen table.',
  printEyebrow:'PRINTABLE GARDEN FLOWER CARDS',
  printAria:'The twelve garden flower cards'
 },
 howTo:{heading:'Tips for Parents',paragraphs:[
  'Colours before names. Yellow! Pink! Purple! — a colour shouted happily is already flower learning.',
  'Add the senses: reach tall like a sunflower, sniff like a rose, ding like a bluebell. Movement sticks the words.',
  'Flowers stay on the plant. Looking and smelling is the game; picking is for grown-ups with a reason.'
 ],note:'<strong>Age ranges are a guide.</strong> Go at your child’s pace.'},
 pills:{heading:'Where to next?',items:[['School Garden','/toddler/2-years/school-garden/'],['Age 2 classes','/toddler/2-years/'],['Library','/learning-library/']]},
 hubBlurb:'Twelve big, bright blooms — sunflower, rose, tulip and more — with two gentle games and a look-and-smell flower hunt. Made for two-year-olds.',
 schema:{resourceType:'Interactive toddler class',level:'Toddler (age 2)',teaches:'Flower names for toddlers — sunflower, rose, tulip, daisy and more — through looking, naming and playing together',audience:'Parents of toddlers',keywords:'flowers for toddlers, flower names for kids, garden flowers for kids, flower flashcards for toddlers, flower picture cards, nature activities for toddlers, learning flower names'}
};

export const gthLesson={
 path:'/toddler/2-years/school-garden/garden-things/',
 seoTitle:'Garden Things for Toddlers | Picture Cards & Activities',
 title:'Garden Things for Toddlers | Picture Cards & Activities',
 h1:'Garden Things',
 description:'Name the things in the garden with your 2-year-old — the tree, the watering can, the wheelbarrow and more — with picture cards, two gentle games and a garden walk.',
 ogAlt:'Garden things picture cards for toddlers from Kiddo School',
 ogImage:toddlerBase+'garden-things-age-2/01-flower.webp',
 schemaImage:toddlerBase+'garden-things-age-2/01-flower.webp',
 eyebrow:'SCHOOL GARDEN · GARDEN THINGS',
 crumbs:[['Toddler','/toddler/'],['Age 2','/toddler/2-years/'],['School Garden','/toddler/2-years/school-garden/'],['Garden Things']],
 chips:[['Age','2 Years'],['Subject','Nature &amp; Talk'],['Class','School Garden'],['Duration','3–5 minutes']],
 subject:'Nature &amp; Talk',
 ledes:['A garden is full of things with names: the tree at the gate, the watering can, the wheelbarrow, the bench where you sit. Twelve garden things, one big picture at a time.',
  'Nothing to prepare and nothing to read. You say the name, your toddler points or wanders over — a moment on a card counts, and the real garden can wait for your next walk.'],
 startHint:'Start with the flower — the one they already know.',
 startLabel:'Start the Class',
 folder:'garden-things-age-2/',
 r2Base:toddlerBase,
 eagerFirst:false,
 cover:null,
 cards:[
  {order:1,file:'01-flower.webp',name:'Flower',phrase:'A flower!',w:1414,h:2000,alt:'Flower picture card for toddlers'},
  {order:2,file:'02-tree.webp',name:'Tree',phrase:'Big and green.',w:1414,h:2000,alt:'Tree picture card for toddlers'},
  {order:3,file:'03-grass.webp',name:'Grass',phrase:'Soft and tickly.',w:1414,h:2000,alt:'Grass picture card for toddlers'},
  {order:4,file:'04-bush.webp',name:'Bush',phrase:'Round and leafy.',w:1414,h:2000,alt:'Bush picture card for toddlers'},
  {order:5,file:'05-garden-hose.webp',name:'Garden hose',phrase:'Whoosh — water!',w:1414,h:2000,alt:'Garden hose picture card for toddlers'},
  {order:6,file:'06-watering-can.webp',name:'Watering can',phrase:'Pss-pss — drink up, plants!',w:1414,h:2000,alt:'Watering can picture card for toddlers'},
  {order:7,file:'07-shovel.webp',name:'Shovel',phrase:'Dig, dig, dig!',w:1414,h:2000,alt:'Shovel picture card for toddlers'},
  {order:8,file:'08-rake.webp',name:'Rake',phrase:'Scratch, scratch.',w:1414,h:2000,alt:'Rake picture card for toddlers'},
  {order:9,file:'09-wheelbarrow.webp',name:'Wheelbarrow',phrase:'Carry it all!',w:1414,h:2000,alt:'Wheelbarrow picture card for toddlers'},
  {order:10,file:'10-plant-pot.webp',name:'Plant pot',phrase:'A little home for a plant.',w:1414,h:2000,alt:'Plant pot picture card for toddlers'},
  {order:11,file:'11-fence.webp',name:'Fence',phrase:'Around the garden.',w:1414,h:2000,alt:'Fence picture card for toddlers'},
  {order:12,file:'12-garden-bench.webp',name:'Garden bench',phrase:'Time to sit and rest.',w:1414,h:2000,alt:'Garden bench picture card for toddlers'}
 ],
 interactive:{
  flow:{intro:'Ten little steps, in order: a welcome from your teacher, all twelve garden things, two gentle games, a name-it-as-you-go walk, cards to print, a note from your teacher and one last check-in from you. Stop after any step — that is a complete class.',
   steps:[['1','Teacher welcome'],['2','Meet the garden things'],['3','Find the thing'],['4','What is it for?'],['5','Around the garden'],['6','Take it off screen'],['7','Print the cards'],['8','Teacher note'],['9','Parent review'],['10','Class complete']],
   beginHref:'#meet-the-garden-things',beginLabel:'Meet the garden things',beginHint:'Cards work best up close — toddler on your lap.'},
  teacher:{welcome:'Let’s look around the garden! What things can we name together?',note:'The watering can, the bench, the fence — every trip outside becomes a name-it game. No garden? A park, a balcony or a street tree all count.'},
  principal:{note:'Tool words are everyday words. Saying watering can while you water a plant is the whole lesson — and the tools themselves stay grown-up territory.'},
  complete:{heading:'Class complete!',copy:'From the tall tree to the bench where you rest — what a garden full of names.'},
  offScreen:{heading:'A name-it-as-you-go garden walk.',copy:'Take the names outside — or to a park, a balcony or a window box if a garden is far away.',groups:[
   {title:'Try one today',items:[
    'Water a plant together — pss-pss with the watering can or a cup.',
    'Touch the tree trunk on your walk and say tree, big tree.',
    'Sit on a bench and name three things you can see from it.',
    'Spot a fence, a wheelie bin, a gate — garden words live on every street.',
    'Dig in a sandpit or a pot of soil with a spoon — your own little shovel.'
   ]}
  ],note:'Real tools are grown-up tools: shovels and rakes and hoses stay in grown-up hands. Watching, naming and your own spoon-digging is the toddler version — with a grown-up close the whole time.'},
  sections:[
   {type:'learn',id:'meet-the-garden-things',eyebrow:'LEARN · MEET THE GARDEN THINGS',heading:'Meet the garden things.',copy:'Twelve garden things, one at a time. Say the name clearly, and let your toddler point, wiggle or wander along.',label:'the garden things',items:[
    {file:'01-flower.webp',say:'A flower — bright and pretty.',find:'Can you point at something flowery?'},
    {file:'02-tree.webp',say:'A tree — big, with a woody trunk.',find:'Can you reach up high like a tree?'},
    {file:'03-grass.webp',say:'Grass — soft and tickly on your toes.',find:'Can you wiggle your toes in grass?'},
    {file:'04-bush.webp',say:'A bush — round and leafy.',find:'Can you make yourself round like a bush?'},
    {file:'05-garden-hose.webp',say:'A garden hose — whoosh, water!',find:'Can you say whoosh?'},
    {file:'06-watering-can.webp',say:'A watering can — the plants drink from it.',find:'Can you tip-pour like watering?'},
    {file:'07-shovel.webp',say:'A shovel digs big holes — dig, dig!',find:'Can you dig with your hands?'},
    {file:'08-rake.webp',say:'A rake pulls leaves into a pile — scratch, scratch.',find:'Can you rake the leaves with your arm?'},
    {file:'09-wheelbarrow.webp',say:'A wheelbarrow carries everything.',find:'Can you push an invisible wheelbarrow?'},
    {file:'10-plant-pot.webp',say:'A plant pot — a little home for a plant.',find:'Can you hold a little pot in your hands?'},
    {file:'11-fence.webp',say:'A fence goes around the garden.',find:'Can you make fence arms — up, up, up?'},
    {file:'12-garden-bench.webp',say:'A garden bench — time to sit and rest.',find:'Can you sit down slowly like on a bench?'}
   ]},
   {type:'play',id:'find-the-thing',eyebrow:'PLAY · FIND THE THING',heading:'Find the thing.',copy:'Three pictures, one question. You say the garden thing, your child taps it — a wrong tap simply means look together.',correctFeedback:'You found it!',incorrectFeedback:'Look again.',rounds:[
    {ask:'Find the tree.',say:'Find the tree.',choices:[{file:'04-bush.webp',name:'The bush'},{file:'02-tree.webp',name:'The tree',correct:true},{file:'03-grass.webp',name:'The grass'}]},
    {ask:'Where is the watering can?',say:'Where is the watering can?',choices:[{file:'05-garden-hose.webp',name:'The garden hose'},{file:'06-watering-can.webp',name:'The watering can',correct:true},{file:'07-shovel.webp',name:'The shovel'}]},
    {ask:'Find the wheelbarrow.',say:'Find the wheelbarrow.',choices:[{file:'09-wheelbarrow.webp',name:'The wheelbarrow',correct:true},{file:'10-plant-pot.webp',name:'The plant pot'},{file:'12-garden-bench.webp',name:'The garden bench'}]},
    {ask:'Can you find the rake?',say:'Can you find the rake?',choices:[{file:'07-shovel.webp',name:'The shovel'},{file:'08-rake.webp',name:'The rake',correct:true},{file:'11-fence.webp',name:'The fence'}]},
    {ask:'Where is the garden bench?',say:'Where is the garden bench?',choices:[{file:'11-fence.webp',name:'The fence'},{file:'12-garden-bench.webp',name:'The garden bench',correct:true},{file:'02-tree.webp',name:'The tree'}]}
   ]},
   {type:'play',id:'what-is-it-for',eyebrow:'PLAY · WHAT IS IT FOR?',heading:'What is it for?',copy:'A little clue about the job each thing does, then three pictures. Every guess is a good guess.',correctFeedback:'You found it!',incorrectFeedback:'Look again.',rounds:[
    {ask:'I water the plants. What am I?',say:'I water the plants. What am I?',choices:[{file:'05-garden-hose.webp',name:'The garden hose'},{file:'06-watering-can.webp',name:'The watering can',correct:true},{file:'10-plant-pot.webp',name:'The plant pot'}]},
    {ask:'I dig big holes. What am I?',say:'I dig big holes. What am I?',choices:[{file:'08-rake.webp',name:'The rake'},{file:'07-shovel.webp',name:'The shovel',correct:true},{file:'06-watering-can.webp',name:'The watering can'}]},
    {ask:'I carry soil and plants. What am I?',say:'I carry soil and plants. What am I?',choices:[{file:'09-wheelbarrow.webp',name:'The wheelbarrow',correct:true},{file:'12-garden-bench.webp',name:'The garden bench'},{file:'02-tree.webp',name:'The tree'}]},
    {ask:'You sit and rest on me. What am I?',say:'You sit and rest on me. What am I?',choices:[{file:'11-fence.webp',name:'The fence'},{file:'10-plant-pot.webp',name:'The plant pot'},{file:'12-garden-bench.webp',name:'The garden bench',correct:true}]},
    {ask:'I am a home for a little plant. What am I?',say:'I am a home for a little plant. What am I?',choices:[{file:'10-plant-pot.webp',name:'The plant pot',correct:true},{file:'03-grass.webp',name:'The grass'},{file:'05-garden-hose.webp',name:'The garden hose'}]}
   ]},
   {type:'guide',id:'around-the-garden',eyebrow:'TOGETHER · AROUND THE GARDEN',heading:'Around the garden.',copy:'Where each thing lives and what it does — a little tour for your next walk outside.',items:[
    {file:'02-tree.webp',feeling:'Tree',phrase:'Standing at the gate or in the park — bark to touch, leaves to peek at.'},
    {file:'06-watering-can.webp',feeling:'Watering can',phrase:'By the tap or the shed, ready for plant drink time.'},
    {file:'11-fence.webp',feeling:'Fence',phrase:'Around the edge — follow it all the way round the garden.'},
    {file:'12-garden-bench.webp',feeling:'Garden bench',phrase:'In a sunny or shady spot — the best seat for a snack.'},
    {file:'09-wheelbarrow.webp',feeling:'Wheelbarrow',phrase:'Tipped by the shed — one wheel, two handles, big jobs.'},
    {file:'03-grass.webp',feeling:'Grass',phrase:'Under your feet everywhere — bare toes love it in summer.'}
   ]}
  ]
 },
 printables:{
  mode:'cards',
  heading:'Print the garden things cards.',
  intro:'Print the cards for simple naming games and garden-walk warm-ups.',
  pack:'Garden Things Learning Cards',
  meta:'Age 2 · School Garden · Nature &amp; Talk',
  audience:'Made for you to print and use with your child — twelve cards, two to a page.',
  note:'The same twelve garden things from today’s class — handy for a quiet naming chat at the kitchen table.',
  printEyebrow:'PRINTABLE GARDEN THING CARDS',
  printAria:'The twelve garden things cards'
 },
 howTo:{heading:'Tips for Parents',paragraphs:[
  'Name the things you pass — tree, gate, bench. Everyday objects are the easiest words to practise.',
  'Let them do the toddler version: water with a cup, dig with a spoon, push an invisible wheelbarrow.',
  'Real tools stay in grown-up hands. Naming a shovel is plenty — touching it can wait for big-kid years.'
 ],note:'<strong>Age ranges are a guide.</strong> Go at your child’s pace.'},
 pills:{heading:'Where to next?',items:[['School Garden','/toddler/2-years/school-garden/'],['Age 2 classes','/toddler/2-years/'],['Library','/learning-library/']]},
 hubBlurb:'Twelve things every garden holds — tree, watering can, wheelbarrow, bench and more — with two gentle games and a name-it-as-you-go walk. Made for two-year-olds.',
 schema:{resourceType:'Interactive toddler class',level:'Toddler (age 2)',teaches:'Everyday garden words for toddlers — tree, grass, watering can, wheelbarrow and more — through looking, naming and playing together',audience:'Parents of toddlers',keywords:'garden words for toddlers, garden vocabulary for kids, things in the garden for kids, garden objects flashcards, picture cards for toddlers, nature activities for toddlers'}
};

export function classLessonSchema(site,L){
 return [
  {'@context':'https://schema.org','@type':'LearningResource',name:L.title,description:L.description,url:site+L.path,image:L.schemaImage,inLanguage:'en',learningResourceType:L.schema.resourceType||'Interactive baby class',educationalLevel:L.schema.level,isAccessibleForFree:true,educationalUse:'Home learning activity',teaches:L.schema.teaches,audience:{'@type':'Audience',audienceType:L.schema.audience},keywords:L.schema.keywords},
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
export function stagePageBody({chips,stageLessons,soon,subject,extra=''}){
 return `<section class="wrap section compact"><div class="fc-chips lesson-chips">${chips.map(([k,v])=>`<span><strong>${k}</strong> ${v}</span>`).join('')}</div>
 <div class="fc-stages">${stageLessons.map(L=>lessonStageCard(L,'Lesson '+(lessons.indexOf(L)+1),L.subject||subject||'See')).join('')}${soon||''}</div>${extra}
 <p class="lesson-note"><strong>Every baby develops differently.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines.</p></section>`;
}
export const stages=[
 {name:'Newborn 1',age:'Birth–6 Weeks',href:'/newborn/0-6-weeks/',lesson:hcLesson},
 {name:'Newborn 2',age:'6–12 Weeks',href:'/newborn/6-12-weeks/',lesson:fvLesson},
 {name:'Infant 1',age:'3–4 Months',href:'/baby/3-4-months/',lesson:cfoLesson},
 {name:'Infant 2',age:'4–6 Months',href:'/baby/4-6-months/',lesson:fwftLesson},
 {name:'Explorer 1',age:'6–9 Months',href:'/baby/6-9-months/',lesson:aeoLesson},
 {name:'Explorer 2',age:'9–12 Months',href:'/baby/9-12-months/',lesson:fabLesson},
 {name:'Toddler 1',age:'12–18 Months',href:'/toddler/12-18-months/',lesson:fwfhLesson},
 {name:'Toddler 2',age:'18–24 Months',href:'/toddler/18-24-months/',lesson:fcLesson},
 {name:'Toddler 3',age:'Age 2',href:'/toddler/2-years/',lesson:csLesson},
 {name:'Toddler 4',age:'Age 2',href:'/toddler/2-years/',lesson:msLesson},
 {name:'Toddler 5',age:'Age 2',href:'/toddler/2-years/',lesson:anLesson},
 {name:'Toddler 6',age:'Age 2',href:'/toddler/2-years/',lesson:vhLesson},
 {name:'Toddler 7',age:'Age 2',href:'/toddler/2-years/',lesson:emLesson},
 {name:'Toddler 8',age:'Age 2',href:'/toddler/2-years/',lesson:gbLesson}
];
const tcImg=(base,file,w,h,alt,attrs='')=>`<img src="${base}${file}" width="${w}" height="${h}" alt="${alt}"${attrs}>`;
export function toddlerClassBody(L){
 const base=(L.r2Base||lessonsBase)+L.folder;
 const altOf=Object.fromEntries(L.cards.map(c=>[c.file,c.alt]));
 const dimOf=Object.fromEntries(L.cards.map(c=>[c.file,[c.w,c.h]]));
 const I=L.interactive;
 const heroInner=`<span class="eyebrow">${L.eyebrow}</span>
  <h1>${esc(L.h1)}</h1>
  <div class="fc-chips lesson-chips">${L.chips.map(([k,v])=>`<span><strong>${k}</strong> ${v}</span>`).join('')}</div>
  ${L.ledes.map(p=>`<p class="lesson-lede">${p}</p>`).join('\n  ')}
  <div class="lesson-start"><a class="button" href="#todays-class">${L.startLabel||'Start Today’s Class'} <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">${L.startHint}</span></div>`;
 const hero=L.cover?`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy">${heroInner}</div><figure class="lesson-cover"><img src="${L.ogImage}" width="${L.cover.w}" height="${L.cover.h}" alt="${L.cover.alt}"></figure></article>`:`<article class="wrap lesson-hero"><div class="lesson-hero-copy">${heroInner}</div></article>`;
 const learnViewer=(id,eyebrow,heading,copy,items,label)=>{
  const total=items.length;
  const grid=items.map(it=>`<figure class="lv-card">${tcImg(base,it.file,it.w,it.h,it.alt,` loading="lazy" data-lv-say="${esc(it.say)}" data-lv-find="${esc(it.find)}"`)}</figure>`).join('');
  return `<section class="wrap lesson-section" id="${id}" aria-label="${esc(heading)}">
  <span class="eyebrow">${eyebrow}</span>
  <h2>${heading}</h2>
  <p class="lesson-copy">${copy}</p>
  <div class="lv-frame" data-lesson-viewer>
   <div class="lv-stage" data-lv-stage></div>
   <p class="lv-caption" data-lv-caption hidden></p>
   <div class="lv-controls" data-lv-controls><button type="button" class="lv-btn" data-lv-prev>Previous</button><span class="lv-count" data-lv-count aria-live="polite" aria-atomic="true">Card 1 of ${total}</span><button type="button" class="lv-btn" data-lv-next>Next</button></div>
   <div class="lv-actions" data-lv-actions><button type="button" class="lv-btn lv-ghost" data-lv-full>Full screen</button></div>
   <div class="lv-begin"><button type="button" class="button" data-lv-start>Start ${label}</button><span class="lv-beginhint">Or simply scroll: all ${total} cards are below.</span></div>
  </div>
  <div class="lv-grid" data-lv-grid>${grid}</div>
 </section>`;
 };
 const choiceBtn=c=>`<button type="button" class="tc-choice"${c.correct?' data-tc-correct="true"':''} aria-label="${esc(c.name)}">${tcImg(base,c.file,dimOf[c.file][0],dimOf[c.file][1],altOf[c.file],' loading="lazy"')}</button>`;
 const roundsHtml=rs=>rs.map(r=>`<div class="tc-round" data-tc-round data-tc-ask="${esc(r.ask)}"><p class="tc-ask">${r.say}</p><div class="tc-choices" role="group" aria-label="${esc(r.ask)}">${r.choices.map(choiceBtn).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`).join('');
 const matchRoundsHtml=rs=>rs.map(r=>`<div class="tc-round tc-match" data-tc-round data-tc-ask="${esc(r.ask)}"><p class="tc-ask">${r.say}</p><figure class="tc-target">${tcImg(base,r.target.file,dimOf[r.target.file][0],dimOf[r.target.file][1],altOf[r.target.file],' loading="lazy"')}</figure><div class="tc-choices" role="group" aria-label="${esc(r.ask)}">${r.choices.map(choiceBtn).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`).join('');
 const playSection=(id,eyebrow,heading,copy,game)=>`<section class="wrap lesson-section tc-game" id="${id}" aria-label="${esc(heading)}"${game.correctFeedback?` data-tc-correct="${esc(game.correctFeedback)}"`:''}${game.incorrectFeedback?` data-tc-incorrect="${esc(game.incorrectFeedback)}"`:''}>
  <span class="eyebrow">${eyebrow}</span>
  <h2>${heading}</h2>
  <p class="lesson-copy">${copy}</p>
  ${roundsHtml(game.rounds)}
 </section>`;
 const flowList=F=>`<ol class="tc-flow">${F.steps.map(([n,label])=>`<li><span>${n}</span> ${label}</li>`).join('')}</ol>`;
 const welcome=`<section class="wrap lesson-section" id="todays-class" aria-label="Today’s class">
  <span class="eyebrow">TODAY’S CLASS</span>
  <h2>How today’s class works.</h2>
  <p class="lesson-copy">${I.flow?I.flow.intro:'Eight little steps, in order: a welcome from your teacher, learn colors, play with colors, learn shapes, play with shapes, match a pair, take it off screen, then print the activity pack if you’d like to continue away from the screen. Stop after any step — that is a complete class, and there is never a score at the end.'}</p>
  ${I.flow?flowList(I.flow):`<ol class="tc-flow">
   <li><span>1</span> Teacher welcome</li>
   <li><span>2</span> Learn colors</li>
   <li><span>3</span> Play with colors</li>
   <li><span>4</span> Learn shapes</li>
   <li><span>5</span> Play with shapes</li>
   <li><span>6</span> Find &amp; match</li>
   <li><span>7</span> Take it off screen</li>
   <li><span>8</span> Download &amp; print</li>
  </ol>`}
  <div class="tc-note-block tc-teacher"><span class="eyebrow">TEACHER WELCOME</span><p class="tc-say">“${I.teacher.welcome}”</p><p class="tc-who">— Your Kiddo School teacher</p></div>
  <div class="lesson-start"><a class="button" href="${I.flow?I.flow.beginHref:'#learn-colors'}">${(I.flow&&I.flow.beginLabel)||'Begin the class'} <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">${I.flow?I.flow.beginHint:'Grown-up nearby, toddler on the lap, phone at a comfy distance.'}</span></div>
 </section>`;
 const huntHtml=g=>`<div class="tc-hunt"><h3>${g.title}</h3><ul class="lesson-prompts">${g.items.map(p=>`<li>${p}</li>`).join('')}</ul></div>`;
 const offScreen=`<section class="wrap lesson-section" id="off-screen" aria-label="Take it off screen">
  <span class="eyebrow">TAKE IT OFF SCREEN</span>
  <h2>${I.offScreen.heading}</h2>
  <p class="lesson-copy">${I.offScreen.copy}</p>
  ${I.offScreen.groups?I.offScreen.groups.map(huntHtml).join(''):`<div class="tc-hunt"><h3>Color hunt</h3><ul class="lesson-prompts">${I.offScreen.colorHunt.map(p=>`<li>${p}</li>`).join('')}</ul></div>
  <div class="tc-hunt"><h3>Shape hunt</h3><ul class="lesson-prompts">${I.offScreen.shapeHunt.map(p=>`<li>${p}</li>`).join('')}</ul></div>`}
  <p class="lesson-note">${I.offScreen.note}</p>
  ${L.printables&&L.printables.mode!=='cards'?`<p class="fc-hint">There is a printable version of these hunts in the <a href="#printables">Download &amp; Print</a> pack below — handy for the fridge or the weekend.</p>`:''}
 </section>`;
 const printSection=L.printables?(()=>{
  const P=L.printables;
  if(P.mode==='cards'){
   const printPath=L.path+'print/';
   return `<section class="wrap lesson-section tc-printables" id="printables" aria-label="Print the cards">
  <span class="eyebrow">PRINT THE CARDS</span>
  <h2>${P.heading}</h2>
  <p class="lesson-copy">${P.intro}</p>
  <div class="hero-actions tc-print-actions"><a class="button" href="${printPath}">View Printable Cards <span aria-hidden="true">↗</span></a><button type="button" class="button button-ghost" data-tc-print-open="${printPath}?print=1">Print Cards</button></div>
  <p class="lesson-note">${P.note}</p>
 </section>`;
  }
  const pBase=(L.r2Base||lessonsBase)+P.folder;
  const printPath=L.path+'print/';
  return `<section class="wrap lesson-section tc-printables" id="printables" aria-label="Download and print">
  <span class="eyebrow">DOWNLOAD &amp; PRINT</span>
  <h2>${P.heading}</h2>
  <p class="lesson-copy">${P.intro}</p>
  <div class="tc-pack-head">
   <div><span class="eyebrow">PRINTABLE ACTIVITY PACK</span><h3>${P.pack}</h3><p class="tc-pack-meta">${P.meta}</p><p class="tc-pack-audience">${P.audience}</p></div>
   <div class="hero-actions tc-print-actions"><a class="button" href="${printPath}">View Printable Pack <span aria-hidden="true">↗</span></a><button type="button" class="button button-ghost" data-tc-print-open="${printPath}?print=1">Print Activity Pack</button></div>
  </div>
  <ol class="tc-pack-contents">${P.pages.map((p,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span>${p.title}</li>`).join('')}</ol>
  <div class="tc-pack-grid">${P.pages.map((p,i)=>`<figure class="tc-pack-card"><a href="${pBase}${p.file}" aria-label="Open full-size ${esc(p.title)} page"><img src="${pBase}${p.file}" width="1414" height="2000" alt="${p.alt}" loading="lazy"></a><figcaption><strong>${p.title}</strong><span>Page ${i+1} of ${P.pages.length}</span></figcaption></figure>`).join('')}</div>
  <p class="lesson-note">${P.note}</p>
 </section>`;
 })():'';
 const teacherNote=`<section class="wrap lesson-section"><span class="eyebrow">TEACHER NOTE</span><h2>One last word from class.</h2><div class="tc-note-block tc-teacher"><p class="tc-say">“${I.teacher.note}”</p><p class="tc-who">— Your Kiddo School teacher</p></div></section>`;
 const principalNote=`<section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2><p class="lesson-copy">${I.principal.note}</p><p class="lesson-copy"><a href="/about/#principal">More from the Principal’s Office <span aria-hidden="true">↗</span></a></p></section>`;
 const prevCard=L.pathNav&&L.pathNav.prev?`<a class="fc-stage lesson-card-link" href="${L.pathNav.prev.href}"><div class="fc-stage-pills"><span class="fc-age">Previous class</span><span class="fc-class">${esc(L.pathNav.prev.range)}</span></div><h3>${esc(L.pathNav.prev.title)}</h3><span class="fc-open">Open this class <span aria-hidden="true">↗</span></span></a>`:'';
 const nextCard=L.pathNav&&L.pathNav.next?`<a class="fc-stage lesson-card-link" href="${L.pathNav.next.href}"><div class="fc-stage-pills"><span class="fc-age">Next class</span><span class="fc-class">${esc(L.pathNav.next.range)}</span></div><h3>${esc(L.pathNav.next.title)}</h3><span class="fc-open">Open this class <span aria-hidden="true">↗</span></span></a>`:`<a class="fc-stage lesson-card-link" href="/learning-path/"><div class="fc-stage-pills"><span class="fc-age">Keep going</span><span class="fc-class">Learning path</span></div><h3>Explore the Learning Path</h3><p>More classes are on the drawing table. Find where your child is today and what comes next.</p><span class="fc-open">Open the Learning Path <span aria-hidden="true">↗</span></span></a>`;
 const complete=`<section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>${I.complete.heading}</h2>
  <p class="lesson-copy">${I.complete.copy} However many rounds you played, however long it took, that was the whole class — and stopping early is allowed too.</p>
  <div class="lesson-path">${prevCard}${nextCard}</div>
 </section>`;
 const tips=`<section class="wrap lesson-section" id="how-to">
  <span class="eyebrow">TIPS FOR PARENTS</span>
  <h2>${L.howTo.heading}</h2>
  ${L.howTo.paragraphs.map(p=>`<p class="lesson-copy">${p}</p>`).join('\n  ')}
  <p class="lesson-note">${L.howTo.note}</p>
 </section>`;
 const pills=L.pills?`<section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>${L.pills.heading}</h2><div class="lesson-linkrow">${L.pills.items.map(([label,href])=>`<a class="lesson-pill-link" href="${href}">${label}</a>`).join('')}</div></section>`:'';
 if(I.sections){
  const numBtn=(label,n,correct)=>`<button type="button" class="tc-choice tc-num"${correct?' data-tc-correct="true"':''} aria-label="${esc(label)}"><span aria-hidden="true">${n}</span></button>`;
  const promptRoundsHtml=rs=>rs.map(r=>`<div class="tc-round tc-prompt" data-tc-round data-tc-ask="${esc(r.ask)}"><p class="tc-ask">${r.say}</p><figure class="tc-target">${tcImg(base,r.file,dimOf[r.file][0],dimOf[r.file][1],altOf[r.file],' loading="lazy"')}</figure><div class="tc-choices tc-nums" role="group" aria-label="${esc(r.ask)}">${r.positions.map((p,i)=>numBtn(p,i+1,i+1===r.correct)).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`).join('');
  const renderSection=s=>{
   if(s.type==='learn')return learnViewer(s.id,s.eyebrow,s.heading,s.copy,s.items.map(it=>({...it,alt:it.alt||altOf[it.file],w:dimOf[it.file][0],h:dimOf[it.file][1]})),s.label);
   if(s.type==='play')return playSection(s.id,s.eyebrow,s.heading,s.copy,s);
   if(s.type==='match')return `<section class="wrap lesson-section tc-game" id="${s.id}" aria-label="${esc(s.heading)}">
  <span class="eyebrow">${s.eyebrow}</span>
  <h2>${s.heading}</h2>
  <p class="lesson-copy">${s.copy}</p>
  ${matchRoundsHtml(s.rounds)}
 </section>`;
   if(s.type==='prompt')return `<section class="wrap lesson-section tc-game" id="${s.id}" aria-label="${esc(s.heading)}"${s.correctFeedback?` data-tc-correct="${esc(s.correctFeedback)}"`:''}${s.incorrectFeedback?` data-tc-incorrect="${esc(s.incorrectFeedback)}"`:''}>
  <span class="eyebrow">${s.eyebrow}</span>
  <h2>${s.heading}</h2>
  <p class="lesson-copy">${s.copy}</p>
  ${promptRoundsHtml(s.rounds)}
 </section>`;
   if(s.type==='guide')return `<section class="wrap lesson-section" id="${s.id}" aria-label="${esc(s.heading)}">
  <span class="eyebrow">${s.eyebrow}</span>
  <h2>${s.heading}</h2>
  <p class="lesson-copy">${s.copy}</p>
  <ul class="tc-guide">${s.items.map(it=>`<li class="tc-guide-row">${tcImg(base,it.file,dimOf[it.file][0],dimOf[it.file][1],altOf[it.file],' loading="lazy"')}<div><h3>${esc(it.feeling)}</h3><p class="tc-guide-say">“${it.phrase}”</p></div></li>`).join('')}</ul>
 </section>`;
   return '';
  };
  return `${crumbNav(L.crumbs)}
 ${hero}
 ${welcome}
 ${I.sections.map(renderSection).join('\n ')}
 ${offScreen}
 ${printSection}
 ${teacherNote}
 ${principalNote}
 ${complete}
 ${tips}
 ${pills}`;
 }
 return `${crumbNav(L.crumbs)}
 ${hero}
 ${welcome}
 ${learnViewer('learn-colors','LEARN · COLORS','Learn colors together.','Show one card at a time and say the color clearly. The names on the screen are for you — your toddler does not need to read. After a card, pause and let the color sink in.',I.colors,'the colors')}
 ${playSection('play-colors','PLAY · COLORS','Play with colors.','Big pictures, one question at a time. Ask the question, let your child tap, and celebrate every try — a wrong tap simply means look together.',I.playColors)}
 ${learnViewer('learn-shapes','LEARN · SHAPES','Learn basic shapes.','This is a circle. Look at the triangle. Names first, tracing second: little fingers can trace each shape in the air while you say the word.',I.shapes,'the shapes')}
 ${playSection('play-shapes','PLAY · SHAPES','Play with shapes.','Same game, new shapes. Keep it playful and let your child take the lead — tapping the wrong shape is part of learning.',I.playShapes)}
 <section class="wrap lesson-section tc-game" id="find-match" aria-label="Play and match">
  <span class="eyebrow">FIND &amp; MATCH</span>
  <h2>Play and match.</h2>
  <p class="lesson-copy">Show the big picture at the top, then ask your child to find the same one below. Two rounds for colors, two for shapes — plenty for one sitting.</p>
  <h3>Color match</h3>
  ${matchRoundsHtml(I.matchColor.rounds)}
  <h3>Shape match</h3>
  ${matchRoundsHtml(I.matchShape.rounds)}
 </section>
 ${offScreen}
 ${printSection}
 ${teacherNote}
 ${principalNote}
 ${complete}
 ${tips}
 ${pills}`;
}
export function printCardsBody(L){
 const P=L.printables;
 const base=(L.r2Base||lessonsBase)+L.folder;
 const crumbs=[...L.crumbs,['Printable Cards',L.path+'print/']];
 const sheets=L.cards.reduce((rows,c,i)=>{if(i%2===0)rows.push([]);rows[rows.length-1].push(c);return rows;},[]);
 return `${crumbNav(crumbs)}
 <section class="wrap print-head">
  <span class="eyebrow">${P.printEyebrow||'PRINTABLE VEHICLE CARDS'}</span>
  <h1>${P.pack}</h1>
  <p class="tc-pack-meta">${P.meta}</p>
  <p class="lesson-copy">${P.audience} The cards print in card order — cut them out or use them as they are. When you are ready, choose Print Cards.</p>
  <div class="hero-actions tc-print-actions"><button type="button" class="button" data-tc-print-view>Print Cards</button><a class="button button-ghost" href="${L.path}">Back to class <span aria-hidden="true">↗</span></a></div>
  <p class="fc-hint">Printing happens in your browser — nothing is uploaded and nothing is installed. No PDF is involved.</p>
 </section>
 <section class="wrap tc-print-pages" aria-label="${esc(P.printAria||'The twenty vehicle learning cards')}">
  ${sheets.map(pair=>`<div class="tc-print-sheet">${pair.map(c=>`<figure class="tc-print-page"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${c.alt}"></figure>`).join('')}</div>`).join('\n  ')}
 </section>`;
}
export function printPackBody(L){
 const P=L.printables;
 const pBase=(L.r2Base||lessonsBase)+P.folder;
 const crumbs=[...L.crumbs,['Printable Pack','/toddler/2-years/colors-and-shapes/print/']];
 return `${crumbNav(crumbs)}
 <section class="wrap print-head">
  <span class="eyebrow">PRINTABLE ACTIVITY PACK</span>
  <h1>${P.pack}</h1>
  <p class="tc-pack-meta">${P.meta}</p>
  <p class="lesson-copy">${P.audience} Print all eight pages in order, or open any single page full size from the previews. When you are ready, choose Print Activity Pack and pick “Fit to page”.</p>
  <div class="hero-actions tc-print-actions"><button type="button" class="button" data-tc-print-view>Print Activity Pack</button><a class="button button-ghost" href="${L.path}">Back to class <span aria-hidden="true">↗</span></a></div>
  <p class="fc-hint">Printing happens in your browser — one activity per printed page, in order. Nothing is uploaded and nothing is installed.</p>
 </section>
 <section class="wrap tc-print-pages" aria-label="The eight printable pages">
  ${P.pages.map((p,i)=>`<figure class="tc-print-page"><img src="${pBase}${p.file}" width="1414" height="2000" alt="${p.alt}"${i===0?'':' loading="lazy"'}><figcaption><strong>${String(i+1).padStart(2,'0')} · ${p.title}</strong></figcaption></figure>`).join('')}
 </section>`;
}
