import type { ReactNode } from 'react';
import { cx } from './cx';
import './kit.css';

/** An icon set in a soft tinted circle. */
export function IconWell({ tone = 'neutral', className, children }: { tone?: 'neutral' | 'accent' | 'metal'; className?: string; children: ReactNode }) {
  return (
    <span className={cx('icon-well', className)} data-tone={tone} aria-hidden="true">
      {children}
    </span>
  );
}
