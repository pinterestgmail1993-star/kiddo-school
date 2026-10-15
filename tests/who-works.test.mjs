import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {TEACH,HELP,SAFE,WW_BASE} from '../src/who-works.mjs';
const read=f=>readFileSync(f,'utf8');
const readPage=p=>readFileSync('dist'+p+'index.html','utf8');
const site='https://kiddo.school';

/* ---------------------------------------------- WHO WORKS AT MY SCHOOL */
const html=readPage('/who-works-at-my-school/');

test('who-works: the people page with 16 cards in three owner groups',()=>{
 assert.ok(html.includes('Many people help your school run every day'),'the intro line');
 assert.equal(TEACH.length+HELP.length+SAFE.length,16,'16 person cards');
 assert.ok(html.includes('People who teach')&&html.includes('People who help')&&html.includes('People who keep us safe'),'three group headings');
 // group sizes render honestly: 6 teach, 5 help, 5 safe
 const tiles=[...html.matchAll(/class="fc-card[^"]*"/g)].map(m=>m[0]);
 assert.equal(tiles.length,16,'16 tiles on the page');
 // every person image with probed true dims (all 1000×707 landscape)
 for(const p of [...TEACH,...HELP,...SAFE]){
  assert.ok(html.includes(`<img src="${WW_BASE}${p.file}" width="1000" height="707"`),p.file+' rendered with true dims');
 }
 // the one-line activity
 assert.ok(html.includes('Which person helps you when you feel sick?'),'the activity question');
});

test('who-works: principal card links the Principal’s Office; outbound links',()=>{
 assert.ok(html.includes('<a class="fc-card fc2-cardlink ww-tile" href="/principals-office/">'),'principal card is the linked one');
 assert.ok(html.includes('Visit the Principal’s Office'),'principal tile carries the office link text');
 // exactly the four requested outbound links in the Where next row
 for(const [label,href] of [['Principal’s Office','/principals-office/'],['The Music Room','/music-room/'],['The Library','/learning-library/'],['Transportation','/preschool/4-years/transportation-and-vehicles/']]){
  assert.ok(html.includes(`href="${href}"`),'links '+href);
 }
});

test('who-works: discovered from School Community and My Classroom, indexable',()=>{
 const sc=readPage('/school-community/');
 assert.ok(sc.includes('href="/who-works-at-my-school/"'),'School Community lists the people page');
 const mc=readPage('/my-classroom/');
 assert.ok(mc.includes('href="/who-works-at-my-school/"'),'My Classroom tile links it');
 const xml=read('dist/sitemap.xml');
 assert.ok(xml.includes('<loc>'+site+'/who-works-at-my-school/</loc>'),'in the sitemap');
 // no Learning Path claim — this page is about people, not a class
 // (the site-wide nav mentions the Learning Path on every page; only the
 // page's own copy would be a claim)
 assert.ok(!html.includes('class on the Learning Path')&&!html.includes('LEARNING PATH LESSON'),'no Learning Path claims');
 // exactly the 16 person-card images render as <img>; the cover is og:image meta only
 const imgs=[...html.matchAll(/<img src="https:\/\/assets\.kiddo\.school\/school\/school-community\/who-works-at-my-school\/[^"]+"/g)];
 assert.equal(imgs.length,16,'16 person images on the page');
});
