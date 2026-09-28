'use client';
import {media} from '@/lib/site';
export function ScrubVideo({asset,className=''}:{asset:'entrance'|'portrait';className?:string}){
const m=media[asset];
return <div className={'video-wrap '+className} style={{backgroundImage:'url('+m.poster+')'}}><video data-scrub-video={asset} data-src={m.src} muted playsInline preload="none" poster={m.poster} aria-label={m.alt} onError={e=>{e.currentTarget.dataset.mediaState='fallback'}}/></div>
}
