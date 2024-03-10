import backgroundSprLarge from '~/assets/spr-background-large.jpg';
import backgroundSprPlaceholder from '~/assets/spr-background-placeholder.jpg';
// import imageSprBackgroundVolcanismLarge from '~/assets/spr-background-volcanism-large.jpg';
// import imageSprBackgroundVolcanismPlaceholder from '~/assets/spr-background-volcanism-placeholder.jpg';
// import imageSprBackgroundVolcanism from '~/assets/spr-background-volcanism.jpg';
import backgroundSpr from '~/assets/spr-background.jpg';
import imageSprComponentsDarkLarge from '~/assets/spr-components-dark-large.png';
import imageSprComponentsDarkPlaceholder from '~/assets/spr-components-dark-placeholder.png';
import imageSprComponentsDark from '~/assets/spr-components-dark.png';
import imageSprComponentsLightLarge from '~/assets/spr-components-light-large.png';
import imageSprComponentsLightPlaceholder from '~/assets/spr-components-light-placeholder.png';
import imageSprComponentsLight from '~/assets/spr-components-light.png';
// import imageSprDesignSystemDarkLarge from '~/assets/spr-design-system-dark-large.png';
// import imageSprDesignSystemDarkPlaceholder from '~/assets/spr-design-system-dark-placeholder.png';
// import imageSprDesignSystemDark from '~/assets/spr-design-system-dark.png';
// import imageSprDesignSystemLightLarge from '~/assets/spr-design-system-light-large.png';
// import imageSprDesignSystemLightPlaceholder from '~/assets/spr-design-system-light-placeholder.png';
// import imageSprDesignSystemLight from '~/assets/spr-design-system-light.png';
import imageSprLessonBuilderDarkLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
import imageSprLessonBuilderDarkPlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import imageSprLessonBuilderDark from '~/assets/spr-lesson-builder-dark.jpg';
import imageSprLessonBuilderLightLarge from '~/assets/spr-lesson-builder-light-large.jpg';
import imageSprLessonBuilderLightPlaceholder from '~/assets/spr-lesson-builder-light-placeholder.jpg';
import imageSprLessonBuilderLight from '~/assets/spr-lesson-builder-light.jpg';
// import videoSprMotionLarge from '~/assets/spr-motion-large.mp4';
// import videoSprMotionPlaceholder from '~/assets/spr-motion-placeholder.jpg';
// import videoSprMotion from '~/assets/spr-motion.mp4';
// import imageSprSchema1DarkLarge from '~/assets/spr-schema-1-dark-large.png';
// import imageSprSchema1DarkPlaceholder from '~/assets/spr-schema-1-dark-placeholder.png';
// import imageSprSchema1Dark from '~/assets/spr-schema-1-dark.png';
// import imageSprSchema1LightLarge from '~/assets/spr-schema-1-light-large.png';
// import imageSprSchema1LightPlaceholder from '~/assets/spr-schema-1-light-placeholder.png';
// import imageSprSchema1Light from '~/assets/spr-schema-1-light.png';
// import imageSprSchema2DarkLarge from '~/assets/spr-schema-2-dark-large.png';
// import imageSprSchema2DarkPlaceholder from '~/assets/spr-schema-2-dark-placeholder.png';
// import imageSprSchema2Dark from '~/assets/spr-schema-2-dark.png';
// import imageSprSchema2LightLarge from '~/assets/spr-schema-2-light-large.png';
// import imageSprSchema2LightPlaceholder from '~/assets/spr-schema-2-light-placeholder.png';
// import imageSprSchema2Light from '~/assets/spr-schema-2-light.png';
// import imageSprStoryboarderDarkLarge from '~/assets/spr-storyboarder-dark-large.png';
// import imageSprStoryboarderDarkPlaceholder from '~/assets/spr-storyboarder-dark-placeholder.png';
// import imageSprStoryboarderDark from '~/assets/spr-storyboarder-dark.png';
// import imageSprStoryboarderLightLarge from '~/assets/spr-storyboarder-light-large.png';
// import imageSprStoryboarderLightPlaceholder from '~/assets/spr-storyboarder-light-placeholder.png';
// import imageSprStoryboarderLight from '~/assets/spr-storyboarder-light.png';
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

const title = 'Designing the future of Indian Clothing';
const description =
  '*Change* I crafted an end-to-end system for Citywide Eye Care, integrating a Shopify backend to streamline operations and enhance customer experience, ensuring seamless management of their online platform.';
const roles = [
  '*Change*',
  'Back-End Inventory Management',
  'UX and UI Design',
  'Front End Development',
  'Meta ChatBot Integration',
  'AI Image Processing with PhotoRoom',
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
              alt="The aero lesson builder app dragging an audio component into a screen about plant cells."
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>The problem</ProjectSectionHeading>
            <ProjectSectionText>
              *Change*
              One common problem faced by Indian clothing brands in the USA relates to a
              perceived imbalance between pricing and quality. While some brands offer
              lower-priced items, they may compromise on quality, leading to skepticism
              among consumers. Conversely, brands offering higher-quality products may
              struggle to compete with lower-priced alternatives, potentially limiting
              their market reach. Balancing affordability with quality remains a challenge
              for Indian clothing brands seeking success in the competitive US market.
            </ProjectSectionText>
          </ProjectTextRow>
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
              alt={`A set of ${theme} themed components for the aero design system`}
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
              <ProjectSectionHeading>The Shopify Design System</ProjectSectionHeading>
              <ProjectSectionText>
                *Change*
                Shopify can play a crucial role in addressing the pricing and quality
                challenges faced by Citywide in the US market through its robust inventory
                management and order fulfillment features. By utilizing Shopify’s
                platform, Citywidecan efficiently manage its inventory levels, ensuring
                that only high-quality products are stocked and readily available for
                customers. Additionally, Shopify’s order management system can streamline
                the fulfillment process, allowing Citywide to fulfill orders promptly and
                accurately, thereby enhancing customer satisfaction and trust. Moreover,
                Shopify’s analytics tools can provide valuable insights into sales trends
                and customer preferences, enabling Citywide to make informed decisions about
                pricing strategies and product offerings to maintain a competitive edge
                while delivering superior quality.
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
                    text: 'Pacific ring of fire',
                    hidden: true,
                  },
                  {
                    position: [0.47, -0.38, 0.04],
                    text: 'Ruapehu',
                    hidden: true,
                  },
                  {
                    position: [0.22, 0.44, -0.35],
                    text: 'St. Helens',
                    hidden: true,
                  },
                  {
                    position: [0.16, -0.06, 0.58],
                    text: 'Krakatoa',
                    hidden: true,
                  },
                  {
                    position: [0.11, 0.2, -0.56],
                    text: 'Parícutin',
                    hidden: true,
                  },
                  {
                    position: [0.52, 0.2, -0.23],
                    text: 'Kīlauea',
                    hidden: true,
                  },
                  {
                    position: [-0.24, 0.75, 0.24],
                    text: 'Mantle',
                    delay: 800,
                    hidden: true,
                  },
                  {
                    position: [-0.24, 0.55, 0.24],
                    text: 'Outer core',
                    delay: 800,
                    hidden: true,
                  },
                  {
                    position: [-0.24, 0.35, 0.24],
                    text: 'Inner core',
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
                        Connecting people all across the globe with our modern touch
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        *Change*
                        Shopify offers Citywide a powerful platform to create an immersive
                        shopping experience for customers worldwide seeking modern Indian
                        clothing. With customizable storefronts and seamless integration
                        of diverse payment gateways, Citywide can showcase its range of
                        attire, including kurtas, lehengas, and shararas, in an engaging
                        and user-friendly manner.
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
                    <ProjectTextRow justify="end" width="s">
                      <ProjectSectionHeading level={4} as="h3">
                        Customizable Storefronts
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        Shopify provides Citywide with the flexibility to design captivating
                        storefronts that resonate with customers worldwide, showcasing
                        their diverse range of modern Indian clothing in an appealing
                        manner tailored to different cultural preferences and tastes.
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
                  'Pacific ring of fire',
                  'Ruapehu',
                  'St. Helens',
                  'Krakatoa',
                  'Parícutin',
                  'Kīlauea',
                ]}
              >
                <ProjectSection>
                  <ProjectSectionContent width="xl">
                    <ProjectTextRow justify="start" width="s">
                      <ProjectSectionHeading level={4} as="h3">
                        Multilingual Capabilities
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        With Shopify’s multilingual capabilities, Citywide can easily
                        translate their website content into multiple languages, breaking
                        down language barriers and ensuring that customers from various
                        regions can navigate the site and make purchases with ease.
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
                  'Pacific ring of fire',
                  'Ruapehu',
                  'St. Helens',
                  'Krakatoa',
                  'Parícutin',
                  'Kīlauea',
                ]}
              />
              <EarthSection
                animations={['0:loop']}
                camera={[0.37, 1.02, 1.84]}
                meshes={['Atmosphere', 'EarthFull']}
                labels={['Mantle', 'Outer core', 'Inner core']}
              >
                <ProjectSection>
                  <ProjectSectionContent width="xl">
                    <ProjectTextRow justify="end" width="s">
                      <ProjectSectionHeading level={4} as="h3">
                        Global Marketing and Analytics
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        Shopify equips Citywide with powerful marketing tools and analytics
                        capabilities to target and analyze customer behavior across the
                        globe. Through targeted marketing campaigns and data-driven
                        insights, Citywide can effectively reach and engage with customers
                        in different regions, optimizing their marketing efforts and
                        driving sales growth.
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
                Ultimately the project was successful and was launched by CEO of Citywide{' '}
                <Link href="https://www.google.com/search?q=citywide+eye+care&rlz=1C1CHBF_enUS1092US1092&oq=city&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQRRg7MgwIAhBFGDkYyQMYgAQyCAgDEEUYJxg7MgYIBBBFGEAyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgxNTI4ajBqOagCALACAA&sourceid=chrome&ie=UTF-8">
                  as shown in google
                </Link>{' '}
                to become a next generation Indian Clothing platform.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
