import { useState } from 'react';
import type { Skills } from '@/types';
import { Shelf, ShelfCard, DetailModal, TextCover, sleeve } from '@/components/Shelf';

interface ArtistPlaylistsSectionProps {
  skills: Skills;
}

// Generated-playlist covers cycle through the theme's eight sleeve tones
const SLEEVE_TONES = 8;

const ArtistPlaylistsSection = ({ skills }: ArtistPlaylistsSectionProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const categories = Object.entries(skills);
  const toneOf = (index: number) => (index % SLEEVE_TONES) + 1;
  const selectedIndex = categories.findIndex(([category]) => category === selected);

  return (
    <>
      <Shelf title="Artist Playlists" count={categories.length}>
        {categories.map(([category, items], i) => (
          <ShelfCard
            key={category}
            cover={<TextCover title={category} tone={toneOf(i)} byline="Jonathan Zhu" />}
            title={category}
            subtitle={items.join(', ')}
            onClick={() => setSelected(category)}
          />
        ))}
      </Shelf>

      {selected && selectedIndex >= 0 && (
        <DetailModal
          isOpen
          onClose={() => setSelected(null)}
          cover={<TextCover title={selected} tone={toneOf(selectedIndex)} byline="Jonathan Zhu" />}
          eyebrow="Playlist"
          title={selected}
          meta={`Jonathan Zhu • ${categories[selectedIndex][1].length} skills`}
          accent={sleeve(toneOf(selectedIndex))}
        >
          <ol className="detail-modal-list">
            {categories[selectedIndex][1].map((skill, i) => (
              <li key={skill}>
                <span className="detail-modal-list-index">{i + 1}</span>
                <span>{skill}</span>
              </li>
            ))}
          </ol>
        </DetailModal>
      )}
    </>
  );
};

export default ArtistPlaylistsSection;
