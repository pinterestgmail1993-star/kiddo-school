import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
// Locks out copy that overpromises: Download saves the picture, not a PDF.
function walk(d,o=[]){for(const f of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,f.name);f.isDirectory()?walk(p,o):p.endsWith('.html')&&o.push(p);}return o;}
test('no page claims a real PDF download or absolute "every game" promises',()=>{
  const bad=[];
  for(const f of walk('dist')){const h=fs.readFileSync(f,'utf8');
    if(/a real PDF you can download|a real PDF file|real PDF downloads|really plays, with finger/.test(h))bad.push(f);}
  assert.deepEqual(bad.slice(0,5),[]);
});
