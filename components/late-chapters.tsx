'use client';
import {homeArticles,homeFaq} from '@/lib/home-content';
import {Arrow} from './shell';
import {Invitation} from './invitation';
import {journalImages} from '@/lib/journal-images';
import {JournalImage} from './journal-image';


export function LateChapters(){
  return <>
    <section id="journal" className="journal section-space cover-chapter" data-cover-chapter data-chapter>
      <div className="cover-stage"><div className="page-width">
        <div className="journal-heading"><div>

          <h2 data-cover-title><span className="cover-title-line"><span>مجلهٔ</span></span><span className="cover-title-line"><span><em>پزشکی بازساختی.</em></span></span></h2>
        </div><a className="text-link" href="/journal">همهٔ مقاله‌ها <Arrow/></a></div>
        <div className="journal-layout cover-body"><div className="journal-feature" data-parallax data-depth-box="visual"><JournalImage image={journalImages["exosomes-evidence"]} sizes="(max-width: 767px) 90vw, 42vw"/><div><h3><a href={'/journal/'+homeArticles[0].slug}>{homeArticles[0].title}</a></h3></div></div><div className="journal-list">{homeArticles.slice(1).map(a=><article data-depth-box="row" key={a.slug}><div><h3 data-text-reveal><a href={'/journal/'+a.slug}>{a.title}</a></h3></div></article>)}<p className="journal-disclaimer" data-text-reveal>مقاله‌های دارای منابع؛ در انتظار بازبینی پزشکی.</p></div></div>
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
