import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';
const browser=await chromium.launch({channel:'msedge',headless:true});
const base=process.env.ELVITHA_BASE_URL||'http://127.0.0.1:3000';
const checks=[],errors=[];
mkdirSync('qa/elvitha',{recursive:true});
const check=(name,pass,detail)=>{checks.push({name,pass,detail});console.log((pass?'PASS ':'FAIL ')+name)};
const status=page=>page.evaluate(()=>({state:document.documentElement.dataset.elvithaIntro,pending:document.documentElement.classList.contains('elvitha-intro-pending'),visible:getComputedStyle(document.querySelector('.brand-intro')).visibility,opacity:getComputedStyle(document.querySelector('.brand-intro')).opacity,scrollLocked:document.body.style.overflow==='hidden'}));
const watch=(page,scenario)=>page.on('pageerror',e=>errors.push({scenario,message:e.message}));
async function settled(page){await page.waitForFunction(()=>!document.documentElement.classList.contains('elvitha-intro-pending'),{},{timeout:8000});await page.waitForFunction(()=>getComputedStyle(document.querySelector('.brand-intro')).visibility==='hidden',{},{timeout:2500});return status(page)}
try {
  for(const width of [1440,390]){
    const page=await browser.newPage({viewport:{width,height:900}});
    watch(page,'responsive-'+width);
    let release;const held=new Promise(resolve=>release=resolve);
    await page.route('**/brand-space*.webp',async route=>{await held;await route.continue().catch(()=>{})});
    await page.goto(base+'/about',{waitUntil:'domcontentloaded'});
    await page.waitForTimeout(500);
    const loading=await status(page);
    check('Intro holds for opening image at '+width,loading.pending&&loading.visible==='visible'&&!loading.scrollLocked,loading);
    // Loading screenshot is captured separately so it cannot extend the held request past the watchdog.
    release();
    const ready=await settled(page);
    check('Intro releases after opening image at '+width,ready.state==='ready'&&ready.visible==='hidden',ready);
    const layout=await page.evaluate(()=>{
      const logo=document.querySelector('.site-header .brand-logo').getBoundingClientRect();
      const actions=document.querySelector('.site-header .header-actions').getBoundingClientRect();
      return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,logo:{x:logo.x,right:logo.right,width:logo.width},actions:{x:actions.x,right:actions.right},overlap:Math.min(logo.right,actions.right)>Math.max(logo.x,actions.x)};
    });
    check('Header logo fits and does not overlap at '+width,layout.scrollWidth<=width+1&&!layout.overlap&&layout.logo.x>=0&&layout.logo.right<=width,layout);
    if(width===390)await page.screenshot({path:'qa/elvitha/intro-header-mobile.png'});
    await page.close();
  }

  const failed=await browser.newPage();watch(failed,'image-error');
  await failed.route('**/brand-space*.webp',route=>route.abort('failed'));
  await failed.goto(base+'/about',{waitUntil:'domcontentloaded'});
  const fail=await settled(failed);
  check('Image error releases intro with fallback',fail.state==='fallback'&&!fail.pending&&!fail.scrollLocked,fail);
  await failed.close();

  const reduced=await browser.newPage({reducedMotion:'reduce'});watch(reduced,'reduced-motion');
  let reducedRelease;const reducedHeld=new Promise(resolve=>reducedRelease=resolve);
  await reduced.route('**/brand-space*.webp',async route=>{await reducedHeld;await route.continue().catch(()=>{})});
  await reduced.goto(base+'/about',{waitUntil:'domcontentloaded'});
  const motion=await reduced.evaluate(()=>({animation:getComputedStyle(document.querySelector('.brand-intro .elvitha-emblem-e')).animationName,transition:getComputedStyle(document.querySelector('.brand-intro')).transitionDuration}));
  check('Reduced motion uses a static logo',motion.animation==='none'&&motion.transition==='0s',motion);
  reducedRelease();await settled(reduced);await reduced.close();

  const nojs=await browser.newPage({javaScriptEnabled:false});
  await nojs.goto(base+'/about',{waitUntil:'domcontentloaded'});
  const nojsState=await status(nojs);
  check('No JavaScript leaves content visible and intro hidden',!nojsState.pending&&nojsState.visible==='hidden'&&await nojs.locator('h1').isVisible(),nojsState);
  await nojs.close();

  const timeout=await browser.newPage();watch(timeout,'image-timeout');
  let timeoutRelease;const timeoutHeld=new Promise(resolve=>timeoutRelease=resolve);
  await timeout.route('**/brand-space*.webp',async route=>{await timeoutHeld;await route.abort().catch(()=>{})});
  const began=Date.now();await timeout.goto(base+'/about',{waitUntil:'domcontentloaded'});
  const timed=await settled(timeout);
  const elapsed=Date.now()-began;
  check('Never-ending image has a bounded fail-open',timed.state==='timeout'&&elapsed<7800&&!timed.scrollLocked,{...timed,elapsed});
  timeoutRelease();await timeout.close();

  const broken=await browser.newPage();
  await broken.route('**/*',route=>route.request().resourceType()==='script'?route.abort():route.continue());
  const brokenBegan=Date.now();await broken.goto(base+'/about',{waitUntil:'domcontentloaded'});
  const brokenState=await settled(broken);
  check('Independent head timeout survives missing client JavaScript',brokenState.state==='timeout'&&Date.now()-brokenBegan<8000&&await broken.locator('h1').isVisible(),{...brokenState,elapsed:Date.now()-brokenBegan});
  await broken.close();

  const keyboard=await browser.newPage();
  let keyRelease;const keyHeld=new Promise(resolve=>keyRelease=resolve);
  await keyboard.route('**/brand-space*.webp',async route=>{await keyHeld;await route.continue().catch(()=>{})});
  await keyboard.goto(base+'/about',{waitUntil:'domcontentloaded'});
  await keyboard.waitForTimeout(600);
  await keyboard.keyboard.press('Escape');
  const keyState=await settled(keyboard);
  check('Keyboard bypass releases a waiting intro',keyState.state==='skipped'&&!keyState.scrollLocked,keyState);
  keyRelease();await keyboard.close();

  check('No runtime errors in hydrated cases',errors.length===0,errors);
}finally{
  writeFileSync('qa/elvitha/intro-results.json',JSON.stringify({checks,errors},null,2));
  await browser.close();
}
if(checks.some(c=>!c.pass))process.exitCode=1;
