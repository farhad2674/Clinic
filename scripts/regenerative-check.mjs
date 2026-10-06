import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
const require=createRequire(import.meta.url);
const {chromium}=process.env.PLAYWRIGHT_MODULE?await import(process.env.PLAYWRIGHT_MODULE):require('playwright');
const base=process.env.ELORA_QA_URL||'http://127.0.0.1:3000';
const output=new URL('../qa/regenerative/',import.meta.url);
await fs.mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||undefined,args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
const page=await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(base+'/sitemap',{waitUntil:'networkidle'});
const routes=await page.locator('a[href^="/"]').evaluateAll(links=>[...new Set(links.map(a=>a.getAttribute('href').split(/[?#]/)[0]))].sort());
const results=[];
for(const route of routes){
 const response=await context.request.get(base+route);const html=await response.text();
 const result=await page.evaluate(({html,route})=>{
  const d=new DOMParser().parseFromString(html,'text/html');
  const ids=new Set([...d.querySelectorAll('[id]')].map(e=>e.id));
  return {route,title:d.title,description:d.querySelector('meta[name="description"]')?.content,h1:d.querySelectorAll('h1').length,lang:d.documentElement.lang,dir:d.documentElement.dir,brokenAnchors:[...d.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href')).filter(h=>h.length>1&&!ids.has(decodeURIComponent(h.slice(1)))),links:[...d.querySelectorAll('a[href^="/"]')].map(a=>a.getAttribute('href').split(/[?#]/)[0]),sources:d.querySelectorAll('.source-list li').length,referenceLinks:d.querySelectorAll('.section-citations a').length};
 },{html,route});results.push({...result,status:response.status()});
}
const brokenRoutes=[...new Set(results.flatMap(r=>r.links))].filter(r=>!routes.includes(r));
for(const route of brokenRoutes){const r=await context.request.get(base+route);if(r.status()===200)routes.push(route)}
const missing=await context.request.get(base+'/journal/definitely-missing-article');
const viewports=[];
for(const width of [360,768,1440]){
 await page.setViewportSize({width,height:900});
 for(const route of ['/','/services','/services/prp','/services/mesogel','/services/cell-based','/services/regenerative','/journal','/journal/exosomes-vs-stem-cells','/journal/vitiligo-cell-therapy','/journal/autoimmunity-after-covid']){
  await page.goto(base+route,{waitUntil:'networkidle'});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  viewports.push({width,route,overflow});
  if(route==='/'&&width!==768)await page.screenshot({path:new URL('home-'+width+'.png',output).pathname});
  if(route==='/services/mesogel'&&width===360)await page.screenshot({path:new URL('mesogel-mobile.png',output).pathname});
  if(route==='/journal/exosomes-vs-stem-cells'&&width!==768){await page.locator('.source-list').scrollIntoViewIfNeeded();await page.locator('.source-list').screenshot({path:new URL('references-'+width+'.png',output).pathname});}
 }
}
await page.setViewportSize({width:390,height:844});await page.goto(base+'/',{waitUntil:'networkidle'});
await page.getByRole('button',{name:'باز کردن فهرست صفحات'}).click();const menuOpened=await page.locator('dialog').evaluate(d=>d.open);await page.getByRole('button',{name:'بستن ×'}).click();
await page.locator('#faq-preview summary').first().click();const faqOpened=await page.locator('#faq-preview details').first().getAttribute('open')!==null;
const motion=[];
await page.emulateMedia({reducedMotion:'no-preference'});
for(const width of [390,1024,1440]){
 await page.setViewportSize({width,height:width===1024?740:900});await page.goto(base+'/',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>document.documentElement.classList.contains('motion-ready'));
 const headings=[];
 for(const id of ['entry','paths','trust','journal']){
  await page.locator('#'+id).scrollIntoViewIfNeeded();await page.waitForTimeout(250);
  headings.push(await page.locator('#'+id).evaluate(el=>({id:el.id,overflow:document.documentElement.scrollWidth>innerWidth+1,text:el.querySelector('h1,h2')?.textContent})));
 }
 motion.push({width,headings});
}
const failures=results.filter(r=>r.status!==200||r.h1!==1||!r.description||r.lang!=='fa'||r.dir!=='rtl'||r.brokenAnchors.length);
const duplicateTitles=results.filter((r,i)=>results.some((s,j)=>i!==j&&s.title===r.title)).map(r=>r.route);
const duplicateDescriptions=results.filter((r,i)=>results.some((s,j)=>i!==j&&s.description===r.description)).map(r=>r.route);
const brokenInternal=[...new Set(results.flatMap(r=>r.links))].filter(r=>!routes.includes(r));
const report={routes:results.length,results,viewports,motion,errors,failures,duplicateTitles,duplicateDescriptions,brokenInternal,notFoundStatus:missing.status(),menuOpened,faqOpened};
await fs.writeFile(new URL('results.json',output),JSON.stringify(report,null,2));
await browser.close();
console.log(JSON.stringify({routes:results.length,failures,duplicateTitles,duplicateDescriptions,brokenInternal,overflows:viewports.filter(v=>v.overflow),motionOverflows:motion.flatMap(m=>m.headings.filter(h=>h.overflow)),errors,notFoundStatus:missing.status(),menuOpened,faqOpened}));
if(failures.length||duplicateTitles.length||duplicateDescriptions.length||brokenInternal.length||viewports.some(v=>v.overflow)||errors.length||missing.status()!==404||!menuOpened||!faqOpened)process.exitCode=1;
