'use client';
import {faNumber} from '@/lib/site';
import {homeJourney as slides} from '@/lib/home-content';
import {Arrow} from './shell';
import {scrollScene} from './scroll-scene';

function JourneyIcon({index}:{index:number}){
  const common={fill:'none',stroke:'currentColor',strokeWidth:1.35,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
  const shapes=[
    <><path d="M5 7h22v16H14l-7 5v-5H5z"/><path d="M10 13h12M10 18h8"/></>,
    <><circle cx="16" cy="16" r="10"/><path d="M16 9v14M9 16h14M24 24l5 5"/></>,
    <><path d="M7 6h18v21H7zM12 12h8M12 17h8M12 22h5"/><path d="M23 7l4 4"/></>,
    <><path d="M16 3l3.2 9.8L29 16l-9.8 3.2L16 29l-3.2-9.8L3 16l9.8-3.2z"/></>,
    <><path d="M5 24l6-7 5 3 8-11 3 3"/><path d="M5 6v21h23"/></>,
    <><path d="M7 15a9 9 0 0 1 16-6l2 2M25 17a9 9 0 0 1-16 6l-2-2"/><path d="M25 5v6h-6M7 27v-6h6"/></>
  ];
  return <svg className="journey-icon" viewBox="0 0 32 32" aria-hidden="true" {...common}>{shapes[index]}</svg>;
}

export function Journey(){
  const updateSwipe=(event:React.UIEvent<HTMLDivElement>)=>{
    if(innerWidth>=768)return;
    const viewport=event.currentTarget;
    const first=viewport.querySelector<HTMLElement>('.journey-slide');
    if(!first)return;
    const gap=Number.parseFloat(getComputedStyle(viewport.querySelector<HTMLElement>('.journey-track')!).gap)||0;
    const index=Math.min(slides.length-1,Math.round(Math.abs(viewport.scrollLeft)/(first.offsetWidth+gap)));
    viewport.closest('#journey')?.querySelectorAll('[data-journey-tab]').forEach((dot,i)=>{dot.toggleAttribute('data-active',i===index);dot.setAttribute('aria-pressed',String(i===index))});
    const count=viewport.closest('#journey')?.querySelector<HTMLElement>('[data-journey-count]');
    if(count)count.textContent=String(index+1).padStart(2,'0').replace(/[0-9]/g,d=>'۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
  };
  return <section id="journey" className="journey scene" data-chapter>
    <div className="journey-stage scene-stage">
      <div className="page-width journey-top">

        <h2 data-text-reveal>از گفت‌وگو <em>تا پیگیری.</em></h2>

      </div>
      <div className="journey-viewport" aria-label="مراحل مسیر مراقبت" onScroll={updateSwipe}>
        <div className="journey-track">
          {slides.map((step,index)=><article className="journey-slide" id={'journey-step-'+index} data-journey-slide={index} key={step.title}>
            <div className="journey-slide-copy">
              <div className="journey-slide-top"><JourneyIcon index={[0,2,5][index]}/></div>
              <div><h3>{step.title}</h3><p>{step.body}</p></div>

            </div>
            <figure><img src={slides[index].image} alt={slides[index].alt} loading="lazy"/></figure>
          </article>)}
        </div>
      </div>
      <div className="journey-bottom page-width">
        <div className="journey-controls"><span className="journey-current" aria-live="off"><b data-journey-count>۰۱</b><span> / {faNumber(slides.length).padStart(2,'۰')}</span></span><div className="journey-dots" aria-label="رفتن به مرحله">{slides.map((step,index)=><button key={step.title} type="button" data-journey-tab={index} onClick={()=>scrollScene('journey',index/(slides.length-1),'journey-step-'+index)} aria-label={'مرحله '+faNumber(index+1)+': '+step.title} aria-pressed={index===0}/>)}</div></div>
        <a className="text-link journey-more" href="/care#preparation">برای گفت‌وگو آماده شوید <Arrow/></a>
      </div>
    </div>
  </section>;
}
