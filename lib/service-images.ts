import type {JournalImage} from './journal-images';

// Four featured service portraits; journal imagery keeps its own mapping.
// Source, prompts and dimensions: docs/service-image-prompts.json.
export const serviceImages:Partial<Record<string,JournalImage>> = {
  "prp": {
    "src": "/media/services-elvitha/prp-v2.webp",
    "thumbnail": "/media/services-elvitha/prp-v2-800.webp",
    "alt": "زن جوان با موی مشکی کوتاه، تل روسری زرشکی و پیراهن آبی، کنار کاغذ و ذره‌بین روی سنگ روشن",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 0%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی؛ عکس بیمار یا نتیجه درمان نیست."
  },
  "mesogel": {
    "src": "/media/services-elvitha/mesogel-v2.webp",
    "thumbnail": "/media/services-elvitha/mesogel-v2-800.webp",
    "alt": "زن جوان با موهای شاه‌بلوطی فر، تل روسری آبی و ژاکت زیتونی، کنار شیشه مات و ژل شفاف",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 0%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی؛ عکس بیمار یا نتیجه درمان نیست."
  },
  "cell-based": {
    "src": "/media/services-elvitha/cell-based-v2.webp",
    "thumbnail": "/media/services-elvitha/cell-based-v2-800.webp",
    "alt": "زن جوان با موهای فر تیره جمع‌شده، تل روسری شامپاینی و کت خاکی، کنار فرم‌های سرامیکی",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 0%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی؛ عکس بیمار یا نتیجه درمان نیست."
  },
  "regenerative": {
    "src": "/media/services-elvitha/regenerative-v2.webp",
    "thumbnail": "/media/services-elvitha/regenerative-v2-800.webp",
    "alt": "زن جوان با موی قهوه‌ای عسلی و چتری، تل روسری قهوه‌ای و پیراهن صورتی، کنار سازه کاغذی مشبک",
    "width": 1254,
    "height": 1254,
    "thumbnailWidth": 800,
    "position": "50% 0%",
    "caption": "تصویر مفهومی ساخته‌شده با هوش مصنوعی؛ عکس بیمار یا نتیجه درمان نیست."
  }
};
