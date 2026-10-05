import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const base=process.env.ELORA_BASE_URL||'http://127.0.0.1:3003';
const browser=await chromium.launch({channel:'msedge',headless:true});
try {
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  await page.goto(base,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.querySelector('#main')?.dataset.openingState==='ready');
  await page.evaluate(()=>{
    const scene=document.getElementById('journey');
    scrollTo({top:scene.offsetTop+(scene.offsetHeight-innerHeight)*.8,behavior:'instant'});
  });
  await page.waitForTimeout(500);
  const state=()=>page.evaluate(()=>{
    const scene=document.getElementById('journey');
    return {
      y:scrollY,
      progress:(scrollY-scene.offsetTop)/(scene.offsetHeight-innerHeight),
      active:[...document.querySelectorAll('[data-journey-tab]')].findIndex(el=>el.getAttribute('aria-pressed')==='true')
    };
  });
  const before=await state();
  await page.reload({waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.querySelector('#main')?.dataset.openingState==='ready');
  const after=await state();
  const pass=Math.abs(before.y-after.y)<5&&Math.abs(before.progress-after.progress)<.01&&before.active===after.active;
  console.log(JSON.stringify({pass,before,after}));
  if(!pass)process.exitCode=1;
} finally {
  await browser.close();
}
