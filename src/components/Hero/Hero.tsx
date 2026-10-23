import { useState, useRef, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Play, Pause, Shuffle, MoreHorizontal, Linkedin, Github, Mail, Phone, FileText } from 'lucide-react';
import type { ProfileData } from '@/types';
import { Figure, Menu, MenuItem, SeasonTag, useDismiss } from '@/components/kit';
import { CountUp, Magnetic, Parallax, SplitWords } from '@/components/motion';
import { useContact } from '@/components/Contact/ContactDialogs';
import { SeasonDecor } from '@/components/Seasonal/SeasonDecor';
import './Hero.css';

const AudioVisualizer = dynamic(() => import('@/components/AudioVisualizer'), { ssr: false });

interface HeroProps {
  profile: ProfileData;
  isPlaying: boolean;
  onPlayToggle: () => void;
  isShuffleOn: boolean;
  onShuffleToggle: () => void;
}

const Hero = ({ profile, isPlaying, onPlayToggle, isShuffleOn, onShuffleToggle }: HeroProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [monthlyListeners, setMonthlyListeners] = useState<number | null>(null);
  const [listenersUnavailable, setListenersUnavailable] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openMessage, openResume } = useContact();
  const closeDropdown = useCallback(() => setShowDropdown(false), []);

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
      } catch {
        setListenersUnavailable(true);
      }
    };

    trackVisit();
  }, []);

  useDismiss(dropdownRef, showDropdown, closeDropdown);

  return (
    <section className="hero">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-grain" />
        <SeasonDecor />
      </div>

      <div className="hero-header">
        <div className="hero-content">
          <Parallax className="hero-image" distance={56}>
            <Figure
              src="/profile.png"
              alt="Jonathan Zhu"
              sizes="(max-width: 768px) 184px, 232px"
              round
              preload
              kenBurns
              position="50% 16%"
              className="profile-photo"
            />
          </Parallax>

          <div className="hero-info">
            <div className="hero-badges">
              <div className="verified-badge">
                <span className="verified-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <defs>
                      <linearGradient id="verified-metal" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" className="verified-metal-light" />
                        <stop offset="0.55" className="verified-metal-mid" />
                        <stop offset="1" className="verified-metal-deep" />
                      </linearGradient>
                    </defs>
                    <path className="verified-seal" d="M12 0L14.4 4.2L19 2.5L18.2 7.4L23 9.2L19.6 12L23 14.8L18.2 16.6L19 21.5L14.4 19.8L12 24L9.6 19.8L5 21.5L5.8 16.6L1 14.8L4.4 12L1 9.2L5.8 7.4L5 2.5L9.6 4.2L12 0Z"/>
                    <path className="verified-check" d="M10.5 15.5L7 12l1.5-1.5 2 2 4.5-4.5L16.5 9.5l-6 6z"/>
                  </svg>
                </span>
                <span>Verified Engineer</span>
              </div>
              <SeasonTag />
            </div>

            <h1 className="hero-name">
              <SplitWords text={profile.name} trigger="load" delay={120} step={110} />
            </h1>

            {!listenersUnavailable && (
              <div className="hero-stats">
                {monthlyListeners === null ? (
                  <span className="monthly-listeners-skeleton" />
                ) : (
                  <span className="monthly-listeners">
                    <CountUp value={monthlyListeners} start="mount" duration={1400} /> monthly watchers
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        {/* The waveform runs along the foot of the header, above the action bar */}
        <AudioVisualizer isPlaying={isPlaying} />
      </div>

      {/* Action Bar - Spotify Style */}
      <div className="hero-action-bar">
        <div className="action-bar-controls">
          <Magnetic className="hero-play">
            <button className="btn btn-play play-btn-large" onClick={onPlayToggle} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>
          </Magnetic>

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
            className="btn btn-secondary btn-sm follow-btn"
          >
            Following
          </a>

          <div className="more-menu" ref={dropdownRef}>
            <button
              className="more-btn"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="More options"
              aria-haspopup="menu"
              aria-expanded={showDropdown}
            >
              <MoreHorizontal size={24} />
            </button>

            {showDropdown && (
              <Menu align="start" className="dropdown-menu">
                <MenuItem href={profile.linkedinUrl} external icon={<Linkedin size={18} />}>
                  Follow on LinkedIn
                </MenuItem>
                <MenuItem href={profile.githubUrl} external icon={<Github size={18} />}>
                  Go to GitHub
                </MenuItem>
                <MenuItem
                  icon={<Mail size={18} />}
                  onSelect={() => {
                    openMessage('hero');
                    setShowDropdown(false);
                  }}
                >
                  Send message
                </MenuItem>
                <MenuItem href={`tel:${profile.phone}`} icon={<Phone size={18} />}>
                  Call {profile.phone}
                </MenuItem>
                <MenuItem
                  icon={<FileText size={18} />}
                  onSelect={() => {
                    openResume('hero');
                    setShowDropdown(false);
                  }}
                >
                  View Resume
                </MenuItem>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
