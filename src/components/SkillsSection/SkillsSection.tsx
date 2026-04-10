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
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="skill-card">
            <div className="skill-card-header">
              <span className="skill-icon">{skillIcons[category] || "💻"}</span>
              <h3 className="skill-category">{category}</h3>
            </div>
            <div className="skill-tags">
              {items.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
