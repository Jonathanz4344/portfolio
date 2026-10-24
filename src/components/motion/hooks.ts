'use client';

import { useEffect, useState, useSyncExternalStore, type RefObject } from 'react';

const subscribeNever = () => () => {};

/** False on the server and during hydration, true once mounted in the browser. */
export const useMounted = () => useSyncExternalStore(subscribeNever, () => true, () => false);

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

const subscribeMotion = (onChange: () => void) => {
  const query = matchMedia(REDUCED_MOTION);
  const observer = new MutationObserver(onChange);
  query.addEventListener('change', onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
  return () => {
    query.removeEventListener('change', onChange);
    observer.disconnect();
  };
};

export const motionAllowed = () =>
  !matchMedia(REDUCED_MOTION).matches && document.documentElement.getAttribute('data-motion') === 'on';

/**
 * Whether decorative motion may run. Returns true ("ok") on the server and during hydration so server
 * and client markup match, then follows reduced motion and the pre-paint motion flag.
 * Anything gated on it must render its finished state as markup.
 */
export const useMotionOK = () => useSyncExternalStore(subscribeMotion, motionAllowed, () => true);

/** Smooth scrolling when motion is allowed, an instant jump otherwise. */
export const scrollMotion = (): ScrollBehavior => (motionAllowed() ? 'smooth' : 'auto');

type VisibilityListener = (visible: boolean) => void;
const observers = new Map<string, IntersectionObserver>();
const listeners = new WeakMap<Element, VisibilityListener>();

// One observer per root margin, shared by every element that reveals itself
function sharedObserver(rootMargin: string) {
  let observer = observers.get(rootMargin);
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => listeners.get(entry.target)?.(entry.isIntersecting)),
      { rootMargin }
    );
    observers.set(rootMargin, observer);
  }
  return observer;
}

/** Becomes true the first time the element scrolls into view, then stops watching it. */
export function useInViewOnce(ref: RefObject<Element | null>, rootMargin = '0px 0px -6% 0px') {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || seen) return;
    const observer = sharedObserver(rootMargin);
    listeners.set(element, (visible) => {
      if (visible) setSeen(true);
    });
    observer.observe(element);
    return () => {
      observer.unobserve(element);
      listeners.delete(element);
    };
  }, [ref, rootMargin, seen]);

  return seen;
}
