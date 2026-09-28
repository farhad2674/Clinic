import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
const out='qa/journal-images';mkdirSync(out,{recursive:true});
const manifest=JSON.parse(readFileSync('docs/journal-image-prompts.json','utf8'));
const base=process.env.JOURNAL_BASE_URL||'http://127.0.0.1:3000';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const results=[];
for(const width of [1440,390]){
 await page.setViewportSize({width,height:1000});
 await page.goto(base+'/journal',{waitUntil:'networkidle'});
 await page.locator('.journal-card').last().scrollIntoViewIfNeeded();
 await page.evaluate(async()=>{await Promise.all([...document.querySelectorAll('.journal-card img')].map(i=>{i.loading='eager';return i.decode()}))});
 const cards=await page.locator('.journal-card img').evaluateAll(imgs=>imgs.map(i=>({src:i.getAttribute('src'),currentSrc:i.currentSrc,loaded:i.complete&&i.naturalWidth>0,alt:i.alt})));
 results.push({route:'/journal',width,cards,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)});
 await page.locator('#journal-skin').screenshot({path:out+'/listing-'+width+'.png'});
 for(const job of manifest.jobs){
   const r=await page.goto(base+'/journal/'+job.slug,{waitUntil:'networkidle'});
   const cover=page.locator('.journal-cover');
   await cover.scrollIntoViewIfNeeded();
   await cover.locator('img').evaluate(i=>i.decode());
   const data=await cover.evaluate(f=>{const i=f.querySelector('img');return{src:i.getAttribute('src'),currentSrc:i.currentSrc,alt:i.alt,caption:f.querySelector('figcaption').textContent,loaded:i.complete&&i.naturalWidth>0,overflow:document.documentElement.scrollWidth>innerWidth+1}});
   results.push({route:'/journal/'+job.slug,width,status:r.status(),...data,expected:job.src});
   await cover.screenshot({path:out+'/'+job.slug+'-'+width+'.png'});
 }
}
await page.emulateMedia({reducedMotion:'no-preference'});
await page.setViewportSize({width:1440,height:1000});
await page.goto(base+'/journal/prp-vs-prf',{waitUntil:'networkidle'});
await page.locator('.journal-cover').scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.locator('.journal-cover').screenshot({path:out+'/motion-article.png'});
results.push({route:'motion-article',loaded:await page.locator('.journal-cover img').evaluate(i=>i.complete&&i.naturalWidth>0)});
await page.goto(base+'/journal',{waitUntil:'networkidle'});
await page.locator('#journal-advanced').scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.locator('#journal-advanced').screenshot({path:out+'/motion-listing.png'});
const assets=[];for(const j of manifest.jobs){for(const src of [j.src,j.thumbnail]){const r=await page.request.get(base+src);assets.push({src,status:r.status()})}}
const passed=errors.length===0&&assets.every(a=>a.status===200)&&results.every(r=>!r.overflow&&(r.route==='/journal'?r.cards.length===10&&new Set(r.cards.map(i=>i.src)).size===10&&r.cards.every(i=>i.loaded&&i.alt===''):r.loaded&&(!r.expected||r.src===r.expected)&&(!r.status||r.status===200)));
writeFileSync(out+'/results.json',JSON.stringify({base,passed,errors,results,assets},null,2));
await browser.close();
console.log(JSON.stringify({passed,pageChecks:results.length,assetChecks:assets.length,errors},null,2));if(!passed)process.exitCode=1;

