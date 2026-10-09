// Kiddo School — How-to-draw tutorials. One reusable, data-driven template
// for step-by-step drawing lessons (Activities → Drawing, ages 3–6, free).
// Every picture is the owner's own PNG on R2, used at its true probed size in
// its exact uploaded order; alt text describes what is actually drawn. The
// page ships all six steps in the HTML (readable, printable and crawlable
// without JavaScript); /assets/drawing.js turns the same markup into a
// one-step-at-a-time viewer with Previous/Next, a "Step N of 6" counter,
// dot progress, a restart after the final step and keyboard arrows.
// Transparent PNGs sit on the school's warm ivory paper, never on a color
// the artwork was not made for. No scores, timers, ads or storage.
export const R2_DRAWING='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/drawing/';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ------------------------------------------------------------- the data */
export const howToDrawCat={
 path:'/how-to-draw-a-cat/',
 slug:'cat',
 animal:'cat',
 folder:'how-to-draw-a-cat/',
 seoTitle:'How to Draw a Cat – Easy Step-by-Step Drawing for Kids',
 title:'How to Draw a Cat – Easy Step-by-Step Drawing for Kids',
 h1:'How to Draw a Cat',
 subtitle:'Easy Drawing for Kids in 6 Steps',
 description:'Learn how to draw a cute cat in 6 easy steps! A fun, simple drawing tutorial for preschoolers and kids, with clear pictures and easy instructions.',
 eyebrow:'ACTIVITIES · DRAWING · AGES 3–6',
 intro:'Six big steps from one circle to a finished cat. All you need is paper, a pencil and your favorite colors — crayons work too.',
 grownups:'Sit together and draw side by side. A wobbly circle makes the friendliest cat.',
 complete:'You drew a cat!',
 supplies:['Paper','A pencil','Crayons or markers'],
 sibling:{href:'/how-to-draw-a-dog/',label:'Draw a dog next'},
 steps:[
  {file:'how-to-draw-a-cat-step-01.png',w:1080,h:1920,title:'Draw the head',
   detail:'Put your pencil in the middle of your paper, a little above the center. Draw one big round circle, like a ball. Leave lots of space underneath for the body.',
   alt:'A large circle drawn with one thick dark pencil line.'},
  {file:'how-to-draw-a-cat-step-02.png',w:1080,h:1920,title:'Add the ears',
   detail:'At the top-left of the circle, draw a small triangle pointing up. Draw another triangle on the top-right, the same size. Now your cat has two pointy ears!',
   alt:'The same circle with two pointed cat ears added on top.'},
  {file:'how-to-draw-a-cat-step-03.png',w:1080,h:1920,title:'Make the face',
   detail:'Inside the circle, draw two little round eyes, side by side. Below them, draw a tiny upside-down triangle for the nose. Under the nose, add two small curved lines to make a smile.',
   alt:'The cat face: two round eyes, a small triangle nose and a curved smile inside the circle.'},
  {file:'how-to-draw-a-cat-step-04.png',w:1080,h:1920,title:'Draw the whiskers',
   detail:'Start at the left side of the face, on the cheek. Draw three short straight lines going outward, one above the other. Do the same on the right cheek. Now your cat has six whiskers!',
   alt:'The cat face with three long whiskers added on each cheek.'},
  {file:'how-to-draw-a-cat-step-05.png',w:1080,h:1920,title:'Draw the body and tail',
   detail:'Start just below the head. Draw a long curved line down the left side and another down the right side to make a rounded body. From the bottom of the head, draw two long lines down to the bottom — these are the front legs. At the bottom, draw two small rounded paws next to each other, with two tiny lines inside each paw for the toes. On the right side of the body, draw a long curved line that goes outward and curls upward. Draw another curved line beside it and join the tips to make a thick, curly tail.',
   alt:'The cat now has a rounded body, two front paws and a long curled tail.'},
  {file:'how-to-draw-a-cat-step-06.png',w:1080,h:1920,title:'Color your cat',
   detail:'Pick your favorite crayon. Color the cat’s head, body, paws, and tail. Try orange for the fur and pink for the inside of the ears. You can add two pink circles for cheeks, just like the picture. Leave the eyes and nose dark and easy to see.',
   alt:'The finished cartoon cat, colored orange with pink ears and pink cheeks.'}
 ]
};

export const howToDrawDog={
 path:'/how-to-draw-a-dog/',
 slug:'dog',
 animal:'dog',
 folder:'how-to-draw-a-dog/',
 seoTitle:'How to Draw a Dog – Easy Step-by-Step Drawing for Kids',
 title:'How to Draw a Dog – Easy Step-by-Step Drawing for Kids',
 h1:'How to Draw a Dog',
 subtitle:'Easy Drawing for Kids in 6 Steps',
 description:'Learn how to draw a cute dog in 6 easy steps! A fun and simple drawing tutorial for preschoolers and kids.',
 eyebrow:'ACTIVITIES · DRAWING · AGES 3–6',
 intro:'Six big steps from one circle to a finished dog. All you need is paper, a pencil and your favorite colors — crayons work too.',
 grownups:'Sit together and draw side by side. A wobbly circle makes the friendliest dog.',
 complete:'You drew a dog!',
 supplies:['Paper','A pencil','Crayons or markers'],
 sibling:{href:'/how-to-draw-a-cat/',label:'Draw a cat next'},
 steps:[
  {file:'how-to-draw-a-dog-step-01.png',w:1240,h:1748,title:'Draw the head',
   detail:'Put your pencil in the upper half of your paper. Draw one large round circle, like a balloon. Leave plenty of room underneath for the puppy’s body.',
   alt:'A big circle drawn with one thick dark pencil line.'},
  {file:'how-to-draw-a-dog-step-02.png',w:1240,h:1748,title:'Add floppy ears',
   detail:'Start at the top-left side of the head. Draw a long curved shape hanging down like a soft leaf. Repeat on the right side. Make both ears hang beside the puppy’s cheeks.',
   alt:'The circle with two long floppy ears added on either side.'},
  {file:'how-to-draw-a-dog-step-03.png',w:1240,h:1748,title:'Draw the puppy’s face',
   detail:'Inside the head, draw two small circles for eyes. Below them, draw a little oval for the nose. Under the nose, draw one wide curved line to make a happy smile.',
   alt:'The dog face: two round eyes, an oval nose and a wide smile inside the circle.'},
  {file:'how-to-draw-a-dog-step-04.png',w:1240,h:1748,title:'Draw the body',
   detail:'Start just underneath the head. Draw one curved line downward on the left and another on the right. Connect them with a rounded line at the bottom to make an oval-shaped body.',
   alt:'The dog head with an oval body added below it.'},
  {file:'how-to-draw-a-dog-step-05.png',w:1240,h:1748,title:'Add paws and tail',
   detail:'At the bottom of the body, draw two small rounded paws side by side. Add two short lines inside each paw to show the toes. On the right side of the body, draw a curved line going outward and upward. Draw a second line back toward the body to make a wagging tail.',
   alt:'The dog now has two front paws and a curled tail.'},
  {file:'how-to-draw-a-dog-step-06.png',w:1240,h:1748,title:'Color your puppy',
   detail:'Use a light-brown crayon to color the puppy’s head, body, paws, and tail. Make the floppy ears a darker brown. Color the nose dark, and leave the eyes white and shiny so they sparkle.',
   alt:'The finished cartoon dog, colored brown with darker brown ears.'}
 ]
};

export const drawingTutorials=[howToDrawCat,howToDrawDog];
export const drawingBase=t=>R2_DRAWING+t.folder;
const stepUrl=(t,i)=>drawingBase(t)+t.steps[i].file;

/* ------------------------------------------------------------ the body */
export function drawingTutorialBody(t){
 const crumbs=`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/activities/">Activities</a><span aria-hidden="true">/</span><a href="/activities/#drawing">Drawing</a><span aria-hidden="true">/</span><span aria-current="page">${esc(t.h1)}</span></nav>`;
 const steps=t.steps.map((s,i)=>`<figure class="dt-step" data-dt-step aria-label="Step ${i+1} of ${t.steps.length}"><div class="dt-stage"><img src="${stepUrl(t,i)}" alt="${esc(s.alt)}" width="${s.w}" height="${s.h}"${i<2?'':' loading="lazy"'} decoding="async"></div><figcaption class="dt-say"><span class="dt-stepnum">Step ${i+1}</span><span class="dt-steptitle">${esc(s.title)}</span><span class="dt-detail">${esc(s.detail)}</span><button type="button" class="button button-ghost dt-listen" data-dt-say hidden>Listen to this step</button></figcaption></figure>`).join('\n');
 const dots=t.steps.map((_,i)=>`<span class="dt-dot${i===0?' is-on':''}" data-dt-dot></span>`).join('');
 return `${crumbs}
 <section class="wrap section compact"><span class="eyebrow">${t.eyebrow}</span>
 <h1>${esc(t.h1)}</h1>
 <p class="dt-sub">${esc(t.subtitle)}</p>
 <p class="dt-lede">${esc(t.intro)}</p>
 <div class="dt" data-drawing-tutorial>
  <div class="dt-topbar">
   <p class="dt-count" data-dt-count aria-live="polite" hidden>Step 1 of ${t.steps.length}</p>
   <span class="dt-dots" data-dt-dots aria-hidden="true" hidden>${dots}</span>
  </div>
  <div class="dt-steps">${steps}</div>
  <div class="dt-controls">
   <button type="button" class="button button-ghost" data-dt-prev hidden>Previous step</button>
   <button type="button" class="button" data-dt-next hidden>Next step</button>
  </div>
  <div class="dt-complete" data-dt-complete hidden>
   <p class="dt-cheer">${esc(t.complete)}</p>
   <div class="hero-actions">
    <button type="button" class="button" data-dt-restart>Draw it again</button>
    <a class="button button-ghost" href="${t.sibling.href}">${esc(t.sibling.label)}</a>
    <a class="button button-ghost" href="/activities/">Back to Activities</a>
   </div>
  </div>
  <p class="dt-hint">For grown-ups: ${esc(t.grownups)} Paper, a pencil and something to color with are all this lesson needs.</p>
  <div class="hero-actions dt-back"><a class="button button-ghost" href="/activities/">Back to Activities</a></div>
 </div>
 </section>`;
}

/* --------------------------------------------------- structured data */
export function drawingSchema(t,site){
 const bc={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[['Home','/'],['Activities','/activities/'],['Drawing','/activities/#drawing'],[t.h1,t.path]].map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:site+path}))};
 const howTo={'@context':'https://schema.org','@type':'HowTo',name:t.h1,description:t.description,image:stepUrl(t,t.steps.length-1),
  supply:t.supplies.map(s=>({'@type':'HowToSupply',name:s})),
  step:t.steps.map((s,i)=>({'@type':'HowToStep',position:i+1,name:`Step ${i+1}: ${s.title}`,text:s.detail,image:stepUrl(t,i)}))};
 return [howTo,bc];
}

/* --------------------------- the Activities → Drawing shelf card */
export function drawingCard(t){
 const last=t.steps[t.steps.length-1];
 return `<a class="dt-card" href="${t.path}"><span class="dt-card-stage"><img src="${stepUrl(t,t.steps.length-1)}" alt="${esc(last.alt)}" width="${last.w}" height="${last.h}" loading="lazy" decoding="async"></span><span class="dt-card-copy"><strong>${esc(t.h1)}</strong><span>${esc(t.subtitle)}</span><span class="fc-open">Start drawing <span aria-hidden="true">↗</span></span></span></a>`;
}
export function drawingShelf(){
 return `<div class="dt-shelf" id="drawing"><div class="dt-shelf-head"><h2>How to draw — step by step</h2><p>Big, friendly drawing lessons for little artists: one step at a time, from a first circle to a finished picture. Ages 3–6, free, no sign-up.</p></div><div class="dt-shelf-grid">${drawingTutorials.map(drawingCard).join('')}</div></div>`;
}
