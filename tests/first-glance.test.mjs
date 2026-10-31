/* first-glance — THE OWNER'S 58 FIRST-PICTURE SHEETS (owner 2026-10-22:
   "these are first glance this is separate" + "no indiviual pages required"
   + header placement on a next row). ONE standalone page at /first-glance/
   holding all 58 sheets in two age groups, each card with description,
   age pill, subject pill and a skills line, plus the "Why we made First
   Glance" story. Locks: page contract, 58 cards = exact bucket manifest,
   pills/skills per card, no individual card pages, header row-2 on every
   page, footer link, sitemap + image sitemap, search index, /all-pages/.
   2026-10-31: the header's featured chip moved to the new Science at a
   Glance collection (owner: "on header science at a glance"); the header
   assertions now track the chip swap, the footer link stays. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
const read=f=>readFileSync(f,'utf8');
const html=read('dist/first-glance/index.html');
const main=html.split('</main>')[0];
const A23=['01-pets','02-fruit','03-feelings','04-shapes','05-colors-1','06-numbers-1-4','07-face-parts','08-clothes-1','09-size','10-hot-cold-wet-dry','11-basic-food','12-zoo-animals','13-body-parts','14-colors-2','15-vegetables','16-small-animals','17-tableware','18-weather','19-family','20-instruments-1','21-insects-1','22-sea-animals','23-vehicles-1','24-furniture','25-actions-1','26-nature-1','27-farm-animals','28-school-supplies','29-toys','30-fruit-and-veg-extras','31-bugs','32-baby-animals'];
const A45=['01-seasons','02-up-down-in-out','03-times-of-day','04-jobs-1','05-letters-a-d','06-places','07-daily-routine','08-vehicles-2','09-sports','10-home-objects','11-feelings-2','12-instruments-2','13-clothes-2','14-body-2','15-food-and-snacks','16-art-supplies','17-family-2','18-kitchen','19-jobs-2','20-positions','21-celebrations','22-safety','23-actions-2','24-nature-2','25-beach','26-playground'];
const MANIFEST=[...A23.map(s=>'ages-2-3/'+s),...A45.map(s=>'ages-4-5/'+s)];

test('page contract: title, canonical, indexed, honest description',()=>{
 assert.ok(html.includes('<title>First Glance — 58 first-picture sheets to name together (Ages 2–5) | Kiddo.school</title>'));
 assert.ok(html.includes('rel="canonical" href="https://kiddo.school/first-glance/"'));
 assert.ok(html.includes('content="index,follow"'));
 assert.ok(html.includes('All 58 First Glance picture sheets on one page'));
});

test('all 58 sheets on ONE page, exactly the bucket manifest, nothing missing',()=>{
 const srcs=[...main.matchAll(/src="(https:\/\/assets\.kiddo\.school\/flashcards\/first-glance\/([^"]+))"/g)];
 assert.equal(srcs.length,59,'58 card sheets + 1 why-art image, got '+srcs.length);
 const refs=new Set(srcs.map(m=>m[2]));
 for(const m of MANIFEST)assert.ok(refs.has(m+'.webp'),'missing sheet '+m);
 assert.equal(refs.size,58,'every unique sheet referenced exactly once (pets is reused by the why-art figure, total tags 59)');
 assert.ok(refs.has('ages-2-3/01-pets.webp')&&refs.has('ages-4-5/26-playground.webp'));
});

test('two age groups with honest counts and jump links',()=>{
 assert.ok(main.includes('id="fg-2-3"')&&main.includes('id="fg-4-5"'));
 assert.ok(main.includes('<h2 id="fg-2-3-h">Ages 2–3</h2>'));
 assert.ok(main.includes('<h2 id="fg-4-5-h">Ages 4–5</h2>'));
 assert.ok(main.includes('32 sheets</span>')||main.includes('32 sheets'));
 assert.ok(main.includes('26 sheets'));
 assert.ok(main.includes('href="#fg-2-3"')&&main.includes('href="#fg-4-5"'));
 const a23=main.split('id="fg-4-5"')[0];
 assert.equal([...a23.matchAll(/class="fc-card fg-card"/g)].length,32,'32 cards in the 2–3 group');
 assert.equal([...main.matchAll(/class="fc-card fg-card"/g)].length-32,26,'26 cards in the 4–5 group');
});

test('every card carries description, age pill, subject pill and skills line',()=>{
 const cards=main.split('class="fc-card fg-card"').slice(1);
 assert.equal(cards.length,58);
 for(const c of cards){
  assert.ok(c.includes('fc-pill fc-pill-age'),'age pill missing');
  assert.ok(/fc-pill fc-pill-subject">[^<]+</.test(c),'subject pill missing');
  assert.ok(c.includes('>Skills: '),'skills line missing');
  assert.match(c,/figcaption><strong>[^<]+<\/strong><span>[^<]{20,}<\/span>/,'description missing or thin');
 }
 assert.equal([...main.matchAll(/fc-pill fc-pill-age">Ages 2–3</g)].length,32);
 assert.equal([...main.matchAll(/fc-pill fc-pill-age">Ages 4–5</g)].length,26);
});

test('images: dims per orientation, alt text with real words, lazy loading',()=>{
 for(const m of main.matchAll(/<img src="https:\/\/assets\.kiddo\.school\/flashcards\/first-glance\/([^"]+)" width="(\d+)" height="(\d+)" alt="([^"]+)"(?: loading="lazy")?>/g)){
  const [,file,w,h]=m;const W=Number(w),H=Number(h);
  if(/ages-4-5\/(13|14|15|16|17|18)-/.test(file)){assert.equal(W,1100);assert.equal(H,778);}
  else{assert.equal(W,800);assert.equal(H,1132);}
  assert.ok(m[4].length>30,'alt too thin for '+file);
  assert.ok(/loading="lazy"/.test(m[0]),'lazy missing on '+file);
 }
});

test('the story is there: why section + how-to steps',()=>{
 assert.ok(main.includes('Why we made First Glance'));
 assert.ok(main.includes('first glance</em> at the world')||main.includes('a first glance'));
 assert.ok(main.includes('How to use the sheets'));
 assert.equal([...main.matchAll(/<div><span>0\d<\/span><h3>/g)].length,4,'4 how-to steps');
});

test('NO individual card pages — dist/first-glance/ holds only the one page',()=>{
 assert.deepEqual(readdirSync('dist/first-glance'),['index.html']);
 const sitemap=read('dist/sitemap.xml');
 const fg=[...sitemap.matchAll(/<loc>https:\/\/kiddo\.school(\/first-glance[^<]*)<\/loc>/g)].map(m=>m[1]);
 assert.deepEqual(fg,['/first-glance/'],'only the showcase page is in the sitemap');
 assert.ok(!existsSync('dist/flashcards/first-glance'),'no set page inside the flashcards library either');
});

test('discoverable everywhere: header row-2, footer, sitemap+image, search, directory',()=>{
 /* Owner 2026-10-31, corrected the same day: BOTH glances stay on the
    header — the owner's "why did you remove the other glance? told you put
    the science with it". First Glance's chip ("New · 58 first-picture
    sheets · Ages 2–5") sits beside the Science at a Glance chip; each page
    keeps aria-current on its own chip. */
 const home=read('dist/index.html');
 const deep=read('dist/flashcards/animal-categories/amphibians/index.html');
 const fgSelf=read('dist/first-glance/index.html');
 for(const [name,h] of [['home',home],['deep page',deep],['first-glance itself',fgSelf]]){
  assert.ok(h.includes('class="header-fg" href="/first-glance/"'),'First Glance chip missing on '+name);
  assert.ok(h.includes('58 first-picture sheets · Ages 2–5'),'First Glance chip count missing on '+name);
  assert.ok(h.includes('class="header-fg" href="/science-at-a-glance/"'),'science chip missing on '+name);
  assert.ok(h.includes('65 first-picture sheets · Ages 2–5'),'science chip count missing on '+name);
  assert.ok(h.includes('<a href="/first-glance/">First Glance sheets</a>'),'footer link missing on '+name);
 }
 assert.ok(fgSelf.includes('class="header-fg" href="/first-glance/" aria-current="page"'),'aria-current on First Glance\'s own chip');
 assert.ok(read('dist/science-at-a-glance/index.html').includes('class="header-fg" href="/science-at-a-glance/" aria-current="page"'),'aria-current on the science page\'s own chip');
 assert.ok(read('dist/sitemap.xml').includes('<loc>https://kiddo.school/first-glance/</loc>'));
 assert.ok(read('dist/sitemap.xml').includes('<image:loc>https://assets.kiddo.school/flashcards/first-glance/ages-2-3/01-pets.webp</image:loc>'),'pets sheet joins the image sitemap via og:image');
 const idx=JSON.parse(read('dist/assets/search-index.json'));
 const fg=idx.find(p=>p.u==='/first-glance/');
 assert.ok(fg,'first-glance in the search index');
 assert.equal(fg.k,'Picture sheets');
 assert.ok(fg.t.includes('First Glance')&&fg.d.length>40);
 assert.ok(read('dist/all-pages/index.html').includes('href="/first-glance/"'),'first-glance listed on /all-pages/');
});
