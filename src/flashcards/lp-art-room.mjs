// Kiddo School — Art Room /learn/ lessons: merged registry content.
// Parts A, B and C hold the 27 lessons (file order); this module merges them
// with guards so a missing or duplicated slug fails the build loudly instead
// of quietly dropping a lesson page.
import {LP_AR_A} from './lp-art-room-a.mjs';
import {LP_AR_B} from './lp-art-room-b.mjs';
import {LP_AR_C} from './lp-art-room-c.mjs';
import {ART_ORDER} from './data-art-room.mjs';

export const lpContent={...LP_AR_A,...LP_AR_B,...LP_AR_C};

if(Object.keys(lpContent).length!==27)throw Error('art-room: expected 27 lessons, got '+Object.keys(lpContent).length);
for(const s of ART_ORDER){
 if(!lpContent[s])throw Error('art-room: no lesson for '+s);
 const need=['title','one','seoTitle','metaDescription','intro','what','mean','know','why','dev','vocab','teach','say','notice','ask','childSay','real','play','check'];
 for(const f of need)if(!lpContent[s][f])throw Error('art-room: lesson '+s+' missing field '+f);
}
