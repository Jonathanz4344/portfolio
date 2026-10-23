'use client';

import { useEffect } from 'react';

/** Tells the pre-paint script's fail-safe that the app hydrated, so reveals may keep content hidden until scrolled to. */
export function HydrationFlag() {
  useEffect(() => {
    document.documentElement.setAttribute('data-hydrated', '');
  }, []);
  return null;
}
