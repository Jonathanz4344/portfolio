import type { CSSProperties, ReactNode } from 'react';
import './motion.css';

interface ParallaxProps {
  /** How far the content drifts, in pixels, over the first screen of scrolling. */
  distance?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Hero imagery that drifts slower than the page as you scroll. Driven by a CSS scroll timeline on the
 * compositor, so it costs no JavaScript; browsers without scroll timelines simply keep it still.
 */
export function Parallax({ distance = 72, className, children }: ParallaxProps) {
  return (
    <div className={className ? `parallax ${className}` : 'parallax'} style={{ '--parallax': `${distance}px` } as CSSProperties}>
      {children}
    </div>
  );
}
