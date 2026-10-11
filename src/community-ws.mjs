// Kiddo School — Class 33 · Community Helpers & Our Neighborhood: the 35
// GENUINE worksheets (owner's Canva upload, verified on R2 under
// school/preschool/4-years/community-helpers-and-our-neighborhood/worksheets/,
// all 1545×2000 portrait, audited image by image on 2026-10-12). Two pages per
// sheet: the Learning Path ACTIVITY (drawing canvas over the original art on
// the left, solving guidance on the right) and the PRINTABLE library page
// (download / print / share, NO canvas). Instructions are written from what
// each sheet actually shows — trace word, match triple, circle grid, counting
// row and draw prompt are named exactly as uploaded. cover.webp is the
// worksheet collection cover and is never counted as a sheet.
import {R2,crumbNav,esc} from './adventure-kit.mjs';
import {fcCommunityMount} from './flashcards/index.mjs';

export const CH_CLASS_PATH='/preschool/4-years/community-helpers-and-our-neighborhood/';
export const CH_WS_CLASS=CH_CLASS_PATH+'worksheets/';
export const CH_WS_LIB='/worksheets/community-helpers-and-our-neighborhood/';
export const CH_WS_BASE=R2+'school/preschool/4-years/community-helpers-and-our-neighborhood/worksheets/';
export const CH_WS_COVER={file:'cover.webp',w:1545,h:2000,
 alt:'Cover of the Community Helpers worksheets set: the title over five smiling helpers — a nurse, a police officer, a firefighter holding a hose, a doctor and a construction worker with a pipe wrench.'};

export const communityWs=[
{slug:'doctor',file:'doctor.webp',w:1545,h:2000,title:'Doctor',word:'DOCTOR',trace:'DOCTOR',
 tag:'Trace DOCTOR, match the doctor to the stethoscope, bandage and thermometer, circle the healthy habits, count the medicine bottles and draw one way you care for your body.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word DOCTOR, match the doctor to the stethoscope, bandage and thermometer, circle the healthy habits, count the medicine bottles and draw one way you take care of your body — on screen or on paper.',
 learn:'What a doctor\u2019s tools are for, which everyday habits keep bodies healthy, and how to read and write the word DOCTOR.',
 know:'Your child needs a little vocabulary first: a doctor helps sick and hurt people, a stethoscope listens to heartbeats, a bandage protects a healing cut, and a thermometer checks temperature. Say each tool\u2019s name before the pencil starts.',
 why:'Doctors become familiar instead of frightening when children meet their tools on paper first. The healthy-habit grid also turns the worksheet into a gentle health talk, and the tracing row builds the same pre-writing muscles the alphabet class uses.',
 skills:['Community helper vocabulary','Tool matching','Healthy-habit awareness','Counting to 5','Word tracing','Drawing from life'],
 steps:[
  ['Trace','Trace the big dotted word DOCTOR letter by letter — say each letter\u2019s name out loud as you go.'],
  ['Match','Draw a line from the doctor to each of his three tools: the stethoscope, the bandage and the thermometer.'],
  ['Circle','Six pictures sit in the grid — circle every one that shows a healthy habit. Look closely: not all six are healthy!'],
  ['Count','Count the orange medicine bottles, then write the number in the box below them.'],
  ['Draw','In the big empty box, draw one thing YOU do to take care of your body — brushing teeth, running, sleeping, anything true.']],
 say:'"This is a doctor — his tools help him take care of people. Trace his name, then find the three tools that belong with him. Now look at the six pictures: which ones show something healthy? Count the bottles slowly with your finger, and finish by drawing how YOU keep your body strong."',
 look:'Point at the big picture together: the doctor wears a white coat and a blue tie and a stethoscope around his neck. In the match row, ask which tool would listen to a heartbeat. In the grid, ask your child to explain WHY a picture is or is not a healthy habit.',
 ask:'"Which doctor\u2019s tool listens to your heart?" "Why do we wash hands before seeing the doctor?" "Which of the six habits do you do every day?" "What number did the medicine bottles count up to?"',
 hint:'If a match line is hard, name the tools first and ask what each one touches. In the circle row, the tricky tiles are the ones that look fun — ask "does this help your body or just feel fun right now?" Count the bottles with one touch per bottle so the count stays honest.',
 tips:'Keep doctor talk friendly and honest — doctors help, and saying how you feel to a doctor is always allowed. Let your child own the pencil: the tracing can be wobbly and the drawing messy; the thinking is the work.',
 check:'Ask: "Which tool listens to the heart? Name one healthy habit from the grid. How many bottles?" Right tool, one habit, the right count = the sheet landed.',
 real:'Walk the healthy-habit grid at home today: the apple at snack time, the teeth brushing tonight, the running in the yard. Real repetition is what turns a circled picture into a habit.'},
{slug:'firefighter',file:'firefighter.webp',w:1545,h:2000,title:'Firefighter',word:'FIREFIGHTER',trace:'FIRE FIGHTER',
 tag:'Trace FIRE FIGHTER, match the firefighter to the hose, helmet and fire truck, circle the tools a firefighter uses, count the fire helmets and draw stop-drop-and-roll.',
 meta:'A free firefighter worksheet for ages 4–5: trace the words FIRE FIGHTER, match the firefighter to the hose, helmet and fire truck, circle the real firefighting tools, count the helmets and draw a safe way to stop, drop and roll — on screen or on paper.',
 learn:'What a firefighter wears and carries, which tools fight fires, and the emergency move every child should own: stop, drop and roll.',
 know:'Before starting, name the gear together: the helmet protects the head, the hose carries water, the truck rushes everything to the fire. Explain stop-drop-and-roll in one sentence — if clothes ever catch fire, we stop, drop to the ground, and roll until the fire is out.',
 why:'Fire safety is a skill with real stakes, and rehearsal is what makes it stick. The tool grid sharpens "who uses what" thinking, the helmet count is gentle number practice, and the draw box lets your child rehearse the emergency move with their own hands.',
 skills:['Emergency vocabulary','Tool matching','Stop-drop-and-roll rehearsal','Counting to 7','Word tracing','Safety drawing'],
 steps:[
  ['Trace','Trace the dotted words FIRE FIGHTER across the big row — two words, take them one letter at a time.'],
  ['Match','Draw a line from the firefighter to each piece of his gear: the hose, the helmet and the fire truck.'],
  ['Circle','Six tools sit in the grid — circle every one a firefighter really uses on the job. Two of them belong to other jobs!'],
  ['Count','Count the red fire helmets, then write the number in the box.'],
  ['Draw','Draw a safe way to stop, drop, and roll in the big box — show the rolling!']],
 say:'"This is a firefighter. Trace the two words, then connect him to his hose, his helmet and his truck. Now look at the six tools — a firefighter carries some of them, but a couple belong to a mechanic or a student. Count the helmets with your finger, and then draw the safety move: stop, drop, and roll."',
 look:'Find the yellow stripes on the firefighter\u2019s coat and the badge on the helmet — real gear details to spot. In the grid, ask which tool sprays water and which one would fix a car instead. In the count row, helmets point in different directions; touch each one so none is counted twice.',
 ask:'"What does the hose carry?" "Why does a firefighter wear a helmet?" "Which two tools in the grid are NOT for fighting fires?" "Show me stop, drop, and roll — can you do it on the carpet?"',
 hint:'If the grid stalls, sort out loud: "sprays water, chops, lights the dark, puts out small fires — what\u2019s left?" For the count, group the helmets into the top row and the bottom row first, then add the groups.',
 tips:'Practise stop-drop-and-roll for real on a carpet after the sheet — the body remembers what the pencil rehearses. Never make fire scary-for-fun: firefighters are helpers, and practicing the move is what keeps children safe.',
 check:'Ask: "What do firefighters spray from the hose? Show me stop-drop-and-roll. How many helmets?" Water, the move, the count = the sheet landed.',
 real:'Visit the drawing at bedtime: ask your child to SHOW the whole family how to stop, drop, and roll. Where is your family\u2019s smoke alarm? Let your child find it — real maps of real safety.'},
{slug:'police-officer',file:'police-officer.webp',w:1545,h:2000,title:'Police Officer',word:'POLICE OFFICER',trace:'POLICE OFFICER',
 tag:'Trace POLICE OFFICER, match the officer to the badge, radio and patrol car, circle the things that keep people safe, count the traffic cones and draw a safe place to cross.',
 meta:'A free police-officer worksheet for ages 4–5: trace the words POLICE OFFICER, match the officer to the badge, radio and patrol car, circle the safety things, count the traffic cones and draw a safe place to cross the street — on screen or on paper.',
 learn:'What a police officer carries and drives, which objects help keep people safe, and what a safe street crossing looks like.',
 know:'Officers are neighborhood helpers we can trust: the badge shows who they are, the radio calls for help, the patrol car takes them quickly to where they are needed. In any real worry, the plan is the same — find a grown-up you know, and officers are helpers too.',
 why:'Safety tools become recognizable when children sort them on paper. The crossing draw-prompt opens the family conversation about how WE cross — a conversation worth having a hundred times before it is ever needed.',
 skills:['Community helper vocabulary','Tool matching','Safety-object awareness','Counting to 5','Word tracing','Road-safety drawing'],
 steps:[
  ['Trace','Trace the dotted words POLICE OFFICER — long words, steady lines.'],
  ['Match','Draw a line from the officer to the badge, the radio and the patrol car.'],
  ['Circle','Six things sit in the grid — circle every one that helps keep people safe. One of them is a cuddly friend, not a safety tool!'],
  ['Count','Count the orange traffic cones, then write the number in the box.'],
  ['Draw','Draw a safe place to cross the street — think crosswalk stripes, a crossing guard, held hands.']],
 say:'"This is a police officer — a helper for the whole neighborhood. Trace the words, then connect the badge, the radio and the patrol car. Look at the six pictures: which ones help keep people safe? Count the cones carefully, then draw how WE cross the street safely."',
 look:'Spot the gold badge on the cap and on the chest. In the grid, ask what each safety thing protects — a helmet protects heads, a cone warns cars, a first-aid kit helps hurts. In the draw box, ask for the stripes of the crosswalk before the pencil starts.',
 ask:'"What does the badge tell us?" "Which grid pictures keep people safe, and how?" "Who holds your hand when we cross?" "What do the cones tell cars to do?"',
 hint:'If the grid confuses, ask "does this protect a person or warn a car — or is it a toy?" The watch is the sneaky one: it tells time, but talk about whether it keeps someone SAFE. For the crossing drawing, stripes plus a grown-up\u2019s hand are the key details.',
 tips:'Keep the message balanced — officers are helpers AND the first job in any worry is finding a grown-up you know. Practise the real crossing this week with the sheet\u2019s words: stop, look, listen, hold hands.',
 check:'Ask: "What does the radio do? Name two safety things from the grid. How do we cross the street?" Call-for-help, two objects, the family rule = the sheet landed.',
 real:'On the next walk, find one real safety thing from the grid — a cone, a helmet rider, a crossing — and name it on the spot. Real streets make the worksheet real.'},
{slug:'nurse',file:'nurse.webp',w:1545,h:2000,title:'Nurse',word:'NURSE',trace:'NURSE',
 tag:'Trace NURSE, match the nurse to the clipboard, bandage and thermometer, circle the healthy habits, count the bandages and draw one way a nurse helps people.',
 meta:'A free nurse worksheet for ages 4–5: trace the word NURSE, match the nurse to the clipboard, bandage and thermometer, circle the healthy habits, count the bandages and draw a way nurses help — on screen or on paper.',
 learn:'Who nurses are and what they carry, which daily habits keep bodies healthy, and caring-in-action — the worksheet\u2019s last box asks your child to draw a nurse\u2019s kindness.',
 know:'Nurses take care of people beside doctors: the clipboard keeps notes, the bandage protects a scrape, the thermometer checks temperature. Nurses explain every step and have gentle hands — a friendly face at any check-up.',
 why:'Meeting the nurse on paper makes real check-ups calmer, and the healthy-habit grid doubles as the family\u2019s daily-health talk. The big bandage count is honest two-row counting practice with a purpose.',
 skills:['Community helper vocabulary','Tool matching','Healthy habits','Counting to 10','Word tracing','Empathy drawing'],
 steps:[
  ['Trace','Trace the dotted word NURSE letter by letter — five letters, say each one.'],
  ['Match','Draw a line from the nurse to her clipboard, her bandage and her thermometer.'],
  ['Circle','Five pictures show moments of the day — circle every healthy habit. One of them is a sometimes-treat!'],
  ['Count','Count the bandages in both rows, then write the number in the box.'],
  ['Draw','Draw one way a nurse helps people — wrapping a bandage, checking temperature, a kind smile.']],
 say:'"This is a nurse — she takes care of people with gentle hands. Trace her name, then connect her to the clipboard, the bandage and the thermometer. Now the five pictures: which are healthy habits? Count every bandage slowly — there are two rows — and draw how a nurse helps."',
 look:'Find the cross on the clipboard and the stethoscope around the nurse\u2019s neck. In the grid, ask why each circled habit helps the body. In the count, touch each bandage left to right, top row first — two rows of five make ten.',
 ask:'"What does the thermometer check?" "Which habits did you circle, and when did you last do one?" "How many bandages in the top row? And the bottom?" "What would you want a nurse to say to you?"',
 hint:'The burger-and-fries tile is the trap — treats are fine sometimes, but ask "is this an every-day food or a sometimes food?" For the count, if ten wobbles, count the top row, tap your head, count the bottom row, then add the two numbers.',
 tips:'If a real check-up is coming, this sheet is the warm-up: the nurse will explain first, and telling her how you feel is always allowed. Praise gentle hands during the drawing — kindness is the lesson under the lesson.',
 check:'Ask: "Who takes care of people beside the doctor? Name one healthy habit you circled. How many bandages?" The team, one habit, ten = the sheet landed.',
 real:'Play nurse with a teddy tonight: wrap a toilet-paper bandage, check temperature with a hand on the forehead, explain every step out loud — exactly the worksheet, warm and alive.'},
{slug:'teacher',file:'teacher.webp',w:1545,h:2000,title:'Teacher',word:'TEACHER',trace:'TEACHER',
 tag:'Trace TEACHER, match the teacher to the book, pencil and board, circle the things we use for learning, count the pencils and draw your favorite thing to learn.',
 meta:'A free teacher worksheet for ages 4–5: trace the word TEACHER, match the teacher to the book, pencil and chalkboard, circle the learning tools, count the pencils and draw your favorite thing to learn — on screen or on paper.',
 learn:'What a teacher\u2019s day is full of — books, pencils, a board and questions — plus which objects help learning happen and how to write the word TEACHER.',
 know:'Teachers help children learn letters, numbers, stories and how to be good friends. The board shows the lesson, the book holds the story, the pencil writes the practice. Your child already knows this world — the sheet names it.',
 why:'A child who can name the teacher\u2019s tools walks into any classroom feeling at home. The favorite-thing draw box turns the sheet into a small show-and-tell, and the pencil count is real counting with a real object.',
 skills:['School vocabulary','Tool matching','Learning-object awareness','Counting to 4','Word tracing','Self-expression drawing'],
 steps:[
  ['Trace','Trace the dotted word TEACHER across the row — seven letters, nice and steady.'],
  ['Match','Draw a line from the teacher to the book, the pencil and the board.'],
  ['Circle','Five things sit in the row — circle every one we use for learning. One of them belongs on the playground!'],
  ['Count','Count the yellow pencils, then write the number in the box.'],
  ['Draw','Draw your favorite thing to learn in the big box — letters, numbers, dinosaurs, anything!']],
 say:'"This is a teacher — she helps children learn new things every day. Trace her name, then connect the book, the pencil and the board. Look at the five pictures: which help us learn? Count the pencils with your finger, and then draw the thing YOU love learning most."',
 look:'Find the ABC-123 poster, the chalkboard and the pointer stick in the big picture. In the row, ask what each circled object does for learning. The apple sits with the school things for a reason — ask your child who traditionally gets an apple!',
 ask:'"What does the teacher write on the board?" "Which pictures help us learn — and what does each one do?" "How many pencils?" "What is YOUR favorite thing to learn, and who teaches it to you?"',
 hint:'The soccer ball is the playground guest — learning happens outside too, but the sheet asks for learning TOOLS. In the count, pencils lie at a slant; touch each tip so the count stays true.',
 tips:'Ask your child to teach the sheet back to you — playing teacher with the worksheet is the deepest rehearsal there is. Name real teachers your child knows and what each one is teaching them this year.',
 check:'Ask: "What does a teacher do all day? Name three learning tools. How many pencils?" Helps-us-learn, three objects, four = the sheet landed.',
 real:'Tonight, your child plays teacher with teddies as the class: board, book, pencil — the whole lesson. Ten minutes of teaching-back beats an hour of being taught.'},
{slug:'librarian',file:'librarian.webp',w:1545,h:2000,title:'Librarian',word:'LIBRARIAN',trace:'LIBRARIAN',
 tag:'Trace LIBRARIAN, match the librarian to the books, the library card and the bookshelf, circle the things you can find in a library, count the books and draw your favorite book.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word LIBRARIAN, match the librarian to the books, library card and bookshelf, circle the things that live in a library, count the books and draw your favorite book — on screen or on paper.',
 learn:'Who librarians are and what a library holds — books, cards, shelves and computers — plus which everyday objects really belong there and how to write the word LIBRARIAN.',
 know:'A librarian helps people find and borrow books: the library card takes books home for a while, the bookshelf keeps every story tidy, and each book comes back so a friend can enjoy it next. Libraries are quiet, friendly places full of stories.',
 why:'A child who knows how the library works owns it for life. Naming the librarian\u2019s tools turns a first visit from overwhelming to exciting, and the find-it-in-a-library grid builds the careful sorting that later sorts letters, numbers and bugs.',
 skills:['Community helper vocabulary','Tool matching','Place-based sorting','Word tracing','Counting practice','Favorite-book drawing'],
 steps:[
  ['Trace','Trace the dotted word LIBRARIAN letter by letter — nine letters, take them one at a time.'],
  ['Match','Draw a line from the librarian to the books, the library card and the bookshelf.'],
  ['Circle','Six pictures sit in the grid — circle every one you could really find in a library. Look closely: would ALL of them be there?'],
  ['Count','Count the books in the count row, then write the number in the box.'],
  ['Draw','Draw your favorite book in the big box — its cover, a character from inside, or the part you love best.']],
 say:'"This is a librarian — she helps people find wonderful books. Trace her name, then connect the books, the library card and the bookshelf. Now look at the six pictures: which ones could you find in a library? Count the books slowly with your finger, and finish by drawing the book YOU love."',
 look:'In the match row, ask which of the three things you hold, which you tuck in a pocket and which stands tall against the wall. In the grid, ask your child to tell a tiny story about each circled picture — librarians love stories. In the draw box, ask for the book\u2019s title out loud before the pencil starts.',
 ask:'"What does a librarian do all day?" "Which grid pictures could you find at the library?" "What do we do with a book when we finish it?" "What is YOUR favorite book, and who reads it with you?"',
 hint:'Three tiles are worth a family debate: the apple and the scissors live in kitchens and desks, the globe might stand in a library corner, and one bouncy thing belongs on the grass — ask of each: "would I see this on my library visit?" For the count, touch each book spine once.',
 tips:'Pair the sheet with a real library trip this week — let your child carry the card and hand the books over the desk. Owning the borrowing-and-returning ritual is what quietly makes a reader.',
 check:'Ask: "Who helps you find books? Name two things you saw at the library. How many books?" The helper, two finds, the count = the sheet landed.',
 real:'Visit the library and play find-it: the bookshelf, the computer, the desk — every circled picture spotted in real life. Then borrow one book and let your child check it out all by themselves.'},
{slug:'farmer',file:'farmer.webp',w:1545,h:2000,title:'Farmer',word:'FARMER',trace:'FARMER',
 tag:'Trace FARMER, match the farmer to the tractor, the watering can and the vegetables, circle the things that grow on a farm, count the vegetables and draw something you might see on a farm.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word FARMER, match the farmer to the tractor, watering can and vegetables, circle the things that grow on a farm, count the carrots and beets and draw a farm scene — on screen or on paper.',
 learn:'What a farmer grows and raises, which foods start on a farm, and how to tell farm things from store things — plus how to write the word FARMER.',
 know:'Farmers grow food and care for animals: the tractor pulls and plows, the watering can gives thirsty plants a drink, and vegetables come out of the ground or off the plant. Apples grow on trees, cows give milk, and corn grows tall.',
 why:'Knowing where food comes from is a superpower for picky eaters — a child who has circled the carrot on a farm sheet meets it on the plate with new interest. The farm grid also plants early thinking about how the world makes things.',
 skills:['Farm and food vocabulary','Tool matching','Where-food-comes-from sorting','Word tracing','Counting practice','Farm-scene drawing'],
 steps:[
  ['Trace','Trace the dotted word FARMER across the row — six letters, nice and steady.'],
  ['Match','Draw a line from the farmer to the tractor, the watering can and the vegetables.'],
  ['Circle','Six pictures sit in the grid — five grow or live on a farm, and one arrived in a delivery box! Circle everything that belongs on the farm.'],
  ['Count','Count the vegetables in the count row — the carrots and the beets — then write the number in the box.'],
  ['Draw','Draw something you might see on a farm in the big box — a barn, an animal, rows of corn, anything farm-fresh.']],
 say:'"This is a farmer — he grows food and takes care of animals. Trace his name, then connect the tractor, the watering can and the vegetables. Now look at the six pictures: which ones belong on a farm? Count the carrots and beets slowly, and then draw what YOU would see on a farm."',
 look:'Find the vegetables in the match row and name each one. In the grid, ask where each food comes from — a tree, the ground, or a restaurant kitchen. In the count row, carrots and beets sit together, so touch each vegetable once and keep the running count out loud.',
 ask:'"What does a tractor do on a farm?" "Which foods in the grid grew on a farm?" "Have you ever pulled a carrot out of the ground?" "What would you feed a cow or a chicken?"',
 hint:'One tile in the grid comes hot from an oven nobody keeps on a farm — ask "did this grow anywhere, or did somebody bake it?" For the count, carrots and beets look different but both count: touch each vegetable once.',
 tips:'Next grocery trip, play farm-detective: find three foods from the grid and ask who grew each one. If your child is a picky eater, let THEM pick a vegetable from the count row at the store — ownership grows appetites.',
 check:'Ask: "Who grows our food? Name two things that live or grow on a farm. Which food in the grid does NOT?" The farmer, two farm things, the baked one = the sheet landed.',
 real:'Try one farm food this week in its simplest form — corn on the cob, a raw carrot with its green top, an apple straight from the bag. Real food, real story, better eating.'},
{slug:'chef',file:'chef.webp',w:1545,h:2000,title:'Chef',word:'CHEF',trace:'CHEF',
 tag:'Trace CHEF, match the chef to the spoon, the mixing bowl and the chef hat, circle the healthy foods, count the plates and draw a meal you would like to make.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word CHEF, match the chef to the spoon, mixing bowl and chef hat, circle the healthy foods, count the plates and draw a meal you would like to make — on screen or on paper.',
 learn:'What a chef does in a kitchen, which tools cook a meal, and which foods help bodies grow — plus how to write the short but mighty word CHEF.',
 know:'A chef cooks for other people: the spoon stirs, the mixing bowl holds everything together, and the tall hat is called a toque — real chefs really wear it! Kitchens are busy places where good food and clean hands matter most.',
 why:'Chefs make healthy food look exciting, and this sheet borrows that magic. The healthy-food grid turns into a plate conversation at exactly the age when food habits form, and the meal-drawing box lets your child design a menu of their own.',
 skills:['Kitchen vocabulary','Tool matching','Healthy-food sorting','Word tracing','Counting practice','Meal drawing'],
 steps:[
  ['Trace','Trace the dotted word CHEF — only four letters, but say each one loud and proud.'],
  ['Match','Draw a line from the chef to the spoon, the mixing bowl and the chef hat.'],
  ['Circle','Six foods sit in the grid — circle every one that helps your body grow strong. Two of them are sometimes-treats!'],
  ['Count','Count the plates, then write the number in the box.'],
  ['Draw','Draw a meal you would like to make in the big box — breakfast, lunch, dinner or a silly sandwich.']],
 say:'"This is a chef — he cooks wonderful food for people. Trace his name, then connect the spoon, the mixing bowl and the hat. Now look at the six foods: which ones are healthy helpers for your body? Count the plates carefully, and then draw the meal YOU would love to make."',
 look:'Find the chef\u2019s tall hat and ask why chefs wear it. In the grid, sort the foods into every-day foods and sometimes foods out loud. In the draw box, ask for one vegetable on the plate before the pencil starts — real chefs put color on every plate.',
 ask:'"What does the chef stir in the big bowl?" "Which foods did you circle, and why?" "What is a sometimes food in our family?" "What would your restaurant serve first?"',
 hint:'Treats are allowed in life, but this grid asks for the foods that grow and give strength — ask of each: "every-day food or sometimes food?" For the count, plates can stack: count the rims, one touch each.',
 tips:'Let tonight\u2019s dinner be the drawn meal for real if you can — even one food from your child\u2019s menu on the plate makes the worksheet delicious. Chefs wash hands first: borrow that rule too.',
 check:'Ask: "Who cooks in big kitchens? Name two healthy foods you circled. How many plates?" The chef, two helpers, the count = the sheet landed.',
 real:'Cook one simple thing together this week — stirring the pancake batter counts. The spoon, the bowl, the tasting: the whole worksheet, warm and edible.'},
{slug:'dentist',file:'dentist.webp',w:1545,h:2000,title:'Dentist',word:'DENTIST',trace:'DENTIST',
 tag:'Trace DENTIST, match the dentist to the toothbrush, the mirror and the tooth, circle the habits that keep teeth healthy, count the toothbrushes and draw yourself brushing your teeth.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word DENTIST, match the dentist to the toothbrush, mirror and tooth, circle the teeth-healthy habits, count the toothbrushes and draw yourself brushing — on screen or on paper.',
 learn:'Who the dentist is and what happens in the chair, which daily habits keep teeth strong, and how to write the word DENTIST — a gentle warm-up for real check-ups.',
 know:'The dentist looks after teeth: the toothbrush sweeps away sugar bugs, the little mirror shows the teeth hiding at the back, and every tooth gets a check. Teeth like brushing, water, good food and sleep — sugar makes the sugar bugs dance.',
 why:'Check-ups go better when the chair is familiar on paper first. The habits grid turns brushing from a nightly battle into a job your child owns, and drawing themselves brushing rehearses the very routine parents ask for twice a day.',
 skills:['Community helper vocabulary','Tool matching','Teeth-healthy habits','Word tracing','Counting practice','Routine drawing'],
 steps:[
  ['Trace','Trace the dotted word DENTIST letter by letter — seven letters, steady as a dental chair.'],
  ['Match','Draw a line from the dentist to the toothbrush, the mirror and the tooth.'],
  ['Circle','Four pictures show moments of the day — circle every habit that keeps teeth happy and healthy. One of them is a sweet trick!'],
  ['Count','Count the toothbrushes, then write the number in the box.'],
  ['Draw','Draw yourself brushing your teeth in the big box — open wide, brush up and down, front and back!']],
 say:'"This is a dentist — she keeps your teeth strong and healthy. Trace her name, then connect the toothbrush, the mirror and the tooth. Now look at the four pictures: which things keep teeth happy? Count the toothbrushes, and then draw YOU brushing — big smile, of course."',
 look:'Find the mirror in the match row and ask what a dentist sees with it. In the grid, ask of each picture: teeth helper or sugar helper? In the draw box, the toothbrush position matters — ask for up-and-down strokes in the drawing too.',
 ask:'"What does the dentist\u2019s mirror do?" "Which habits keep teeth strong?" "What does sugar do to teeth?" "When do YOU brush — and who checks the back teeth?"',
 hint:'One picture in the grid is sticky and sweet — ask "does sugar sweep teeth clean or stick around?" Water is the quiet hero here. For the count, toothbrushes point different ways: touch each bristle head once.',
 tips:'Dentists are helpers, and the mirror is their flashlight — say that before a real appointment and the chair feels friendlier. Tonight, brush to a song your child chooses: two minutes, twice a day, exactly what the sheet teaches.',
 check:'Ask: "Who checks your teeth? Name one teeth-healthy habit you circled. How many toothbrushes?" The dentist, one habit, the count = the sheet landed.',
 real:'Brush together tonight and let your child be the dentist for YOUR teeth for one minute — teaching back is the deepest practice there is. Then let them check their own smile in the mirror, just like the sheet.'},
{slug:'veterinarian',file:'veterinarian.webp',w:1545,h:2000,title:'Veterinarian',word:'VETERINARIAN',trace:'VETERINARIAN',
 tag:'Trace VETERINARIAN, match the veterinarian to the cat, the stethoscope and the paw print, circle the things pets need to stay healthy, count the pet bowls and draw an animal you would like to care for.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word VETERINARIAN, match the vet to the cat, stethoscope and paw print, circle what pets need to stay healthy, count the pet bowls and draw an animal to care for — on screen or on paper.',
 learn:'What a veterinarian does for animals, which things keep pets fed, watered, groomed and checked, and how to write the very long word VETERINARIAN.',
 know:'A veterinarian is an animal doctor: the stethoscope listens to hearts and lungs, the food and water bowls keep pets strong, the brush keeps fur tidy, and the green check is the check-up — the vet\u2019s way of saying all is well. Pets need care every single day.',
 why:'Caring for a pet on paper is rehearsal for caring in real life. The needs grid builds empathy — a pet is not a toy but a small life with needs — and the long trace word is a proud badge for children ready to stretch their pencil muscles.',
 skills:['Community helper vocabulary','Tool matching','Pet-needs awareness','Word tracing','Counting practice','Empathy drawing'],
 steps:[
  ['Trace','Trace the dotted word VETERINARIAN — a very long word! Take it letter by letter, and say each one.'],
  ['Match','Draw a line from the veterinarian to her patient — the cat — and to the stethoscope and the paw print.'],
  ['Circle','Six pictures sit in the grid — circle every one that helps a pet stay healthy. The green checkmark counts too: it is the vet check-up!'],
  ['Count','Count the pet bowls, then write the number in the box.'],
  ['Draw','Draw an animal you would like to care for in the big box — real or imaginary, as long as it gets love.']],
 say:'"This is a veterinarian — an animal doctor! Trace the long, long name, then connect her to her cat patient, the stethoscope and the paw print. Now look at the six pictures: which ones help a pet stay healthy? Count the pet bowls, and then draw the animal YOU would love to take care of."',
 look:'Find the stethoscope and ask where it would listen on a cat — tiny hearts need tiny doctors. In the grid, ask of each tile: does a pet need this every day, once in a while, or never? The checkmark starts a lovely talk about what a check-up is for.',
 ask:'"What does a veterinarian do?" "What does a pet you know need every single day?" "What happens at a pet check-up?" "How do you know an animal feels happy or scared?"',
 hint:'Two tiles in the grid are party guests — one is sweet and one bounces — ask "does a pet need this to stay healthy, or is this just fun for a moment?" The checkmark is no trick: it is the check-up, the vet\u2019s all-is-well.',
 tips:'If a real vet visit is coming, this sheet is the warm-up: the vet will look with a light, listen with a stethoscope and explain first — exactly like the doctor, but for animals. Let your child bring the drawn animal along in their pocket.',
 check:'Ask: "Who is a doctor for animals? Name two things a pet needs every day. How many pet bowls?" The vet, two needs, the count = the sheet landed.',
 real:'Care for a real or stuffed animal tonight: fill a water bowl, brush fur with a soft brush, and give a full check-up with a gentle voice — every step explained out loud, exactly like the sheet.'},
{slug:'paramedic',file:'paramedic.webp',w:1545,h:2000,title:'Paramedic',word:'PARAMEDIC',trace:'PARAMEDIC',
 tag:'Trace PARAMEDIC, match the paramedic to the ambulance, the first-aid bag and the bandage, circle the things that help an injured person, count the bandages and draw an ambulance.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word PARAMEDIC, match the paramedic to the ambulance, first-aid bag and bandage, circle the helper tools, count the bandages and draw an ambulance — on screen or on paper.',
 learn:'Who paramedics are and how they rush to help, which tools treat a hurt person, and the big idea that calling for help is brave and smart — plus how to write the word PARAMEDIC.',
 know:'A paramedic is a medical helper who comes fast when someone is hurt: the ambulance carries them and their equipment, the first-aid bag holds the tools, and a bandage protects a scrape while it heals. Paramedics check, calm, and take people to more help.',
 why:'Meeting the ambulance on paper turns the loudest siren into a friendly sound that means HELP IS COMING. The tools grid sorts real helper tools from household look-alikes, and the safety talk that comes with this sheet is one families never regret.',
 skills:['Emergency helper vocabulary','Tool matching','Helper-tool sorting','Word tracing','Counting practice','Ambulance drawing'],
 steps:[
  ['Trace','Trace the dotted word PARAMEDIC letter by letter — nine letters for a very fast helper.'],
  ['Match','Draw a line from the paramedic to the ambulance, the first-aid bag and the bandage.'],
  ['Circle','Six pictures sit in the grid — circle every one that helps a person who is hurt. Some of them belong in the kitchen or the toy box instead!'],
  ['Count','Count the bandages, then write the number in the box.'],
  ['Draw','Draw an ambulance in the big box — lights on top, wheels below, and a big friendly cross.']],
 say:'"This is a paramedic — a helper who rushes to people who are hurt. Trace the name, then connect the ambulance, the first-aid bag and the bandage. Now the six pictures: which ones help an injured person? Count the bandages slowly, and then draw an ambulance with its lights shining."',
 look:'Find the cross or the siren details on the ambulance. In the grid, ask of each tile: does a paramedic carry this in the bag, or do we find it somewhere else? In the count row, bandages look alike — touch each one so none hides behind another.',
 ask:'"What does the siren tell other cars?" "Which tools in the grid help someone who is hurt?" "What number do we call when we need help?" "Who are OUR grown-ups to run to in any emergency?"',
 hint:'One tile in the grid lives in the bathroom and one comes out of a pizza box — ask "would a paramedic keep this in the first-aid bag?" The stethoscope and the thermometer are quiet heroes here. For the count, lift a finger to each bandage so none hides.',
 tips:'Teach your child your local emergency number and their grown-ups\u2019 real names — not just Mom and Dad — and rehearse it like a song. Paramedics are helpers, and knowing the plan makes children calm and brave, never scared.',
 check:'Ask: "Who rushes to help when someone is hurt? Name two tools a paramedic carries. What do we do first in a big hurry?" The paramedic, two tools, call a grown-up = the sheet landed.',
 real:'Pack a small family first-aid kit together and let your child place each thing in: bandages, wipes, a thermometer. Name every item like the sheet does — then rehearse the emergency plan once, calm and proud.'},
{slug:'crossing-guard',file:'crossing-guard.webp',w:1545,h:2000,title:'Crossing Guard',word:'CROSSING GUARD',trace:'CROSSING GUARD',
 tag:'Trace CROSSING GUARD, match the crossing guard to the stop sign, the vest and the crosswalk, circle the safe street-crossing rules, count the stop signs and draw yourself crossing safely.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the words CROSSING GUARD, match the guard to the stop sign, vest and crosswalk, circle the safe crossing rules, count the stop signs and draw yourself crossing safely — on screen or on paper.',
 learn:'What a crossing guard does at the corner, the four rules of a safe street crossing, and which rules are safe and which are not — plus how to write the words CROSSING GUARD.',
 know:'A crossing guard stops traffic so children can cross: the stop sign tells cars to wait, the bright vest makes the guard easy to see, and the crosswalk is the one place feet belong on the road. The rules: look left, right, then left again; raise your hand and wait; use the crosswalk — never run across.',
 why:'Street crossing is the highest-stakes skill on the whole neighborhood walk, and rehearsal is what makes it stick. Sorting safe from unsafe rules lets your child explain the WHY back to you — a far stronger memory than a rule recited once.',
 skills:['Community helper vocabulary','Tool matching','Street-safety rules','Safe-versus-unsafe sorting','Word tracing','Safety drawing'],
 steps:[
  ['Trace','Trace the dotted words CROSSING GUARD — two words, one letter at a time.'],
  ['Match','Draw a line from the crossing guard to the stop sign, the vest and the crosswalk.'],
  ['Circle','Four rules sit in the grid, each written in words — circle every SAFE way to cross the street. One of the four is a big mistake!'],
  ['Count','Count the stop signs, then write the number in the box.'],
  ['Draw','Draw yourself crossing safely in the big box — crosswalk stripes, looking eyes, and a grown-up\u2019s hand.']],
 say:'"This is a crossing guard — the helper who keeps the corner safe. Trace the two words, then connect the stop sign, the vest and the crosswalk. Now read the four rules together: which ones are safe? Count the stop signs, and then draw YOU crossing — stripes, eyes left and right, hand in hand."',
 look:'Find the stripes on the crosswalk and the bright color of the vest. In the grid, read each rule aloud and ask your child to act the safe ones out and shout NO at the unsafe one — running across never wins. In the draw box, the left-right-left eyes are the detail that matters.',
 ask:'"What does the stop sign tell the cars?" "Which three rules are safe?" "Why do we look left, right, then left again?" "Who holds your hand at the crossing — and when may you cross alone?"',
 hint:'Three rules keep feet safe and one rule is a trick — the trick one is the fastest, and fast is exactly what roads do not like. Read every rule out loud before circling; the ears catch what the eyes skim.',
 tips:'Walk to a real crossing this week and act out all four rules — look left, right, then left again, hand raised at the curb, crosswalk only, walking feet. Practised feet are safe feet, and the guard\u2019s wave is a friend\u2019s wave.',
 check:'Ask: "Who stops the cars at the corner? Name two safe crossing rules. Is running across safe or unsafe?" The guard, two rules, unsafe = the sheet landed.',
 real:'On every walk this week, let your child be the crossing captain: stop at the curb, look left-right-left, hold hands, walk. Ten real crossings beat ten worksheets — and you will both know the rules by heart.'},
{slug:'bus-driver',file:'bus-driver.webp',w:1545,h:2000,title:'Bus Driver',word:'BUS DRIVER',trace:'BUS DRIVER',
 tag:'Trace BUS DRIVER, match the bus driver to the school bus, the steering wheel and the stop sign, circle the safe bus-riding rules, count the bus windows and draw a safe school-bus stop.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the words BUS DRIVER, match the driver to the school bus, steering wheel and stop sign, circle the safe bus rules, count the windows and draw a safe bus stop — on screen or on paper.',
 learn:'What a bus driver does, the four rules of riding the school bus safely, and which rules are safe and which are not — plus how to write the words BUS DRIVER.',
 know:'The bus driver steers a big, heavy vehicle full of children and must watch the road, not the noise. The rules: stay seated while the bus moves, keep hands and feet to yourself, use a quiet voice — and never run in the aisle. The stop sign on the bus tells cars to wait for children.',
 why:'The school bus is often a child\u2019s first ride without a parent, and knowing the rules turns nerves into pride. Safe-versus-unsafe sorting lets your child rehearse the aisle, the seat and the stop before the first real ride — the best kind of readiness.',
 skills:['Community helper vocabulary','Tool matching','Bus-safety rules','Safe-versus-unsafe sorting','Word tracing','Bus-stop drawing'],
 steps:[
  ['Trace','Trace the dotted words BUS DRIVER — two words, steady lines, just like the driver\u2019s hands on the wheel.'],
  ['Match','Draw a line from the bus driver to the school bus, the steering wheel and the stop sign.'],
  ['Circle','Four rules sit in the grid, each written in words — circle every SAFE way to ride the bus. One of the four is wobbly and wrong!'],
  ['Count','Count the windows on the little bus, then write the number in the box.'],
  ['Draw','Draw a safe school-bus stop in the big box — you waiting back from the curb, the bus coming, your grown-up nearby.']],
 say:'"This is the bus driver — she drives the school bus and keeps every rider safe. Trace the two words, then connect the school bus, the steering wheel and the stop sign. Now the four rules: which are safe? Count the little bus\u2019s windows, and then draw your own safe bus stop."',
 look:'Find the stop sign arm on the school bus and the driver\u2019s big mirror. In the grid, read each rule aloud and act it out — seated bottoms, quiet voices, hands in laps — then let your child catch the aisle run with a big NO. In the draw box, ask where the waiting feet stand: back from the curb.',
 ask:'"What does the bus\u2019s stop sign tell the cars?" "Which three bus rules are safe?" "Why do we stay seated while the bus moves?" "Where do we stand while we wait for the bus?"',
 hint:'Three rules keep every rider steady and one rule trips people — the wobbly one happens in the aisle. Read every rule out loud before circling; your ears know safe when they hear it.',
 tips:'Wait for the bus back from the curb, and wait for the driver\u2019s signal before crossing in front — teach those two moves this week and your child owns the whole ride. Drivers are helpers; a wave and a good-morning is friendly practice.',
 check:'Ask: "Who drives the school bus? Name two safe bus rules. Is running in the aisle safe or unsafe?" The driver, two rules, unsafe = the sheet landed.',
 real:'Next time you ride any bus or car, rehearse the rules in miniature: bottoms on seats, quiet voices, hands to yourself. The big yellow bus will feel like a friend when the day comes.'},
{slug:'mail-carrier',file:'mail-carrier.webp',w:1545,h:2000,title:'Mail Carrier',word:'MAIL CARRIER',trace:'MAIL CARRIER',
 tag:'Trace MAIL CARRIER, match the mail carrier to the envelope, the stamp and the mailbox, circle the items that belong in the mail, count the letters and draw a letter you would like to send.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the words MAIL CARRIER, match the carrier to the envelope, stamp and mailbox, circle what travels in the mail, count the letters and draw a letter to send — on screen or on paper.',
 learn:'How a letter travels from a hand to a mailbox across town, what the mail carrier carries, and which things really travel through the mail — plus how to write the words MAIL CARRIER.',
 know:'A mail carrier brings letters and packages to every door: the envelope holds the words, the stamp is the ticket that pays for the trip, and the mailbox is where the journey starts and ends. Flat things ride in envelopes; bigger things ride in boxes.',
 why:'Sending real mail is a disappearing joy, and this sheet hands it back. Naming the mail\u2019s journey builds the idea that messages travel — the seed of understanding addresses, maps and how people stay in touch across any distance.',
 skills:['Community helper vocabulary','Tool matching','Mail sorting','Word tracing','Counting practice','Letter drawing'],
 steps:[
  ['Trace','Trace the dotted words MAIL CARRIER — two words for the person who walks the whole neighborhood.'],
  ['Match','Draw a line from the mail carrier to the envelope, the stamp and the mailbox.'],
  ['Circle','Six pictures sit in the grid — circle every one that truly belongs in the mail. Some are sure friends of the mailbox; some are sneaky visitors!'],
  ['Count','Count the letters in the pile, then write the number in the box.'],
  ['Draw','Draw a letter you would like to send in the big box — to a grandparent, a friend, or a faraway cousin.']],
 say:'"This is a mail carrier — the helper who brings letters to every door. Trace the two words, then connect the envelope, the stamp and the mailbox. Now the six pictures: which ones travel through the mail? Count the letters in the pile, and then draw a letter YOU would like to send."',
 look:'Find the stamp and ask what happens if a letter has none — it cannot take the trip! In the grid, ask of each tile: would this go in an envelope, ride in a package, or not be posted at all? In the count row, letters overlap a little; touch each one so none is missed.',
 ask:'"What does the stamp do?" "Where does a letter start its journey and where does it end?" "Which grid things would you post, and which would you keep?" "Who would YOU send a letter to first?"',
 hint:'Ask of each tile: envelope, package, or no mail at all? The greeting card is a sure friend of the mailbox; the snack and the shoe need more thought. For the count, count from one end of the pile to the other, one touch each.',
 tips:'Make the sheet real: help your child draw the letter from the last box, fold it into an envelope, add a stamp and post it today. A real reply, days later, is the most magical follow-up lesson there is.',
 check:'Ask: "Who brings the letters? Name two things that travel in the mail. What does the stamp pay for?" The carrier, two posts, the trip = the sheet landed.',
 real:'Write and post one real letter this week — a thank-you, a drawing, three words to grandma. Then walk past your own mailbox together and wait. Real mail beats any worksheet every single time.'},
{slug:'baker',file:'baker.webp',w:1545,h:2000,title:'Baker',word:'BAKER',trace:'BAKER',
 tag:'Trace BAKER, match the baker to the bread, the mixing bowl and the oven mitt, circle the foods a baker can make, count the cupcakes and draw a treat you would like to bake.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word BAKER, match the baker to the bread, mixing bowl and oven mitt, circle the bakes, count the cupcakes and draw a treat you would like to bake — on screen or on paper.',
 learn:'What a baker makes before the town wakes up, which tools bake bread and cakes, and which foods come from an oven — plus how to write the word BAKER.',
 know:'A baker mixes, kneads and bakes: the mixing bowl holds the dough, the oven mitt protects hands from the hot oven, and bread, cookies, cakes and croissants all rise in the heat. Apples grow on trees — nobody bakes those!',
 why:'Bakers turn simple flour into celebration food, and children know it in their bones. The baked-versus-grown sorting builds category thinking, and the treat-draw box opens the lovely family talk about which treats are worth baking together.',
 skills:['Kitchen vocabulary','Tool matching','Baked-versus-grown sorting','Word tracing','Counting practice','Treat drawing'],
 steps:[
  ['Trace','Trace the dotted word BAKER across the row — five letters, warm as fresh bread.'],
  ['Match','Draw a line from the baker to the bread, the mixing bowl and the oven mitt.'],
  ['Circle','Six foods sit in the grid — circle every one a baker can bake in the oven. Five come out golden; one grows on a tree!'],
  ['Count','Count the cupcakes, then write the number in the box.'],
  ['Draw','Draw a treat you would like to bake in the big box — cookies, a cake, or something nobody has invented yet.']],
 say:'"This is a baker — she makes bread and treats while the town is still asleep. Trace her name, then connect the bread, the mixing bowl and the oven mitt. Now the six foods: which ones does the oven make? Count the cupcakes slowly, and then draw the treat YOU would bake."',
 look:'Find the oven mitt and ask which hand it protects from what. In the grid, sort out loud: from the oven or off the tree? In the count row, cupcakes wait patiently — touch each swirl of frosting once and keep counting.',
 ask:'"What does the baker pull out of the oven?" "Which foods in the grid did somebody bake?" "Why does the baker wear the big mitt?" "What would you bake first — and who would you share it with?"',
 hint:'One food in the grid has a stem and a shine — ask "does an oven grow this, or does an orchard?" The mitt is the clue to every other tile: oven-hot means baker-made. For the count, touch each cupcake swirl once.',
 tips:'Baking together is measuring, counting and patience in one delicious lesson — one batch of anything this week is enough. Let your child own the mixing and the pouring; the flour mess is the tuition.',
 check:'Ask: "Who bakes our bread? Name two baked foods from the grid. How many cupcakes?" The baker, two bakes, the count = the sheet landed.',
 real:'Bake one simple treat together this week — even a ready-mix counts. Let your child wear the mitt for real (empty-handed first!) and pull the tray out with you. The worksheet, but edible.'},
{slug:'barber',file:'barber.webp',w:1545,h:2000,title:'Barber',word:'BARBER',trace:'BARBER',
 tag:'Trace BARBER, match the barber to the scissors, the comb and the salon chair, circle the tools used for hair care, count the combs and draw a hairstyle you like.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word BARBER, match the barber to the scissors, comb and salon chair, circle the hair-care tools, count the combs and draw a hairstyle you like — on screen or on paper.',
 learn:'What a barber does in the salon, which tools cut, dry and wash hair, and which tools belong to bathrooms and art boxes instead — plus how to write the word BARBER.',
 know:'A barber cuts and shapes hair: the scissors snip, the comb straightens, the hairdryer blows warm air, and the shampoo bottle washes it all first. Hair keeps growing and growing, so the barber\u2019s chair is a friend we visit again and again.',
 why:'Haircut days go better when the tools are old friends on paper first. The tool grid sharpens bathroom-versus-salon-versus-art-box sorting, and the hairstyle draw box gives your child a say in their own look — small ownership, big cooperation.',
 skills:['Salon vocabulary','Tool matching','Hair-care sorting','Word tracing','Counting practice','Hairstyle drawing'],
 steps:[
  ['Trace','Trace the dotted word BARBER across the row — six letters, one for every snip.'],
  ['Match','Draw a line from the barber to the scissors, the comb and the salon chair.'],
  ['Circle','Six pictures sit in the grid — circle every tool that cares for hair. Two of them care for teeth and paintings instead!'],
  ['Count','Count the combs, then write the number in the box.'],
  ['Draw','Draw a hairstyle you like in the big box — long, short, curly, braided, or a brand-new invention.']],
 say:'"This is a barber — the helper who keeps hair neat and tidy. Trace the name, then connect the scissors, the comb and the salon chair. Now the six pictures: which tools are for hair? Count the combs carefully, and then draw a hairstyle YOU think looks wonderful."',
 look:'Find the big salon chair and ask what its lever does. In the grid, ask of each tool: hair, teeth, or paintings? The toothbrush and the paintbrush are visiting from other rooms. In the draw box, ask whether the hairstyle is for today or for a party.',
 ask:'"What do the scissors do in the salon?" "Which two grid tools are NOT for hair?" "What happens to hair when it grows?" "How do YOU like your hair — and who cuts it?"',
 hint:'Two tools in the grid look like close cousins of hair tools — one lives by the bathroom sink and one swims in a jar of paint water. Ask of each: does this snip, wash or style HAIR — or something else? For the count, combs lie in a row: one touch per tooth-holding tool.',
 tips:'If haircuts bring wiggles, this sheet is the warm-up: name the tools, let your child hold a comb during the real cut, and ask the barber to explain each step. Familiar tools make steady heads.',
 check:'Ask: "Who cuts and styles hair? Name two hair tools from the grid. How many combs?" The barber, two tools, the count = the sheet landed.',
 real:'Play salon tonight: a doll, a soft brush, a gentle mist of water, and your child as the barber explaining every step — snip, comb, dry. At the next real haircut, ask them to name the tools as they appear.'},
{slug:'construction-worker',file:'construction-worker.webp',w:1545,h:2000,title:'Construction Worker',word:'CONSTRUCTION WORKER',trace:'CONSTRUCTION WORKER',
 tag:'Trace CONSTRUCTION WORKER, match the builder to the hard hat, the hammer and the safety vest, circle the tools used on a building site, count the safety cones and draw a safe building.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the words CONSTRUCTION WORKER, match the builder to the hard hat, hammer and safety vest, circle the building-site tools, count the safety cones and draw a safe building — on screen or on paper.',
 learn:'What a construction worker builds and wears, which tools build walls and which build pictures, and why the hard hat and vest matter — plus how to write the words CONSTRUCTION WORKER.',
 know:'Construction workers build the town: the hard hat protects the head, the safety vest makes the builder easy to see, and hammers, wrenches, saws and shovels do the heavy work. Pencils make the plans and paintbrushes add the color — at a desk, before and after the building!',
 why:'Every crane and cone on the street becomes interesting once a child can name the world of work behind it. The tool grid sorts build-tools from desk-tools, and the hard hat opens the real site-safety talk: sites are for builders, and watchers stay outside the fence.',
 skills:['Building vocabulary','Tool matching','Work-tool sorting','Word tracing','Counting practice','Building drawing'],
 steps:[
  ['Trace','Trace the dotted words CONSTRUCTION WORKER — two very long words for very strong work. One letter at a time!'],
  ['Match','Draw a line from the construction worker to the hard hat, the hammer and the safety vest.'],
  ['Circle','Six tools sit in the grid — circle every one that works on a building site. Two of them do their work on paper instead!'],
  ['Count','Count the safety cones, then write the number in the box.'],
  ['Draw','Draw a safe building you can imagine in the big box — a tower, a bridge, a house for a dragon, anything sturdy.']],
 say:'"This is a construction worker — the builder who makes houses, roads and towers. Trace the two long words, then connect the hard hat, the hammer and the safety vest. Now the six tools: which ones build things? Count the orange cones, and then draw a building YOU would love to make."',
 look:'Find the yellow stripes on the safety vest and the shine on the hard hat. In the grid, ask of each tool: does this build, or does it write and paint? In the count row, cones often stand in a row like a little fence — count them with one touch each.',
 ask:'"What does the hard hat protect?" "Which two tools in the grid work on paper, not on walls?" "What do the orange cones warn people about?" "What is YOUR building made of, and who lives in it?"',
 hint:'Two tools in the grid are desk friends — one makes plans and one makes pictures. Ask of each: would this hammer a nail, or help draw the house first? The saw, the shovel and the wrench are busy builders here.',
 tips:'Real building sites are exciting and dangerous — the rule for little watchers is simple: stay outside the fence with a grown-up, always. Point out hard hats and cones from the safe side of the street on your next walk instead.',
 check:'Ask: "Who builds houses and towers? Name two building tools from the grid. How many cones?" The builder, two tools, the count = the sheet landed.',
 real:'Walk past a real building site (from the safe side) and spot the grid together: hard hats, vests, cones, tools. Back home, build the drawn building from blocks — plans on paper first, exactly like real builders do.'},
{slug:'electrician',file:'electrician.webp',w:1545,h:2000,title:'Electrician',word:'ELECTRICIAN',trace:'ELECTRICIAN',
 tag:'Trace ELECTRICIAN, match the electrician to the light bulb, the wire and the tool belt, circle the things that use electricity, count the light bulbs and draw a safe way to use electricity.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word ELECTRICIAN, match the electrician to the light bulb, wire and tool belt, circle what uses electricity, count the bulbs and draw a safe way to use it — on screen or on paper.',
 learn:'What an electrician fixes and installs, which everyday things run on electricity, and the one big rule about sockets and wires — plus how to write the word ELECTRICIAN.',
 know:'An electrician works with wires that carry electricity: the light bulb glows when the wires do their job, and the tool belt holds everything for safe repairs. Fans, washing machines, desk lamps and microwaves all drink electricity — bicycles and soccer balls run on legs instead!',
 why:'Electricity is invisible, so naming what it powers makes it thinkable — and the safety rule becomes real: never poke sockets, never touch wires, and keep water far from plugs. That rule, learned young, is a lifelong shield.',
 skills:['Community helper vocabulary','Tool matching','Electricity awareness','Electric-safety rules','Word tracing','Safety drawing'],
 steps:[
  ['Trace','Trace the dotted word ELECTRICIAN letter by letter — a long, bright word with eleven letters.'],
  ['Match','Draw a line from the electrician to the light bulb, the wire and the tool belt.'],
  ['Circle','Six pictures sit in the grid — circle every one that uses electricity. Two of them run on muscle power instead!'],
  ['Count','Count the light bulbs, then write the number in the box.'],
  ['Draw','Draw a safe way to use electricity in the big box — a lamp switched off at bedtime, or a grown-up doing the plugging.']],
 say:'"This is an electrician — the helper who takes care of the wires that bring us light. Trace the long word, then connect the light bulb, the wire and the tool belt. Now the six pictures: which ones need electricity to work? Count the bulbs, and then draw one safe way WE use electricity at home."',
 look:'Find the tool belt and ask what a repair helper carries in it. In the grid, ask of each tile: plug in, or leg power? In the draw box, praise any picture where a grown-up\u2019s hands do the plugging — that is the safety rule drawn in crayon.',
 ask:'"What does the electrician fix?" "Which grid things drink electricity?" "What runs your bicycle instead?" "What is our family rule about sockets and wires?"',
 hint:'Two tiles in the grid are powered by you — pedals and kicks. Ask of each: does this need a plug, or strong muscles? And the big rule hides in every home: sockets and wires are grown-ups\u2019 business only.',
 tips:'Say the rule until it is furniture: never poke sockets, never chew or touch cords, keep water far from plugs — and always tell a grown-up about sparks or frayed wires. Calm repetition, not fear, is what keeps children safe.',
 check:'Ask: "Who fixes the wires? Name two things that use electricity. What do we never poke?" The electrician, two plugs, sockets = the sheet landed.',
 real:'Do a socket safari at home today: find every outlet, every cord and every plug — count them, name what each powers, and practise the rule with your hands behind your back. Real house, real rule, real safety.'},
{slug:'plumber',file:'plumber.webp',w:1545,h:2000,title:'Plumber',word:'PLUMBER',trace:'PLUMBER',
 tag:'Trace PLUMBER, match the plumber to the pipe wrench, the toolbox and the sink, circle the tools a plumber uses, count the pipes and draw a way to save water.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word PLUMBER, match the plumber to the pipe wrench, toolbox and sink, circle the plumber\u2019s tools, count the pipes and draw a way to save water — on screen or on paper.',
 learn:'What a plumber fixes behind walls and under sinks, which tools steer the water, and why water is worth saving — plus how to write the word PLUMBER.',
 know:'A plumber takes care of the pipes that bring clean water in and carry used water out: the pipe wrench turns big pipe nuts, the plunger politely pushes a blockage away, and the toolbox holds it all. Water is precious — turning the tap off while brushing is a plumber\u2019s favorite trick.',
 why:'Plumbers are invisible helpers until a pipe bursts, and this sheet makes them visible and valued. The tool grid invites careful talk about each tool, and the save-water draw box plants an earth-caring habit that pays for itself on the next bill.',
 skills:['Community helper vocabulary','Tool matching','Water awareness','Word tracing','Counting practice','Water-saving drawing'],
 steps:[
  ['Trace','Trace the dotted word PLUMBER letter by letter — seven letters for the friend of every faucet.'],
  ['Match','Draw a line from the plumber to the pipe wrench, the toolbox and the sink.'],
  ['Circle','Six tools sit in the grid — circle every one a plumber really uses. Talk about each: some tools build houses and pictures instead of fixing pipes!'],
  ['Count','Count the pipes in the pipe drawing, then write the number in the box.'],
  ['Draw','Draw a way to save water in the big box — a shorter shower, a tap turned off while teeth get brushed, or rain collected in a bucket.']],
 say:'"This is a plumber — the helper who takes care of our water pipes. Trace the name, then connect the pipe wrench, the toolbox and the sink. Now the six tools: which ones does a plumber really use? Let\u2019s talk about each. Count the pipes, and then draw one way to save water at home."',
 look:'Find the sink in the match row and trace where the water goes. In the grid, take each tool one at a time — the hammer builds, the paintbrush paints, and the wrenches and the plunger work with water. In the pipe drawing, pipes bend and cross; follow each one with a finger so the count stays true.',
 ask:'"What does the pipe wrench turn?" "Which two grid tools belong to a builder and an artist instead?" "Where does the water go when it leaves our sink?" "How can WE save water today?"',
 hint:'Two tools in the grid never touch a pipe — one bangs nails and one swims in paint. Ask of each tool: does this help water flow, or does it do a different job altogether?',
 tips:'Turn the tap off while brushing teeth — two minutes, twice a day, a small bucket saved every single time. If a plumber ever visits, let your child watch the wrench work and hand over the flashlight: helpers love small apprentices.',
 check:'Ask: "Who fixes the pipes? Name two plumber tools from the grid. How can we save water?" The plumber, two tools, one saving idea = the sheet landed.',
 real:'Tonight, brush teeth with the tap OFF and count the seconds together — then celebrate the saved water out loud. Small ritual, real habit, exactly what the draw box was for.'},
{slug:'mechanic',file:'mechanic.webp',w:1545,h:2000,title:'Mechanic',word:'MECHANIC',trace:'MECHANIC',
 tag:'Trace MECHANIC, match the mechanic to the wrench, the toolbox and the car, circle the tools a mechanic uses, count the tires and draw a vehicle you would like to fix.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word MECHANIC, match the mechanic to the wrench, toolbox and car, circle the mechanic\u2019s tools, count the tires and draw a vehicle to fix — on screen or on paper.',
 learn:'What a mechanic fixes under the hood, which tools mend engines, and how to tell a mechanic\u2019s tools from a doctor\u2019s — plus how to write the word MECHANIC.',
 know:'A mechanic keeps cars and trucks running: the wrench turns the bolts, the toolbox holds every size, and the car rolls up on its tires for a check. Here is a funny one — a stethoscope listens to hearts, not engines; that tool belongs to the doctor!',
 why:'The mechanic-versus-doctor mix-up is the funniest, most memorable sort on the whole set — and memorable is the point. Naming the garage world makes every oil stop interesting, and the vehicle draw box turns observers into little engineers.',
 skills:['Garage vocabulary','Tool matching','Job-versus-job sorting','Word tracing','Counting practice','Vehicle drawing'],
 steps:[
  ['Trace','Trace the dotted word MECHANIC letter by letter — eight letters, greasy and great.'],
  ['Match','Draw a line from the mechanic to the wrench, the toolbox and the car.'],
  ['Circle','Six tools sit in the grid — circle every one a mechanic really uses. One of them listens to hearts, not engines!'],
  ['Count','Count the tires on the red car, then write the number in the box.'],
  ['Draw','Draw a vehicle you would like to fix in the big box — a race car, a tractor, a fire truck, or one of your own invention.']],
 say:'"This is a mechanic — the helper who keeps cars running strong. Trace the name, then connect the wrench, the toolbox and the car. Now the six tools: which ones fix engines? One of them is very silly here! Count the tires on the red car, and then draw the vehicle YOU would love to fix."',
 look:'Find the red car in the match row and count its wheels right on the sheet. In the grid, ask of each tool: would this fix an engine, a wooden shelf, or a person? The stethoscope is the giggler — it listens to people, not pickups. In the draw box, ask for a hood that really opens.',
 ask:'"What does the mechanic turn with the wrench?" "Which grid tool belongs to the doctor, and why is that funny?" "What do tires do for a car?" "What vehicle would YOU fix first — and what is broken on it?"',
 hint:'One tool in the grid is wearing the wrong uniform — ask "who listens with this, a mechanic or a doctor?" For every other tool, wonder out loud: would this turn a bolt, cut wood, or fix something else entirely?',
 tips:'Next oil change or tire stop, bring the vocabulary: let your child name the wrench, the jack, the tires. Garages are workplaces, not playgrounds — watching happens beside a grown-up, always.',
 check:'Ask: "Who fixes cars? Name two mechanic tools from the grid. How many tires does the red car have?" The mechanic, two tools, the tire count = the sheet landed.',
 real:'Bicycle maintenance day: pump the tires, check the brakes, wipe the frame — with your child as head mechanic explaining each move. Two wheels are the perfect first garage.'},
{slug:'pilot',file:'pilot.webp',w:1545,h:2000,title:'Pilot',word:'PILOT',trace:'PILOT',
 tag:'Trace PILOT, match the pilot to the airplane, the passport and the flight map, circle the things that belong on an airplane, count the airplanes and draw a safe airplane journey.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word PILOT, match the pilot to the airplane, passport and flight map, circle what belongs aboard, count the airplanes and draw a safe journey — on screen or on paper.',
 learn:'What a pilot does in the cockpit, which papers and maps fly along, and which things belong aboard an airplane — plus how to write the word PILOT.',
 know:'The pilot flies the airplane and keeps every passenger safe: the passport shows who you are in other countries, the flight map shows the way through the sky, and aboard the plane the seat belt clicks for takeoff and landing. Headphones, suitcases and life vests fly along too.',
 why:'First flights are big feelings in small bodies. Naming the pilot, the papers and the plane\u2019s things turns the airport from chaos into a checklist your child can own — and the seat-belt rule rehearsed here rides along on every trip.',
 skills:['Airport vocabulary','Tool matching','Air-travel sorting','Word tracing','Counting practice','Journey drawing'],
 steps:[
  ['Trace','Trace the dotted word PILOT across the row — five letters that fly.'],
  ['Match','Draw a line from the pilot to the airplane, the passport and the flight map.'],
  ['Circle','Six pictures sit in the grid — circle every one that belongs aboard an airplane. One of them belongs on a grassy field instead!'],
  ['Count','Count the airplanes, then write the number in the box.'],
  ['Draw','Draw a safe airplane journey in the big box — the plane, the clouds, and you with your seat belt clicked.']],
 say:'"This is a pilot — the captain who flies the airplane. Trace the name, then connect the airplane, the passport and the flight map. Now the six pictures: which ones belong on a plane? Count the airplanes carefully, and then draw a safe trip through the sky — seat belt on!"',
 look:'Find the wings on the airplane and the lines on the flight map. In the grid, ask of each tile: does this fly with us, or does it stay home? The sandwich starts a good conversation about snacks and suitcases. In the draw box, ask for the seat belt across the little traveler\u2019s lap.',
 ask:'"What does the passport tell people?" "What does the seat belt do for takeoff?" "Which grid things ride along in a suitcase?" "Where would YOU fly, and who would you visit?"',
 hint:'One tile in the grid is round, bouncy and better off in the park. The little sandwich is a friendly question — ask "is a snack part of the airplane, or part of your carry-on?" There is room to talk about both. For the count, planes point different ways: touch each one once.',
 tips:'Flying soon? Rehearse the sequence on the sheet: buckle the seat belt low and tight, stay seated when the seat-belt sign is on, and listen to the crew — they are the captain\u2019s helpers. Calm practice beats airport panic, every time.',
 check:'Ask: "Who flies the airplane? Name two things that belong aboard. What do we do for takeoff?" The pilot, two things, buckle up = the sheet landed.',
 real:'Flying this year? Let your child carry their own small backpack and click their own seat belt — then point out the real flight map on the seat-back screen. The sheet, but at 30,000 feet.'},
{slug:'flight-attendant',file:'flight-attendant.webp',w:1545,h:2000,title:'Flight Attendant',word:'FLIGHT ATTENDANT',trace:'FLIGHT ATTENDANT',
 tag:'Trace FLIGHT ATTENDANT, match the flight attendant to the tray, the seat belt and the airplane, circle the safe airplane rules, count the suitcases and draw a safe airplane seat.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the words FLIGHT ATTENDANT, match the attendant to the tray, seat belt and airplane, circle the safe flying rules, count the suitcases and draw a safe seat — on screen or on paper.',
 learn:'What a flight attendant does for passengers, the four rules of flying safely, and which rules are safe and which are not — plus how to write the words FLIGHT ATTENDANT.',
 know:'The flight attendant takes care of everyone aboard: the tray carries meals and drinks down the aisle, the seat belt keeps every body snug for takeoff and landing, and the crew\u2019s gentle voice is the one to listen to. Aisles are for walking only — and never during takeoff!',
 why:'The cabin crew are the sky\u2019s crossing guards: their rules keep a whole plane of wiggly travelers safe. Sorting the safe rules from the silly one lets your child rehearse the real flight before it happens — and giving the rules a face makes them easy to follow.',
 skills:['Airport vocabulary','Tool matching','Flying-safety rules','Safe-versus-unsafe sorting','Word tracing','Seat drawing'],
 steps:[
  ['Trace','Trace the dotted words FLIGHT ATTENDANT — two long words for the busiest helper in the sky.'],
  ['Match','Draw a line from the flight attendant to the tray, the seat belt and the airplane.'],
  ['Circle','Four rules sit in the grid, each written in words — circle every SAFE rule for riding in an airplane. One of the four is never allowed!'],
  ['Count','Count the suitcases, then write the number in the box.'],
  ['Draw','Draw a safe airplane seat in the big box — you sitting tall, seat belt clicked, tray folded up.']],
 say:'"This is a flight attendant — she takes care of everyone on the airplane. Trace the two words, then connect the tray, the seat belt and the airplane. Now the four rules: which are safe? Count the suitcases slowly, and then draw you in a safe seat, belt clicked and ready to fly."',
 look:'Find the tray and ask what travels on it — juice, meals, and sometimes a smile. In the grid, read each rule aloud and act the safe ones out: hands click an imaginary belt, bottoms sit tall. Let your child catch the aisle-run rule with a big NO.',
 ask:'"What does the flight attendant carry on the tray?" "Which three rules are safe?" "Why do we stay seated for takeoff and landing?" "What does the seat belt sound like when it clicks?"',
 hint:'Three rules keep every flyer snug and one rule would tumble a tray — the unsafe one happens in the aisle. Read all four out loud: safe rules sound steady, and the silly one sounds fast.',
 tips:'On your next flight, introduce your child to a crew member and let them show off the belt — the crew are the rules\u2019 own grown-ups, and children follow a face better than a lecture. Trash in the bin, tray folded: the whole sheet, lived.',
 check:'Ask: "Who takes care of passengers in the sky? Name two safe flying rules. Is running in the aisle safe or unsafe?" The crew, two rules, unsafe = the sheet landed.',
 real:'Rehearse with a kitchen chair: sit tall, click an imaginary belt, fold the tray, ask to move — grown-up style. Then fly it to the living room. The whole sheet, landed softly on the carpet.'},
{slug:'train-conductor',file:'train-conductor.webp',w:1545,h:2000,title:'Train Conductor',word:'TRAIN CONDUCTOR',trace:'TRAIN CONDUCTOR',
 tag:'Trace TRAIN CONDUCTOR, match the conductor to the train, the ticket and the whistle, circle the safe train-riding rules, count the train windows and draw a train going somewhere new.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the words TRAIN CONDUCTOR, match the conductor to the train, ticket and whistle, circle the safe train rules, count the windows and draw a train to somewhere new — on screen or on paper.',
 learn:'What a train conductor does aboard the cars, the four rules of riding trains safely, and which rules are safe and which are not — plus how to write the words TRAIN CONDUCTOR.',
 know:'The conductor checks tickets, calls the stations and keeps every rider on course: the ticket is your pass to ride, the whistle wakes the train, and the yellow line on the platform is the place where waiting feet stop. Windows are for looking — never for leaning!',
 why:'Trains are magical AND heavy, which is exactly why the yellow line matters. Sorting safe from unsafe rules gives your child the platform talk before the platform does — and the somewhere-new draw box turns rail safety into adventure planning.',
 skills:['Train vocabulary','Tool matching','Platform safety','Safe-versus-unsafe sorting','Word tracing','Journey drawing'],
 steps:[
  ['Trace','Trace the dotted words TRAIN CONDUCTOR — two words, long as a freight line. One letter at a time!'],
  ['Match','Draw a line from the conductor to the train, the ticket and the whistle.'],
  ['Circle','Four rules sit in the grid, each written in words — circle every SAFE way to ride a train. One of the four is a wobbly mistake!'],
  ['Count','Count the windows on the long train, then write the number in the box.'],
  ['Draw','Draw a train going to a new place in the big box — mountains, the sea, grandma\u2019s town, or a city nobody has named yet.']],
 say:'"This is the train conductor — the captain of the whole train. Trace the two words, then connect the train, the ticket and the whistle. Now the four rules: which are safe? Count the windows on the long train, and then draw where YOUR train would go — somewhere brand new!"',
 look:'Find the engine at the front of the long train and count the cars it pulls. In the grid, read each rule aloud — sitting bottoms, staying close to your adult, waiting feet behind the yellow line — and let your child veto the window-lean with a strong NO.',
 ask:'"What does the conductor do with the ticket?" "Which three train rules are safe?" "Why do we stand behind the yellow line?" "Where would YOUR train go first?"',
 hint:'Three rules keep every rider on track and one tips people out the window — the wobbly one is about leaning. Read all four with wide-open ears; the safe ones stand still and the unsafe one stretches.',
 tips:'On a real platform, the ritual is: hand in hand, back from the yellow line, and never near the edge while the train arrives. Say it the same way every time — sameness is what makes the rule stick when the whistle blows.',
 check:'Ask: "Who is the captain of the train? Name two safe train rules. Where do waiting feet stop?" The conductor, two rules, the yellow line = the sheet landed.',
 real:'Ride a real train, a tram or the airport shuttle this month and rehearse the sheet: ticket checked, yellow line respected, window admired with eyes only. The somewhere-new box comes true the moment the wheels start.'},
{slug:'cashier',file:'cashier.webp',w:1545,h:2000,title:'Cashier',word:'CASHIER',trace:'CASHIER',
 tag:'Trace CASHIER, match the cashier to the basket, the scanner and the receipt, circle the things you might buy at a store, count the apples and draw something you would like to buy.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word CASHIER, match the cashier to the basket, scanner and receipt, circle the store things, count the apples and draw something you would like to buy — on screen or on paper.',
 learn:'What a cashier does at the checkout, what the scanner and receipt do, and which things travel home from a store — plus how to write the word CASHIER.',
 know:'The cashier rings up everything in the basket: the scanner beeps to read each price, the receipt is the shopping\u2019s story on paper, and the basket carries it all to the belt. Apples, milk, books, teddy bears, bananas and crayons — a store holds a whole world.',
 why:'The checkout is where numbers, money and patience meet, and this sheet lets your child own it from the safe side of the belt. This grid is the friendly kind — every picture belongs — which builds a child\u2019s sorting confidence before trickier grids arrive.',
 skills:['Store vocabulary','Tool matching','Shopping sorting','Word tracing','Counting practice','Wish-list drawing'],
 steps:[
  ['Trace','Trace the dotted word CASHIER letter by letter — seven letters for the boss of the beep.'],
  ['Match','Draw a line from the cashier to the basket, the scanner and the receipt.'],
  ['Circle','Six things sit in the grid — circle every one you might buy at a store. Friendly news: every single one belongs!'],
  ['Count','Count the apples, then write the number in the box.'],
  ['Draw','Draw something you would like to buy in the big box — a toy, a snack, a gift for someone, anything on your wish list.']],
 say:'"This is a cashier — the helper who rings up everything we choose at the store. Trace the name, then connect the basket, the scanner and the receipt. Now the six pictures: which ones could we buy? Count the apples carefully, and then draw one thing YOU would love to buy someday."',
 look:'Find the scanner and ask what the beep means — it reads the price! In the grid, name each thing and ask which basket it belongs in: food, toys, or school supplies. In the count row, apples like to huddle: count from one end to the other, one gentle touch each.',
 ask:'"What does the scanner beep for?" "What does the receipt tell us?" "Which of the six things would YOU put in the basket first?" "What does the cashier say when we pay?"',
 hint:'This grid is the generous kind — every single tile belongs at the store, so circle proudly and name what each one is for. For the count, work from one end of the apples to the other so none rolls out of the count.',
 tips:'At the real checkout, hand over the sheet\u2019s jobs: your child places the basket items on the belt, watches the scanner beep and holds the receipt. Money talk can wait — the sequence is the lesson.',
 check:'Ask: "Who takes our money at the store? Name two things you can buy there. What does the receipt do?" The cashier, two buys, the story-on-paper = the sheet landed.',
 real:'Play store tonight with the pantry and a shoebox till: your child is the cashier, you are the customer, and the receipt is scribbled on paper. Real script, real beeps, whole worksheet alive.'},
{slug:'animal-shelter-worker',file:'animal-shelter-worker.webp',w:1545,h:2000,title:'Animal Shelter Worker',word:'ANIMAL SHELTER WORKER',trace:'ANIMAL SHELTER WORKER',
 tag:'Trace ANIMAL SHELTER WORKER, match the worker to the puppy, the food bowl and the kennel, circle the ways to care for an animal, count the pet bowls and draw an animal that needs a home.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the words ANIMAL SHELTER WORKER, match the worker to the puppy, food bowl and kennel, circle the caring ways, count the pet bowls and draw an animal that needs a home — on screen or on paper.',
 learn:'What an animal shelter is and who works there, six everyday ways to care for an animal, and the big truth that every animal deserves a loving home — plus how to write a very long job title.',
 know:'An animal shelter is a safe waiting place for animals without homes: the kennel is each dog\u2019s own room, the food bowl fills every day, and the worker feeds, brushes, walks and loves every animal until a family comes. Every one of the six caring ways on the sheet is right.',
 why:'This is the empathy sheet of the set: every tile is a kind act, so the circle step becomes a chorus of yeses. Drawing an animal that needs a home gives big feelings a safe place to land — and plants the family conversation about how we help real animals.',
 skills:['Community helper vocabulary','Caring actions vocabulary','Tool matching','Empathy and kindness','Word tracing','Caring drawing'],
 steps:[
  ['Trace','Trace the dotted words ANIMAL SHELTER WORKER — three words! Take them one letter at a time, like steps down the kennel row.'],
  ['Match','Draw a line from the shelter worker to the puppy, the food bowl and the kennel.'],
  ['Circle','Six labeled pictures show ways to care for an animal — circle every single one, because every way on this sheet is a caring way!'],
  ['Count','Count the pet bowls, then write the number in the box.'],
  ['Draw','Draw an animal that needs a loving home in the big box — and give it your best kind eyes.']],
 say:'"This is an animal shelter worker — the helper who takes care of animals while they wait for a family. Trace the three long words, then connect the puppy, the food bowl and the kennel. Now the six pictures: every single one is a way to be kind. Circle them all! Then draw an animal who needs a home — yours would do."',
 look:'Find the puppy\u2019s ears and the kennel\u2019s door. In the grid, read each caring way aloud and act it out on a stuffed animal — brush, feed, pet, play, bath, love. Ask which one your child would do FIRST for a nervous new puppy, and why.',
 ask:'"What is an animal shelter for?" "Which caring ways did you circle — can you do one for a pet today?" "How does a shelter dog feel while it waits?" "What do gentle hands look like?"',
 hint:'There are no tricks in this grid — all six labeled ways are kind ones. The real thinking is in the acting: try each caring way on your teddy and find the one that feels most like you.',
 tips:'Shelters are full of helpers and hopeful animals — call yours and ask about a child-friendly visit or a towel donation; even sorting old blankets is real helping. Gentle-hands practice on stuffed animals is the rehearsal every real pet deserves.',
 check:'Ask: "Who cares for animals at the shelter? Name two ways to care for an animal. Which one will YOU do today?" The worker, two ways, one today = the sheet landed.',
 real:'Do one caring act from the grid for a real or stuffed animal tonight — brush, feed, pet, play, a warm bath or extra love. Then ask your child which way was easiest and which was hardest. Kindness grows by doing.'},
{slug:'artist',file:'artist.webp',w:1545,h:2000,title:'Artist',word:'ARTIST',trace:'ARTIST',
 tag:'Trace ARTIST, match the artist to the paintbrush, the palette and the easel, circle the art supplies, count the paintbrushes and draw a picture that is all your own.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word ARTIST, match the artist to the paintbrush, palette and easel, circle the art supplies, count the paintbrushes and draw a picture all your own — on screen or on paper.',
 learn:'What an artist does all day, what the palette and easel are for, and which tools make pictures happen — plus how to write the word ARTIST.',
 know:'An artist makes pictures and sculptures from ideas: the paintbrush carries the color, the palette holds every color side by side, and the easel stands the canvas up tall. Pencils, markers, glue and scissors are artists\u2019 helpers too — the whole grid is on the artist\u2019s side!',
 why:'Every child is already an artist; this sheet simply names the tools and hands over the permission. The all-friendly grid builds sorting confidence, and the final draw box is deliberately empty — the sheet ends by asking your child to be the artist.',
 skills:['Art vocabulary','Tool matching','Supply sorting','Word tracing','Counting practice','Free drawing'],
 steps:[
  ['Trace','Trace the dotted word ARTIST across the row — six letters, one for every color of the rainbow.'],
  ['Match','Draw a line from the artist to the paintbrush, the palette and the easel.'],
  ['Circle','Six pictures sit in the grid — circle every art supply. Friendly news: every single one belongs in the artist\u2019s studio!'],
  ['Count','Count the paintbrushes, then write the number in the box.'],
  ['Draw','Draw a picture that is all your own in the big box — anything at all; this is YOUR gallery wall.']],
 say:'"This is an artist — the maker of beautiful pictures. Trace the name, then connect the paintbrush, the palette and the easel. Now the six pictures: every one is an art supply! Circle them all. Count the paintbrushes slowly, and then the big box is yours — draw whatever YOU love."',
 look:'Find the palette and count the colors sitting on it. In the grid, name each supply and ask what it makes: marks, lines, sticking or snipping. In the draw box, stay quiet and nearby; when it is done, ask what is happening in the picture rather than what it is.',
 ask:'"What does the artist hold on the palette?" "Which supplies did you circle — which have YOU used?" "Where does an artist get ideas?" "Tell me about your drawing — what is happening in it?"',
 hint:'No tricks in this grid — pencils, markers, glue and scissors are all studio friends, so circle every one with confidence. For the big draw box there is no wrong answer: start with one line and see where it walks.',
 tips:'Display the finished drawing like a real gallery — a fridge frame and a title card written by the artist. Name real artists your child knows: the aunt who paints, the illustrator inside a favorite book. Art is a job made of play.',
 check:'Ask: "Who makes pictures for a living? Name two art supplies from the grid. How many paintbrushes?" The artist, two supplies, the count = the sheet landed.',
 real:'Set up a two-minute studio tonight: paper, two colors, one brush — and let your child be the artist while you are the assistant who rinses the brushes. Ask for the picture\u2019s story, not its accuracy.'},
{slug:'delivery-driver',file:'delivery-driver.webp',w:1545,h:2000,title:'Delivery Driver',word:'DELIVERY DRIVER',trace:'DELIVERY DRIVER',
 tag:'Trace DELIVERY DRIVER, match the driver to the delivery van, the package and the address label, circle the things that can be delivered, count the packages and draw a package you would like to send.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the words DELIVERY DRIVER, match the driver to the van, package and address label, circle what can be delivered, count the packages and draw a package to send — on screen or on paper.',
 learn:'How packages travel from a sender to a doorstep, what the address label does, and which things can ride in a delivery van — plus how to write the words DELIVERY DRIVER.',
 know:'A delivery driver carries things from place to place: the van holds everything, the package keeps it safe, and the address label tells the van exactly which door to stop at. Gifts, pizza boxes, shirts, balls, books and even apples can all ride along!',
 why:'Children watch delivery vans like theater — this sheet hands them the script. The all-correct grid builds confidence, the address label opens early talk about names, streets and maps, and the send-a-package box makes your child the sender for once.',
 skills:['Delivery vocabulary','Tool matching','Parcel sorting','Word tracing','Counting practice','Package drawing'],
 steps:[
  ['Trace','Trace the dotted words DELIVERY DRIVER — two words, all the way from the sender to the door.'],
  ['Match','Draw a line from the delivery driver to the van, the package and the address label.'],
  ['Circle','Six things sit in the grid — circle every one that could ride in a delivery van. Friendly news: every single one can!'],
  ['Count','Count the packages, then write the number in the box.'],
  ['Draw','Draw a package you would like to send in the big box — and do not forget the address label with a name on it.']],
 say:'"This is a delivery driver — the helper who brings things right to our door. Trace the two words, then connect the van, the package and the address label. Now the six pictures: every one of them can ride in the van! Circle them all. Count the packages, and then draw a package YOU would send — who is it for?"',
 look:'Find the address label and ask whose name should be on it. In the grid, name each thing and wonder where it would travel — a birthday, a pizza night, a gift for a far cousin. In the count row, packages stack: count the top box first, then work down.',
 ask:'"What does the address label do?" "Which grid things have YOU seen a van deliver?" "What happens if the label has the wrong name?" "Who would YOU send a package to, and what would be inside?"',
 hint:'No tricks here — every tile fits in a parcel, so circle the whole grid and tell a delivery story about each. For the draw box, the label is the secret ingredient: every package needs a name and a door.',
 tips:'Next delivery at your door, let your child spot the van, the package and the label — the whole sheet in ninety seconds. Save a shipping box for a week of pretend deliveries; the address label is where name-writing practice hides.',
 check:'Ask: "Who brings packages to our door? Name two things that can be delivered. What tells the driver where to stop?" The driver, two parcels, the label = the sheet landed.',
 real:'Send one real package this month — cookies to a cousin, a drawing to a friend — and let your child help write the address label and drop it off. Watching it arrive is the best worksheet follow-up there is.'},
{slug:'florist',file:'florist.webp',w:1545,h:2000,title:'Florist',word:'FLORIST',trace:'FLORIST',
 tag:'Trace FLORIST, match the florist to the flowers, the vase and the watering can, circle the things plants need to grow, count the flowers and draw a colorful bouquet.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word FLORIST, match the florist to the flowers, vase and watering can, circle what plants need to grow, count the flowers and draw a colorful bouquet — on screen or on paper.',
 learn:'What a florist arranges and sells, what every plant needs to grow — sun, water and care — and how to tell plant-helpers from party guests — plus how to write the word FLORIST.',
 know:'A florist works with flowers: the vase holds the bouquet, the watering can gives each stem a drink, and every flower in the shop was once a seed that needed sun, rain and soil. Chocolate cake is wonderful — but no plant ever grew from cake!',
 why:'This sheet hides a science lesson inside a flower shop: what a living thing truly needs. The plant-needs grid builds the earliest biology sorting there is, and the bouquet draw box ends the sheet with generosity — flowers are how people say kind things.',
 skills:['Plant vocabulary','Tool matching','Plant-needs sorting','Word tracing','Counting practice','Bouquet drawing'],
 steps:[
  ['Trace','Trace the dotted word FLORIST across the row — seven letters, blooming as you go.'],
  ['Match','Draw a line from the florist to the flowers, the vase and the watering can.'],
  ['Circle','Six pictures sit in the grid — circle every one that helps a plant grow. Four are true plant-helpers; two are party guests!'],
  ['Count','Count the flowers, then write the number in the box.'],
  ['Draw','Draw a colorful bouquet in the big box — every flower a different color, and one for someone you love.']],
 say:'"This is a florist — the helper who makes bouquets out of flowers. Trace the name, then connect the flowers, the vase and the watering can. Now the six pictures: which ones help plants grow? Count the flowers petal by petal, and then draw a bouquet — who should we pretend to give it to?"',
 look:'Find the watering can and ask what it gives the flowers — a drink, just like you! In the grid, ask of each tile: sun, water, or something a plant cannot eat? In the draw box, ask for at least three colors; florists are not shy with color.',
 ask:'"What does a florist sell?" "What three things does every plant need to grow?" "Which grid tiles are party guests instead?" "Who would you give a real bouquet to, and why?"',
 hint:'Two tiles in the grid are visitors from a birthday — one is sweet and one bounces. Ask of each: does a seed drink this, grow toward this — or would this just sit there? The little seedling in its pot is a big clue.',
 tips:'Grow something this week — a bean in a wet cotton ball counts completely. Let your child water it with a real can and watch for the first sprout: the grid\u2019s sun, water and seedling, alive on a windowsill.',
 check:'Ask: "Who arranges flowers for a living? Name two things plants need to grow. How many flowers?" The florist, two needs, the count = the sheet landed.',
 real:'Buy or pick three stems this week and let your child arrange, water and display them — then deliver one flower to a neighbor. Flowers are kindness with stems; the sheet just says it in pencil.'},
{slug:'lifeguard',file:'lifeguard.webp',w:1545,h:2000,title:'Lifeguard',word:'LIFEGUARD',trace:'LIFEGUARD',
 tag:'Trace LIFEGUARD, match the lifeguard to the whistle, the rescue float and the pool, circle the safe swimming rules, count the beach balls and draw yourself being safe near water.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word LIFEGUARD, match the lifeguard to the whistle, rescue float and pool, circle the safe swimming rules, count the beach balls and draw yourself being water-safe — on screen or on paper.',
 learn:'What a lifeguard watches for at the pool, the safe swimming rules on the sheet — and the two unsafe ones to catch — plus how to write the word LIFEGUARD.',
 know:'A lifeguard sits high where the whole pool is in view, with a whistle for warnings and a rescue float for saving. The safe rules on this sheet: swim with a grown-up and walk on the pool deck. The tricky two? Running near the pool and diving in the shallow end — the red cross and green check marks have opinions about all four!',
 why:'Water is the most serious safety topic in this whole collection, and four-year-olds are exactly the right age to start the rules. The check-and-cross marks let your child judge each rule out loud — sorting safe from unsafe is the core skill of every pool summer to come.',
 skills:['Community helper vocabulary','Pool-safety rules','Safe-versus-unsafe sorting','Tool matching','Word tracing','Safety drawing'],
 steps:[
  ['Trace','Trace the dotted word LIFEGUARD letter by letter — nine letters for the watcher of the water.'],
  ['Match','Draw a line from the lifeguard to the whistle, the rescue float and the pool.'],
  ['Circle','Four labeled rules sit in the grid, some with a green check and some with a red cross — circle every SAFE rule. Two are safe and two are not!'],
  ['Count','Count the beach balls, then write the number in the box.'],
  ['Draw','Draw yourself being safe near water in the big box — swimming beside a grown-up, or walking feet on the wet deck.']],
 say:'"This is a lifeguard — the helper who watches over everyone in the water. Trace the name, then connect the whistle, the rescue float and the pool. Now the four rules: which are safe? The green checks and red crosses have opinions! Count the beach balls, and then draw YOU being safe near water."',
 look:'Find the rescue float and ask who it is for — a tired swimmer, held out long before any trouble. In the grid, read each rule aloud and ask your child to judge it before peeking at the marks: is running safe on a wet, slippery deck? In the draw box, walking feet matter most.',
 ask:'"What does the lifeguard\u2019s whistle mean?" "Which two rules are safe, and what makes them safe?" "Why do we walk near the pool?" "Who is YOUR grown-up in the water, every single time?"',
 hint:'Two rules keep swimmers safe and two are sneaky — the fast ones. Ask of each rule: would the lifeguard\u2019s whistle blow at this? The green check means safe and the red cross means never; listen to both.',
 tips:'The non-negotiables, said warmly and often: never swim without a grown-up, walk on the deck, and ask before going near ANY water — pools, buckets, ponds. Practise the walking feet on a real deck edge this summer; legs remember what pencils rehearse.',
 check:'Ask: "Who watches the pool? Name one safe rule and one unsafe rule you caught. What does the red cross mean?" The lifeguard, the rules, no-never = the sheet landed.',
 real:'At the next pool or bath, rehearse the sheet: grown-up first, walking feet, ask permission. Give your child the job of spotting the real lifeguard at every pool you visit — the watcher of the water, found in real life.'},
{slug:'musician',file:'musician.webp',w:1545,h:2000,title:'Musician',word:'MUSICIAN',trace:'MUSICIAN',
 tag:'Trace MUSICIAN, match the musician to the guitar, the drum and the music stand, circle the musical instruments, count the instruments and draw an instrument you would like to play.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word MUSICIAN, match the musician to the guitar, drum and music stand, circle the instruments, count them and draw one you would like to play — on screen or on paper.',
 learn:'What a musician plays and practices, which objects make music and which just hold or help it, and how to write the word MUSICIAN.',
 know:'A musician makes music with instruments: the guitar has strings to strum, the drum has a skin to tap, and the music stand holds the notes. Trumpets toot, violins sing, xylophones clink and tambourines shake — but a book is quiet, and the microphone? It makes LOUD what was already music!',
 why:'Distinguishing instruments from look-alikes trains careful eyes and careful listening — the same discrimination that later sorts letters like b and d. The draw box asks your child to imagine themselves playing, which is exactly how instrument dreams begin.',
 skills:['Music vocabulary','Instrument sorting','Tool matching','Listening skills','Word tracing','Instrument drawing'],
 steps:[
  ['Trace','Trace the dotted word MUSICIAN letter by letter — eight letters, keeping the beat as you go.'],
  ['Match','Draw a line from the musician to the guitar, the drum and the music stand.'],
  ['Circle','Six pictures sit in the grid — circle every one that makes music. One tile is very quiet — and one only makes music LOUDER!'],
  ['Count','Count the instruments in the count row, then write the number in the box.'],
  ['Draw','Draw an instrument you would like to play in the big box — and draw the sound coming out of it!']],
 say:'"This is a musician — the maker of songs and sounds. Trace the name, then connect the guitar, the drum and the music stand. Now the six pictures: which ones MAKE music? One is quiet as a nap and one just turns the volume up! Count the instruments, and then draw one YOU would love to play."',
 look:'Find the strings on the guitar and ask how the drum makes its sound. In the grid, ask of each tile: does this make music, hold music, or help music grow louder? The microphone is the great debate — perfect for a family opinion. In the count row, tap each instrument like a drumbeat as you count.',
 ask:'"Which would you strum, tap or shake?" "Why does the book belong to the reader, not the band?" "What does the microphone do to a voice?" "What sound does YOUR dream instrument make?"',
 hint:'Make each tile a listening game: hum its sound out loud. The tile you cannot hum at all is the quiet visitor — and the microphone only hums if YOU hum first!',
 tips:'Real instrument play beats any grid: a pot-and-wooden-spoon drum kit is a full concert. If music lessons are on the horizon, this sheet is the warm-up — name the instrument, hold the air-guitar, and let the want grow on its own.',
 check:'Ask: "Who plays music for a living? Name two instruments from the grid. What does the microphone really do?" The musician, two instruments, makes-it-louder = the sheet landed.',
 real:'Have a kitchen-band concert tonight: one pot drummer, one shaker in a bottle, one singer with a pretend microphone — the grid, brought to life at full volume. Curtain call at bedtime.'},
{slug:'park-ranger',file:'park-ranger.webp',w:1545,h:2000,title:'Park Ranger',word:'PARK RANGER',trace:'PARK RANGER',
 tag:'Trace PARK RANGER, match the ranger to the backpack, the map and the trail sign, circle the ways to care for nature, count the trees and draw a safe nature trail.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the words PARK RANGER, match the ranger to the backpack, map and trail sign, circle the caring ways, count the trees and draw a safe nature trail — on screen or on paper.',
 learn:'What a park ranger does in the park, four real ways to care for nature, and why trails, water and wild plants deserve gentle hands — plus how to write the words PARK RANGER.',
 know:'A park ranger takes care of the park and everyone in it: the backpack holds the ranger\u2019s tools, the map shows every trail, and the trail sign tells walkers where to go. The caring ways on the sheet — litter up, water saved, plants left growing, feet on the trail — are ALL right, and every one is a job your child can do.',
 why:'Nature care is citizenship in small shoes: every rule on this grid is one a four-year-old can actually keep. The all-correct grid builds pride instead of worry — your child is the helper nature has been waiting for.',
 skills:['Nature vocabulary','Tool matching','Earth-care habits','Word tracing','Counting practice','Trail drawing'],
 steps:[
  ['Trace','Trace the dotted words PARK RANGER — two words, one for every boot on the trail.'],
  ['Match','Draw a line from the ranger to the backpack, the map and the trail sign.'],
  ['Circle','Four labeled ways to care for nature sit in the grid — circle every single one, because all four are exactly right!'],
  ['Count','Count the trees, then write the number in the box.'],
  ['Draw','Draw a safe nature trail in the big box — the path, the trees beside it, and you walking right down the middle.']],
 say:'"This is a park ranger — the helper who takes care of the whole park. Trace the two words, then connect the backpack, the map and the trail sign. Now the four pictures: every single one is a way to care for nature! Circle them all. Count the trees, and then draw YOUR trail — where does it lead?"',
 look:'Find the trail sign and ask what it tells walkers. In the grid, read each caring way aloud and ask your child to show it: hands picking litter, feet staying on the trail. In the count row, the trees can be tall or short — all of them count.',
 ask:'"What does the park ranger protect?" "Which caring ways will YOU do on our next walk?" "Why do we stay on the trail?" "What does the map help the ranger find?"',
 hint:'This grid is the kind sort — every labeled way is a true nature-care way, so circle with pride. The real work starts after the sheet: which one will you actually do first — litter, water, plants, or trail feet?',
 tips:'Adopt one ranger rule per walk this month: trash out, feet on the trail, plants left for the bees. A small backpack your child carries — with a pocket for collecting litter — turns the whole sheet into a uniform.',
 check:'Ask: "Who takes care of the park? Name two ways to care for nature. Why do feet stay on the trail?" The ranger, two ways, safe feet = the sheet landed.',
 real:'Walk a real trail this week as junior rangers: pack the backpack, read the trail sign, stay on the path and carry out one piece of litter each. The park gets cleaner; the habit gets permanent.'},
{slug:'photographer',file:'photographer.webp',w:1545,h:2000,title:'Photographer',word:'PHOTOGRAPHER',trace:'PHOTOGRAPHER',
 tag:'Trace PHOTOGRAPHER, match the photographer to the camera, the lens and the photo, circle the things a photographer uses, count the cameras and draw a picture you would like to photograph.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word PHOTOGRAPHER, match the photographer to the camera, lens and photo, circle the photographer\u2019s tools, count the cameras and draw a picture to take — on screen or on paper.',
 learn:'What a photographer does behind the camera, which tools take, steady and store pictures, and which grid tiles sneak in from other jobs — plus how to write the word PHOTOGRAPHER.',
 know:'A photographer captures moments: the camera takes the picture, the lens decides how close it looks, and the photo is the memory you can keep. Tripods hold the camera still, bags carry the gear, and even a phone can be a camera. Two tiles in the grid belong to other jobs entirely — the artist\u2019s paintbrush and the ball game!',
 why:'Photographers freeze time, and children love that power. The nine-tile grid is the set\u2019s biggest sorting challenge — perfect for a child ready to think job by job — and the photograph-draw box turns the sheet into a shot list for a real walk with a real camera.',
 skills:['Photography vocabulary','Tool matching','Job-by-job sorting','Word tracing','Counting practice','Shot-list drawing'],
 steps:[
  ['Trace','Trace the dotted word PHOTOGRAPHER letter by letter — a long, long word with twelve letters. Slow and steady, like a tripod.'],
  ['Match','Draw a line from the photographer to the camera, the lens and the photo.'],
  ['Circle','Nine pictures sit in the grid — circle every one a photographer uses. Most of them do, but two belong to other jobs entirely!'],
  ['Count','Count the cameras, then write the number in the box.'],
  ['Draw','Draw a picture you would like to photograph in the big box — a pet, a person, a place, or a moment that never sits still.']],
 say:'"This is a photographer — the helper who catches moments and keeps them forever. Trace the long name, then connect the camera, the lens and the photo. Now the big grid of nine: which things help take or keep a picture? Two belong to other jobs! Count the cameras, and then draw the photo YOU would take."',
 look:'Find the lens and ask what it does — it decides how close and how wide. In the grid, go tile by tile: camera, tripod, laptop, bag, notepad, binoculars, phone — and then the two odd guests. Ask of each: take, keep, steady — or some other job? In the count row, cameras hide behind cameras; count every lens.',
 ask:'"What does the tripod hold up?" "Which two grid tiles belong to other jobs — and whose jobs are they?" "Could a phone be a camera too?" "What moment would YOU freeze forever?"',
 hint:'Go tile by tile with the photographer\u2019s question: does this help take a picture, keep a picture, or hold the camera still? Then hunt for the two tiles that paint or bounce instead — they wandered in from an artist\u2019s table and a ball game.',
 tips:'Hand over a real camera — an old phone is perfect — and give the drawn shot list a test walk: one picture of a pet, one of a person, one of something tiny. Ask your child to pick ONE favorite and say why; that is a photographer\u2019s eye, born.',
 check:'Ask: "Who takes pictures for a living? Name two photographer tools from the grid. Which tiles belong to other jobs?" The photographer, two tools, the two odd ones = the sheet landed.',
 real:'On your next walk, let your child be the family photographer with ten pictures of anything. Print or display one photo and let them caption it — a real photo, a real title, a real gallery debut.'},
{slug:'sanitation-worker',file:'sanitation-worker.webp',w:1545,h:2000,title:'Sanitation Worker',word:'SANITATION WORKER',trace:'SANITATION WORKER',
 tag:'Trace SANITATION WORKER, match the worker to the garbage truck, the recycling bin and the safety gloves, circle the items that can be recycled, count the recycling bins and draw one way to keep your neighborhood clean.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the words SANITATION WORKER, match the worker to the garbage truck, recycling bin and gloves, circle the recyclables, count the bins and draw a clean-neighborhood idea — on screen or on paper.',
 learn:'What sanitation workers do for the whole town, which items go in the recycling bin, and where the rest belongs — compost, trash or the bin — plus how to write the words SANITATION WORKER.',
 know:'Sanitation workers keep the town clean and healthy: the garbage truck empties the trash, the recycling bin waits for bottles, cans, jars and cardboard, and the safety gloves protect strong hands. Here is the sorting secret — a banana peel is not trash to a garden: it composts into food for new plants!',
 why:'This sheet explains the people behind the early-morning rumble — helpers children hear every week but rarely meet. The recycle-or-not grid builds real sorting skills your own kitchen bin can use tonight, and the safety rule is worth its weight: never chase or hide near a working truck.',
 skills:['Community helper vocabulary','Recycling awareness','Sorting practice','Word tracing','Counting practice','Neighborhood drawing'],
 steps:[
  ['Trace','Trace the dotted words SANITATION WORKER — two long words for the people who keep the town clean.'],
  ['Match','Draw a line from the sanitation worker to the garbage truck, the recycling bin and the safety gloves.'],
  ['Circle','Six items sit in the grid — circle every one that can be recycled. Four really can; the last two go somewhere else — one to the compost, one to the trash!'],
  ['Count','Count the recycling bins, then write the number in the box.'],
  ['Draw','Draw one way to keep your neighborhood clean in the big box — bins in a row, a litter pickup, or your family sorting the recycling.']],
 say:'"This is a sanitation worker — the helper who keeps our whole town clean and healthy. Trace the two words, then connect the garbage truck, the recycling bin and the gloves. Now the six items: which ones can be recycled? One is a snack\u2019s coat and one is a snack itself! Count the bins, and then draw how WE keep our streets clean."',
 look:'Find the gloves and ask what they protect the hands from. In the grid, sort out loud: bottle, box, can, jar — yes to the recycling bin; the crinkly bag and the peel take other roads. The peel is the happy one: it becomes compost, food for the garden. In the count row, count the bins curb to curb.',
 ask:'"What does the garbage truck do on our street?" "Which four things go in the recycling bin?" "Where does the banana peel go instead — and what does it become?" "What do the safety gloves do?"',
 hint:'Two items in the grid are not for the recycling bin — one is shiny and crinkly, and one used to be fruit. Ask of each: recycle bin, compost pile, or trash can? The garden would love one of them.',
 tips:'Trucks and bins are work zones: keep little watchers well back on collection day — never behind a reversing truck, never inside a bin. Then sort tonight\u2019s recycling together and let your child be the checker: bottle, box, can, jar — the sheet, done for real.',
 check:'Ask: "Who keeps our town clean? Name two things that can be recycled. Where does the banana peel go?" The worker, two recyclables, the compost = the sheet landed.',
 real:'Start a small compost jar or corner this week for peels and apple cores — let your child feed it daily and watch it change. The grid\u2019s trickiest tile becomes a living science experiment on the windowsill.'},
{slug:'school-counselor',file:'school-counselor.webp',w:1545,h:2000,title:'School Counselor',word:'COUNSELOR',trace:'COUNSELOR',
 tag:'Trace COUNSELOR, match the counselor to the school, the speech bubble and the helping hand, circle the kind ways to help a friend, count the conversation cards and draw someone you can talk to.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word COUNSELOR, match the counselor to the school, speech bubble and helping hand, circle the kind ways to help a friend, count the cards and draw a helper — on screen or on paper.',
 learn:'Who the school counselor is and how they help, four kind ways to help a friend — and the two unkind ones to catch — plus how to write the word COUNSELOR.',
 know:'A school counselor is a feelings helper: the speech bubble means listening and talking, the helping hand means steady support, and their door is open when a day feels too big. Kind friends listen, help, share and are kind — laughing AT someone and ignoring someone are the two tricks to catch.',
 why:'This is the heart sheet of the set: every tile is either a kindness or a trap, and four-year-olds are at exactly the age when friendship habits set. Sorting kind from unkind gives your child the words for the playground, and the draw box names a real person to talk to — a safety net drawn in crayon.',
 skills:['Feelings vocabulary','Kind-versus-unkind sorting','Helper awareness','Word tracing','Counting practice','Trusted-adult drawing'],
 steps:[
  ['Trace','Trace the dotted word COUNSELOR letter by letter — nine letters for the feelings helper.'],
  ['Match','Draw a line from the counselor to the school, the speech bubble and the helping hand.'],
  ['Circle','Six labeled ways to treat a friend sit in the grid — circle every KIND one. Four are kind and two are sneaky-tricky!'],
  ['Count','Count the conversation cards, then write the number in the box.'],
  ['Draw','Draw someone you can talk to when you need help in the big box — a parent, a teacher, the counselor, anyone safe.']],
 say:'"This is a school counselor — a helper for feelings and friendships. Trace the name, then connect the school, the speech bubble and the helping hand. Now the six ways to treat a friend: which ones are kind? Two are tricks! Count the conversation cards, and then draw YOUR person to talk to when a day feels big."',
 look:'Find the speech bubble and ask what it is full of — words worth listening to. In the grid, read each way aloud and ask your child to make a kind face or a no-thank-you face at each one. Laughing AT someone and ignoring someone get the biggest no faces of all.',
 ask:'"What does the school counselor do all day?" "Which four ways are kind to a friend?" "What could you say if a friend feels sad?" "Who is YOUR talk-to person — and what would you tell them?"',
 hint:'Kind ways make friends feel bigger; the tricky ones make friends feel small. Ask of each tile: would I like it if someone did this to ME? That one question sorts the whole grid.',
 tips:'Teach the golden test as a daily habit — would I like that done to me? — and let your child hear you use it too. The draw box matters most here: name the real people your child can always talk to, at school and at home, and say it out loud together.',
 check:'Ask: "Who is the feelings helper at school? Name two kind ways to treat a friend. Which two ways are not kind?" The counselor, two kindnesses, the two tricks = the sheet landed.',
 real:'Practise one circled kindness today — listen to a sibling\u2019s whole story, share a snack, help set the table. Then ask your child to name their talk-to people while pointing at the drawing. Safety nets work best when they are spoken out loud.'},
{slug:'scientist',file:'scientist.webp',w:1545,h:2000,title:'Scientist',word:'SCIENTIST',trace:'SCIENTIST',
 tag:'Trace SCIENTIST, match the scientist to the microscope, the beaker and the safety goggles, circle the things used in a science lab, count the test tubes and draw something you would like to discover.',
 meta:'A free community-helpers worksheet for ages 4–5: trace the word SCIENTIST, match the scientist to the microscope, beaker and safety goggles, circle the lab things, count the test tubes and draw something to discover — on screen or on paper.',
 learn:'What a scientist does in the lab, which tools hold, magnify and protect, and which grid tiles belong to the kitchen, the library and the craft box — plus how to write the word SCIENTIST.',
 know:'A scientist asks questions and tests them: the microscope makes tiny things huge, the beaker holds liquids for mixing, and the safety goggles protect curious eyes. Test tubes, flasks and magnifying glasses live in the lab — apples live in kitchens, books in libraries, scissors in craft boxes!',
 why:'The lab is where curiosity becomes a job, and this sheet hands your child the tools to imagine it. Tile-by-tile sorting builds the careful looking real science runs on, and the discover-draw box ends the whole collection with the biggest question of all: what will YOU find out?',
 skills:['Science vocabulary','Tool matching','Lab sorting','Word tracing','Counting practice','Discovery drawing'],
 steps:[
  ['Trace','Trace the dotted word SCIENTIST letter by letter — nine letters for the asker of big questions.'],
  ['Match','Draw a line from the scientist to the microscope, the beaker and the safety goggles.'],
  ['Circle','Six pictures sit in the grid — circle every one a scientist really uses in the lab. Talk about each: some belong to the kitchen, the library or the craft box!'],
  ['Count','Count the test tubes in the rack, then write the number in the box.'],
  ['Draw','Draw something you would like to discover in the big box — a bug, a star, a dinosaur bone, or something no one has found yet.']],
 say:'"This is a scientist — the helper who asks questions and finds answers. Trace the name, then connect the microscope, the beaker and the safety goggles. Now the six pictures: which ones really work in a lab? Let\u2019s talk about each one. Count the test tubes in the rack, and then draw something YOU would love to discover."',
 look:'Find the goggles and ask what they protect — a scientist\u2019s eyes come first! In the grid, go tile by tile and ask where each thing really lives: the lab, the kitchen, the library or the craft drawer. In the count row, test tubes stand in a rack like crayons in a box — count left to right, one touch each.',
 ask:'"What does the microscope make bigger?" "Why does a scientist wear goggles?" "Which grid tiles belong to other rooms — and which rooms?" "What would YOU love to discover one day?"',
 hint:'Take each tile to its home: the lab, the fruit bowl, the bookshelf or the craft table — ask of each: would this sit on a lab bench, or somewhere else altogether? The goggles-and-gloves scientist only uses what belongs in the lab.',
 tips:'Labs have one big rule worth borrowing at home: real experiments happen WITH a grown-up and safety first. Do a kitchen-lab session — baking soda, vinegar, goggles from the dress-up box — and let your child narrate like the scientist they drew.',
 check:'Ask: "Who asks questions for a living? Name two lab tools from the grid. What do the goggles protect?" The scientist, two tools, the eyes = the sheet landed.',
 real:'Do one tiny experiment this week — sink or float, baking-soda fizz, a magnifying glass over a leaf. Ask first, guess second, watch third: that order IS science, and your child just did it.'},
];

/* ---------- neighbours in upload order, wrapping at the ends ---------- */
export const chWsBySlug=Object.fromEntries(communityWs.map(w=>[w.slug,w]));
export function chWsNeighbours(w){
 const i=communityWs.indexOf(w);
 return {prev:communityWs[(i-1+communityWs.length)%communityWs.length],next:communityWs[(i+1)%communityWs.length]};
}
const stepCards=[['1','Trace it','Big dotted words to trace in your favorite color.'],['2','Match them','Draw lines from the helper to their tools.'],['3','Circle them','Look closely, then circle every one that fits.'],['4','Count it','Count with one touch per picture, then write the number.'],['5','Draw it','The last box is all yours — draw!']];

/* ---------- the Learning Path ACTIVITY page (canvas LEFT, guidance RIGHT) --- */
export function communityWsActivityBody(w,site){
 const {prev,next}=chWsNeighbours(w);
 const enc=encodeURIComponent;
 const pageUrl=site+CH_WS_CLASS+w.slug+'/';
 const shareTitle=`${w.title} — a free Community Helpers worksheet activity for ages 4–5 from Kiddo.school`;
 const stepsHtml=w.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${i+1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
 const pn=`<nav class="fc2-pn" aria-label="Previous and next worksheet activity"><a class="fc2-pn-btn" href="${CH_WS_CLASS}${prev.slug}/" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.title)}</strong><span>Previous activity</span></a><a class="fc2-pn-btn fc2-pn-next" href="${CH_WS_CLASS}${next.slug}/" rel="next"><strong>${esc(next.title)}</strong> <span aria-hidden="true">→</span><span>Next activity</span></a></nav>`;
 return `${crumbNav([['Learning Path','/learning-path/'],['Community Helpers & Our Neighborhood',CH_CLASS_PATH],[esc(w.title)+' worksheet']])}
 <div class="page-heading wrap"><span class="eyebrow">COMMUNITY HELPERS WORKSHEET ACTIVITY · CLASS 33 · AGES 4–5</span><h1>${esc(w.title)} — solve it right on the sheet.</h1><p>${esc(w.tag)}</p></div>
 <div class="fc2-dual wrap ls-dual">
  <div class="fc2-main">
   <section class="wc-section" aria-label="The worksheet — draw right on it" id="the-activity">
    <div class="wc-head"><span class="eyebrow">THE WORKSHEET — WRITE AND DRAW RIGHT ON IT</span><h2>Your sheet is ready.</h2><p class="lesson-copy">Pick a color or the eraser, then trace, match, circle, count and draw straight on the sheet with your finger, a stylus or the mouse. Press Save my work when you are proud — that is what marks this activity cleared for your child.</p></div>
    <div class="wc-mount" data-chws-activity="${w.slug}" data-wc data-wc-src="${esc(CH_WS_BASE+w.file)}?draw=1" data-wc-name="${esc(w.title)} community helpers worksheet" data-wc-w="${w.w}" data-wc-h="${w.h}" data-wc-toolbar="#chws-tools" data-wc-restore="community-helpers/${w.slug}">
     <figure class="fc2-hero ws-hero-art ls-sheet"><img src="${esc(CH_WS_BASE+w.file)}?draw=1" width="${w.w}" height="${w.h}" alt="The full ${esc(w.title)} community-helpers worksheet: ${esc(w.tag)}" fetchpriority="high" crossorigin="anonymous"></figure>
    </div>
    <noscript><p class="fc-hint">Solving on the sheet needs JavaScript. The printable twin at <a href="${CH_WS_LIB}${w.slug}/">${CH_WS_LIB.slice(0,-1)+w.slug+'/'} /</a> always works.</p></noscript>
   </section>
   ${pn}
  </div>
  <aside class="fc2-rail" aria-label="Instructions, drawing tools and saved progress">
   <section class="fc2-block fc2-first-block"><span class="eyebrow">HOW TO DO IT</span><h2>Five little steps.</h2><ol class="fc-steps">${stepsHtml}</ol><p class="fc-hint">Ask a grown-up to read the steps aloud the first time. After that, you know just what to do.</p></section>
   <section class="fc2-block" id="chws-tools" aria-label="Drawing tools"><span class="eyebrow">YOUR PENCIL CASE</span><h2>Pick your tools.</h2><p class="fc-hint">Pencil, nine crayons, an eraser, undo, redo and clear — the tools appear right here and work on the sheet. Save keeps your finished work as a picture, and your saved work comes back next time.</p></section>
   <section class="fc2-block" data-chws-progress-block><span class="eyebrow">MY PROGRESS</span><h2>Save it to keep it.</h2><p class="ls-progress-line" data-chws-progress aria-live="polite">This activity is cleared for you the moment you save your finished sheet. Nothing counts until then — opening the page is just opening the door.</p><p class="ls-progress-done" data-chws-done hidden><strong>Cleared!</strong> Your saved work for this sheet is in your downloads, and the ribbon is on in <a href="${CH_CLASS_PATH}">Class 33</a>.</p></section>
   <section class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS ACTIVITY</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this activity on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}" target="_blank" rel="noopener" aria-label="Share this activity on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+pageUrl)}" target="_blank" rel="noopener" aria-label="Share this activity on WhatsApp">WhatsApp</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div></section>
   <section class="fc2-block"><span class="eyebrow">PREFER PAPER?</span><h2>Print the twin.</h2><p class="fc-hint">The same sheet lives in the worksheet library with its download and print buttons: <a href="${CH_WS_LIB}${w.slug}/">/worksheets/community-helpers-and-our-neighborhood/${w.slug}/</a>. Crayons beat styluses sometimes.</p></section>
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
  <p class="lesson-copy">This activity belongs to <a href="${CH_CLASS_PATH}">Class 33 — Community Helpers &amp; Our Neighborhood</a> on the Learning Path. Progress is saved on this device for the child chosen in <a href="/my-classroom/">My Classroom</a> — and only a real save of finished work marks it cleared, never just opening the page.</p>
 </section>
 ${fcCommunityMount(CH_WS_CLASS+w.slug+'/')}`;
}

/* ---------- the PRINTABLE library page (NO canvas) ---------- */
export function communityWsPrintableBody(w,site){
 const {prev,next}=chWsNeighbours(w);
 const enc=encodeURIComponent;
 const file=CH_WS_BASE+w.file;
 const pageUrl=site+CH_WS_LIB+w.slug+'/';
 const shareTitle=`${w.title} Worksheet for Ages 4–5 — free printable from Kiddo.school`;
 const dlName=`community-helpers-${w.slug}.webp`;
 const stepsHtml=w.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${i+1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
 const pn=`<nav class="fc2-pn" aria-label="Previous and next worksheet"><a class="fc2-pn-btn" href="${CH_WS_LIB}${prev.slug}/" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.title)}</strong><span>Previous worksheet</span></a><a class="fc2-pn-btn fc2-pn-next" href="${CH_WS_LIB}${next.slug}/" rel="next"><strong>${esc(next.title)}</strong> <span aria-hidden="true">→</span><span>Next worksheet</span></a></nav>`;
 const share=`<div class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS WORKSHEET</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this worksheet on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}" target="_blank" rel="noopener" aria-label="Share this worksheet on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+pageUrl)}" target="_blank" rel="noopener" aria-label="Share this worksheet on WhatsApp">WhatsApp</a><a class="fc2-share-btn" href="https://pinterest.com/pin/create/button/?url=${enc(pageUrl)}&media=${enc(file)}&description=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Save this worksheet on Pinterest">Pinterest</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div><p class="fc-hint">Share buttons open in a new tab. The copy button copies this page&rsquo;s address — nothing is tracked.</p></div>`;
 return `${crumbNav([['Worksheets','/worksheets/'],['Community Helpers & Our Neighborhood',CH_WS_LIB],[w.title]])}
 <div class="page-heading wrap"><span class="eyebrow">WORKSHEET · CLASS 33 · AGES 4–5</span><h1>${esc(w.title)} Worksheet for Ages 4–5</h1><p>${esc(w.meta)}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main">
   <section class="wc-section" aria-label="This worksheet" id="the-worksheet">
    <div class="wc-head"><span class="eyebrow">THE WORKSHEET</span><h2>The full sheet, exactly as the artist drew it.</h2><p class="lesson-copy">See the whole sheet, download the original file or print it from your browser. Want your child to solve it on screen first? The interactive version lives at <a href="${CH_WS_CLASS}${w.slug}/">${CH_WS_CLASS.slice(1)+w.slug+'/'} /</a> — same sheet, drawing layer included.</p></div>
    <figure class="fc2-hero ws-hero-art"><img src="${esc(file)}" width="${w.w}" height="${w.h}" alt="The full ${esc(w.title)} community-helpers worksheet: ${esc(w.tag)}" fetchpriority="high"></figure>
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
    <div class="fc2-actions"><button type="button" class="button ws-dl" data-chws-download="${esc(file)}" data-chws-filename="${dlName}">Download original sheet <span aria-hidden="true">↓</span></button><button type="button" class="button button-ghost ws-print" data-chws-print>Print this sheet <span aria-hidden="true">⌘</span></button></div>
    <p class="fc-hint">The download keeps the original WebP picture, full size (1545×2000, A4 portrait). Print opens your browser&rsquo;s print dialog with just the sheet — no sign-up, nothing stored.</p>
   </section>
   ${share}
   ${fcCommunityMount(CH_WS_LIB+w.slug+'/')}
   <section class="fc2-block"><span class="eyebrow">PREFER ON SCREEN?</span><h2>Solve it here.</h2><p class="fc-hint">The on-screen version of this sheet — drawing layer, five steps, save-your-work and all — lives at <a href="${CH_WS_CLASS}${w.slug}/">${CH_WS_CLASS.slice(1)+w.slug+'/'} /</a>.</p></section>
   <section class="fc2-block"><span class="eyebrow">WHERE THIS FITS</span><h2>The class behind it.</h2><p class="lesson-copy">This worksheet belongs to <a href="${CH_CLASS_PATH}">Class 33 — Community Helpers &amp; Our Neighborhood</a> on the Learning Path, and the whole collection lives at <a href="${CH_WS_LIB}">/worksheets/community-helpers-and-our-neighborhood/</a>. One finished sheet is a full session — print it, solve it together, and let the fridge door be the gallery.</p></section>
  </aside>
 </div>
 <section class="wrap fc-section" aria-label="More community helpers worksheets"><span class="eyebrow">MORE COMMUNITY HELPERS SHEETS</span><h2>More sheets like this one.</h2>
  <div class="ws-grid">${communityWs.filter(x=>x.slug!==w.slug).map(x=>`<a class="ws-card" href="${CH_WS_LIB}${x.slug}/"><span class="ws-card-art"><img src="${esc(CH_WS_BASE+x.file)}" width="707" height="1000" alt="${esc(x.meta)}" loading="lazy"></span><span class="ws-card-body"><strong>${esc(x.title)} Worksheet</strong><span class="ws-card-meta"><span>Ages 4–5</span><span>Class 33</span></span><span class="ws-card-desc">${esc(x.tag)}</span></span><span class="ws-card-open">View Worksheet <span aria-hidden="true">→</span></span></a>`).join('')}</div>
 </section>`;
}

/* ---------- the /worksheets/ collection page ---------- */
export function communityWsCategoryBody(){
 const cards=communityWs.map(w=>`<a class="ws-card" href="${CH_WS_LIB}${w.slug}/">
  <span class="ws-card-art"><img src="${esc(CH_WS_BASE+w.file)}" width="707" height="1000" alt="${esc(w.meta)}" loading="lazy"></span>
  <span class="ws-card-body"><strong>${esc(w.title)} Worksheet</strong><span class="ws-card-meta"><span>Ages 4–5</span><span>Class 33</span><span>Community Helpers</span></span><span class="ws-card-desc">${esc(w.tag)}</span></span>
  <span class="ws-card-open">View Worksheet <span aria-hidden="true">→</span></span>
 </a>`).join('');
 return `${crumbNav([['Worksheets','/worksheets/'],['Community Helpers & Our Neighborhood']])}
 <div class="page-heading wrap"><span class="eyebrow">COMMUNITY HELPERS WORKSHEETS · AGES 4–5</span><h1>Community Helpers &amp; Our Neighborhood worksheets — free printables for little hands.</h1><p>Thirty-five genuine activity sheets about the people who help us: trace their names, match their tools, circle the right things, count, and draw. Download the original sheet, print it, or solve every sheet on screen in <a href="${CH_CLASS_PATH}">Class 33</a> first.</p></div>
 <section class="wrap section compact" aria-label="The Community Helpers worksheet collection">
  <figure class="fc2-hero ws-hero-art" style="max-width:640px;margin:0 auto 1.5rem"><img src="${esc(CH_WS_BASE+CH_WS_COVER.file)}" width="${CH_WS_COVER.w}" height="${CH_WS_COVER.h}" alt="${esc(CH_WS_COVER.alt)}" fetchpriority="high"></figure>
  <div class="ws-grid">${cards}</div>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>Where these come from.</h2>
  <div class="fc-stages">
   <a class="fc-stage lesson-card-link" href="${CH_CLASS_PATH}"><div class="fc-stage-pills"><span class="fc-age">Ages 4–5</span><span class="fc-class">Class 33</span></div><h3>Community Helpers &amp; Our Neighborhood</h3><p>The class behind these worksheets — 29 step-by-step helper lessons and every sheet solvable on screen with the drawing layer.</p><span class="fc-open">Open Class 33 <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/flashcards/community-helpers-and-our-neighborhood/"><div class="fc-stage-pills"><span class="fc-age">Ages 4–5</span><span class="fc-class">Library</span></div><h3>The Community Helpers Flashcards</h3><p>The matching card collection — what each helper does, why it helps a preschooler, and a printable card for the fridge.</p><span class="fc-open">Open the flashcards <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/worksheets/"><div class="fc-stage-pills"><span class="fc-age">All ages</span><span class="fc-class">Library</span></div><h3>The Worksheet Library</h3><p>All the school&rsquo;s printable subjects, each with its own page, download and print buttons.</p><span class="fc-open">Browse all worksheets <span aria-hidden="true">↗</span></span></a>
  </div>
 </section>`;
}

/* ---------- schema ---------- */
export function communityWsSchema(site,w){
 return {'@context':'https://schema.org','@type':'LearningResource',
  name:`${w.title} Worksheet for Ages 4–5`,
  description:w.meta,url:site+CH_WS_LIB+w.slug+'/',inLanguage:'en',
  learningResourceType:'Worksheet',educationalLevel:'Preschool',teaches:w.skills.join(', '),
  isAccessibleForFree:true,ageRange:'4-5',encodingFormat:'image/webp',contentUrl:CH_WS_BASE+w.file,image:CH_WS_BASE+w.file,
  about:{'@type':'Thing',name:'Community Helpers & Our Neighborhood'},
  provider:{'@type':'Organization',name:'Kiddo.school',url:site+'/'},
  isPartOf:{'@type':'CreativeWorkSeries',name:'Community Helpers & Our Neighborhood (Class 33)',url:site+CH_CLASS_PATH}};
}
