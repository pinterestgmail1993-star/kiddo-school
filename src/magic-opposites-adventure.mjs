// Kiddo School — Magic Opposites Finder (Age 3 interactive game).
// /preschool/3-years/magic-opposites-adventure/ — built on the seven
// owner-uploaded transparent WebP illustrations in
// school/interactive-activities/magic-opposites-adventure-age-3/ (all
// probed 1080×1080). Six opposites, each a REAL transformation, not a
// static picture: the ball grows and shrinks, the two trees are tapped as
// tall and short, the pencil lengthens and shortens, the glass fills and
// empties (its outline always visible), the hot soup steams while the cold
// soup does not, and the door swings open and closed. Two files carry the
// game banner inside the artwork (01-red-ball, 06-blue-door), so those
// objects are shown through overflow-crop windows that cut to the object
// itself — same files, true proportions, nothing distorted. Tap choices
// run on the shared find-it engine; toggles, speech and the door swing run
// in magic-opposites-adventure.js as progressive enhancement — without
// JavaScript every station renders as an honest word-pair chart with the
// pictures in their base states. No scores, no timers, no streaks, no
// download buttons.
const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const P='school/interactive-activities/magic-opposites-adventure-age-3/';
const W=1080,H=1080;

/* Content crop windows (measured from the real files' alpha channels):
   the ball sits below its two banner arcs, the door below its banner, the
   soup bowl below its steam, the glass fills its file edge to edge. Regions
   keep the original aspect — the image is slid, never stretched. */
const BALL={file:'01-red-ball.webp',x:276,y:472,w:512,h:518,alt:'A shiny red ball'};
const TREE='02-green-tree.webp';
const PENCIL='03-yellow-pencil.webp';
/* Glass and hot-soup regions measured from each file's alpha channel the same
   way as ball/door/soup — the glass object fills x 212-865, y 133-946; the
   steaming bowl (steam + bowl) fills x 173-906, y 136-929. */
const GLASS={file:'04-clear-glass.webp',x:212,y:133,w:654,h:814,alt:'A clear glass with a dark outline'};
const SOUP={file:'05-soup-bowl.webp',x:173,y:470,w:734,h:460,alt:'A blue bowl of soup'};
const HOTSOUP={file:'05-soup-bowl.webp',x:173,y:136,w:734,h:794,alt:'A steaming blue bowl of soup'};
const DOOR={file:'06-blue-door.webp',x:277,y:300,w:524,h:731,alt:'A blue arched door with a round golden handle'};

const cropBox=(r,cls='',inner='')=>`<span class="oa-crop ${cls}" style="aspect-ratio:${r.w}/${r.h}"><img src="${R2+P}${r.file}" width="${W}" height="${H}" alt="${r.alt||''}" aria-hidden="true" loading="lazy" style="width:${(1080/r.w*100).toFixed(3)}%;left:${(-(r.x/r.w)*100).toFixed(3)}%;top:${(-(r.y/r.h)*100).toFixed(3)}%">${inner}</span>`;
const ball=(cls='')=>cropBox(BALL,'oa-ball '+cls);
const glass=(cls='',withWater=false)=>cropBox(GLASS,'oa-glass '+cls,withWater?'<span class="oa-water" aria-hidden="true"></span>':'');
const soupHot=(cls='')=>cropBox(HOTSOUP,'oa-souphold '+cls);
const soupCold=(cls='')=>cropBox(SOUP,'oa-souphold '+cls);
const door=(cls='')=>`<span class="oa-doorhold ${cls}"><span class="oa-room" aria-hidden="true"></span><span class="oa-doorleaf">${cropBox(DOOR)}</span></span>`;
const treeImg=(cls='',label='')=>`<span class="oa-tree ${cls}"><img src="${R2+P}${TREE}" width="${W}" height="${H}" alt="${label||'A leafy green tree'}" aria-hidden="true" loading="lazy"></span>`;
const pencilImg=(cls='')=>`<span class="oa-pencil ${cls}"><img src="${R2+P}${PENCIL}" width="${W}" height="${H}" alt="A yellow pencil with a pink eraser" aria-hidden="true" loading="lazy"></span>`;

export const magicOpposites={
 path:'/preschool/3-years/magic-opposites-adventure/',
 seoTitle:'Magic Opposites Finder — an Opposites Game for 3 Year Olds',
 h1:'Magic Opposites Finder',
 description:'Big and small, tall and short, long and short, full and empty, hot and cold, open and closed: six opposites your 3-year-old can really make happen — grow the ball, fill the glass, open the door — with matching challenges and off-screen play.',
 eyebrow:'PRESCHOOL · AGE 3 · CLASS 5 MAGIC GAME',
 crumbs:[['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Opposites & Comparing','/preschool/3-years/opposites-and-comparing/'],['Magic Opposites Finder',null]],
 ogImage:R2+P+'07-magic-opposites-adventure-cover.webp',
 ogAlt:'Cover of the Magic Opposites Finder game: a ball, a tree, a pencil, a glass, a soup bowl and a door',
 classPath:'/preschool/3-years/opposites-and-comparing/',
 classTitle:'Opposites &amp; Comparing'
};

export function magicOppositesBody(G){
 const hero=`<section class="wrap section compact">
  <span class="eyebrow">${G.eyebrow}</span>
  <h1>${G.h1}</h1>
  <p class="mw-lede">Six opposites, and you make them happen: grow the ball big and shrink it small, tap the tall tree and the short one, stretch the pencil, fill the glass and empty it, find the hot soup and the cold one, and swing the door open and closed. Grown-ups read the words; little ones do the magic.</p>
  <div class="mg-game" data-mg-game="opposites-adventure">
   <p class="mg-live" data-mg-live aria-live="polite"></p>
   <div class="mg-screens">`;

 const welcome=`<section class="mg-screen" data-mg-screen="welcome" aria-label="Welcome to the Magic Opposites Finder">
   <figure class="mg-cover"><img src="${R2+P}07-magic-opposites-adventure-cover.webp" width="${W}" height="${H}" alt="The Magic Opposites Finder cover: a ball, a tree, a pencil, a glass, a soup bowl and a door" fetchpriority="high"><figcaption class="fc-hint">Welcome, opposite explorer!</figcaption></figure>
   <div class="mg-actions" style="justify-content:center"><button type="button" class="button" data-mg-go="bigsmall">Start the Adventure <span aria-hidden="true">↗</span></button></div>
   <p class="mg-hint" style="text-align:center">No scores, no timers — just opposites.</p>
  </section>`;

 const bigsmall=`<section class="mg-screen" data-mg-screen="bigsmall" aria-label="Big and small">
   <span class="eyebrow">OPPOSITE 1 · BIG / SMALL</span>
   <h2>Make the ball big — and small.</h2>
   <p class="lesson-copy">Tap the buttons and watch the ball change. Say the words out loud: big… small!</p>
   <div class="oa-stage" data-oa-toggle="ball">
    <div class="oa-scene oa-ballscene">${ball('is-mid')}</div>
    <p class="oa-word" data-oa-word aria-live="polite">A ball, waiting to grow.</p>
    <div class="mg-actions" style="justify-content:center">
     <button type="button" class="button" data-oa-set="big">Make it BIG <span aria-hidden="true">⤢</span></button>
     <button type="button" class="button button-ghost" data-oa-set="small">Make it small <span aria-hidden="true">⤡</span></button>
    </div>
   </div>
   <div class="mg-next"><button type="button" class="button" data-mg-go="tallshort">Tall / Short <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const tallshort=`<section class="mg-screen" data-mg-screen="tallshort" aria-label="Tall and short" data-tc-correct="You found it!|That is the one!|Great looking!" data-tc-incorrect="Look again together — which one reaches up higher?">
   <span class="eyebrow">OPPOSITE 2 · TALL / SHORT</span>
   <h2>Two trees — one tall, one short.</h2>
   <p class="lesson-copy">Look at the two trees below, then answer with a tap. Which one is tall? Which one is short?</p>
   <div class="tc-round" data-tc-round data-tc-ask="Tap the TALL tree!">
<p class="tc-ask">Tap the <strong>TALL</strong> tree!</p>
<div class="tc-choices" role="group" aria-label="Tap the TALL tree.">${[1,0].map(t=>treeImg(t?'is-tall':'is-short',t?'A tall tree':'A short tree')).map((h,i)=>`<button type="button" class="tc-choice oa-treec" aria-label="${i===0?'The tall tree':'The short tree'}"${i===0?' data-tc-correct="true"':''}>${h}</button>`).join('')}</div>
<p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p>
   </div>
   <div class="tc-round" data-tc-round data-tc-ask="Tap the SHORT tree!">
<p class="tc-ask">Tap the <strong>SHORT</strong> tree!</p>
<div class="tc-choices" role="group" aria-label="Tap the SHORT tree.">${[1,0].map(t=>treeImg(t?'is-tall':'is-short',t?'A tall tree':'A short tree')).map((h,i)=>`<button type="button" class="tc-choice oa-treec" aria-label="${i===0?'The short tree':'The tall tree'}"${i===1?' data-tc-correct="true"':''}>${h}</button>`).join('')}</div>
<p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p>
   </div>
   <div class="mg-next"><button type="button" class="button" data-mg-go="longshort">Long / Short <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const longshort=`<section class="mg-screen" data-mg-screen="longshort" aria-label="Long and short">
   <span class="eyebrow">OPPOSITE 3 · LONG / SHORT</span>
   <h2>Stretch the pencil — and shrink it.</h2>
   <p class="lesson-copy">Tap the buttons to change the pencil&rsquo;s length. Say it together: long… short!</p>
   <div class="oa-stage" data-oa-toggle="pencil">
    <div class="oa-scene oa-pencilscene">${pencilImg('is-long')}</div>
    <p class="oa-word" data-oa-word aria-live="polite">A pencil, ready to stretch.</p>
    <div class="mg-actions" style="justify-content:center">
     <button type="button" class="button" data-oa-set="long">Make it LONG <span aria-hidden="true">↕</span></button>
     <button type="button" class="button button-ghost" data-oa-set="short">Make it short <span aria-hidden="true">↕</span></button>
    </div>
   </div>
   <div class="mg-next"><button type="button" class="button" data-mg-go="fullempty">Full / Empty <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const fullempty=`<section class="mg-screen" data-mg-screen="fullempty" aria-label="Full and empty">
   <span class="eyebrow">OPPOSITE 4 · FULL / EMPTY</span>
   <h2>Fill the glass — and empty it.</h2>
   <p class="lesson-copy">Tap the buttons to pour the water in and out. Watch the outline of the glass — it never changes!</p>
   <div class="oa-stage" data-oa-toggle="glass">
    <div class="oa-scene oa-glassscene">${glass('is-empty',true)}</div>
    <p class="oa-word" data-oa-word aria-live="polite">An empty glass, ready to fill.</p>
    <div class="mg-actions" style="justify-content:center">
     <button type="button" class="button" data-oa-set="full">Fill the glass <span aria-hidden="true">↓</span></button>
     <button type="button" class="button button-ghost" data-oa-set="empty">Empty the glass <span aria-hidden="true">↑</span></button>
    </div>
   </div>
   <div class="mg-next"><button type="button" class="button" data-mg-go="hotcold">Hot / Cold <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const hotcold=`<section class="mg-screen" data-mg-screen="hotcold" aria-label="Hot and cold" data-tc-correct="You found it!|That is the one!|Great looking!" data-tc-incorrect="Look again together — the hot soup is the steaming one.">
   <span class="eyebrow">OPPOSITE 5 · HOT / COLD</span>
   <h2>One soup is hot, one is cold.</h2>
   <p class="lesson-copy">The wavy lines above the bowl are steam — that is how we know soup is HOT. Tap the bowl I ask for.</p>
   <div class="tc-round" data-tc-round data-tc-ask="Tap the HOT soup!">
<p class="tc-ask">Tap the <strong>HOT</strong> soup! (Look for the steam!)</p>
<div class="tc-choices" role="group" aria-label="Tap the HOT soup.">${[1,0].map(h=>h?soupHot('is-hot'):soupCold('is-cold')).map((b,i)=>`<button type="button" class="tc-choice oa-soupc" aria-label="${i===0?'The hot soup with steam':'The cold soup'}"${i===0?' data-tc-correct="true"':''}>${b}</button>`).join('')}</div>
<p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p>
   </div>
   <div class="tc-round" data-tc-round data-tc-ask="Tap the COLD soup!">
<p class="tc-ask">Tap the <strong>COLD</strong> soup! (No steam!)</p>
<div class="tc-choices" role="group" aria-label="Tap the COLD soup.">${[1,0].map(h=>h?soupHot('is-hot'):soupCold('is-cold')).map((b,i)=>`<button type="button" class="tc-choice oa-soupc" aria-label="${i===0?'The cold soup':'The hot soup with steam'}"${i===1?' data-tc-correct="true"':''}>${b}</button>`).join('')}</div>
<p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p>
   </div>
   <p class="mg-hint">Real soup is hot enough to hurt — tasting is always a grown-up&rsquo;s job. Blow first, like this: fffff!</p>
   <div class="mg-next"><button type="button" class="button" data-mg-go="openclosed">Open / Closed <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const openclosed=`<section class="mg-screen" data-mg-screen="openclosed" aria-label="Open and closed">
   <span class="eyebrow">OPPOSITE 6 · OPEN / CLOSED</span>
   <h2>Open the door — and close it.</h2>
   <p class="lesson-copy">Tap the buttons to swing the door. What do you see when it opens? A cozy room!</p>
   <div class="oa-stage" data-oa-toggle="door">
    <div class="oa-scene oa-doorscene">${door('is-closed')}</div>
    <p class="oa-word" data-oa-word aria-live="polite">A closed door. Knock knock!</p>
    <div class="mg-actions" style="justify-content:center">
     <button type="button" class="button" data-oa-set="open">Open the door <span aria-hidden="true">⇥</span></button>
     <button type="button" class="button button-ghost" data-oa-set="closed">Close the door <span aria-hidden="true">⇤</span></button>
    </div>
   </div>
   <div class="mg-next"><button type="button" class="button" data-mg-go="match">The Opposite Challenge <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const matchWord=[
  {word:'BIG',ask:'Tap the <strong>SMALL</strong> ball!',correct:'small',choices:['big','small'],render:s=>ball(s==='big'?'is-big':'is-small'),label:s=>s==='big'?'The big ball':'The small ball'},
  {word:'TALL',ask:'Tap the <strong>SHORT</strong> tree!',correct:'short',choices:['tall','short'],render:s=>treeImg(s==='tall'?'is-tall':'is-short'),label:s=>s==='tall'?'The tall tree':'The short tree'},
  {word:'LONG',ask:'Tap the <strong>SHORT</strong> pencil!',correct:'short',choices:['long','short'],render:s=>pencilImg(s==='long'?'is-long':'is-short'),label:s=>s==='long'?'The long pencil':'The short pencil'},
  {word:'FULL',ask:'Tap the <strong>EMPTY</strong> glass!',correct:'empty',choices:['full','empty'],render:s=>glass(s==='full'?'is-full':'is-empty',s==='full'),label:s=>s==='full'?'The full glass':'The empty glass'},
  {word:'HOT',ask:'Tap the <strong>COLD</strong> soup!',correct:'cold',choices:['hot','cold'],render:s=>s==='hot'?soupHot('is-hot'):soupCold('is-cold'),label:s=>s==='hot'?'The hot soup with steam':'The cold soup'},
  {word:'OPEN',ask:'Tap the <strong>CLOSED</strong> door!',correct:'closed',choices:['open','closed'],render:s=>door(s==='open'?'is-open':'is-closed'),label:s=>s==='open'?'The open door':'The closed door'}
 ];
 const match=`<section class="mg-screen" data-mg-screen="match" aria-label="The opposite challenge" data-tc-correct="That is the opposite!|Perfect match!|You know your opposites!" data-tc-incorrect="Not quite — the opposite of that word. Try the other one!">
   <span class="eyebrow">THE OPPOSITE CHALLENGE</span>
   <h2>Show me the opposite!</h2>
   <p class="lesson-copy">Read the big word, then tap its opposite. Say both words together — big, small!</p>
   ${matchWord.map(m=>`<div class="tc-round" data-tc-round data-tc-ask="The word is ${m.word} — tap the opposite!">
<p class="tc-ask">The word is <span class="oa-numchip">${m.word}</span> — tap the opposite!</p>
<div class="tc-choices" role="group" aria-label="The word is ${m.word}. Tap the opposite.">${m.choices.map(s=>`<button type="button" class="tc-choice oa-matchc" aria-label="${m.label(s)}"${s===m.correct?' data-tc-correct="true"':''}>${m.render(s)}</button>`).join('')}</div>
<p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p>
</div>`).join('')}
   <div class="mg-next"><button type="button" class="button" data-mg-go="offscreen">Off-Screen Play <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const offscreen=`<section class="mg-screen" data-mg-screen="offscreen" aria-label="Off-screen opposites play">
   <span class="eyebrow">OFF-SCREEN PLAY</span>
   <h2>Opposites live in your house.</h2>
   <p class="lesson-copy">The adventure continues away from the screen. Pick one of these — five minutes is plenty.</p>
   <div class="tc-hunt"><h3>Big and small basket</h3><ul class="lesson-prompts"><li>Collect two baskets: find things that are big and things that are small. Let your child argue the tricky ones — “is this spoon big or small?” is a real debate.</li></ul></div>
   <div class="tc-hunt"><h3>Fill and pour</h3><ul class="lesson-prompts"><li>At the sink or in the bath, fill a cup and empty it, fill it and empty it — saying full and empty every time. A towel nearby makes this even more relaxed.</li></ul></div>
   <div class="tc-hunt"><h3>Open, shut them</h3><ul class="lesson-prompts"><li>Walk through the house opening and closing real doors and cupboard doors — gently, with you leading. Say open… closed… open… closed. (Fingers stay away from hinges!)</li></ul></div>
   <p class="lesson-note"><strong>One gentle word:</strong> hot and cold is best learned at the tap — warm water and cool water on little hands, always tested with you and never hot enough to hurt.</p>
   <div class="mg-next"><button type="button" class="button" data-mg-go="complete">Finish the Magic <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const complete=`<section class="mg-screen" data-mg-screen="complete" aria-label="Activity complete">
   <span class="eyebrow">ACTIVITY COMPLETE</span>
   <h2>Six opposites, all yours!</h2>
   <p class="lesson-copy">You made the ball big and small, told the tall tree from the short one, stretched the pencil, filled and emptied the glass, found the hot and cold soup and swung the door open and closed. Whether you tried one opposite or all six, that was real comparing — and there was never a score to worry about.</p>
   <div class="mg-actions"><button type="button" class="button" data-mg-replay>Play Again <span aria-hidden="true">↺</span></button><a class="button button-ghost" href="${G.classPath}">Back to Opposites &amp; Comparing <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
   <div class="lesson-path">
    <a class="fc-stage lesson-card-link" href="${G.classPath}"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Class 5</span></div><h3>Opposites &amp; Comparing</h3><p>The full class: twelve opposite cards, a tap-the-opposite game and a matching board.</p><span class="fc-open">Open this class <span aria-hidden="true">↗</span></span></a>
    <a class="fc-stage lesson-card-link" href="/preschool/3-years/"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Magic games</span></div><h3>More magic games</h3><p>Try Magic Counting Garden, Magic Fruit Basket or Look & Draw — Magic Shapes — every Age 3 game lives on the stage shelf.</p><span class="fc-open">Choose another game <span aria-hidden="true">↗</span></span></a>
   </div>
  </section>`;

 return `${hero}
${welcome}
${bigsmall}
${tallshort}
${longshort}
${fullempty}
${hotcold}
${openclosed}
${match}
${offscreen}
${complete}
   </div>
   <noscript><p class="fc-hint">No JavaScript? Every opposite is here as a word-pair chart with the pictures in their resting states — say the pairs aloud together, act them out with your hands (arms wide for big, tucked in for small), and play the off-screen hunts below. The growing, filling and door-swinging need JavaScript.</p></noscript>
  </div>
 </section>
 <section class="wrap lesson-section" id="for-grown-ups" aria-label="About this game">
  <span class="eyebrow">FOR GROWN-UPS</span>
  <h2>Why opposites work best when children make them happen.</h2>
  <p class="lesson-copy">An opposite understood is a comparison made — and at three, comparisons stick when the child causes them. So nothing in this game is a static picture: the ball really changes size, the glass really fills and empties, the door really swings. Every change is paired with its word, spoken and written, so the vocabulary lands with the action it describes. The tap-the-answer rounds (trees, soups and the final challenge) ask your child to judge which one fits the word — comparing, not just naming.</p>
  <p class="lesson-copy">Two of the illustrations carry the game&rsquo;s title inside the artwork, so the ball and the door are shown through a quiet window that crops to just the object — the files themselves are untouched. The soup rounds come with a built-in safety line: hot means grown-up-tested, blow-first hot. And if motion is a concern, Calm Mode or your device&rsquo;s reduced-motion setting stills every animation while the words and games keep working.</p>
  <p class="lesson-note">The off-screen fill-and-pour game is quietly the most valuable five minutes in this whole adventure — water teaches opposites better than any screen ever will.</p>
 </section>`;
}
