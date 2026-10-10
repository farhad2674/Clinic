'use client';
import {useEffect, useRef} from 'react';
import {portraitLandmarks} from '@/lib/portrait-landmarks';

/** Authored landmarks explain the assessment topics; they are not measured findings. */
export function FaceAnalysis(){
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const root=ref.current;
    const video=root?.parentElement?.querySelector('video');
    if(!root||!video)return;
    const markers=Array.from(root.querySelectorAll<SVGGElement>('[data-face-marker]'));
    const update=()=>{
      const moving=video.dataset.mediaState==='ready';
      const progress=moving&&video.duration>0?Math.min(1,video.currentTime/video.duration):0;
      const frame=moving?Math.min(portraitLandmarks.length-1,video.currentTime):0;
      const index=Math.min(portraitLandmarks.length-2,Math.floor(frame));
      const mix=frame-index;
      root.style.setProperty('--face-progress',String(progress));
      const turn=[0,12,26,34,26,12,0,0,0];
      const center=[50,51,54,55,54,52,50,50,50];
      root.style.setProperty('--face-yaw',String(turn[index]+(turn[index+1]-turn[index])*mix)+'deg');
      root.style.setProperty('--mesh-x',String(center[index]+(center[index+1]-center[index])*mix)+'%');
      root.style.setProperty('--mesh-clip',String(100-Math.min(1,progress/.58)*100)+'%');
      root.dataset.phase=String(Math.min(2,Math.floor(progress*3)));
      root.dataset.report=String(moving&&progress>=.78);
      markers.forEach((marker,i)=>{
        const from=portraitLandmarks[index][i],to=portraitLandmarks[index+1][i];
        const x=from[0]+(to[0]-from[0])*mix,y=from[1]+(to[1]-from[1])*mix;
        const ends=[[864,500],[212,852],[864,1000]][i];
        marker.querySelector('path')?.setAttribute('d',`M ${x} ${y} L ${ends[0]+(i===1?90:-70)} ${ends[1]} L ${ends[0]} ${ends[1]}`);
        marker.querySelectorAll('circle').forEach(circle=>{circle.setAttribute('cx',String(x));circle.setAttribute('cy',String(y))});
      });
    };
    video.addEventListener('timeupdate',update);
    video.addEventListener('seeked',update);
    window.addEventListener('elora-motion',update);
    const observer=new MutationObserver(update);
    observer.observe(video,{attributes:true,attributeFilter:['data-media-state']});
    update();
    return()=>{video.removeEventListener('timeupdate',update);video.removeEventListener('seeked',update);window.removeEventListener('elora-motion',update);observer.disconnect()};
  },[]);
  return <div ref={ref} className="face-analysis" data-phase="0" data-report="false" aria-hidden="true">
    <div className="face-analysis-heading"><span className="face-heading-icon"><i/><i/><i/><i/></span><div><span>نقشهٔ تناسب</span><small>جزئیات، در کنار هم</small></div><span className="analysis-light"/></div>
    <div className="face-mesh" aria-hidden="true">
      <svg viewBox="0 0 420 520" preserveAspectRatio="none" fill="none">
        <path className="mesh-outline" d="M210 32C125 32 76 115 68 230C60 355 118 457 210 489C302 457 360 355 352 230C344 115 295 32 210 32Z"/>
        <path d="M210 33C159 76 133 150 130 260C128 360 158 447 210 488M210 33C261 76 287 150 290 260C292 360 262 447 210 488M210 33C195 105 188 177 188 260C188 363 194 438 210 488M210 33C225 105 232 177 232 260C232 363 226 438 210 488"/>
        <path d="M84 174C157 203 263 203 336 174M70 243C151 274 269 274 350 243M76 313C156 342 264 342 344 313M99 386C163 406 257 406 321 386"/>
        <path className="mesh-axis" d="M210 50V472M83 260H337"/>
        <circle cx="210" cy="260" r="166" className="mesh-orbit"/>
      </svg>
    </div>
    <div className="face-scan"/><svg className="face-map" viewBox="0 0 1080 1440" preserveAspectRatio="xMidYMid meet" fill="none">
      {portraitLandmarks[0].map(([x,y],i)=><g key={i} data-face-marker={i} className="face-marker"><path d={`M ${x} ${y} L ${i===1?302:794} ${[500,852,1000][i]} L ${i===1?212:864} ${[500,852,1000][i]}`}/><circle cx={x} cy={y} r="5"/><circle className="marker-halo" cx={x} cy={y} r="15"/></g>)}
    </svg>
    <div className="face-focus-card">
      <div className="face-focus-kicker"><span>در کانون توجه</span><span className="face-focus-count" dir="ltr"><b data-status-phase="0">01</b><b data-status-phase="1">02</b><b data-status-phase="2">03</b><span> / 03</span></span></div>
      <div className="face-focus-topic" data-status-phase="0"><strong>گونه</strong><span>حجم و انحنای چهره</span></div>
      <div className="face-focus-topic" data-status-phase="1"><strong>لب</strong><span>فرم و تناسب</span></div>
      <div className="face-focus-topic" data-status-phase="2"><strong>خط فک</strong><span>پیوستگی نیمرخ</span></div>
      <div className="face-analysis-progress"><i/></div>
    </div>
    <div className="face-report" dir="rtl">
      <div className="face-report-heading"><span>محورهای بررسی چهره</span><span className="face-report-mark">۰۳</span></div>
      <dl className="face-report-grid">
        <div><dt>پوست</dt><dd>بافت، یکنواختی و خطوط</dd></div>
        <div><dt>فرم چهره</dt><dd>تناسب گونه، لب و خط فک</dd></div>
        <div><dt>قدم بعد</dt><dd>مرور سابقه و انتظار شما</dd></div>
      </dl>
    </div>
  </div>;
}


