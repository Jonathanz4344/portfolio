import { Disc3, ExternalLink, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Certification } from '@/types';
import './CertificationsSection.css';

interface CertificationsSectionProps {
  certifications: Certification[];
}

const tierLabels: Record<Certification['tier'], string> = {
  platinum: 'Platinum',
  gold: 'Gold',
  presave: 'Pre-save',
};

const CertificationsSection = ({ certifications }: CertificationsSectionProps) => {
  return (
    <section className="certifications-section">
      <div className="section-header">
        <h2>Certified Platinum</h2>
      </div>

      <div className="certifications-grid">
        {certifications.map((cert, index) => {
          const Card = cert.verifyUrl ? motion.a : motion.div;
          return (
            <Card
              key={index}
              className={`certification-card ${cert.tier}`}
              {...(cert.verifyUrl && { href: cert.verifyUrl, target: '_blank', rel: 'noopener noreferrer' })}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' as const }}
            >
              <div className="certification-badge">
                {cert.badge ? (
                  <img src={cert.badge} alt={`${cert.name} badge`} />
                ) : (
                  <Cloud size={40} />
                )}
              </div>
              <div className="certification-content">
                <span className={`certification-tier ${cert.tier}`}>
                  <Disc3 size={12} />
                  {tierLabels[cert.tier]}
                </span>
                <h3 className="certification-name">{cert.name}</h3>
                <p className="certification-issuer">{cert.issuer}</p>
                <span className="certification-date">
                  {cert.date}
                  {cert.verifyUrl && <ExternalLink size={12} />}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default CertificationsSection;
