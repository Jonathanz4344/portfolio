'use client';

import { Fragment, useRef, type CSSProperties } from 'react';
import { useInViewOnce } from './hooks';
import './motion.css';

interface SplitWordsProps {
  text: string;
  /** load: animates at first paint (hero titles); view: when it scrolls into view. */
  trigger?: 'load' | 'view';
  /** Milliseconds before the first word. */
  delay?: number;
  /** Milliseconds between words. */
  step?: number;
  className?: string;
}

/**
 * A title whose words blur in one after another. The words stay real text separated by real spaces,
 * so the heading's text and accessible name are unchanged.
 */
export function SplitWords({ text, trigger = 'view', delay = 0, step = 90, className }: SplitWordsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useInViewOnce(ref);
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span
      ref={ref}
      className={className ? `split-words ${className}` : 'split-words'}
      data-split={trigger}
      data-shown={trigger === 'view' && shown ? '' : undefined}
      style={{ '--split-delay': `${delay}ms`, '--split-step': `${step}ms` } as CSSProperties}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className="split-word" style={{ '--i': i } as CSSProperties}>
            {word}
          </span>
        </Fragment>
      ))}
    </span>
  );
}
