// Kiddo School — Story & Logic Adventure kit (Classes 29 & 30).
// Shared helpers for the two artwork-driven adventure collections:
// the games show the real adventure artwork and play with picture cards
// that are sprite-cropped straight out of it (CSS background cropping).
// Server renders full boards; story-adventures.js wires the real play.
import {R2} from './adventure-kit.mjs';

export const READING_BASE=R2+'school/reading/adventures/';
export const LOGIC_BASE=R2+'school/logic/adventures/';
export const SCIENCE_BASE=R2+'school/science/adventures/';
export const READING_LIB_PATH='/preschool/reading/adventures/';
export const READING_LIB=READING_LIB_PATH;
export const LOGIC_LIB_PATH='/preschool/logic/adventures/';
export const LOGIC_LIB=LOGIC_LIB_PATH;
export const SCIENCE_LIB_PATH='/preschool/science/adventures/';
export const SCIENCE_LIB=SCIENCE_LIB_PATH;
export const C29_PATH='/preschool/4-years/storytime-and-pre-reading/';
export const C30_PATH='/preschool/4-years/logic-thinking-and-problem-solving/';
export const C31_PATH='/preschool/4-years/science-nature-and-discovery/';
export const WS29_PATH='/worksheets/reading/';
export const WS30_PATH='/worksheets/logic/';
export const WS31_PATH='/worksheets/science/';

/* crop boxes are [x0,y0,x1,y1] in percent of the artwork — helpers turn them
   into the CSS background geometry that shows exactly that slice of the art */
export function cropStyle(c,W,H){
 const x=c[0]/100*W, y=c[1]/100*H, w=(c[2]-c[0])/100*W, h=(c[3]-c[1])/100*H;
 const bsx=W/w*100, bsy=H/h*100;
 const px=w>=W?0:x/(W-w)*100, py=h>=H?0:y/(H-h)*100;
 return `--bsx:${bsx.toFixed(3)}%;--bsy:${bsy.toFixed(3)}%;--bpx:${px.toFixed(3)}%;--bpy:${py.toFixed(3)}%;--ar:${(w/h).toFixed(4)}`;
}
/* a picture card cropped out of the artwork (engine wires taps) */
export function card(img,W,H,c,label,{ok,seq,pair,group,bad,bin,say,cls=''}={}){
 const d=[
  `data-st-card="${escAttr(label)}"`,
  ok!==undefined?`data-st-ok="${ok?1:0}"`:null,
  seq!==undefined?`data-st-seq="${seq}"`:null,
  pair?`data-st-pair="${pair}"`:null,
  group?`data-st-group="${group}"`:null,
  bad?`data-st-bad="1"`:null,
  bin?`data-st-bin="${escAttr(bin)}"`:null,
  say?`data-st-say="${escAttr(say)}"`:null
 ].filter(Boolean).join(' ');
 return `<button type="button" class="st-card ${cls}" ${d} aria-label="${escAttr(label)}"><span class="st-card-img" style="--st-src:url('${escAttr(img)}');${cropStyle(c,W,H)}" aria-hidden="true"></span><span class="st-badge" hidden aria-hidden="true"></span></button>`;
}
/* a non-interactive context slice of the artwork (the row to solve) */
export function ctxImg(img,W,H,c,label){
 return `<span class="st-ctx" role="img" aria-label="${escAttr(label)}"><span class="st-card-img" style="--st-src:url('${escAttr(img)}');${cropStyle(c,W,H)}" aria-hidden="true"></span></span>`;
}
export const escAttr=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* JSON config for the engine, attribute-safe */
export const cfgAttr=cfg=>JSON.stringify(cfg).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');

/* the game board shell: prompts, trays, progress, feedback, celebration */
export function board(base,game,W,H){
 const steps=game.steps.map((s,i)=>{
  const parts=[];
  if(s.ctx)parts.push(`<div class="st-ctxrow">${ctxImg(base+game.img,W,H,s.ctx,s.ctxLabel||s.ask)}</div>`);
  parts.push(`<p class="st-ask">${escHtml(s.ask)}</p>`);
  if(s.type==='find'){
   /* spot-the-difference: two scenes from the same artwork; hots are
      [x0,y0,x1,y1] in percent OF THE SECOND SCENE crop — the engine turns
      taps into found rings and counts them up */
   const hots=(s.hots||[]).map((h,j)=>`<button type="button" class="st-hot" data-st-say="${escAttr(h.say||'')}" aria-label="Difference ${j+1} of ${(s.hots||[]).length}" style="--hx:${h.c[0]}%;--hy:${h.c[1]}%;--hw:${(h.c[2]-h.c[0]).toFixed(2)}%;--hh:${(h.c[3]-h.c[1]).toFixed(2)}%"><span class="st-ring" aria-hidden="true"></span></button>`).join('');
   parts.push(`<div class="st-finds"><figure class="st-scene"><span class="st-scene-img" style="--st-src:url('${escAttr(base+game.img)}');${cropStyle(s.scenes[0],W,H)}" aria-hidden="true"></span><figcaption>Picture 1</figcaption></figure><figure class="st-scene"><span class="st-scene-img" style="--st-src:url('${escAttr(base+game.img)}');${cropStyle(s.scenes[1],W,H)}" aria-hidden="true">${hots}</span><figcaption>Picture 2 — find what is different</figcaption></figure></div><p class="st-findcount" data-st-findcount aria-live="polite">0 of ${(s.hots||[]).length} found</p>`);
  }else if(s.type==='multi'){
   /* tap every picture that belongs (insects, ocean animals, living things…) */
   const groups={};
   for(const c of s.cards||[]){(groups[c.group||'all']=groups[c.group||'all']||[]).push(card(base+game.img,W,H,c.crop,c.label,c));}
   const oks=(s.cards||[]).filter(c=>c.ok).length;
   parts.push('<div class="st-tray">'+(groups.all||[]).join('')+'</div><p class="st-findcount" data-st-multicount aria-live="polite">0 of '+oks+' found</p>');
  }else if(s.type==='sort'){
   /* tap a picture, then the bin where it belongs (sink/float, magnets, recycling) */
   const cards=(s.cards||[]).map(c=>card(base+game.img,W,H,c.crop,c.label,c)).join('');
   const bins=(s.bins||[]).map(b=>`<button type="button" class="st-bin" data-st-accept="${escAttr(b.key)}" aria-label="Bin: ${escAttr(b.label)}"><span class="st-bin-img" style="--st-src:url('${escAttr(base+game.img)}');${cropStyle(b.crop,W,H)}" aria-hidden="true"></span><span class="st-bin-label">${escHtml(b.label)}</span></button>`).join('');
   parts.push('<div class="st-tray st-sorttray">'+cards+'</div><div class="st-bins">'+bins+'</div>');
  }else{
   const groups={};
   for(const c of s.cards||[]){(groups[c.group||'all']=groups[c.group||'all']||[]).push(card(base+game.img,W,H,c.crop,c.label,c));}
   if(s.type==='match'){
    parts.push('<div class="st-trays"><div class="st-tray">'+groups.a.join('')+'</div><div class="st-tray">'+groups.b.join('')+'</div></div>');
   }else{
    parts.push('<div class="st-tray">'+(groups.all||[]).join('')+'</div>');
   }
  }
  return `<div class="st-step" data-st-step="${i}" data-st-type="${s.type}"${s.shuffle?' data-st-shuffle="1"':''} hidden>${parts.join('')}</div>`;
 }).join('');
 const maze=game.maze||null;
 return `<div class="sa-board st-board" data-st-board data-st-band="${game.band}" data-st-game="${game.slug}" data-st-config="${cfgAttr({slug:game.slug,band:game.band,speak:game.steps.map(s=>s.say||s.ask)})}">
  <div class="ph-audio-bar"><button type="button" class="tool-btn" data-st-mute aria-pressed="false">Sound: on</button><button type="button" class="tool-btn" data-st-replay>Listen again</button><span class="ph-progress" data-st-progress aria-live="polite"></span></div>
  <div class="st-steps">${steps}</div>
  ${maze?mazeSVG(maze):''}
  <div class="st-controls"><p class="st-hint" data-st-hint aria-live="polite"></p><button type="button" class="button button-ghost" data-st-restart hidden>Start over</button></div>
  <div class="sa-cheer" data-sa-cheer hidden><p class="sa-cheer-title">${escHtml(game.doneTitle)}</p><p class="sa-cheer-sub">${escHtml(game.doneSub)}</p></div>
 </div>`;
}
function escHtml(s){return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));}

/* the Squirrel's Acorn Maze board (artwork 04 uses its own vector maze so a
   finger, stylus or mouse can really trace it — walls verified solvable) */
export function mazeSVG(m){
 const {cols,rows,cell,walls}=m;
 const W=cols*cell,H=rows*cell;
 const lines=walls.map(w=>{
  const [c,r,side]=w;
  if(side==='N')return `M${c*cell},${r*cell} L${(c+1)*cell},${r*cell}`;
  if(side==='S')return `M${c*cell},${(r+1)*cell} L${(c+1)*cell},${(r+1)*cell}`;
  if(side==='W')return `M${c*cell},${r*cell} L${c*cell},${(r+1)*cell}`;
  return `M${(c+1)*cell},${r*cell} L${(c+1)*cell},${(r+1)*cell}`;
 }).join(' ');
 return `<svg class="lz-svg" viewBox="-20 -20 ${W+40} ${H+40}" role="img" aria-label="${escAttr(m.alt)}" data-st-maze
   data-maze-start="${m.start.join(',')}" data-maze-goal="${m.goal.join(',')}" data-maze-cell="${cell}" data-maze-cols="${cols}" data-maze-rows="${rows}">
  <rect x="0" y="0" width="${W}" height="${H}" rx="18" fill="#eaf6f9"/>
  <path d="${lines}" fill="none" stroke="#2e9bb5" stroke-width="9" stroke-linecap="round"/>
  <path class="lz-trail" fill="none" stroke="#f2913d" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
  <g class="lz-marker" transform="translate(${m.start[0]*cell+cell/2},${m.start[1]*cell+cell/2})"><circle r="15" fill="#f2913d" stroke="#fff" stroke-width="4"/></g>
  <g transform="translate(${m.goal[0]*cell+cell/2},${m.goal[1]*cell+cell/2})"><circle r="20" fill="#f5c531" stroke="#a9744f" stroke-width="5"/><circle r="9" fill="#a9744f"/></g>
  <text x="${W/2}" y="${H+16}" text-anchor="middle" font-size="17" fill="#626456" font-family="Arial,Helvetica,sans-serif">Draw with your finger from the squirrel to the golden acorn.</text>
 </svg>`;
}
