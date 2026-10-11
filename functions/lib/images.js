// Server-side artwork validation and metadata stripping.
// Accepts JPEG, PNG and WebP only — verified by magic bytes, not by the
// client's declared Content-Type. Parses real pixel dimensions, rejects
// oversized images, and REBUILDS the file with metadata segments removed
// (EXIF/GPS in JPEG APP1, Photoshop APP13, XMP; WebP EXIF/XMP chunks;
// PNG eXIf and textual chunks). A file we cannot parse is rejected —
// fail closed, never store.

export const MAX_DIMENSION = 4096;

export function sniffImage(bytes) {
  const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  if (u8.length < 12) return null;
  if (u8[0] === 0xff && u8[1] === 0xd8 && u8[2] === 0xff) return 'image/jpeg';
  if (u8[0] === 0x89 && u8[1] === 0x50 && u8[2] === 0x4e && u8[3] === 0x47) return 'image/png';
  const ascii = String.fromCharCode(...u8.slice(0, 12));
  if (ascii.startsWith('RIFF') && ascii.slice(8, 12) === 'WEBP') return 'image/webp';
  return null;
}

function jpegDimensions(u8) {
  let i = 2;
  while (i + 9 < u8.length) {
    if (u8[i] !== 0xff) { i++; continue; }
    const marker = u8[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: (u8[i + 5] << 8) | u8[i + 6], width: (u8[i + 7] << 8) | u8[i + 8] };
    }
    const len = (u8[i + 2] << 8) | u8[i + 3];
    i += 2 + len;
  }
  return null;
}

function pngDimensions(u8) {
  // IHDR is always the first chunk: 8-byte signature + 4 len + 4 type.
  if (u8.length < 24) return null;
  return { width: (u8[16] << 24 | u8[17] << 16 | u8[18] << 8 | u8[19]) >>> 0, height: (u8[20] << 24 | u8[21] << 16 | u8[22] << 8 | u8[23]) >>> 0 };
}

function webpDimensions(u8) {
  const format = String.fromCharCode(u8[12], u8[13], u8[14], u8[15]);
  if (format === 'VP8 ') {
    return { width: (u8[26] | (u8[27] << 8)) & 0x3fff, height: (u8[28] | (u8[29] << 8)) & 0x3fff };
  }
  if (format === 'VP8L') {
    const bits = u8[21] | (u8[22] << 8) | (u8[23] << 16) | (u8[24] << 24);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (format === 'VP8X') {
    return { width: 1 + (u8[24] | (u8[25] << 8) | (u8[26] << 16)), height: 1 + (u8[27] | (u8[28] << 8) | (u8[29] << 16)) };
  }
  return null;
}

export function imageDimensions(bytes, type) {
  const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  try {
    if (type === 'image/jpeg') return jpegDimensions(u8);
    if (type === 'image/png') return pngDimensions(u8);
    if (type === 'image/webp') return webpDimensions(u8);
  } catch { return null; }
  return null;
}

// ---- Metadata stripping --------------------------------------------------
function isApp1Exif(u8, i) { // APP1 marker, "Exif\0\0" payload
  return u8[i] === 0xff && u8[i + 1] === 0xe1 && u8[i + 4] === 0x45 && u8[i + 5] === 0x78 && u8[i + 6] === 0x69 && u8[i + 7] === 0x66 && u8[i + 8] === 0x00;
}
function isApp1Xmp(u8, i) { // APP1 marker, "http://ns.adobe.com/xap..." payload
  return u8[i] === 0xff && u8[i + 1] === 0xe1 && u8[i + 4] === 0x68 && u8[i + 5] === 0x74 && u8[i + 6] === 0x74 && u8[i + 7] === 0x70;
}
function isApp13(u8, i) {
  return u8[i] === 0xff && u8[i + 1] === 0xed;
}
function isCom(u8, i) { // JPEG COM comment segment
  return u8[i] === 0xff && u8[i + 1] === 0xfe;
}

function stripJpeg(u8) {
  const out = [0xff, 0xd8]; // SOI
  let i = 2;
  while (i + 4 <= u8.length) {
    if (u8[i] !== 0xff) return null; // not a well-formed segment stream
    const marker = u8[i + 1];
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) { out.push(u8[i], u8[i + 1]); i += 2; continue; }
    if (marker === 0xda) { // SOS: copy the rest verbatim
      for (let j = i; j < u8.length; j++) out.push(u8[j]);
      return new Uint8Array(out);
    }
    const len = (u8[i + 2] << 8) | u8[i + 3];
    if (len < 2 || i + 2 + len > u8.length) return null;
    const drop = isApp1Exif(u8, i) || isApp1Xmp(u8, i) || isApp13(u8, i) || isCom(u8, i);
    if (!drop) for (let j = i; j < i + 2 + len; j++) out.push(u8[j]);
    i += 2 + len;
  }
  return null; // no SOS found — reject
}

function stripWebp(u8) {
  const riffSize = u8.length - 8;
  const hasExifLayout = riffSize >= 4;
  if (!hasExifLayout) return null;
  const chunks = [];
  let i = 12;
  let sawImagePayload = false;
  while (i + 8 <= u8.length) {
    const fourcc = String.fromCharCode(u8[i], u8[i + 1], u8[i + 2], u8[i + 3]);
    const size = u8[i + 4] | (u8[i + 5] << 8) | (u8[i + 6] << 16) | (u8[i + 7] << 24);
    if (size < 0 || i + 8 + size > u8.length) return null;
    const padded = size + (size % 2);
    if (fourcc === 'VP8 ' || fourcc === 'VP8L' || fourcc === 'VP8X') sawImagePayload = true;
    if (fourcc !== 'EXIF' && fourcc !== 'XMP ' && fourcc !== 'XMP\0') chunks.push([fourcc, u8.subarray(i + 8, i + 8 + size)]);
    i += 8 + padded;
  }
  if (!sawImagePayload) return null;
  const parts = [];
  let total = 4;
  for (const [fourcc, data] of chunks) {
    const pad = data.length % 2 ? 1 : 0;
    parts.push([fourcc, data, pad]);
    total += 8 + data.length + pad;
  }
  const out = new Uint8Array(8 + total);
  out.set([0x52, 0x49, 0x46, 0x46], 0); // RIFF
  let dv = new DataView(out.buffer); dv.setUint32(4, total, true);
  out.set([0x57, 0x45, 0x42, 0x50], 8); // WEBP
  let p = 12;
  for (const [fourcc, data, pad] of parts) {
    for (let k = 0; k < 4; k++) out[p + k] = fourcc.charCodeAt(k);
    dv.setUint32(p + 4, data.length, true);
    out.set(data, p + 8);
    p += 8 + data.length + pad;
  }
  return out;
}

function stripPng(u8) {
  const out = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  let i = 8;
  let sawIHDR = false, sawIEND = false;
  while (i + 12 <= u8.length) {
    const len = ((u8[i] << 24) | (u8[i + 1] << 16) | (u8[i + 2] << 8) | u8[i + 3]) >>> 0;
    const type = String.fromCharCode(u8[i + 4], u8[i + 5], u8[i + 6], u8[i + 7]);
    if (i + 8 + len + 4 > u8.length) return null;
    if (type === 'IHDR') sawIHDR = true;
    if (type === 'IEND') { sawIEND = true; for (let j = i; j < i + 12; j++) out.push(u8[j]); break; }
    const drop = type === 'eXIf' || type === 'tEXt' || type === 'zTXt' || type === 'iTXt';
    if (!drop) for (let j = i; j < i + 8 + len + 4; j++) out.push(u8[j]);
    i += 8 + len + 4;
  }
  if (!sawIHDR || !sawIEND) return null;
  return new Uint8Array(out);
}

// Returns { ok:true, bytes, type, width, height, scrubbed } or { ok:false, reason }.
export function validateAndScrubImage(bytes, { maxBytes, maxDimension = MAX_DIMENSION } = {}) {
  if (!maxBytes) return { ok: false, reason: 'no limit configured' };
  const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  if (u8.length === 0) return { ok: false, reason: 'empty file' };
  if (u8.length > maxBytes) return { ok: false, reason: 'too large' };
  const type = sniffImage(u8);
  if (!type) return { ok: false, reason: 'unsupported type' };
  const dims = imageDimensions(u8, type);
  if (!dims || !dims.width || !dims.height) return { ok: false, reason: 'unreadable image' };
  if (dims.width > maxDimension || dims.height > maxDimension) return { ok: false, reason: 'dimensions too large' };
  let clean = u8;
  let scrubbed = false;
  if (type === 'image/jpeg') clean = stripJpeg(u8);
  else if (type === 'image/webp') clean = stripWebp(u8);
  else if (type === 'image/png') clean = stripPng(u8);
  if (!clean) return { ok: false, reason: 'unreadable image' };
  scrubbed = clean.length !== u8.length;
  // Re-verify the scrubbed bytes still parse as the same image type.
  if (sniffImage(clean) !== type || !imageDimensions(clean, type)) return { ok: false, reason: 'scrub failed' };
  return { ok: true, bytes: clean, type, width: dims.width, height: dims.height, scrubbed };
}
