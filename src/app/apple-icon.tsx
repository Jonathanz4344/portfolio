import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1DB954',
          borderRadius: '36px',
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Cursive J flowing into Z */}
            <path d="M22 18 Q26 18 30 20 C34 22 36 24 36 28 L36 58 Q36 72 24 72 Q16 72 14 64" strokeWidth="4" />
            {/* Connecting loop from J tail into Z */}
            <path d="M14 64 Q12 58 20 54 Q28 50 44 38 L78 38" strokeWidth="4" />
            {/* Z diagonal and base with exit flourish */}
            <path d="M78 38 L44 68 L80 68 Q86 68 88 62" strokeWidth="4" />
            {/* Signature underline flourish */}
            <path d="M14 80 Q40 90 86 76" strokeWidth="2.5" opacity="0.6" />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
