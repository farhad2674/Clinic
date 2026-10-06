'use client';
import {scrollScene} from './scroll-scene';
import {Arrow} from './shell';

const decisionCards=[
  {title:'چه چیزی استفاده می‌شود؟',body:'نام فرآورده، نوع سلول و منبع آن چیست؟',tag:'نوع فرآورده'},
  {title:'برای چه هدفی؟',body:'چه پژوهشی روی انسان، با همین روش و برای همین بیماری انجام شده است؟',tag:'کاربرد و شواهد'},
  {title:'مجوز و پیگیری چطور؟',body:'وضعیت مجوز این کاربرد چیست و چه کسی عوارض احتمالی را پیگیری می‌کند؟',tag:'مجوز و پیگیری'}
];

export function Perspective(){
  return <section id="perspective" className="perspective scene" data-chapter>
    <div className="perspective-stage scene-stage page-width">
      <div className="perspective-layout">
        <div className="perspective-copy">

          <h2>پیش از سلول‌درمانی،<br/><em>سه سؤال بپرسید.</em></h2>

          <div className="perspective-index" aria-label="پرسش‌های پیش از درمان">
            {decisionCards.map((card,i)=><button key={card.tag} data-perspective-tab={i} data-active={i===0?true:undefined} aria-pressed={i===0} onClick={()=>scrollScene('perspective',(i+.15)/decisionCards.length,'perspective-card-'+i)} aria-label={'نمایش مرحله '+(i+1)+'، '+card.tag}><span className="latin-number">0{i+1}</span><span>{card.tag}</span><i/></button>)}
          </div>
          <a className="text-link perspective-more" href="/services/cell-based">راهنمای روش‌های سلولی <Arrow/></a>
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
