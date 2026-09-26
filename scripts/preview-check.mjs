import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFileSync} from 'node:fs';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
await page.screenshot({path:'qa/home-desktop.png'});
console.log(JSON.stringify({title:await page.title(),errors,fonts:await page.evaluate(()=>document.fonts.check('16px Vazirmatn')&&document.fonts.check('16px Estedad')),motion:await page.locator('html').getAttribute('class'),overflow:await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth})),heights:await page.locator('.scene').evaluateAll(els=>els.map(e=>({id:e.id,height:e.offsetHeight})))}));
await browser.close();
