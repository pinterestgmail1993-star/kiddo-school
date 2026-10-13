// Kiddo School — Class 36 · Animals & Their Habitats: the 6 GENUINE habitat
// worksheets (owner's Canva upload, verified on R2 under
// school/preschool/4-years/animals-and-their-habitats/worksheets/, all
// 1414×2000 portrait, probed HTTP 200 image/webp on 2026-10-13 and each sheet
// audited image by image: circle row, matching homes, counting group, habitat
// choice and trace word recorded exactly as drawn). Two pages per sheet: the
// Learning Path ACTIVITY (drawing canvas over the original art, solving
// guidance beside it) and the PRINTABLE library page (download / print /
// share, NO canvas). The two pages never share text, and neither shares text
// with the Class 36 lessons or flashcard-library pages (owner
// duplicate-content law). cover.webp is the collection cover (barn, cow, pig,
// chicken, horse, lion and penguin around one page) and is never counted as a
// sheet. CSP-safe: no inline styles anywhere — heroes use .fc2-hero, which is
// already width-capped in style.css.
import {R2,crumbNav,esc} from './adventure-kit.mjs';
import {fcCommunityMount} from './flashcards/index.mjs';

export const AHWS_CLASS_PATH='/preschool/4-years/animals-and-their-habitats/';
export const AHWS_WS_CLASS=AHWS_CLASS_PATH+'worksheets/';
export const AHWS_WS_LIB='/worksheets/animals-and-their-habitats/';
export const AHWS_WS_BASE=R2+'school/preschool/4-years/animals-and-their-habitats/worksheets/';
export const AHWS_WS_COVER={file:'cover.webp',w:1414,h:2000,
 alt:'Cover of the Animals & Their Habitats worksheets set: the title over a busy habitat scene — a red barn with a cow, a pig and a chicken, a horse by a tree, a lion on the sand and a penguin on a rock in the water.'};

export const animalsWs=[
{slug:'desert-animals-and-their-habitat',file:'desert-animals-and-their-habitat-worksheet.webp',w:1414,h:2000,title:'Desert Animals and Their Habitat',word:'DESERT',trace:'DESERT',
 tag:'Circle the desert survivors, match them to dunes, rocks and burrows, count the cacti and trace the word DESERT.',
 meta:'A desert animals worksheet for ages 4–5: circle who really lives in the desert, match camel, fennec fox and lizard to their desert homes, count cacti and trace the word DESERT. Printable.',
 learn:'The desert is hot and dry, and the animals that live there are built for it — padded feet, big ears, burrows under the sand.',
 know:'The word desert, and three desert residents your child can name on sight: camel, fennec fox and lizard.',
 why:'Saying who does NOT belong is the fast route to understanding who does — the penguin and the bear make the desert definition sharp.',
 skills:['Habitat vocabulary','Sorting belong and not belong','Matching animals to homes','Counting to 4','Word tracing'],
 steps:[['Circle','Three of the five animals live in the desert — circle them.'],['Match','Draw a line from each desert animal to its desert home: the rocks, the dunes or the burrow.'],['Count','One group has exactly 3 cacti — count each group and circle the right one.'],['Choose','Two scenes, one desert — circle the sandy one.'],['Trace','Trace the big word DESERT, then try it on your own.']],
 say:'The desert is the hottest, driest home on the sheet — let us find the animals who can take the heat.',
 look:'For the fennec fox ears — huge ears are desert air-conditioning, and your child will love knowing why.',
 ask:'Could the penguin live here? Why not? What would the camel say about all that ice?',
 hint:'Start with the camel — everyone knows that one — and let the other two circle themselves around it.',
 tips:'Sand in a tray plus a toy camel turns the matching row into a small world after the sheet is done.',
 check:'Name one animal from the sheet that would hate the desert — and say why in your own words.',
 real:'On a hot sunny walk, ask: who is the camel of our neighborhood today?'},
{slug:'farm-animals-and-their-habitat',file:'farm-animals-and-their-habitat-worksheet.webp',w:1414,h:2000,title:'Farm Animals and Their Habitat',word:'FARM',trace:'FARM',
 tag:'Circle the farm team, match cow, pig, hen and sheep to their homes, count the hay bales and trace FARM.',
 meta:'A farm animals worksheet for ages 4–5: circle the animals that live on a farm, match each one to its barn, stable, pen or sty, count the hay and trace the word FARM. Printable.',
 learn:'A farm is a habitat people built: every animal on it has a home with a name — barn, sty, coop, pen.',
 know:'The farm team — cow, horse, pig, hen and sheep — and the word farm for the place they all live.',
 why:'The farm is usually a child\'s first habitat with names for the homes themselves, which plants the idea that where you live has a word.',
 skills:['Farm animal names','Home vocabulary: barn, sty, coop, pen','Sorting belong and not belong','Counting to 5','Word tracing'],
 steps:[['Circle','Four of these five animals live on a farm — circle the whole farm team.'],['Match','Draw a line from each animal to its home: the barn, the sty, the stable and the pen.'],['Count','Count the hay bales in each group and circle the group with exactly 4.'],['Choose','One scene is the farm — circle it and name what you see in it.'],['Trace','Trace the word FARM, then write it yourself in the box.']],
 say:'The farm is the one habitat with a barn in it. Let us get every animal home before supper.',
 look:'For the lion sitting in the circle row — he does not belong, and catching him is the game.',
 ask:'Who sleeps in the barn? Who loves the mud? Which animal on this sheet have you seen for real?',
 hint:'The sheep is not in the circle row — she appears in the matching row, so keep her home ready too.',
 tips:'After the sheet, line up toy farm animals and build each home from blocks — the words come out on their own.',
 check:'Ask where the pig lives, where the hen lives — two answers, no paper, real memory.',
 real:'Visit a farm or a petting zoo and find one home from the sheet in real life — barns count double.'},
{slug:'forest-animals-and-their-habitat',file:'forest-animals-and-their-habitat-worksheet.webp',w:1414,h:2000,title:'Forest Animals and Their Habitat',word:'FOREST',trace:'FOREST',
 tag:'Circle the forest dwellers, match them to hollows, dens and thickets, count the trees and trace FOREST.',
 meta:'A forest animals worksheet for ages 4–5: circle who lives in the forest, match squirrel, bear and deer to their forest homes, count the trees and trace the word FOREST. Printable.',
 learn:'The forest is a home you can walk under: tall trees give food, shade and hiding places, and every forest animal uses them its own way.',
 know:'The word forest, and three forest neighbors — squirrel, bear and deer — plus the fox who lives there too.',
 why:'Forests are the habitat children meet in storybooks first; naming its residents turns familiar pictures into real knowledge.',
 skills:['Habitat vocabulary','Matching animals to homes','Sorting belong and not belong','Counting to 5','Word tracing'],
 steps:[['Circle','Three of the five animals live in the forest — circle the forest friends.'],['Match','Draw a line from squirrel, bear and deer to the tree hollow, the cave and the bush.'],['Count','One group has exactly 4 trees — count each row and circle it.'],['Choose','Two scenes — circle the one that shows the forest.'],['Trace','Trace the big word FOREST, letter by letter, then write it once.']],
 say:'Under the tall trees lives a whole neighborhood — let us meet who hides in the forest.',
 look:'For the camel standing in the circle row — sand feet have no business in the woods, and that is the laugh of the sheet.',
 ask:'Who stores food in a tree? Who sleeps all winter? Where would you hide if you were small and furry?',
 hint:'The tree hollow and the bush are close together in the matching row — slow lines, no guessing.',
 tips:'On the next walk under trees, play spot-the-home: holes, nests, burrows all count.',
 check:'Point at the deer: what does the forest give it to eat? Leaves and twigs is a right answer.',
 real:'Collect one fallen leaf on your next walk and call it forest mail — delivered to the fridge.'},
{slug:'ocean-animals-and-their-habitat',file:'ocean-animals-and-their-habitat-worksheet.webp',w:1414,h:2000,title:'Ocean Animals and Their Habitat',word:'OCEAN',trace:'OCEAN',
 tag:'Circle who lives under the waves, match whale, clownfish and turtle to their ocean homes, count fish and trace OCEAN.',
 meta:'A ocean animals worksheet for ages 4–5: circle the ocean animals, match the whale, clownfish and sea turtle to the reef, the open sea and the seabed, count the fish and trace the word OCEAN. Printable.',
 learn:'The ocean is the biggest habitat on Earth — and even inside it, animals split it up: the reef, the open water, the sandy floor.',
 know:'The word ocean, and three ocean residents on the sheet: whale, clownfish and sea turtle.',
 why:'Splitting one huge habitat into addresses — reef, open sea, seabed — is the first step from "fish live in water" to real ecology.',
 skills:['Habitat vocabulary','Matching animals to ocean homes','Sorting belong and not belong','Counting to 6','Word tracing'],
 steps:[['Circle','Three of the five animals live in the ocean — circle the swimmers.'],['Match','Draw a line from whale, clownfish and turtle to the open sea, the coral reef and the seabed.'],['Count','Count the fish in each group and circle the group with exactly 5.'],['Choose','One picture is the ocean — circle it and name one thing that lives there.'],['Trace','Trace the big word OCEAN, then write it in the box.']],
 say:'The ocean is one home so big it has rooms inside it — let us find who lives where.',
 look:'For the cow standing quietly in the circle row — dry land is her whole world, and that is the point.',
 ask:'Who breathes air but lives in the sea? (The whale — a real surprise.) Who paints the reef orange?',
 hint:'The seabed scene has seaweed on the sand — that clue separates it from the open blue water.',
 tips:'A bathtub becomes the open sea, a sponge the reef — retell the matching row with bath toys.',
 check:'Name two animals from the sheet that could never live in the ocean — and one that could.',
 real:'At bath time or a aquarium visit, use the three ocean words: reef, open sea, seabed.'},
{slug:'polar-animals-and-their-habitat',file:'polar-animals-and-their-habitat-worksheet.webp',w:1414,h:2000,title:'Polar Animals and Their Habitat',word:'POLAR',trace:'POLAR',
 tag:'Circle who thrives in the ice, match polar bear, penguin and arctic fox to their icy homes, count ice blocks and trace POLAR.',
 meta:'A polar animals worksheet for ages 4–5: circle the polar animals, match the polar bear, penguin and arctic fox to the ice floe, the icebergs and the snowy hills, count ice blocks and trace the word POLAR. Printable.',
 learn:'The polar regions are the coldest habitats on Earth, and their animals wear built-in coats — thick fur or a layer of fat.',
 know:'The word polar, and three ice-ready residents: polar bear, penguin and arctic fox.',
 why:'Extreme habitats make the matching rule obvious: nobody survives the ice without the right equipment, and the sheet shows exactly whose bodies have it.',
 skills:['Habitat vocabulary','Matching animals to icy homes','Sorting belong and not belong','Counting to 5','Word tracing'],
 steps:[['Circle','Three of the five animals love the ice — circle the polar team.'],['Match','Draw a line from polar bear, penguin and arctic fox to the ice floe, the icebergs and the snowy hills.'],['Count','Count the ice blocks in each group and circle the group with exactly 4.'],['Choose','Two scenes, one frozen — circle the polar habitat.'],['Trace','Trace the big word POLAR, then write it on your own.']],
 say:'The coldest homes on Earth belong to the warmest-dressed animals — let us meet the polar team.',
 look:'For the monkey in the circle row — jungle arms would freeze in a minute, and your child will know exactly why.',
 ask:'What do polar bears and penguins both wear that we have to zip on? Who slides on their tummy?',
 hint:'Flat floating ice is the floe, tall pointy ice is the icebergs — say the two words and the match does itself.',
 tips:'Freeze a small bowl of water, slide the toy penguin on top, and the floe word becomes real.',
 check:'Ask which is colder, our winter or the polar regions — then ask what the fox wears to be sure.',
 real:'Next snowy or cold day, one minute of penguin walking — wings in, tiny steps, the word polar said twice.'},
{slug:'wetland-animals-and-their-habitat',file:'wetland-animals-and-their-habitat-worksheet.webp',w:1414,h:2000,title:'Wetland Animals and Their Habitat',word:'WETLAND',trace:'WETLAND',
 tag:'Circle who lives in the wetland, match frog, egret and crocodile to their soggy homes, count lily pads and trace WETLAND.',
 meta:'A wetland animals worksheet for ages 4–5: circle the wetland animals, match the frog, egret and crocodile to the pond, the reeds and the burrow, count lily pads and trace the word WETLAND. Printable.',
 learn:'A wetland is land that is soaked — ponds, reeds and mud — and it is a dinner, a bath and a hiding place all at once.',
 know:'The word wetland, and three wetland regulars on the sheet: frog, egret and crocodile.',
 why:'The wetland is the habitat that is neither dry nor deep — naming it teaches children that habitats come in every in-between flavor, not just desert versus ocean.',
 skills:['Habitat vocabulary','Matching animals to wetland homes','Sorting belong and not belong','Counting to 4','Word tracing'],
 steps:[['Circle','Four of the five animals live in the wetland — circle the whole soggy team.'],['Match','Draw a line from frog, egret and crocodile to the lily pond, the reedy bank and the mud burrow.'],['Count','One group has exactly 4 lily pads — count each group and circle it.'],['Choose','Two scenes — circle the one that shows the wetland.'],['Trace','Trace the big word WETLAND, then write it in the box.']],
 say:'Where the water meets the grass, the wetland squelches — let us find who loves it that way.',
 look:'For the duck — she is in the circle row but not the matching row, so she needs a circle and a wave goodbye.',
 ask:'Who hops and who wades? What does the crocodile use the mud for? Have you ever heard frogs at night?',
 hint:'The frog is the easy anchor — he lives half in the water and half on the lily pads.',
 tips:'After the sheet, jump like a frog, wade slowly like an egret and snap like a crocodile — three animals, three moves.',
 check:'Name the three wetland homes without the paper: pond, reeds, burrow.',
 real:'Pass any pond or canal on your walks and ask: who from our sheet could live here?'},
];

export const animalsWsBySlug=Object.fromEntries(animalsWs.map(w=>[w.slug,w]));
export function animalsWsNeighbours(w){
 const i=animalsWs.indexOf(w);
 return {prev:animalsWs[(i-1+animalsWs.length)%animalsWs.length],next:animalsWs[(i+1)%animalsWs.length]};
}

/* ---------- the Learning Path ACTIVITY page (canvas LEFT, guidance RIGHT) --- */
export function animalsWsActivityBody(w,site){
 const {prev,next}=animalsWsNeighbours(w);
 const enc=encodeURIComponent;
 const pageUrl=site+AHWS_WS_CLASS+w.slug+'/';
 const shareTitle=`${w.title} — a Animals & Their Habitats worksheet activity for ages 4–5 from Kiddo.school`;
 const stepsHtml=w.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${i+1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
 const pn=`<nav class="fc2-pn" aria-label="Previous and next worksheet activity"><a class="fc2-pn-btn" href="${AHWS_WS_CLASS}${prev.slug}/" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.title)}</strong><span>Previous activity</span></a><a class="fc2-pn-btn fc2-pn-next" href="${AHWS_WS_CLASS}${next.slug}/" rel="next"><strong>${esc(next.title)}</strong> <span aria-hidden="true">→</span><span>Next activity</span></a></nav>`;
 return `${crumbNav([['Learning Path','/learning-path/'],['Animals &amp; Their Habitats',AHWS_CLASS_PATH],[esc(w.title)+' worksheet']])}
 <div class="page-heading wrap"><span class="eyebrow">HABITAT WORKSHEET ACTIVITY · CLASS 36 · AGES 4–5</span><h1>${esc(w.title)} — solve it right on the sheet.</h1><p>${esc(w.tag)}</p></div>
 <div class="fc2-dual wrap ls-dual">
  <div class="fc2-main">
   <section class="wc-section" aria-label="The worksheet — draw right on it" id="the-activity">
    <div class="wc-head"><span class="eyebrow">THE WORKSHEET — WRITE AND DRAW RIGHT ON IT</span><h2>Your sheet is ready.</h2><p class="lesson-copy">Pick a color or the eraser, then circle, match, count, choose and trace straight on the sheet with your finger, a stylus or the mouse. Press Save my work when you are proud — that is what marks this activity cleared for your child.</p></div>
    <div class="wc-mount" data-ahws-activity="${w.slug}" data-wc data-wc-src="${esc(AHWS_WS_BASE+w.file)}?draw=1" data-wc-name="${esc(w.title)} animals habitats worksheet" data-wc-w="${w.w}" data-wc-h="${w.h}" data-wc-toolbar="#ahws-tools" data-wc-restore="animals-and-their-habitats/${w.slug}">
     <figure class="fc2-hero ws-hero-art ls-sheet"><img src="${esc(AHWS_WS_BASE+w.file)}?draw=1" width="${w.w}" height="${w.h}" alt="The full ${esc(w.title)} habitat worksheet: ${esc(w.tag)}" fetchpriority="high" crossorigin="anonymous"></figure>
    </div>
    <noscript><p class="fc-hint">Solving on the sheet needs JavaScript. The printable twin at <a href="${AHWS_WS_LIB}${w.slug}/">${AHWS_WS_LIB.slice(0,-1)+w.slug+'/'} /</a> always works.</p></noscript>
   </section>
   ${pn}
  </div>
  <aside class="fc2-rail" aria-label="Instructions, drawing tools and saved progress">
   <section class="fc2-block fc2-first-block"><span class="eyebrow">HOW TO DO IT</span><h2>Five little steps.</h2><ol class="fc-steps">${stepsHtml}</ol><p class="fc-hint">Ask a grown-up to read the steps aloud the first time. After that, you know just what to do.</p></section>
   <section class="fc2-block" id="ahws-tools" aria-label="Drawing tools"><span class="eyebrow">YOUR PENCIL CASE</span><h2>Pick your tools.</h2><p class="fc-hint">Pencil, nine crayons, an eraser, undo, redo and clear — the tools appear right here and work on the sheet. Save keeps your finished work as a picture, and your saved work comes back next time.</p></section>
   <section class="fc2-block" data-ahws-progress-block><span class="eyebrow">MY PROGRESS</span><h2>Save it to keep it.</h2><p class="ls-progress-line" data-ahws-progress aria-live="polite">This activity is cleared for you the moment you save your finished sheet. Nothing counts until then — opening the page is just opening the door.</p><p class="ls-progress-done" data-ahws-done hidden><strong>Cleared!</strong> Your saved work for this sheet is in your downloads, and the ribbon is on in <a href="${AHWS_CLASS_PATH}">Class 36</a>.</p></section>
   <section class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS ACTIVITY</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this activity on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}" target="_blank" rel="noopener" aria-label="Share this activity on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+pageUrl)}" target="_blank" rel="noopener" aria-label="Share this activity on WhatsApp">WhatsApp</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div></section>
   <section class="fc2-block"><span class="eyebrow">PREFER PAPER?</span><h2>Print the twin.</h2><p class="fc-hint">The same sheet lives in the worksheet library with its download and print buttons: <a href="${AHWS_WS_LIB}${w.slug}/">/worksheets/animals-and-their-habitats/${w.slug}/</a>. Crayons beat styluses sometimes.</p></section>
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
  <p class="lesson-copy">This activity belongs to <a href="${AHWS_CLASS_PATH}">Class 36 — Animals &amp; Their Habitats</a> on the Learning Path. Progress is saved on this device for the child chosen in <a href="/my-classroom/">My Classroom</a> — and only a real save of finished work marks it cleared, never just opening the page.</p>
 </section>
 ${fcCommunityMount(AHWS_WS_CLASS+w.slug+'/')}`;
}

/* ---------- the PRINTABLE library page (NO canvas) ---------- */
export function animalsWsPrintableBody(w,site){
 const {prev,next}=animalsWsNeighbours(w);
 const enc=encodeURIComponent;
 const file=AHWS_WS_BASE+w.file;
 const pageUrl=site+AHWS_WS_LIB+w.slug+'/';
 const shareTitle=`${w.title} Worksheet for Ages 4–5 — printable from Kiddo.school`;
 const dlName=`animals-habitats-${w.slug}.webp`;
 const stepsHtml=w.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${i+1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
 const pn=`<nav class="fc2-pn" aria-label="Previous and next worksheet"><a class="fc2-pn-btn" href="${AHWS_WS_LIB}${prev.slug}/" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.title)}</strong><span>Previous worksheet</span></a><a class="fc2-pn-btn fc2-pn-next" href="${AHWS_WS_LIB}${next.slug}/" rel="next"><strong>${esc(next.title)}</strong> <span aria-hidden="true">→</span><span>Next worksheet</span></a></nav>`;
 const share=`<div class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS WORKSHEET</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this worksheet on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}" target="_blank" rel="noopener" aria-label="Share this worksheet on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+pageUrl)}" target="_blank" rel="noopener" aria-label="Share this worksheet on WhatsApp">WhatsApp</a><a class="fc2-share-btn" href="https://pinterest.com/pin/create/button/?url=${enc(pageUrl)}&media=${enc(file)}&description=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Save this worksheet on Pinterest">Pinterest</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div><p class="fc-hint">Share buttons open in a new tab. The copy button copies this page&rsquo;s address — nothing is tracked.</p></div>`;
 return `${crumbNav([['Worksheets','/worksheets/'],['Animals &amp; Their Habitats',AHWS_WS_LIB],[w.title]])}
 <div class="page-heading wrap"><span class="eyebrow">WORKSHEET · CLASS 36 · AGES 4–5</span><h1>${esc(w.title)} Worksheet for Ages 4–5</h1><p>${esc(w.meta)}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main">
   <section class="wc-section" aria-label="This worksheet" id="the-worksheet">
    <div class="wc-head"><span class="eyebrow">THE WORKSHEET</span><h2>The full sheet, exactly as the artist drew it.</h2><p class="lesson-copy">See the whole sheet, download the original file or print it from your browser. Want your child to solve it on screen first? The interactive version lives at <a href="${AHWS_WS_CLASS}${w.slug}/">${AHWS_WS_CLASS.slice(1)+w.slug+'/'} /</a> — same sheet, drawing layer included.</p></div>
    <figure class="fc2-hero ws-hero-art"><img src="${esc(file)}" width="${w.w}" height="${w.h}" alt="The full ${esc(w.title)} habitat worksheet: ${esc(w.tag)}" fetchpriority="high"></figure>
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
    <div class="fc2-actions"><button type="button" class="button ws-dl" data-ahws-download="${esc(file)}" data-ahws-filename="${dlName}">Download original sheet <span aria-hidden="true">↓</span></button><button type="button" class="button button-ghost ws-print" data-ahws-print>Print this sheet <span aria-hidden="true">⌘</span></button></div>
    <p class="fc-hint">The download keeps the original WebP picture, full size (1414×2000, A4 portrait). Print opens your browser&rsquo;s print dialog with just the sheet — nothing stored.</p>
   </section>
   ${share}
   ${fcCommunityMount(AHWS_WS_LIB+w.slug+'/')}
   <section class="fc2-block"><span class="eyebrow">PREFER ON SCREEN?</span><h2>Solve it here.</h2><p class="fc-hint">The on-screen version of this sheet — drawing layer, five steps, save-your-work and all — lives at <a href="${AHWS_WS_CLASS}${w.slug}/">${AHWS_WS_CLASS.slice(1)+w.slug+'/'} /</a>.</p></section>
   <section class="fc2-block"><span class="eyebrow">WHERE THIS FITS</span><h2>The class behind it.</h2><p class="lesson-copy">This worksheet belongs to <a href="${AHWS_CLASS_PATH}">Class 36 — Animals &amp; Their Habitats</a> on the Learning Path, and the whole collection lives at <a href="${AHWS_WS_LIB}">/worksheets/animals-and-their-habitats/</a>. One finished sheet is a full session — print it, solve it together, and let the fridge door be the gallery.</p></section>
  </aside>
 </div>
 <section class="wrap fc-section" aria-label="More habitat worksheets"><span class="eyebrow">MORE HABITAT SHEETS</span><h2>More sheets like this one.</h2>
  <div class="ws-grid">${animalsWs.filter(x=>x.slug!==w.slug).map(x=>`<a class="ws-card" href="${AHWS_WS_LIB}${x.slug}/"><span class="ws-card-art"><img src="${esc(AHWS_WS_BASE+x.file)}" width="707" height="1000" alt="${esc(x.meta)}" loading="lazy"></span><span class="ws-card-body"><strong>${esc(x.title)} Worksheet</strong><span class="ws-card-meta"><span>Ages 4–5</span><span>Class 36</span></span><span class="ws-card-desc">${esc(x.tag)}</span></span><span class="ws-card-open">View Worksheet <span aria-hidden="true">→</span></span></a>`).join('')}</div>
 </section>`;
}

/* ---------- the /worksheets/ collection page ---------- */
export function animalsWsCategoryBody(){
 const cards=animalsWs.map(w=>`<a class="ws-card" href="${AHWS_WS_LIB}${w.slug}/">
  <span class="ws-card-art"><img src="${esc(AHWS_WS_BASE+w.file)}" width="707" height="1000" alt="${esc(w.meta)}" loading="lazy"></span>
  <span class="ws-card-body"><strong>${esc(w.title)} Worksheet</strong><span class="ws-card-meta"><span>Ages 4–5</span><span>Class 36</span><span>Animals &amp; Habitats</span></span><span class="ws-card-desc">${esc(w.tag)}</span></span>
  <span class="ws-card-open">View Worksheet <span aria-hidden="true">→</span></span>
 </a>`).join('');
 return `${crumbNav([['Worksheets','/worksheets/'],['Animals &amp; Their Habitats']])}
 <div class="page-heading wrap"><span class="eyebrow">ANIMAL &amp; HABITAT WORKSHEETS · AGES 4–5</span><h1>Animals &amp; Their Habitats worksheets — printables for little hands.</h1><p>Six genuine habitat sheets, one for each big home: the desert, the farm, the forest, the ocean, the polar regions and the wetland. On every sheet your child circles who lives there, matches each animal to its home, counts, chooses the right scene and traces the habitat word. Download the original sheet, print it, or solve every sheet on screen in <a href="${AHWS_CLASS_PATH}">Class 36</a> first.</p></div>
 <section class="wrap section compact" aria-label="The habitat worksheet collection">
  <figure class="fc2-hero ws-hero-art ws-cover-sm"><img src="${esc(AHWS_WS_BASE+AHWS_WS_COVER.file)}" width="${AHWS_WS_COVER.w}" height="${AHWS_WS_COVER.h}" alt="${esc(AHWS_WS_COVER.alt)}" fetchpriority="high"></figure>
  <div class="ws-grid">${cards}</div>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>Where these come from.</h2>
  <div class="fc-stages">
   <a class="fc-stage lesson-card-link" href="${AHWS_CLASS_PATH}"><div class="fc-stage-pills"><span class="fc-age">Ages 4–5</span><span class="fc-class">Class 36</span></div><h3>Animals &amp; Their Habitats</h3><p>The class behind these worksheets — twenty-two step-by-step habitat lessons, from a rabbit in the meadow to a whale in the deep blue.</p><span class="fc-open">Open Class 36 <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/flashcards/animals-and-their-habitats/"><div class="fc-stage-pills"><span class="fc-age">Ages 4–5</span><span class="fc-class">Library</span></div><h3>The Habitat Flashcards</h3><p>The matching card collection — twenty-two animals in their homes, each with a printable card and short notes for playing animal match at home.</p><span class="fc-open">Open the flashcards <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/worksheets/"><div class="fc-stage-pills"><span class="fc-age">All ages</span><span class="fc-class">Library</span></div><h3>The Worksheet Library</h3><p>All the school&rsquo;s printable subjects, each with its own page, download and print buttons.</p><span class="fc-open">Browse all worksheets <span aria-hidden="true">↗</span></span></a>
  </div>
 </section>`;
}

/* ---------- schema ---------- */
export function animalsWsSchema(site,w){
 return {'@context':'https://schema.org','@type':'LearningResource',
  name:`${w.title} Worksheet for Ages 4–5`,
  description:w.meta,url:site+AHWS_WS_LIB+w.slug+'/',inLanguage:'en',
  learningResourceType:'Worksheet',educationalLevel:'Preschool',teaches:w.skills.join(', '),
 ageRange:'4-5',encodingFormat:'image/webp',contentUrl:AHWS_WS_BASE+w.file,image:AHWS_WS_BASE+w.file,
  about:{'@type':'Thing',name:'Animals & Their Habitats'},
  provider:{'@type':'Organization',name:'Kiddo.school',url:site+'/'},
  isPartOf:{'@type':'CreativeWorkSeries',name:'Animals & Their Habitats (Class 36)',url:site+AHWS_CLASS_PATH}};
}
