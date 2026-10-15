import {copyFileSync,existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';

const require=createRequire('C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/');
const sharp=require('sharp');
const ledgerPath='docs/clinic-photography/homepage-feedback-2026-10-15.json';
const ledger=JSON.parse(readFileSync(ledgerPath,'utf8').replace(/^\uFEFF/,''));
const generatedRoot='C:/Users/Farhad/.codex/generated_images/01a13e94-1475-7153-9045-d2ffb0016bf4';
const sources={
  'home-service-prp-young-adult':'exec-7cb40e8d-ea11-4821-84ef-7282a3b46a63.png',
  'home-service-mesogel-curly-headband':'exec-ade9c295-8b16-4c60-b936-e4ecdf845393.png',
  'home-service-cell-based-happy-teen':'exec-0a37bb84-d46e-46d2-897b-501f6a5dbc34.png',
  'home-service-regenerative-beauty':'exec-47d09a4c-8d38-4aa2-a8c5-5d33bd0f391b.png',
  'home-method-prp-platelets':'exec-85f8db0c-6c13-495d-810d-7000ee255ff1.png',
  'home-method-cell-therapy':'exec-0bfae7c8-02fd-48cf-8501-01457263230d.png',
  'home-method-exosomes':'exec-52e4aa20-a85a-4dc0-b120-58c124af826e.png',
  'home-journey-concern':'exec-4967e216-ce44-407b-bd95-950231df59ad.png',
  'home-journey-options-doctor':'exec-5b83b950-b8fb-4fee-8867-7de9303988bd.png',
  'home-journey-decision-followup':'exec-a332a377-79fc-4956-8405-816f0a4a99cb.png',
  'home-journal-regenerative':'exec-cf9c171a-85de-42d7-a59e-f620698dd1f4.png'
};
const reviews={
  'home-service-prp-young-adult':'Accepted: fair cool-neutral skin retains pores and tonal variation; late sun creates clear cheek shadow and hair rim; dense hair and natural hand are crop-safe; no text.',
  'home-service-mesogel-curly-headband':'Accepted: warm bronze complexion, defined brows/lashes, scarf headband and curls are distinct; cool window and warm practical separate the face and hair; jar and hands are plausible; no text.',
  'home-service-cell-based-happy-teen':'Accepted: youthful happy Persian subject with medium-olive skin, natural styling and open-shade sun bounce; no school cues, text or anatomy defects in the intended crop.',
  'home-service-regenerative-beauty':'Accepted: porous biomaterial, glass dish, unbranded serum and curved mirror clearly connect regenerative research with beauty; refraction and shadows are plausible; no text.',
  'home-method-prp-platelets':'Accepted as scientific editorial visualization: small granular platelet cluster is distinct from larger biconcave red cells and remains readable in a narrow card crop; no labels.',
  'home-method-cell-therapy':'Accepted: culture dish, adherent cell colonies, gloved hand and pipette form a credible laboratory scene; glass and shadows are coherent; no readable labels.',
  'home-method-exosomes':'Accepted as scientific editorial visualization: budding membrane and released extracellular vesicles have a clear scale hierarchy and strong narrow-card crop; no labels.',
  'home-journey-concern':'Accepted: deeper bronze natural skin, mild cheek blemishes and hairline inspection communicate the concern immediately; mixed light preserves texture; hands and partial reflection are coherent.',
  'home-journey-options-doctor':'Accepted: polished Persian woman doctor is visibly checking an open patient file; page contains no readable personal data; window and desk bounce model face and hands cleanly.',
  'home-journey-decision-followup':'Accepted: doctor and highly enhanced but plausible patient review a shared plan and calendar; fuller lips, defined brows/lashes and mixed warm/cool light are visible; no readable personal data.',
  'home-journal-regenerative':'Accepted: tissue scaffold and attached cell pattern directly express regenerative medicine; glass, forceps and directional macro light are coherent; central crop supports the cover title.'
};
const hash=path=>createHash('sha256').update(readFileSync(path)).digest('hex');
const publicRoot='public/media/clinic-photography-v2/home';
const originalRoot='assets/clinic-photography/homepage-feedback-2026-10-15';
mkdirSync(publicRoot,{recursive:true});
mkdirSync(originalRoot,{recursive:true});

for(const job of ledger.jobs){
  const filename=sources[job.id];
  if(!filename)throw new Error('Missing source mapping: '+job.id);
  const source=generatedRoot+'/'+filename;
  if(!existsSync(source))throw new Error('Missing generated source: '+source);
  const original=originalRoot+'/'+job.id+'.png';
  copyFileSync(source,original);
  const info=await sharp(original).metadata();
  const src='/media/clinic-photography-v2/home/'+job.id+'.webp';
  const thumbnail='/media/clinic-photography-v2/home/'+job.id+'-800.webp';
  const full=await sharp(original).rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:85,effort:6}).toFile('public'+src);
  const thumb=await sharp(original).rotate().resize({width:800,withoutEnlargement:true}).webp({quality:82,effort:6}).toFile('public'+thumbnail);
  Object.assign(job,{source,original,tool:'built-in image_gen',status:'accepted',review:reviews[job.id],originalWidth:info.width,originalHeight:info.height,src,thumbnail,width:full.width,height:full.height,thumbnailWidth:thumb.width,thumbnailHeight:thumb.height,bytes:full.size,thumbnailBytes:thumb.size,sha256:hash(original),webpSha256:hash('public'+src),thumbnailSha256:hash('public'+thumbnail)});
}
writeFileSync(ledgerPath,JSON.stringify(ledger,null,2)+'\n');

const cols=4,cellW=280,cellH=310;
const composites=[];
for(let index=0;index<ledger.jobs.length;index++){
  const job=ledger.jobs[index],x=(index%cols)*cellW,y=Math.floor(index/cols)*cellH;
  composites.push({input:await sharp('public'+job.src).resize(280,280,{fit:'cover',position:'centre'}).toBuffer(),left:x,top:y});
  const label='<svg width="280" height="30"><rect width="280" height="30" fill="#fbfaf8"/><text x="8" y="20" font-family="Arial" font-size="12" fill="#332f30">'+job.id+'</text></svg>';
  composites.push({input:Buffer.from(label),left:x,top:y+280});
}
const rows=Math.ceil(ledger.jobs.length/cols);
mkdirSync('output/playwright/clinic-photography',{recursive:true});
await sharp({create:{width:cols*cellW,height:rows*cellH,channels:3,background:'#fbfaf8'}}).composite(composites).png().toFile('output/playwright/clinic-photography/homepage-feedback-contact-sheet.png');

console.log(JSON.stringify({masters:ledger.jobs.length,fullBytes:ledger.jobs.reduce((sum,job)=>sum+job.bytes,0),thumbnailBytes:ledger.jobs.reduce((sum,job)=>sum+job.thumbnailBytes,0),contactSheet:'output/playwright/clinic-photography/homepage-feedback-contact-sheet.png',images:ledger.jobs.map(job=>({id:job.id,width:job.width,height:job.height,bytes:job.bytes,src:job.src}))},null,2));
