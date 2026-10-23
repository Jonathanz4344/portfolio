import { Flower2, Ghost, Sparkles, TreePine, Wheat, type LucideIcon } from 'lucide-react';
import { SEASONS, ZODIAC, seasonGreetings, zodiacNames, type Season } from '@/theme/seasons';
import { cx } from './cx';
import './kit.css';

const icons: Record<Season, LucideIcon> = {
  halloween: Ghost,
  thanksgiving: Wheat,
  christmas: TreePine,
  newyear: Sparkles,
  lunar: Flower2,
};

/**
 * The seasonal greeting. Every greeting is in the markup and CSS shows the one matching the
 * pre-paint data-season (and, for Lunar New Year, data-zodiac), so it needs no JavaScript and
 * never shifts the layout after load.
 */
export function SeasonTag({ className }: { className?: string }) {
  return (
    <span className={cx('season-tags', className)}>
      {SEASONS.map((season) => {
        const Icon = icons[season];
        return (
          <span key={season} className="season-tag" data-season-for={season}>
            <Icon size={13} strokeWidth={2.25} aria-hidden="true" />
            {seasonGreetings[season]}
            {season === 'lunar' &&
              ZODIAC.map((animal) => (
                <span key={animal} className="season-tag-zodiac" data-zodiac-for={animal}>
                  Year of the {zodiacNames[animal]}
                </span>
              ))}
          </span>
        );
      })}
    </span>
  );
}
