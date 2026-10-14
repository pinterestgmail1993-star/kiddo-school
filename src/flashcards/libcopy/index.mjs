// Library copy manifest — every set's card-page copy in one map.
// Each per-set module supplies {frame:{t1..t5}, cards:{slug:{helps,roleplay,learn,print,teachTip}}}:
// the card page's OWN printed-card text (how it helps / how to use it /
// what kids learn / how to print it / tips), never shared with the lessons.
// Older three-field modules are normalised here so the build never breaks.
import ch from './community-helpers-and-our-neighborhood.mjs';
import ls from './life-skills-and-good-habits.mjs';
import ws from './weather-seasons-and-what-we-wear.mjs';
import sci from './science-nature-and-discovery.mjs';
import abc from './alphabet.mjs';
import num from './numbers-and-counting.mjs';
import nmg from './numbers-counting-and-early-math.mjs';
import ah from './animals-and-their-habitats.mjs';
import shp from './shapes.mjs';
import col from './colors.mjs';
import opp from './opposites.mjs';
import ani from './animals.mjs';
import bps from './body-parts-and-five-senses.mjs';
import fav from './fruits-and-vegetables.mjs';
import anso from './animals-and-sounds.mjs';
import vhso from './vehicles-and-sounds.mjs';
import csh from './colors-and-shapes.mjs';
import mso from './matching-and-sorting.mjs';
import emo from './emotions-and-feelings.mjs';
import fcp from './first-concepts.mjs';
import gbf from './garden-bugs-and-friends.mjs';
import gfr from './garden-friends.mjs';
import gfl from './garden-flowers.mjs';
import gth from './garden-things.mjs';
import fvt from './faces-and-visual-tracking.mjs';
import cfo from './colors-and-first-objects.mjs';
import fwft from './first-words-familiar-things.mjs';
import aeo from './animals-everyday-objects.mjs';
import fab from './first-actions-body-parts.mjs';
import fwfh from './first-words-food-home.mjs';
import baby from './black-and-white-baby-cards.mjs';
import sw from './sight-words.mjs';
import ph from './phonics-and-beginning-sounds.mjs';

const norm=m=>m&&m.cards?m:{frame:null,cards:m};

export default{
 'community-helpers-and-our-neighborhood':norm(ch),
 'life-skills-and-good-habits':norm(ls),
 'weather-seasons-and-what-we-wear':norm(ws),
 'science-nature-and-discovery':norm(sci),
 'alphabet':norm(abc),
 'numbers-and-counting':norm(num),
 'numbers-counting-and-early-math':norm(nmg),
 'animals-and-their-habitats':norm(ah),
 'sight-words':norm(sw),
 'phonics-and-beginning-sounds':norm(ph),
 'shapes':norm(shp),
 'colors':norm(col),
 'opposites':norm(opp),
 'animal-sounds':norm(ani),
 'body-parts-and-five-senses':norm(bps),
 'fruits-and-vegetables':norm(fav),
 'animals-and-sounds':norm(anso),
 'vehicles-and-sounds':norm(vhso),
 'colors-and-shapes':norm(csh),
 'matching-and-sorting':norm(mso),
 'emotions-and-feelings':norm(emo),
 'first-concepts':norm(fcp),
 'garden-bugs-and-friends':norm(gbf),
 'garden-friends':norm(gfr),
 'garden-flowers':norm(gfl),
 'garden-things':norm(gth),
 'faces-and-visual-tracking':norm(fvt),
 'colors-and-first-objects':norm(cfo),
 'first-words-familiar-things':norm(fwft),
 'animals-everyday-objects':norm(aeo),
 'first-actions-body-parts':norm(fab),
 'first-words-food-home':norm(fwfh),
 'black-and-white-baby-cards':norm(baby)
};
