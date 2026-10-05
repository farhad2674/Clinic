import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFileSync} from 'node:fs';

const base=process.env.ELORA_BASE_URL||'http://127.0.0.1:3003';
const browser=await chromium.launch({channel:'msedge',headless:true});
const checks=[],errors=[];
const check=(name,pass,detail)=>{checks.push({name,pass,detail});console.log((pass?'PASS ':'FAIL ')+name)};
let releasePortrait=()=>{};
try {
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  page.on('pageerror',error=>errors.push(error.message));
  let portraitRequests=0;
  const heldPortrait=new Promise(resolve=>{releasePortrait=resolve});
  await page.route('**/supplied-portrait.mp4',async route=>{
    portraitRequests++;
    await heldPortrait;
    await route.continue().catch(()=>{});
  });
  await page.goto(base,{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(1800);
  check('First screen is visible without waiting for films',
    await page.locator('h1').isVisible() && await page.locator('.preloader').count()===0 &&
    await page.locator('#main').evaluate(el=>!el.inert));
  check('Portrait film is deferred below the opening viewport',portraitRequests===0,portraitRequests);
  check('Hero image is prioritized on the homepage',
    await page.locator('link[rel=preload][href="/media/corridor.webp"]').count()>0);
  const paint=await page.evaluate(()=>({
    fcp:performance.getEntriesByName('first-contentful-paint')[0]?.startTime??null,
    corridor:document.querySelector('.corridor-intro')?.complete
  }));
  check('Hero still image loads',paint.corridor===true,paint);
  await page.evaluate(()=>document.getElementById('understanding').scrollIntoView({behavior:'instant'}));
  await page.waitForFunction(()=>document.querySelector('[data-scrub-video=portrait]')?.dataset.mediaState==='loading',{},{timeout:10000});
  check('Content remains usable while portrait download is held',
    await page.locator('#understanding h2').isVisible() && await page.locator('#main').evaluate(el=>!el.inert));
  releasePortrait();
  await page.waitForFunction(()=>document.querySelector('[data-scrub-video=portrait]')?.dataset.mediaState==='ready',{},{timeout:20000});
  check('Deferred portrait film becomes ready near its section',true);
  await page.close();

  const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  let reducedFilms=0;
  reduced.on('request',request=>{if(request.url().endsWith('.mp4'))reducedFilms++});
  await reduced.goto(base,{waitUntil:'domcontentloaded'});
  await reduced.waitForTimeout(1500);
  check('Reduced motion avoids film downloads',reducedFilms===0,reducedFilms);
  check('Mobile fits the viewport',await reduced.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await reduced.close();

  const inner=await browser.newPage();
  let corridorRequests=0;
  inner.on('request',request=>{if(request.url().endsWith('/media/corridor.webp'))corridorRequests++});
  await inner.goto(base+'/about',{waitUntil:'domcontentloaded'});
  await inner.waitForTimeout(500);
  check('Inner page avoids homepage image preload',corridorRequests===0,corridorRequests);
  await inner.close();

  const nojs=await browser.newPage({javaScriptEnabled:false});
  await nojs.goto(base,{waitUntil:'domcontentloaded'});
  check('No JavaScript still shows the hero',await nojs.locator('h1').isVisible());
  await nojs.close();
  check('No browser runtime errors',errors.length===0,errors);
} finally {
  releasePortrait();
  writeFileSync('qa/first-screen-results.json',JSON.stringify({checks,errors},null,2));
  await browser.close();
}
if(checks.some(check=>!check.pass))process.exitCode=1;
