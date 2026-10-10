// Kiddo School — Class 28 · Phonics & Beginning Sounds (ages 4–5).
// Twenty-four real, playable phonics games at
// /preschool/phonics/adventures/{slug}/, built on the owner's 24 Canva
// illustrations (all 24 verified on R2 under school/phonics/adventures/).
// The artwork is each page's story card; the board below plays for real with
// audio: word recordings and pure phoneme recordings bundled at
// /assets/sounds/phonics/ (with a screen-voice fallback), a mute switch and
// replay everywhere. Progress saves per selected child in the site's
// existing localStorage store — downloading a worksheet never counts.
import {R2,crumbNav,heading,esc,celebrate} from './adventure-kit.mjs';
import {place,ICONS,cir,rrect,line as wline} from './ws-icons.mjs';
import {elToSVG} from './ws-vector.mjs';
/* place() returns primitive objects — the board template needs SVG strings */
const SVG=els=>els.map(elToSVG).join('');

export const PHONICS_BASE=R2+'school/phonics/adventures/';
export const PHONICS_LIB_PATH='/preschool/phonics/adventures/';
export const C28_PATH='/preschool/4-years/phonics-and-beginning-sounds/';
export const WS28_PATH='/worksheets/phonics/';

const CARD=(x,y,label,inner,ok,extra='')=>`<g class="ph-card${ok?' ph-ok':''}" transform="translate(${x},${y})" role="button" tabindex="0" data-ph-pick="${label}" aria-label="${esc(label)}"${extra}>${inner}</g>`;

/* boards are 900x560 server-rendered SVG; the engine (phonics-adventures.js)
   wires the real play on top. Every board also reads as a picture without JS. */
function board(engine,g){
 const parts=[];
 const ELS=(name,x=0,y=0,s=1)=>place(ICONS[name](),x,y,s);
 switch(engine){
  case 'listen':{ // tap the picture that matches the sound you hear
   g.rounds.forEach((r,i)=>{
    const choices=r.choices.map((c,j)=>CARD(170+j*190,240,c.pic,
      `<rect x="-80" y="-90" width="160" height="190" rx="16" fill="#ffffff" stroke="#3a3350" stroke-width="4"/>${SVG(ELS(c.pic,0,14,0.92))}`,c.ok).replace('data-ph-pick',c.ok?'data-ph-ok data-ph-pick':'data-ph-pick')).join('');
    parts.push(`<g class="ph-round" data-ph-round="${i+1}" data-ph-audio="${esc(r.audio)}" ${i?'hidden':''}>
     <text x="450" y="70" text-anchor="middle" font-size="30" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">Round ${i+1} of ${g.rounds.length}</text>
     <text x="450" y="112" text-anchor="middle" font-size="21" fill="#626456" font-family="Arial,Helvetica,sans-serif">${esc(r.say)}</text>
     <g transform="translate(450,180)" role="button" tabindex="0" class="ph-soundbtn" data-ph-round-play="${esc(r.audio)}" aria-label="Play the target sound"><rect x="-130" y="-34" width="260" height="58" rx="29" fill="#f3ecfa" stroke="#8f4fc0" stroke-width="3.5"/><circle cx="-92" cy="-5" r="15" fill="#8f4fc0"/><path d="M-97,-12 L-79,-5 L-97,2 Z" fill="#ffffff"/><text x="16" y="6" text-anchor="middle" font-size="19" font-weight="bold" fill="#8f4fc0" font-family="Arial,Helvetica,sans-serif">Play the sound</text></g>
     ${choices}</g>`);
   });
   break;}
  case 'letter':{ // tap the letter that matches the sound
   g.rounds.forEach((r,i)=>{
    const tiles=r.choices.map((c,j)=>{
     const x=250+j*200;
     return `<g class="ph-card" transform="translate(${x},330)" role="button" tabindex="0" data-ph-pick="${esc(c.letter)}" ${c.ok?'data-ph-ok':''} aria-label="Letter ${esc(c.letter)}"><rect x="-70" y="-70" width="140" height="140" rx="18" fill="#ffffff" stroke="#3a3350" stroke-width="4"/><text x="0" y="26" text-anchor="middle" font-size="82" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">${esc(c.letter)}</text></g>`;
    }).join('');
    parts.push(`<g class="ph-round" data-ph-round="${i+1}" data-ph-word="${esc(r.audio)}" ${i?'hidden':''}>
     <text x="450" y="70" text-anchor="middle" font-size="30" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">Round ${i+1} of ${g.rounds.length}</text>
     <text x="450" y="112" text-anchor="middle" font-size="21" fill="#626456" font-family="Arial,Helvetica,sans-serif">${esc(r.say)}</text>
     <g transform="translate(450,185)" role="button" tabindex="0" data-ph-playword="${esc(r.audio)}" aria-label="${esc(r.audioLabel||'Play the word')}"><rect x="-150" y="-36" width="300" height="60" rx="30" fill="#f3ecfa" stroke="#8f4fc0" stroke-width="3.5"/><circle cx="-108" cy="-6" r="15" fill="#8f4fc0"/><path d="M-113,-13 L-95,-6 L-113,1 Z" fill="#ffffff"/><text x="18" y="6" text-anchor="middle" font-size="19" font-weight="bold" fill="#8f4fc0" font-family="Arial,Helvetica,sans-serif">${esc(r.audioLabel||'Play the word')}</text></g>
     ${r.pic?`<g transform="translate(450,255) scale(1.1)">${SVG(ELS(r.pic,0,0,0.8))}</g>`:''}
     ${tiles}</g>`);
   });
   break;}
  case 'sort':{ // tap a card, then tap its chest/shelf
   const nb=g.bins.length;
   const binW=nb===3?260:340, gap=nb===3?36:60, x0=nb===3?(900-3*binW-2*gap)/2:(900-2*binW-gap)/2;
   const tints=['#eef4e6','#fdeeee','#eaf2fb'];
   const bins=g.bins.map((b,i)=>`<g class="ph-bin" data-ph-bin="${esc(b.key)}" role="button" tabindex="0" aria-label="${esc(b.label)}">
     <rect x="${x0+i*(binW+gap)}" y="330" width="${binW}" height="180" rx="20" fill="#ffffff" stroke="#3a3350" stroke-width="4" stroke-dasharray="10,8"/>
     <rect x="${x0+i*(binW+gap)}" y="330" width="${binW}" height="52" rx="20" fill="${tints[i%3]}"/>
     <text x="${x0+i*(binW+gap)+binW/2}" y="364" text-anchor="middle" font-size="23" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">${esc(b.label)}</text>
     <g transform="translate(${x0+i*(binW+gap)+binW/2},468) scale(1.05)">${SVG(ELS(b.icon,0,0,0.85))}</g></g>`).join('');
   const items=g.items.map((it,i)=>{
    const x=155+i*118;
    return `<g class="ph-item" data-ph-bin="${esc(it.bin)}" data-ph-word="${esc(it.word||it.icon)}" transform="translate(${x},180)" role="button" tabindex="0" aria-label="${esc(it.word||it.icon)}"><rect x="-52" y="-70" width="104" height="140" rx="14" fill="#ffffff" stroke="#3a3350" stroke-width="3.5"/>${SVG(ELS(it.icon,0,6,0.68))}<text x="0" y="92" text-anchor="middle" font-size="16" font-weight="bold" fill="#626456" font-family="Arial,Helvetica,sans-serif">${esc(it.word||it.icon)}</text></g>`;
   }).join('');
   parts.push(`<g class="ph-round" data-ph-round="1"><text x="450" y="48" text-anchor="middle" font-size="30" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">${esc(g.roundSay||'Tap a card, then tap its box')}</text>${items}${bins}</g>`);
   break;}
  case 'match':{ // tap two cards that rhyme / share a sound
   const col=(items,x0,cls)=>items.map((it,i)=>{
    const y=150+i*128;
    return `<g class="ph-${cls}" data-ph-match="${esc(it.m)}" data-ph-word="${esc(it.word)}" transform="translate(${x0},${y})" role="button" tabindex="0" aria-label="${esc(it.word)}"><rect x="-85" y="-55" width="170" height="115" rx="14" fill="#ffffff" stroke="#3a3350" stroke-width="3.5"/>${SVG(ELS(it.icon,0,-8,0.6))}<text x="0" y="44" text-anchor="middle" font-size="17" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">${esc(it.word)}</text></g>`;
   }).join('');
   const n=g.pairs.length;
   parts.push(`<g class="ph-round" data-ph-round="1">
    <text x="450" y="48" text-anchor="middle" font-size="30" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">${esc(g.roundSay||'Tap two pictures that rhyme')}</text>
    ${col(g.pairs.map(p=>({icon:p.a,word:g.words?p.words[p.a]:p.a,m:p.m})),165,'item')}
    ${col(g.pairs.map(p=>({icon:p.b,word:g.words?p.words[p.b]:p.b,m:p.m})),735,'item')}</g>`);
   break;}
  case 'blend':{ // letter tiles into sound boxes; seq drives everything so
     // blends (s + t = star) and scrambled-tray words both play honestly
   const scr=(arr,seed)=>{const a=arr.slice();let s=seed;for(let i=a.length-1;i>0;i--){s=(s*1103515245+12345)%2147483648;const j=s%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
   g.words.forEach((w,i)=>{
    const seq=(w.seq||w.word.split('').join(' ')).split(' ').filter(Boolean);
    const hash=[...g.slug].reduce((a,c)=>a*31+c.charCodeAt(0)%97,7);
    const boxes=seq.map((ch,j)=>`<rect x="${300+j*105}" y="${140+i*130}" width="86" height="86" rx="14" fill="#ffffff" stroke="#3a3350" stroke-width="4" data-ph-slot="${i}-${j}"/>`).join('');
    const seqAttr=(w.seq||w.word.split('').join(' '));
    parts.push(`<g class="ph-round" data-ph-round="${i+1}" data-ph-blendword="${esc(w.word)}" data-ph-word="${esc(w.word)}" data-ph-seq="${esc(seqAttr)}" ${i?'hidden':''}>
     <text x="450" y="56" text-anchor="middle" font-size="28" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">Word ${i+1} of ${g.words.length}</text>
     <g transform="translate(180,${183+i*130}) scale(1.05)">${SVG(ELS(w.icon,0,0,0.85))}</g>
     ${boxes}
     ${scr(seq.map((ch,j)=>({ch,j})),hash+i).map(({ch,j})=>`<g class="ph-tile" data-ph-tile="${esc(ch)}" data-ph-word="${i}" transform="translate(${430+j*80},${450})" role="button" tabindex="0" aria-label="Letter ${esc(ch)}"><rect x="-34" y="-34" width="68" height="68" rx="10" fill="#f3ecfa" stroke="#8f4fc0" stroke-width="3.5"/><text x="0" y="16" text-anchor="middle" font-size="40" font-weight="bold" fill="#8f4fc0" font-family="Arial,Helvetica,sans-serif">${esc(ch)}</text></g>`).join('')}
     <g transform="translate(450,${183+i*130})" data-ph-playword="${esc(w.word)}" role="button" tabindex="0" aria-label="Play the word ${esc(w.word)}" style="cursor:pointer"><rect x="-130" y="-26" width="260" height="50" rx="25" fill="#f3ecfa" stroke="#8f4fc0" stroke-width="2.5" opacity="0.9"/><text x="0" y="6" text-anchor="middle" font-size="16" font-weight="bold" fill="#8f4fc0" font-family="Arial,Helvetica,sans-serif">${esc(w.say||seq.join('…')+'… '+w.word+'!')}</text></g>
    </g>`);
   });
   break;}
  case 'counters':{ // tap one circle per sound/syllable, then check
   g.rows.forEach((r,i)=>{
    const circles=Array.from({length:g.max},(_,j)=>`<g class="ph-counter" data-ph-count="${i+1}" transform="translate(${240+j*105},${235})" role="button" tabindex="0" aria-label="Sound counter ${j+1}"><rect x="-40" y="-40" width="80" height="80" rx="40" fill="#ffffff" stroke="#3a3350" stroke-width="4"/><circle r="26" fill="#f3ecfa" opacity="0" class="ph-dot"/></g>`).join('');
    parts.push(`<g class="ph-round" data-ph-round="${i+1}" data-ph-word="${esc(r.word)}" ${i?'hidden':''}>
     <text x="450" y="56" text-anchor="middle" font-size="28" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">Word ${i+1} of ${g.rows.length}</text>
     <g transform="translate(240,${130}) scale(1.15)">${SVG(ELS(r.icon,0,0,0.95))}</g>
     <text x="450" y="140" text-anchor="middle" font-size="34" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">${esc(r.word)}</text>
     <g transform="translate(660,130)" role="button" tabindex="0" data-ph-playword="${esc(r.word)}" aria-label="Play the word ${esc(r.word)}"><rect x="-105" y="-30" width="210" height="56" rx="28" fill="#f3ecfa" stroke="#8f4fc0" stroke-width="3.5"/><circle cx="-68" cy="-2" r="14" fill="#8f4fc0"/><path d="M-73,-9 L-55,-2 L-73,5 Z" fill="#ffffff"/><text x="18" y="4" text-anchor="middle" font-size="17" font-weight="bold" fill="#8f4fc0" font-family="Arial,Helvetica,sans-serif">Play the word</text></g>
     ${circles}
     <text x="450" y="330" text-anchor="middle" font-size="20" fill="#626456" font-family="Arial,Helvetica,sans-serif">${esc(r.hint)}</text>
     <g transform="translate(450,415)" role="button" tabindex="0" class="ph-check" data-ph-need="${r.n}" data-ph-wordidx="${i}" aria-label="Check my answer"><rect x="-130" y="-34" width="260" height="62" rx="31" fill="#8f4fc0"/><text x="0" y="7" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff" font-family="Arial,Helvetica,sans-serif">Check my answer</text></g>
    </g>`);
   });
   break;}
  case 'oddone':{
   (g.rounds||g.rows).forEach((r,i)=>{
    const pics=r.pics.map((p,j)=>CARD(170+j*190,250,p,
      `<rect x="-80" y="-90" width="160" height="190" rx="16" fill="#ffffff" stroke="#3a3350" stroke-width="4"/>${SVG(ELS(p,0,14,0.92))}`,p===r.odd).replace('data-ph-pick',p===r.odd?'data-ph-ok data-ph-pick':'data-ph-pick')).join('');
    parts.push(`<g class="ph-round" data-ph-round="${i+1}" ${i?'hidden':''}>
     <text x="450" y="70" text-anchor="middle" font-size="30" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">Round ${i+1} of ${g.rounds.length}</text>
     <text x="450" y="112" text-anchor="middle" font-size="21" fill="#626456" font-family="Arial,Helvetica,sans-serif">${esc(r.say)}</text>${pics}</g>`);
   });
   break;}
  case 'position':{
   g.rows.forEach((r,i)=>{
    parts.push(`<g class="ph-round" data-ph-round="${i+1}" data-ph-word="${esc(r.word)}" ${i?'hidden':''}>
     <text x="450" y="60" text-anchor="middle" font-size="28" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">Word ${i+1} of ${g.rows.length}</text>
     <g transform="translate(220,190) scale(1.25)">${SVG(ELS(r.icon,0,0,1))}</g>
     <text x="470" y="200" text-anchor="middle" font-size="44" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">${esc(r.word)}</text>
     <g transform="translate(690,185)" role="button" tabindex="0" data-ph-playword="${esc(r.word)}" aria-label="Play the word ${esc(r.word)}"><rect x="-110" y="-30" width="220" height="56" rx="28" fill="#f3ecfa" stroke="#8f4fc0" stroke-width="3.5"/><text x="0" y="6" text-anchor="middle" font-size="17" font-weight="bold" fill="#8f4fc0" font-family="Arial,Helvetica,sans-serif">Play the word</text></g>
     <g class="ph-card" transform="translate(300,390)" role="button" tabindex="0" data-ph-pick="first" ${r.pos==='first'?'data-ph-ok':''} aria-label="The sound is first"><rect x="-110" y="-60" width="220" height="120" rx="16" fill="#ffffff" stroke="#3a3350" stroke-width="4"/><text x="0" y="-6" text-anchor="middle" font-size="26" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">FIRST</text><text x="0" y="34" text-anchor="middle" font-size="34" font-weight="bold" fill="#8f4fc0" font-family="Arial,Helvetica,sans-serif">${esc(r.word[0])}</text></g>
     <g class="ph-card" transform="translate(600,390)" role="button" tabindex="0" data-ph-pick="last" ${r.pos==='last'?'data-ph-ok':''} aria-label="The sound is last"><rect x="-110" y="-60" width="220" height="120" rx="16" fill="#ffffff" stroke="#3a3350" stroke-width="4"/><text x="0" y="-6" text-anchor="middle" font-size="26" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">LAST</text><text x="0" y="34" text-anchor="middle" font-size="34" font-weight="bold" fill="#8f4fc0" font-family="Arial,Helvetica,sans-serif">${esc(r.word[r.word.length-1])}</text></g>
    </g>`);
   });
   break;}
  case 'swap':{ // tap the replacement letter
   g.rows.forEach((r,i)=>{
    const tiles=r.tiles.map(t=>`<g class="ph-tile" data-ph-tile="${esc(t)}" data-ph-ok="${t===r.swap?'true':'false'}" transform="translate(${330+r.tiles.indexOf(t)*120},430)" role="button" tabindex="0" aria-label="Letter ${esc(t)}"><rect x="-40" y="-40" width="80" height="80" rx="12" fill="#f3ecfa" stroke="#8f4fc0" stroke-width="3.5"/><text x="0" y="18" text-anchor="middle" font-size="44" font-weight="bold" fill="#8f4fc0" font-family="Arial,Helvetica,sans-serif">${esc(t)}</text></g>`).join('');
    parts.push(`<g class="ph-round" data-ph-round="${i+1}" data-ph-newword="${esc(r.targetWord)}" ${i?'hidden':''}>
     <text x="450" y="56" text-anchor="middle" font-size="28" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">${esc(r.say)}</text>
     <g transform="translate(230,200) scale(1.2)">${SVG(ELS(r.from,0,0,0.9))}</g>
     <text x="450" y="210" text-anchor="middle" font-size="40" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">${esc(r.fromWord)} \u2192 ${esc(r.targetWord)}</text>
     <g transform="translate(680,200) scale(1.2)">${SVG(ELS(r.to,0,0,0.9))}</g>
     <text x="450" y="330" text-anchor="middle" font-size="20" fill="#626456" font-family="Arial,Helvetica,sans-serif">Tap the letter that makes the switch: ${esc(r.prompt)}</text>
     ${tiles}</g>`);
   });
   break;}
  case 'path':{ // tap every picture with the target sound
   const wave=[];const x0=110,x1=790,amp=95;
   wave.push(`M${x0},290`);
   for(let i=0;i<6;i++){const dir=i%2?-1:1;wave.push(`Q${x0+(x1-x0)*(i+0.5)/6},${290+dir*amp*1.15},${x0+(x1-x0)*(i+1)/6},290`);}
   const items=g.items.map((it,i)=>{
    const t=(i+0.5)/g.items.length;
    const x=x0+(x1-x0)*t;const seg=Math.min(5,Math.floor(t*6));const dir=seg%2?-1:1;
    const y=290+dir*amp;
    return `<g class="ph-card" transform="translate(${x},${y})" role="button" tabindex="0" data-ph-pick="${esc(it.icon)}" ${it.ok?'data-ph-ok':''} aria-label="${esc(it.icon)}"><rect x="-62" y="-62" width="124" height="124" rx="14" fill="#ffffff" stroke="#3a3350" stroke-width="4"/>${SVG(ELS(it.icon,0,4,0.72))}</g>`;
   }).join('');
   parts.push(`<g class="ph-round" data-ph-round="1">
    <text x="450" y="46" text-anchor="middle" font-size="30" font-weight="bold" fill="#343b30" font-family="Arial,Helvetica,sans-serif">${esc(g.roundSay)}</text>
    <path d="${wave.join(' ')}" fill="none" stroke="#ccc5b5" stroke-width="4" stroke-dasharray="10,9"/>
    ${items}
    <text x="450" y="530" text-anchor="middle" font-size="20" fill="#626456" font-family="Arial,Helvetica,sans-serif">${esc(g.tip)}</text></g>`);
   break;}
 }
 return `<svg class="ph-svg" viewBox="0 0 900 560" role="img" aria-label="${esc(g.alt)}"><rect width="900" height="560" rx="24" fill="#faf6ec"/>${parts.join('')}</svg>`;
}

export function phonicBoard(g){return board(g.engine,g);}

/* ---------- the 24 adventures ---------- */
const G=(o)=>o;
export const phonicAdventures=[
 G({num:1,slug:'sound-detective',img:'sound-detective.webp',title:'Sound Detective',engine:'listen',
   tag:'Listen to a sound, then tap every picture that starts with it.',skill:'Beginning sounds',
   say:'Press the sound button, listen carefully, then tap the pictures that start with that sound.',
   hint:'That one starts with the sound!',doneTitle:'Case closed!',doneSub:'You found every picture with the secret sound. Detective ears!',
   alt:'A detective fox with a magnifying glass beside pictures of a sun, a sock, a cat and a dog.',
   rounds:[
    {say:'Which pictures start with sss…?',audio:'s',choices:[{pic:'sun',ok:true},{pic:'sock',ok:true},{pic:'cat',ok:false},{pic:'dog',ok:false}]},
    {say:'A new sound for round two…',audio:'m',choices:[{pic:'nut',ok:false},{pic:'map',ok:true},{pic:'mop',ok:true}]}
   ]}),
 G({num:2,slug:'treasure-chest-sounds',img:'treasure-chest-sounds.webp',title:'Treasure Chest Sounds',engine:'sort',
   tag:'Sort the picture cards into the right treasure chest by their beginning sound.',skill:'Sound sorting',
   say:'Tap a card, say its word out loud, then tap the chest that matches its first sound.',
   hint:'In the chest it goes!',doneTitle:'All treasures sorted!',doneSub:'Every card went to the chest that matches its sound.',
   alt:'Two treasure chests waiting for picture cards to be sorted by their beginning sound.',
   roundSay:'Tap a card, then tap its chest.',
   items:[{icon:'ball',word:'ball',bin:'b'},{icon:'banana',word:'banana',bin:'b'},{icon:'boat',word:'boat',bin:'b'},{icon:'moon',word:'moon',bin:'m'},{icon:'mouse',word:'mouse',bin:'m'},{icon:'mitten',word:'mitten',bin:'m'}],
   bins:[{key:'b',label:'The "b" chest',icon:'ball'},{key:'m',label:'The "m" chest',icon:'moon'}]}),
 G({num:3,slug:'rhyming-frog-hop',img:'rhyming-frog-hop.webp',title:'Rhyming Frog Hop',engine:'match',
   tag:'Tap two pictures whose words rhyme — the frog hops between them.',skill:'Rhyming',
   say:'Say each word out loud. When two words end the same, tap them both — ribbit!',
   hint:'Those two rhyme!',doneTitle:'Every frog found its lily pad!',doneSub:'You matched all the rhyming pairs.',
   alt:'Frogs on lily pads with pictures of a cat, a hat, a dog and a log.',
   roundSay:'Tap two pictures that rhyme.',
   pairs:[{a:'cat',b:'hat',m:'at'},{a:'dog',b:'frog',m:'og'},{a:'fox',b:'box',m:'ox'}]}),
 G({num:4,slug:'robot-sound-blender',img:'robot-sound-blender.webp',title:'Robot Sound Blender',engine:'blend',
   tag:'Say each sound slowly — c…a…t — and blend them into the whole word.',skill:'Blending',
   say:'Tap the letter tiles in order to build each word, then say the word like a robot: c…a…t… cat!',
   hint:'The word is blending together!',doneTitle:'All words blended!',doneSub:'You turned separate sounds into real words.',
   alt:'A friendly robot with sound boxes showing the word cat built letter by letter.',
   words:[{icon:'cat',word:'cat',say:'c…a…t… cat!'},{icon:'sun',word:'sun',say:'s…u…n… sun!'},{icon:'pig',word:'pig',say:'p…i…g… pig!'}]}),
 G({num:5,slug:'birdsong-sound-match',img:'birdsong-sound-match.webp',title:'Birdsong Sound Match',engine:'match',
   tag:'Connect the pictures whose words share their beginning sound.',skill:'Beginning sound matching',
   say:'Say each picture word and listen to its first sound. Match the birds that sing the same first sound.',
   hint:'Same first sound — a match!',doneTitle:'A perfect song!',doneSub:'Every matching pair found each other.',
   alt:'Songbirds beside pairs of pictures that share beginning sounds.',
   roundSay:'Tap two pictures with the same first sound.',
   pairs:[{a:'moon',b:'mouse',m:'m'},{a:'fish',b:'fan',m:'f'},{a:'sun',b:'sock',m:'s'}]}),
 G({num:6,slug:'elephants-sound-bubbles',img:'elephants-sound-bubbles.webp',title:'Elephant\u2019s Sound Bubbles',engine:'listen',
   tag:'The elephant blows a sound bubble — tap the pictures that belong in it.',skill:'Beginning sounds',
   say:'Play the sound in the bubble, then tap every picture whose word starts with it.',
   hint:'Into the bubble it goes!',doneTitle:'Both bubbles are full!',doneSub:'You found every picture for both sounds.',
   alt:'A friendly elephant blowing sound bubbles beside rows of small pictures.',
   rounds:[
    {say:'The elephant holds a ball. Which bubble matches its first sound?',audio:'b',choices:[{pic:'ball',ok:true},{pic:'hat',ok:false},{pic:'sun',ok:false}]},
    {say:'Listen for mmm…',audio:'m',choices:[{pic:'moon',ok:true},{pic:'mouse',ok:true},{pic:'sun',ok:false}]}
   ]}),
 G({num:7,slug:'pirates-missing-sound',img:'pirates-missing-sound.webp',title:'Pirate\u2019s Missing Sound',engine:'letter',
   tag:'The pirate stole the first letter of each word! Tap the letter that was stolen.',skill:'First letter sounds',
   say:'Say the picture word. Its first sound is missing — tap the letter that makes it right.',
   hint:'Arr, that\u2019s the stolen letter!',doneTitle:'Every letter recovered!',doneSub:'The pirate returned all the stolen letters. Words ahoy!',
   alt:'A pirate parrot beside words with missing first letters and picture clues.',
   rounds:[
    {say:'_at — say the picture word. Which first letter was stolen?',pic:'cat',audioLabel:'Play "cat"',audio:'cat',choices:[{letter:'c',ok:true},{letter:'h',ok:false},{letter:'d',ok:false}]},
    {say:'_un — which letter starts this word?',pic:'sun',audioLabel:'Play "sun"',audio:'sun',choices:[{letter:'t',ok:false},{letter:'s',ok:true},{letter:'m',ok:false}]},
    {say:'_og — fetch the right letter!',pic:'dog',audioLabel:'Play "dog"',audio:'dog',choices:[{letter:'b',ok:false},{letter:'g',ok:false},{letter:'d',ok:true}]}
   ]}),
 G({num:8,slug:'ice-cream-rhyme-shop',img:'ice-cream-rhyme-shop.webp',title:'Ice Cream Rhyme Shop',engine:'match',
   tag:'Order up! Match the rhyming pairs at the ice cream shop.',skill:'Rhyming',
   say:'Two things rhyme when they end the same. Tap a pair that rhymes to serve it up!',
   hint:'One rhyme sundae, coming up!',doneTitle:'The shop is sold out!',doneSub:'Every rhyme order served. Sweet listening!',
   alt:'An ice cream shop counter with rhyming picture pairs waiting to be matched.',
   roundSay:'Tap two pictures that rhyme.',
   pairs:[{a:'cat',b:'hat',m:'at'},{a:'fox',b:'box',m:'ox'},{a:'bee',b:'tree',m:'ee'}]}),
 G({num:9,slug:'crocodile-sound-chomper',img:'crocodile-sound-chomper.webp',title:'Crocodile Sound Chomper',engine:'letter',
   tag:'The crocodile chomps ENDINGS — tap the letter each word ends with.',skill:'Ending sounds',
   say:'Say the word slowly and catch its very last sound. Tap the letter that makes it.',
   hint:'CHOMP! That\u2019s the ending sound.',doneTitle:'Every ending chomped!',doneSub:'You caught the last sound of every word.',
   alt:'A smiling crocodile beside words waiting for their ending sounds to be chomped.',
   rounds:[
    {say:'cat — what does it END with?',pic:'cat',audioLabel:'Play "cat"',audio:'cat',choices:[{letter:'t',ok:true},{letter:'m',ok:false},{letter:'g',ok:false}]},
    {say:'dog — catch the ending!',pic:'dog',audioLabel:'Play "dog"',audio:'dog',choices:[{letter:'d',ok:false},{letter:'g',ok:true},{letter:'p',ok:false}]},
    {say:'sun — last sound coming up…',pic:'sun',audioLabel:'Play "sun"',audio:'sun',choices:[{letter:'s',ok:false},{letter:'n',ok:true},{letter:'u',ok:false}]}
   ]}),
 G({num:10,slug:'kangaroo-sound-jumps',img:'kangaroo-sound-jumps.webp',title:'Kangaroo Sound Jumps',engine:'counters',
   tag:'How many sounds live in each word? Tap one jump circle per sound.',skill:'Sound counting (phonemes)',
   say:'Play the word, say it slowly, and tap one circle for every sound you hear. Then check!',
   hint:'One tap per sound!',doneTitle:'Every jump counted!',doneSub:'You can hear the sounds inside words — the deepest listening skill of all.',
   alt:'A kangaroo beside words with jump circles waiting to be counted.',
   max:3,
   rows:[{icon:'sun',word:'sun',hint:'s…u…n — how many sounds?',n:3},{icon:'cat',word:'cat',hint:'c…a…t — how many sounds?',n:3},{icon:'fish',word:'fish',hint:'f…i…sh — how many sounds?',n:3}]}),
 G({num:11,slug:'muffin-middle-sounds',img:'muffin-middle-sounds.webp',title:'Muffin Middle Sounds',engine:'letter',
   tag:'The middle vowel is missing from every muffin word! Tap the vowel that fits.',skill:'Middle vowel sounds',
   say:'Stretch the word out loud — cuuup — and listen for the sound in the middle. Tap that vowel.',
   hint:'That vowel fits perfectly!',doneTitle:'All muffins complete!',doneSub:'You found every missing middle vowel. Stretchy listening!',
   alt:'Muffin words with missing middle vowels beside a bank of the five vowels.',
   rounds:[
    {say:'c_t — stretch it: caaat. Which vowel fits the middle?',pic:'cat',audioLabel:'Play "cat"',audio:'cat',choices:[{letter:'i',ok:false},{letter:'a',ok:true},{letter:'e',ok:false}]},
    {say:'h_n — cluck cluck! Which vowel?',pic:'hen',audioLabel:'Play "hen"',audio:'hen',choices:[{letter:'a',ok:false},{letter:'e',ok:true},{letter:'o',ok:false}]},
    {say:'d_g — woof! Which vowel?',pic:'dog',audioLabel:'Play "dog"',audio:'dog',choices:[{letter:'e',ok:false},{letter:'o',ok:true},{letter:'a',ok:false}]},
    {say:'s_n — sunny day! Which vowel?',pic:'sun',audioLabel:'Play "sun"',audio:'sun',choices:[{letter:'i',ok:false},{letter:'e',ok:false},{letter:'u',ok:true}]}
   ]}),
 G({num:12,slug:'owls-sound-sorting-library',img:'owls-sound-sorting-library.webp',title:'Owl\u2019s Sound Sorting Library',engine:'sort',
   tag:'The owl sorts books by their first sound. Help sort the picture cards!',skill:'Sound sorting',
   say:'Tap a card, say its word, then tap the shelf whose sound it starts with.',
   hint:'On the shelf it goes!',doneTitle:'The library is sorted!',doneSub:'Every card on the right shelf. Wise work!',
   alt:'An owl librarian beside two shelves waiting for picture cards sorted by first sound.',
   roundSay:'Tap a card, then tap its shelf.',
   items:[{icon:'moon',word:'moon',bin:'m'},{icon:'mop',word:'mop',bin:'m'},{icon:'sun',word:'sun',bin:'s'},{icon:'sock',word:'sock',bin:'s'},{icon:'tent',word:'tent',bin:'t'},{icon:'top',word:'top',bin:'t'}],
   bins:[{key:'m',label:'The "m" shelf',icon:'moon'},{key:'s',label:'The "s" shelf',icon:'sun'},{key:'t',label:'The "t" shelf',icon:'tent'}]}),
 G({num:13,slug:'penguin-syllable-drums',img:'penguin-syllable-drums.webp',title:'Penguin Syllable Drums',engine:'counters',
   tag:'Drum the beats inside words: tap a drum for every syllable you hear.',skill:'Syllables',
   say:'Play the word and clap it with the penguin — one clap per syllable. Tap that many drums.',
   hint:'Feel the beat!',doneTitle:'A perfect rhythm!',doneSub:'You drummed every syllable. Feel that beat!',
   alt:'A penguin drummer beside words and drum circles waiting to be tapped.',
   max:3,
   rows:[{icon:'cat',word:'cat',hint:'one beat: cat',n:1},{icon:'apple',word:'apple',hint:'two beats: ap-ple',n:2},{icon:'banana',word:'banana',hint:'three beats: ba-na-na',n:3},{icon:'elephant',word:'elephant',hint:'three beats: el-e-phant',n:3}]}),
 G({num:14,slug:'raccoons-odd-sound-hunt',img:'raccoons-odd-sound-hunt.webp',title:'Raccoon\u2019s Odd Sound Hunt',engine:'oddone',
   tag:'Two words start the same, one is the odd raccoon. Tap the impostor!',skill:'Comparing sounds',
   say:'Say all three words. Two start with the same sound — tap the one that does not.',
   hint:'Caught you, odd raccoon!',doneTitle:'Every impostor caught!',doneSub:'You spotted every different beginning sound.',
   alt:'A raccoon sneaking between rows of three pictures where one begins differently.',
   rounds:[
    {say:'Two start with sss… one does not!',pics:['sun','sock','moon'],odd:'moon'},
    {say:'Two start with b… find the odd one!',pics:['ball','boat','cat'],odd:'cat'},
    {say:'Two start with fff… find the odd one!',pics:['fish','fan','dog'],odd:'dog'}
   ]}),
 G({num:15,slug:'submarine-sound-scanner',img:'submarine-sound-scanner.webp',title:'Submarine Sound Scanner',engine:'position',
   tag:'Scan the word front to back: is the sound at the START or the END?',skill:'Sound position',
   say:'Play the word and scan it like a submarine. Is the sound first or last? Tap that box.',
   hint:'Sound located!',doneTitle:'Scan complete!',doneSub:'You located every sound in its position.',
   alt:'A submarine scanner beside words with first and last sound boxes.',
   rows:[{icon:'sun',word:'sun',pos:'first',hint:'Where is s?'},{icon:'cat',word:'cat',pos:'last',hint:'Where is t?'},{icon:'dog',word:'dog',pos:'first',hint:'Where is d?'},{icon:'map',word:'map',pos:'last',hint:'Where is p?'}]}),
 G({num:16,slug:'bunny-word-family-village',img:'bunny-word-family-village.webp',title:'Bunny Word Family Village',engine:'sort',
   tag:'Two houses on Bunny\u2019s street: -at words and -an words. Sort them home!',skill:'Word families',
   say:'Read each word card out loud, then tap its house. Words that end the same live together.',
   hint:'Home sweet home!',doneTitle:'The village is settled!',doneSub:'Every word found its family house.',
   alt:'A bunny village with an -at house and an -an house waiting for word cards.',
   roundSay:'Tap a word, then tap its house.',
   items:[{icon:'cat',word:'cat',bin:'at'},{icon:'hat',word:'hat',bin:'at'},{icon:'can',word:'can',bin:'an'},{icon:'fan',word:'fan',bin:'an'}],
   bins:[{key:'at',label:'The -at house',icon:'hat'},{key:'an',label:'The -an house',icon:'fan'}]}),
 G({num:17,slug:'sloths-blending-slide',img:'sloths-blending-slide.webp',title:'Sloth\u2019s Blending Slide',engine:'blend',
   tag:'Hold the first sound and slide the rest on: sss…un — sun!',skill:'Blending with support',
   say:'The first letter is already in its box. Tap the tiles to finish each s-word, then slide the sounds together.',
   hint:'Slide those sounds!',doneTitle:'All words slid home!',doneSub:'You blended every word, nice and slow.',
   alt:'A sloth on a slide beside s-words whose first letter is already placed.',
   words:[{icon:'star',word:'star',seq:'s t',say:'sss…t… st!'},{icon:'spider',word:'spider',seq:'s p',say:'sss…p… sp!'},{icon:'snail',word:'snail',seq:'s n',say:'sss…n… sn!'}]}),
 G({num:18,slug:'unicorn-sound-swap',img:'unicorn-sound-swap.webp',title:'Unicorn Sound Swap',engine:'swap',
   tag:'Swap the FIRST sound and make a brand-new word — cat becomes hat!',skill:'Sound manipulation',
   say:'Say the word, make the swap sound, and tap the letter that changes the word into the new one.',
   hint:'A magic swap!',doneTitle:'Every spell cast!',doneSub:'You swapped first sounds and made new words. Magic!',
   alt:'A unicorn beside words transforming into new words with swapped first letters.',
   rows:[{say:'Swap c for the new first sound: cat \u2192 hat',from:'cat',to:'hat',fromWord:'cat',targetWord:'hat',swap:'h',prompt:'c \u2192 ?',tiles:['h','m','s']},{say:'Swap d for the new first sound: dog \u2192 log',from:'dog',to:'log',fromWord:'dog',targetWord:'log',swap:'l',prompt:'d \u2192 ?',tiles:['l','n','r']},{say:'Swap p: pan \u2192 fan',from:'pan',to:'fan',fromWord:'pan',targetWord:'fan',swap:'f',prompt:'p \u2192 ?',tiles:['f','t','b']}]}),
 G({num:19,slug:'dinosaur-sound-train',img:'dinosaur-sound-train.webp',title:'Dinosaur Sound Train',engine:'blend',
   tag:'One sound per train car: build the word, then chugga-chugga read it!',skill:'Blending and writing',
   say:'Tap the letter tiles to load each train car — one sound per car. Then read the whole word!',
   hint:'The word train is loading!',doneTitle:'The train is fully loaded!',doneSub:'Every word built sound by sound. Chugga chugga!',
   alt:'A dinosaur conductor beside train cars waiting for the letters of cat, dog and sun.',
   words:[{icon:'cat',word:'cat',say:'c-a-t, cat!'},{icon:'dog',word:'dog',say:'d-o-g, dog!'},{icon:'sun',word:'sun',say:'s-u-n, sun!'}]}),
 G({num:20,slug:'monkeys-missing-middle',img:'monkeys-missing-middle.webp',title:'Monkey\u2019s Missing Middle',engine:'letter',
   tag:'The monkey dropped the middle of every word! Tap the missing vowel.',skill:'Middle vowels',
   say:'Stretch each word out loud and find the vowel that fell out of the middle.',
   hint:'That\u2019s the middle sound!',doneTitle:'Every word made whole!',doneSub:'All the middle vowels returned to their words.',
   alt:'A monkey beside b_d, p_g, c_p, f_x and h_t with the five vowels waiting.',
   rounds:[
    {say:'b_d — stretch it: buuud?',pic:'bed',audioLabel:'Play "bed"',audio:'bed',choices:[{letter:'e',ok:true},{letter:'a',ok:false},{letter:'o',ok:false}]},
    {say:'p_g — oink oink!',pic:'pig',audioLabel:'Play "pig"',audio:'pig',choices:[{letter:'a',ok:false},{letter:'i',ok:true},{letter:'u',ok:false}]},
    {say:'f_x — what does the fox say?',pic:'fox',audioLabel:'Play "fox"',audio:'fox',choices:[{letter:'o',ok:true},{letter:'e',ok:false},{letter:'i',ok:false}]}
   ]}),
 G({num:21,slug:'firefly-sound-counting',img:'firefly-sound-counting.webp',title:'Firefly Sound Counting',engine:'counters',
   tag:'Fireflies flash once per SOUND — count sounds, not letters!',skill:'Phoneme counting',
   say:'Play the word and count its sounds: tap one firefly circle per sound. Careful — letters can trick you!',
   hint:'Flash! One sound.',doneTitle:'All flashes counted!',doneSub:'You counted sounds, not letters — the trickiest listening of all.',
   alt:'Fireflies glowing beside words whose sounds must be counted, not their letters.',
   max:4,
   rows:[{icon:'man',word:'me',hint:'m…e — just two sounds!',n:2},{icon:'cat',word:'cat',hint:'c…a…t — three sounds',n:3},{icon:'ship',word:'ship',hint:'sh…i…p — sh is ONE sound!',n:3},{icon:'frog',word:'frog',hint:'f…r…o…g — four sounds!',n:4}]}),
 G({num:22,slug:'polar-bear-word-builder',img:'polar-bear-word-builder.webp',title:'Polar Bear Word Builder',engine:'blend',
   tag:'The words froze solid! Tap the letters to thaw them out, sound by sound.',skill:'Word building',
   say:'Say the picture word slowly, then tap its letters in order to build it.',
   hint:'The ice is melting!',doneTitle:'All words thawed!',doneSub:'Every frozen word built back sound by sound.',
   alt:'A polar bear beside frozen words waiting to be rebuilt letter by letter.',
   words:[{icon:'cat',word:'cat',say:'t…c…a… cat!'},{icon:'sun',word:'sun',say:'n…s…u… sun!'},{icon:'hen',word:'hen',say:'e…n…h… hen!'},{icon:'pig',word:'pig',say:'g…i…p… pig!'}]}),
 G({num:23,slug:'mermaids-sound-switch',img:'mermaids-sound-switch.webp',title:'Mermaid\u2019s Sound Switch',engine:'swap',
   tag:'Switch the LAST sound: cat becomes can, cup becomes cub.',skill:'Ending sound manipulation',
   say:'Say the word, then switch its tail sound. Tap the letter that makes the new word.',
   hint:'The switch is on!',doneTitle:'Every switch flipped!',doneSub:'You changed final sounds and made new words.',
   alt:'A mermaid beside words whose last letters switch to make new words.',
   rows:[{say:'Switch the tail: cat \u2192 can',from:'cat',to:'can',fromWord:'cat',targetWord:'can',swap:'n',prompt:'t \u2192 ?',tiles:['n','p','m']},{say:'Switch it: dog \u2192 dot',from:'dog',to:'dot',fromWord:'dog',targetWord:'dot',swap:'t',prompt:'g \u2192 ?',tiles:['t','b','l']},{say:'One more: cup \u2192 cub',from:'cup',to:'cub',fromWord:'cup',targetWord:'cub',swap:'b',prompt:'p \u2192 ?',tiles:['b','d','g']}]}),
 G({num:24,slug:'dragons-secret-sound-paths',img:'dragons-secret-sound-paths.webp',title:'Dragon\u2019s Secret Sound Paths',engine:'path',
   tag:'Follow the winding path and tap every picture that starts with the s sound.',skill:'Beginning sounds',
   say:'Start at the green dot. Tap every s-picture on the path to the dragon\u2019s cave.',
   hint:'sss — that one may pass!',doneTitle:'You reached the cave!',doneSub:'Every s-sound found its way to the dragon.',
   alt:'A winding path to a dragon\u2019s cave lined with pictures, some starting with the s sound.',
   roundSay:'Tap every picture that starts with sss…',
   tip:'Start at the green dot and tap the s-pictures in order!',
   items:[{icon:'sun',ok:true},{icon:'hat',ok:false},{icon:'sock',ok:true},{icon:'star',ok:true},{icon:'nut',ok:false},{icon:'six',ok:true}]})
];

export const phonicBySlug=Object.fromEntries(phonicAdventures.map(g=>[g.slug,g]));

/* ---------- audio helpers shipped to the engine ---------- */
export const AUDIO_MANIFEST=(()=>{ // every recording the games reference
 const s=new Set();
 for(const g of phonicAdventures){
  (g.rounds||[]).forEach(r=>{if(r.audio)s.add(r.audio);});
  (g.rows||[]).forEach(r=>{if(r.word)s.add(r.word);});
  (g.words||[]).forEach(w=>s.add(w.word));
  if(g.items)g.items.forEach(it=>{if(it.word)s.add(it.word);});
  if(g.pairs)g.pairs.forEach(p=>{s.add(p.a);s.add(p.b);});
 }
 return [...s].sort();
})();

/* ---------- Class 28 page ---------- */
export function class28Body(){
 const byGroup=[[1,4],[5,8],[9,12],[13,16],[17,20],[21,24]];
 const shelves=[['Listen and find','First sounds: hear them, spot them, circle them.'],
  ['Rhyme and blend','Words that chime, sounds that squash into words.'],
  ['Letters and middles','First letters, last letters and the shy vowels in between.'],
  ['Count and sort','Sounds you can count, syllables you can clap, words you can sort.'],
  ['Swap and build','Change one sound, build a whole word.'],
  ['The grand path','Everything together on one winding adventure.']];
 return `${crumbNav([['Preschool','/preschool/'],['Age 4','/preschool/4-years/'],['Phonics &amp; Beginning Sounds']])}
 <article class="wrap lesson-hero"><div class="lesson-hero-copy">
  <span class="eyebrow">CLASS 28 · PRESCHOOL AGES 4–5</span>
  <h1>Phonics &amp; Beginning Sounds</h1>
  <div class="fc-chips lesson-chips"><span><strong>Age</strong> 4–5 Years</span><span><strong>Class</strong> 28 of 28</span><span><strong>Adventures</strong> 24 sound games</span><span><strong>Subjects</strong> Sounds · rhymes · words</span></div>
  <p class="lesson-lede">Phonics is listening made visible: this class plays with the sounds inside words — first sounds, ending sounds, rhymes, syllables and the tiny vowels that hide in the middle. Twenty-four real games, every one with recorded sound, plus a printable worksheet for each adventure in the <a href="${WS28_PATH}">Phonics worksheet library</a>.</p>
  <p class="lesson-lede">Every game speaks: words and pure letter sounds play out loud, with replay and a mute switch. No reading required — ears lead, letters follow.</p>
  <div class="lesson-start"><a class="button" href="#adventures">Meet the adventures <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Grown-up nearby for the first round makes everything smoother.</span></div>
 </div></article>
 <section class="wrap lesson-section" id="todays-class" aria-label="How the class works">
  <span class="eyebrow">TODAY’S CLASS</span>
  <h2>How this class works.</h2>
  <p class="lesson-copy">Phonics asks a new kind of listening: not what a word means, but what it is MADE of. The class walks up a gentle slope — hear a sound, find it in pictures, hear it at the start or end of words, blend sounds into words, swap sounds to make new words, and finally count the invisible sounds inside what you hear.</p>
  <ol class="tc-flow">
   <li><span>1</span> Warm-up: the first-sound games</li>
   <li><span>2</span> Rhymes and blending</li>
   <li><span>3</span> Two or three adventures from the shelves</li>
   <li><span>4</span> The matching worksheet, printed</li>
   <li><span>5</span> Class complete</li>
  </ol>
 </section>
 <section class="wrap lesson-section" id="adventures" aria-label="The phonics adventures">
  <span class="eyebrow">PLAY · THE 24 PHONICS ADVENTURES</span>
  <h2>Twenty-four listening adventures.</h2>
  <p class="lesson-copy">Start anywhere your child’s ears are curious. The shelves below run in a gentle skill order — first sounds before blends, blends before swaps — but every game stands on its own. Each adventure has a printable worksheet twin at <a href="${WS28_PATH}">/worksheets/phonics/</a>.</p>
  ${shelves.map((sh,i)=>{
    const [a,b]=byGroup[i];
    const items=phonicAdventures.filter(g=>g.num>=a&&g.num<=b);
    return `<div class="wa-shelf"><h3>${i+1}. ${sh[0]}</h3><p class="lesson-copy">${sh[1]}</p><div class="sa-grid">${items.map(g=>`<a class="sa-card sa-card-slim" href="${PHONICS_LIB_PATH}${g.slug}/" data-ph-card="${g.slug}"><img src="${PHONICS_BASE}${g.img}" width="400" height="284" alt="${esc(g.alt)}" loading="lazy"><span class="sa-card-body"><strong>${esc(g.num)}. ${esc(g.title)}</strong><span class="sa-card-skill">${esc(g.skill)}</span></span><span class="sa-card-play">Play <span aria-hidden="true">→</span></span></a>`).join('')}</div></div>`;
  }).join('')}
 </section>
 <section class="wrap lesson-section" id="off-screen" aria-label="Off-screen sound play">
  <span class="eyebrow">TAKE IT OFF SCREEN</span>
  <h2>Sound play in the kitchen and the car.</h2>
  <div class="tc-hunt"><h3>I spy, with my little ear</h3><ul class="lesson-prompts"><li>\u201cI spy something that starts with sss\u2026\u201d — soap, sock, spoon. Ears only, no letters needed.</li><li>Swap roles and let your child be the spy.</li></ul></div>
  <div class="tc-hunt"><h3>Stretched-word soup</h3><ul class="lesson-prompts"><li>Say a word stretched out — \u201cmmmuuunnnch\u201d — and let your child squash it back together.</li><li>Silly voices welcome; the stretching is the point.</li></ul></div>
  <div class="tc-hunt"><h3>Rhyme sandwiches</h3><ul class="lesson-prompts"><li>Any rhyme pair becomes a sandwich: \u201ccat-hat sandwich, please!\u201d</li><li>Make the order, serve it, giggle, repeat.</li></ul></div>
  <p class="lesson-note">Phonics rewards tiny sessions. Five minutes of sound play, done warmly, beats thirty done tired.</p>
 </section>
 <section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2>
  <p class="lesson-copy">Phonics has one famous rule: sounds first, letter names second. The letter is \u201cem\u201d but the sound is \u201cmmm\u201d — and children who learn the sound first learn to read with less un-learning. Every game here plays real recordings of both words and pure sounds; press replay as often as needed, and say the sounds with your child so the ears have company.</p>
  <p class="lesson-copy">The printable worksheets are built to work without any audio: every sheet tells you exactly what to say and includes a grown-up answer line. <a href="${WS28_PATH}">Browse the phonics worksheets</a> and print the twin of whichever game your child loved.</p>
  <p class="lesson-copy"><a href="/about/#principal">More from the Principal’s Office <span aria-hidden="true">↗</span></a></p>
 </section>
 <section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>Wonderful listening!</h2>
  <p class="lesson-copy">One adventure or six, every careful listen is a real step toward reading. The shelves remember where you left off for your chosen child.</p>
  <div class="hero-actions"><a class="button" href="${PHONICS_LIB_PATH}">Play more Phonics Adventures <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="${WS28_PATH}">Print the phonics worksheets <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
 </section>`;
}

/* ---------- library + game pages ---------- */
export function phonicsLibraryBody(){
 return `${crumbNav([['Preschool','/preschool/'],['Phonics Adventures']])}
 ${heading('PHONICS ADVENTURES','Twenty-four listening games with real sound.','Hear a sound, find its pictures, rhyme, blend, swap and count — twenty-four real phonics games made from our own storybook artwork, every one with recorded audio, replay and a mute switch. No scores, no timers, nothing to install.')}
 <div class="lesson-start"><a class="button" href="${C28_PATH}">This way to Class 28 <span aria-hidden="true">→</span></a><span class="lesson-start-hint">The class that goes with these adventures: Phonics &amp; Beginning Sounds.</span></div>
 <section class="wrap section compact" data-ph-lib aria-label="All phonics adventures">
  <div class="sa-grid">
  ${phonicAdventures.map(g=>`<a class="sa-card" href="${PHONICS_LIB_PATH}${g.slug}/" data-ph-libcard="${g.slug}">
    <span class="sa-card-num" aria-hidden="true">${g.num}</span>
    <span class="sa-card-done" data-sa-done hidden>Cleared!</span>
    <img src="${PHONICS_BASE}${g.img}" width="800" height="568" alt="${esc(g.alt)}" loading="lazy">
    <span class="sa-card-body"><strong>${esc(g.title)}</strong><span class="sa-card-tag">${esc(g.tag)}</span><span class="sa-card-skill">${esc(g.skill)}</span></span>
    <span class="sa-card-play">Play <span aria-hidden="true">→</span></span>
  </a>`).join('')}
  </div>
  <p class="lesson-note">Every card is one real game with real sound. Progress is saved on this device for the child chosen in <a href="/my-classroom/">My Classroom</a>.</p>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>What each game practises.</h2>
  <p class="lesson-copy">The twenty-four adventures climb one slope: hearing first sounds (Sound Detective, Elephant\u2019s Bubbles, the Dragon\u2019s path), sorting and comparing them (Treasure Chests, the Owl\u2019s library, Raccoon\u2019s odd hunt), rhyming (Frog Hop, Ice Cream Shop), blending sounds into words (Robot Blender, Sloth\u2019s Slide, Dinosaur Train, Polar Bear Builder), locating sounds in words (Crocodile\u2019s endings, Submarine\u2019s positions, Muffin\u2019s and Monkey\u2019s middle vowels), counting sounds and syllables (Kangaroo, Firefly, Penguin), and finally swapping sounds to make new words (Unicorn, Mermaid, Bunny\u2019s word families).</p>
  <p class="lesson-copy">Say the sounds with your child — a clean \u201csss\u201d, a humming \u201cmmm\u201d — and let the recordings do the rest. Every worksheet twin prints without audio and tells you exactly what to say.</p>
  <p class="lesson-copy">The adventures belong to <a href="${C28_PATH}">Class 28 — Phonics &amp; Beginning Sounds</a> and live beside the other Age 4 collections: <a href="/preschool/shapes/adventures/">Shape Adventures</a>, <a href="/preschool/colors/adventures/">Colors &amp; Creativity</a> and <a href="/preschool/writing/adventures/">Writing Adventures</a>.</p>
 </section>`;
}

export function phonicAdventureBody(g){
 const prev=phonicAdventures[(g.num-2+24)%24];
 const next=phonicAdventures[g.num%24];
 const ws=WS28_PATH+g.slug+'/';
 const engineWrap=`<section class="wrap lesson-section" id="play" aria-label="Play ${esc(g.title)}">
  <span class="eyebrow">PLAY · ${esc(g.skill).toUpperCase()} · WITH SOUND</span>
  <h2>${esc(g.title)}</h2>
  <p class="lesson-copy">${esc(g.say)}</p>
  <div class="sa-board ph-board" data-ph-board data-ph-engine="${g.engine}" data-ph-game="${g.slug}">
   <div class="ph-audio-bar"><button type="button" class="tool-btn" data-ph-mute aria-pressed="false">Sound: on</button><button type="button" class="tool-btn" data-ph-replay hidden>Play again</button><span class="ph-progress" data-ph-progress aria-live="polite"></span></div>
   ${phonicBoard(g)}
   ${celebrate(g.doneTitle,g.doneSub)}
  </div>
  <noscript><p class="sa-noscript">The tapping game needs JavaScript. Everything else on this page works without it — and the <a href="${ws}">matching worksheet</a> brings this adventure to paper.</p></noscript>
  <p class="sa-progress-note" data-sa-progress aria-live="polite"></p>
 </section>`;
 return `${crumbNav([['Preschool','/preschool/'],['Phonics Adventures',PHONICS_LIB_PATH],[g.num+'. '+g.title]])}
 <article class="wrap lesson-hero sa-hero">
  <div class="sa-hero-art"><img src="${PHONICS_BASE}${g.img}" width="800" height="568" alt="${esc(g.alt)}" fetchpriority="high"></div>
  <div class="lesson-hero-copy">
   <span class="eyebrow">PHONICS ADVENTURE ${g.num} OF 24</span>
   <h1>${esc(g.h1||g.title)}</h1>
   <div class="fc-chips lesson-chips"><span><strong>Age</strong> 4–5 Years</span><span><strong>Class</strong> 28 · Phonics</span><span><strong>Skill</strong> ${esc(g.skill)}</span></div>
   <p class="lesson-lede">${esc(g.tag)}</p>
   <div class="lesson-start"><a class="button" href="#play">Play with sound <span aria-hidden="true">↓</span></a><a class="button button-ghost" href="${ws}">Print the worksheet <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Works with a finger, a stylus, or a mouse. Sound plays from the page.</span></div>
  </div>
 </article>
 ${engineWrap}
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>Why this adventure helps.</h2>
  <p class="lesson-copy">${esc(g.parentNote||('This game trains '+g.skill.toLowerCase()+' with real recorded audio and generous feedback. A miss is met with a hint and a replay button, never a penalty — the habit being built is listening again, not being right first time. The sounds are played as pure sounds (sss, not \u201csuh\u201d), which is exactly how reading research says to teach them.'))}</p>
  <p class="lesson-copy">Prefer paper? The <a href="${ws}">${esc(g.title)} worksheet</a> brings the same activity to the kitchen table with a parent-read sound script and an answer line — printing a worksheet never marks a class complete.</p>
 </section>
 <nav class="wrap lesson-section sa-prevnext" aria-label="More phonics adventures">
  <a class="sa-navcard" href="${PHONICS_LIB_PATH}${prev.slug}/"><span class="eyebrow">Previous</span><strong>${esc(prev.title)}</strong></a>
  <a class="sa-navcard" href="${PHONICS_LIB_PATH}"><span class="eyebrow">All adventures</span><strong>Phonics Library</strong></a>
  <a class="sa-navcard" href="${PHONICS_LIB_PATH}${next.slug}/"><span class="eyebrow">Next</span><strong>${esc(next.title)}</strong></a>
 </nav>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP GOING</span><h2>Where next?</h2>
  <div class="fc-stages">
   <a class="fc-stage lesson-card-link" href="${C28_PATH}"><div class="fc-stage-pills"><span class="fc-age">Age 4–5</span><span class="fc-class">Class 28</span></div><h3>Phonics &amp; Beginning Sounds</h3><p>The class behind these adventures — with all 24 listening games and the off-screen sound play ideas.</p><span class="fc-open">Open Class 28 <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="${ws}"><div class="fc-stage-pills"><span class="fc-age">Age 4–5</span><span class="fc-class">Worksheet</span></div><h3>${esc(g.title)} worksheet</h3><p>The printable twin of this game — parent sound script, answer line, free PDF.</p><span class="fc-open">Open the worksheet <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/preschool/writing/adventures/"><div class="fc-stage-pills"><span class="fc-age">Age 4</span><span class="fc-class">Class 27</span></div><h3>Early Writing Adventures</h3><p>Trace winding paths, loops and zigzags with a finger or stylus — thirty pencil-control games.</p><span class="fc-open">Open the Writing Library <span aria-hidden="true">↗</span></span></a>
  </div>
 </section>`;
}
