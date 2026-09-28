import { useState } from 'react';
import type { Skills } from '@/types';
import { Shelf, ShelfCard, DetailModal, TextCover } from '@/components/Shelf';

interface ArtistPlaylistsSectionProps {
  skills: Skills;
}

// Palette of Spotify's generated-playlist cover colors
const coverColors = ['#e8115b', '#1e3264', '#8d67ab', '#148a08', '#e13300', '#477d95', '#ba5d07', '#503750'];

const ArtistPlaylistsSection = ({ skills }: ArtistPlaylistsSectionProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const categories = Object.entries(skills);
  const colorOf = (index: number) => coverColors[index % coverColors.length];
  const selectedIndex = categories.findIndex(([category]) => category === selected);

  return (
    <>
      <Shelf title="Artist Playlists" count={categories.length}>
        {categories.map(([category, items], i) => (
          <ShelfCard
            key={category}
            cover={<TextCover title={category} color={colorOf(i)} byline="Jonathan Zhu" />}
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
          cover={<TextCover title={selected} color={colorOf(selectedIndex)} byline="Jonathan Zhu" />}
          eyebrow="Playlist"
          title={selected}
          meta={`Jonathan Zhu • ${categories[selectedIndex][1].length} skills`}
          accent={colorOf(selectedIndex)}
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
