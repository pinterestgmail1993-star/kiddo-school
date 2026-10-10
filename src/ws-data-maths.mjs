// Kiddo School — Class 24 maths worksheet specs.
// HONEST NOTE: the owner's planned 30 Maths Adventures do not exist yet —
// no games, no pages, and only two maths artworks have been uploaded to R2
// (school/maths/adventures/counting-caterpillar.webp and counting-apples.webp,
// both verified live). These two worksheets are built from those real
// artworks; the registry holds 30 slots and the remaining 28 become one-data-
// entry additions the moment their artwork lands. Nothing is invented.
import {SUBJECTS,R2} from './ws-common.mjs';

const S=SUBJECTS.maths;
const M2='school/maths/adventures/';

export const mathsWorksheets=[
 {
  slug:'counting-caterpillar',num:1,subject:S.key,title:'Counting Caterpillar',
  art:{img:R2+M2+'counting-caterpillar.webp',alt:'A cheerful caterpillar made of ten colorful circle segments with a smiling red head.'},
  game:null,
  classNum:S.classNum,classPath:S.classPath,classTitle:S.classTitle,
  seoTitle:'Counting Caterpillar Worksheet \u2014 Free Printable Counting to 10 for Age 4 (Class 24)',
  metaDescription:'Free printable Counting Caterpillar worksheet for 4-year-olds: count the caterpillar\u2019s ten circle segments, trace the number 10, and count rows of apples. Download the PDF from Kiddo.school.',
  lede:'Count every circle of the caterpillar, trace the number you find, and count rows of apples along the way.',
  learn:'The caterpillar is made of ten numbered circle segments \u2014 counting them one by one, with a finger on each circle, is classic one-to-one counting practice. Tracing the numeral 10 afterwards connects \u201chow many\u201d with \u201cwhat it looks like written down\u201d.',
  skills:['Counting objects one by one to 10','Touch-counting without skipping','Tracing and writing the number 10','Counting small groups of apples'],
  task:'Count the caterpillar\u2019s circles, trace the number, and count each apple row.',
  wsType:'caterpillar',ws:{},answers:'The caterpillar has 10 circles. The apple rows have 3, 5 and 2.'
 },
 {
  slug:'counting-apples',num:2,subject:S.key,title:'Counting Apples',
  art:{img:R2+M2+'counting-apples.webp',alt:'Ten red apples arranged above an empty woven basket.'},
  game:null,
  classNum:S.classNum,classPath:S.classPath,classTitle:S.classTitle,
  seoTitle:'Counting Apples Worksheet \u2014 Free Printable Counting & Drawing for Age 4 (Class 24)',
  metaDescription:'Free printable Counting Apples worksheet for 4-year-olds: count apples in each row, draw the right number in the basket, and trace 3, 5 and 10. Download the PDF from Kiddo.school.',
  lede:'Count the apples in every row, draw exactly the right number into each basket, and trace your numbers.',
  learn:'Counting rows of apples practices the count-then-write sequence: how many, and what does that number look like? The basket task flips it around \u2014 now your child must DRAW a given number, which checks understanding from the other direction.',
  skills:['Counting groups of 2 to 5 apples','Writing numerals in answer boxes','Drawing a given number of objects','Tracing numerals 3, 5 and 10'],
  task:'Count each row, fill the baskets with the right number of apples, trace the numbers.',
  wsType:'apples',ws:{},answers:'Row counts: 3, 5, 2 and 4. Baskets: 3 apples, then 5 apples. Trace 3, 5 and 10.'
 }
];

/* The registry reserves 30 Class 24 slots: the two real worksheets above plus
   28 pending the owner's artwork. See the final report — nothing here claims
   artwork that does not exist. */
export const MATHS_TOTAL=30;
