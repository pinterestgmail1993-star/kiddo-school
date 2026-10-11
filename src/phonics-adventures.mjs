// Kiddo School — Phonics & Beginning Sounds (Class 28).
// Twenty-four draw-on-the-picture adventures at
// /preschool/phonics/adventures/{slug}/, built on the owner's Canva
// illustrations (all verified on R2 under school/phonics/adventures/).
// The owner's spec, followed exactly: the original Canva artwork sits on
// the LEFT with the transparent Write & Color drawing layer laid directly
// over it (aligned 1:1 at every screen size), and plain TEXT instructions
// plus the drawing tools sit on the RIGHT. No coded scenes, NO SOUND, no
// scoring, no fake games. Completion counts only when the child's own
// work is really saved, and the phonics band keeps its existing
// {opened,completed} localStorage shape, so nothing already earned is lost.
import {R2,crumbNav,heading,esc} from './adventure-kit.mjs';
/* place() returns primitive objects — the board template needs SVG strings */

export const PHONICS_BASE=R2+'school/phonics/adventures/';
export const PHONICS_LIB_PATH='/preschool/phonics/adventures/';
export const C28_PATH='/preschool/4-years/phonics-and-beginning-sounds/';
export const WS28_PATH='/worksheets/phonics/';

import {imageActivitySection} from './image-activity.mjs';
import {artFor} from './adventure-dims.mjs';

/* ---------- the 24 adventures ---------- */
const G=(o)=>o;
export const phonicAdventures=[
 G({num:1,slug:'sound-detective',img:'sound-detective.webp',title:'Sound Detective',engine:'listen',
   tag: 'Say the sound, then circle every picture that starts with it.',skill:'Beginning sounds',
   say: 'Look at the letter in the bubble, say its sound, then circle every picture that starts with it.',
   hint:'That one starts with the sound!',doneTitle:'Case closed!',doneSub:'You found every picture with the secret sound. Detective ears!',
   alt:'A detective fox with a magnifying glass beside pictures of a sun, a sock, a cat and a dog.',
   rounds:[
    {say:'Which pictures start with sss…?',audio:'s',choices:[{pic:'sun',ok:true},{pic:'sock',ok:true},{pic:'cat',ok:false},{pic:'dog',ok:false}]},
    {say:'A new sound for round two…',audio:'m',choices:[{pic:'nut',ok:false},{pic:'map',ok:true},{pic:'mop',ok:true}]}
   ]}),
 G({num:2,slug:'treasure-chest-sounds',img:'treasure-chest-sounds.webp',title:'Treasure Chest Sounds',engine:'sort',
   tag: 'Say each word, then draw a line to the chest with the same first sound.',skill:'Sound sorting',
   say: 'Say each picture’s word out loud, then draw a line from the card to the chest that matches its first sound.',
   hint:'In the chest it goes!',doneTitle:'All treasures sorted!',doneSub:'Every card went to the chest that matches its sound.',
   alt:'Two treasure chests waiting for picture cards to be sorted by their beginning sound.',
   roundSay:'Tap a card, then tap its chest.',
   items:[{icon:'ball',word:'ball',bin:'b'},{icon:'banana',word:'banana',bin:'b'},{icon:'boat',word:'boat',bin:'b'},{icon:'moon',word:'moon',bin:'m'},{icon:'mouse',word:'mouse',bin:'m'},{icon:'mitten',word:'mitten',bin:'m'}],
   bins:[{key:'b',label:'The "b" chest',icon:'ball'},{key:'m',label:'The "m" chest',icon:'moon'}]}),
 G({num:3,slug:'rhyming-frog-hop',img:'rhyming-frog-hop.webp',title:'Rhyming Frog Hop',engine:'match',
   tag: 'Draw a line from each picture to the picture that rhymes with it.',skill:'Rhyming',
   say: 'Say each word out loud. When two words end the same, draw a line to hop between them — ribbit!',
   hint:'Those two rhyme!',doneTitle:'Every frog found its lily pad!',doneSub:'You matched all the rhyming pairs.',
   alt:'Frogs on lily pads with pictures of a cat, a hat, a dog and a log.',
   roundSay:'Tap two pictures that rhyme.',
   pairs:[{a:'cat',b:'hat',m:'at'},{a:'dog',b:'frog',m:'og'},{a:'fox',b:'box',m:'ox'}]}),
 G({num:4,slug:'robot-sound-blender',img:'robot-sound-blender.webp',title:'Robot Sound Blender',engine:'blend',
   tag: 'Write the letters, then read the word like a robot: c…a…t…',skill:'Blending',
   say: 'Write the letters in the boxes to build each word, then say the word like a robot: c…a…t… cat!',
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
   tag: 'Say the bubble sound, then circle every picture that starts with it.',skill:'Beginning sounds',
   say: 'Say the sound in the bubble, then circle every picture whose word starts with it.',
   hint:'Into the bubble it goes!',doneTitle:'Both bubbles are full!',doneSub:'You found every picture for both sounds.',
   alt:'A friendly elephant blowing sound bubbles beside rows of small pictures.',
   rounds:[
    {say:'The elephant holds a ball. Which bubble matches its first sound?',audio:'b',choices:[{pic:'ball',ok:true},{pic:'hat',ok:false},{pic:'sun',ok:false}]},
    {say:'Listen for mmm…',audio:'m',choices:[{pic:'moon',ok:true},{pic:'mouse',ok:true},{pic:'sun',ok:false}]}
   ]}),
 G({num:7,slug:'pirates-missing-sound',img:'pirates-missing-sound.webp',title:'Pirate\u2019s Missing Sound',engine:'letter',
   tag: 'Write the missing first letter for each picture word.',skill:'First letter sounds',
   say: 'Say the picture word. Its first sound is missing — write the letter that makes it right.',
   hint:'Arr, that\u2019s the stolen letter!',doneTitle:'Every letter recovered!',doneSub:'The pirate returned all the stolen letters. Words ahoy!',
   alt:'A pirate parrot beside words with missing first letters and picture clues.',
   rounds:[
    {say:'_at — say the picture word. Which first letter was stolen?',pic:'cat',audioLabel:'Play "cat"',audio:'cat',choices:[{letter:'c',ok:true},{letter:'h',ok:false},{letter:'d',ok:false}]},
    {say:'_un — which letter starts this word?',pic:'sun',audioLabel:'Play "sun"',audio:'sun',choices:[{letter:'t',ok:false},{letter:'s',ok:true},{letter:'m',ok:false}]},
    {say:'_og — fetch the right letter!',pic:'dog',audioLabel:'Play "dog"',audio:'dog',choices:[{letter:'b',ok:false},{letter:'g',ok:false},{letter:'d',ok:true}]}
   ]}),
 G({num:8,slug:'ice-cream-rhyme-shop',img:'ice-cream-rhyme-shop.webp',title:'Ice Cream Rhyme Shop',engine:'match',
   tag: 'Draw a line to match each picture to its rhyming partner.',skill:'Rhyming',
   say: 'Two things rhyme when they end the same. Draw a line from each picture to its rhyming partner and serve it up!',
   hint:'One rhyme sundae, coming up!',doneTitle:'The shop is sold out!',doneSub:'Every rhyme order served. Sweet listening!',
   alt:'An ice cream shop counter with rhyming picture pairs waiting to be matched.',
   roundSay:'Tap two pictures that rhyme.',
   pairs:[{a:'cat',b:'hat',m:'at'},{a:'fox',b:'box',m:'ox'},{a:'bee',b:'tree',m:'ee'}]}),
 G({num:9,slug:'crocodile-sound-chomper',img:'crocodile-sound-chomper.webp',title:'Crocodile Sound Chomper',engine:'letter',
   tag: 'Circle the letter each picture word ends with.',skill:'Ending sounds',
   say: 'Say the word slowly and catch its very last sound. Circle the letter that makes it.',
   hint:'CHOMP! That\u2019s the ending sound.',doneTitle:'Every ending chomped!',doneSub:'You caught the last sound of every word.',
   alt:'A smiling crocodile beside words waiting for their ending sounds to be chomped.',
   rounds:[
    {say:'cat — what does it END with?',pic:'cat',audioLabel:'Play "cat"',audio:'cat',choices:[{letter:'t',ok:true},{letter:'m',ok:false},{letter:'g',ok:false}]},
    {say:'dog — catch the ending!',pic:'dog',audioLabel:'Play "dog"',audio:'dog',choices:[{letter:'d',ok:false},{letter:'g',ok:true},{letter:'p',ok:false}]},
    {say:'sun — last sound coming up…',pic:'sun',audioLabel:'Play "sun"',audio:'sun',choices:[{letter:'s',ok:false},{letter:'n',ok:true},{letter:'u',ok:false}]}
   ]}),
 G({num:10,slug:'kangaroo-sound-jumps',img:'kangaroo-sound-jumps.webp',title:'Kangaroo Sound Jumps',engine:'counters',
   tag: 'Color one circle for every sound in each word.',skill:'Sound counting (phonemes)',
   say: 'Say each word slowly and color one circle for every sound you hear. Then count them!',
   hint:'One color per sound!',doneTitle:'Every jump counted!',doneSub:'You can hear the sounds inside words — the deepest listening skill of all.',
   alt:'A kangaroo beside words with jump circles waiting to be counted.',
   max:3,
   rows:[{icon:'sun',word:'sun',hint:'s…u…n — how many sounds?',n:3},{icon:'cat',word:'cat',hint:'c…a…t — how many sounds?',n:3},{icon:'fish',word:'fish',hint:'f…i…sh — how many sounds?',n:3}]}),
 G({num:11,slug:'muffin-middle-sounds',img:'muffin-middle-sounds.webp',title:'Muffin Middle Sounds',engine:'letter',
   tag: 'The middle vowel is missing from every muffin word! Write the vowel that fits.',skill:'Middle vowel sounds',
   say: 'Stretch the word out loud — cuuup — and listen for the sound in the middle. Write that vowel in the box.',
   hint:'That vowel fits perfectly!',doneTitle:'All muffins complete!',doneSub:'You found every missing middle vowel. Stretchy listening!',
   alt:'Muffin words with missing middle vowels beside a bank of the five vowels.',
   rounds:[
    {say:'c_t — stretch it: caaat. Which vowel fits the middle?',pic:'cat',audioLabel:'Play "cat"',audio:'cat',choices:[{letter:'i',ok:false},{letter:'a',ok:true},{letter:'e',ok:false}]},
    {say:'h_n — cluck cluck! Which vowel?',pic:'hen',audioLabel:'Play "hen"',audio:'hen',choices:[{letter:'a',ok:false},{letter:'e',ok:true},{letter:'o',ok:false}]},
    {say:'d_g — woof! Which vowel?',pic:'dog',audioLabel:'Play "dog"',audio:'dog',choices:[{letter:'e',ok:false},{letter:'o',ok:true},{letter:'a',ok:false}]},
    {say:'s_n — sunny day! Which vowel?',pic:'sun',audioLabel:'Play "sun"',audio:'sun',choices:[{letter:'i',ok:false},{letter:'e',ok:false},{letter:'u',ok:true}]}
   ]}),
 G({num:12,slug:'owls-sound-sorting-library',img:'owls-sound-sorting-library.webp',title:'Owl\u2019s Sound Sorting Library',engine:'sort',
   tag: 'Draw a line from each card to its sound shelf.',skill:'Sound sorting',
   say: 'Say each picture’s word, then draw a line from the card to the shelf whose sound it starts with.',
   hint:'On the shelf it goes!',doneTitle:'The library is sorted!',doneSub:'Every card on the right shelf. Wise work!',
   alt:'An owl librarian beside two shelves waiting for picture cards sorted by first sound.',
   roundSay:'Tap a card, then tap its shelf.',
   items:[{icon:'moon',word:'moon',bin:'m'},{icon:'mop',word:'mop',bin:'m'},{icon:'sun',word:'sun',bin:'s'},{icon:'sock',word:'sock',bin:'s'},{icon:'tent',word:'tent',bin:'t'},{icon:'top',word:'top',bin:'t'}],
   bins:[{key:'m',label:'The "m" shelf',icon:'moon'},{key:'s',label:'The "s" shelf',icon:'sun'},{key:'t',label:'The "t" shelf',icon:'tent'}]}),
 G({num:13,slug:'penguin-syllable-drums',img:'penguin-syllable-drums.webp',title:'Penguin Syllable Drums',engine:'counters',
   tag: 'Drum the beats inside words: color a drum for every syllable you hear.',skill:'Syllables',
   say: 'Say each word and clap it with the penguin — one clap per syllable. Color one drum for every syllable you hear.',
   hint:'Feel the beat!',doneTitle:'A perfect rhythm!',doneSub:'You drummed every syllable. Feel that beat!',
   alt:'A penguin drummer beside words and drum circles waiting to be tapped.',
   max:3,
   rows:[{icon:'cat',word:'cat',hint:'one beat: cat',n:1},{icon:'apple',word:'apple',hint:'two beats: ap-ple',n:2},{icon:'banana',word:'banana',hint:'three beats: ba-na-na',n:3},{icon:'elephant',word:'elephant',hint:'three beats: el-e-phant',n:3}]}),
 G({num:14,slug:'raccoons-odd-sound-hunt',img:'raccoons-odd-sound-hunt.webp',title:'Raccoon\u2019s Odd Sound Hunt',engine:'oddone',
   tag: 'Two words start the same, one is the odd raccoon. Circle the impostor!',skill:'Comparing sounds',
   say: 'Say all three words. Two start with the same sound — circle the one that does not.',
   hint:'Caught you, odd raccoon!',doneTitle:'Every impostor caught!',doneSub:'You spotted every different beginning sound.',
   alt:'A raccoon sneaking between rows of three pictures where one begins differently.',
   rounds:[
    {say:'Two start with sss… one does not!',pics:['sun','sock','moon'],odd:'moon'},
    {say:'Two start with b… find the odd one!',pics:['ball','boat','cat'],odd:'cat'},
    {say:'Two start with fff… find the odd one!',pics:['fish','fan','dog'],odd:'dog'}
   ]}),
 G({num:15,slug:'submarine-sound-scanner',img:'submarine-sound-scanner.webp',title:'Submarine Sound Scanner',engine:'position',
   tag: 'Scan each word: circle FIRST or LAST — where do you hear the sound?',skill:'Sound position',
   say: 'Say the word and scan it like a submarine. Is the sound first or last? Circle that box.',
   hint:'Sound located!',doneTitle:'Scan complete!',doneSub:'You located every sound in its position.',
   alt:'A submarine scanner beside words with first and last sound boxes.',
   rows:[{icon:'sun',word:'sun',pos:'first',hint:'Where is s?'},{icon:'cat',word:'cat',pos:'last',hint:'Where is t?'},{icon:'dog',word:'dog',pos:'first',hint:'Where is d?'},{icon:'map',word:'map',pos:'last',hint:'Where is p?'}]}),
 G({num:16,slug:'bunny-word-family-village',img:'bunny-word-family-village.webp',title:'Bunny Word Family Village',engine:'sort',
   tag: 'Read each word, then draw a line to the house where it lives.',skill:'Word families',
   say: 'Read each word card out loud, then draw a line to its house. Words that end the same live together.',
   hint:'Home sweet home!',doneTitle:'The village is settled!',doneSub:'Every word found its family house.',
   alt:'A bunny village with an -at house and an -an house waiting for word cards.',
   roundSay:'Tap a word, then tap its house.',
   items:[{icon:'cat',word:'cat',bin:'at'},{icon:'hat',word:'hat',bin:'at'},{icon:'can',word:'can',bin:'an'},{icon:'fan',word:'fan',bin:'an'}],
   bins:[{key:'at',label:'The -at house',icon:'hat'},{key:'an',label:'The -an house',icon:'fan'}]}),
 G({num:17,slug:'sloths-blending-slide',img:'sloths-blending-slide.webp',title:'Sloth\u2019s Blending Slide',engine:'blend',
   tag: 'Write the rest of each s-word and slide the sounds together.',skill:'Blending with support',
   say: 'The first letter is already in its box. Write the rest of each s-word, then slide the sounds together.',
   hint:'Slide those sounds!',doneTitle:'All words slid home!',doneSub:'You blended every word, nice and slow.',
   alt:'A sloth on a slide beside s-words whose first letter is already placed.',
   words:[{icon:'star',word:'star',seq:'s t',say:'sss…t… st!'},{icon:'spider',word:'spider',seq:'s p',say:'sss…p… sp!'},{icon:'snail',word:'snail',seq:'s n',say:'sss…n… sn!'}]}),
 G({num:18,slug:'unicorn-sound-swap',img:'unicorn-sound-swap.webp',title:'Unicorn Sound Swap',engine:'swap',
   tag: 'Swap the first sound and write the new word.',skill:'Sound manipulation',
   say: 'Say the word, make the swap sound, then write the letter that changes the word into the new one.',
   hint:'A magic swap!',doneTitle:'Every spell cast!',doneSub:'You swapped first sounds and made new words. Magic!',
   alt:'A unicorn beside words transforming into new words with swapped first letters.',
   rows:[{say:'Swap c for the new first sound: cat \u2192 hat',from:'cat',to:'hat',fromWord:'cat',targetWord:'hat',swap:'h',prompt:'c \u2192 ?',tiles:['h','m','s']},{say:'Swap d for the new first sound: dog \u2192 log',from:'dog',to:'log',fromWord:'dog',targetWord:'log',swap:'l',prompt:'d \u2192 ?',tiles:['l','n','r']},{say:'Swap p: pan \u2192 fan',from:'pan',to:'fan',fromWord:'pan',targetWord:'fan',swap:'f',prompt:'p \u2192 ?',tiles:['f','t','b']}]}),
 G({num:19,slug:'dinosaur-sound-train',img:'dinosaur-sound-train.webp',title:'Dinosaur Sound Train',engine:'blend',
   tag: 'Write each word in its train cars, one sound per car.',skill:'Blending and writing',
   say: 'Write one sound in each train car to load the word — then read the whole word out loud!',
   hint:'The word train is loading!',doneTitle:'The train is fully loaded!',doneSub:'Every word built sound by sound. Chugga chugga!',
   alt:'A dinosaur conductor beside train cars waiting for the letters of cat, dog and sun.',
   words:[{icon:'cat',word:'cat',say:'c-a-t, cat!'},{icon:'dog',word:'dog',say:'d-o-g, dog!'},{icon:'sun',word:'sun',say:'s-u-n, sun!'}]}),
 G({num:20,slug:'monkeys-missing-middle',img:'monkeys-missing-middle.webp',title:'Monkey\u2019s Missing Middle',engine:'letter',
   tag: 'The monkey dropped the middle of every word! Write the missing vowel.',skill:'Middle vowels',
   say: 'The monkey dropped the middle of every word! Write the missing vowel in each box.',
   hint:'That\u2019s the middle sound!',doneTitle:'Every word made whole!',doneSub:'All the middle vowels returned to their words.',
   alt:'A monkey beside b_d, p_g, c_p, f_x and h_t with the five vowels waiting.',
   rounds:[
    {say:'b_d — stretch it: buuud?',pic:'bed',audioLabel:'Play "bed"',audio:'bed',choices:[{letter:'e',ok:true},{letter:'a',ok:false},{letter:'o',ok:false}]},
    {say:'p_g — oink oink!',pic:'pig',audioLabel:'Play "pig"',audio:'pig',choices:[{letter:'a',ok:false},{letter:'i',ok:true},{letter:'u',ok:false}]},
    {say:'f_x — what does the fox say?',pic:'fox',audioLabel:'Play "fox"',audio:'fox',choices:[{letter:'o',ok:true},{letter:'e',ok:false},{letter:'i',ok:false}]}
   ]}),
 G({num:21,slug:'firefly-sound-counting',img:'firefly-sound-counting.webp',title:'Firefly Sound Counting',engine:'counters',
   tag: 'Color one firefly circle for every SOUND in each word.',skill:'Phoneme counting',
   say: 'Say the word and count its sounds: color one firefly circle per sound. Careful — letters can trick you!',
   hint:'Flash! One sound.',doneTitle:'All flashes counted!',doneSub:'You counted sounds, not letters — the trickiest listening of all.',
   alt:'Fireflies glowing beside words whose sounds must be counted, not their letters.',
   max:4,
   rows:[{icon:'man',word:'me',hint:'m…e — just two sounds!',n:2},{icon:'cat',word:'cat',hint:'c…a…t — three sounds',n:3},{icon:'ship',word:'ship',hint:'sh…i…p — sh is ONE sound!',n:3},{icon:'frog',word:'frog',hint:'f…r…o…g — four sounds!',n:4}]}),
 G({num:22,slug:'polar-bear-word-builder',img:'polar-bear-word-builder.webp',title:'Polar Bear Word Builder',engine:'blend',
   tag: 'The words froze solid! Write the letters to thaw them out, sound by sound.',skill:'Word building',
   say: 'Say the picture word slowly, then write its letters in order to build it.',
   hint:'The ice is melting!',doneTitle:'All words thawed!',doneSub:'Every frozen word built back sound by sound.',
   alt:'A polar bear beside frozen words waiting to be rebuilt letter by letter.',
   words:[{icon:'cat',word:'cat',say:'t…c…a… cat!'},{icon:'sun',word:'sun',say:'n…s…u… sun!'},{icon:'hen',word:'hen',say:'e…n…h… hen!'},{icon:'pig',word:'pig',say:'g…i…p… pig!'}]}),
 G({num:23,slug:'mermaids-sound-switch',img:'mermaids-sound-switch.webp',title:'Mermaid\u2019s Sound Switch',engine:'swap',
   tag: 'Switch the last sound and write the new word.',skill:'Ending sound manipulation',
   say: 'Say the word, then switch its tail sound. Write the letter that makes the new word.',
   hint:'The switch is on!',doneTitle:'Every switch flipped!',doneSub:'You changed final sounds and made new words.',
   alt:'A mermaid beside words whose last letters switch to make new words.',
   rows:[{say:'Switch the tail: cat \u2192 can',from:'cat',to:'can',fromWord:'cat',targetWord:'can',swap:'n',prompt:'t \u2192 ?',tiles:['n','p','m']},{say:'Switch it: dog \u2192 dot',from:'dog',to:'dot',fromWord:'dog',targetWord:'dot',swap:'t',prompt:'g \u2192 ?',tiles:['t','b','l']},{say:'One more: cup \u2192 cub',from:'cup',to:'cub',fromWord:'cup',targetWord:'cub',swap:'b',prompt:'p \u2192 ?',tiles:['b','d','g']}]}),
 G({num:24,slug:'dragons-secret-sound-paths',img:'dragons-secret-sound-paths.webp',title:'Dragon\u2019s Secret Sound Paths',engine:'path',
   tag: 'Follow the winding path and circle every picture that starts with the s sound.',skill:'Beginning sounds',
   say: 'Start at the green dot. Circle every s-picture on the path to the dragon’s cave.',
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
  <p class="lesson-lede">Phonics is listening made visible: this class plays with the sounds inside words — first sounds, ending sounds, rhymes, syllables and the tiny vowels that hide in the middle. Twenty-four draw-on-the-picture adventures, each with a printable worksheet in the <a href="${WS28_PATH}">Phonics worksheet library</a>.</p>
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
 ${heading('PHONICS ADVENTURES','Twenty-four draw-on-the-picture sound games.','Hear a sound from a grown-up, then find its pictures, rhyme, blend, swap and count — twenty-four phonics adventures made from our own storybook artwork, drawn on straight away with the pencil case. No scores, no timers, nothing to install.')}
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
  <p class="lesson-note">Every card is one draw-on-the-picture adventure. Progress is saved on this device for the child chosen in <a href="/my-classroom/">My Classroom</a>.</p>
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
 const art=artFor('phonics/'+g.slug,PHONICS_BASE+g.img);
 const board=imageActivitySection({band:'phonics',slug:g.slug,title:g.title,skill:g.skill,
  say:g.say,hint:g.hint,doneTitle:g.doneTitle,alt:g.alt,
  imgUrl:PHONICS_BASE+g.img,w:art.w,h:art.h,wsPath:ws,pagePath:PHONICS_LIB_PATH+g.slug+'/'});
 return `${crumbNav([['Preschool','/preschool/'],['Phonics Adventures',PHONICS_LIB_PATH],[g.num+'. '+g.title]])}
 ${board}
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>Why this adventure helps.</h2>
  <p class="lesson-copy">${esc(g.parentNote||('This activity trains '+g.skill.toLowerCase()+' right on the adventure picture, with one short written instruction a grown-up can read aloud. Nothing is graded and nothing is scored \u2014 the win is a child who picked up a pencil, played with the sounds they hear in words, and saved work they are proud of. Saying the sounds cleanly (sss, not \u201csuh\u201d) as they draw is exactly how reading research says to teach them.'))}</p>
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
