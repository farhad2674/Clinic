'use client';
import type {ReactNode,MouseEvent} from 'react';
// Reveal before scrolling so the target has its final position, including after
// the editorial scene refreshes its measurements when the disclosure opens.
export function SourceLink({href,label,children}:{href:string;label:string;children:ReactNode}){
 function reveal(event:MouseEvent<HTMLAnchorElement>){
  if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const target=document.getElementById(href.slice(1));
  const disclosure=target?.closest<HTMLDetailsElement>('details');
  if(!target||!disclosure)return;
  event.preventDefault();disclosure.open=true;
  history.pushState(null,'',href);
  requestAnimationFrame(()=>requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})));
 }
 return <a href={href} aria-label={label} onClick={reveal}>{children}</a>;
}
