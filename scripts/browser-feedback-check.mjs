import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';

mkdirSync('qa/browser-feedback',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1070,height:580}});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:3003/',{waitUntil:'networkidle'});
await page.waitForFunction(()=>document.querySelector('#main')?.dataset.openingState==='ready');
await page.waitForTimeout(700);
const results=[];
const check=(name,pass,detail)=>{results.push({name,pass,detail});if(!pass)console.error('FAIL',name,detail)};
const scan=async progress=>{
  await page.evaluate(p=>{const el=document.querySelector('#understanding');scrollTo({top:el.offsetTop+(el.offsetHeight-innerHeight)*p,behavior:'instant'})},progress);
  await page.waitForTimeout(850);
};
await scan(.65);
const mesh=await page.locator('.face-mesh').evaluate(el=>({display:getComputedStyle(el).display,clip:getComputedStyle(el).clipPath,transform:getComputedStyle(el).transform}));
check('3D style face mesh follows film',mesh.display!=='none'&&mesh.clip!=='none'&&mesh.transform!=='none',mesh);
await page.screenshot({path:'qa/browser-feedback/scan-mesh.png'});
await scan(.88);
const report=await page.locator('.face-report').evaluate(el=>({text:el.textContent,opacity:getComputedStyle(el).opacity,transform:getComputedStyle(el).transform}));
check('Demo score report opens at end',Number(report.opacity)>.9&&report.text.includes('۸۰')&&report.text.includes('۱۰۰')&&report.text.includes('۸۸')&&report.text.includes('نمونهٔ نمایشی'),report);
await page.screenshot({path:'qa/browser-feedback/score-report.png'});
await scan(.2);
check('Score report closes on reverse scroll',await page.locator('.face-analysis').getAttribute('data-report')==='false');
for(const id of ['trust','journal','faq-preview']){
  const title=page.locator('#'+id+' [data-cover-title] .cover-title-line > span').first();
  const position=async ratio=>{
    await title.evaluate((el,r)=>{const y=el.getBoundingClientRect().top+scrollY-innerHeight*r;scrollTo({top:y,behavior:'instant'})},ratio);
    await page.waitForTimeout(500);
    return title.evaluate(el=>({filter:getComputedStyle(el).filter,opacity:Number(getComputedStyle(el).opacity)}));
  };
  const started=await position(.9);
  const finished=await position(.6);
  const blur=s=>Number(s.filter.match(/blur\(([\d.]+)/)?.[1]??0);
  check(id+' blur starts early',blur(started)<5&&started.opacity>.2,{started,finished});
  check(id+' title clears by 60 percent',blur(finished)<.5&&finished.opacity>.95,{started,finished});
  if(id==='journal')await page.screenshot({path:'qa/browser-feedback/journal-clear.png'});
}
check('No page errors',errors.length===0,errors);
writeFileSync('qa/browser-feedback/results.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
await browser.close();
if(results.some(r=>!r.pass))process.exitCode=1;