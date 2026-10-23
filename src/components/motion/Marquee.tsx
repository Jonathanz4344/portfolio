'use client';

import { useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';
import './motion.css';

interface MarqueeProps {
  /** Accessible name for the region. */
  label: string;
  pauseLabel: string;
  playLabel: string;
  className?: string;
  children: ReactNode;
}

/**
 * An endless, slow horizontal ticker. It pauses on hover and focus, has its own pause control
 * (moving content must be stoppable), and sits still under reduced motion.
 */
export function Marquee({ label, pauseLabel, playLabel, className, children }: MarqueeProps) {
  const [paused, setPaused] = useState(false);

  return (
    <div className={className ? `marquee ${className}` : 'marquee'} role="region" aria-label={label} data-paused={paused ? '' : undefined}>
      <div className="marquee-viewport">
        <div className="marquee-track">
          <div className="marquee-group">{children}</div>
          <div className="marquee-group" aria-hidden="true" inert>
            {children}
          </div>
        </div>
      </div>
      <button type="button" className="marquee-toggle" onClick={() => setPaused((prev) => !prev)} aria-label={paused ? playLabel : pauseLabel}>
        {paused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
      </button>
    </div>
  );
}
