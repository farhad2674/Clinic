'use client';
import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {enhanceScenes} from './scene-enhancements';
gsap.registerPlugin(ScrollTrigger);

export function scrollScene(id:string,progress:number,fallback?:string){
  const el=document.getElementById(id);if(!el)return;
  const full=document.documentElement.classList.contains('motion-ready')&&!document.documentElement.classList.contains('reduced-motion')&&innerWidth>=768;
  if(id==='journey'&&!full){document.getElementById(fallback||id)?.scrollIntoView({behavior:document.documentElement.classList.contains('reduced-motion')?'instant':'smooth',block:'nearest',inline:'center'});return;}
  const target=full?el.getBoundingClientRect().top+scrollY+(el.offsetHeight-innerHeight)*progress:(document.getElementById(fallback||id)?.getBoundingClientRect().top??el.getBoundingClientRect().top)+scrollY-100;
  window.scrollTo({top:target,behavior:document.documentElement.classList.contains('reduced-motion')?'instant':'smooth'});
}
export function Motion(){
  useEffect(()=>{
    let context:gsap.Context|undefined;
    let timer:ReturnType<typeof setTimeout>;
    let disposed=false;
    const cleanups:Array<()=>void>=[];
    const storedPosition=sessionStorage.getItem('elora-home-scroll');
    const savedY=storedPosition===null?undefined:Number(storedPosition);
    let restoreDone=false;
    const navigation=(performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming|undefined)?.type;
    const savePosition=()=>{if(restoreDone)sessionStorage.setItem('elora-home-scroll',String(scrollY))};
    window.addEventListener('scroll',savePosition,{passive:true});

    const setup=()=>{
      context?.revert();cleanups.splice(0).forEach(fn=>fn());
      document.documentElement.classList.remove('motion-ready');
      document.querySelectorAll('[data-journey-step]').forEach(s=>s.removeAttribute('aria-hidden'));
      document.querySelectorAll('.care-panel').forEach(s=>s.removeAttribute('inert'));
      document.querySelectorAll('[data-perspective-card]').forEach(s=>s.removeAttribute('aria-hidden'));
      if(document.documentElement.classList.contains('reduced-motion'))return;
      document.documentElement.classList.add('motion-ready');
      context=gsap.context(()=>{
        const desktop=innerWidth>=768;
        enhanceScenes(desktop);
        gsap.timeline({defaults:{ease:'power3.out'}})
          .fromTo('.hero-copy .eyebrow',{y:18,opacity:0},{y:0,opacity:1,duration:.6},0)
          .fromTo('.hero-copy h1 > span',{yPercent:42,opacity:0},{yPercent:0,opacity:1,duration:.9,stagger:.13},.1)
          .fromTo('.hero-description, .hero-actions',{y:22,opacity:0},{y:0,opacity:1,duration:.7,stagger:.1},.48);
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
          .fromTo('.observation-frame',{yPercent:-16,scale:.95},{yPercent:15,scale:1.04,ease:'none'},0)
          .to('.portrait-orbit',{rotation:45,ease:'none'},0);
        document.querySelectorAll('[data-scrub-video]').forEach(node=>{
          const v=node as HTMLVideoElement;
          const scene=v.dataset.scrubVideo==='entrance'?'#entry':'#understanding';
          let desired=0;
          const seek=()=>{
            if(!v.seeking&&Number.isFinite(v.duration)&&v.duration>0){
              const t=Math.max(0,Math.min(v.duration-.05,desired*v.duration));
              if(Math.abs(v.currentTime-t)>.03)v.currentTime=t;
            }
          };
          const update=(self:ScrollTrigger)=>{desired=self.progress;seek()};
          v.addEventListener('loadedmetadata',seek);v.addEventListener('seeked',seek);
          cleanups.push(()=>{v.removeEventListener('loadedmetadata',seek);v.removeEventListener('seeked',seek);v.pause()});
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
    const rerun=()=>{clearTimeout(timer);timer=setTimeout(setup,100)};
    const restore=()=>{
      if(disposed)return;
      ScrollTrigger.refresh();
      if((navigation==='reload'||navigation==='back_forward')&&typeof savedY==='number'){
        scrollTo({top:savedY,left:0,behavior:'instant'});
      }else if(location.hash){
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({behavior:'instant'});
      }
      ScrollTrigger.update();
      restoreDone=true;
    };
    setup();
    window.addEventListener('elora-motion',rerun);
    let width=innerWidth;
    const resize=()=>{if(Math.abs(innerWidth-width)>40){width=innerWidth;rerun()}};
    const pageShow=(e:PageTransitionEvent)=>{if(e.persisted){ScrollTrigger.refresh();ScrollTrigger.update()}};
    window.addEventListener('resize',resize);window.addEventListener('pageshow',pageShow);
    document.fonts.ready.then(()=>requestAnimationFrame(restore));
    return()=>{
      disposed=true;clearTimeout(timer);context?.revert();cleanups.forEach(fn=>fn());
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
