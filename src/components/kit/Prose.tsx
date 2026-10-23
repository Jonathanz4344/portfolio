import { cx } from './cx';
import './kit.css';

/** Long-form text: each blank-line-separated block of the source becomes a paragraph. */
export function Prose({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cx('prose', className)}>
      {text.split(/\n\s*\n/).map((paragraph, i) => (
        <p key={i}>{paragraph.trim()}</p>
      ))}
    </div>
  );
}
