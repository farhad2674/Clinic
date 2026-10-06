export type CareTopicId = 'skin' | 'hair' | 'pigment' | 'methods' | 'general';
export type CareLink = {label:string;href:string};
export type CareTopic = {id:CareTopicId;label:string;intro:string;guide:CareLink;article:CareLink;prepare:string[]};

// These choices navigate educational material; they do not recommend a treatment.
export const careTopics:CareTopic[] = [
  {id:'skin',label:'کیفیت و بافت پوست',intro:'اول مشخص کنید کدام تغییر پوست برایتان مهم است؛ سپس دربارهٔ گزینه‌های مراقبت بخوانید.',guide:{label:'راهنمای کیفیت پوست و جوان‌سازی',href:'/rejuvenation'},article:{label:'جوان‌سازی طبیعی یعنی چه؟',href:'/journal/natural-rejuvenation'},prepare:['تغییری که می‌خواهید درباره‌اش صحبت کنید.','محصولات، داروها و روش‌هایی که تا امروز امتحان کرده‌اید.','حساسیت‌ها یا واکنش‌های قبلی پوست.']},
  {id:'hair',label:'ریزش مو و پوست سر',intro:'از زمان شروع ریزش یا تغییرات پوست سر شروع کنید؛ شناخت علت، مقدم بر انتخاب روش است.',guide:{label:'راهنمای ریزش و کم‌پشتی مو',href:'/services/hair-loss'},article:{label:'آیا PRP برای هر نوع ریزش مو مناسب است؟',href:'/journal/prp-for-hair-loss'},prepare:['زمان شروع و ناحیهٔ ریزش یا کم‌پشتی.','نشانه‌های همراه، مثل خارش یا پوسته‌ریزی.','داروها، بیماری‌های قبلی و درمان‌هایی که امتحان کرده‌اید.']},
  {id:'pigment',label:'لک و تغییر رنگ پوست',intro:'رنگ، محل و زمان شروع تغییر را یادداشت کنید. برای تشخیص و انتخاب درمان، ارزیابی پزشک لازم است.',guide:{label:'راهنمای لک و ناهماهنگی رنگ پوست',href:'/services/pigmentation'},article:{label:'تفاوت لک، قرمزی و جای جوش چیست؟',href:'/journal/acne-marks-vs-scars'},prepare:['محل تغییر رنگ و زمان شروع آن.','اینکه پیش از آن جوش، التهاب یا تغییر دیگری داشته‌اید یا نه.','محصولات مصرفی و درمان‌های قبلی.']},
  {id:'methods',label:'روش‌های نوین و سلولی',intro:'اگر دربارهٔ روش مشخصی شنیده‌اید، از شناخت ماهیت، کاربرد و شواهد آن شروع کنید.',guide:{label:'راهنمای پزشکی بازساختی و روش‌های نوین',href:'/advanced'},article:{label:'سلول‌درمانی چه نسبتی با سلول بنیادی دارد؟',href:'/journal/cell-therapy-stem-cells'},prepare:['نام دقیق روش یا فرآورده‌ای که درباره‌اش شنیده‌اید.','هدف یا بیماری‌ای که روش برای آن مطرح شده است.','پرسش‌هایتان دربارهٔ شواهد، مجوز و پیگیری عوارض.']},
  {id:'general',label:'شروع بدون انتخاب درمان',intro:'کافی است دغدغهٔ اصلی‌تان را مشخص کنید. لازم نیست پیش از گفت‌وگو روش خاصی انتخاب کرده باشید.',guide:{label:'مرور خدمات و موضوعات پوست و مو',href:'/services'},article:{label:'چرا نتیجهٔ یک درمان برای دو نفر یکسان نیست؟',href:'/journal/different-treatment-results'},prepare:['مهم‌ترین تغییری که می‌خواهید درباره‌اش صحبت کنید.','زمان شروع، سابقهٔ پزشکی و داروهای مصرفی.','درمان‌های قبلی و انتظارتان از نتیجه.']}
];

export const serviceCareTopics:Record<string,CareTopicId> = {
  acne:'skin','acne-scars':'skin',pigmentation:'pigment','hair-loss':'hair','scalp-health':'hair',
  'natural-rejuvenation':'skin','rejuvenation-45':'skin',botox:'skin',fillers:'skin',microneedling:'skin',
  prp:'methods',prf:'methods',exosomes:'methods','cell-based':'methods',mesogel:'skin',regenerative:'methods'
};
export const serviceCareArticles:Record<string,CareLink> = {
  acne:{label:'تفاوت لک، قرمزی و جای جوش چیست؟',href:'/journal/acne-marks-vs-scars'},
  'acne-scars':{label:'تفاوت لک، قرمزی و جای جوش چیست؟',href:'/journal/acne-marks-vs-scars'},
  pigmentation:{label:'تفاوت لک، قرمزی و جای جوش چیست؟',href:'/journal/acne-marks-vs-scars'},
  'hair-loss':{label:'آیا PRP برای هر نوع ریزش مو مناسب است؟',href:'/journal/prp-for-hair-loss'},
  'scalp-health':{label:'چرا نتیجهٔ یک درمان برای دو نفر یکسان نیست؟',href:'/journal/different-treatment-results'},
  'natural-rejuvenation':{label:'جوان‌سازی طبیعی یعنی چه؟',href:'/journal/natural-rejuvenation'},
  'rejuvenation-45':{label:'مراقبت از پوست پس از ۴۵ سال',href:'/journal/skin-after-45'},
  botox:{label:'جوان‌سازی طبیعی یعنی چه؟',href:'/journal/natural-rejuvenation'},
  fillers:{label:'پیش از تزریق فیلر چه سؤال‌هایی بپرسیم؟',href:'/journal/questions-before-fillers'},
  microneedling:{label:'چرا نتیجهٔ یک درمان برای دو نفر یکسان نیست؟',href:'/journal/different-treatment-results'},
  'cell-based':{label:'سلول‌درمانی چه نسبتی با سلول بنیادی دارد؟',href:'/journal/cell-therapy-stem-cells'},
  prp:{label:'شواهد PRP برای پوست',href:'/journal/prp-skin-evidence'},
  prf:{label:'تفاوت PRP و PRF چیست؟',href:'/journal/prp-vs-prf'},
  exosomes:{label:'اگزوزوم چه تفاوتی با سلول بنیادی دارد؟',href:'/journal/exosomes-vs-stem-cells'},
  mesogel:{label:'مزوژل و کیفیت پوست؛ ترکیب‌ها و شواهد',href:'/journal/mesogel-skin-quality'},
  regenerative:{label:'پزشکی بازساختی چیست؟',href:'/journal/regenerative-medicine'}
};
const categoryTopics:Record<string,CareTopicId>={skin:'skin',hair:'hair',rejuvenation:'skin',advanced:'methods'};
export const findCareTopic=(id?:string)=>careTopics.find(topic=>topic.id===id);
export function careHref(category?:string,service?:string){
  const topic=(service&&serviceCareTopics[service])||(category&&categoryTopics[category]);
  if(!topic)return '/care';
  return '/care?topic='+topic+(service&&serviceCareTopics[service]?'&service='+encodeURIComponent(service):'');
}
