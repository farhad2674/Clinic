import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
if(existsSync('docs/clinic-photography/protected-baseline.json'))throw new Error('Protected baseline already exists; do not replace the pre-edit evidence.');
const protectedFiles=[
 'public/media/portrait-turn/supplied-portrait.mp4','public/media/portrait-turn/supplied-poster.webp',
 'public/media/entrance-elvitha.mp4','public/media/entrance-elvitha-poster.webp',
 'components/face-analysis.tsx','lib/portrait-landmarks.ts','components/media.tsx','components/motion.tsx',
 'components/scroll-scene.ts','components/deferred-motion.tsx','app/face-analysis.css','app/motion-scenes.css','app/globals.css',
 'lib/content.json','lib/research-content.json','lib/regenerative-service-details.ts','lib/regenerative-services.ts'
].filter(existsSync);
const hash=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const site=readFileSync('lib/site.ts','utf8');
const home=readFileSync('components/home.tsx','utf8');
const baseline={createdAt:new Date().toISOString(),protectedFiles:Object.fromEntries(protectedFiles.map(p=>[p,hash(p)])),
 protectedConfiguration:{portrait:site.match(/^portrait:\{.*$/m)?.[0],entrance:site.match(/^entrance:\{.*$/m)?.[0],scanSection:home.slice(home.indexOf('<section id="understanding"'),home.indexOf('<Perspective/>'))}};
mkdirSync('docs/clinic-photography',{recursive:true});
writeFileSync('docs/clinic-photography/protected-baseline.json',JSON.stringify(baseline,null,2)+'\n');
console.log('Protected baseline saved for '+protectedFiles.length+' files and scan markup/media configuration.');
