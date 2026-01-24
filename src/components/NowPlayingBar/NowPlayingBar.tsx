import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Heart, Repeat, Shuffle, ChevronDown, MoreHorizontal, Check, FolderKanban, Building2, Copy, Share2 } from 'lucide-react';
import type { Project } from '../../types';
import './NowPlayingBar.css';

// Company URLs for "Go to Company" option
const companyUrls: Record<string, string> = {
  'Citywide Eye Care': 'https://www.citywideeyecare.com/',
  'ZALA (Senior Capstone)': 'https://github.com/Jonathanz4344/BigRealEstate',
};

// Companies without external links (greyed out)
const companiesWithoutLinks = ['ADP', 'Personal Project'];

interface NowPlayingBarProps {
  project: Project;
  projects: Project[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onTrackSelect: (index: number) => void;
  isShuffleOn: boolean;
  onShuffleToggle: () => void;
  isPlaying: boolean;
  onPlayingChange: (playing: boolean) => void;
  isRepeatOn: boolean;
  onRepeatToggle: () => void;
  onViewDetails: () => void;
}

const NowPlayingBar = ({ project, currentIndex, onPrevious, onNext, isShuffleOn, onShuffleToggle, isPlaying, onPlayingChange, isRepeatOn, onRepeatToggle, onViewDetails }: NowPlayingBarProps) => {
  const [isLiked, setIsLiked] = useState(true);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullPlayer, setIsFullPlayer] = useState(false);
  const [showFullPlayerMenu, setShowFullPlayerMenu] = useState(false);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const fullPlayerRef = useRef<HTMLDivElement>(null);
  const fullPlayerMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (isRepeatOn) {
              return 0;
            }
            onNext();
            return 0;
          }
          return prev + 0.049;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onNext, isRepeatOn]);

  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  const formatTime = (percentage: number) => {
    const totalSeconds = Math.floor((percentage / 100) * 204);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Touch handlers for drag to close
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartY === null || !fullPlayerRef.current) return;
    const deltaY = e.touches[0].clientY - dragStartY;
    if (deltaY > 0) {
      fullPlayerRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartY === null || !fullPlayerRef.current) return;
    const deltaY = e.changedTouches[0].clientY - dragStartY;
    fullPlayerRef.current.style.transform = '';
    if (deltaY > 100) {
      setIsFullPlayer(false);
    }
    setDragStartY(null);
  };

  // Touch handlers for bar to drag up
  const handleBarTouchStart = (e: React.TouchEvent) => {
    setDragStartY(e.touches[0].clientY);
  };

  const handleBarTouchEnd = (e: React.TouchEvent) => {
    if (dragStartY === null) return;
    const deltaY = e.changedTouches[0].clientY - dragStartY;
    if (deltaY < -50) {
      setIsFullPlayer(true);
    }
    setDragStartY(null);
  };

  return (
    <>
      {/* Full Screen Mobile Player */}
      <div 
        ref={fullPlayerRef}
        className={`full-player-overlay ${isFullPlayer ? 'open' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="full-player">
          <div className="full-player-drag-handle" />
          
          {/* Header: Close | Name | Menu */}
          <div className="full-player-header">
            <button className="full-player-close" onClick={() => setIsFullPlayer(false)}>
              <ChevronDown size={28} />
            </button>
            <span className="full-player-header-name">Jonathan Zhu</span>
            <div className="full-player-menu" ref={fullPlayerMenuRef}>
              <button 
                className="full-player-menu-btn"
                onClick={() => setShowFullPlayerMenu(!showFullPlayerMenu)}
              >
                <MoreHorizontal size={24} />
              </button>
              {showFullPlayerMenu && (
                <div className="full-player-dropdown">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      onViewDetails();
                      setShowFullPlayerMenu(false);
                      setIsFullPlayer(false);
                    }}
                  >
                    <FolderKanban size={16} />
                    <span>View Details</span>
                  </button>
                  {companyUrls[project.artist] ? (
                    <a
                      href={companyUrls[project.artist]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dropdown-item"
                      onClick={() => setShowFullPlayerMenu(false)}
                    >
                      <Building2 size={16} />
                      <span>Go to {project.artist.split(' (')[0]}</span>
                    </a>
                  ) : companiesWithoutLinks.includes(project.artist) ? (
                    <div className="dropdown-item disabled">
                      <Building2 size={16} />
                      <span>Go to {project.artist.split(' (')[0]}</span>
                    </div>
                  ) : null}
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');
                      const url = `${window.location.origin}/#project-${projectSlug}`;
                      navigator.clipboard.writeText(url);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                      setShowFullPlayerMenu(false);
                    }}
                  >
                    <Copy size={16} />
                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      const url = window.location.origin;
                      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                      setShowFullPlayerMenu(false);
                    }}
                  >
                    <Share2 size={16} />
                    <span>Share to LinkedIn</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Large Cover */}
          <div className="full-player-cover-container">
            {project.companyLogo ? (
              <img 
                src={project.companyLogo} 
                alt={project.artist} 
                className="full-player-cover-logo"
              />
            ) : (
              <div 
                className="full-player-cover"
                data-type={project.type.toLowerCase().replace(/\s+/g, '-')}
              >
                <span>{project.title.charAt(0)}</span>
              </div>
            )}
          </div>

          {/* Track Info Row: Image | Title | Check - right above progress bar */}
          <div className="full-player-track-row">
            <div className="full-player-track-left">
              {project.companyLogo ? (
                <img 
                  src={project.companyLogo} 
                  alt={project.artist} 
                  className="full-player-track-img"
                />
              ) : (
                <div 
                  className="full-player-track-cover"
                  data-type={project.type.toLowerCase().replace(/\s+/g, '-')}
                >
                  <span>{project.title.charAt(0)}</span>
                </div>
              )}
              <div className="full-player-track-info">
                <span className="full-player-track-title">{project.title}</span>
                <span className="full-player-track-artist">{project.artist}</span>
              </div>
            </div>
            <div className={`full-player-check ${isLiked ? 'active' : ''}`} onClick={() => setIsLiked(!isLiked)}>
              <Check size={16} strokeWidth={3} />
            </div>
          </div>

          <div className="full-player-progress">
            <div 
              className="progress-bar full-player-progress-bar"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                setProgress(Math.max(0, Math.min(100, percentage)));
              }}
            >
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              >
                <div className="progress-handle full-player-handle"></div>
              </div>
            </div>
            <div className="full-player-times">
              <span>{formatTime(progress)}</span>
              <span>3:24</span>
            </div>
          </div>

          <div className="full-player-controls">
            <button 
              className={`control-btn shuffle ${isShuffleOn ? 'active' : ''}`}
              onClick={onShuffleToggle}
            >
              <Shuffle size={24} />
            </button>
            <button className="control-btn" onClick={onPrevious}>
              <SkipBack size={32} fill="currentColor" />
            </button>
            <button 
              className="full-player-play-btn"
              onClick={() => onPlayingChange(!isPlaying)}
            >
              {isPlaying ? (
                <Pause size={32} fill="currentColor" />
              ) : (
                <Play size={32} fill="currentColor" />
              )}
            </button>
            <button className="control-btn" onClick={onNext}>
              <SkipForward size={32} fill="currentColor" />
            </button>
            <button 
              className={`control-btn repeat ${isRepeatOn ? 'active' : ''}`}
              onClick={onRepeatToggle}
            >
              <Repeat size={24} />
            </button>
          </div>
        </div>
      </div>

      <div 
        className="now-playing-bar"
        onTouchStart={handleBarTouchStart}
        onTouchEnd={handleBarTouchEnd}
      >
        {/* Track Info */}
        <div className="now-playing-left" onClick={() => setIsFullPlayer(true)}>
          {project.companyLogo ? (
            <img 
              src={project.companyLogo} 
              alt={project.artist} 
              className="now-playing-cover-img"
            />
          ) : (
            <div 
              className="now-playing-cover"
              data-type={project.type.toLowerCase().replace(/\s+/g, '-')}
            >
              <span>{project.title.charAt(0)}</span>
            </div>
          )}
          <div className="now-playing-info">
            <span className="now-playing-title">{project.title}</span>
            <span className="now-playing-artist">{project.artist}</span>
          </div>
          <button 
            className={`like-btn ${isLiked ? 'liked' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          {/* Mobile-only play/pause button */}
          <button 
            className="mobile-play-btn"
            onClick={(e) => {
              e.stopPropagation();
              onPlayingChange(!isPlaying);
            }}
          >
            {isPlaying ? (
              <Pause size={24} fill="#fff" />
            ) : (
              <Play size={24} fill="#fff" />
            )}
          </button>
        </div>

      {/* Player Controls */}
      <div className="now-playing-center">
        <div className="player-controls">
          <button 
            className={`control-btn shuffle ${isShuffleOn ? 'active' : ''}`}
            onClick={onShuffleToggle}
            title={isShuffleOn ? 'Disable shuffle' : 'Enable shuffle'}
          >
            <Shuffle size={18} />
          </button>
          <button className="control-btn" onClick={onPrevious}>
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button 
            className="play-pause-btn"
            onClick={() => onPlayingChange(!isPlaying)}
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" className="play-icon" />
            )}
          </button>
          <button className="control-btn" onClick={onNext}>
            <SkipForward size={20} fill="currentColor" />
          </button>
          <button 
            className={`control-btn repeat ${isRepeatOn ? 'active' : ''}`}
            onClick={onRepeatToggle}
            title={isRepeatOn ? 'Disable repeat' : 'Enable repeat'}
          >
            <Repeat size={18} />
          </button>
        </div>
        
        <div className="progress-bar-container">
          <span className="time-label">{formatTime(progress)}</span>
          <div 
            className="progress-bar"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percentage = ((e.clientX - rect.left) / rect.width) * 100;
              setProgress(Math.max(0, Math.min(100, percentage)));
            }}
          >
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            >
              <div className="progress-handle"></div>
            </div>
          </div>
          <span className="time-label">3:24</span>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="now-playing-right">
        <button 
          className="volume-btn"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted || volume === 0 ? (
            <VolumeX size={18} />
          ) : (
            <Volume2 size={18} />
          )}
        </button>
        <div 
          className="volume-bar"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percentage = ((e.clientX - rect.left) / rect.width) * 100;
            setVolume(Math.max(0, Math.min(100, percentage)));
            setIsMuted(false);
          }}
        >
          <div 
            className="volume-fill" 
            style={{ width: `${isMuted ? 0 : volume}%` }}
          >
            <div className="volume-handle"></div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default NowPlayingBar;
