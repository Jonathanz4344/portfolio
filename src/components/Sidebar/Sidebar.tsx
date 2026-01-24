import { Github, Linkedin, Mail, Phone, Briefcase, Code, GraduationCap, User, Home } from 'lucide-react';
import type { ProfileData } from '../../types';
import './Sidebar.css';

interface SidebarProps {
  profile: ProfileData;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ profile, activeSection, onSectionChange }: SidebarProps) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'projects', icon: Code, label: 'Projects' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <span>JZ</span>
          </div>
          <div className="logo-text">
            <h1>{profile.name}</h1>
            <p>{profile.title}</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <span className="nav-section-title">Menu</span>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="now-playing-card">
          <div className="now-playing-pulse"></div>
          <div className="now-playing-content">
            <span className="now-playing-label">Currently Building</span>
            <span className="now-playing-text">EMR System @ Citywide Eye Care</span>
          </div>
        </div>

        <div className="contact-links">
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-link">
            <Github size={18} />
            <span>GitHub</span>
          </a>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-link">
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>
          <a href={`mailto:${profile.email}`} className="contact-link">
            <Mail size={18} />
            <span>{profile.email}</span>
          </a>
          <a href={`tel:${profile.phone}`} className="contact-link">
            <Phone size={18} />
            <span>{profile.phone}</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
