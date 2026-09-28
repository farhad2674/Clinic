import {spawn,execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const server=spawn(process.execPath,['node_modules/wrangler/bin/wrangler.js','dev','--config','dist/server/wrangler.json','--ip','127.0.0.1','--port','3002','--local'],{windowsHide:true,stdio:['ignore','pipe','pipe']});
let browser;const checks=[],errors=[];let log='';server.stdout.on('data',d=>log+=d);server.stderr.on('data',d=>log+=d);
try{
 await new Promise((resolve,reject)=>{const deadline=setTimeout(()=>reject(Error(log.slice(-1500))),30000);const ready=d=>{if(d.toString().includes('Ready on')){clearTimeout(deadline);resolve()}};server.stdout.on('data',ready);server.stderr.on('data',ready);server.once('error',reject);server.once('exit',code=>{clearTimeout(deadline);reject(Error('Worker exited '+code+' '+log.slice(-1000)))})});
 browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',e=>errors.push(e.message));
 for(const route of ['/about','/services/hair-loss','/journal/prp-vs-prf','/contact','/sitemap','/']){
  const response=await page.goto('http://127.0.0.1:3002'+route,{waitUntil:'networkidle'});await page.waitForTimeout(300);
  checks.push({route,status:response.status(),pass:response.status()===200&&await page.locator('#invitation').count()===1});
  if(route==='/about'){const y=await page.locator('.site-invitation').evaluate(e=>e.getBoundingClientRect().top+scrollY);await page.evaluate(y=>scrollTo({top:y-400,behavior:'instant'}),y);await page.waitForTimeout(300);checks.push({name:'Production cover pin',pass:await page.locator('.inner-body').evaluate(e=>getComputedStyle(e).position==='fixed')});}
 }
 checks.push({name:'Production runtime',pass:errors.length===0,errors});writeFileSync('qa/shared-motion/production.json',JSON.stringify(checks,null,2));console.log(JSON.stringify(checks,null,2));if(checks.some(c=>!c.pass))process.exitCode=1;
}finally{if(browser)await browser.close();try{execFileSync('taskkill',['/PID',String(server.pid),'/T','/F'],{windowsHide:true,stdio:'ignore'})}catch{}}
