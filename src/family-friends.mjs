/* Kiddo School — CLASS 45 · Family & Friends (Ages 4–5): the Learning Path
   class page at /family-and-friends/ PLUS one short page per card at
   /family-and-friends/<word>/ (owner brief 2026-11-01 — the owner spells the
   short-page pattern out card by card, "for example /family-and-friends/mum/
   and /family-and-friends/best-friend/", where <word> is the start of the
   file name before "-family-member-flashcard-for-kids" or
   "-flashcard-for-kids"). This class rides the Class 39/40/44 short-page
   precedent. NUMBERING (owner rule: "If Class 45 is not live, tell me before
   assigning numbers"): the production probes on 2026-11-01 found NO Class 45
   anywhere — no class-45 pages, no class-45 commits, and the live Learning
   Path says "forty-four age-guided classes" with the latest live class being
   Class 44 · Position & Direction Words at /prepositions/ (HTTP 200). So the
   honest next number by the site's own no-skip rule is 45, and 46 was NOT
   used (it would leave a permanent gap in the sequence and a wrong class
   count); the owner is told all of this in the round report and the number
   lives only in display copy — the URLs carry no class number, so a
   renumber is one commit with zero URL changes. The deck was probed LIVE on
   R2 on 2026-11-01: 36/36 files HTTP 200 image/jpeg at
   school/learning-path/family-and-friends/flashcards/ — 35 cards + the
   cover, every file exactly 1414×2000 (A4 print ratio), 149–227 kB master
   JPGs. THE JPG MASTERS RIDE EXACTLY AS UPLOADED (owner: "The images are
   JPG, so do not convert or re-compress them, and keep the file names
   exactly as they are") — no webp conversion, so the file on screen and the
   file behind the Download and Print buttons are the same full-resolution
   master. No seo.csv came with the deck, so the short-page slug is the
   card's word at the start of the file name (the owner's own URL rule) and
   card titles + alts were transcribed off 2 labeled contact sheets
   (scripts/ff46-sheets.py — every card face read: the printed word, the
   group scene and the word's color per card). The cover is the class page's
   main image (owner rule) and fronts the og:image so the deck joins the
   image sitemap; every short page carries its own card as og:image with the
   transcribed alt. Copy uses what USA parents search (family members
   flashcards, family flashcards for kids, printable family flashcards,
   friends flashcards preschool) and talks to kids directly; the owner's
   word-ban ("no sign up", "no paywall", "free to use", "no account", "free
   forever") is a lock, and the owner asked for the most humane language the
   school has — every line below was written the way a grown-up actually
   talks to a four-year-old. The artwork prints the deck's own spellings
   (MUM, NEIGHBOUR) and those ride verbatim as the display words.
   Inbound links: Class 38 (Feelings & Kindness), Class 33 (Community
   Helpers & Our Neighborhood) and Class 32 (Life Skills & Good Habits)
   point here; the class page links back to all three and the Learning Path,
   and every short page links back to the class page. The class count goes
   forty-four → forty-five. */
import {R2} from './adventure-kit.mjs';

export const FF_PATH='/family-and-friends/';
export const FF_BASE=R2+'school/learning-path/family-and-friends/flashcards/';

/* File order, exactly as the owner uploaded them (sorted); the slug is the
   card's word at the start of the file name — the owner's own URL rule. */
export const FF_ORDER=['aunt','baby','best-friend','boyfriend','brother','brother-in-law',
 'children','classmate','colleague','cousin','dad','daughter','family','friend','girlfriend',
 'grandchild','grandma','grandpa','husband','mum','neighbour','nephew','niece','parents',
 'partner','roommate','sibling','sister','sister-in-law','son','teacher','team','twin',
 'uncle','wife'];

export const FF_COVER={file:'family-and-friends-flashcards-for-kids-cover.jpg',w:1414,h:2000,
 alt:'Cover of the Kiddo School Family & Friends flashcards: a big smiling group of cartoon family members and friends waving and giving thumbs-up over the words Family & Friends.'};

const W=1414,H=2000;
/* slug → word (the card's printed lead, verbatim off the artwork), sub
   (subject pill), group (the artwork scene, verbatim from the contact
   sheets), color (the printed word's color on the card), say (the
   description under the image — kid-directed, one job), who (the short
   page's WHO THEY ARE — what the role means in a family), try (the short
   page's TRY IT TODAY). The SEO alt is composed from the group + color so
   every alt describes exactly what the artwork shows, the way Google Images
   reads it. */
const CARDS=[
 ['aunt','Aunt','Family','four smiling aunties waving and giving a thumbs-up','orange','Aunties are the grown-up friends who watched you grow up and still keep your drawing on their fridge. Some aunties are family, some are family by love — both kinds show up with open arms.','An aunt is your mum or dad\u2019s sister — or the grown-up who earned the title by loving you like family. Aunties ask the best questions and give the best hugs.','Draw Auntie a picture today and mail it or hand it over — watch the biggest smile happen.'],
 ['baby','Baby','Family','four happy babies crawling in purple onesies','purple','Babies are the newest people in the family — they giggle, grab their toes and grow a whole inch while you watch. You were a baby once too!','A baby is a very little family member who cannot talk yet — so they point, babble and laugh to say what they mean. Big kids are baby experts.','Find a photo of yourself as a baby and guess what you were thinking. Then make your best baby giggle sound!'],
 ['best-friend','Best Friend','Friends','five happy kids with their arms around each other','teal','A best friend is the person whose name makes you smile before you even see them. Best friends share snacks, secrets and the good swings.','A best friend is the friend you love the most — the one who saves you a seat and plays your favorite game even when it is not their favorite.','Tell your best friend one thing you love about them today — say it out loud, right to their face.'],
 ['boyfriend','Boyfriend','Friends','five cheerful kids pointing at each other and laughing','pink','A boyfriend is a boy who is extra special to someone — the one they save the last cookie for. Grown-ups have boyfriends, and so do hearts that are still growing.','A boyfriend is a boy someone loves and likes to spend time with — holding hands, sharing jokes and being a team.','Ask a grown-up how they met their boyfriend or girlfriend — every love story has a funny beginning!'],
 ['brother','Brother','Family','brothers waving, pointing and riding piggyback','blue','Brothers come in the built-in kind and the chosen kind — either way, a brother is a person to race, wrestle and defend. Brothers know your silly voice and love you anyway.','A brother is a boy who shares your family — same house, same holidays, sometimes even the same socks. He is your forever teammate.','Do one kind thing for your brother or a friend who is like one — share your toy, or let them pick the game.'],
 ['brother-in-law','Brother-in-Law','Family','four smiling men giving thumbs-up','green','A brother-in-law is a brother your family gained when somebody married in — a brand-new brother, added like a bonus level. He was a stranger once; now he is at every barbecue.','A brother-in-law is your aunt or mum\u2019s husband, or your sister\u2019s husband — family by wedding ring instead of by birth.','Ask a married-in grown-up in your family what surprised him most about you all. Cook the answer into dinner talk.'],
 ['children','Children','Family','six happy children waving and giving thumbs-up','green','Children are people who are still growing up — which means you! Every grown-up you know was a child once, and every child is becoming somebody wonderful.','Children are the young people in a family — kids like you. Wherever there are children there is noise, questions and somebody\u2019s crayons on the wall.','Count the children in your family and your friend circle — then invent a secret children-only handshake.'],
 ['classmate','Classmate','School','five smiling classmates waving and giving thumbs-up','blue','Classmates are the kids who learn right beside you — they spot your missing tooth before anyone and lend you the crayon you lost. Today\u2019s classmates can be tomorrow\u2019s best friends.','A classmate is a kid in your class at school. You do not pick them the way you pick friends — the classroom picks for you — and that is how the best friendships start.','Learn one classmate\u2019s favorite animal today. Just one — and tell them yours back.'],
 ['colleague','Colleague','Neighborhood','five friendly colleagues waving and giving thumbs-up','green','Colleagues are grown-ups who work side by side — they fix problems together, share coffee and celebrate finished days. You have colleagues too: the kids you build puzzles with.','A colleague is somebody you work with. Mums and dads have colleagues at their jobs — and teamwork at work looks a lot like teamwork at school.','Ask a grown-up to name one colleague they are thankful for — and what makes that person great to work with.'],
 ['cousin','Cousin','Family','five happy cousins waving','lime','Cousins are like brothers and sisters who live at somebody else\u2019s house — and every visit feels like a sleepover. Cousins are the first friends your family gives you.','A cousin is the child of your aunt or uncle. You share grandparents, holidays and the big question: whose turn is it to feed the dog?','Draw your cousin a treasure map of your home — X marks the snack drawer. Send it or save it for the next visit.'],
 ['dad','Dad','Family','cartoon dads and grandpas waving and giving thumbs-up','yellow','Dads carry you on their shoulders, fix wobbly bikes and tell jokes so bad they loop back around to wonderful. Some families have one dad, some have two, and some dads love you from far away.','A dad is a father — the man who helps raise you, cheers at your games and checks under the bed so you do not have to.','Ask Dad — or your favorite dad-person — to show you a photo from when HE was little. Prepare to laugh.'],
 ['daughter','Daughter','Family','five smiling daughters waving in peach shirts','salmon','A daughter is a girl or woman her family holds in its heart forever — the one somebody proudly calls their girl. Every grandma was somebody\u2019s daughter first!','A daughter is a child who is a girl. Mums and dads of daughters get to learn about dinosaurs AND ballet, whether they planned to or not.','If you are somebody\u2019s daughter, interview a grown-up about the day you were born. Every birth story is an adventure.'],
 ['family','Family','Family','a family hugging — parents and kids together','orange','Family is the team you were born onto or the one that chose you — the people who save your seat, know your song and love you on the grumpy days too.','A family is the group of people who belong to each other. Families come big, small, loud, quiet and every shape there is — yours is exactly the right shape.','Draw your family — the whole team, pets included. Hang it where everybody can see it and say everybody\u2019s name out loud.'],
 ['friend','Friend','Friends','two friends hugging cheek to cheek','green','A friend is a person you choose and who chooses you back — the one who laughs at your jokes and saves you the red crayon. Friendship is a game where everybody wins.','A friend is somebody you love to play with — who plays fair, shares the good moments and sits with you on the wobbly days.','Be the friend you wish for: invite somebody to play today and mean it. Watch what happens.'],
 ['girlfriend','Girlfriend','Friends','five happy girlfriends waving','orange','A girlfriend is a girl who is extra special to someone — the one they think of first with good news. Grown-ups have girlfriends, and so do playgrounds full of giggles.','A girlfriend is a girl somebody loves and likes to spend time with — sharing jokes, walks and the last slice of pizza.','Ask a grown-up to tell their first-ever girlfriend or boyfriend story. Brace yourself — it is usually hilarious.'],
 ['grandchild','Grandchild','Family','five happy grandchildren waving','teal','A grandchild is somebody\u2019s grandkid — the child of their child. Grandparents wait their whole lives to meet theirs, then spoil them on purpose.','A grandchild is the kid of your own kid. If you have a grandma or grandpa, guess what — you are THEIR grandchild. It goes both ways!','Call or visit a grandparent today and let THEM pick the game. Grandchildren get to be the boss sometimes.'],
 ['grandma','Grandma','Family','four smiling grandmas in purple waving','purple','Grandmas give the softest hugs, the best stories and cookies that taste better at their house. Grandma knows exactly how you like your toast — she invented it.','A grandma is your mum or dad\u2019s mum. She has watched the family grow from the beginning and remembers everybody\u2019s favorite things.','Ask Grandma about her favorite game when she was small — then play it together, and her rules win.'],
 ['grandpa','Grandpa','Family','four grandpas waving with mustaches, beards and peace signs','teal','Grandpas tell the longest stories, fix anything with tape and sneak you treats when nobody is looking. Grandpa pockets are bottomless on purpose.','A grandpa is your mum or dad\u2019s dad. He has twice the stories of everybody else and half the hurry.','Ask Grandpa to teach you something only he knows — a whistle, a card trick, or his famous silly walk.'],
 ['husband','Husband','Family','four smiling husbands waving and pointing','blue','A husband is a man who got married — he stood in front of everybody he loves and promised to be a team forever. Husbands and wives high-five through life.','A husband is a man who is married to somebody. Your grandma\u2019s husband might just be your grandpa — see? You already know one!','Find out who the husbands in your family are — then ask a married couple their secret. Listen closely; it is usually something funny.'],
 ['mum','Mum','Family','four smiling mums waving in red','red','Mums know where everything is, kiss bruises better and love you bigger than the sky. Some families have one mum, some have two, and every mum began as a kid just like you.','A mum is a mother — the woman who helps raise you, remembers your size and cheers the loudest at your things.','Ask Mum — or your favorite mum-person — what her favorite song was at five years old. Then dance to it together.'],
 ['neighbour','Neighbour','Neighborhood','friendly neighbors waving — two men and a grandma with glasses','red','Neighbors live next door or down the street — they wave in the morning, water the plants on holiday and own a dog you will fall in love with. Good neighbors make a street feel like a team.','A neighbour is somebody who lives near you. You did not choose them and they did not choose you — but a simple hello can turn a stranger into a friend.','Wave and say hello to one neighbor today. Then notice how the whole street suddenly feels friendlier.'],
 ['nephew','Nephew','Family','five happy nephews waving in blue','blue','A nephew is a boy somebody proudly calls their nephew — the son of their sister or brother. Aunts and uncles of nephews get to hand out extra cookies.','A nephew is your sister or brother\u2019s son — or the boy side of your family calls you one! Nephews are the kids aunts and uncles brag about.','If you have a nephew — or an aunt or uncle — send them a message or a drawing today. Family miles shrink fast.'],
 ['niece','Niece','Family','five happy nieces waving in pink','pink','A niece is a girl somebody proudly calls their niece — the daughter of their sister or brother. Aunts and uncles of nieces never run out of stories about her.','A niece is your sister or brother\u2019s daughter. If your aunt or uncle calls you their niece, you are the star of their favorite stories.','Draw your niece — or your aunt and uncle — a picture of a memory you share. Post it or gift it, and watch it get framed.'],
 ['parents','Parents','Family','parents waving — mums, dads and grandparents together in yellow','yellow','Parents are the grown-ups whose whole job is you — they pack the snacks, know your shoe size and love you at full volume. Being a parent is the biggest job nobody gets trained for.','Parents are the people who raise you — a mum, a dad, two mums, two dads, a grandma, an aunt — the grown-ups who show up for you every single day.','Do one of your parents\u2019 jobs today — set the table or match the socks. Then ask them the easiest part of being your parent.'],
 ['partner','Partner','Friends','partners making heart hands together in purple','purple','A partner is the person somebody teams up with for life — splitting snacks, carrying heavy things and laughing at the same jokes. Partners are teammates in love.','A partner is somebody\u2019s favorite person — the one they chose to do life with. Partners can be married or not; the team is what counts.','Team up with somebody you love and make a heart shape with your hands — then let a grown-up photograph the masterpiece.'],
 ['roommate','Roommate','Neighborhood','five smiling roommates in red','red','Roommates share a home — they split the chores, borrow hoodies and fill an apartment with laughter. Your siblings are basically your first roommates.','A roommate is somebody who lives in the same home as you. Grown-ups have roommates to share rent and stories — kids have roommates called brothers and sisters.','Be a great roommate at home today: tidy your space without being asked. Roommates who share the work share the fun.'],
 ['sibling','Sibling','Family','five smiling siblings in red','red','Siblings are the kids who share your house, your holidays and your grown-ups — built-in players for every game and the audience for every dance show.','A sibling is your brother or your sister. Siblings fight over the remote and still give you the bigger half of the cookie — that is love with practice.','Play one full game with your sibling — or a friend who is like one — and let them win the coin toss. Notice how good that feels.'],
 ['sister','Sister','Family','five smiling sisters waving in teal','teal','Sisters are keepers of secrets, borrowers of sweaters and your first best friend whether you planned it or not. A sister\u2019s laugh is family music.','A sister is a girl who shares your family. She knows your passwords, your fears and exactly how to make you laugh when it matters.','Tell your sister — or a friend who is like one — one memory you both share. Add details until you both laugh.'],
 ['sister-in-law','Sister-in-Law','Family','five smiling sisters-in-law waving in yellow','yellow','A sister-in-law is a sister your family gained at a wedding — somebody\u2019s wife joined the team and brought her laugh along. Bonus sisters are still sisters.','A sister-in-law is your brother\u2019s wife or your partner\u2019s sister — family by wedding instead of by birth, loved just the same.','Ask a sister-in-law in your family what she thought of everybody on day one. The answer is always a story.'],
 ['son','Son','Family','five smiling sons waving in blue','blue','A son is a boy somebody proudly calls their son — the kid of a mum or dad. Every grandpa you see was a little son once, probably drawing on walls.','A son is a child who is a boy. Parents of sons get to know every dinosaur by name and every puddle by depth.','If you are somebody\u2019s son, ask your grown-up what surprised them most about you as a baby. Prepare for cute.'],
 ['teacher','Teacher','School','a teacher with a book and a pointer, beside her students in yellow','yellow','Teachers open the door to everything you will ever learn how to do — reading, counting, waiting your turn, believing you can. Say it with me: thank you, teachers!','A teacher is somebody who helps you learn — at school, at swimming, at piano. Teachers keep a hundred kids in their hearts all at once.','Thank one of your teachers today — out loud, by name. Watch what that tiny moment does.'],
 ['team','Team','School','a team of kids cheering together in purple','purple','A team is a group that plays for each other — passing, cheering and getting back up together. Families are teams, classes are teams, and so is everybody under your roof.','A team is people working toward the same goal — scoring goals, building projects or simply getting through a Tuesday together.','Invent a family team cheer tonight — something short and loud. Use it before dinner, after homework, whenever.'],
 ['twin','Twin','Family','pairs of twins waving in lime green','lime','Twins grew side by side before they were even born — some look like two mirrors, some just share a birthday. Two birthday cakes, one epic party.','Twins are two kids born on the same day to the same family. Identical twins look nearly the same; fraternal twins can be as different as any two siblings.','Do you know any twins? Find two tricks for telling them apart — then ask if you got it right.'],
 ['uncle','Uncle','Family','four smiling uncles waving in pink','pink','Uncles are the grown-ups who piggyback you to the kitchen, teach you pranks and always sit near you at dinner. Uncles are teammates for parents, with extra cookie privileges.','An uncle is your mum or dad\u2019s brother — or the grown-up who earned the title by showing up like family. Uncles make everything ten percent funnier.','Ask your uncle — or uncle-person — to teach you the prank he was most famous for as a kid. Grown-up supervision advised!'],
 ['wife','Wife','Family','four smiling wives waving in magenta','magenta','A wife is a woman who got married — she promised to be somebody\u2019s teammate in front of everybody. Wives and husbands are partners for the whole adventure.','A wife is a woman who is married to somebody. Your grandpa\u2019s wife is probably your grandma — you already know a wife!','Find out who the wives in your family are — then ask how the big day was celebrated. Weddings have the best stories.'],
].map(([slug,word,sub,group,color,say,who,tryIt])=>{
 const file=slug+(['best-friend','boyfriend','classmate','colleague','friend','girlfriend','neighbour','partner','roommate','teacher','team'].includes(slug)?'-flashcard-for-kids.jpg':'-family-member-flashcard-for-kids.jpg');
 const alt=`A Kiddo School Family & Friends flashcard for kids titled ${word}: ${group}, over the big ${color} word ${word}.`;
 return {slug,file,pageSlug:slug,word,sub,group,color,say,who,try:tryIt,alt,w:W,h:H};
});

/* Guards: exactly the owner's 35 cards in file order, every entry complete,
   all unique — and every SEO file name riding untouched, JPG, no rename. */
if(CARDS.length!==35)throw Error('family-friends: expected 35 cards, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==FF_ORDER.join('|'))throw Error('family-friends: card order does not match FF_ORDER');
for(const c of CARDS){
 if(!c.file.endsWith('-family-member-flashcard-for-kids.jpg')&&!c.file.endsWith('-flashcard-for-kids.jpg'))throw Error('family-friends: SEO file name broken for '+c.slug);
 if(!c.file.startsWith(c.slug+'-'))throw Error('family-friends: file does not start with the card word for '+c.slug);
 if(!c.file.endsWith('.jpg'))throw Error('family-friends: master must stay JPG for '+c.slug);
 if(c.alt.length<80)throw Error('family-friends: thin alt for '+c.slug);
 if(c.say.length<60)throw Error('family-friends: thin say for '+c.slug);
 if(c.who.length<60)throw Error('family-friends: thin who for '+c.slug);
 if(c.try.length<40)throw Error('family-friends: thin try for '+c.slug);
 if(!c.sub)throw Error('family-friends: missing subject for '+c.slug);
}

export const FF_CARDS=CARDS;
export const ffBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));

/* Four shelves, in a kid's day order: the people in my house first (the ones
   you wake up next to), then the bigger family, then the married-in family,
   and the friends and neighbors who complete the picture. */
export const FF_SHELVES=[
 {id:'house',label:'THE PEOPLE IN MY HOUSE SHELF \u00b7 10 CARDS',h2:'The people you wake up next to.',
  hint:'Printable family member flashcards for preschool and up: mum, dad, son, daughter, sister, brother, baby, twin, sibling and the word that holds them all — family. The first people words kids name every single day, one card each with a way to make their day.',
  slugs:['mum','dad','son','daughter','sister','brother','baby','twin','sibling','family']},
 {id:'bigger',label:'THE BIGGER FAMILY SHELF \u00b7 10 CARDS',h2:'Grandmas, grandpas, aunties, uncles, cousins.',
  hint:'Family flashcards for ages 4–5 that grow the family tree: grandma and grandpa, aunt and uncle, cousin, nephew and niece, grandchild, parents and children — the people who fill the holidays and the photo albums.',
  slugs:['grandma','grandpa','aunt','uncle','cousin','nephew','niece','grandchild','parents','children']},
 {id:'married',label:'THE MARRIED-IN &amp; PARTNERS SHELF \u00b7 7 CARDS',h2:'Family gained at weddings.',
  hint:'Husband, wife, partner, girlfriend, boyfriend, brother-in-law and sister-in-law — the family members who arrive by wedding and by heart, each on its own printable card with one way to make them feel at home.',
  slugs:['husband','wife','partner','girlfriend','boyfriend','brother-in-law','sister-in-law']},
 {id:'around',label:'THE FRIENDS &amp; NEIGHBORS SHELF \u00b7 8 CARDS',h2:'The people the family chooses.',
  hint:'Friend and best friend, neighbour, classmate, colleague, roommate, teacher and team — the friends flashcards for the people outside the house who make the day warmer, one printable card each.',
  slugs:['friend','best-friend','neighbour','classmate','colleague','roommate','teacher','team']}];
{
 const shelved=FF_SHELVES.flatMap(s=>s.slugs).sort().join('|');
 if(shelved!==FF_ORDER.slice().sort().join('|'))throw Error('family-friends: shelves must cover the deck exactly once');
}

/* Level pills name school grades (owner 2026-10-31): Preschool = name it
   (8), Grade 1 = do it (12), Grade 2 = own it (15). 8/12/15 guarded. */
const FF_LEVEL={
 mum:1,dad:1,baby:1,sister:1,brother:1,grandma:1,grandpa:1,friend:1,
 son:2,daughter:2,twin:2,sibling:2,family:2,parents:2,children:2,cousin:2,aunt:2,uncle:2,
 'best-friend':2,neighbour:2,
 grandchild:3,nephew:3,niece:3,husband:3,wife:3,partner:3,girlfriend:3,boyfriend:3,
 'brother-in-law':3,'sister-in-law':3,classmate:3,colleague:3,roommate:3,teacher:3,team:3};
/* Skill pill per card (owner: "age, skill if any, level pill, subject pill"). */
const FF_SKILL={
 mum:'Belonging',dad:'Belonging',baby:'Vocabulary',sister:'Belonging',brother:'Belonging',
 grandma:'Memory',grandpa:'Memory',friend:'Kindness',
 son:'Vocabulary',daughter:'Vocabulary',twin:'Belonging',sibling:'Belonging',family:'Belonging',
 parents:'Belonging',children:'Belonging',cousin:'Vocabulary',aunt:'Vocabulary',uncle:'Vocabulary',
 'best-friend':'Kindness',neighbour:'Community',
 grandchild:'Vocabulary',nephew:'Vocabulary',niece:'Vocabulary',husband:'Vocabulary',wife:'Vocabulary',
 partner:'Vocabulary',girlfriend:'Speaking',boyfriend:'Speaking',
 'brother-in-law':'Vocabulary','sister-in-law':'Vocabulary',classmate:'Community',
 colleague:'Community',roommate:'Community',teacher:'Gratitude',team:'Teamwork'};
const FF_LEVEL_NAMES={1:'Preschool \u00b7 Name it',2:'Grade 1 \u00b7 Do it',3:'Grade 2 \u00b7 Own it'};
const FF_LEVEL_BLURB={
 1:'the eight words to start with — mum, dad, baby, sister, brother, grandma, grandpa and friend — the people a four-year-old names every day',
 2:'the twelve doing words — son, daughter, twin, sibling, family, parents, children, cousin, aunt, uncle, best friend and neighbour — each one ready for a sentence about your own house',
 3:'the fifteen bigger words — grandchild, nephew, niece, husband, wife, partner, girlfriend, boyfriend, the in-laws, classmate, colleague, roommate, teacher and team — the roles that grow with the family tree'};
const FF_LEVEL_COUNTS=Object.fromEntries([1,2,3].map(l=>[l,CARDS.filter(c=>FF_LEVEL[c.slug]===l).length]));
if(FF_LEVEL_COUNTS[1]!==8||FF_LEVEL_COUNTS[2]!==12||FF_LEVEL_COUNTS[3]!==15)throw Error('family-friends: level sizes drifted '+JSON.stringify(FF_LEVEL_COUNTS));
if(Object.keys(FF_SKILL).length!==35)throw Error('family-friends: skill deck must cover 35 cards');
for(const c of CARDS){if(!FF_SKILL[c.slug])throw Error('family-friends: missing skill for '+c.slug);if(!FF_LEVEL[c.slug])throw Error('family-friends: missing level for '+c.slug);}

const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const wordIndex=slug=>FF_ORDER.indexOf(slug)+1;

/* ---- The class page: cover leads, four shelves carry the deck ------------- */
function tile(c){
 const pills=`<span class="fc-pillrow"><span class="fc-pill fc-pill-age">Ages 4\u20135</span><span class="fc-pill fc-pill-subject">${esc(c.sub)}</span><span class="fc-pill fc-pill-level">${FF_LEVEL_NAMES[FF_LEVEL[c.slug]]}</span><span class="fc-pill fc-pill-skill">${esc(FF_SKILL[c.slug])}</span></span>`;
 return `<figure class="mn-card"><a href="${FF_PATH}${c.slug}/" aria-label="Open the ${esc(c.word)} page"><img src="${FF_BASE}${c.file}" width="${W}" height="${H}" alt="${esc(c.alt)}" loading="lazy"></a><strong>${esc(c.word)}</strong>${pills}<figcaption class="mn-tip">${esc(c.say)}</figcaption><div class="mn-actions"><a class="button" href="${FF_PATH}${c.slug}/">The ${esc(c.word)} page <span aria-hidden="true">\u2197</span></a><a class="button" href="${FF_BASE}${c.file}" download="${c.slug}.jpg">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}

export function ffClassBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">LEARNING PATH \u00b7 CLASS 45 \u00b7 FAMILY &amp; FRIENDS \u00b7 AGES 4\u20135</span><h1>Family &amp; friends for kids — thirty-five printable family member cards to meet.</h1><p class="lesson-lede">Thirty-five printable family and friends flashcards for ages four to five — one short page per person, all linked from the shelves below. Mum and dad, sisters and brothers, twins and babies, grandma and grandpa, aunties and uncles and cousins, the family gained at weddings, and the friends and neighbors all around: the people words kids reach for every day. Every card shows the word over its own smiling crowd of people, and every page says who this person is in a family — plus one tiny way to make their day today. Pick a card, print it, and the whole family album becomes a game.</p><div class="lesson-start"><a class="button button-ghost" href="/learning-path/">Back to the Learning Path <span aria-hidden="true">\u2197</span></a></div></div><figure class="lesson-cover"><img src="${FF_BASE}${FF_COVER.file}" width="${FF_COVER.w}" height="${FF_COVER.h}" alt="${esc(FF_COVER.alt)}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Every family is a team. Meet the whole roster.</h2><p class="lesson-copy">Family words are usually the first words a child ever learns — mum, dad, baby — because people are what little kids study hardest. This class takes that study seriously: every card prints one word in big friendly letters over a whole crowd of the people it names, so a four-year-old sees that families come in every shape while the word sticks. You do not need a desk for this class. You need your family photo album, the people at your dinner table, and maybe a neighbor to wave at.</p><p class="lesson-copy">The shelves follow the family tree. The People in My House shelf starts with the ones you wake up next to — mum, dad, sisters, brothers, twins and babies. The Bigger Family shelf climbs the tree — grandmas, grandpas, aunties, uncles, cousins, nephews and nieces. The Married-in &amp; Partners shelf celebrates the family gained at weddings — husbands, wives, partners and the in-laws. And the Friends &amp; Neighbors shelf finishes with the people the family chooses — best friends, classmates, teachers and the team.</p></section>`;
 const shelfSections=FF_SHELVES.map(sh=>`<section class="wrap lesson-section" id="shelf-${sh.id}"><span class="eyebrow">${sh.label}</span><h2>${sh.h2}</h2><p class="fc-hint">${sh.hint} Every card opens its own page — the card, who this person is in a family, one way to make their day, and Download + Print. The pills answer one glance: the age, the subject, the grade level, the skill it builds.</p><div class="mn-cards">${sh.slugs.map(s=>tile(ffBySlug[s])).join('')}</div></section>`).join('');
 const around=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where the family words grow up.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/4-years/feelings-and-kindness/">Feelings &amp; Kindness in Class 38 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/community-helpers-and-our-neighborhood/">Neighborhood walks in Class 33 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/life-skills-and-good-habits/">Good habits in Class 32 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/learning-path/">The Learning Path <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Class 38 grows the feeling words — and feelings mostly happen around people: the sister who shares, the friend who helps, the grandma who listens. Class 33 walks the big neighborhood, where helpers like firefighters and doctors work beside the smaller helpers at home — the people on these cards. Class 32 practises the good habits, and this class names the people we practise them with. And when you want the next class, the Learning Path holds all forty-five in order.</p></section>`;
 return `${hero}${how}${shelfSections}${around}<p class="lesson-note"><strong>Family is the first classroom.</strong> Every card here hands you a person to appreciate out loud — and your grown-up\u2019s whole job is to say the word with you while you wave, hug, help or draw for them.</p>`;
}

/* ---- One short page per person (owner brief: "/family-and-friends/<word>/
   with a link back") — the Class 39/40/44 short-page precedent -------------- */
export function ffShortBody(slug){
 const c=ffBySlug[slug];
 if(!c)throw Error('family-friends: no card for '+slug);
 const i=wordIndex(slug);
 const prev=FF_ORDER[i-2]?`<a class="lesson-pill-link" href="${FF_PATH}${FF_ORDER[i-2]}/">\u2190 ${esc(ffBySlug[FF_ORDER[i-2]].word)}</a>`:'';
 const next=FF_ORDER[i]?`<a class="lesson-pill-link" href="${FF_PATH}${FF_ORDER[i]}/">${esc(ffBySlug[FF_ORDER[i]].word)} \u2192</a>`:'';
 return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/learning-path/">Learning Path</a><span aria-hidden="true">/</span><a href="${FF_PATH}">Family &amp; Friends</a><span aria-hidden="true">/</span><span aria-current="page">${esc(c.word)}</span></nav>
 <div class="page-heading wrap"><span class="eyebrow">CLASS 45 \u00b7 FAMILY &amp; FRIENDS \u00b7 CARD ${i} OF 35</span><h1>${esc(c.word)}</h1><p>${esc(c.say)}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main"><figure class="fc2-hero"><img src="${FF_BASE}${c.file}" width="${W}" height="${H}" alt="${esc(c.alt)}" loading="lazy"><figcaption><strong>The ${esc(c.word)} card</strong><span>Family &amp; Friends \u00b7 the people behind the word</span></figcaption></figure>
  <section class="fc2-learn" aria-label="The ${esc(c.word)} card, up close">
   <div class="fc2-do"><h2>On the card</h2><p>\u201c${esc(c.word)}\u201d — printed in big ${esc(c.color)} letters over ${esc(c.group)}.</p></div>
   <div class="fc2-do"><h2>Who they are</h2><p>${esc(c.who)}</p></div>
   <div class="fc2-do"><h2>Try it today</h2><p>${esc(c.try)}</p></div>
   <div class="fc2-do fc2-note"><h2>Keep going</h2><p>${esc(c.word)} is card ${i} of 35 in the Family &amp; Friends class. Print it for the fridge, then hop back to the class page to meet the next person.</p></div>
  </section></div>
  <aside class="fc2-rail" aria-label="More family words"><section class="fc2-block fc2-first-block"><span class="eyebrow">PART OF THE CLASS</span><h2>Thirty-five people, one big family.</h2><p class="fc-hint">${esc(c.word)} is one of 35 family and friends words for ages 4\u20135.</p><a class="button" href="${FF_PATH}">Back to all the people <span aria-hidden="true">\u2197</span></a><div class="mn-actions"><a class="button" href="${FF_BASE}${c.file}" download="${c.slug}.jpg">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></section></aside>
 </div>
 <div class="wrap lesson-section"><div class="lesson-linkrow">${prev}${next}</div></div>`;
}

/* ---- Inbound-link blocks, appended at the three classes' page() calls ----- */
/* Appended to Class 38 · Feelings & Kindness. */
export const FF_FEELINGS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">FROM FEELINGS TO THE PEOPLE WHO SHARE THEM</span><h2>Class 45 \u00b7 Family &amp; Friends.</h2><p class="lesson-copy">Class 38 grows the feeling words — and feelings mostly happen around people: the sister who shares, the friend who helps, the grandma who listens. The <a href="/family-and-friends/">Family &amp; Friends class</a> prints those people as cards: thirty-five family and friends flashcards for ages 4\u20135, one short page per person, each with who they are in a family and one way to make their day today.</p></section>`;
/* Appended to Class 33 · Community Helpers & Our Neighborhood. */
export const FF_HELPERS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">HELPERS LIVE NEXT DOOR TOO</span><h2>Class 45 \u00b7 Family &amp; Friends.</h2><p class="lesson-copy">Class 33 walks the big neighborhood — the doctor, the mailbox, the fire station — and the <a href="/family-and-friends/">Family &amp; Friends class</a> walks the small one: the house and the street around it. Mum, dad, grandma, the neighbor who waves every morning, the teacher waiting at the door — thirty-five printable family member flashcards for ages 4\u20135, one page per person, each with one way to be a helper at home today.</p></section>`;
/* Appended to Class 32 · Life Skills & Good Habits. */
export const FF_LIFE_SKILLS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">GOOD HABITS START WITH GOOD PEOPLE</span><h2>Class 45 \u00b7 Family &amp; Friends.</h2><p class="lesson-copy">Class 32 practises the habits — hand-washing, tidying up, kind words — and the <a href="/family-and-friends/">Family &amp; Friends class</a> names the people we practise them with. Thirty-five printable family and friends flashcards for ages 4\u20135, one short page per person, each with a try-it-today job: set the table for Dad, draw Auntie a picture, wave hello to a neighbor.</p></section>`;
