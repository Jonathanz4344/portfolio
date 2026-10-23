import type { ReactNode } from 'react';
import { SplitWords } from '@/components/motion';
import { Eyebrow } from './Eyebrow';
import { cx } from './cx';
import './kit.css';

interface PageIntroProps {
  eyebrow?: ReactNode;
  title: string;
  lede?: ReactNode;
  actions?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/** The opening of a page: eyebrow, a display title that blurs in on load, a lede and actions. */
export function PageIntro({ eyebrow, title, lede, actions, className, children }: PageIntroProps) {
  return (
    <header className={cx('page-intro', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="page-intro-title">
        <SplitWords text={title} trigger="load" />
      </h1>
      {lede && <p className="page-intro-lede">{lede}</p>}
      {actions && <div className="page-intro-actions">{actions}</div>}
      {children}
    </header>
  );
}
