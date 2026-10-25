'use client';

import { useSite } from './SiteContext';

export default function CookieBar() {
  const { t, showCookieBar, setConsent } = useSite();
  return (
    <div
      className={`ck${showCookieBar ? ' show' : ''}`}
      role="dialog"
      aria-live="polite"
      aria-label="Cookies"
    >
      <p dangerouslySetInnerHTML={{ __html: t.cookieText }} />
      <div className="ck-btns">
        <button className="ck-no" onClick={() => setConsent('no')}>
          {t.onlyNecessary}
        </button>
        <button className="ck-yes" onClick={() => setConsent('yes')}>
          {t.accept}
        </button>
      </div>
    </div>
  );
}
