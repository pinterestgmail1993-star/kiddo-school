// Kiddo School — Flashcards library: data-driven set + card pages.
// Sources: the eight toddler lessons already in lessons.mjs provide every real
// card (file, dimensions, alt text); the data-* files beside this module add
// the parent-facing words. Nothing is invented: a card exists here only if its
// image exists on R2 and its lesson exists on the site.
import {anLesson,vhLesson,csLesson,msLesson,emLesson,fcLesson,gbLesson,gfLesson,gflLesson,gthLesson} from '../lessons.mjs';
import {CARD_FRIEND_LINKS} from './friend-links.mjs';
import * as anData from './data-animals-and-sounds.mjs';
import * as vhData from './data-vehicles-and-sounds.mjs';
import * as csData from './data-colors-and-shapes.mjs';
import * as msData from './data-matching-and-sorting.mjs';
import * as emData from './data-emotions-and-feelings.mjs';
import * as fcData from './data-first-concepts.mjs';
import * as gbData from './data-garden-bugs-and-friends.mjs';
import * as gfData from './data-garden-friends.mjs';
import * as gflData from './data-garden-flowers.mjs';
import * as gthData from './data-garden-things.mjs';
import * as alData from './data-alphabet.mjs';
import * as nmData from './data-numbers.mjs';
import * as shData from './data-shapes.mjs';
import * as clData from './data-colors.mjs';
import * as opData from './data-opposites.mjs';
import * as amData from './data-animals.mjs';
import * as bpData from './data-body-parts.mjs';
import * as mcData from './data-classroom.mjs';
import * as dvData from './data-doctor-visit.mjs';
import * as wwData from './data-who-works.mjs';
import * as fvData from './data-fruits-vegetables.mjs';
import * as lsData from './data-life-skills-and-good-habits.mjs';
import * as chData from './data-community-helpers.mjs';
import * as wsData from './data-weather-seasons.mjs';
import * as nmgData from './data-numbers-counting-early-math.mjs';
import * as sciData from './data-science-nature-and-discovery.mjs';
import * as ahData from './data-animals-habitats.mjs';
import * as phData from './data-phonics.mjs';
import * as swData from './data-sight-words.mjs';
import * as mrData from './data-music-room.mjs';
import * as pgData from './data-playground.mjs';
import * as spData from './data-sports.mjs';
import * as trData from './data-toddler-room.mjs';
import * as ktData from './data-kitchen.mjs';
import * as tvData from './data-transportation.mjs';
import {fvMeta,fvCardContent,cfoMeta,cfoCardContent,fwftMeta,fwftCardContent} from './data-baby-stages.mjs';
import {aeoMeta,aeoCardContent,fabMeta,fabCardContent,fwfhMeta,fwfhCardContent} from './data-explorer-toddler.mjs';
import {lessonsBase,fvLesson,cfoLesson,fwftLesson,aeoLesson,fabLesson,fwfhLesson} from '../lessons.mjs';
import {LETTER_SET_REFS} from './data-alphabet-variants.mjs';
import LIBCOPY from './libcopy/index.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cardSlug=file=>file.replace(/^\d+-/,'').replace(/\.webp$/,'');
const titleWord=slug=>slug.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
// The four reactions use EXACTLY these values (same values as the class pages).
const REACTIONS=[['love','😍','Loved it'],['like','😊','Liked it'],['okay','😐','It was okay'],['not_for_us','😕','Not for us']];

// Stage labels for the sets whose metadata predates the stage-hub system:
// the flashcards wall is now organised by learning-path stage (the owner's
// instruction), so every set carries its stage name and hub link.
const STAGES={
 'colors-and-shapes':['Toddler 3','/toddler/2-years/'],
 'matching-and-sorting':['Toddler 4','/toddler/2-years/'],
 'animals-and-sounds':['Toddler 5','/toddler/2-years/'],
 'vehicles-and-sounds':['Toddler 6','/toddler/2-years/'],
 'emotions-and-feelings':['Toddler 7','/toddler/2-years/'],
 'garden-bugs-and-friends':['Toddler 8','/toddler/2-years/'],
 'garden-friends':['School Garden · Age 2','/toddler/2-years/school-garden/'],
 'garden-flowers':['School Garden · Age 2','/toddler/2-years/school-garden/'],
 'garden-things':['School Garden · Age 2','/toddler/2-years/school-garden/'],
 'first-concepts':['Toddler 2','/toddler/18-24-months/'],
 'alphabet':['Preschool · Age 3','/preschool/3-years/'],
 'numbers':['Preschool · Age 3','/preschool/3-years/'],
 'shapes':['Preschool · Age 3','/preschool/3-years/'],
 'colors':['Preschool · Age 3','/preschool/3-years/'],
 'opposites':['Preschool · Age 3','/preschool/3-years/'],
 'animals':['Preschool · Age 3','/preschool/3-years/'],
 'body-parts':['Preschool · Age 3','/preschool/3-years/'],
 'fruits-vegetables':['Preschool · Age 3','/preschool/3-years/']
};

const SOURCES=[
 // Learning-path stages 2–7: the six baby/toddler classes that had no
 // flashcard set yet. Their cards live in the lesson folders on R2; the
 // parent-facing words sit in the two data modules beside this file.
 [{meta:fvMeta,cards:fvCardContent},fvLesson],
 [{meta:cfoMeta,cards:cfoCardContent},cfoLesson],
 [{meta:fwftMeta,cards:fwftCardContent},fwftLesson],
 [{meta:aeoMeta,cards:aeoCardContent},aeoLesson],
 [{meta:fabMeta,cards:fabCardContent},fabLesson],
 [{meta:fwfhMeta,cards:fwfhCardContent},fwfhLesson],
 [anData,anLesson],[vhData,vhLesson],[csData,csLesson],[msData,msLesson],
 [emData,emLesson],[fcData,fcLesson],[gbData,gbLesson],[gfData,gfLesson],
 // The two newest School Garden collections — flowers and things. The flowers
 // folder ships its own cover.webp (a landscape preview sheet, true dims come
 // from the lesson); the things folder has no cover, so its first card fronts
 // the set (Garden Friends precedent).
 [gflData,gflLesson],[gthData,gthLesson],
 // The alphabet module keeps explicit export names (alphabetMeta/alphabetCardContent)
 // because it also carries the Age 3 lesson object; adapt it to the common shape.
 // The numbers and shapes modules are the same pattern (Age 3 Classes 2 and 3).
 [{meta:alData.alphabetMeta,cards:alData.alphabetCardContent},alData.alphabetLesson],
 [{meta:nmData.numbersMeta,cards:nmData.numbersCardContent},nmData.numbersLesson],
 [{meta:shData.shapesMeta,cards:shData.shapesCardContent},shData.shapesLesson],
 // Age 3 Class 4: each color card carries BOTH faces — the splash (file)
 // and the matching picture (picFile) — rendered together on its card page.
 [{meta:clData.colorsMeta,cards:clData.colorsCardContent},clData.colorsLesson],
 // Age 3 Class 5: six honest opposite pairs — one card per opposite, its own
 // page, its own words. Slugs come from the real filenames (big-ball,
 // small-ball…), exactly the URLs the owner specified.
 [{meta:opData.oppositesMeta,cards:opData.oppositesCardContent},opData.oppositesLesson],
 // Age 3 Class 6: twelve animal friends — nine with a real recording in
 // /assets/sounds/animals/ (card.audio). The play button renders only where
 // a recording exists; duck, elephant and frog say theirs are on the way.
 [{meta:amData.animalsMeta,cards:amData.animalsCardContent},amData.animalsLesson],
 // Age 3 Class 7: twenty-four body parts and five senses cards — fifteen
 // body parts + eight sense words (skin does double duty). Each card has
 // its own page; the set cover is the owner's real 1264×1264 square cover.
 [{meta:bpData.bodyPartsMeta,cards:bpData.bodyPartsCardContent},bpData.bodyPartsLesson],
 // Age 3 Class 8: sixteen foods — eight fruits, eight vegetables. The folder
 // has no cover file, so the strawberry card fronts the set (colors-class
 // precedent). Each card has its own page.
 [{meta:fvData.fruitsMeta,cards:fvData.fruitsCardContent},fvData.fruitsLesson],
 // Preschool Class 32: twenty-eight life-skills cards from the owner's Canva
 // uploads in the class's own R2 folder (self-contained lesson object — the
 // class page predates the lesson system). cover.webp fronts the set and is
 // never counted as a card.
 [lsData,lsData.lesson],
 // Preschool Class 31: thirty-five science flashcards from the owner's Canva
 // uploads in the class's own R2 folder (self-contained lesson object; mixed
 // portrait/landscape dims probed per file). cover.webp fronts the set and is
 // never counted as a card. Purpose: WHAT each science idea means — the
 // Learning Path adventures keep the HOW (drawing layer, tools, progress).
 [sciData,sciData.lesson],
 // Preschool Class 33: twenty-nine community-helpers cards from the owner's
 // Canva uploads in the class's own R2 folder (self-contained lesson object,
 // all 1414×2000 portrait probed per file). cover.webp fronts the set and is
 // never counted as a card. Purpose: WHAT each helper does — the Learning
 // Path /learn/ lessons (lp-lessons.mjs) keep the HOW, on their own pages.
 // Preschool Class 34: twenty-nine weather/seasons/what-we-wear cards from the
 // owner's Canva uploads in the class's own R2 folder (self-contained lesson
 // object, all 1414×2000 portrait probed per file). cover.webp fronts the set
 // and is never counted as a card — there are 29 cards, not 30. Purpose: WHAT
 // each weather/clothing idea means — the Learning Path /learn/ lessons keep
 // the HOW, on their own pages.
 [chData,chData.lesson],
 [wsData,wsData.lesson],
 // Preschool Class 35: twenty counting cards from the owner's Canva uploads
 // in the class's own R2 folder (self-contained lesson object, all 2000×1414
 // landscape probed per file). The 1–20 cover fronts the set and is never
 // counted as a card. The 20 /learn/ counting lessons live under the class
 // path (lp-numbers-counting-early-math.mjs via LP_REGISTRY) and register
 // their teach links through lp-lessons.mjs like every other lesson-bearing set.
 [nmgData,nmgData.lesson],
 // Preschool Class 36: twenty-two animal-habitat cards from the owner's Canva
 // uploads in the class's own R2 folder (self-contained lesson object, MIXED
 // portrait dims probed per file — sixteen at 1587×2245, six at 1414×2000).
 // The cover fronts the set and is never counted as a card. Purpose: WHAT
 // each habitat is and why the animal fits it — the Learning Path /learn/
 // lessons (lp-animals-habitats.mjs via LP_REGISTRY) keep the HOW, on their
 // own pages.
 [ahData,ahData.lesson],
 // Preschool Class 29: fifty-two Dolch sight word cards, served from the
 // site itself (public/assets/sight-words/, every file 600×800). Each card has
 // its own library page and its own /learn/ lesson under the Class 29 path
 // (lp-sight-words.mjs via LP_REGISTRY); the cover fronts the set and is never
 // counted as a card.
 [swData,swData.lesson],
 // Preschool Class 28: twenty-six A–Z letter-sound cards from the owner's
 // Canva uploads in the class's own R2 folder (self-contained lesson object,
 // all 2000×1414 landscape probed per file). cover.webp fronts the set and is
 // never counted as a card. Purpose: WHICH sound each letter makes — the
 // class's 24 Phonics Adventures keep the listening games on their own pages.
 [phData,phData.lesson],
 // Class 23 · The Music Room: fifty-three cards from the owner's uploads in
 // school/music-room/flashcards/ (self-contained lesson object, MIXED portrait
 // dims probed per file — 37 at 1728×2304, 16 at 1414×2000). cover.webp fronts
 // the set and is never counted as a card. Purpose: WHAT each instrument is
 // and sounds like, WHAT each music word means, WHO makes the music — the
 // Music Room class page (/music-room/) keeps the room itself on its own page.
 [mrData,mrData.lesson],
 // The Playground · a School Room (NOT a class): thirty-two cards from the
 // owner's uploads in school/playground/flashcards/ (self-contained lesson
 // object, ALL 32 files probed at 1728×2304 portrait). cover.webp fronts the
 // set and is never counted as a card. Purpose: WHAT our bodies do at the
 // playground (15 action words), WHAT stands on the ground (12 pieces of
 // equipment) and HOW we play kindly together (5 manners). Slugs KEEP the
 // group prefix because slide/swing/climb repeat across groups — the prefix
 // keeps every URL unique. The room itself lives at /playground/ (the set's
 // classUrl) beside the Library, Garden and Music Room; the Learning Path is
 // deliberately untouched (owner request).
 [pgData,pgData.lesson],
 // Preschool Class 37: forty sports & movement cards from the owner's Canva
 // uploads in the class's own R2 folder (self-contained lesson object, ALL 41
 // files probed at 1728×2304 portrait). The cover fronts the set and is never
 // counted as a card. Purpose: WHAT each sport is and HOW to try its big move
 // at home — the Learning Path /learn/ lessons (lp-sports.mjs via LP_REGISTRY)
 // keep the step-by-step teaching on their own pages.
 [spData,spData.lesson],
 // EXTRA CLASS · The Toddler Room: thirty-five cards from the owner's uploads
 // in school/extra-classes/toddler-room/ (self-contained lesson object, ALL 36
 // files probed at 1414×2000 portrait). cover.webp fronts the set and is never
 // counted as a card. A BONUS class beside the core path (owner decision
 // 2026-10-15): every card carries an age pill and a room-area pill; the
 // /toddler-room/learn/ lessons (lp-toddler-room.mjs via LP_REGISTRY) keep
 // the step-by-step teaching on their own pages, crumbed through the
 // /extra-classes/ hub — never through the Learning Path.
 [trData,trData.lesson],
 // EXTRA CLASS · Kitchen Things: thirty-five kitchen cards from the owner's
 // uploads in school/extra-classes/kitchen/ (self-contained lesson object,
 // ALL 36 files probed at 800×1132 portrait). cover.webp fronts the set and
 // is never counted as a card. The owner's AGE PILLS are the set's spine:
 // Ages 3+ everyday things, Ages 4–5 helper tools, Ages 6+ grown-up tools,
 // Grown-ups only (the chef's knife — the kitchen's biggest rule card).
 // Safety lives in the class text and the lessons: knives are for grown-ups,
 // and the hot family is the "hot, don't touch" crew.
 [ktData,ktData.lesson],
 // Class 24 · Transportation & Vehicles: thirty-two spotter cards from the
 // owner's uploads in the class's own R2 folder (self-contained lesson object,
 // ALL 33 files probed at 900×1273 portrait). Each card is a SPOTTER SHEET —
 // a group heading over four labeled vehicles. cover.webp fronts the set and
 // is never counted as a card. Class 24 was reserved since the school opened;
 // the owner assigned it to Transportation & Vehicles (2026-10-15), so the
 // Learning Path runs 1–24 + 25–37 with no gap. The /learn/ lessons
 // (lp-transportation.mjs via LP_REGISTRY) keep the step-by-step teaching.
 [tvData,tvData.lesson],
 // School Rooms · My Classroom: thirty cards from the owner's uploads in
 // school/my-classroom/flashcards/ (self-contained lesson object, ALL 31 files
 // probed at 800×1132 portrait). cover.webp fronts the set and is never
 // counted as a card. The owner's own split is the set's spine: 18 classroom
 // objects (backpack to wastebasket) and 12 good habits (listen to keep it
 // tidy) — every card slug keeps its file prefix (object-, rule-) so the
 // URLs stay unique. No lessons: the set belongs to the My Classroom room
 // (/my-classroom/), the same room the cards describe, never to a class.
 [mcData,mcData.lesson],
 /* EXTRA CLASS · Doctor Visit (owner 2026-10-15): 22 check-up cards in the
    owner's visit order — getting ready → meeting the helpers → the check-up
    → after the visit. Six landscape cards (bandage, check-up, doctor,
    medicine, stethoscope, thermometer) ride beside 16 portrait ones at their
    true probed dims. The class page /extra-classes/doctor-visit/ hosts the
    /learn/ lessons; the library holds the printable twins. */
 [dvData,dvData.lesson],
 /* SCHOOL PEOPLE · Who Works at My School (owner 2026-10-15): the 16 person
    cards from the people page, probed again at 1000×707 landscape. The
    people page /who-works-at-my-school/ names the people and opens the two
    doors (principal → office, nurse → doctor visit); the library set holds
    the printable twins — every card page carries its own download button. */
 [wwData,wwData.lesson]
];

function buildSet([data,lesson]){
 const base=(lesson.r2Base||lessonsBase)+lesson.folder;
 const slug=data.meta.slug;
 const url='/flashcards/'+slug+'/';
 // One lookup per set, at function scope — the frame needs it after the map.
 const libSet=LIBCOPY[slug];
 const cards=lesson.cards.map((c,i)=>{
  // Lesson cards may carry their own slug (the alphabet files are named
  // 01-a-apple.webp but live at /flashcards/alphabet/apple/ — the data module
  // supplies the slug); everything else keeps the file-derived slug.
  const s=c.slug||cardSlug(c.file);
  const d=data.cards[s];
  if(!d) throw Error('flashcards: missing content for '+slug+'/'+s);
  /* Library copy is the card page's OWN text — how the printed card helps,
     how to roleplay it, how to teach with it. Authored fresh per card and
     NEVER shared with the Learning Path lesson text (duplicate-content rule).
     Sets without library copy keep their classic card-page blocks. */
  const lib=libSet&&libSet.cards?libSet.cards[s]:null;
  // Age + subject/safety pills (owner request): the data files set them per
  // card; sets without pills simply render nothing extra.
  return {slug:s,word:d.word||titleWord(s),file:c.file,w:c.w,h:c.h,alt:c.alt,
   ages:d.ages||null,pill:d.pill||null,
   img2:c.picFile?base+c.picFile:null,alt2:c.picAlt||null,picWord:d.picWord||null,
   letter:c.letter||d.letter||null,numeral:c.numeral||d.numeral||null,sound:d.sound||null,audio:c.audio||null,metaDescription:d.metaDescription||null,cardTitle:d.cardTitle||null,
   intro:d.intro,why:d.why||null,who:d.who||null,whoHeading:d.whoHeading||null,job:d.job||null,jobHeading:d.jobHeading||null,safety:d.safety||null,say:d.say,try:d.try,note:d.note,
   helps:lib&&lib.helps||null,roleplay:lib&&lib.roleplay||null,learn:lib&&lib.learn||null,print:lib&&lib.print||null,teachTip:lib&&lib.teachTip||null,url:url+s+'/',img:base+c.file,n:i+1};
 });
 const coverFile=data.meta.coverFile||'cover.webp';
 // Per-set section frame: each set names its own three card-page blocks
 // (roleplay exists ONLY in the community-helpers set, per owner doctrine).
 const frame=libSet&&libSet.frame?libSet.frame:null;
 const stage=STAGES[slug]||null;
 return {
  slug,url,
  stageName:data.meta.stageName||(stage?stage[0]:null),
  stageHref:data.meta.stageHref||(stage?stage[1]:null),
  // Lesson-page framing overrides: rooms that host lessons but sit OFF the
  // Learning Path (the Playground) swap the breadcrumb base and the eyebrow
  // so /playground/learn/ pages never claim a class they are not.
  lessonCrumb:data.meta.lessonCrumb||null,
  lessonEyebrow:data.meta.lessonEyebrow||null,
  name:data.meta.name,
  seoTitle:data.meta.seoTitle,
  h1:data.meta.h1,
  metaDescription:data.meta.metaDescription,
  lede:data.meta.lede,
  hubBlurb:data.meta.hubBlurb,
  ageLabel:data.meta.ageLabel,
  noun:data.meta.noun||'Toddlers',
  group:data.meta.group||'toddler',
  useIdeas:data.meta.useIdeas,
  downloadHint:data.meta.downloadHint||null,
  printPath:data.meta.printPath||null,
  relatedSlugs:data.meta.relatedSets||[],
  pillGroups:data.meta.pillGroups||null,
  lessonPath:lesson.path,
  lessonUrlBase:lesson.lessonUrlBase||null,
  classUrl:data.meta.classUrl||null,
  classBtn:data.meta.classBtn||null,
  lessonLine:data.meta.lessonLine||null,
  lessonTitle:lesson.seoTitle||lesson.title,
  lessonBlurb:data.meta.lessonBlurb||null,
  base,frame,
  // Cover dims come from the lesson's own probe (vehicles 2000×1294 and
  // emotions 2000×1414 are LANDSCAPE — hardcoding 1414×2000 here is what
  // squashed them on the library wall). Garden Friends has no lesson cover;
  // its cover file is the 1414×2000 bird card, so the portrait fallback holds.
  cover:{file:coverFile,w:lesson.cover?lesson.cover.w:1414,h:lesson.cover?lesson.cover.h:2000,alt:data.meta.coverAlt||('Cover of the '+data.meta.name+' flashcards set from Kiddo School')},
  coverUrl:base+coverFile,
  cards
 };
}

export const fcSets=SOURCES.map(buildSet);
export const fcSetBySlug=Object.fromEntries(fcSets.map(s=>[s.slug,s]));
/* Learning Path lesson registry, injected by lp-lessons.mjs (one-way import —
   keeps the module graph cycle-free). Each entry maps card slug → lesson data,
   so a library card page can link its own step-by-step lesson. */
export const lpTeachLinks={};
export function registerLpTeachLinks(reg){Object.assign(lpTeachLinks,reg);}

function crumbNav(parts){
 return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${esc(href)}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
}
const heading=(eyebrow,title,desc)=>`<div class="page-heading wrap"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${desc}</p></div>`;

// ---- Reactions + reviews + comments (three separate things, kept separate) --
// The mount lives in ./community.mjs so every page type (these card pages,
// the alphabet letter sets, worksheets, coloring pages and the Learning Path
// activity pages) shares ONE implementation, wired to the same
// /api/community/* endpoints by /assets/flashcards-community.js.
import {fcCommunityMount} from './community.mjs';
export {fcCommunityMount};

// ---- The library card for /flashcards/ --------------------------------------
export function fcSetCard(s){
 // True cover dimensions in the HTML attrs — landscape covers (vehicles,
 // emotions, garden bugs) keep their real ratio on the library wall.
 return `<a class="fc-setcard" href="${s.url}"><div class="fc-setcard-visual"><img src="${s.coverUrl}" width="${s.cover.w}" height="${s.cover.h}" alt="${esc(s.cover.alt)}" loading="lazy"></div><div class="fc-setcard-copy"><span class="eyebrow">AGES ${esc(s.ageLabel.toUpperCase())}</span><h2>${esc(s.name)}</h2><p>${esc(s.hubBlurb)}</p><span class="fc-open">Open this set · ${s.cards.length} cards <span aria-hidden="true">↗</span></span></div></a>`;
}

// ---- Set page ----------------------------------------------------------------
export function fcSetPageBody(s){
 // No cover/thumbnail figure here: visitors just saw the set's cover on the
 // /flashcards/ library wall, and repeating it pushed the cards below the
 // fold. Landscape covers were also forced into a portrait box and cropped.
 // The page now opens straight on the cards themselves. The Alphabet set no
 // longer embeds the Alphabet Centre — the owner asked flashcards to be
 // about individual pages and downloads, not a clone of another section.
 const stageLink=s.stageName&&s.stageHref?`<p class="fc-stage-link">These cards belong to <a href="${esc(s.stageHref)}">${esc(s.stageName)}</a> on the Kiddo School learning path.</p>`:'';
 // Age/subject pills on a tile (owner request: "add pills of ages so parents
 // know") — the age pill first, then the subject or safety pill.
 const pillRow=c=>(c.ages||c.pill)?`<span class="fc-pillrow">${c.ages?`<span class="fc-pill fc-pill-age">${esc(c.ages)}</span>`:''}${c.pill?`<span class="fc-pill fc-pill-subject">${esc(c.pill)}</span>`:''}</span>`:'';
 const tile=c=>`<a class="fc-card fc2-cardlink" href="${c.url}"><span class="fc2-cardimg"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"></span><span class="fc2-cardword"><strong>${esc(c.word)}</strong><span>Card ${c.n} of ${s.cards.length}</span>${pillRow(c)}</span></a>`;
 // Sets with pillGroups (the owner's age/subject grouping) render one pill-
 // headed section per group; every other set keeps the single wall.
 const bySlug=Object.fromEntries(s.cards.map(c=>[c.slug,c]));
 const letterSets=s.slug==='alphabet'?LETTER_SET_REFS.map(([href,t,d])=>`<a class="fc2-relcard" href="${href}"><strong>${t}</strong><span>${d}</span><span class="fc-open">Open <span aria-hidden="true">↗</span></span></a>`).join(''):'';
 const grid=s.pillGroups
  ?s.pillGroups.map(([label,blurb,slugs])=>`<div class="fc-pillgroup"><div class="fc-pillgroup-head"><span class="fc-pill fc-pill-age fc-pill-big">${esc(label)}</span>${blurb?`<p class="fc-hint">${esc(blurb)}</p>`:''}</div><div class="fc2-cards">${slugs.map(k=>{const c=bySlug[k];if(!c)throw Error('pillGroups: missing card '+s.slug+'/'+k);return tile(c);}).join('')}</div></div>`).join('')
  :`<div class="fc2-cards">${s.cards.map(tile).join('')}</div>`;
 const ideas=`<ol class="fc-steps">${s.useIdeas.map(([t,d],i)=>`<li><span class="fc-stepnum">${String(i+1).padStart(2,'0')}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('')}</ol>`;
 const related=s.relatedSlugs.map(k=>fcSetBySlug[k]).filter(Boolean);
 const relatedRow=related.length?`<div class="fc2-relrow">${related.map(r=>`<a class="fc2-relcard" href="${r.url}"><strong>${esc(r.name)}</strong><span>${r.cards.length} cards</span><span class="fc-open">Open <span aria-hidden="true">↗</span></span></a>`).join('')}</div>`:'';
 const printBtn=s.printPath?`<a class="button" href="${s.printPath}">Print the full set</a>`:'';
 return `${crumbNav([['Flashcards','/flashcards/'],[s.name]])}
 ${heading('FLASHCARD SET · AGES '+esc(s.ageLabel.toUpperCase()),s.h1,esc(s.lede))}
 ${stageLink}
 <section class="wrap fc-section"><span class="eyebrow">THE CARDS</span><h2>Every card in the set.</h2><p class="fc-hint">${s.pillGroups?'Each card has its own page, and every card shows its age pill — start with the group that fits your child today.':'Each card has its own page: the picture and short, practical notes for grown-ups — what it is for, how to use it, how to print it. Tap any card to open it.'}</p>${grid}</section>
 ${letterSets?`<section class="wrap fc-section"><span class="eyebrow">ALPHABET LETTER SETS</span><h2>The same letters, six more ways.</h2><p class="fc-hint">Individual letter-card sets with their own clean pages — every card has its own download button and its own card page.</p><div class="fc2-relrow">${letterSets}</div></section>`:''}
 <section class="wrap fc-section"><span class="eyebrow">HOW TO USE THESE CARDS</span><h2>Four ways that work.</h2><p class="fc-hint">You do not need a plan or a printer schedule. Pick one idea, try it for two minutes and see what happens.</p>${ideas}</section>
 <section class="wrap fc-section"><span class="eyebrow">PRINT &amp; DOWNLOAD</span><h2>Print the set, download a card.</h2><div class="fc2-actions"><a class="button" href="${s.classUrl||s.lessonPath}">${s.classUrl&&!s.stageName?(s.classBtn||'Step into the room these cards come from'):'View the class these cards come from'} <span aria-hidden="true">↗</span></a>${s.lessonUrlBase?`<a class="button" href="${s.lessonUrlBase}">Open the lessons</a>`:''}${printBtn}<a class="button" href="/flashcards/">All flashcard sets</a></div><p class="fc-hint">${s.downloadHint||'Every card page has its own download button with the full-size image.'}${s.printPath?' The full set has a print-ready page too.':' This set is printed straight from its class page.'}</p></section>
 ${relatedRow?`<section class="wrap fc-section"><span class="eyebrow">MORE CARDS LIKE THESE</span><h2>Families of cards that pair well.</h2>${relatedRow}</section>`:''}
 ${fcCommunityMount(s.url)}`;
}

// ---- Card page ----------------------------------------------------------------
// Layout: the card and its teaching notes sit in the left column; downloads,
// share buttons and the three community blocks (reactions, reviews, comments)
// sit in a right-hand rail, so nothing important hides below the fold.
export function fcCardPageBody(set,card,ctx){
 const {prev,next,related}=ctx;
 const noun=ctx.noun||'Toddlers';
 const site=String(ctx.site||'').replace(/\/$/,'');
 const enc=encodeURIComponent;
 const pageUrl=site+card.url;
 const shareTitle=`${card.word} flashcard for ${noun.toLowerCase()} — ${set.name} · Kiddo School`;
 // Flashcards are paper: the card image is shown plain — no drawing canvas,
 // no toolbar. Drawing lives on the Learning Path activity pages only.
 const heroFig=(src,w,h,cap,alt,lazy)=>`<figure class="fc2-hero fc2-hero-half"><img src="${esc(src)}" width="${w}" height="${h}" alt="${esc(alt)}"${lazy?' loading="lazy"':''}><figcaption><strong>${esc(cap)}</strong><span>Card ${card.n} of ${set.cards.length} · ${esc(set.name)}</span></figcaption></figure>`;
 const figure=card.img2
  ?`<div class="fc2-pair">${heroFig(card.img,card.w,card.h,card.word+' splash',card.alt,false)}${heroFig(card.img2,card.w,card.h,card.picWord||(card.word+' in real life'),card.alt2,true)}</div>`
  :`<figure class="fc2-hero"><img src="${card.img}" width="${card.w}" height="${card.h}" alt="${esc(card.alt)}"><figcaption><strong>${esc(card.word)}</strong><span>Card ${card.n} of ${set.cards.length} · ${esc(set.name)}</span></figcaption></figure>`;
 const pn=`<nav class="fc2-pn" aria-label="Previous and next card"><a class="fc2-pn-btn" href="${prev.url}" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.word)}</strong><span>Previous card</span></a><a class="fc2-pn-btn fc2-pn-next" href="${next.url}" rel="next"><strong>${esc(next.word)}</strong> <span aria-hidden="true">→</span><span>Next card</span></a></nav>`;
 // Cards with a real recording (Age 3 Class 6) get a real play control in
 // the say block — wired to /assets/sounds/animals/ by animal-sounds-class.js.
 // Cards without a recording render nothing here; nothing is faked.
 const sayAudio=card.audio?`<button type="button" class="an-play an-play-card" data-an-sound="${esc(card.slug)}" data-an-src="/assets/sounds/animals/${esc(card.audio)}.mp3" aria-label="Play the ${esc(card.word.toLowerCase())} sound, then play it again"><span class="an-play-icon" aria-hidden="true">▶</span><span class="an-play-label">Hear the ${esc(card.word.toLowerCase())}</span><span class="an-replay">Play again</span></button>`:'';
 /* Card pages carry ONE of two block sets: sets with library copy render the
    set's OWN short printed-card blocks under the set's own headings — how it
    helps / how to use it / what kids learn / how to print it / tips. This text
    shares NOTHING with the Learning Path lesson page (duplicate-content rule).
    Sets without library copy keep their classic blocks until copy is written. */
 const hasTrio=card.helps&&card.roleplay&&card.teachTip;
 const F=set.frame||{t1:'How this card helps',t2:'How to use this card',t3:'What kids learn from it',t4:'Print it like this',t5:'How to teach with this card'};
 const helps=hasTrio?`<div class="fc2-do"><h2>${esc(F.t1)}</h2><p>${esc(card.helps)}</p></div>`:'';
 const sound=card.sound?`<div class="fc2-do fc2-sound"><h2>Letter sound</h2><p>${esc(card.sound)}</p></div>`:'';
 const roleplay=hasTrio?`<div class="fc2-do"><h2>${esc(F.t2)}</h2>${sayAudio}<p>${esc(card.roleplay)}</p></div>`:'';
 const learnB=hasTrio&&card.learn?`<div class="fc2-do"><h2>${esc(F.t3)}</h2><p>${esc(card.learn)}</p></div>`:'';
 const printB=hasTrio&&card.print?`<div class="fc2-do fc2-note"><h2>${esc(F.t4)}</h2><p>${esc(card.print)}</p></div>`:'';
 const teachTip=hasTrio?`<div class="fc2-do fc2-note"><h2>${esc(F.t5)}</h2><p>${esc(card.teachTip)}</p></div>`:'';
 const say=!hasTrio?`<div class="fc2-do"><h2>Say it together</h2><p class="fc2-say">&ldquo;${esc(card.say)}&rdquo;</p>${sayAudio}<p class="fc-hint">Say it naturally, then wait. Whatever comes back — the word, the sound, a point, a giggle — is the right answer.</p></div>`:'';
 const why=!hasTrio&&card.why?`<div class="fc2-do"><h2>Why it helps a preschooler</h2><p>${esc(card.why)}</p></div>`:'';
 const who=!hasTrio&&card.who?`<div class="fc2-do"><h2>${esc(card.whoHeading||'What is this community helper?')}</h2><p>${esc(card.who)}</p></div>`:'';
 const job=!hasTrio&&card.job?`<div class="fc2-do"><h2>${esc(card.jobHeading||'What do they do?')}</h2><p>${esc(card.job)}</p></div>`:'';
 const tryThis=!hasTrio?`<div class="fc2-do"><h2>Try this</h2><p>${esc(card.try)}</p></div>`:'';
 const note=!hasTrio?`<div class="fc2-do fc2-note"><h2>Quick parent note</h2><p>${esc(card.note)}</p></div>`:'';
 const safety=!hasTrio&&card.safety?`<div class="fc2-do fc2-note fcl-safety"><h2>Staying safe</h2><p>${esc(card.safety)}</p></div>`:'';
 const learnBlocks=hasTrio?helps+roleplay+learnB+printB+teachTip+sound:who+job+why+sound+say+tryThis+note+safety;
 /* Same word, two homes (friend-links.mjs): the card side of an owner-pinned
    pair — one fresh sentence pointing at the other set's lesson. */
 const friend=CARD_FRIEND_LINKS[set.slug+'/'+card.slug]?`<div class="fc2-do fc2-note"><h2>One word, two lessons</h2><p>${CARD_FRIEND_LINKS[set.slug+'/'+card.slug]}</p></div>`:'';
 const teach=(lpTeachLinks[set.slug]||{})[card.slug]?`<div class="fc2-do"><h2>Teach it, step by step</h2><p>Want the full walkthrough? <a href="${set.lessonUrlBase?set.lessonUrlBase+card.slug+'/':set.lessonPath+'learn/'+card.slug+'/'}">Open ${set.slug==='sight-words'?'the lesson for “'+esc(card.word)+'”':'the '+esc(card.word)+' lesson'}</a> on the Learning Path.</p></div>`:'';
 const dlName=f=>f.replace(/^\d+-/,'').replace(/\.webp$/,'');
 const actions=`<div class="fc2-actions">${card.img2
  ?`<a class="button" href="${card.img}" download="${dlName(card.file)}.webp">Download splash <span aria-hidden="true">↓</span></a><a class="button" href="${card.img2}" download="${dlName(card.img2.split('/').pop())}.webp">Download picture <span aria-hidden="true">↓</span></a>`
  :`<a class="button" href="${card.img}" download="${esc(card.word.toLowerCase().replace(/[^a-z0-9]+/g,'-'))}.webp">Download card <span aria-hidden="true">↓</span></a>`}<button type="button" class="button" data-tc-print-view>Print this card</button>${set.printPath?`<a class="button" href="${set.printPath}">Print full set</a>`:''}<a class="button" href="${set.url}">View full set</a></div>`;
 const share=`<div class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS CARD</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this card on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}" target="_blank" rel="noopener" aria-label="Share this card on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+pageUrl)}" target="_blank" rel="noopener" aria-label="Share this card on WhatsApp">WhatsApp</a><a class="fc2-share-btn" href="https://pinterest.com/pin/create/button/?url=${enc(pageUrl)}&media=${enc(card.img)}&description=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Save this card on Pinterest">Pinterest</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div><p class="fc-hint">Share buttons open in a new tab. The copy button copies this page&rsquo;s address — nothing is tracked.</p></div>`;
 // Room sets (classUrl without a stage, e.g. the Playground) frame the link
 // as a room, never as a class on the Learning Path.
 const lesson=set.lessonPath?`<p class="fc2-lesson">From the <a href="${set.lessonPath}">${esc(set.lessonTitle)}</a>${set.classUrl&&!set.stageName?(set.lessonLine||' room — with every lesson one tap away.'):' class on the Learning Path.'}</p>`:'';
 const relGrid=related&&related.length?`<section class="wrap fc-section"><span class="eyebrow">RELATED CARDS</span><h2>More cards to try.</h2><p class="fc-hint">${esc(ctx.relatedHint||'Nearby cards from this set and its closest friends.')}</p><div class="fc2-cards">${related.map(r=>`<a class="fc-card fc2-cardlink" href="${r.card.url}"><span class="fc2-cardimg"><img src="${r.card.img}" width="${r.card.w}" height="${r.card.h}" alt="${esc(r.card.alt)}" loading="lazy"></span><span class="fc2-cardword"><strong>${esc(r.card.word)}</strong><span>From ${esc(r.setName)}</span></span></a>`).join('')}</div></section>`:'';
 return `${crumbNav([['Flashcards','/flashcards/'],[set.name,set.url],[card.word]])}
 <div class="page-heading wrap"><span class="eyebrow">FLASHCARD · ${esc(set.name.toUpperCase())} · AGES ${esc(set.ageLabel.toUpperCase())}</span><h1>${card.numeral?`Number ${esc(card.numeral)} Flashcard — ${esc(card.word)} for ${esc(noun)}`:card.letter?`${esc(card.word)} Flashcard — Letter ${esc(card.letter.toUpperCase())} for ${esc(noun)}`:`${esc(card.word)} Flashcard for ${esc(noun)}`}</h1>${(card.ages||card.pill)?`<p class="fc-cardpills">${card.ages?`<span class="fc-pill fc-pill-age">${esc(card.ages)}</span>`:''}${card.pill?`<span class="fc-pill fc-pill-subject">${esc(card.pill)}</span>`:''}</p>`:''}<p>${esc(card.intro)}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main">${figure}${pn}<section class="fc2-learn" aria-label="How to use this card">${learnBlocks}${teach}${friend}</section>${lesson}</div>
  <aside class="fc2-rail" aria-label="Download, share and family feedback"><section class="fc2-block fc2-first-block"><span class="eyebrow">TAKE IT WITH YOU</span><h2>Download, print, keep going.</h2>${actions}</section>${share}${fcCommunityMount(card.url)}</aside>
 </div>
 ${relGrid}`;
}

// Related cards for a card: the next two in the set (wrapping) plus one
// cross-set pick — same slug in a sibling set when there is one (bird→bird,
// frog→frog), otherwise the sibling set's first card. Deterministic, honest.
export function fcRelatedFor(set,card){
 const n=set.cards.length;
 const inSet=[set.cards[(card.n)%n],set.cards[(card.n+1)%n]];
 let cross=null;
 for(const rel of set.relatedSlugs){
  const rset=fcSetBySlug[rel];
  if(!rset) continue;
  const twin=rset.cards.find(c=>c.slug===card.slug);
  const pick=twin||rset.cards[0];
  if(pick&&pick.url!==card.url){cross={card:pick,setName:rset.name};break;}
 }
 const related=[...inSet.map(c=>({card:c,setName:set.name}))];
 if(cross){related.push(cross);}
 else{const third=set.cards[(card.n+2)%n];if(third&&third.url!==card.url)related.push({card:third,setName:set.name});}
 return related.slice(0,3);
}
