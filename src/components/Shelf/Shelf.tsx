import { useState, useRef, useEffect, type ReactNode } from 'react';
import { Play } from 'lucide-react';
import { Section, SectionHeading } from '@/components/kit';
import { SpotlightCard, Stagger } from '@/components/motion';
import './Shelf.css';

const MIN_CARD_WIDTH = 180;
const GAP = 16;

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
  // On phones the shelf is a horizontal scroller, so every card stays reachable
  const [isScroller, setIsScroller] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const phone = matchMedia('(max-width: 768px)');
    const observer = new ResizeObserver(([entry]) => {
      setIsScroller(phone.matches);
      setColumns(Math.max(1, Math.floor((entry.contentRect.width + GAP) / (MIN_CARD_WIDTH + GAP))));
    });
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  const collapsed = !isExpanded && !isScroller;

  return (
    <Section className="shelf">
      <SectionHeading
        title={title}
        action={
          count > columns && (
            <button className="shelf-show-all link-quiet" onClick={() => setIsExpanded((prev) => !prev)}>
              {isExpanded ? 'Show less' : 'Show all'}
            </button>
          )
        }
      />

      {filters && <div className="shelf-filters">{filters}</div>}

      <div ref={gridRef} className="shelf-body">
        <Stagger
          className={`shelf-grid ${isExpanded ? 'expanded' : ''}`}
          style={{ '--shelf-columns': columns } as React.CSSProperties}
          itemClassName="shelf-item"
          itemProps={(index) => (collapsed && index >= columns ? { inert: true } : {})}
          step={55}
        >
          {children}
        </Stagger>
      </div>
    </Section>
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
  <SpotlightCard as="button" type="button" className={`shelf-card ${round ? 'round' : ''}`} onClick={onClick} title={title}>
    <div className="shelf-card-cover">
      {cover}
      <span className="shelf-card-play" aria-hidden="true">
        <Play size={20} fill="currentColor" />
      </span>
    </div>
    <span className="shelf-card-title">{title}</span>
    <span className="shelf-card-subtitle">{subtitle}</span>
  </SpotlightCard>
);

interface FilterChipsProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

/** Toggle chips that filter a shelf; the pressed chip is the active filter. */
export const FilterChips = <T extends string>({ options, value, onChange }: FilterChipsProps<T>) => (
  <div className="filter-chips">
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        aria-pressed={value === option.value}
        className={`filter-chip ${value === option.value ? 'active' : ''}`}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
);
