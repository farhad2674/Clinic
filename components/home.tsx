'use client';
import {SectionLabel} from './section-label';
import {useState} from 'react';
import {categories,chapters} from '@/lib/site';
import {Arrow,CTA} from './shell';
import {ScrubVideo} from './media';
import {FaceAnalysis} from './face-analysis';
import {DeferredMotion} from './deferred-motion';
import {scrollScene} from './scroll-scene';
import {Perspective} from './perspective';
import {LateChapters} from './late-chapters';
import {Journey} from './journey';
const audiences=[
{label:'نوجوانی',title:'با شنیدن شروع می‌کنیم.',body:'جوش، جای جوش یا تغییرات مو را بدون قضاوت بررسی می‌کنیم. پیشنهادها باید با سن و نیاز شما متناسب باشند؛ در صورت نیاز، با همراهی والد یا سرپرست.',link:'/skin',image:'/media/brand-space.webp',alt:'تصویر مفهومی محیطی آرام برای گفت‌وگو'},
{label:'۲۵ تا ۴۰ سال',title:'چهره‌تان، همچنان آشنا.',body:'اگر به شفافیت پوست، لک یا خطوط تازه فکر می‌کنید، گزینه‌ها را با هدف حفظ تناسب چهره بررسی می‌کنیم.',link:'/rejuvenation',image:'/media/young-scarf.webp',alt:'پرتره نمایشی زن جوان ایرانی با روسری طرح‌دار و نگاه به کنار'},
{label:'پس از ۴۵ سال',title:'شادابی، بدون اصرار به جوان‌ترشدن.',body:'تغییرات پوست و حجم صورت را کنار هم می‌بینیم؛ با هدف بهبود کیفیت پوست و حفظ ویژگی‌هایی که چهره شما را می‌سازند.',link:'/services/rejuvenation-45',image:'/media/mature.webp',alt:'مدل تصویری با خطوط طبیعی چهره'},
{label:'آقایان',title:'مراقبت متناسب با زندگی شما.',body:'ریزش مو، سلامت پوست سر یا رسیدگی به پوست؛ با توضیح روشن درباره گزینه‌ها و توجه به زمان و حریم خصوصی شما.',link:'/hair',image:'/media/brand-space.webp',alt:'تصویر مفهومی فضای خصوصی و آرام الورا'}
];
export function Home(){const [audience,setAudience]=useState(1);const person=audiences[audience];
return <><main id="main" className="home"><DeferredMotion/><nav className="chapter-nav" aria-label="بخش‌های صفحه">{chapters.map(c=><a key={c.id} href={'#'+c.id} data-nav-chapter={c.id} aria-label={c.title}><i aria-hidden="true"/></a>)}</nav>
<section id="entry" className="hero scene" data-chapter data-opening>
<div className="hero-stage scene-stage">
<div className="hero-copy"><p className="eyebrow"><span className="small-rule"/>الورا · مرکز تخصصی پوست، مو و جوان‌سازی</p><h1><span>زیبایی،</span>{' '}<span>از <em>شما</em></span>{' '}<span className="hero-heading-last">شروع می‌شود.</span></h1><p className="hero-description">از جوش و لک تا ریزش مو و جوان‌سازی؛ <br/>گزینه‌ها را با توجه به شرایط شما بررسی می‌کنیم.</p><div className="hero-actions"><CTA/><a className="text-link" href="#philosophy">آشنایی با رویکرد الورا <Arrow/></a></div></div>
<div className="hero-window"><ScrubVideo asset="entrance"/><img className="corridor-intro" src="/media/corridor.webp" alt="" fetchPriority="high"/><div className="window-frame"/></div>
<div className="hero-threshold" aria-hidden="true"><span>پیش از هر پیشنهاد</span><strong>شناخت.</strong><i/></div><div className="hero-progress" aria-hidden="true"><i/></div>
<div className="hero-aside" aria-hidden="true"><span>THE ART OF<br/>CONSIDERED CARE</span><span className="vertical-line"/></div>
<div className="hero-foot"><span className="scroll-hint"><span>↓</span> الورا را بیشتر بشناسید</span><span dir="ltr">TEHRAN · ELORA</span><a href="#paths">دیدن خدمات پوست و مو <Arrow/></a></div>
<div className="hero-final"><span lang="en">UNDERSTANDING COMES FIRST.</span><p>شناختِ شما،<br/>آغازِ هر انتخاب است.</p></div>
</div></section>
<section id="philosophy" className="philosophy section-space" data-chapter data-opening>
<div className="page-width"><SectionLabel>نگاه ما</SectionLabel><div className="philosophy-top"><h2 data-reveal>در الورا،<br/>شما در اولویتید.</h2><p className="large-copy" data-reveal>فرصت دارید بپرسید،<br/>گزینه‌ها را بسنجید<br/>و <em>با اطمینان تصمیم بگیرید.</em></p></div>
<div className="philosophy-grid"><figure className="editorial-image" data-parallax><img src="/media/brand-space.webp" alt="تصویر مفهومی فضای الورا" loading="lazy" decoding="async"/></figure><div className="philosophy-story"><p>قرار نیست با نام یک دستگاه یا تزریق وارد شوید. کافی است از چیزی بگویید که می‌خواهید بررسی شود؛ از تغییرات پوست و مو تا انتظاری که از نتیجه دارید.</p><div className="promise-lines"><p data-reveal><span>انتخاب با شماست</span> فرصت پرسیدن دارید.</p><p data-reveal><span>توضیح با ماست</span> از هزینه تا محدودیت‌ها.</p><p data-reveal><span>اولویت، سلامت شماست</span> حتی اگر درمانی انجام نشود.</p></div><a className="text-link" href="/about">بیشتر درباره الورا <Arrow/></a></div></div></div>
</section>
<section id="understanding" className="understanding scene" data-chapter data-opening><div className="understanding-stage scene-stage page-width">
<div className="understanding-copy"><SectionLabel>شناخت</SectionLabel><h2>ابتدا مسئله را<br/>می‌شناسیم،<br/><em>سپس راهکار را</em><br/>انتخاب می‌کنیم.</h2><p>در جلسه ارزیابی، درباره تغییرات پوست یا مو، سابقه درمان و انتظارتان صحبت می‌کنیم.</p><div className="observation-steps">{[{t:'چه چیزی تغییر کرده؟',b:'نشانه‌ها، زمان شروع و آنچه تجربه کرده‌اید.'},{t:'چه سابقه‌ای دارید؟',b:'داروها، محصولات مصرفی و درمان‌های قبلی.'},{t:'چه انتظاری دارید؟',b:'نتیجه دلخواه و پرسش‌هایی که برایتان مهم‌اند.'}].map((s,i)=><div data-observation key={s.t}><span className="latin-number">0{i+1}</span><div><h3>{s.t}</h3><p>{s.b}</p></div></div>)}</div><a className="text-link" href="/care">ارزیابی چگونه آغاز می‌شود؟ <Arrow/></a></div>
<div className="portrait-composition"><div className="portrait-film"><ScrubVideo asset="portrait"/><FaceAnalysis/></div><span className="portrait-side" lang="en">INDIVIDUAL BY NATURE</span><span className="portrait-orbit" aria-hidden="true"/></div>
</div></section>
<section id="paths" className="paths scene" data-chapter><div className="paths-stage scene-stage"><div className="paths-head page-width"><SectionLabel>خدمات</SectionLabel><h2>پوست، مو<br/>و <em>زیبایی طبیعی.</em></h2><div className="path-tabs" role="group" aria-label="انتخاب مسیر مراقبت">{categories.map((c,i)=><button data-path-tab={i} key={c.slug} onClick={()=>scrollScene('paths',i/(categories.length-1),'care-'+c.slug)}>{c.label}</button>)}</div></div>
<div className="paths-viewport"><div className="paths-track">{categories.map(c=><article key={c.slug} className={'care-panel care-'+c.slug} id={'care-'+c.slug}><div className="care-image"><img src={c.image} alt={c.slug==='advanced'?'تصویر مفهومی فضای الورا':c.slug==='skin'?'پرتره نمایشی زن جوان با پوست طبیعی':'تصویر نمایشی برای '+c.title} loading="lazy"/></div><div className="care-text"><p className="eyebrow">{c.tag}</p><h3>{c.title}</h3><p>{c.body}</p><a href={'/'+c.slug} className="circle-link" aria-label={'آشنایی با '+c.title}><Arrow/></a></div></article>)}</div></div></div></section>
<section id="life" className="life section-space" data-chapter><div className="page-width"><SectionLabel>برای شما</SectionLabel><div className="life-grid"><div className="life-title"><h2 data-reveal>زیبایی،<br/>به زبان <em>خود شما.</em></h2><p>سن و سبک زندگی، بخشی از انتخاب‌اند.<br/>انتظار شما هم به همان اندازه مهم است.</p><div className="audience-tabs" role="tablist" aria-label="مرحله زندگی">{audiences.map((a,i)=><button role="tab" id={'audience-'+i} key={a.label} aria-selected={audience===i} aria-controls="audience-panel" tabIndex={audience===i?0:-1} onClick={()=>setAudience(i)} onKeyDown={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const next=(i+(e.key==='ArrowLeft'?1:3))%4;setAudience(next);document.getElementById('audience-'+next)?.focus()}}}>{a.label}</button>)}</div></div><div id="audience-panel" role="tabpanel" aria-labelledby={'audience-'+audience} className="audience-panel"><figure data-parallax><img key={person.image} src={person.image} alt={person.alt} loading="lazy"/><figcaption>تصویر نمایشی · حفظ زیبایی طبیعی</figcaption></figure><div className="audience-note"><h3>{person.title}</h3><p>{person.body}</p><a href={person.link} className="text-link">دیدن گزینه‌های مرتبط <Arrow/></a></div></div></div></div></section>
<Perspective/>
<Journey/>
<LateChapters/>
</main></>}
