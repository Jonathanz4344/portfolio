'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cx } from './cx';
import './kit.css';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name when there is no visible title to point at. */
  label?: string;
  labelledBy?: string;
  /** sm 440, md 560, lg 760, xl 960 pixels wide. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** On phones, fill the screen like an app page instead of floating. */
  sheet?: boolean;
  /** Accessible name of the close button; leave out to render no close button. */
  closeLabel?: string;
  className?: string;
  panelClassName?: string;
  children: ReactNode;
}

/**
 * A modal on the native <dialog>: focus stays inside, Escape and a press on the backdrop close it,
 * the page behind is inert, page scroll locks while it is open, and focus returns to whatever
 * opened it, even when the dialog unmounts while still open.
 */
export function Dialog({ open, onClose, label, labelledBy, size = 'md', sheet, closeLabel, className, panelClassName, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  // A press that starts inside the panel (a text selection dragged out, say) must not close the dialog
  const pressedBackdrop = useRef(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cx('dialog', className)}
      data-size={size}
      data-sheet={sheet ? '' : undefined}
      aria-label={label}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onPointerDown={(event) => {
        pressedBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (pressedBackdrop.current && event.target === event.currentTarget) onClose();
        pressedBackdrop.current = false;
      }}
    >
      {open && (
        <div className={cx('dialog-panel', panelClassName)}>
          {closeLabel && (
            <button type="button" className="dialog-close" onClick={onClose} aria-label={closeLabel}>
              <X size={20} />
            </button>
          )}
          {children}
        </div>
      )}
    </dialog>
  );
}
