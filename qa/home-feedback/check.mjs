import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFileSync} from 'node:fs';

const browser=await chromium.launch({channel:'msedge',headless:true});
const results=[];
for(const width of [1070,390]){
  const page=await browser.newPage({viewport:{width,height:width===1070?580:844},reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:3003/',{waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.querySelector('#main')?.dataset.openingState==='ready');
  const hiddenCaptions=await page.evaluate(()=>({philosophy:!!document.querySelector('.editorial-image figcaption'),film:!!document.querySelector('.portrait-film .film-caption')}));
  const images=[];
  for(const [name,selector,expected] of [
    ['skin','#care-skin img','/media/young-natural.webp'],
    ['journey','#journey-step-1 img','/media/journey-assessment-young.webp']
  ]){
    const image=page.locator(selector);
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(img=>img.decode());
    const state=await image.evaluate(img=>({src:new URL(img.src).pathname,complete:img.complete,width:img.naturalWidth,height:img.naturalHeight,alt:img.alt}));
    images.push({name,...state,pass:state.src===expected&&state.complete&&state.width>0&&state.height>0});
    await page.locator(name==='skin'?'#care-skin':'#journey-step-1').screenshot({path:`qa/home-feedback/${name}-${width}.png`});
  }
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  results.push({width,hiddenCaptions,images,overflow,errors,pass:!hiddenCaptions.philosophy&&!hiddenCaptions.film&&images.every(x=>x.pass)&&!overflow&&errors.length===0});
  await page.close();
}
writeFileSync('qa/home-feedback/results.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
await browser.close();
if(results.some(x=>!x.pass))process.exitCode=1;