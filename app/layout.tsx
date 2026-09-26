import type {Metadata} from 'next';
import {Shell} from '@/components/shell';
import './globals.css';
import './motion-scenes.css';
export const metadata:Metadata={title:{default:'الورا | زیبایی مبتنی بر علم',template:'%s | الورا'},description:'ارزیابی تخصصی، مراقبت شخصی‌سازی‌شده و پیگیری نتیجه برای سلامت پوست و مو و زیبایی طبیعی در الورا.',robots:{index:false,follow:false},icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fa" dir="rtl" suppressHydrationWarning><head><link rel="preload" href="/fonts/vazirmatn.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><script dangerouslySetInnerHTML={{__html:"try{if(sessionStorage.getItem('elora-intro-seen')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro-seen')}catch(e){}"}}/></head><body><Shell>{children}</Shell></body></html>}
