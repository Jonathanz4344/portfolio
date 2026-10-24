import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Play, Pause, Heart, Check, MoreHorizontal, Share2, FolderKanban, Building2, Copy } from 'lucide-react';
import type { Project } from '@/types';
import { CoverArt, Equalizer, Menu, MenuItem, SectionHeading, useDismiss } from '@/components/kit';
import { Stagger } from '@/components/motion';
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
  'ZLA (Senior Capstone)': 'https://github.com/Jonathanz4344/BigRealEstate',
};

// Companies without external links (greyed out)
const companiesWithoutLinks = ['ADP', 'IBM', 'Personal Project'];

// Spotify shows the top 5 tracks until "See more" is clicked
const POPULAR_COLLAPSED_COUNT = 5;

// Room a row menu needs below its button, player dock included; with less, it opens upward
const MENU_ROOM = 340;

const ProjectList = ({ projects, currentTrack, isPlaying, onTrackChange, onViewDetails, onPause }: ProjectListProps) => {
  // Initialize with all projects liked
  const [likedProjects, setLikedProjects] = useState<Set<number>>(
    new Set(projects.map((_, index) => index))
  );
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = showAllProjects ? projects : projects.slice(0, POPULAR_COLLAPSED_COUNT);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [dropdownAbove, setDropdownAbove] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeDropdown = useCallback(() => setOpenDropdown(null), []);

  useDismiss(dropdownRef, openDropdown !== null, closeDropdown);

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

  // Suppress unused variable warning - toggleLike is available for future use
  void toggleLike;

  const handleDropdownToggle = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    dropdownTriggerRef.current = e.currentTarget as HTMLButtonElement;
    setDropdownAbove(e.currentTarget.getBoundingClientRect().bottom + MENU_ROOM > window.innerHeight);
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

  const likedCount = likedProjects.size;

  return (
    <section className="project-list">
      <div className="project-list-container">
        {/* Popular Projects */}
        <div className="popular-column">
          <SectionHeading title="Popular" className="popular-title" />

          <Stagger className="projects-table" step={45}>
            {visibleProjects.map((project, index) => (
              <div
                key={index}
                className={`project-row ${currentTrack === index ? 'active' : ''} ${openDropdown === index ? 'menu-open' : ''}`}
                onClick={() => onTrackChange(index)}
                onDoubleClick={() => onTrackChange(index)}
              >
                <div className="col-number">
                  {currentTrack === index && isPlaying ? (
                    <button
                      className="music-bars"
                      aria-label="Pause"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPause();
                      }}
                    >
                      <Equalizer />
                      <Pause size={14} fill="currentColor" className="pause-overlay" />
                    </button>
                  ) : (
                    // The number shows until the row is hovered, current or focused; then the play icon
                    <button
                      className="play-btn"
                      aria-label="Play"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTrackChange(index);
                      }}
                    >
                      <span className="track-number">{index + 1}</span>
                      <Play size={14} fill="currentColor" className="track-play" />
                    </button>
                  )}
                </div>

                <div className="col-title">
                  <div className="project-cover">
                    <CoverArt project={project} letter={project.artist.charAt(0)} sizes="44px" />
                    <button
                      className={`cover-play-btn ${currentTrack === index && isPlaying ? 'visible' : ''}`}
                      aria-label={currentTrack === index && isPlaying ? 'Pause' : 'Play'}
                      onClick={(e) => {
                        e.stopPropagation();
                        onTrackChange(index);
                      }}
                    >
                      {currentTrack === index && isPlaying ? (
                        <Pause size={16} fill="currentColor" />
                      ) : (
                        <Play size={16} fill="currentColor" style={{ marginLeft: 2 }} />
                      )}
                    </button>
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
                      aria-label="More options"
                      aria-haspopup="menu"
                      aria-expanded={openDropdown === index}
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {openDropdown === index && (
                      <Menu className="dropdown-menu" above={dropdownAbove} onClose={closeDropdown} triggerRef={dropdownTriggerRef}>
                        <MenuItem
                          icon={<FolderKanban size={16} />}
                          onSelect={(e) => {
                            e.stopPropagation();
                            onViewDetails(index);
                            setOpenDropdown(null);
                          }}
                        >
                          View Details
                        </MenuItem>
                        {companyUrls[project.artist] ? (
                          <MenuItem
                            href={companyUrls[project.artist]}
                            external
                            icon={<Building2 size={16} />}
                            onSelect={(e) => e.stopPropagation()}
                          >
                            Go to {project.artist.split(' (')[0]}
                          </MenuItem>
                        ) : companiesWithoutLinks.includes(project.artist) ? (
                          <MenuItem disabled icon={<Building2 size={16} />}>
                            Go to {project.artist.split(' (')[0]}
                          </MenuItem>
                        ) : null}
                        <MenuItem icon={<Copy size={16} />} onSelect={(e) => handleCopyLink(project, index, e)}>
                          {copiedIndex === index ? 'Copied!' : 'Copy Link'}
                        </MenuItem>
                        <MenuItem icon={<Share2 size={16} />} onSelect={(e) => handleShare(project, 'linkedin', e)}>
                          Share to LinkedIn
                        </MenuItem>
                      </Menu>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Stagger>

          {projects.length > POPULAR_COLLAPSED_COUNT && (
            <button
              className="see-more-btn link-quiet"
              onClick={() => setShowAllProjects((prev) => !prev)}
            >
              {showAllProjects ? 'Show less' : 'See more'}
            </button>
          )}
        </div>

        {/* Liked Projects */}
        <aside className="liked-column">
          <SectionHeading title="Liked Projects" className="liked-heading" />
          <div className="liked-songs-card">
            <div className="liked-profile-container">
              <div className="liked-profile-image">
                <Image src="/profile.png" alt="JZ" width={64} height={64} sizes="64px" className="liked-profile-img" />
              </div>
              <div className="liked-heart-badge">
                <Heart size={12} fill="currentColor" strokeWidth={0} />
              </div>
            </div>
            <div className="liked-songs-info">
              <span className="liked-title">You've liked {likedCount} projects</span>
              <span className="liked-artist">By Jonathan Zhu</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ProjectList;
