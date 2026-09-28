import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFileSync} from 'node:fs';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));const checks=[];
for(const route of ['/journal','/journal/exosomes-evidence','/']){
 const response=await page.goto('http://127.0.0.1:3003'+route,{waitUntil:'networkidle'});
 const selector=route==='/'?'.journal-feature img':route==='/journal'?'.journal-card img':'.journal-cover img';
 const images=page.locator(selector);
 await images.first().scrollIntoViewIfNeeded();
 await images.evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode()})));
 checks.push({route,status:response.status(),images:await images.evaluateAll(imgs=>imgs.map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0})))});
 if(route==='/')await page.locator('.journal-feature').screenshot({path:'qa/journal-images/home-feature.png'});
}
const passed=!errors.length&&checks.every(c=>c.status===200&&c.images.length&&c.images.every(i=>i.loaded&&i.src.startsWith('/media/journal/')));
writeFileSync('qa/journal-images/production.json',JSON.stringify({passed,checks,errors},null,2));
await browser.close();console.log(JSON.stringify({passed,checks:checks.length,errors}));if(!passed)process.exitCode=1;

