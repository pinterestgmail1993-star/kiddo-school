#!/usr/bin/env python3
"""Insert the two parents'-shelf page() calls into scripts/build.mjs after the
question-words shelf page, and add the FC_TAGS entries to src/hub-filters.mjs."""
import pathlib, sys

b = pathlib.Path('/home/z/my-project/kiddo-school/scripts/build.mjs')
s = b.read_text(encoding='utf-8')

anchor = ",'/flashcards/question-words/']])],ogImage:QW_BASE+QW_COVER.file,ogAlt:QW_COVER.alt,ogW:QW_COVER.w,ogH:QW_COVER.h});"
assert s.count(anchor) == 1, 'QW page anchor not found'

addition = anchor + """
/* ---- CLASS 39 · Staying Safe — the parents' shelf in the library (owner
   2026-10-31: "make flashcards library pages too … no individual pages").
   The whole 19-card deck prints from this ONE page: Download + Print under
   every image, age + subject + level pills, a parent tip under each card.
   Zero per-card URLs in the library; the class keeps its own lesson pages. */
page('/flashcards/staying-safe/','Staying Safe Flashcards to Print \\u2014 19 Safety Cards for Parents (Ages 4\\u20135)','The parents\\u2019 shelf for Class 39 \\u00b7 Staying Safe: all nineteen safety cards for ages 4\\u20135 on one printable page \\u2014 every card with its parent tip, an age, subject and level pill, a download button and one-tap printing, and no card pages to hop through. The child\\u2019s lesson lives in the Staying Safe class.',crumb([['Flashcards','/flashcards/'],['Staying Safe']])+heading('FLASHCARD SET \\u00b7 AGES 4\\u20135','Staying Safe flashcards \\u2014 the parent shelf: 19 cards to download and print.','The whole safety deck for printing at home: nineteen safety-rule cards for ages four to five, each with its parent tip, its three pills \\u2014 age, subject, level \\u2014 its download button and one-tap printing; the library is the parents\\u2019 side of the class, so everything happens on this one shelf.')+stayingSafeLibBody(),{schema:[ssBc(site,[['Flashcards','/flashcards/'],['Staying Safe','/flashcards/staying-safe/']])],ogImage:SS_LIB_SET.coverUrl,ogAlt:SS_LIB_SET.cover.alt,ogW:SS_LIB_SET.cover.w,ogH:SS_LIB_SET.cover.h});
/* ---- CLASS 40 · Healthy Food — the parents' shelf in the library (owner
   2026-10-31, the same one-shelf rule, both decks in the library). */
page('/flashcards/healthy-food/','Healthy Food Flashcards to Print \\u2014 21 Food-Habit Cards for Parents (Ages 4\\u20135)','The parents\\u2019 shelf for Class 40 \\u00b7 Healthy Food & Eating Well: all twenty-one food-habit cards for ages 4\\u20135 on one printable page \\u2014 every card with its parent tip, an age, subject and level pill, a download button and one-tap printing, and no card pages to hop through. The child\\u2019s lesson lives in the Healthy Food class.',crumb([['Flashcards','/flashcards/'],['Healthy Food & Eating Well']])+heading('FLASHCARD SET \\u00b7 AGES 4\\u20135','Healthy Food flashcards \\u2014 the parent shelf: 21 cards to download and print.','The whole food-habit deck for printing at home: twenty-one healthy-eating cards for ages four to five, each with its parent tip, its three pills \\u2014 age, subject, level \\u2014 its download button and one-tap printing; the library is the parents\\u2019 side of the class, so everything happens on this one shelf.')+healthyFoodLibBody(),{schema:[ssBc(site,[['Flashcards','/flashcards/'],['Healthy Food & Eating Well','/flashcards/healthy-food/']])],ogImage:HF_LIB_SET.coverUrl,ogAlt:HF_LIB_SET.cover.alt,ogW:HF_LIB_SET.cover.w,ogH:HF_LIB_SET.cover.h});"""

if "page('/flashcards/staying-safe/'" not in s:
    s = s.replace(anchor, addition)

b.write_text(s, encoding='utf-8')
print('build.mjs: page calls', 'inserted' if "page('/flashcards/staying-safe/'" in s else 'MISSING')

h = pathlib.Path('/home/z/my-project/kiddo-school/src/hub-filters.mjs')
t = h.read_text(encoding='utf-8')
tag_anchor = " 'question-words':['age-3','age-4-5','lvl-prek','subj-reading','skill-talking','skill-thinking'],"
assert t.count(tag_anchor) == 1, 'FC_TAGS anchor not found: '+str(t.count(tag_anchor))
tag_add = tag_anchor + """
 // CLASS 39 · Staying Safe (owner 2026-10-31): the safety rules ride the
 // good-habits subject (life-skills precedent), the drills and the
 // asking-telling words carry routines + talking + thinking.
 'staying-safe':['age-4-5','lvl-prek','subj-feelings','skill-routines','skill-talking','skill-thinking'],
 // CLASS 40 · Healthy Food (owner 2026-10-31): food words ride first-words
 // (fruits-vegetables precedent), the table habits are real routines and the
 // talking-together skill.
 'healthy-food':['age-4-5','lvl-prek','subj-first-words','subj-feelings','skill-vocab','skill-routines','skill-talking'],"""
if "'staying-safe':['age-4-5'" not in t:
    t = t.replace(tag_anchor, tag_add)
h.write_text(t, encoding='utf-8')
print('hub-filters.mjs: FC_TAGS', 'inserted' if "'staying-safe':['age-4-5'" in t else 'MISSING')
