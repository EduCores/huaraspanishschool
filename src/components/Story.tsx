'use client';

import { useSite } from './SiteContext';

export default function Story() {
  const { c, locale } = useSite();
  const paragraphs = c.story.paragraphs[locale];
  return (
    <div className="container reveal" id="historia">
      <div className="story">
        <p className="story-eyebrow">{c.story.eyebrow[locale]}</p>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <p className="story-sign">{c.story.sign[locale]}</p>
        <p className="story-name">{c.story.name}</p>
      </div>
    </div>
  );
}
