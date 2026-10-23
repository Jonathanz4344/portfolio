import type { ReactNode } from 'react';
import { cx } from './cx';
import './kit.css';

/** The small label above a title. */
export function Eyebrow({ icon, className, children }: { icon?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <span className={cx('eyebrow', className)}>
      {icon}
      {children}
    </span>
  );
}
