// Kiddo School — Dinosaurs /learn/ lessons: merged registry content.
// Parts A, B and C hold the 33 lessons (owner display order); this module
// merges them with guards so a missing or duplicated slug fails the build
// loudly instead of quietly dropping a lesson page.
import {LP_A} from './lp-dinosaurs-a.mjs';
import {LP_B} from './lp-dinosaurs-b.mjs';
import {LP_C} from './lp-dinosaurs-c.mjs';
import {DINO_ORDER} from './data-dinosaurs.mjs';

export const lpContent={...LP_A,...LP_B,...LP_C};

if(Object.keys(lpContent).length!==33)throw Error('dinosaurs: expected 33 lessons, got '+Object.keys(lpContent).length);
for(const s of DINO_ORDER){
 if(!lpContent[s])throw Error('dinosaurs: no lesson for '+s);
 const need=['title','one','seoTitle','metaDescription','intro','what','mean','know','why','dev','vocab','teach','say','notice','ask','childSay','real','play','check'];
 for(const f of need)if(!lpContent[s][f])throw Error('dinosaurs: lesson '+s+' missing field '+f);
}
