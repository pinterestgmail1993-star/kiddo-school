// Kiddo School — Clubs /learn/ lessons: merged registry content.
// Parts A–E hold the 45 lessons (display order); this module merges them
// with guards so a missing or duplicated slug fails the build loudly instead
// of quietly dropping a lesson page.
import {LP_CL_A} from './lp-clubs-a.mjs';
import {LP_CL_B} from './lp-clubs-b.mjs';
import {LP_CL_C} from './lp-clubs-c.mjs';
import {LP_CL_D} from './lp-clubs-d.mjs';
import {LP_CL_E} from './lp-clubs-e.mjs';
import {CLUBS_ORDER,CLUBS_COACH} from './data-clubs.mjs';

export const lpContent={...LP_CL_A,...LP_CL_B,...LP_CL_C,...LP_CL_D,...LP_CL_E};

if(Object.keys(lpContent).length!==45)throw Error('clubs: expected 45 lessons, got '+Object.keys(lpContent).length);
for(const s of CLUBS_ORDER){
 if(!lpContent[s])throw Error('clubs: no lesson for '+s);
 const need=['title','one','seoTitle','metaDescription','intro','what','mean','know','why','dev','vocab','teach','say','notice','ask','childSay','real','play','check'];
 for(const f of need)if(!lpContent[s][f])throw Error('clubs: lesson '+s+' missing field '+f);
}
// The two coach-led clubs teach the owner's safety line in their lesson copy.
for(const s of CLUBS_COACH){
 const l=lpContent[s];
 if(!/coach/i.test(l.know)||!l.know.includes('trained'))throw Error('clubs: lesson '+s+' must carry the trained-coach safety message');
}
