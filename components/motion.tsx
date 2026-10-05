'use client';
import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {enhanceScenes} from './scene-enhancements';
import {prepareOpening} from '@/lib/opening-readiness';
gsap.registerPlugin(ScrollTrigger);

export function Motion(){
  useEffect(()=>{
    let context:gsap.Context|undefined;
    let timer:ReturnType<typeof setTimeout>;
    let disposed=false;
    const cleanups:Array<()=>void>=[];
    const root=document.querySelector<HTMLElement>('#main')!;
    root.dataset.openingState='loading';
    const controller=new AbortController();
    let releaseMedia:(()=>void)|undefined;
    let initialized=false;
    let storedPosition:string|null=null;
    try{storedPosition=sessionStorage.getItem('elora-home-scroll')}catch{}
    const parsedY=storedPosition===null?NaN:Number(storedPosition);
    const savedY=Number.isFinite(parsedY)&&parsedY>=0?parsedY:undefined;
    let restoreDone=false;
    const navigation=(performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming|undefined)?.type;
    const savePosition=()=>{try{if(restoreDone)sessionStorage.setItem('elora-home-scroll',String(scrollY))}catch{}};
    window.addEventListener('scroll',savePosition,{passive:true});

    const setup=()=>{
      context?.revert();cleanups.splice(0).forEach(fn=>fn());
      document.documentElement.classList.remove('motion-ready');
      document.querySelectorAll('[data-journey-step]').forEach(s=>s.removeAttribute('aria-hidden'));
      document.querySelectorAll('.care-panel').forEach(s=>s.removeAttribute('inert'));
      document.querySelectorAll('[data-perspective-card]').forEach(s=>s.removeAttribute('aria-hidden'));
      if(document.documentElement.classList.contains('reduced-motion')){
        // Page navigation remains useful even when animated scenes are disabled.
        const chapters=Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'));
        const links=Array.from(document.querySelectorAll<HTMLElement>('[data-nav-chapter]'));
        let frame=0;
        const update=()=>{
          frame=0;
          const active=chapters.filter(el=>el.getBoundingClientRect().top<=innerHeight*.5).at(-1)??chapters[0];
          links.forEach(link=>{
            const selected=link.dataset.navChapter===active?.id;
            link.toggleAttribute('data-active',selected);
            if(selected)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
          });
        };
        const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
        window.addEventListener('scroll',schedule,{passive:true});
        cleanups.push(()=>{window.removeEventListener('scroll',schedule);cancelAnimationFrame(frame)});
        update();return;
      }
      document.documentElement.classList.add('motion-ready');
      context=gsap.context(()=>{
        const desktop=innerWidth>=768;
        enhanceScenes(desktop);
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>gsap.fromTo(el,{y:36,opacity:.35},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:el,start:'top 94%',end:'top 55%',scrub:true}}));
        gsap.utils.toArray<HTMLElement>('[data-parallax] img').forEach(el=>gsap.fromTo(el,{scale:1.08,yPercent:-3},{scale:1,yPercent:3,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:true}}));
        gsap.utils.toArray<HTMLElement>('[data-chapter]').forEach(el=>ScrollTrigger.create({trigger:el,start:'top 50%',end:'bottom 50%',onToggle:self=>{
          if(self.isActive)document.querySelectorAll('[data-nav-chapter]').forEach(a=>{
            const active=(a as HTMLElement).dataset.navChapter===el.id;
            a.toggleAttribute('data-active',active);
            if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
          });
        }}));
        if(desktop){
          gsap.timeline({scrollTrigger:{trigger:'#entry',start:'top top',end:'bottom bottom',scrub:true}})
            .to('.hero-window',{left:'0%',top:0,width:'100%',height:'100%',borderRadius:'0px',duration:1.08,ease:'none'},0)
            .to('.hero-copy',{y:-100,opacity:0,duration:.36,ease:'none'},0)
            .to('.hero-aside, .hero-foot',{opacity:0,duration:.25,ease:'none'},0)
            .to('.corridor-intro',{opacity:0,duration:.38,ease:'none'},.12)
            .fromTo('.hero-threshold',{opacity:0,y:70,scale:.9},{opacity:1,y:0,scale:1,duration:.27,ease:'none'},.38)
            .to('.hero-threshold',{opacity:0,y:-45,scale:1.08,duration:.23,ease:'none'},.69)
            .fromTo('.hero-final',{opacity:0,y:45},{opacity:1,y:0,duration:.3,ease:'none'},.81)
            .fromTo('.hero-progress i',{scaleY:0},{scaleY:1,duration:1.11,ease:'none'},0);
          const track=document.querySelector<HTMLElement>('.paths-track')!;
          const viewport=document.querySelector<HTMLElement>('.paths-viewport')!;
          const updatePaths=(self:ScrollTrigger)=>{
            const idx=Math.round(self.progress*3);
            document.querySelectorAll('.care-panel').forEach((el,i)=>el.toggleAttribute('inert',i!==idx));
            document.querySelectorAll('[data-path-tab]').forEach((el,i)=>{el.toggleAttribute('data-active',i===idx);el.setAttribute('aria-pressed',String(i===idx))});
          };
          gsap.to(track,{x:()=>Math.max(0,track.scrollWidth-viewport.clientWidth+parseFloat(getComputedStyle(viewport).paddingLeft)+parseFloat(getComputedStyle(viewport).paddingRight)),ease:'none',scrollTrigger:{trigger:'#paths',start:'top top',end:'bottom bottom',scrub:true,invalidateOnRefresh:true,onUpdate:updatePaths,onRefresh:updatePaths}});
          const journeyTrack=document.querySelector<HTMLElement>('.journey-track')!;
          const journeyViewport=document.querySelector<HTMLElement>('.journey-viewport')!;
          const updateJourney=(self:ScrollTrigger)=>{
            const idx=Math.min(5,Math.round(self.progress*5));
            document.querySelectorAll('[data-journey-slide]').forEach((el,i)=>el.toggleAttribute('data-active',i===idx));
            document.querySelectorAll('[data-journey-tab]').forEach((el,i)=>{el.toggleAttribute('data-active',i===idx);el.setAttribute('aria-pressed',String(i===idx))});
            const count=document.querySelector<HTMLElement>('[data-journey-count]');
            if(count)count.textContent=String(idx+1).padStart(2,'0').replace(/[0-9]/g,d=>'۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
          };
          gsap.to(journeyTrack,{x:()=>Math.max(0,journeyTrack.scrollWidth-journeyViewport.clientWidth+parseFloat(getComputedStyle(journeyViewport).paddingLeft)+parseFloat(getComputedStyle(journeyViewport).paddingRight)),ease:'none',scrollTrigger:{trigger:'#journey',start:'top top',end:'bottom bottom',scrub:true,invalidateOnRefresh:true,onUpdate:updateJourney,onRefresh:updateJourney}});        }else{
          gsap.fromTo('.hero-window',{clipPath:'inset(6% 8% 0% 8% round 140px 140px 0 0)'},{clipPath:'inset(0% 0% 0% 0% round 24px 24px 0 0)',ease:'none',scrollTrigger:{trigger:'#entry',start:'top top',end:'bottom top',scrub:true}});
          gsap.to('.corridor-intro',{opacity:0,scrollTrigger:{trigger:'.hero-window',start:'top 70%',end:'bottom 45%',scrub:true}});
        }
        gsap.timeline({scrollTrigger:{trigger:'#understanding',start:desktop?'top top':'top 25%',end:desktop?'bottom bottom':'bottom 50%',scrub:true}})

          .to('.portrait-orbit',{rotation:45,ease:'none'},0);
        document.querySelectorAll('[data-scrub-video]').forEach(node=>{
          const v=node as HTMLVideoElement;
          const scene=v.dataset.scrubVideo==='entrance'?'#entry':'#understanding';
          let desired=0;
          const seek=()=>{
            if(v.readyState>=2&&!v.seeking&&Number.isFinite(v.duration)&&v.duration>0){
              const t=Math.max(0,Math.min(v.duration-.05,desired*v.duration));
              if(Math.abs(v.currentTime-t)>.03)v.currentTime=t;
            }
          };
          const update=(self:ScrollTrigger)=>{desired=self.progress;seek()};
          v.addEventListener('loadeddata',seek);v.addEventListener('seeked',seek);
          cleanups.push(()=>{v.removeEventListener('loadeddata',seek);v.removeEventListener('seeked',seek);v.pause()});
          ScrollTrigger.create({trigger:scene,start:desktop?'top top':'top 65%',end:desktop?'bottom bottom':'bottom 35%',onUpdate:update,onRefresh:update});
        });
        if(matchMedia('(pointer:fine)').matches){
          document.querySelectorAll<HTMLElement>('.hero-window,.portrait-film').forEach(el=>{
            const target=el.querySelector<HTMLElement>('.window-frame,.observation-frame');
            if(!target)return;
            const move=(e:PointerEvent)=>{const r=el.getBoundingClientRect();target.style.translate=((e.clientX-r.left)/r.width-.5)*8+'px '+((e.clientY-r.top)/r.height-.5)*8+'px'};
            const leave=()=>{target.style.translate='0px 0px'};
            el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);
            cleanups.push(()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);target.style.translate=''});
          });
        }
      });
      ScrollTrigger.refresh();
    };
    const rerun=()=>{if(!initialized||disposed)return;clearTimeout(timer);timer=setTimeout(setup,100)};
    const restore=()=>{
      if(disposed)return;
      ScrollTrigger.refresh();
      if((navigation==='reload'||navigation==='back_forward')&&typeof savedY==='number'){
        scrollTo({top:savedY,left:0,behavior:'instant'});
      }else if(location.hash){
        let anchor=location.hash.slice(1);
        try{anchor=decodeURIComponent(anchor)}catch{/* Ignore malformed URL escapes. */}
        document.getElementById(anchor)?.scrollIntoView({behavior:'instant'});
      }
      ScrollTrigger.update();
      restoreDone=true;
    };
    window.addEventListener('elora-motion',rerun);
    let width=innerWidth;
    const resize=()=>{if(Math.abs(innerWidth-width)>40){width=innerWidth;rerun()}};
    const pageShow=(e:PageTransitionEvent)=>{if(e.persisted){ScrollTrigger.refresh();ScrollTrigger.update()}};
    window.addEventListener('resize',resize);window.addEventListener('pageshow',pageShow);
    const useStaticContent=(error:unknown)=>{
      initialized=false;
      controller.abort();
      try{context?.revert()}catch{/* Still release the loading gate if motion cleanup fails. */}
      cleanups.splice(0).forEach(fn=>{try{fn()}catch{}});
      document.documentElement.classList.remove('motion-ready');
      root.querySelectorAll('[data-journey-step],[data-perspective-card]').forEach(el=>el.removeAttribute('aria-hidden'));
      root.querySelectorAll('.care-panel').forEach(el=>el.removeAttribute('inert'));
      root.querySelectorAll<HTMLVideoElement>('video').forEach(video=>{
        video.pause();
        video.dataset.mediaState='fallback';
      });
      console.warn('Opening enhancement unavailable; showing static content.',error);
    };
    try {
      document.documentElement.classList.toggle('reduced-motion',matchMedia('(prefers-reduced-motion: reduce)').matches);
      setup();
      initialized=true;
      releaseMedia=prepareOpening(root,controller.signal);
      // Font settling matters for saved scroll positions, but never covers the first screen.
      void document.fonts.ready.then(()=>{
        if(disposed)return;
        requestAnimationFrame(()=>{
          if(disposed)return;
          try{restore()}catch(error){useStaticContent(error);restoreDone=true}
          finally{root.dataset.openingState='ready'}
        });
      });
    } catch(error) {
      useStaticContent(error);
      root.dataset.openingState='ready';
    }
    return()=>{
      disposed=true;controller.abort();clearTimeout(timer);context?.revert();cleanups.forEach(fn=>fn());releaseMedia?.();
      delete root.dataset.openingState;
      document.documentElement.classList.remove('motion-ready');
      document.querySelectorAll('[data-journey-step]').forEach(s=>s.removeAttribute('aria-hidden'));
      document.querySelectorAll('.care-panel').forEach(s=>s.removeAttribute('inert'));
      document.querySelectorAll('[data-perspective-card]').forEach(s=>s.removeAttribute('aria-hidden'));
      window.removeEventListener('elora-motion',rerun);window.removeEventListener('resize',resize);
      window.removeEventListener('scroll',savePosition);window.removeEventListener('pageshow',pageShow);
      
    };
  },[]);
  return null;
}

