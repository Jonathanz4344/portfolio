import { MapPin, Briefcase, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import './AboutSection.css';

interface AboutSectionProps {
  about: string;
}

const AboutSection = ({ about }: AboutSectionProps) => {
  return (
    <section className="about-section">
      <div className="section-header">
        <h2>About</h2>
      </div>

      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
      >
        <p className="about-text">{about}</p>

        <div className="about-highlights">
          {[
            {
              icon: <Briefcase size={24} />,
              label: 'Currently',
              value: 'Full-Stack Software Engineer',
              sub: '@ Citywide Eye Care',
            },
            {
              icon: <Target size={24} />,
              label: 'Interests',
              value: 'Machine Learning & AI',
              sub: 'Full-Stack Development',
            },
            {
              icon: <MapPin size={24} />,
              label: 'Based in',
              value: 'New York City',
              sub: 'Open to opportunities',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="highlight-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' as const }}
            >
              <div className="highlight-icon">{item.icon}</div>
              <div className="highlight-content">
                <span className="highlight-label">{item.label}</span>
                <span className="highlight-value">{item.value}</span>
                <span className="highlight-sub">{item.sub}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
