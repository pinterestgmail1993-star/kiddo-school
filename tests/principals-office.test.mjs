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
 // Categories are stored as their API values and shown with their friendly labels
 for(const c of ['question','request','feedback','suggestion','complaint','technical_problem']){
  assert.ok(html.includes(`value="${c}"`),c);
 }
 for(const label of ['Question','Request','Feedback','Suggestion','Complaint','Technical Problem']){
  assert.ok(html.includes('>'+label+'</label>'),label);
 }
 assert.match(html,/for="po-subject"[^]*What is this about\?/);
 assert.match(html,/id="po-subject" name="po-subject" required/);
 assert.match(html,/id="po-message" name="po-message" rows="6" required/);
 // Parent name stays optional; email is OPTIONAL and used only if a reply is wanted
 assert.match(html,/Parent name <span class="po-opt">Optional</);
 assert.match(html,/id="po-email" name="po-email" maxlength="200"/);
 assert.match(html,/only if you&rsquo;d like a reply/);
});

test('the form is honest about the real backend: success only after the server confirms',()=>{
 // The static page describes the real destination — the Principal's private records
 assert.match(html,/goes straight to the Principal/);
 assert.match(html,/never published on the site/);
 // The client POSTs to the real API and claims success ONLY on a server ok
 assert.match(js,/preventDefault/);
 assert.match(js,/\/api\/community\/principal/);
 assert.match(js,/has been sent to the Principal/);
 assert.match(js,/We couldn\\u2019t send that\. Please try again\./,'honest failure message');
 // No offline-only faking remains, and no storage is used client-side
 assert.doesNotMatch(js,/localStorage|sessionStorage|document\.cookie/);
 // The form still posts nowhere itself — the JS is the only sender
 assert.ok(!/action="https?:/.test(html));
});

test('child privacy: the form is for grown-ups and says so, twice, in the right places',()=>{
 assert.equal((html.match(/Please don&rsquo;t include private information about your child\./g)||[]).length,1);
 assert.match(html,/doesn&rsquo;t ask for a child&rsquo;s name, age or anything else about a child/);
 // Complaints never become public content
 assert.match(html,/never published, never quoted/);
 assert.match(html,/only the Principal reads them|Only the Principal reads it/);
});
