import { GraduationCap, Award } from 'lucide-react';
import type { Education } from '../../types';
import './EducationSection.css';

interface EducationSectionProps {
  education: Education[];
}

const EducationSection = ({ education }: EducationSectionProps) => {
  return (
    <section className="education-section">
      <div className="section-header">
        <h2>Education</h2>
        <span className="section-subtitle">Academic background</span>
      </div>

      <div className="education-grid">
        {education.map((edu, index) => (
          <div key={index} className="education-card">
            <div className="education-icon">
              {edu.status.includes('Admitted') ? (
                <Award size={32} />
              ) : (
                <GraduationCap size={32} />
              )}
            </div>
            <div className="education-content">
              <h3 className="education-school">{edu.school}</h3>
              <p className="education-degree">{edu.degree}</p>
              <span className={`education-status ${edu.status.includes('Admitted') ? 'admitted' : ''}`}>
                {edu.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
