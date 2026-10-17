// Dump flashcard set + worksheet taxonomy for the hub filter design.
import {fcSets} from '../src/flashcards/index.mjs';
import {worksheets,subjectCounts} from '../src/worksheets.mjs';
import {SUBJECTS} from '../src/ws-common.mjs';

console.log('=== FLASHCARD SETS ===');
for(const s of fcSets){
 console.log([s.slug,s.ageLabel,s.stageName||'-',s.cards.length].join(' | '));
}
console.log('=== WORKSHEET SUBJECT COUNTS ===');
console.log(JSON.stringify(subjectCounts));
const skillVocab=new Set(); const ageVocab=new Set();
for(const w of worksheets){(w.skills||[]).forEach(k=>skillVocab.add(k));ageVocab.add(w.subject);}
console.log('=== WORKSHEET SKILL VOCAB ===');
console.log([...skillVocab].join(' | '));
console.log('=== SUBJECTS keys ===');
for(const [k,s] of Object.entries(SUBJECTS)) console.log(k+' | '+s.label+' | class '+s.classNum+' | '+s.crumb);
