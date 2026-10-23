import { cx } from './cx';
import './kit.css';

/** A wrapping row of small hairline tags, e.g. a project's technologies. */
export function TagList({ tags, className, tagClassName }: { tags: string[]; className?: string; tagClassName?: string }) {
  return (
    <ul className={cx('tag-list', className)}>
      {tags.map((tag, i) => (
        <li key={i} className={cx('tag', tagClassName)}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
