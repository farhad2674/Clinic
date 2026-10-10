'use client';

import {useEffect,useState} from 'react';
import {waitForOpeningContent} from '@/lib/opening-readiness';
import {BrandLogo} from './brand-logo';

export function BrandIntro() {
  const [active,setActive]=useState(true);
  useEffect(()=>{
    const root=document.documentElement;
    if(!root.classList.contains('elvitha-intro-pending')){setActive(false);return;}
    const controller=new AbortController();
    let disposed=false;
    const finish=(status:string)=>{
      if(disposed||!root.classList.contains('elvitha-intro-pending'))return;
      root.classList.remove('elvitha-intro-pending');
      root.dataset.elvithaIntro=status;
      setActive(false);
      controller.abort();
    };
    const bypass=()=>finish('skipped');
    const bootstrapFinished=()=>{setActive(false);controller.abort();};
    const onKey=(event:KeyboardEvent)=>{if(event.key==='Escape'||event.key==='Tab')bypass();};
    window.addEventListener('elvitha-intro-skip',bypass);
    window.addEventListener('elvitha-intro-finished',bootstrapFinished);
    window.addEventListener('keydown',onKey);
    void waitForOpeningContent(document,controller.signal).then(status=>finish(status)).catch(()=>finish('fallback'));
    return()=>{
      disposed=true;
      controller.abort();
      window.removeEventListener('elvitha-intro-skip',bypass);
      window.removeEventListener('elvitha-intro-finished',bootstrapFinished);
      window.removeEventListener('keydown',onKey);
    };
  },[]);
  return <div className="brand-intro" aria-hidden={!active}>
    <div className="brand-intro-orbit" aria-hidden="true"/>
    <div className="brand-intro-center">
      <BrandLogo className="brand-intro-logo"/>
      <span className="brand-intro-line" aria-hidden="true"/>
      <p className="brand-intro-caption" role={active?'status':undefined}>{active?'کمی تا آغاز همراهی…':''}</p>
    </div>
    <button className="brand-intro-skip" tabIndex={active?0:-1} onClick={()=>window.dispatchEvent(new Event('elvitha-intro-skip'))}>ورود به وب‌سایت <span aria-hidden="true">←</span></button>
  </div>;
}
