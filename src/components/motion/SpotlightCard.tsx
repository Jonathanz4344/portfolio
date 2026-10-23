'use client';

import type { HTMLAttributes, PointerEvent } from 'react';
import './motion.css';

type SpotlightTag = 'div' | 'button' | 'a' | 'article' | 'li';

interface SpotlightCardProps extends HTMLAttributes<HTMLElement> {
  as?: SpotlightTag;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
}

const follow = (event: PointerEvent<HTMLElement>) => {
  const card = event.currentTarget;
  const box = card.getBoundingClientRect();
  card.style.setProperty('--spot-x', `${event.clientX - box.left}px`);
  card.style.setProperty('--spot-y', `${event.clientY - box.top}px`);
};

/** A card lit from the pointer: a soft accent glow and a brighter hairline near the cursor. */
export function SpotlightCard({ as = 'div', className, onPointerMove, children, ...rest }: SpotlightCardProps) {
  const Tag = as as 'div';
  return (
    <Tag
      className={className ? `spotlight ${className}` : 'spotlight'}
      onPointerMove={(event) => {
        follow(event);
        onPointerMove?.(event);
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
