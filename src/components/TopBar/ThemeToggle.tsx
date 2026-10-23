'use client';

import type { MouseEvent } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motionAllowed } from '@/components/motion';
import { THEME_STORAGE_KEY } from '@/theme/constants';

/**
 * Switches light and dark. Which icon and label show is decided by CSS from <html data-theme>,
 * so the server markup never has to guess the visitor's theme.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    const apply = () => {
      root.setAttribute('data-theme', next);
      root.style.colorScheme = next;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Private windows can block storage; the switch still applies to this visit
      }
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', getComputedStyle(root).getPropertyValue('--canvas').trim());
    };

    if (!document.startViewTransition || !motionAllowed()) {
      apply();
      return;
    }

    // Open the new theme as a circle growing from the switch
    const box = event.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      const styles = getComputedStyle(root);
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: parseFloat(styles.getPropertyValue('--dur-5')),
          easing: styles.getPropertyValue('--ease-out').trim(),
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <button type="button" className={className ? `theme-toggle ${className}` : 'theme-toggle'} onClick={toggle}>
      <span className="theme-toggle-to-light sr-only">Switch to light theme</span>
      <span className="theme-toggle-to-dark sr-only">Switch to dark theme</span>
      <Sun className="theme-toggle-sun" size={18} aria-hidden="true" />
      <Moon className="theme-toggle-moon" size={18} aria-hidden="true" />
    </button>
  );
}
