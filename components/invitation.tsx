import {CTA} from './shell';
import {SectionLabel} from './section-label';

/** Shared closing chapter, including contextual service links. */
export function Invitation({home=false,category,contactPage=false}:{home?:boolean;category?:string;contactPage?:boolean}){
  return <section id="invitation" className={'invitation section-space '+(home?'cover-chapter':'site-invitation')} data-cover-chapter={home||undefined} data-chapter={home||undefined} aria-labelledby="invitation-title">
    <div className="cover-stage"><div className="page-width invitation-grid">
      <figure className="invitation-image" data-parallax data-depth-box="visual"><img src="/media/lounge.webp" alt="تصویر مفهومی سالن انتظار الورا" loading="lazy" width="1672" height="941"/><figcaption>تصویر مفهومی فضای الورا</figcaption></figure>
      <div className="invitation-copy" data-depth-box="near">{!home&&<SectionLabel>دیدار</SectionLabel>}<h2 id="invitation-title" data-cover-title>
        <span className="cover-title-line"><span>{home?'با پرسش‌های روشن،':'از چیزی بگویید'}</span></span>
        <span className="cover-title-line"><span><em>{home?'به مشاوره بروید.':'که برایتان مهم است.'}</em></span></span>
      </h2><p className="cover-body" data-text-reveal>{home?'راهنمای مراجعه کمک می‌کند دغدغه‌ها و پرسش‌های خود را آماده کنید.':<>از پوست و مو تا تغییرات چهره؛<br/>برای گفت‌وگو نیازی به انتخاب درمان ندارید.</>}</p><div className="cover-body"><CTA contact={!contactPage&&!home} href={home||contactPage?'/care':'/contact'+(category?'?care='+category:'')}>{home?'راهنمای اولین مراجعه':contactPage?'آمادگی برای اولین مشاوره':undefined}</CTA></div>{!home&&<span className="invitation-foot cover-body">با احترام به زمان، انتخاب و حریم شما.</span>}</div>
    </div></div>
  </section>;
}
