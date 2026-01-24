import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Shuffle, MoreHorizontal, Linkedin, Github, Mail, Phone, X, Send, FileText, Download } from 'lucide-react';
import type { ProfileData } from '../../types';
import './Hero.css';

interface HeroProps {
  profile: ProfileData;
  isPlaying: boolean;
  onPlayToggle: () => void;
  isShuffleOn: boolean;
  onShuffleToggle: () => void;
}

const Hero = ({ profile, isPlaying, onPlayToggle, isShuffleOn, onShuffleToggle }: HeroProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [monthlyListeners, setMonthlyListeners] = useState<number>(1247);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Track monthly listeners - increments on each unique visit
  useEffect(() => {
    const trackVisit = async () => {
      const hasVisited = sessionStorage.getItem('portfolio_visited');
      
      try {
        if (!hasVisited) {
          // Increment counter for new visitor
          const response = await fetch('/api/visitors', { method: 'POST' });
          const data = await response.json();
          const baseListeners = 1200;
          setMonthlyListeners(baseListeners + (data.count || 0));
          sessionStorage.setItem('portfolio_visited', 'true');
        } else {
          // Just get current count without incrementing
          const response = await fetch('/api/visitors');
          const data = await response.json();
          const baseListeners = 1200;
          setMonthlyListeners(baseListeners + (data.count || 0));
        }
      } catch (error) {
        console.log('Visitor counter unavailable');
      }
    };
    
    trackVisit();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-image">
          <div className="profile-photo">
            <img src="/profile.png" alt="Jonathan Zhu" className="profile-img" />
          </div>
        </div>

        <div className="hero-info">
          <div className="verified-badge">
            <span className="verified-icon">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="#4CB3FF" d="M12 0L14.4 4.2L19 2.5L18.2 7.4L23 9.2L19.6 12L23 14.8L18.2 16.6L19 21.5L14.4 19.8L12 24L9.6 19.8L5 21.5L5.8 16.6L1 14.8L4.4 12L1 9.2L5.8 7.4L5 2.5L9.6 4.2L12 0Z"/>
                <path fill="#fff" d="M10.5 15.5L7 12l1.5-1.5 2 2 4.5-4.5L16.5 9.5l-6 6z"/>
              </svg>
            </span>
            <span>Verified Engineer</span>
          </div>
          
          <h1 className="hero-name">{profile.name.toUpperCase()}</h1>
          
          <div className="hero-stats">
            <span className="monthly-listeners">{monthlyListeners.toLocaleString()} monthly listeners</span>
          </div>
        </div>
      </div>

      {/* Action Bar - Spotify Style */}
      <div className="hero-action-bar">
        <div className="action-bar-controls">
          <button className="play-btn-large" onClick={onPlayToggle}>
            {isPlaying ? <Pause size={28} fill="#000" /> : <Play size={28} fill="#000" />}
          </button>
          
          <button 
            className={`shuffle-btn ${isShuffleOn ? 'active' : ''}`}
            onClick={onShuffleToggle}
            title={isShuffleOn ? 'Disable shuffle' : 'Enable shuffle'}
          >
            <Shuffle size={24} />
          </button>

          <a 
            href={profile.linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="follow-btn"
          >
            Following
          </a>

          <div className="more-menu" ref={dropdownRef}>
            <button 
              className="more-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <MoreHorizontal size={24} />
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
              <a 
                href={profile.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="dropdown-item"
              >
                <Linkedin size={18} />
                <span>Follow on LinkedIn</span>
              </a>
              <a 
                href={profile.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="dropdown-item"
              >
                <Github size={18} />
                <span>Go to GitHub</span>
              </a>
              <button 
                onClick={() => {
                  setShowMessageModal(true);
                  setShowDropdown(false);
                }}
                className="dropdown-item"
              >
                <Mail size={18} />
                <span>Send message</span>
              </button>
              <a 
                href={`tel:${profile.phone}`}
                className="dropdown-item"
              >
                <Phone size={18} />
                <span>Call {profile.phone}</span>
              </a>
              <button 
                onClick={() => {
                  setShowResumeModal(true);
                  setShowDropdown(false);
                }}
                className="dropdown-item"
              >
                <FileText size={18} />
                <span>View Resume</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section Titles */}
      <div className="section-titles">
        <h2 className="section-title">Popular</h2>
        <h2 className="section-title">Liked Projects</h2>
      </div>
    </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="message-modal-overlay" onClick={() => setShowMessageModal(false)}>
          <div className="message-modal" onClick={(e) => e.stopPropagation()}>
            <div className="message-modal-header">
              <h3>Send a Message</h3>
              <button 
                className="modal-close-btn"
                onClick={() => {
                  setShowMessageModal(false);
                  setSendStatus('idle');
                }}
              >
                <X size={20} />
              </button>
            </div>
            
            {sendStatus === 'success' ? (
              <div className="message-success">
                <div className="success-icon">✓</div>
                <p>Message sent successfully!</p>
                <button 
                  className="modal-done-btn"
                  onClick={() => {
                    setShowMessageModal(false);
                    setSendStatus('idle');
                    setSenderEmail('');
                    setMessage('');
                  }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form 
                className="message-form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSending(true);
                  try {
                    const response = await fetch(import.meta.env.VITE_FORMSPREE_URL, {
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
                  } catch (error) {
                    setSendStatus('error');
                  }
                  setIsSending(false);
                }}
              >
                <div className="form-group">
                  <label htmlFor="sender-email">Your Email</label>
                  <input
                    type="email"
                    id="sender-email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    rows={5}
                    required
                  />
                </div>
                {sendStatus === 'error' && (
                  <p className="error-message">Failed to send. Please try again.</p>
                )}
                <button 
                  type="submit" 
                  className="send-message-btn"
                  disabled={isSending}
                >
                  {isSending ? 'Sending...' : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Resume Modal */}
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
    </section>
  );
};

export default Hero;
