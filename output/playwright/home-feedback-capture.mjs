import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';
const out='output/playwright/home-feedback';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});await page.waitForFunction(()=>document.documentElement.classList.contains('motion-ready')&&!document.documentElement.classList.contains('elvitha-intro-pending'));
await page.evaluate(()=>document.fonts.ready);
await page.screenshot({path:out+'/hero-desktop.png'});
console.log('hero '+JSON.stringify(await page.locator('.hero-copy').evaluate(e=>({hero:e.getBoundingClientRect().toJSON(),context:e.querySelector('.hero-context').getBoundingClientRect().toJSON(),h1:e.querySelector('h1').getBoundingClientRect().toJSON()}))));
await page.locator('#life').scrollIntoViewIfNeeded();await page.waitForTimeout(400);await page.screenshot({path:out+'/methods-desktop.png'});
await page.locator('.portrait-film').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('[data-scrub-video=portrait]')?.dataset.mediaState==='ready',null,{timeout:25000});
async function seek(progress){await page.evaluate(p=>{const el=document.querySelector('#understanding');const top=el.getBoundingClientRect().top+scrollY;const start=innerWidth>=768?top:top-innerHeight*.65;const end=innerWidth>=768?top+el.offsetHeight-innerHeight:top+el.offsetHeight-innerHeight*.35;scrollTo({top:start+(end-start)*p,behavior:'instant'})},progress);await page.waitForTimeout(600)}
await seek(.35);await page.screenshot({path:out+'/portrait-desktop-active.png'});await seek(.9);await page.screenshot({path:out+'/portrait-desktop-report.png'});
for(const [width,height] of [[591,580],[390,844],[360,800]]){
 await page.setViewportSize({width,height});await page.waitForTimeout(450);
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(400);await page.screenshot({path:out+'/hero-'+width+'.png'});
 await page.locator('#life').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY,behavior:'instant'}));await page.waitForTimeout(400);await page.screenshot({path:out+'/methods-'+width+'.png'});
 await seek(.9);await page.locator('.portrait-film').screenshot({path:out+'/portrait-'+width+'.png'});
 console.log('mobile '+width+' '+JSON.stringify(await page.locator('.face-report').evaluate(e=>({text:e.textContent,card:e.getBoundingClientRect().toJSON(),frame:e.closest('.portrait-film').getBoundingClientRect().toJSON(),fontsize:getComputedStyle(e.querySelector('dd')).fontSize,overflow:document.documentElement.scrollWidth-innerWidth}))));
}
console.log(JSON.stringify({errors}));await browser.close();
