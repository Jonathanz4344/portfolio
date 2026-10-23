import type { ReactNode } from 'react';
import { CountUp } from '@/components/motion';
import { cx } from './cx';
import './kit.css';

interface StatProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: ReactNode;
  className?: string;
}

/** A figure that counts up into place, with its label beneath. */
export function Stat({ value, prefix, suffix, label, className }: StatProps) {
  return (
    <div className={cx('stat', className)}>
      <span className="stat-value">
        <CountUp value={value} prefix={prefix} suffix={suffix} />
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
