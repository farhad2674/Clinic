import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFileSync,mkdirSync,readFileSync} from 'node:fs';
mkdirSync('qa/copy-review',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
await page.screenshot({path:'qa/copy-review/desktop-hero.png'});
for(const id of ['philosophy','understanding','paths','life','perspective','journey','trust','journal','faq-preview','invitation']){
 await page.locator('#'+id).scrollIntoViewIfNeeded();
 await page.screenshot({path:'qa/copy-review/desktop-'+id+'.png'});
}
const checks=[];
for(const width of [360,390,768,1024,1440]){
 await page.setViewportSize({width,height:900});
 await page.evaluate(()=>scrollTo(0,0));
 checks.push(await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,numbers:document.querySelectorAll('.chapter-number').length,navText:document.querySelector('.chapter-nav').textContent,dots:document.querySelectorAll('.chapter-nav a').length})));
 if(width===390){await page.screenshot({path:'qa/copy-review/mobile-hero.png'});for(const id of ['philosophy','paths','life','perspective','journey','faq-preview']){await page.locator('#'+id).scrollIntoViewIfNeeded();await page.screenshot({path:'qa/copy-review/mobile-'+id+'.png'});}}
}
const c=JSON.parse(readFileSync('lib/content.json','utf8'));const routes=['/','/services','/skin','/hair','/rejuvenation','/advanced','/about','/care','/journal','/faq','/contact','/privacy',...c.services.map(s=>'/services/'+s.slug)];
const metadata=[];for(const route of routes){const r=await page.goto('http://127.0.0.1:3000'+route,{waitUntil:'domcontentloaded'});metadata.push({route,status:r.status(),title:await page.title(),description:await page.locator('meta[name=description]').getAttribute('content'),h1:await page.locator('h1').count()});}
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:3000/services/acne');await page.screenshot({path:'qa/copy-review/mobile-service.png',fullPage:true});
writeFileSync('qa/copy-review/results.json',JSON.stringify({checks,metadata,errors},null,2));console.log(JSON.stringify({checks,routes:metadata.length,errors,badRoutes:metadata.filter(m=>m.status!==200||m.h1!==1),uniqueDescriptions:new Set(metadata.map(m=>m.description)).size}));await browser.close();
