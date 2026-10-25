'use client';

import { useState } from 'react';
import type { CheckoutData } from '@/lib/checkout';
import { emailOk, lineTotal, unitText } from '@/lib/utils';
import { useSite } from './SiteContext';

type Props = {
  onCheckout: (data: CheckoutData) => void;
};

export default function CheckoutForm({ onCheckout }: Props) {
  const { c, locale, t, cart, totals, count } = useSite();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modality, setModality] = useState('pres-grupal');
  const [date, setDate] = useState('');
  const [level, setLevel] = useState('basic');
  const [acc, setAcc] = useState(t.acc2);
  const [prog, setProg] = useState(t.prog8h);
  const [tz, setTz] = useState(t.tzEurope);
  const [notes, setNotes] = useState('');
  const [invalidName, setInvalidName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const isPres = modality.startsWith('pres');
  const modalityOptions = [
    { value: 'pres-grupal', label: t.modPresGroup },
    { value: 'pres-priv', label: t.modPresPriv },
    { value: 'online-grupal', label: t.modOnlineGroup },
    { value: 'online-priv', label: t.modOnlinePriv },
  ];
  const levelOptions = [
    { value: 'basic', label: t.levelBasic },
    { value: 'inter', label: t.levelInter },
    { value: 'adv', label: t.levelAdv },
  ];

  const submit = () => {
    if (!count()) {
      onCheckout({
        name,
        email,
        modality,
        modalityLabel: '',
        levelLabel: '',
        date,
        notes,
        isPres,
        acc,
        prog,
        tz,
      });
      return;
    }
    const validName = Boolean(name.trim());
    const validEmail = emailOk(email.trim());
    setInvalidName(!validName);
    setInvalidEmail(!validEmail);
    if (!validName || !validEmail) return;
    onCheckout({
      name: name.trim(),
      email: email.trim(),
      modality,
      modalityLabel: modalityOptions.find((item) => item.value === modality)?.label || '',
      levelLabel: levelOptions.find((item) => item.value === level)?.label || '',
      date,
      notes: notes.trim(),
      isPres,
      acc,
      prog,
      tz,
    });
  };

  return (
    <div className="checkout" id="booking">
      <h3>
        🛒 <span>{t.yourOrder}</span>
      </h3>
      <div style={{ margin: '12px 0' }}>
        {Object.keys(cart).length ? (
          Object.entries(cart).map(([id, qty]) => {
            const program = c.programs.find((item) => item.id === id);
            if (!program) return null;
            return (
              <div className="sum-line" key={id}>
                <span>
                  {program.title[locale]} · {unitText(program, qty, t)}
                </span>
                <b>${lineTotal(program, qty)}</b>
              </div>
            );
          })
        ) : (
          <p style={{ opacity: 0.6, fontSize: '13px' }}>{t.orderEmpty}</p>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
          fontFamily: "'Archivo'",
          fontWeight: 800,
          fontSize: '22px',
          margin: '10px 0',
        }}
      >
        <span>{t.total}</span>
        <span>${totals()}</span>
      </div>
      <div className="field">
        <label>{t.fullName}</label>
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (invalidName) setInvalidName(false);
          }}
          className={invalidName ? 'invalid' : undefined}
          placeholder="Lena Müller"
        />
      </div>
      <div className="field">
        <label>{t.email}</label>
        <input
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (invalidEmail) setInvalidEmail(false);
          }}
          className={invalidEmail ? 'invalid' : undefined}
          placeholder="lena@email.com"
          type="email"
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div className="field">
          <label>{t.modality}</label>
          <select value={modality} onChange={(event) => setModality(event.target.value)}>
            {modalityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>{t.start}</label>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
      </div>
      <div className="field">
        <label>{t.level}</label>
        <select value={level} onChange={(event) => setLevel(event.target.value)}>
          {levelOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {isPres ? (
        <div>
          <p style={{ fontSize: '12px', opacity: 0.65, margin: '12px 0 0' }}>🕒 {t.classesHours}</p>
          <div className="field">
            <label>{t.weeksAcc}</label>
            <select value={acc} onChange={(event) => setAcc(event.target.value)}>
              <option>{t.acc2}</option>
              <option>{t.acc1}</option>
              <option>{t.acc4}</option>
              <option>{t.accNone}</option>
            </select>
          </div>
        </div>
      ) : (
        <div>
          <div className="field">
            <label>{t.onlineProgram}</label>
            <select value={prog} onChange={(event) => setProg(event.target.value)}>
              <option>{t.prog8h}</option>
              <option>{t.progHour}</option>
            </select>
          </div>
          <p style={{ fontSize: '12px', opacity: 0.65, margin: '0 0 4px' }}>📄 {t.pdfGuide}</p>
          <div className="field">
            <label>{t.timezone}</label>
            <select value={tz} onChange={(event) => setTz(event.target.value)}>
              <option>{t.tzEurope}</option>
              <option>{t.tzUs}</option>
              <option>{t.tzAustralia}</option>
            </select>
          </div>
        </div>
      )}
      <div className="field">
        <label>{t.notes}</label>
        <textarea
          rows={2}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder={t.notesPlaceholder}
        />
      </div>
      <button
        className="btn-pill"
        style={{
          background: 'var(--accent)',
          color: '#fff',
          width: '100%',
          justifyContent: 'center',
          marginTop: '8px',
        }}
        onClick={submit}
      >
        {t.checkout}
      </button>
      <p style={{ fontSize: '11px', opacity: 0.6, marginTop: '10px' }}>{t.noPayment}</p>
    </div>
  );
}
