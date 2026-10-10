import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {content} from '@/lib/site';
import {innerCategories,innerPages,pageDescriptions,serviceDetails} from '@/lib/editorial-content';
import {articles} from '@/lib/journal';
import {ServicesPage,ServicePage,CategoryPage,AboutPage,CarePage,JournalPage,FAQPage,ContactPage,PrivacyPage,ArticleLayout,SitemapPage} from '@/components/editorial';
type Props={params:Promise<{path:string[]}>;searchParams:Promise<Record<string,string|string[]|undefined>>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {path}=await params;const slug=path.join('/');
 const service=path[0]==='services'&&path.length===2&&content.services.some(s=>s.slug===path[1])?serviceDetails[path[1]]:undefined;
 const article=path[0]==='journal'&&path.length===2?articles.find(a=>a.slug===path[1]):undefined;
 const title=service?.title??article?.title??innerPages.find(p=>p.slug===slug)?.title??'صفحه پیدا نشد';
 const description=service?.description??article?.description??pageDescriptions[slug];
 return {title,description,openGraph:{title:title+' | الویتا',description,locale:'fa_IR',type:article?'article':'website',siteName:'الویتا'}};
}
export default async function Page({params,searchParams}:Props){const {path}=await params;const slug=path.join('/');
 if(path.length===2&&path[0]==='services'){if(!content.services.some(s=>s.slug===path[1]))notFound();return <ServicePage slug={path[1]}/>}
 if(path.length===2&&path[0]==='journal'){const article=articles.find(a=>a.slug===path[1]);if(!article)notFound();return <ArticleLayout article={article}/>}
 if(innerCategories.some(c=>c.slug===slug))return <CategoryPage slug={slug}/>;
 switch(slug){case 'services':return <ServicesPage/>;case 'about':return <AboutPage/>;case 'care':{const q=await searchParams;return <CarePage topic={typeof q.topic==='string'?q.topic:undefined} service={typeof q.service==='string'?q.service:undefined}/>};case 'journal':return <JournalPage/>;case 'faq':return <FAQPage/>;case 'contact':{const q=await searchParams;return <ContactPage care={typeof q.care==='string'?q.care:undefined}/>};case 'privacy':return <PrivacyPage/>;case 'sitemap':return <SitemapPage/>;default:notFound()}
}
