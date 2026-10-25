'use client';

import { useSite } from './SiteContext';

export default function Hero() {
  const { c, locale } = useSite();
  const goShop = () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="hero">
      <div className="hero-bg">
        <img src={c.hero.img} alt="Sunset over the sea in Pichilemu" />
      </div>
      <div className="hero-content">
        <div className="eyebrow">
          <i />
          <span>{c.hero.eyebrow[locale]}</span>
        </div>
        <h1>
          <span>{c.hero.title1[locale]}</span> <u>{c.hero.title2[locale]}</u>
        </h1>
        <p className="sub" dangerouslySetInnerHTML={{ __html: c.hero.sub[locale] }} />
        <div className="hero-ctas">
          <button className="btn-pill btn-white" onClick={goShop}>
            <span>{c.hero.cta1[locale]}</span>
          </button>
          <a className="link-arrow" href="#casa" style={{ color: '#fff' }}>
            <span>{c.hero.cta2[locale]}</span> →
          </a>
        </div>
      </div>
    </div>
  );
}
