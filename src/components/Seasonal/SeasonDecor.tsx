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
      {season === 'stpatricks' && <StPatricks />}
      {season === 'spring' && <Spring />}
      {season === 'july4' && <July4 />}
      {season === 'summer' && <Summer />}
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

/**
 * Which hero widths hide a flake, so none rests behind the text or the controls. In percent of the hero:
 * wide is over 1000px, mid is 861 to 1000px, narrow is a desktop hero up to 860px, phone is the centered column.
 */
const flakeOff = (x: number, y: number) => {
  const off = (hidden: boolean) => (hidden ? 'off' : undefined);
  return {
    'data-wide': off((x > 24 && x < 78 && y > 18 && y < 62) || (x < 32 && y > 84)),
    'data-mid': off((x > 24 && x < 82 && y > 14 && y < 62) || (x < 38 && y > 83)),
    'data-narrow': off(!(y < 7 || (y > 64 && !(x < 66 && y > 83)))),
    'data-phone': off((y > 46 && y < 75) || y > 86 || (y < 10 && (x < 18 || x > 82))),
  };
};

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
  const x = scatter(i, 1) * 100;
  const y = 6 + scatter(i, 2) * 84;
  return {
    off: flakeOff(x, y),
    x: `${x.toFixed(2)}%`,
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
          {...flake.off}
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
// Leaves whose scatter spot would rest behind the name or the greeting
const LEAF_SPOTS: Record<number, [number, number]> = { 0: [85.5, 40], 1: [57, 8], 2: [58, 76], 6: [70, 8] };
const NARROW_LEAVES = [0, 2, 4, 5, 7];
const LEAVES = Array.from({ length: 9 }, (_, i) => {
  const [x, y] = LEAF_SPOTS[i] ?? [48 + scatter(i, 11) * 48, 10 + scatter(i, 12) * 76];
  return {
    narrow: NARROW_LEAVES.includes(i),
    x: `${x.toFixed(2)}%`,
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
          data-narrow={leaf.narrow ? undefined : 'off'}
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
// Sparkles whose scatter spot would rest behind the name
const SPARKLE_SPOTS: Record<number, [number, number]> = { 3: [56.5, 76], 7: [64, 17], 8: [79.5, 21.7] };
const NARROW_SPARKLES = [0, 1, 2, 4, 6, 9];
const SPARKLES = Array.from({ length: 11 }, (_, i) => ({
  narrow: NARROW_SPARKLES.includes(i),
  x: `${(SPARKLE_SPOTS[i]?.[0] ?? 52 + scatter(i, 21) * 44).toFixed(2)}%`,
  y: `${(SPARKLE_SPOTS[i]?.[1] ?? 8 + scatter(i, 22) * 70).toFixed(2)}%`,
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
        <span key={i} className="decor-sparkle" data-narrow={sparkle.narrow ? undefined : 'off'} style={css({ '--x': sparkle.x, '--y': sparkle.y, '--s': sparkle.s, '--o': sparkle.o, '--d': sparkle.d })}>
          <svg viewBox="0 0 24 24">
            <path d={SPARKLE_PATH} />
          </svg>
        </span>
      ))}
    </>
  );
}

/*
 * The four below place each piece twice, in percent of the hero: dx and dy on desktop, mx and my on phones.
 * A piece with no phone place stays off phones. The spots are picked to stay clear of the hero's text.
 */

/* St. Patrick's: a gold record with a shamrock on its label rolls in, and the shamrocks it throws off come to rest */

const CLOVER_LEAF = 'M0 0C-1.6-2.6-6.4-3.2-7-7C-7.5-10.2-3.6-11.8-1.6-10.2C-.8-9.6-.3-8.9 0-8C.3-8.9 .8-9.6 1.6-10.2C3.6-11.8 7.5-10.2 7-7C6.4-3.2 1.6-2.6 0 0Z';
const CLOVER_STEM = 'M0 0Q1.5 6 5 10.5';
const GROOVES = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45];
const CLOVERS = [
  { dx: 60, dy: 8, s: 26, r: -14, tone: 0, d: 0.9, mx: 5, my: 13 },
  { dx: 70, dy: 17, s: 20, r: 18, tone: 1, d: 1.05, mx: 15, my: 24 },
  { dx: 77, dy: 6, s: 32, r: 10, tone: 2, d: 0.8, mx: 6, my: 36 },
  { dx: 79, dy: 44, s: 24, r: -20, tone: 1, d: 1.2, mx: 17, my: 41 },
  { dx: 75, dy: 66, s: 30, r: 24, tone: 0, d: 1.0, mx: 8, my: 74 },
  { dx: 87, dy: 62, s: 22, r: -8, tone: 3, d: 1.35, mx: 84, my: 33, leaves: 4 },
  { dx: 93, dy: 74, s: 28, r: 16, tone: 2, d: 1.15, mx: 90, my: 74 },
  { dx: 62, dy: 72, s: 18, r: -24, tone: 2, d: 1.3 },
];

function CloverLeaves({ leaves }: { leaves: number }) {
  const turn = 360 / leaves;
  return (
    <>
      <path className="decor-clover-stem" d={CLOVER_STEM} />
      {Array.from({ length: leaves }, (_, i) => (
        <path key={i} d={CLOVER_LEAF} transform={`rotate(${i * turn + (leaves === 4 ? 45 : 0)})`} />
      ))}
    </>
  );
}

function StPatricks() {
  return (
    <>
      <span className="decor-record">
        <svg viewBox="0 0 200 200">
          {GROOVES.map((r) => (
            <circle key={r} className="record-groove" cx="100" cy="100" r={r} />
          ))}
          <circle className="record-label" cx="100" cy="100" r="38" />
          <g className="record-shamrock" transform="translate(100 98) scale(2.3)">
            <CloverLeaves leaves={3} />
          </g>
          <circle className="record-hole" cx="100" cy="100" r="3" />
        </svg>
      </span>
      {CLOVERS.map((clover, i) => (
        <span
          key={i}
          className="decor-clover"
          data-tone={clover.tone}
          data-phone={clover.mx === undefined ? 'off' : undefined}
          style={css({ '--dx': clover.dx, '--dy': clover.dy, '--mx': clover.mx ?? 0, '--my': clover.my ?? 0, '--s': `${clover.s}px`, '--r': `${clover.r}deg`, '--d': `${clover.d}s` })}
        >
          <svg viewBox="-12 -12 24 24">
            <CloverLeaves leaves={clover.leaves ?? 3} />
          </svg>
        </span>
      ))}
    </>
  );
}

/* Spring: equalizer bars come up as stems and open into cherry blossom, and a few loose petals settle */

const BLOSSOM_PETAL = 'M0-1.2C-3.6-3.6-5-7.6-2.4-11.2L0-9.6L2.4-11.2C5-7.6 3.6-3.6 0-1.2Z';
const BLOSSOM_TURNS = [0, 72, 144, 216, 288];
const STEMS = [
  { dx: 57.5, dh: 14, s: 22 },
  { dx: 60.85, dh: 22, s: 28 },
  { dx: 64.2, dh: 17, s: 20 },
  { dx: 67.55, dh: 30, s: 32 },
  { dx: 70.9, dh: 24, s: 24 },
  { dx: 74.25, dh: 36, s: 30, mx: 19.5, mh: 9, ms: 18 },
  { dx: 77.6, dh: 56, s: 36, mx: 14.5, mh: 15, ms: 22 },
  { dx: 80.95, dh: 44, s: 28, mx: 9.5, mh: 24, ms: 26 },
  { dx: 84.3, dh: 68, s: 40, mx: 4.5, mh: 32, ms: 30 },
  { dx: 87.65, dh: 54, s: 30, mx: 80.5, mh: 8, ms: 18 },
  { dx: 91, dh: 78, s: 44, mx: 85.5, mh: 14, ms: 22 },
  { dx: 94.35, dh: 60, s: 32, mx: 90.5, mh: 20, ms: 24 },
  { dx: 97.7, dh: 38, s: 24, mx: 95.5, mh: 28, ms: 28 },
];
const PETALS = Array.from({ length: 8 }, (_, i) => {
  const dy = 6 + scatter(i, 32) * 52;
  return {
    dx: (77 + scatter(i, 31) * 21).toFixed(2),
    dy: dy.toFixed(2),
    mx: ((i % 2 ? 80 : 3) + scatter(i, 33) * 17).toFixed(2),
    my: (11 + scatter(i, 34) * 33).toFixed(2),
    fall: `${(dy + 16).toFixed(1)}cqh`,
    drift: `${((scatter(i, 35) - 0.5) * 110).toFixed(0)}px`,
    r: `${(scatter(i, 36) * 300).toFixed(0)}deg`,
    s: `${(7 + scatter(i, 37) * 6).toFixed(0)}px`,
    d: `${(0.9 + scatter(i, 38) * 1.1).toFixed(2)}s`,
    t: `${(1.9 + scatter(i, 39) * 0.9).toFixed(2)}s`,
  };
});

function Spring() {
  return (
    <>
      <div className="decor-garden">
        {STEMS.map((stem, i) => (
          <span
            key={i}
            className="decor-stem"
            data-phone={stem.mx === undefined ? 'off' : undefined}
            style={css({ '--dx': stem.dx, '--dh': stem.dh, '--mx': stem.mx ?? 0, '--mh': stem.mh ?? 0, '--s': `${stem.s}px`, '--ms': `${stem.ms ?? 0}px`, '--i': i })}
          >
            <span className="decor-stem-bar" />
            <span className="decor-bloom" data-tone={i % 3}>
              <svg viewBox="-12 -12 24 24">
                {BLOSSOM_TURNS.map((turn) => (
                  <path key={turn} d={BLOSSOM_PETAL} transform={`rotate(${turn})`} />
                ))}
                <circle className="decor-bloom-heart" r="2.2" />
              </svg>
            </span>
          </span>
        ))}
      </div>
      {PETALS.map((petal, i) => (
        <span
          key={i}
          className="decor-petal"
          data-tone={i % 2}
          style={css({ '--dx': petal.dx, '--dy': petal.dy, '--mx': petal.mx, '--my': petal.my, '--fall': petal.fall, '--drift': petal.drift, '--r': petal.r, '--s': petal.s, '--d': petal.d, '--t': petal.t })}
        />
      ))}
    </>
  );
}

/* July 4th: a flag whose stripes are level meters, and fireworks drawn as radial equalizers in red, white and blue */

const STRIPES = [100, 88, 96, 78, 92, 70, 84];
const STAR_PATH = 'M0-3L.9-.9L3-.9L1.3 .4L1.9 2.6L0 1.3L-1.9 2.6L-1.3 .4L-3-.9L-.9-.9Z';
const CANTON_STARS = [8, 22, 36, 50, 64].flatMap((x) => [{ x, y: 7 }, { x, y: 23 }]).concat([15, 29, 43, 57].map((x) => ({ x, y: 15 })));
const burstRays = (salt: number) =>
  Array.from({ length: 24 }, (_, i) => ({
    turn: i * 15,
    tip: Number((-28 - scatter(i, salt) * 16).toFixed(1)),
    tone: i % 3,
  }));
const BURSTS = [
  { dx: 88, dy: 57, s: 150, d: 0.5, mx: 13, my: 21, ms: 78, rays: burstRays(41) },
  { dx: 67, dy: 77, s: 86, d: 1.1, mx: 90, my: 34, ms: 60, rays: burstRays(42) },
  { dx: 63, dy: 11, s: 60, d: 1.6, rays: burstRays(43) },
];

function July4() {
  return (
    <>
      <div className="decor-flag">
        {STRIPES.map((length, i) => (
          <span key={i} className="decor-stripe" data-tone={i % 2} style={css({ '--w': `${length}%`, '--i': i })} />
        ))}
        <span className="decor-canton">
          <svg viewBox="0 0 72 30">
            {CANTON_STARS.map((star) => (
              <path key={`${star.x}-${star.y}`} d={STAR_PATH} transform={`translate(${star.x} ${star.y})`} />
            ))}
          </svg>
        </span>
      </div>
      {BURSTS.map((burst, i) => (
        <span
          key={i}
          className="decor-burst"
          data-phone={burst.mx === undefined ? 'off' : undefined}
          style={css({ '--dx': burst.dx, '--dy': burst.dy, '--mx': burst.mx ?? 0, '--my': burst.my ?? 0, '--s': `${burst.s}px`, '--ms': `${burst.ms ?? 0}px`, '--d': `${burst.d}s` })}
        >
          <svg viewBox="-50 -50 100 100">
            {burst.rays.map((ray) => (
              <g key={ray.turn} data-tone={ray.tone} transform={`rotate(${ray.turn})`}>
                <line y1="-15" y2={ray.tip} />
                <circle cy={ray.tip - 4} r="1.2" />
              </g>
            ))}
          </svg>
        </span>
      ))}
    </>
  );
}

/* Summer: a retro album-cover sun sets behind the waveform, the sea takes its reflection, and gulls glide in */

const SUN_BANDS = [
  [0, 90],
  [94, 13],
  [111, 10],
  [125, 8],
  [137, 6],
  [146, 4],
];
const SEA = Array.from({ length: 5 }, (_, row) => [
  // The reflection, narrowing away from the sun
  { x: 73 - (30 - row * 5.5) / 2, w: 30 - row * 5.5, tone: 'sun', row },
  // Open water on either side of it
  ...Array.from({ length: 3 }, (_, i) => ({
    x: Number((i * 17 + scatter(row * 3 + i, 51) * 10).toFixed(2)),
    w: Number((5 + scatter(row * 3 + i, 52) * 8).toFixed(2)),
    tone: 'sea',
    row,
  })),
  { x: 91 + row * 1.2, w: 7 - row, tone: 'sea', row },
]).flat();
const GULLS = [
  { dx: 63, dy: 13, s: 36, d: 0.4, mx: 5, my: 13, ms: 28 },
  { dx: 71, dy: 17, s: 26, d: 0.8, mx: 13, my: 23, ms: 22 },
  { dx: 79, dy: 9, s: 30, d: 1.1, mx: 81, my: 15, ms: 24 },
];

function Summer() {
  return (
    <>
      <svg className="decor-defs" aria-hidden="true">
        <defs>
          <linearGradient id="sun-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.08" className="sun-fill-top" />
            <stop offset="0.5" className="sun-fill-mid" />
            <stop offset="0.8" className="sun-fill-low" />
          </linearGradient>
          <clipPath id="sun-bands">
            {SUN_BANDS.map(([y, height]) => (
              <rect key={y} x="0" y={y} width="200" height={height} />
            ))}
          </clipPath>
        </defs>
      </svg>
      <div className="decor-sea">
        {SEA.map((dash, i) => (
          <span key={i} className="decor-wave" data-tone={dash.tone} style={css({ '--x': `${dash.x}%`, '--w': `${dash.w}%`, '--row': dash.row })} />
        ))}
      </div>
      <div className="decor-sunset">
        <span className="decor-sun-glow" />
        <span className="decor-sun">
          <svg viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="98" fill="url(#sun-fill)" clipPath="url(#sun-bands)" />
          </svg>
        </span>
      </div>
      {GULLS.map((gull, i) => (
        <span
          key={i}
          className="decor-gull"
          style={css({ '--dx': gull.dx, '--dy': gull.dy, '--mx': gull.mx, '--my': gull.my, '--s': `${gull.s}px`, '--ms': `${gull.ms}px`, '--d': `${gull.d}s` })}
        >
          <svg viewBox="0 0 32 14">
            <path d="M1 10C6 3 12 3 16 10C20 3 26 3 31 10" />
          </svg>
        </span>
      ))}
    </>
  );
}
