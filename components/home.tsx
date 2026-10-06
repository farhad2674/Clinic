'use client';
import {useState} from 'react';
import {chapters} from '@/lib/site';
import {homeServices as categories,methodComparisons as audiences} from '@/lib/home-content';
import {Arrow,CTA} from './shell';
import {ScrubVideo} from './media';
import {FaceAnalysis} from './face-analysis';
import {DeferredMotion} from './deferred-motion';
import {scrollScene} from './scroll-scene';
import {Perspective} from './perspective';
import {LateChapters} from './late-chapters';
import {Journey} from './journey';
export function Home(){const [audience,setAudience]=useState(0);const person=audiences[audience];
return <><main id="main" className="home"><DeferredMotion/><nav className="chapter-nav" aria-label="بخش‌های صفحه">{chapters.map(c=><a key={c.id} href={'#'+c.id} data-nav-chapter={c.id} aria-label={c.title}><i aria-hidden="true"/></a>)}</nav>
<section id="entry" className="hero scene" data-chapter data-opening>
<div className="hero-stage scene-stage">
<div className="hero-copy"><h1><span>پزشکی بازساختی</span>{' '}<span>و <em>سلول‌درمانی</em></span></h1><p className="hero-description">از PRP و مزوژل تا روش‌های سلولی؛<br/>کاربردها و شواهد هر روش در پوست و مو را بشناسید.</p><div className="hero-actions"><CTA href="#paths">راهنمای خدمات</CTA><a className="text-link" href="/care">آمادگی برای مشاوره</a></div></div>
<div className="hero-window"><ScrubVideo asset="entrance"/><img className="corridor-intro" src="/media/corridor.webp" alt="" fetchPriority="high"/><div className="window-frame"/></div>
<div className="hero-threshold" aria-hidden="true"><strong>شناخت.</strong><i/></div><div className="hero-progress" aria-hidden="true"><i/></div>
<div className="hero-aside" aria-hidden="true"><span className="vertical-line"/></div>
<div className="hero-foot"><span className="scroll-hint">با شناخت روش‌ها ادامه دهید</span></div>
<div className="hero-final"><p>مراقبت،<br/>از شناخت شما آغاز می‌شود.</p></div>
</div></section>
<section id="philosophy" className="philosophy section-space" data-chapter data-opening>
<div className="page-width"><div className="philosophy-top"><h2 data-reveal>پزشکی بازساختی<br/><em>چیست؟</em></h2></div>
<div className="philosophy-grid"><figure className="editorial-image" data-parallax><img src="/media/brand-space.webp" alt="تصویر مفهومی فضای الورا" loading="lazy" decoding="async"/></figure><div className="philosophy-story"><p>پزشکی بازساختی به ترمیم یا جایگزینی بافت آسیب‌دیده می‌پردازد. سلول‌درمانی یکی از مسیرهای این حوزه است.</p><a className="text-link" href="/services/regenerative">راهنمای پزشکی بازساختی <Arrow/></a></div></div></div>
</section>
<section id="paths" className="paths scene" data-chapter><div className="paths-stage scene-stage"><div className="paths-head page-width"><h2>راهنمای خدمات<br/>و <em>روش‌ها.</em></h2><p className="service-availability">راهنمای آشنایی با روش‌ها؛ فهرست نهایی خدمات الورا هنوز تأیید نشده است.</p><div className="path-tabs" role="group" aria-label="انتخاب مسیر مراقبت">{categories.map((c,i)=><button data-path-tab={i} key={c.slug} onClick={()=>scrollScene('paths',i/(categories.length-1),'care-'+c.slug)}>{c.label}</button>)}</div></div>
<div className="paths-viewport"><div className="paths-track">{categories.map(c=><article key={c.slug} className={'care-panel care-'+c.slug} id={'care-'+c.slug}><div className="care-image"><img src={c.image} alt={c.alt} loading="lazy"/></div><div className="care-text"><h3><a href={c.href}>{c.title}</a></h3><p>{c.body}</p><a href={c.href} className="text-link">راهنمای {c.label}</a></div></article>)}</div></div></div></section>
<section id="understanding" className="understanding scene" data-chapter data-opening><div className="understanding-stage scene-stage page-width">
<div className="understanding-copy"><h2>کدام روش<br/><em>برای شما مناسب است؟</em></h2><div className="observation-steps">{[{t:'نیاز شما',b:'نشانه‌ها و زمان شروع.'},{t:'سابقه پزشکی',b:'داروها و درمان‌های قبلی.'},{t:'انتظار از نتیجه',b:'هدف و پرسش‌های شما.'}].map((s,i)=><div data-observation key={s.t}><span className="latin-number">0{i+1}</span><div><h3>{s.t}</h3><p>{s.b}</p></div></div>)}</div><a className="text-link" href="/care">ارزیابی چگونه آغاز می‌شود؟ <Arrow/></a></div>
<div className="portrait-composition"><div className="portrait-film"><ScrubVideo asset="portrait"/><FaceAnalysis/></div><span className="portrait-orbit" aria-hidden="true"/></div>
</div></section>
<section id="life" className="life section-space" data-chapter><div className="page-width"><div className="life-grid"><div className="life-title"><h2 data-reveal>این روش‌ها<br/><em>چه تفاوتی دارند؟</em></h2><div className="audience-tabs" role="tablist" aria-label="مقایسه ماهیت روش‌ها">{audiences.map((a,i)=><button role="tab" id={'audience-'+i} key={a.label} aria-selected={audience===i} aria-controls="audience-panel" tabIndex={audience===i?0:-1} onClick={()=>setAudience(i)} onKeyDown={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const next=(i+(e.key==='ArrowLeft'?1:3))%4;setAudience(next);document.getElementById('audience-'+next)?.focus()}}}>{a.label}</button>)}</div></div><div id="audience-panel" role="tabpanel" aria-labelledby={'audience-'+audience} className="audience-panel"><figure data-parallax><img key={person.image} src={person.image} alt={person.alt} loading="lazy"/></figure><div className="audience-note"><h3>{person.title}</h3><p>{person.body}</p><a href={person.link} className="text-link">شواهد و جزئیات {person.label}</a></div></div></div></div></section>
<Perspective/>
<Journey/>
<LateChapters/>
</main></>}
