// Visual verification of all 52 tracing guides: writes a standalone HTML
// contact sheet (uppercase row + lowercase row per letter, with the parent
// help text) to /tmp for inspection. NOT part of the site build.
import {writeFileSync} from 'node:fs';
import {TRACINGS} from '../src/tracing-strokes.mjs';
import {tracingSvg} from '../src/tracing-svg.mjs';

const letters='abcdefghijklmnopqrstuvwxyz'.split('');
const css=`<style>
 body{font-family:sans-serif;background:#fff;margin:10px}
 .sheet{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
 .cell{border:1px solid #ddd;padding:4px}
 .cell h4{margin:2px 0;font-size:12px}
 svg.at-svg{width:100%;height:auto;display:block}
 .at-guides line{stroke:#e8e2d2;stroke-width:1.5;stroke-dasharray:4 5}
 .at-guide{fill:none;stroke:#cfc8b6;stroke-width:14;stroke-linecap:round;stroke-linejoin:round}
 .at-arrow{stroke:#c9452c;stroke-width:2.5;fill:none;marker-end:url(#ah)}
 .at-num{fill:#ffd23e;stroke:#343b30;stroke-width:1.5}
 .at-numtext{font-size:12px;font-weight:800;fill:#343b30}
 .help{font-size:10px;color:#555;margin:2px 0}
</style>`;
const defs=`<svg width="0" height="0" style="position:absolute"><defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#c9452c"/></marker></defs></svg>`;
let cells='';
for(const L of letters){
 const t=TRACINGS[L];
 cells+=`<div class="cell"><h4>${L.toUpperCase()} upper — ${t.up.strokes.length} strokes</h4>${tracingSvg(L,'up',L.toUpperCase(),'')}<p class="help">${t.up.help}</p><h4>${L} lower — ${t.lo.strokes.length} strokes</h4>${tracingSvg(L,'lo',L.toUpperCase(),'')}<p class="help">${t.lo.help}</p></div>`;
}
writeFileSync('/home/z/my-project/alpha-inspect/tracing-sheet.html',
 `<!doctype html><html><head><meta charset="utf-8">${css}</head><body>${defs}<div class="sheet">${cells}</div></body></html>`);
console.log('wrote /home/z/my-project/alpha-inspect/tracing-sheet.html');
