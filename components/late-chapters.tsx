'use client';
import {homeArticles,homeFaq} from '@/lib/home-content';
import {Arrow} from './shell';
import {Invitation} from './invitation';
import {JournalImage} from './journal-image';
import {homepageFeedbackImages} from '@/lib/homepage-feedback-images';


const carePrinciples=[
  {title:'شواهد را بشناسید',text:'دربارهٔ کاربرد و محدودیت هر روش بخوانید. نام تازهٔ یک فناوری، به‌تنهایی برای انتخاب آن کافی نیست.'},
  {title:'انتظار روشن داشته باشید',text:'پیش از تصمیم، دربارهٔ نتیجهٔ احتمالی، عوارض، هزینه و پیگیری بپرسید. نتیجهٔ درمان برای همه یکسان نیست.'},
  {title:'با اختیار تصمیم بگیرید',text:'برای پرسیدن و سنجیدن گزینه‌ها وقت بگذارید. دربارهٔ ثبت و استفاده از اطلاعات و تصاویرتان هم سؤال کنید.'}
];

export function LateChapters(){
  return <>
    <section id="care-pause" className="care-pause cover-chapter" data-cover-chapter aria-labelledby="care-pause-title">
      <div className="cover-stage"><div className="care-pause-inner page-width">
        <span className="eyebrow">پیش از تصمیم</span>
        <h2 id="care-pause-title" data-cover-title>
          <span className="cover-title-line"><span>تصمیم آگاهانه،</span></span>
          <span className="cover-title-line"><span>از <a className="heading-cta" href="/services">شناخت روش‌ها <Arrow/></a> شروع می‌شود.</span></span>
        </h2>
        <p className="cover-body">کاربرد، محدودیت‌ها و پرسش‌های مهم هر روش را بخوانید؛ انتخاب درمان به ارزیابی شرایط شما وابسته است.</p>
        <span className="care-pause-index" aria-hidden="true">ELVITHA / CONSIDERED CARE</span>
      </div></div>
    </section>

    <section id="trust" className="trust section-space cover-chapter" data-cover-chapter data-chapter aria-labelledby="trust-title">
      <div className="cover-stage"><div className="page-width">
        <h2 id="trust-title" className="trust-head" data-cover-title>
          <span className="cover-title-line"><span>روش‌های نوین،</span></span>
          <span className="cover-title-line"><span>با <span className="outlined-word">انتخاب آگاهانه.</span></span></span>
        </h2>
        <div className="trust-intro cover-body"><p data-text-reveal>برای شناخت پزشکی بازساختی و روش‌های سلولی، از کاربرد و شواهد شروع کنید. این راهنماها کمک می‌کنند پرسش‌های دقیق‌تری برای مشاوره داشته باشید.</p></div>
        <div className="trust-principles cover-body">{carePrinciples.map((principle,i)=><article key={principle.title} data-depth-box="card"><span className="latin-number" aria-hidden="true">0{i+1}</span><h3 data-text-reveal>{principle.title}</h3><p data-text-reveal>{principle.text}</p></article>)}</div>
        <div className="trust-links cover-body"><a href="/services/regenerative" className="text-link">راهنمای پزشکی بازساختی <Arrow/></a><a href="/privacy" className="text-link">دربارهٔ حریم خصوصی <Arrow/></a></div>
      </div></div>
    </section>

    <section id="journal" className="journal section-space cover-chapter" data-cover-chapter data-chapter>
      <div className="cover-stage"><div className="page-width">
        <div className="journal-heading"><div>

          <h2 data-cover-title><span className="cover-title-line"><span>مجلهٔ</span></span><span className="cover-title-line"><span><em>پزشکی بازساختی.</em></span></span></h2>
        </div><a className="text-link" href="/journal">همهٔ مقاله‌ها <Arrow/></a></div>
        <div className="journal-layout cover-body"><div className="journal-feature" data-parallax data-depth-box="visual"><JournalImage image={homepageFeedbackImages['journal-regenerative']} sizes="(max-width: 767px) 90vw, 42vw"/><div><h3><a href={'/journal/'+homeArticles[0].slug}>{homeArticles[0].title}</a></h3></div></div><div className="journal-list">{homeArticles.slice(1).map(a=><article data-depth-box="row" key={a.slug}><div><h3 data-text-reveal><a href={'/journal/'+a.slug}>{a.title}</a></h3></div></article>)}<p className="journal-disclaimer" data-text-reveal>راهنماهای روشن برای شناخت روش‌ها و انتخاب آگاهانه.</p></div></div>
      </div></div>
    </section>

    <section id="faq-preview" className="home-faq section-space cover-chapter" data-chapter data-cover-chapter>
      <div className="cover-stage"><div className="page-width faq-layout">
        <div><h2 data-cover-title><span className="cover-title-line"><span>پرسش‌های</span></span><span className="cover-title-line"><span><em>پیش از شروع.</em></span></span></h2><a className="text-link" href="/faq">همه پرسش‌ها <Arrow/></a></div>
        <div className="cover-body">{homeFaq.map(f=><details key={f.question} data-depth-box="row"><summary data-text-reveal>{f.question}<span>+</span></summary><p>{f.answer}</p></details>)}</div>
      </div></div>
    </section>

    <Invitation home/>
  </>;
}
