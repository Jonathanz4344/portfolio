import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion';
import { cx } from './cx';
import './kit.css';

interface SplitSectionProps {
  media: ReactNode;
  /** Which side the picture sits on at desktop widths; it always stacks on top on phones. */
  mediaSide?: 'start' | 'end';
  className?: string;
  children: ReactNode;
}

/** A picture beside words. Each side rises in as it scrolls into view. */
export function SplitSection({ media, mediaSide = 'start', className, children }: SplitSectionProps) {
  return (
    <div className={cx('split-section', className)} data-media-side={mediaSide}>
      <Reveal className="split-section-media">{media}</Reveal>
      <Reveal className="split-section-body" delay={120}>
        {children}
      </Reveal>
    </div>
  );
}
