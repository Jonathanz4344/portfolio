import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Heart, Repeat, Shuffle, ChevronDown, MoreHorizontal, Check, FolderKanban, Building2, Copy, Share2, Maximize2 } from 'lucide-react';
import type { Project } from '@/types';
import { CoverArt, Equalizer, Menu, MenuItem, TagList, useDismiss } from '@/components/kit';
import './NowPlayingBar.css';

// Company URLs for "Go to Company" option
const companyUrls: Record<string, string> = {
  'Citywide Eye Care': 'https://www.citywideeyecare.com/',
  'ZLA (Senior Capstone)': 'https://github.com/Jonathanz4344/BigRealEstate',
};

// Companies without external links (greyed out)
const companiesWithoutLinks = ['ADP', 'IBM', 'Personal Project'];

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
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [detailsDragStartY, setDetailsDragStartY] = useState<number | null>(null);
  const [hasReachedTop, setHasReachedTop] = useState(false);
  const fullPlayerRef = useRef<HTMLDivElement>(null);
  const fullPlayerMenuRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const closeFullPlayerMenu = useCallback(() => setShowFullPlayerMenu(false), []);

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

  // Reset progress when the track changes (adjusting state during render avoids an extra effect pass)
  const [progressTrack, setProgressTrack] = useState(currentIndex);
  if (progressTrack !== currentIndex) {
    setProgressTrack(currentIndex);
    setProgress(0);
  }

  // Close dropdown when clicking outside
  useDismiss(fullPlayerMenuRef, showFullPlayerMenu, closeFullPlayerMenu);

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

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(Math.max(0, Math.min(100, percentage)));
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
            <button className="full-player-close" onClick={() => setIsFullPlayer(false)} aria-label="Close">
              <ChevronDown size={28} />
            </button>
            <span className="full-player-header-name">Jonathan Zhu</span>
            <div className="full-player-menu" ref={fullPlayerMenuRef}>
              <button
                className="full-player-menu-btn"
                onClick={() => setShowFullPlayerMenu(!showFullPlayerMenu)}
                aria-label="More options"
                aria-haspopup="menu"
                aria-expanded={showFullPlayerMenu}
              >
                <MoreHorizontal size={24} />
              </button>
              {showFullPlayerMenu && (
                <Menu className="full-player-dropdown">
                  <MenuItem
                    icon={<FolderKanban size={16} />}
                    onSelect={() => {
                      setShowFullPlayerMenu(false);
                      setIsDetailsExpanded(false);
                      onViewDetails();
                    }}
                  >
                    View Details
                  </MenuItem>
                  {companyUrls[project.artist] ? (
                    <MenuItem
                      href={companyUrls[project.artist]}
                      external
                      icon={<Building2 size={16} />}
                      onSelect={() => setShowFullPlayerMenu(false)}
                    >
                      Go to {project.artist.split(' (')[0]}
                    </MenuItem>
                  ) : companiesWithoutLinks.includes(project.artist) ? (
                    <MenuItem disabled icon={<Building2 size={16} />}>
                      Go to {project.artist.split(' (')[0]}
                    </MenuItem>
                  ) : null}
                  <MenuItem
                    icon={<Copy size={16} />}
                    onSelect={() => {
                      const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');
                      const url = `${window.location.origin}/#project-${projectSlug}`;
                      navigator.clipboard.writeText(url);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                      setShowFullPlayerMenu(false);
                    }}
                  >
                    {copied ? 'Copied!' : 'Copy Link'}
                  </MenuItem>
                  <MenuItem
                    icon={<Share2 size={16} />}
                    onSelect={() => {
                      const url = window.location.origin;
                      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                      setShowFullPlayerMenu(false);
                    }}
                  >
                    Share to LinkedIn
                  </MenuItem>
                </Menu>
              )}
            </div>
          </div>

          {/* Large Cover */}
          <div className="full-player-cover-container">
            <CoverArt project={project} letter={project.title.charAt(0)} sizes="(max-width: 640px) 90vw, 420px" className="full-player-cover" />
          </div>

          {/* Track Info Row: Image | Title | Check - right above progress bar */}
          <div className="full-player-track-row">
            <div className="full-player-track-left">
              <CoverArt project={project} letter={project.title.charAt(0)} sizes="48px" className="full-player-track-cover" />
              <div className="full-player-track-info">
                <span className="full-player-track-title">{project.title}</span>
                <span className="full-player-track-artist">{project.artist}</span>
              </div>
            </div>
            <button
              className={`full-player-check ${isLiked ? 'active' : ''}`}
              onClick={() => setIsLiked(!isLiked)}
              aria-label="Like"
              aria-pressed={isLiked}
            >
              <Check size={16} strokeWidth={3} />
            </button>
          </div>

          <div className="full-player-progress">
            <div className="progress-bar full-player-progress-bar" onClick={seek}>
              <div className="progress-fill" style={{ width: `${progress}%` }}>
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
              title={isShuffleOn ? 'Disable shuffle' : 'Enable shuffle'}
            >
              <Shuffle size={24} />
            </button>
            <button className="control-btn" onClick={onPrevious} aria-label="Previous">
              <SkipBack size={30} fill="currentColor" />
            </button>
            <button
              className="full-player-play-btn"
              onClick={() => onPlayingChange(!isPlaying)}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={30} fill="currentColor" />
              ) : (
                <Play size={30} fill="currentColor" />
              )}
            </button>
            <button className="control-btn" onClick={onNext} aria-label="Next">
              <SkipForward size={30} fill="currentColor" />
            </button>
            <button
              className={`control-btn repeat ${isRepeatOn ? 'active' : ''}`}
              onClick={onRepeatToggle}
              title={isRepeatOn ? 'Disable repeat' : 'Enable repeat'}
            >
              <Repeat size={24} />
            </button>
          </div>

          {/* Lyrics Preview Panel */}
          <div
            ref={detailsRef}
            className={`lyrics-preview-panel ${isDetailsExpanded ? 'expanded' : ''}`}
          >
            <div
              className="lyrics-preview-box"
              onClick={() => {
                if (!isDetailsExpanded) {
                  setIsDetailsExpanded(true);
                  setHasReachedTop(false);
                  // Scroll to show the lyrics content
                  setTimeout(() => {
                    detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 50);
                }
              }}
            >
              <div className="lyrics-header-row">
                <span className="lyrics-label">Lyrics</span>
                <button
                  className="lyrics-expand-btn"
                  aria-label="Lyrics"
                  aria-expanded={isDetailsExpanded}
                  onClick={(e) => {
                    e.stopPropagation();
                    const newExpanded = !isDetailsExpanded;
                    setIsDetailsExpanded(newExpanded);
                    setHasReachedTop(false);
                    if (newExpanded) {
                      setTimeout(() => {
                        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 50);
                    } else {
                      // Scroll back to top when closing
                      fullPlayerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  <Maximize2 size={16} />
                </button>
              </div>

              <div
                className="lyrics-content"
                onTouchStart={(e) => {
                  if (isDetailsExpanded) {
                    setDetailsDragStartY(e.touches[0].clientY);
                  }
                }}
                onTouchMove={(e) => {
                  if (!isDetailsExpanded || detailsDragStartY === null) return;
                  const content = e.currentTarget;
                  const deltaY = e.touches[0].clientY - detailsDragStartY;

                  // Only track if we're at the top and dragging down
                  if (content.scrollTop <= 0 && deltaY > 0) {
                    e.preventDefault();
                  }
                }}
                onTouchEnd={(e) => {
                  if (!isDetailsExpanded || detailsDragStartY === null) return;
                  const content = e.currentTarget;
                  const deltaY = e.changedTouches[0].clientY - detailsDragStartY;

                  if (content.scrollTop <= 0 && deltaY > 0) {
                    if (hasReachedTop) {
                      // Second time at top dragging down - close
                      setIsDetailsExpanded(false);
                      setHasReachedTop(false);
                      fullPlayerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      // First time - mark it
                      setHasReachedTop(true);
                    }
                  }
                  setDetailsDragStartY(null);
                }}
              >
                <div className="lyrics-section">
                  <h4>Description</h4>
                  <p>{project.description}</p>
                </div>

                <div className="lyrics-section">
                  <h4>Impact</h4>
                  <div className="lyrics-impact">{project.impact}</div>
                </div>

                <div className="lyrics-section">
                  <h4>Technologies</h4>
                  <TagList tags={project.tech} className="lyrics-tech-tags" tagClassName="lyrics-tech-tag" />
                </div>
              </div>
            </div>
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
          <CoverArt project={project} letter={project.title.charAt(0)} sizes="52px" className="now-playing-cover" />
          <div className="now-playing-info">
            <div className="now-playing-title-row">
              {isPlaying && <Equalizer bars={3} className="equalizer-bars" />}
              <span
                className="now-playing-title clickable desktop-only-click"
                onClick={(e) => {
                  // Only trigger on desktop (window width > 640px)
                  if (window.innerWidth > 640) {
                    e.stopPropagation();
                    onViewDetails();
                  }
                }}
              >
                {project.title}
              </span>
            </div>
            <span className="now-playing-artist">{project.artist}</span>
          </div>
          <button
            className={`like-btn ${isLiked ? 'liked' : ''}`}
            aria-label="Like"
            aria-pressed={isLiked}
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
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={(e) => {
              e.stopPropagation();
              onPlayingChange(!isPlaying);
            }}
          >
            {isPlaying ? (
              <Pause size={22} fill="currentColor" />
            ) : (
              <Play size={22} fill="currentColor" />
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
            <button className="control-btn" onClick={onPrevious} aria-label="Previous">
              <SkipBack size={20} fill="currentColor" />
            </button>
            <button
              className="play-pause-btn"
              onClick={() => onPlayingChange(!isPlaying)}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" className="play-icon" />
              )}
            </button>
            <button className="control-btn" onClick={onNext} aria-label="Next">
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
            <div className="progress-bar" onClick={seek}>
              <div className="progress-fill" style={{ width: `${progress}%` }}>
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
            aria-label={isMuted || volume === 0 ? 'Unmute' : 'Mute'}
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
            <div className="volume-fill" style={{ width: `${isMuted ? 0 : volume}%` }}>
              <div className="volume-handle"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NowPlayingBar;
