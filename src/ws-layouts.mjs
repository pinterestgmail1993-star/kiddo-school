// Kiddo School — printable worksheet layout builders.
// Each builder turns a worksheet spec into ONE page of primitives on A4
// (595×842 pt), consumed by BOTH backends in ws-vector/ws-pdf, so the page
// preview, the browser print-out and the downloaded PDF are the same sheet.
// Builders only draw what the child actually does: trace guides, countable
// rows, circles to color, boxes to write in, cards to cut. Nothing decorative
// that a printer would waste ink on.
import {circleSegs,rrectSegs,lineSegs,fromSVG,textWidth,M,L,C,Q,Z} from './ws-vector.mjs';
import {place,ICONS,cir,ell,path,rrect,line as wline,letterTile,writeBox,startDot,starAt,cutLine} from './ws-icons.mjs';

export const PW=595,PH=842,MX=40,CW=PW-MX*2;
const INK='#343b30',MUT='#626456',FAINT='#a9a08a',RULE='#ccc5b5';

/* ---------- shared furniture ---------- */
export function header(els,title,instr,{tint='#f4efe3',accent='#a9694e'}={}){
 const tsize=Math.min(22,Math.max(14.5,(CW-60)/(textWidth(title,20,'b')/20)));
 const h=textWidth(title,tsize,'b')>CW-90?58:64;
 els.push({t:'rect',x:MX,y:40,w:CW,h,rx:13,fill:tint,stroke:accent,sw:2.4});
 els.push({t:'text',x:PW/2,y:40+h/2+7,s:title,size:tsize,f:'b',color:INK,align:'c'});
 if(instr){
  const isize=Math.min(12.5,(CW-40)/(textWidth(instr,12.5)/12.5));
  els.push({t:'text',x:PW/2,y:40+h+18,s:instr,size:isize,color:MUT,align:'c'});
 }
 els.push({t:'text',x:MX,y:40+h+40,s:'Name',size:10.5,f:'b',color:FAINT});
 els.push(wline(MX+34,40+h+42,MX+300,40+h+42,RULE,1.5));
 els.push({t:'text',x:PW-MX,y:40+h+40,s:'Date',size:10.5,f:'b',color:FAINT,align:'r'});
 els.push(wline(PW-MX-40,40+h+42,PW-MX,40+h+42,RULE,1.5));
 return 40+h+56; // y where content starts
}
export function footer(els,note='kiddo.school \u00b7 free printable preschool worksheet \u00b7 print as many as you like'){
 els.push(wline(MX,PH-46,PW-MX,PH-46,RULE,1.5));
 els.push({t:'text',x:PW/2,y:PH-30,s:note,size:9,color:FAINT,align:'c'});
}
export function sectionLabel(els,x,y,s){
 els.push({t:'text',x,y:y+4,s,size:12.5,f:'b',color:INK});
 return y+16;
}
/* fit an SVG-path bbox into a box, returns {segs,sx,sy,ex,ey} transformed */
export function fitPath(d,bx,by,bw,bh,pad=14){
 const segs=typeof d==='string'?fromSVG(d):d;
 let minx=1e9,miny=1e9,maxx=-1e9,maxy=-1e9;
 for(const s of segs){for(let i=1;i<s.length;i+=2){minx=Math.min(minx,s[i]);maxx=Math.max(maxx,s[i]);miny=Math.min(miny,s[i+1]);maxy=Math.max(maxy,s[i+1]);}}
 const sx0=pad+bx, sy0=pad+by, sw=bw-pad*2, sh=bh-pad*2;
 const k=Math.min(sw/(maxx-minx||1),sh/(maxy-miny||1));
 const ox=sx0+(sw-(maxx-minx)*k)/2, oy=sy0+(sh-(maxy-miny)*k)/2;
 const T=(x,y)=>[ox+(x-minx)*k,oy+(y-miny)*k];
 const out=[];
 for(const s of segs){
  if(s[0]==='Z'){out.push(s);continue;}
  const o=[s[0]];
  for(let i=1;i<s.length;i+=2){const [tx,ty]=T(s[i],s[i+1]);o.push(tx,ty);}
  out.push(o);
 }
 return {segs:out,start:T(segs[0][1],segs[0][2]),end:T(segs[segs.length>1?segs.length-2:0][segs[segs.length>1?segs.length-2:0].length-2],segs[segs.length>1?segs.length-2:0][segs[segs.length>1?segs.length-2:0].length-1])};
}
const shuffle=(arr,seed)=>{ // deterministic
 let s=seed;const a=arr.slice();
 for(let i=a.length-1;i>0;i--){s=(s*1103515245+12345)%2147483648;const j=s%(i+1);[a[i],a[j]]=[a[j],a[i]];}
 return a;
};
const icon=els=>els; // alias

/* =========== 1. TRACING (Class 27 + phonics letter paths) =========== */
export function traceSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 // main guide
 const mainH=spec.mainH||262;
 const main=fitPath(spec.guides[0].d,MX,y0,CW,mainH,18,spec.guides[0].sx,spec.guides[0].sy);
 els.push(rrect(MX,y0,CW,mainH,12,'#ffffff',RULE,1.6));
 els.push({t:'path',segs:main.segs,stroke:'#8f8a7a',w:4.5,dash:'10,8',cap:'r'});
 els.push(...startDot(main.start[0],main.start[1],8));
 els.push(starAt(main.end[0],main.end[1],13));
 els.push({t:'text',x:main.start[0],y:main.start[1]-16,s:'start',size:10,f:'b',color:'#4a9e4f',align:'c'});
 els.push({t:'text',x:main.end[0],y:main.end[1]+22,s:'finish',size:10,f:'b',color:'#a9694e',align:'c'});
 // two smaller repeat rows
 let y=y0+mainH+24;
 y=sectionLabel(els,MX,y,'Trace it again, two more times \u2014 a little smaller each time.');
 const rowH=86;
 for(let r=0;r<2;r++){
  const f=fitPath(spec.guides[0].d,MX,y,CW,rowH,10,spec.guides[0].sx,spec.guides[0].sy);
  els.push(rrect(MX,y,CW,rowH,10,r===0?'#ffffff':'#f9f7f0',RULE,1.4));
  els.push({t:'path',segs:f.segs,stroke:'#b3ac99',w:3.5,dash:'8,7',cap:'r'});
  els.push(...startDot(f.start[0],f.start[1],5.5));
  els.push(starAt(f.end[0],f.end[1],9));
  y+=rowH+12;
 }
 // free row
 els.push(rrect(MX,y,CW,rowH,10,'#ffffff',RULE,1.4));
 els.push(...startDot(MX+26,y+rowH/2,5.5));
 els.push(starAt(MX+CW-26,y+rowH/2,9));
 els.push(wline(MX+40,y+rowH/2,MX+CW-40,y+rowH/2,FAINT,1.2,'3,9'));
 els.push({t:'text',x:PW/2,y:Math.min(y+rowH+15,PH-58),s:'Last row: draw it all by yourself \u2014 start at the dot, stop at the star.',size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}
/* multi-guide variant (waves, zigzags — several paths side by side) */
export function traceMultiSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 const n=spec.guides.length;
 const boxH=spec.boxH||Math.min(200,Math.floor(560/n)-14);
 let y=y0;
 spec.guides.forEach((g,i)=>{
  els.push({t:'text',x:MX,y:y+16,s:`${i+1}.`,size:13,f:'b',color:accentFor(i)});
  const f=fitPath(g.d,MX+34,y,CW-40,boxH,14,g.sx,g.sy);
  els.push(rrect(MX+28,y,CW-28,boxH,10,i%2?'#f9f7f0':'#ffffff',RULE,1.5));
  els.push({t:'path',segs:f.segs,stroke:'#8f8a7a',w:4,dash:'9,8',cap:'r'});
  els.push(...startDot(f.start[0],f.start[1],6.5));
  els.push(starAt(f.end[0],f.end[1],10));
  y+=boxH+16;
 });
 els.push({t:'text',x:PW/2,y:y+6,s:spec.tip||'Go slowly. Staying on the line matters more than going fast.',size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}
const accentFor=i=>['#a9694e','#4a9e4f','#5aa7d6','#8f4fc0','#e0568c'][i%5];

/* =========== 2. COUNTING =========== */
export function countSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+6;
 spec.rows.forEach((row,ri)=>{
  const bh=spec.rowH||64;
  els.push(rrect(MX,y,CW,bh,10,ri%2?'#f9f7f0':'#ffffff',RULE,1.5));
  els.push({t:'text',x:MX+18,y:y+bh/2+5,s:`${ri+1}.`,size:14,f:'b',color:accentFor(ri)});
  const iw=spec.iconScale*56;
  const n=row.items.length;
  const span=CW-150;
  row.items.forEach((it,i)=>{
   const x=MX+52+i*(span/Math.max(n-1,1))*(n>1?1:0)+(n>1?0:span/2);
   els.push(...place(ICONS[it]&&ICONS[it]()||ICONS.apple(),x,y+bh/2,spec.iconScale));
  });
  els.push(...writeBox(PW-MX-64,y+10,52,bh-20));
  y+=bh+10;
 });
 // number line
 y+=6;
 els.push({t:'text',x:PW/2,y:y+10,s:'Number line \u2014 point and count along:',size:11,color:MUT,align:'c'});
 y+=16;
 const nx0=MX+30,nx1=PW-MX-30;
 for(let i=0;i<=10;i++){
  const x=nx0+(nx1-nx0)*i/10;
  els.push(cir(x,y,10,'#ffffff',INK,2));
  els.push({t:'text',x,y:y+3.8,s:String(i),size:11,f:'b',color:INK,align:'c'});
  if(i<10)els.push(wline(x+10,y,nx0+(nx1-nx0)*(i+1)/10-10,y,RULE,1.5));
 }
 if(spec.drawTask){
  y+=34;
  els.push(rrect(MX,y,CW,spec.drawTask.h||150,12,'#fff7ea','#e9d9a4',2));
  els.push({t:'text',x:MX+16,y:y+22,s:spec.drawTask.label,size:12.5,f:'b',color:INK});
  els.push(...place(ICONS[spec.drawTask.icon](),MX+CW-52,y+44,0.8));
  const n=spec.drawTask.targets||[3,5,7];
  n.forEach((t,i)=>{
   const bx=MX+20+i*166;
   els.push({t:'text',x:bx+62,y:y+46,s:`Draw ${t}:`,size:11.5,f:'b',color:MUT});
   els.push(rrect(bx,y+56,124,spec.drawTask.h-70,8,'#ffffff',RULE,1.4));
   els.push(...startDot(bx+16,y+56+(spec.drawTask.h-70)/2,4));
  });
 }
 footer(els);
 return els;
}
/* the two real maths worksheets are custom-drawn from their artwork */
export function caterpillarSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 // the real artwork's caterpillar: 10 colored segments + red head
 const cols=['#f28ab5','#8f4fc0','#cfe9f7','#3fb8af','#4a9e4f','#f5c531','#f07f28','#f28ab5','#e0568c'];
 let y=y0+4;
 els.push(rrect(MX,y,CW,190,12,'#ffffff',RULE,1.6));
 const segR=21,gap=6;
 let cx=MX+40+segR;
 const cy=y+120;
 const segs=10;
 for(let i=0;i<segs;i++){
  els.push(cir(cx,cy,segR,cols[i%cols.length],INK,2.6));
  els.push({t:'text',x:cx,y:cy+4,s:String(i+1),size:11,f:'b',color:'#ffffff',align:'c'});
  cx+=segR+gap;
 }
 els.push(cir(cx,cy,segR+4,'#e04b3f',INK,2.6));
 els.push(cir(cx-6,cy-6,2.6,INK,INK,1),cir(cx+6,cy-6,2.6,INK,INK,1));
 els.push(path([M(cx-8,cy+8),Q(cx,cy+15,cx+8,cy+8)],null,INK,2.2));
 els.push(wline(cx-2,cy-segR-4,cx-8,cy-segR-16,INK,2.5),wline(cx+2,cy-segR-4,cx+8,cy-segR-16,INK,2.5));
 els.push(cir(cx-9,cy-segR-18,2.6,'#4a9e4f'),cir(cx+9,cy-segR-18,2.6,'#4a9e4f'));
 els.push({t:'text',x:MX+14,y:y+28,s:'1. Count every circle of the caterpillar.',size:12.5,f:'b',color:INK});
 els.push(...writeBox(PW-MX-150,y+16,120,44));
 els.push({t:'text',x:PW-MX-90,y:y+70,s:'how many?',size:9.5,color:FAINT,align:'c'});
 // trace the number rows
 y+=206;
 y=sectionLabel(els,MX,y,'2. Trace the number, then write it twice.');
 const rows=[['10',2]];
 rows.forEach(([n])=>{
  const bx=MX,bw=CW,bh=120;
  els.push(rrect(bx,y,bw,bh,10,'#ffffff',RULE,1.5));
  // 4 cells: trace (light), trace (light), write, write
  const cellW=bw/4;
  ['10','10','',''].forEach((s,i)=>{
   const cx0=bx+i*cellW;
   els.push(rrect(cx0+8,y+14,cellW-16,bh-28,8,i<2?'#f9f7f0':'#ffffff',RULE,1.4));
   if(s)els.push({t:'text',x:cx0+cellW/2,y:y+bh/2+16,s,size:52,f:'b',color:'#d8d2c2',align:'c'});
   els.push(wline(cx0+14,y+bh/2+18,cx0+cellW-14,y+bh/2+18,RULE,1.4,'4,4'));
  });
  y+=bh+12;
 });
 // count the apples row
 y=sectionLabel(els,MX,y+2,'3. Count each row of apples and write the number.');
 countRowsInline(els,y,[3,5,2]);
 footer(els);
 return els;
}
export function applesSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+4;
 y=sectionLabel(els,MX,y,'1. Count the apples in each row and write the number.');
 y=countRowsInline(els,y,[3,5,2,4]);
 // basket task
 y+=8;
 const bh=spec.basketH||170;
 els.push(rrect(MX,y,CW,bh,12,'#fff7ea','#e9d9a4',2));
 els.push({t:'text',x:MX+16,y:y+24,s:'2. Draw apples in the basket.',size:12.5,f:'b',color:INK});
 els.push({t:'text',x:MX+16,y:y+42,s:spec.basketInstr||'The basket holds 5. Draw exactly 5 apples \u2014 then count to check!',size:11,color:MUT});
 els.push(...place(ICONS.basket(),MX+CW-56,y+52,0.75));
 [0,1].forEach(i=>{
  const bx=MX+24+i*250;
  els.push({t:'text',x:bx,y:y+62,s:i===0?'First basket: draw 3.':i===1?'Second basket: draw 5.':'',size:11.5,f:'b',color:MUT});
  els.push(rrect(bx,y+70,230,bh-92,8,'#ffffff',RULE,1.4));
  els.push(...place(ICONS.basket(),bx+56,y+70+(bh-92)/2+6,0.55));
 });
 y+=bh+16;
 y=sectionLabel(els,MX,y,'3. Trace the numbers.');
 ['3','5','10'].forEach((n,i)=>{
  const bx=MX+i*176;
  els.push(rrect(bx,y,160,64,8,i%2?'#f9f7f0':'#ffffff',RULE,1.4));
  els.push({t:'text',x:bx+40,y:y+45,s:n,size:34,f:'b',color:'#d8d2c2',align:'c'});
  els.push(wline(bx+80,y+40,bx+140,y+40,RULE,1.4,'4,4'));
 });
 footer(els);
 return els;
}
function countRowsInline(els,y,counts){
 const start=y;
 counts.forEach((n,ri)=>{
  const bh=58;
  els.push(rrect(MX,y,CW,bh,10,ri%2?'#f9f7f0':'#ffffff',RULE,1.5));
  els.push({t:'text',x:MX+16,y:y+bh/2+5,s:`${ri+1}.`,size:13,f:'b',color:accentFor(ri)});
  for(let i=0;i<n;i++){
   const x=MX+48+i*52;
   els.push(...place(ICONS.apple(),x,y+bh/2,0.62));
  }
  els.push(...writeBox(PW-MX-64,y+9,52,bh-18));
  y+=bh+8;
 });
 return y+6;
}

/* =========== 3. PATTERNS =========== */
export function patternSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+6;
 spec.rows.forEach((row,ri)=>{
  const bh=spec.rowH||92;
  els.push(rrect(MX,y,CW,bh,10,ri%2?'#f9f7f0':'#ffffff',RULE,1.5));
  els.push({t:'text',x:MX+16,y:y+bh/2+5,s:`${ri+1}.`,size:13.5,f:'b',color:accentFor(ri)});
  const cells=row.seq.length+1;
  const cw=Math.min(74,(CW-120)/cells);
  const x0=MX+52;
  row.seq.forEach((st,i)=>{
   const x=x0+i*cw+cw/2;
   drawPatternCell(els,st,x,y+bh/2);
  });
  // the mystery cell
  const xm=x0+row.seq.length*cw+cw/2;
  els.push(rrect(xm-cw/2+4,y+bh/2-cw/2,cw-8,cw-8,8,'#ffffff',INK,2.4));
  els.push({t:'text',x:xm,y:y+bh/2+7,s:'?',size:22,f:'b',color:FAINT,align:'c'});
  els.push({t:'text',x:PW-MX-14,y:y+bh/2+5,s:'\u2190 draw or color what comes next',size:10,color:FAINT,align:'r'});
  y+=bh+10;
 });
 if(spec.sayTip)els.push({t:'text',x:PW/2,y:y+8,s:spec.sayTip,size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}
function drawPatternCell(els,st,x,y){
 // st: {shape,color} for the nine shapes, or {icon:'apple'} for sticker rows
 if(st.icon){els.push(...place(ICONS[st.icon](),x,y,0.62));return;}
 els.push(...place(ICONS[st.shape]&&st.color?withColor(st.shape,st.color):ICONS[st.shape](),x,y,0.6));
}
function outlineOf(name){
 const els=(ICONS[name]||ICONS.circle)().map(el=>{
  const o={...el,fill:'#ffffff',stroke:'#8f8a7a',dash:'7,6'};
  if(el.t==='rect'){o.sw=2.6;}
  return o;
 });
 return els;
}
function withColor(shape,color){
 const base=ICONS[shape]().map(el=>{
  if(el.t==='circle'||el.t==='ellipse'||el.t==='rect')return {...el,fill:color};
  if(el.t==='path'&&!el.fill)return el;
  return {...el,fill:color};
 });
 return base;
}

/* =========== 4. SORTING (two bins, cut & glue or cross-sort) =========== */
export function sortSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+4;
 els.push(...cutLine(MX+60,y,MX+CW-60));
 y+=14;
 // cut cards
 const items=shuffle(spec.items,spec.slugHash||7);
 const cardW=104,cardH=104;
 const perRow=Math.floor(CW/(cardW+10));
 items.forEach((it,i)=>{
  const x=MX+(i%perRow)*(cardW+10)+(cardW/2);
  const yy=y+Math.floor(i/perRow)*(cardH+10)+cardH/2;
  els.push(rrect(x-cardW/2+3,yy-cardH/2+3,cardW-6,cardH-6,8,'#ffffff',RULE,1.6));
  els.push(...place(ICONS[it.icon](),x,yy-6,0.62));
 });
 y+=Math.ceil(items.length/perRow)*(cardH+10)+10;
 // bins
 const binY=y,binH=spec.binH||180,binW=(CW-24)/2;
 spec.bins.forEach((b,i)=>{
  const x=MX+i*(binW+24);
  els.push(rrect(x,binY,binW,binH,12,'#ffffff',INK,2.4,'8,6'));
  els.push(rrect(x,binY,binW,34,12,i===0?spec.binTint0||'#eef4e6':spec.binTint1||'#fdeeee',null,0));
  els.push({t:'text',x:x+binW/2,y:binY+22,s:b.label,size:13.5,f:'b',color:INK,align:'c'});
  if(b.icon)els.push(...place(ICONS[b.icon](),x+binW/2,binY+72,0.5));
 });
 els.push({t:'text',x:PW/2,y:binY+binH+18,s:spec.tip||'Cut the cards on the dotted line, then glue each one in the right box.',size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}

/* =========== 5. MATCHING (draw the lines) =========== */
export function matchSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+10;
 const n=spec.pairs.length,rowH=Math.min(96,(560-y0)/n-14);
 const colL=MX+110,colR=PW-MX-110;
 // deterministic right-column shuffle
 const order=shuffle(spec.pairs.map((_,i)=>i),(spec.slugHash||11)+3);
 els.push(...startDot(colL-14,y+rowH/2,4));
 els.push(...startDot(colR+14,y+rowH/2,4));
 spec.pairs.forEach((p,i)=>{
  const yL=y+i*(rowH+10)+rowH/2;
  els.push(rrect(MX,yL-rowH/2,180,rowH,10,'#ffffff',RULE,1.6));
  els.push(...place(ICONS[p.a](),MX+90,yL-6,0.62));
  const j=order[i];
  const yR=y+j*(rowH+10)+rowH/2;
  els.push(rrect(PW-MX-180,yR-rowH/2,180,rowH,10,'#ffffff',RULE,1.6));
  const rb=spec.pairs[j].b;
  const rels=(spec.rightOutline?outlineOf(rb):ICONS[rb]());
  els.push(...place(rels,PW-MX-90,yR-6,0.62));
  els.push(cir(colL,yL,4.5,'#a9694e'));
  els.push(cir(colR,yR,4.5,'#a9694e'));
 });
 y+=n*(rowH+10)+8;
 els.push({t:'text',x:PW/2,y:y+8,s:spec.tip||'Draw a line from each picture on the left to its partner on the right.',size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}

/* =========== 6. COLOR THE PICTURE (colors class) =========== */
export function colorKeySheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 const artY=y0+6,artH=spec.artH||360;
 els.push(rrect(MX,artY,CW,artH,12,'#ffffff',RULE,1.6));
 const artScale=Math.min((CW-60)/120,(artH-60)/120);
 els.push(...place(ICONS[spec.art](),PW/2,artY+artH/2,artScale));
 // key chips
 let y=artY+artH+22;
 y=sectionLabel(els,MX,y,'Your color key \u2014 color each circle, then use it in the picture.');
 const chips=spec.key||['red','orange','yellow','green','blue','purple'];
 const perRow=4,chW=(CW-30)/perRow;
 chips.forEach((c,i)=>{
  const x=MX+(i%perRow)*chW+26,yy=y+Math.floor(i/perRow)*52+20;
  els.push(cir(x,yy,15,'#ffffff',INK,2.4));
  els.push({t:'text',x:x+24,y:yy+4.5,s:c,size:12.5,f:'b',color:INK});
 });
 y+=Math.ceil(chips.length/perRow)*52+10;
 els.push({t:'text',x:PW/2,y:y+8,s:spec.tip||'Printed in black and white? Even better \u2014 invent your own colors!',size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}

/* =========== 7. COLOR MIXING =========== */
export function mixSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+10;
 spec.recipes.forEach((r,i)=>{
  const bh=96;
  els.push(rrect(MX,y,CW,bh,10,i%2?'#f9f7f0':'#ffffff',RULE,1.5));
  const cy=y+bh/2;
  els.push(cir(MX+70,cy,30,'#ffffff',INK,2.6));
  els.push({t:'text',x:MX+70,y:cy+5,s:r.a,size:13,f:'b',color:INK,align:'c'});
  els.push({t:'text',x:MX+124,y:cy+8,s:'+',size:24,f:'b',color:MUT,align:'c'});
  els.push(cir(MX+178,cy,30,'#ffffff',INK,2.6));
  els.push({t:'text',x:MX+178,y:cy+5,s:r.b,size:13,f:'b',color:INK,align:'c'});
  els.push({t:'text',x:MX+232,y:cy+8,s:'=',size:24,f:'b',color:MUT,align:'c'});
  els.push(cir(MX+286,cy,30,r.hintColor||'#ffffff',INK,2.6));
  els.push({t:'text',x:MX+286,y:cy+34,s:'color me!',size:9,color:FAINT,align:'c'});
  els.push({t:'text',x:MX+340,y:cy-4,s:r.hint,size:11.5,color:MUT});
  els.push(...writeBox(PW-MX-150,cy-22,120,44));
  els.push({t:'text',x:PW-MX-90,y:cy+36,s:'write the new color',size:9,color:FAINT,align:'c'});
  y+=bh+10;
 });
 y+=4;
 els.push({t:'text',x:PW/2,y:y+8,s:spec.tip||'Say the recipe out loud before you color the surprise circle.',size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}

/* =========== 8. SYMMETRY (finish the mirror half) =========== */
export function symmetrySheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 const boxY=y0+6,boxH=spec.boxH||400;
 els.push(rrect(MX,boxY,CW,boxH,12,'#ffffff',RULE,1.6));
 const cx=PW/2,cy=boxY+boxH/2;
 els.push(wline(cx,boxY+12,cx,boxY+boxH-12,RULE,1.6,'6,6'));
 els.push({t:'text',x:cx+8,y:boxY+24,s:'mirror line',size:9.5,color:FAINT});
 // right half drawn (solid), left half dashed to complete
 const s=spec.scale||2.2;
 const right=spec.half.map(h=>({...h}));
 right.forEach(h=>{
  els.push({t:'path',segs:h.segs.map(sg=>sg[0]==='Z'?sg:[sg[0],...sg.slice(1).map((v,i)=>i%2===0?cx+v*s:cy+v*s)]),fill:null,stroke:INK,w:3});
 });
 spec.half.forEach(h=>{
  els.push({t:'path',segs:h.segs.map(sg=>sg[0]==='Z'?sg:[sg[0],...sg.slice(1).map((v,i)=>i%2===0?cx-v*s:cy+v*s)]),fill:null,stroke:FAINT,w:2.6,dash:'7,7'});
 });
 els.push({t:'text',x:PW/2,y:boxY+boxH+18,s:spec.tip||'The right side is drawn. Finish the left side so both wings match \u2014 then color them the same.',size:11,color:MUT,align:'c'});
 // mini reference
 if(spec.refIcon){
  els.push({t:'text',x:MX,y:boxY+boxH+44,s:'Need a peek? This is the finished picture:',size:10.5,color:MUT});
  els.push(...place(ICONS[spec.refIcon](),MX+230,boxY+boxH+58,0.42));
 }
 footer(els);
 return els;
}

/* =========== 9. BUILD / WRITE WORDS =========== */
export function buildWordSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+8;
 spec.words.forEach((w,i)=>{
  const bh=100;
  els.push(rrect(MX,y,CW,bh,10,i%2?'#f9f7f0':'#ffffff',RULE,1.5));
  els.push(...place(ICONS[w.icon](),MX+52,y+bh/2-6,0.66));
  const bx=MX+110,bw=CW-190;
  const cells=w.word.length;
  const cw=Math.min(66,bw/cells);
  w.word.split('').forEach((ch,ci)=>{
   const x=bx+ci*cw;
   els.push(rrect(x+3,y+14,cw-6,48,6,'#ffffff',INK,2));
   if(ci===w.blank||w.blank===undefined)els.push(wline(x+8,y+58,x+cw-8,y+58,RULE,1.3,'4,4'));
   if(w.blank===undefined&&ch)els.push({t:'text',x:x+cw/2,y:y+46,s:ch,size:26,f:'b',color:'#d8d2c2',align:'c'});
  });
  if(w.blank!==undefined){
   els.push({t:'text',x:PW-MX-58,y:y+bh/2+5,s:'\u2190 write it',size:9.5,color:FAINT,align:'r'});
  }
  y+=bh+10;
 });
 if(spec.bank){
  y+=4;
  els.push(rrect(MX,y,CW,44,10,'#fff7ea','#e9d9a4',2));
  els.push({t:'text',x:MX+16,y:y+27,s:'Letter bank:',size:11.5,f:'b',color:INK});
  els.push({t:'text',x:MX+110,y:y+28,s:spec.bank.join('   '),size:15,f:'b',color:'#a9694e'});
  y+=54;
 }
 els.push({t:'text',x:PW/2,y:y+8,s:spec.tip||'Say each sound as you write its letter \u2014 then read the whole word back.',size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}

/* =========== 10. CIRCLE THE LETTER =========== */
export function letterPickSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+8;
 spec.rows.forEach((row,i)=>{
  const bh=108;
  els.push(rrect(MX,y,CW,bh,10,i%2?'#f9f7f0':'#ffffff',RULE,1.5));
  // target letter chip
  els.push(cir(MX+56,y+bh/2,34,spec.targetFill||'#fff7ea',INK,2.6));
  els.push({t:'text',x:MX+56,y:y+bh/2+2,s:row.target.toLowerCase(),size:30,f:'b',color:INK,align:'c'});
  els.push({t:'text',x:MX+56,y:y+bh/2+48,s:`"${row.say}"`,size:9.5,color:MUT,align:'c'});
  // choices
  const n=row.choices.length,cw2=(CW-160)/n;
  row.choices.forEach((c,ci)=>{
   const x=MX+120+ci*cw2+cw2/2;
   if(c.pic){
    els.push(...place(ICONS[c.pic](),x,y+bh/2-8,0.6));
    if(c.correct)els.push(cir(x,y+bh/2-8,46,null,'#4a9e4f',2.2,'6,5'));
   }else{
    els.push(rrect(x-32,y+bh/2-32,64,64,8,'#ffffff',INK,2.2));
    els.push({t:'text',x,y:y+bh/2+9,s:c.letter.toLowerCase(),size:30,f:'b',color:INK,align:'c'});
   }
  });
  y+=bh+10;
 });
 els.push({t:'text',x:PW/2,y:y+8,s:spec.tip||'Circle every match. Grown-up helper: say the sound \u2014 not the letter name \u2014 for each picture.',size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}

/* =========== 11. WRITE THE MISSING LETTER =========== */
export function writeMissingSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+8;
 spec.rows.forEach((row,i)=>{
  const bh=96;
  els.push(rrect(MX,y,CW,bh,10,i%2?'#f9f7f0':'#ffffff',RULE,1.5));
  els.push(...place(ICONS[row.icon](),MX+54,y+bh/2-6,0.66));
  // word with missing first letter
  let x=MX+120;
  const size=30,cw=40;
  if(row.pre!==undefined){
   // missing MIDDLE letter: pre + [box] + post
   els.push({t:'text',x:x+20,y:y+bh/2+11,s:row.pre,size,f:'b',color:INK});
   x+=44;
   els.push(rrect(x,y+bh/2-26,48,52,7,'#ffffff',INK,2.4));
   x+=56;
   row.post.split('').forEach(ch=>{
    els.push({t:'text',x:x+cw/2,y:y+bh/2+11,s:ch,size,f:'b',color:INK,align:'c'});
    x+=cw;
   });
  }else{
   els.push(rrect(x,y+bh/2-26,48,52,7,'#ffffff',INK,2.4));
   els.push({t:'text',x:x+24,y:y+bh/2+38,s:'write it',size:8.5,color:FAINT,align:'c'});
   x+=56;
   row.rest.split('').forEach(ch=>{
    els.push({t:'text',x:x+cw/2,y:y+bh/2+11,s:ch,size,f:'b',color:INK,align:'c'});
    x+=cw;
   });
  }
  if(row.hintWord)els.push({t:'text',x:PW-MX-16,y:y+bh/2+5,s:`(${row.hintWord})`,size:10.5,color:FAINT,align:'r'});
  y+=bh+10;
 });
 if(spec.bank){
  els.push(rrect(MX,y,CW,46,10,'#fff7ea','#e9d9a4',2));
  els.push({t:'text',x:MX+16,y:y+29,s:'Letter bank:',size:11.5,f:'b',color:INK});
  els.push({t:'text',x:MX+118,y:y+30,s:spec.bank.join('   '),size:16,f:'b',color:'#a9694e'});
  y+=56;
 }
 els.push({t:'text',x:PW/2,y:y+8,s:spec.tip||'Say the picture word slowly. The first sound you hear is the letter that goes in the box.',size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}

/* =========== 12. SOUND / SYLLABLE COUNTERS =========== */
export function countersSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+8;
 spec.rows.forEach((row,i)=>{
  const bh=92;
  els.push(rrect(MX,y,CW,bh,10,i%2?'#f9f7f0':'#ffffff',RULE,1.5));
  els.push(...place(ICONS[row.icon](),MX+54,y+bh/2-6,0.64));
  els.push({t:'text',x:MX+100,y:y+bh/2+5,s:row.word,size:17,f:'b',color:INK});
  els.push({t:'text',x:MX+100,y:y+bh/2+24,s:row.hint,size:9.5,color:FAINT});
  const n=spec.max||4,cw2=52;
  for(let k=0;k<n;k++){
   const x=PW-MX-40-(n-1-k)*cw2-cw2/2;
   els.push(cir(x,y+bh/2,17,'#ffffff',INK,2.2));
  }
  els.push(...writeBox(PW-MX-40-cw2*n-64,y+bh/2-20,48,40));
  y+=bh+10;
 });
 els.push({t:'text',x:PW/2,y:y+8,s:spec.tip,size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}

/* =========== 13. ODD ONE OUT =========== */
export function oddOneSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+8;
 spec.rows.forEach((row,i)=>{
  const bh=104;
  els.push(rrect(MX,y,CW,bh,10,i%2?'#f9f7f0':'#ffffff',RULE,1.5));
  els.push({t:'text',x:MX+16,y:y+bh/2+5,s:`${i+1}.`,size:13.5,f:'b',color:accentFor(i)});
  const n=row.pics.length,cw2=(CW-70)/n;
  row.pics.forEach((p,pi)=>{
   const x=MX+50+pi*cw2+cw2/2;
   els.push(...place(ICONS[p](),x,y+bh/2-8,0.6));
  });
  y+=bh+10;
 });
 els.push({t:'text',x:PW/2,y:y+8,s:spec.tip||'Circle the picture that does NOT start with the same sound as the others.',size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}

/* =========== 14. FOLLOW THE SOUND PATH =========== */
export function pathFindSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 const boxY=y0+6,boxH=spec.boxH||430;
 els.push(rrect(MX,boxY,CW,boxH,12,'#ffffff',RULE,1.6));
 // winding dashed path
 const wave=[];
 const amp=60,steps=6;
 const x0=MX+50,x1=PW-MX-50;
 wave.push(['M',x0,boxY+boxH/2]);
 for(let i=0;i<steps;i++){
  const dir=i%2?-1:1;
  const sx=(x1-x0)/steps;
  wave.push(['Q',x0+sx*i+sx/2,boxY+boxH/2+dir*amp*2,x0+sx*(i+1),boxY+boxH/2]);
 }
 els.push({t:'path',segs:wave,stroke:RULE,w:3,dash:'9,8',cap:'r'});
 els.push(...startDot(x0,boxY+boxH/2,6));
 els.push(starAt(x1,boxY+boxH/2,11));
 // items along the path
 const n=spec.items.length;
 spec.items.forEach((it,i)=>{
  const t=(i+0.5)/n;
  const x=x0+(x1-x0)*t;
  const seg=Math.min(steps-1,Math.floor(t*steps));
  const dir=seg%2?-1:1;
  const y=boxY+boxH/2+dir*amp;
  els.push(rrect(x-42,y-42,84,84,10,'#ffffff',INK,2.2));
  els.push(...place(ICONS[it.icon](),x,y-4,0.6));
 });
 els.push({t:'text',x:PW/2,y:boxY+boxH+18,s:spec.tip||`Start at the green dot. Circle every picture that starts with the "${spec.target}" sound on your way to the star.`,size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}

/* =========== 15. WORD FAMILY SORT =========== */
export function wordSortSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+4;
 els.push(...cutLine(MX+60,y,MX+CW-60));
 y+=14;
 // word cards to cut
 const items=shuffle(spec.words,(spec.slugHash||5)+17);
 const cardW=118,cardH=64,perRow=Math.floor(CW/(cardW+10));
 items.forEach((w,i)=>{
  const x=MX+(i%perRow)*(cardW+10)+cardW/2;
  const yy=y+Math.floor(i/perRow)*(cardH+10)+cardH/2;
  els.push(rrect(x-cardW/2+3,yy-cardH/2+3,cardW-6,cardH-6,8,'#ffffff',RULE,1.6));
  if(w.icon)els.push(...place(ICONS[w.icon](),x,yy-14,0.42));
  els.push({t:'text',x,y:yy+22,s:w.word,size:17,f:'b',color:INK,align:'c'});
 });
 y+=Math.ceil(items.length/perRow)*(cardH+10)+12;
 const binW=(CW-24)/2,binH=150;
 spec.families.forEach((f,i)=>{
  const x=MX+i*(binW+24);
  els.push(rrect(x,y,binW,binH,12,i===0?'#eef4e6':'#fdeeee',INK,2.4,'8,6'));
  els.push({t:'text',x:x+binW/2,y:y+34,s:f.label,size:16,f:'b',color:INK,align:'c'});
  els.push({t:'text',x:x+binW/2,y:y+54,s:f.hint,size:10,color:MUT,align:'c'});
 });
 y+=binH+18;
 els.push({t:'text',x:PW/2,y:y+4,s:spec.tip||'Cut the word cards, read each one aloud, and glue it under its word family. Then read both lists together!',size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}

/* =========== 16. SOUND SWITCH (change a sound) =========== */
export function soundSwapSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+8;
 spec.rows.forEach((r,i)=>{
  const bh=96;
  els.push(rrect(MX,y,CW,bh,10,i%2?'#f9f7f0':'#ffffff',RULE,1.5));
  els.push(...place(ICONS[r.from](),MX+52,y+bh/2-6,0.6));
  els.push({t:'text',x:MX+108,y:y+bh/2+8,s:r.fromWord,size:19,f:'b',color:INK});
  els.push({t:'text',x:MX+186,y:y+bh/2+6,s:'\u2192',size:22,f:'b',color:FAINT,align:'c'});
  els.push(...place(ICONS[r.to](),MX+228,y+bh/2-6,0.6));
  // write boxes for the new word
  const bx=MX+300;
  r.newWord.split('').forEach((ch,ci)=>{
   const x=bx+ci*48;
   const filled=ch!=='_';
   els.push(rrect(x+2,y+bh/2-24,44,48,6,'#ffffff',INK,2.2));
   if(filled)els.push({t:'text',x:x+24,y:y+bh/2+10,s:ch,size:24,f:'b',color:'#d8d2c2',align:'c'});
   else els.push(wline(x+6,y+bh/2+14,x+42,y+bh/2+14,RULE,1.3,'4,4'));
  });
  els.push({t:'text',x:PW-MX-14,y:y+bh/2+5,s:`${r.fromWord} \u2192 ${r.say}`,size:10.5,color:FAINT,align:'r'});
  y+=bh+10;
 });
 els.push({t:'text',x:PW/2,y:y+8,s:spec.tip||'Say the first word, swap the last sound, and write the brand-new word in the empty box.',size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}

/* =========== 17. DECORATE / FREE DESIGN =========== */
export function decorateSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 const artY=y0+6,artH=spec.artH||330;
 els.push(rrect(MX,artY,CW,artH,12,'#ffffff',RULE,1.6));
 els.push(...place(ICONS[spec.art](),PW/2,artY+artH/2,Math.min((CW-70)/120,(artH-60)/120)));
 let y=artY+artH+18;
 y=sectionLabel(els,MX,y,spec.taskTitle||'Now design your own.');
 const n=spec.frames||2,fh=Math.min(120,(PH-70-y)/n-12);
 for(let i=0;i<n;i++){
  if(y+fh>PH-70)break;
  els.push(rrect(MX,y,CW,fh,10,i%2?'#f9f7f0':'#ffffff',RULE,1.5));
  els.push(...startDot(MX+22,y+fh/2,4.5));
  els.push({t:'text',x:MX+40,y:y+fh/2+4,s:(spec.frameHints&&spec.frameHints[i])||'Your design here',size:10.5,color:FAINT});
  y+=fh+10;
 }
 els.push({t:'text',x:PW/2,y:y+6,s:spec.tip||'There is no wrong way to decorate. Patterns, spots, stripes \u2014 they are all good.',size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}

/* =========== 18. MAZE =========== */
export function mazeSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 const boxY=y0+6,boxH=spec.boxH||500;
 els.push(rrect(MX,boxY,CW,boxH,12,'#ffffff',RULE,1.6));
 // walls given in 0..1 normalized coords of the box
 spec.walls.forEach(w=>{
  const x1=MX+w[0]*CW,y1=boxY+w[1]*boxH,x2=MX+w[2]*CW,y2=boxY+w[3]*boxH;
  els.push(wline(x1,y1,x2,y2,INK,3.5));
 });
 const sx=MX+spec.start[0]*CW,sy=boxY+spec.start[1]*boxH;
 const gx=MX+spec.goal[0]*CW,gy=boxY+spec.goal[1]*boxH;
 els.push(...startDot(sx,sy,7));
 els.push(starAt(gx,gy,13));
 els.push({t:'text',x:sx,y:sy-14,s:'start',size:10,f:'b',color:'#4a9e4f',align:'c'});
 els.push({t:'text',x:gx,y:gy+26,s:'finish',size:10,f:'b',color:'#a9694e',align:'c'});
 els.push({t:'text',x:PW/2,y:boxY+boxH+18,s:spec.tip||'Find the path from the dot to the star without crossing any wall. Pencil first, finger to check!',size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}

/* =========== 19. DOT TO DOT =========== */
export function dotToDotSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 const boxY=y0+6,boxH=spec.boxH||470;
 els.push(rrect(MX,boxY,CW,boxH,12,'#ffffff',RULE,1.6));
 const dots=spec.dots; // [{x,y}] normalized 0..1
 dots.forEach((d,i)=>{
  const x=MX+d.x*CW,y=boxY+d.y*boxH;
  els.push(cir(x,y,9,'#ffffff',INK,2.2));
  els.push({t:'text',x,y:y+3.6,s:String(i+1),size:10,f:'b',color:INK,align:'c'});
 });
 els.push(...startDot(MX+dots[0].x*CW-2,boxY+dots[0].y*boxH-2,4));
 els.push({t:'text',x:PW/2,y:boxY+boxH+18,s:spec.tip||'Connect the dots in order, 1 to the end. Say each number out loud as you go!',size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}

/* =========== 20. SHAPE DETECTIVE (find & count in a scene) =========== */
export function findSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 const boxY=y0+6,boxH=spec.boxH||380;
 els.push(rrect(MX,boxY,CW,boxH,12,'#ffffff',RULE,1.6));
 const scene=spec.scene||Array.from({length:14},(_,i)=>spec.counts[i%spec.counts.length]);
 const placed=shuffle(scene,(spec.slugHash||3)+29);
 const perRow=Math.ceil(Math.sqrt(placed.length*CW/boxH));
 const rows=Math.ceil(placed.length/perRow);
 const cw=CW/perRow,ch=boxH/rows;
 placed.forEach((p,i)=>{
  const x=MX+(i%perRow)*cw+cw/2+(i%2?6:-6);
  const y=boxY+Math.floor(i/perRow)*ch+ch/2+(i%3===0?8:-8);
  els.push(...place(withColor(p.shape,p.color),x,y,Math.min(cw,ch)/135));
 });
 let y=boxY+boxH+18;
 y=sectionLabel(els,MX,y,'Count what the detective needs. Write each number.');
 const cs=spec.counts.slice(0,4);
 const bw2=(CW-((cs.length-1)*16))/cs.length;
 cs.forEach((c,i)=>{
  const x=MX+i*(bw2+16);
  els.push(rrect(x,y,bw2,86,10,'#ffffff',RULE,1.5));
  els.push(...place(withColor(c.shape,c.color),x+34,y+34,0.44));
  els.push(...writeBox(x+bw2-56,y+16,44,50));
 });
 footer(els);
 return els;
}

/* =========== 21. RAINBOW SEQUENCE (color in order) =========== */
export function sequenceSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 const boxY=y0+6,boxH=spec.boxH||330;
 els.push(rrect(MX,boxY,CW,boxH,12,'#ffffff',RULE,1.6));
 const cols=spec.colors; // ordered color names
 const n=cols.length;
 const maxR=Math.min((CW-40)/2,boxH-40);
 for(let i=0;i<n;i++){
  const r=maxR-(i*maxR*0.62/n);
  els.push({t:'path',segs:[['M',PW/2-r,boxY+boxH-24],['C',PW/2-r,boxY+boxH-24-r*1.35,PW/2+r,boxY+boxH-24-r*1.35,PW/2+r,boxY+boxH-24]],stroke:INK,w:2.6});
  els.push({t:'text',x:PW/2-r+2,y:boxY+boxH-40,s:String(i+1),size:12,f:'b',color:INK});
 }
 let y=boxY+boxH+16;
 y=sectionLabel(els,MX,y,'The color order \u2014 color each circle, then follow it up the rainbow.');
 const chW=(CW-30)/Math.min(n,4);
 cols.forEach((c,i)=>{
  const x=MX+(i%4)*chW+24,yy=y+Math.floor(i/4)*56+20;
  els.push(cir(x,yy,15,'#ffffff',INK,2.4));
  els.push({t:'text',x,y:yy+3.6,s:String(i+1),size:10.5,f:'b',color:FAINT,align:'c'});
  els.push({t:'text',x:x+24,y:yy+4.5,s:c,size:12.5,f:'b',color:INK});
 });
 footer(els);
 return els;
}

/* =========== 22. SOUND POSITION (first or last?) =========== */
export function positionSheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 let y=y0+8;
 spec.rows.forEach((row,i)=>{
  const bh=100;
  els.push(rrect(MX,y,CW,bh,10,i%2?'#f9f7f0':'#ffffff',RULE,1.5));
  els.push(...place(ICONS[row.icon](),MX+56,y+bh/2-6,0.64));
  els.push({t:'text',x:MX+104,y:y+bh/2+6,s:row.word,size:20,f:'b',color:INK});
  els.push({t:'text',x:MX+104,y:y+bh/2+26,s:row.hint,size:9.5,color:FAINT});
  const bx=PW-MX-190;
  ['first','last'].forEach((lab,k)=>{
   const x=bx+k*100;
   els.push(rrect(x,y+bh/2-30,84,60,8,'#ffffff',INK,2.2));
   els.push({t:'text',x:x+42,y:y+bh/2+40,s:lab,size:9.5,color:FAINT,align:'c'});
   els.push({t:'text',x:x+42,y:y+bh/2+8,s:lab==='first'?row.word[0]:row.word[row.word.length-1],size:24,f:'b',color:INK,align:'c'});
  });
  y+=bh+10;
 });
 els.push({t:'text',x:PW/2,y:y+8,s:spec.tip||'Say the word slowly. Do you hear the sound at the START of the word or at the END? Circle that box.',size:11,color:MUT,align:'c'});
 footer(els);
 return els;
}

/* =========== 26. STORY & LOGIC SHEETS (Classes 29–30) ===========
   The artwork IS the activity: the sheet prints the adventure illustration
   (title + instruction baked into the art), then a retell/draw panel and a
   grown-up answer line. Sheets stay usable on a black-and-white printer for
   every activity EXCEPT the few whose answers name a color — those keep the
   art in full color and the grown-up note says so. */
export function storySheet(spec){
 const els=[];
 const y0=header(els,spec.title,spec.instr);
 // illustration block
 const iw=CW, ih=Math.min(iw*spec.ar,470);
 els.push({t:'rect',x:MX-1,y:y0-1,w:iw+2,h:ih+2,rx:8,fill:'#ffffff',stroke:RULE,sw:1.4});
 els.push({t:'image',x:MX,y:y0,w:iw,h:ih,img:spec.imgIndex,href:spec.imgHref,ar:spec.ar});
 let y=y0+ih+18;
 // retell panel: what the child does on paper besides circling on the art
 const panelH=Math.max(120,Math.min(200,PH-64-y-(spec.answers?58:30)));
 els.push(...writePanel(els,sectionLabel(els,MX,y,spec.panelTitle),panelH,spec.panelHint));
 y+=panelH+26;
 // lines for early writers
 if(spec.lines){
  for(let i=0;i<2;i++){
   els.push(...startDot(MX+8,y,4));
   els.push(wline(MX+22,y+8,PW-MX,y+8,FAINT,1.1,'2,8'));
   y+=26;
  }
  y+=4;
 }
 if(spec.answers){
  const ay=PH-58;
  els.push(wline(MX,ay-12,PW-MX,ay-12,RULE,1.2));
  els.push({t:'text',x:MX,y:ay,s:'For grown-ups',size:10,f:'b',color:INK});
  const asz=Math.min(10,(CW-20)/(textWidth(spec.answers,10)/10));
  els.push({t:'text',x:MX,y:ay+15,s:spec.answers,size:asz,color:MUT});
 }
 footer(els,'kiddo.school · free printable story & logic worksheet · plays online with its matching game');
 return els;
}
function writePanel(els,y,h,hint){
 els.push(rrect(MX,y,CW,h,12,'#ffffff',RULE,1.5));
 els.push({t:'text',x:MX+16,y:y+24,s:hint,size:11,color:MUT});
 return [];
}
