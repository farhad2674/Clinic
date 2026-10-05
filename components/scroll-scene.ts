'use client';
export function scrollScene(id:string,progress:number,fallback?:string){
  const el=document.getElementById(id);if(!el)return;
  const full=document.documentElement.classList.contains('motion-ready')&&!document.documentElement.classList.contains('reduced-motion')&&innerWidth>=768;
  if(id==='journey'&&!full){document.getElementById(fallback||id)?.scrollIntoView({behavior:document.documentElement.classList.contains('reduced-motion')?'instant':'smooth',block:'nearest',inline:'center'});return;}
  const target=full?el.getBoundingClientRect().top+scrollY+(el.offsetHeight-innerHeight)*progress:(document.getElementById(fallback||id)?.getBoundingClientRect().top??el.getBoundingClientRect().top)+scrollY-100;
  window.scrollTo({top:target,behavior:document.documentElement.classList.contains('reduced-motion')?'instant':'smooth'});
}
