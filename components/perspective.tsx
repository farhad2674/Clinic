'use client';
import {scrollScene} from './scroll-scene';
import {Arrow} from './shell';

const decisionCards=[
  {title:'پژوهش چه چیزی را نشان داده؟',body:'یافته آزمایشگاهی، به‌تنهایی اثربخشی در انسان را ثابت نمی‌کند.',tag:'پژوهش'},
  {title:'شواهد برای کدام کاربرد است؟',body:'نتیجه یک مطالعه به همان فرآورده، روش و کاربرد مربوط است؛ تعمیم آن نیاز به شواهد دارد.',tag:'کاربرد بالینی'},
  {title:'برای شرایط شما مناسب است؟',body:'سابقه پزشکی، گزینه‌های دیگر و انتظار از نتیجه باید کنار شواهد بررسی شوند.',tag:'تناسب با شما'}
];

export function Perspective(){
  return <section id="perspective" className="perspective scene" data-chapter>
    <div className="perspective-stage scene-stage page-width">
      <div className="perspective-layout">
        <div className="perspective-copy">

          <h2>شواهد هر روش<br/><em>چه می‌گویند؟</em></h2>

          <div className="perspective-index" aria-label="پرسش‌های پیش از درمان">
            {decisionCards.map((card,i)=><button key={card.tag} data-perspective-tab={i} data-active={i===0?true:undefined} aria-pressed={i===0} onClick={()=>scrollScene('perspective',(i+.15)/decisionCards.length,'perspective-card-'+i)} aria-label={'نمایش مرحله '+(i+1)+'، '+card.tag}><span className="latin-number">0{i+1}</span><span>{card.tag}</span><i/></button>)}
          </div>
          <a className="text-link perspective-more" href="/journal/novel-cellular-methods">از پژوهش تا کاربرد <Arrow/></a>
        </div>
        <div className="perspective-visual">
          <div className="perspective-orbit" aria-hidden="true"><span/><span/><span/></div>
          <div className="perspective-cards">
            {decisionCards.map((card,i)=><article className="perspective-card" id={'perspective-card-'+i} data-perspective-card={i} data-position={i} key={card.title}>
              <span className="perspective-card-top"><span className="latin-number">0{i+1}</span></span>
              <div className="perspective-glyph" aria-hidden="true"><span/><span/><span/></div>

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
