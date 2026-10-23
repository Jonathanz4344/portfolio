'use client';

import { useEffect, useRef } from 'react';
import { motionAllowed, useMotionOK } from './hooks';
import './motion.css';

interface CountUpProps {
  value: number;
  /** mount: count as soon as it renders (values that arrive client-side); view: when it scrolls into view. */
  start?: 'mount' | 'view';
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const format = (n: number, prefix: string, suffix: string) => `${prefix}${n.toLocaleString('en-US')}${suffix}`;

/**
 * A number that counts up to its value. The markup always holds the final value, so it is correct
 * without JavaScript, under reduced motion, and for anything already on screen when the page hydrates.
 */
export function CountUp({ value, start = 'view', duration = 1600, prefix = '', suffix = '', className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionOK = useMotionOK();

  useEffect(() => {
    const text = ref.current?.firstChild;
    // During hydration the hook still reports the server value, so confirm against the live flag
    if (!motionOK || !text || !motionAllowed()) return;
    const show = (n: number) => {
      text.nodeValue = format(n, prefix, suffix);
    };

    let frame = 0;
    const run = () => {
      let began = 0;
      const tick = (now: number) => {
        began ||= now;
        const t = Math.min(1, (now - began) / duration);
        show(Math.round(value * (1 - (1 - t) ** 4)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    if (start === 'mount') {
      show(0);
      run();
      return () => {
        cancelAnimationFrame(frame);
        show(value);
      };
    }

    // Something already on screen keeps its final value instead of jumping back to zero
    const box = ref.current!.getBoundingClientRect();
    if (box.top < innerHeight && box.bottom > 0) return;

    show(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(ref.current!);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      show(value);
    };
  }, [value, start, duration, prefix, suffix, motionOK]);

  return (
    <span ref={ref} className={className ? `count-up ${className}` : 'count-up'}>
      {format(value, prefix, suffix)}
    </span>
  );
}
