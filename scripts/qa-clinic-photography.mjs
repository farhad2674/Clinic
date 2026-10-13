import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
const base=process.env.ELVITHA_BASE_URL||'http://127.0.0.1:3016';
const out='output/playwright/clinic-photography';mkdirSync(out,{recursive:true});
const manifest=JSON.parse(readFileSync('docs/clinic-photography/manifest.json','utf8'));
const checks=[],errors=[];const check=(name,pass,detail)=>{checks.push({name,pass,detail});if(!pass)console.error('FAIL',name,detail??'')};
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
page.on('pageerror',e=>errors.push(e.message));
const settle=async p=>{await p.waitForFunction(()=>!document.documentElement.classList.contains('elvitha-intro-pending'),null,{timeout:10000});await p.evaluate(()=>document.fonts.ready)};
const go=async (route,p=page)=>{await p.goto(base+route,{waitUntil:'networkidle'});await settle(p)};
try{
 await go('/sitemap');
 const routes=await page.locator('.sitemap-grid a').evaluateAll(as=>[...new Set(['/',...as.map(a=>a.getAttribute('href')),'/sitemap'])]);
 check('52 current routes discovered',routes.length===52,routes.length);
 const summaries=[],assets=new Set(),active=new Set();
 const allowed=new Set(manifest.jobs.flatMap(j=>[j.src,j.thumbnail]));
 for(const route of routes){
  const response=await page.request.get(base+route),html=await response.text();
  const sources=[...html.matchAll(/(?:src|poster)="(\/media\/[^"?]+)"/gi)].map(m=>m[1]);
  for(const src of sources){assets.add(src);if(!src.endsWith('.mp4'))active.add(src)}
  for(const m of html.matchAll(/srcset="([^"]+)"/gi))for(const part of m[1].split(',')){const src=part.trim().split(/\s+/)[0];if(src.startsWith('/media/'))assets.add(src)}
  summaries.push({route,status:response.status()});
 }
 check('All routes return200',summaries.every(r=>r.status===200),summaries.filter(r=>r.status!==200));
 check('All42 final photographs are mounted',manifest.jobs.every(j=>active.has(j.src)),manifest.jobs.filter(j=>!active.has(j.src)).map(j=>j.id));
 const preserved=['/media/portrait-turn/supplied-poster.webp','/media/entrance-elvitha-poster.webp'];
 check('No old independent photograph remains mounted',[...active].every(src=>allowed.has(src)||preserved.includes(src)),[...active].filter(src=>!allowed.has(src)&&!preserved.includes(src)));
 const badAssets=[];for(const src of assets){const r=await page.request.get(base+src);if(r.status()!==200)badAssets.push({src,status:r.status()})}
 check('All src/srcset/poster assets load',!badAssets.length,badAssets);
 const dimensions=[];
 for(const width of [1440,390,360]){
  await page.setViewportSize({width,height:1000});
  for(const route of routes){
   await go(route);
   await page.evaluate(()=>{for(const img of document.images)img.loading='eager'});
   await page.waitForFunction(()=>[...document.images].every(img=>img.complete),null,{timeout:15000});
   const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.currentSrc||i.src)}));
   check('Layout and image decoding '+width+' '+route,state.overflow<=1&&!state.broken.length,state);
   const cover=page.locator('.journal-cover-frame').first();
   if(await cover.count()){
    await cover.scrollIntoViewIfNeeded();await page.waitForTimeout(180);
    const info=await cover.locator('img').evaluate(i=>({src:i.getAttribute('src'),naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight,width:i.getBoundingClientRect().width,height:i.getBoundingClientRect().height,position:getComputedStyle(i).objectPosition}));
    dimensions.push({width,route,...info});
    if((width===1440||width===390)&&(route.startsWith('/services/')||route.startsWith('/journal/')))await cover.screenshot({path:out+'/crop-'+width+'-'+route.slice(1).replaceAll('/','-')+'.png'});
   }
   if(['/', '/journal','/services','/about','/contact'].includes(route)&&(width===1440||width===390)){
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    await page.screenshot({path:out+'/page-'+width+'-'+(route==='/'?'home':route.slice(1))+'.png'});
   }
  }
  console.log('Responsive sweep completed: '+width);
 }
 await page.setViewportSize({width:1440,height:1000});await go('/');
 await page.waitForFunction(()=>document.documentElement.classList.contains('motion-ready'));
 await page.locator('.portrait-film').scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>document.querySelector('[data-scrub-video=portrait]').dataset.mediaState==='ready',null,{timeout:25000});
 const seek=async progress=>{await page.evaluate(p=>{const e=document.querySelector('#understanding');scrollTo({top:e.offsetTop+(e.offsetHeight-innerHeight)*p,behavior:'instant'})},progress);await page.waitForTimeout(1100);return page.locator('[data-scrub-video=portrait]').evaluate(v=>v.currentTime)};
 const forward=await seek(.84),reverse=await seek(.18);await page.waitForTimeout(1100);
 const idle=await page.locator('[data-scrub-video=portrait]').evaluate(v=>v.currentTime);
 check('Protected film forward/reverse/idle',forward>reverse+2&&Math.abs(idle-reverse)<.04,{forward,reverse,idle});
 await page.screenshot({path:out+'/protected-face-scan.png'});
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(1000);
 const initialOpacity=await page.locator('.corridor-intro').evaluate(e=>Number(getComputedStyle(e).opacity));
 await page.evaluate(()=>{const e=document.querySelector('#entry');scrollTo({top:e.offsetTop+(e.offsetHeight-innerHeight)*.7,behavior:'instant'})});
 await page.waitForTimeout(1000);
 const finalOpacity=await page.locator('.corridor-intro').evaluate(e=>Number(getComputedStyle(e).opacity));
 check('Entrance still fades into preserved film',initialOpacity>.9&&finalOpacity<.1,{initialOpacity,finalOpacity});
 const reduced=await browser.newPage({viewport:{width:390,height:900},reducedMotion:'reduce'});
 reduced.on('pageerror',e=>errors.push(e.message));
 const filmRequests=[];reduced.on('request',r=>{if(r.url().includes('supplied-portrait.mp4'))filmRequests.push(r.url())});
 await go('/',reduced);await reduced.locator('.portrait-film').scrollIntoViewIfNeeded();
 check('Reduced motion retains scan poster without fetching film',filmRequests.length===0&&await reduced.locator('[data-scrub-video=portrait]').evaluate(v=>v.poster.includes('supplied-poster.webp')));
 await reduced.screenshot({path:out+'/reduced-motion.png'});await reduced.close();
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:900}});
 await nojs.goto(base+'/journal/everyday-skin-care',{waitUntil:'networkidle'});
 await nojs.locator('.journal-cover-frame').scrollIntoViewIfNeeded();
 await nojs.waitForFunction(()=>{const i=document.querySelector('.journal-cover-frame img');return i?.complete&&i.naturalWidth>0},null,{timeout:15000});
 check('No-JS article and photograph visible',await nojs.locator('h1').isVisible()&&await nojs.locator('.journal-cover-frame img').evaluate(i=>i.complete&&i.naturalWidth>0)&&!await nojs.locator('.brand-intro').isVisible());
 await nojs.close();
 const failed=await browser.newPage({viewport:{width:390,height:900}});
 failed.on('pageerror',e=>errors.push(e.message));
 const corridor=manifest.jobs.find(j=>j.slug==='corridor'&&j.kind==='environment');
 await failed.route('**'+corridor.src,r=>r.abort());
 await go('/',failed);
 check('Failed opening image cannot trap visitor',await failed.evaluate(()=>!document.documentElement.classList.contains('elvitha-intro-pending')&&document.body.style.overflow!=='hidden'));
 await failed.close();
 check('No browser runtime errors',!errors.length,errors);
 writeFileSync(out+'/routes.json',JSON.stringify(summaries,null,2)+'\n');
 writeFileSync(out+'/rendered-crops.json',JSON.stringify(dimensions,null,2)+'\n');
}catch(e){check('QA execution',false,String(e))}
finally{writeFileSync(out+'/browser-audit.json',JSON.stringify({base,checks,errors},null,2)+'\n');await browser.close()}
console.log(JSON.stringify({passed:checks.filter(c=>c.pass).length,failed:checks.filter(c=>!c.pass).length},null,2));
if(checks.some(c=>!c.pass))process.exitCode=1;

