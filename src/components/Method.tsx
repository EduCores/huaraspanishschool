'use client';

import { useSite } from './SiteContext';
import { BagIcon, ChatIcon, CompassIcon, PotIcon } from './Icons';

const icons = {
  chat: <ChatIcon />,
  pot: <PotIcon />,
  bag: <BagIcon />,
  compass: <CompassIcon />,
};

export default function Method() {
  const { c, locale, t } = useSite();
  return (
    <div className="container reveal" id="metodo">
      <div className="method-panel">
        <p className="eyebrow-lite">
          ● <span>{t.methodEyebrow}</span>
        </p>
        <h2 style={{ fontSize: 'clamp(34px,4.5vw,58px)', margin: '10px 0' }}>
          {t.methodTitle}
        </h2>
        <p className="sub">{t.methodLead}</p>
        <div className="met4">
          {c.method.map((item) => (
            <div className="m-item" key={item.num}>
              <div className="m-top">
                <span className="m-num">{item.num}</span>
                <span className="m-ico">{icons[item.icon]}</span>
              </div>
              <strong>{item.title[locale]}</strong>
              <p>{item.desc[locale]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
