import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const base=process.env.INNER_COPY_BASE_URL||'http://127.0.0.1:3000';
const out='qa/inner-copy';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(base+'/sitemap',{waitUntil:'networkidle'});
const routes=await page.locator('main a[href^="/"]').evaluateAll(as=>[...new Set(as.map(a=>a.getAttribute('href'))) ]);
routes.push('/sitemap');
const results=[],links=new Set(),assets=new Set(),badAnchors=[];console.log('Auditing '+routes.length+' routes');
for(const route of routes){
 const response=await page.goto(base+route,{waitUntil:'networkidle'});
 await page.evaluate(async()=>{const imgs=[...document.querySelectorAll('main img')];imgs.forEach(i=>i.loading='eager');await Promise.all(imgs.map(i=>i.decode().catch(()=>{})));await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame)});
 const result=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]')?.content,h1:document.querySelectorAll('h1').length,robots:document.querySelector('meta[name="robots"]')?.content,lang:document.documentElement.lang,dir:document.documentElement.dir,mainText:document.querySelector('main')?.innerText.length,images:[...document.querySelectorAll('main img')].map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0,alt:i.getAttribute('alt')})),links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')),anchors:[...document.querySelectorAll('main a[href^="#"]')].map(a=>a.getAttribute('href')).filter(h=>!document.getElementById(h.slice(1)))}));
 result.links.filter(h=>h.startsWith('/')).forEach(h=>links.add(h));result.images.forEach(i=>assets.add(i.src));badAnchors.push(...result.anchors.map(h=>route+h));
 results.push({route,status:response.status(),...result,links:undefined,anchors:undefined});
}
const brokenLinks=[];for(const href of links){const r=await page.request.get(base+href);if(r.status()!==200)brokenLinks.push({href,status:r.status()});}
const brokenAssets=[];for(const src of assets){const r=await page.request.get(base+src);if(r.status()!==200)brokenAssets.push({src,status:r.status()});}
console.log('Routes and links complete');const responsive=[];for(const width of [360,390,768,1024,1440]){
 await page.setViewportSize({width,height:900});
 for(const route of ['/services','/skin','/hair','/rejuvenation','/advanced','/services/acne','/services/fillers','/journal','/journal/prp-vs-prf','/journal/questions-before-fillers','/contact','/sitemap']){
  await page.goto(base+route,{waitUntil:'networkidle'});
  responsive.push({route,...await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth}))});
 }
}
for(const [name,route,width] of [['desktop-service','/services/fillers',1440],['mobile-service','/services/fillers',390],['desktop-journal','/journal',1440],['mobile-journal','/journal',390],['desktop-article','/journal/prp-vs-prf',1440],['mobile-article','/journal/prp-vs-prf',390]]){await page.setViewportSize({width,height:1000});await page.goto(base+route,{waitUntil:'networkidle'});await page.evaluate(async()=>{const imgs=[...document.querySelectorAll('main img')];imgs.forEach(i=>i.loading='eager');await Promise.all(imgs.map(i=>i.decode().catch(()=>{})));await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame)});await page.screenshot({path:out+'/'+name+'.png',fullPage:true});}
await page.goto(base+'/services/hair-loss',{waitUntil:'networkidle'});await page.locator('.inner-cta a').click();const contextualCTA=new URL(page.url()).searchParams.get('care')==='hair'&&(await page.locator('h2').first().innerText()).includes('مو');
await page.goto(base+'/faq',{waitUntil:'networkidle'});await page.locator('summary').first().click();const faqOpen=await page.locator('details').first().getAttribute('open')!==null;
await page.getByRole('button',{name:'باز کردن فهرست صفحات'}).click();const menuOpen=await page.locator('dialog').evaluate(d=>d.open);await page.keyboard.press('Escape');const menuClosed=await page.locator('dialog').evaluate(d=>!d.open);
await page.goto(base+'/journal/prp-vs-prf',{waitUntil:'networkidle'});await page.locator('.article-toc a').nth(1).click();const tocWorks=new URL(page.url()).hash==='#section-2';
const noJS=await browser.newContext({javaScriptEnabled:false});const staticPage=await noJS.newPage();await staticPage.goto(base+'/journal/prp-vs-prf');const serverRendered=await staticPage.locator('h1').count()===1&&(await staticPage.locator('.article-prose').innerText()).length>700;await noJS.close();
await page.emulateMedia({reducedMotion:'no-preference'});const normalMotion=[];for(const width of [390,1440]){await page.setViewportSize({width,height:900});await page.goto(base+'/journal/prp-vs-prf',{waitUntil:'networkidle'});await page.locator('.related-reading').scrollIntoViewIfNeeded();normalMotion.push(await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})));}
const missing=await page.goto(base+'/journal/not-a-real-article',{waitUntil:'domcontentloaded'});const notFoundStatus=missing.status();
const baseline=JSON.parse(readFileSync(out+'/home-baseline.json','utf8').replace(/^\uFEFF/,''));const homePreservation=baseline.map(f=>({path:f.path,unchanged:createHash('sha256').update(readFileSync(f.path)).digest('hex').toUpperCase()===f.hash}));
const badRoutes=results.filter(r=>r.status!==200||r.h1!==1||!r.description||!r.robots.includes('noindex')||r.lang!=='fa'||r.dir!=='rtl');
const badImages=results.flatMap(r=>r.images.filter(i=>!i.loaded||i.alt===null).map(i=>({route:r.route,...i})));
const overflow=[...responsive,...normalMotion].filter(r=>r.scrollWidth>r.width);
const summary={routes:results.length,uniqueTitles:new Set(results.map(r=>r.title)).size,uniqueDescriptions:new Set(results.map(r=>r.description)).size,checkedLinks:links.size,checkedAssets:assets.size,badRoutes,brokenLinks,brokenAssets,badAnchors,badImages,overflow,contextualCTA,faqOpen,menuOpen,menuClosed,tocWorks,serverRendered,notFoundStatus,homePreservation,errors};
writeFileSync(out+'/results.json',JSON.stringify({summary,results,responsive,normalMotion},null,2));console.log(JSON.stringify(summary,null,2));await browser.close();
if(badRoutes.length||brokenLinks.length||brokenAssets.length||badAnchors.length||badImages.length||overflow.length||errors.length||!contextualCTA||!faqOpen||!menuOpen||!menuClosed||!tocWorks||!serverRendered||notFoundStatus!==404||homePreservation.some(f=>!f.unchanged))process.exitCode=1;
