import {CTA} from './shell';
import {careHref} from '@/lib/care-content';

/** One consistent next step, with the reader's service context preserved. */
export function Invitation({home=false,category,service}:{home?:boolean;category?:string;service?:string}){
  return <section id="invitation" className={'invitation section-space '+(home?'cover-chapter':'site-invitation')} data-cover-chapter={home||undefined} data-chapter={home||undefined} aria-labelledby="invitation-title">
    <div className="cover-stage"><div className="page-width invitation-grid">
      <figure className="invitation-image" data-parallax data-depth-box="visual"><img src="/media/lounge-elvitha.webp" alt="تصویر مفهومی سالن انتظار الویتا" loading="lazy" width="1672" height="941"/><figcaption>تصویر مفهومی فضای الویتا</figcaption></figure>
      <div className="invitation-copy" data-depth-box="near"><h2 id="invitation-title" data-cover-title>
        <span className="cover-title-line"><span>از دغدغهٔ خود</span></span>
        <span className="cover-title-line"><span><em>شروع کنید.</em></span></span>
      </h2><p className="cover-body" data-text-reveal>{service?'راهنمای آمادگی را ببینید و پرسش‌هایتان دربارهٔ این روش را برای مشاوره آماده کنید.':'موضوعتان را انتخاب کنید؛ راهنمای مرتبط و پرسش‌های اولین مشاوره را یک‌جا ببینید.'}</p><div className="cover-body"><CTA href={careHref(category,service)}>از کجا شروع کنم؟</CTA></div><p className="invitation-status cover-body">نوبت‌گیری الویتا هنوز فعال نیست.</p></div>
    </div></div>
  </section>;
}
