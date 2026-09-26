import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFileSync} from 'node:fs';

const base=process.env.ELORA_BASE_URL||'http://127.0.0.1:3001';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const checks=[],errors=[];
page.on('pageerror',e=>errors.push(e.message));
const check=(name,pass,detail)=>checks.push({name,pass,detail});
async function scene(id,progress){
  await page.evaluate(({id,progress})=>{
    const el=document.getElementById(id);
    scrollTo({top:el.getBoundingClientRect().top+scrollY+(el.offsetHeight-innerHeight)*progress,behavior:'instant'});
  },{id,progress});
  await page.waitForTimeout(700);
}
async function topOf(id){
  await page.evaluate(id=>{
    const el=document.getElementById(id);
    scrollTo({top:el.getBoundingClientRect().top+scrollY-18,behavior:'instant'});
  },id);
  await page.waitForTimeout(450);
}
async function active(){
  return page.locator('[data-perspective-card][aria-hidden="false"]').getAttribute('data-perspective-card');
}
await page.goto(base,{waitUntil:'networkidle'});
check('Home responds',await page.locator('#perspective').count()===1);
check('Motion initialized',await page.evaluate(()=>document.documentElement.classList.contains('motion-ready')));
await scene('understanding',.5);
await page.screenshot({path:'qa/understanding-motion.png'});
check('Portrait cue updates',await page.locator('[data-signal][data-active]').count()===1);
for(const [progress,index] of [[.12,'0'],[.48,'1'],[.85,'2'],[.12,'0']]){
  await scene('perspective',progress);
  check('Decision card at '+progress,await active()===index,{expected:index,actual:await active()});
  check('Decision card count at '+progress,await page.locator('[data-perspective-count]').textContent()==='0'+(Number(index)+1));
  await page.screenshot({path:'qa/perspective-'+progress+'.png'});
}
await page.locator('[data-perspective-tab="2"]').click();
await page.waitForTimeout(1100);
check('Decision button advances',await active()==='2');
await page.locator('[data-perspective-tab="0"]').click();
await page.waitForTimeout(1100);
check('Decision button reverses',await active()==='0');
check('Desktop has no overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
await page.locator('.motion-toggle').click();
await page.waitForTimeout(500);
check('Reduced motion shows all decision cards',await page.locator('[data-perspective-card][aria-hidden]').count()===0);
check('Reduced motion removes long scene',await page.locator('#perspective').evaluate(el=>el.offsetHeight<innerHeight*2));
await topOf('perspective');
await page.screenshot({path:'qa/perspective-reduced.png'});
await page.locator('.motion-toggle').click();
await page.waitForTimeout(500);
for(const width of [360,390,768,1024,1440]){
  await page.setViewportSize({width,height:900});
  await page.waitForTimeout(650);
  const size=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
  check('No overflow at '+width,size.document<=size.viewport+1,size);
}
await page.setViewportSize({width:390,height:844});
await page.waitForTimeout(500);
await topOf('perspective');
await page.locator('#perspective').screenshot({path:'qa/perspective-mobile-full.png'});
check('Mobile keeps all decision cards',await page.locator('[data-perspective-card]:visible').count()===3);
check('No browser errors',errors.length===0,errors);
writeFileSync('qa/motion-results.json',JSON.stringify({checks,failures:checks.filter(c=>!c.pass).map(c=>c.name)},null,2));
console.log(JSON.stringify({checks,failures:checks.filter(c=>!c.pass).map(c=>c.name)}));
await browser.close();
