import { useSyncExternalStore } from 'react';
import { ArrowUpRight, FileText, Github, Linkedin, Mail, Send } from 'lucide-react';
import type { ProfileData } from '@/types';
import { Button, IconWell } from '@/components/kit';
import { Reveal } from '@/components/motion';
import { useContact } from '@/components/Contact/ContactDialogs';
import { BrandMark } from '@/components/TopBar/BrandMark';
import './Footer.css';

interface FooterProps {
  profile: ProfileData;
}

const subscribe = () => () => {};
const getCurrentYear = () => new Date().getFullYear();
// The page is prerendered, so hydrate with the build year, then switch to the visitor's current year
const getBuildYear = () => Number(process.env.BUILD_YEAR);

/** The foot of the main panel: who he is, how to reach him, where else to find him, then the fine print. */
const Footer = ({ profile }: FooterProps) => {
  const year = useSyncExternalStore(subscribe, getCurrentYear, getBuildYear);
  const { openMessage, openResume } = useContact();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <hr className="site-footer-divider" />

        <Reveal className="site-footer-columns">
          <div className="site-footer-brand">
            <BrandMark size={40} className="site-footer-mark" />
            <p className="site-footer-name">{profile.name}</p>
            <p className="site-footer-title">{profile.title}</p>
            <p className="site-footer-location">
              <span className="site-footer-muted">Based in</span> <span>New York City</span>
            </p>
          </div>

          <div className="site-footer-contact">
            <address className="site-footer-address">
              <a href={`mailto:${profile.email}`} className="site-footer-link">
                {profile.email}
              </a>
              <a href={`tel:${profile.phone}`} className="site-footer-link site-footer-phone">
                <span className="site-footer-number tabular">{profile.phone}</span>
                <span className="site-footer-label">Calls and texts</span>
              </a>
            </address>
            {/* The library's wording of both dialogs, as in the top bar and the closing band */}
            <div className="site-footer-actions">
              <Button size="sm" icon={<Send size={15} />} onClick={() => openMessage('sidebar')}>
                Send Message
              </Button>
              <Button size="sm" icon={<FileText size={15} />} onClick={() => openResume('sidebar')}>
                View Resume
              </Button>
            </div>
          </div>

          <ul className="site-footer-profiles">
            <li>
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="site-footer-link">
                GitHub
                <ArrowUpRight size={15} className="site-footer-arrow" />
              </a>
            </li>
            <li>
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="site-footer-link">
                LinkedIn
                <ArrowUpRight size={15} className="site-footer-arrow" />
              </a>
            </li>
          </ul>
        </Reveal>

        <div className="site-footer-bottom">
          <p className="site-footer-copyright">© {year} {profile.name}</p>
          <div className="site-footer-social">
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <IconWell>
                <Github size={16} />
              </IconWell>
            </a>
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <IconWell>
                <Linkedin size={16} />
              </IconWell>
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <IconWell>
                <Mail size={16} />
              </IconWell>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
