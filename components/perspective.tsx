'use client';
import {scrollScene} from './motion';
import {Arrow} from './shell';

const decisionCards=[
  {title:'چه چیزی برای شما تغییر کرده است؟',body:'شرح دغدغه، زمان شروع آن و آنچه خودتان تجربه می‌کنید، آغاز گفت‌وگوست.',tag:'شنیدن دغدغه'},
  {title:'چه زمینه‌ای باید بررسی شود؟',body:'نوع پوست یا مو، سابقه پزشکی و تجربه درمان‌های پیشین در کنار هم دیده می‌شوند.',tag:'دیدن زمینه'},
  {title:'چه نتیجه‌ای برای شما مناسب است؟',body:'هدف، ترجیح‌ها و محدودیت‌های شما مسیر تصمیم را روشن می‌کنند.',tag:'انتخاب آگاهانه'}
];

export function Perspective(){
  return <section id="perspective" className="perspective scene" data-chapter>
    <div className="perspective-stage scene-stage page-width">
      <div className="section-label"><span className="chapter-number" dir="ltr">05</span><span>از دغدغه تا تصمیم</span></div>
      <div className="perspective-layout">
        <div className="perspective-copy">
          <p className="eyebrow">هر انتخاب، از چند پرسش آغاز می‌شود</p>
          <h2>یک دغدغه؛<br/><em>سه لایه شناخت.</em></h2>
          <p className="perspective-intro">یک نشانه به‌تنهایی نسخه درمان نیست. برای رسیدن به انتخابی مناسب، تصویر کامل‌تری از شما و هدف‌تان می‌سازیم.</p>
          <div className="perspective-index" aria-label="سه لایه شناخت">
            {decisionCards.map((card,i)=><button key={card.tag} data-perspective-tab={i} data-active={i===0?true:undefined} aria-pressed={i===0} onClick={()=>scrollScene('perspective',(i+.15)/decisionCards.length,'perspective-card-'+i)} aria-label={'نمایش مرحله '+(i+1)+'، '+card.tag}><span className="latin-number">0{i+1}</span><span>{card.tag}</span><i/></button>)}
          </div>
          <a className="text-link perspective-more" href="/care">آشنایی با مسیر ارزیابی <Arrow/></a>
        </div>
        <div className="perspective-visual">
          <div className="perspective-orbit" aria-hidden="true"><span/><span/><span/></div>
          <div className="perspective-cards">
            {decisionCards.map((card,i)=><article className="perspective-card" id={'perspective-card-'+i} data-perspective-card={i} data-position={i} key={card.title}>
              <span className="perspective-card-top"><span className="latin-number">0{i+1}</span><span lang="en" dir="ltr">ELORA / CARE</span></span>
              <div className="perspective-glyph" aria-hidden="true"><span/><span/><span/></div>
              <p className="eyebrow">{card.tag}</p>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <span className="perspective-card-line" aria-hidden="true"/>
            </article>)}
          </div>
          <div className="perspective-count" dir="ltr" aria-hidden="true"><span data-perspective-count>01</span><span> / 03</span></div>
        </div>
      </div>
    </div>
  </section>;
}
