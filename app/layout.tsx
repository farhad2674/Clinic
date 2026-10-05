import type {Metadata} from 'next';
import {Shell} from '@/components/shell';
import './globals.css';
import './motion-scenes.css';
import './copy-layout.css';
import './face-analysis.css';
export const metadata:Metadata={title:{default:'الورا | مرکز پوست، مو و جوان‌سازی در تهران',template:'%s | الورا'},description:'با رویکرد الورا در مراقبت از پوست، درمان آکنه و لک، بررسی ریزش مو و جوان‌سازی آشنا شوید؛ از جلسه ارزیابی تا انتخاب روش و پیگیری نتیجه.',robots:{index:false,follow:false},icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fa" dir="rtl" suppressHydrationWarning><head><link rel="preload" href="/fonts/vazirmatn.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body><Shell>{children}</Shell></body></html>}

