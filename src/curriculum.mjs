// Kiddo School — the ONE list of the school's 22 real classes, in path
// order, with the age band each class belongs to. Everything that counts
// classes, recommends "Today's Class" or renders the Learning Path rows
// reads from here, so no page can drift out of sync with another.
// Bands: newborn (classes 1–2), baby (3–6), 12-18 (7), 18-24 (8),
// age2 (9–14), age3 (15–22).
import {hcLesson,fvLesson,cfoLesson,fwftLesson,aeoLesson,fabLesson,fwfhLesson,fcLesson,csLesson,msLesson,anLesson,vhLesson,emLesson,gbLesson} from './lessons.mjs';

const P15='/preschool/3-years/alphabet-and-letter-sounds/';
const P16='/preschool/3-years/numbers-and-counting/';
const P17='/preschool/3-years/shapes-and-patterns/';
const P18='/preschool/3-years/colors-and-color-mixing/';
const P19='/preschool/3-years/opposites-and-comparing/';
const P20='/preschool/3-years/animals-and-their-sounds/';
const P21='/preschool/3-years/body-parts-and-five-senses/';
const P22='/preschool/3-years/fruits-and-vegetables/';

export const CURRICULUM=[
 {n:1, stage:'Newborn 1',band:'newborn',bandLabel:'Newborn',      title:'High-Contrast Cards',            path:hcLesson.path},
 {n:2, stage:'Newborn 2',band:'newborn',bandLabel:'Newborn',      title:'First Faces & View',             path:fvLesson.path},
 {n:3, stage:'Infant 1', band:'baby',   bandLabel:'Baby',         title:cfoLesson.h1,                     path:cfoLesson.path},
 {n:4, stage:'Infant 2', band:'baby',   bandLabel:'Baby',         title:fwftLesson.h1,                    path:fwftLesson.path},
 {n:5, stage:'Explorer 1',band:'baby',  bandLabel:'Baby',         title:aeoLesson.h1,                     path:aeoLesson.path},
 {n:6, stage:'Explorer 2',band:'baby',  bandLabel:'Baby',         title:fabLesson.h1,                     path:fabLesson.path},
 {n:7, stage:'Toddler 1',band:'12-18',  bandLabel:'12–18 Months', title:fwfhLesson.h1,                    path:fwfhLesson.path},
 {n:8, stage:'Toddler 2',band:'18-24',  bandLabel:'18–24 Months', title:fcLesson.h1,                      path:fcLesson.path},
 {n:9, stage:'Toddler 3',band:'age2',   bandLabel:'Age 2',        title:csLesson.h1,                      path:csLesson.path},
 {n:10,stage:'Toddler 4',band:'age2',   bandLabel:'Age 2',        title:msLesson.h1,                      path:msLesson.path},
 {n:11,stage:'Toddler 5',band:'age2',   bandLabel:'Age 2',        title:anLesson.h1,                      path:anLesson.path},
 {n:12,stage:'Toddler 6',band:'age2',   bandLabel:'Age 2',        title:vhLesson.h1,                      path:vhLesson.path},
 {n:13,stage:'Toddler 7',band:'age2',   bandLabel:'Age 2',        title:emLesson.h1,                      path:emLesson.path},
 {n:14,stage:'Toddler 8',band:'age2',   bandLabel:'Age 2',        title:gbLesson.h1,                      path:gbLesson.path},
 {n:15,stage:'Preschool',band:'age3',   bandLabel:'Age 3',        title:'Alphabet & Letter Sounds',       path:P15},
 {n:16,stage:'Preschool',band:'age3',   bandLabel:'Age 3',        title:'Numbers & Counting (1–10)',      path:P16},
 {n:17,stage:'Preschool',band:'age3',   bandLabel:'Age 3',        title:'Shapes & Patterns',              path:P17},
 {n:18,stage:'Preschool',band:'age3',   bandLabel:'Age 3',        title:'Colors & Color Mixing',          path:P18},
 {n:19,stage:'Preschool',band:'age3',   bandLabel:'Age 3',        title:'Opposites & Comparing',          path:P19},
 {n:20,stage:'Preschool',band:'age3',   bandLabel:'Age 3',        title:'Animals & Their Sounds',         path:P20},
 {n:21,stage:'Preschool',band:'age3',   bandLabel:'Age 3',        title:'Body Parts & My Five Senses',    path:P21},
 {n:22,stage:'Preschool',band:'age3',   bandLabel:'Age 3',        title:'Fruits & Vegetables',            path:P22}
];

export const BANDS=[
 ['newborn','Newborn'],
 ['baby','Baby'],
 ['12-18','12–18 Months'],
 ['18-24','18–24 Months'],
 ['age2','Age 2'],
 ['age3','Age 3']
];
