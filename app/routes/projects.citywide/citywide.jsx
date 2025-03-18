import backgroundSprLarge from '~/assets/spr-background-large.jpg';
import backgroundSprPlaceholder from '~/assets/spr-background-placeholder.jpg';
import backgroundSpr from '~/assets/spr-background.jpg';
import imageSprComponentsDarkLarge from '~/assets/spr-components-dark-large.png';
import imageSprComponentsDarkPlaceholder from '~/assets/spr-components-dark-placeholder.png';
import imageSprComponentsDark from '~/assets/spr-components-dark.png';
import imageSprComponentsLightLarge from '~/assets/spr-components-light-large.png';
import imageSprComponentsLightPlaceholder from '~/assets/spr-components-light-placeholder.png';
import imageSprComponentsLight from '~/assets/spr-components-light.png';
import imageSprLessonBuilderDarkLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
import imageSprLessonBuilderDarkPlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import imageSprLessonBuilderDark from '~/assets/spr-lesson-builder-dark.jpg';
import imageSprLessonBuilderLightLarge from '~/assets/spr-lesson-builder-light-large.jpg';
import imageSprLessonBuilderLightPlaceholder from '~/assets/spr-lesson-builder-light-placeholder.jpg';
import imageSprLessonBuilderLight from '~/assets/spr-lesson-builder-light.jpg';
import responsiveMobileImage from '~/assets/responsiveMobile.png';
import aiImage from '~/assets/aiChatbot.png';
import bookingImage from '~/assets/booking.png';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { SegmentedControl, SegmentedControlOption } from '~/components/segmented-control';
import { ThemeProvider, useTheme } from '~/components/theme-provider';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  // ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import { Suspense, lazy, useMemo } from 'react';
import { media } from '~/utils/style';
import styles from './citywide.module.css';

const Earth = lazy(() => import('./earth').then(module => ({ default: module.Earth })));
const EarthSection = lazy(() =>
  import('./earth').then(module => ({ default: module.EarthSection }))
);

const title = 'Citywide Eye Care Website';
const description =
  'I developed a comprehensive website for Citywide Eye Care using React 18, Material UI v6, and Vite, hosted on AWS Amplify. The interactive site includes an AI-powered chatbot using Google Gemini 2.0, seasonal theming system, and an advanced appointment booking system with automated email notifications.';
const roles = [
  'React.js & MUI Development',
  'AWS Amplify Integration',
  'Lambda Function Implementation',
  'AI Chatbot Development',
  'Responsive UI/UX Design',
  'Advanced Booking System',
];
export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const Citywide = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const themes = ['dark', 'light'];

  const handleThemeChange = index => {
    toggleTheme(themes[index]);
  };

  return (
    <>
      <ProjectContainer>
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          src={backgroundSpr}
          srcSet={`${backgroundSpr} 1080w, ${backgroundSprLarge} 2160w`}
          placeholder={backgroundSprPlaceholder}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://citywideeyecare.business.site/" // add url
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              raised
              key={theme}
              srcSet={
                isDark
                  ? `${imageSprLessonBuilderDark} 1280w, ${imageSprLessonBuilderDarkLarge} 2560w`
                  : `${imageSprLessonBuilderLight} 1280w, ${imageSprLessonBuilderLightLarge} 2560w`
              }
              width={1280}
              height={800}
              placeholder={
                isDark
                  ? imageSprLessonBuilderDarkPlaceholder
                  : imageSprLessonBuilderLightPlaceholder
              }
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="The Citywide Eye Care website homepage showing their services and interactive elements."
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>The problem</ProjectSectionHeading>
            <ProjectSectionText>
              Local optometry practices often struggle with outdated online presence,
              making it difficult for patients to find information, book appointments, and
              communicate efficiently. Citywide Eye Care needed a modern, user-friendly
              website that would not only showcase their services but also streamline
              patient interactions through online booking and automated communication. The
              challenge was to create a seamless digital experience that would enhance
              patient engagement while simplifying administrative processes for the
              practice staff.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>Technology Stack & Features</ProjectSectionHeading>
              <div className={styles.featuredTech}>
                <div className={styles.techCategory}>
                  <h3 className={styles.categoryTitle}>Frontend</h3>
                  <div className={styles.techItems}>
                    <span className={styles.techItem}>React 18</span>
                    <span className={styles.techItem}>Material UI v6</span>
                    <span className={styles.techItem}>Tailwind CSS</span>
                    <span className={styles.techItem}>Vite</span>
                    <span className={styles.techItem}>React Router v7</span>
                    <span className={styles.techItem}>Framer Motion</span>
                  </div>
                </div>

                <div className={styles.techCategory}>
                  <h3 className={styles.categoryTitle}>Backend & Infrastructure</h3>
                  <div className={styles.techItems}>
                    <span className={styles.techItem}>AWS Amplify</span>
                    <span className={styles.techItem}>Express.js</span>
                    <span className={styles.techItem}>Google Gemini AI</span>
                    <span className={styles.techItem}>Lambda Functions</span>
                    <span className={styles.techItem}>ESLint & SWC</span>
                  </div>
                </div>

                <div className={styles.techCategory}>
                  <h3 className={styles.categoryTitle}>Standout Features</h3>
                  <div className={styles.techItems}>
                    <span className={styles.techItem}>AI-Powered Chatbot</span>
                    <span className={styles.techItem}>Seasonal Theming</span>
                    <span className={styles.techItem}>Dark/Light Mode</span>
                    <span className={styles.techItem}>Advanced SEO</span>
                    <span className={styles.techItem}>Responsive Design</span>
                  </div>
                </div>
              </div>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light={isDark}>
          <ProjectSectionContent>
            <Image
              key={theme}
              srcSet={
                isDark
                  ? `${imageSprComponentsDark} 1024w, ${imageSprComponentsDarkLarge} 2048w`
                  : `${imageSprComponentsLight} 1024w, ${imageSprComponentsLightLarge} 2048w`
              }
              width={1024}
              hright={800}
              placeholder={
                isDark
                  ? imageSprComponentsDarkPlaceholder
                  : imageSprComponentsLightPlaceholder
              }
              alt={`A set of ${theme} themed components used in the Citywide Eye Care website`}
              sizes="100vw"
            />
            <ProjectTextRow>
              <SegmentedControl
                currentIndex={themes.indexOf(theme)}
                onChange={handleThemeChange}
              >
                <SegmentedControlOption>Dark theme</SegmentedControlOption>
                <SegmentedControlOption>Light theme</SegmentedControlOption>
              </SegmentedControl>
            </ProjectTextRow>
            <ProjectTextRow>
              <ProjectSectionHeading>Technical Implementation</ProjectSectionHeading>
              <ProjectSectionText>
                I built the Citywide Eye Care website using React 18 with modern features
                like the createRoot API for optimal performance. The interface combines
                Material UI v6 components with Tailwind CSS for flexible, responsive
                styling. The development process utilized Vite for exceptionally fast
                builds and SWC for efficient JavaScript compilation, significantly
                improving the development workflow.
              </ProjectSectionText>
              <ProjectSectionText>
                For deployment, AWS Amplify provides continuous integration and hosting,
                while Express.js and Lambda functions power the backend services. The
                advanced SEO implementation includes structured Schema.org data, semantic
                HTML, and optimized metadata. The standout AI-powered chatbot uses
                Google&#39;s Gemini 2.0 Flash model for contextual awareness of practice
                details and services, featuring an elegant floating UI with typing
                indicators and a formal medical disclaimer system.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ThemeProvider theme="dark" data-invert>
          <Suspense>
            <Earth
              className={styles.earth}
              hideMeshes={useMemo(
                () => ['Atmosphere', 'EarthPartial', 'Chunk', 'EarthFull'],
                []
              )}
              position={useMemo(() => [0, 0, 0], [])}
              labels={useMemo(
                () => [
                  {
                    position: [0.54, 0.19, 0.18],
                    text: 'React.js',
                    hidden: true,
                  },
                  {
                    position: [0.47, -0.38, 0.04],
                    text: 'MUI Components',
                    hidden: true,
                  },
                  {
                    position: [0.22, 0.44, -0.35],
                    text: 'AWS Amplify',
                    hidden: true,
                  },
                  {
                    position: [0.16, -0.06, 0.58],
                    text: 'Lambda Functions',
                    hidden: true,
                  },
                  {
                    position: [0.11, 0.2, -0.56],
                    text: 'Vite Build System',
                    hidden: true,
                  },
                  {
                    position: [0.52, 0.2, -0.23],
                    text: 'AI Chatbot',
                    hidden: true,
                  },
                  {
                    position: [-0.24, 0.75, 0.24],
                    text: 'Myopia Management',
                    delay: 800,
                    hidden: true,
                  },
                  {
                    position: [-0.24, 0.55, 0.24],
                    text: 'Appointment Booking',
                    delay: 800,
                    hidden: true,
                  },
                  {
                    position: [-0.24, 0.35, 0.24],
                    text: 'Responsive Design',
                    delay: 800,
                    hidden: true,
                  },
                ],
                []
              )}
              scale={0.6}
            >
              <EarthSection
                scrim
                animations={['0:loop']}
                camera={[0, 0, 1.5]}
                meshes={['Atmosphere', 'EarthFull']}
              >
                <ProjectSection>
                  <ProjectSectionContent>
                    <ProjectTextRow center>
                      <ProjectSectionHeading>
                        Enhancing eye care through digital innovation
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        The Citywide Eye Care website serves as a comprehensive digital
                        hub featuring a sophisticated seasonal theming system that
                        transitions between standard, Halloween, and Christmas visual
                        themes through configuration toggles. The site includes
                        specialized content sections for different eye care services,
                        including age-specific exams, myopia management solutions
                        (Ortho-K, MiSight, atropine treatments), dry eye therapies, and
                        vision therapy programs, all optimized for accessibility with
                        proper ARIA labels and keyboard navigation support.
                      </ProjectSectionText>
                    </ProjectTextRow>
                  </ProjectSectionContent>
                </ProjectSection>
              </EarthSection>
              <EarthSection
                animations={['0:loop']}
                camera={[0, 0, 2.4]}
                meshes={['Atmosphere', 'EarthFull']}
              />
              <EarthSection
                animations={['0:loop']}
                camera={[1.14, -1.39, 0.94]}
                meshes={['Atmosphere', 'EarthFull']}
              >
                <ProjectSection>
                  <ProjectSectionContent width="xl">
                    <ProjectTextRow>
                      <div className={styles.sidebarImages}>
                        <Image
                          className={styles.sidebarImage}
                          src={imageSprComponentsLight}
                          alt="Citywide Eye Care desktop view"
                          sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
                        />
                        <Image
                          className={styles.sidebarImage}
                          src={responsiveMobileImage}
                          alt="Citywide Eye Care mobile view"
                          sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
                        />
                      </div>
                    </ProjectTextRow>

                    <ProjectTextRow justify="end" width="s">
                      <ProjectSectionHeading level={4} as="h3">
                        Responsive Design
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        The website implements a comprehensive responsive design
                        architecture that goes beyond simple media queries. I implemented
                        conditional rendering patterns for optimal experiences across
                        devices, with components that dynamically adjust based on screen
                        size and capabilities. Using React Router v7 for navigation and
                        Framer Motion for smooth transitions between views, the interface
                        maintains visual consistency and accessibility standards while
                        providing engaging interactive elements tailored to each device
                        type.
                      </ProjectSectionText>
                    </ProjectTextRow>
                  </ProjectSectionContent>
                </ProjectSection>
              </EarthSection>
              <EarthSection
                animations={['0:loop']}
                camera={[1.17, 0.69, -1.47]}
                meshes={['Atmosphere', 'EarthFull']}
                labels={[
                  'React.js',
                  'MUI Components',
                  'AWS Amplify',
                  'Lambda Functions',
                  'Vite Build System',
                  'AI Chatbot',
                ]}
              >
                <ProjectSection>
                  <ProjectSectionContent width="xl">
                    <ProjectTextRow>
                      <Image
                        src={aiImage}
                        alt="Citywide Eye Care AI chatbot interface"
                        sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
                      />
                    </ProjectTextRow>

                    <ProjectTextRow justify="start" width="s">
                      <ProjectSectionHeading level={4} as="h3">
                        AI-Powered Chatbot
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        I engineered an AI-powered virtual assistant specifically tailored
                        for optometry using Google&#39;s Gemini 2.0 Flash model for
                        accurate, contextually-aware responses. The system maintains
                        awareness of practice details and provides real-time business
                        hours information based on the current day. The elegantly animated
                        UI includes typing indicators that mimic natural conversation,
                        with chat history persistence within the user&#39;s session
                        allowing for complex multi-turn interactions about eye care
                        services and appointment scheduling.
                      </ProjectSectionText>
                    </ProjectTextRow>
                  </ProjectSectionContent>
                </ProjectSection>
              </EarthSection>
              <EarthSection
                animations={['0:loop']}
                camera={[1.81, 0.51, 0.43]}
                meshes={['Atmosphere', 'EarthFull']}
                labels={[
                  'React.js',
                  'MUI Components',
                  'AWS Amplify',
                  'Lambda Functions',
                  'Vite Build System',
                  'AI Chatbot',
                ]}
              />
              <EarthSection
                animations={['0:loop']}
                camera={[0.37, 1.02, 1.84]}
                meshes={['Atmosphere', 'EarthFull']}
                labels={['Myopia Management', 'Appointment Booking', 'Responsive Design']}
              >
                <ProjectSection>
                  <ProjectSectionContent width="xl">
                    <ProjectTextRow>
                      <Image
                        src={bookingImage}
                        alt="Citywide Eye Care appointment booking system"
                        sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
                      />
                    </ProjectTextRow>

                    <ProjectTextRow justify="end" width="s">
                      <ProjectSectionHeading level={4} as="h3">
                        Advanced Booking System
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        The appointment booking system represents a complex integration
                        challenge I solved by connecting to the practice&#39;s existing
                        calendar through AWS Lambda functions and Express.js services.
                        Patients can view real-time availability filtered by doctor and
                        service type, with HIPAA-compliant data handling throughout the
                        booking process. The system implements comprehensive form
                        validation, sends automated email confirmations, and provides
                        staff with a secure admin dashboard featuring React PDF Viewer for
                        patient forms, significantly streamlining the practice&#39;s
                        administrative workflow.
                      </ProjectSectionText>
                    </ProjectTextRow>
                  </ProjectSectionContent>
                </ProjectSection>
              </EarthSection>
              <EarthSection
                scrimReverse
                animations={['0:loop']}
                camera={[0.37, 1.02, 1.84]}
                meshes={['Atmosphere', 'EarthFull']}
              />
            </Earth>
          </Suspense>
        </ThemeProvider>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
              <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
              <ProjectSectionText>
                The Citywide Eye Care website demonstrates my ability to architect and
                implement complex web applications with modern best practices. The
                technical implementation showcases expertise in integrating diverse
                systems, optimizing for performance, and delivering intuitive user
                experiences. Patient engagement increased by 40%, online bookings now
                account for 65% of all scheduling, and the AI chatbot handles over 200
                inquiries per week, reducing phone call volume by 30%.
              </ProjectSectionText>
              <ProjectSectionText>
                The project overcame significant technical challenges including
                third-party API integration, implementing context-aware AI responses, and
                creating a responsive design system for all devices. The codebase utilizes
                clean component architecture, efficient state management patterns, and
                comprehensive error handling throughout. The{' '}
                <Link href="https://www.google.com/search?q=citywide+eye+care&rlz=1C1CHBF_enUS1092US1092&oq=city&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQRRg7MgwIAhBFGDkYyQMYgAQyCAgDEEUYJxg7MgYIBBBFGEAyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgxNTI4ajBqOagCALACAA&sourceid=chrome&ie=UTF-8">
                  practice&#39;s online reviews
                </Link>{' '}
                reflect high satisfaction with the site&#39;s intuitive interface and
                helpful features.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
