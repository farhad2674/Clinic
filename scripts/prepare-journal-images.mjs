import {readFileSync,writeFileSync,mkdirSync,copyFileSync,existsSync} from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire('C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/');
const sharp=require('sharp');
const manifest=JSON.parse(readFileSync('docs/journal-image-prompts.json','utf8').replace(/^\uFEFF/,''));
mkdirSync('assets/journal-originals',{recursive:true});
mkdirSync('public/media/journal',{recursive:true});
const images={};
for(const job of manifest.jobs){
 const original='assets/journal-originals/'+job.slug+'.png';
 if(!existsSync(original))copyFileSync(job.generatedSource,original);
 const src='/media/journal/'+job.slug+'.webp';
 const thumbnail='/media/journal/'+job.slug+'-800.webp';
 const full=await sharp(original).rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:85,effort:6}).toFile('public'+src);
 const thumb=await sharp(original).rotate().resize({width:800,withoutEnlargement:true}).webp({quality:82,effort:6}).toFile('public'+thumbnail);
 const caption=['prp-vs-prf','exosomes-evidence'].includes(job.slug)?'تصویر مفهومی با هوش مصنوعی؛ نمایش دقیق فرآورده یا سند اثربخشی نیست.':'تصویر نمایشی با هوش مصنوعی؛ عکس بیمار یا نتیجه درمان نیست.';
 images[job.slug]={src,thumbnail,alt:job.alt,width:full.width,height:full.height,thumbnailWidth:thumb.width,position:job.slug==='prp-for-hair-loss'?'50% 38%':job.slug==='natural-rejuvenation'||job.slug==='skin-after-45'?'50% 38%':'50% 50%',caption};
 Object.assign(job,{original,src,thumbnail,width:full.width,height:full.height,bytes:full.size,thumbnailBytes:thumb.size,caption});
}
writeFileSync('lib/journal-images.ts','// Generated from docs/journal-image-prompts.json by scripts/prepare-journal-images.mjs.\nexport type JournalImage = {src:string;thumbnail:string;alt:string;width:number;height:number;thumbnailWidth:number;position:string;caption:string};\nexport const journalImages = '+JSON.stringify(images,null,2)+' satisfies Record<string,JournalImage>;\n');
writeFileSync('docs/journal-image-prompts.json',JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify(manifest.jobs.map(j=>({slug:j.slug,width:j.width,height:j.height,kb:Math.round(j.bytes/1024),thumbnailKb:Math.round(j.thumbnailBytes/1024)})),null,2));

