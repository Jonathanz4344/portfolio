import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Heart, Clock, Check, MoreHorizontal, Share2, FolderKanban, Building2, Copy } from 'lucide-react';
import type { Project } from '../../types';
import './ProjectList.css';

interface ProjectListProps {
  projects: Project[];
  currentTrack: number;
  isPlaying: boolean;
  onTrackChange: (index: number) => void;
  onViewDetails: (index: number) => void;
  onPause: () => void;
}

// Project durations matching the "song length" style
const projectDurations = ['4:04', '2:03', '2:16', '1:45', '2:30', '2:47'];
const projectPlays = ['2,419,195,003', '703,453,943', '490,084,984', '356,721,458', '198,543,672', '284,345,124'];

// Company URLs for "Go to Company" option
const companyUrls: Record<string, string> = {
  'Citywide Eye Care': 'https://www.citywideeyecare.com/',
  'ZALA (Senior Capstone)': 'https://github.com/Jonathanz4344/BigRealEstate',
};

// Companies without external links (greyed out)
const companiesWithoutLinks = ['ADP', 'Personal Project'];

const ProjectList = ({ projects, currentTrack, isPlaying, onTrackChange, onViewDetails, onPause }: ProjectListProps) => {
  // Initialize with all projects liked
  const [likedProjects, setLikedProjects] = useState<Set<number>>(
    new Set(projects.map((_, index) => index))
  );
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = new Set(likedProjects);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
    }
    setLikedProjects(newLiked);
  };

  const handleDropdownToggle = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleCopyLink = (project: Project, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');
    const url = `${window.location.origin}/#project-${projectSlug}`;
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    setOpenDropdown(null);
  };

  const handleShare = (project: Project, platform: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Check out ${project.title} by Jonathan Zhu`;
    const url = window.location.origin;
    
    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    }
    setOpenDropdown(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const likedCount = likedProjects.size;

  return (
    <section className="project-list">
      <div className="project-list-container">
        {/* Mobile Header - Liked Projects Card (same as desktop) */}
        <div className="mobile-liked-header">
          <div className="liked-songs-card">
            <div className="liked-profile-container">
              <div className="liked-profile-image">
                <img src="/profile.jpg" alt="JZ" className="liked-profile-img" />
              </div>
              <div className="liked-heart-badge">
                <Heart size={14} fill="#1DB954" strokeWidth={0} />
              </div>
            </div>
            <div className="liked-songs-info">
              <span className="liked-title">You've liked {likedCount} projects</span>
              <span className="liked-artist">By Jonathan Zhu</span>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <h2 className="popular-title">Popular</h2>

        {/* Left Column - Popular Projects */}
        <div className="popular-column">
          <div className="projects-table">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`project-row ${currentTrack === index ? 'active' : ''}`}
                onClick={() => onTrackChange(index)}
                onDoubleClick={() => onTrackChange(index)}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="col-number">
                  {currentTrack === index && isPlaying ? (
                    <div 
                      className="music-bars"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPause();
                      }}
                    >
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <Pause size={14} fill="currentColor" className="pause-overlay" />
                    </div>
                  ) : hoveredProject === index || currentTrack === index ? (
                    <Play 
                      size={14} 
                      fill="currentColor" 
                      className="play-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTrackChange(index);
                      }}
                    />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                <div className="col-title">
                  <div className="project-cover">
                    {project.companyLogo ? (
                      <img 
                        src={project.companyLogo} 
                        alt={project.artist} 
                        className="cover-logo"
                      />
                    ) : (
                      <div className="cover-gradient" data-type={project.type.toLowerCase().replace(/\s+/g, '-')}>
                        {project.artist.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="project-info">
                    <span className={`project-name ${currentTrack === index ? 'highlight' : ''}`}>
                      {project.title}
                    </span>
                    <span className="project-artist">{project.artist}</span>
                  </div>
                </div>

                <div className="col-plays">
                  <span className="plays-count">
                    {projectPlays[index] || '142,070,950'}
                  </span>
                </div>

                <div className="col-duration">
                  <span className="check-badge">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="duration-text">{projectDurations[index] || '3:24'}</span>
                  <div className="more-options-container" ref={openDropdown === index ? dropdownRef : null}>
                    <button
                      className="more-options"
                      onClick={(e) => handleDropdownToggle(index, e)}
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {openDropdown === index && (
                      <>
                        <div className="dropdown-backdrop" onClick={() => setOpenDropdown(null)} />
                        <div className="dropdown-menu">
                          <button
                            className="dropdown-item"
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewDetails(index);
                              setOpenDropdown(null);
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
                              onClick={(e) => e.stopPropagation()}
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
                            onClick={(e) => handleCopyLink(project, index, e)}
                          >
                            <Copy size={16} />
                            <span>{copiedIndex === index ? 'Copied!' : 'Copy Link'}</span>
                          </button>
                          <button
                            className="dropdown-item"
                            onClick={(e) => handleShare(project, 'linkedin', e)}
                          >
                            <Share2 size={16} />
                            <span>Share to LinkedIn</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a 
            href="https://github.com/Jonathanz4344" 
            target="_blank" 
            rel="noopener noreferrer"
            className="see-more-btn"
          >
            See more
          </a>
        </div>

        {/* Right Column - Liked Songs Card */}
        <div className="liked-column">
          <div className="liked-songs-card">
            <div className="liked-profile-container">
              <div className="liked-profile-image">
                <img src="/profile.jpg" alt="JZ" className="liked-profile-img" />
              </div>
              <div className="liked-heart-badge">
                <Heart size={14} fill="#1DB954" strokeWidth={0} />
              </div>
            </div>
            <div className="liked-songs-info">
              <span className="liked-title">You've liked {likedCount} projects</span>
              <span className="liked-artist">By Jonathan Zhu</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectList;
