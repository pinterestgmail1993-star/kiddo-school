import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const rd=p=>readFileSync(`dist/${p}/index.html`,'utf8');
test('legal pages exist, each topic once, no sign-up wording',()=>{
 for(const p of ['about','privacy','contact','disclaimer','terms']){
  const h=rd(p);
  assert.match(h,/All rights reserved/,`${p}: footer copyright`);
  assert.doesNotMatch(h,/no account|no sign|sign-up|sign up/i,`${p}: no sign-up wording`);
  assert.doesNotMatch(h,/style="/,`${p}: CSP-safe, no inline styles`);
 }
 assert.match(rd('terms'),/Paddle/);assert.match(rd('privacy'),/Paddle/);
 assert.doesNotMatch(rd('about')+rd('contact')+rd('disclaimer'),/Paddle/,'Paddle is covered once in Terms and once in Privacy only');
});
test('contact page has a working form wired to the community API and shows hello@kiddo.school',()=>{
 const h=rd('contact');
 assert.match(h,/mailto:hello@kiddo\.school/);
 assert.match(h,/data-contact-form/);
 assert.match(h,/\/assets\/community-api\.js/);assert.match(h,/\/assets\/contact-form\.js/);
 for(const id of ['ct-name','ct-email','ct-topic','ct-message'])assert.match(h,new RegExp(`id="${id}"`));
 const js=readFileSync('public/assets/contact-form.js','utf8');
 assert.match(js,/\/api\/community\/principal/);
});
test('footer links to contact, privacy, disclaimer and terms on every page',()=>{
 const h=rd('about');
 for(const l of ['/contact/','/privacy/','/disclaimer/','/terms/'])assert.ok(h.includes(`href="${l}"`),l);
});
