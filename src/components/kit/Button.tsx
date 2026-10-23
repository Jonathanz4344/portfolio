import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Magnetic } from '@/components/motion';
import { cx } from './cx';
import './kit.css';

type Variant = 'primary' | 'inverse' | 'secondary' | 'ghost' | 'icon' | 'play';
type Size = 'sm' | 'md' | 'lg';

interface Look {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  /** Primary actions lean toward the pointer. */
  magnetic?: boolean;
}

const classes = (variant: Variant, size: Size, className?: string) => cx('btn', `btn-${variant}`, `btn-${size}`, className);

const wrap = (magnetic: boolean | undefined, node: ReactNode) => (magnetic ? <Magnetic>{node}</Magnetic> : node);

/** A button in one of the kit's looks. */
export function Button({ variant = 'secondary', size = 'md', icon, magnetic, className, children, type = 'button', ...rest }: Look & ButtonHTMLAttributes<HTMLButtonElement>) {
  return wrap(
    magnetic,
    <button type={type} className={classes(variant, size, className)} {...rest}>
      {icon}
      {children}
    </button>
  );
}

/** A link that looks like a button. */
export function ButtonLink({ variant = 'secondary', size = 'md', icon, magnetic, className, children, ...rest }: Look & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return wrap(
    magnetic,
    <a className={classes(variant, size, className)} {...rest}>
      {icon}
      {children}
    </a>
  );
}
