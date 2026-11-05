/* IndexNow submission for kiddo.school — pings api.indexnow.org with every
   URL in the live sitemap (Bing + Yandex + Seznam + Naver + Yep; Google does
   not consume IndexNow). Usage: node scripts/indexnow-submit.mjs [maxUrls]
   Run after deploys that add or change pages. */
import { readFileSync } from 'node:fs';

const KEY = 'c438adb683d4674013319cb0d6171564';
const KEY_LOCATION = `https://kiddo.school/${KEY}.txt`;
const SITEMAP = 'https://kiddo.school/sitemap.xml';
const max = Number(process.argv[2] || 10000);

const xml = readFileSync('/tmp/live-sitemap.xml', 'utf8');
const all = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const urls = all.slice(0, max);
console.log(`sitemap locs: ${all.length} — submitting: ${urls.length}`);

const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: 'kiddo.school',
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }),
});
console.log(`HTTP ${res.status} — ${
  {200:'OK, URLs received',202:'accepted (key not validated yet — Bing will fetch the key file)',
   400:'bad request',403:'key not valid (403)',422:'URLs/key mismatch or not your host',
   429:'too many requests — slow down'}[res.status] ?? 'see IndexNow docs'}`);
const body = await res.text();
if (body) console.log(body.slice(0, 300));
