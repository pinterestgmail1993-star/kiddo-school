/* science-at-a-glance — THE OWNER'S 65 FIRST-PICTURE SCIENCE SHEETS
   (owner 2026-10-31: the R2 round at school/extra-classes/science-at-a-glance/
   built "with New First Glance · 58 first-picture sheets · Ages 2–5" — the
   site header now features BOTH collections side by side (owner's same-day
   correction: the science chip joins First Glance, it does not replace it). ONE standalone
   page at /science-at-a-glance/ with NO individual card pages (standing
   rule); six sections; every sheet carries an age pill, a subject pill, a
   level pill and a skill pill, a KID-DIRECTED description (the owner's
   dialogue rule) and Download + Print buttons under the image. Framing
   copy uses what USA parents search; the owner's word-ban ("no sign up",
   "no paywall", "free to use", "no account", "free forever") is a lock.
   Locks: page contract, 65 sheets = exact bucket manifest, per-card pills/
   description/buttons, honest level + section counts, no per-card URLs,
   header chip swap + footer + sibling links, sitemap + image sitemap,
   search index, /all-pages/, manners.js print handler. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
const read=f=>readFileSync(f,'utf8');
const html=read('dist/science-at-a-glance/index.html');
const main=html.split('</main>')[0];
const BUCKET=['animal-adaptations','animal-classification','blood-components','butterfly-life-cycle','carbon-cycle','carbon-dioxide-and-oxygen-cycle','cell-cycle','circulatory-system','classification-of-matter','cloud-formation','conductors-and-insulators','density','digestive-system','dna-structure','ecological-pyramid','ecosystem','electric-circuits','endocrine-system','food-chain','food-web','forces-and-motion','four-seasons','frog-life-cycle','genetic-inheritance','heat-transfer','human-brain','human-skeleton','layers-of-earth','magnets','microorganisms','moon-phases','muscular-system','natural-selection','nervous-system','nitrogen-cycle','ocean-tides','ocean-zones','ph-scale','photosynthesis','plant-and-animal-cells','plant-life-cycle','plant-water-transport','plate-tectonics','properties-of-matter','reflection-and-refraction','renewable-energy','respiratory-system','rock-cycle','rocks-and-minerals','simple-machines','solar-and-lunar-eclipses','solar-system','sound-waves','states-of-matter','states-of-water','the-ear','the-eye','types-of-clouds','urinary-system','visible-light-spectrum','volcano-anatomy','water-cycle','water-molecule','weather-fronts','weather-instruments'];
const BASE='https://assets.kiddo.school/school/extra-classes/science-at-a-glance/';

test('page contract: title, canonical, indexed, honest description',()=>{
 assert.ok(html.includes('<title>Science at a Glance — 65 printable science picture sheets for kids (Ages 2–5) | Kiddo.school</title>'));
 assert.ok(html.includes('rel="canonical" href="https://kiddo.school/science-at-a-glance/"'));
 assert.ok(html.includes('content="index,follow"'));
 assert.ok(html.includes('All 65 printable science sheets on one page'));
 assert.ok(html.includes('65 first-picture sheets · Ages 2–5'),'the header count line the owner asked for');
});

test('all 65 sheets on ONE page, exactly the probed bucket manifest, nothing missing',()=>{
 const srcs=[...main.matchAll(/src="(https:\/\/assets\.kiddo\.school\/school\/extra-classes\/science-at-a-glance\/([^"]+))"/g)];
 assert.equal(srcs.length,65,'65 card sheets, got '+srcs.length);
 const refs=[...new Set(srcs.map(m=>m[2]))].sort();
 assert.deepEqual(refs,BUCKET.map(s=>s+'.webp'),'the page must carry exactly the probed bucket files');
});

test('six sections with honest counts and jump links',()=>{
 const counts=[[ 'sg-body','12 sheets'],['sg-nature','12 sheets'],['sg-plants','7 sheets'],['sg-earth','15 sheets'],['sg-space','3 sheets'],['sg-matter','16 sheets']];
 for(const [id,n] of counts){
  assert.ok(main.includes(`id="${id}"`),'missing section '+id);
  assert.ok(main.includes(`href="#${id}"`),'missing jump to '+id);
 }
 assert.ok(main.includes('<h2 id="sg-body-h">My body<span class="title-dot">.</span></h2>'));
 assert.ok(main.includes('<h2 id="sg-matter-h">Matter, energy &amp; motion<span class="title-dot">.</span></h2>'));
 for(const [,n] of counts)assert.ok(main.includes(n),'count badge '+n+' missing');
 const bodyPart=main.split('id="sg-nature"')[0];
 assert.equal([...bodyPart.matchAll(/class="mn-card sg-card"/g)].length,12,'12 cards in My body');
 assert.equal([...main.matchAll(/class="mn-card sg-card"/g)].length,65,'65 tiles total');
});

test('every sheet: pills (age/subject/level/skill), kid-voice description, download + print under the image',()=>{
 const cards=main.split('class="mn-card sg-card"').slice(1);
 assert.equal(cards.length,65);
 for(const c of cards){
  assert.ok(c.includes('fc-pill fc-pill-age">Ages 2–5'),'age pill missing');
  assert.ok(/fc-pill fc-pill-subject">[^<]+</.test(c),'subject pill missing');
  assert.ok(/fc-pill fc-pill-level">Level [123] · [^<]+</.test(c),'level pill missing');
  assert.ok(/fc-pill fc-pill-skill">[^<]+</.test(c),'skill pill missing');
  assert.ok(/class="mn-tip">[^<]{40,}</.test(c),'description missing or thin');
  assert.ok(/data-mn-print/.test(c),'print button missing');
  assert.ok(/href="https:\/\/assets\.kiddo\.school\/school\/extra-classes\/science-at-a-glance\/[a-z0-9-]+\.webp" download="[a-z0-9-]+\.webp">Download/.test(c),'download button missing');
  assert.ok(c.includes('sg-imagelink'),'tap-to-open artwork link missing');
 }
 assert.equal([...main.matchAll(/fc-pill fc-pill-age">Ages 2–5</g)].length,65);
});

test('kid voice: every description talks TO the child, openings all unique',()=>{
 const tips=[...main.matchAll(/class="mn-tip">([^<]+)</g)].map(m=>m[1]);
 assert.equal(tips.length,65);
 for(const t of tips)assert.ok(/you/i.test(t),'not kid-directed: '+t.slice(0,50));
 assert.equal(new Set(tips.map(t=>t.slice(0,60))).size,65,'duplicate description openings');
});

test('owner word-ban: no robotic phrases anywhere on the page',()=>{
 for(const phrase of ['no sign up','no paywall','free to use','no account','free forever','sign-up','No Sign']){
  assert.ok(!html.toLowerCase().includes(phrase.toLowerCase()),'banned phrase on page: '+phrase);
 }
});

test('images: 800×1035 dims, real-word alts, lazy loading',()=>{
 for(const m of main.matchAll(/<img src="https:\/\/assets\.kiddo\.school\/school\/extra-classes\/science-at-a-glance\/([^"]+)" width="(\d+)" height="(\d+)" alt="([^"]+)" loading="lazy">/g)){
  const [,file,w,h,alt]=m;
  assert.equal(w,'800');assert.equal(h,'1035');
  assert.ok(alt.length>40,'alt too thin for '+file);
  assert.ok(alt.startsWith('Science at a Glance “'),'alt must name the collection: '+file);
 }
});

test('honest levels: 22 Name it / 25 Tell it / 18 Ask why, with the legend',()=>{
 const counts={1:'22',2:'25',3:'18'};
 assert.equal([...main.matchAll(/fc-pill-level">Level 1 · Name it</g)].length,22);
 assert.equal([...main.matchAll(/fc-pill-level">Level 2 · Tell it</g)].length,25);
 assert.equal([...main.matchAll(/fc-pill-level">Level 3 · Ask why</g)].length,18);
 assert.ok(main.includes('id="sg-levels"')&&main.includes('THE THREE LEVELS'));
});

test('NO individual card pages — dist/science-at-a-glance/ holds only the one page',()=>{
 assert.deepEqual(readdirSync('dist/science-at-a-glance'),['index.html']);
 const sitemap=read('dist/sitemap.xml');
 const sg=[...sitemap.matchAll(/<loc>https:\/\/kiddo\.school(\/science-at-a-glance[^<]*)<\/loc>/g)].map(m=>m[1]);
 assert.deepEqual(sg,['/science-at-a-glance/'],'only the showcase page is in the sitemap');
 assert.ok(!existsSync('dist/flashcards/science-at-a-glance'),'no shelf page inside the flashcards library either');
});

test('discoverable: both header chips (First Glance beside science), footer, sibling links both ways, sitemap+image, search, directory, print js',()=>{
 const home=read('dist/index.html');
 const deep=read('dist/flashcards/animal-categories/amphibians/index.html');
 const sgSelf=html;
 for(const [name,h] of [['home',home],['deep page',deep],['science page itself',sgSelf]]){
  assert.ok(h.includes('class="header-fg" href="/science-at-a-glance/"'),'header chip missing on '+name);
  assert.ok(h.includes('65 first-picture sheets · Ages 2–5'),'chip count missing on '+name);
  /* Owner 2026-10-31, correction: BOTH glances stay on the header — the
     First Glance chip sits BESIDE the science chip, not replaced by it. */
  assert.ok(h.includes('class="header-fg" href="/first-glance/"'),'First Glance chip missing on '+name);
  assert.ok(h.includes('58 first-picture sheets · Ages 2–5'),'First Glance chip count missing on '+name);
  assert.ok(h.includes('<a href="/science-at-a-glance/">Science at a Glance sheets</a>'),'footer link missing on '+name);
 }
 assert.ok(sgSelf.includes('class="header-fg" href="/science-at-a-glance/" aria-current="page"'),'aria-current on the page itself');
 assert.ok(sgSelf.includes('<a href="/first-glance/">'),'sibling link to First Glance missing');
 assert.ok(read('dist/first-glance/index.html').includes('href="/science-at-a-glance/"'),'First Glance does not link back');
 assert.ok(read('dist/sitemap.xml').includes('<loc>https://kiddo.school/science-at-a-glance/</loc>'));
 assert.ok(read('dist/sitemap.xml').includes('<image:loc>https://assets.kiddo.school/school/extra-classes/science-at-a-glance/water-cycle.webp</image:loc>'),'water-cycle sheet joins the image sitemap via og:image');
 const idx=JSON.parse(read('dist/assets/search-index.json'));
 const sg=idx.find(p=>p.u==='/science-at-a-glance/');
 assert.ok(sg,'science-at-a-glance in the search index');
 assert.equal(sg.k,'Picture sheets');
 assert.ok(sg.t.includes('Science at a Glance')&&sg.d.length>40);
 assert.ok(read('dist/all-pages/index.html').includes('href="/science-at-a-glance/"'),'listed on /all-pages/');
 assert.ok(html.includes('/assets/manners.js'),'the per-card print handler must ship with the page');
});
