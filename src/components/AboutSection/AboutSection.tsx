import { MapPin, Briefcase, Target } from 'lucide-react';
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

      <div className="about-content">
        <p className="about-text">{about}</p>

        <div className="about-highlights">
          <div className="highlight-card">
            <div className="highlight-icon">
              <Briefcase size={24} />
            </div>
            <div className="highlight-content">
              <span className="highlight-label">Currently</span>
              <span className="highlight-value">Full-Stack Software Engineer</span>
              <span className="highlight-sub">@ Citywide Eye Care</span>
            </div>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon">
              <Target size={24} />
            </div>
            <div className="highlight-content">
              <span className="highlight-label">Focus in Tech</span>
              <span className="highlight-value">Software Engineering</span>
              <span className="highlight-sub">ML / AI Integration</span>
            </div>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon">
              <MapPin size={24} />
            </div>
            <div className="highlight-content">
              <span className="highlight-label">Based in</span>
              <span className="highlight-value">New York City</span>
              <span className="highlight-sub">Open to opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
