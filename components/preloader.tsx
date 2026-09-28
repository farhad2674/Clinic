'use client';
import {useEffect,useState} from 'react';

export function Preloader(){
  const [visible,setVisible]=useState(true);
  const [leaving,setLeaving]=useState(false);
  const [progress,setProgress]=useState(0);
  useEffect(()=>{
    const root=document.documentElement;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    root.classList.add('opening-loading');
    const blocked=Array.from(document.querySelectorAll<HTMLElement>('#main,.site-header,.site-footer,.skip-link'));
    const previousInert=blocked.map(el=>el.inert);
    blocked.forEach(el=>{el.inert=true});
    let endTimer:ReturnType<typeof setTimeout>;
    let finished=false;
    const unlock=()=>{
      document.body.style.overflow=previousOverflow;
      root.classList.remove('opening-loading');
      blocked.forEach((el,i)=>{el.inert=previousInert[i]});
    };
    const finish=()=>{
      if(finished)return;
      finished=true;
      setProgress(1);
      setLeaving(true);
      endTimer=setTimeout(()=>{
        unlock();
        setVisible(false);
        window.dispatchEvent(new Event('elora-revealed'));
      },matchMedia('(prefers-reduced-motion: reduce)').matches?0:650);
    };
    const update=(event:Event)=>setProgress((event as CustomEvent<number>).detail*.9);
    window.addEventListener('elora-opening-progress',update);
    window.addEventListener('elora-opening-ready',finish);
    if(document.querySelector('#main')?.getAttribute('data-opening-state')==='ready')finish();
    return()=>{
      clearTimeout(endTimer);unlock();
      window.removeEventListener('elora-opening-progress',update);
      window.removeEventListener('elora-opening-ready',finish);
    };
  },[]);
  if(!visible)return null;
  return <div className={'preloader'+(leaving?' is-leaving':'')} role="status" aria-label="الورا در حال آماده‌سازی">
    <div className="preloader-ring" aria-hidden="true"/>
    <div className="preloader-mark" aria-hidden="true">
      <span className="preloader-outline">ELORA.</span>
      <span className="preloader-fill">ELORA.</span>
    </div>
    <p>زیبایی، در حال شکل‌گیری</p>
    <span className="preloader-line" aria-hidden="true"><i style={{transform:`scaleX(${progress})`}}/></span>
  </div>;
}
