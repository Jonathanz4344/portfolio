import type { ReactNode } from 'react';
import { Reveal, SplitWords } from '@/components/motion';
import { Eyebrow } from './Eyebrow';
import { Section, type Band } from './Section';
import { cx } from './cx';
import './kit.css';

interface CTABandProps {
  eyebrow?: ReactNode;
  title: string;
  body?: ReactNode;
  actions: ReactNode;
  band?: Band;
  className?: string;
}

/** The closing call to action: a quiet band with one decision on it. */
export function CTABand({ eyebrow, title, body, actions, band = 'tint', className }: CTABandProps) {
  return (
    <Section band={band} className={cx('cta-band', className)}>
      <div className="cta-band-inner">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="cta-band-title">
          <SplitWords text={title} />
        </h2>
        {body && (
          <Reveal as="p" className="cta-band-body" delay={160}>
            {body}
          </Reveal>
        )}
        <Reveal className="cta-band-actions" delay={240}>
          {actions}
        </Reveal>
      </div>
    </Section>
  );
}
