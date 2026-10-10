// Kiddo School — Adventure Kit: shared palette, SVG shape snippets,
// backdrop painters and small markup helpers for the Shape Adventures
// (Class 25) and Colors & Creativity (Class 26) collections.
// Everything here is pure string generation: the boards are server-rendered
// SVG that works as a picture without JavaScript, and the engine scripts
// (shape-adventures.js / color-creativity.js) attach the real play on top.

export const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
export const SHAPE_BASE=R2+'school/maths/adventures/';
export const COLOR_BASE=R2+'school/colors/adventures/';

/* The school palette, matched to the Canva artwork. */
export const C={
 red:'#e04b3f',orange:'#f07f28',yellow:'#f5c531',green:'#4a9e4f',teal:'#3fb8af',
 blue:'#5aa7d6',deep:'#3d7fc4',purple:'#8f4fc0',pink:'#f28ab5',plum:'#e0568c',
 brown:'#a9744f',cream:'#fff7ea',sky:'#cfe9f7',ink:'#3a3350',white:'#ffffff',
 night:'#4a4272',sand:'#f7e3c3',leaf:'#7cc47f'
};

export const SHAPE_COLORS={
 circle:C.red,square:C.blue,triangle:C.yellow,rectangle:C.green,oval:C.pink,
 diamond:C.purple,star:C.orange,heart:C.plum,hexagon:C.teal,arch:C.pink
};

/* Outline style so colored fills keep their black-ish outlines (colouring feel). */
const OUT='stroke="#3a3350" stroke-width="5" stroke-linejoin="round"';

/* Centered-at-0,0 shape snippets, unit ≈ 100px. fill is injected. */
export function shapeSVG(shape,fill,extra=''){
 const f=`fill="${fill||'#ffffff'}" ${OUT}`;
 switch(shape){
  case 'circle': return `<circle r="46" ${f} ${extra}/>`;
  case 'square': return `<rect x="-42" y="-42" width="84" height="84" rx="12" ${f} ${extra}/>`;
  case 'triangle': return `<path d="M0,-50 L52,42 L-52,42 Z" ${f} ${extra}/>`;
  case 'rectangle': return `<rect x="-58" y="-40" width="116" height="80" rx="12" ${f} ${extra}/>`;
  case 'oval': return `<ellipse rx="54" ry="38" ${f} ${extra}/>`;
  case 'diamond': return `<path d="M0,-52 L46,0 L0,52 L-46,0 Z" ${f} ${extra}/>`;
  case 'star': return `<path d="M0,-52 L14,-16 L52,-14 L23,10 L33,47 L0,26 L-33,47 L-23,10 L-52,-14 L-14,-16 Z" ${f} ${extra}/>`;
  case 'heart': return `<path d="M0,44 C-40,16 -52,-8 -40,-28 C-30,-44 -8,-42 0,-26 C8,-42 30,-44 40,-28 C52,-8 40,16 0,44 Z" ${f} ${extra}/>`;
  case 'hexagon': return `<path d="M44,-26 L44,26 L0,52 L-44,26 L-44,-26 L0,-52 Z" ${f} ${extra}/>`;
  case 'arch': return `<path d="M-42,44 L-42,-6 C-42,-42 42,-42 42,-6 L42,44 Z" ${f} ${extra}/>`;
  case 'moon': return `<path d="M8,-48 A50,50 0 1 0 8,48 A38,38 0 1 1 8,-48 Z" ${f} ${extra}/>`;
 }
 return `<circle r="46" ${f}/>`;
}

/* A tray piece as an accessible button (the engine wires taps + drags). */
export function piece(shape,color,label,size=76){
 return `<button type="button" class="sa-piece" data-sa-piece="${shape}" data-piece-color="${color}" aria-label="${label}" style="--pc:${color};--ps:${size}px" draggable="false"><svg viewBox="-60 -60 120 120" aria-hidden="true" focusable="false">${shapeSVG(shape,color)}</svg></button>`;
}

/* ---------- backdrop painters (viewBox 900×560) ---------- */

let gradSeq=0;
function wash(top,bottom){
 gradSeq++;
 return `<defs><linearGradient id="gb${gradSeq}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect x="0" y="0" width="900" height="560" fill="url(#gb${gradSeq})"/>`;
}

export function backdrop(kind){
 switch(kind){
  case 'space': return wash(C.night,'#2e2a52')
   +`<circle cx="110" cy="90" r="34" fill="${C.cream}" opacity="0.9"/><circle cx="124" cy="82" r="30" fill="${C.night}"/><circle cx="800" cy="70" r="3" fill="#fff"/><circle cx="740" cy="150" r="2.4" fill="#fff"/><circle cx="840" cy="200" r="2.6" fill="#fff"/><circle cx="70" cy="220" r="2.4" fill="#fff"/><circle cx="180" cy="40" r="2.2" fill="#fff"/><circle cx="480" cy="52" r="2.4" fill="#fff"/><circle cx="300" cy="90" r="2" fill="#fff"/>`;
  case 'sky': return wash(C.sky,'#eaf6ff')
   +`<ellipse cx="160" cy="110" rx="66" ry="26" fill="#fff" opacity="0.95"/><ellipse cx="205" cy="96" rx="46" ry="22" fill="#fff" opacity="0.95"/><ellipse cx="720" cy="80" rx="58" ry="24" fill="#fff" opacity="0.9"/><ellipse cx="760" cy="66" rx="40" ry="18" fill="#fff" opacity="0.9"/>`;
  case 'sea': return wash('#bfe6f7','#8fd0ef')
   +`<path d="M0,400 Q225,372 450,400 T900,400 L900,560 L0,560 Z" fill="#5fb9e6"/><path d="M0,436 Q225,410 450,436 T900,436 L900,560 L0,560 Z" fill="#3d9fd4" opacity="0.7"/><circle cx="130" cy="470" r="9" fill="#fff" opacity="0.6"/><circle cx="160" cy="486" r="6" fill="#fff" opacity="0.6"/><circle cx="820" cy="452" r="8" fill="#fff" opacity="0.6"/>`;
  case 'forest': return wash('#dff3e3','#c2e6c9')
   +`<path d="M0,470 Q300,430 900,472 L900,560 L0,560 Z" fill="${C.leaf}"/><circle cx="120" cy="430" r="52" fill="#63b46b"/><rect x="112" y="452" width="16" height="34" fill="${C.brown}"/><circle cx="820" cy="440" r="46" fill="#63b46b"/><rect x="813" y="460" width="14" height="30" fill="${C.brown}"/>`;
  case 'room': return wash('#fdf1dc','#f4dfc0')
   +`<rect x="0" y="400" width="900" height="160" fill="#e8c89a"/><rect x="0" y="400" width="900" height="14" fill="#d9b078"/><rect x="60" y="80" width="180" height="130" rx="10" fill="#fff" opacity="0.7"/><rect x="700" y="90" width="150" height="110" rx="10" fill="#fff" opacity="0.7"/>`;
  case 'garden': return wash('#e7f6ff','#d5efdb')
   +`<path d="M0,468 Q300,440 900,470 L900,560 L0,560 Z" fill="#a5d6a7"/><circle cx="90" cy="140" r="40" fill="${C.yellow}"/><circle cx="90" cy="140" r="30" fill="#ffe680"/>`;
  case 'market': return wash('#fdf3e0','#f3ddb7')
   +`<rect x="0" y="430" width="900" height="130" fill="#e2b77e"/><path d="M60,96 L840,96 L810,150 L90,150 Z" fill="${C.red}" opacity="0.85"/><path d="M150,96 L250,96 L235,150 L170,150 Z" fill="#fff" opacity="0.9"/><path d="M450,96 L550,96 L545,150 L470,150 Z" fill="#fff" opacity="0.9"/><path d="M720,96 L820,96 L800,150 L735,150 Z" fill="#fff" opacity="0.9"/>`;
  case 'night': return wash('#3b3468','#2c2750')
   +`<circle cx="790" cy="90" r="40" fill="${C.yellow}" opacity="0.95"/><circle cx="776" cy="82" r="36" fill="#3b3468"/><circle cx="120" cy="80" r="2.6" fill="#fff"/><circle cx="220" cy="130" r="2.2" fill="#fff"/><circle cx="330" cy="60" r="2.4" fill="#fff"/><circle cx="520" cy="100" r="2.2" fill="#fff"/>`;
 }
 return '';
}

/* Slot markup inside a scene: an outlined cutout the child fills. */
export function slot(shape,x,y,{s=1,color='#ffffff',label,dotted=true}={}){
 const tf=`transform="translate(${x} ${y}) scale(${s})"`;
 return `<g class="sa-slot" data-sa-slot="${shape}" ${tf} role="button" tabindex="0" aria-label="Empty ${label||shape} spot"><g class="sa-slot-hole">${shapeSVG(shape,color,dotted?'stroke-dasharray="10 8"':'')}</g></g>`;
}

/* Filled (solved) slot content, inserted by the engine on success. */
export function filledSlot(shape,color){
 return shapeSVG(shape,color);
}

/* Celebration banner (engine reveals + decorates). */
export function celebrate(title,sub){
 return `<div class="sa-cheer" data-sa-cheer hidden><p class="sa-cheer-title">${title}</p><p class="sa-cheer-sub">${sub}</p></div>`;
}

export const crumbNav=parts=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${href}">${label}</a>`:`<span aria-current="page">${label}</span>`}`).join('')}</nav>`;
export const heading=(eyebrow,title,desc)=>`<div class="page-heading wrap"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${desc}</p></div>`;

/* Status line + controls shared by every board. */
export function controls(hint){
 return `<div class="sa-controls"><p class="sa-status" data-sa-status aria-live="polite">${hint}</p><div class="sa-controlbtns"><button type="button" class="button button-ghost" data-sa-again hidden>Start over</button></div></div>`;
}

export const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
