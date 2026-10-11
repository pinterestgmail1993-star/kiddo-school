// Kiddo School — Story & Logic Adventure kit (Classes 29, 30 & 31).
// Shared path constants for the three artwork-driven adventure collections.
// The games are now draw-on-the-picture activities (image + transparent
// Write & Color layer + text instructions), so the old sprite-cropping
// card builders and the coded board shell are retired for good.
import {R2} from './adventure-kit.mjs';

export const READING_BASE=R2+'school/reading/adventures/';
export const LOGIC_BASE=R2+'school/logic/adventures/';
export const SCIENCE_BASE=R2+'school/science/adventures/';
export const READING_LIB_PATH='/preschool/reading/adventures/';
export const READING_LIB=READING_LIB_PATH;
export const LOGIC_LIB_PATH='/preschool/logic/adventures/';
export const LOGIC_LIB=LOGIC_LIB_PATH;
export const SCIENCE_LIB_PATH='/preschool/science/adventures/';
export const SCIENCE_LIB=SCIENCE_LIB_PATH;
export const C29_PATH='/preschool/4-years/storytime-and-pre-reading/';
export const C30_PATH='/preschool/4-years/logic-thinking-and-problem-solving/';
export const C31_PATH='/preschool/4-years/science-nature-and-discovery/';
export const WS29_PATH='/worksheets/reading/';
export const WS30_PATH='/worksheets/logic/';
export const WS31_PATH='/worksheets/science/';

export const escAttr=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
