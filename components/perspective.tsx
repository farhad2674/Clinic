'use client';
import {scrollScene} from './scroll-scene';
import {Arrow} from './shell';
import {SectionLabel} from './section-label';

const decisionCards=[
  {title:'چه نتیجه‌ای می‌توان انتظار داشت؟',body:'میزان بهبود و محدودیت‌ها را بررسی می‌کنیم؛ پاسخ افراد یکسان نیست.',tag:'نتیجه و محدودیت'},
  {title:'چقدر زمان و هزینه لازم است؟',body:'جلسات احتمالی، هزینه و مراقبت پس از درمان، پیش از شروع روشن می‌شوند.',tag:'زمان و هزینه'},
  {title:'اگر این روش مناسب من نباشد؟',body:'گزینه‌های دیگر یا انجام‌ندادن درمان هم قابل بررسی‌اند.',tag:'حق انتخاب'}
];

export function Perspective(){
  return <section id="perspective" className="perspective scene" data-chapter>
    <div className="perspective-stage scene-stage page-width">
      <div className="perspective-layout">
        <div className="perspective-copy">
          <SectionLabel>انتخاب</SectionLabel>
          <h2>پیش از درمان،<br/><em>چه باید بدانید؟</em></h2>
          <p className="perspective-intro">فایده، محدودیت و هزینه هر روش را بسنجید.</p>
          <div className="perspective-index" aria-label="پرسش‌های پیش از درمان">
            {decisionCards.map((card,i)=><button key={card.tag} data-perspective-tab={i} data-active={i===0?true:undefined} aria-pressed={i===0} onClick={()=>scrollScene('perspective',(i+.15)/decisionCards.length,'perspective-card-'+i)} aria-label={'نمایش مرحله '+(i+1)+'، '+card.tag}><span className="latin-number">0{i+1}</span><span>{card.tag}</span><i/></button>)}
          </div>
          <a className="text-link perspective-more" href="/care">جزئیات جلسه مشاوره <Arrow/></a>
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
