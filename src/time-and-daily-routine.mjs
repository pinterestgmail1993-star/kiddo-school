/* Time & Daily Routine — CLASS 41 · the owner's 41 time-and-routine cards
   (R2 bucket kiddo-school-assets/school/learning-path/time-and-daily-routine/
   flashcards/, probed LIVE 2026-10-31: 42/42 HTTP 200 image/webp — 41 cards +
   the cover, every file 800×1132, 36–61 kB). The owner's brief (2026-10-31):
   add Class 41 to the Learning Path as the next number after Class 40; "keep
   the file names exactly as they are, because they are SEO names for Google
   Image search"; the class page uses the cover file as its main image.
   OWNER CORRECTION (2026-10-31, the same day): "dont make indiviual pages,
   they are thin to google — include all in one page with download, print
   button, age, skill if any, level pill, subject pill, make sections, small
   description all beneath the images." So the 41 per-card short pages are
   GONE (301s point them here): the class page IS the deck — five sections,
   every card with its image, age/subject/level/skill pills, a small
   kid-directed description under the picture, and Download + Print buttons.
   Level pills use school grades (owner: "levels are grade 1, grade 2,
   preschool"): Preschool · Grade 1 · Grade 2. Copy uses what USA parents
   search and talks to kids directly; the owner's word-ban ("no sign up",
   "no paywall", "free to use", "no account", "free forever") is a lock.
   Cross-links: Class 32, Class 34, the Sequence Stories extra class and the
   First Glance Daily Routine and Times of Day sheets — each links here and
   the class links back. The deck ALSO joins the flashcards library as the
   parents' shelf (the Class 39/40 precedent):
   /flashcards/time-and-daily-routine/, one page carrying the whole deck
   with Download + Print under every image, four pills (age, subject, level,
   skill) and parent-facing tips. TONE SPLIT (owner rule): the class talks
   to the child; the shelf talks to the parent. */
import {R2} from './adventure-kit.mjs';
import {fcCommunityMount} from './flashcards/community.mjs';

export const TR_PATH='/time-and-daily-routine/';
export const TR_BASE=R2+'school/learning-path/time-and-daily-routine/flashcards/';

/* File order, exactly as the owner uploaded them — the SEO file names ride
   untouched (owner 2026-10-31). The page slug is the file name minus the
   shared -flashcard-for-kids suffix; cover.webp excluded (it is the class
   page's own cover). */
export const TR_ORDER=[
 'a-day-at-school-routine','afternoon-activities','always-sometimes-never',
 'before-during-after-time-words','begin-continue-finish','chores-in-order',
 'countdown-to-a-special-day','dawn-noon-dusk-midnight','days-of-the-week',
 'early-or-late','evening-and-night-routine','fast-or-slow',
 'first-next-last-sequence-words','getting-ready-routine','healthy-habits-daily-routine',
 'how-long-might-it-take','how-often-time-words','long-or-short-time',
 'meal-times-breakfast-lunch-dinner','months-of-the-year','morning-routine',
 'my-daily-routine','now-soon-later-time-words','open-happening-closed',
 'parts-of-the-day','plan-my-day','read-the-clock-hour-oclock',
 'same-time-each-day-routine','seconds-minutes-hours','start-and-stop',
 'the-calendar-days-weeks-months','time-changes-melt-grow','time-helpers-clock-calendar-timer',
 'time-order-words-first-second-third','time-words-review','waiting-time-patience',
 'week-month-year','weekday-or-weekend','when-plans-change',
 'work-time-and-break-time','yesterday-today-tomorrow'];

export const TR_COVER={file:'time-and-daily-routine-flashcards-for-kids-cover.webp',w:800,h:1132,
 alt:'Cover of the Kiddo School Time & Daily Routine flashcards: a smiling clock, a happy calendar, a sunny sun and a boy waving with his backpack above the words "Learn days, routines, and time words".'};

const W=800,H=1132;
/* slug → word (the card's printed title, transcribed off the card face),
   say (the card's own rule line, quoted VERBATIM from the artwork footer),
   alt (SEO alt authored from labeled contact sheets of the real artwork)
   and one try-it-today job (the child's practice — no two share a sentence). */
const CARDS=[
 ['a-day-at-school-routine','A Day at School','A school day has events in order. We use first, next, and last to tell what happens.','A Kiddo School Time & Daily Routine card titled A Day at School: five school-day scenes — arriving, learning, eating lunch, playing and going home — each labeled first, next or last.','Try it today: walk your school day out loud in order — first the door, next your seat, last the bell — just like the card\u2019s five steps.'],
 ['afternoon-activities','Afternoon','Afternoon comes after morning. We eat lunch, learn, play, have a snack, and come home.','A Kiddo School Time & Daily Routine card titled Afternoon: five afternoon scenes stacked in order — lunch, learning, play, a snack and coming home.','Try it today: tell your afternoon in order — lunch, learn, play, snack, home — then act out the best part.'],
 ['always-sometimes-never','Always, Sometimes, Never','Always means every time. Sometimes means on some days. Never means not at any time.','A Kiddo School Time & Daily Routine card titled Always, Sometimes, Never: rows of labeled scenes — brushing teeth, rain, dessert, hand-washing and the playground — sorted into always, sometimes and never.','Try it today: play the three-buckets game with your day — one thing you always do, one you sometimes do, one you never do.'],
 ['before-during-after-time-words','Before, During, After','Before is earlier. During is while something is happening. After is later.','A Kiddo School Time & Daily Routine card titled Before, During, After: four rows of three scenes — waving, washing, eating and watering a plant — each row labeled before, during and after with arrows.','Try it today: pick one thing you do today and say what happens before it, during it and after it — three time words, one moment.'],
 ['begin-continue-finish','Begin, Continue, Finish','Begin means start. Continue means keep going. Finish means reach the end.','A Kiddo School Time & Daily Routine card titled Begin, Continue, Finish: four rows of three scenes — blocks, painting, a book and a puzzle — each row labeled begin, continue and finish.','Try it today: begin a small job, say \u201cI continue!\u201d halfway through, and shout \u201cfinish!\u201d when the end lands — three words, one job.'],
 ['chores-in-order','Chores in Order','Doing chores in order helps us know what to do first and what to do next. When all the steps are finished, the job is done.','A Kiddo School Time & Daily Routine card titled Chores in Order: five numbered chore scenes — toys in a box, clothes in the basket, wiping the table, books on the shelf and a finished high five.','Try it today: line up your chores like the card — toys, clothes, table, books — and number them out loud as each one is done.'],
 ['countdown-to-a-special-day','Countdown to a Special Day','A countdown tells us how many days are left before something special. The number gets smaller until the special day arrives.','A Kiddo School Time & Daily Routine card titled Countdown to a Special Day: a countdown stack — five days, three days, two days, one day and today — beside a suitcase, a birthday cake and a gift.','Try it today: pick a day you are waiting for and count the sleeps left — watch the number get smaller, just like the card.'],
 ['dawn-noon-dusk-midnight','Dawn, Noon, Dusk, Midnight','Dawn is when the day begins. Noon is the middle of the day. Dusk is when daylight ends. Midnight is the middle of the night.','A Kiddo School Time & Daily Routine card titled Dawn, Noon, Dusk, Midnight: four sky scenes — a rising sun, a high noon sun, a setting sun and a moon with stars — each labeled with its time.','Try it today: look out the window and guess which sky-time it is — dawn, noon, dusk or midnight — then check the sky again tonight.'],
 ['days-of-the-week','Days of the Week','A week has seven days. We say the days in the same order every time. After Sunday comes Monday again.','A Kiddo School Time & Daily Routine card titled Days of the Week: the seven day names from Monday to Sunday stacked beside a backpack, books, a balloon, a beach ball and a family.','Try it today: sing the seven days in order and stop on today — then name yesterday and tomorrow like the calendar does.'],
 ['early-or-late','Early or Late?','Early means near the beginning of a time. Late means after the expected time or near the end.','A Kiddo School Time & Daily Routine card titled Early or Late?: five pairs of scenes — waking, arriving, eating, shining and sleeping — the early one and the late one side by side.','Try it today: race the clock once — get ready early and feel the difference, then say whether today was an early day or a late one.'],
 ['evening-and-night-routine','Evening and Night','Evening comes after afternoon. Night is when the day is finished and we rest and sleep.','A Kiddo School Time & Daily Routine card titled Evening and Night: five evening steps — tidy up, eat dinner, brush teeth, put on pajamas and sleep — beside a boy asleep under a moon.','Try it today: run tonight\u2019s five steps in order — tidy, dinner, teeth, pajamas, sleep — and check each one off like the card.'],
 ['fast-or-slow','Fast or Slow?','Fast means something happens or moves quickly. Slow means it takes more time.','A Kiddo School Time & Daily Routine card titled Fast or Slow?: a running cheetah, a walking turtle, a dashing kid, a careful eater and a rocket — each labeled fast or slow.','Try it today: move fast like the cheetah for five counts, then slow like the turtle — your body knows both words now.'],
 ['first-next-last-sequence-words','First, Next, Last','FIRST means it happens before the others. NEXT means it happens after first. LAST means it happens at the end.','A Kiddo School Time & Daily Routine card titled First, Next, Last: five little routines — making toast, planting a seed, washing hands, getting ready for bed and making a sandwich — each in first, next, last order.','Try it today: make a snack in three steps and say first, next and last as each one happens — the words do the cooking.'],
 ['getting-ready-routine','Time to Get Ready','Getting ready means doing the steps before an activity begins. We follow the steps in order so we are ready on time.','A Kiddo School Time & Daily Routine card titled Time to Get Ready: a boy choosing clothes, packing a backpack, putting on shoes, checking the clock and walking out the door — the five steps labeled choose, pack, shoes, check and go.','Try it today: do the five get-ready steps — choose, pack, shoes, check, go — and walk out the door like the card\u2019s boy.'],
 ['healthy-habits-daily-routine','Time for Healthy Habits','Healthy habits fit into our daily routine. Time words help us know when to do them.','A Kiddo School Time & Daily Routine card titled Time for Healthy Habits: a drinking boy, an eating boy, a stretching boy, a hand-washer and a tooth-brusher — each with its when-to label from morning to before bed.','Try it today: match your habits to their time words — water during the day, teeth before bed — then hang the card where you will see both.'],
 ['how-long-might-it-take','How Long Might It Take?','We can make a good guess about how long an activity will take. Some activities take a short time and some take a long time.','A Kiddo School Time & Daily Routine card titled How Long Might It Take?: five activities with time guesses — a few minutes for shoes, about ten minutes for cereal, half an hour for a show, about an hour for school and many hours for sleep.','Try it today: guess how long bath time takes, then check the clock — a good guess is a time-word win.'],
 ['how-often-time-words','How Often?','How often tells us how many times something happens. It can happen every day, often, sometimes, or once in a while.','A Kiddo School Time & Daily Routine card titled How Often?: four scenes — brushing every day, a doctor visit once in a while, dinner every evening and a birthday once a year — with the word often underneath.','Try it today: pick three things you do and say how often — every day, sometimes, or once a year like a birthday.'],
 ['long-or-short-time','Long or Short?','Long takes a lot of time. Short takes a little time. We can compare how long activities last.','A Kiddo School Time & Daily Routine card titled Long or Short?: five pairs of activities — books and songs, a bus ride and a nap — sorted into long times and short times.','Try it today: sort your day into long things and short things — bedtime is long, shoe time is short — and hear how they compare.'],
 ['meal-times-breakfast-lunch-dinner','Meal Times','Meals happen at different times during the day. Knowing the meal time helps us follow a routine.','A Kiddo School Time & Daily Routine card titled Meal Times: five eating scenes — breakfast, a morning snack, lunch, an afternoon snack and dinner — each labeled with its meal time.','Try it today: name today\u2019s meals in order — breakfast, lunch, dinner — and catch the snacks hiding in between.'],
 ['months-of-the-year','Months of the Year','There are twelve months in a year. The months always come in the same order.','A Kiddo School Time & Daily Routine card titled Months of the Year: all twelve month names in a grid with seasonal friends — a winter coat, a heart, a flower, an umbrella, a beach ball, a pumpkin and a gift.','Try it today: sing the twelve months and stop on the one you are in — then find your birthday month like the gift on the card.'],
 ['morning-routine','Morning','Morning is the first part of the day. We wake up, get ready, eat, and begin our day.','A Kiddo School Time & Daily Routine card titled Morning: five morning steps — wake up, wash, get dressed, eat breakfast and go to school — beside a stretching boy waking up.','Try it today: run the five morning steps in order — wake, wash, dress, eat, go — and begin the day exactly like the card.'],
 ['my-daily-routine','My Daily Routine','A routine is a group of things we do in order. We can use first, next, and last to tell what happens during our day.','A Kiddo School Time & Daily Routine card titled My Daily Routine: five day steps — first wake up, next get ready, next learn, next play and last sleep — each with its order word.','Try it today: tell YOUR day with the card\u2019s order words — first I wake up, next I learn, last I sleep — and hear the routine click.'],
 ['now-soon-later-time-words','Now, Soon, Later','Now means it is happening at this moment. Soon means it will happen after a short wait. Later means it will happen after more time.','A Kiddo School Time & Daily Routine card titled Now, Soon, Later: a boy eating an apple now, a bowl with soon beside it and a birthday calendar waiting for later.','Try it today: answer in time words — snack is now, dinner is soon, your birthday is later — and feel each word land in its place.'],
 ['open-happening-closed','Open, Happening, Closed','Open means we can go in or use a place. Happening means an activity is taking place. Closed means we must wait until another time.','A Kiddo School Time & Daily Routine card titled Open, Happening, Closed: a shop and a playground marked open, a classroom marked happening, a library marked closed and a boy learning to wait.','Try it today: spot one open thing, one happening thing and one closed thing on your way today — the signs do the talking.'],
 ['parts-of-the-day','Parts of the Day','A day has different parts. Morning starts the day, afternoon comes later, evening comes near the end, and night is for rest.','A Kiddo School Time & Daily Routine card titled Parts of the Day: four day parts — morning waking, afternoon playing, evening eating and night sleeping — each in its own sky.','Try it today: point at the sky and name the part of the day — then name one thing your family does in that part.'],
 ['plan-my-day','Plan My Day','A plan tells us what we will do and when we will do it. A plan helps us remember the order of our day.','A Kiddo School Time & Daily Routine card titled Plan My Day: five plan cards — a morning plan, a school plan, an afternoon plan, an evening plan and a bedtime plan — each with its own picture.','Try it today: make tonight\u2019s plan in five words — dinner, bath, book, bed — and check it off like the card\u2019s clipboard.'],
 ['read-the-clock-hour-oclock','Read the Clock','A clock helps us know when something happens. The short hand points to the hour.','A Kiddo School Time & Daily Routine card titled Read the Clock: five clock faces — 7 o\u2019clock waking, 8 o\u2019clock school, 12 o\u2019clock lunch, 3 o\u2019clock playing and 8 o\u2019clock at night — each showing its short hand.','Try it today: find the short hand on your clock and read the hour out loud — then check it again at bedtime like the card.'],
 ['same-time-each-day-routine','Same Time Each Day','A regular routine means doing an activity at about the same time each day. Regular routines help us know what to expect.','A Kiddo School Time & Daily Routine card titled Same Time Each Day: five numbered routines — wake up, breakfast, school, brush teeth and bedtime — each with a little clock beside it.','Try it today: do one thing at the same time as yesterday — same breakfast, same teeth, same bed — and feel the routine hold you.'],
 ['seconds-minutes-hours','Seconds, Minutes, Hours','Seconds are very short. Minutes are longer. Hours are much longer. We use different time words to talk about how long things take.','A Kiddo School Time & Daily Routine card titled Seconds, Minutes, Hours: a clapping boy for seconds, a tooth-brusher for minutes, a movie and a school day for hours — time in three sizes.','Try it today: clap one second, brush for minutes, and name one thing that takes hours — three sizes of time in one day.'],
 ['start-and-stop','Start and Stop','Start means something begins. Stop means something ends or pauses. We can use these words to describe an activity.','A Kiddo School Time & Daily Routine card titled Start and Stop: racing kids at a start line and a stop line, a music player starting and pausing, and a writer starting and stopping a page.','Try it today: play the start-stop game — dance when the word is start, freeze when it is stop — your ears run the game.'],
 ['the-calendar-days-weeks-months','The Calendar','A calendar helps us see days, weeks, and months. We can use it to remember special dates.','A Kiddo School Time & Daily Routine card titled The Calendar: a day page, a week strip, a month grid, a circled birthday and a holiday — each calendar piece with a smiling face.','Try it today: find today\u2019s box on the calendar, then hunt for the next birthday and circle it with a finger.'],
 ['time-changes-melt-grow','Time Changes','Time helps things change. Some changes happen quickly, and some changes take a long time.','A Kiddo School Time & Daily Routine card titled Time Changes: an ice cube melting, a caterpillar becoming a butterfly, a seed growing, a puppy getting bigger and a child growing taller.','Try it today: name one quick change you saw today and one slow one — ice melts fast, puppies grow slow.'],
 ['time-helpers-clock-calendar-timer','Time Helpers','Time helpers show us when things happen and help us plan our day.','A Kiddo School Time & Daily Routine card titled Time Helpers: five smiling time helpers — an alarm clock, a clock, a calendar, a timer and a schedule on a clipboard.','Try it today: pick your time helper for tonight — a timer for teeth brushing, a calendar for bedtime — and let it do its job.'],
 ['time-order-words-first-second-third','Time Order Words','Order words tell us where something comes in a sequence. First starts, last finishes, and the other words show the steps in between.','A Kiddo School Time & Daily Routine card titled Time Order Words: five runners on red mats labeled first, second, third, fourth and last, with a finish flag held high.','Try it today: race three toys to a finish line and place them first, second and last — then say the order out loud.'],
 ['time-words-review','Time Words Review','Time words help us tell when things happen and what order they follow.','A Kiddo School Time & Daily Routine card titled Time Words Review: the whole time-word family on one card — now, yesterday, tomorrow, before, after and first, next, last.','Try it today: use three time words at dinner — before, after and next — and hear your day snap into order.'],
 ['waiting-time-patience','Waiting Time','Waiting means staying calm until something is ready or it is your turn. A timer or clock can help us wait.','A Kiddo School Time & Daily Routine card titled Waiting Time: a girl watching a kettle, a swing turn, a baking oven, a bus stop and a growing seed — all the places we wait.','Try it today: wait for one thing today with the card\u2019s trick — breathe and watch — then say how the waiting felt.'],
 ['week-month-year','A Week, a Month, a Year','A week has seven days. A month has several weeks. A year has twelve months.','A Kiddo School Time & Daily Routine card titled A Week, a Month, a Year: time sizes from one day to a whole year — day pages, week strips, month grids and a year wheel.','Try it today: stack the time sizes out loud — one day, seven days makes a week, twelve months makes a year — like climbing stairs.'],
 ['weekday-or-weekend','Weekday or Weekend?','Weekdays are Monday to Friday. The weekend is Saturday and Sunday. School days and rest days can be different.','A Kiddo School Time & Daily Routine card titled Weekday or Weekend?: five weekday kids — Monday to Friday with school things — and a weekend family with Saturday and Sunday.','Try it today: sort your week into school days and home days, then name what makes the weekend different.'],
 ['when-plans-change','When Plans Change','Sometimes a plan changes. We can check the new order and choose what happens next.','A Kiddo School Time & Daily Routine card titled When Plans Change: four plan changes — rain moving play indoors, a closed playground, a late bus and a rest day — each one finding a new plan.','Try it today: play what-if — if the park is closed, what is the new plan? Say the new order out loud like the card.'],
 ['work-time-and-break-time','Work Time and Break Time','Work time is when we focus on an activity. Break time is a short rest before we begin again.','A Kiddo School Time & Daily Routine card titled Work Time and Break Time: a puzzling boy and a reading boy at work, a stretching boy and a drinking boy on break, and then back to work.','Try it today: work for one puzzle, take a stretch break, then begin again — the card\u2019s rhythm becomes your rhythm.'],
 ['yesterday-today-tomorrow','Yesterday, Today, Tomorrow','Yesterday means the day before today. Today means this day. Tomorrow means the day after today.','A Kiddo School Time & Daily Routine card titled Yesterday, Today, Tomorrow: three day words — yesterday with a park picture, today with a smiling clock and tomorrow with mountains ahead.','Try it today: tell one thing from yesterday, one from today and one plan for tomorrow — the three-day bridge in your own words.']]
 .map(([slug,word,say,alt,tryIt])=>({slug,file:slug+'-flashcard-for-kids.webp',pageSlug:slug,w:W,h:H,word,say,alt,tryIt}));

export const TR_CARDS=CARDS;
export const trBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));

/* The five shelves — the day's routines, the calendar, the parts of the day,
   the time words, and the thinking skills that own them. */
export const TR_MYDAY=['morning-routine','getting-ready-routine','a-day-at-school-routine','afternoon-activities','evening-and-night-routine','my-daily-routine','healthy-habits-daily-routine','same-time-each-day-routine','work-time-and-break-time'];
export const TR_CALENDAR=['days-of-the-week','months-of-the-year','the-calendar-days-weeks-months','weekday-or-weekend','yesterday-today-tomorrow','week-month-year','countdown-to-a-special-day','when-plans-change'];
export const TR_DAYPARTS=['parts-of-the-day','dawn-noon-dusk-midnight','meal-times-breakfast-lunch-dinner','read-the-clock-hour-oclock','time-helpers-clock-calendar-timer','open-happening-closed'];
export const TR_WORDS=['now-soon-later-time-words','before-during-after-time-words','first-next-last-sequence-words','time-order-words-first-second-third','always-sometimes-never','how-often-time-words','how-long-might-it-take','seconds-minutes-hours','long-or-short-time','fast-or-slow','early-or-late','time-words-review'];
export const TR_OWN=['plan-my-day','chores-in-order','begin-continue-finish','start-and-stop','waiting-time-patience','time-changes-melt-grow'];

/* Guards: exactly the owner's 41 cards in file order (SEO file names kept),
   shelves covering the deck with no gaps and no doubles, every entry
   complete. */
if(CARDS.length!==41)throw Error('time-and-daily-routine: expected 41 cards, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==TR_ORDER.join('|'))throw Error('time-and-daily-routine: card order does not match TR_ORDER');
const shelved=[...TR_MYDAY,...TR_CALENDAR,...TR_DAYPARTS,...TR_WORDS,...TR_OWN].sort().join('|');
if(shelved!==TR_ORDER.slice().sort().join('|'))throw Error('time-and-daily-routine: shelves must cover the deck exactly once');
for(const c of CARDS){
 if(c.alt.length<80)throw Error('time-and-daily-routine: thin alt for '+c.slug);
 if(c.say.length<40)throw Error('time-and-daily-routine: thin say for '+c.slug);
 if(c.tryIt.length<60)throw Error('time-and-daily-routine: thin try-it for '+c.slug);
}

const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

/* ---- The class page (Class 41) — the WHOLE deck on this one page ---------- */
/* One card tile: image, word, four pills (age · subject · level · skill),
   a small description under the picture — the card's own rule in quotes,
   then the try-it job, talking straight to the kid — and Download + Print
   buttons. No card pages anywhere: the buttons do the work right here. */
function tile(c){
 const pills=`<span class="fc-pillrow"><span class="fc-pill fc-pill-age">Ages 4\u20135</span><span class="fc-pill fc-pill-subject">${TR_SHELF_SUBJECT[TR_SHELF_BY_SLUG[c.slug]]}</span><span class="fc-pill fc-pill-level">${TR_LEVEL_NAMES[TR_LEVEL[c.slug]]}</span><span class="fc-pill fc-pill-skill">${esc(TR_SKILL[c.slug])}</span></span>`;
 return `<figure class="mn-card"><img src="${TR_BASE}${c.file}" width="${W}" height="${H}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong>${pills}<figcaption class="mn-tip">\u201c${esc(c.say)}\u201d ${esc(c.tryIt.replace(/^Try it today: /,''))}</figcaption><div class="mn-actions"><a class="button" href="${TR_BASE}${c.file}" download="${c.pageSlug}.webp">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}
function shelf(title,hint,slugs){
 return `<section class="wrap lesson-section"><span class="eyebrow">${esc(title)}</span><h2>${esc(hint)}</h2><p class="fc-hint">Download takes the full-size card; Print runs just that one card through the printer. Every pill answers one question: the age, the shelf, the grade level, the skill it builds.</p><div class="mn-cards">${slugs.map(s=>tile(trBySlug[s])).join('')}</div></section>`;
}

export function trClassBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">LEARNING PATH \u00b7 CLASS 41 \u00b7 TIME &amp; DAILY ROUTINE \u00b7 AGES 4\u20135</span><h1>Time &amp; Daily Routine — forty-one printable time cards to download and print.</h1><p class="lesson-lede">Forty-one printable time cards for ages four to five, all on this one page, in five shelves: your day, the calendar, the parts of the day, the time words and the plan-and-patience skills. Every card carries its rule in words YOU can say back — first, next, last; now, soon, later; yesterday, today, tomorrow — with Download and Print buttons right under the picture. Pick a card, print it, pin it where the day happens: your day has an order, and YOU can say it.</p><div class="lesson-start"><a class="button" href="/flashcards/time-and-daily-routine/">Print the whole deck <span aria-hidden="true">\u2197</span></a><a class="button button-ghost" href="/learning-path/">Back to the Learning Path <span aria-hidden="true">\u2197</span></a></div></div><figure class="lesson-cover"><img src="${TR_BASE}${TR_COVER.file}" width="${TR_COVER.w}" height="${TR_COVER.h}" alt="${esc(TR_COVER.alt)}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>One rule. The child says it. Then the day does the teaching.</h2><p class="lesson-copy">Every card prints one time idea the way a four-year-old meets it: the day\u2019s five morning steps, the week\u2019s seven names, the short hand that points to the hour, the waiting that takes a breath. The small words under each picture are the rule itself, then one thing to try today that takes less than a minute to set up — walking your school day in first-next-last order, counting the sleeps to a special day, freezing when the word is stop. The Download button saves the full-size card; Print runs just that one card. Time words grow the same way the cards run — small, happy and repeated.</p><p class="lesson-copy">The shelves follow the day. The my-day shelf walks YOUR routine from wake-up to bedtime and back to work. The calendar shelf holds the big time names — seven days, twelve months, weekdays and the weekend, and the countdown that makes waiting fun. The day-parts shelf reads the sky and the clock: morning to midnight, the meal times, the time helpers. The time-words shelf is the word family — now, soon, later, before, during, after, first, second, third. And the own-it shelf is where planning lives: plan my day, chores in order, when plans change, and the patience to wait.</p></section>`;
 const myday=shelf('THE MY-DAY SHELF \u00b7 9 CARDS','Your day, from wake-up to bedtime.','morning-routine getting-ready-routine a-day-at-school-routine afternoon-activities evening-and-night-routine my-daily-routine healthy-habits-daily-routine same-time-each-day-routine work-time-and-break-time'.split(' '));
 const calendar=shelf('THE CALENDAR SHELF \u00b7 8 CARDS','The big time names — days, months and the year.','days-of-the-week months-of-the-year the-calendar-days-weeks-months weekday-or-weekend yesterday-today-tomorrow week-month-year countdown-to-a-special-day when-plans-change'.split(' '));
 const dayparts=shelf('THE DAY-PARTS SHELF \u00b7 6 CARDS','Reading the sky and the clock.','parts-of-the-day dawn-noon-dusk-midnight meal-times-breakfast-lunch-dinner read-the-clock-hour-oclock time-helpers-clock-calendar-timer open-happening-closed'.split(' '));
 const words=shelf('THE TIME-WORDS SHELF \u00b7 12 CARDS','The word family that puts everything in order.','now-soon-later-time-words before-during-after-time-words first-next-last-sequence-words time-order-words-first-second-third always-sometimes-never how-often-time-words how-long-might-it-take seconds-minutes-hours long-or-short-time fast-or-slow early-or-late time-words-review'.split(' '));
 const own=shelf('THE OWN-IT SHELF \u00b7 6 CARDS','Planning, waiting and going with the flow.','plan-my-day chores-in-order begin-continue-finish start-and-stop waiting-time-patience time-changes-melt-grow'.split(' '));
 const around=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where the time learning grows.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/4-years/life-skills-and-good-habits/">Everyday habits in Class 32 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/weather-seasons-and-what-we-wear/">Weather &amp; seasons in Class 34 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/sequence-stories/">Story order in Sequence Stories <span>\u00b7 Ages 3\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/first-glance/">The Daily Routine &amp; Times of Day sheets in First Glance <span>\u00b7 Ages 2\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/flashcards/time-and-daily-routine/">The parents\u2019 shelf in the library <span>\u00b7 All 41 cards to print</span> <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Class 32 builds the everyday habits this day runs on, Class 34 walks the seasons your calendar counts through, and the <a href="/sequence-stories/">Sequence Stories class</a> puts four-picture stories in the same first-next-last order these cards teach. The <a href="/first-glance/">First Glance</a> Daily Routine and Times of Day sheets hold the youngest version of the same words. And when the cards need printing, parents will find the whole deck on <a href="/flashcards/time-and-daily-routine/">the parents\u2019 shelf in the flashcards library</a> — download and print buttons under every card, no extra pages to hop through.</p></section>`;
 return `${hero}${how}${myday}${calendar}${dayparts}${words}${own}${around}<p class="lesson-note"><strong>Your day has an order, and YOU can say it.</strong> Every card here hands the time words to you — the waking, the waiting, the planning — and your grown-up\u2019s whole job is to keep the day calm enough to notice them.</p>`;
}

/* ---- Cross-links the owner asked for (2026-10-31) ------------------------- */
/* Appended to Class 32 · Life Skills & Good Habits. */
export const TR_LIFE_SKILLS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">HABITS ON THE CLOCK</span><h2>Class 41 \u00b7 Time &amp; Daily Routine.</h2><p class="lesson-copy">Class 32 builds the daily habits — hand-washing, tidying, getting ready — and the <a href="/time-and-daily-routine/">Time &amp; Daily Routine class</a> puts those habits on the clock: forty-one printable time cards for ages 4\u20135, from the five morning steps and the same-time-each-day routine to work time and break time — every card downloads and prints straight from the class page, with the rule and one way to try it today right under the picture. Same habit method — now with the time words that make the day hold together.</p></section>`;
/* Appended to Class 34 · Weather, Seasons & What We Wear. */
export const TR_WEATHER_LINK=`<section class="wrap lesson-section"><span class="eyebrow">FROM SKY TIME TO CLOCK TIME</span><h2>Class 41 \u00b7 Time &amp; Daily Routine.</h2><p class="lesson-copy">Class 34 reads the sky — sun, clouds, rain and the four seasons — and the <a href="/time-and-daily-routine/">Time &amp; Daily Routine class</a> reads the clock and the calendar beside it: dawn, noon, dusk and midnight from the card\u2019s four skies, the twelve months the seasons walk through, and the parts of the day your weather clothes change with. Forty-one printable cards for ages 4\u20135, every one downloadable and printable straight from the class page with its rule and its try-it job right beneath the image.</p></section>`;
/* Appended to the Sequence Stories extra class. */
export const TR_SEQ_LINK=`<section class="wrap lesson-section"><span class="eyebrow">STORY ORDER, DAY ORDER</span><h2>Class 41 \u00b7 Time &amp; Daily Routine.</h2><p class="lesson-copy">Sequence Stories puts four-picture stories in order — first, next, last — and the <a href="/time-and-daily-routine/">Time &amp; Daily Routine class</a> runs the same order words across a whole day: the morning\u2019s five steps, the afternoon\u2019s lunch-learn-play-snack, the evening\u2019s tidy-dinner-teeth-pajamas-sleep. Forty-one printable time cards for ages 4\u20135 with the rule on every card and one way to try it today — the sequencing practice your family just did with stories, now on your child\u2019s own routine.</p></section>`;

/* ---- THE PARENTS' SHELF in the flashcards library
   (/flashcards/time-and-daily-routine/) — the Class 39/40 precedent: the
   whole 41-card deck on ONE library page, Download + Print under every
   image, THREE pills per card (age, subject, level) and a parent tip under
   each. TONE SPLIT (owner rule): the lesson talks to kids; this shelf talks
   to parents. The shelf's per-card words are fresh copy that shares no
   sentence with the class or short pages. The deck's own cover fronts it.
   Level pills are the shelf's own honest progression: 1 = name the time
   words (11), 2 = do the routines (18), 3 = own the day (12) — 11/18/12,
   guarded below. */
const TR_SHELF_SUBJECT={myday:'Daily routines',calendar:'Days &amp; months',dayparts:'Time of day',words:'Time words',own:'Plan &amp; patience'};
const TR_SHELF_HINT={
 myday:'Your day, from wake-up to bedtime.',
 calendar:'The big time names — days, months and the year.',
 dayparts:'Reading the sky and the clock.',
 words:'The word family that puts everything in order.',
 own:'Planning, waiting and going with the flow.'};
const TR_LEVEL={
 'days-of-the-week':1,'months-of-the-year':1,'the-calendar-days-weeks-months':1,'parts-of-the-day':1,'dawn-noon-dusk-midnight':1,
 'meal-times-breakfast-lunch-dinner':1,'read-the-clock-hour-oclock':1,'yesterday-today-tomorrow':1,'seconds-minutes-hours':1,'time-helpers-clock-calendar-timer':1,'week-month-year':1,
 'morning-routine':2,'getting-ready-routine':2,'a-day-at-school-routine':2,'afternoon-activities':2,'evening-and-night-routine':2,'my-daily-routine':2,
 'healthy-habits-daily-routine':2,'same-time-each-day-routine':2,'work-time-and-break-time':2,'chores-in-order':2,'plan-my-day':2,
 'open-happening-closed':2,'start-and-stop':2,'begin-continue-finish':2,'first-next-last-sequence-words':2,'time-order-words-first-second-third':2,
 'now-soon-later-time-words':2,'before-during-after-time-words':2,
 'always-sometimes-never':3,'how-often-time-words':3,'how-long-might-it-take':3,'long-or-short-time':3,'fast-or-slow':3,
 'early-or-late':3,'time-words-review':3,'waiting-time-patience':3,'time-changes-melt-grow':3,'when-plans-change':3,
 'weekday-or-weekend':3,'countdown-to-a-special-day':3};
/* Owner 2026-10-31: “levels are grade 1, grade 2, preschool” — the level pill names the school grade, not “Level 1/2/3”. */
const TR_LEVEL_NAMES={1:'Preschool \u00b7 Name it',2:'Grade 1 \u00b7 Do it',3:'Grade 2 \u00b7 Own it'};
const TR_LEVEL_BLURB={
 1:'the eleven time names to point at first — the seven days, the twelve months, the parts of the day and the clock\u2019s short hand',
 2:'the eighteen routines and order words — the day\u2019s steps, the chores, the plan, and the first-next-last family that holds them',
 3:'the twelve bigger ideas — comparing how long things take, counting the waits, reading the whole time-word family and going with a changed plan'};
if(Object.keys(TR_LEVEL).length!==41)throw Error('time-and-daily-routine: level deck must cover 41 cards');
for(const c of CARDS){if(!TR_LEVEL[c.slug])throw Error('time-and-daily-routine: missing level for '+c.slug);}
const TR_LEVEL_COUNTS=Object.fromEntries([1,2,3].map(l=>[l,CARDS.filter(c=>TR_LEVEL[c.slug]===l).length]));
if(TR_LEVEL_COUNTS[1]!==11||TR_LEVEL_COUNTS[2]!==18||TR_LEVEL_COUNTS[3]!==12)throw Error('time-and-daily-routine: level sizes drifted '+JSON.stringify(TR_LEVEL_COUNTS));

/* Skill pill per card (owner 2026-10-31: \u201cage, skill if any, level pill,
   subject pill\u201d) \u2014 the one skill the card builds, in the words parents use. */
const TR_SKILL={
 'a-day-at-school-routine':'Sequencing','afternoon-activities':'Sequencing','always-sometimes-never':'Sorting',
 'before-during-after-time-words':'Time words','begin-continue-finish':'Persistence','chores-in-order':'Sequencing',
 'countdown-to-a-special-day':'Counting','dawn-noon-dusk-midnight':'Observation','days-of-the-week':'Calendar skills',
 'early-or-late':'Comparing','evening-and-night-routine':'Sequencing','fast-or-slow':'Comparing',
 'first-next-last-sequence-words':'Sequencing','getting-ready-routine':'Self-care','healthy-habits-daily-routine':'Health habits',
 'how-long-might-it-take':'Estimating','how-often-time-words':'Time words','long-or-short-time':'Comparing',
 'meal-times-breakfast-lunch-dinner':'Vocabulary','months-of-the-year':'Calendar skills','morning-routine':'Sequencing',
 'my-daily-routine':'Sequencing','now-soon-later-time-words':'Time words','open-happening-closed':'Vocabulary',
 'parts-of-the-day':'Time words','plan-my-day':'Planning','read-the-clock-hour-oclock':'Telling time','yesterday-today-tomorrow':'Calendar skills',
 'same-time-each-day-routine':'Routines','seconds-minutes-hours':'Comparing','start-and-stop':'Self-control',
 'the-calendar-days-weeks-months':'Calendar skills','time-changes-melt-grow':'Observation','time-helpers-clock-calendar-timer':'Telling time',
 'time-order-words-first-second-third':'Sequencing','time-words-review':'Vocabulary','waiting-time-patience':'Patience',
 'week-month-year':'Calendar skills','weekday-or-weekend':'Sorting','when-plans-change':'Flexibility',
 'work-time-and-break-time':'Focus'};
if(Object.keys(TR_SKILL).length!==41)throw Error('time-and-daily-routine: skill deck must cover 41 cards');
for(const c of CARDS){if(!TR_SKILL[c.slug])throw Error('time-and-daily-routine: missing skill for '+c.slug);}
const TR_SHELF_ORDER=[['myday',TR_MYDAY],['calendar',TR_CALENDAR],['dayparts',TR_DAYPARTS],['words',TR_WORDS],['own',TR_OWN]];
/* slug → shelf, so every tile knows its subject pill. */
const TR_SHELF_BY_SLUG=Object.fromEntries(TR_SHELF_ORDER.flatMap(([key,slugs])=>slugs.map(s=>[s,key])));
for(const c of CARDS){if(!TR_SHELF_BY_SLUG[c.slug])throw Error('time-and-daily-routine: no shelf for '+c.slug);}

/* The parent-facing description under every card on the shelf: how to print
   it and how to run it tonight. Fresh copy — shares no sentence with the
   lesson above. All 41 unique (first-60-chars check in the tests). */
const TR_SHELF_DESC={
 'a-day-at-school-routine':'Print it and walk the five school-day steps in order at breakfast — first the door, last the bell. Your child narrates; the card keeps the order honest.',
 'afternoon-activities':'The after-school stretch has an order too. Tape the card inside the door and let your child call the afternoon\u2019s five beats as they happen.',
 'always-sometimes-never':'Three words that settle a lot of arguments. Print it and sort your family\u2019s week into always, sometimes and never — your child gets the deciding vote on one.',
 'before-during-after-time-words':'Arrows do the teaching here. Print it and pick one real moment today — dinner works — then say what came before, what is happening during, what comes after.',
 'begin-continue-finish':'Long jobs shrink into three words. Print it and start a puzzle with \u201cbegin\u201d, coach the middle with \u201ccontinue\u201d and celebrate the end with \u201cfinish\u201d.',
 'chores-in-order':'The five chores come numbered on purpose. Print it and run tonight\u2019s tidy-up as a numbered mission — toys one, clothes two — the order is the game.',
 'countdown-to-a-special-day':'Waiting gets easier when it has a number. Print it before the next birthday or trip and let your child cross off the sleeps — the card\u2019s countdown does the teaching.',
 'dawn-noon-dusk-midnight':'Four skies, four times. Print it and check the real sky at bedtime — which box does tonight look like? The moon card usually wins.',
 'days-of-the-week':'Seven names, same order every week. Print it at child height and move a marker to today each morning — Sunday\u2019s wrap-around is the aha.',
 'early-or-late':'The five pairs make the comparison for you. Print it and catch one real early and one real late this week — school arrival is the easiest to spot.',
 'evening-and-night-routine':'The five bedtime steps in order, exactly as the evening runs. Print it and post it where pajamas happen — the card runs the routine so you do not have to.',
 'fast-or-slow':'A cheetah and a turtle settle it faster than a lecture. Print it and race the two words across the hallway — five fast counts, five slow ones.',
 'first-next-last-sequence-words':'Five real routines — toast, a seed, hand-washing — each in three steps. Print it and narrate one snack with the three words; the sandwich tastes better in order.',
 'getting-ready-routine':'Choose, pack, shoes, check, go — the five steps a morning needs. Print it at the door and let the card be the checklist your child reads to you.',
 'healthy-habits-daily-routine':'Every habit gets its when-to label. Print it and match each one to today — water during the day, teeth before bed — then let your child pick tomorrow\u2019s.',
 'how-long-might-it-take':'Guessing time is a real skill. Print it and play the guess-and-check game at bath time — the card\u2019s five activities give you the range.',
 'how-often-time-words':'Every day, once in a while, once a year — the card sorts them with pictures your child knows. Print it and ask how often for three things they do.',
 'long-or-short-time':'Comparison is the whole lesson. Print it and sort tonight\u2019s activities into long and short — the nap and the shoe race make the point.',
 'meal-times-breakfast-lunch-dinner':'Five eating moments in day order, snacks included. Print it for the fridge and let your child name which meal is coming before you set the table.',
 'months-of-the-year':'Twelve months with their season friends. Print it and sing the year in order, then hunt your child\u2019s birthday month — the gift picture marks it.',
 'morning-routine':'The five morning steps exactly as the day runs. Print it at child height in the bedroom — wake, wash, dress, eat, go — and let the card lead the race out the door.',
 'my-daily-routine':'First, next, last across a whole day. Print it and have your child tell their day back with the card\u2019s order words — the last step is always sleep.',
 'now-soon-later-time-words':'The three waiting words every four-year-old needs. Print it and answer the day\u2019s requests in its vocabulary — now, soon, later — until the words stick.',
 'open-happening-closed':'Places have time states too. Print it and spot the three words on a real errand — the open shop, the happening class, the closed library.',
 'parts-of-the-day':'Morning, afternoon, evening, night — each in its own sky. Print it and ask which part you are in at three different points of the day.',
 'plan-my-day':'A plan is just an order you can see. Print it and build tomorrow in five beats at bedtime — the clipboard card keeps the plan where your child can point at it.',
 'read-the-clock-hour-oclock':'Five o\u2019clocks your child actually lives. Print it by the real clock and hunt the short hand at breakfast, lunch and bedtime — three reads and the hour clicks.',
 'same-time-each-day-routine':'Same time, every day — the card shows five. Print it and pick one routine to anchor this week; the predictability is what your child is learning.',
 'seconds-minutes-hours':'Time in three sizes, with a clap for the smallest. Print it and size three real activities — a clap, a brush, a school day — smallest to biggest.',
 'start-and-stop':'The race-track card turns two words into a game. Print it and play the freeze version — dance on start, statue on stop — then use the words on real jobs.',
 'the-calendar-days-weeks-months':'The calendar family from one day to a year. Print it and find today\u2019s box, then the next birthday — the circled cake is the card\u2019s whole point.',
 'time-changes-melt-grow':'Some changes are quick, some take all year. Print it and collect one of each — an ice cube and a growing puppy — then guess which is which.',
 'time-helpers-clock-calendar-timer':'Five helpers, all smiling. Print it and hand your child one real helper tonight — a timer for teeth, a calendar for bedtime — helpers do their job best on a schedule.',
 'time-order-words-first-second-third':'Five runners, one finish flag. Print it and race toys to a line, then say the placements in order words — fourth and last get laughs.',
 'time-words-review':'The whole word family on one card. Print it as the review page — before, after, now, next — and use three of them at dinner tonight.',
 'waiting-time-patience':'Kettles, swings, ovens and bus stops — the places we wait. Print it and name the wait before it starts; the breathing trick is the part that lasts.',
 'week-month-year':'One day, seven days, twelve months — time that stacks. Print it and climb the sizes out loud like stairs; the year wheel at the top is the view.',
 'weekday-or-weekend':'Monday to Friday on one side, Saturday and Sunday on the other. Print it on Sunday and sort next week together — school days first.',
 'when-plans-change':'Rain, closures, late buses — plans bend. Print it and rehearse the what-if game: the plan changes, we check the new order, we choose what happens next.',
 'work-time-and-break-time':'Focus, rest, begin again — the rhythm of every good day. Print it and run one real cycle tonight: one puzzle, one stretch, back to work.',
 'yesterday-today-tomorrow':'The three-day bridge in pictures. Print it and do the dinner ritual — one thing from yesterday, one from today, one plan for tomorrow — the card holds all three.'};
if(Object.keys(TR_SHELF_DESC).length!==41)throw Error('time-and-daily-routine: shelf deck must cover 41 cards');
for(const c of CARDS){if(!TR_SHELF_DESC[c.slug]||TR_SHELF_DESC[c.slug].length<60)throw Error('time-and-daily-routine: thin shelf copy for '+c.slug);}

/* The wall card on /flashcards/: the deck's own cover fronts it. */
export const TR_LIB_SET={slug:'time-and-daily-routine',url:'/flashcards/time-and-daily-routine/',name:'Time & Daily Routine',
 ageLabel:'4–5',stageName:null,
 hubBlurb:'The parents\u2019 shelf for Class 41: all forty-one time-and-routine cards with a download and a print button under every image — age, subject, level and skill pills on each card, printing straight from the shelf, no card pages. The child\u2019s lesson lives in the Time & Daily Routine class.',
 coverUrl:TR_BASE+TR_COVER.file,
 cover:{w:TR_COVER.w,h:TR_COVER.h,alt:TR_COVER.alt},
 cards:CARDS.map(c=>({slug:c.slug,word:c.word}))};

function trShelfTile(c){
 const pillRow=`<span class="fc-pillrow"><span class="fc-pill fc-pill-age">Ages 4–5</span><span class="fc-pill fc-pill-subject">${TR_SHELF_SUBJECT[TR_SHELF_BY_SLUG[c.slug]]}</span><span class="fc-pill fc-pill-level">${TR_LEVEL_NAMES[TR_LEVEL[c.slug]]}</span><span class="fc-pill fc-pill-skill">${esc(TR_SKILL[c.slug])}</span></span>`;
 return `<figure class="mn-card"><img src="${TR_BASE}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong>${pillRow}<figcaption class="mn-tip">${esc(TR_SHELF_DESC[c.slug])}</figcaption><div class="mn-actions"><a class="button" href="${TR_BASE}${c.file}" download="${c.pageSlug}.webp">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}

export function trLibBody(){
 const intro=`<section class="wrap lesson-section"><p class="lesson-copy">This is the parents\u2019 copy of <a href="/time-and-daily-routine/">Class 41 \u00b7 Time &amp; Daily Routine</a>: all forty-one time-and-routine cards on one shelf, ready to print. You do not need a plan — pick the time word your day needs most, download the card, and print it full size on A4 or Letter paper. Every card carries its parent tip underneath and four pills on top: the age it suits, the shelf it belongs to, the grade level to start at, and the skill it builds. The download button takes the full-size card; the print button runs a single card through your printer with nothing else on the page. There are no card pages to hop through: the shelf is the whole set.</p><p class="lesson-copy">The shelf is yours; the lesson is your child\u2019s. The class page at <a href="/time-and-daily-routine/">Time &amp; Daily Routine</a> teaches each rule the way a teacher would — spoken to your child, the rule quoted word for word, one thing to try today — while this wall simply holds the deck for printing. Same forty-one cards, two jobs: the lesson lives in the class, the library is where parents print.</p></section>`;
 const levels=`<section class="wrap lesson-section"><span class="eyebrow">THE THREE LEVELS</span><h2>Preschool, Grade 1, Grade 2.</h2><p class="fc-hint">Every card wears a level pill so tonight\u2019s card takes one glance to choose. The levels are a suggested order, not a test — the time word your day needs most is always the right card.</p><ol class="fc-steps"><li><span class="fc-stepnum">01</span><div><h3>${TR_LEVEL_NAMES[1]}</h3><p>${TR_LEVEL_BLURB[1]}.</p></div></li><li><span class="fc-stepnum">02</span><div><h3>${TR_LEVEL_NAMES[2]}</h3><p>${TR_LEVEL_BLURB[2]}.</p></div></li><li><span class="fc-stepnum">03</span><div><h3>${TR_LEVEL_NAMES[3]}</h3><p>${TR_LEVEL_BLURB[3]}.</p></div></li></ol></section>`;
 const deck=TR_SHELF_ORDER.map(([key,slugs])=>{const cards=slugs.map(s=>trBySlug[s]);const names={myday:'MY-DAY SHELF',calendar:'CALENDAR SHELF',dayparts:'DAY-PARTS SHELF',words:'TIME-WORDS SHELF',own:'OWN-IT SHELF'};const heads={myday:'The day, from wake-up to bedtime.',calendar:'The big time names, in order.',dayparts:'Reading the sky and the clock.',words:'The word family that puts everything in order.',own:'Planning, waiting and going with the flow.'};return `<section class="wrap lesson-section"><span class="eyebrow">THE ${names[key]} \u00b7 ${cards.length} CARDS</span><h2>${heads[key]}</h2><p class="fc-hint">${TR_SHELF_HINT[key]} Download takes the full-size card; Print runs just that one card through the printer.</p><div class="mn-cards">${cards.map(trShelfTile).join('')}</div></section>`;}).join('');
 const next=`<section class="wrap lesson-section"><span class="eyebrow">WHERE TO NEXT</span><h2>The lesson, the path, the rest of the library.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/time-and-daily-routine/">The Time &amp; Daily Routine class <span>\u00b7 The child\u2019s lesson</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/learning-path/">The Learning Path <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/flashcards/">All flashcard sets <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/flashcards/healthy-food/">The Healthy Food parents\u2019 shelf <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Print a card here, teach the rule there: the <a href="/time-and-daily-routine/">Time &amp; Daily Routine class</a> is the lesson side of this deck — one rule a sitting, spoken to your child, with one tiny thing to try today. Once the deck is up on the fridge, the class page is the manual that makes each card stick.</p></section>`;
 return `${intro}${levels}${deck}${next}${fcCommunityMount('/flashcards/time-and-daily-routine/')}`;
}
