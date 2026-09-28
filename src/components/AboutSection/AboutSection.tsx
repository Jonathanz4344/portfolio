import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import './AboutSection.css';

interface AboutSectionProps {
  about: string;
}

const highlights = [
  { label: 'Currently', value: 'Application Developer', sub: '@ IBM' },
  { label: 'Interests', value: 'Machine Learning & AI', sub: 'Full-Stack Development' },
  { label: 'Based in', value: 'New York City', sub: 'Open to opportunities' },
];

const AboutSection = ({ about }: AboutSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  return (
    <section className="about-section">
      <div className="section-header">
        <h2>About</h2>
      </div>

      <motion.button
        className="about-card"
        onClick={() => setIsOpen(true)}
        aria-label="Read full bio"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
      >
        <img src="/profile.png" alt="" className="about-card-backdrop" />
        <img src="/profile.png" alt="" className="about-card-image" />
        <div className="about-card-shade" />

        <div className="about-rank">
          <span className="about-rank-number">#1</span>
          <span className="about-rank-label">for your team</span>
        </div>

        <div className="about-card-body">
          <span className="about-card-stat">Application Developer @ IBM</span>
          <p className="about-card-text">{about}</p>
        </div>
      </motion.button>

      {isOpen && (
        <div className="about-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="about-modal" role="dialog" aria-modal="true" aria-label="About Jonathan" onClick={(e) => e.stopPropagation()}>
            <button className="about-modal-close" onClick={() => setIsOpen(false)} aria-label="Close">
              <X size={20} />
            </button>
            <img src="/profile.png" alt="Jonathan Zhu" className="about-modal-image" />
            <div className="about-modal-body">
              <div className="about-modal-stats">
                {highlights.map((item) => (
                  <div key={item.label} className="about-modal-stat">
                    <span className="about-modal-stat-value">{item.value}</span>
                    <span className="about-modal-stat-sub">{item.sub}</span>
                    <span className="about-modal-stat-label">{item.label}</span>
                  </div>
                ))}
              </div>
              <p className="about-modal-text">{about}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;
