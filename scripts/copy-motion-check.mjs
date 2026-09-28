import {chromium} from 'file:///C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFileSync} from 'node:fs';
const browser=await chromium.launch({channel:'msedge',headless:true});const checks=[],errors=[];
const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});await page.locator('html.motion-ready').waitFor();await page.waitForTimeout(2100);
const seek=async(id,p=.25)=>{await page.evaluate(({id,p})=>{const el=document.getElementById(id);scrollTo({top:el.getBoundingClientRect().top+scrollY+Math.max(0,el.offsetHeight-innerHeight)*p,behavior:'instant'})},{id,p});await page.waitForTimeout(450)};
const check=(name,pass,detail)=>checks.push({name,pass,detail});
for(const id of ['understanding','paths','perspective','journey','trust','journal','faq-preview','invitation']){await seek(id);await page.screenshot({path:'qa/copy-review/motion-'+id+'.png'});}
await page.locator('.chapter-nav a[href="#paths"]').click();await page.waitForTimeout(1700);check('Dot links navigate to services',await page.locator('[data-nav-chapter="paths"]').getAttribute('aria-current')==='location');
await page.locator('[data-path-tab="3"]').click();await page.waitForTimeout(1700);check('Service tabs reach final panel',await page.locator('[data-path-tab="3"]').getAttribute('aria-pressed')==='true');
await page.locator('.chapter-nav a[href="#understanding"]').click();await page.waitForTimeout(1700);check('Dots navigate backwards',await page.locator('[data-nav-chapter="understanding"]').getAttribute('aria-current')==='location');
await seek('life',0);await page.locator('#audience-0').click();check('Audience tabs update copy',(await page.locator('#audience-panel h3').textContent()).includes('شنیدن'));
await seek('faq-preview',.4);await page.locator('.home-faq summary').first().click();check('FAQ disclosure opens',await page.locator('.home-faq details').first().getAttribute('open')!==null);
for(const width of [390,768,1024]){await page.setViewportSize({width,height:900});await page.waitForTimeout(450);check('Motion layout has no overflow at '+width,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await reduced.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});await reduced.locator('.chapter-nav a[href="#life"]').click();await reduced.waitForTimeout(250);check('Reduced-motion dots update current section',await reduced.locator('[data-nav-chapter="life"]').getAttribute('aria-current')==='location');
await reduced.locator('#perspective').scrollIntoViewIfNeeded();await reduced.screenshot({path:'qa/copy-review/mobile-perspective-final.png'});
check('No browser runtime errors',errors.length===0,errors);writeFileSync('qa/copy-review/motion-results.json',JSON.stringify({checks,errors},null,2));console.log(JSON.stringify({checks,errors}));await browser.close();
