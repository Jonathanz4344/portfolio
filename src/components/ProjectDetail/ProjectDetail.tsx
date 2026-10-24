import type { Project } from '@/types';
import { CoverArt, Dialog, Eyebrow, Prose, TagList } from '@/components/kit';
import { Reveal, SplitWords } from '@/components/motion';
import './ProjectDetail.css';

interface ProjectDetailProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const TITLE_ID = 'project-detail-title';

/**
 * A project's song page, opened as a dialog: the cover art on an accent-washed header, then what it is,
 * what it changed and what it is built with. On phones it fills the screen like a page of the app.
 */
const ProjectDetail = ({ project, isOpen, onClose }: ProjectDetailProps) => {
  if (!isOpen) return null;

  return (
    <Dialog open onClose={onClose} labelledBy={TITLE_ID} size="lg" sheet closeLabel="Close" className="project-detail">
      <div className="project-detail-header">
        <CoverArt
          project={project}
          letter={project.title.charAt(0)}
          alt={project.artist}
          sizes="(max-width: 640px) 208px, 184px"
          className="project-detail-cover"
        />
        <div className="project-detail-info">
          <Eyebrow className="project-detail-type">{project.type}</Eyebrow>
          <h2 id={TITLE_ID} className="project-detail-title">
            {/* Keyed so a track change while open (the player advances on its own) replays the whole title */}
            <SplitWords key={project.title} text={project.title} trigger="load" delay={120} />
          </h2>
          {/* Artist and dates stay separate; the dot between them is drawn in CSS */}
          <p className="project-detail-meta">
            <span className="project-detail-artist">{project.artist}</span>
            <span className="project-detail-duration">{project.duration}</span>
          </p>
        </div>
      </div>

      <div className="project-detail-body">
        <Reveal as="section" className="project-detail-section" delay={160}>
          <h3>Description</h3>
          <Prose text={project.description} />
        </Reveal>

        <Reveal as="section" className="project-detail-section" delay={240}>
          <h3>Impact</h3>
          <p className="project-detail-impact">{project.impact}</p>
        </Reveal>

        <Reveal as="section" className="project-detail-section" delay={320}>
          <h3>Technologies</h3>
          <TagList tags={project.tech} />
        </Reveal>
      </div>
    </Dialog>
  );
};

export default ProjectDetail;
