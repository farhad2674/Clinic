'use client';
import {useEffect,useRef} from 'react';
import {methodComparisons} from '@/lib/home-content';
import {faNumber} from '@/lib/site';
import {Arrow} from './shell';
import {JournalImage} from './journal-image';

/** All comparisons remain in the document; scrolling only changes emphasis. */
export function MethodAtlas(){
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{
    const root=ref.current;if(!root)return;
    const cards=Array.from(root.querySelectorAll<HTMLElement>('[data-method-card]'));
    const count=root.querySelector<HTMLElement>('[data-method-current]');
    let frame=0,visible=false;
    const activate=(index:number)=>{
      cards.forEach((card,i)=>card.toggleAttribute('data-active',i===index));
      if(count)count.textContent=faNumber(index+1).padStart(2,'۰');
    };
    const update=()=>{
      frame=0;if(!visible)return;
      const focused=cards.findIndex(card=>card.contains(document.activeElement));
      if(focused>=0){activate(focused);return}
      const distances=cards.map(card=>{const rect=card.getBoundingClientRect();return Math.abs(rect.top+rect.height/2-innerHeight*.55)});
      activate(distances.indexOf(Math.min(...distances)));
    };
    const schedule=()=>{if(!frame&&visible)frame=requestAnimationFrame(update)};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;schedule()});
    observer.observe(root);
    window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
    root.addEventListener('focusin',schedule);root.addEventListener('focusout',schedule);
    return()=>{observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);root.removeEventListener('focusin',schedule);root.removeEventListener('focusout',schedule)};
  },[]);
  return <section ref={ref} id="life" className="method-atlas section-space" data-chapter aria-labelledby="method-atlas-title">
    <div className="page-width method-atlas-layout">
      <div className="method-atlas-intro">
        <span className="eyebrow">تفاوت‌ها، کنار هم</span>
        <h2 id="method-atlas-title" data-reveal>این روش‌ها<br/><em>چه تفاوتی دارند؟</em></h2>
        <p>چهار روش را بر اساس نوع ماده، کاربرد و پرسش‌های مهم با هم مقایسه کنید.</p>
        <div className="method-atlas-index" aria-hidden="true"><span data-method-current>۰۱</span><span>/ ۰۴</span><i/></div>
        <span className="method-atlas-note">هر راهنما، یک قدم برای گفت‌وگویی روشن‌تر.</span>
      </div>
      <div className="method-atlas-cards">
        {methodComparisons.map((method,index)=><article className="method-atlas-card" data-method-card data-active={index===0?true:undefined} key={method.label}>
          <figure><JournalImage image={method.image} sizes="(max-width: 767px) 30vw, 180px"/></figure>
          <div className="method-atlas-copy">
            <div className="method-atlas-label"><span>{method.label}</span><span aria-hidden="true">{faNumber(index+1).padStart(2,'۰')}</span></div>
            <h3>{method.title}</h3><p>{method.body}</p>
            <div className="method-atlas-question"><span>پرسش پیش از انتخاب</span><p>{method.question}</p></div>
            <a className="text-link" href={method.link}>راهنمای {method.label} <Arrow/></a>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
