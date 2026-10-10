export function BrandEmblem({className=''}:{className?:string}) {
  return <svg className={'elvitha-emblem '+className} viewBox="0 0 72 72" fill="none" aria-hidden="true" focusable="false">
    <path className="elvitha-emblem-e" d="M15 17v38m0-38h23M15 35h18M15 55h24" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"/>
    <path className="elvitha-emblem-petal" d="M27 18c1.8 15.5 7 28.2 15 37 9.3-11.5 14.8-25.9 14.5-40-13.3 4-20 13-20 25.5" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"/>
    <circle className="elvitha-emblem-seed" cx="47.5" cy="9" r="1.8" fill="currentColor"/>
  </svg>;
}

export function BrandLogo({className=''}:{className?:string}) {
  return <span className={'wordmark brand-logo '+className} lang="en" dir="ltr" role="img" aria-label="ELVITHA — الویتا">
    <BrandEmblem/>
    <span className="elvitha-wordmark" aria-hidden="true">ELVITHA</span>
  </span>;
}
