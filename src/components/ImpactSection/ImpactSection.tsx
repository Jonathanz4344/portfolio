import type { Project } from '@/types';
import { Section, SectionHeading, Stat } from '@/components/kit';
import { Stagger } from '@/components/motion';
import './ImpactSection.css';

interface ImpactSectionProps {
  projects: Project[];
}

// "85% documentation time reduction" becomes 85, "%" and "documentation time reduction"
const PERCENT_IMPACT = /^(\d+)%\s+(.+)$/;

/** The measured outcomes behind the projects, each counting up as it scrolls into view. */
const ImpactSection = ({ projects }: ImpactSectionProps) => {
  const stats = projects.flatMap((project) => {
    const match = project.impact.match(PERCENT_IMPACT);
    return match ? [{ value: Number(match[1]), label: match[2], project: project.title }] : [];
  });

  if (stats.length === 0) return null;

  return (
    <Section className="impact">
      <SectionHeading title="Impact" />
      <Stagger as="ul" itemAs="li" className="impact-grid" itemClassName="impact-item" step={80}>
        {stats.map((stat) => (
          <Stat
            key={stat.project}
            value={stat.value}
            suffix="%"
            label={
              <>
                <span className="impact-label">{stat.label}</span>
                <span className="impact-project">{stat.project}</span>
              </>
            }
          />
        ))}
      </Stagger>
    </Section>
  );
};

export default ImpactSection;
