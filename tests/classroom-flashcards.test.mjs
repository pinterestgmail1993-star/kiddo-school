import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
const read=f=>readFileSync(f,'utf8');
const site='https://kiddo.school';
const readPage=p=>readFileSync('dist'+p+'index.html','utf8');

/* ---------------------------------------------- THE CLASSROOM SET */
const set=fcSetBySlug['classroom'];
const setHtml=readPage('/flashcards/classroom/');
const cover=set.cover;









test('flashcards hub lists the classroom set under its own school-rooms shelf',()=>{
 const hub=readPage('/flashcards/');
 assert.ok(hub.includes('href="/flashcards/classroom/"'),'hub links the classroom set');
 assert.ok(hub.includes('My Classroom · School Rooms'),'dedicated shelf heading');
 assert.ok(hub.includes('30 cards'),'honest card count on the wall card');
});
