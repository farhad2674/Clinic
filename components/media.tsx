'use client';
import {useEffect,useRef} from 'react';
import {media} from '@/lib/site';
export function ScrubVideo({asset,className=''}:{asset:'entrance'|'portrait';className?:string}){
const ref=useRef<HTMLVideoElement>(null); const m=media[asset];
useEffect(()=>{const video=ref.current;if(!video)return;
const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){video.preload='auto';video.load();observer.disconnect()}},{rootMargin:'500px'});
observer.observe(video);return()=>observer.disconnect();
},[]);
return <div className={'video-wrap '+className} style={{backgroundImage:'url('+m.poster+')'}}><video ref={ref} data-scrub-video={asset} muted playsInline preload="none" poster={m.poster} aria-label={m.alt} onError={e=>{e.currentTarget.style.opacity='0'}}><source src={m.src} type="video/mp4"/></video></div>
}
