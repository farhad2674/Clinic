import {mkdirSync,copyFileSync,readFileSync,writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {spawnSync} from 'node:child_process';
const require=createRequire('C:/Users/Farhad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/');
const sharp=require('sharp');
const manifest=JSON.parse(readFileSync('docs/portrait-turn-prompts.json','utf8').replace(/^\uFEFF/,''));
for(const folder of ['assets/portrait-turn/originals','assets/portrait-turn/keyframes','assets/portrait-turn/frames','public/media/portrait-turn'])mkdirSync(folder,{recursive:true});
for(const [i,job] of manifest.frames.entries()){
 const original=`assets/portrait-turn/originals/${String(i).padStart(2,'0')}-${job.angle}.png`;
 copyFileSync(job.generatedSource,original);
 const keyframe=`assets/portrait-turn/keyframes/${String(i).padStart(2,'0')}.png`;
 const info=await sharp(original).resize(720,960,{fit:'cover'}).png().toFile(keyframe);
 Object.assign(job,{original,keyframe,width:info.width,height:info.height});
}
const last=manifest.frames.length-1;
for(let i=1;i<=2;i++)copyFileSync(manifest.frames[last].keyframe,`assets/portrait-turn/keyframes/${String(last+i).padStart(2,'0')}.png`);
function ffmpeg(args){const r=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y',...args],{stdio:'inherit'});if(r.status!==0)throw Error(`ffmpeg exit ${r.status}`)}
// Motion-compensated in-betweens, with scene-cut detection disabled for authored keyframes.
ffmpeg(['-framerate','1','-i','assets/portrait-turn/keyframes/%02d.png','-vf','minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:me=umh:search_param=64:vsbmc=1:scd=none','-t',String(last+.5),'-an','-c:v','libx264','-crf','19','-preset','slow','-g','6','-keyint_min','6','-sc_threshold','0','-pix_fmt','yuv420p','-movflags','+faststart','public/media/portrait-turn/portrait-turn.mp4']);
await sharp(manifest.frames[0].original).resize({width:1080,withoutEnlargement:true}).webp({quality:86}).toFile('public/media/portrait-turn/poster.webp');
ffmpeg(['-i','public/media/portrait-turn/portrait-turn.mp4','-c:v','libwebp','-quality','86','assets/portrait-turn/frames/%04d.webp']);
const thumbs=await Promise.all(manifest.frames.map(j=>sharp(j.original).resize(180,240).toBuffer()));
await sharp({create:{width:thumbs.length*180,height:240,channels:3,background:'#F8ECEE'}}).composite(thumbs.map((input,i)=>({input,left:i*180,top:0}))).png().toFile('assets/portrait-turn/contact-sheet.png');
manifest.output={video:'public/media/portrait-turn/portrait-turn.mp4',poster:'public/media/portrait-turn/poster.webp',frames:'assets/portrait-turn/frames',fps:24,width:720,height:960,duration:last+.5,interpolation:'FFmpeg motion-compensated optical-flow in-betweens; not native video generation'};
writeFileSync('docs/portrait-turn-prompts.json',JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify(manifest.output));

