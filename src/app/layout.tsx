import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jonathan Zhu | Full-Stack Software Engineer',
  description:
    'Jonathan Zhu — Full-Stack Software Engineer specializing in React, TypeScript, FastAPI, PostgreSQL, and AWS. View projects, experience, and skills.',
  keywords: [
    'Jonathan Zhu',
    'Software Engineer',
    'Full-Stack Developer',
    'React',
    'TypeScript',
    'FastAPI',
    'PostgreSQL',
    'AWS',
    'Portfolio',
    'New York',
    'RIT',
    'Georgia Tech',
  ],
  authors: [{ name: 'Jonathan Zhu' }],
  creator: 'Jonathan Zhu',
  metadataBase: new URL('https://jonathanzhu.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Jonathan Zhu | Full-Stack Software Engineer',
    description:
      'Full-Stack Software Engineer specializing in React, TypeScript, FastAPI, PostgreSQL, and AWS.',
    url: 'https://jonathanzhu.dev',
    siteName: 'Jonathan Zhu Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/profile.png',
        width: 400,
        height: 400,
        alt: 'Jonathan Zhu',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Jonathan Zhu | Full-Stack Software Engineer',
    description:
      'Full-Stack Software Engineer specializing in React, TypeScript, FastAPI, PostgreSQL, and AWS.',
    images: ['/profile.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
