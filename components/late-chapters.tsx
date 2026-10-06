'use client';
import {SectionLabel} from './section-label';
import {homeArticles,homeFaq} from '@/lib/home-content';
import {Arrow} from './shell';
import {Invitation} from './invitation';
import {journalImages} from '@/lib/journal-images';
import {JournalImage} from './journal-image';


const principles=[
  {title:'انتخاب آگاهانه',text:'فایده، محدودیت و عوارض هر روش باید روشن باشد.'},
  {title:'صداقت در تصمیم',text:'روش تازه، بدون شواهد کافی پیشنهاد نمی‌شود.'},
  {title:'احترام به حریم شما',text:'حق انتخاب و حریم خصوصی شما محترم است.'}
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
          <p>برای گفت‌وگو، نیازی به انتخاب درمان ندارید.</p>
          <span className="care-pause-index" aria-hidden="true">ELORA / CONSIDERED CARE</span>
        </div>
      </div>
    </section>

    <section id="trust" className="trust section-space cover-chapter" data-cover-chapter data-chapter>
      <div className="cover-stage"><div className="page-width">
        <SectionLabel>اعتماد</SectionLabel>
        <h2 className="trust-head" data-cover-title>
          <span className="cover-title-line"><span>سلول‌درمانی،</span></span>
          <span className="cover-title-line"><span><span className="outlined-word">شواهد و محدودیت‌ها.</span></span></span>
        </h2>
        <div className="trust-intro cover-body"><span className="trust-heart" aria-hidden="true"><svg viewBox="0 0 80 80" fill="none" focusable="false"><path d="M40 68C34 62 12 46 12 29C12 19 18 13 27 13C33 13 38 17 40 23C42 17 47 13 53 13C62 13 68 19 68 29C68 46 46 62 40 68Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></span><p data-text-reveal>نوع سلول، کاربرد، کیفیت فرآورده و مجوز باید مشخص باشند. پژوهش امیدوارکننده، به‌تنهایی به معنی درمان تأییدشده نیست.</p></div>
        <div className="trust-principles cover-body">{principles.map((p,i)=><article key={p.title} data-depth-box="card"><span className="latin-number">0{i+1}</span><h3 data-text-reveal>{p.title}</h3><p data-text-reveal>{p.text}</p></article>)}</div>
        <div className="trust-links cover-body"><a href="/services/cell-based" className="text-link">شواهد روش‌های سلولی <Arrow/></a><a href="/privacy" className="text-link">تعهد به حریم خصوصی <Arrow/></a></div>
      </div></div>
    </section>

    <section id="journal" className="journal section-space cover-chapter" data-cover-chapter data-chapter>
      <div className="cover-stage"><div className="page-width">
        <div className="journal-heading"><div>
          <SectionLabel>دانستنی‌ها</SectionLabel>
          <h2 data-cover-title><span className="cover-title-line"><span>مجله</span></span><span className="cover-title-line"><span><em>پزشکی بازساختی.</em></span></span></h2>
        </div><a className="text-link" href="/journal">همه مقاله‌ها <Arrow/></a></div>
        <div className="journal-layout cover-body"><div className="journal-feature" data-parallax data-depth-box="visual"><JournalImage image={journalImages["prp-for-hair-loss"]} sizes="(max-width: 767px) 90vw, 42vw"/><div><span className="topic-status">راهنمای علمی</span><h3><a href={'/journal/'+homeArticles[0].slug}>{homeArticles[0].title}</a></h3><p>{homeArticles[0].topic}</p></div></div><div className="journal-list">{homeArticles.slice(1).map((a,i)=><article data-depth-box="row" key={a.slug}><span className="latin-number">0{i+2}</span><div><span className="eyebrow">{a.topic}</span><h3 data-text-reveal><a href={'/journal/'+a.slug}>{a.title}</a></h3></div></article>)}<p className="journal-disclaimer" data-text-reveal>مقاله‌های دارای منابع؛ در انتظار بازبینی پزشکی.</p></div></div>
      </div></div>
    </section>

    <section id="faq-preview" className="home-faq section-space cover-chapter" data-chapter data-cover-chapter>
      <div className="cover-stage"><div className="page-width faq-layout">
        <div><SectionLabel>پرسش‌ها</SectionLabel><h2 data-cover-title><span className="cover-title-line"><span>پرسش‌های</span></span><span className="cover-title-line"><span><em>شما.</em></span></span></h2><a className="text-link" href="/faq">همه پرسش‌ها <Arrow/></a></div>
        <div className="cover-body">{homeFaq.map(f=><details key={f.question} data-depth-box="row"><summary data-text-reveal>{f.question}<span>+</span></summary><p>{f.answer}</p></details>)}</div>
      </div></div>
    </section>

    <Invitation home/>
  </>;
}
