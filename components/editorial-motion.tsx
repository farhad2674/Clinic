'use client';
import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function EditorialMotion(){
  useEffect(()=>{
    const root=document.querySelector<HTMLElement>('.inner-main');
    if(!root)return;
    let context:gsap.Context|undefined;
    let disposed=false;
    let coverPin:ScrollTrigger|undefined;
    let timer:ReturnType<typeof setTimeout>;
    const preference=matchMedia('(prefers-reduced-motion: reduce)');
    const setup=()=>{
      context?.revert();coverPin=undefined;
      if(disposed||preference.matches||document.documentElement.classList.contains('reduced-motion'))return;
      context=gsap.context(()=>{
        const desktop=innerWidth>=768;
        const body=root.querySelector<HTMLElement>('.inner-body');
        const invitation=root.querySelector<HTMLElement>('.site-invitation');
        // Hold the completed reading surface while the next chapter rises over it.
        // No extra scroll space: every paragraph remains reachable before the cover arrives.
        if(body&&invitation&&innerWidth>=1024&&innerHeight>=700){
          coverPin=ScrollTrigger.create({trigger:body,start:'bottom bottom',end:()=>'+='+innerHeight,pin:body,pinSpacing:false,invalidateOnRefresh:true,refreshPriority:1});
        }
        const headings=root.querySelectorAll<HTMLElement>('[data-inner-title],.inner-body h2,.inner-body h3');
        headings.forEach(el=>{
          // Keep nested card/step movement independent from the text mask.
          gsap.fromTo(el,{clipPath:desktop?'inset(0 0 0 55%)':'inset(0 0 0 0%)',opacity:.45},{clipPath:'inset(0 0 0 0%)',opacity:1,ease:'none',scrollTrigger:{trigger:el,start:'top 94%',end:'top 58%',scrub:true}});
        });
        root.querySelectorAll<HTMLElement>('[data-reveal],.service-row,.category-tile,.journal-card,.inner-faq details,.sitemap-grid>section,.related-reading li').forEach(el=>{
          gsap.fromTo(el,{y:desktop?28:14,opacity:.6},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:el,start:'top 98%',end:'top 70%',scrub:true}});
        });
        root.querySelectorAll<HTMLElement>('[data-parallax] img,.contact-image img,.journal-card img').forEach(el=>{
          gsap.fromTo(el,{scale:1.09,yPercent:-3},{scale:1.09,yPercent:3,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:true}});
        });
        if(desktop){
          gsap.fromTo('.inner-orbit',{rotation:-20,y:0},{rotation:35,y:65,ease:'none',scrollTrigger:{trigger:'.inner-hero',start:'top top',end:'bottom top',scrub:true}});
        }
        if(invitation){
          const lines=invitation.querySelectorAll('.cover-title-line > span');
          gsap.fromTo(lines,{yPercent:desktop?75:18,opacity:.35},{yPercent:0,opacity:1,stagger:.12,ease:'none',scrollTrigger:{trigger:invitation.querySelector('h2'),start:'top 96%',end:'top 42%',scrub:true}});
          if(desktop){
            gsap.fromTo(invitation,{borderTopLeftRadius:120,borderTopRightRadius:120},{borderTopLeftRadius:58,borderTopRightRadius:58,ease:'none',scrollTrigger:{trigger:invitation,start:'top bottom',end:'top top',scrub:true}});
            invitation.querySelectorAll<HTMLElement>('[data-depth-box]').forEach(el=>{
              const distance=el.dataset.depthBox==='visual'?28:-18;
              gsap.fromTo(el,{y:distance},{y:-distance,ease:'none',scrollTrigger:{trigger:invitation,start:'top bottom',end:'bottom top',scrub:true}});
            });
          }
        }
      },root);
      ScrollTrigger.refresh();
    };
    const rerun=()=>{clearTimeout(timer);timer=setTimeout(setup,120)};
    const refresh=()=>{if(!disposed)ScrollTrigger.refresh()};
    const revealFocus=(event:FocusEvent)=>{
      const target=event.target;
      if(!(target instanceof HTMLElement)||!target.closest('.inner-body')||!coverPin?.isActive)return;
      // Keyboard focus must never remain underneath the incoming cover.
      const y=Math.min(coverPin.start-1,coverPin.start+target.getBoundingClientRect().top-120);
      window.scrollTo({top:Math.max(0,y),behavior:'instant'});
      ScrollTrigger.update();
    };
    root.addEventListener('focusin',revealFocus);
    setup();
    void document.fonts.ready.then(()=>{if(!disposed)setup()});
    // Accordion changes move the closing chapter; refresh without resetting progress.
    root.addEventListener('toggle',refresh,true);

    window.addEventListener('elora-motion',rerun);
    let width=innerWidth,height=innerHeight;
    const resize=()=>{if(innerWidth!==width||Math.abs(innerHeight-height)>100){width=innerWidth;height=innerHeight;rerun()}};
    window.addEventListener('resize',resize);
    return()=>{disposed=true;clearTimeout(timer);context?.revert();root.removeEventListener('toggle',refresh,true);root.removeEventListener('focusin',revealFocus);window.removeEventListener('elora-motion',rerun);window.removeEventListener('resize',resize)};
  },[]);
  return null;
}
