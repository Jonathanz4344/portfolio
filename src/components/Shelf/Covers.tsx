import type { Certification } from '@/types';
import './Covers.css';

/** Album-art style cover: a logo centered on a white square, or initials on a color when there's no logo. */
export const LogoCover = ({ src, label, color }: { src?: string; label: string; color: string }) =>
  src ? (
    <div className="cover cover-logo">
      <img src={src} alt={`${label} logo`} />
    </div>
  ) : (
    <div className="cover cover-initials" style={{ background: color }}>
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
    {cert.badge && <img src={cert.badge} alt={`${cert.name} badge`} />}
    <span className={`cover-tier ${cert.tier}`}>{tierLabels[cert.tier]}</span>
  </div>
);

/** Spotify-generated playlist style cover: bold title on a solid color with a name band. */
export const TextCover = ({ title, color, byline }: { title: string; color: string; byline: string }) => (
  <div className="cover cover-text" style={{ background: color }}>
    <span className="cover-text-mark">JZ</span>
    <span className="cover-text-title">{title}</span>
    <span className="cover-text-band">{byline}</span>
  </div>
);
