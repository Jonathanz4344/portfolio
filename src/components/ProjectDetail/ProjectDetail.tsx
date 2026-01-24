import { X, ExternalLink, Github } from 'lucide-react';
import type { Project } from '../../types';
import './ProjectDetail.css';

interface ProjectDetailProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetail = ({ project, isOpen, onClose }: ProjectDetailProps) => {
  if (!isOpen) return null;

  return (
    <div className="project-detail-overlay" onClick={onClose}>
      <div className="project-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <div className="modal-cover" data-type={project.type.toLowerCase().replace(/\s+/g, '-')}>
            <span>{project.title.charAt(0)}</span>
          </div>
          <div className="modal-info">
            <span className="modal-type">{project.type}</span>
            <h2 className="modal-title">{project.title}</h2>
            <span className="modal-artist">{project.artist}</span>
            <span className="modal-duration">{project.duration}</span>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3>Description</h3>
            <p>{project.description}</p>
          </div>

          <div className="modal-section">
            <h3>Impact</h3>
            <div className="impact-highlight">
              <span className="impact-value">{project.impact}</span>
            </div>
          </div>

          <div className="modal-section">
            <h3>Technologies</h3>
            <div className="tech-tags">
              {project.tech.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="action-btn primary">
            <ExternalLink size={18} />
            <span>View Project</span>
          </button>
          <button className="action-btn secondary">
            <Github size={18} />
            <span>Source Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
