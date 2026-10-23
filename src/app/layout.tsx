import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { HydrationFlag } from '@/components/motion';
import { profileData } from '@/data/profileData';
import { tokensCss } from '@/theme/tokens';
import { prepaintScript } from '@/theme/prepaint';
import './globals.css';

// Self-hosted at build time and preloaded; the fallback metrics are adjusted so the swap does not shift layout
const fraunces = Fraunces({ subsets: ['latin'], axes: ['opsz', 'SOFT'], variable: '--font-fraunces', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'Jonathan Zhu | Full-Stack Software Engineer',
  description:
    'Jonathan Zhu — Application Developer at IBM and full-stack software engineer building production systems with React, TypeScript, FastAPI, PostgreSQL, AWS, Azure, and AI. View projects, experience, and certifications.',
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
      'Application Developer at IBM and full-stack software engineer working across React, TypeScript, FastAPI, PostgreSQL, AWS, Azure, and AI.',
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
      'Application Developer at IBM and full-stack software engineer working across React, TypeScript, FastAPI, PostgreSQL, AWS, Azure, and AI.',
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
    jobTitle: 'Application Developer',
    email: `mailto:${profileData.email}`,
    telephone: `+1-${profileData.phone}`,
    worksFor: {
      '@type': 'Organization',
      name: 'IBM',
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
    // The pre-paint script sets theme, season and motion attributes on <html> before React hydrates
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: tokensCss }} />
        <script dangerouslySetInnerHTML={{ __html: prepaintScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <HydrationFlag />
        <SpeedInsights />
      </body>
    </html>
  );
}
