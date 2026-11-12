import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

/* owner 2026-11-12: "you do lesson pages" — every class page teaches, it does not just describe. */
const page=p=>readFileSync('dist'+p+'index.html','utf8');
const CLASSES=['/preschool/4-years/sight-words/','/preschool/4-years/phonics-and-beginning-sounds/','/preschool/4-years/feelings-and-kindness/','/preschool/4-years/transportation-and-vehicles/','/preschool/4-years/weather-seasons-and-what-we-wear/','/preschool/4-years/animals-and-their-habitats/','/music-room/','/kitchen/','/cafeteria/','/playground/','/extra-classes/doctor-visit/','/toddler/12-18-months/first-words-food-home/'];
test('class pages carry a taught lesson: goal, welcome, steps, practice, check, close',()=>{
 for(const p of CLASSES){
  const h=page(p);
  assert.ok(h.includes('id="teachers-lesson"'),p+' has the teacher lesson');
  assert.ok(h.includes('class="lt-goal"')&&h.includes('By the end of this class:'),p+' goal');
  assert.ok(/<span class="lt-tag">Welcome<\/span>/.test(h),p+' welcome');
  assert.ok((h.match(/class="lt-say"/g)||[]).length>=8,p+' steps');
  assert.equal((h.match(/class="lt-say"/g)||[]).length,(h.match(/class="lt-how"/g)||[]).length,p+' say/how parity');
  for(const t of ['Practice','Check','Well done'])assert.ok(h.includes('<span class="lt-tag">'+t+'</span>'),p+' '+t);
  assert.equal((h.match(/id="teachers-lesson"/g)||[]).length,1,p+' one lesson only');
 }
});
