import { motion } from 'framer-motion';
import type { Skills } from '@/types';
import './SkillsSection.css';

interface SkillsSectionProps {
  skills: Skills;
}

const skillIcons: { [key: string]: string } = {
  "Languages": "🔤",
  "Backend / Systems": "⚙️",
  "Frontend": "🎨",
  "Databases": "🗄️",
  "Cloud / Infrastructure": "☁️",
  "Tools": "🛠️"
};

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  return (
    <section className="skills-section">
      <div className="section-header">
        <h2>Discography</h2>
      </div>

      <div className="skills-grid">
        {Object.entries(skills).map(([category, items], cardIndex) => (
          <motion.div
            key={category}
            className="skill-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.42, delay: cardIndex * 0.08, ease: 'easeOut' as const }}
          >
            <div className="skill-card-header">
              <span className="skill-icon">{skillIcons[category] || "💻"}</span>
              <h3 className="skill-category">{category}</h3>
            </div>
            <div className="skill-tags">
              {items.map((skill, index) => (
                <motion.span
                  key={index}
                  className="skill-tag"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.28, delay: cardIndex * 0.06 + index * 0.04, ease: 'easeOut' as const }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
