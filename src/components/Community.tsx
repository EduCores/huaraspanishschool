'use client';

import { useSite } from './SiteContext';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './Icons';
import { shareOnWhatsApp } from '@/lib/utils';

export default function Community() {
  const { c, locale, t, consent, setConsent } = useSite();
  const [mainReview, ...moreReviews] = c.community.reviews;

  const shareSite = () => {
    shareOnWhatsApp(`${t.shareSitePrefix}${window.location.href}`);
  };

  return (
    <div className="container reveal" id="casa">
      <div className="social-head">
        <div>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '.14em' }}>
            {c.community.eyebrow[locale]}
          </p>
          <h2>{c.community.heading[locale]}</h2>
          <a
            className="score"
            href={c.reviews.googleUrl}
            target="_blank"
            rel="noopener"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <strong>{c.reviews.score}</strong>
            <span className="real-stars" style={{ margin: 0 }}>
              ★★★★★
            </span>
            <small>{t.reviewsOnGoogle(c.reviews.count)}</small>
          </a>
          <div className="plats">
            <a
              href={c.social.instagram}
              target="_blank"
              rel="noopener"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <span>
                <InstagramIcon /> @huaraspanishschool
              </span>
            </a>
            <a
              href={c.social.facebook}
              target="_blank"
              rel="noopener"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <span>
                <FacebookIcon /> huaraspanishschool
              </span>
            </a>
          </div>
        </div>
        <div className="social-cta">
          <a className="btn-pill btn-dark" href={c.reviews.writeUrl} target="_blank" rel="noopener">
            <span>{t.reviewUs}</span>
          </a>
          <button className="btn-pill" style={{ background: '#25d366', color: '#fff' }} onClick={shareSite}>
            <WhatsAppIcon style={{ width: '18px', height: '18px', flexShrink: 0 }} fill="#fff" />
            <span>{t.shareSite}</span>
          </button>
        </div>
      </div>

      {mainReview ? (
        <div className="real-rev">
          <article className="rev post real-post">
            <div className="post-head">
              <span className="ig-ava">
                <b>H</b>
              </span>
              <div>
                <strong>{mainReview.author[locale]}</strong>
                <small>{mainReview.meta[locale]}</small>
              </div>
            </div>
            <div className="real-stars">★★★★★</div>
            <p className="pq">&ldquo;{mainReview.quote}&rdquo;</p>
            <div className="post-foot">
              <button
                className="shareb"
                onClick={() =>
                  shareOnWhatsApp(
                    `${t.shareReviewPrefix}"${mainReview.quote}" — ${mainReview.author[locale]}`,
                  )
                }
              >
                <span>{t.share}</span> ↗
              </button>
            </div>
          </article>
          <div className="real-photos">
            {c.community.photos.map((photo) => (
              <figure key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <figcaption>{photo.caption[locale]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      ) : null}

      <div className="more-revs">
        {moreReviews.map((review, index) => (
          <article className="rev post" key={review.id}>
            <div className="post-head">
              <span className="ig-ava">
                <b>H</b>
              </span>
              <div>
                <strong>{review.author[locale]}</strong>
                <small>{review.meta[locale]}</small>
              </div>
            </div>
            <div className="real-stars">★★★★★</div>
            <p className="pq">&ldquo;{review.quote}&rdquo;</p>
            <div className="post-foot">
              <button
                className="shareb"
                onClick={() =>
                  shareOnWhatsApp(
                    `${t.shareReviewPrefix}"${review.quote}" — ${review.author[locale]}`,
                  )
                }
              >
                <span>{t.share}</span> ↗
              </button>
              {index === moreReviews.length - 1 ? (
                <a className="via" href={c.reviews.googleUrl} target="_blank" rel="noopener">
                  {t.seeAllGoogle}
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <div className="ig-head">
        <span className="ig-ava">
          <b>H</b>
        </span>
        <div>
          <strong>huaraspanishschool</strong>
          <small>{t.igSubtitle}</small>
        </div>
        <a
          className="btn-pill btn-dark ig-follow"
          style={{ padding: '11px 22px' }}
          href={c.social.instagram}
          target="_blank"
          rel="noopener"
        >
          <span>{t.follow}</span>
        </a>
      </div>
      <div className="ig-grid">
        {c.community.instagram.map((image) => (
          <a
            className="ig-item"
            key={image.src}
            href={c.social.instagram}
            target="_blank"
            rel="noopener"
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
          </a>
        ))}
      </div>

      <div className="ig-head">
        <span className="ig-ava" style={{ background: 'linear-gradient(45deg,#1c6e8c,#0e4457)' }}>
          <b>f</b>
        </span>
        <div>
          <strong>huaraspanishschool</strong>
          <small>{t.fbSubtitle}</small>
        </div>
        <a
          className="btn-pill btn-dark ig-follow"
          style={{ padding: '11px 22px' }}
          href={c.social.facebook}
          target="_blank"
          rel="noopener"
        >
          <span>{t.follow}</span>
        </a>
      </div>
      <div className="fb-row">
        {c.community.facebook.map((url, index) => (
          <div className="fb-post" key={url}>
            {consent === 'yes' ? (
              <iframe
                src={url}
                loading="lazy"
                width="340"
                height="560"
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title={`Huara en Facebook ${index + 1}`}
              />
            ) : (
              <div className="fb-ph">
                <span>{t.fbPlaceholder}</span>
                <button type="button" onClick={() => setConsent('yes')}>
                  {t.showPosts}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
