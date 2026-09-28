import type {ReactNode} from 'react';

// Decorative chapter names scroll with their section and stay outside the reading order.
export function SectionLabel({children}:{children:ReactNode}) {
  return <div className="section-label" aria-hidden="true"><span>{children}</span></div>;
}
