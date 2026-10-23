'use client';

import { useSyncExternalStore, type CSSProperties } from 'react';
import { zodiacGlyphs, type Zodiac } from '@/theme/seasons';
import './Seasonal.css';

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-season', 'data-zodiac'] });
  return () => observer.disconnect();
};
const readSeason = () => document.documentElement.getAttribute('data-season');
const readZodiac = () => document.documentElement.getAttribute('data-zodiac');

// A fixed scatter (no randomness) so the arrangement is identical on every render
const scatter = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const css = (values: Record<string, string | number>) => values as CSSProperties;

/**
 * The hero's seasonal decor, drawn behind the content from the pre-paint data-season. It renders nothing
 * on the server, so markup always matches, and it is absolutely positioned, so it never moves the layout.
 * Every piece plays one short entrance (under five seconds) and then holds still; without motion it simply
 * appears in its final place.
 */
export function SeasonDecor() {
  const season = useSyncExternalStore(subscribe, readSeason, () => null);
  const zodiac = useSyncExternalStore(subscribe, readZodiac, () => null);
  if (!season) return null;

  return (
    <div className="season-decor" data-decor={season} aria-hidden="true">
      {season === 'halloween' && <Halloween />}
      {season === 'christmas' && <Christmas />}
      {season === 'lunar' && <Lunar zodiac={zodiac as Zodiac | null} />}
      {season === 'thanksgiving' && <Thanksgiving />}
      {season === 'newyear' && <NewYear />}
    </div>
  );
}

/* Halloween: a moon, a corner cobweb with a spider letting itself down, and bats that fly in and settle */

const WEB_ANGLES = [90, 103, 116, 129, 142, 155, 168, 180];
const WEB_RINGS = [30, 58, 88, 120, 154, 190, 228];
const webPoint = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `${(240 + r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`;
};
const WEB_PATH =
  WEB_ANGLES.map((deg) => `M240 0L${webPoint(250, deg)}`).join('') +
  WEB_RINGS.map((r) =>
    WEB_ANGLES.slice(1)
      .map((deg, i) => `M${webPoint(r, WEB_ANGLES[i])}Q${webPoint(r * 0.88, (WEB_ANGLES[i] + deg) / 2)} ${webPoint(r, deg)}`)
      .join('')
  ).join('');

const BAT_PATH =
  'M32 10C29 4 23 3 19 6C16 2 9 1 2 7C8 7 11 10 12 14C15 11 19 12 20 15C23 13 27 14 28 18L32 22L36 18C37 14 41 13 44 15C45 12 49 11 52 14C53 10 56 7 62 7C55 1 48 2 45 6C41 3 35 4 32 10Z';

const BATS = [
  { x: '22%', y: '7%', s: 54, d: 0.2, t: 3.6, fx: 260, fy: 150 },
  { x: '13%', y: '25%', s: 38, d: 0.55, t: 3.9, fx: 210, fy: 230 },
  { x: '31%', y: '20%', s: 30, d: 0.85, t: 4.1, fx: 330, fy: 190 },
  { x: '6%', y: '47%', s: 24, d: 1.1, t: 3.7, fx: 170, fy: 260 },
];

function Halloween() {
  return (
    <>
      <span className="decor-moon" />
      <svg className="decor-web" viewBox="0 0 240 240">
        <path className="decor-web-threads" d={WEB_PATH} />
        <line className="decor-spider-thread" x1="164.5" y1="93.3" x2="164.5" y2="168" />
        <g transform="translate(164.5 176)">
          <g className="decor-spider">
            <path className="decor-spider-legs" d="M-4-3L-11-9L-14-4M-5 0L-13-2L-16 3M-5 3L-12 6L-14 11M-4 6L-9 11L-10 16M4-3L11-9L14-4M5 0L13-2L16 3M5 3L12 6L14 11M4 6L9 11L10 16" />
            <ellipse cx="0" cy="2" rx="5.5" ry="7" />
            <circle cx="0" cy="-7" r="3.6" />
          </g>
        </g>
      </svg>
      {BATS.map((bat, i) => (
        <span
          key={i}
          className="decor-bat"
          data-bat={i}
          style={css({ '--x': bat.x, '--y': bat.y, '--s': `${bat.s}px`, '--d': `${bat.d}s`, '--t': `${bat.t}s`, '--fx': `${bat.fx}px`, '--fy': `${bat.fy}px` })}
        >
          <svg viewBox="0 0 64 24">
            <path d={BAT_PATH} />
          </svg>
        </span>
      ))}
    </>
  );
}

/* Christmas: string lights draped along the top edge, and snow that falls once and stays in the air */

const SWAGS = 4;
const BULBS_PER_SWAG = 5;
const WIRE_PATH = Array.from({ length: SWAGS }, (_, s) => `M${s * 100} 6Q${s * 100 + 50} 86 ${(s + 1) * 100} 6`).join('');
const BULBS = Array.from({ length: SWAGS * BULBS_PER_SWAG }, (_, i) => {
  const swag = Math.floor(i / BULBS_PER_SWAG);
  const t = ((i % BULBS_PER_SWAG) + 0.5) / BULBS_PER_SWAG;
  // Same curve as the wire: a quadratic from y 6 sagging to 46 at its middle
  return { x: ((swag + t) / SWAGS) * 100, y: 6 + 160 * t * (1 - t) };
});
const FLAKES = Array.from({ length: 34 }, (_, i) => {
  const y = 6 + scatter(i, 2) * 84;
  return {
    x: `${(scatter(i, 1) * 100).toFixed(2)}%`,
    y: `${y.toFixed(2)}%`,
    fall: `${(y + 14).toFixed(1)}cqh`,
    drift: `${((scatter(i, 3) - 0.5) * 60).toFixed(0)}px`,
    s: `${(2 + scatter(i, 4) * 3.2).toFixed(1)}px`,
    o: (0.45 + scatter(i, 5) * 0.5).toFixed(2),
    blur: scatter(i, 6) > 0.72 ? '1px' : '0px',
    d: `${(scatter(i, 7) * 1.1).toFixed(2)}s`,
    t: `${(2.6 + scatter(i, 8) * 1.6).toFixed(2)}s`,
  };
});

function Christmas() {
  return (
    <>
      <div className="decor-lights">
        <svg className="decor-wire" viewBox="0 0 400 64" preserveAspectRatio="none">
          <path d={WIRE_PATH} />
        </svg>
        {BULBS.map((bulb, i) => (
          <span key={i} className="decor-bulb" data-tone={i % 4} style={css({ left: `${bulb.x}%`, top: `${bulb.y}px`, '--i': i })} />
        ))}
      </div>
      {FLAKES.map((flake, i) => (
        <span
          key={i}
          className="decor-flake"
          style={css({ '--x': flake.x, '--y': flake.y, '--fall': flake.fall, '--drift': flake.drift, '--s': flake.s, '--o': flake.o, '--b': flake.blur, '--d': flake.d, '--t': flake.t })}
        />
      ))}
    </>
  );
}

/* Lunar New Year: two lanterns that sway and settle, and the year's animal stamped as a red seal */

const LANTERNS = [
  { x: '9%', w: 52, cord: 40, d: 0 },
  { x: '19%', w: 40, cord: 84, d: 0.35 },
];

function Lunar({ zodiac }: { zodiac: Zodiac | null }) {
  return (
    <>
      <svg className="decor-defs" aria-hidden="true">
        <defs>
          <radialGradient id="lantern-glow" cx="50%" cy="45%" r="60%">
            <stop offset="0" className="lantern-glow-core" />
            <stop offset="0.55" className="lantern-glow-mid" />
            <stop offset="1" className="lantern-glow-edge" />
          </radialGradient>
        </defs>
      </svg>
      {LANTERNS.map((lantern, i) => (
        <span key={i} className="decor-lantern" data-lantern={i} style={css({ '--x': lantern.x, '--w': `${lantern.w}px`, '--cord': `${lantern.cord}px`, '--d': `${lantern.d}s` })}>
          <span className="decor-lantern-cord" />
          <svg viewBox="0 0 60 100">
            <rect className="lantern-cap" x="19" y="0" width="22" height="6" rx="2" />
            <ellipse className="lantern-body" cx="30" cy="38" rx="28" ry="31" />
            <ellipse className="lantern-rib" cx="30" cy="38" rx="17" ry="31" />
            <ellipse className="lantern-rib" cx="30" cy="38" rx="6" ry="31" />
            <rect className="lantern-cap" x="19" y="66" width="22" height="6" rx="2" />
            <path className="lantern-tassel" d="M30 72V82M26 82V98M28 82V99M30 82V100M32 82V99M34 82V98" />
          </svg>
        </span>
      ))}
      {zodiac && zodiacGlyphs[zodiac] && <span className="decor-seal">{zodiacGlyphs[zodiac]}</span>}
    </>
  );
}

/* Thanksgiving: a handful of leaves drift down and come to rest */

const LEAF_PATH =
  'M12 1.5l1.7 3.9 3.2-1.3-.7 3.6 3.6.6-2.4 2.8 2.7 1.7-3.6 1.1.9 3.5-3.6-1.4L12 22.5l-1.9-6.9-3.6 1.4.9-3.5-3.6-1.1 2.7-1.7-2.4-2.8 3.6-.6-.7-3.6 3.2 1.3z';
const LEAVES = Array.from({ length: 9 }, (_, i) => {
  const y = 10 + scatter(i, 12) * 76;
  return {
    x: `${(48 + scatter(i, 11) * 48).toFixed(2)}%`,
    y: `${y.toFixed(2)}%`,
    fall: `${(y + 18).toFixed(1)}cqh`,
    drift: `${((scatter(i, 13) - 0.5) * 120).toFixed(0)}px`,
    r: `${(scatter(i, 14) * 80 - 40).toFixed(0)}deg`,
    s: `${(22 + scatter(i, 15) * 16).toFixed(0)}px`,
    d: `${(scatter(i, 16) * 1.2).toFixed(2)}s`,
    t: `${(2.8 + scatter(i, 17) * 1.4).toFixed(2)}s`,
  };
});

function Thanksgiving() {
  return (
    <>
      {LEAVES.map((leaf, i) => (
        <span
          key={i}
          className="decor-leaf"
          data-tone={i % 4}
          style={css({ '--x': leaf.x, '--y': leaf.y, '--fall': leaf.fall, '--drift': leaf.drift, '--r': leaf.r, '--s': leaf.s, '--d': leaf.d, '--t': leaf.t })}
        >
          <svg viewBox="0 0 24 24">
            <path d={LEAF_PATH} />
          </svg>
        </span>
      ))}
    </>
  );
}

/* New Year: champagne sparkles open, twinkle twice, and stay lit */

const SPARKLE_PATH = 'M12 0C12.6 7 17 11.4 24 12C17 12.6 12.6 17 12 24C11.4 17 7 12.6 0 12C7 11.4 11.4 7 12 0Z';
const SPARKLES = Array.from({ length: 11 }, (_, i) => ({
  x: `${(52 + scatter(i, 21) * 44).toFixed(2)}%`,
  y: `${(8 + scatter(i, 22) * 70).toFixed(2)}%`,
  s: `${(8 + scatter(i, 23) * 16).toFixed(0)}px`,
  o: (0.55 + scatter(i, 24) * 0.45).toFixed(2),
  d: `${(scatter(i, 25) * 1.6).toFixed(2)}s`,
}));

function NewYear() {
  return (
    <>
      <svg className="decor-defs" aria-hidden="true">
        <defs>
          <linearGradient id="decor-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" className="decor-gold-light" />
            <stop offset="0.55" className="decor-gold-mid" />
            <stop offset="1" className="decor-gold-deep" />
          </linearGradient>
        </defs>
      </svg>
      {SPARKLES.map((sparkle, i) => (
        <span key={i} className="decor-sparkle" style={css({ '--x': sparkle.x, '--y': sparkle.y, '--s': sparkle.s, '--o': sparkle.o, '--d': sparkle.d })}>
          <svg viewBox="0 0 24 24">
            <path d={SPARKLE_PATH} />
          </svg>
        </span>
      ))}
    </>
  );
}
