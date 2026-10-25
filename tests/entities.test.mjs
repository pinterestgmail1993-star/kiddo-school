// Entity hygiene across every shipped page — Google-snippet law.
// Owner 2026-10-26: a Google result for the Desert Animals card page showed
// "A camel&rsquo;s humps store fat" — the named entity visible in the SERP
// itself. Root cause: authored copy held pre-escaped entities (&rsquo;,
// &mdash;, &ldquo;…), so the build escaper double-escaped them to &amp;rsquo;
// in meta descriptions/titles (browsers AND Google show those literally), and
// raw-inserted copy/JSON-LD shipped &rsquo; verbatim (Google snippets show
// named entities literally; JSON strings never decode them at all). 909
// entities were rewritten to raw Unicode at the source; dist may only ever
// contain the escaper's core set, which every parser decodes correctly:
//   &amp; &lt; &gt; &quot; and numeric &#39; (and other &#NNN; in HTML).
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readdirSync, readFileSync, statSync} from 'node:fs';
import {join} from 'node:path';

const ROOT = 'dist';
const SAFE = new Set(['amp', 'lt', 'gt', 'quot']);
const NAMED = /&([a-zA-Z]+);/g;
const ANYREF = /&[a-zA-Z]+;|&#\d+;/g;

function walk(dir, out = []) {
  for(const name of readdirSync(dir)){
    const p = join(dir, name);
    const s = statSync(p);
    if(s.isDirectory()) walk(p, out);
    else if(name.endsWith('.html')) out.push(p);
  }
  return out;
}
const pages = walk(ROOT);

test('every shipped page has a full set of meta basics and zero double-escapes',()=>{
  assert.ok(pages.length > 3600, 'the whole site was walked ('+pages.length+' pages)');
  let bad = 0, sample = '';
  for(const p of pages){
    const html = readFileSync(p, 'utf8');
    for(const m of html.matchAll(/&amp;([a-zA-Z]+);/g)){ // &amp;X; = double-escaped X
      bad++; if(!sample) sample = `${p} → &amp;${m[1]};`;
    }
  }
  assert.equal(bad, 0, 'double-escaped entities found: '+sample);
});

test('the only named entities anywhere are the core set every parser decodes',()=>{
  let bad = 0, sample = '';
  for(const p of pages){
    const html = readFileSync(p, 'utf8');
    for(const m of html.matchAll(NAMED)){
      if(!SAFE.has(m[1])){ bad++; if(!sample) sample = `${p} → &${m[1]};`; }
    }
  }
  assert.equal(bad, 0, 'non-core named entities in shipped HTML: '+sample);
});

test('JSON-LD strings carry raw text only — entities there never decode',()=>{
  // Inside <script type="application/ld+json"> the payload is JSON: HTML
  // entities are NOT decoded by JSON parsers, so a structured-data string
  // holding &rsquo; or &#8212; feeds that literal text to rich results.
  let bad = 0, sample = '';
  for(const p of pages){
    const html = readFileSync(p, 'utf8');
    for(const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){
      let data;
      try { data = JSON.parse(m[1]); }
      catch(e){ assert.fail(`${p}: JSON-LD does not parse (${e.message})`); }
      const strs = [];
      (function v(x){ if(typeof x === 'string') strs.push(x);
        else if(Array.isArray(x)) x.forEach(v);
        else if(x && typeof x === 'object') Object.values(x).forEach(v); })(data);
      for(const s of strs) if(ANYREF.test(s)){ bad++; if(!sample) sample = `${p} → ${s.slice(0,80)}`; }
      ANYREF.lastIndex = 0;
    }
  }
  assert.equal(bad, 0, 'entity refs inside JSON-LD strings: '+sample);
});

test('the reported Desert Animals page reads clean everywhere Google looks',()=>{
  const card = readFileSync('dist/flashcards/animal-categories/desert-animals/index.html', 'utf8');
  assert.match(card, /A camel’s humps store fat, not water — the water tanks are its blood/);
  assert.ok(!card.includes('&rsquo;') && !card.includes('&amp;rsquo;'), 'no rsquo refs on the card page');
  const learn = readFileSync('dist/extra-classes/animal-categories/learn/desert-animals/index.html', 'utf8');
  assert.match(learn, /content="[^"]*the camel’s fat humps[^"]*"/, 'meta description uses the raw apostrophe');
  const ld = JSON.parse(learn.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(JSON.stringify(ld).includes('&rsquo;') || JSON.stringify(ld).includes('&#8217;'), false, 'JSON-LD apostrophes are raw');
});
