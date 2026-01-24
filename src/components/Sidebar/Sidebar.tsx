import { useState } from 'react';
import { Github, Linkedin, Mail, Phone, Briefcase, FolderKanban, GraduationCap, User, Home, FileText, Download, X } from 'lucide-react';
import type { ProfileData } from '../../types';
import './Sidebar.css';

interface SidebarProps {
  profile: ProfileData;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ profile, activeSection, onSectionChange }: SidebarProps) => {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNavClick = (section: string) => {
    onSectionChange(section);
    setIsMobileOpen(false);
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'projects', icon: FolderKanban, label: 'Projects' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
  ];

  return (
    <>
      {/* Mobile Menu Button - Just the logo */}
      <button 
        className={`mobile-menu-btn ${isMobileOpen ? 'hidden' : ''}`}
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open menu"
      >
        <img src="/profile.jpg" alt="JZ" className="mobile-menu-img" />
      </button>

      {/* Mobile Backdrop */}
      <div 
        className={`sidebar-backdrop ${isMobileOpen ? 'open' : ''}`}
        onClick={() => setIsMobileOpen(false)}
      />

      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <img src="/profile.jpg" alt="JZ" className="logo-img" />
            </div>
            <div className="logo-text">
              <h1>{profile.name}</h1>
              <p>{profile.title}</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="nav-section-title">Your Library</span>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
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
          <button onClick={() => setShowResumeModal(true)} className="contact-link resume-link">
            <FileText size={18} />
            <span>View Resume</span>
          </button>
        </div>
      </div>
    </aside>

      {/* Resume Modal - Outside sidebar for full screen on mobile */}
      {showResumeModal && (
        <div className="resume-modal-overlay" onClick={() => setShowResumeModal(false)}>
          <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header">
              <h3>Resume</h3>
              <div className="resume-modal-actions">
                <a 
                  href="/Jonathan_Zhu_Resume.pdf"
                  download="Jonathan_Zhu_Resume.pdf"
                  className="resume-download-btn"
                >
                  <Download size={18} />
                  <span>Download</span>
                </a>
                <button 
                  className="modal-close-btn"
                  onClick={() => setShowResumeModal(false)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="resume-modal-content">
              <object
                data="/Jonathan_Zhu_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                type="application/pdf"
                className="resume-iframe"
              >
                <img 
                  src="/Jonathan_Zhu_Resume.png" 
                  alt="Jonathan Zhu Resume"
                  className="resume-image"
                />
              </object>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
