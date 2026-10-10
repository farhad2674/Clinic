import {journalImageUpdates} from './editorial-image-updates';
// Original collection: assets/elvitha-journal/manifest.json.
// Content-specific refresh: docs/editorial-image-refresh-prompts.json.
export type JournalImage = {src:string;thumbnail:string;alt:string;width:number;height:number;thumbnailWidth:number;position:string;caption:string};
const previousJournalImages = {
  "prp-for-hair-loss": {
    "src": "/media/journal-elvitha/prp-for-hair-loss.webp",
    "thumbnail": "/media/journal-elvitha/prp-for-hair-loss-800.webp",
    "alt": "شانه چوبی و دسته‌ای از تارهای طبیعی مو روی پارچه روشن",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "acne-marks-vs-scars": {
    "src": "/media/journal-elvitha/acne-marks-vs-scars.webp",
    "thumbnail": "/media/journal-elvitha/acne-marks-vs-scars-800.webp",
    "alt": "دو قطعه سرامیک صورتی با تفاوت رنگ سطح و فرورفتگی‌های ظریف",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "teen-acne": {
    "src": "/media/journal-elvitha/teen-acne.webp",
    "thumbnail": "/media/journal-elvitha/teen-acne-800.webp",
    "alt": "کیف پارچه‌ای ساده، شوینده بدون نوشته و دفتر کوچک مراقبت پوست",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "natural-rejuvenation": {
    "src": "/media/journal-elvitha/natural-rejuvenation.webp",
    "thumbnail": "/media/journal-elvitha/natural-rejuvenation-800.webp",
    "alt": "مجسمه انتزاعی سرامیکی با خطوط نرم و انعکاس آرام در آینه",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "prp-vs-prf": {
    "src": "/media/journal-elvitha/prp-vs-prf.webp",
    "thumbnail": "/media/journal-elvitha/prp-vs-prf-800.webp",
    "alt": "دو قطعه شیشه با بافت روان و شبکه‌ای روی پایه سنگی",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "exosomes-evidence": {
    "src": "/media/journal-elvitha/exosomes-evidence.webp",
    "thumbnail": "/media/journal-elvitha/exosomes-evidence-800.webp",
    "alt": "ترکیب مفهومی عدسی شیشه‌ای و نقاط کوچک نیمه‌شفاف روی کاغذ",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "different-treatment-results": {
    "src": "/media/journal-elvitha/different-treatment-results.webp",
    "thumbnail": "/media/journal-elvitha/different-treatment-results-800.webp",
    "alt": "سه سنگ روشن با بافت و اندازه متفاوت روی پارچه صورتی کم‌رنگ",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "questions-before-fillers": {
    "src": "/media/journal-elvitha/questions-before-fillers.webp",
    "thumbnail": "/media/journal-elvitha/questions-before-fillers-800.webp",
    "alt": "دفتر باز بدون نوشته، مداد و آینه دستی روی میز روشن",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "before-after-photos": {
    "src": "/media/journal-elvitha/before-after-photos.webp",
    "thumbnail": "/media/journal-elvitha/before-after-photos-800.webp",
    "alt": "لنز دوربین، کارت خاکستری ساده و قاب نور روی سطح روشن",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "skin-after-45": {
    "src": "/media/journal-elvitha/skin-after-45.webp",
    "thumbnail": "/media/journal-elvitha/skin-after-45-800.webp",
    "alt": "پارچه ابریشمی چین‌دار کنار ظرف کرم ساده و سنگ روشن",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "regenerative-medicine": {
    "src": "/media/journal-elvitha/regenerative-medicine.webp",
    "thumbnail": "/media/journal-elvitha/regenerative-medicine-800.webp",
    "alt": "سازه مشبک دست‌ساز از کاغذ روشن با سایه‌های ظریف",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "cell-therapy-stem-cells": {
    "src": "/media/journal-elvitha/cell-therapy-stem-cells.webp",
    "thumbnail": "/media/journal-elvitha/cell-therapy-stem-cells-800.webp",
    "alt": "سه فرم گِلی روشن در مراحل متفاوت شکل‌گیری کنار هم",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "prp-skin-evidence": {
    "src": "/media/journal-elvitha/prp-skin-evidence.webp",
    "thumbnail": "/media/journal-elvitha/prp-skin-evidence-800.webp",
    "alt": "برگه‌های ساده پژوهش، عدسی و قطعه شیشه شامپاینی روی میز",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "mesogel-skin-quality": {
    "src": "/media/journal-elvitha/mesogel-skin-quality.webp",
    "thumbnail": "/media/journal-elvitha/mesogel-skin-quality-800.webp",
    "alt": "قطره ژل شفاف روی شیشه مات و پارچه روشن",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "novel-cellular-methods": {
    "src": "/media/journal-elvitha/novel-cellular-methods.webp",
    "thumbnail": "/media/journal-elvitha/novel-cellular-methods-800.webp",
    "alt": "سه قاب کاغذی متوالی با نور و سایه روی سطح سنگی",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "vitiligo-cell-therapy": {
    "src": "/media/journal-elvitha/vitiligo-cell-therapy.webp",
    "thumbnail": "/media/journal-elvitha/vitiligo-cell-therapy-800.webp",
    "alt": "قطعه سرامیک با نواحی طبیعی سفید و خاکی در کنار پارچه روشن",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "psoriasis-cell-therapy": {
    "src": "/media/journal-elvitha/psoriasis-cell-therapy.webp",
    "thumbnail": "/media/journal-elvitha/psoriasis-cell-therapy-800.webp",
    "alt": "لایه‌های نازک کاغذ دست‌ساز با لبه‌های طبیعی و نور نرم",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "lichen-planus-cell-therapy": {
    "src": "/media/journal-elvitha/lichen-planus-cell-therapy.webp",
    "thumbnail": "/media/journal-elvitha/lichen-planus-cell-therapy-800.webp",
    "alt": "پارچه بافت‌دار یاسی کم‌رنگ و ذره‌بین کوچک روی سنگ روشن",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "autoimmunity-after-covid": {
    "src": "/media/journal-elvitha/autoimmunity-after-covid.webp",
    "thumbnail": "/media/journal-elvitha/autoimmunity-after-covid-800.webp",
    "alt": "دو حلقه نخ روشن با بخشی هم‌پوشان روی صفحه سنگی",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "exosomes-vs-stem-cells": {
    "src": "/media/journal-elvitha/exosomes-vs-stem-cells.webp",
    "thumbnail": "/media/journal-elvitha/exosomes-vs-stem-cells-800.webp",
    "alt": "حباب شیشه‌ای توخالی و خوشه دانه‌های شیشه‌ای کوچک روی پایه روشن",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "consultation-preparation": {
    "src": "/media/journal-elvitha/consultation-preparation.webp",
    "thumbnail": "/media/journal-elvitha/consultation-preparation-800.webp",
    "alt": "دفترچه بسته، کارت‌های یادداشت بدون نوشته و مداد روی میز",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "elvitha-natural-beauty": {
    "src": "/media/journal-elvitha/elvitha-natural-beauty.webp",
    "thumbnail": "/media/journal-elvitha/elvitha-natural-beauty-800.webp",
    "alt": "شاخه زیتون با سایه طبیعی کنار آینه بیضی روی پارچه روشن",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  },
  "everyday-skin-care": {
    "src": "/media/journal-elvitha/everyday-skin-care.webp",
    "thumbnail": "/media/journal-elvitha/everyday-skin-care-800.webp",
    "alt": "سه ظرف ساده مراقبت پوست کنار حوله پنبه‌ای روشن",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 50%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله."
  }
} satisfies Record<string,JournalImage>;

export const journalImages = {...previousJournalImages,...journalImageUpdates};
