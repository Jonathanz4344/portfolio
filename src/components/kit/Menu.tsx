'use client';

import { useEffect, useRef, type KeyboardEvent, type ReactNode, type RefObject } from 'react';
import { cx } from './cx';
import './kit.css';

/** Closes a popover on Escape or on a pointer press outside the element. */
export function useDismiss(ref: RefObject<HTMLElement | null>, open: boolean, onDismiss: () => void) {
  useEffect(() => {
    if (!open) return;
    const press = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onDismiss();
    };
    const key = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss();
    };
    document.addEventListener('pointerdown', press);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('pointerdown', press);
      document.removeEventListener('keydown', key);
    };
  }, [ref, open, onDismiss]);
}

const ITEMS = '[role="menuitem"]:not([aria-disabled="true"])';

interface MenuProps {
  /** Which edge of the trigger the menu lines up with. */
  align?: 'start' | 'end';
  /** Open above the trigger instead of below. */
  above?: boolean;
  className?: string;
  /** Closes the menu: Escape, Tab, or a pointer press outside (see useDismiss). */
  onClose: () => void;
  /** The button that opened the menu; focus goes back to it. */
  triggerRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}

/**
 * A frosted popover list of actions with the menu keyboard model. Focus starts on the first item;
 * the arrow keys, Home and End move between items; Escape closes and returns to the button; Tab
 * closes and moves on. Choosing an item hands focus back to the button before the item's action
 * runs, so a dialog opened from the menu returns focus to that button when it closes.
 * Render it inside a positioned wrapper next to its trigger.
 */
export function Menu({ align = 'end', above, className, onClose, triggerRef, children }: MenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.querySelector<HTMLElement>(ITEMS)?.focus({ preventScroll: true });
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(ref.current?.querySelectorAll<HTMLElement>(ITEMS) ?? []);
    const current = items.indexOf(document.activeElement as HTMLElement);
    const focusAt = (i: number) => items[(i + items.length) % items.length]?.focus();
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusAt(current + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusAt(current - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusAt(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusAt(items.length - 1);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onClose();
      triggerRef.current?.focus();
    } else if (event.key === 'Tab') {
      onClose();
    }
  };

  return (
    <div
      ref={ref}
      role="menu"
      className={cx('menu', className)}
      data-align={align}
      data-above={above ? '' : undefined}
      onKeyDown={onKeyDown}
      onClickCapture={() => triggerRef.current?.focus({ preventScroll: true })}
    >
      {children}
    </div>
  );
}

interface MenuItemProps {
  icon?: ReactNode;
  children: ReactNode;
  onSelect?: (event: React.MouseEvent) => void;
  href?: string;
  /** Opens in a new tab. */
  external?: boolean;
  disabled?: boolean;
  className?: string;
}

/** One action in a Menu: a button, a link, or a disabled entry. Reached with the arrow keys, not Tab. */
export function MenuItem({ icon, children, onSelect, href, external, disabled, className }: MenuItemProps) {
  const classes = cx('menu-item', className);
  if (disabled) {
    return (
      <div role="menuitem" aria-disabled="true" className={cx(classes, 'disabled')}>
        {icon}
        <span>{children}</span>
      </div>
    );
  }
  if (href) {
    return (
      <a
        role="menuitem"
        tabIndex={-1}
        href={href}
        className={classes}
        onClick={onSelect}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {icon}
        <span>{children}</span>
      </a>
    );
  }
  return (
    <button type="button" role="menuitem" tabIndex={-1} className={classes} onClick={onSelect}>
      {icon}
      <span>{children}</span>
    </button>
  );
}
