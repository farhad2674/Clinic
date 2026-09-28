import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

export function enhanceScenes(desktop:boolean){
  const portraitScene={trigger:'#understanding',start:desktop?'top top':'top 65%',end:desktop?'bottom bottom':'bottom 35%'};
  const updateObservation=(self:ScrollTrigger)=>{
    const active=Math.min(2,Math.floor(self.progress*3));
    document.querySelectorAll<HTMLElement>('[data-observation]').forEach((el,i)=>el.toggleAttribute('data-active',i===active));


  };
  ScrollTrigger.create({...portraitScene,onUpdate:updateObservation,onRefresh:updateObservation});
  gsap.fromTo('.understanding-copy h2',{y:32,opacity:.5},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:'.understanding-copy h2',start:'top 94%',end:'top 55%',scrub:true}});

  const layered=innerWidth>=1024&&innerHeight>=850;
  const compact=desktop&&!layered;
  gsap.utils.toArray<HTMLElement>('[data-cover-chapter]').forEach(chapter=>{
    const title=chapter.querySelector<HTMLElement>('[data-cover-title]');
    const lines=chapter.querySelectorAll<HTMLElement>('.cover-title-line > span');
    if(lines.length&&desktop){
      gsap.fromTo(lines,{yPercent:105,opacity:.2,clipPath:'inset(0 0 0 55%)',filter:'blur(5px)'},{
        yPercent:0,opacity:1,clipPath:'inset(0 0 0 0%)',filter:'blur(0px)',stagger:.12,ease:'none',
        scrollTrigger:{trigger:layered?chapter:title,start:layered?'top 92%':'top 96%',end:layered?'top 32%':'top 66%',scrub:true}
      });
    }
    chapter.querySelectorAll<HTMLElement>('.cover-body').forEach((body,index)=>{
      gsap.fromTo(body,{y:layered?42:22,opacity:.35},{
        y:0,opacity:1,ease:'none',
        scrollTrigger:{trigger:layered?chapter:body,start:layered?('top '+(82-index*3)+'%'):compact?'top 94%':'top 98%',end:layered?'top 22%':compact?'top 66%':'top 74%',scrub:true}
      });
    });
    if(desktop){
      gsap.fromTo(chapter,{borderTopLeftRadius:layered?'170px':'105px',borderTopRightRadius:layered?'170px':'105px'},{
        borderTopLeftRadius:layered?'90px':'58px',borderTopRightRadius:layered?'90px':'58px',ease:'none',
        scrollTrigger:{trigger:chapter,start:'top bottom',end:'top top',scrub:true}
      });
    }
  });
  if(desktop){
    const motionSections=gsap.utils.toArray<HTMLElement>('#journey,#trust,#journal,#faq-preview,#invitation');
    motionSections.forEach(section=>{
      section.querySelectorAll<HTMLElement>('[data-text-reveal]').forEach((el,index)=>{
        gsap.fromTo(el,{
          clipPath:'inset(0 0 0 100%)',filter:'blur(7px)',opacity:.35
        },{
          clipPath:'inset(0 0 0 0%)',filter:'blur(0px)',opacity:1,ease:'none',
          scrollTrigger:{
            trigger:layered||section.id==='journey'?section:el,
            start:layered||section.id==='journey'?'top '+Math.max(66,92-index*3)+'%':'top 96%',
            end:layered||section.id==='journey'?'top '+Math.max(22,36-index*2)+'%':'top 66%',
            scrub:true
          }
        });
      });
      section.querySelectorAll<HTMLElement>('[data-depth-box]').forEach((box,index)=>{
        const kind=box.dataset.depthBox;
        const amount=(kind==='visual'?34:kind==='far'?-22:kind==='near'?22:kind==='card'?16:10)*(compact?.8:1);
        const offset=kind==='visual'||kind==='near'||kind==='far'?amount:amount*(index%2===0?1:-1);
        gsap.fromTo(box,{y:offset,scale:kind==='visual'?.985:1},{
          y:-offset,scale:kind==='visual'?1.015:1,ease:'none',
          scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:true}
        });
      });
    });
  }
  if(desktop){
    const updatePerspective=(self:ScrollTrigger)=>{
      const active=Math.min(2,Math.floor(self.progress*3));
      document.querySelectorAll<HTMLElement>('[data-perspective-card]').forEach((el,i)=>{
        el.dataset.position=String(i-active);
        el.setAttribute('aria-hidden',String(i!==active));
      });
      document.querySelectorAll<HTMLElement>('[data-perspective-tab]').forEach((el,i)=>{
        el.toggleAttribute('data-active',i===active);
        el.setAttribute('aria-pressed',String(i===active));
      });
      const count=document.querySelector<HTMLElement>('[data-perspective-count]');
      if(count)count.textContent='0'+(active+1);
    };
    ScrollTrigger.create({trigger:'#perspective',start:'top top',end:'bottom bottom',onUpdate:updatePerspective,onRefresh:updatePerspective});
    gsap.fromTo('.perspective-orbit',{rotation:-25,scale:.82},{rotation:35,scale:1.12,ease:'none',scrollTrigger:{trigger:'#perspective',start:'top top',end:'bottom bottom',scrub:true}});
    gsap.fromTo('.perspective-copy h2',{y:28,opacity:.5},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:'#perspective',start:'top 90%',end:'top 45%',scrub:true}});
  }else{
    gsap.utils.toArray<HTMLElement>('[data-perspective-card]').forEach(el=>{
      gsap.fromTo(el,{y:28,opacity:.5},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:el,start:'top 95%',end:'top 60%',scrub:true}});
    });
  }
}
