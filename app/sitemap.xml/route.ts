import {content,pages} from '@/lib/site';
import {articles} from '@/lib/journal';
const xml=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;');
export function GET(request:Request){
 const origin=new URL(request.url).origin;
 const paths=['/',...pages.map(p=>'/'+p.slug),'/sitemap',...content.services.map(s=>'/services/'+s.slug),...articles.map(a=>'/journal/'+a.slug)];
 const body='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+[...new Set(paths)].map(path=>'<url><loc>'+xml(origin+path)+'</loc></url>').join('')+'</urlset>';
 return new Response(body,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600'}});
}
