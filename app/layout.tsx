import type {Metadata} from 'next';
import {Shell} from '@/components/shell';
import './globals.css';
import './motion-scenes.css';
import './copy-layout.css';
import './face-analysis.css';
import './home-discovery.css';
import './brand-intro.css';

// No JavaScript means no overlay. The independent timeout also releases the
// page if hydration fails or the client bundle cannot be downloaded.
const introBootstrap = "(function(){var r=document.documentElement;r.classList.add('elvitha-intro-pending');r.dataset.elvithaIntro='loading';var release=function(state){if(r.classList.contains('elvitha-intro-pending')){r.classList.remove('elvitha-intro-pending');r.dataset.elvithaIntro=state;window.dispatchEvent(new Event('elvitha-intro-finished'));}};var key=function(e){if(e.key==='Escape'||e.key==='Tab'){release('skipped');window.removeEventListener('keydown',key);}};window.addEventListener('keydown',key);window.setTimeout(function(){window.removeEventListener('keydown',key);release('timeout');},6000);})();";

export const metadata:Metadata={title:{default:'پزشکی بازساختی و سلول‌درمانی | الویتا',template:'%s | الویتا'},description:'پزشکی بازساختی و سلول‌درمانی را با الویتا بشناسید؛ راهنمای PRP، مزوژل و روش‌های نوین سلولی، همراه با مقالات علمی و منابع.',robots:{index:true,follow:true},icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fa" dir="rtl" suppressHydrationWarning><head><link rel="preload" href="/fonts/vazirmatn.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><script dangerouslySetInnerHTML={{__html:introBootstrap}}/></head><body><Shell>{children}</Shell></body></html>}
