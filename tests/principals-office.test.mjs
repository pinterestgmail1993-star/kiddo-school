import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';

const html=readFileSync('dist/principals-office/index.html','utf8');
const js=readFileSync('dist/assets/principal-office.js','utf8');
const mc=readFileSync('dist/my-classroom/index.html','utf8');
const map=readFileSync('dist/sitemap.xml','utf8');
const about=readFileSync('dist/about/index.html','utf8');
const home=readFileSync('dist/index.html','utf8');

test('principal office: exact SEO title, one H1, discoverable from the classroom, footer, about and sitemap',()=>{
 assert.ok(html.includes('<title>The Principal’s Office | Kiddo.school</title>'));
 assert.match(html,/<h1>The Principal’s Office<\/h1>/);
 assert.match(html,/"@type":"BreadcrumbList"/);
 // My Classroom's Principal hotspot now knocks on the real office door
 assert.match(mc,/href="\/principals-office\/"/);
 assert.ok(!mc.includes('/about/#principal'), 'the hotspot no longer points at the about anchor');
 // Footer link for parents
 assert.match(home,/href="\/principals-office\/">Principal’s Office</);
 // About page carries an additive link from the Principal's own section
 assert.match(about,/id="principal"/);
 assert.match(about,/href="\/principals-office\/"/);
 assert.match(map,/<loc>https:\/\/kiddo-school\.pages\.dev\/principals-office\/<\/loc>/);
 assert.match(html,/src="\/assets\/principal-office\.js"/);
});

test('the form offers exactly the six categories and requires only the two message fields',()=>{
 for(const c of ['Question','Request','Feedback','Suggestion','Complaint','Technical Problem']){
  assert.ok(html.includes(`value="${c}"`),c);
 }
 assert.match(html,/for="po-subject"[^]*What is this about\?/);
 assert.match(html,/id="po-subject" name="po-subject" required/);
 assert.match(html,/id="po-message" name="po-message" rows="6" required/);
 // Parent name is optional; there is no email field at all (no backend, so no
 // replies are possible and nothing may be collected for them)
 assert.match(html,/Parent name <span class="po-opt">Optional</);
 assert.ok(!/type="email"/.test(html));
 assert.ok(!/po-email/.test(html));
});

test('the form is honest: no fake sending, no success message, no data leaving the browser',()=>{
 // The offline notice is visible in the static page, before anyone types
 assert.match(html,/The mailbox isn&rsquo;t connected yet\./);
 assert.match(html,/can&rsquo;t send or store anything/);
 // Submitting states the truth and never pretends success
 assert.match(js,/preventDefault/);
 assert.match(js,/couldn\\u2019t be sent/);
 assert.doesNotMatch(js,/has been sent|was sent successfully|thanks/i);
 assert.doesNotMatch(html,/Thanks\. Your message has been sent/);
 // No network, no storage: nothing typed leaves the browser
 assert.ok(!js.includes('fetch(')&&!js.includes('XMLHttpRequest'));
 assert.ok(!js.includes('localStorage')&&!js.includes('sessionStorage')&&!js.includes('document.cookie'));
 // No form handler exists anywhere in the build (static site)
 assert.ok(!/action="https?:/.test(html));
});

test('child privacy: the form is for grown-ups and says so, twice, in the right places',()=>{
 assert.equal((html.match(/Please don&rsquo;t include private information about your child\./g)||[]).length,1);
 assert.match(html,/doesn&rsquo;t ask for a child&rsquo;s name, age or anything else about a child/);
 // Complaints never become public content
 assert.match(html,/never published|never public/i);
 assert.match(html,/only to the Principal/i);
});
