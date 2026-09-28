import { useSyncExternalStore } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import type { ProfileData } from '@/types';
import './Footer.css';

interface FooterProps {
  profile: ProfileData;
}

const subscribe = () => () => {};
const getCurrentYear = () => new Date().getFullYear();
// The page is prerendered, so hydrate with the build year, then switch to the visitor's current year
const getBuildYear = () => Number(process.env.BUILD_YEAR);

const Footer = ({ profile }: FooterProps) => {
  const year = useSyncExternalStore(subscribe, getCurrentYear, getBuildYear);

  return (
    <footer className="site-footer">
      <hr className="site-footer-divider" />
      <div className="site-footer-bottom">
        <p className="site-footer-copyright">© {year} {profile.name}</p>
        <div className="site-footer-social">
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={16} />
          </a>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
