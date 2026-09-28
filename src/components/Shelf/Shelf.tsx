import { useState, useRef, useEffect, type ReactNode } from 'react';
import { Play } from 'lucide-react';
import './Shelf.css';

const MIN_CARD_WIDTH = 180;
const GAP = 12;

interface ShelfProps {
  title: string;
  count: number;
  children: ReactNode;
  filters?: ReactNode;
}

/** A Spotify-style row of cards: one row by default, "Show all" expands to the full grid. */
export const Shelf = ({ title, count, children, filters }: ShelfProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [columns, setColumns] = useState(5);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const observer = new ResizeObserver(([entry]) => {
      setColumns(Math.max(1, Math.floor((entry.contentRect.width + GAP) / (MIN_CARD_WIDTH + GAP))));
    });
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="shelf">
      <div className="shelf-header">
        <h2 className="shelf-title">{title}</h2>
        {count > columns && (
          <button className="shelf-show-all" onClick={() => setIsExpanded((prev) => !prev)}>
            {isExpanded ? 'Show less' : 'Show all'}
          </button>
        )}
      </div>

      {filters && <div className="shelf-filters">{filters}</div>}

      <div
        ref={gridRef}
        className={`shelf-grid ${isExpanded ? 'expanded' : ''}`}
        style={{ '--shelf-columns': columns } as React.CSSProperties}
      >
        {children}
      </div>
    </section>
  );
};

interface ShelfCardProps {
  cover: ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
  round?: boolean;
}

export const ShelfCard = ({ cover, title, subtitle, onClick, round }: ShelfCardProps) => (
  <button className={`shelf-card ${round ? 'round' : ''}`} onClick={onClick} title={title}>
    <div className="shelf-card-cover">
      {cover}
      <span className="shelf-card-play" aria-hidden="true">
        <Play size={20} fill="#000" />
      </span>
    </div>
    <span className="shelf-card-title">{title}</span>
    <span className="shelf-card-subtitle">{subtitle}</span>
  </button>
);

interface FilterChipsProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

export const FilterChips = <T extends string>({ options, value, onChange }: FilterChipsProps<T>) => (
  <div className="filter-chips" role="tablist">
    {options.map((option) => (
      <button
        key={option.value}
        role="tab"
        aria-selected={value === option.value}
        className={`filter-chip ${value === option.value ? 'active' : ''}`}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
);
