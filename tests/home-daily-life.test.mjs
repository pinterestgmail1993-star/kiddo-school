import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
import {lpContent} from '../src/flashcards/lp-home-daily-life.mjs';
import {EXTRA_CLASSES} from '../src/extra-classes.mjs';
const read=f=>readFileSync(f,'utf8');
const readPage=p=>readFileSync('dist'+p+'index.html','utf8');
const site='https://kiddo.school';

/* ---------------------------------------------- THE HOME AND DAILY LIFE SET */
const set=fcSetBySlug['home-and-daily-life'];
const setHtml=readPage('/flashcards/home-and-daily-life/');
const cover=set.cover;
const ORDER=['rooms-at-home','parts-of-a-home-inside','parts-of-a-home-outside','living-room-words','furniture-words','bedroom-words','bedroom-objects','storage-words','household-objects','daily-routines','bedroom-routines','bathroom-words','more-bathroom-words','bathroom-routines','washing-and-bathing','personal-care','kitchen-actions','home-appliances','shopping-words','cleaning-and-tidying','cleaning-tools','laundry-words','outdoor-chores','garden-tools','tools-and-fix-it','more-tools','by-the-door','letters-and-parcels','outside-the-home','outdoor-home-words','pets-at-home','sounds-at-home','sounds-around-home','technology-at-home','safe-at-home','home-safety','water-and-energy','recycling-words','care-for-earth','plants-at-home','caring-for-plants'];
const GROUP_HEADS=['Rooms of the home','Wash and get ready','In the kitchen','Chores and tools','Around the home','Sounds and technology','Safe and green'];

test('home-and-daily-life set: 41 cards in tour order, every card 1100×778 landscape',()=>{
 assert.equal(set.cards.length,41);
 assert.deepEqual(set.cards.map(c=>c.slug),ORDER,'cards ride in tour order');
 for(const c of set.cards){
  assert.equal(c.w,1100,c.slug+' width');assert.equal(c.h,778,c.slug+' height');
  assert.match(c.img,/^https:\/\/assets\.kiddo\.school\/school\/extra-classes\/home-and-daily-life\//);
  assert.ok(c.alt.length>60,c.slug+' alt written from the artwork');
 }
 assert.equal(cover.w,1100);assert.equal(cover.h,778);
 assert.equal(new Set(set.cards.map(c=>c.slug)).size,41,'slugs unique');
 assert.equal(new Set(set.cards.map(c=>c.word)).size,41,'words unique');
});

test('home-and-daily-life set page: seven tour groups, class button, no LP claim',()=>{
 assert.equal((setHtml.match(/class="fc-pillgroup"/g)||[]).length,7,'seven groups');
 for(const h of GROUP_HEADS)assert.ok(setHtml.includes(h),h);
 assert.ok(setHtml.includes('href="/extra-classes/home-and-daily-life/"'),'set links its class');
 assert.ok(setHtml.includes('Open the Home and Daily Life class'),'honest class button for an extra class');
 assert.ok(!setHtml.includes('on the Kiddo School learning path'),'no learning-path claim');
 assert.ok(!setHtml.includes('View the class'),'no numbered-class wording');
 for(const c of set.cards)assert.ok(existsSync('dist'+c.url+'index.html'),c.url+' missing');
});

test('home-and-daily-life card pages: blocks, download, class back-link, unique titles',()=>{
 const titles=new Set();
 for(const c of set.cards){
  const html=readPage(c.url);
  const title=html.match(/<title>(.*?)<\/title>/)[1];
  assert.ok(!titles.has(title),`duplicate title: ${title}`);titles.add(title);
  assert.ok(html.includes('Say it together'),`${c.url} missing say`);
  assert.ok(html.includes('Try this'),`${c.url} missing try`);
  assert.ok(html.includes('Quick parent note'),`${c.url} missing note`);
  assert.ok(html.includes(`href="${c.img}" download=`),`${c.url} download button`);
  assert.ok(html.includes('href="/flashcards/home-and-daily-life/"'),`${c.url} set back-link`);
  assert.ok(html.includes('href="/extra-classes/home-and-daily-life/"'),`${c.url} class link`);
  assert.ok(!html.includes('class on the Learning Path'),`${c.url} must not claim a class`);
  assert.ok(GROUP_HEADS.some(g=>html.includes(g)),`${c.url} group pill`);
 }
});

test('home-and-daily-life teaches the US/UK/CA word pairs where the cards carry them',()=>{
 // torch/flashlight on the home-safety card, trolley/cart on shopping
 const hs=readPage('/flashcards/home-and-daily-life/home-safety/');
 assert.ok(hs.includes('flashlight'),'torch card says flashlight');
 const shop=readPage('/flashcards/home-and-daily-life/shopping-words/');
 assert.ok(shop.includes('shopping cart'),'trolley card says cart');
 const bed=readPage('/flashcards/home-and-daily-life/bedroom-words/');
 assert.ok(bed.includes('closet'),'wardrobe card says closet');
 const bin=readPage('/flashcards/home-and-daily-life/cleaning-and-tidying/');
 assert.ok(bin.includes('trash'),'bin card says trash');
});

test('home-and-daily-life lessons: 41 pages under the class, canvas present, no LP claim',()=>{
 assert.equal(Object.keys(lpContent).length,41,'41 lessons authored');
 for(const c of set.cards){
  const p='/extra-classes/home-and-daily-life/learn/'+c.slug+'/';
  const html=readPage(p);
  assert.ok(existsSync('dist'+p+'index.html'),p+' missing');
  assert.ok(html.includes('data-wc'),p+' missing the drawing canvas');
  assert.ok(html.includes('HOME AND DAILY LIFE LESSON'),'eyebrow');
  assert.ok(html.includes(`href="${c.url}"`),p+' pairs its library card');
  assert.ok(html.includes('href="/extra-classes/home-and-daily-life/"'),p+' back to the class');
  assert.ok(!html.includes('breadcrumbTrail')); // guard against template leaks
 }
 // lesson prev/next wiring runs in tour order
 const first=readPage('/extra-classes/home-and-daily-life/learn/rooms-at-home/');
 assert.ok(first.includes('href="/extra-classes/home-and-daily-life/learn/parts-of-a-home-inside/"'),'next lesson follows the tour order');
 const last=readPage('/extra-classes/home-and-daily-life/learn/caring-for-plants/');
 assert.ok(last.includes('href="/extra-classes/home-and-daily-life/learn/plants-at-home/"'),'previous lesson follows the tour order');
});

test('home-and-daily-life class page: groups, house hunt, two-words section, back-links',()=>{
 const html=readPage('/extra-classes/home-and-daily-life/');
 assert.ok(html.includes('Ages 3–5')||html.includes('Ages 3\u20135'),'age label');
 assert.equal((html.match(/class="fc-pillgroup"/g)||[]).length,7,'seven tour groups on the class page');
 assert.equal((html.match(/class="lp-tile"/g)||[]).length,41,'41 lesson tiles');
 assert.ok(html.includes('The house hunt'),'the class game');
 assert.ok(html.includes('doormat'),'the game\u2019s prop');
 assert.ok(html.includes('Tap and faucet'),'the US/UK section headline');
 assert.ok(html.includes('flashlight'),'the flashlight pair');
 assert.ok(html.includes('trolley'),'the cart pair');
 assert.ok(html.includes('href="/flashcards/home-and-daily-life/"'),'links the library set');
 assert.ok(html.includes('href="/kitchen/"'),'Kitchen back-link');
 assert.ok(html.includes('href="/extra-classes/doctor-visit/"'),'Doctor Visit back-link');
 assert.ok(html.includes('href="/preschool/4-years/life-skills-and-good-habits/"'),'Class 32 back-link');
 const og=html;
 assert.ok(og.includes('property="og:image" content="https://assets.kiddo.school/school/extra-classes/home-and-daily-life/cover.webp"'),'OG image is the cover');
});

test('home-and-daily-life is on the extra-classes shelf, never the numbered path',()=>{
 const hub=readPage('/extra-classes/');
 assert.ok(hub.includes('href="/extra-classes/home-and-daily-life/"'),'hub lists the class');
 assert.equal(EXTRA_CLASSES.length,4,'four extra classes');
 assert.ok(EXTRA_CLASSES.find(c=>c.name==='Home and Daily Life'),'named Home and Daily Life');
 // the learning path page mentions it only in the bonus row
 const lp=readPage('/learning-path/');
 assert.ok(lp.includes('/extra-classes/home-and-daily-life/'),'bonus row points at it');
 assert.ok(!lp.includes('Class 38'),'no invented class number');
});

test('home-and-daily-life rides the Ages 4–5 flashcards shelf and the sitemap',()=>{
 const hub=readPage('/flashcards/');
 assert.ok(hub.includes('href="/flashcards/home-and-daily-life/"'),'hub lists the set');
 assert.ok(hub.includes('home-and-daily-life cards'),'shelf blurb mentions it');
 const xml=read('dist/sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/extra-classes/home-and-daily-life/</loc>'));
 assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/home-and-daily-life/</loc>'));
 assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/home-and-daily-life/rooms-at-home/</loc>'));
 assert.ok(xml.includes('<loc>https://kiddo.school/extra-classes/home-and-daily-life/learn/rooms-at-home/</loc>'));
});
