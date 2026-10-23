import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { Certification } from '@/types';
import './Covers.css';

/** Sleeve tone (1 to 8) as a CSS value, for covers and detail-page accents. */
export const sleeve = (tone: number) => `var(--sleeve-${tone})`;

/** Album-art style cover: a logo centered on a light tile, or initials on a record sleeve when there's no logo. */
export const LogoCover = ({ src, label, tone }: { src?: string; label: string; tone: number }) =>
  src ? (
    <div className="cover cover-logo">
      <Image src={src} alt={`${label} logo`} fill sizes="(max-width: 768px) 152px, 220px" />
    </div>
  ) : (
    <div className="cover cover-initials" style={{ '--cover-bg': sleeve(tone) } as CSSProperties}>
      <span>{label}</span>
    </div>
  );

const tierLabels: Record<Certification['tier'], string> = {
  platinum: 'Platinum',
  gold: 'Gold',
  presave: 'Pre-save',
};

/** Credential badge on a tier-tinted background, with a Platinum/Gold record label. */
export const BadgeCover = ({ cert }: { cert: Certification }) => (
  <div className={`cover cover-badge ${cert.tier}`}>
    {cert.badge && <Image src={cert.badge} alt={`${cert.name} badge`} fill sizes="(max-width: 768px) 152px, 220px" />}
    <span className={`cover-tier ${cert.tier}`}>{tierLabels[cert.tier]}</span>
  </div>
);

/** Spotify-generated playlist style cover: the title set on a record sleeve with a name band. */
export const TextCover = ({ title, tone, byline }: { title: string; tone: number; byline: string }) => (
  <div className="cover cover-text" style={{ '--cover-bg': sleeve(tone) } as CSSProperties}>
    <span className="cover-text-mark">JZ</span>
    <span className="cover-text-title">{title}</span>
    <span className="cover-text-band">{byline}</span>
  </div>
);
