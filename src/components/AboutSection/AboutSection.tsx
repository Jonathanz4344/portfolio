'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, Prose, Section, SectionHeading } from '@/components/kit';
import { Reveal, SpotlightCard } from '@/components/motion';
import './AboutSection.css';

interface AboutSectionProps {
  about: string;
}

const highlights = [
  { label: 'Currently', value: 'Application Developer', sub: '@ IBM' },
  { label: 'Interests', value: 'Machine Learning & AI', sub: 'Full-Stack Development' },
  { label: 'Based in', value: 'New York City', sub: 'Open to opportunities' },
];

/** Spotify's artist "About" card: the portrait with a bio excerpt, opening the full bio in a dialog. */
const AboutSection = ({ about }: AboutSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Section className="about-section">
      <SectionHeading title="About" />

      <Reveal className="about-card-frame">
        <SpotlightCard as="button" type="button" className="about-card" onClick={() => setIsOpen(true)} aria-label="Read full bio">
          {/* A wide card stands the portrait at its right in a studio backdrop; a narrow one is all portrait */}
          <span className="about-card-media">
            <Image
              src="/profile.png"
              alt=""
              fill
              sizes="(max-width: 768px) calc(100vw - 32px), 560px"
              className="about-card-image"
            />
          </span>
          <span className="about-card-scrim" />

          <span className="about-rank">
            <span className="about-rank-number">#1</span>
            <span className="about-rank-label">for your team</span>
          </span>

          <span className="about-card-body">
            <span className="about-card-stat">Application Developer @ IBM</span>
            <span className="about-card-text">{about}</span>
          </span>
        </SpotlightCard>
      </Reveal>

      {isOpen && (
        <Dialog open onClose={() => setIsOpen(false)} label="About Jonathan" closeLabel="Close" size="lg" sheet className="about-dialog">
          <div className="about-dialog-media">
            <div className="about-dialog-portrait">
              <Image
                src="/profile.png"
                alt="Jonathan Zhu"
                fill
                sizes="(max-width: 640px) 100vw, 440px"
                className="about-dialog-image"
              />
            </div>
          </div>

          <div className="about-dialog-body">
            {/* Each highlight reads label first: "Currently", then "Application Developer", then "@ IBM" */}
            <dl className="about-highlights">
              {highlights.map((item) => (
                <div key={item.label} className="about-highlight">
                  <dt className="about-highlight-label">{item.label}</dt>
                  <dd className="about-highlight-value">{item.value}</dd>
                  <dd className="about-highlight-sub">{item.sub}</dd>
                </div>
              ))}
            </dl>

            <Prose text={about} className="about-dialog-text" />
          </div>
        </Dialog>
      )}
    </Section>
  );
};

export default AboutSection;
