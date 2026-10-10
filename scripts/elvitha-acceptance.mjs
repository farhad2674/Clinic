import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';
const base=process.env.ELVITHA_BASE_URL||'http://127.0.0.1:3000';
const out='qa/elvitha';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const checks=[],errors=[];const check=(name,pass,details)=>{checks.push({name,pass,details});console.log((pass?'PASS ':'FAIL ')+name+(pass?'':' '+JSON.stringify(details)))};
const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',e=>errors.push(e.message));
const settle=async p=>{await p.waitForFunction(()=>!document.documentElement.classList.contains('elvitha-intro-pending'),null,{timeout:9000});await p.waitForTimeout(450)};
async function go(route,p=page){await p.goto(base+route,{waitUntil:'networkidle'});await settle(p)}
try{
 await go('/sitemap');
 const routes=await page.locator('.sitemap-grid a').evaluateAll(as=>[...new Set(['/',...as.map(a=>a.getAttribute('href')),'/sitemap'])]);
 const summaries=[];const assets=new Set();
 for(const route of routes){const r=await page.request.get(base+route);const html=await r.text();const robots=html.match(/<meta name="robots" content="([^"]+)"/i)?.[1];const title=html.match(/<title>(.*?)<\/title>/)?.[1];const h1=(html.match(/<h1[\s>]/g)||[]).length;
 const pass=r.status()===200&&h1===1&&robots?.includes('index')&&!robots.includes('noindex')&&title?.includes('الویتا')&&!/الورا|ELORA|در انتظار بازبینی پزشکی|بازبینی پزشکی: انجام نشده/.test(html);
 summaries.push({route,status:r.status(),h1,robots,title,pass});for(const m of html.matchAll(/(?:src|poster)="(\/media\/[^"?]+)"/g))assets.add(m[1]);}
 check('All '+routes.length+' pages: 200, one H1, ELVITHA metadata, index/follow, no old brand or review badges',summaries.every(s=>s.pass),summaries.filter(s=>!s.pass));
 check('Unique page titles',new Set(summaries.map(s=>s.title)).size===summaries.length);
 const missing=[];for(const src of assets){const r=await page.request.get(base+src);if(r.status()!==200)missing.push({src,status:r.status()})}
 check('All '+assets.size+' referenced images/posters resolve',!missing.length,missing);
 const robot=await page.request.get(base+'/robots.txt');check('robots.txt permits crawling',robot.status()===200&&(await robot.text()).includes('Allow: /'));
 const sitemap=await page.request.get(base+'/sitemap.xml');const xml=await sitemap.text();check('XML sitemap includes every valid route',sitemap.status()===200&&routes.every(route=>xml.includes('<loc>'+base+route+'</loc>')),{status:sitemap.status()});
 const bad=await page.request.get(base+'/journal/not-a-real-article');check('Missing article stays a 404',bad.status()===404);
 await go('/journal');const covers=await page.locator('.journal-card img').evaluateAll(imgs=>imgs.map(i=>i.getAttribute('src')));
 check('23 articles have 23 distinct new covers',covers.length===23&&new Set(covers).size===23&&covers.every(s=>s.includes('/journal-elvitha/')),covers);
 for(const width of [1440,390,360]){await page.setViewportSize({width,height:900});for(const route of ['/','/journal','/journal/regenerative-medicine','/journal/elvitha-natural-beauty','/services','/about','/care']){await go(route);const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);check('No overflow '+width+' '+route,overflow<=1,overflow);if((width===1440||width===390)&&['/','/journal','/journal/elvitha-natural-beauty'].includes(route))await page.screenshot({path:out+'/'+width+'-'+(route==='/'?'home':route.split('/').at(-1))+'.png'});}}
 await page.setViewportSize({width:1440,height:1000});await go('/journal/regenerative-medicine');
 check('References compact by default',await page.locator('.source-list').evaluate(e=>!e.open&&e.offsetHeight<100));
 await page.locator('.section-citations a').first().click();await page.waitForTimeout(1600);
 check('Citation scroll reaches the source',await page.evaluate(()=>{const top=document.querySelector(location.hash)?.getBoundingClientRect().top;return top>=0&&top<innerHeight}));
 check('Citation fragment reveals collapsed reference',await page.locator('.source-list').evaluate(e=>e.open));
 await page.locator('.source-list>summary').click();check('Reference box can close',await page.locator('.source-list').evaluate(e=>!e.open));
 await go('/');await page.waitForFunction(()=>document.documentElement.classList.contains('motion-ready'));
 const seek=async p=>{await page.evaluate(p=>{const e=document.querySelector('#understanding');scrollTo({top:e.offsetTop+(e.offsetHeight-innerHeight)*p,behavior:'instant'})},p);await page.waitForTimeout(1000);return page.locator('[data-scrub-video=portrait]').evaluate(v=>v.currentTime)};
 await page.locator('.portrait-film').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('[data-scrub-video=portrait]').dataset.mediaState==='ready',null,{timeout:25000});
 const forward=await seek(.83),reverse=await seek(.2);await page.waitForTimeout(1000);const idle=await page.locator('[data-scrub-video=portrait]').evaluate(v=>v.currentTime);
 check('Portrait still scrubs forward/back and stays paused',forward>reverse+2&&Math.abs(idle-reverse)<.03,{forward,reverse,idle});
 const delayed=await browser.newPage({viewport:{width:1200,height:900}});await delayed.route('**/media/brand-space-elvitha.webp',async route=>{await new Promise(r=>setTimeout(r,2000));await route.continue()});await delayed.goto(base+'/',{waitUntil:'domcontentloaded'});check('Logo intro visible while opening imagery loads',await delayed.locator('.brand-intro').isVisible());await settle(delayed);check('Intro releases after opening images decode',await delayed.evaluate(()=>['ready','fallback'].includes(document.documentElement.dataset.elvithaIntro)&&[...document.querySelectorAll('#entry img,#philosophy img')].every(i=>i.complete&&i.naturalWidth>0)));await delayed.close();
 const failed=await browser.newPage();await failed.route('**/media/brand-space-elvitha.webp',route=>route.abort());await go('/',failed);check('Failed opening asset cannot trap visitor',await failed.evaluate(()=>!document.documentElement.classList.contains('elvitha-intro-pending')&&document.body.style.overflow!=='hidden'));await failed.close();
 const reduced=await browser.newPage({reducedMotion:'reduce',viewport:{width:390,height:850}});await go('/',reduced);check('Reduced motion preserves readable static page',await reduced.locator('h1').isVisible()&&await reduced.evaluate(()=>!document.documentElement.classList.contains('motion-ready')||document.documentElement.classList.contains('reduced-motion')));await reduced.close();
 const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(base+'/journal/regenerative-medicine');check('No JavaScript: article visible, logo overlay hidden',await nojs.locator('h1').isVisible()&&!await nojs.locator('.brand-intro').isVisible());await nojs.locator('.source-list>summary').click();check('No JavaScript: references expand',await nojs.locator('.source-list').evaluate(e=>e.open));await nojs.close();
 check('No browser runtime errors',errors.length===0,errors);writeFileSync(out+'/routes.json',JSON.stringify(summaries,null,2));
}catch(e){check('Acceptance execution',false,String(e))}finally{writeFileSync(out+'/acceptance.json',JSON.stringify({base,checks,errors},null,2));await browser.close()}
if(checks.some(c=>!c.pass))process.exitCode=1;
