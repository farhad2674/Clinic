import {spawn} from 'node:child_process';
import {writeFileSync,readFileSync} from 'node:fs';
import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const server=spawn(process.execPath,['node_modules/vinext/dist/cli.js','start','--hostname','127.0.0.1','--port','3002'],{stdio:['ignore','pipe','pipe'],windowsHide:true});
const results=[];let browser;
try{
await new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(Error('Production server startup timeout')),15000);server.stdout.on('data',d=>{if(d.toString().includes('Production server running')){clearTimeout(timeout);resolve()}});server.on('error',reject);server.on('exit',c=>{if(c)reject(Error('Production server exited '+c))})});
browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
for(const path of ['/','/services/exosomes','/contact']){const response=await page.goto('http://127.0.0.1:3002'+path,{waitUntil:'networkidle'});results.push({name:'Production route '+path,pass:response.status()===200,status:response.status()})}
results.push({name:'Production browser runtime',pass:errors.length===0,errors});
const r=await fetch('http://127.0.0.1:3002/media/entrance.mp4',{headers:{Range:'bytes=0-1000'}});results.push({name:'Production video ranges',pass:r.status===206,status:r.status});await r.arrayBuffer();
writeFileSync('qa/production.json',JSON.stringify(results,null,2));
const first=JSON.parse(readFileSync('qa/results.json','utf8')).checks;
const fixes=JSON.parse(readFileSync('qa/fixes.json','utf8')).checks;
const map=new Map([...first,...fixes,...results].map(c=>[c.name,c]));
const consolidated=[...map.values()];
writeFileSync('qa/acceptance.json',JSON.stringify({checks:consolidated,failures:consolidated.filter(c=>!c.pass)},null,2));
console.log(JSON.stringify({production:results,total:consolidated.length,failures:consolidated.filter(c=>!c.pass)}));
}finally{if(browser)await browser.close();server.kill()}
