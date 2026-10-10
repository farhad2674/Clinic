import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';
const base=process.env.ELVITHA_BASE_URL||'http://127.0.0.1:3000';
const out='output/playwright/closing-chapters';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const checks=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
const check=(name,pass,detail)=>{checks.push({name,pass,detail});console.log((pass?'PASS ':'FAIL ')+name+(pass?'':' '+JSON.stringify(detail)))};
const ids=['care-pause','trust','journal','faq-preview','invitation'];
async function go(p=page){await p.goto(base,{waitUntil:'networkidle'});await p.waitForFunction(()=>!document.documentElement.classList.contains('elvitha-intro-pending'));await p.evaluate(()=>document.fonts.ready);}
async function at(y){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(220)}
async function top(id){return page.locator('#'+id).evaluate(e=>e.getBoundingClientRect().top+scrollY)}
try{
 await go();await page.waitForFunction(()=>document.documentElement.classList.contains('motion-ready'));
 check('Five original closing chapters in order',JSON.stringify(await page.locator('[data-cover-chapter]').evaluateAll(es=>es.map(e=>e.id)))===JSON.stringify(ids));
 check('Current ELVITHA imagery retained',await page.locator('#invitation img').getAttribute('src')==='/media/lounge-elvitha.webp'&&(await page.locator('#journal img').first().getAttribute('src')).includes('journal-elvitha'));
 check('Current branding and one H1',await page.locator('h1').count()===1&&!/ELORA|الورا/.test(await page.locator('[data-cover-chapter]').allTextContents().then(s=>s.join(' '))));
 check('Journey completes before restored chapters',await page.evaluate(()=>{const journey=document.querySelector('#journey'),pause=document.querySelector('#care-pause');return pause.getBoundingClientRect().top>=journey.getBoundingClientRect().bottom-1}));
 for(const [width,height] of [[1440,900],[1280,720],[1024,650]]){
  await page.setViewportSize({width,height});await page.waitForTimeout(450);
  for(let i=1;i<ids.length;i++){
   const y=await top(ids[i]);await at(y-height*.5);
   const state=await page.evaluate(previous=>{const stage=document.querySelector('#'+previous+' .cover-stage');return {top:document.elementFromPoint(innerWidth/2,innerHeight*.1)?.closest('[data-cover-chapter]')?.id,bottom:document.elementFromPoint(innerWidth/2,innerHeight*.85)?.closest('[data-cover-chapter]')?.id,stageTop:stage.getBoundingClientRect().top,expectedTop:Math.min(0,innerHeight-stage.offsetHeight)}},ids[i-1]);
   check('Held chapter + rising cover '+width+' '+ids[i],state.top===ids[i-1]&&state.bottom===ids[i]&&Math.abs(state.stageTop-state.expectedTop)<2,state);
   if(width===1440&&i===1)await page.screenshot({path:out+'/desktop-overlap.png'});
   await at(y);await at(y-height*.5);
   const reverse=await page.locator('#'+ids[i-1]+' .cover-stage').evaluate(e=>e.getBoundingClientRect().top);
   check('Reverse scroll restores cover '+width+' '+ids[i],Math.abs(reverse-state.stageTop)<2,{reverse,before:state.stageTop});
  }
  check('No desktop overflow '+width,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  // Expanded answers must fit and scroll before the following section covers them.
  await at(await top('faq-preview'));await page.locator('#faq-preview details').evaluateAll(es=>es.forEach(e=>e.open=true));await page.waitForTimeout(400);
  const stage=await page.locator('#faq-preview .cover-stage').evaluate(e=>({height:e.offsetHeight,measured:parseFloat(e.parentElement.style.getPropertyValue('--cover-stage-height'))}));
  check('Expanded FAQ stage measured '+width,Math.abs(stage.height-stage.measured)<2,stage);
  await at((await top('invitation'))-height);
  const faqBottom=await page.locator('#faq-preview details').last().evaluate(e=>e.getBoundingClientRect().bottom);
  check('All expanded answers reachable '+width,faqBottom>0&&faqBottom<height,{faqBottom,height});
  await page.locator('#faq-preview details').evaluateAll(es=>es.forEach(e=>e.open=false));await page.waitForTimeout(250);
 }
 await page.setViewportSize({width:1440,height:900});await page.waitForTimeout(450);
 const journalTop=await top('journal');await at(journalTop-450);
 const titleState=()=>page.locator('#journal .cover-title-line>span').first().evaluate(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform}));
 const before=await titleState();await at(journalTop);const after=await titleState();await at(journalTop-450);const reverse=await titleState();await page.waitForTimeout(500);const idle=await titleState();
 check('Title scrubs both directions and freezes when idle',JSON.stringify(before)===JSON.stringify(reverse)&&JSON.stringify(reverse)===JSON.stringify(idle)&&Number(after.opacity)>Number(before.opacity),{before,after,reverse,idle});
 for(const id of ['care-pause','trust']){await at(await top(id));await page.screenshot({path:out+'/desktop-'+id+'.png'});}
 for(const [width,height] of [[768,900],[390,844],[360,800]]){
  await page.setViewportSize({width,height});await page.waitForTimeout(450);
  for(const id of ids){await at(await top(id));check('Readable flow '+width+' '+id,await page.locator('#'+id+' .cover-stage').evaluate(e=>getComputedStyle(e).position!=='sticky'));check('No overflow '+width+' '+id,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));check('Title visible '+width+' '+id,await page.locator('#'+id+' .cover-title-line>span').evaluateAll(es=>es.every(e=>Number(getComputedStyle(e).opacity)>.95&&(getComputedStyle(e).transform==='none'||new DOMMatrix(getComputedStyle(e).transform).isIdentity))));}
  if(width===390){for(const id of ['care-pause','trust']){await at(await top(id));await page.screenshot({path:out+'/mobile-'+id+'.png'});}}
 }
 await page.setViewportSize({width:1024,height:650});await page.waitForTimeout(450);
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(450);
 check('Reduced motion removes holding and height measurements',await page.locator('[data-cover-chapter]').evaluateAll(es=>es.every(e=>!e.style.getPropertyValue('--cover-stage-height')&&getComputedStyle(e.querySelector('.cover-stage')).position!=='sticky')));
 check('Reduced motion keeps all titles visible',await page.locator('[data-cover-title] .cover-title-line>span').evaluateAll(es=>es.every(e=>getComputedStyle(e).opacity==='1')));
 await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForTimeout(450);
 check('Motion resumes cleanly',await page.locator('#trust .cover-stage').evaluate(e=>getComputedStyle(e).position==='sticky'&&e.parentElement.style.getPropertyValue('--cover-stage-height')!==''));
 const staticPage=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await go(staticPage);
 check('No JavaScript: all five sections and links are available',await staticPage.locator('[data-cover-chapter]').count()===5&&await staticPage.locator('#care-pause .heading-cta').isVisible());await staticPage.close();
 const hrefs=await page.locator('#care-pause a,#trust a').evaluateAll(es=>[...new Set(es.map(e=>e.getAttribute('href')))]);
 for(const href of hrefs){const response=await page.request.get(base+href);check('Restored link resolves '+href,response.status()===200);}
 check('No browser runtime errors',errors.length===0,errors);
}catch(e){check('Browser checks completed',false,String(e));}finally{writeFileSync(out+'/results.json',JSON.stringify({base,checks,errors},null,2));await browser.close();}
if(checks.some(c=>!c.pass))process.exitCode=1;
