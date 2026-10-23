import { useState } from 'react';
import type { Experience } from '@/types';
import { Shelf, ShelfCard, DetailModal, LogoCover, sleeve } from '@/components/Shelf';

interface FeaturingSectionProps {
  experience: Experience[];
}

// Sleeve tones (see src/theme/tokens.ts) for each company's cover and detail page
const companyTones: Record<string, number> = {
  IBM: 2,
  'Citywide Eye Care': 1,
  'ZLA - Senior Capstone Project': 3,
  ADP: 4,
};

const initialsOf = (company: string) => company.split(/[\s-]+/)[0].slice(0, 3).toUpperCase();

const FeaturingSection = ({ experience }: FeaturingSectionProps) => {
  const [selected, setSelected] = useState<Experience | null>(null);
  const toneOf = (company: string) => companyTones[company] ?? 6;

  return (
    <>
      <Shelf title="Featuring Jonathan" count={experience.length}>
        {experience.map((exp) => (
          <ShelfCard
            key={`${exp.company}-${exp.role}`}
            cover={<LogoCover src={exp.logo} label={initialsOf(exp.company)} tone={toneOf(exp.company)} />}
            title={exp.role}
            subtitle={`${exp.company} • ${exp.period}`}
            onClick={() => setSelected(exp)}
          />
        ))}
      </Shelf>

      {selected && (
        <DetailModal
          isOpen
          onClose={() => setSelected(null)}
          cover={<LogoCover src={selected.logo} label={initialsOf(selected.company)} tone={toneOf(selected.company)} />}
          eyebrow="Playlist"
          title={selected.role}
          meta={`${selected.company} • ${selected.period} • ${selected.location}`}
          accent={sleeve(toneOf(selected.company))}
        >
          <ol className="detail-modal-list">
            {selected.highlights.map((highlight, i) => (
              <li key={i}>
                <span className="detail-modal-list-index">{i + 1}</span>
                <span>{highlight.trim()}</span>
              </li>
            ))}
          </ol>
        </DetailModal>
      )}
    </>
  );
};

export default FeaturingSection;
