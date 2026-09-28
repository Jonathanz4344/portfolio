import { useState } from 'react';
import type { Experience } from '@/types';
import { Shelf, ShelfCard, DetailModal, LogoCover } from '@/components/Shelf';

interface FeaturingSectionProps {
  experience: Experience[];
}

const companyColors: Record<string, string> = {
  IBM: '#0f62fe',
  'Citywide Eye Care': '#1db954',
  'ZLA - Senior Capstone Project': '#7c3aed',
  ADP: '#d0271d',
};

const initialsOf = (company: string) => company.split(/[\s-]+/)[0].slice(0, 3).toUpperCase();

const FeaturingSection = ({ experience }: FeaturingSectionProps) => {
  const [selected, setSelected] = useState<Experience | null>(null);
  const colorOf = (company: string) => companyColors[company] ?? '#535353';

  return (
    <>
      <Shelf title="Featuring Jonathan" count={experience.length}>
        {experience.map((exp) => (
          <ShelfCard
            key={`${exp.company}-${exp.role}`}
            cover={<LogoCover src={exp.logo} label={initialsOf(exp.company)} color={colorOf(exp.company)} />}
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
          cover={<LogoCover src={selected.logo} label={initialsOf(selected.company)} color={colorOf(selected.company)} />}
          eyebrow="Playlist"
          title={selected.role}
          meta={`${selected.company} • ${selected.period} • ${selected.location}`}
          accent={colorOf(selected.company)}
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
