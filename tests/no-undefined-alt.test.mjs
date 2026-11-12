/* NO UNDEFINED LEAKS (owner 2026-11-12 live audit: three logic pages shipped
   alt="undefined" on the Bunny's Puzzle Blocks and Penguin's Ice Block Builder
   images because two G() game objects in src/logic-adventures.mjs had no alt
   field). Lock: no built page anywhere may contain a literal undefined or NaN
   attribute value — every image must carry real alt text. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';

const walk=d=>readdirSync(new URL('../dist'+d,import.meta.url),{withFileTypes:true}).flatMap(e=>{
  const p=d+'/'+e.name;
  return e.isDirectory()?walk(p):(e.name.endsWith('.html')?[p]:[]);
});

test('no page ships alt="undefined" or any undefined/NaN attribute value',()=>{
  const offenders=[];
  for(const f of walk('')){
    const h=readFileSync(new URL('../dist'+f,import.meta.url),'utf8');
    if(h.includes('alt="undefined"'))offenders.push(f+' has alt="undefined"');
    const leaks=[...h.matchAll(/([a-z-]+)="(?:undefined|NaN)"/g)].map(m=>f+': '+m[0]);
    offenders.push(...leaks);
  }
  assert.deepEqual(offenders,[],'undefined/NaN leaked into '+offenders.length+' spot(s): '+offenders.slice(0,5).join(' | '));
});

test('the two fixed logic games carry real alt text on every page that shows them',()=>{
  for(const p of ['/preschool/4-years/logic-thinking-and-problem-solving/','/preschool/logic/adventures/','/worksheets/logic/']){
    const h=readFileSync(new URL('../dist'+p+'index.html',import.meta.url),'utf8');
    assert.ok(h.includes('alt="Three puzzles: a 2x2 color grid'),p+' has the Bunny alt');
    assert.ok(h.includes('alt="Three ice towers'),p+' has the Penguin alt');
  }
});
