// Definitive alphabet asset probe — GET only (R2 public-bucket HEAD
// responses are unreliable: they return 200 even for missing objects).
// For each letter a-z and each of the six asset names we GET the file; if
// picture.png 404s we try the legacy object.png. Saves every found
// picture/object image to /home/z/my-project/alpha-inspect/pictures/ for
// visual verification, and prints a JSON report with true PNG dimensions.
import {mkdirSync, writeFileSync} from 'node:fs';
const BASE = 'https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/alphabet/';
const OUT = '/home/z/my-project/alpha-inspect/pictures';
mkdirSync(OUT, {recursive: true});
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
const NAMES = ['uppercase.png', 'lowercase.png', 'picture.png', 'pair.png', 'tracing.png', 'sound.png'];

function pngDims(buf) {
  if (buf.length < 24) return null;
  const isPng = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  if (!isPng) return {notPng: true};
  const w = (buf[16] << 24) | (buf[17] << 16) | (buf[18] << 8) | buf[19];
  const h = (buf[20] << 24) | (buf[21] << 16) | (buf[22] << 8) | buf[23];
  return {w: w >>> 0, h: h >>> 0};
}

async function get(url) {
  const r = await fetch(url);
  if (!r.ok) return {ok: false, status: r.status};
  const ab = new Uint8Array(await r.arrayBuffer());
  const head = ab.slice(0, 24);
  return {ok: true, url, bytes: ab.length, type: r.headers.get('content-type') || '', dims: pngDims(head), ab};
}

const report = {};
const missing = [];
for (const L of LETTERS) {
  report[L] = {};
  for (const name of NAMES) {
    let g = await get(BASE + L + '/' + name);
    if (!g.ok && name === 'picture.png') {
      const legacy = await get(BASE + L + '/object.png');
      if (legacy.ok) { g = {...legacy, url: legacy.url, note: 'legacy object.png'}; }
    }
    if (!g.ok) { missing.push(BASE + L + '/' + name); report[L][name] = {exists: false, status: g.status}; continue; }
    report[L][name] = {exists: true, file: g.url.replace(BASE, ''), bytes: g.bytes, type: g.type, ...(g.dims || {})};
    if (name === 'picture.png') writeFileSync(`${OUT}/${L}.png`, g.ab);
  }
}
console.log(JSON.stringify({missingCount: missing.length, missing, report}, null, 1));
