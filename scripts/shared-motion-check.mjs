import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';
const base=process.env.ELORA_BASE_URL||'http://127.0.0.1:3000';
const out='qa/shared-motion';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const checks=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
const check=(name,pass,detail)=>{checks.push({name,pass,detail});console.log((pass?'PASS ':'FAIL ')+name+(pass?'':' '+JSON.stringify(detail)))};
async function go(route){await page.goto(base+route,{waitUntil:'networkidle'});await page.evaluate(async()=>{await document.fonts.ready;const images=[...document.querySelectorAll('main img')];images.forEach(i=>i.loading='eager');await Promise.all(images.map(i=>i.decode().catch(()=>{})))});await page.waitForTimeout(300)}
async function scroll(y){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(200)}
await go('/sitemap');
const routes=await page.locator('.sitemap-grid a').evaluateAll(as=>[...new Set(as.map(a=>a.getAttribute('href')))]);
for(const route of [...new Set([...routes,'/sitemap'])]){
 const res=await page.request.get(base+route);const html=await res.text();
 check('SSR shared invitation '+route,res.status()===200&&(html.match(/id="invitation"/g)||[]).length===1);
}
for(const route of ['/about','/services','/services/hair-loss','/journal','/journal/prp-vs-prf','/care','/faq','/contact','/privacy','/sitemap']){
 await go(route);
 check('No overflow '+route,await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth));
 const layout=await page.locator('.site-invitation').evaluate(e=>({top:e.getBoundingClientRect().top+scrollY,height:e.offsetHeight}));
 await scroll(layout.top-500);
 const middle=await page.evaluate(()=>({bodyTop:document.querySelector('.inner-body').getBoundingClientRect().top,bodyBottom:document.querySelector('.inner-body').getBoundingClientRect().bottom,coverTop:document.querySelector('.site-invitation').getBoundingClientRect().top,over:document.elementFromPoint(innerWidth/2,innerHeight*.8)?.closest('.site-invitation')!==null,pinned:getComputedStyle(document.querySelector('.inner-body')).position}));
 check('Cover rises above held content '+route,middle.pinned==='fixed'&&Math.abs(middle.bodyBottom-1000)<4&&middle.over,middle);
 const state=()=>page.locator('#invitation-title .cover-title-line>span').first().evaluate(e=>({transform:getComputedStyle(e).transform,opacity:getComputedStyle(e).opacity}));
 const before=await state();await scroll(layout.top-80);const after=await state();await scroll(layout.top-500);const reverse=await state();
 check('Reversible CTA title '+route,JSON.stringify(before)===JSON.stringify(reverse)&&Number(after.opacity)>Number(before.opacity),{before,after,reverse});
 if(route==='/about'){await page.screenshot({path:out+'/desktop-cover.png'});await scroll(layout.top);await page.screenshot({path:out+'/desktop-invitation.png'});await scroll(0);await page.screenshot({path:out+'/desktop-title.png'});}
}
await go('/services/hair-loss');await page.locator('.site-invitation .button').click();check('Contextual CTA',new URL(page.url()).searchParams.get('care')==='hair');
await go('/contact');check('Contact CTA leads to preparation',await page.locator('.site-invitation .button').getAttribute('href')==='/care');
await go('/faq');await page.locator('summary').first().click();check('FAQ still opens',await page.locator('details').first().getAttribute('open')!==null);
for(const width of [360,390,768,1024]){
 await page.setViewportSize({width,height:900});
 for(const route of ['/about','/services','/journal/prp-vs-prf','/contact','/sitemap']){
  await go(route);await page.locator('.site-invitation').scrollIntoViewIfNeeded();
  check('Responsive '+width+' '+route,await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth));
  if(width===390&&route==='/about')await page.screenshot({path:out+'/mobile-invitation.png'});
 }
}
await page.setViewportSize({width:1440,height:1000});await go('/about');await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(400);
check('Live reduced-motion removes pin',await page.locator('.inner-body').evaluate(e=>getComputedStyle(e).position!=='fixed'&&!e.parentElement.classList.contains('pin-spacer')));
check('Reduced-motion clears title masks',await page.locator('[data-inner-title]').evaluate(e=>getComputedStyle(e).clipPath==='none'&&getComputedStyle(e).opacity==='1'));
await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForTimeout(400);check('Motion can resume',await page.locator('.pin-spacer').count()===1);
await go('/journal/prp-vs-prf');await page.locator('.article-toc a').nth(1).click();await page.waitForTimeout(700);check('Article anchor remains readable',await page.locator('#section-2').evaluate(e=>e.getBoundingClientRect().top>=90&&e.getBoundingClientRect().top<innerHeight*.45));
const staticContext=await browser.newContext({javaScriptEnabled:false});const staticPage=await staticContext.newPage();await staticPage.goto(base+'/about');check('No-JS content and CTA',await staticPage.locator('h1').isVisible()&&await staticPage.locator('.site-invitation .button').count()===1);await staticContext.close();
await page.setViewportSize({width:1440,height:700});await go('/about');await page.locator('.site-invitation .button').scrollIntoViewIfNeeded();check('Short viewport CTA reachable',await page.locator('.site-invitation .button').isVisible());
await page.setViewportSize({width:1440,height:1000});await go('/');await page.waitForTimeout(1300);check('Home retains 5 closing chapters',await page.locator('[data-cover-chapter]').count()===5);check('Home motion ready',await page.evaluate(()=>document.documentElement.classList.contains('motion-ready')));
check('No runtime errors',errors.length===0,errors);
writeFileSync(out+'/results.json',JSON.stringify({checks,errors},null,2));await browser.close();if(checks.some(c=>!c.pass))process.exitCode=1;
