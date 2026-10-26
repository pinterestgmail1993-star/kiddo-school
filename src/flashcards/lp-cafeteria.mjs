// Kiddo School — Cafeteria /learn/ lessons: merged registry content.
// Parts A–E hold the 62 lessons (file order); this module merges them with
// guards so a missing or duplicated slug fails the build loudly instead of
// quietly dropping a lesson page.
import {LP_CAF_A} from './lp-cafeteria-a.mjs';
import {LP_CAF_B} from './lp-cafeteria-b.mjs';
import {LP_CAF_C} from './lp-cafeteria-c.mjs';
import {LP_CAF_D} from './lp-cafeteria-d.mjs';
import {LP_CAF_E} from './lp-cafeteria-e.mjs';
import {CAF_ORDER} from './data-cafeteria.mjs';

export const lpContent={...LP_CAF_A,...LP_CAF_B,...LP_CAF_C,...LP_CAF_D,...LP_CAF_E};

if(Object.keys(lpContent).length!==62)throw Error('cafeteria: expected 62 lessons, got '+Object.keys(lpContent).length);
for(const s of CAF_ORDER){
 if(!lpContent[s])throw Error('cafeteria: no lesson for '+s);
 const need=['title','one','seoTitle','metaDescription','intro','what','mean','know','why','dev','vocab','teach','say','notice','ask','childSay','real','play','check'];
 for(const f of need)if(!lpContent[s][f])throw Error('cafeteria: lesson '+s+' missing field '+f);
}
