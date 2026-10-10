import {journalImages,type JournalImage} from './journal-images';
import {guideImageUpdates} from './editorial-image-updates';
// A guide and the article it links to intentionally share one topic image.
// This visual continuity replaces generic portraits reused across unrelated treatments.
export const serviceImageTopics:Record<string,string>={
 acne:'teen-acne','acne-scars':'acne-marks-vs-scars',pigmentation:'pigmentation',
 'hair-loss':'prp-for-hair-loss','scalp-health':'scalp-health',
 'natural-rejuvenation':'natural-rejuvenation','rejuvenation-45':'skin-after-45',
 botox:'natural-rejuvenation',fillers:'questions-before-fillers',microneedling:'acne-marks-vs-scars',
 prp:'prp-skin-evidence',prf:'prp-vs-prf',exosomes:'exosomes-evidence','cell-based':'cell-therapy-stem-cells',
 mesogel:'mesogel-skin-quality',regenerative:'regenerative-medicine'
};
const categoryTopics:Record<string,string>={skin:'pigmentation',hair:'prp-for-hair-loss',rejuvenation:'natural-rejuvenation',advanced:'regenerative-medicine'};
export function guideImage(slug:string):JournalImage|undefined{return (guideImageUpdates as Record<string,JournalImage>)[slug] ?? (journalImages as Record<string,JournalImage>)[slug]}
export function categoryImage(slug:string):JournalImage{return guideImage(categoryTopics[slug])!}
