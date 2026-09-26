import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFileSync} from 'node:fs';

const base=process.env.ELORA_BASE_URL||'http://127.0.0.1:3002';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const checks=[],errors=[];
page.on('pageerror',e=>errors.push(e.message));
const check=(name,pass,detail)=>checks.push({name,pass,detail});
async function yTo(y){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(450)}
async function sectionY(id){return page.evaluate(id=>{const e=document.getElementById(id);return e.getBoundingClientRect().top+scrollY},id)}
async function midCover(id){const y=await sectionY(id);await yTo(y-450)}
async function hero(progress){const data=await page.evaluate(()=>{const e=document.getElementById('entry');return {top:e.getBoundingClientRect().top+scrollY,travel:e.offsetHeight-innerHeight}});await yTo(data.top+data.travel*progress)}
await page.goto(base,{waitUntil:'networkidle'});
await page.evaluate(()=>{sessionStorage.removeItem('elora-home-scroll');scrollTo(0,0)});
await page.waitForTimeout(800);
check('Home and cover chapters render',await page.locator('[data-cover-chapter]').count()===5);
check('Motion initialized',await page.evaluate(()=>document.documentElement.classList.contains('motion-ready')));
check('Inline headline CTA points to contact',await page.locator('#care-pause h2 .heading-cta').getAttribute('href')==='/contact');
check('Desktop layered layout enabled',await page.locator('#trust').evaluate(e=>({height:e.offsetHeight,viewport:innerHeight,sticky:getComputedStyle(e.querySelector('.cover-stage')).position})).then(m=>m.height>m.viewport*2&&m.sticky==='sticky'),await page.locator('#trust').evaluate(e=>({height:e.offsetHeight,sticky:getComputedStyle(e.querySelector('.cover-stage')).position})));
await hero(.55);
let midOpacity=await page.locator('.hero-threshold').evaluate(e=>Number(getComputedStyle(e).opacity));
check('Hero threshold appears midway',midOpacity>.35,midOpacity);
await page.screenshot({path:'qa/hero-threshold-new.png'});
await hero(.97);
let endOpacity=await page.locator('.hero-threshold').evaluate(e=>Number(getComputedStyle(e).opacity));
check('Hero threshold yields to final message',endOpacity<.2,endOpacity);
await hero(.55);
let reverseOpacity=await page.locator('.hero-threshold').evaluate(e=>Number(getComputedStyle(e).opacity));
check('Hero threshold reverses on upward scroll',reverseOpacity>.35,reverseOpacity);
for(const [id,previous] of [['care-pause',''],['trust','care-pause'],['journal','trust'],['faq-preview','journal'],['invitation','faq-preview']]){
  await midCover(id);
  const metrics=await page.evaluate(()=>({
    top:document.elementFromPoint(innerWidth/2,innerHeight*.15)?.closest('[data-cover-chapter]')?.id||'',
    bottom:document.elementFromPoint(innerWidth/2,innerHeight*.88)?.closest('[data-cover-chapter]')?.id||'',
    sectionTop:document.getElementById(location.hash.slice(1))?.getBoundingClientRect().top
  }));
  check('Cover '+id+' rises over previous chapter',metrics.bottom===id&&(!previous||metrics.top===previous),metrics);
  await page.screenshot({path:'qa/cover-'+id+'.png'});
  await yTo((await sectionY(id))+80);
  await page.screenshot({path:'qa/full-'+id+'.png'});
  const title=await page.locator('#'+id+' .cover-title-line > span').first().evaluate(e=>({opacity:Number(getComputedStyle(e).opacity),y:e.getBoundingClientRect().top}));
  check('Title '+id+' is revealed',title.opacity>.8,title);
}
await midCover('journal');
const before=await page.locator('#journal .cover-title-line > span').first().evaluate(e=>Number(getComputedStyle(e).opacity));
await yTo((await sectionY('journal'))+80);
const after=await page.locator('#journal .cover-title-line > span').first().evaluate(e=>Number(getComputedStyle(e).opacity));
check('Title reveal follows reverse scroll',before<after,{before,after});
check('Desktop has no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
await page.locator('.motion-toggle').click();
await page.waitForTimeout(500);
check('Reduced motion removes pinned cover',await page.locator('#trust .cover-stage').evaluate(e=>getComputedStyle(e).position!=='sticky'));
check('Reduced motion leaves all chapter titles visible',await page.locator('[data-cover-title]').evaluateAll(els=>els.every(e=>[...e.querySelectorAll('.cover-title-line > span')].every(s=>Number(getComputedStyle(s).opacity)>.95))));
await page.locator('.motion-toggle').click();
for(const [width,height] of [[360,800],[390,844],[768,900],[1024,900],[1440,900]]){
  await page.setViewportSize({width,height});
  await page.waitForTimeout(600);
  const size=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
  check('No horizontal overflow at '+width,size.document<=size.viewport+1,size);
}
await page.setViewportSize({width:390,height:844});
await yTo((await sectionY('care-pause'))+80);
await page.screenshot({path:'qa/cover-mobile.png'});
const mobileTitle=await page.locator('#care-pause .cover-title-line > span').first().evaluate(e=>({opacity:Number(getComputedStyle(e).opacity),transform:getComputedStyle(e).transform,top:e.getBoundingClientRect().top}));
check('Mobile title visible within chapter',mobileTitle.opacity>.8,mobileTitle);
check('Mobile inline CTA visible',await page.locator('#care-pause .heading-cta').isVisible());
check('No browser errors',errors.length===0,errors);
writeFileSync('qa/closing-motion-results.json',JSON.stringify({checks,failures:checks.filter(c=>!c.pass).map(c=>c.name)},null,2));
console.log(JSON.stringify({checks,failures:checks.filter(c=>!c.pass).map(c=>c.name)}));
await browser.close();