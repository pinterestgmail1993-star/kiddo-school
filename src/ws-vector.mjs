// Kiddo School — worksheet vector core.
// One intermediate "layout" (a list of primitives in A4 points) feeds TWO
// backends: an exact SVG preview (embedded on the worksheet page and used by
// the browser Print button) and a real PDF file (the Download button). Same
// numbers, same fonts (Helvetica in the PDF, metric-identical Arial in the
// SVG), so what a family sees on screen is what lands on paper.
//
// A layout element is one of:
//   {t:'path',  segs, stroke, fill, w, dash, cap:'r'|'b', join:'r'}   segs: M/L/C/Q/Z
//   {t:'text',  x, y, s, size, f:'r'|'b', color, align:'l'|'c'|'r', ls}
//   {t:'circle',cx, cy, r, stroke, fill, w, dash}
//   {t:'ellipse',cx, cy, rx, ry, stroke, fill, w, dash}
//   {t:'rect',  x, y, w, h, rx, stroke, fill, w, dash}
// Colors are hex strings ('#e04b3f') or null (no paint).

/* ---------- tiny path DSL ---------- */
export const M=(x,y)=>['M',x,y], L=(x,y)=>['L',x,y];
export const C=(a,b,c,d,e,f)=>['C',a,b,c,d,e,f], Q=(a,b,c,d)=>['Q',a,b,c,d], Z=['Z'];

// circle as 4 cubic beziers (kappa), centered
const K=0.5522847498;
export function circleSegs(cx,cy,r){
 return [M(cx-r,cy),
  C(cx-r,cy-r*K,cx-r*K,cy-r,cx,cy-r),
  C(cx+r*K,cy-r,cx+r,cy-r*K,cx+r,cy),
  C(cx+r,cy+r*K,cx+r*K,cy+r,cx,cy+r),
  C(cx-r*K,cy+r,cx-r,cy+r*K,cx-r,cy),Z];
}
export const ellipseSegs=(cx,cy,rx,ry)=>circleSegs(cx,cy,1).map(s=>{
 if(s[0]==='M'||s[0]==='L'||s[0]==='C'||s[0]==='Q'){const o=[s[0]];for(let i=1;i<s.length;i+=2){o.push(cx+s[i]*rx,cy+s[i+1]*ry);}return o;}
 return s;});
export function rrectSegs(x,y,w,h,r){
 r=Math.min(r,w/2,h/2);const k=r*K;
 return [M(x+r,y),L(x+w-r,y),C(x+w-r+k,y,x+w,y+r-k,x+w,y+r),L(x+w,y+h-r),C(x+w,y+h-r+k,x+w-r+k,y+h,x+w-r,y+h),
  L(x+r,y+h),C(x+r-k,y+h,x,y+h-r+k,x,y+h-r),L(x,y+r),C(x,y+r-k,x+r-k,y,x+r,y),Z];
}
export const lineSegs=(x1,y1,x2,y2)=>[M(x1,y1),L(x2,y2)];

/* SVG path-data parser for the subset the adventure guides use
   (M L H V C S Q T A a Z, absolute + relative). Arcs expand to cubics. */
export function fromSVG(d){
 const segs=[];const num=/-?\d*\.?\d+(?:e[-+]?\d+)?/gi;
 let cur=null,has=new Map();let i=0;
 const toks=d.match(/[MmLlHvVcCsSqQtTaAzZ]|-?\d*\.?\d+(?:e[-+]?\d+)?/g)||[];
 const nx=()=>parseFloat(toks[i++]);
 while(i<toks.length){
  const t=toks[i++];
  if(/[MmLlHvVcCsSqQtTaAzZ]/.test(t)){
   const rel=t===t.toLowerCase();const T=t.toUpperCase();
   if(T==='Z'){segs.push(['Z']);continue;}
   const args={M:2,L:2,H:1,V:1,C:6,S:4,Q:4,T:2,A:7}[T];
   const draw=(cmd,vals)=>{
    if(cmd==='M'){cur=rel?[cur[0]+vals[0],cur[1]+vals[1]]:[vals[0],vals[1]];segs.push(M(cur[0],cur[1]));has.set('start',cur.slice());}
    else if(cmd==='L'){const p=rel?[cur[0]+vals[0],cur[1]+vals[1]]:[vals[0],vals[1]];segs.push(L(p[0],p[1]));cur=p;}
    else if(cmd==='H'){const x=rel?cur[0]+vals[0]:vals[0];segs.push(L(x,cur[1]));cur=[x,cur[1]];}
    else if(cmd==='V'){const y=rel?cur[1]+vals[0]:vals[0];segs.push(L(cur[0],y));cur=[cur[0],y];}
    else if(cmd==='C'){let p=vals;if(rel)p=[cur[0]+vals[0],cur[1]+vals[1],cur[0]+vals[2],cur[1]+vals[3],cur[0]+vals[4],cur[1]+vals[5]];segs.push(C(...p));cur=[p[4],p[5]];}
    else if(cmd==='S'){const last=segs[segs.length-1];let c1=cur.slice();if(last&&last[0]==='C')c1=[2*cur[0]-last[3],2*cur[1]-last[4]];const p=rel?[cur[0]+vals[0],cur[1]+vals[1],cur[0]+vals[2],cur[1]+vals[3]]:[vals[0],vals[1],vals[2],vals[3]];segs.push(C(c1[0],c1[1],p[0],p[1],p[2],p[3]));cur=[p[2],p[3]];}
    else if(cmd==='Q'){const p=rel?[cur[0]+vals[0],cur[1]+vals[1],cur[0]+vals[2],cur[1]+vals[3]]:[vals[0],vals[1],vals[2],vals[3]];segs.push(Q(p[0],p[1],p[2],p[3]));cur=[p[2],p[3]];}
    else if(cmd==='T'){const last=segs[segs.length-1];let c=cur.slice();if(last&&last[0]==='Q')c=[2*cur[0]-last[1],2*cur[1]-last[2]];const p=rel?[cur[0]+vals[0],cur[1]+vals[1]]:vals.slice(0,2);segs.push(Q(c[0],c[1],p[0],p[1]));cur=p;}
    else if(cmd==='A'){
     let p=rel?[cur[0]+vals[5],cur[1]+vals[6]]:[vals[5],vals[6]];
     arcToCubic(cur[0],cur[1],vals[0],vals[1],vals[2],vals[3],vals[4],p[0],p[1],segs);cur=p;}
   };
   let buf=[];
   while(i<toks.length&&/^-?\d|^\./.test(toks[i])&&buf.length<args){buf.push(nx());if(buf.length===args){draw(T==='A'?'A':T,buf);buf=[];if(T!=='A'&&i<toks.length&&/^-?\d|^\./.test(toks[i])){/*implicit repeat*/while(i<toks.length&&/^-?\d|^\./.test(toks[i])){const b=[];for(let k=0;k<args;k++)b.push(nx());draw(T,b);}}}}
   if(buf.length===args)draw(T,buf);
   has.set('pos',cur.slice());
  }
 }
 return segs;
}
function arcToCubic(x1,y1,rx,ry,phiDeg,laf,sf,x2,y2,out){
 if(rx===0||ry===0){out.push(L(x2,y2));return;}
 const phi=phiDeg*Math.PI/180,cosP=Math.cos(phi),sinP=Math.sin(phi);
 let dx=(x1-x2)/2,dy=(y1-y2)/2;
 const x1p=cosP*dx+sinP*dy,y1p=-sinP*dx+cosP*dy;
 let rxq=Math.abs(rx),ryq=Math.abs(ry);
 const lam=x1p*x1p/(rxq*rxq)+y1p*y1p/(ryq*ryq);
 if(lam>1){const s=Math.sqrt(lam);rxq*=s;ryq*=s;}
 const sign=(laf!==sf)?1:-1;
 const num=rxq*rxq*ryq*ryq-rxq*rxq*y1p*y1p-ryq*ryq*x1p*x1p;
 const den=rxq*rxq*y1p*y1p+ryq*ryq*x1p*x1p;
 const co=sign*Math.sqrt(Math.max(0,num/den));
 const cxp=co*rxq*y1p/ryq,cyp=-co*ryq*x1p/rxq;
 const cx=cosP*cxp-sinP*cyp+(x1+x2)/2,cy=sinP*cxp+cosP*cyp+(y1+y2)/2;
 const ang=(ux,uy,vx,vy)=>{const d=Math.sqrt(ux*ux+uy*uy)*Math.sqrt(vx*vx+vy*vy);let c=(ux*vx+uy*vy)/d; c=Math.max(-1,Math.min(1,c));let a=Math.acos(c);if(ux*vy-uy*vx<0)a=-a;return a;};
 const th1=ang(1,0,(x1p-cxp)/rxq,(y1p-cyp)/ryq);
 let dth=ang((x1p-cxp)/rxq,(y1p-cyp)/ryq,(-x1p-cxp)/rxq,(-y1p-cyp)/ryq);
 if(!sf&&dth>0)dth-=2*Math.PI;if(sf&&dth<0)dth+=2*Math.PI;
 const n=Math.ceil(Math.abs(dth)/(Math.PI/2));
 const delta=dth/n;const t=(4/3)*Math.tan(delta/4);
 let th=th1;
 for(let k=0;k<n;k++){
  const c1=Math.cos(th),s1=Math.sin(th);th+=delta;
  const c2=Math.cos(th),s2=Math.sin(th);
  const tf=(px,py,c,s)=>[cosP*rxq*c-sinP*ryq*s+cx,sinP*rxq*c+cosP*ryq*s+cy].map((v,i)=>i? v : v);
  const e1=tf(0,0,c1,s1),e2=tf(0,0,c2,s2);
  const d1x=-t*rxq*s1,d1y=t*ryq*c1,d2x=t*rxq*s2,d2y=-t*ryq*c2;
  const r1=[e1[0]+cosP*d1x-sinP*d1y,e1[1]+sinP*d1x+cosP*d1y];
  const r2=[e2[0]+cosP*d2x-sinP*d2y,e2[1]+sinP*d2x+cosP*d2y];
  out.push(C(r1[0],r1[1],r2[0],r2[1],e2[0],e2[1]));
 }
}

/* ---------- Helvetica metrics (AFM widths, /1000) ----------
   Arial is metrically identical, so the SVG preview centers text the same
   way the PDF does. */
const WR={' ':278,'!':278,'"':355,'#':556,'$':556,'%':889,'&':667,"'":191,'(':333,')':333,'*':389,'+':584,',':278,'-':333,'.':278,'/':278,'0':556,'1':556,'2':556,'3':556,'4':556,'5':556,'6':556,'7':556,'8':556,'9':556,':':278,';':278,'<':584,'=':584,'>':584,'?':556,'@':1015,'A':667,'B':667,'C':722,'D':722,'E':667,'F':611,'G':778,'H':722,'I':278,'J':500,'K':667,'L':556,'M':833,'N':722,'O':778,'P':667,'Q':778,'R':722,'S':667,'T':611,'U':722,'V':667,'W':944,'X':667,'Y':667,'Z':611,'[':278,'\\':278,']':278,'^':469,'_':556,'`':333,'a':556,'b':556,'c':500,'d':556,'e':556,'f':278,'g':556,'h':556,'i':222,'j':222,'k':500,'l':222,'m':833,'n':556,'o':556,'p':556,'q':556,'r':333,'s':500,'t':278,'u':556,'v':500,'w':722,'x':500,'y':500,'z':500,'{':334,'|':260,'}':334,'~':584,'\u2019':222,'\u2018':222,'\u201c':333,'\u201d':333,'\u2013':556,'\u2014':1000,'\u00b7':278,'\u00e9':556};
const WB={' ':278,'!':333,'"':474,'#':556,'$':556,'%':889,'&':722,"'":238,'(':333,')':333,'*':389,'+':584,',':278,'-':333,'.':278,'/':278,'0':556,'1':556,'2':556,'3':556,'4':556,'5':556,'6':556,'7':556,'8':556,'9':556,':':333,';':333,'<':584,'=':584,'>':584,'?':611,'@':975,'A':722,'B':722,'C':722,'D':722,'E':667,'F':611,'G':778,'H':722,'I':278,'J':556,'K':722,'L':611,'M':833,'N':722,'O':778,'P':667,'Q':778,'R':722,'S':667,'T':611,'U':722,'V':667,'W':944,'X':667,'Y':667,'Z':611,'[':333,'\\':278,']':333,'^':584,'_':556,'`':333,'a':556,'b':611,'c':556,'d':611,'e':556,'f':333,'g':611,'h':611,'i':278,'j':278,'k':556,'l':278,'m':889,'n':611,'o':611,'p':611,'q':611,'r':389,'s':556,'t':333,'u':611,'v':556,'w':778,'x':556,'y':556,'z':500,'{':389,'|':280,'}':389,'~':584,'\u2019':278,'\u2018':278,'\u201c':500,'\u201d':500,'\u2013':556,'\u2014':1000,'\u00b7':278,'\u00e9':556};
export function textWidth(s,size,f){
 const tab=f==='b'?WB:WR;let w=0;
 for(const ch of String(s))w+=(tab[ch]!==undefined?tab[ch]:556);
 return w*size/1000;
}

/* ---------- SVG backend ---------- */
const hx=c=>c||'none';
/* serialize one primitive (the same shapes layoutToSVG emits) */
export function elToSVG(el){
 if(el.t==='path'){
  let d='';
  for(const s of el.segs){
   if(s[0]==='Z'){d+='Z';continue;}
   d+=s[0];
   for(let i=1;i<s.length;i++)d+=(i>1?',':'')+r2(s[i]);
  }
  return `<path d="${d}" fill="${hx(el.fill)}" stroke="${hx(el.stroke)}"${el.stroke?` stroke-width="${el.w||2}"`:''}${el.dash?` stroke-dasharray="${el.dash}"`:''} stroke-linecap="${el.cap||'r'}" stroke-linejoin="${el.join||'r'}"/>`;
 }
 if(el.t==='text')return `<text x="${r2(el.x)}" y="${r2(el.y)}" font-family="Arial,Helvetica,sans-serif" font-size="${el.size}" ${el.f==='b'?'font-weight="bold"':''} fill="${hx(el.color||'#343b30')}" text-anchor="${el.align==='c'?'middle':el.align==='r'?'end':'start'}"${el.ls?` letter-spacing="${el.ls}"`:''}>${esc(el.s)}</text>`;
 if(el.t==='circle')return `<circle cx="${r2(el.cx)}" cy="${r2(el.cy)}" r="${r2(el.r)}" fill="${hx(el.fill)}" stroke="${hx(el.stroke)}"${el.stroke?` stroke-width="${el.w||2}"`:''}${el.dash?` stroke-dasharray="${el.dash}"`:''}/>`;
 if(el.t==='ellipse')return `<ellipse cx="${r2(el.cx)}" cy="${r2(el.cy)}" rx="${r2(el.rx)}" ry="${r2(el.ry)}" fill="${hx(el.fill)}" stroke="${hx(el.stroke)}"${el.stroke?` stroke-width="${el.w||2}"`:''}${el.dash?` stroke-dasharray="${el.dash}"`:''}/>`;
 if(el.t==='rect')return `<rect x="${r2(el.x)}" y="${r2(el.y)}" width="${r2(el.w)}" height="${r2(el.h)}"${el.rx?` rx="${el.rx}"`:''} fill="${hx(el.fill)}" stroke="${hx(el.stroke)}"${el.stroke?` stroke-width="${el.sw||2}"`:''}${el.dash?` stroke-dasharray="${el.dash}"`:''}/>`;
 return '';
}
export function layoutToSVG(els,W,H,opts={}){
 const parts=[`<svg ${opts.attrs||''} viewBox="0 0 ${W} ${H}" width="100%" style="display:block;background:#ffffff" role="img" aria-label="${opts.label||'Printable worksheet'}">`];
 for(const el of els)parts.push(elToSVG(el));
 parts.push('</svg>');
 return parts.join('');
}
const r2=n=>Math.round(n*100)/100;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
