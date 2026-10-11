// Kiddo School — the owner's own alphabet letter files on R2.
// Every letter a–z lives at school/alphabet/{letter}/ with five constant
// uploads (uppercase.png, lowercase.png, pair.png, sound.png, tracing.png)
// plus the object picture: object.png for a/b/c and picture.png for d–z
// (same images, the file name simply changed when the owner re-uploaded).
// Dimensions probed from the real files on 11 Oct 2026 (GET + IHDR parse,
// see scripts/alphabet-r2-dims.txt): letter a is square 1080×1080, every
// other letter is 1080×1350. Nothing here is invented — if a file is not on
// R2 it must not appear on the site.
export const ALPHA_R2_BASE='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/alphabet/';

const SQUARE=[1080,1080];
const TALL=[1080,1350];
const LETTERS='abcdefghijklmnopqrstuvwxyz'.split('');

// a–c keep the legacy object.png name; d–z use picture.png.
const OBJECT_FILE=Object.fromEntries([...LETTERS.map(l=>[l,'picture']),...['a','b','c'].map(l=>[l,'object'])]);

// kind: uppercase | lowercase | pair | sound | tracing | object
export function alphaVariantSrc(letter,kind){
	const file=kind==='object'?OBJECT_FILE[letter]:kind;
	const dims=letter==='a'?SQUARE:TALL;
	return {src:ALPHA_R2_BASE+letter+'/'+file+'.png',w:dims[0],h:dims[1]};
}

// Verified once against the live bucket on 11 Oct 2026: all 26 letters ×
// 6 variants answered 200/206 with the dimensions above. Kept as a data
// table so builds stay offline-deterministic.
export const ALPHA_VARIANTS=['uppercase','lowercase','pair','object','sound','tracing'];
