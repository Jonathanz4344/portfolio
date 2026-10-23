import type { ReactNode } from 'react';
import { SplitWords } from '@/components/motion';
import { Eyebrow } from './Eyebrow';
import { cx } from './cx';
import './kit.css';

interface SectionHeadingProps {
  title: string;
  level?: 2 | 3;
  eyebrow?: ReactNode;
  /** Trailing control, such as "Show all". */
  action?: ReactNode;
  id?: string;
  className?: string;
}

/** A section title that blurs in word by word, with an optional eyebrow and trailing action. */
export function SectionHeading({ title, level = 2, eyebrow, action, id, className }: SectionHeadingProps) {
  const Title = level === 2 ? 'h2' : 'h3';
  return (
    <div className={cx('section-heading', className)}>
      <div className="section-heading-text">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Title id={id} className="section-title">
          <SplitWords text={title} />
        </Title>
      </div>
      {action && <div className="section-heading-action">{action}</div>}
    </div>
  );
}
