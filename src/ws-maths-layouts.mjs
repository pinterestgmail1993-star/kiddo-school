// Kiddo School — Class 24 maths layouts (the fifteen new Maths Adventures).
// Each builder turns one audited artwork's activity into ONE printable A4
// page of primitives (595×842), consumed by both backends in
// ws-vector/ws-pdf. The vector shapes mirror what the artwork really shows —
// balloon rings with empty centres, cloud stepping stones, colored eggs in a
// nest, honey drops and jars — so the printed sheet practices the same
// counting the picture invites. Nothing decorative that wastes ink.
import {M,L,C,Q,Z} from './ws-vector.mjs';
import {place,ICONS,cir,ell,path,rrect,line as wline,writeBox,startDot} from './ws-icons.mjs';
import {header,footer,sectionLabel,PW,MX,CW} from './ws-layouts.mjs';

const INK='#343b30',MUT='#626456',FAINT='#a9a08a',RULE='#ccc5b5';
const acc=i=>['#a9694e','#4a9e4f','#5aa7d6','#8f4fc0','#e0568c'][i%5];

/* a countable row of one icon with a write box at the right */
function countRow(els,y,iconName,n,scale,label){
 const bh=64;
 els.push(rrect(MX,y,CW,bh,10,'#ffffff',RULE,1.5));
 els.push({t:'text',x:MX+18,y:y+bh/2+5,s:label,size:13,f:'b',color:acc(0)});
 const iw=scale*56;
 const x0=MX+70+iw/2;
 for(let i=0;i<n;i++)els.push(...place(ICONS[iconName](),x0+i*58,y+bh/2,scale));
 els.push(...writeBox(PW-MX-64,y+10,52,bh-20));
 return y+bh+10;
}

/* =========== 1. apple-counting-game: count 10 apples, fill the basket ==== */
export function appleGameSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+4;
 y=sectionLabel(els,MX,y,'1. Count the apples in each row and write the number.');
 y=countRow(els,y,'apple',5,0.62,'Row 1:');
 y=countRow(els,y,'apple',5,0.62,'Row 2:');
 y+=4;
 els.push(rrect(MX,y,CW,74,10,'#eaf4fb','#5aa7d6',2));
 els.push({t:'text',x:MX+16,y:y+26,s:'2. How many apples all together?',size:12.5,f:'b',color:INK});
 els.push(...writeBox(PW-MX-90,y+14,66,44));
 els.push({t:'text',x:MX+16,y:y+48,s:'Count every apple, then write the number in the big box.',size:11,color:MUT});
 y+=86;
 y=sectionLabel(els,MX,y,'3. Draw apples in the basket to match your number.');
 const bh=132;
 els.push(rrect(MX,y,CW,bh,12,'#fff7ea','#e9d9a4',2));
 els.push({t:'text',x:MX+18,y:y+24,s:'Draw the apples you counted \u2014 one for each \u2014 then count again to check!',size:11,color:MUT});
 for(let i=0;i<2;i++){
  const bx=MX+22+i*258;
  els.push(rrect(bx,y+36,232,bh-50,8,'#ffffff',RULE,1.4));
  els.push(...place(ICONS.basket(),bx+52,y+36+(bh-50)/2,0.5));
  els.push(...startDot(bx+122,y+36+(bh-50)/2,4));
 }
 footer(els);
 return els;
}

/* =========== 2. balloon-number-writing: write 1–10 inside the balloons ==== */
function balloonRing(els,x,y,rx,ry,col){
 els.push(ell(x,y,rx,ry,col,INK,2.6));
 els.push(path([M(x-6,y+ry),L(x+6,y+ry),L(x,y+ry+9),Z],'#ffffff',INK,2));
 els.push(path([M(x,y+ry+9),Q(x+7,y+ry+22,x-2,y+ry+34)],null,INK,2));
}
export function balloonNumbersSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+2;
 const cols=['#e04b3f','#f5c531','#5aa7d6','#4a9e4f','#f07f28','#f28ab5','#8f4fc0','#e04b3f','#f5c531','#5aa7d6'];
 y=sectionLabel(els,MX,y,'Write the numbers in order, one balloon at a time. Say each number out loud!');
 for(let row=0;row<2;row++){
  for(let i=0;i<5;i++){
   const n=row*5+i;
   const cx=MX+34+i*108+38,cy=y+58;
   balloonRing(els,cx,cy,40,48,cols[n]);
   els.push(wline(cx-25,cy+3,cx+25,cy+3,RULE,1.6,'5,4'));
   els.push({t:'text',x:cx,y:cy+64,s:String(n+1),size:11,f:'b',color:FAINT,align:'c'});
  }
  y+=134;
 }
 y=sectionLabel(els,MX,y+2,'Then trace the last balloon number here.');
 const bh=70;
 els.push(rrect(MX,y,CW,bh,10,'#ffffff',RULE,1.5));
 els.push({t:'text',x:MX+52,y:y+bh/2+15,s:'10',size:40,f:'b',color:'#d8d2c2',align:'c'});
 els.push(wline(MX+96,y+bh/2+15,MX+CW-30,y+bh/2+15,RULE,1.5,'4,4'));
 footer(els);
 return els;
}

/* =========== 3. busy-bee-honey-factory: count 10 drops, fill 3 jars ======= */
function honeyDrop(els,x,y,s=1){
 els.push(path([M(x,y-26*s),C(x+14*s,y-8*s,x+14*s,y+10*s,x,y+20*s),C(x-14*s,y+10*s,x-14*s,y-8*s,x,y-26*s),Z],'#f5c531',INK,2.4));
 els.push(path([M(x-4*s,y-10*s),C(x-6*s,y+0,x-5*s,y+6*s,x-2*s,y+11*s)],null,'#ffffff',2.4));
}
export function honeyFactorySheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+4;
 y=sectionLabel(els,MX,y,'1. Count the honey drops in each row and write the number.');
 for(const [n,label] of [[4,'Row 1:'],[6,'Row 2:']]){
  const bh=62;
  els.push(rrect(MX,y,CW,bh,10,'#ffffff',RULE,1.5));
  els.push({t:'text',x:MX+18,y:y+bh/2+5,s:label,size:13,f:'b',color:acc(0)});
  for(let i=0;i<n;i++)honeyDrop(els,MX+86+i*56,y+bh/2,0.78);
  els.push(...writeBox(PW-MX-64,y+9,52,bh-18));
  y+=bh+9;
 }
 y+=4;
 y=sectionLabel(els,MX,y,'2. Fill the honey jars: draw drops \u2014 4 in the first jar, 3 in the second, 3 in the third.');
 const bh=150;
 els.push(rrect(MX,y,CW,bh,12,'#fff7ea','#e9d9a4',2));
 for(let i=0;i<3;i++){
  const bx=MX+26+i*172;
  const target=[4,3,3][i];
  els.push({t:'text',x:bx+66,y:y+22,s:`Jar ${i+1}: draw ${target}`,size:11.5,f:'b',color:MUT,align:'c'});
  // jar: lid rim + glass body + blank label
  els.push(rrect(bx+22,y+30,92,12,4,'#cfe9f7',INK,2.2));
  els.push(path([M(bx+28,y+42),L(bx+22,y+128),Q(bx+68,y+140,bx+114,y+128),L(bx+108,y+42),Z],'#fdf3e0',INK,2.2));
  els.push(rrect(bx+38,y+62,60,40,6,'#ffffff',RULE,1.5));
  els.push(wline(bx+46,y+82,bx+90,y+82,RULE,1.4,'4,4'));
  els.push(...writeBox(bx+50,y+108,36,22,String(target)));
 }
 footer(els);
 return els;
}

/* =========== 4. butterfly-pattern-magic: color the right wing to match ==== */
export function butterflyMatchSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr,{tint:'#fdeef5',accent:'#e0568c'});
 let y=y0+2;
 y=sectionLabel(els,MX,y,'Look at the left wing. Color the right wing to match it exactly.');
 // butterfly: body + two wings, cx=center
 const cx=PW/2,cy=y+150;
 // left wing (colored) — shapes mirror the artwork
 // big upper circle (blue), small upper oval (orange), triangle (pink), big lower oval (teal), small lower oval (orange)
 els.push(ell(cx-96,cy-56,44,46,'#5aa7d6',INK,2.4));           // upper-left big circle
 els.push(ell(cx-158,cy-84,16,26,'#f07f28',INK,2.4));           // small orange oval
 els.push(path([M(cx-108,cy+6),L(cx-60,cy+6),L(cx-84,cy+64),Z],'#e0568c',INK,2.4)); // pink triangle
 els.push(ell(cx-100,cy+104,48,30,'#3fb8af',INK,2.4));          // teal oval
 els.push(ell(cx-164,cy+134,14,24,'#f07f28',INK,2.4));          // small orange oval
 // right wing (outlines to color) — mirrored positions
 els.push(ell(cx+96,cy-56,44,46,'#ffffff',INK,2.4));
 els.push(ell(cx+158,cy-84,16,26,'#ffffff',INK,2.4));
 els.push(path([M(cx+108,cy+6),L(cx+60,cy+6),L(cx+84,cy+64),Z],'#ffffff',INK,2.4));
 els.push(ell(cx+100,cy+104,48,30,'#ffffff',INK,2.4));
 els.push(ell(cx+164,cy+134,14,24,'#ffffff',INK,2.4));
 // body + head + antennae
 els.push(path([M(cx-14,cy-70),C(cx-30,cy-40,cx-30,cy+40,cx-14,cy+120),L(cx+14,cy+120),C(cx+30,cy+40,cx+30,cy-40,cx+14,cy-70),Z],'#f5c531',INK,2.4));
 els.push(cir(cx,cy-92,26,'#f5c531',INK,2.4));
 els.push(cir(cx-8,cy-96,3.2,INK,INK,1));
 els.push(cir(cx+8,cy-96,3.2,INK,INK,1));
 els.push(path([M(cx-8,cy-96),Q(cx-18,cy-118,cx-10,cy-124)],null,INK,2));
 els.push(path([M(cx+8,cy-96),Q(cx+18,cy-118,cx+10,cy-124)],null,INK,2));
 els.push(cir(cx-11,cy-126,3.4,'#8f4fc0',INK,1.6));
 els.push(cir(cx+11,cy-126,3.4,'#8f4fc0',INK,1.6));
 y+=336;
 // color pots row — the palette the artwork offers
 y=sectionLabel(els,MX,y,'The color pots beside the butterfly.');
 const potCols=['#5aa7d6','#e0568c','#3fb8af','#f07f28','#f5c531'];
 for(let i=0;i<5;i++){
  const px=MX+52+i*104,py=y+34;
  els.push(cir(px,py,20,potCols[i],INK,2.2));
  els.push(rrect(px-24,py+24,48,20,4,'#ffffff',RULE,1.4));
 }
 y+=96;
 y=sectionLabel(els,MX,y+2,'Finished? Point to each shape and say its color: both wings the same!');
 footer(els);
 return els;
}

/* =========== 5. caterpillar-number-writing: write 1–9 on the body ========= */
export function caterpillarWriteSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+2;
 y=sectionLabel(els,MX,y,'This caterpillar has nine empty circles. Write 1 to 9 in order.');
 const cy=y+78;
 const cols=['#5aa7d6','#e04b3f','#f5c531','#3fb8af','#f07f28','#e0568c','#8f4fc0','#f5c531','#3fb8af'];
 // head at left, then 9 ring segments
 els.push(cir(MX+56,cy-8,30,'#7cc47f',INK,2.6));
 els.push(path([M(MX+46,cy-14),L(MX+40,cy-30),L(MX+52,cy-24),Z],'#7cc47f',INK,1.8));
 els.push(path([M(MX+66,cy-14),L(MX+72,cy-30),L(MX+60,cy-24),Z],'#7cc47f',INK,1.8));
 els.push(cir(MX+40,cy-34,5,'#7cc47f',INK,1.8));
 els.push(cir(MX+72,cy-34,5,'#7cc47f',INK,1.8));
 els.push(cir(MX+47,cy-14,3,INK,INK,1));
 els.push(cir(MX+65,cy-14,3,INK,INK,1));
 els.push(path([M(MX+46,cy+2),Q(MX+56,cy+10,MX+66,cy+2)],null,INK,2));
 for(let i=0;i<9;i++){
  const cx=MX+112+i*50,cyy=cy+(i%2?8:0);
  els.push(ell(cx,cyy,24,24,cols[i],INK,2.6));
  els.push(wline(cx-15,cyy+4,cx+15,cyy+4,RULE,1.5,'4,4'));
  els.push({t:'text',x:cx,y:cyy+40,s:String(i+1),size:10.5,f:'b',color:FAINT,align:'c'});
 }
 y+=128;
 y=sectionLabel(els,MX,y,'Count the circles backwards too: 9, 8, 7 \u2026 then trace the 9.');
 const bh=70;
 els.push(rrect(MX,y,CW,bh,10,'#ffffff',RULE,1.5));
 els.push({t:'text',x:MX+52,y:y+bh/2+15,s:'9',size:40,f:'b',color:'#d8d2c2',align:'c'});
 els.push(wline(MX+96,y+bh/2+15,MX+CW-30,y+bh/2+15,RULE,1.5,'4,4'));
 footer(els);
 return els;
}

/* =========== 6. cloud-castle + garden-number-path: write 1–10 on the path = */
function castleIcon(els,x,y,s=1){
 els.push(rrect(x-30*s,y-16*s,60*s,30*s,3,'#f2b8c6',INK,2.2));
 els.push(rrect(x-30*s,y-44*s,14*s,30*s,3,'#e79fb3',INK,2.2));
 els.push(rrect(x+16*s,y-44*s,14*s,30*s,3,'#e79fb3',INK,2.2));
 els.push(path([M(x-8*s,y-52*s),L(x-8*s,y-16*s),L(x+8*s,y-16*s),L(x+8*s,y-52*s),Z],'#f2b8c6',INK,2.2));
 els.push(path([M(x-12*s,y-52*s),L(x,y-66*s),L(x+12*s,y-52*s),Z],'#8f4fc0',INK,2));
 els.push(wline(x,y-66*s,x,y-76*s,INK,2));
 els.push(path([M(x,y-76*s),L(x+12*s,y-73*s),L(x,y-70*s),Z],'#e04b3f',INK,1.6));
}
function tulipIcon(els,x,y,s=1,col='#f28ab5'){
 for(let i=0;i<2;i++){
  const ox=(i?14:-14)*s;
  els.push(path([M(x+ox-9*s,y),C(x+ox-9*s,y-22*s,x+ox+9*s,y-22*s,x+ox+9*s,y),Q(x+ox,y+8*s,x+ox-9*s,y),Z],col,INK,2));
  els.push(wline(x+ox,y,x+ox,y+16*s,'#4a9e4f',2.4));
 }
}
function pathNumbersSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr,{tint:spec.tint,accent:spec.accent});
 let y=y0+2;
 y=sectionLabel(els,MX,y,spec.rowLabel);
 // sandy path band with a gentle S-curve, stones alternating up/down
 const top=y+8,bandH=196;
 els.push(path([M(MX,top+30),C(MX+140,top-18,MX+240,top+150,PW-MX,top+66),L(PW-MX,top+bandH-30),C(MX+260,top+bandH+60,MX+130,top+90,MX,top+bandH+10),Z],spec.band,spec.bandEdge,2));
 // start + end markers
 tulipIcon(els,MX+34,top+bandH-26,0.9);
 castleIcon(els,PW-MX-46,top+40,1);
 const cols=spec.cols||['#5aa7d6','#e04b3f','#f5c531','#7cc47f','#8f4fc0','#f07f28','#e0568c','#3fb8af','#f5c531','#5aa7d6'];
 for(let i=0;i<10;i++){
  const t=i/9;
  const cx=MX+58+t*(CW-116);
  const cyy=top+52+(i%2?86:8)+(i%4===3?30:0);
  els.push(ell(cx,cyy,36,30,cols[i],INK,2.6));
  els.push(wline(cx-22,cyy+4,cx+22,cyy+4,RULE,1.6,'5,4'));
  els.push({t:'text',x:cx,y:cyy+50,s:String(i+1),size:10.5,f:'b',color:FAINT,align:'c'});
 }
 y+=bandH+66;
 y=sectionLabel(els,MX,y,'Count the stones out loud \u2014 then count them backwards!');
 footer(els);
 return els;
}
export function cloudPathSheet(spec){return pathNumbersSheet(spec);}
export function stonePathSheet(spec){return pathNumbersSheet(spec);}

/* =========== 7. cupcake-bakery: count 10 cupcakes, share onto 2 plates ==== */
function cupcakeIcon(els,x,y,s=1){
 els.push(path([M(x-20*s,y),L(x+20*s,y),L(x+13*s,y+26*s),Q(x,y+32*s,x-13*s,y+26*s),Z],'#f2b8c6',INK,2.2));
 els.push(path([M(x-22*s,y-2*s),C(x-24*s,y-26*s,x+24*s,y-26*s,x+22*s,y-2*s),Q(x,y+6*s,x-22*s,y-2*s),Z],'#fdf0f4',INK,2.2));
 els.push(path([M(x-14*s,y-18*s),Q(x,y-30*s,x+14*s,y-18*s)],null,INK,1.8));
 els.push(cir(x-7*s,y-16*s,1.8*s,INK,INK,0.8));
 els.push(cir(x+7*s,y-16*s,1.8*s,INK,INK,0.8));
}
export function cupcakePlatesSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr,{tint:'#fdf0f4',accent:'#e0568c'});
 let y=y0+4;
 y=sectionLabel(els,MX,y,'1. Count the cupcakes in each row and write the number.');
 for(const [n,label] of [[5,'Row 1:'],[5,'Row 2:']]){
  const bh=62;
  els.push(rrect(MX,y,CW,bh,10,'#ffffff',RULE,1.5));
  els.push({t:'text',x:MX+18,y:y+bh/2+5,s:label,size:13,f:'b',color:acc(0)});
  for(let i=0;i<n;i++)cupcakeIcon(els,MX+86+i*56,y+bh/2,0.7);
  els.push(...writeBox(PW-MX-64,y+9,52,bh-18));
  y+=bh+9;
 }
 y+=4;
 els.push(rrect(MX,y,CW,74,10,'#eaf4fb','#5aa7d6',2));
 els.push({t:'text',x:MX+16,y:y+26,s:'2. How many cupcakes all together?',size:12.5,f:'b',color:INK});
 els.push(...writeBox(PW-MX-90,y+14,66,44));
 els.push({t:'text',x:MX+16,y:y+48,s:'Count every cupcake \u2014 5 and 5 make how many?',size:11,color:MUT});
 y+=86;
 y=sectionLabel(els,MX,y,'3. Share them out: draw 5 cupcakes on each plate.');
 const bh=140;
 els.push(rrect(MX,y,CW,bh,12,'#fff7ea','#e9d9a4',2));
 for(let i=0;i<2;i++){
  const bx=MX+22+i*258;
  els.push({t:'text',x:bx+116,y:y+22,s:`Plate ${i+1}: draw 5`,size:11.5,f:'b',color:MUT,align:'c'});
  els.push(ell(bx+116,y+82,104,44,'#ffffff',INK,2.4));
  els.push(ell(bx+116,y+82,84,32,'#ffffff',RULE,1.4));
 }
 footer(els);
 return els;
}

/* =========== 8. dinosaur-egg-rescue: 5 eggs in the nest, draw 5 more ====== */
export function eggRescueSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr,{tint:'#eef6ee',accent:'#4a9e4f'});
 let y=y0+2;
 y=sectionLabel(els,MX,y,'1. Count the eggs in the nest. Write 1 to 5 on them, left to right.');
 // nest
 const cy=y+64;
 els.push(path([M(MX+40,cy+34),Q(PW/2,cy+66,PW-MX-40,cy+34),L(PW-MX-64,cy+58),Q(PW/2,cy+92,MX+64,cy+58),Z],'#c98a4b',INK,2.4));
 els.push(wline(MX+70,cy+52,PW-MX-70,cy+52,'#a9744f',2,'6,5'));
 const eggCols=['#e04b3f','#f5c531','#8f4fc0','#7cc47f','#f28ab5'];
 for(let i=0;i<5;i++){
  const ex=MX+92+i*106;
  els.push(ell(ex,cy-8,38,50,eggCols[i],INK,2.6));
  els.push(wline(ex-22,cy-4,ex+22,cy-4,RULE,1.6,'5,4'));
  els.push({t:'text',x:ex,y:cy+58,s:String(i+1),size:10.5,f:'b',color:FAINT,align:'c'});
 }
 y+=142;
 y=sectionLabel(els,MX,y,'2. Draw 5 more eggs in the grass \u2014 then count all the eggs!');
 const bh=128;
 els.push(rrect(MX,y,CW,bh,12,'#eef6ee','#4a9e4f',2));
 for(let i=0;i<5;i++){
  const ex=MX+74+i*108,ey=y+bh/2+4;
  els.push(ell(ex,ey,34,44,'#ffffff',INK,2.4));
  els.push(path([M(ex-12,ey-18),Q(ex-4,ey-26,ex+2,ey-20)],null,RULE,1.6));
  els.push(path([M(ex+6,ey+14),Q(ex+14,ey+8,ex+12,ey+2)],null,RULE,1.6));
 }
 footer(els);
 return els;
}

/* =========== 9. farm-animal-lineup: number the line 1–5 =================== */
function barnIcon(els,x,y,s=1){
 els.push(path([M(x-34*s,y),L(x,y-26*s),L(x+34*s,y),Z],'#c2452f',INK,2.2));
 els.push(rrect(x-30*s,y,60*s,34*s,3,'#e0563c',INK,2.2));
 els.push(rrect(x-9*s,y+10*s,18*s,24*s,2,'#f5e6c8',INK,2));
 els.push(wline(x,y+10*s,x,y+34*s,INK,1.6));
}
export function lineupSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr,{tint:'#eef4e6',accent:'#4a9e4f'});
 let y=y0+2;
 y=sectionLabel(els,MX,y,'The animals line up for the barn. Write 1 to 5 in the badges \u2014 in line order!');
 const names=spec.names;
 const cols=['#5aa7d6','#e0568c','#3fb8af','#f5c531','#8f4fc0'];
 for(let i=0;i<5;i++){
  const cx=MX+50+i*92,cy=y+64;
  els.push(cir(cx,cy,38,cols[i],INK,2.6));
  els.push(cir(cx,cy,30,'#fffdf6',RULE,1.6));
  els.push(wline(cx-20,cy+6,cx+20,cy+6,RULE,1.6,'5,4'));
  els.push({t:'text',x:cx,y:cy+64,s:names[i],size:12,f:'b',color:MUT,align:'c'});
  if(i<4)els.push(wline(cx+34,cy,cx+50,cy,RULE,1.6));
 }
 barnIcon(els,PW-MX-46,y+70,0.85);
 y+=146;
 y=sectionLabel(els,MX,y,'Who is first? Who is last? Say the whole line: mouse, rabbit, cat \u2026');
 const bh=66;
 els.push(rrect(MX,y,CW,bh,10,'#ffffff',RULE,1.5));
 els.push({t:'text',x:MX+16,y:y+26,s:'Finish the line: 1, 2, 3, _, _',size:12.5,f:'b',color:INK});
 els.push(...writeBox(MX+210,y+12,46,40));
 els.push(...writeBox(MX+266,y+12,46,40));
 els.push({t:'text',x:MX+16,y:y+50,s:'Write the two missing numbers.',size:10.5,color:MUT});
 footer(els);
 return els;
}

/* =========== 10. giraffe-height-challenge: order by height ================ */
function giraffe(els,x,groundY,h){
 const s=h/150;
 const legH=36*s,bodyW=60*s,bodyH=34*s;
 const bodyCy=groundY-legH-bodyH/2;
 // four straight legs
 for(const dx of [-bodyW*0.34,-bodyW*0.12,bodyW*0.14,bodyW*0.34])els.push(wline(x+dx,bodyCy+bodyH/2-2,x+dx,groundY,INK,3));
 // body
 els.push(ell(x,bodyCy,bodyW/2,bodyH/2,'#f5c531',INK,2.6));
 // long neck rising from the body's left shoulder
 const nx=x-bodyW*0.34,baseY=bodyCy-bodyH*0.2;
 const topY=bodyCy-bodyH/2-h*0.52;
 els.push(path([M(nx-6*s,baseY),C(nx-16*s,baseY-h*0.24,nx-12*s,topY+18*s,nx-4*s,topY),L(nx+8*s,topY+4*s),C(nx+2*s,baseY-h*0.2,nx+6*s,baseY-h*0.1,nx+10*s,baseY),Z],'#f5c531',INK,2.6));
 // head at the neck top
 const hx=nx+2*s,hy=topY-6*s;
 els.push(ell(hx,hy,15*s,11*s,'#f5c531',INK,2.4));
 els.push(ell(hx+15*s,hy+2*s,7*s,5*s,'#f5c531',INK,2));
 els.push(cir(hx-1*s,hy-2*s,2.2*s,INK,INK,1));
 // ossicones
 els.push(wline(hx-5*s,hy-9*s,hx-7*s,hy-17*s,INK,2));
 els.push(wline(hx+4*s,hy-9*s,hx+4*s,hy-17*s,INK,2));
 els.push(cir(hx-7*s,hy-18*s,2.6*s,'#a9744f',INK,1.4));
 els.push(cir(hx+4*s,hy-18*s,2.6*s,'#a9744f',INK,1.4));
 // ear
 els.push(ell(hx-13*s,hy+2*s,5*s,3*s,'#f5c531',INK,1.6));
 // tail
 els.push(wline(x+bodyW/2,bodyCy-4*s,x+bodyW/2+8*s,bodyCy+16*s,INK,2));
 // patches
 for(const [dx2,dy2] of [[-4,-4],[10,-6],[-12,6],[8,8],[16,2]])els.push(cir(x+dx2*s,bodyCy+dy2*s,3.6*s,'#f07f28',null,0));
}
export function heightOrderSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr,{tint:'#fdf3e7',accent:'#e07f3e'});
 let y=y0+2;
 y=sectionLabel(els,MX,y,'Number the giraffes: 1 = the shortest, 4 = the tallest.');
 const ground=y+172;
 els.push(wline(MX,ground,PW-MX,ground,INK,2.4));
 // positions/scales match the audited artwork: medium, baby(shortest), tall, tallest
 const layout=[[0.62,98],[0.38,232],[0.78,352],[1.0,486]];
 for(const [s,cx] of layout)giraffe(els,cx,ground,170*s);
 for(const [,cx] of layout){
  els.push(...writeBox(cx-26,ground+12,52,44));
 }
 els.push({t:'text',x:PW/2,y:ground+74,s:'Look carefully: the tallest giraffe is not the first one!',size:11,color:MUT,align:'c'});
 y=ground+92;
 y=sectionLabel(els,MX,y,'Then point and say: short, shorter, shortest \u2014 tall, taller, tallest!');
 footer(els);
 return els;
}

/* =========== 11. ice-cream-number-shop: count 10 scoops, fill 3 cones ===== */
function scoopIcon(els,x,y,s=1,col='#f28ab5'){
 els.push(path([M(x-24*s,y+6*s),C(x-26*s,y-16*s,x+26*s,y-16*s,x+24*s,y+6*s),Q(x,y+14*s,x-24*s,y+6*s),Z],col,INK,2.2));
 els.push(cir(x-8*s,y-2*s,2*s,'#ffffff',null,0));
}
function coneIcon(els,x,y,s=1){
 els.push(path([M(x-24*s,y-24*s),L(x+24*s,y-24*s),L(x,y+30*s),Z],'#e8a866',INK,2.4));
 els.push(path([M(x-16*s,y-8*s),L(x+16*s,y-8*s),M(x-9*s,y+8*s),L(x+9*s,y+8*s)],null,INK,1.4));
}
export function iceCreamSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr,{tint:'#eaf4fb',accent:'#5aa7d6'});
 let y=y0+4;
 y=sectionLabel(els,MX,y,'1. Count the scoops in each row and write the number.');
 for(const [n,label] of [[5,'Row 1:'],[5,'Row 2:']]){
  const bh=62;
  els.push(rrect(MX,y,CW,bh,10,'#ffffff',RULE,1.5));
  els.push({t:'text',x:MX+18,y:y+bh/2+5,s:label,size:13,f:'b',color:acc(0)});
  for(let i=0;i<n;i++)scoopIcon(els,MX+86+i*56,y+bh/2,0.72);
  els.push(...writeBox(PW-MX-64,y+9,52,bh-18));
  y+=bh+9;
 }
 y+=4;
 els.push(rrect(MX,y,CW,74,10,'#fdf0f4','#e0568c',2));
 els.push({t:'text',x:MX+16,y:y+26,s:'2. How many scoops all together?',size:12.5,f:'b',color:INK});
 els.push(...writeBox(PW-MX-90,y+14,66,44));
 els.push({t:'text',x:MX+16,y:y+48,s:'Count every scoop \u2014 say each number with your finger on it.',size:11,color:MUT});
 y+=86;
 y=sectionLabel(els,MX,y,'3. Build the cones: draw 1 scoop, then 2, then 3.');
 const bh=150;
 els.push(rrect(MX,y,CW,bh,12,'#fff7ea','#e9d9a4',2));
 for(let i=0;i<3;i++){
  const bx=MX+96+i*172,by=y+bh-26;
  coneIcon(els,bx,by,0.9);
  const nScoops=i+1;
  for(let j=0;j<nScoops;j++){
   const sy=by-58-j*26;
   els.push(path([M(bx-20,sy),C(bx-22,sy-16,bx+22,sy-16,bx+20,sy),Q(bx,sy+7,bx-20,sy),Z],'#ffffff',INK,2));
  }
  els.push({t:'text',x:bx,y:y+22,s:`Cone ${i+1}: ${nScoops} scoop${nScoops>1?'s':''}`,size:11.5,f:'b',color:MUT,align:'c'});
 }
 footer(els);
 return els;
}

/* =========== 12. little-builder-challenge: count blocks, build towers ===== */
export function builderBlocksSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr,{tint:'#eaf4fb',accent:'#5aa7d6'});
 let y=y0+4;
 y=sectionLabel(els,MX,y,'1. Count the blocks in each row and write the number.');
 const blockIcons=['square','rectangle','triangle','arch'];
 for(const [n,label] of [[7,'Row 1:'],[5,'Row 2:']]){
  const bh=62;
  els.push(rrect(MX,y,CW,bh,10,'#ffffff',RULE,1.5));
  els.push({t:'text',x:MX+18,y:y+bh/2+5,s:label,size:13,f:'b',color:acc(0)});
  for(let i=0;i<n;i++)els.push(...place(ICONS[blockIcons[i%blockIcons.length]](),MX+88+i*56,y+bh/2,0.5));
  els.push(...writeBox(PW-MX-64,y+9,52,bh-18));
  y+=bh+9;
 }
 y+=4;
 els.push(rrect(MX,y,CW,74,10,'#eef4e6','#4a9e4f',2));
 els.push({t:'text',x:MX+16,y:y+26,s:'2. How many blocks all together?',size:12.5,f:'b',color:INK});
 els.push(...writeBox(PW-MX-90,y+14,66,44));
 els.push({t:'text',x:MX+16,y:y+48,s:'7 blocks and 5 blocks \u2014 count them all: how many?',size:11,color:MUT});
 y+=86;
 y=sectionLabel(els,MX,y,'3. Build! Draw 3 blocks on the first platform, 4 on the second, 5 on the third.');
 const bh=150;
 els.push(rrect(MX,y,CW,bh,12,'#fff7ea','#e9d9a4',2));
 for(let i=0;i<3;i++){
  const bx=MX+40+i*178;
  const target=i+3;
  els.push({t:'text',x:bx+64,y:y+20,s:`Tower ${i+1}: draw ${target}`,size:11.5,f:'b',color:MUT,align:'c'});
  for(let j=0;j<target;j++)els.push(wline(bx+22,y+bh-30-j*17,bx+106,y+bh-30-j*17,RULE,1.5,'4,4'));
  els.push(rrect(bx+12,y+bh-26,104,16,4,'#e8d9a8',INK,2.2));
 }
 footer(els);
 return els;
}

/* =========== 13. little-pizza-chef: decorate with 5 of each =============== */
export function pizzaSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr,{tint:'#fdf3e7',accent:'#e07f3e'});
 let y=y0+2;
 y=sectionLabel(els,MX,y,'Decorate the pizza: draw 5 tomato slices, 5 mushrooms and 5 olives on it.');
 const cx=PW/2,cy=y+128;
 els.push(cir(cx,cy,108,'#f5c531',INK,2.8));
 els.push(cir(cx,cy,94,'#e04b3f',null,0));
 els.push(cir(cx,cy,94,null,INK,1.6));
 // four start dots so the topping areas feel invited, not empty
 for(const [dx,dy] of [[-40,-30],[42,-26],[-30,44],[38,40]])els.push(...startDot(cx+dx,cy+dy,4));
 y+=254;
 const rows=[
  ['1. Draw 5 tomato slices','tomato',5],
  ['2. Draw 5 mushrooms','mushroom',5],
  ['3. Draw 5 olive rings','olive',5]
 ];
 for(const [label,icon,n] of rows){
  const bh=58;
  els.push(rrect(MX,y,CW,bh,10,'#ffffff',RULE,1.5));
  els.push({t:'text',x:MX+16,y:y+bh/2+5,s:label,size:12.5,f:'b',color:INK});
  if(icon==='tomato'){
   for(let i=0;i<2;i++)els.push(cir(MX+218+i*34,y+bh/2,16,'#e04b3f',INK,2));
  }else if(icon==='mushroom'){
   els.push(...place(ICONS.mushroom(),MX+240,y+bh/2,0.34));
  }else{
   for(let i=0;i<2;i++)els.push(cir(MX+224+i*34,y+bh/2,13,'#3d4c63',INK,2));
  }
  els.push({t:'text',x:MX+300,y:y+bh/2+5,s:'Count as you draw. Done?',size:11,color:MUT});
  els.push(...writeBox(PW-MX-64,y+8,52,bh-16,'yes!'));
  y+=bh+8;
 }
 footer(els);
 return els;
}
