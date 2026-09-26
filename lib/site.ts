import content from './content.json';
export { content };
export const brand = {name:'الورا',title:'مرکز تخصصی پوست، مو، زیبایی و جوان‌سازی الورا',headline:'زیبایی مبتنی بر علم؛ مراقبت مبتنی بر اعتماد',cta:'درخواست ارزیابی و مشاوره'};
export type MediaAsset = {src:string;poster?:string;alt:string;concept:boolean;position?:string};
export const media:Record<string,MediaAsset>={
entrance:{src:'/media/entrance.mp4',poster:'/media/entrance-poster.webp',alt:'تصویر مفهومی ورودی و پذیرش الورا',concept:true,position:'54% center'},
portrait:{src:'/media/portrait.mp4',poster:'/media/portrait-poster.webp',alt:'پرتره یک مدل بزرگسال با بافت طبیعی پوست',concept:true},
lounge:{src:'/media/lounge.webp',alt:'تصویر مفهومی فضای انتظار الورا',concept:true},
brand:{src:'/media/brand-space.webp',alt:'تصویر مفهومی فضای الورا با نور طبیعی',concept:true},
hair:{src:'/media/hair.webp',alt:'تصویر هنری مدل با بافت طبیعی موهای تیره',concept:true},
mature:{src:'/media/mature.webp',alt:'پرتره تصویرسازی‌شده زنی با خطوط طبیعی چهره',concept:true}
};
// Populate only after the clinic confirms these public contact details.
export const contact:{phone:string|null;messagingUrl:string|null;address:string|null;hours:string|null;mapUrl:string|null}={phone:null,messagingUrl:null,address:null,hours:null,mapUrl:null};
export const categories=[
{slug:'skin',number:'01',label:'پوست',title:'سلامت و درمان پوست',heading:'پوست سالم، پایه زیبایی طبیعی است',body:'از آکنه و جای جوش تا لک، ناهماهنگی رنگ و کاهش کیفیت پوست؛ برنامه درمانی پس از ارزیابی علت، نوع پوست و سابقه درمان طراحی می‌شود.',image:'/media/portrait-poster.webp',tag:'شناخت پوست، پیش از انتخاب روش'},
{slug:'hair',number:'02',label:'مو و پوست سر',title:'سلامت مو و پوست سر',heading:'ریزش مو یک نشانه است، نه یک تشخیص کامل',body:'ریزش مو، کم‌پشتی، شوره و مشکلات پوست سر نیازمند تشخیص علت‌اند. هدف ما انتخاب یک مسیر علمی و قابل پیگیری، متناسب با شرایط هر فرد است.',image:'/media/hair.webp',tag:'هر تار مو، بخشی از یک تصویر بزرگ‌تر'},
{slug:'rejuvenation',number:'03',label:'زیبایی طبیعی',title:'جوان‌سازی و زیبایی طبیعی',heading:'جوان‌سازی با حفظ هویت چهره',body:'جوان‌سازی در الورا با هدف حفظ هویت چهره، بهبود متعادل کیفیت پوست و پرهیز از تغییرات اغراق‌آمیز برنامه‌ریزی می‌شود.',image:'/media/young-natural.webp',tag:'هماهنگ با شما، در هر مرحله از زندگی'},
{slug:'advanced',number:'04',label:'مراقبت نوین',title:'درمان‌های نوین و بازساختی',heading:'درمان‌های نوین با انتخاب پزشکی مسئولانه',body:'PRP، PRF و سایر رویکردهای زیستی یا بازساختی تنها زمانی پیشنهاد می‌شوند که شواهد، ایمنی، وضعیت مجوز و تناسب آن‌ها با نیاز مراجعه‌کننده قابل دفاع باشد.',image:'/media/brand-space.webp',tag:'نوآوری در کنار مسئولیت'}
];
export const pages = [
{slug:'services',title:'خدمات الورا'},...categories.map(c=>({slug:c.slug,title:c.title})),
{slug:'about',title:'درباره الورا'},{slug:'care',title:'مسیر مراجعه و مراقبت'},{slug:'journal',title:'مجله علمی'},
{slug:'faq',title:'پرسش‌های متداول'},{slug:'contact',title:'تماس و درخواست مشاوره'},{slug:'privacy',title:'حریم خصوصی'}
];
export const chapters=[{id:'entry',title:'ورود'},{id:'philosophy',title:'نگاه الورا'},{id:'understanding',title:'شناخت'},{id:'paths',title:'مسیرها'},{id:'life',title:'زندگی'},{id:'perspective',title:'تصمیم'},{id:'journey',title:'همراهی'},{id:'trust',title:'اعتماد'},{id:'journal',title:'آگاهی'},{id:'invitation',title:'گفت‌وگو'}];
export const faNumber=(n:number)=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
