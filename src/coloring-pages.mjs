// Kiddo School — Coloring Pages: "Shape Coloring Fun" for Toddler 3 (Age 2),
// Class 9 · Colors and Shapes.
// Twenty original Canva coloring sheets the owner uploaded to
// school/toddler/2-years/colors-and-shapes/ (all verified 1545×2000 portrait,
// audited image by image — nothing is guessed from filenames).
//
// THE ACTIVITY is the learning-path page: /toddler/2-years/colors-and-shapes/coloring/{slug}/
//   LEFT: the full original picture (never cropped) with the transparent
//   write-color drawing layer directly on top — pencil, colors, eraser,
//   undo, redo, clear, save; mouse, finger and stylus all work. The
//   child's strokes are saved per child and restored when they come back.
//   RIGHT: simple text instructions and the drawing tools, with Previous /
//   Next activities.
// THE PRINTABLE page: /coloring-pages/shapes/{slug}/ — download the original
//   WebP, print, share, family reactions and parent reviews (the school's
//   existing moderated system), Start Coloring Online, Previous / Next and
//   related pages. No drawing canvas on printables, and no PDFs: Canva made
//   the artwork, the school adds only the functionality.
// Progress saves per selected child in the site's existing localStorage
// store, in its own 'coloring' band. Opening a page never completes
// anything — only a real save of the child's own colored picture does.
import {R2,crumbNav,esc} from './adventure-kit.mjs';
import {fcCommunityMount} from './flashcards/index.mjs';

export const CP_BASE=R2+'school/toddler/2-years/colors-and-shapes/';
export const CP_CLASS_PATH='/toddler/2-years/colors-and-shapes/';
export const CP_ACT_PATH=CP_CLASS_PATH+'coloring/';
export const CP_HUB='/coloring-pages/';
export const CP_LIB=CP_HUB+'shapes/';

export const W=1545,H=2000; /* every sheet, probed from the real files */

/* The category cover — drawn in code (PIL) in the school's own palette and
   shipped from this repo (1545x2000, the folder's standard size). It is the
   FACE of the Shapes category (hub card, category hero, og:image) and NEVER
   an activity: it stays out of the registry, the grids, the prev/next
   chains and every individual page. */
export const CP_COVER={file:'/assets/coloring/shapes-cover.webp',w:1545,h:2000,
 alt:'The Shapes coloring pages cover: five bold-outlined shapes — a circle, a window square, a triangle, a star and a heart — with crayon dots in the Kiddo colors.',
 get url(){return this.file;}};

const G=o=>o;
export const coloringPages=[
G({slug:'circle',img:'circle.webp',
 title:'Circle',label:'Circle',
 tag:'One big circle, ready for its first crayon.',
 meta:'A printable circle coloring page for 2-year-olds: one big bold circle to color, trace and talk about — on paper or on screen with finger, stylus or mouse.',
 alt:'A big bold-outlined circle filling the middle of a white coloring page.',
 steps:[
  ['Color it','Color the big circle. Staying inside the line is a bonus, not a rule.'],
  ['Trace it','Trace around the circle line with your finger — round and round.'],
  ['Find one','Find a circle near you — a plate, a cup, a wheel — and say “circle!”']
 ],
 skills:['Shape naming','Crayon grip and control','Round-hand movements','Talking about shapes'],
 grown:'Circles are everywhere once you look: plates, clocks, buttons. After coloring, hunt one real circle together and the word sticks for good.'
}),
G({slug:'two-circles',img:'two-circles.webp',
 title:'Two Circles',label:'Two Circles',
 tag:'Two circles — one up high, one down low.',
 meta:'A printable two-circles coloring page for toddlers: one circle up high and one down low to color, count and compare — on paper or on screen.',
 alt:'Two bold-outlined circles on a white coloring page, one near the top and one near the bottom.',
 steps:[
  ['Count them','Point and count: one circle… two circles!'],
  ['Color them','Give each circle a color — the same or different, your toddler decides.'],
  ['Find them','Find two round things at home and count them too.']
 ],
 skills:['Counting to two','Same and different','Shape naming','Crayon control'],
 grown:'Up high, down low — reach for each circle as you name where it is. Position words grow right alongside the counting.'
}),
G({slug:'circle-and-beach-ball',img:'circle-and-beach-ball.webp',
 title:'Circle and Beach Ball',label:'Circle & Beach Ball',
 tag:'A plain circle and a beach ball — the circle went to the seaside!',
 meta:'A printable beach-ball coloring page for 2-year-olds: a plain circle beside a segmented beach ball to color, compare and name — on paper or on screen.',
 alt:'A plain bold-outlined circle above a beach ball drawn with curved panel lines and a little center circle.',
 steps:[
  ['Compare','One circle is plain and one is a beach ball — point to each one.'],
  ['Color the ball','Color every slice of the beach ball a different color.'],
  ['Bounce','Done coloring? Bounce like a ball three times!']
 ],
 skills:['Shapes in real objects','Color variety','Comparing two pictures','Gross-motor play'],
 grown:'Ask “which one could we take to the beach?” — linking the drawing to a real object is exactly the kind of talk that grows vocabulary at two.'
}),
G({slug:'square',img:'square.webp',
 title:'Square',label:'Square',
 tag:'One big square with four straight sides.',
 meta:'A printable square coloring page for 2-year-olds: one big bold square to color, trace and find at home — on paper or on screen.',
 alt:'A big bold-outlined square filling the middle of a white coloring page.',
 steps:[
  ['Color it','Color the whole square with your favorite crayon.'],
  ['Trace it','Trace the four sides with your finger: down, across, up, across.'],
  ['Find one','Find a square near you — a window, a cushion, a cracker.']
 ],
 skills:['Shape naming','Straight-line tracing','Crayon control','Talking about shapes'],
 grown:'Corners are the square’s secret — trace a corner with your toddler’s finger and say “corner!”. Four sides, four corners, one proud discovery.'
}),
G({slug:'pillow-and-square',img:'pillow-and-square.webp',
 title:'Pillow and Square',label:'Pillow & Square',
 tag:'A comfy pillow and a plain square — squares are soft too!',
 meta:'A printable pillow-and-square coloring page for toddlers: a soft pillow shape beside a plain square to color and compare — on paper or on screen.',
 alt:'A pillow shape with soft wavy corners above a plain rounded-corner square.',
 steps:[
  ['Compare','A pillow and a square — how are they the same? How are they different?'],
  ['Color both','Color the pillow and the square — maybe the same color, maybe not.'],
  ['Find one','Find a real pillow and pat its soft corners.']
 ],
 skills:['Shapes in real objects','Same and different','Shape naming','Crayon control'],
 grown:'The pillow IS almost a square — that “almost” is the whole lesson. Soft things have soft corners, and your toddler just met geometry on the sofa.'
}),
G({slug:'square-and-gift-box',img:'square-and-gift-box.webp',
 title:'Square and Gift Box',label:'Square & Gift Box',
 tag:'A plain square and a present with a bow — which one would you open?',
 meta:'A printable gift-box coloring page for 2-year-olds: a plain square beside a gift box with a bow to color, compare and chatter about — on paper or on screen.',
 alt:'A plain bold-outlined square above a gift box with a lid band and a two-loop bow.',
 steps:[
  ['Compare','Point to the plain square, then to the gift box.'],
  ['Color the present','Color the box and the bow — birthday colors!'],
  ['Pretend','Wrap it up: who is the present for? Say it out loud.']
 ],
 skills:['Shapes in real objects','Pretend play','Color choice','Comparing pictures'],
 grown:'Squares hide inside presents, boxes and biscuits. The bow is the fiddly bit — let your toddler color it any color they like; wrapping-paper rules do not apply here.'
}),
G({slug:'triangle',img:'triangle.webp',
 title:'Triangle',label:'Triangle',
 tag:'One big triangle with three pointy corners.',
 meta:'A printable triangle coloring page for 2-year-olds: one big bold triangle to color, trace and find — on paper or on screen.',
 alt:'A big bold-outlined triangle filling the middle of a white coloring page.',
 steps:[
  ['Color it','Color the whole triangle in one go — big arm moves!'],
  ['Count corners','Touch each pointy corner and count: one, two, three!'],
  ['Find one','Find a triangle at home — a slice of pizza, a roof, a ramp.']
 ],
 skills:['Shape naming','Counting corners','Crayon control','Talking about shapes'],
 grown:'Three sides, three corners — touch each corner while counting. The pointing finger teaches the number better than any flashcard.'
}),
G({slug:'tall-triangle',img:'tall-triangle.webp',
 title:'Tall Triangle',label:'Tall Triangle',
 tag:'A stretched-up triangle — taller than it is wide.',
 meta:'A printable tall-triangle coloring page for toddlers: a long, stretched triangle to color and compare with a regular one — on paper or on screen.',
 alt:'A tall, narrow bold-outlined triangle standing up on a white coloring page.',
 steps:[
  ['Reach up','This triangle is TALL — reach your hands up high like its point.'],
  ['Color it','Color from the top point all the way down to the bottom.'],
  ['Compare','Remember the first triangle? This one is stretched tall!']
 ],
 skills:['Tall and short','Shape naming','Big arm movements','Comparing shapes'],
 grown:'Tall and short is a size word two-year-olds can act out — stretch up tall like this triangle, then squat small. The coloring comes with a stretching game.'
}),
G({slug:'triangle-and-house',img:'triangle-and-house.webp',
 title:'Triangle and House',label:'Triangle & House',
 tag:'A pointy-down triangle and a triangle roof — triangles build houses!',
 meta:'A printable triangle coloring page for 2-year-olds: an upside-down triangle shape and a little house with a triangle roof to color and talk about.',
 alt:'An upside-down triangle with a curved band along its top edge, above a little house with a triangle roof and a square body.',
 steps:[
  ['Spot them','One triangle points DOWN, and one sits on the house as a roof.'],
  ['Color the house','Color the roof and the walls — what color is your house?'],
  ['Color the top shape','The pointy-down shape looks like a slice of pizza — yum!']
 ],
 skills:['Shapes in real objects','Direction words (upside down)','Color choice','Pretend talk'],
 grown:'Triangles are useful: roofs, pizza slices, ramps. Walk past a real roof this week and say “triangle!” — the shape leaves the page and joins the world.'
}),
G({slug:'triangle-sandwich-and-mountain',img:'triangle-sandwich-and-mountain.webp',
 title:'Triangle Sandwich and Mountain',label:'Sandwich & Mountain',
 tag:'A sandwich wedge and a two-peak mountain — triangles you can eat and climb!',
 meta:'A printable sandwich-and-mountain coloring page for toddlers: a sandwich wedge and a pointy mountain, both built from triangles — on paper or on screen.',
 alt:'A sandwich wedge drawn in three layers above a mountain outline with two peaks.',
 steps:[
  ['Spot the triangles','A sandwich and a mountain — both are full of triangles!'],
  ['Color the sandwich','Color the bread and the filling — what goes in YOUR sandwich?'],
  ['Color the mountain','Color the mountain brown or gray — or rainbow, if you like.']
 ],
 skills:['Shapes in real objects','Pretend talk','Color choice','Comparing pictures'],
 grown:'Lunch is a shape hunt: sandwiches, pizza, cheese in triangles. Point at the mountain and ask “could we climb it?” — silly questions get the best answers.'
}),
G({slug:'rectangle',img:'rectangle.webp',
 title:'Rectangle',label:'Rectangle',
 tag:'One big rectangle — two long sides, two short sides.',
 meta:'A printable rectangle coloring page for 2-year-olds: one big bold rectangle to color, trace and find at home — on paper or on screen.',
 alt:'A wide bold-outlined rectangle filling the middle of a white coloring page.',
 steps:[
  ['Color it','Color the big rectangle with long, swoopy strokes.'],
  ['Trace it','Trace the long side… and the short side. Long and short!'],
  ['Find one','Find a rectangle near you — a door, a book, a table top.']
 ],
 skills:['Shape naming','Long and short','Crayon control','Talking about shapes'],
 grown:'Doors and books are rectangles hiding in plain sight. Trace the long side and the short side with one finger each — the size words do the teaching.'
}),
G({slug:'tall-rectangle',img:'tall-rectangle.webp',
 title:'Tall Rectangle',label:'Tall Rectangle',
 tag:'A stretched-up rectangle — like a tower!',
 meta:'A printable tall-rectangle coloring page for toddlers: a long, standing rectangle to color and compare with a wide one — on paper or on screen.',
 alt:'A tall, narrow bold-outlined rectangle standing upright on a white coloring page.',
 steps:[
  ['Reach up','This rectangle stands tall like a tower — stretch up with it!'],
  ['Color it','Color top to bottom, like rain running down a window.'],
  ['Compare','The first rectangle lay down; this one stands up!']
 ],
 skills:['Tall and short','Shape naming','Top-to-bottom strokes','Comparing shapes'],
 grown:'Lying down or standing up — same shape, different mood. Two-year-olds love flipping the words: stand tall like the rectangle, lie flat like the other one.'
}),
G({slug:'rectangle-and-bus',img:'rectangle-and-bus.webp',
 title:'Rectangle and Bus',label:'Rectangle & Bus',
 tag:'A plain rectangle and a bus — the rectangle grew wheels!',
 meta:'A printable bus coloring page for 2-year-olds: a plain rectangle beside a bus body with two round wheels to color and compare — on paper or on screen.',
 alt:'A tall plain rectangle above a long rounded bus body with two circle wheels underneath.',
 steps:[
  ['Compare','One shape is plain; one is a BUS. Wheels are circles!'],
  ['Color the bus','Color the bus — is it a red bus, a blue bus, a rainbow bus?'],
  ['Drive it','Vroom! Drive your finger around the bus while you make the sound.']
 ],
 skills:['Shapes in real objects','Round and straight','Pretend play','Color naming'],
 grown:'Wheels on the bus — and every wheel is a circle sitting on a rectangle. Sing the song while coloring and the shapes ride along for free.'
}),
G({slug:'oval',img:'oval.webp',
 title:'Oval',label:'Oval',
 tag:'A stretched-out circle — an oval!',
 meta:'A printable oval coloring page for 2-year-olds: one big oval to color, trace and compare with a circle — on paper or on screen.',
 alt:'A big bold-outlined oval standing upright on a white coloring page.',
 steps:[
  ['Color it','Color the oval with slow, gentle strokes — it is a squished circle.'],
  ['Trace it','Trace all the way around — it goes on and on, no corners!'],
  ['Find one','Find an oval — an egg, a balloon, a mirror.']
 ],
 skills:['Shape naming','Round-hand control','Comparing shapes','Talking about shapes'],
 grown:'An oval is a circle that stretched. Stretch your arms wide when you say “oooorval” — body memory beats memory alone at this age.'
}),
G({slug:'two-ovals',img:'two-ovals.webp',
 title:'Two Ovals',label:'Two Ovals',
 tag:'Two oval rings — one standing tall, one lying flat.',
 meta:'A printable two-ovals coloring page for toddlers: a standing oval ring and a lying-flat oval ring, each with a border to color carefully — on paper or on screen.',
 alt:'Two double-outlined oval rings: a tall upright one near the top and a wide flat one near the bottom.',
 steps:[
  ['Compare','One oval stands UP and one lies DOWN — point to each.'],
  ['Color the rings','Color the flat ring like a plate and the tall one like a balloon.'],
  ['Trace carefully','Trace the ring path — round and round between the two lines.']
 ],
 skills:['Position words','Careful tracing','Shape naming','Comparing shapes'],
 grown:'The double lines make a perfect first “stay on the path” game. Finger first, crayon second — the ring between two lines is honest fine-motor work.'
}),
G({slug:'egg-shape',img:'egg-shape.webp',
 title:'Egg Shape',label:'Egg Shape',
 tag:'One big egg — an oval with a secret: which end is up?',
 meta:'A printable egg coloring page for 2-year-olds: one big egg outline to color, decorate and talk about — on paper or on screen.',
 alt:'A big bold egg outline — an oval with a narrower top — on a white coloring page.',
 steps:[
  ['Spot it','It looks like an oval… but one end is smaller. It is an EGG!'],
  ['Color it','Color the egg — speckles welcome.'],
  ['Gently','How does a grown-up carry an egg? Practice with gentle hands!']
 ],
 skills:['Shape naming','Gent hands','Comparing shapes','Pretend talk'],
 grown:'Egg, oval, almost twins — the little top is the only clue. Boiled-egg lunch afterward makes the whole lesson edible, which never hurts.'
}),
G({slug:'star',img:'star.webp',
 title:'Star',label:'Star',
 tag:'One big five-point star, ready to shine.',
 meta:'A printable star coloring page for 2-year-olds: one big star to color, count its points and stick on the fridge — on paper or on screen.',
 alt:'A big bold-outlined five-point star with softly rounded tips on a white coloring page.',
 steps:[
  ['Count points','Touch each point and count: one, two, three, four, five!'],
  ['Color it','Color the star yellow, gold — or your toddler’s favorite.'],
  ['Twinkle','Done? Twinkle your fingers like a star!']
 ],
 skills:['Counting to five','Shape naming','Crayon control','Pretend play'],
 grown:'Five points is real counting work. Touch each point with your toddler’s finger — the pointing finger is the best pencil a two-year-old owns.'
}),
G({slug:'heart',img:'heart.webp',
 title:'Heart',label:'Heart',
 tag:'One big heart — color it for someone you love.',
 meta:'A printable heart coloring page for toddlers: one big heart to color and give away — on paper or on screen with finger, stylus or mouse.',
 alt:'A big bold-outlined heart on a white coloring page.',
 steps:[
  ['Color it','Color the heart — pink, red, or every color at once.'],
  ['Trace it','Trace the two bumps on top, down to the point.'],
  ['Give it','Who gets this heart? A hug goes with it!']
 ],
 skills:['Shape naming','Gentle strokes','Talking about feelings','Giving'],
 grown:'This one is a gift page: the finished heart goes to someone your toddler names. Shapes with feelings attached are the ones that get remembered.'
}),
G({slug:'apple-and-banana',img:'apple-and-banana.webp',
 title:'Apple and Banana',label:'Apple & Banana',
 tag:'An apple with its leaf and a big curved banana — snack-time shapes.',
 meta:'A printable apple-and-banana coloring page for 2-year-olds: an apple with a stem and leaf beside a curved banana to color and snack-talk about — on paper or on screen.',
 alt:'An apple outline with a stem and one leaf beside a long curved banana.',
 steps:[
  ['Name them','An apple and a banana — which one do you like to munch?'],
  ['Color them','Red or green apple? Yellow banana? Color your snack!'],
  ['Find them','Find a real apple or banana in the kitchen and say hello.']
 ],
 skills:['Food naming','Color naming','Curved-line coloring','Real-world links'],
 grown:'Snack is the sequel: color the apple, then eat a real one. “Round like a circle, long like a banana” quietly revisits every shape from this class.'
}),
G({slug:'book-and-phone',img:'book-and-phone.webp',
 title:'Book and Phone',label:'Book & Phone',
 tag:'A book and a phone — rectangles you already love.',
 meta:'A printable book-and-phone coloring page for toddlers: a book beside a phone, both friendly rectangles to color and talk about — on paper or on screen.',
 alt:'A closed book drawn at a slight tilt with its pages showing, above a rounded rectangle phone with an inner screen outline.',
 steps:[
  ['Name them','A book and a phone — which one does story time live in?'],
  ['Color them','Color the book any color books come in — and the phone too.'],
  ['Pretend','Hello hello! Pretend to call someone you love from the picture phone.']
 ],
 skills:['Shapes in real objects','Pretend play','Color choice','Book love'],
 grown:'Both pictures are rectangles your toddler already uses. End with the real thing: color the book, then read one — the page and the day shaking hands.'
})
];

export const coloringBySlug=Object.fromEntries(coloringPages.map(a=>[a.slug,a]));

export function cpNeighbours(a){
 const i=coloringPages.indexOf(a);
 return {prev:coloringPages[(i-1+coloringPages.length)%coloringPages.length],next:coloringPages[(i+1)%coloringPages.length]};
}

const shareBlock=(eyebrow,heading,url,title,media)=>{
 const enc=encodeURIComponent;
 const pin=media?`<a class="fc2-share-btn" href="https://pinterest.com/pin/create/button/?url=${enc(url)}&media=${enc(media)}&description=${enc(title)}" target="_blank" rel="noopener" aria-label="Save this on Pinterest">Pinterest</a>`:'';
 return `<div class="fc2-block fc2-share-block"><span class="eyebrow">${eyebrow}</span><h2>${heading}</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}" target="_blank" rel="noopener" aria-label="Share on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(url)}" target="_blank" rel="noopener" aria-label="Share on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(title+' '+url)}" target="_blank" rel="noopener" aria-label="Share on WhatsApp">WhatsApp</a>${pin}<button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div><p class="fc-hint">Share buttons open in a new tab. The copy button copies this page&rsquo;s address — nothing is tracked.</p></div>`;
};

/* ---------- the "Shape Coloring Fun" section on the Class 9 page ---------- */
export function coloringFunSection(){
 const cards=coloringPages.map((a,i)=>`<a class="sa-card" href="${CP_ACT_PATH}${a.slug}/" data-coloring-card="${a.slug}">
   <span class="sa-card-num" aria-hidden="true">${i+1}</span>
   <span class="sa-card-done" data-cp-done hidden>Cleared!</span>
   <img src="${CP_BASE}${a.img}" width="772" height="1000" alt="Coloring sheet ${i+1}: ${esc(a.tag)}" loading="lazy">
   <span class="sa-card-body"><strong>${a.label}</strong><span class="sa-card-tag">${esc(a.tag)}</span><span class="sa-card-skill">Color it on screen with your finger, a stylus or the mouse</span></span>
   <span class="sa-card-play">Start coloring <span aria-hidden="true">→</span></span>
  </a>`).join('');
 return `<section class="wrap lesson-section" id="shape-coloring-fun" aria-label="Shape coloring fun">
  <span class="eyebrow">SHAPE COLORING FUN</span>
  <h2>Color every shape — right on the screen.</h2>
  <p class="lesson-copy">Twenty big, friendly coloring pages made for two-year-old hands: your child colors straight on the picture with a finger, a stylus or the mouse — pencil, crayons, eraser, undo and redo included. The picture sits on the left, the instructions sit beside it in read-aloud words, and every stroke is saved for your child in <a href="/my-classroom/">My Classroom</a> so they can come back and keep coloring.</p>
  <div class="sa-grid">${cards}</div>
  <p class="lesson-note">Prefer crayons on paper? Every picture also has a printable twin in the new <a href="${CP_LIB}">Coloring Pages — Shapes</a> library — download and print.</p>
 </section>`;
}

/* ---------- the interactive activity page (the learning-path experience) ---------- */
export function coloringActivityBody(a,site){
 const {prev,next}=cpNeighbours(a);
 const pageUrl=site+CP_ACT_PATH+a.slug+'/';
 const stepsHtml=a.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${i+1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
 const pn=`<nav class="fc2-pn" aria-label="Previous and next coloring activity"><a class="fc2-pn-btn" href="${CP_ACT_PATH}${prev.slug}/" rel="prev"><span aria-hidden="true">←</span> <strong>${prev.label}</strong><span>Previous coloring page</span></a><a class="fc2-pn-btn fc2-pn-next" href="${CP_ACT_PATH}${next.slug}/" rel="next"><strong>${next.label}</strong> <span aria-hidden="true">→</span><span>Next coloring page</span></a></nav>`;
 return `${crumbNav([['Learning Path','/learning-path/'],['Colors &amp; Shapes','/toddler/2-years/colors-and-shapes/'],[a.label]])}
 <div class="page-heading wrap"><span class="eyebrow">SHAPE COLORING FUN \u00b7 TODDLER 3 \u00b7 AGE 2</span><h1>Color the ${esc(a.title)}</h1><p>${esc(a.tag)}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main">
   <section class="wc-section" aria-label="The coloring page — color right on it" id="the-activity">
    <div class="wc-head"><span class="eyebrow">THE PICTURE — COLOR RIGHT ON IT</span><h2>Your picture is ready.</h2><p class="lesson-copy">Pick a crayon, then color straight on the picture with your finger, a stylus or the mouse. Press Save my work when you are proud — your colors stay here for next time, and the picture is yours to keep.</p></div>
    <div class="wc-mount" data-coloring-activity="${a.slug}" data-wc data-wc-src="${esc(CP_BASE+a.img)}?draw=1" data-wc-name="${esc(a.title)} coloring page" data-wc-w="${W}" data-wc-h="${H}" data-wc-toolbar="#cp-tools" data-wc-restore="coloring/${a.slug}">
     <figure class="fc2-hero ws-hero-art"><img src="${esc(CP_BASE+a.img)}?draw=1" width="${W}" height="${H}" alt="${esc(a.alt)}" fetchpriority="high" crossorigin="anonymous"></figure>
    </div>
    <noscript><p class="fc-hint">Coloring on the screen needs JavaScript. The printable twin at <a href="${CP_LIB}${a.slug}/">/coloring-pages/shapes/${a.slug}/</a> always works — crayons included.</p></noscript>
   </section>
   ${pn}
  </div>
  <aside class="fc2-rail" aria-label="Instructions, drawing tools and saved progress">
   <section class="fc2-block fc2-first-block"><span class="eyebrow">HOW TO DO IT</span><h2>Three little steps.</h2><ol class="fc-steps">${stepsHtml}</ol><p class="fc-hint">Ask a grown-up to read the steps aloud the first time. After that, you know just what to do.</p></section>
   <section class="fc2-block" id="cp-tools" aria-label="Drawing tools"><span class="eyebrow">YOUR PENCIL CASE</span><h2>Pick your tools.</h2><p class="fc-hint">Pencil, pen, fill, three line sizes, nine crayons, an eraser, undo, redo and clear — the tools appear right here and work on the picture. Fill floods a region with your color and stops at the sheet's own bold lines. Save keeps your finished art and remembers it for next time.</p></section>
   <section class="fc2-block" data-cp-progress-block><span class="eyebrow">MY PROGRESS</span><h2>Save it to keep it.</h2><p class="ls-progress-line" data-cp-progress aria-live="polite">This page is cleared for you the moment you save your finished picture. Nothing counts until then — opening the page is just opening the door.</p><p class="ls-progress-done" data-cp-done hidden><strong>Cleared!</strong> Your colored picture is saved on this device for your child, and the ribbon is on in <a href="${CP_CLASS_PATH}">Class 9</a>. Come back any time — your colors will be waiting.</p></section>
   ${shareBlock('SHARE THIS ACTIVITY','Pass it on.',pageUrl,`${a.title} coloring page — from Kiddo.school`,false)}
   <section class="fc2-block"><span class="eyebrow">PREFER PAPER?</span><h2>Print the twin.</h2><p class="fc-hint">The same picture lives in the Coloring Pages library with its download and print buttons: <a href="${CP_LIB}${a.slug}/">/coloring-pages/shapes/${a.slug}/</a>. Crayons beat styluses sometimes.</p></section>
  </aside>
 </div>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>What this page practises.</h2>
  <p class="lesson-copy">${esc(a.grown)}</p>
  <ul class="ws-skills">${a.skills.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>
  <p class="lesson-copy">This activity belongs to <a href="${CP_CLASS_PATH}">Class 9 — Colors and Shapes (Age 2)</a> on the Learning Path, and the printable twin lives in <a href="${CP_LIB}">Coloring Pages — Shapes</a>. Progress is saved on this device for the child chosen in <a href="/my-classroom/">My Classroom</a> — and only a real save of finished work marks it cleared, never just opening the page.</p>
 </section>
 ${fcCommunityMount(CP_ACT_PATH+a.slug+'/')}`;
}

/* ---------- the Coloring Pages hub + the Shapes category ---------- */
export function coloringHubBody(){
 return `${crumbNav([['Coloring Pages']])}
 <div class="page-heading wrap"><span class="eyebrow">COLORING PAGES \u00b7 FREE PRINTABLES</span><h1>Coloring Pages — big pictures for little crayons.</h1><p>Printable coloring pages for toddlers and preschoolers, drawn for small hands and fat crayons. Download the original picture, print it clean, or color the same picture on screen first — every page does both.</p></div>
 <section class="wrap section compact" aria-label="Coloring page categories">
  <div class="ws-grid">
   <a class="ws-card" href="${CP_LIB}">
    <span class="ws-card-art"><img src="${esc(CP_COVER.url)}" width="${CP_COVER.w}" height="${CP_COVER.h}" alt="${esc(CP_COVER.alt)}" loading="lazy"></span>
    <span class="ws-card-body"><strong>Shapes Coloring Pages</strong><span class="ws-card-meta"><span>Ages 2–4</span><span>20 pages</span><span>Toddler 3 · Class 9</span></span><span class="ws-card-desc">Circles, squares, triangles, ovals, stars and hearts — plus the beach balls, buses, houses and snacks they grow into.</span></span>
    <span class="ws-card-open">Browse Shapes <span aria-hidden="true">→</span></span>
   </a>
  </div>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">TWO WAYS TO COLOR</span><h2>On paper, or right on the screen.</h2>
  <div class="fc-stages">
   <a class="fc-stage lesson-card-link" href="${CP_LIB}"><div class="fc-stage-pills"><span class="fc-age">Ages 2–4</span><span class="fc-class">Print</span></div><h3>Shapes Coloring Pages</h3><p>Twenty pages to download and print — real crayons, real fridge door.</p><span class="fc-open">Open Shapes <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="${CP_ACT_PATH}circle/"><div class="fc-stage-pills"><span class="fc-age">Age 2</span><span class="fc-class">On screen</span></div><h3>Shape Coloring Fun — Class 9</h3><p>Color the same twenty pictures on screen with the drawing layer, one shape class at a time.</p><span class="fc-open">Open the class <span aria-hidden="true">↗</span></span></a>
  </div>
 </section>`;
}

export function coloringCategoryBody(){
 const cards=coloringPages.map(w=>`<a class="ws-card" href="${CP_LIB}${w.slug}/">
  <span class="ws-card-art"><img src="${esc(CP_BASE+w.img)}" width="772" height="1000" alt="${esc(w.alt)}" loading="lazy"></span>
  <span class="ws-card-body"><strong>${w.label} Coloring Page</strong><span class="ws-card-meta"><span>Age 2+</span><span>Shapes</span></span><span class="ws-card-desc">${esc(w.tag)}</span></span>
  <span class="ws-card-open">View Coloring Page <span aria-hidden="true">→</span></span>
 </a>`).join('');
 return `${crumbNav([['Coloring Pages','/coloring-pages/'],['Shapes']])}
 <article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy">
  <span class="eyebrow">SHAPES \u00b7 20 COLORING PAGES \u00b7 AGES 2\u20134</span>
  <h1>Shapes coloring pages — circles, squares, triangles and friends.</h1>
  <p class="lesson-lede">Twenty coloring pages from the owner’s own bold, friendly artwork: one clear outline per page, with the real-world twin beside it — a circle and a beach ball, a rectangle and a bus, a triangle and a house. Tap any picture to open its page; download and print buttons live there.</p>
 </div><figure class="lesson-cover"><img src="${esc(CP_COVER.url)}" width="${CP_COVER.w}" height="${CP_COVER.h}" alt="${esc(CP_COVER.alt)}" fetchpriority="high"></figure></article>
 <section class="wrap section compact" aria-label="All shapes coloring pages">
  <div class="ws-grid">${cards}</div>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">COLOR ON SCREEN TOO</span><h2>Every page has an on-screen twin.</h2>
  <p class="lesson-copy">Each of these twenty pictures can be colored right here on the website in <a href="${CP_CLASS_PATH}">Class 9 — Colors and Shapes (Age 2)</a>: the drawing layer sits on the picture, little hands use a finger, a stylus or the mouse, and every child’s colors are saved for next time. Open the class and start with the <a href="${CP_ACT_PATH}circle/">big circle</a>.</p>
 </section>`;
}

/* ---------- the individual printable coloring page ---------- */
export function coloringPageBody(w,site){
 const {prev,next}=cpNeighbours(w);
 const file=CP_BASE+w.img;
 const pageUrl=site+CP_LIB+w.slug+'/';
 const actUrl=CP_ACT_PATH+w.slug+'/';
 const dlName=`coloring-${w.slug}.webp`;
 const stepsHtml=w.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${i+1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
 const pn=`<nav class="fc2-pn" aria-label="Previous and next coloring page"><a class="fc2-pn-btn" href="${CP_LIB}${prev.slug}/" rel="prev"><span aria-hidden="true">←</span> <strong>${prev.label}</strong><span>Previous coloring page</span></a><a class="fc2-pn-btn fc2-pn-next" href="${CP_LIB}${next.slug}/" rel="next"><strong>${next.label}</strong> <span aria-hidden="true">→</span><span>Next coloring page</span></a></nav>`;
 return `${crumbNav([['Coloring Pages','/coloring-pages/'],['Shapes','/coloring-pages/shapes/'],[w.label]])}
 <div class="page-heading wrap"><span class="eyebrow">COLORING PAGE \u00b7 SHAPES \u00b7 AGE 2+</span><h1>${w.label} Coloring Page</h1><p>${esc(w.meta)}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main">
   <section class="wc-section" aria-label="This coloring page" id="the-page">
    <div class="wc-head"><span class="eyebrow">THE COLORING PAGE</span><h2>The full picture, exactly as the artist drew it.</h2><p class="lesson-copy">See the whole picture, download the original file or print it clean — just the picture, no buttons or banners. Want to color it right now on this screen? <a href="${actUrl}">Start coloring online</a> — same picture, drawing layer included.</p></div>
    <figure class="fc2-hero ws-hero-art"><img src="${esc(file)}" width="${W}" height="${H}" alt="${esc(w.alt)}" fetchpriority="high"></figure>
   </section>
   ${pn}
   <section class="fc2-learn" aria-label="About this coloring page"><section class="ws-rail-sec" aria-label="How to use"><span class="eyebrow">HOW TO USE IT</span><h2>Three little steps.</h2><ol class="fc-steps">${stepsHtml}</ol></section>
   <section class="ws-rail-sec" aria-label="Where this fits"><span class="eyebrow">WHERE THIS FITS</span><h2>The class behind it.</h2><p class="lesson-copy">This page belongs to <a href="${CP_CLASS_PATH}">Class 9 — Colors and Shapes (Age 2)</a> on the Learning Path, and the whole collection lives at <a href="${CP_LIB}">/coloring-pages/shapes/</a>. Print it, color it together, and let the fridge door be the gallery.</p></section></section>
  </div>
  <aside class="fc2-rail" aria-label="Download, print, share and family feedback">
   <section class="fc2-block fc2-first-block"><span class="eyebrow">TAKE IT TO THE TABLE</span><h2>Download &amp; print.</h2>
    <div class="fc2-actions"><button type="button" class="button ws-dl" data-cp-download="${esc(file)}" data-cp-filename="${dlName}">Download original image <span aria-hidden="true">\u2193</span></button><button type="button" class="button button-ghost ws-print" data-cp-print>Print this page <span aria-hidden="true">\u2318</span></button></div>
    <p class="fc-hint">The download keeps the original WebP picture, full size (1545\u00d72000, A4 portrait). Print opens your browser&rsquo;s print dialog with just the picture &mdash; no header, no buttons, nothing stored.</p>
   </section>
   <div class="fc2-block"><span class="eyebrow">COLOR IT ON SCREEN</span><h2>Start Coloring Online.</h2><p class="fc-hint">The on-screen version of this picture — drawing layer, three steps, save-your-work and all — lives at <a href="${actUrl}">${actUrl}</a>.</p><div class="fc2-actions"><a class="button" href="${actUrl}">Start Coloring Online <span aria-hidden="true">↗</span></a></div></div>
   ${shareBlock('SHARE THIS PAGE','Pass it on.',pageUrl,`${w.label} Coloring Page — printable from Kiddo.school`,file)}
   ${fcCommunityMount(CP_LIB+w.slug+'/')}
  </aside>
 </div>
 <section class="wrap fc-section" aria-label="Related coloring pages"><span class="eyebrow">MORE SHAPES TO COLOR</span><h2>More coloring pages like this one.</h2>
  <div class="ws-grid">${coloringPages.filter(x=>x.slug!==w.slug).slice(0,7).map(x=>`<a class="ws-card" href="${CP_LIB}${x.slug}/"><span class="ws-card-art"><img src="${esc(CP_BASE+x.img)}" width="772" height="1000" alt="${esc(x.alt)}" loading="lazy"></span><span class="ws-card-body"><strong>${x.label} Coloring Page</strong><span class="ws-card-meta"><span>Age 2+</span><span>Shapes</span></span><span class="ws-card-desc">${esc(x.tag)}</span></span><span class="ws-card-open">View Coloring Page <span aria-hidden="true">→</span></span></a>`).join('')}</div>
  <p class="lesson-copy"><a href="${CP_LIB}">See all twenty shapes coloring pages <span aria-hidden="true">↗</span></a></p>
 </section>`;
}

/* ---------- schema helpers ---------- */
export function coloringPageSchema(site,w){
 return {'@context':'https://schema.org','@type':'LearningResource',
  name:`${w.label} Coloring Page for Toddlers`,
  description:w.meta,url:site+CP_LIB+w.slug+'/',inLanguage:'en',
  learningResourceType:'Coloring page',educationalLevel:'Toddler',teaches:w.skills.join(', '),
 ageRange:'2-4',encodingFormat:'image/webp',contentUrl:CP_BASE+w.img,image:CP_BASE+w.img,
  about:{'@type':'Thing',name:'Shapes'},
  provider:{'@type':'Organization',name:'Kiddo.school',url:site+'/'},
  isPartOf:{'@type':'CreativeWorkSeries',name:'Shape Coloring Fun (Toddler 3, Class 9)',url:site+CP_CLASS_PATH}};
}
