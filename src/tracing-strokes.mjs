// Kiddo School — beginner handwriting letterforms for the letter tracing
// guides, hand-authored on one consistent grid. NOTHING here is taken from
// the uploaded tracing.png sheets: the brief flags those as having incorrect
// numbering and inconsistent letterforms, so every stroke below is drawn
// from scratch and visually verified before publishing.
//
// Grid: viewBox 0 0 120 160. Baseline y=128. Uppercase spans y=28..128.
// Lowercase x-height spans y=68..128, ascenders rise to y=28, descenders
// drop to y=152. Lowercase a and g are SINGLE-STOREY on purpose (beginner
// forms, matching the site's card artwork).
//
// Each stroke is one SVG path string; its start point is the first point of
// the path (numbered circle) and its writing direction is the direction of
// the first segment (arrow). Strokes are listed in the order children are
// taught to write the letter, and the tracing player enforces that order.
//
// HELP strings are short, specific parent scripts: they name each numbered
// stroke and its direction, in teaching order.
export const TRACING_GRID={w:120,h:160,baseline:128,capTop:28,xTop:68,descender:152};

export const TRACINGS={
 a:{
  up:{help:'Start at 1 at the top, slide down the left side to the bottom. Lift. Start at 2 at the top, slide down the right side. Lift. Start at 3, pull straight across the middle.',
   strokes:['M60 28 L28 128','M60 28 L92 128','M38 92 L82 92']},
  lo:{help:'Start at 1 at the top right, sweep round to the left and all the way round the bowl. Lift. Start at 2 on the right, pull straight down.',
   strokes:['M76 74 C64 62 42 64 34 82 C26 100 32 120 48 126 C60 130 72 122 76 110','M76 68 L76 128']}
 },
 b:{
  up:{help:'Start at 1 at the top, pull straight down to the bottom. Lift. Start at 2 at the top, curve out to the right, round the top bowl and back to the middle. Lift. Start at 3 at the middle, curve out and round the bottom bowl back to the bottom of the stem.',
   strokes:['M36 28 L36 128','M36 28 C74 26 84 46 76 62 C70 74 54 80 36 78','M36 78 C80 78 92 100 84 116 C78 127 58 130 36 128']},
  lo:{help:'Start at 1 at the top, pull straight down past the bottom line. Lift. Start at 2 halfway down the stem, curve round the bowl to the right and back to the stem.',
   strokes:['M38 28 L38 128','M38 72 C60 60 78 76 76 96 C74 116 52 124 38 114']}
 },
 c:{
  up:{help:'One stroke. Start at 1 at the top right, curve up and round to the left, then down and round the bottom to the right.',
   strokes:['M88 46 C76 28 44 26 30 48 C18 66 20 100 38 116 C56 130 80 122 88 104']},
  lo:{help:'One stroke. Start at 1 at the top right, curve round to the left, down and round the bottom.',
   strokes:['M74 76 C64 60 40 62 32 82 C24 102 36 124 56 126 C64 126 70 122 74 116']}
 },
 d:{
  up:{help:'Start at 1 at the top left, pull straight down. Lift. Start at 2 at the top of the stem, curve out to the right and round the big bowl back to the bottom of the stem.',
   strokes:['M36 28 L36 128','M36 28 C76 28 92 52 90 78 C88 106 68 128 36 128']},
  lo:{help:'Start at 1 at the top right of the bowl, sweep round to the left and all the way round. Lift. Start at 2 at the top, pull straight down past the bottom line.',
   strokes:['M76 74 C64 62 42 64 34 82 C26 100 32 120 48 126 C60 130 72 122 76 110','M76 28 L76 128']}
 },
 e:{
  up:{help:'Start at 1 at the top left, pull straight down. Lift. Start at 2 at the top, slide across. Lift. Pull straight across the middle. Lift. Slide across the bottom.',
   strokes:['M34 28 L34 128','M34 28 L90 28','M34 78 L82 78','M34 128 L90 128']},
  lo:{help:'One stroke. Start at 1 in the middle, slide across to the right, then curve up over the top, round to the left, down and round the bottom.',
   strokes:['M30 96 L72 96 C74 76 60 62 46 66 C32 70 26 88 30 104 C34 120 50 130 66 124 C72 121 76 116 76 112']}
 },
 f:{
  up:{help:'Start at 1 at the top, pull straight down. Lift. Start at 2 at the top, slide straight across. Lift. Pull straight across the middle bar.',
   strokes:['M34 28 L34 128','M34 28 L90 28','M34 78 L80 78']},
  lo:{help:'Start at 1 at the top, curve over to the left and pull straight down. Lift. Start at 2 at the left, pull straight across.',
   strokes:['M64 40 C56 28 42 30 40 46 L40 128','M26 68 L56 68']}
 },
 g:{
  up:{help:'Start at 1 at the top right, curve round to the left, down and round the bottom like a C. Lift. Start at 2 at the bottom of the curve, slide up, then pull straight across into the bowl.',
   strokes:['M88 44 C78 26 46 26 32 48 C18 68 22 102 42 118 C58 130 82 122 88 102','M88 102 L88 76 L58 76']},
  lo:{help:'Start at 1 at the top right of the bowl, sweep round to the left and all the way round. Lift. Start at 2 on the right, pull straight down past the bottom line, then curve the tail to the left.',
   strokes:['M76 74 C64 62 42 64 34 82 C26 100 32 120 48 126 C60 130 72 122 76 110','M76 68 L76 144 C76 154 64 158 54 152']}
 },
 h:{
  up:{help:'Start at 1 at the top left, pull straight down. Lift. Start at 2 at the top right, pull straight down. Lift. Pull straight across the middle.',
   strokes:['M32 28 L32 128','M88 28 L88 128','M32 78 L88 78']},
  lo:{help:'Start at 1 at the top, pull straight down. Lift. Start at 2 on the stem, arch up over to the right and pull straight down.',
   strokes:['M38 28 L38 128','M38 84 C38 70 52 62 62 66 C72 70 74 80 74 90 L74 128']}
 },
 i:{
  up:{help:'Start at 1 at the top, pull straight down. Lift. Start at 2 at the top, slide across. Lift. Slide across the bottom.',
   strokes:['M60 28 L60 128','M40 28 L80 28','M40 128 L80 128']},
  lo:{help:'Start at 1, pull straight down. Lift. Dot the little line above — that is 2.',
   strokes:['M42 68 L42 128','M42 42 L42 44']}
 },
 j:{
  up:{help:'Start at 1 at the top, pull straight down past the bottom line, then curve the tail to the left.',
   strokes:['M72 28 L72 104 C72 124 56 134 40 128 C34 125 30 120 30 114']},
  lo:{help:'Start at 1, pull straight down past the bottom line, then curve the tail to the left. Lift. Dot the little line above — that is 2.',
   strokes:['M52 68 L52 140 C52 152 40 158 30 152','M52 42 L52 44']}
 },
 k:{
  up:{help:'Start at 1 at the top, pull straight down. Lift. Start at 2 at the top right, slide down to the middle of the stem. Lift. Start at 3 in the middle, slide down to the bottom right.',
   strokes:['M32 28 L32 128','M84 32 L34 80','M48 68 L88 128']},
  lo:{help:'Start at 1 at the top, pull straight down. Lift. Start at 2 at the top right, slide in to the stem. Lift. Start at 3 in the middle, slide out to the bottom right.',
   strokes:['M38 28 L38 128','M72 68 L40 96','M52 84 L78 128']}
 },
 l:{
  up:{help:'Start at 1 at the top, pull straight down to the bottom, then slide straight across to the right — one motion, no lift.',
   strokes:['M36 28 L36 128 L88 128']},
  lo:{help:'One stroke. Start at 1 at the top and pull straight down.',
   strokes:['M44 28 L44 128']}
 },
 m:{
  up:{help:'Start at 1 at the top left, pull straight down. Lift. Start at 2 at the top left again, slide down the hill to the middle valley. Lift. Start at 3 in the valley, slide up to the top right. Lift. Pull straight down.',
   strokes:['M30 28 L30 128','M30 28 L60 96','M60 96 L90 28','M90 28 L90 128']},
  lo:{help:'Start at 1, pull straight down. Lift. Start at 2 on the stem, arch over and pull straight down. Lift. Start at 3 at the same spot, arch over again and pull straight down.',
   strokes:['M34 68 L34 128','M34 82 C34 72 44 66 52 70 C58 74 60 80 60 88 L60 128','M60 82 C60 72 70 66 78 70 C84 74 86 80 86 88 L86 128']}
 },
 n:{
  up:{help:'Start at 1 at the top left, pull straight down. Lift. Start at 2 at the top left again, slide down the hill to the bottom right. Lift. Start at 3 at the bottom right, pull straight up.',
   strokes:['M32 28 L32 128','M32 28 L88 128','M88 128 L88 28']},
  lo:{help:'Start at 1, pull straight down. Lift. Start at 2 on the stem, arch up over to the right and pull straight down.',
   strokes:['M38 68 L38 128','M38 84 C38 70 52 62 62 66 C72 70 74 82 74 90 L74 128']}
 },
 o:{
  up:{help:'One stroke. Start at 1 at the top right, sweep anticlockwise — up, round to the left, down and round the bottom — all the way back to where you began.',
   strokes:['M88 78 C88 50 76 28 60 28 C44 28 32 50 32 78 C32 106 44 128 60 128 C76 128 88 106 88 78']},
  lo:{help:'One stroke. Start at 1 at the right side, sweep anticlockwise — over the top, round the left, along the bottom — all the way back.',
   strokes:['M76 98 C76 78 64 64 52 64 C38 64 28 80 28 98 C28 116 38 130 52 130 C66 130 76 116 76 98']}
 },
 p:{
  up:{help:'Start at 1 at the top, pull straight down. Lift. Start at 2 on the stem, curve out to the right, round the bowl and back to the stem.',
   strokes:['M36 28 L36 128','M36 28 C76 28 88 48 82 66 C76 84 58 92 36 88']},
  lo:{help:'Start at 1, pull straight down past the bottom line. Lift. Start at 2 on the stem, curve out to the right, round the bowl and back to the stem.',
   strokes:['M38 68 L38 152','M38 84 C38 72 50 62 62 66 C74 70 78 84 74 98 C70 112 52 122 38 112']}
 },
 q:{
  up:{help:'Start at 1 at the top right, sweep round to the left, down and round the bottom like an O. Lift. Start at 2 inside the bottom right, slide out to the bottom right corner.',
   strokes:['M88 78 C88 50 76 28 60 28 C44 28 32 50 32 78 C32 106 44 128 60 128 C76 128 88 106 88 78','M70 104 L92 134']},
  lo:{help:'Start at 1 at the top right of the bowl, sweep round to the left and all the way round. Lift. Start at 2 on the right, pull straight down past the bottom line.',
   strokes:['M76 74 C64 62 42 64 34 82 C26 100 32 120 48 126 C60 130 72 122 76 110','M76 68 L76 152']}
 },
 r:{
  up:{help:'Start at 1 at the top, pull straight down. Lift. Start at 2 at the top, curve out to the right, round the small bump and back to the stem. Lift. Start at 3 at the bump, slide down to the bottom right corner.',
   strokes:['M36 28 L36 128','M36 28 C70 28 82 44 78 60 C74 74 58 80 36 76','M42 76 L88 128']},
  lo:{help:'Start at 1, pull straight down. Lift. Start at 2 on the stem, curve up and over to the right.',
   strokes:['M40 68 L40 128','M40 82 C46 70 60 64 70 70']}
 },
 s:{
  up:{help:'One stroke. Start at 1 at the top right, curve round to the left like a little c, then slide right and curve back down and round to the bottom left.',
   strokes:['M86 44 C80 28 46 24 34 40 C24 54 34 68 52 74 C74 80 90 88 84 106 C78 124 42 128 28 110']},
  lo:{help:'One stroke. Start at 1 at the top right, curve round to the left, slide right, then curve back down and round to the bottom left.',
   strokes:['M68 78 C62 64 38 64 34 78 C30 90 46 92 56 96 C68 100 72 110 64 120 C54 130 34 126 28 114']}
 },
 t:{
  up:{help:'Start at 1 at the top, pull straight down. Lift. Start at 2 at the top left, slide straight across the top bar.',
   strokes:['M60 28 L60 128','M34 28 L86 28']},
  lo:{help:'Start at 1 at the top, pull straight down, then curve the bottom to the right — one motion. Lift. Start at 2 at the left, pull straight across.',
   strokes:['M46 32 L46 110 C46 122 54 128 64 124','M28 64 L64 64']}
 },
 u:{
  up:{help:'Start at 1 at the top left: slide down, curve round the bottom and up the right side — one motion. Lift. Start at 2 at the top right, pull straight down to the bottom.',
   strokes:['M34 28 L34 96 C34 118 48 130 60 130 C72 130 86 118 86 96 L86 28','M86 28 L86 128']},
  lo:{help:'Start at 1, slide down, curve round the bottom and back up the right side. Lift. Start at 2 on the right, pull straight down.',
   strokes:['M36 68 L36 104 C36 118 44 128 54 128 C64 128 70 120 70 108','M70 68 L70 128']}
 },
 v:{
  up:{help:'Start at 1 at the top left, slide down to the point. Lift. Start at 2 at the point, slide up to the top right.',
   strokes:['M32 28 L60 128','M60 128 L88 28']},
  lo:{help:'Start at 1 at the top left, slide down to the point. Lift. Start at 2 at the point, slide up to the top right.',
   strokes:['M32 68 L54 128','M54 128 L76 68']}
 },
 w:{
  up:{help:'One stroke. Start at 1 at the top left: slide down, up, down, up — four straight lines, no lift.',
   strokes:['M24 28 L40 128 L60 34 L80 128 L96 28']},
  lo:{help:'One stroke. Start at 1 at the top left: slide down, up, down, up — four straight lines, no lift.',
   strokes:['M24 68 L38 128 L54 72 L70 128 L84 68']}
 },
 x:{
  up:{help:'Start at 1 at the top left, slide down to the bottom right. Lift. Start at 2 at the top right, slide down to the bottom left. The two lines cross in the middle.',
   strokes:['M30 28 L90 128','M90 28 L30 128']},
  lo:{help:'Start at 1 at the top left, slide down to the bottom right. Lift. Start at 2 at the top right, slide down to the bottom left.',
   strokes:['M32 68 L76 128','M76 68 L32 128']}
 },
 y:{
  up:{help:'Start at 1 at the top left, slide down to the middle. Lift. Start at 2 at the top right, slide down through the middle and straight on down.',
   strokes:['M32 28 L60 78','M88 28 L60 78 L60 128']},
  lo:{help:'Start at 1 at the top left, slide down to the bottom line. Lift. Start at 2 at the top right, slide down past the bottom line and curve the tail to the left.',
   strokes:['M32 68 L56 118','M80 68 L52 132 C46 146 34 152 26 144']}
 },
 z:{
  up:{help:'One stroke. Start at 1 at the top left: slide across, slide down the hill, slide across the bottom — no lift.',
   strokes:['M30 28 L90 28 L30 128 L90 128']},
  lo:{help:'One stroke. Start at 1 at the top left: slide across, slide down the hill, slide across the bottom — no lift.',
   strokes:['M32 68 L74 68 L32 128 L74 128']}
 }
};
