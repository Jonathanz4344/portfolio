import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import { KenBurns } from '@/components/motion';
import { cx } from './cx';
import './kit.css';

interface FigureProps {
  src: string;
  alt: string;
  /** Rendered widths for the responsive image, e.g. "(max-width: 768px) 60vw, 240px". */
  sizes: string;
  /** Aspect ratio of the frame, e.g. "1 / 1". */
  ratio?: string;
  /** Photos fill the frame (cover); logos, badges, covers and documents fit inside it (contain). */
  fit?: 'cover' | 'contain';
  /** Contained artwork sits on a light tile so logos drawn on white read in both modes. */
  tile?: boolean;
  round?: boolean;
  /** Focal point for cover crops, e.g. "50% 20%". */
  position?: string;
  /** Load first: the page's largest image. */
  preload?: boolean;
  kenBurns?: boolean;
  caption?: ReactNode;
  className?: string;
}

/** A framed image. Every photo shares the media radius; artwork that must not be cropped uses contain. */
export function Figure({ src, alt, sizes, ratio = '1 / 1', fit = 'cover', tile, round, position, preload, kenBurns, caption, className }: FigureProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      fetchPriority={preload ? 'high' : undefined}
      className="figure-img"
      style={position ? { objectPosition: position } : undefined}
    />
  );

  return (
    <figure className={cx('figure', className)} data-fit={fit} data-tile={tile ? '' : undefined} data-round={round ? '' : undefined}>
      <div className="figure-frame" style={{ aspectRatio: ratio } as CSSProperties}>
        {kenBurns ? <KenBurns className="figure-motion">{image}</KenBurns> : image}
      </div>
      {caption && <figcaption className="figure-caption">{caption}</figcaption>}
    </figure>
  );
}
