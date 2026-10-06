import type {Metadata} from 'next';
import {Shell} from '@/components/shell';
import './globals.css';
import './motion-scenes.css';
import './copy-layout.css';
import './face-analysis.css';
export const metadata:Metadata={title:{default:'الورا | پزشکی بازساختی و سلول‌درمانی',template:'%s | الورا'},description:'پزشکی بازساختی و سلول‌درمانی را با الورا بشناسید؛ راهنمای PRP، مزوژل و روش‌های نوین سلولی، همراه با مقالات علمی و منابع.',robots:{index:false,follow:false},icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fa" dir="rtl" suppressHydrationWarning><head><link rel="preload" href="/fonts/vazirmatn.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body><Shell>{children}</Shell></body></html>}

