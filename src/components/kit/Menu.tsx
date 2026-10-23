'use client';

import { useEffect, type ReactNode, type RefObject } from 'react';
import { cx } from './cx';
import './kit.css';

/** Closes a popover on Escape or on a pointer press outside the element. */
export function useDismiss(ref: RefObject<HTMLElement | null>, open: boolean, onDismiss: () => void) {
  useEffect(() => {
    if (!open) return;
    const press = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onDismiss();
    };
    const key = (event: KeyboardEvent) => {
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

interface MenuProps {
  /** Which edge of the trigger the menu lines up with. */
  align?: 'start' | 'end';
  /** Open above the trigger instead of below. */
  above?: boolean;
  className?: string;
  children: ReactNode;
}

/** A frosted popover list of actions. Render it inside a positioned wrapper next to its trigger. */
export function Menu({ align = 'end', above, className, children }: MenuProps) {
  return (
    <div role="menu" className={cx('menu', className)} data-align={align} data-above={above ? '' : undefined}>
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

/** One action in a Menu: a button, a link, or a disabled entry. */
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
    <button type="button" role="menuitem" className={classes} onClick={onSelect}>
      {icon}
      <span>{children}</span>
    </button>
  );
}
