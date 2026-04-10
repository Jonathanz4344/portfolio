'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Sidebar,
  Hero,
  ProjectList,
  ProjectDetail,
  SkillsSection,
  ExperienceSection,
  EducationSection,
  AboutSection,
  NowPlayingBar,
} from '@/components';
import { profileData } from '@/data/profileData';

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  
  const homeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const mainScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    const refs: Record<string, React.RefObject<HTMLDivElement | null> | null> = {
      home: homeRef,
      projects: projectsRef,
      about: aboutRef,
      experience: experienceRef,
      education: educationRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
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

  // Mobile sticky header scroll detection
  useEffect(() => {
    const scrollContainer = mainScrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      setShowStickyHeader(scrollTop > 350);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      {/* Mobile Sticky Header */}
      <div className={`mobile-sticky-header ${showStickyHeader ? 'visible' : ''}`}>
        <div className="sticky-header-content">
          <span className="sticky-header-name">{profileData.name}</span>
        </div>
      </div>

      <div className="app-container">
        <Sidebar
          profile={profileData}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />

        <main className="main-content">
          <div className="main-scroll" ref={mainScrollRef}>
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

            <div ref={experienceRef}>
              <ExperienceSection experience={profileData.experience} />
            </div>

            <div ref={aboutRef}>
              <AboutSection about={profileData.about} />
            </div>

            <SkillsSection skills={profileData.skills} />

            <div ref={educationRef}>
              <EducationSection education={profileData.education} />
            </div>

            <div className="footer-spacer"></div>
          </div>
        </main>
      </div>

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

      <ProjectDetail
        project={profileData.projects[currentTrack]}
        isOpen={showProjectDetail}
        onClose={() => setShowProjectDetail(false)}
      />
    </div>
  );
}
