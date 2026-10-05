'use client';
import {useEffect,useState} from 'react';

export function DeferredMotion(){
  const [Component,setComponent]=useState<null|typeof import('./motion').Motion>(null);
  useEffect(()=>{
    let active=true;
    const timer=window.setTimeout(()=>{
      void import('./motion').then(module=>{
        if(active)setComponent(()=>module.Motion);
      }).catch(error=>console.warn('Scroll motion unavailable; showing static content.',error));
    },350);
    return()=>{active=false;clearTimeout(timer)};
  },[]);
  return Component?<Component/>:null;
}
