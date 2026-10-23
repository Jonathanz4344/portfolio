import type { ReactNode } from 'react';
import './motion.css';

/** Frames a hero photo and lets it settle from a slow zoom when the page first paints. */
export function KenBurns({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={className ? `ken-burns ${className}` : 'ken-burns'}>{children}</div>;
}
