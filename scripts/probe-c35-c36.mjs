import fs from "fs";
// Probe R2 objects for the two new content batches (weather worksheets + counting flashcards).
// GET-probes (R2 HEAD lies about content-length); records dims via webp header parse.
const BASE='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/preschool/4-years/';
const BATCHES=[
 {name:'weather-worksheets',folder:'weather-seasons-and-what-we-wear/worksheets/',files:['animals-and-seasons-worksheet.webp','autumn-and-winter-sorting-worksheet.webp','autumn-weather-and-clothes-worksheet.webp','cloud-types-worksheet.webp','cloudy-weather-worksheet.webp','cover.webp','daylight-sunrise-sunset-worksheet.webp','four-seasons-matching-worksheet.webp','ice-frost-melting-worksheet.webp','light-sources-worksheet.webp','order-of-seasons-tree-changes-worksheet.webp','precipitation-hail-sleet-snow-worksheet.webp','rainbow-and-kite-weather-safety-worksheet.webp','rainy-day-puddle-worksheet.webp','rainy-day-weather-activities-worksheet.webp','seasonal-activities-worksheet.webp','seasonal-foods-harvest-worksheet.webp','shadows-worksheet.webp','snowy-weather-winter-clothes-worksheet.webp','spring-and-seasons-chart-worksheet.webp','summer-hot-and-cold-worksheet.webp','sunny-summer-weather-worksheet.webp','thermometer-temperature-worksheet.webp','thunderstorm-safety-worksheet.webp']},
 {name:'counting-flashcards',folder:'numbers-counting-and-early-math/flashcards/',files:['counting-flashcards-1-20-cover.webp','counting-flashcard-1-one-apple.webp','counting-flashcard-2-two-bananas.webp','counting-flashcard-3-three-oranges.webp','counting-flashcard-4-four-strawberries.webp','counting-flashcard-5-five-pears.webp','counting-flashcard-6-six-grapes.webp','counting-flashcard-7-seven-cherries.webp','counting-flashcard-8-eight-watermelons.webp','counting-flashcard-9-nine-peaches.webp','counting-flashcard-10-ten-blueberries.webp','counting-flashcard-11-eleven-kiwis.webp','counting-flashcard-12-twelve-lemons.webp','counting-flashcard-13-thirteen-pineapples.webp','counting-flashcard-14-fourteen-raspberries.webp','counting-flashcard-15-fifteen-mangoes.webp','counting-flashcard-16-sixteen-coconuts.webp','counting-flashcard-17-seventeen-apples.webp','counting-flashcard-18-eighteen-bananas.webp','counting-flashcard-19-nineteen-apricots.webp','counting-flashcard-20-twenty-figs.webp']}
];
const dims=buf=>{ // webp VP8/VP8L/VP8X dimension sniff
 if(buf.length<30)return null;
 if(buf.toString('ascii',0,4)!=='RIFF'||buf.toString('ascii',8,12)!=='WEBP')return null;
 const f=buf.toString('ascii',12,16);
 if(f==='VP8 '){const w=buf.readUInt16LE(26)&0x3fff,h=buf.readUInt16LE(28)&0x3fff;return{w,h}}
 if(f==='VP8L'){const b=buf.readUInt32LE(21);return{w:(b&0x3fff)+1,h:((b>>14)&0x3fff)+1}}
 if(f==='VP8X'){const w=1+(buf[24]|(buf[25]<<8)|(buf[26]<<16));const h=1+(buf[27]|(buf[28]<<8)|(buf[29]<<16));return{w,h}}
 return null};
const out={};
for(const b of BATCHES){
 out[b.name]={};
 for(const f of b.files){
  const url=BASE+b.folder+f;
  try{
   const r=await fetch(url,{headers:{Range:'bytes=0-63'}});
   const magic=Buffer.from(await r.arrayBuffer());
   const head=await fetch(url,{method:'GET',headers:{Range:'bytes=0-0'}});
   await head.arrayBuffer();
   const full=await fetch(url); // need enough bytes; cheap enough
   const ab=Buffer.from(await full.arrayBuffer());
   const d=dims(ab);
   out[b.name][f]={status:200,len:ab.length,type:r.headers.get('content-type'),w:d&&d.w,h:d&&d.h};
  }catch(e){out[b.name][f]={status:'ERR',err:e.message}}
 }
}
fs.writeFileSync('scripts/c35-c36-dims.json',JSON.stringify(out,null,1));
for(const [n,b] of Object.entries(out)){
 console.log('==',n);
 for(const [f,v] of Object.entries(b)) console.log(' ',f,v.status,v.w+'x'+v.h);
}
