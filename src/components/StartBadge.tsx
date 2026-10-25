'use client';

import type { Program } from '@/lib/content';
import { fmtLeft } from '@/lib/utils';
import { useSite } from './SiteContext';

export default function StartBadge({ program }: { program: Program }) {
  const { startAt, now, t } = useSite();
  const target = startAt[program.id];
  if (!target) return null;
  const left = target - now;
  let cls = 'ok';
  let text = t.spots(program.spots);
  if (program.spots <= 3) {
    cls = program.spots <= 1 ? 'full' : 'warn';
    text = t.spotsLeft(program.spots);
  }
  return (
    <div className={`nextart ${cls}`}>
      <i />
      <b>{text}</b>
      <span>{now ? fmtLeft(left) : '…'}</span>
    </div>
  );
}
