// Kiddo School — Class 37 · Sports, Movement & Play: the Learning Path class
// page. Same process as every class (owner instruction, repeated 2026-10-14
// "the process is the same"): the class hub shows the whole set as PICTURES and
// every picture opens its own /learn/ teaching lesson — original sport card on
// the left, step-by-step teaching on the right (built from lp-sports.mjs via
// LP_REGISTRY). The flashcard library pages stay the download/print shelf
// behind ONE supporting resource section. SEO vocabulary follows what families
// search in the US, Canada, Australia and New Zealand: gross motor skills,
// physical literacy, fundamental movement skills and active play — woven in,
// never stuffed. CSP-safe rendering: every image carries its own width/height
// (all 40 cards 1728×2304) and NO inline styles.
import {lesson as spLesson} from './flashcards/data-sports.mjs';
import {lpContent as spLp} from './flashcards/lp-sports.mjs';

export const SP_CLASS_PATH='/preschool/4-years/sports-movement-and-play/';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function sportsClassBody(){
 const base=spLesson.r2Base;
 const cards=spLesson.cards.map(c=>({...c,img:base+'flashcards/'+c.file}));
 const learnRows=cards.map(c=>{
  const l=spLp[c.slug];
  return `<a class="lp-tile" href="${SP_CLASS_PATH}learn/${c.slug}/"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(l.title.replace(/^The | Lesson$/g,''))}</strong></a>`;
 }).join('');
 return `<section class="wrap lesson-section"><div class="page-heading"><span class="eyebrow">CLASS 37 · AGES 4–5 · 40 MOVEMENT LESSONS</span><h1>Sports, Movement &amp; Play.</h1></div></section>
 <section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Forty sports, forty big moves, one active playground.</h2><p class="lesson-copy">Every sport in this class is taught as ONE big move your child can try today: the soccer plant-and-swing, the basketball push-and-catch, the frog-jump landing, the pencil dive, the egg-beater float. Each card opens its own step-by-step lesson — what the sport is, the three ideas your child needs, the parent script, one game for the living room and, where it matters, the safety rule said out loud. The order is deliberate: the ball games a four-year-old already knows come first, then run-jump-throw athletics, the water sports, wheels and boards and ice, climbing and riding, aim and precision, the martial arts, and the mighty lift at the end.</p><p class="lesson-copy">One card a sitting is plenty — the whole class is a term of five-minute active visits. The vocabulary is the one early-years teachers use: gross motor skills, physical literacy and the fundamental movement skills — run, jump, throw, catch, kick, balance — the same words New Zealand and Australian schools teach as the heart of movement, and Canadian families know as the path to physical literacy. By the end, your child has forty named skills and forty games that grow them.</p></section>
 <section class="wrap lesson-section"><span class="eyebrow">WHY MOVEMENT MATTERS</span><h2>The body learns first.</h2><p class="lesson-copy">Before pencils and letters come legs and lungs: active play builds the balance, grip and coordination that every classroom skill quietly borrows. This class does not train champions — it hands your child the movement words (jump, throw, glide, balance, kick) and the joy of using them, so that whatever sport your family meets next — school sports day, a swim class, a dance group — the door is already open.</p><p class="lesson-copy">And the safety rules live inside the lessons where they belong: helmets before wheels, grown-ups before water, pads before wheels roll and mats before falls. Every rule is said out loud in its lesson, every time — that repetition is the lesson.</p></section>
 <section class="wrap fc-section" id="learn"><span class="eyebrow">LEARN WITH FLASHCARDS</span><h2>Learn the sports, one big move at a time.</h2><p class="fc-hint">Forty movement cards, one picture each. Tap any picture and it opens its own lesson page — the original artwork on the left, and the step-by-step teaching on the right: what the sport is, the three ideas your child needs, the script to say and one game to play tonight.</p><div class="lp-tiles">${learnRows}</div></section>
 <section class="wrap fc-section fc-res"><div class="fc-res-copy"><span class="eyebrow">SUPPORTING RESOURCE</span><h2>Print the sports cards.</h2><p class="fc-hint">Every lesson has a matching flashcard in the library: the original artwork as a printable card with a download button, print size and short notes on trying the sport\u2019s big move at home. When your child owns forty movement words, the <a href="/flashcards/playground/">Playground action cards</a> and the <a href="/preschool/4-years/animals-and-their-habitats/">habitat lessons</a> make fine revisiting.</p><div class="fc2-actions"><a class="button" href="/flashcards/sports/">Open the Sports &amp; Movement flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Back to the Learning Path <span aria-hidden="true">↗</span></a></div></div><div class="fc-res-art"><img src="${base}flashcards/cover.webp" width="1728" height="2304" alt="Cover of the Sports &amp; Movement flashcards set: the title over a bright sports scene." loading="lazy"></div></section>
 <p class="lesson-note"><strong>Age ranges are a guide, not a test.</strong> Follow your child\u2019s energy from ball games to the balance beam — every lesson stands on its own.</p>`;
}
