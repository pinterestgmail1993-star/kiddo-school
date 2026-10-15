// Kiddo School — Who Works at My School (/who-works-at-my-school/): the
// people page of the School Community family, beside the Principal's Office
// and the Sticky Note Wall. The 16 person cards are the owner's original
// uploads, verified live on R2 under school/school-community/who-works-at-
// my-school/ (17/17 objects HTTP 200 image/webp — 16 person cards + 1 cover,
// every file probed at 1000×707 landscape). Filenames are used exactly as
// uploaded — nothing renamed, nothing invented. Three groups, the owner's
// own split: PEOPLE WHO TEACH (six, ending with the student — the learner
// the whole school is here for), PEOPLE WHO HELP (five) and PEOPLE WHO KEEP
// US SAFE (five). The principal card links straight to the Principal's
// Office; every other card is a name-and-a-line, because this page names
// people, it does not teach lessons. Every alt is written from the actual
// artwork (contact-sheet checked).
export const WW_PATH='/who-works-at-my-school/';
export const WW_BASE='https://assets.kiddo.school/school/school-community/who-works-at-my-school/';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const P=(slug,word,line,alt)=>({slug,word,line,alt,file:slug+'.webp',w:1000,h:707});

export const TEACH=[
 P('teacher','Teacher','Shows you new things every day — and helps when something feels hard.','A Who Works at My School card titled Teacher: a teacher points at a green chalkboard.'),
 P('art-teacher','Art Teacher','Keeps the paint, the brushes and the messy, wonderful ideas.','A Who Works at My School card titled Art Teacher: an art teacher with a paint palette paints a mountain picture at a wooden easel.'),
 P('music-teacher','Music Teacher','Brings the songs, the instruments and the loud, happy endings.','A Who Works at My School card titled Music Teacher: a music teacher in a yellow jacket holds a guitar.'),
 P('science-teacher','Science Teacher','Sets up the experiments and answers the “but why?” questions.','A Who Works at My School card titled Science Teacher: a science teacher with glasses holds up a flask at the science table.'),
 P('pe-teacher','PE Teacher','Runs the games where your body gets to run, jump and balance.','A Who Works at My School card titled PE Teacher: a PE teacher with a whistle around his neck stretches one arm up high.'),
 P('student','Student','That is you — the learner the whole school is here for.','A Who Works at My School card titled Student: a student sits at a school desk doing work.')
];
export const HELP=[
 P('school-nurse','School Nurse','Fixes the scraped knee, checks your temperature and sits with you until you feel better.','A Who Works at My School card titled School Nurse: the school nurse in a navy uniform and cap cares for a child sitting at a desk.'),
 P('librarian','Librarian','Keeps the picture books and knows just which one to hand you next.','A Who Works at My School card titled Librarian: a librarian reaches for a book on a tall library shelf.'),
 P('cafeteria-worker','Cafeteria Worker','Serves the lunch — and knows exactly who likes the apple.','A Who Works at My School card titled Cafeteria Worker: a cafeteria worker in an apron and cap serves food from the lunch counter.'),
 P('janitor','Janitor','Keeps the floors clean, the doors working and the whole school shining.','A Who Works at My School card titled Janitor: a janitor in overalls mops the floor between two doors, a yellow bucket beside him.'),
 P('school-gardener','School Gardener','Waters the plants and shows you how a seed becomes a snack.','A Who Works at My School card titled School Gardener: a gardener in green overalls waters a potted plant with a watering can.')
];
export const SAFE=[
 P('principal','Principal','The friendly boss of the school — and the office door is open.','A Who Works at My School card titled Principal: the principal in a suit stands at his open office door.'),
 P('security-guard','Security Guard','Watches the doors and the gate so everyone inside stays safe.','A Who Works at My School card titled Security Guard: a security guard in a blue uniform stands at the school gate.'),
 P('crossing-guard','Crossing Guard','Holds up the STOP sign so you cross the road safely.','A Who Works at My School card titled Crossing Guard: a crossing guard in a safety vest holds up a STOP sign while two children with backpacks cross.'),
 P('bus-driver','Bus Driver','Drives the bus that brings you to school and takes you home again.','A Who Works at My School card titled Bus Driver: a bus driver in a cap sits at the big steering wheel of the school bus.'),
 P('playground-supervisor','Playground Supervisor','Watches the playground so the games stay fun and fair for everyone.','A Who Works at My School card titled Playground Supervisor: a supervisor with a whistle watches three children play with a red ball.')
];

const tile=(p,isLink)=>{
 const word=`<span class="fc2-cardword"><strong>${esc(p.word)}</strong><span>${esc(p.line)}</span></span>`;
 const img=`<span class="fc2-cardimg"><img src="${WW_BASE}${p.file}" width="${p.w}" height="${p.h}" alt="${esc(p.alt)}" loading="lazy"></span>`;
 if(isLink)return `<a class="fc-card fc2-cardlink ww-tile" href="/principals-office/">${img}${word}<span class="fc-open">Visit the Principal’s Office <span aria-hidden="true">↗</span></span></a>`;
 return `<figure class="fc-card ww-tile">${img}${word}</figure>`;
};
const group=(title,blurb,list)=>`<div class="fc-pillgroup"><div class="fc-pillgroup-head"><span class="fc-pill fc-pill-age fc-pill-big">${esc(title)}</span><p class="fc-hint">${esc(blurb)}</p></div><div class="fc2-cards">${list.map(p=>tile(p,p.slug==='principal')).join('')}</div></div>`;

export function whoWorksBody(){
 return `<section class="wrap section compact">
  <p class="lesson-copy">Some of them stand at the front of a room, and plenty of others you meet in the hallway, at the gate, in the garden or at the lunch counter — and every one of them is there so your school day works. Walk through all sixteen together and name the ones your child already knows.</p>
  ${group('People who teach','The faces at the front of the room — and one very important student.',TEACH)}
  ${group('People who help','The helpers your child meets between the bells — at the lunch counter, the library, the office and out in the garden.',HELP)}
  ${group('People who keep us safe','The watchers at the doors, the road and the playground — the reason the day feels safe enough to learn in.',SAFE)}
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">TRY IT TODAY</span><h2>Which person helps you when you feel sick?</h2>
  <p class="lesson-copy">Point at the school nurse card together, then name two more helpers your child has really met — and what they said or did. Naming the people of the school is how a building starts to feel like <em>my</em> school.</p>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>Where next?</h2>
  <div class="lesson-linkrow"><a class="lesson-pill-link" href="/principals-office/">Principal’s Office</a><a class="lesson-pill-link" href="/music-room/">The Music Room</a><a class="lesson-pill-link" href="/learning-library/">The Library</a><a class="lesson-pill-link" href="/preschool/4-years/transportation-and-vehicles/">Transportation</a></div>
  <p class="fc-hint">Every school is a little different — your child’s school may have more helpers to name. Ask who works at <em>their</em> school and add them to the game.</p>
 </section>`;
}
