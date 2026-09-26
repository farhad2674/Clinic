import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFileSync} from 'node:fs';

const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1071,height:580}});
const base='http://127.0.0.1:3002';
const checks=[],errors=[];
page.on('pageerror',error=>errors.push(error.message));
const check=(name,pass,detail)=>checks.push({name,pass,detail});
const pause=ms=>page.waitForTimeout(ms);
const rect=async selector=>page.locator(selector).evaluate(e=>{const r=e.getBoundingClientRect();return {top:r.top+scrollY,height:r.height}});
const jump=async y=>{await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await pause(500)};
const scene=async(id,progress)=>{const r=await rect('#'+id);await jump(r.top+(r.height-580)*progress)};
const clip=async selector=>page.locator(selector).first().evaluate(e=>getComputedStyle(e).clipPath);
const left=clipValue=>Number(clipValue.match(/inset\([^)]*?([\d.]+)%\)$/)?.[1]??0);

await page.goto(base,{waitUntil:'domcontentloaded'});
check('First visit presents logo preloader',await page.locator('.preloader').isVisible());
await pause(700);
await page.screenshot({path:'qa/preloader-review.png'});
await page.waitForFunction(()=>!document.querySelector('.preloader'),{timeout:6000});
check('Preloader completes and releases scroll',await page.evaluate(()=>document.body.style.overflow!=='hidden'&&sessionStorage.getItem('elora-intro-seen')==='1'));
check('Unwanted motion button and hero caption removed',await page.locator('.motion-toggle,.hero-window-caption').count()===0);
check('New portrait assets are wired',await page.locator('#audience-panel img').getAttribute('src')==='/media/young-scarf.webp'&&await page.locator('#care-rejuvenation img').getAttribute('src')==='/media/young-natural.webp');
check('Mature tab keeps age-appropriate image',await page.locator('#audience-2').click().then(()=>page.locator('#audience-panel img').getAttribute('src'))==='/media/mature.webp');
await page.locator('#audience-1').click();
await scene('life',.52);
await page.locator('#audience-panel img').evaluate(e=>e.decode());
await page.screenshot({path:'qa/young-scarf-in-context.png'});
check('Young scarf portrait loads in life section',await page.locator('#audience-panel img').evaluate(e=>e.complete&&e.naturalWidth>0));
await scene('paths',.68);
await page.locator('#care-rejuvenation img').evaluate(e=>e.decode());
await page.screenshot({path:'qa/young-natural-in-context.png'});
check('Natural portrait loads in care section',await page.locator('#care-rejuvenation img').evaluate(e=>e.complete&&e.naturalWidth>0));

for(const [progress,index] of [[.08,'0'],[.5,'1'],[.9,'2']]){
  await scene('understanding',progress);
  check('Portrait analytics step '+index,await page.locator('[data-insight-row][data-active]').getAttribute('data-insight-row')===index);
}
await page.screenshot({path:'qa/portrait-analytics-review.png'});
check('Old portrait annotation is gone',await page.locator('.observation-frame>span,.portrait-signals').count()===0);

const positions=[];
for(const progress of [.03,.5,.97]){
  await scene('journey',progress);
  positions.push(await page.locator('.journey-track').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).m41));
}
check('Six journey slides scrub horizontally',await page.locator('[data-journey-slide]').count()===6&&positions[2]>positions[1]&&positions[1]>positions[0],positions);
await scene('journey',.5);
await page.screenshot({path:'qa/journey-horizontal-review.png'});
check('Journey controls update',await page.locator('[data-journey-tab][data-active]').count()===1);
await page.locator('[data-journey-tab="5"]').click();
await pause(1300);
check('Journey dot reaches last slide',await page.locator('[data-journey-tab="5"]').getAttribute('aria-pressed')==='true');

for(const [id,previous] of [['trust','care-pause'],['journal','trust']]){
  const r=await rect('#'+id);
  await jump(r.top-290);
  const stack=await page.evaluate(({id})=>({
    top:document.elementFromPoint(innerWidth/2,100)?.closest('[data-cover-chapter]')?.id||'',
    bottom:document.elementFromPoint(innerWidth/2,465)?.closest('[data-cover-chapter]')?.id||'',
    margin:getComputedStyle(document.getElementById(id)).marginTop,
    z:getComputedStyle(document.getElementById(id)).zIndex
  }),{id});
  check(id+' visibly stacks over previous section',stack.top===previous&&stack.bottom===id&&parseFloat(stack.margin)<-90,stack);
  await page.screenshot({path:'qa/'+id+'-compact-stack.png'});
  const titleSelector='#'+id+' .cover-title-line > span';
  const title=await rect('#'+id+' [data-cover-title]');
  await jump(title.top-580*.8);
  const before=left(await clip(titleSelector));
  await jump(title.top+title.height/2-290);
  const after=left(await clip(titleSelector));
  check(id+' title reveals near viewport center',before>after+8,{before,after});
  await page.screenshot({path:'qa/'+id+'-center-reveal.png'});
}
check('Compact desktop has no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));

await page.setViewportSize({width:390,height:844});
await pause(650);
check('Mobile has no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
await page.locator('#journey').scrollIntoViewIfNeeded();
await page.locator('[data-journey-slide="3"]').evaluate(e=>e.scrollIntoView({behavior:'instant',inline:'center',block:'nearest'}));
await pause(650);
check('Mobile horizontal swipe updates stage',await page.locator('[data-journey-tab="3"]').getAttribute('aria-pressed')==='true');
await page.screenshot({path:'qa/journey-mobile-review.png'});

await page.setViewportSize({width:1440,height:900});
await page.reload({waitUntil:'networkidle'});
await pause(500);
const tallStack=await page.locator('#trust').evaluate(e=>({margin:parseFloat(getComputedStyle(e).marginTop),radius:getComputedStyle(e).borderTopLeftRadius}));
check('Tall desktop retains full overlapping cover scene',tallStack.margin< -800&&parseFloat(tallStack.radius)>70,tallStack);
await scene('journey',.7);
const tallJourneyX=await page.locator('.journey-track').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).m41);
check('Tall desktop journey scrubs without horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)&&tallJourneyX>100,tallJourneyX);
const reduced=await browser.newPage({viewport:{width:1071,height:580}});
await reduced.emulateMedia({reducedMotion:'reduce'});
await reduced.goto(base,{waitUntil:'networkidle'});
await reduced.waitForTimeout(450);
check('OS reduced motion skips preloader and heavy scene',await reduced.locator('.preloader').isHidden()&&await reduced.evaluate(()=>document.documentElement.classList.contains('reduced-motion')&&!document.documentElement.classList.contains('motion-ready')));
check('Reduced motion leaves horizontal journey browsable',await reduced.locator('[data-journey-slide]').count()===6&&await reduced.locator('.journey-viewport').evaluate(e=>e.scrollWidth>e.clientWidth));
await reduced.close();
check('No browser errors',errors.length===0,errors);
writeFileSync('qa/review-comments-results.json',JSON.stringify({checks,failures:checks.filter(c=>!c.pass).map(c=>c.name)},null,2));
console.log(JSON.stringify({checks,failures:checks.filter(c=>!c.pass).map(c=>c.name)}));
await browser.close();