'use client';

import { useSite } from './SiteContext';

export default function BigMarquee() {
  const { c } = useSite();
  const items = [...c.marquee, ...c.marquee, ...c.marquee, ...c.marquee];
  return (
    <div className="big-marquee" aria-hidden="true">
      <div>
        {items.map((word, index) => (
          <span key={`${word}-${index}`} className={index % 3 === 0 ? undefined : 'o'}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
