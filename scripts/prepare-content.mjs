import {readFileSync,writeFileSync} from 'node:fs';
const md=readFileSync(new URL('../docs/handoff.md',import.meta.url),'utf8').replace(/\r/g,'');
const section=n=>md.split(new RegExp('^## '+n+'\\.','m'))[1]?.split(/^## \d+\./m)[0]??'';
const clean=t=>t.replace(/\*\*/g,'').replace(/^>\s?/gm,'').trim();
const paragraphs=t=>[...t.matchAll(/^> (.+)$/gm)].map(m=>clean(m[1]));
const slugs=['acne','acne-scars','pigmentation','hair-loss','scalp-health','natural-rejuvenation','rejuvenation-45','botox','fillers','microneedling','prp','prf','exosomes','cell-based'];
const groups=['skin','skin','skin','hair','hair','rejuvenation','rejuvenation','rejuvenation','rejuvenation','skin','advanced','advanced','advanced','advanced'];
const services=section(14).split(/^### 14\.\d+ /m).slice(1).map((t,i)=>({
slug:slugs[i],category:groups[i],title:clean(t.match(/\*\*Page title:\*\* (.+)/)?.[1]??''),
heading:clean(t.match(/\*\*Heading:\*\* (.+)/)?.[1]??''),
body:paragraphs(t),cta:clean(t.match(/\*\*CTA:\*\* (.+)/)?.[1]??''),reviewStatus:'draft'
}));
const faq=section(17).split(/^### /m).slice(1).map(t=>({question:t.split('\n')[0].trim(),answer:paragraphs(t).join('\n')}));
const journey=section(15).split(/^### Step \d+: /m).slice(1).map(t=>({title:t.split('\n')[0].trim(),body:paragraphs(t).join('\n')}));
const articles=section(16).split('### Initial article titles')[1].split('### Editorial rules')[0].split('\n').filter(t=>t.startsWith('- ')).map(t=>t.slice(2));
const charter=section(5).split('\n').filter(t=>/^\d+\./.test(t)).map(t=>t.replace(/^\d+\.\s*/,''));
const about=paragraphs(section(12));
const disclaimer=paragraphs(section(20)).at(-1);
if(services.length!==14||faq.length!==7||journey.length!==6)throw Error('Source content incomplete');
writeFileSync(new URL('../lib/content.json',import.meta.url),JSON.stringify({services,faq,journey,articles,charter,about,disclaimer},null,2));
console.log('Extracted 14 services, 7 FAQs, 6 care stages and 10 journal topics from the supplied handoff.');
