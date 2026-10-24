import { Fragment, type CSSProperties, type ReactNode } from 'react';
import { Dialog, Eyebrow, cx } from '@/components/kit';
import { SplitWords } from '@/components/motion';
import './DetailModal.css';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cover: ReactNode;
  eyebrow: string;
  title: string;
  meta: string;
  /** Tone of the header wash, as a token reference such as "var(--sleeve-3)". */
  accent?: string;
  children: ReactNode;
}

// Spotify sets longer titles smaller, so every header keeps the same shape
const titleScale = (title: string) => (title.length > 40 ? 'long' : title.length > 20 ? 'medium' : undefined);

/**
 * The meta line, led by its artist, issuer or company as in Spotify. Each part keeps its separator and
 * never breaks inside (a date range stays on one line); the text itself is unchanged.
 */
const MetaLine = ({ meta }: { meta: string }) => {
  const parts = meta.split(' • ');
  return (
    <span className="detail-modal-meta">
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className="detail-modal-meta-part">
            {i === 0 ? <span className="detail-modal-meta-lead">{part}</span> : part}
            {i < parts.length - 1 && ' •'}
          </span>
        </Fragment>
      ))}
    </span>
  );
};

/**
 * Spotify's album and playlist page as a dialog: the cover on a calm wash of the release's tone, the title in
 * the display face, then the contents (a numbered track list, an action or a note). A full page on phones.
 */
const DetailModal = ({ isOpen, onClose, cover, eyebrow, title, meta, accent = 'var(--sleeve-6)', children }: DetailModalProps) => {
  if (!isOpen) return null;

  return (
    <Dialog open onClose={onClose} label={title} size="lg" sheet closeLabel="Close" className="detail-modal">
      <div className="detail-modal-page" style={{ '--detail-accent': accent } as CSSProperties}>
        <header className="detail-modal-header">
          <div className="detail-modal-cover">{cover}</div>
          <div className="detail-modal-info">
            <Eyebrow className="detail-modal-eyebrow">{eyebrow}</Eyebrow>
            <h2 className={cx('detail-modal-title', titleScale(title))}>
              <SplitWords text={title} trigger="load" delay={60} step={50} />
            </h2>
            <MetaLine meta={meta} />
          </div>
        </header>

        <div className="detail-modal-body">{children}</div>
      </div>
    </Dialog>
  );
};

export default DetailModal;
