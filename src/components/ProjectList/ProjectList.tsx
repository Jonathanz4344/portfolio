import { useState, useEffect } from 'react';
import { Play, Heart, Clock, Check } from 'lucide-react';
import type { Project } from '../../types';
import './ProjectList.css';

interface ProjectListProps {
  projects: Project[];
  currentTrack: number;
  onTrackChange: (index: number) => void;
}

// Project durations matching the "song length" style
const projectDurations = ['4:04', '2:03', '2:16', '2:47'];
const projectPlays = ['2,419,195,003', '703,453,943', '490,084,984', '284,345,124'];

const ProjectList = ({ projects, currentTrack, onTrackChange }: ProjectListProps) => {
  // Initialize with all projects liked
  const [likedProjects, setLikedProjects] = useState<Set<number>>(
    new Set(projects.map((_, index) => index))
  );
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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

  const likedCount = likedProjects.size;

  return (
    <section className="project-list">
      <div className="project-list-container">
        {/* Left Column - Popular Projects */}
        <div className="popular-column">
          <div className="projects-table">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`project-row ${currentTrack === index ? 'active' : ''}`}
                onClick={() => onTrackChange(index)}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="col-number">
                  {hoveredProject === index || currentTrack === index ? (
                    <Play 
                      size={14} 
                      fill="currentColor" 
                      className={currentTrack === index ? 'playing' : ''} 
                    />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                <div className="col-title">
                  <div className="project-cover">
                    <div className="cover-gradient" data-type={project.type.toLowerCase().replace(/\s+/g, '-')}>
                      {project.title.charAt(0)}
                    </div>
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
                <span>JZ</span>
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
