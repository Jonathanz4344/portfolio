import { MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Experience } from '@/types';
import './ExperienceSection.css';

interface ExperienceSectionProps {
  experience: Experience[];
}

const companyColors: { [key: string]: string } = {
  "Citywide Eye Care": "linear-gradient(135deg, #1DB954 0%, #169c46 100%)",
  "ZLA (Senior Capstone – Real Client)": "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
  "ADP": "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
};

const ExperienceSection = ({ experience }: ExperienceSectionProps) => {
  return (
    <section className="experience-section">
      <div className="section-header">
        <h2>Featuring Jonathan</h2>
      </div>

      <motion.div
        className="experience-list"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {experience.map((exp, index) => (
          <motion.div
            key={index}
            className="experience-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' as const }}
          >
            {exp.logo ? (
              <img 
                src={exp.logo} 
                alt={exp.company} 
                className="experience-logo-img"
              />
            ) : (
              <div 
                className="experience-logo"
                style={{ background: companyColors[exp.company] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              >
                <span>{exp.company.charAt(0)}</span>
              </div>
            )}

            <div className="experience-content">
              <div className="experience-header">
                <div className="experience-title-section">
                  <h3 className="experience-role">{exp.role}</h3>
                  <span className="experience-company">{exp.company}</span>
                </div>
                <div className="experience-meta">
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={14} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <ul className="experience-highlights">
                {exp.highlights.map((highlight, hIndex) => (
                  <li key={hIndex}>{highlight}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
