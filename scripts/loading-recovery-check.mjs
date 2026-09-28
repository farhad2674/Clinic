import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFileSync} from 'node:fs';
const browser=await chromium.launch({channel:'msedge',headless:true});
const checks=[],errors=[];
const base=process.env.PRELOADER_BASE_URL||'http://127.0.0.1:3000';
async function ready(page){
  await page.waitForFunction(()=>document.querySelector('#main')?.dataset.openingState==='ready'&&!document.querySelector('.preloader'),{},{timeout:35000});
  return page.evaluate(()=>({unlocked:!document.querySelector('#main').inert&&document.body.style.overflow!=='hidden',motion:document.documentElement.classList.contains('motion-ready'),media:[...document.querySelectorAll('video')].map(v=>v.dataset.mediaState)}));
}
try{
  for(const scenario of ['malformed-anchor','valid-anchor','invalid-saved-scroll','restore-exception','preparation-exception']){
    const page=await browser.newPage({viewport:{width:1440,height:900}});
    page.on('pageerror',error=>errors.push({scenario,message:error.message}));
    if(scenario==='restore-exception')await page.addInitScript(()=>{
      const original=Element.prototype.scrollIntoView;
      Element.prototype.scrollIntoView=function(...args){if(this.id==='understanding')throw new Error('Injected restore failure');return original.apply(this,args)};
    });
    if(scenario==='preparation-exception')await page.addInitScript(()=>Object.defineProperty(navigator,'connection',{get(){throw new Error('Injected capability failure')},configurable:true}));
    const hash=scenario==='malformed-anchor'?'#%':scenario.includes('anchor')||scenario==='restore-exception'?'#understanding':'';
    await page.goto(base+'/'+hash,{waitUntil:'domcontentloaded'});
    let state=await ready(page);
    if(scenario==='invalid-saved-scroll'){
      await page.evaluate(()=>sessionStorage.setItem('elora-home-scroll','Infinity'));
      await page.reload({waitUntil:'domcontentloaded'});
      state=await ready(page);
    }
    const fallback=scenario.endsWith('exception');
    const pass=state.unlocked&&(fallback?!state.motion&&state.media.every(s=>s==='fallback'):state.motion);
    checks.push({scenario,pass,state});console.log(pass?'PASS':'FAIL',scenario,state);
    await page.close();
  }
  checks.push({scenario:'no-uncaught-errors',pass:errors.length===0,errors});
}finally{
  writeFileSync('qa/loading-recovery-results.json',JSON.stringify(checks,null,2));
  await browser.close();
}
if(checks.some(check=>!check.pass))process.exitCode=1;
