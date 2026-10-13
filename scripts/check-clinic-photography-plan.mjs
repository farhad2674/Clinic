import {expectedPhotography as expected} from './clinic-photography-contract.mjs';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const groups=['services','journal-a','journal-b','environments'];

const batches=groups.map(group=>({group,...JSON.parse(readFileSync('docs/clinic-photography/'+group+'.json','utf8').replace(/^\uFEFF/,''))}));
const planned=batches.flatMap(b=>b.plannedJobs??b.jobs),accepted=batches.flatMap(b=>b.jobs);
const checks=[];const check=(name,pass,details)=>checks.push({name,pass,details});
check('42 unique briefs',planned.length===42&&new Set(planned.map(j=>j.id)).size===42,planned.length);
for(const [kind,slugs] of Object.entries(expected)){
 const actual=planned.filter(j=>j.kind===kind).map(j=>j.slug);
 check('Exact '+kind+' coverage',actual.length===slugs.length&&slugs.every(s=>actual.includes(s)),{expected:slugs.length,actual:actual.length});
}
for(const job of planned){
 check('Three materially distinct concepts: '+job.id,Array.isArray(job.concepts)&&job.concepts.length===3&&new Set(job.concepts.map(c=>typeof c==='string'?c:JSON.stringify(c))).size===3);
 check('Actionable prompt and scene: '+job.id,typeof job.prompt==='string'&&job.prompt.length>200&&!!job.topicSummary&&!!job.selectionReason&&['warm','cool','balanced'].includes(job.scene?.temperature));
 check('Persian alt and caption: '+job.id,/[\u0600-\u06ff]/.test(job.alt||'')&&/[\u0600-\u06ff]/.test(job.caption||''));
}
check('Accepted jobs are reviewed known topics',accepted.every(j=>expected[j.kind]?.includes(j.slug)&&j.id===j.kind+'-'+j.slug&&!!j.review&&!!j.source&&!!j.original));
check('Accepted topics are unique',new Set(accepted.map(j=>j.kind+'/'+j.slug)).size===accepted.length);
const report={checkedAt:new Date().toISOString(),planned:planned.length,accepted:accepted.length,temperature:planned.reduce((a,j)=>(a[j.scene?.temperature]=(a[j.scene?.temperature]||0)+1,a),{}),checks};
mkdirSync('output/playwright/clinic-photography',{recursive:true});
writeFileSync('output/playwright/clinic-photography/brief-audit.json',JSON.stringify(report,null,2)+'\n');
writeFileSync('docs/clinic-photography/plan.json',JSON.stringify({version:1,status:accepted.length===42?'ready-for-final-review':'awaiting-image-generation',expected:42,accepted:accepted.length,tool:'built-in image_gen',batches:groups.map(g=>'docs/clinic-photography/'+g+'.json'),plannedJobs:planned},null,2)+'\n');
console.log(JSON.stringify({planned:report.planned,accepted:report.accepted,temperature:report.temperature,passed:checks.filter(c=>c.pass).length,failures:checks.filter(c=>!c.pass)},null,2));
if(checks.some(c=>!c.pass))process.exitCode=1;

