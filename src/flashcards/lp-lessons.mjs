// Kiddo School — Learning Path flashcard lessons (owner doctrine, updated
// 2026-10-12): TYPE 1 teaching lesson — the original Canva flashcard on the
// LEFT with the drawing canvas over it and the drawing tools for the child
// (the Learning Path is where children LEARN AND PRACTISE online), unique
// step-by-step teaching content on the RIGHT. Each lesson has its own route
// under the class path: {lessonPath}learn/{slug}/. This module is the registry
// + page body; the library card pages (flashcards/index.mjs) stay a separate
// WHAT/WHY/PRACTISE experience for parents — paper, download, print, NO canvas
// — and no text is shared between the two.
import {fcSetBySlug,registerLpTeachLinks} from './index.mjs';
import {LESSON_FRIEND_LINKS} from './friend-links.mjs';
import {lpContent as ch33} from './lp-community-helpers.mjs';
import {lpContent as ls32} from './lp-life-skills.mjs';
import {lpContent as s31} from './lp-science-nature.mjs';
import {lpContent as ws34} from './lp-weather-seasons.mjs';
import {lpContent as nm35} from './lp-numbers-counting-early-math.mjs';
import {lpContent as ah36} from './lp-animals-habitats.mjs';
import {lpContent as mr23} from './lp-music-room.mjs';
import {lpContent as pgr} from './lp-playground.mjs';
import {lpContent as sp37} from './lp-sports.mjs';
import {lpContent as trExtra} from './lp-toddler-room.mjs';
import {lpContent as ktExtra} from './lp-kitchen.mjs';
import {lpContent as tv24} from './lp-transportation.mjs';
import {lpContent as ph28} from './lp-phonics.mjs';
import {lpContent as fvt} from './lp-faces-and-visual-tracking.mjs';
import {lpContent as cfo} from './lp-colors-and-first-objects.mjs';
import {lpContent as fwft} from './lp-first-words-familiar-things.mjs';
import {lpContent as aeo} from './lp-animals-everyday-objects.mjs';
import {lpContent as fab} from './lp-first-actions-body-parts.mjs';
import {lpContent as fwfh} from './lp-first-words-food-home.mjs';
import {lpContent as anso} from './lp-animals-and-sounds.mjs';
import {lpContent as vhso} from './lp-vehicles-and-sounds.mjs';
import {lpContent as csh} from './lp-colors-and-shapes.mjs';
import {lpContent as mso} from './lp-matching-and-sorting.mjs';
import {lpContent as emo} from './lp-emotions-and-feelings.mjs';
import {lpContent as fcp} from './lp-first-concepts.mjs';
import {lpContent as gbf} from './lp-garden-bugs-and-friends.mjs';
import {lpContent as gfr} from './lp-garden-friends.mjs';
import {lpContent as gfl} from './lp-garden-flowers.mjs';
import {lpContent as gth} from './lp-garden-things.mjs';
import {lpContent as abc} from './lp-alphabet.mjs';
import {lpContent as num} from './lp-numbers-and-counting.mjs';
import {lpContent as shp} from './lp-shapes.mjs';
import {lpContent as col} from './lp-colors.mjs';
import {lpContent as opp} from './lp-opposites.mjs';
import {lpContent as asd} from './lp-animal-sounds.mjs';
import {lpContent as bps} from './lp-body-parts-and-five-senses.mjs';
import {lpContent as fav} from './lp-fruits-and-vegetables.mjs';
import {lpContent as sw29} from './lp-sight-words.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Registry: one entry per flashcard set that carries Learning Path lessons.
// The class hub renders its compact nav from the same source (single truth).
export const LP_REGISTRY=[
 {slug:'community-helpers-and-our-neighborhood',content:ch33,
  navTitle:'Learn about our community helpers',
  navIntro:'Twenty-nine helpers, one lesson each — five to ten minutes together at a time. Open a lesson, look at the picture, follow the steps, then play the practice game. The lessons follow a gentle order: health helpers first, then safety, learning, food and growing, and the builders and fixers.'},
 {slug:'life-skills-and-good-habits',content:ls32,
  navTitle:'Teach the 28 life skills, step by step',
  navIntro:'Twenty-eight everyday skills, one lesson each — the sink, the shoe rack and the car seat are the show. Every lesson opens the original flashcard, walks the teaching step by step, hands you the words to say, the questions to ask and a way to practise the real thing the same day. Follow the given order — hygiene first, then getting dressed, tidy-up jobs, manners, patience and the safety rules — or jump to the skill your family needs this week.'},
 {slug:'faces-and-visual-tracking',content:fvt,
  navTitle:'Watch, look and track — the newborn seeing lessons',
  navIntro:'Twelve picture sessions for the youngest eyes — five minutes of showing, naming and watching what your baby\u2019s gaze does.'},
 {slug:'colors-and-first-objects',content:cfo,
  navTitle:'First colors and objects, one lesson each',
  navIntro:'Twelve gentle lessons for three- to four-month eyes: show the card, name it warmly, watch the response, repeat across the week.'},
 {slug:'first-words-familiar-things',content:fwft,
  navTitle:'The first familiar things, taught one by one',
  navIntro:'Eleven everyday things your baby is about to recognize — the teaching session behind every card, parent-led and unhurried.'},
 {slug:'animals-everyday-objects',content:aeo,
  navTitle:'Animals and everyday things, lesson by lesson',
  navIntro:'Twelve lessons for the reaching-and-grabbing months: naming, watching, mouthing-safe play and the first game rules.'},
 {slug:'first-actions-body-parts',content:fab,
  navTitle:'First actions and body parts, taught gently',
  navIntro:'Twelve lessons for the nine-to-twelve-month burst — waving, clapping, pointing — one skill per lesson, parent-led.'},
 {slug:'first-words-food-home',content:fwfh,
  navTitle:'First words for food and home',
  navIntro:'Eleven lessons that turn mealtime and homecoming into naming practice — the words come when they come.'},
 {slug:'animals-and-sounds',content:anso,
  navTitle:'Learn the animals and their sounds',
  navIntro:'Twenty animal lessons for two-year-olds: the sound, the walk, the hunt around the house — five minutes each, all roar.'},
 {slug:'vehicles-and-sounds',content:vhso,
  navTitle:'Learn the vehicles and their sounds',
  navIntro:'Twenty vehicle lessons: vroom, choo and nee-nah — each card teaches its machine, its sound and where you both can spot one.'},
 {slug:'colors-and-shapes',content:csh,
  navTitle:'First colors and shapes, lesson by lesson',
  navIntro:'Fifteen lessons that give two-year-olds the words for what they already see — one color or shape per session.'},
 {slug:'matching-and-sorting',content:mso,
  navTitle:'Learn to match and sort, one lesson at a time',
  navIntro:'Fifteen lessons in the thinking skill of sameness — matching pairs, sorting piles, finding the different one.'},
 {slug:'emotions-and-feelings',content:emo,
  navTitle:'Learn the feelings, one face at a time',
  navIntro:'Twenty feelings lessons for two-year-olds: name the face, make the face, and let every feeling be welcome.'},
 {slug:'first-concepts',content:fcp,
  navTitle:'Big and small, up and down — first concepts',
  navIntro:'Eleven opposite-pair lessons for the eighteen-to-twenty-four-month mind: gesture them, hunt them, live them.'},
 {slug:'garden-bugs-and-friends',content:gbf,
  navTitle:'Meet the garden bugs and little friends',
  navIntro:'Twenty garden-creature lessons: watch gently, name kindly, and never grab — the bug world at two-year-old height.'},
 {slug:'garden-friends',content:gfr,
  navTitle:'Meet the garden friends',
  navIntro:'Eighteen lessons about who lives in a garden — pets, visitors and helpers — taught at two-year-old pace.'},
 {slug:'garden-flowers',content:gfl,
  navTitle:'Learn the garden flowers',
  navIntro:'Twelve flower lessons: name the bloom, smell gently, water carefully — the garden\u2019s softest residents.'},
 {slug:'garden-things',content:gth,
  navTitle:'Learn the garden things',
  navIntro:'Twelve lessons on the tools and things of a garden — spade, can, seed, boot — each with its own small job.'},
 {slug:'alphabet',content:abc,
  navTitle:'Learn the letters A to Z, sound by sound',
  navIntro:'Twenty-six letter lessons — the name, the sound, the picture and a hunt for each letter in your own home.'},
 {slug:'numbers-and-counting',content:num,
  navTitle:'Learn the numbers 1 to 10, one lesson each',
  navIntro:'Ten counting lessons: the numeral, the word, the touch-counted pile — one honest number per session.'},
 {slug:'shapes',content:shp,
  navTitle:'Learn the shapes, one lesson each',
  navIntro:'Twelve shape lessons from circle to octagon — name it, trace it in the air, find it on your walk.'},
 {slug:'colors',content:col,
  navTitle:'Learn the colors, one lesson each',
  navIntro:'Twelve color lessons: the name, the splash, the hunt around the room — plus the mixes that make new colors.'},
 {slug:'opposites',content:opp,
  navTitle:'Learn the opposites, one pair at a time',
  navIntro:'Twelve opposite-pair lessons for three- and four-year-olds: big and small, up and down — jump them, sort them, live them.'},
 {slug:'animal-sounds',content:asd,
  navTitle:'Learn the animal sounds, one lesson each',
  navIntro:'Twelve lessons on who says what — the honest version of moo, oink and quack, with the real animals behind them.'},
 {slug:'body-parts-and-five-senses',content:bps,
  navTitle:'Learn the body parts and the five senses',
  navIntro:'Twenty-four lessons: the body\u2019s parts and the body\u2019s five ways to learn — named, pointed at and put to work.'},
 {slug:'fruits-and-vegetables',content:fav,
  navTitle:'Learn the fruits and vegetables',
  navIntro:'Sixteen food lessons: where it grows, what is inside, and the brave first taste — with a grown-up washing and cutting.'},
 {slug:'science-nature-and-discovery',content:s31,
  navTitle:'Learn the science, nature and discovery cards',
  navIntro:'Thirty-five science lessons: what each idea means, what to notice on the card, a safe way to try it at home and the questions that keep curiosity going.'},
 {slug:'weather-seasons-and-what-we-wear',content:ws34,
  navTitle:'Learn the weather, the seasons and what we wear',
  navIntro:'Twenty-nine weather-and-clothes lessons: sun and clouds, rain and rainbows, storms and snow, the four seasons, and the umbrella, raincoat, sun hat and winter coat that match each kind of day. Every lesson reads the real artwork, walks the teaching step by step and ends with something to practise outside the window — whichever sky is out there today.'},
 {slug:'numbers-counting-and-early-math',content:nm35,
  navTitle:'Learn the counting cards, one number at a time',
  navIntro:'Twenty counting lessons, one apple to twenty figs: count the smiling fruit, say the number, then find that many real things in your own kitchen. One card a sitting — the first decade lands by ten, the ten-and-some-more trick opens the teens, and twenty figs crown the summit.'},
 {slug:'animals-and-their-habitats',content:ah36,
  navTitle:'Learn the animals and the homes that fit them',
  navIntro:'Twenty-two habitat lessons, meadow to cave: find the animal on its card, learn what its home is and why it fits, then play the game that puts your child inside it — hopping the grassland, digging the water hole, huddling like penguins, hanging like a bat. Meadow and pond first, then forests, warm grasslands, desert, river and ocean, the icy poles, and the dark cave at the end.'},

 {slug:'music-room',content:mr23,
  navTitle:'Learn the Music Room, one card at a time',
  navIntro:'Fifty-three Music Room lessons: thirty-three instruments from accordion to xylophone — how each one makes its sound and the home version you can build tonight — thirteen music words from beat to volume, and the seven people who make music together, from a solo to a full orchestra. One card a sitting, and the whole room starts to sing.'},
 {slug:'playground',content:pgr,
  navTitle:'Learn the playground, word by word',
  navIntro:'Thirty-two Playground lessons: the fifteen action words our bodies do there — balance to walk, each taught step by step with its own game — the twelve pieces of equipment from ball to tunnel, and the five manners that make play kind. Body, ground and kindness: the whole playground, taught.'},
 {slug:'sports',content:sp37,
  navTitle:'Learn the sports and movement cards, one game at a time',
  navIntro:'Forty sports lessons for ages 4–5: the ball games first, then run-jump-throw athletics, the water sports, wheels and boards and ice, climbing and riding, aim and precision, the martial arts and the mighty lift — every lesson teaching one big move step by step, with a living-room game that builds gross motor skills, physical literacy and the fundamental movement skills of running, jumping, throwing, catching, kicking and balance.'},
 {slug:'transportation-and-vehicles',content:tv24,
  navTitle:'Learn the vehicles, one spotter card at a time',
  navIntro:'Thirty-two transportation lessons for ages 4–5: the everyday rides first — car, bus, train, school bus — then the helpers, the rails, the long giants, the water, the sky and eleven construction spotter sheets from road roller to tower crane. Each card names four vehicles, and every lesson teaches all four with one big spotting idea.'},
 {slug:'toddler-room',content:trExtra,
  navTitle:'Learn the toddler room, word by word',
  navIntro:'Thirty-five Toddler Room lessons for ages 1–3: the toys on the mat, the mealtimes, the sleep corner, the care routines, getting dressed and the furniture that holds the room together — every word taught step by step with the routine it lives in. A bonus class beside the core path: dip in any order, skip without falling behind.'},
 {slug:'kitchen',content:ktExtra,
  navTitle:'Learn the kitchen, safely, one tool at a time',
  navIntro:'Thirty-five Kitchen lessons for ages 3–6: the everyday things, the helper tools, the grown-up tools to name and the one big rule — knives are for grown-ups. Every lesson teaches the tool, the job it does and, where it matters, the hot-don’t-touch and sharp-things rules said out loud. A bonus class beside the core path: cook alongside it, any order.'},

 {slug:'phonics-and-beginning-sounds',content:ph28,
  navTitle:'Learn the letter sounds, one letter at a time',
  navIntro:'Twenty-six letter-sound lessons, Aa apple to Zz zebra: trace the big letters on the card, learn how each sound is really made, say the parent script and play the one game that drills the sound — five minutes a letter, and the alphabet starts speaking.'},

 {slug:'sight-words',content:sw29,
  navTitle:'Learn the sight words, one card at a time',
  navIntro:'Fifty-two sight word lessons, five minutes each: look at the card, say the word, play one tiny game and spot it in a real book. Start with a, the, I and you, then the action words, the colours and the little words that join sentences together.'},
].map(r=>({...r,set:fcSetBySlug[r.slug]})).filter(r=>r.set);

export const lpSetBySlug=Object.fromEntries(LP_REGISTRY.map(r=>[r.slug,r]));
/* Hand the registry to the library so every card page inside a lesson-bearing
   set links its own step-by-step lesson. */
registerLpTeachLinks(Object.fromEntries(LP_REGISTRY.map(r=>[r.slug,r.content])));

// The teaching blocks, in the owner's fixed order. `teach` renders as a numbered
// list; `vocab` as chips; everything else as prose. All fields are authored
// fresh per card — nothing here is copied from the library pages.
const BLOCKS=[
 ['what','What is this?'],['mean','What does it mean?'],['know','What does the child need to know?'],
 ['why','Why this matters'],['dev','What it teaches'],['vocab','Words to learn'],
 ['say','Say this to your child'],['teach','Step by step'],['sayhow','How to say it'],['use','Where to use it'],['notice','Look closer at the picture'],
 ['ask','Ask your child'],['childSay','What your child can say or do'],['real','Out in the real world'],
 ['play','Try it together'],['check','Understanding check'],['tips','Parent tips'],['safety','Staying safe']
];

export function lpLessonBody(set,card,lesson,ctx){
 const {prev,next}=ctx;
 /* Same word, two homes (src/flashcards/friend-links.mjs): apple is a phonics
    letter-sound card AND a fruits vocabulary card. The owner-pinned pair
    links the two experiences in one sentence per direction — each page keeps
    its own job and its own copy; only the pointer is shared. */
 const friend=LESSON_FRIEND_LINKS[set.slug+'/'+card.slug]
  ?`<p class="fcl-pair">${LESSON_FRIEND_LINKS[set.slug+'/'+card.slug]}</p>`:'';
 const blocks=BLOCKS.filter(([k])=>lesson[k]).map(([k,defLabel])=>{
  const label=(lesson.labels&&lesson.labels[k])||defLabel;
  if(k==='teach'){
   const steps=lesson[k].split('\n').map(s=>`<li>${esc(s.replace(/^\d+\)\s*/,''))}</li>`).join('');
   return `<div class="fc2-do fcl-steps"><h2>${esc(label)}</h2><ol>${steps}</ol></div>`;
  }
  if(k==='vocab'){
   const chips=lesson[k].split(',').map(w=>`<span class="fcl-chip">${esc(w.trim())}</span>`).join('');
   return `<div class="fc2-do"><h2>${esc(label)}</h2><p class="fcl-vocab">${chips}</p></div>`;
  }
  if(k==='say') return `<div class="fc2-do fcl-say"><h2>${esc(label)}</h2><p>&ldquo;${esc(lesson[k])}&rdquo;</p></div>`;
  if(k==='safety') return `<div class="fc2-do fc2-note fcl-safety"><h2>${esc(label)}</h2><p>${esc(lesson[k])}</p></div>`;
  return `<div class="fc2-do"><h2>${esc(label)}</h2><p>${esc(lesson[k])}</p></div>`;
 }).join('');
 const pn=`<nav class="fc2-pn" aria-label="Previous and next lesson"><a class="fc2-pn-btn" href="${prev.url}" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.title)}</strong><span>Previous lesson</span></a><a class="fc2-pn-btn fc2-pn-next" href="${next.url}" rel="next"><strong>${esc(next.title)}</strong> <span aria-hidden="true">→</span><span>Next lesson</span></a></nav>`;
 const cls=(set.stageName||'').split(' · ')[0];
 const pair=`<p class="fcl-pair">This lesson pairs with the <a href="${esc(card.url)}">${esc(card.word)} flashcard</a> in the library — print it, show it, keep it on the fridge. Back to <a href="${esc(set.lessonPath)}">${esc(set.name)}${cls?` (${esc(cls)})`:''}</a>.</p>`;
 // Rooms that host lessons but sit OFF the Learning Path (the Playground)
 // swap the breadcrumb base and the eyebrow via set.lessonCrumb/lessonEyebrow.
 const crumbTrail=set.lessonCrumb
  ?set.lessonCrumb.map(([label,href])=>`<a href="${esc(href)}">${esc(label)}</a><span aria-hidden="true">/</span>`).join('')
  :`<a href="/learning-path/">Learning Path</a><span aria-hidden="true">/</span>`;
 const eyebrow=set.lessonEyebrow||'LEARNING PATH LESSON';
 return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span>${crumbTrail}<a href="${esc(set.stageHref||set.lessonPath)}">${esc(set.name)}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(card.word)}</span></nav>
 <div class="page-heading wrap"><span class="eyebrow">${esc(eyebrow)} · ${esc(set.name.toUpperCase())} · AGES ${esc(set.ageLabel.toUpperCase())}</span><h1>${esc(card.word)} — a step-by-step lesson for grown-up and child</h1><p>${esc(lesson.intro)}</p></div>
 <div class="fcl wrap">
  <div class="wc-mount fcl-left" data-wc data-wc-src="${esc(card.img)}?draw=1" data-wc-name="${esc(card.word)} flashcard" data-wc-w="${card.w}" data-wc-h="${card.h}" data-wc-restore="learn/${esc(set.slug)}/${esc(card.slug)}">
   <figure class="fcl-art"><img src="${esc(card.img)}?draw=1" width="${card.w}" height="${card.h}" alt="${esc(card.alt)}" fetchpriority="high" crossorigin="anonymous"><figcaption><strong>${esc(card.word)}</strong><span>${set.slug==='sight-words'?'Sight word flashcard':'Original Canva flashcard'} · Card ${card.n} of ${set.cards.length}</span></figcaption></figure>
  </div>
  <div class="fcl-copy">${blocks}${pair}${friend}</div>
 </div>
 <div class="wrap">${pn}</div>`;
}
