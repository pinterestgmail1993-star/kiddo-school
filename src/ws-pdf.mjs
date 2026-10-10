// Kiddo School — minimal real-PDF writer for the printable worksheets.
// Emits a genuine PDF 1.4 file (A4 or US Letter) with the two core fonts
// (Helvetica + Helvetica-Bold, WinAnsi encoding) and vector paths/text only —
// no images, no transparency, no compression: every viewer and printer
// renders it identically. Zero dependencies so the Cloudflare Pages build
// never needs npm install.
import {textWidth} from './ws-vector.mjs';

const A4=[595.28,841.89], LETTER=[612,792];

// WinAnsi: map the few typographic characters we use to their single bytes.
const WIN={'\u2026':0x85,'\u2019':0x92,'\u2018':0x91,'\u201c':0x93,'\u201d':0x94,'\u2013':0x96,'\u2014':0x97,'\u00b7':0xB7,'\u00e9':0xE9,'\u00e8':0xE8,'\u00e0':0xE0,'\u00e7':0xE7,'\u00f1':0xF1,'\u00fc':0xFC,'\u00f6':0xF6,'\u00e4':0xE4};
function pdfEsc(s){
 let out='';
 for(const ch of String(s)){
  if(WIN[ch]!==undefined)out+='\\'+WIN[ch].toString(8);
  else if(ch==='\\')out+='\\\\';
  else if(ch==='(')out+='\\(';
  else if(ch===')')out+='\\)';
  else if(ch.charCodeAt(0)<32||ch.charCodeAt(0)>126)out+='?'; // strip anything unmapped
  else out+=ch;
 }
 return out;
}
const hexRGB=h=>{
 const n=parseInt(h.slice(1),16);
 return [(n>>16&255)/255,(n>>8&255)/255,(n&255)/255];
};
const num=n=>Math.round(n*1000)/1000;

export function buildPDF({els,W,H,size='a4',title,subject}){
 const [PW,PH]=size==='letter'?LETTER:A4;
 const scale=PW/W; // fit width; A4 and Letter only differ by a few points
 const sh=H*scale;
 const pages=[]; // one page per worksheet (this writer is single-page per file)
 // ---- content stream ----
 const c=[];
 c.push('1 J 1 j','q'); // round caps/joins like the SVG preview
 for(const el of els){
  if(el.t==='path'){
   let cur=null;let started=false;
   for(const s of el.segs){
    if(s[0]==='M'){cur=[s[1]*scale,sh-s[2]*scale];c.push(`${num(cur[0])} ${num(cur[1])} m`);started=true;}
    else if(s[0]==='L'){cur=[s[1]*scale,sh-s[2]*scale];c.push(`${num(cur[0])} ${num(cur[1])} l`);}
    else if(s[0]==='C'){cur=[s[5]*scale,sh-s[6]*scale];c.push(`${num(s[1]*scale)} ${num(sh-s[2]*scale)} ${num(s[3]*scale)} ${num(sh-s[4]*scale)} ${num(cur[0])} ${num(cur[1])} c`);}
    else if(s[0]==='Q'){ // quadratic -> cubic
     const qx=s[1]*scale,qy=sh-s[2]*scale;const ex=s[3]*scale,ey=sh-s[4]*scale;
     const c1x=cur[0]+2/3*(qx-cur[0]),c1y=cur[1]+2/3*(qy-cur[1]);
     const c2x=ex+2/3*(qx-ex),c2y=ey+2/3*(qy-ey);
     c.push(`${num(c1x)} ${num(c1y)} ${num(c2x)} ${num(c2y)} ${num(ex)} ${num(ey)} c`);
     cur=[ex,ey];
    }
    else if(s[0]==='Z'){c.push('h');started=false;}
   }
   const f=el.fill?hexRGB(el.fill):null, s=el.stroke?hexRGB(el.stroke):null;
   if(f)c.push(`${f.map(num).join(' ')} rg`);
   if(s){c.push(`${s.map(num).join(' ')} RG`,`${num((el.w||2)*scale)} w`);if(el.dash)c.push(`[${el.dash.split(',').map(d=>num(parseFloat(d)*scale)).join(' ')}] 0 d`);}
   c.push(f&&s?'B':f?'f':'S');
   if(el.dash)c.push('[] 0 d');
  }else if(el.t==='rect'){
   const f=el.fill?hexRGB(el.fill):null, s=el.stroke?hexRGB(el.stroke):null;
   c.push(`${num(el.x*scale)} ${num(sh-(el.y+el.h)*scale)} ${num(el.w*scale)} ${num(el.h*scale)} re`);
   if(f)c.push(`${f.map(num).join(' ')} rg`);
   if(s){c.push(`${s.map(num).join(' ')} RG`,`${num((el.sw||2)*scale)} w`);if(el.dash)c.push(`[${el.dash.split(',').map(d=>num(parseFloat(d)*scale)).join(' ')}] 0 d`);}
   c.push(f&&s?'B':f?'f':'S');
   if(el.dash)c.push('[] 0 d');
  }else if(el.t==='circle'||el.t==='ellipse'){
   const rx=el.t==='circle'?el.r:el.rx, ry=el.t==='circle'?el.r:el.ry;
   const K=0.5522847498,cx=el.cx*scale,cy=sh-el.cy*scale,kx=rx*scale*K,ky=ry*scale*K;
   c.push(`${num(cx-rx*scale)} ${num(cy)} m`,
    `${num(cx-kx)} ${num(cy+ky)} ${num(cx)} ${num(cy+ry*scale)} ${num(cx)} ${num(cy+ry*scale)} c`,
    `${num(cx+kx)} ${num(cy+ky)} ${num(cx+rx*scale)} ${num(cy+ky)} ${num(cx+rx*scale)} ${num(cy)} c`,
    `${num(cx+rx*scale)} ${num(cy-ky)} ${num(cx+kx)} ${num(cy-ry*scale)} ${num(cx)} ${num(cy-ry*scale)} c`,
    `${num(cx-kx)} ${num(cy-ky)} ${num(cx-rx*scale)} ${num(cy-ky)} ${num(cx-rx*scale)} ${num(cy)} c`,'h');
   const f=el.fill?hexRGB(el.fill):null, s=el.stroke?hexRGB(el.stroke):null;
   if(f)c.push(`${f.map(num).join(' ')} rg`);
   if(s){c.push(`${s.map(num).join(' ')} RG`,`${num((el.w||2)*scale)} w`);if(el.dash)c.push(`[${el.dash.split(',').map(d=>num(parseFloat(d)*scale)).join(' ')}] 0 d`);}
   c.push(f&&s?'B':f?'f':'S');
   if(el.dash)c.push('[] 0 d');
  }else if(el.t==='text'){
   const f=el.f==='b'?'F2':'F1';
   const w=textWidth(el.s,el.size,el.f)*scale;
   let x=el.x*scale;
   if(el.align==='c')x-=w/2;else if(el.align==='r')x-=w;
   c.push('BT',`/${f} ${num(el.size*scale)} Tf`);
   const col=el.color?hexRGB(el.color):[0.204,0.231,0.188];
   c.push(`${col.map(num).join(' ')} rg`,`${num(x)} ${num(sh-el.y*scale)} Td`,`(${pdfEsc(el.s)}) Tj`,'ET');
  }
 }
 c.push('Q');
 const content=c.join('\n');

 // ---- object assembly ----
 const objs=[]; // string bodies; index = object number - 1
 const addObj=body=>{objs.push(body);return objs.length;};
 // 1: catalog, 2: pages — reserved after we know counts; build in fixed order:
 // 3: page, 4: contents, 5: font F1, 6: font F2
 objs.push('<< /Type /Catalog /Pages 2 0 R >>');            // 1
 objs.push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');    // 2
 objs.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${num(PW)} ${num(PH)}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>`); // 3
 objs.push({stream:content});                               // 4 placeholder obj with stream
 objs.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');       // 5
 objs.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');  // 6
 // info
 const info=`<< /Title (${pdfEsc(title||'Kiddo School worksheet')}) /Author (Kiddo.school) /Subject (${pdfEsc(subject||'Free printable preschool worksheet')}) /Creator (Kiddo.school) >>`;
 objs.push(info); // 7

 let out='%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
 const xref=[0];
 for(let i=0;i<objs.length;i++){
  xref.push(out.length);
  const o=objs[i];
  if(o&&o.stream!==undefined){
   out+=`${i+1} 0 obj\n<< /Length ${o.stream.length} >>\nstream\n${o.stream}\nendstream\nendobj\n`;
  }else{
   out+=`${i+1} 0 obj\n${o}\nendobj\n`;
  }
 }
 const xrefStart=out.length;
 out+=`xref\n0 ${objs.length+1}\n0000000000 65535 f \n`;
 for(let i=1;i<=objs.length;i++)out+=String(xref[i]).padStart(10,'0')+' 00000 n \n';
 out+=`trailer\n<< /Size ${objs.length+1} /Root 1 0 R /Info 7 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
 return Buffer.from(out,'binary');
}
