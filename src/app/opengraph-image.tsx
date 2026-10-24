import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { accent, gold, neutral } from '@/theme/tokens';
import { profileData } from '@/data/profileData';

export const alt = 'Jonathan Zhu | Full-Stack Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Weight = 400 | 500 | 600;

// The image renderer needs TTF or OTF files, which Google Fonts serves to older browsers.
// Without network access at build time it falls back to the renderer's default font.
async function loadFont(family: string, weight: Weight) {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1' },
    }).then((res) => res.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return { name: family, data: await fetch(url).then((res) => res.arrayBuffer()), weight, style: 'normal' as const };
  } catch {
    return null;
  }
}

// The hero's waveform, as a fixed row of bars that swell toward the middle
const BARS = Array.from({ length: 96 }, (_, i) => {
  const t = i / 95;
  return 10 + Math.round(52 * Math.sin(Math.PI * t) * Math.abs(Math.sin(t * 9.4 + 0.6)) + 10 * Math.abs(Math.sin(t * 37)));
});

export default async function OpengraphImage() {
  const [photo, display, sans] = await Promise.all([
    readFile(join(process.cwd(), 'public', 'profile.png')),
    loadFont('Fraunces', 400),
    loadFont('Inter', 500),
  ]);
  const fonts = [display, sans].filter((font) => font !== null);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 64,
          padding: '0 80px 40px',
          position: 'relative',
          background: neutral[1000],
          backgroundImage: `radial-gradient(70% 90% at 12% 0%, ${accent[500]}40, ${neutral[1000]}00 70%)`,
          fontFamily: sans ? 'Inter' : undefined,
        }}
      >
        {/* The renderer does not clip children to a rounded parent, so the image carries its own radius */}
        <img
          src={`data:image/png;base64,${photo.toString('base64')}`}
          width={300}
          height={300}
          style={{ borderRadius: 150, objectFit: 'cover', objectPosition: '50% 16%', boxShadow: `0 0 0 2px ${neutral[800]}` }}
          alt=""
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 28, color: neutral[25] }}>
            <svg width="34" height="34" viewBox="0 0 24 24">
              <path
                fill={gold[500]}
                d="M12 0L14.4 4.2L19 2.5L18.2 7.4L23 9.2L19.6 12L23 14.8L18.2 16.6L19 21.5L14.4 19.8L12 24L9.6 19.8L5 21.5L5.8 16.6L1 14.8L4.4 12L1 9.2L5.8 7.4L5 2.5L9.6 4.2L12 0Z"
              />
              <path fill={neutral[950]} d="M10.5 15.5L7 12l1.5-1.5 2 2 4.5-4.5L16.5 9.5l-6 6z" />
            </svg>
            Verified Engineer
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: display ? 'Fraunces' : undefined,
              fontSize: 96,
              lineHeight: 1,
              letterSpacing: -3,
              whiteSpace: 'nowrap',
              color: neutral[25],
            }}
          >
            {profileData.name}
          </div>
          <div style={{ display: 'flex', fontSize: 34, color: neutral[300] }}>{profileData.title}</div>
          <div style={{ display: 'flex', marginTop: 18, fontSize: 26, color: accent[300] }}>jonathanzhu.dev</div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 72,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          {BARS.map((height, i) => (
            <div
              key={i}
              style={{
                width: 4,
                height,
                borderRadius: 2,
                background: accent[500],
                opacity: 0.25 + 0.55 * Math.sin((Math.PI * i) / 95),
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
