import originalContent from './content.json';
import {additionalServices} from './regenerative-services';
export const content={...originalContent,services:[...originalContent.services.map(s=>s.slug==='cell-based'?{...s,title:'سلول‌درمانی و روش‌های نوین سلولی',heading:'شناخت روش، پیش از انتخاب',body:s.body.map(p=>p.replaceAll('سل‌تراپی','سلول‌درمانی'))}:s),...additionalServices]};
export const brand = {name:'الورا',title:'مرکز تخصصی پوست، مو، زیبایی و جوان‌سازی الورا',headline:'زیبایی، از شما شروع می‌شود.',cta:'از کجا شروع کنم؟'};
export type MediaAsset = {src:string;poster?:string;alt:string;concept:boolean;position?:string};
export const media:Record<string,MediaAsset>={
entrance:{src:'/media/entrance.mp4',poster:'/media/entrance-poster.webp',alt:'تصویر مفهومی ورودی و پذیرش الورا',concept:true,position:'54% center'},
portrait:{src:'/media/portrait-turn/supplied-portrait.mp4',poster:'/media/portrait-turn/supplied-poster.webp',alt:'ویدئوی نمایشی زن جوان بزرگسال با تل روسری که سر را به‌آرامی به کنار می‌چرخاند و دوباره رو به دوربین قرار می‌گیرد',concept:true},
lounge:{src:'/media/lounge.webp',alt:'تصویر مفهومی فضای انتظار الورا',concept:true},
brand:{src:'/media/brand-space.webp',alt:'تصویر مفهومی فضای الورا با نور طبیعی',concept:true},
hair:{src:'/media/hair.webp',alt:'تصویر هنری مدل با بافت طبیعی موهای تیره',concept:true},
mature:{src:'/media/mature.webp',alt:'پرتره تصویرسازی‌شده زنی با خطوط طبیعی چهره',concept:true}
};
// Populate only after the clinic confirms these public contact details.
export const contact:{phone:string|null;messagingUrl:string|null;address:string|null;hours:string|null;mapUrl:string|null}={phone:null,messagingUrl:null,address:null,hours:null,mapUrl:null};
export const categories=[
{slug:'skin',number:'01',label:'پوست',title:'خدمات پوست؛ آکنه، جای جوش و لک',heading:'برای پوستتان از کجا شروع کنید؟',body:'جوش فعال، جای جوش و لک، پرسش‌های متفاوتی دارند. با بررسی نوع پوست، نشانه‌ها و درمان‌های قبلی، گزینه‌های مرتبط با هر کدام را بشناسید.',image:'/media/young-natural.webp',tag:'آکنه، لک و بافت پوست'},
{slug:'hair',number:'02',label:'مو و پوست سر',title:'ریزش مو و سلامت پوست سر',heading:'از ریزش مو تا خارش پوست سر',body:'زمان شروع ریزش، الگوی کم‌پشتی و وضعیت پوست سر در ارزیابی بررسی می‌شوند. درباره ریزش مو، شوره و گزینه‌های مراقبت بیشتر بخوانید.',image:'/media/hair.webp',tag:'ریزش، کم‌پشتی و شوره'},
{slug:'rejuvenation',number:'03',label:'جوان‌سازی',title:'جوان‌سازی و زیبایی طبیعی',heading:'رسیدگی به پوست، با حفظ ویژگی‌های چهره',body:'بهبود کیفیت پوست، خطوط و تغییرات حجم را با هم بررسی کنید. بوتاکس، فیلر یا روش‌های دیگر باید با ساختار چهره و انتظار شما متناسب باشند.',image:'/media/young-natural.webp',tag:'کیفیت پوست و تناسب چهره'},
{slug:'advanced',number:'04',label:'روش‌های نوین',title:'پزشکی بازساختی و روش‌های سلولی',heading:'PRP، مزوژل و روش‌های سلولی را بشناسید',body:'کاربرد و محدودیت روش‌های نوین را بخوانید. پیشنهاد هر روش به شواهد، ایمنی، مجوز و شرایط شما وابسته است؛ ارائه اگزوزوم و فرآورده‌های سلولی هنوز تأیید نشده است.',image:'/media/brand-space.webp',tag:'کاربرد، شواهد و محدودیت‌ها'}
];
export const pages = [
{slug:'services',title:'راهنمای خدمات'},...categories.map(c=>({slug:c.slug,title:c.title})),
{slug:'about',title:'درباره الورا'},{slug:'care',title:'از کجا شروع کنم؟'},{slug:'journal',title:'مجله پزشکی بازساختی'},
{slug:'faq',title:'پرسش‌های متداول'},{slug:'contact',title:'تماس و درخواست مشاوره'},{slug:'privacy',title:'حریم خصوصی'}
];
export const chapters=[{id:'paths',title:'روش‌ها'},{id:'understanding',title:'انتخاب آگاهانه'},{id:'faq-preview',title:'پرسش‌ها'},{id:'invitation',title:'شروع'}];
export const faNumber=(n:number)=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
