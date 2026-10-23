'use client';

import { Children, isValidElement, useRef, type CSSProperties, type HTMLAttributes } from 'react';
import { useInViewOnce } from './hooks';
import './motion.css';

type StaggerTag = 'div' | 'ul' | 'ol' | 'section';

interface StaggerProps extends HTMLAttributes<HTMLElement> {
  as?: StaggerTag;
  /** Element wrapping each child: 'li' inside lists, 'div' elsewhere. */
  itemAs?: 'div' | 'li';
  itemClassName?: string;
  /** Extra attributes for the wrapper of the item at an index (e.g. inert for collapsed rows). */
  itemProps?: (index: number) => HTMLAttributes<HTMLElement> & { inert?: boolean };
  /** Milliseconds between consecutive items. */
  step?: number;
}

/**
 * Reveals its children one after another when the list scrolls into view.
 * Items added later (See more, filter changes) animate in on their own.
 */
export function Stagger({ as = 'div', itemAs = 'div', itemClassName, itemProps, step = 60, style, children, ...rest }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInViewOnce(ref);
  const Tag = as as 'div';
  const Item = itemAs as 'div';

  return (
    <Tag
      ref={ref}
      data-stagger=""
      data-shown={shown ? '' : undefined}
      style={{ ...style, '--stagger-step': `${step}ms` } as CSSProperties}
      {...rest}
    >
      {Children.toArray(children).map((child, i) => (
        <Item
          key={isValidElement(child) && child.key !== null ? child.key : i}
          {...itemProps?.(i)}
          className={itemClassName}
          data-stagger-item=""
          style={{ '--i': Math.min(i, 12) } as CSSProperties}
        >
          {child}
        </Item>
      ))}
    </Tag>
  );
}
