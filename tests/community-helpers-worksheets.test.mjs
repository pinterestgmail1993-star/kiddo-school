// Class 33 · Community Helpers worksheets — the 35 GENUINE sheets (owner's
// Canva upload, verified on R2 under .../worksheets/, all 1545×2000 portrait,
// audited image by image). Two pages per sheet: the Learning Path ACTIVITY
// (drawing canvas aligned over the original art, save & restore, per-child
// progress) and the PRINTABLE library page (download / print / share, NO
// canvas). No flashcard is fabricated for the professions that only exist as
// worksheets (photographer, musician, flight attendant, school counselor,
// train conductor, cashier and friends).
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {execSync} from 'node:child_process';
import {communityWs,CH_WS_BASE,CH_WS_CLASS,CH_WS_LIB,CH_WS_COVER} from '../src/community-ws.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');

test('the data carries exactly the 35 verified R2 sheets plus the separate cover',()=>{
 assert.equal(communityWs.length,35,'35 sheets');
 const expect='animal-shelter-worker artist baker barber bus-driver cashier chef construction-worker crossing-guard delivery-driver dentist doctor electrician farmer firefighter flight-attendant florist librarian lifeguard mail-carrier mechanic musician nurse paramedic park-ranger photographer pilot plumber police-officer sanitation-worker school-counselor scientist teacher train-conductor veterinarian'.split(' ').sort();
 assert.deepEqual(communityWs.map(w=>w.slug).sort(),expect,'slugs are the exact R2 filenames');
 for(const w of communityWs){
  assert.equal(w.w,1545,w.slug+' width (probed on R2)');
  assert.equal(w.h,2000,w.slug+' height (probed on R2)');
  assert.ok(w.file===w.slug+'.webp',w.slug+' file matches');
  assert.ok(w.steps.length===5,w.slug+' has 5 steps');
  for(const f of ['tag','meta','learn','know','why','say','look','ask','hint','tips','check','real'])
   assert.ok(w[f]&&w[f].length>40,w.slug+' field '+f);
  assert.ok(w.skills.length>=4,w.slug+' skills list');
 }
 assert.equal(CH_WS_COVER.file,'cover.webp','cover is separate, never a sheet');
});












