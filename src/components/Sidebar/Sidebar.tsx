import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, Phone, Briefcase, FolderKanban, GraduationCap, User, Home, FileText, Send, Clock, Award, X } from 'lucide-react';
import type { ProfileData, Project } from '@/types';
import { CoverArt } from '@/components/kit';
import { useContact } from '@/components/Contact/ContactDialogs';
import './Sidebar.css';

interface SidebarProps {
  profile: ProfileData;
  activeSection: string;
  onSectionChange: (section: string) => void;
  currentTrack?: number;
  projects?: Project[];
  onTrackSelect?: (index: number) => void;
  /** Phones only: the library is a drawer opened from the top bar. */
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar = ({ profile, activeSection, onSectionChange, currentTrack, projects, onTrackSelect, mobileOpen, onMobileClose }: SidebarProps) => {
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState<number[]>([]);
  const sidebarRef = useRef<HTMLElement>(null);
  const { openMessage, openResume } = useContact();

  // Load recently played from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('recentlyPlayed');
      // localStorage is only available after hydration, so this read has to happen in an effect
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setRecentlyPlayed(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  // Track current track changes
  useEffect(() => {
    if (currentTrack === undefined || !projects) return;
    // Merges with the list loaded from localStorage above, so it must run after that effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((i) => i !== currentTrack);
      const updated = [currentTrack, ...filtered].slice(0, 5);
      try { localStorage.setItem('recentlyPlayed', JSON.stringify(updated)); } catch { /* ignore */ }
      return updated;
    });
  }, [currentTrack, projects]);

  // The drawer closes on Escape and takes focus while open
  useEffect(() => {
    if (!mobileOpen) return;
    sidebarRef.current?.querySelector<HTMLElement>('.nav-item')?.focus({ preventScroll: true });
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onMobileClose();
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [mobileOpen, onMobileClose]);

  const handleNavClick = (section: string) => {
    onSectionChange(section);
    onMobileClose();
  };

  // Touch handlers for swipe to close
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX === null || !sidebarRef.current) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    // Only allow dragging left (negative delta)
    if (deltaX < 0) {
      sidebarRef.current.style.transform = `translateX(${deltaX}px)`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX === null || !sidebarRef.current) return;
    const deltaX = e.changedTouches[0].clientX - dragStartX;
    sidebarRef.current.style.transform = '';
    // Close if swiped left more than 80px
    if (deltaX < -80) {
      onMobileClose();
    }
    setDragStartX(null);
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'projects', icon: FolderKanban, label: 'Projects' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
    { id: 'certifications', icon: Award, label: 'Certifications' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={`sidebar-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={onMobileClose}
      />

      <aside
        ref={sidebarRef}
        className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <Image src="/profile.png" alt="JZ" width={44} height={44} sizes="44px" className="logo-img" />
            </div>
            <div className="logo-text">
              <p className="logo-name">{profile.name}</p>
              <p>{profile.title}</p>
            </div>
          </div>
          <button className="sidebar-close" onClick={onMobileClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="nav-section-title">Your Library</span>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                aria-current={activeSection === item.id ? 'true' : undefined}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Recently Played */}
        {projects && recentlyPlayed.length > 0 && (
          <div className="recently-played">
            <span className="recently-played-title">
              <Clock size={14} />
              Recently Played
            </span>
            <div className="recently-played-list">
              {recentlyPlayed.map((idx) => {
                const p = projects[idx];
                if (!p) return null;
                return (
                  <button
                    key={idx}
                    className={`recently-played-item ${currentTrack === idx ? 'active' : ''}`}
                    onClick={() => {
                      onTrackSelect?.(idx);
                      onMobileClose();
                    }}
                  >
                    <CoverArt project={p} letter={p.title.charAt(0)} sizes="40px" className="rp-cover" />
                    <div className="rp-info">
                      <span className="rp-title">{p.title}</span>
                      <span className="rp-artist">{p.artist}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="sidebar-footer">
          <div className="now-playing-card">
            <div className="now-playing-pulse"></div>
            <div className="now-playing-content">
              <span className="now-playing-label">Currently Building</span>
              <span className="now-playing-text">Cloud @ IBM</span>
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
              <span className="tabular">{profile.phone}</span>
            </a>
            <button onClick={() => openMessage('sidebar')} className="contact-link message-link">
              <Send size={18} />
              <span>Send Message</span>
            </button>
            <button onClick={() => openResume('sidebar')} className="contact-link resume-link">
              <FileText size={18} />
              <span>View Resume</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
