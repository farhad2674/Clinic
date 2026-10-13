import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
const require=createRequire('C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/');
const sharp=require('sharp');
const read=p=>JSON.parse(readFileSync(p,'utf8').replace(/^\uFEFF/,''));
const hash=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const checks=[];const check=(name,pass,detail)=>{checks.push({name,pass,detail});if(!pass)console.error('FAIL',name,detail??'')};
const baseline=read('docs/clinic-photography/protected-baseline.json');
for(const [path,sha] of Object.entries(baseline.protectedFiles))check('Protected file unchanged: '+path,existsSync(path)&&hash(path)===sha);
const site=readFileSync('lib/site.ts','utf8'),home=readFileSync('components/home.tsx','utf8');
check('Portrait configuration unchanged',site.match(/^portrait:\{.*$/m)?.[0]===baseline.protectedConfiguration.portrait);
check('Entrance film configuration unchanged',site.match(/^entrance:\{.*$/m)?.[0]===baseline.protectedConfiguration.entrance);
check('Entire face-scan section unchanged',home.slice(home.indexOf('<section id="understanding"'),home.indexOf('<Perspective/>'))===baseline.protectedConfiguration.scanSection);
if(process.argv.includes('--protected-only')){
 mkdirSync('output/playwright/clinic-photography',{recursive:true});
 writeFileSync('output/playwright/clinic-photography/protected-audit.json',JSON.stringify({checkedAt:new Date().toISOString(),checks},null,2)+'\n');
 console.log(JSON.stringify({passed:checks.filter(c=>c.pass).length,failed:checks.filter(c=>!c.pass).length},null,2));
 process.exit(checks.some(c=>!c.pass)?1:0);
}
const manifest=read('docs/clinic-photography/manifest.json'),jobs=manifest.jobs;
check('Exactly42 reviewed independent masters',jobs.length===42&&new Set(jobs.map(j=>j.id)).size===42&&new Set(jobs.map(j=>j.sha256)).size===42);
for(const [kind,count] of Object.entries({service:16,journal:23,environment:3}))check('Coverage '+kind,jobs.filter(j=>j.kind===kind).length===count);
for(const job of jobs){
 check('Prompt, concepts and review '+job.id,!!job.prompt&&job.concepts?.length===3&&!!job.review&&!!job.alt);
 check('Original retained '+job.id,existsSync(job.original)&&hash(job.original)===job.sha256);
 for(const [field,width,height,sha] of [['src',job.width,job.height,job.webpSha256],['thumbnail',job.thumbnailWidth,job.thumbnailHeight,job.thumbnailSha256]]){
  const path='public'+job[field];
  if(!existsSync(path)){check('File exists '+path,false);continue}
  const decoded=await sharp(path).raw().toBuffer({resolveWithObject:true});
  check('Decodable correct-sized WebP '+path,decoded.info.width===width&&decoded.info.height===height&&hash(path)===sha);
 }
 check('No upscaling '+job.id,job.width<=job.originalWidth&&job.height<=job.originalHeight&&job.thumbnailWidth<=job.originalWidth);
}
const corridor=jobs.find(j=>j.kind==='environment'&&j.slug==='corridor');
check('Hero <=120KB',corridor.bytes<=120*1024,corridor.bytes);
const page=readFileSync('app/page.tsx','utf8');
check('Hero preload and rendered source agree',page.includes('environmentPhotography.corridor.src')&&home.includes('environmentPhotography.corridor.src'));
mkdirSync('output/playwright/clinic-photography',{recursive:true});
writeFileSync('output/playwright/clinic-photography/asset-audit.json',JSON.stringify({checkedAt:new Date().toISOString(),checks},null,2)+'\n');
console.log(JSON.stringify({passed:checks.filter(c=>c.pass).length,failed:checks.filter(c=>!c.pass).length,temperature:jobs.reduce((a,j)=>(a[j.scene.temperature]=(a[j.scene.temperature]||0)+1,a),{})},null,2));
if(checks.some(c=>!c.pass))process.exitCode=1;

