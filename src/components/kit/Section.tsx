import type { HTMLAttributes } from 'react';
import { cx } from './cx';
import './kit.css';

export type Band = 'page' | 'sunken' | 'paper' | 'tint' | 'ink';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'aside';
  /** The surface the section sits on. */
  band?: Band;
  /** content: centered at the content width; full: edge to edge inside the panel. */
  width?: 'content' | 'full';
}

/** A band of the page with consistent gutters, rhythm and surface. */
export function Section({ as = 'section', band = 'page', width = 'content', className, children, ...rest }: SectionProps) {
  const Tag = as as 'section';
  return (
    <Tag className={cx('section', className)} data-band={band} {...rest}>
      <div className={width === 'content' ? 'section-inner' : 'section-inner section-inner-full'}>{children}</div>
    </Tag>
  );
}
