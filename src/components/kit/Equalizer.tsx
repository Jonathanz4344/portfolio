import { cx } from './cx';
import './kit.css';

/** The now-playing bars. They bounce while playing and stand still under reduced motion. */
export function Equalizer({ bars = 4, className }: { bars?: number; className?: string }) {
  return (
    <span className={cx('equalizer', className)} aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => (
        <span key={i} className="equalizer-bar" />
      ))}
    </span>
  );
}
