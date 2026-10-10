// Kiddo School — renders the static tracing guide SVG for one letter case.
// Used at build time (the letter pages ship this markup so the guide is
// readable and printable without JavaScript) and by the verification script.
// /assets/letter-tracing.js reads the same layout from the page's JSON mount
// and upgrades the static guide into a step-by-step tracing player.
import {TRACINGS,TRACING_GRID} from './tracing-strokes.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// First-segment writing direction of a stroke path: the vector from the
// start point to the next control/endpoint of the path.
function strokeMeta(d){
 const m=d.match(/^M\s*([\d.]+)\s+([\d.]+)\s*([LC])\s*([\d.]+)\s+([\d.]+)/);
 if(!m)throw Error('tracing: unparseable stroke path: '+d);
 const x=+m[1],y=+m[2],nx=+m[4],ny=+m[5];
 const len=Math.hypot(nx-x,ny-y)||1;
 return {sx:x,sy:y,dx:(nx-x)/len,dy:(ny-y)/len};
}

/* Layout for one letter case: every stroke with its path, its numbered-circle
   position and its direction arrow. Number circles sit on the stroke's start
   point; when two strokes share (or nearly share) a start point, the later
   circle slides along the line between the two starts so both stay readable
   — the same convention tracing worksheets use. */
export function strokeLayout(letter,which){
 const t=TRACINGS[letter][which];
 const metas=t.strokes.map(strokeMeta);
 const numPos=metas.map(()=>null);
 metas.forEach((s,i)=>{
  let px=s.sx,py=s.sy;
  for(let j=0;j<i;j++){
   const d=Math.hypot(px-metas[j].sx,py-metas[j].sy);
   if(d<19){
    if(d<0.5){px=s.sx+18;py=s.sy-8;}
    else{px=s.sx+(s.sx-metas[j].sx)/d*20;py=s.sy+(s.sy-metas[j].sy)/d*20;}
   }
  }
  numPos[i]={x:+px.toFixed(1),y:+py.toFixed(1)};
 });
 return t.strokes.map((d,i)=>{
  const s=metas[i];
  const r=TRACING_GRID;
  // short direction arrow just ahead of the start point (long arrows fly
  // off curved strokes and read as wrong) — drawn as a solid triangle so no
  // SVG marker ids are needed and every guide stays self-contained
  const x1=s.sx+s.dx*13,y1=s.sy+s.dy*13,x2=s.sx+s.dx*30,y2=s.sy+s.dy*30;
  const px=-s.dy,py=s.dx;
  const tri=[[x2,y2],[x2-s.dx*8+px*4.5,y2-s.dy*8+py*4.5],[x2-s.dx*8-px*4.5,y2-s.dy*8-py*4.5]]
   .map(([qx,qy])=>qx.toFixed(1)+','+qy.toFixed(1)).join(' ');
  return {d,sx:s.sx,sy:s.sy,nx:numPos[i].x,ny:numPos[i].y,
   ax1:+x1.toFixed(1),ay1:+y1.toFixed(1),ax2:+x2.toFixed(1),ay2:+y2.toFixed(1),ap:tri};
 });
}

export function tracingLayout(letter,which){
 const t=TRACINGS[letter][which];
 return {help:t.help,strokes:strokeLayout(letter,which),w:TRACING_GRID.w,h:TRACING_GRID.h};
}

export function tracingSvg(letter,which,upper){
 const layout=tracingLayout(letter,which);
 const whichLabel=which==='up'?'uppercase':'lowercase';
 const label=`Tracing guide: ${whichLabel} ${which==='up'?upper:letter}, ${layout.strokes.length} stroke${layout.strokes.length>1?'s':''}, numbered in writing order`;
 return `<svg class="at-svg" viewBox="0 0 ${TRACING_GRID.w} ${TRACING_GRID.h}" role="img" aria-label="${esc(label)}" data-at-svg data-at-letter="${esc(letter)}" data-at-case="${which}">
  <g class="at-guides" aria-hidden="true">
   <line x1="8" x2="${TRACING_GRID.w-8}" y1="${which==='up'?TRACING_GRID.capTop:TRACING_GRID.xTop}" y2="${which==='up'?TRACING_GRID.capTop:TRACING_GRID.xTop}"/>
   <line x1="8" x2="${TRACING_GRID.w-8}" y1="${TRACING_GRID.baseline}" y2="${TRACING_GRID.baseline}"/>
  </g>
  <g class="at-strokes" aria-hidden="true">
   ${layout.strokes.map((s,i)=>`<path class="at-guide" data-at-guide="${i}" d="${s.d}"/>`).join('')}
  </g>
  <g class="at-marks" aria-hidden="true">
   ${layout.strokes.map(s=>`<line class="at-arrowline" x1="${s.ax1}" y1="${s.ay1}" x2="${s.ax2}" y2="${s.ay2}"/><polygon class="at-arrow" points="${s.ap}"/>`).join('')}
   ${layout.strokes.map((s,i)=>`<circle class="at-num" cx="${s.nx}" cy="${s.ny}" r="11"/><text class="at-numtext" x="${s.nx}" y="${s.ny+4.5}" text-anchor="middle">${i+1}</text>`).join('')}
  </g>
 </svg>`;
}
