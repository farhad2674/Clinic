'use client';
import {content} from '@/lib/site';
import {Arrow,CTA} from './shell';

function SectionLabel({number,children}:{number:string;children:React.ReactNode}){
  return <div className="section-label"><span className="chapter-number" dir="ltr">{number}</span><span>{children}</span></div>;
}

const principles=[
  {title:'انتخاب آگاهانه',text:'مزایا، محدودیت‌ها، هزینه‌ها و عوارض احتمالی، پیش از آغاز درمان توضیح داده می‌شوند.'},
  {title:'صداقت در تصمیم',text:'اگر درمانی برای شما مناسب نباشد، آن را پیشنهاد نمی‌کنیم. نتیجه‌ای را تضمین نمی‌کنیم که پزشکی امکان تضمین آن را ندارد.'},
  {title:'احترام به حریم شما',text:'اطلاعات، تصاویر و تصمیم‌های درمانی شما محرمانه‌اند. حریم خصوصی، بخشی از کیفیت مراقبت است.'}
];

export function LateChapters(){
  return <>
    <section id="care-pause" className="care-pause cover-chapter" data-cover-chapter aria-labelledby="care-pause-title">
      <div className="cover-stage">
        <div className="care-pause-inner page-width">
          <span className="eyebrow">پیش از هر تصمیم</span>
          <h2 id="care-pause-title" data-cover-title>
            <span className="cover-title-line"><span>مسیر درست،</span></span>
            <span className="cover-title-line"><span>از <a className="heading-cta" href="/contact">یک گفت‌وگو <Arrow/></a> آغاز می‌شود.</span></span>
          </h2>
          <p>نیاز شما را می‌شنویم؛ سپس درباره مسیر مناسب و قدم بعد صحبت می‌کنیم.</p>
          <span className="care-pause-index" aria-hidden="true">ELORA / CONSIDERED CARE</span>
        </div>
      </div>
    </section>

    <section id="trust" className="trust section-space cover-chapter" data-cover-chapter data-chapter>
      <div className="cover-stage"><div className="page-width">
        <SectionLabel number="07">علم در کنار مسئولیت</SectionLabel>
        <h2 className="trust-head" data-cover-title>
          <span className="cover-title-line"><span>نوآوری، زمانی ارزشمند است</span></span>
          <span className="cover-title-line"><span>که <span className="outlined-word">مسئولانه</span> باشد.</span></span>
        </h2>
        <div className="trust-intro cover-body"><span className="large-asterisk" aria-hidden="true">✳</span><p data-text-reveal>نام یک فناوری جدید به‌تنهایی دلیل مناسبی برای درمان نیست. شواهد علمی، ایمنی، مجوز و تناسب با شرایط شما، مبنای انتخاب‌اند.</p></div>
        <div className="trust-principles cover-body">{principles.map((p,i)=><article key={p.title} data-depth-box="card"><span className="latin-number">0{i+1}</span><h3 data-text-reveal>{p.title}</h3><p data-text-reveal>{p.text}</p></article>)}</div>
        <div className="trust-links cover-body"><a href="/advanced" className="text-link">نگاه ما به درمان‌های نوین <Arrow/></a><a href="/privacy" className="text-link">تعهد به حریم خصوصی <Arrow/></a></div>
      </div></div>
    </section>

    <section id="journal" className="journal section-space cover-chapter" data-cover-chapter data-chapter>
      <div className="cover-stage"><div className="page-width">
        <div className="journal-heading"><div>
          <SectionLabel number="08">مجله علمی الورا</SectionLabel>
          <h2 data-cover-title><span className="cover-title-line"><span>پیش از تصمیم،</span></span><span className="cover-title-line"><span><em>آگاه شوید.</em></span></span></h2>
        </div><a className="text-link" href="/journal">همه موضوعات <Arrow/></a></div>
        <div className="journal-layout cover-body"><div className="journal-feature" data-parallax data-depth-box="visual"><img src="/media/hair.webp" alt="تصویر نمایشی بافت طبیعی مو" loading="lazy"/><div><span className="topic-status">در دست آماده‌سازی</span><h3>{content.articles[0]}</h3><p>سلامت مو و پوست سر</p></div></div><div className="journal-list">{content.articles.slice(1,5).map((a,i)=><article data-depth-box="row" key={a}><span className="latin-number">0{i+2}</span><div><span className="eyebrow">دانستنی‌های مراقبت</span><h3 data-text-reveal>{a}</h3><span className="topic-status">پس از بازبینی علمی منتشر می‌شود</span></div></article>)}<p className="journal-disclaimer" data-text-reveal>محتوای علمی برای کمک به انتخاب آگاهانه است؛ جایگزین تشخیص پزشکی نیست.</p></div></div>
      </div></div>
    </section>

    <section id="faq-preview" className="home-faq section-space cover-chapter" data-cover-chapter>
      <div className="cover-stage"><div className="page-width faq-layout">
        <div><SectionLabel number="09">پیش از اولین گفت‌وگو</SectionLabel><h2 data-cover-title><span className="cover-title-line"><span>شاید پرسش</span></span><span className="cover-title-line"><span><em>شما هم باشد.</em></span></span></h2><a className="text-link" href="/faq">همه پرسش‌ها <Arrow/></a></div>
        <div className="cover-body">{content.faq.slice(0,4).map(f=><details key={f.question} data-depth-box="row"><summary data-text-reveal>{f.question}<span>+</span></summary><p>{f.answer}</p></details>)}</div>
      </div></div>
    </section>

    <section id="invitation" className="invitation section-space cover-chapter" data-cover-chapter data-chapter>
      <div className="cover-stage"><div className="page-width invitation-grid">
        <figure className="invitation-image" data-parallax data-depth-box="visual"><img src="/media/lounge.webp" alt="تصویر مفهومی سالن انتظار الورا" loading="lazy"/><figcaption>تصویر مفهومی فضای الورا</figcaption></figure>
        <div className="invitation-copy" data-depth-box="near"><SectionLabel number="10">آغاز گفت‌وگو</SectionLabel><h2 data-cover-title>
          <span className="cover-title-line"><span>نقطه شروع،</span></span>
          <span className="cover-title-line"><span>انتخاب یک درمان نیست؛</span></span>
          <span className="cover-title-line"><span><em>شناخت دقیق نیاز شماست.</em></span></span>
        </h2><p className="cover-body" data-text-reveal>برای انتخاب درمان عجله نکنید.<br/>از ارزیابی درست آغاز کنید.</p><div className="cover-body"><CTA/></div><span className="invitation-foot cover-body">با احترام به زمان، انتخاب و حریم شما.</span></div>
      </div></div>
    </section>
  </>;
}
