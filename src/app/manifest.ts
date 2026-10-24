import type { MetadataRoute } from 'next';
import { chromeColor } from '@/theme/tokens';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jonathan Zhu | Full-Stack Software Engineer',
    short_name: 'Jonathan Zhu',
    description:
      'Application Developer at IBM and full-stack software engineer working across React, TypeScript, FastAPI, PostgreSQL, AWS, Azure, and AI.',
    start_url: '/',
    display: 'standalone',
    background_color: chromeColor.dark,
    theme_color: chromeColor.dark,
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
      { src: '/icon', sizes: '32x32', type: 'image/png' },
    ],
  };
}
