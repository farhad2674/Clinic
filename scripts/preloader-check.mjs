import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFileSync} from 'node:fs';
const browser=await chromium.launch({channel:'msedge',headless:true});
const checks=[],errors=[];
const base=process.env.PRELOADER_BASE_URL||'http://127.0.0.1:3000';
function check(name,pass,detail){checks.push({name,pass,detail});console.log((pass?'PASS ':'FAIL ')+name);}
async function page(options={}){
  const p=await browser.newPage({viewport:{width:1440,height:900},...options});
  p.on('pageerror',e=>errors.push(e.message));
  return p;
}
async function revealed(p){await p.waitForFunction(()=>document.querySelector('#main')?.dataset.openingState==='ready'&&!document.querySelector('.preloader'),{},{timeout:40000});}
async function state(p){return p.evaluate(()=>({
  ready:document.querySelector('#main')?.dataset.openingState,
  locked:document.body.style.overflow==='hidden'&&document.querySelector('#main').inert,
  motion:document.documentElement.classList.contains('motion-ready'),
  videos:[...document.querySelectorAll('video')].map(v=>({state:v.dataset.mediaState,src:v.currentSrc,ready:v.readyState,time:v.currentTime,duration:v.duration})),
  images:[...document.querySelectorAll('[data-opening] img')].map(i=>({loaded:i.complete&&i.naturalWidth>0,visible:getComputedStyle(i).visibility}))
}));}
try{
  const p=await page();
  let release;const held=new Promise(r=>{release=r});
  await p.route('**/portrait.mp4',async route=>{await held;await route.continue()});
  await p.goto(base,{waitUntil:'domcontentloaded'});
  await p.waitForFunction(()=>document.querySelector('video')?.dataset.mediaState);
  await p.waitForTimeout(4200);
  const waiting=await state(p);
  check('Loader stays locked beyond old timeout while second-section film is pending',await p.locator('.preloader').isVisible()&&waiting.locked&&!waiting.motion,waiting);
  await p.screenshot({path:'qa/preloader-waiting.png'});
  release();await revealed(p);
  const ready=await state(p);
  check('Both full films are local and decoded before reveal',ready.videos.every(v=>v.state==='ready'&&v.src.startsWith('blob:')&&v.ready>=2),ready.videos);
  check('Opening images and fonts are ready and content unlocks',ready.images.every(i=>i.loaded)&&!ready.locked&&await p.evaluate(()=>document.fonts.status==='loaded'),ready);
  const sizes=await p.evaluate(async()=>Promise.all([...document.querySelectorAll('video')].map(async v=>(await (await fetch(v.currentSrc)).blob()).size)));
  check('Film blobs contain complete files',sizes[0]===2932156&&sizes[1]===2451536,sizes);
  await p.waitForTimeout(1500);
  check('Hero entrance plays after reveal',await p.locator('.hero-copy h1 > span').first().evaluate(el=>Number(getComputedStyle(el).opacity)>.99));
  async function seek(id,progress){await p.evaluate(({id,progress})=>{const el=document.getElementById(id);scrollTo({top:el.offsetTop+(el.offsetHeight-innerHeight)*progress,behavior:'instant'})},{id,progress});await p.waitForTimeout(450);}
  await seek('understanding',.8);const forward=(await state(p)).videos[1].time;
  await seek('understanding',.2);const backward=(await state(p)).videos[1].time;
  check('Portrait scrubs forward and backward without network buffering',forward>5&&backward<3,{forward,backward});
  await seek('journey',.8);const before=await p.evaluate(()=>scrollY);
  await p.reload({waitUntil:'domcontentloaded'});await revealed(p);
  const after=await p.evaluate(()=>scrollY);
  check('Reload preserves saved scroll after readiness and layout setup',Math.abs(before-after)<5,{before,after});
  await p.close();

  const returning=await page();let releaseImage;const imageHeld=new Promise(r=>{releaseImage=r});
  await returning.addInitScript(()=>sessionStorage.setItem('elora-intro-seen','1'));
  await returning.route('**/brand-space.webp',async route=>{await imageHeld;await route.continue()});
  await returning.goto(base,{waitUntil:'domcontentloaded'});
  await returning.waitForTimeout(4200);
  check('Returning visitor still waits for the philosophy image',await returning.locator('.preloader').isVisible()&&(await state(returning)).locked);
  releaseImage();await revealed(returning);await returning.close();

  const failed=await page();
  await failed.route('**/*.mp4',route=>route.abort());
  await failed.goto(base,{waitUntil:'domcontentloaded'});await revealed(failed);
  check('Failed videos reveal poster fallbacks without active scrubbing',(await state(failed)).videos.every(v=>v.state==='fallback'&&!v.src));
  await failed.close();

  const slow=await page();let releaseSlow;const slowHeld=new Promise(r=>{releaseSlow=r});
  await slow.route('**/portrait.mp4',async route=>{await slowHeld;await route.abort().catch(()=>{})});
  await slow.goto(base,{waitUntil:'domcontentloaded'});await revealed(slow);
  check('Stalled video switches to a poster after the 25-second deadline',(await state(slow)).videos[1].state==='fallback');
  releaseSlow();await slow.close();

  const reduced=await page({viewport:{width:390,height:844},reducedMotion:'reduce'});let filmRequests=0;
  reduced.on('request',r=>{if(r.url().endsWith('.mp4'))filmRequests++});
  await reduced.goto(base,{waitUntil:'domcontentloaded'});await revealed(reduced);
  check('Reduced motion loads stills without downloading films',filmRequests===0&&(await state(reduced)).videos.every(v=>v.state==='static'));
  check('Mobile reduced-motion layout has no horizontal overflow',await reduced.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await reduced.close();

  const mobile=await page({viewport:{width:390,height:844}});
  await mobile.goto(base,{waitUntil:'domcontentloaded'});await revealed(mobile);
  const mobileState=await state(mobile);const mobileWidth=await mobile.evaluate(()=>({content:document.documentElement.scrollWidth,viewport:innerWidth}));
  check('Mobile motion loads both films and fits viewport',mobileState.videos.every(v=>v.state==='ready')&&mobileWidth.content<=mobileWidth.viewport+1,{mobileState,mobileWidth});
  await mobile.screenshot({path:'qa/preloader-mobile-ready.png'});await mobile.close();

  const fontPage=await page();let releaseFont;const fontHeld=new Promise(r=>{releaseFont=r});
  await fontPage.route('**/estedad.ttf',async route=>{await fontHeld;await route.continue()});
  await fontPage.goto(base,{waitUntil:'domcontentloaded'});await fontPage.waitForTimeout(4200);
  check('Loader also waits for the heading font',await fontPage.locator('.preloader').isVisible()&&(await state(fontPage)).locked);
  releaseFont();await revealed(fontPage);await fontPage.close();

  const saving=await page();let savedFilms=0;
  await saving.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true},configurable:true}));
  saving.on('request',r=>{if(r.url().endsWith('.mp4'))savedFilms++});
  await saving.goto(base,{waitUntil:'domcontentloaded'});await revealed(saving);
  check('Data saver uses prepared posters without film downloads',savedFilms===0&&(await state(saving)).videos.every(v=>v.state==='static'));
  await saving.close();

  const nojs=await page({javaScriptEnabled:false});
  await nojs.goto(base);
  check('No-JavaScript content is accessible without loader overlay',!await nojs.locator('.preloader').isVisible()&&await nojs.locator('h1').isVisible());
  await nojs.close();

  const inner=await page();let innerFilms=0;inner.on('request',r=>{if(r.url().endsWith('.mp4'))innerFilms++});
  await inner.goto(base+'/about',{waitUntil:'networkidle'});
  check('Inner pages do not wait for unrelated homepage media',await inner.locator('.preloader').count()===0&&innerFilms===0);
  await inner.close();
  check('No browser runtime errors',errors.length===0,errors);
}finally{
  writeFileSync('qa/preloader-results.json',JSON.stringify({checks,errors},null,2));
  await browser.close();
}
if(checks.some(c=>!c.pass))process.exitCode=1;
