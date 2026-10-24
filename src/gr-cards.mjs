// Kiddo School — Kids Games RULES cards · the owner's 36 uploads at R2
// school/extra-classes/kids-games/flashcards/ (kids-game-rules-flashcards-
// webp.zip, owner 2026-10-24: "Create one short page per game at
// /games/<slug>/, where the slug is the file name"). 36/36 probed HTTP 200
// image/webp — 35 rule cards at 900×1200 portrait + cover.webp at 800×1132;
// the cover fronts /games/ and is never counted as a card. Every card is a
// complete rules sheet: an ACTIVE PLAY pill, the game name, an illustration,
// a HOW TO PLAY panel with three numbered steps and a skill pill. All steps
// and skills below are transcribed verbatim from the real artwork via
// labeled contact sheets (scripts/kg-sheets). The 35 slugs ARE the file
// names, per the owner — they are NOT keyword rewrites. This folder already
// carried the October-18 cards (balloon-keep-up, duck-duck-goose, hopscotch
// …), which power the existing Kids Games class at /extra-classes/kids-games/
// and the /flashcards/kids-games/ set — both stay byte-identical (owner:
// "Do not change any existing game URLs"); the old and new files coexist.
export const GR_BASE='https://assets.kiddo.school/school/extra-classes/kids-games/flashcards/';

export const GR_GAMES=[
 {slug:'animal-walks',file:'animal-walks.webp',name:'Animal Walks',skill:'Imagine + Move',
  steps:['Choose an animal movement.','Move across the space like that animal.','Change animals and let everyone have a turn.'],
  alt:'Kids Games rules card for Animal Walks: a boy crawls like a bear and a girl crouches low like a cat, above the three rules — choose an animal movement, move across the space like that animal, change animals and let everyone have a turn — with an Imagine + Move skill pill.'},
 {slug:'balloon-keep-up',file:'balloon-keep-up.webp',name:'Balloon Keep-Up',skill:'Teamwork + Control',
  steps:['Toss a balloon into the air.','Keep it from touching the ground.','Use gentle taps and work together to keep it floating.'],
  alt:'Kids Games rules card for Balloon Keep-Up: a boy and a girl tap a pink balloon into the air between them, above the three rules — toss a balloon into the air, keep it from touching the ground, use gentle taps and work together to keep it floating — with a Teamwork + Control skill pill.'},
 {slug:'balloon-volleyball',file:'balloon-volleyball.webp',name:'Balloon Volleyball',skill:'Tap + Cooperate',
  steps:['Make a low line across the play area.','Tap the balloon over the line.','Keep the balloon from touching the ground on your side.'],
  alt:'Kids Games rules card for Balloon Volleyball: two children tap a pink balloon back and forth over a low net, above the three rules — make a low line across the play area, tap the balloon over the line, keep the balloon from touching the ground on your side — with a Tap + Cooperate skill pill.'},
 {slug:'beanbag-balance',file:'beanbag-balance.webp',name:'Beanbag Balance',skill:'Balance + Patience',
  steps:['Place a beanbag on your head or shoulder.','Walk slowly from one spot to another.','If it falls, pick it up and try again.'],
  alt:'Kids Games rules card for Beanbag Balance: a boy balances a purple beanbag on his head while a girl walks steadily beside him, above the three rules — place a beanbag on your head or shoulder, walk slowly from one spot to another, if it falls pick it up and try again — with a Balance + Patience skill pill.'},
 {slug:'beanbag-relay',file:'beanbag-relay.webp',name:'Beanbag Relay',skill:'Carry + Share',
  steps:['Split into small teams.','Carry a soft beanbag to the marker and back.','Pass it to the next player until everyone has a turn.'],
  alt:'Kids Games rules card for Beanbag Relay: a running boy hands a pink beanbag to a girl reaching out for it, above the three rules — split into small teams, carry a soft beanbag to the marker and back, pass it to the next player until everyone has a turn — with a Carry + Share skill pill.'},
 {slug:'bubble-chase',file:'bubble-chase.webp',name:'Bubble Chase',skill:'Chase + Share',
  steps:['Blow bubbles in an open space.','Chase and gently pop the bubbles.','Take turns blowing and chasing.'],
  alt:'Kids Games rules card for Bubble Chase: a girl blows bubbles from a wand while a boy runs to pop them, above the three rules — blow bubbles in an open space, chase and gently pop the bubbles, take turns blowing and chasing — with a Chase + Share skill pill.'},
 {slug:'colour-hunt',file:'colour-hunt.webp',name:'Colour Hunt',skill:'Look + Match',
  steps:['Choose three colours to find.','Search the play area with a grown-up.','Point to each colour when you spot it.'],
  alt:'Kids Games rules card for Colour Hunt: two children sort colour cards into a box between them, above the three rules — choose three colours to find, search the play area with a grown-up, point to each colour when you spot it — with a Look + Match skill pill.'},
 {slug:'duck-duck-goose',file:'duck-duck-goose.webp',name:'Duck Duck Goose',skill:'Take Turns',
  steps:['Sit in a circle.','One player walks around, tapping heads and saying \u2018duck\u2019.','When they say \u2018goose\u2019, the goose chases them around the circle.'],
  alt:'Kids Games rules card for Duck Duck Goose: a circle of seated children while one player taps heads on the way round, above the three rules — sit in a circle, one player walks around tapping heads and saying duck, when they say goose the goose chases them around the circle — with a Take Turns skill pill.'},
 {slug:'duck-walk-relay',file:'duck-walk-relay.webp',name:'Duck Walk Relay',skill:'Waddle + Teamwork',
  steps:['Split into small teams.','Waddle to the marker and back.','Tag the next player and keep going until everyone has a turn.'],
  alt:'Kids Games rules card for Duck Walk Relay: two children waddle in a deep squat with knees bent, above the three rules — split into small teams, waddle to the marker and back, tag the next player and keep going until everyone has a turn — with a Waddle + Teamwork skill pill.'},
 {slug:'follow-the-leader',file:'follow-the-leader.webp',name:'Follow the Leader',skill:'Copy + Create',
  steps:['Choose one leader.','Everyone copies the leader\u2019s safe movements.','Change leaders so everyone gets a turn.'],
  alt:'Kids Games rules card for Follow the Leader: four children walk in a line, each one copying the child in front, above the three rules — choose one leader, everyone copies the leader\u2019s safe movements, change leaders so everyone gets a turn — with a Copy + Create skill pill.'},
 {slug:'four-square',file:'four-square.webp',name:'Four Square',skill:'Bounce + Cooperate',
  steps:['Mark four equal squares on the ground.','One player stands in each square.','Bounce the ball into another square and keep it moving.'],
  alt:'Kids Games rules card for Four Square: four children play on a chalk four-square court with a pink ball mid-bounce, above the three rules — mark four equal squares on the ground, one player stands in each square, bounce the ball into another square and keep it moving — with a Bounce + Cooperate skill pill.'},
 {slug:'hopscotch',file:'hopscotch.webp',name:'Hopscotch',skill:'Balance + Counting',
  steps:['Draw a hopscotch path.','Toss a marker onto a square.','Hop through the path, skipping the marker, then take a turn.'],
  alt:'Kids Games rules card for Hopscotch: a girl hops along a chalk hopscotch grid numbered 1 to 10 while a boy tosses his marker, above the three rules — draw a hopscotch path, toss a marker onto a square, hop through the path skipping the marker then take a turn — with a Balance + Counting skill pill.'},
 {slug:'hot-potato',file:'hot-potato.webp',name:'Hot Potato',skill:'Pass + Focus',
  steps:['Sit or stand in a circle.','Pass the object while music plays.','When the music stops, the player holding it sits out for one round.'],
  alt:'Kids Games rules card for Hot Potato: four children sitting in a circle pass a pink ball around, above the three rules — sit or stand in a circle, pass the object while music plays, when the music stops the player holding it sits out for one round — with a Pass + Focus skill pill.'},
 {slug:'hula-hoop-pass',file:'hula-hoop-pass.webp',name:'Hula Hoop Pass',skill:'Cooperate + Move',
  steps:['Stand in a circle and hold hands.','Pass a hula hoop around the circle without letting go.','Keep working together until it reaches everyone.'],
  alt:'Kids Games rules card for Hula Hoop Pass: four children hold hands in a circle as a pink hula hoop travels over an arm, above the three rules — stand in a circle and hold hands, pass a hula hoop around the circle without letting go, keep working together until it reaches everyone — with a Cooperate + Move skill pill.'},
 {slug:'lava-floor',file:'lava-floor.webp',name:'Lava Floor',skill:'Plan + Balance',
  steps:['Place safe stepping spots across the play area.','Imagine the floor is lava.','Move from spot to spot without touching the floor.'],
  alt:'Kids Games rules card for Lava Floor: two children step from pink floor spot to pink floor spot as if the floor were hot, above the three rules — place safe stepping spots across the play area, imagine the floor is lava, move from spot to spot without touching the floor — with a Plan + Balance skill pill.'},
 {slug:'memory-moves',file:'memory-moves.webp',name:'Memory Moves',skill:'Watch + Remember',
  steps:['One player makes a short movement sequence.','Everyone watches carefully.','Try to repeat the sequence in the same order.'],
  alt:'Kids Games rules card for Memory Moves: a girl leads a movement while three children watch and copy her, above the three rules — one player makes a short movement sequence, everyone watches carefully, try to repeat the sequence in the same order — with a Watch + Remember skill pill.'},
 {slug:'mirror-moves',file:'mirror-moves.webp',name:'Mirror Moves',skill:'Copy + Connect',
  steps:['Pair up with a partner.','One player makes slow movements.','The other player copies like a mirror, then swap roles.'],
  alt:'Kids Games rules card for Mirror Moves: a boy and a girl face each other making slow matching arm movements, above the three rules — pair up with a partner, one player makes slow movements, the other player copies like a mirror then swap roles — with a Copy + Connect skill pill.'},
 {slug:'musical-chairs',file:'musical-chairs.webp',name:'Musical Chairs',skill:'Move + Listen',
  steps:['Arrange chairs in a circle.','Play music while players move around the chairs.','Stop the music; everyone finds a chair, and the player without one sits out for one round.'],
  alt:'Kids Games rules card for Musical Chairs: four children circle two purple chairs with music notes in the air, above the three rules — arrange chairs in a circle, play music while players move around the chairs, stop the music and everyone finds a chair while the player without one sits out for one round — with a Move + Listen skill pill.'},
 {slug:'musical-statues',file:'musical-statues.webp',name:'Musical Statues',skill:'Rhythm + Self-Control',
  steps:['Play music while everyone dances.','Pause the music.','Freeze like a statue; anyone who moves sits out for one round.'],
  alt:'Kids Games rules card for Musical Statues: four children dance and freeze mid-pose with music notes above them, above the three rules — play music while everyone dances, pause the music, freeze like a statue and anyone who moves sits out for one round — with a Rhythm + Self-Control skill pill.'},
 {slug:'nature-scavenger-hunt',file:'nature-scavenger-hunt.webp',name:'Nature Scavenger Hunt',skill:'Look + Discover',
  steps:['Make a simple list of safe things to spot.','Explore the area with a grown-up.','Check off each discovery and share what you found.'],
  alt:'Kids Games rules card for Nature Scavenger Hunt: a boy inspects a green sprout with a magnifying glass while a girl writes a checklist, above the three rules — make a simple list of safe things to spot, explore the area with a grown-up, check off each discovery and share what you found — with a Look + Discover skill pill.'},
 {slug:'obstacle-course',file:'obstacle-course.webp',name:'Obstacle Course',skill:'Move + Try',
  steps:['Set up a safe path with simple obstacles.','Move through the course by stepping, crawling, or hopping.','Take turns and cheer for each player.'],
  alt:'Kids Games rules card for Obstacle Course: children climb over cones, hoops, cushions and a soft tunnel on a floor path, above the three rules — set up a safe path with simple obstacles, move through the course by stepping crawling or hopping, take turns and cheer for each player — with a Move + Try skill pill.'},
 {slug:'parachute-pop',file:'parachute-pop.webp',name:'Parachute Pop',skill:'Lift + Share',
  steps:['Everyone holds the edge of a play parachute.','Lift it up together.','Call a player to run underneath, then switch places.'],
  alt:'Kids Games rules card for Parachute Pop: four children lift a big purple-and-pink play parachute while one child runs beneath it, above the three rules — everyone holds the edge of a play parachute, lift it up together, call a player to run underneath then switch places — with a Lift + Share skill pill.'},
 {slug:'red-light-green-light',file:'red-light-green-light.webp',name:'Red Light, Green Light',skill:'Stop + Go',
  steps:['One player is the caller.','Move forward on \u2018green light\u2019.','Freeze on \u2018red light\u2019; the first player to reach the caller wins.'],
  alt:'Kids Games rules card for Red Light, Green Light: a caller stretches an arm forward while three children run and freeze, above the three rules — one player is the caller, move forward on green light, freeze on red light and the first player to reach the caller wins — with a Stop + Go skill pill.'},
 {slug:'relay-race',file:'relay-race.webp',name:'Relay Race',skill:'Run + Teamwork',
  steps:['Split into small teams.','Run to the marker and back.','Tag the next player until everyone has a turn.'],
  alt:'Kids Games rules card for Relay Race: three children sprint in a line past an orange cone, above the three rules — split into small teams, run to the marker and back, tag the next player until everyone has a turn — with a Run + Teamwork skill pill.'},
 {slug:'ring-toss',file:'ring-toss.webp',name:'Ring Toss',skill:'Aim + Count',
  steps:['Place safe targets a short distance away.','Give each player three soft rings.','Toss gently and count how many rings land on a target.'],
  alt:'Kids Games rules card for Ring Toss: a boy tosses a ring toward cone targets while a girl holds three more rings, above the three rules — place safe targets a short distance away, give each player three soft rings, toss gently and count how many rings land on a target — with an Aim + Count skill pill.'},
 {slug:'sack-race',file:'sack-race.webp',name:'Sack Race',skill:'Hop + Laugh',
  steps:['Give each player a sack.','Step inside and hold the sack at the waist.','Hop to the finish, then take turns cheering for everyone.'],
  alt:'Kids Games rules card for Sack Race: a boy in a purple sack and a girl in a pink sack hop side by side, above the three rules — give each player a sack, step inside and hold the sack at the waist, hop to the finish then take turns cheering for everyone — with a Hop + Laugh skill pill.'},
 {slug:'shadow-shapes',file:'shadow-shapes.webp',name:'Shadow Shapes',skill:'Pose + Copy',
  steps:['Stand in a safe sunny spot.','Make a shape with your body.','Let a partner copy the shape, then swap roles.'],
  alt:'Kids Games rules card for Shadow Shapes: a boy does a star jump and a girl balances on one leg, purple shadows stretched beneath them, above the three rules — stand in a safe sunny spot, make a shape with your body, let a partner copy the shape then swap roles — with a Pose + Copy skill pill.'},
 {slug:'shape-hunt',file:'shape-hunt.webp',name:'Shape Hunt',skill:'Look + Learn',
  steps:['Choose three simple shapes.','Find safe objects with those shapes.','Point, name, and count each one.'],
  alt:'Kids Games rules card for Shape Hunt: a girl holds a circle and a rectangle cutout while a boy lifts a cylinder, above the three rules — choose three simple shapes, find safe objects with those shapes, point name and count each one — with a Look + Learn skill pill.'},
 {slug:'simon-says',file:'simon-says.webp',name:'Simon Says',skill:'Listen + Move',
  steps:['Choose one leader.','Follow an instruction only when it starts with \u2018Simon says\u2019.','If you follow the wrong instruction, sit out for one round.'],
  alt:'Kids Games rules card for Simon Says: a leader gives a command while three children reach, step and freeze, above the three rules — choose one leader, follow an instruction only when it starts with Simon says, if you follow the wrong instruction sit out for one round — with a Listen + Move skill pill.'},
 {slug:'tag',file:'tag.webp',name:'Tag',skill:'Run + React',
  steps:['Choose one player to be \u2018it\u2019.','Everyone runs within the play area.','The player who is \u2018it\u2019 tags someone, who becomes \u2018it\u2019 next.'],
  alt:'Kids Games rules card for Tag: four children run and chase each other across the yard, above the three rules — choose one player to be it, everyone runs within the play area, the player who is it tags someone who becomes it next — with a Run + React skill pill.'},
 {slug:'target-toss',file:'target-toss.webp',name:'Target Toss',skill:'Aim + Count',
  steps:['Place safe targets a short distance away.','Give each player three soft beanbags.','Toss gently and count how many targets you reach.'],
  alt:'Kids Games rules card for Target Toss: a boy throws a beanbag toward three numbered buckets labelled 1, 2 and 3, above the three rules — place safe targets a short distance away, give each player three soft beanbags, toss gently and count how many targets you reach — with an Aim + Count skill pill.'},
 {slug:'three-legged-race',file:'three-legged-race.webp',name:'Three-Legged Race',skill:'Coordinate + Cooperate',
  steps:['Pair up and stand side by side.','Tie the inside legs together with a soft band.','Walk carefully to the finish, then swap partners.'],
  alt:'Kids Games rules card for Three-Legged Race: a boy and a girl stride arm in arm with their inside legs tied by a soft band, above the three rules — pair up and stand side by side, tie the inside legs together with a soft band, walk carefully to the finish then swap partners — with a Coordinate + Cooperate skill pill.'},
 {slug:'traffic-cop',file:'traffic-cop.webp',name:'Traffic Cop',skill:'Stop + Go',
  steps:['Choose one player to be the traffic cop.','Walk, stop, or turn when the cop gives a signal.','Change traffic cops so everyone gets a turn.'],
  alt:'Kids Games rules card for Traffic Cop: a boy plays traffic cop with a signal out while two children walk and stop, above the three rules — choose one player to be the traffic cop, walk stop or turn when the cop gives a signal, change traffic cops so everyone gets a turn — with a Stop + Go skill pill.'},
 {slug:'treasure-hunt',file:'treasure-hunt.webp',name:'Treasure Hunt',skill:'Search + Solve',
  steps:['Hide safe objects around the play area.','Give players the first clue.','Follow the clues to find each object, then celebrate together.'],
  alt:'Kids Games rules card for Treasure Hunt: a boy reads a treasure map marked X while a girl opens a small purple treasure chest beside a bush, above the three rules — hide safe objects around the play area, give players the first clue, follow the clues to find each object then celebrate together — with a Search + Solve skill pill.'},
 {slug:'tunnel-crawl',file:'tunnel-crawl.webp',name:'Tunnel Crawl',skill:'Crawl + Create',
  steps:['Make a safe tunnel with hoops or soft cushions.','Crawl through the tunnel one at a time.','Take turns building a new path.'],
  alt:'Kids Games rules card for Tunnel Crawl: a boy crawls through a pink play tunnel while a girl kneels beside it, above the three rules — make a safe tunnel with hoops or soft cushions, crawl through the tunnel one at a time, take turns building a new path — with a Crawl + Create skill pill.'}
];

export const GR_COVER={file:'cover.webp',w:800,h:1132,
 alt:'Cover of the Kids Games flashcards: the words Kids Games Flashcards over a big purple dice, a dashed arrow and a board-game path with a pink game piece.'};

/* Guards: the 35 slugs must equal the file names (owner rule), every game
   carries three transcribed steps and a skill pill, and no slug collides. */
for(const g of GR_GAMES){
 if(g.slug!==g.file.replace(/\.webp$/,''))throw Error('game-rules: slug must equal the file name: '+g.slug);
 if(!g.file.endsWith('.webp'))throw Error('game-rules: bad file '+g.file);
 if(!Array.isArray(g.steps)||g.steps.length!==3)throw Error('game-rules: '+g.slug+' needs exactly 3 card steps');
 if(!g.skill||g.alt.length<80)throw Error('game-rules: '+g.slug+' missing skill/alt');
}
if(GR_GAMES.length!==35)throw Error('game-rules: expected 35 games, got '+GR_GAMES.length);
if(new Set(GR_GAMES.map(g=>g.slug)).size!==35)throw Error('game-rules: duplicate slugs');
