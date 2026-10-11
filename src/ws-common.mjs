// Kiddo School — worksheet registry: subject metadata + the shared
// parent guidance each class's worksheets render (how-to steps and tips are
// genuinely shared inside a class; the per-activity copy in the data files
// is written per worksheet and never repeated across subjects).

export const WS_BASE='/worksheets/';
export const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';

export const SUBJECTS={
 shapes:{key:'shapes',label:'Shapes, Patterns & Sorting',crumb:'Shapes',classNum:25,classPath:'/preschool/4-years/shapes-patterns-and-sorting/',classTitle:'Shapes, Patterns & Sorting (Class 25)',gameLib:'/preschool/shapes/adventures/',gameLibTitle:'Shape Adventures',tint:'#eef4e6',accent:'#4a9e4f'},
 colors:{key:'colors',label:'Colors, Mixing & Creativity',crumb:'Colors',classNum:26,classPath:'/preschool/4-years/colors-mixing-and-creativity/',classTitle:'Colors, Mixing & Creativity (Class 26)',gameLib:'/preschool/colors/adventures/',gameLibTitle:'Colors & Creativity',tint:'#fdeeee',accent:'#e0568c'},
 writing:{key:'writing',label:'Early Writing & Pencil Control',crumb:'Writing',classNum:27,classPath:'/preschool/4-years/early-writing-and-pencil-control/',classTitle:'Early Writing & Pencil Control (Class 27)',gameLib:'/preschool/writing/adventures/',gameLibTitle:'Writing Adventures',tint:'#eaf2fb',accent:'#5aa7d6'},
 maths:{key:'maths',label:'Maths',crumb:'Maths',classNum:24,classPath:'/preschool/4-years/',classTitle:'Counting & Number Recognition (Class 24)',gameLib:'/maths/',gameLibTitle:'Maths Room',tint:'#f4efe3',accent:'#a9694e'},
 phonics:{key:'phonics',label:'Phonics & Beginning Sounds',crumb:'Phonics',classNum:28,classPath:'/preschool/4-years/phonics-and-beginning-sounds/',classTitle:'Phonics & Beginning Sounds (Class 28)',gameLib:'/preschool/phonics/adventures/',gameLibTitle:'Phonics Adventures',tint:'#f3ecfa',accent:'#8f4fc0'},
 reading:{key:'reading',label:'Storytime & Pre-Reading',crumb:'Reading',classNum:29,classPath:'/preschool/4-years/storytime-and-pre-reading/',classTitle:'Storytime & Pre-Reading Comprehension (Class 29)',gameLib:'/preschool/reading/adventures/',gameLibTitle:'Storytime Adventures',tint:'#fdf3e7',accent:'#e07f3e'},
 logic:{key:'logic',label:'Logic & Problem-Solving',crumb:'Logic',classNum:30,classPath:'/preschool/4-years/logic-thinking-and-problem-solving/',classTitle:'Logic, Thinking & Problem-Solving (Class 30)',gameLib:'/preschool/logic/adventures/',gameLibTitle:'Logic Adventures',tint:'#eaf3f6',accent:'#2e9bb5'},
 science:{key:'science',label:'Science, Nature & Discovery',crumb:'Science',classNum:31,classPath:'/preschool/4-years/science-nature-and-discovery/',classTitle:'Science, Nature & Discovery (Class 31)',gameLib:'/preschool/science/adventures/',gameLibTitle:'Science Adventures',tint:'#eef6ee',accent:'#4a9e4f'}
};

export const wsUrl=(subject,slug)=>`${WS_BASE}${subject}/${slug}/`;
export const pdfUrl=(subject,slug)=>`/downloads/worksheets/${subject}/${slug}.pdf`;

/* Shared guidance per class — honest shared text: how a tracing sheet is used
   really is the same across Class 27, and pretending otherwise would make
   30 near-copies. The per-activity sections around it are unique. */
export const CLASS_GUIDE={
 shapes:{
  howto:[
   ['Read the sheet together','Read the title and instructions aloud, then let your child explain back what the sheet asks for. Four-year-olds understand far more than they can read.'],
   ['Do the first one together','Help with row one so the task is clear, then step back. A wrong line is information, not a mistake \u2014 talk about it and try again.'],
   ['Stop while it is fun','One finished sheet is a full session. Hang it up, date the corner, and come back to a fresh copy of the same worksheet another day.']
  ],
  tips:[
   ['Chunky tools win','Thick crayons and stubby pencils fit four-year-old hands. Skinny pencils make small hands grip too hard.'],
   ['Say the shape names out loud','Naming while doing \u2014 \u201ca circle for the porthole!\u201d \u2014 is what makes the learning stick.'],
   ['Cutting counts as learning','The cut-and-sort sheets practice scissor control too. Snip along the dotted line together if scissors are new.']
  ]
 },
 colors:{
  howto:[
   ['Set up a little paint corner','Crayons, pencils or paints all work. Put the color key where your child can see it and let them pick where to start.'],
   ['Name colors as they appear','\u201cYou made the wing green!\u201d Naming in the moment builds the color words faster than any flashcard.'],
   ['Ask about choices, not correctness','\u201cTell me about this part\u201d beats \u201cis that the right color?\u201d Creative choices are never graded here.']
  ],
  tips:[
   ['Black-and-white printing is a feature','The sheets print happily in grayscale \u2014 your child invents the colors, which is even better practice.'],
   ['Mix on paper too','For the mixing sheets, keep a jar of water and let your child test each recipe with real paint afterwards.'],
   ['Display the finished art','The fridge gallery matters. A child whose work is shown keeps making work.']
  ]
 },
 writing:{
  howto:[
   ['Warm up in the air','Trace the shape of the line in the air with a big arm movement before pencil touches paper. Handwriting starts in the shoulder.'],
   ['Start at the green dot','Every guide has a green start dot and a star to finish on. Say the movement out loud together \u2014 \u201cup, around, around\u201d.'],
   ['Praise the staying-on, not the speed','Slow and wobbly on the line is exactly right. Speed comes on its own once the movement is easy.']
  ],
  tips:[
   ['Little and often','Five happy minutes on one sheet beats twenty strained ones. One or two rows is still a real session.'],
   ['Left-handers are first-class here','Tilt the paper slightly the other way and let the hand sit below the line \u2014 nothing else changes.'],
   ['Keep the pencil chunky','Triangular pencils or chunky crayons build the right grip without reminders.']
  ]
 },
 maths:{
  howto:[
   ['Count out loud together','Touch each thing as you count it \u2014 finger on apple, circle on caterpillar. Touching keeps the count honest.'],
   ['Write big','The answer boxes are big on purpose. Big wobbly numerals are exactly what they should be at four.'],
   ['Check by counting again','Counting a second time (and getting the same number!) is the skill. Celebrate the recount, not just the answer.']
  ],
  tips:[
   ['Use real things first','Count spoons, steps and apples in the kitchen before the pencil comes out. Numbers live in the world first.'],
   ['Mistakes are data','If the count comes out different each time, slow down and count as a team. That is the whole lesson.'],
   ['Keep sessions tiny','One sheet, maybe two rows of it, is plenty for a four-year-old\u2019s counting stamina.']
  ]
 },
 phonics:{
  howto:[
   ['You are the sound machine','Paper cannot play audio \u2014 that is your job. Say the sound (a pure \u201csss\u201d, not \u201csuh\u201d or the letter name) and let your child copy it.'],
   ['Say the picture words together','Name every picture before starting. The activity is the sound, not the guessing of what the picture is.'],
   ['Little sounds, short sessions','Two rows done well is a full phonics session. Stop while the ears are still fresh.']
  ],
  tips:[
   ['Sounds, not letter names','The letter is m, but the sound is \u201cmmm\u201d. Stretch the sounds you can hold (mmm, sss, fff) and keep stops snappy (t, p, k).'],
   ['Play the online game afterwards','Every worksheet has a matching game at kiddo.school where the sounds are played aloud \u2014 paper first, screen second works beautifully.'],
   ['Answers are at the bottom','Each phonics sheet ends with a grown-up answer line, so you can check together without guessing.']
  ]
 },
 reading:{
  howto:[
   ['Tell the story together','Read the title and instruction aloud, then let your child point at the picture and say what happens. The picture carries the whole activity \u2014 no reading needed.'],
   ['Mark the picture, then retell','Circle, number or draw on the sheet exactly as the game plays on screen. Afterwards ask \u201ccan you tell me the whole story?\u201d \u2014 the retelling is the comprehension.'],
   ['Use the draw box','Every sheet ends with room to draw the next part of the story. A drawing plus one spoken sentence is a complete session.']
  ],
  tips:[
   ['Wrong answers are information','If the story comes out in the wrong order, retell it together and try again tomorrow. Comprehension grows from talking, not from being right first time.'],
   ['Say the WHY out loud','\u201cWhy does Rabbit need the umbrella?\u201d Asking for the reason turns a matching task into real story thinking.'],
   ['Print it twice','Once to do, once to keep. Children love redoing a favorite story a week later and feeling how easy it got.']
  ]
 },
 logic:{
  howto:[
   ['Say the rule first','Every puzzle has a rule \u2014 a pattern, a size order, two clues together. Say it aloud before solving, and the sheet solves itself.'],
   ['Point before circling','Have your child point at the answer and say why, then circle it. The pointing keeps the thinking honest.'],
   ['Check together with the answer line','The grown-up answer strip at the bottom lets you check without guessing \u2014 and lets your child play teacher.']
  ],
  tips:[
   ['Sort real things too','After the sorting sheets, sort socks or spoons the same way. Real objects make the rule permanent.'],
   ['Patterns everywhere','Lay out apple-grape-apple snacks and ask what comes next. The sheet teaches the skill; the kitchen keeps it.'],
   ['Mazes build pencil control too','The maze sheet doubles as pencil practice \u2014 slow and steady on the path matters more than speed.']
  ]
 },
 science:{
  howto:[
   ['Predict out loud first','Ask \u201cwhat do YOU think will happen?\u201d BEFORE any marking begins. A wrong prediction is not a failure \u2014 it is the experiment starting.'],
   ['Point, then mark','Every answer on these sheets can be pointed at in the picture first. Pointing is thinking made visible \u2014 let the finger lead the pencil.'],
   ['Run the real version','Each sheet has a real experiment hiding in it: float a spoon, melt an ice cube, blow a dandelion. The worksheet is the invitation, the kitchen is the lab.']
  ],
  tips:[
   ['Say the WHY','\u201cThe metal sinks BECAUSE\u2026\u201d \u2014 the explaining is where the science lives. Accept any reasoning that is trying honestly.'],
   ['Wrong answers are data','Scientists love surprises. \u201cThe cork floated \u2014 I thought it would sink!\u201d is a genuine discovery worth circling twice.'],
   ['Keep it short and hands-on','Five minutes of marking plus five minutes of real splashing beats a half hour of paper. One sheet, one experiment, one happy scientist.']
  ]
 }
};
