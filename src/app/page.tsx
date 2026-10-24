'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Sidebar,
  Hero,
  ProjectList,
  ProjectDetail,
  DiscographySection,
  FeaturingSection,
  ArtistPlaylistsSection,
  TopBar,
  Footer,
  AboutSection,
  NowPlayingBar,
} from '@/components';
import { ContactProvider } from '@/components/Contact/ContactDialogs';
import ImpactSection from '@/components/ImpactSection/ImpactSection';
import ContactBand from '@/components/ContactBand/ContactBand';
import { scrollMotion } from '@/components/motion';
import type { DiscographyTab } from '@/components/DiscographySection';
import { profileData } from '@/data/profileData';

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [discographyTab, setDiscographyTab] = useState<DiscographyTab>('popular');

  const homeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const discographyRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Education and certifications live in Discography as the Albums / Singles and EPs tabs
    if (section === 'education') setDiscographyTab('albums');
    if (section === 'certifications') setDiscographyTab('singles');
    const refs: Record<string, React.RefObject<HTMLDivElement | null> | null> = {
      home: homeRef,
      projects: projectsRef,
      about: aboutRef,
      experience: experienceRef,
      education: discographyRef,
      certifications: discographyRef,
      skills: skillsRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: scrollMotion() });
  };

  const handlePlayToggle = () => {
    setIsPlaying((prev) => !prev);
  };

  const getRandomTrack = (excludeIndex: number) => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * profileData.projects.length);
    } while (randomIndex === excludeIndex && profileData.projects.length > 1);
    return randomIndex;
  };

  const handlePrevious = () => {
    if (isShuffleOn) {
      setCurrentTrack(getRandomTrack(currentTrack));
    } else {
      setCurrentTrack((prev) => (prev > 0 ? prev - 1 : profileData.projects.length - 1));
    }
  };

  const handleNext = () => {
    if (isShuffleOn) {
      setCurrentTrack(getRandomTrack(currentTrack));
    } else {
      setCurrentTrack((prev) => (prev < profileData.projects.length - 1 ? prev + 1 : 0));
    }
  };

  const handleTrackChange = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  const handleViewDetails = (index: number) => {
    setCurrentTrack(index);
    setShowProjectDetail(true);
  };

  const handleShuffleToggle = () => {
    setIsShuffleOn((prev) => !prev);
  };

  const handleRepeatToggle = () => {
    setIsRepeatOn((prev) => !prev);
  };

  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  // Once the hero has scrolled under the top bar, the bar carries the name
  useEffect(() => {
    const hero = homeRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setIsPastHero(!entry.isIntersecting), {
      rootMargin: '-72px 0px 0px 0px',
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <ContactProvider>
      <div className="app">
        {/* While the phone drawer is open, everything but the drawer is inert */}
        <div inert={isDrawerOpen}>
          <TopBar
            profile={profileData}
            onSectionChange={handleSectionChange}
            onProjectSelect={handleViewDetails}
            onOpenMenu={() => setIsDrawerOpen(true)}
            menuOpen={isDrawerOpen}
            showName={isPastHero}
          />
        </div>

        <div className="app-shell">
          <Sidebar
            profile={profileData}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            currentTrack={currentTrack}
            projects={profileData.projects}
            onTrackSelect={handleTrackChange}
            mobileOpen={isDrawerOpen}
            onMobileClose={closeDrawer}
          />

          {/* The panel holds the page's main content and, after it, the footer as its own landmark */}
          <div className="stage" inert={isDrawerOpen}>
            <main id="main" tabIndex={-1}>
              <div ref={homeRef}>
                <Hero
                  profile={profileData}
                  isPlaying={isPlaying}
                  onPlayToggle={handlePlayToggle}
                  isShuffleOn={isShuffleOn}
                  onShuffleToggle={handleShuffleToggle}
                />
              </div>

              <div ref={projectsRef}>
                <ProjectList
                  projects={profileData.projects}
                  currentTrack={currentTrack}
                  isPlaying={isPlaying}
                  onTrackChange={handleTrackChange}
                  onViewDetails={handleViewDetails}
                  onPause={() => setIsPlaying(false)}
                />
              </div>

              <ImpactSection projects={profileData.projects} />

              <div ref={discographyRef}>
                <DiscographySection
                  education={profileData.education}
                  certifications={profileData.certifications}
                  tab={discographyTab}
                  onTabChange={setDiscographyTab}
                />
              </div>

              <div ref={experienceRef}>
                <FeaturingSection experience={profileData.experience} />
              </div>

              <div ref={aboutRef}>
                <AboutSection about={profileData.about} />
              </div>

              <div ref={skillsRef}>
                <ArtistPlaylistsSection skills={profileData.skills} />
              </div>

              <ContactBand />
            </main>

            <Footer profile={profileData} />
          </div>
        </div>

        <div inert={isDrawerOpen}>
          <NowPlayingBar
            project={profileData.projects[currentTrack]}
            projects={profileData.projects}
            currentIndex={currentTrack}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onTrackSelect={setCurrentTrack}
            isShuffleOn={isShuffleOn}
            onShuffleToggle={handleShuffleToggle}
            isPlaying={isPlaying}
            onPlayingChange={setIsPlaying}
            isRepeatOn={isRepeatOn}
            onRepeatToggle={handleRepeatToggle}
            onViewDetails={() => setShowProjectDetail(true)}
          />
        </div>

        <ProjectDetail
          project={profileData.projects[currentTrack]}
          isOpen={showProjectDetail}
          onClose={() => setShowProjectDetail(false)}
        />
      </div>
    </ContactProvider>
  );
}
