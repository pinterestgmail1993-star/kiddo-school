// Kiddo School — the worksheet registry: one flat list of every worksheet,
// built from the per-class data modules. Every page that renders worksheets
// reads from here so slugs, URLs, related picks and category counts can
// never drift apart.
import {SUBJECTS,CLASS_GUIDE,wsUrl,pdfUrl,WS_BASE} from './ws-common.mjs';
import {shapeWorksheets} from './ws-data-shapes.mjs';
import {colorWorksheets} from './ws-data-colors.mjs';
import {writingWorksheets} from './ws-data-writing.mjs';
import {mathsWorksheets,MATHS_TOTAL} from './ws-data-maths.mjs';
import {buildPhonicsWorksheets} from './ws-data-phonics.mjs';

const all=[...shapeWorksheets,...colorWorksheets,...writingWorksheets,...mathsWorksheets,...buildPhonicsWorksheets()];
/* the layout builders render the header from the spec itself — give every
   worksheet its title, instruction line and sheet footer note */
for(const w of all){
 if(!w.ws.title)w.ws.title=`${w.title} — Free Worksheet · Kiddo.school`;
 if(!w.ws.instr)w.ws.instr=w.task;
 if(w.ws.slugHash===undefined)w.ws.slugHash=[...w.slug].reduce((a,c)=>a*31+c.charCodeAt(0)%97,7)%997;
}
const byKey=Object.fromEntries(all.map(w=>[w.subject+'/'+w.slug,w]));
const byUrl=Object.fromEntries(all.map(w=>[wsUrl(w.subject,w.slug),w]));

export const worksheets=all;
export const worksheetByKey=byKey;
export const worksheetByUrl=byUrl;
export const MATHS_PLANNED=MATHS_TOTAL;

export const bySubject=subject=>all.filter(w=>w.subject===subject);
export const subjectCounts=Object.fromEntries(Object.keys(SUBJECTS).map(k=>[k,bySubject(k).length]));

/* Related worksheets: same subject first (nearest by number), then the
   neighbouring subjects of the same class band. Deterministic. */
export function relatedFor(w,count=6){
 const same=bySubject(w.subject).filter(x=>x.slug!==w.slug)
  .sort((a,b)=>Math.abs(a.num-w.num)-Math.abs(b.num-w.num)||a.num-b.num);
 const out=same.slice(0,count);
 if(out.length>=count)return out;
 for(const other of Object.keys(SUBJECTS).filter(k=>k!==w.subject)){
  const pool=bySubject(other).sort((a,b)=>a.num-b.num);
  for(const p of pool){if(out.length>=count)return out;out.push(p);}
 }
 return out;
}
/* neighbours for prev/next within the subject */
export function neighbours(w){
 const list=bySubject(w.subject);
 const i=list.findIndex(x=>x.slug===w.slug);
 return {prev:list[(i-1+list.length)%list.length],next:list[(i+1)%list.length]};
}

/* the layout builder lookup lives with the pages */
export const LAYOUT_BY_TYPE={
 trace:'traceSheet',traceMulti:'traceMultiSheet',count:'countSheet',caterpillar:'caterpillarSheet',
 apples:'applesSheet',pattern:'patternSheet',sort:'sortSheet',match:'matchSheet',colorKey:'colorKeySheet',
 mix:'mixSheet',symmetry:'symmetrySheet',buildWord:'buildWordSheet',letterPick:'letterPickSheet',
 writeMissing:'writeMissingSheet',counters:'countersSheet',oddOne:'oddOneSheet',pathFind:'pathFindSheet',
 wordSort:'wordSortSheet',soundSwap:'soundSwapSheet',decorate:'decorateSheet',maze:'mazeSheet',
 dotToDot:'dotToDotSheet',find:'findSheet',sequence:'sequenceSheet',position:'positionSheet'
};
