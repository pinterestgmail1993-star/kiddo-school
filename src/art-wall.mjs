// Kiddo School Art Wall: a preschool-style display wall. The eleven starter
// drawings are CLASSROOM EXAMPLES pinned up for viewing — they are not work by
// individual children, so no names, ages, dates or quotes exist anywhere here.
// Starter art lives in its own permanent R2 folder, separate from any future
// parent-submitted artwork (which requires a review step before it can appear).
const artWallBase='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/art-wall/starter-art/';
// Every asset below was HEAD-verified (HTTP 200) and downloaded to confirm its
// exact byte size and 1587x2245 dimensions before being listed here.
export const starterArt=[
 {file:'01-family.webp',w:1587,h:2245,bytes:450848,alt:'Child-style crayon drawing of a family'},
 {file:'02-rainbow.webp',w:1587,h:2245,bytes:739000,alt:'Child-style drawing of a colorful rainbow'},
 {file:'03-cat.webp',w:1587,h:2245,bytes:389880,alt:'Child-style crayon drawing of a cat'},
 {file:'04-house.webp',w:1587,h:2245,bytes:417124,alt:'Child-style drawing of a house'},
 {file:'05-dinosaur.webp',w:1587,h:2245,bytes:548790,alt:'Child-style drawing of a green dinosaur'},
 {file:'06-flowers.webp',w:1587,h:2245,bytes:438706,alt:'Child-style drawing of colorful flowers'},
 {file:'07-car.webp',w:1587,h:2245,bytes:484316,alt:'Child-style drawing of a red car'},
 {file:'08-happy-face.webp',w:1587,h:2245,bytes:448782,alt:'Child-style drawing of a large happy face'},
 {file:'09-under-the-sea.webp',w:1587,h:2245,bytes:602224,alt:'Child-style drawing of fish under the sea'},
 {file:'10-shapes.webp',w:1587,h:2245,bytes:594212,alt:'Child-style colorful shape drawing'},
 {file:'11-butterfly.webp',w:1587,h:2245,bytes:391080,alt:'Child-style drawing of a colorful butterfly'}
];
export const artWallOgImage=artWallBase+'02-rainbow.webp';
export const artWallOgAlt='Child-style drawing of a colorful rainbow';
export function artWallBody(){
 // One clear section label for the whole wall — no per-image captions, because
 // none of the pieces carry a maker name or a story that we would have to invent.
 const wall=`<ul class="aw-wall" data-aw-wall>${starterArt.map(a=>`<li class="aw-piece"><img src="${artWallBase}${a.file}" width="${a.w}" height="${a.h}" alt="${a.alt}" loading="lazy" decoding="async" draggable="false"></li>`).join('')}</ul>`;
 return `<section class="wrap section compact">
 <span class="eyebrow">ON DISPLAY</span>
 <h2>Classroom art</h2>
 <p class="aw-intro">Eleven drawings made for the wall — a family, a rainbow, a cat, a house, a dinosaur, flowers, a car, a happy face, fish under the sea, shapes and a butterfly. Look closely: every one of them started with a few simple shapes.</p>
 ${wall}
 <p class="lesson-note aw-note"><strong>For grown-ups:</strong> these are classroom examples made for the wall — not artwork by individual children, so no names or ages appear here. If children&rsquo;s own artwork joins this wall later, it will only go up with a grown-up&rsquo;s permission and a quick review first.</p>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>Where next?</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/my-classroom/">My Classroom</a><a class="lesson-pill-link" href="/activities/">Let&rsquo;s explore</a><a class="lesson-pill-link" href="/learning-path/">Learning Path</a></div></section>`;
}
