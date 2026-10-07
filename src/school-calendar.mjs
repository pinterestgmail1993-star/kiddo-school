// Kiddo School Calendar: a gentle weekly rhythm built ONLY from pages that
// already exist on the site. No dated courses are invented — the week is a
// repeating rhythm, and all dates (Today / Yesterday / Tomorrow, the day grid,
// week navigation) are computed in the visitor's own timezone by
// /assets/calendar.js after the page loads. Without JavaScript the page still
// shows the full week with real links; it simply shows no dates.
export function schoolCalendarBody(){
 const day=(n,name,theme,copy,linkLabel,href)=>`<li class="sc-day" data-sc-day="${n}"><div class="sc-when"><span class="sc-dayname">${name}</span><span class="sc-date" data-sc-date hidden></span></div><div class="sc-plan"><span class="sc-theme">${theme}</span><p>${copy}</p><a class="text-link" href="${href}">${linkLabel} <span aria-hidden="true">↗</span></a></div></li>`;
 const week=`<ol class="sc-week">
 ${day(1,'Monday','Learn','Start the week with a class from the Learning Path — one short, playful lesson is plenty for a Monday.','Start a class','/learning-path/')}
 ${day(2,'Tuesday','Play &amp; practice','Trace a letter, write a number or draw something small on screen — and save the picture.','Practise handwriting','/literacy/handwriting-practice/')}
 ${day(3,'Wednesday','Circle Time','Hello, move, listen, a tiny story and goodbye — a little preschool morning, at home.','Sit down for Circle Time','/toddler/2-years/circle-time/hello-school/')}
 ${day(4,'Thursday','My work','Make something with your hands. A shape collage is a good one — and it can go up on your own wall at home.','Make a shape collage','/art/paper-shape-collage/')}
 ${day(5,'Friday','Let&rsquo;s explore','Fill a bowl of water, guess what sinks and find out together. The <a href="/activities/">activity cupboard</a> has more ideas like this.','Try Sink or Float?','/science/sink-or-float/')}
 ${day(6,'Saturday','Library','A quiet couch moment: print a set of flashcards and look through them together.','Visit the Library','/flashcards/')}
 ${day(0,'Sunday','Together day','A slow one. Go outside, listen carefully and map the sounds you hear along the way.','Make a sound map','/nature/sound-map/')}
 </ol>`;
 return `<section class="wrap section compact sc-today-wrap">
 <div class="sc-today">
  <span class="eyebrow">TODAY</span>
  <h2>Today</h2>
  <p class="sc-date-line" data-sc-today-date hidden></p>
  <p class="sc-today-plain">Every day on the calendar is a normal, doable kind of day — pick the small thing that fits today.</p>
  <div class="sc-plan-line" data-sc-today-plan hidden><span class="sc-today-theme" data-sc-today-theme></span><a class="text-link" href="#" data-sc-today-link></a></div>
  <div class="hero-actions"><a class="button" href="/newborn/0-6-weeks/high-contrast-cards/">Start Today&rsquo;s Class <span aria-hidden="true">↗</span></a></div>
  <div class="sc-nearby" data-sc-nearby>
   <span class="sc-near-chip"><strong>Yesterday</strong> <span data-sc-near="yesterday"></span></span>
   <span class="sc-near-chip sc-near-now"><strong>Today</strong> <span data-sc-near="today"></span></span>
   <span class="sc-near-chip"><strong>Tomorrow</strong> <span data-sc-near="tomorrow"></span></span>
  </div>
  <p class="sc-live" data-sc-live aria-live="polite"></p>
 </div>
 </section>
 <section class="wrap section compact">
  <span class="eyebrow">THIS WEEK</span>
  <h2 class="sc-week-title">This week at our school</h2>
  <p class="sc-week-lede">A simple rhythm, the same every week — each day points to something real you can open right now. Age ranges everywhere on the school are a guide, not a test.</p>
  <div class="sc-weeknav" data-sc-weeknav hidden>
   <button type="button" class="button button-ghost" data-sc-prev>← Previous week</button>
   <span class="sc-weeklabel" data-sc-weeklabel>This week</span>
   <button type="button" class="button button-ghost" data-sc-next>Next week →</button>
  </div>
  ${week}
  <p class="lesson-note sc-missed"><strong>Missed a day?</strong> That&rsquo;s okay. Pick up whenever you&rsquo;re ready.</p>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>Where next?</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/my-classroom/">My Classroom</a><a class="lesson-pill-link" href="/art-wall/">Our Art Wall</a><a class="lesson-pill-link" href="/learning-path/">Learning Path</a></div></section>`;
}
