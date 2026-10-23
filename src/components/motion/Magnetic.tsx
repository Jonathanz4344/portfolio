'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useMotionOK } from './hooks';
import './motion.css';

interface MagneticProps {
  /** Share of the pointer's offset the content follows. */
  strength?: number;
  className?: string;
  children: ReactNode;
}

/** Leans a primary button toward a nearby pointer. Fine pointers only, and never under reduced motion. */
export function Magnetic({ strength = 0.3, className, children }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionOK = useMotionOK();

  useEffect(() => {
    const field = ref.current;
    if (!field || !motionOK || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const pull = (event: PointerEvent) => {
      const box = field.getBoundingClientRect();
      field.style.setProperty('--magnet-x', `${(event.clientX - (box.left + box.width / 2)) * strength}px`);
      field.style.setProperty('--magnet-y', `${(event.clientY - (box.top + box.height / 2)) * strength}px`);
    };
    const release = () => {
      field.style.setProperty('--magnet-x', '0px');
      field.style.setProperty('--magnet-y', '0px');
    };

    field.addEventListener('pointermove', pull);
    field.addEventListener('pointerleave', release);
    return () => {
      field.removeEventListener('pointermove', pull);
      field.removeEventListener('pointerleave', release);
      release();
    };
  }, [motionOK, strength]);

  return (
    <span ref={ref} className={className ? `magnetic ${className}` : 'magnetic'}>
      {children}
    </span>
  );
}
