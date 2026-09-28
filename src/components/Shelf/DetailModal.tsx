import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import './DetailModal.css';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cover: ReactNode;
  eyebrow: string;
  title: string;
  meta: string;
  accent?: string;
  children: ReactNode;
}

/** Spotify playlist/album page rendered as a dialog: gradient header, cover art, then the contents. */
const DetailModal = ({ isOpen, onClose, cover, eyebrow, title, meta, accent = '#535353', children }: DetailModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="detail-modal-overlay" onClick={onClose}>
      <div
        className="detail-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        style={{ '--detail-accent': accent } as React.CSSProperties}
      >
        <button className="detail-modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="detail-modal-header">
          <div className="detail-modal-cover">{cover}</div>
          <div className="detail-modal-info">
            <span className="detail-modal-eyebrow">{eyebrow}</span>
            <h2 className="detail-modal-title">{title}</h2>
            <span className="detail-modal-meta">{meta}</span>
          </div>
        </div>

        <div className="detail-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default DetailModal;
