import {homepageFeedbackImages} from './homepage-feedback-images';
import {journalImages} from './journal-images';
// Featured service portraits match the corresponding service detail pages.
export const homeServices = [
  {
    "slug": "skin",
    "label": "PRP",
    "title": "PRP پوست و مو",
    "body": "کاربردهای پلاکت‌های خون خود فرد در پوست و مو را بشناسید.",
    "href": "/services/prp",
    "image": homepageFeedbackImages["service-prp"]!
  },
  {
    "slug": "hair",
    "label": "مزوژل",
    "title": "مزوژل",
    "body": "محصولات تزریقی با هدف بهبود کیفیت پوست، با ترکیب‌هایی متفاوت.",
    "href": "/services/mesogel",
    "image": homepageFeedbackImages["service-mesogel"]!
  },
  {
    "slug": "rejuvenation",
    "label": "روش‌های سلولی",
    "title": "روش‌های نوین سلولی",
    "body": "روش‌هایی با استفاده از سلول زنده؛ از پیوند سلول‌های پوست تا پژوهش‌های سلول بنیادی.",
    "href": "/services/cell-based",
    "image": homepageFeedbackImages["service-cell-based"]!
  },
  {
    "slug": "advanced",
    "label": "پزشکی بازساختی",
    "title": "پزشکی بازساختی (Regenerative)",
    "body": "از فرآورده‌های پلاکتی و سلولی تا مهندسی بافت؛ با مسیرهای این حوزه آشنا شوید.",
    "href": "/services/regenerative",
    "image": homepageFeedbackImages["service-regenerative"]!
  }
];

export const methodComparisons = [
  {
    "label": "PRP",
    "title": "پلاکت‌های خون خودتان",
    "body": "PRP فرآورده‌ای غنی از پلاکت است که از خون خود فرد تهیه می‌شود.",
    "link": "/journal/prp-skin-evidence",
    "image": homepageFeedbackImages["method-prp"],
    "question": "برای مشکل من چه شواهدی دارد؟"
  },
  {
    "label": "مزوژل",
    "title": "ترکیب‌های متفاوت برای پوست",
    "body": "بسیاری از مزوژل‌ها هیالورونیک اسید دارند؛ ترکیب دقیق را باید روی هر محصول شناخت.",
    "link": "/journal/mesogel-skin-quality",
    "image": journalImages["mesogel-skin-quality"],
    "question": "ترکیب دقیق این محصول چیست؟"
  },
  {
    "label": "سلول‌درمانی",
    "title": "سلول زنده، با کاربرد مشخص",
    "body": "سلول‌درمانی می‌تواند از سلول‌های تخصص‌یافته، مانند سلول‌های رنگدانه‌ساز پوست، استفاده کند.",
    "link": "/journal/cell-therapy-stem-cells",
    "image": homepageFeedbackImages["method-cell-therapy"],
    "question": "کدام سلول و برای چه کاربردی؟"
  },
  {
    "label": "اگزوزوم",
    "title": "ذرات آزادشده از سلول",
    "body": "اگزوزوم ذره‌ای آزادشده از سلول است؛ ماهیت آن با سلول زنده تفاوت دارد.",
    "link": "/journal/exosomes-vs-stem-cells",
    "image": homepageFeedbackImages["method-exosomes"],
    "question": "منبع فرآورده و وضعیت مجوز چیست؟"
  }
];

export const homeArticles = [
  {
    "slug": "regenerative-medicine",
    "title": "پزشکی بازساختی چیست؟",
    "topic": "مبانی و کاربردها"
  },
  {
    "slug": "elvitha-natural-beauty",
    "title": "زیبایی طبیعی در نگاه الویتا",
    "topic": "نگاه الویتا"
  },
  {
    "slug": "everyday-skin-care",
    "title": "روتینی ساده، متناسب با پوست شما",
    "topic": "مراقبت روزانه"
  }
];

export const homeFaq = [
  {
    "question": "برای مشاوره باید درمانی انتخاب کرده باشم؟",
    "answer": "با دغدغه و پرسش خودتان شروع کنید. سابقهٔ پزشکی و انتظارتان کمک می‌کنند گزینهٔ مناسب پس از ارزیابی روشن شود."
  },
  {
    "question": "هزینه و تعداد جلسات چگونه مشخص می‌شود؟",
    "answer": "به روش، محصول و برنامهٔ پیگیری بستگی دارد. هزینه و تعداد جلسات پس از ارزیابی نیاز شما و انتخاب برنامه روشن می‌شود."
  },
  {
    "question": "چه خدماتی در الویتا ارائه خواهد شد؟",
    "answer": "خدمات الویتا حوزه‌های پوست، مو، جوان‌سازی و پزشکی بازساختی را پوشش می‌دهند. مناسب‌بودن هر روش در مشاوره بررسی می‌شود."
  }
];

export const homeJourney = [
  {
    "title": "دغدغهٔ شما",
    "body": "از تغییرات پوست یا مو و چیزی که برایتان مهم است بگویید.",
    "image": homepageFeedbackImages["journey-concern"].src,
    "alt": homepageFeedbackImages["journey-concern"].alt
  },
  {
    "title": "بررسی گزینه‌ها",
    "body": "پس از ارزیابی، گزینه‌ها، هزینه و انتظار از نتیجه روشن می‌شود.",
    "image": homepageFeedbackImages["journey-options"].src,
    "alt": homepageFeedbackImages["journey-options"].alt
  },
  {
    "title": "تصمیم و پیگیری",
    "body": "با تصمیم آگاهانه، برنامهٔ مراقبت و زمان بازبینی مشخص می‌شود.",
    "image": homepageFeedbackImages["journey-followup"].src,
    "alt": homepageFeedbackImages["journey-followup"].alt
  }
];
