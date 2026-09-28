import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Certification, Education } from '@/types';
import { Shelf, ShelfCard, FilterChips, DetailModal, LogoCover, BadgeCover } from '@/components/Shelf';

export type DiscographyTab = 'popular' | 'albums' | 'singles';

interface DiscographySectionProps {
  education: Education[];
  certifications: Certification[];
  tab: DiscographyTab;
  onTabChange: (tab: DiscographyTab) => void;
}

type Release =
  | { kind: 'album'; item: Education }
  | { kind: 'single'; item: Certification };

const schoolColors: Record<string, string> = {
  'Georgia Institute of Technology': '#b3a369',
  'Rochester Institute of Technology': '#f76902',
};

const tierColors: Record<Certification['tier'], string> = {
  platinum: '#6b6b6b',
  gold: '#9c7a1c',
  presave: '#1db954',
};

const yearOf = (text: string) => text.match(/\d{4}/)?.[0] ?? text;

const tabs: { value: DiscographyTab; label: string }[] = [
  { value: 'popular', label: 'Popular releases' },
  { value: 'albums', label: 'Albums' },
  { value: 'singles', label: 'Singles and EPs' },
];

const DiscographySection = ({ education, certifications, tab, onTabChange }: DiscographySectionProps) => {
  const [selected, setSelected] = useState<Release | null>(null);

  const albums: Release[] = education.map((item) => ({ kind: 'album', item }));
  const singles: Release[] = certifications.map((item) => ({ kind: 'single', item }));
  const releases = tab === 'albums' ? albums : tab === 'singles' ? singles : [...albums, ...singles];

  return (
    <>
      <Shelf
        title="Discography"
        count={releases.length}
        filters={<FilterChips options={tabs} value={tab} onChange={onTabChange} />}
      >
        {releases.map((release) =>
          release.kind === 'album' ? (
            <ShelfCard
              key={release.item.school}
              cover={<LogoCover src={release.item.logo} label={release.item.school} color="#333" />}
              title={release.item.school}
              subtitle={`${yearOf(release.item.status)} • ${release.item.degree}`}
              onClick={() => setSelected(release)}
            />
          ) : (
            <ShelfCard
              key={release.item.name}
              cover={<BadgeCover cert={release.item} />}
              title={release.item.name}
              subtitle={`${yearOf(release.item.date)} • ${release.item.issuer}`}
              onClick={() => setSelected(release)}
            />
          )
        )}
      </Shelf>

      {selected?.kind === 'album' && (
        <DetailModal
          isOpen
          onClose={() => setSelected(null)}
          cover={<LogoCover src={selected.item.logo} label={selected.item.school} color="#333" />}
          eyebrow="Album"
          title={selected.item.school}
          meta={`Jonathan Zhu • ${selected.item.status}`}
          accent={schoolColors[selected.item.school]}
        >
          <ol className="detail-modal-list">
            <li>
              <span className="detail-modal-list-index">1</span>
              <span>{selected.item.degree}</span>
            </li>
          </ol>
        </DetailModal>
      )}

      {selected?.kind === 'single' && (
        <DetailModal
          isOpen
          onClose={() => setSelected(null)}
          cover={<BadgeCover cert={selected.item} />}
          eyebrow={selected.item.tier === 'gold' ? 'Certified Gold' : 'Certified Platinum'}
          title={selected.item.name}
          meta={`${selected.item.issuer} • ${selected.item.date}`}
          accent={tierColors[selected.item.tier]}
        >
          {selected.item.verifyUrl ? (
            <a
              href={selected.item.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-modal-action"
            >
              Verify credential
              <ExternalLink size={16} />
            </a>
          ) : (
            <p className="detail-modal-note">Verification link coming soon.</p>
          )}
        </DetailModal>
      )}
    </>
  );
};

export default DiscographySection;
