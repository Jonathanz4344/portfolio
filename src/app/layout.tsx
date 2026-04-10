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
  verification: {
    google: 'RUGCm2kP-g6upWPISM4gI6KJMhEzcbvxE9SBOKUQCu0',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jonathan Zhu',
    url: 'https://jonathanzhu.dev',
    image: 'https://jonathanzhu.dev/profile.png',
    jobTitle: 'Full-Stack Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Citywide Eye Care',
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Rochester Institute of Technology',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Georgia Institute of Technology',
      },
    ],
    knowsAbout: [
      'React',
      'TypeScript',
      'FastAPI',
      'PostgreSQL',
      'AWS',
      'Python',
      'Next.js',
      'Machine Learning',
    ],
    sameAs: [
      'https://github.com/Jonathanz4344',
      'https://linkedin.com/in/jonathanzhuu',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New York City',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
