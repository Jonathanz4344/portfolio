/**
 * Design tokens: the only file in the app that holds raw color, type, radius and motion values.
 * They are emitted as CSS custom properties (see tokensCss below). theme.css maps them to semantic
 * roles per mode and season, and components read only those semantic roles, never raw values.
 */

/** Brand accent, pinned to the logo green at 500 (OKLCH hue 149). */
export const accent = {
  50: '#ECFCEE',
  100: '#D8F8DD',
  200: '#B2F0BC',
  300: '#82E595',
  400: '#54D474',
  500: '#1DB954',
  600: '#2A984A',
  700: '#21773A',
  800: '#165C2F',
  900: '#104020',
  950: '#0A2612',
} as const;

/** Warm neutrals: paper at the low end, ink at the high end. */
export const neutral = {
  0: '#FEFCF9',
  25: '#F9F6F2',
  50: '#F3F0EA',
  100: '#EBE7E1',
  150: '#E1DDD7',
  200: '#D4D0CA',
  300: '#BBB7B0',
  400: '#98958E',
  500: '#7A7771',
  550: '#6C6863',
  600: '#5E5A55',
  700: '#45423D',
  800: '#302D29',
  850: '#25221F',
  900: '#1D1B19',
  925: '#171613',
  950: '#12110F',
  975: '#0C0B09',
  1000: '#060605',
} as const;

/** Errors only. */
export const danger = { 300: '#FFB0A3', 700: '#A92E21' } as const;

/** The small metallics, for stars, badges and certification tiers. */
export const gold = { 200: '#F5E3B8', 300: '#ECCD8C', 500: '#D6A95B', 700: '#815D26', 900: '#503816' } as const;
export const platinum = { 200: '#E5E8EC', 300: '#CDD1D6', 500: '#A6ABB1', 700: '#6C7278', 900: '#383E43' } as const;

/**
 * Record-sleeve tones for generated cover art (skills playlists, lettered project covers).
 * Tone-on-tone around the brand hue so a shelf of covers still reads as one accent.
 */
export const sleeves = [accent[800], neutral[800], accent[950], gold[900], accent[700], neutral[700], accent[900], platinum[900]] as const;

type SeasonScale = Record<200 | 300 | 400 | 500 | 600 | 700 | 900, string> & {
  canvasDark: string;
  surfaceDark: string;
  canvasLight: string;
  surfaceLight: string;
  /** Icon and text color on the 500 fill (the full style's play buttons). */
  onFill: string;
};

/** Seasonal palettes. "Dressed" seasons use them for accents and decor; "full" seasons replace the brand accent. */
export const seasonPalettes: Record<'halloween' | 'thanksgiving' | 'christmas' | 'newyear' | 'lunar', SeasonScale> = {
  // Pumpkin on plum-black
  halloween: {
    200: '#FFD4BB', 300: '#FEB487', 400: '#FC8C3F', 500: '#E77412', 600: '#BC5B00', 700: '#964700', 900: '#4B2000',
    canvasDark: '#0A050F', surfaceDark: '#120A18', canvasLight: '#EBE3ED', surfaceLight: '#F9F5FA', onFill: neutral[1000],
  },
  thanksgiving: {
    200: '#FBD6B7', 300: '#F5B985', 400: '#E59B56', 500: '#D18438', 600: '#AD671A', 700: '#8C4F05', 900: '#442504',
    canvasDark: '#0D0805', surfaceDark: '#150C05', canvasLight: '#F1E7DF', surfaceLight: '#FCF5F0', onFill: neutral[1000],
  },
  // Cranberry on evergreen
  christmas: {
    200: '#FED2CF', 300: '#FEA5A2', 400: '#E85F61', 500: '#C32E3A', 600: '#A51D2B', 700: '#8D1925', 900: '#430F11',
    canvasDark: '#010A05', surfaceDark: '#03120A', canvasLight: '#E0E9E1', surfaceLight: '#F3F8F4', onFill: neutral[25],
  },
  newyear: {
    200: '#ECDCBD', 300: '#DFC48F', 400: '#CAA965', 500: '#B5934B', 600: '#957530', 700: '#775C1F', 900: '#3A2B0C',
    canvasDark: '#0B0803', surfaceDark: '#130E04', canvasLight: '#EFE9DE', surfaceLight: '#FAF6EF', onFill: neutral[1000],
  },
  lunar: {
    200: '#FFD2CA', 300: '#FFB0A3', 400: '#FF8673', 500: '#F75F4C', 600: '#CF4232', 700: '#A92E21', 900: '#54140D',
    canvasDark: '#0E0705', surfaceDark: '#170B09', canvasLight: '#F3E5E2', surfaceLight: '#FDF4F3', onFill: neutral[1000],
  },
};

export const fonts = {
  display: "var(--font-fraunces), 'Iowan Old Style', 'Palatino Linotype', Georgia, serif",
  sans: "var(--font-inter), ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
} as const;

/** Fluid type scale (15px body). */
export const text = {
  '2xs': '0.6875rem',
  xs: '0.75rem',
  sm: '0.8125rem',
  base: '0.9375rem',
  md: '1.0625rem',
  lg: 'clamp(1.125rem, 1.05rem + 0.3vw, 1.3125rem)',
  xl: 'clamp(1.375rem, 1.2rem + 0.7vw, 1.75rem)',
  '2xl': 'clamp(1.625rem, 1.3rem + 1.3vw, 2.25rem)',
  '3xl': 'clamp(2rem, 1.4rem + 2.6vw, 3.5rem)',
  display: 'clamp(3rem, 1.6rem + 6vw, 7.25rem)',
} as const;

export const space = {
  1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '20px', 6: '24px', 8: '32px', 10: '40px', 12: '48px', 16: '64px', 20: '80px',
} as const;

export const radius = {
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '18px',
  pill: '999px',
  /** Every photo, cover and badge frame uses this one radius. */
  media: '8px',
  /** The rounded app panels of the shell. */
  panel: '12px',
} as const;

export const ease = {
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
} as const;

export const duration = {
  1: '120ms',
  2: '200ms',
  3: '320ms',
  4: '480ms',
  5: '720ms',
  6: '1100ms',
  kenBurns: '22s',
  marquee: '48s',
} as const;

export const layout = {
  topbar: '64px',
  topbarCompact: '56px',
  player: '76px',
  playerCompact: '64px',
  sidebar: 'clamp(264px, 22vw, 340px)',
  shellGap: '8px',
  // Exactly 16px on phones (matching the phone layouts' fixed 16px edges), 32px on desktop
  gutter: 'clamp(16px, 0.5rem + 2vw, 32px)',
  content: '1240px',
} as const;

export const zIndex = { sticky: 20, header: 40, player: 50, drawer: 60, popover: 70 } as const;

const scale = (prefix: string, values: Record<string | number, string>) =>
  Object.entries(values).map(([key, value]) => `--${prefix}-${key}:${value};`).join('');

const seasonBlocks = Object.entries(seasonPalettes)
  .map(([season, { canvasDark, surfaceDark, canvasLight, surfaceLight, onFill, ...steps }]) =>
    `:root[data-season="${season}"]{${scale('season', steps)}--season-canvas-dark:${canvasDark};--season-surface-dark:${surfaceDark};--season-canvas-light:${canvasLight};--season-surface-light:${surfaceLight};--season-on-fill:${onFill};}`
  )
  .join('');

/** Every token as a CSS custom property. Inlined in <head> by the root layout so it is present at first paint. */
export const tokensCss =
  ':root{' +
  scale('accent', accent) +
  scale('neutral', neutral) +
  scale('gold', gold) +
  scale('platinum', platinum) +
  scale('danger', danger) +
  sleeves.map((tone, i) => `--sleeve-${i + 1}:${tone};`).join('') +
  `--font-display:${fonts.display};--font-sans:${fonts.sans};` +
  scale('text', text) +
  scale('space', space) +
  scale('radius', radius) +
  scale('ease', ease) +
  scale('dur', duration) +
  `--topbar-h:${layout.topbar};--topbar-h-compact:${layout.topbarCompact};--player-h:${layout.player};--player-h-compact:${layout.playerCompact};` +
  `--sidebar-w:${layout.sidebar};--shell-gap:${layout.shellGap};--gutter:${layout.gutter};--content-w:${layout.content};` +
  Object.entries(zIndex).map(([key, value]) => `--z-${key}:${value};`).join('') +
  '}' +
  seasonBlocks;

/** Browser chrome colors per mode (meta theme-color), matched to the canvas. */
export const chromeColor = { dark: neutral[1000], light: neutral[100] } as const;
