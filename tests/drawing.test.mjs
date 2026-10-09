// Kiddo School — How-to-draw tutorials (/how-to-draw-a-cat/, /how-to-draw-a-dog/).
// Verifies the R2 asset contract (the owner's exact twelve files, uploaded
// order, nothing invented), the reusable one-template-two-animals build,
// SEO/schema, the step viewer markup (six ordered pictures, short step title
// above detailed teach-a-child instructions, a Listen button that only
// appears when the browser truly supports speech, Previous/Next, Step N of 6,
// restart, Back to Activities, ivory stage for the transparent PNGs), the
// Activities → Drawing shelf and live reachability of every referenced file.
// Every instruction answers WHERE to start, WHAT shape to draw and HOW it
// connects — verified line by line against the actual artwork.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {drawingTutorials,howToDrawCat,howToDrawDog,R2_DRAWING} from '../src/drawing.mjs';

const read=f=>readFileSync(f,'utf8');
const site=JSON.parse(read('dist/build-info.json')).siteUrl;
const sitemap=read('dist/sitemap.xml');
const activities=read('dist/activities/index.html');

const CAT_STEPS=[
 ['how-to-draw-a-cat-step-01.png','Draw the head','Put your pencil in the middle of your paper, a little above the center. Draw one big round circle, like a ball. Leave lots of space underneath for the body.'],
 ['how-to-draw-a-cat-step-02.png','Add the ears','At the top-left of the circle, draw a small triangle pointing up. Draw another triangle on the top-right, the same size. Now your cat has two pointy ears!'],
 ['how-to-draw-a-cat-step-03.png','Make the face','Inside the circle, draw two little round eyes, side by side. Below them, draw a tiny upside-down triangle for the nose. Under the nose, add two small curved lines to make a smile.'],
 ['how-to-draw-a-cat-step-04.png','Draw the whiskers','Start at the left side of the face, on the cheek. Draw three short straight lines going outward, one above the other. Do the same on the right cheek. Now your cat has six whiskers!'],
 ['how-to-draw-a-cat-step-05.png','Draw the body and tail','Start just below the head. Draw a long curved line down the left side and another down the right side to make a rounded body. From the bottom of the head, draw two long lines down to the bottom — these are the front legs. At the bottom, draw two small rounded paws next to each other, with two tiny lines inside each paw for the toes. On the right side of the body, draw a long curved line that goes outward and curls upward. Draw another curved line beside it and join the tips to make a thick, curly tail.'],
 ['how-to-draw-a-cat-step-06.png','Color your cat','Pick your favorite crayon. Color the cat’s head, body, paws, and tail. Try orange for the fur and pink for the inside of the ears. You can add two pink circles for cheeks, just like the picture. Leave the eyes and nose dark and easy to see.']
];
const DOG_STEPS=[
 ['how-to-draw-a-dog-step-01.png','Draw the head','Put your pencil in the upper half of your paper. Draw one large round circle, like a balloon. Leave plenty of room underneath for the puppy’s body.'],
 ['how-to-draw-a-dog-step-02.png','Add floppy ears','Start at the top-left side of the head. Draw a long curved shape hanging down like a soft leaf. Repeat on the right side. Make both ears hang beside the puppy’s cheeks.'],
 ['how-to-draw-a-dog-step-03.png','Draw the puppy’s face','Inside the head, draw two small circles for eyes. Below them, draw a little oval for the nose. Under the nose, draw one wide curved line to make a happy smile.'],
 ['how-to-draw-a-dog-step-04.png','Draw the body','Start just underneath the head. Draw one curved line downward on the left and another on the right. Connect them with a rounded line at the bottom to make an oval-shaped body.'],
 ['how-to-draw-a-dog-step-05.png','Add paws and tail','At the bottom of the body, draw two small rounded paws side by side. Add two short lines inside each paw to show the toes. On the right side of the body, draw a curved line going outward and upward. Draw a second line back toward the body to make a wagging tail.'],
 ['how-to-draw-a-dog-step-06.png','Color your puppy','Use a light-brown crayon to color the puppy’s head, body, paws, and tail. Make the floppy ears a darker brown. Color the nose dark, and leave the eyes white and shiny so they sparkle.']
];
const TUTORIALS=[{t:howToDrawCat,steps:CAT_STEPS,path:'/how-to-draw-a-cat/'},{t:howToDrawDog,steps:DOG_STEPS,path:'/how-to-draw-a-dog/'}];

test('the data is the owner’s exact twelve files in uploaded order, nothing invented',()=>{
 assert.equal(drawingTutorials.length,2,'two tutorials today: cat and dog');
 assert.equal(R2_DRAWING,'https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/drawing/','the site’s real R2 asset base, no invented domain');
 for(const {t,steps} of TUTORIALS){
  assert.equal(t.steps.length,6);
  t.steps.forEach((s,i)=>{
   assert.equal(s.file,steps[i][0],'file order '+i+' for '+t.slug);
   assert.equal(s.title,steps[i][1],'the short step title '+i+' for '+t.slug);
   assert.equal(s.detail,steps[i][2],'the detailed step instruction '+i+' for '+t.slug);
   assert.ok(s.w>0&&s.h>0,'true probed dims on '+s.file);
  });
  const files=new Set(t.steps.map(s=>s.file));
  assert.equal(files.size,6,'six distinct files, no duplicates for '+t.slug);
 }
 assert.equal(howToDrawCat.steps[0].w,1080);assert.equal(howToDrawCat.steps[0].h,1920,'cat art ships at its real 1080x1920');
 assert.equal(howToDrawDog.steps[0].w,1240);assert.equal(howToDrawDog.steps[0].h,1748,'dog art ships at its real 1240x1748');
});

test('alt text describes the artwork, never search keywords',()=>{
 const banned=/seo|keyword|learn to draw|printable|download|preschooler|for kids/i;
 for(const {t} of TUTORIALS)for(const s of t.steps)assert.doesNotMatch(s.alt,banned,s.file);
 for(const {t} of TUTORIALS)for(const s of t.steps)assert.ok(s.alt.length>=20,s.file+' alt is descriptive');
});

for(const {t,steps,path} of TUTORIALS){
 const page=read('dist'+path+'index.html');
 const schema=JSON.parse(page.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);

 test(path+' SEO: exact owner title, meta description, canonical, one H1',()=>{
  assert.equal(page.match(/<title>(.*?)<\/title>/)[1],t.seoTitle+' | Kiddo.school');
  assert.equal(page.match(/name="description" content="([^"]+)"/)[1],t.description);
  assert.equal(page.match(/rel="canonical" href="([^"]+)"/)[1],site+path);
  assert.equal([...page.matchAll(/<h1[ >]/g)].length,1);
  assert.match(page,new RegExp('<h1>'+t.h1+'</h1>'));
  assert.match(page,/Easy Drawing for Kids in 6 Steps/,'the subtitle ships');
 });

 test(path+' ships the six steps in order at their true sizes with honest alts',()=>{
  const imgs=[...page.matchAll(/<figure class="dt-step" data-dt-step[^>]*>\s*<div class="dt-stage"><img src="([^"]+)" alt="([^"]*)" width="(\d+)" height="(\d+)"/g)].map(m=>m.slice(1,5).map((v,i)=>i===0||i===1?v:Number(v)));
  assert.equal(imgs.length,6,'six step figures in the HTML');
  imgs.forEach(([src,alt,w,h],i)=>{
   assert.equal(src,R2_DRAWING+t.folder+steps[i][0],'step '+(i+1)+' picture, in order');
   assert.equal(w,t.steps[i].w);assert.equal(h,t.steps[i].h,'true dims, ratio preserved');
   assert.equal(alt,t.steps[i].alt);
  });
  steps.forEach(([_,title,detail],i)=>{
   assert.ok(page.includes(title),'step title '+(i+1)+' present');
   assert.ok(page.includes(detail),'detailed instruction '+(i+1)+' present verbatim');
  });
  assert.match(page,/loading="lazy"/,'later steps lazy-load');
 });

 test(path+' teaches: short title above detailed instructions, both beneath the picture',()=>{
  const figs=[...page.matchAll(/<figure class="dt-step"[\s\S]*?<\/figure>/g)].map(m=>m[0]);
  assert.equal(figs.length,6);
  figs.forEach((fig,i)=>{
   const stageEnd=fig.indexOf('</div>');
   const caption=fig.slice(fig.indexOf('<figcaption'));
   assert.ok(stageEnd<fig.indexOf('<figcaption'),'the caption sits after the picture stage');
   const num=caption.indexOf('dt-stepnum'),title=caption.indexOf('dt-steptitle'),detail=caption.indexOf('dt-detail');
   assert.ok(num>-1&&title>num&&detail>title,'Step badge, then the short title, then the detailed instructions');
   assert.ok(caption.includes('dt-steptitle">'+steps[i][1]),'step '+(i+1)+' keeps its short title');
   assert.ok(fig.includes('data-dt-say hidden'),'step '+(i+1)+' ships a Listen button that is hidden until speech is supported');
  });
  const css=read('dist/assets/style.css');
  assert.match(css,/\.dt-detail\{[^}]*font-size:19px/,'instruction text is large on desktop');
  assert.match(css,/\.dt-detail\{font-size:18px\}/,'instruction text stays large on mobile');
 });

 test(path+' “Listen to this step”: wired to the browser voice, never a dead button',()=>{
  assert.equal([...page.matchAll(/data-dt-say hidden/g)].length,6,'one hidden Listen button per step');
  const js=read('dist/assets/drawing.js');
  assert.match(js,/window\.speechSynthesis/,'the script feature-detects the browser voice');
  assert.match(js,/if \(!synth \|\| !sayBtns\.length\) return;/,'without speech support the buttons stay hidden');
  assert.match(js,/btn\.hidden = false/,'supported browsers reveal the buttons');
  assert.match(js,/stopSpeech/,'speaking stops when the family moves on');
  assert.match(js,/SpeechSynthesisUtterance/);
  assert.match(js,/\.dt-steptitle/,'the voice reads the short step title');
  assert.match(js,/\.dt-detail/,'the voice reads the detailed instructions');
 });

 test(path+' viewer: controls, Step N of 6 counter, restart after the last step, Back to Activities',()=>{
  assert.match(page,/src="\/assets\/drawing\.js"/,'the reusable viewer script is wired');
  assert.match(page,/data-drawing-tutorial/);
  assert.match(page,/data-dt-count aria-live="polite" hidden>Step 1 of 6</,'progress counter starts at Step 1 of 6');
  assert.equal([...page.matchAll(/data-dt-dot>/g)].length,6,'one progress dot per step');
  assert.match(page,/data-dt-prev hidden>Previous step/);
  assert.match(page,/data-dt-next hidden>Next step/);
  assert.match(page,/data-dt-restart>Draw it again/,'restart lives after the final step');
  assert.match(page,/data-dt-complete hidden/,'the completion panel waits for the last step');
  assert.match(page,new RegExp(t.complete));
  assert.equal([...page.matchAll(/Back to Activities/g)].length,2,'Back to Activities twice: always visible + after the final step');
  assert.match(page,/href="\/activities\/#drawing">Drawing</,'breadcrumb names the Drawing category');
 });

 test(path+' transparent PNGs sit on the warm ivory paper from the design system',()=>{
  const css=read('dist/assets/style.css');
  assert.match(css,/\.dt-stage\{[^}]*background:var\(--paper\)/,'the stage uses the school’s warm ivory (--paper #f4efe3)');
  assert.match(css,/\.dt-js \.dt-step\{display:none\}/,'JS mode shows one step at a time');
  assert.doesNotMatch(page,/\.dt-stage"><img[^>]*style="/,'no inline background overrides; ivory comes from the stylesheet');
 });

 test(path+' structured data: a factual HowTo with six real steps and a breadcrumb',()=>{
  const types=schema.map(s=>s['@type']);
  assert.ok(types.includes('HowTo')&&types.includes('BreadcrumbList'));
  const howTo=schema.find(s=>s['@type']==='HowTo');
  assert.equal(howTo.name,t.h1);
  assert.equal(howTo.step.length,6);
  howTo.step.forEach((s,i)=>{
   assert.equal(s.position,i+1);
   assert.equal(s.name,'Step '+(i+1)+': '+steps[i][1],'HowTo step '+(i+1)+' is titled with the short step title');
   assert.equal(s.text,steps[i][2],'HowTo step '+(i+1)+' carries the detailed instruction');
   assert.equal(s.image,R2_DRAWING+t.folder+steps[i][0]);
  });
  assert.ok(!JSON.stringify(schema).match(/ISBN|AggregateRating|award|reviewCount/i),'no invented credentials');
  const bc=schema.find(s=>s['@type']==='BreadcrumbList');
  assert.deepEqual(bc.itemListElement.map(i=>i.name),['Home','Activities','Drawing',t.h1]);
 });

 test(path+' is in the sitemap once, under its exact canonical path',()=>{
  const loc=site+path;
  assert.equal([...sitemap.matchAll(new RegExp('<loc>'+loc.replace(/[/.]/g,'\\$&')+'</loc>','g'))].length,1);
 });

 test(path+' sibling tutorial is offered, never a dead end',()=>{
  assert.match(page,new RegExp('href="'+t.sibling.href.replace(/\//g,'\\/')+'"'));
  assert.match(page,new RegExp(t.sibling.label));
 });
}

test('one reusable template: both pages share the same structure, only data differs',()=>{
 const cat=read('dist/how-to-draw-a-cat/index.html'),dog=read('dist/how-to-draw-a-dog/index.html');
 const skeleton=html=>(html.match(/class="dt[^"]*"/g)||[]).sort().join('|');
 assert.equal(skeleton(cat),skeleton(dog),'identical structural classes');
 const dataAttrs=h=>(h.match(/data-dt-[a-z]+/g)||[]).filter(v=>v!=='data-dt-dot').sort().join('|');
 assert.equal(dataAttrs(cat),dataAttrs(dog),'identical viewer wiring');
 assert.ok(cat.includes('1080')&&dog.includes('1240'),'each page keeps its own true dims');
});

test('the Activities cupboard has a Drawing shelf listing both tutorials',()=>{
 assert.match(activities,/id="drawing"/,'the Drawing shelf anchor exists (breadcrumbs link to it)');
 const shelf=activities.slice(activities.indexOf('id="drawing"'),activities.indexOf('bean-next'));
 assert.match(shelf,/How to draw — step by step/);
 assert.match(shelf,/href="\/how-to-draw-a-cat\/"/);
 assert.match(shelf,/href="\/how-to-draw-a-dog\/"/);
 assert.match(shelf,/Start drawing/);
 // the shelf cards use the finished colored pictures at their true dims
 assert.match(shelf,/width="1080" height="1920"/);
 assert.match(shelf,/width="1240" height="1748"/);
 const search=read('dist/search/index.html');
 assert.match(search,/id="drawing"/,'the search view shares the same catalogue shelf');
});

test('every referenced picture really exists on R2 and nothing else was invented',async()=>{
 for(const {t} of TUTORIALS){
  for(const s of t.steps){
   const r=await fetch(R2_DRAWING+t.folder+s.file,{method:'HEAD'});
   assert.equal(r.status,200,s.file+' is reachable at its uploaded R2 location');
   assert.equal(r.headers.get('content-type'),'image/png',s.file+' is a PNG');
  }
 }
});
