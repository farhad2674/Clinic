import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {categories,content,pages} from '@/lib/site';
import {ServicesPage,ServicePage,CategoryPage,AboutPage,CarePage,JournalPage,FAQPage,ContactPage,PrivacyPage} from '@/components/editorial';
type Props={params:Promise<{path:string[]}>;searchParams:Promise<Record<string,string|string[]|undefined>>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {path}=await params;const slug=path.join('/');const title=path[0]==='services'&&path.length===2?content.services.find(s=>s.slug===path[1])?.title:pages.find(p=>p.slug===slug)?.title;return {title:title??'صفحه پیدا نشد',description:title?'آشنایی با '+title+' و رویکرد علمی و شخصی‌سازی‌شده الورا.':undefined}}
export default async function Page({params,searchParams}:Props){const {path}=await params;const slug=path.join('/');
if(path.length===2&&path[0]==='services'){if(!content.services.some(s=>s.slug===path[1]))notFound();return <ServicePage slug={path[1]}/>}
if(categories.some(c=>c.slug===slug))return <CategoryPage slug={slug}/>;
switch(slug){case 'services':return <ServicesPage/>;case 'about':return <AboutPage/>;case 'care':return <CarePage/>;case 'journal':return <JournalPage/>;case 'faq':return <FAQPage/>;case 'contact':{const q=await searchParams;return <ContactPage care={typeof q.care==='string'?q.care:undefined}/>};case 'privacy':return <PrivacyPage/>;default:notFound()}}
