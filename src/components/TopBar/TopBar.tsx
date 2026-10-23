import { useState, useRef, useMemo, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { Home, Phone, Search, X } from 'lucide-react';
import type { ProfileData } from '@/types';
import { useDismiss } from '@/components/kit';
import { useContact } from '@/components/Contact/ContactDialogs';
import { BrandMark } from './BrandMark';
import { ThemeToggle } from './ThemeToggle';
import './TopBar.css';

interface TopBarProps {
  profile: ProfileData;
  onSectionChange: (section: string) => void;
  onProjectSelect: (index: number) => void;
  /** Opens the library drawer on phones. */
  onOpenMenu: () => void;
  menuOpen: boolean;
  /** The page has scrolled past the hero, so the bar carries the name. */
  showName: boolean;
}

interface SearchResult {
  label: string;
  sub: string;
  kind: string;
  image?: string;
  onSelect: () => void;
}

const subscribeScroll = (onChange: () => void) => {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
};

const TopBar = ({ profile, onSectionChange, onProjectSelect, onOpenMenu, menuOpen, showName }: TopBarProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { openMessage } = useContact();
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > 4, () => false);

  useDismiss(wrapperRef, isOpen, () => setIsOpen(false));

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const matches = (...fields: string[]) => fields.some((f) => f.toLowerCase().includes(q));

    const projects = profile.projects
      .map((p, index) => ({ p, index }))
      .filter(({ p }) => matches(p.title, p.artist, p.description, ...p.tech))
      .map(({ p, index }) => ({
        label: p.title,
        sub: p.artist,
        kind: 'Project',
        image: p.companyLogo,
        onSelect: () => onProjectSelect(index),
      }));

    const experience = profile.experience
      .filter((e) => matches(e.role, e.company, ...e.highlights))
      .map((e) => ({
        label: e.role,
        sub: e.company,
        kind: 'Experience',
        image: e.logo,
        onSelect: () => onSectionChange('experience'),
      }));

    const skills = Object.entries(profile.skills)
      .flatMap(([category, list]) => list.filter((s) => matches(s)).map((s) => ({ s, category })))
      .map(({ s, category }) => ({
        label: s,
        sub: category,
        kind: 'Skill',
        onSelect: () => onSectionChange('skills'),
      }));

    const certs = profile.certifications
      .filter((c) => matches(c.name, c.issuer))
      .map((c) => ({
        label: c.name,
        sub: c.issuer,
        kind: 'Certification',
        image: c.badge,
        onSelect: () => onSectionChange('certifications'),
      }));

    return [...projects, ...experience, ...certs, ...skills].slice(0, 8);
  }, [query, profile, onProjectSelect, onSectionChange]);

  const select = (result: SearchResult) => {
    result.onSelect();
    setIsOpen(false);
    setQuery('');
  };

  return (
    <header className="top-bar" data-scrolled={scrolled ? '' : undefined} data-show-name={showName ? '' : undefined}>
      <div className="top-bar-start">
        <button className="mobile-menu-btn" onClick={onOpenMenu} aria-label="Open menu" aria-expanded={menuOpen}>
          <Image src="/profile.png" alt="JZ" width={40} height={40} sizes="40px" className="mobile-menu-img" />
        </button>
        <span className="top-bar-brand">
          <BrandMark size={30} />
        </span>
      </div>

      <span className="top-bar-name" aria-hidden="true">
        {profile.name}
      </span>

      <div className="top-bar-center" ref={wrapperRef}>
        <button className="top-bar-home" onClick={() => onSectionChange('home')} aria-label="Home" title="Home">
          <Home size={22} />
        </button>

        <div className="top-bar-search">
          <Search size={20} className="top-bar-search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && results[0]) select(results[0]);
              if (e.key === 'Escape') setIsOpen(false);
            }}
            placeholder="What do you want to play?"
            aria-label="Search projects, experience, and skills"
          />
          {query && (
            <button className="top-bar-clear" onClick={() => setQuery('')} aria-label="Clear search">
              <X size={18} />
            </button>
          )}

          {isOpen && query.trim() && (
            <div className="top-bar-results">
              {results.length === 0 ? (
                <p className="top-bar-empty">No results found for &ldquo;{query}&rdquo;</p>
              ) : (
                results.map((r, i) => (
                  <button key={i} className="top-bar-result" onClick={() => select(r)}>
                    <div className="top-bar-result-art">
                      {r.image ? <Image src={r.image} alt="" fill sizes="40px" /> : <span>{r.label.charAt(0)}</span>}
                    </div>
                    <div className="top-bar-result-text">
                      <span className="top-bar-result-title">{r.label}</span>
                      <span className="top-bar-result-sub">{r.kind} • {r.sub}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="top-bar-right">
        <div className="top-bar-pill">
          <a href={`tel:${profile.phone}`} className="top-bar-pill-phone">
            <Phone size={15} aria-hidden="true" />
            <span>{profile.phone}</span>
          </a>
          <button type="button" className="top-bar-pill-cta" onClick={() => openMessage('sidebar')}>
            Send Message
          </button>
        </div>
        <ThemeToggle className="top-bar-icon" />
        <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="top-bar-avatar" title={profile.name}>
          <Image src="/profile.png" alt={profile.name} width={32} height={32} sizes="32px" />
        </a>
      </div>
    </header>
  );
};

export default TopBar;
