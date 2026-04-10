import { useState, useRef, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, Briefcase, FolderKanban, GraduationCap, User, Home, FileText, Download, X, Send, Clock } from 'lucide-react';
import type { ProfileData, Project } from '@/types';
import './Sidebar.css';

interface SidebarProps {
  profile: ProfileData;
  activeSection: string;
  onSectionChange: (section: string) => void;
  currentTrack?: number;
  projects?: Project[];
  onTrackSelect?: (index: number) => void;
}

const Sidebar = ({ profile, activeSection, onSectionChange, currentTrack, projects, onTrackSelect }: SidebarProps) => {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState<number[]>([]);
  const sidebarRef = useRef<HTMLElement>(null);

  // Load recently played from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('recentlyPlayed');
      if (stored) setRecentlyPlayed(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  // Track current track changes
  useEffect(() => {
    if (currentTrack === undefined || !projects) return;
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((i) => i !== currentTrack);
      const updated = [currentTrack, ...filtered].slice(0, 5);
      try { localStorage.setItem('recentlyPlayed', JSON.stringify(updated)); } catch { /* ignore */ }
      return updated;
    });
  }, [currentTrack, projects]);

  const handleNavClick = (section: string) => {
    onSectionChange(section);
    setIsMobileOpen(false);
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
      setIsMobileOpen(false);
    }
    setDragStartX(null);
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'projects', icon: FolderKanban, label: 'Projects' },
    { id: 'about', icon: User, label: 'About' },
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
        <img src="/profile.png" alt="JZ" className="mobile-menu-img" />
      </button>

      {/* Mobile Backdrop */}
      <div 
        className={`sidebar-backdrop ${isMobileOpen ? 'open' : ''}`}
        onClick={() => setIsMobileOpen(false)}
      />

      <aside 
        ref={sidebarRef}
        className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <img src="/profile.png" alt="JZ" className="logo-img" />
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
                    setIsMobileOpen(false);
                  }}
                >
                  {p.companyLogo ? (
                    <img src={p.companyLogo} alt={p.artist} className="rp-cover-img" />
                  ) : (
                    <div className="rp-cover" data-type={p.type.toLowerCase().replace(/\s+/g, '-')}>
                      {p.title.charAt(0)}
                    </div>
                  )}
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
          <button onClick={() => setShowMessageModal(true)} className="contact-link message-link">
            <Send size={18} />
            <span>Send Message</span>
          </button>
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

      {/* Message Modal */}
      {showMessageModal && (
        <div className="message-modal-overlay" onClick={() => {
          setShowMessageModal(false);
          setSendStatus('idle');
          setSenderEmail('');
          setMessage('');
        }}>
          <div className="message-modal" onClick={(e) => e.stopPropagation()}>
            <div className="message-modal-header">
              <h3>Send a Message</h3>
              <button 
                className="modal-close-btn"
                onClick={() => {
                  setShowMessageModal(false);
                  setSendStatus('idle');
                  setSenderEmail('');
                  setMessage('');
                }}
              >
                <X size={20} />
              </button>
            </div>
            {sendStatus === 'success' ? (
              <div className="message-success">
                <div className="success-icon">✓</div>
                <h4>Message Sent!</h4>
                <p>Thanks for reaching out. I'll get back to you soon.</p>
                <button 
                  className="close-success-btn"
                  onClick={() => {
                    setShowMessageModal(false);
                    setSendStatus('idle');
                    setSenderEmail('');
                    setMessage('');
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form 
                className="message-form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSending(true);
                  try {
                    const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_URL!, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        email: senderEmail,
                        message: message,
                      }),
                    });
                    if (response.ok) {
                      setSendStatus('success');
                    } else {
                      setSendStatus('error');
                    }
                  } catch {
                    setSendStatus('error');
                  }
                  setIsSending(false);
                }}
              >
                <div className="form-group">
                  <label htmlFor="sidebar-sender-email">Your Email</label>
                  <input
                    type="email"
                    id="sidebar-sender-email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sidebar-message">Message</label>
                  <textarea
                    id="sidebar-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi Jonathan, I'd like to discuss..."
                    rows={4}
                    required
                  />
                </div>
                {sendStatus === 'error' && (
                  <p className="error-message">Failed to send. Please try again.</p>
                )}
                <button type="submit" className="send-btn" disabled={isSending}>
                  {isSending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
