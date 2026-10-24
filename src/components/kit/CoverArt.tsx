import Image from 'next/image';
import type { Project } from '@/types';
import { cx } from './cx';
import './kit.css';

interface CoverArtProps {
  project: Project;
  /** The letter shown when the project has no logo. */
  letter: string;
  /** Rendered width for the responsive logo, e.g. "56px". */
  sizes: string;
  className?: string;
  /** Overrides the logo's alt text. */
  alt?: string;
}

export const projectType = (project: Project) => project.type.toLowerCase().replace(/\s+/g, '-');

/** A project's album art: its company logo on a light tile, or a lettered record sleeve. */
export function CoverArt({ project, letter, sizes, className, alt }: CoverArtProps) {
  if (project.companyLogo) {
    return (
      <span className={cx('cover-art', 'cover-art-logo', className)}>
        <Image src={project.companyLogo} alt={alt ?? project.artist} fill sizes={sizes} className="cover-art-img" />
      </span>
    );
  }
  return (
    <span className={cx('cover-art', 'cover-art-letter', className)} data-type={projectType(project)}>
      <span aria-hidden="true">{letter}</span>
    </span>
  );
}
