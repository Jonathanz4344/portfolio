'use client';

import { useRef, type CSSProperties, type HTMLAttributes } from 'react';
import { useInViewOnce } from './hooks';
import './motion.css';

type RevealTag = 'div' | 'section' | 'header' | 'footer' | 'article' | 'aside' | 'ul' | 'ol' | 'li' | 'p' | 'span';

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: RevealTag;
  /** rise: fade up; fade: opacity only; blur: fade up out of a soft blur */
  variant?: 'rise' | 'fade' | 'blur';
  /** Milliseconds to wait after the element enters the viewport. */
  delay?: number;
}

/** Rises into place the first time it scrolls into view. Without motion it is simply visible. */
export function Reveal({ as = 'div', variant = 'rise', delay = 0, style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInViewOnce(ref);
  const Tag = as as 'div';

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-shown={shown ? '' : undefined}
      style={delay ? ({ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties) : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
