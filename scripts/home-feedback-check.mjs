import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';
const base=process.env.ELVITHA_BASE_URL||'http://127.0.0.1:3000';const out='output/playwright/home-feedback';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});const checks=[],errors=[];
const check=(name,pass,detail)=>{checks.push({name,pass,detail});console.log((pass?'PASS ':'FAIL ')+name+(pass?'':' '+JSON.stringify(detail)))};
const page=await browser.newPage({viewport:{width:1440,height:900}});page.on('pageerror',e=>errors.push(e.message));
async function go(p=page){await p.goto(base,{waitUntil:'networkidle'});await p.waitForFunction(()=>!document.documentElement.classList.contains('elvitha-intro-pending'));await p.evaluate(()=>document.fonts.ready);}
async function at(y,p=page){await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await p.waitForTimeout(220)}
async function seek(progress,p=page){await p.evaluate(pct=>{const e=document.querySelector('#understanding'),top=e.getBoundingClientRect().top+scrollY;const start=innerWidth>=768?top:top-innerHeight*.65,end=innerWidth>=768?top+e.offsetHeight-innerHeight:top+e.offsetHeight-innerHeight*.35;scrollTo({top:start+(end-start)*pct,behavior:'instant'})},progress);await p.waitForTimeout(650);return p.locator('[data-scrub-video=portrait]').evaluate(v=>v.currentTime)}
try{
 await go();await page.waitForFunction(()=>document.documentElement.classList.contains('motion-ready'));
 check('Old face labels removed',!/مطالعهٔ چهره|نمایش مفهومی|ارزیابی پزشکی نیست/.test(await page.locator('.face-analysis').innerText()));
 check('Face summary contains three assessment topics',await page.locator('.face-report-grid>div').count()===3&&await page.locator('.face-report-heading').textContent().then(t=>t.includes('محورهای بررسی چهره')));
 check('No invented measurements in portrait overlay',await page.locator('.face-score,[data-score]').count()===0);
 check('Tabs replaced by four visible comparison articles',await page.locator('#life [role=tablist]').count()===0&&await page.locator('[data-method-card]').count()===4);
 const cards=page.locator('[data-method-card]');
 for(let i=0;i<4;i++){
  const y=await cards.nth(i).evaluate(e=>{const r=e.getBoundingClientRect();return r.top+scrollY+r.height/2-innerHeight*.55});await at(y);
  check('Scroll emphasis '+i,await cards.nth(i).getAttribute('data-active')!==null);
  check('Method content stays visible '+i,await cards.nth(i).locator('h3').isVisible()&&await cards.nth(i).locator('.method-atlas-question').isVisible());
 }
 const lastY=await page.evaluate(()=>scrollY);await at(lastY-700);check('Emphasis reverses with scroll',await cards.nth(3).getAttribute('data-active')===null);
 await cards.nth(2).locator('a').focus();await page.waitForTimeout(150);check('Keyboard focus emphasizes linked card',await cards.nth(2).getAttribute('data-active')!==null);await page.evaluate(()=>document.activeElement.blur());
 const links=await cards.locator('a').evaluateAll(es=>es.map(e=>e.getAttribute('href')));for(const href of links){const r=await page.request.get(base+href);check('Comparison link resolves '+href,r.status()===200)}
 check('Updated comparison images decode',await cards.locator('img').evaluateAll(async es=>{await Promise.all(es.map(e=>e.decode().catch(()=>{})));return es.every(e=>e.naturalWidth>0)}));
 for(const [width,height] of [[1440,900],[1280,720],[1024,768],[768,900],[591,580],[390,844],[360,800]]){
  await page.setViewportSize({width,height});await page.waitForTimeout(450);await at(0);
  check('No horizontal overflow '+width,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  if(width>=1024){const rect=await page.locator('.hero-context').evaluate(e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom,visible:getComputedStyle(e).display!=='none',height:innerHeight}));check('Desktop hero added text fits '+width,rect.visible&&rect.top>0&&rect.bottom<rect.height,rect);}
  else check('Compact hero avoids added block '+width,!await page.locator('.hero-context').isVisible());
  await page.locator('.portrait-film').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('[data-scrub-video=portrait]').dataset.mediaState==='ready',null,{timeout:25000});
  await seek(.92);
  const metrics=await page.locator('.face-report').evaluate(e=>{const r=e.getBoundingClientRect(),f=e.closest('.portrait-film').getBoundingClientRect();return {visible:Number(getComputedStyle(e).opacity)>.95,font:parseFloat(getComputedStyle(e.querySelector('dd')).fontSize),heading:parseFloat(getComputedStyle(e.querySelector('.face-report-heading')).fontSize),inside:r.left>=f.left&&r.right<=f.right&&r.bottom<=f.bottom&&r.top>=f.top,belowFace:r.top-f.top>f.height*.5}});
  check('Readable report within frame '+width,metrics.visible&&metrics.font>=13&&metrics.heading>=16&&metrics.inside&&metrics.belowFace,metrics);
  if(width===768||width===591||width===390)await page.screenshot({path:out+'/report-visible-'+width+'.png'});
 }
 await page.setViewportSize({width:1440,height:900});await page.waitForTimeout(450);
 const forward=await seek(.9),reverse=await seek(.2);await page.waitForTimeout(500);const idle=await page.locator('[data-scrub-video=portrait]').evaluate(v=>v.currentTime);
 check('Portrait scrubs in both directions and freezes',forward>reverse+3&&Math.abs(idle-reverse)<.04,{forward,reverse,idle});
 check('Report yields to active annotation when rewinding',await page.locator('.face-analysis').getAttribute('data-report')==='false'&&await page.locator('.face-focus-card').evaluate(e=>getComputedStyle(e).opacity==='1'));
 await seek(.35);const turn=Number(await page.locator('[data-face-marker="0"] circle').first().getAttribute('cx'));await seek(.9);const front=Number(await page.locator('[data-face-marker="0"] circle').first().getAttribute('cx'));check('Authored landmarks still follow the film',turn>front+70,{turn,front});
 for(const [next,previous] of [['trust','care-pause'],['journal','trust'],['faq-preview','journal'],['invitation','faq-preview']]){
  const y=await page.locator('#'+next).evaluate(e=>e.getBoundingClientRect().top+scrollY-innerHeight*.5);await at(y);
  const state=await page.evaluate(prev=>({top:document.elementFromPoint(innerWidth/2,innerHeight*.1)?.closest('[data-cover-chapter]')?.id,bottom:document.elementFromPoint(innerWidth/2,innerHeight*.85)?.closest('[data-cover-chapter]')?.id,held:Math.abs(document.querySelector('#'+prev+' .cover-stage').getBoundingClientRect().top)<2}),previous);
  check('Restored cover motion preserved '+next,state.top===previous&&state.bottom===next&&state.held,state);
 }
 const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});let videoRequests=0;reduced.on('request',r=>{if(r.url().includes('supplied-portrait.mp4'))videoRequests++});await go(reduced);await reduced.locator('.portrait-film').scrollIntoViewIfNeeded();
 check('Reduced motion shows static summary without downloading portrait',videoRequests===0&&await reduced.locator('.face-report').evaluate(e=>getComputedStyle(e).opacity==='1'&&getComputedStyle(e).transform==='none'));
 check('Reduced motion leaves all comparisons readable',await reduced.locator('[data-method-card]').count()===4);await reduced.close();
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.goto(base,{waitUntil:'networkidle'});
 check('No JavaScript: all comparison copy and links present',await nojs.locator('[data-method-card] h3').count()===4&&await nojs.locator('[data-method-card] a').count()===4);await nojs.close();
 check('No runtime errors',errors.length===0,errors);
}catch(e){check('Browser checks complete',false,String(e));}finally{writeFileSync(out+'/results.json',JSON.stringify({base,checks,errors},null,2));await browser.close()}
if(checks.some(c=>!c.pass))process.exitCode=1;
