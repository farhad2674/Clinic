import {expectedPhotography} from './clinic-photography-contract.mjs';
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
if(!existsSync('lib/clinic-photography.ts'))throw new Error('Prepare and review the complete collection before integration.');
const read=p=>readFileSync(p,'utf8');
const manifest=JSON.parse(read('docs/clinic-photography/manifest.json'));
for(const [kind,slugs] of Object.entries(expectedPhotography)){
 const jobs=manifest.jobs.filter(j=>j.kind===kind);
 if(jobs.length!==slugs.length||!slugs.every(slug=>jobs.some(j=>j.slug===slug&&j.id===kind+'-'+slug&&j.review&&existsSync('public'+j.src))))throw new Error('Accepted output coverage failed: '+kind);
}
if(read('lib/journal-images.ts').includes("export {journalPhotography as journalImages}")){
 if(read('components/home.tsx').includes('environmentPhotography.corridor.src')&&read('components/invitation.tsx').includes('environmentPhotography.lounge')&&read('lib/service-images.ts').includes('servicePhotography as serviceImages')){console.log('Photography mappings are already integrated. Run the asset and browser audits.');process.exit(0)}
 throw new Error('A partial previous integration needs review; no files changed.');
}
const changes=new Map();
const save=(p,s)=>changes.set(p,s);
const change=(s,from,to)=>{if(!s.includes(from))throw new Error('Expected existing fragment not found: '+from.slice(0,100));return s.replace(from,to)};
save('lib/journal-images.ts',"// Image interface retained for all existing consumers.\nexport type JournalImage = {src:string;thumbnail:string;alt:string;width:number;height:number;thumbnailWidth:number;position:string;caption:string};\nexport {journalPhotography as journalImages} from './clinic-photography';\n");
save('lib/service-images.ts',"// Every service owns an independent reviewed photograph.\nexport {servicePhotography as serviceImages} from './clinic-photography';\n");
let s=read('lib/guide-images.ts');
s=change(s,"import {guideImageUpdates} from './editorial-image-updates';","import {serviceImages} from './service-images';");
s=s.replace('// A guide and the article it links to intentionally share one topic image.\n// This visual continuity replaces generic portraits reused across unrelated treatments.','// Topic links retain their editorial relationships; services have dedicated photographs.');
s=s.replace(/const categoryTopics:Record<string,string>=.*?;/,"const categoryServices:Record<string,string>={skin:'pigmentation',hair:'hair-loss',rejuvenation:'natural-rejuvenation',advanced:'regenerative'};");
s=s.replace(/export function guideImage\(slug:string\):JournalImage\|undefined\{.*?\}/,"export function guideImage(slug:string):JournalImage|undefined{return journalImages[slug] ?? serviceImages[slug]}");
s=s.replace(/export function categoryImage\(slug:string\):JournalImage\{.*?\}/,"export function categoryImage(slug:string):JournalImage{return serviceImages[categoryServices[slug]]}");
save('lib/guide-images.ts',s);
s=read('lib/site.ts');
s="import {servicePhotography,environmentPhotography} from './clinic-photography';\n"+s;
s=s.replace(/^lounge:.*$/m,"lounge:{...environmentPhotography.lounge,concept:true},");
s=s.replace(/^brand:.*$/m,"brand:{...environmentPhotography['brand-space'],concept:true},");
s=s.replace(/^hair:.*$/m,"hair:{...servicePhotography['hair-loss'],concept:true},");
s=s.replace(/^mature:.*$/m,"mature:{...servicePhotography['rejuvenation-45'],concept:true}");
s=change(s,"image:'/media/editorial-elvitha/pigmentation-v2.webp'","image:servicePhotography.pigmentation.src");
s=change(s,"image:'/media/editorial-elvitha/prp-for-hair-loss-v2.webp'","image:servicePhotography['hair-loss'].src");
s=change(s,"image:'/media/editorial-elvitha/natural-rejuvenation-v2.webp'","image:servicePhotography['natural-rejuvenation'].src");
s=change(s,"image:'/media/journal-elvitha/regenerative-medicine.webp'","image:servicePhotography.regenerative.src");
save('lib/site.ts',s);
s=read('lib/editorial-content.ts');
s="import {servicePhotography,environmentPhotography} from './clinic-photography';\n"+s;
s=s.replace(/export const editorialImages = \{[\s\S]*?\n\};/,"export const editorialImages = {\n natural:servicePhotography['natural-rejuvenation'],\n scarf:servicePhotography.pigmentation,\n hair:servicePhotography['hair-loss'],\n mature:servicePhotography['rejuvenation-45'],\n space:environmentPhotography['brand-space']\n};");
save('lib/editorial-content.ts',s);
s=read('lib/home-content.ts');
s=change(s,'"image": "/media/journal-elvitha/consultation-preparation.webp"','"image": journalImages["consultation-preparation"].src');
s=change(s,'"alt": "دفترچه بسته، کارت‌های یادداشت بدون نوشته و مداد روی میز"','"alt": journalImages["consultation-preparation"].alt');
s=change(s,'"image": "/media/journal-elvitha/everyday-skin-care.webp"','"image": journalImages["everyday-skin-care"].src');
s=change(s,'"alt": "سه ظرف ساده مراقبت پوست کنار حوله پنبه‌ای روشن"','"alt": journalImages["everyday-skin-care"].alt');
save('lib/home-content.ts',s);
s=read('components/home.tsx');
s=change(s,"import {chapters}","import {environmentPhotography} from '@/lib/clinic-photography';\nimport {chapters}");
s=change(s,'src="/media/corridor-elvitha.webp"','src={environmentPhotography.corridor.src} width={environmentPhotography.corridor.width} height={environmentPhotography.corridor.height}');
save('components/home.tsx',s);
s=read('app/page.tsx');
s="import {environmentPhotography} from '@/lib/clinic-photography';\n"+s;
s=change(s,'href="/media/corridor-elvitha.webp"','href={environmentPhotography.corridor.src}');
save('app/page.tsx',s);
s=read('components/invitation.tsx');
s="import {environmentPhotography} from '@/lib/clinic-photography';\nimport {JournalImage} from './journal-image';\n"+s;
s=s.replace(/<img src="\/media\/lounge-elvitha.webp"[^>]*\/>/,'<JournalImage image={environmentPhotography.lounge} sizes="(max-width: 767px) 90vw, 44vw"/>');
save('components/invitation.tsx',s);
s=read('components/editorial.tsx');
s="import {environmentPhotography} from '@/lib/clinic-photography';\n"+s;
s=change(s,'<img src={m.src} alt={m.alt} width="1122" height="1402" decoding="async"/>','<JournalImage image={m} sizes="(max-width: 767px) 90vw, 38vw"/>');
s=s.replace(/<img src="\/media\/lounge-elvitha.webp"[^>]*\/>/,'<JournalImage image={environmentPhotography.lounge} sizes="(max-width: 767px) 90vw, 44vw"/>');
save('components/editorial.tsx',s);
const baseline=JSON.parse(read('docs/clinic-photography/protected-baseline.json'));
const plannedHome=changes.get('components/home.tsx'),plannedSite=changes.get('lib/site.ts');
if(plannedHome.slice(plannedHome.indexOf('<section id="understanding"'),plannedHome.indexOf('<Perspective/>'))!==baseline.protectedConfiguration.scanSection)throw new Error('Protected face-scan markup would change.');
if(plannedSite.match(/^portrait:\{.*$/m)?.[0]!==baseline.protectedConfiguration.portrait||plannedSite.match(/^entrance:\{.*$/m)?.[0]!==baseline.protectedConfiguration.entrance)throw new Error('Protected film configuration would change.');
if(process.argv.includes('--dry-run')){console.log('Preflight passed for '+changes.size+' files; no changes written.')}else{
 for(const [path,source] of changes)writeFileSync(path,source);
 console.log('Integrated service, journal, category, journey, environment, and hero references.');
}

