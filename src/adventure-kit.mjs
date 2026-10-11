// Kiddo School — Adventure Kit: shared palette, small markup helpers and
// the R2 base paths for the adventure collections (Classes 25–31).
// The coded SVG board helpers (shape snippets, backdrop painters, slots,
// trays) are retired: every Learning Path adventure is now the owner's
// original artwork plus a transparent Write & Color drawing layer, with
// plain text instructions. Pure string generation, no engines.

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

export const crumbNav=parts=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${href}">${label}</a>`:`<span aria-current="page">${label}</span>`}`).join('')}</nav>`;
export const heading=(eyebrow,title,desc)=>`<div class="page-heading wrap"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${desc}</p></div>`;

/* Status line + controls shared by every board. */
export function controls(hint){
 return `<div class="sa-controls"><p class="sa-status" data-sa-status aria-live="polite">${hint}</p><div class="sa-controlbtns"><button type="button" class="button button-ghost" data-sa-again hidden>Start over</button></div></div>`;
}

export const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
