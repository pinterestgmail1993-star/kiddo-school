// image-seo — the owner's live complaint (2026-10-18): kiddo.school ranks #3
// for 'circle flashcard' but the SERP shows no image thumbnail, while the
// Pinterest result above it shows one. Root cause in the built pages: the
// only structured data was WebSite + BreadcrumbList — nothing machine-readable
// tied the page to its artwork — and the sitemap carried no image extensions.
// Fix in scripts/build.mjs: (1) every page-specific og:image joins the
// sitemap's <image:image> extension; (2) pages with a probed og:image
// (ogW+ogH) emit an ImageObject schema marked representativeOfPage — Google's
// documented signals for attaching a thumbnail to a search result.
// Locks: ImageObject on the circle card page (exact art URL + probed dims),
// og:image:width/height metas, ImageObject on a School People card page
// (proves landscape sets are covered too), valid JSON in every schema block,
// and the sitemap: image namespace declared, an <image:image> on EVERY
// flashcard URL, and the circle entry pointing at the exact card art.
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import assert from 'node:assert/strict';

const read=p=>readFileSync('dist'+p+'index.html','utf8');
const site='https://kiddo.school';
const CIRCLE='/flashcards/shapes/circle/';
const CIRCLE_ART='https://assets.kiddo.school/flashcards/preschool-learning-cards/shapes-and-patterns-age-3/01-circle.webp';

const schemas=path=>{
 const html=read(path);
 const blocks=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
 assert.ok(blocks.length>=1,path+' carries a JSON-LD block');
 return blocks.flatMap(b=>{
  let parsed;assert.doesNotThrow(()=>{parsed=JSON.parse(b[1])},path+' JSON-LD parses as valid JSON');
  return parsed;});
};

test('circle card page: ImageObject schema with the exact card art + probed dims',()=>{
 const img=schemas(CIRCLE).find(s=>s['@type']==='ImageObject');
 assert.ok(img,'ImageObject present in the JSON-LD array');
 assert.equal(img.contentUrl,CIRCLE_ART,'contentUrl is the circle card artwork itself');
 assert.equal(img.url,site+CIRCLE,'ImageObject links back to the page canonical URL');
 assert.equal(img.width,1414,'probed portrait width');
 assert.equal(img.height,2000,'probed portrait height');
 assert.equal(img.representativeOfPage,true,'marked as the page representative image');
 assert.ok(/circle/i.test(img.name),'name carries the page title');
 assert.ok(/circle/i.test(img.description),'description is the real artwork alt');
});

test('circle card page: og:image probed dimensions ride along',()=>{
 const html=read(CIRCLE);
 assert.match(html,/og:image:width" content="1414"/,'og:image:width meta');
 assert.match(html,/og:image:height" content="2000"/,'og:image:height meta');
 assert.match(html,/og:image" content="https:\/\/assets\.kiddo\.school\/[^\"]*01-circle\.webp"/,'og:image is the card art');
});

test('school-people card page: landscape sets get the same ImageObject',()=>{
 const img=schemas('/flashcards/who-works-at-my-school/principal/').find(s=>s['@type']==='ImageObject');
 assert.ok(img,'ImageObject present on the principal card page');
 assert.equal(img.width,1000,'probed landscape width');
 assert.equal(img.height,707,'probed landscape height');
 assert.equal(img.representativeOfPage,true,'representative of the page');
 assert.ok(img.contentUrl.includes('who-works-at-my-school/principal.webp'),'contentUrl is the principal art');
});

test('shapes set page: cover carries its own ImageObject',()=>{
 const img=schemas('/flashcards/shapes/').find(s=>s['@type']==='ImageObject');
 assert.ok(img,'set page ImageObject present');
 assert.ok(img.contentUrl.includes('shapes-and-patterns-age-3/'),'cover art from the set folder');
});

test('sitemap: image namespace + an <image:image> on every flashcard URL',()=>{
 const xml=readFileSync('dist/sitemap.xml','utf8');
 assert.match(xml,/xmlns:image="http:\/\/www\.google\.com\/schemas\/sitemap-image\/1\.1"/,'image namespace declared');
 // one OR MORE <image:image> per <url> — Google's documented format; the
 // /art/ room carries its whole 14-card deck on one entry (owner 2026-10-31)
 const entries=[...xml.matchAll(/<url><loc>(https:\/\/kiddo\.school[^<]*)<\/loc>((?:<image:image><image:loc>[^<]*<\/image:loc><\/image:image>)*)<\/url>/g)];
 assert.ok(entries.length>2500,'full sitemap parsed ('+entries.length+' urls)');
 const fc=entries.filter(m=>m[1].includes('/flashcards/'));
 assert.ok(fc.length>1000,'flashcard urls in sitemap ('+fc.length+')');
 const fcNoImg=fc.filter(m=>!m[2]);
 assert.equal(fcNoImg.length,0,'every flashcard url carries an image — first missing: '+(fcNoImg[0]&&fcNoImg[0][1]));
 const circle=entries.find(m=>m[1]===site+CIRCLE);
 assert.ok(circle&&circle[2],'circle card url has an image entry');
 assert.match(circle&&circle[2]||'',/01-circle\.webp/,'circle image entry points at the exact card art');
});

test('the /art/ sitemap entry carries all fourteen art-room card images',()=>{
 const xml=readFileSync('dist/sitemap.xml','utf8');
 const m=xml.match(/<url><loc>https:\/\/kiddo\.school\/art\/<\/loc>([\s\S]*?)<\/url>/);
 assert.ok(m,'the /art/ entry parses');
 const imgs=[...m[1].matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(x=>x[1]);
 assert.equal(imgs.length,14,'fourteen images on the art room entry ('+imgs.length+')');
 for(const u of imgs)assert.match(u,/school\/art-room\/flashcards\/[a-z0-9-]+-flashcard-for-kids\.webp/,'R2 art-room image as uploaded: '+u);
});

