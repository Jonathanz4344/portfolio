import { chromeColor } from './tokens';
import { SEASONS, ZODIAC, lunarNewYear, seasonOn, seasonOverride, zodiacOn } from './seasons';
import { THEME_STORAGE_KEY } from './constants';

interface PrepaintConfig {
  key: string;
  chrome: Record<'dark' | 'light', string>;
  seasons: readonly string[];
  zodiac: readonly string[];
  lny: Record<number, [number, number]>;
  override: typeof seasonOverride;
}

/**
 * Runs in <head> before first paint. Applies the saved theme (dark by default), the seasonal dress
 * (from ?season=&style=&zodiac=, the preview switch, or the visitor's date) and the motion flag that
 * lets reveals start hidden. Serialized with toString(), so it must stay self-contained.
 */
function prepaint(cfg: PrepaintConfig, findSeason: typeof seasonOn, findZodiac: typeof zodiacOn) {
  const root = document.documentElement;
  let theme: string | null = null;
  try {
    theme = localStorage.getItem(cfg.key);
  } catch {
    // Storage can be blocked; fall back to the default theme
  }
  const mode = theme === 'light' ? 'light' : 'dark';
  root.setAttribute('data-theme', mode);
  root.style.colorScheme = mode;

  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', cfg.chrome[mode]);

  // Query string first, then the preview switch in seasons.ts, then the visitor's date
  const now = new Date();
  const params = new URLSearchParams(location.search);
  const fromUrl = params.get('season');
  const season = fromUrl || cfg.override?.season || findSeason(now, cfg.lny);
  // A season named in the URL is previewed exactly as the URL says; the switch's settings apply only without one
  const style = params.get('style') || (fromUrl ? null : cfg.override?.style);
  if (season && cfg.seasons.indexOf(season) > -1) {
    root.setAttribute('data-season', season);
    root.setAttribute('data-season-style', style === 'full' ? 'full' : 'dressed');
    if (season === 'lunar') {
      const chosen = params.get('zodiac') || (fromUrl ? null : cfg.override?.zodiac);
      root.setAttribute('data-zodiac', chosen && cfg.zodiac.indexOf(chosen) > -1 ? chosen : findZodiac(now, cfg.lny, cfg.zodiac));
    }
  }

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.setAttribute('data-motion', 'on');
    // If the app never hydrates, stop hiding content that is waiting to be revealed
    setTimeout(() => {
      if (!root.hasAttribute('data-hydrated')) root.removeAttribute('data-motion');
    }, 4000);
  }
}

const config: PrepaintConfig = {
  key: THEME_STORAGE_KEY,
  chrome: chromeColor,
  seasons: SEASONS,
  zodiac: ZODIAC,
  lny: lunarNewYear,
  override: seasonOverride,
};

export const prepaintScript = `(${prepaint.toString()})(${JSON.stringify(config)},${seasonOn.toString()},${zodiacOn.toString()})`;
