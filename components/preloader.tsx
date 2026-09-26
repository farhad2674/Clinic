'use client';
import {useEffect,useState} from 'react';

export function Preloader(){
  const [visible,setVisible]=useState(true);
  const [leaving,setLeaving]=useState(false);
  useEffect(()=>{
    if(document.documentElement.classList.contains('intro-seen')){setVisible(false);return}
    const started=performance.now();
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    let timer:ReturnType<typeof setTimeout>;
    let endTimer:ReturnType<typeof setTimeout>;
    let finished=false;
    const finish=()=>{
      if(finished)return;
      finished=true;
      setLeaving(true);
      endTimer=setTimeout(()=>{
        document.body.style.overflow=previousOverflow;
        document.documentElement.classList.add('intro-seen');
        try{sessionStorage.setItem('elora-intro-seen','1')}catch{}
        setVisible(false);
      },650);
    };
    const poster=new Promise<void>(resolve=>{
      const image=new Image();
      image.onload=()=>resolve();
      image.onerror=()=>resolve();
      image.src='/media/entrance-poster.webp';
      if(image.complete)resolve();
    });
    Promise.allSettled([document.fonts.ready,poster]).then(()=>{
      timer=setTimeout(finish,Math.max(0,1750-(performance.now()-started)));
    });
    const maximum=setTimeout(finish,3400);
    return()=>{clearTimeout(timer);clearTimeout(endTimer);clearTimeout(maximum);document.body.style.overflow=previousOverflow};
  },[]);
  if(!visible)return null;
  return <div className={'preloader'+(leaving?' is-leaving':'')} role="status" aria-label="الورا در حال آماده‌سازی">
    <div className="preloader-ring" aria-hidden="true"/>
    <div className="preloader-mark" aria-hidden="true">
      <span className="preloader-outline">ELORA.</span>
      <span className="preloader-fill">ELORA.</span>
    </div>
    <p>زیبایی، در حال شکل‌گیری</p>
    <span className="preloader-line" aria-hidden="true"><i/></span>
  </div>;
}