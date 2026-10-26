'use client';

import { useSite } from './SiteContext';
import { useEffect, useState } from 'react';

const SLIDER_IMAGES = [
  '/slider/hero-mar_1.jpg',
  '/slider/hero-mar_2.jpg',
  '/slider/hero-mar_3.jpg',
  '/slider/hero-mar_4.jpg',
];

export default function Hero() {
  const { c, locale } = useSite();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goShop = () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="hero">
      <div className="hero-slider">
        {SLIDER_IMAGES.map((src, index) => (
          <div
            key={src}
            className={`hero-slide${index === current ? ' active' : ''}`}
          >
            <img src={src} alt={`Pichilemu ${index + 1}`} />
          </div>
        ))}
        <div className="hero-dots">
          {SLIDER_IMAGES.map((_, index) => (
            <button
              key={index}
              className={`hero-dot${index === current ? ' active' : ''}`}
              onClick={() => setCurrent(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
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
