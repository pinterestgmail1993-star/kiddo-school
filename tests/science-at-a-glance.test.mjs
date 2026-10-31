/* science-at-a-glance — THE OWNER'S 65 FIRST-PICTURE SCIENCE SHEETS
   (owner 2026-10-31: the R2 round at school/extra-classes/science-at-a-glance/.
   After the first push the owner asked: "why did you remove the other glance?
   told you put the science with it" — so the sheets NO LONGER live on their
   own URL: they are the THIRD BAND of /first-glance/ (58 + 65 = 123 sheets on
   one page), the site header's featured chip is back on First Glance ("New ·
   First Glance · 123 first-picture sheets · Ages 2–5"), and the 1-day-old
   /science-at-a-glance/ URL 301s to /first-glance/ via public/_redirects.
   Still true from the owner's brief: six sections, every sheet with age /
   subject / level / skill pills, a KID-DIRECTED description (the dialogue
   rule) and Download + Print buttons under the image; framing copy uses
   what USA parents search; the word-ban ("no sign up", "no paywall", "free
   to use", "no account", "free forever") is a lock.
   Locks: 65 sheets = exact bucket manifest ON /first-glance/, per-card
   pills/description/buttons, honest level + section counts, kid voice,
   word-ban, NO standalone page anywhere (dist, sitemap, search index,
   /all-pages/, footer), the 301 rule ships, manners.js print handler on
   the merged page. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=f=>readFileSync(f,'utf8');
const html=read('dist/first-glance/index.html');
const main=html.split('</main>')[0];
const BUCKET=['animal-adaptations','animal-classification','blood-components','butterfly-life-cycle','carbon-cycle','carbon-dioxide-and-oxygen-cycle','cell-cycle','circulatory-system','classification-of-matter','cloud-formation','conductors-and-insulators','density','digestive-system','dna-structure','ecological-pyramid','ecosystem','electric-circuits','endocrine-system','food-chain','food-web','forces-and-motion','four-seasons','frog-life-cycle','genetic-inheritance','heat-transfer','human-brain','human-skeleton','layers-of-earth','magnets','microorganisms','moon-phases','muscular-system','natural-selection','nervous-system','nitrogen-cycle','ocean-tides','ocean-zones','ph-scale','photosynthesis','plant-and-animal-cells','plant-life-cycle','plant-water-transport','plate-tectonics','properties-of-matter','reflection-and-refraction','renewable-energy','respiratory-system','rock-cycle','rocks-and-minerals','simple-machines','solar-and-lunar-eclipses','solar-system','sound-waves','states-of-matter','states-of-water','the-ear','the-eye','types-of-clouds','urinary-system','visible-light-spectrum','volcano-anatomy','water-cycle','water-molecule','weather-fronts','weather-instruments'];
const BASE='https://assets.kiddo.school/school/extra-classes/science-at-a-glance/';

test('all 65 science sheets live ON /first-glance/, exactly the probed bucket manifest',()=>{
 const srcs=[...main.matchAll(/src="(https:\/\/assets\.kiddo\.school\/school\/extra-classes\/science-at-a-glance\/([^"]+))"/g)];
 assert.equal(srcs.length,65,'65 science sheets on the merged page, got '+srcs.length);
 const refs=[...new Set(srcs.map(m=>m[2]))].sort();
 assert.deepEqual(refs,BUCKET.map(s=>s+'.webp'),'the band must carry exactly the probed bucket files');
});

test('six sections with honest counts, band header + count line + levels legend',()=>{
 const counts=[['sg-body','12 sheets'],['sg-nature','12 sheets'],['sg-plants','7 sheets'],['sg-earth','15 sheets'],['sg-space','3 sheets'],['sg-matter','16 sheets']];
 assert.ok(main.includes('id="fg-science"')&&main.includes('<h2 id="fg-science-h">Science at a Glance</h2>'),'band header missing');
 assert.ok(main.includes('65 first-picture sheets · Ages 2–5'),"the owner's count line missing on the band");
 assert.ok(main.includes('id="sg-levels"')&&main.includes('THE THREE LEVELS'),'levels legend missing');
 for(const [id,n] of counts){
  assert.ok(main.includes(`id="${id}"`),'missing section '+id);
  assert.ok(main.includes(n.toUpperCase()),'count eyebrow '+n.toUpperCase()+' missing');
 }
 const bodyPart=main.split('id="sg-nature"')[0].split('id="sg-body"')[1];
 assert.equal([...bodyPart.matchAll(/class="mn-card sg-card"/g)].length,12,'12 cards in My body');
 assert.equal([...main.matchAll(/class="mn-card sg-card"/g)].length,65,'65 science tiles total');
});

test('every science sheet: pills (age/subject/level/skill), kid-voice description, download + print under the image',()=>{
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

test('owner word-ban: no robotic phrases anywhere on the merged page',()=>{
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

test('honest levels: 22 Name it / 25 Tell it / 18 Ask why',()=>{
 assert.equal([...main.matchAll(/fc-pill-level">Level 1 · Name it</g)].length,22);
 assert.equal([...main.matchAll(/fc-pill-level">Level 2 · Tell it</g)].length,25);
 assert.equal([...main.matchAll(/fc-pill-level">Level 3 · Ask why</g)].length,18);
});

test('NO standalone page: /science-at-a-glance/ is a 301 to /first-glance/ everywhere',()=>{
 const sitemap=read('dist/sitemap.xml');
 assert.ok(!sitemap.includes('/science-at-a-glance'),'must not be in the sitemap');
 const idx=JSON.parse(read('dist/assets/search-index.json'));
 assert.ok(!idx.some(p=>p.u.startsWith('/science-at-a-glance')),'must not be in the search index');
 assert.ok(!read('dist/all-pages/index.html').includes('/science-at-a-glance'),'must not be on /all-pages/');
 const red=read('dist/_redirects');
 assert.ok(red.includes('/science-at-a-glance/ /first-glance/ 301'),'the 301 rule must ship');
 assert.ok(red.includes('/science-at-a-glance /first-glance/ 301'),'the no-slash 301 rule must ship');
 for(const h of [read('dist/index.html'),html]){
  assert.ok(!h.includes('href="/science-at-a-glance/"'),'no stale footer/chip links');
 }
});

test('the merged page ships the print handler for the science tiles',()=>{
 assert.ok(html.includes('/assets/manners.js'),'the per-card print handler must ship with /first-glance/');
});
