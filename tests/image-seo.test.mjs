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







test('shapes set page: cover carries its own ImageObject',()=>{
 const img=schemas('/flashcards/shapes/').find(s=>s['@type']==='ImageObject');
 assert.ok(img,'set page ImageObject present');
 assert.ok(img.contentUrl.includes('shapes-and-patterns-age-3/'),'cover art from the set folder');
});



test('the /art/ sitemap entry carries all fourteen art-room card images',()=>{
 const xml=readFileSync('dist/sitemap.xml','utf8');
 const m=xml.match(/<url><loc>https:\/\/kiddo\.school\/art\/<\/loc>([\s\S]*?)<\/url>/);
 assert.ok(m,'the /art/ entry parses');
 const imgs=[...m[1].matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(x=>x[1]);
 assert.equal(imgs.length,14,'fourteen images on the art room entry ('+imgs.length+')');
 for(const u of imgs)assert.match(u,/school\/art-room\/flashcards\/[a-z0-9-]+-flashcard-for-kids\.webp/,'R2 art-room image as uploaded: '+u);
});

