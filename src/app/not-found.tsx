import type { Metadata } from 'next';
import { Disc3 } from 'lucide-react';
import { ButtonLink, IconWell, PageIntro } from '@/components/kit';
import { BrandMark } from '@/components/TopBar/BrandMark';
import './not-found.css';

export const metadata: Metadata = {
  title: 'Page not found | Jonathan Zhu',
  robots: { index: false, follow: true },
};

/** The real 404: Next.js serves it with a 404 status for any unknown path. */
export default function NotFound() {
  return (
    <main id="main" className="not-found" tabIndex={-1}>
      <a href="/" className="not-found-brand" aria-label="Jonathan Zhu">
        <BrandMark size={32} />
      </a>
      <div className="not-found-panel">
        <IconWell tone="accent" className="not-found-icon">
          <Disc3 size={30} strokeWidth={1.5} />
        </IconWell>
        <PageIntro
          eyebrow="404"
          title="Page not found"
          lede="This page may have moved, or the link may be wrong."
          actions={
            <ButtonLink href="/" variant="primary" size="lg">
              Back to home
            </ButtonLink>
          }
        />
      </div>
    </main>
  );
}
