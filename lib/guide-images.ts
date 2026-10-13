import {journalImages,type JournalImage} from './journal-images';
import {serviceImages} from './service-images';
// Topic links retain their editorial relationships; services have dedicated photographs.
export const serviceImageTopics:Record<string,string>={
 acne:'teen-acne','acne-scars':'acne-marks-vs-scars',pigmentation:'pigmentation',
 'hair-loss':'prp-for-hair-loss','scalp-health':'scalp-health',
 'natural-rejuvenation':'natural-rejuvenation','rejuvenation-45':'skin-after-45',
 botox:'natural-rejuvenation',fillers:'questions-before-fillers',microneedling:'acne-marks-vs-scars',
 prp:'prp-skin-evidence',prf:'prp-vs-prf',exosomes:'exosomes-evidence','cell-based':'cell-therapy-stem-cells',
 mesogel:'mesogel-skin-quality',regenerative:'regenerative-medicine'
};
const categoryServices:Record<string,string>={skin:'pigmentation',hair:'hair-loss',rejuvenation:'natural-rejuvenation',advanced:'regenerative'};
export function guideImage(slug:string):JournalImage|undefined{return journalImages[slug] ?? serviceImages[slug]}
export function categoryImage(slug:string):JournalImage{return serviceImages[categoryServices[slug]]}
