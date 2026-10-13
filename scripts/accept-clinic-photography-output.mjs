import {copyFileSync,existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {dirname,resolve} from 'node:path';

const require=createRequire('C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/');
const sharp=require('sharp');
const groups=['services','journal-a','journal-b','environments'];
const args=Object.fromEntries(process.argv.slice(2).map(value=>{
  const index=value.indexOf('=');
  return index<0?[value,true]:[value.slice(0,index),value.slice(index+1)];
}));

if(!args['--id']||!args['--source']||!args['--review']){
  throw new Error('Usage: node scripts/accept-clinic-photography-output.mjs --id=... --source=... --review=... [--replace]');
}

const source=resolve(args['--source']);
if(!existsSync(source))throw new Error('Generated source does not exist: '+source);

let match;
for(const group of groups){
  const path='docs/clinic-photography/'+group+'.json';
  const batch=JSON.parse(readFileSync(path,'utf8').replace(/^\uFEFF/,''));
  const planned=batch.plannedJobs.find(job=>job.id===args['--id']);
  if(planned){match={group,path,batch,planned};break;}
}
if(!match)throw new Error('Unknown planned job: '+args['--id']);
const existingIndex=match.batch.jobs.findIndex(job=>job.id===args['--id']);
if(existingIndex>=0&&!args['--replace'])throw new Error('Job already accepted: '+args['--id']);

const base=existingIndex>=0?match.batch.jobs[existingIndex]:match.planned;
const original=base.intendedOriginal||base.original;
if(!original)throw new Error('Planned job has no project original path: '+args['--id']);
mkdirSync(dirname(original),{recursive:true});
copyFileSync(source,original);
const metadata=await sharp(original).metadata();
const sha256=createHash('sha256').update(readFileSync(original)).digest('hex');
const job={
  ...base,
  original,
  source,
  sourceSha256:sha256,
  originalWidth:metadata.width,
  originalHeight:metadata.height,
  review:args['--review'],
  status:'accepted',
  acceptedAt:new Date().toISOString(),
  tool:'built-in image_gen'
};
delete job.intendedOriginal;
if(existingIndex>=0)match.batch.jobs[existingIndex]=job;
else match.batch.jobs.push(job);
writeFileSync(match.path,JSON.stringify(match.batch,null,2)+'\n');
console.log(JSON.stringify({id:job.id,batch:match.group,source,original,width:metadata.width,height:metadata.height,sha256}));
