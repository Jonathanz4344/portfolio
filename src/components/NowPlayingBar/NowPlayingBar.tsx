import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Heart, Repeat, Shuffle } from 'lucide-react';
import type { Project } from '../../types';
import './NowPlayingBar.css';

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
}

const NowPlayingBar = ({ project, currentIndex, onPrevious, onNext, isShuffleOn, onShuffleToggle, isPlaying, onPlayingChange }: NowPlayingBarProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            onNext();
            return 0;
          }
          return prev + 0.049; // ~0.049% per 100ms = 204 seconds total (3:24)
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onNext]);

  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  const formatTime = (percentage: number) => {
    const totalSeconds = Math.floor((percentage / 100) * 204); // 3:24 = 204 seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="now-playing-bar">
      {/* Track Info */}
      <div className="now-playing-left">
        <div 
          className="now-playing-cover"
          data-type={project.type.toLowerCase().replace(/\s+/g, '-')}
        >
          <span>{project.title.charAt(0)}</span>
        </div>
        <div className="now-playing-info">
          <span className="now-playing-title">{project.title}</span>
          <span className="now-playing-artist">{project.artist}</span>
        </div>
        <button 
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
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
          <button className="control-btn repeat">
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
  );
};

export default NowPlayingBar;
