// Age 3 Class 7 — Body Parts & My Five Senses: guards for the lesson, the
// print view, the flashcard set, the twenty-four card pages and the
// whole-school wiring. The honest-audio rule is enforced in code: this class
// ships NO sound controls at all (no recordings exist for body parts), so no
// play buttons and no mp3 references may appear. Games are checked
// structurally: ten find-it rounds (five Point & Find, five Let's Play) with
// exactly one correct real-card choice each, and a five-by-five match board
// whose pairs are the true organ→sense pairs.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const root=resolve('dist');
const read=p=>readFileSync(resolve(root,p),'utf8');

const c7=read('preschool/3-years/body-parts-and-five-senses/index.html');
const c7p=read('preschool/3-years/body-parts-and-five-senses/print/index.html');
const c7set=read('flashcards/body-parts-and-five-senses/index.html');
const c7head=read('flashcards/body-parts-and-five-senses/head/index.html');
const C7_CARDS=['01-head.webp','02-eyes.webp','03-ears.webp','04-nose.webp','05-mouth.webp','06-hands.webp','07-feet.webp','08-arms.webp','09-legs.webp','10-see.webp','11-hear.webp','12-smell.webp','13-fingers.webp','14-toes.webp','15-skin.webp','16-tongue.webp','17-touch.webp','18-taste.webp','19-hair.webp','20-chin.webp','21-cheeks.webp','22-look.webp','23-listen.webp','24-feel.webp'];
const C7_SLUGS=['head','eyes','ears','nose','mouth','hands','feet','arms','legs','see','hear','smell','fingers','toes','skin','tongue','touch','taste','hair','chin','cheeks','look','listen','feel'];
const C7_R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/preschool-learning-cards/body-parts-and-five-senses-age-3';
const c6=read('preschool/3-years/animals-and-their-sounds/index.html');
const home=read('index.html');
const about=read('about/index.html');
const lp=read('learning-path/index.html');
const stage=read('preschool/3-years/index.html');
const hub=read('preschool/index.html');
const library=read('learning-library/index.html');

test('class 7 (Body Parts & My Five Senses, Preschool 7) follows the preschool class spec',()=>{
 assert.ok(c7.includes('rel="canonical" href="https://kiddo-school.pages.dev/preschool/3-years/body-parts-and-five-senses/"'));
 assert.ok(c7.includes('<title>Body Parts &amp; My Five Senses for 3 Year Olds | Kiddo.school</title>'));
 assert.ok(c7.includes('<h1>Body Parts &amp; My Five Senses</h1>'));
 assert.ok(c7.includes('PRESCHOOL · AGE 3 · CLASS 7'));
 assert.ok(c7.includes('<strong>Class</strong> Preschool 7'));
 assert.ok(c7.includes('this class follows Animals &amp; Their Sounds on the preschool path'));
 for(const step of ['Teacher welcome','Meet your body','Point &amp; find','My five senses','Match the sense','Let’s play','Take it off screen','Class complete'])assert.ok(c7.includes(step),step);
 for(const id of ['meet-your-body','point-and-find','my-five-senses','match-the-sense','lets-play','off-screen','printables','class-complete','how-to','todays-class'])assert.ok(c7.includes('id="'+id+'"'),id);
 for(const f of C7_CARDS)assert.ok(c7.includes('/'+f+'"'),'card file '+f);
 // two learn viewers, two group-chip bars, every card carrying say + find data
 assert.equal([...c7.matchAll(/data-lv-grid/g)].length,2);
 assert.equal([...c7.matchAll(/data-bp-groups/g)].length,2);
 for(const g of ['data-bp-group-filter="all"','data-bp-group-filter="face"','data-bp-group-filter="hands"','data-bp-group-filter="limbs"','data-bp-group-filter="senses"','data-bp-group-filter="words"'])assert.ok(c7.includes(g),g);
 assert.equal([...c7.matchAll(/data-lv-say=/g)].length,23,'say caption on every viewer card except the first of each viewer');
 assert.equal([...c7.matchAll(/data-lv-find=/g)].length,23);
 // the five senses sentence: eyes see, ears hear, nose smells, tongue tastes, skin touches
 assert.ok(c7.includes('Eyes see, ears hear, the nose smells, the tongue tastes, the skin touches'));
 // family feedback + flashcards pill, same as every class
 assert.ok(c7.includes('data-cm-root data-page-path="/preschool/3-years/body-parts-and-five-senses/"'));
 assert.ok(c7.includes('href="/flashcards/body-parts-and-five-senses/"'));
 assert.ok(c7.includes('Prefer printed cards?'),'flashcards pill injected');
 assert.ok(c7.includes('/assets/body-parts-class.js'),'class script loads');
 assert.ok(c7.includes('no scores'),'no-score promise stated');
 assert.ok(!c7.includes('aria-label="undefined"'),'no broken aria-labels');
});

test('class 7 ships no audio controls at all — honesty over fake sound',()=>{
 assert.ok(!c7.includes('.mp3'),'no mp3 references on the class page');
 assert.ok(!c7.includes('data-an-sound'),'no animal-sound play controls');
 assert.ok(!c7set.includes('.mp3'),'no mp3 references on the set page');
 for(const s of C7_SLUGS)assert.ok(!c7.includes('sounds/'+s+'.mp3'),'no sound file claimed for '+s);
});

test('class 7 games: ten rounds, three real-card choices each, exactly one correct',()=>{
 // ten rounds total: five point-and-find + five lets-play
 assert.equal([...c7.matchAll(/data-tc-round/g)].length,10);
 assert.equal([...c7.matchAll(/class="tc-choice"/g)].length,30);
 assert.equal([...c7.matchAll(/data-tc-correct="true"/g)].length,10,'exactly one correct choice per round');
 // every round's ask is present and each correct card is the card the ask names
 const rounds=[...c7.matchAll(/data-tc-ask="([^"]*)">[\s\S]*?<\/p>\s*<div class="tc-choices"[^>]*>([\s\S]*?)<\/div>/g)];
 assert.equal(rounds.length,10);
 const WORDS={head:'head',eyes:'eyes',ears:'ears',nose:'nose',mouth:'mouth',hands:'hands',feet:'feet',arms:'arms',legs:'legs',see:'see',hear:'hear',smell:'smell',fingers:'fingers',toes:'toes',skin:'skin',tongue:'tongue',touch:'touch',taste:'taste',hair:'hair',chin:'chin',cheeks:'cheeks',look:'look',listen:'listen',feel:'feel'};
 for(const r of rounds){
  const ask=r[1].toLowerCase();
  const correct=[...r[2].matchAll(/class="tc-choice" aria-label="([^"]*)" data-tc-correct="true"/g)].map(m=>m[1].toLowerCase());
  assert.equal(correct.length,1,'one correct per round: '+ask);
  const word=correct[0];
  const stem=word.endsWith('e')?word.slice(0,-1):word;
  assert.ok(ask.includes(stem),'ask "'+ask+'" names the correct card "'+word+'"');
 }
 // match board: 5 organs left, 5 sense words right, true pairs
 assert.equal([...c7.matchAll(/data-match-side="left"/g)].length,5);
 assert.equal([...c7.matchAll(/data-match-side="right"/g)].length,5);
 const TRUE_PAIRS={eyes:'see',ears:'hear',nose:'smell',tongue:'taste',skin:'touch'};
 for(const [organ,sense] of Object.entries(TRUE_PAIRS)){
  const left=new RegExp('data-match-pair="'+sense+'" data-match-side="left" aria-label="'+organ);
  assert.ok(new RegExp('data-match-pair=\"'+sense+'\" data-match-side=\"left\" aria-label=\"'+organ,'i').test(c7),'left card '+organ+' paired to '+sense);
  assert.ok(c7.includes('data-match-pair="'+sense+'" data-match-side="right"'),'right word card for '+sense);
 }
});

test('class 7 print view prints the same twenty-four R2 assets two to a page',()=>{
 assert.ok(c7p.includes('content="noindex,follow"'));
 assert.ok(c7p.includes('<body class="print-view">'));
 assert.ok(c7p.includes('Body Parts &amp; Five Senses Flashcards: print all twenty-four cards'));
 assert.equal([...c7.matchAll(/tc-print-sheet/g)].length,0,'no print sheets on the class page itself');
 assert.equal([...c7p.matchAll(/class="tc-print-sheet"/g)].length,12,'twelve sheets of two');
 assert.equal([...c7p.matchAll(new RegExp(C7_R2.replaceAll('.','\\.'),'g'))].length,24,'every card asset referenced once');
 assert.ok(!c7p.includes('loading="lazy"'),'print images load eagerly');
 for(const f of C7_CARDS)assert.ok(c7p.includes('/'+f+'"'),'print card '+f);
});

test('class 7 flashcard set page lists all twenty-four cards with their own pages',()=>{
 assert.ok(c7set.includes('rel="canonical" href="https://kiddo-school.pages.dev/flashcards/body-parts-and-five-senses/"'));
 assert.ok(c7set.includes('<h1>Body Parts & Five Senses Flashcards for Preschoolers</h1>'));
 assert.equal([...c7set.matchAll(/href="\/flashcards\/body-parts-and-five-senses\/[a-z]+\/"/g)].length,24,'24 card links');
 for(const s of C7_SLUGS)assert.ok(c7set.includes('/flashcards/body-parts-and-five-senses/'+s+'/'),'card link '+s);
 assert.ok(c7set.includes(C7_R2+'/cover.webp'),'set page references the real cover');
 assert.ok(c7set.includes('data-fc-root data-page-path="/flashcards/body-parts-and-five-senses/"'),'community mount on set page');
 assert.ok(c7set.includes('Print the full set'),'print path surfaced');
 assert.ok(c7set.includes('/preschool/3-years/body-parts-and-five-senses/'),'links back to the class');
 // the set cover renders at its true square 1264x1264 ratio on the library wall
 const lib=read('flashcards/index.html');
 assert.ok(lib.includes('src="'+C7_R2+'/cover.webp" width="1264" height="1264"'),'library wall uses true cover dims');
 // no repeated cover figure on the set page (the wall already showed it)
 assert.ok(!c7set.includes('fc-setcard'),'no set-card figure on the set page');
});

test('all twenty-four card pages exist with unique metadata, downloads and navigation',()=>{
 const titles=new Set(),descs=new Set();
 for(const s of C7_SLUGS){
  const html=read('flashcards/body-parts-and-five-senses/'+s+'/index.html');
  const title=html.match(/<title>(.*?)<\/title>/)[1];
  const desc=html.match(/name="description" content="([^"]+)"/)[1];
  assert.ok(!titles.has(title),'unique title for '+s);titles.add(title);
  assert.ok(!descs.has(desc),'unique description for '+s);descs.add(desc);
  assert.ok(html.includes('<h1>'+s.charAt(0).toUpperCase()+s.slice(1)+' Flashcard for Preschoolers</h1>'),'H1 for '+s);
  assert.ok(html.includes('<a class="button" href="'+C7_R2+'/'+(C7_SLUGS.indexOf(s)+1<10?'0':'')+(C7_SLUGS.indexOf(s)+1)+'-'+s+'.webp" download="'),'working download for '+s);
  assert.ok(html.includes('data-fc-root data-page-path="/flashcards/body-parts-and-five-senses/'+s+'/"'),'community mount on '+s);
  assert.ok(html.includes('rel="prev"')&&html.includes('rel="next"'),'prev/next on '+s);
  assert.ok(html.includes('RELATED CARDS'),'related cards on '+s);
  assert.ok(html.includes('/preschool/3-years/body-parts-and-five-senses/'),'lesson link on '+s);
  assert.ok(!html.includes('.mp3'),'no audio claimed on '+s);
 }
 // prev/next wrap: head's previous card is feel (last), head's next is eyes
 assert.ok(c7head.includes('href="/flashcards/body-parts-and-five-senses/feel/" rel="prev"'));
 assert.ok(c7head.includes('href="/flashcards/body-parts-and-five-senses/eyes/" rel="next"'));
});

test('class 7 is wired into the whole school honestly',()=>{
 // learning path: Class 21 row, count text updated
 assert.ok(lp.includes('Class 21: <a href="/preschool/3-years/body-parts-and-five-senses/">Body Parts &amp; My Five Senses</a>'));
 assert.ok(lp.includes('twenty-six age-guided classes'));
 assert.ok(lp.includes('Twenty-six classes are ready now, from birth to age five, in one calm sequence.'));
 // homepage: count + preschool age card
 assert.ok(home.includes('Twenty-six classes are ready now, from birth to age five'));
 assert.ok(home.includes('Letters, numbers, shapes, colors, opposites, animals, your body with all five senses — and the foods you eat.'));
 // about page count
 assert.ok(about.includes('Twenty-six classes from birth to age five are ready today'));
 // preschool hub + stage
 assert.ok(hub.includes('Eight classes ready now'));
 assert.ok(stage.includes('<strong>Status</strong> Eight classes ready now'));
 assert.ok(stage.includes('href="/preschool/3-years/body-parts-and-five-senses/"'));
 assert.ok(stage.includes('Body Parts &amp; My Five Senses'));
 assert.ok(stage.includes('href="/flashcards/body-parts-and-five-senses/"'));
 // the library is books-only now: classes and flashcards live on hubs
 assert.ok(!library.includes('/preschool/3-years/'),'books-only library lists no classes');
 // class 6 completion links class 7 as the real next stop
 assert.ok(c6.includes('href="/preschool/3-years/body-parts-and-five-senses/"'));
 assert.ok(c6.includes('Go to the next class'));
 // class 6 keeps its own spec: its completion no longer lists a generic more-classes card
 assert.ok(!c6.includes('More preschool classes</h3>'),'class 6 now points to the real next class');
});

test('class 7 keeps the no-score, no-timer, no-streak promises',()=>{
 // strip the honest no-score phrases, then assert no real scoring language remains
 const clean=h=>h
  .replace(/no scores, no timers and nothing to lose/g,'')
  .replace(/no scores, no sign-up/g,'')
  .replace(/no hurry, no score, just pairs/g,'')
  .replace(/there are no points, no timers and nothing to lose/g,'')
  .replace(/there is never a score at the end/g,'')
  .replace(/no score at the end/g,'')
  .replace(/no scores, no timers, nothing stored/g,'');
 for(const [name,htmlRaw] of [['class',c7],['set',c7set],['print',c7p]]){
  const html=clean(htmlRaw);
  assert.doesNotMatch(html,/\bscore\b|\btimer\b|\bstreak\b|leaderboard|points for|countdown/i,name+' stays score-free');
 }
 assert.ok(!c7.includes('setInterval')&&!c7.includes('countdown'),'no timers');
});
