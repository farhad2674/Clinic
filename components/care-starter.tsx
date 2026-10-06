'use client';
import {useEffect,useRef,useState} from 'react';
import {careTopics,findCareTopic,type CareLink,type CareTopicId} from '@/lib/care-content';
import {Arrow} from './shell';

type Props={initialTopic?:CareTopicId;initialGuide?:CareLink;initialArticle?:CareLink;initialService?:string;initialPreparation?:string;initialQuestions?:string[]};
export function CareStarter({initialTopic,initialGuide,initialArticle,initialService,initialPreparation,initialQuestions}:Props){
  const [selected,setSelected]=useState(initialTopic);
  const [context,setContext]=useState(true);
  const result=useRef<HTMLHeadingElement>(null);
  const focusResult=useRef(false);
  const topic=findCareTopic(selected);
  const serviceContext=context&&Boolean(initialService&&initialGuide);
  const guide=serviceContext?initialGuide:topic?.guide;
  const article=serviceContext&&initialArticle?initialArticle:topic?.article;

  useEffect(()=>{
    if(!focusResult.current||!result.current)return;
    focusResult.current=false;
    result.current.focus({preventScroll:true});
    result.current.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  },[selected,context]);
  function choose(event:React.MouseEvent<HTMLAnchorElement>,id:CareTopicId){
    if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    if(id===selected&&!context){result.current?.focus();return}
    focusResult.current=true;setContext(false);setSelected(id);
    window.history.replaceState(window.history.state,'','/care?topic='+id);
  }

  const preparation=topic&&<div className="care-checklist"><h3>برای گفت‌وگو آماده کنید</h3>
    {serviceContext?<><p>{initialPreparation}</p><h3>دربارهٔ این روش بپرسید</h3><ul>{initialQuestions?.map(question=><li key={question}>{question}</li>)}</ul></>:<ul>{topic.prepare.map(item=><li key={item}>{item}</li>)}</ul>}
    <a href="#preparation" className="text-link">پرسش‌های مشترک پیش از تصمیم <Arrow/></a>
  </div>;
  const reading=guide&&article&&<div className="care-reading">
    {!serviceContext&&<a href={guide.href}><span>راهنمای اصلی</span><h3>{guide.label}</h3><Arrow/></a>}
    <a href={article.href}><span>مطالعهٔ بیشتر</span><h3>{article.label}</h3><Arrow/></a>
    {serviceContext&&<a href={guide.href} className="care-back">بازگشت به راهنمای {guide.label} <Arrow/></a>}
  </div>;
  const resultSection=topic&&guide&&article&&<section className="care-result" aria-labelledby="care-result-title">
    <div className="care-result-intro"><h2 ref={result} tabIndex={-1} id="care-result-title">{serviceContext?'آمادگی برای گفت‌وگو دربارهٔ '+guide.label:topic.label}</h2>{!serviceContext&&<p>{topic.intro}</p>}</div>
    <div className="care-result-grid">{serviceContext?<>{preparation}{reading}</>:<>{reading}{preparation}</>}</div>
  </section>;
  return <section className="care-start" aria-labelledby={serviceContext?'care-result-title':'care-choice-title'}>
    {serviceContext&&resultSection}
    <div className="care-choice-head"><h2 id="care-choice-title">{serviceContext?'موضوع دیگری مدنظرتان است؟':'موضوع شما چیست؟'}</h2></div>
    <nav className="care-choices" aria-label="انتخاب موضوع راهنما">
      {careTopics.filter(t=>t.id!=='general').map((t,i)=><a href={'/care?topic='+t.id} key={t.id} aria-current={selected===t.id?'true':undefined} onClick={e=>choose(e,t.id)}><span className="care-choice-number" aria-hidden="true">{['۰۱','۰۲','۰۳','۰۴'][i]}</span><span>{t.label}</span><Arrow/></a>)}
    </nav>
    <a className="care-unsure text-link" href="/care?topic=general" aria-current={selected==='general'?'true':undefined} onClick={e=>choose(e,'general')}>هنوز مطمئن نیستم <Arrow/></a>
    {!serviceContext&&resultSection}
  </section>;
}
