'use client';
import {SectionLabel} from './section-label';
import {useState} from 'react';
import {chapters} from '@/lib/site';
import {homeServices as categories} from '@/lib/home-content';
import {Arrow,CTA} from './shell';
import {ScrubVideo} from './media';
import {FaceAnalysis} from './face-analysis';
import {DeferredMotion} from './deferred-motion';
import {scrollScene} from './scroll-scene';
import {Perspective} from './perspective';
import {LateChapters} from './late-chapters';
import {Journey} from './journey';
const audiences=[
{label:'نوجوانی',title:'با شنیدن شروع می‌کنیم.',body:'جوش و تغییرات مو ابتدا بررسی می‌شوند؛ پیشنهاد روش باید با سن و نیاز شما متناسب باشد.',link:'/skin',image:'/media/brand-space.webp',alt:'تصویر مفهومی محیطی آرام برای گفت‌وگو'},
{label:'۲۵ تا ۴۰ سال',title:'چهره‌تان، همچنان آشنا.',body:'کیفیت پوست و تغییرات تازه را با توجه به نیاز و انتظار شما بررسی می‌کنیم.',link:'/rejuvenation',image:'/media/young-scarf.webp',alt:'پرتره نمایشی زن جوان ایرانی با روسری طرح‌دار و نگاه به کنار'},
{label:'پس از ۴۵ سال',title:'شادابی، بدون اصرار به جوان‌ترشدن.',body:'بهبود کیفیت پوست با توجه به تغییرات آن و حفظ ویژگی‌های چهره.',link:'/services/rejuvenation-45',image:'/media/mature.webp',alt:'مدل تصویری با خطوط طبیعی چهره'},
{label:'آقایان',title:'مراقبت متناسب با زندگی شما.',body:'ارزیابی پوست و ریزش مو، با توجه به زمان و اولویت‌های شما.',link:'/hair',image:'/media/brand-space.webp',alt:'تصویر مفهومی فضای خصوصی و آرام الورا'}
];
export function Home(){const [audience,setAudience]=useState(1);const person=audiences[audience];
return <><main id="main" className="home"><DeferredMotion/><nav className="chapter-nav" aria-label="بخش‌های صفحه">{chapters.map(c=><a key={c.id} href={'#'+c.id} data-nav-chapter={c.id} aria-label={c.title}><i aria-hidden="true"/></a>)}</nav>
<section id="entry" className="hero scene" data-chapter data-opening>
<div className="hero-stage scene-stage">
<div className="hero-copy"><p className="eyebrow"><span className="small-rule"/>الورا · پوست و مو</p><h1><span>پزشکی بازساختی</span>{' '}<span>و <em>سلول‌درمانی</em></span></h1><p className="hero-description">کاربردها، شواهد و محدودیت‌ها را بشناسید؛ <br/>انتخاب روش با ارزیابی پزشکی آغاز می‌شود.</p><div className="hero-actions"><CTA href="#paths">خدمات و روش‌ها</CTA><a className="text-link" href="/contact">اطلاعات مشاوره <Arrow/></a></div></div>
<div className="hero-window"><ScrubVideo asset="entrance"/><img className="corridor-intro" src="/media/corridor.webp" alt="" fetchPriority="high"/><div className="window-frame"/></div>
<div className="hero-threshold" aria-hidden="true"><span>پیش از هر پیشنهاد</span><strong>شناخت.</strong><i/></div><div className="hero-progress" aria-hidden="true"><i/></div>
<div className="hero-aside" aria-hidden="true"><span>THE ART OF<br/>CONSIDERED CARE</span><span className="vertical-line"/></div>
<div className="hero-foot"><span className="scroll-hint"><span>↓</span> الورا را بیشتر بشناسید</span><span dir="ltr">TEHRAN · ELORA</span><a href="#paths">خدمات و روش‌های بازساختی <Arrow/></a></div>
<div className="hero-final"><span lang="en">UNDERSTANDING COMES FIRST.</span><p>شناختِ شما،<br/>آغازِ هر انتخاب است.</p></div>
</div></section>
<section id="philosophy" className="philosophy section-space" data-chapter data-opening>
<div className="page-width"><SectionLabel>نگاه ما</SectionLabel><div className="philosophy-top"><h2 data-reveal>پزشکی بازساختی<br/><em>چیست؟</em></h2><p className="large-copy" data-reveal>شناخت ظرفیت بدن<br/>برای <em>ترمیم بافت.</em></p></div>
<div className="philosophy-grid"><figure className="editorial-image" data-parallax><img src="/media/brand-space.webp" alt="تصویر مفهومی فضای الورا" loading="lazy" decoding="async"/></figure><div className="philosophy-story"><p>پزشکی بازساختی به ترمیم یا جایگزینی بافت آسیب‌دیده می‌پردازد. سلول‌درمانی یکی از مسیرهای این حوزه است.</p><div className="promise-lines"><p data-reveal><span>شناخت مسئله</span> پیش از انتخاب روش.</p><p data-reveal><span>بررسی شواهد</span> برای هر کاربرد.</p><p data-reveal><span>تصمیم آگاهانه</span> متناسب با شما.</p></div><a className="text-link" href="/services/regenerative">راهنمای پزشکی بازساختی <Arrow/></a></div></div></div>
</section>
<section id="understanding" className="understanding scene" data-chapter data-opening><div className="understanding-stage scene-stage page-width">
<div className="understanding-copy"><SectionLabel>شناخت</SectionLabel><h2>ارزیابی،<br/><em>پیش از انتخاب.</em></h2><p>نیاز پوست و مو، سابقه پزشکی و انتظار شما، مبنای انتخاب‌اند.</p><div className="observation-steps">{[{t:'نیاز شما',b:'نشانه‌ها و زمان شروع.'},{t:'سابقه درمان',b:'داروها و روش‌های قبلی.'},{t:'انتظار از نتیجه',b:'هدف و پرسش‌های شما.'}].map((s,i)=><div data-observation key={s.t}><span className="latin-number">0{i+1}</span><div><h3>{s.t}</h3><p>{s.b}</p></div></div>)}</div><a className="text-link" href="/care">ارزیابی چگونه آغاز می‌شود؟ <Arrow/></a></div>
<div className="portrait-composition"><div className="portrait-film"><ScrubVideo asset="portrait"/><FaceAnalysis/></div><span className="portrait-side" lang="en">INDIVIDUAL BY NATURE</span><span className="portrait-orbit" aria-hidden="true"/></div>
</div></section>
<section id="paths" className="paths scene" data-chapter><div className="paths-stage scene-stage"><div className="paths-head page-width"><SectionLabel>خدمات</SectionLabel><h2>خدمات<br/>و <em>روش‌ها.</em></h2><div className="path-tabs" role="group" aria-label="انتخاب مسیر مراقبت">{categories.map((c,i)=><button data-path-tab={i} key={c.slug} onClick={()=>scrollScene('paths',i/(categories.length-1),'care-'+c.slug)}>{c.label}</button>)}</div></div>
<div className="paths-viewport"><div className="paths-track">{categories.map(c=><article key={c.slug} className={'care-panel care-'+c.slug} id={'care-'+c.slug}><div className="care-image"><img src={c.image} alt={c.alt} loading="lazy"/></div><div className="care-text"><p className="eyebrow">{c.tag}</p><h3>{c.title}</h3><p>{c.body}</p><a href={c.href} className="circle-link" aria-label={'آشنایی با '+c.title}><Arrow/></a></div></article>)}</div></div></div></section>
<section id="life" className="life section-space" data-chapter><div className="page-width"><SectionLabel>برای شما</SectionLabel><div className="life-grid"><div className="life-title"><h2 data-reveal>انتخاب،<br/>متناسب با <em>شما.</em></h2><p>یک روش، برای همه مناسب نیست.</p><div className="audience-tabs" role="tablist" aria-label="مرحله زندگی">{audiences.map((a,i)=><button role="tab" id={'audience-'+i} key={a.label} aria-selected={audience===i} aria-controls="audience-panel" tabIndex={audience===i?0:-1} onClick={()=>setAudience(i)} onKeyDown={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const next=(i+(e.key==='ArrowLeft'?1:3))%4;setAudience(next);document.getElementById('audience-'+next)?.focus()}}}>{a.label}</button>)}</div></div><div id="audience-panel" role="tabpanel" aria-labelledby={'audience-'+audience} className="audience-panel"><figure data-parallax><img key={person.image} src={person.image} alt={person.alt} loading="lazy"/><figcaption>تصویر نمایشی · حفظ زیبایی طبیعی</figcaption></figure><div className="audience-note"><h3>{person.title}</h3><p>{person.body}</p><a href={person.link} className="text-link">دیدن گزینه‌های مرتبط <Arrow/></a></div></div></div></div></section>
<Perspective/>
<Journey/>
<LateChapters/>
</main></>}
