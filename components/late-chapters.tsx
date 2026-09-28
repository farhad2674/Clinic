'use client';
import {SectionLabel} from './section-label';
import {content} from '@/lib/site';
import {Arrow} from './shell';
import {Invitation} from './invitation';
import {journalImages} from '@/lib/journal-images';
import {JournalImage} from './journal-image';


const principles=[
  {title:'انتخاب آگاهانه',text:'مزایا، محدودیت‌ها، هزینه‌ها و عوارض احتمالی، پیش از آغاز درمان توضیح داده می‌شوند.'},
  {title:'صداقت در تصمیم',text:'اگر درمانی برای شما مناسب نباشد، آن را پیشنهاد نمی‌کنیم. درباره نتیجه احتمالی و محدودیت‌ها صریح صحبت می‌کنیم.'},
  {title:'احترام به حریم شما',text:'اطلاعات، تصاویر و تصمیم‌های درمانی شما محرمانه‌اند. حریم خصوصی، بخشی از کیفیت مراقبت است.'}
];

export function LateChapters(){
  return <>
    <section id="care-pause" className="care-pause cover-chapter" data-chapter data-cover-chapter aria-labelledby="care-pause-title">
      <div className="cover-stage">
        <div className="care-pause-inner page-width">
          <span className="eyebrow">پیش از هر تصمیم</span>
          <h2 id="care-pause-title" data-cover-title>
            <span className="cover-title-line"><span>مسیر درست،</span></span>
            <span className="cover-title-line"><span>از <a className="heading-cta" href="/contact">یک گفت‌وگو <Arrow/></a> آغاز می‌شود.</span></span>
          </h2>
          <p>پرسش‌ها و انتظارتان را با خود بیاورید؛ قرار نیست از قبل نام درمان را بدانید.</p>
          <span className="care-pause-index" aria-hidden="true">ELORA / CONSIDERED CARE</span>
        </div>
      </div>
    </section>

    <section id="trust" className="trust section-space cover-chapter" data-cover-chapter data-chapter>
      <div className="cover-stage"><div className="page-width">
        <SectionLabel>اعتماد</SectionLabel>
        <h2 className="trust-head" data-cover-title>
          <span className="cover-title-line"><span>هر روش تازه،</span></span>
          <span className="cover-title-line"><span>نیاز به <span className="outlined-word">پشتوانه</span> دارد.</span></span>
        </h2>
        <div className="trust-intro cover-body"><span className="trust-heart" aria-hidden="true"><svg viewBox="0 0 80 80" fill="none" focusable="false"><path d="M40 68C34 62 12 46 12 29C12 19 18 13 27 13C33 13 38 17 40 23C42 17 47 13 53 13C62 13 68 19 68 29C68 46 46 62 40 68Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></span><p data-text-reveal>برای روش‌هایی مانند PRP، PRF یا فرآورده‌های بازساختی، شواهد هر کاربرد، ایمنی، مجوز و کیفیت محصول را بررسی می‌کنیم. محبوبیت یک نام، دلیل کافی برای پیشنهاد آن نیست.</p></div>
        <div className="trust-principles cover-body">{principles.map((p,i)=><article key={p.title} data-depth-box="card"><span className="latin-number">0{i+1}</span><h3 data-text-reveal>{p.title}</h3><p data-text-reveal>{p.text}</p></article>)}</div>
        <div className="trust-links cover-body"><a href="/advanced" className="text-link">نگاه ما به درمان‌های نوین <Arrow/></a><a href="/privacy" className="text-link">تعهد به حریم خصوصی <Arrow/></a></div>
      </div></div>
    </section>

    <section id="journal" className="journal section-space cover-chapter" data-cover-chapter data-chapter>
      <div className="cover-stage"><div className="page-width">
        <div className="journal-heading"><div>
          <SectionLabel>دانستنی‌ها</SectionLabel>
          <h2 data-cover-title><span className="cover-title-line"><span>درباره پوست و مو،</span></span><span className="cover-title-line"><span><em>بیشتر بدانید.</em></span></span></h2>
        </div><a className="text-link" href="/journal">موضوعات مجله <Arrow/></a></div>
        <div className="journal-layout cover-body"><div className="journal-feature" data-parallax data-depth-box="visual"><JournalImage image={journalImages["prp-for-hair-loss"]} sizes="(max-width: 767px) 90vw, 42vw"/><div><span className="topic-status">در دست آماده‌سازی</span><h3>{content.articles[0]}</h3><p>سلامت مو و پوست سر</p></div></div><div className="journal-list">{content.articles.slice(1,5).map((a,i)=><article data-depth-box="row" key={a}><span className="latin-number">0{i+2}</span><div><span className="eyebrow">دانستنی‌های مراقبت</span><h3 data-text-reveal>{a}</h3><span className="topic-status">پس از بازبینی علمی منتشر می‌شود</span></div></article>)}<p className="journal-disclaimer" data-text-reveal>محتوای علمی برای کمک به انتخاب آگاهانه است؛ جایگزین تشخیص پزشکی نیست.</p></div></div>
      </div></div>
    </section>

    <section id="faq-preview" className="home-faq section-space cover-chapter" data-chapter data-cover-chapter>
      <div className="cover-stage"><div className="page-width faq-layout">
        <div><SectionLabel>پرسش‌ها</SectionLabel><h2 data-cover-title><span className="cover-title-line"><span>شاید پرسش</span></span><span className="cover-title-line"><span><em>شما هم باشد.</em></span></span></h2><a className="text-link" href="/faq">همه پرسش‌ها <Arrow/></a></div>
        <div className="cover-body">{[content.faq[0],content.faq[4],content.faq[1],content.faq[3]].map(f=><details key={f.question} data-depth-box="row"><summary data-text-reveal>{f.question}<span>+</span></summary><p>{f.answer}</p></details>)}</div>
      </div></div>
    </section>

    <Invitation home/>
  </>;
}
