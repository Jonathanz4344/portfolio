import sliceAnnotationLarge from '~/assets/intune-cart-large.png';
import sliceAnnotationPlaceholder from '~/assets/intune-cart-placeholder.png';
import sliceAnnotation from '~/assets/intune-cart.png';
import sliceAppLarge from '~/assets/intune-first-image-large.jpg';
import sliceAppPlaceholder from '~/assets/intune-first-image-placeholder.jpg';
import sliceApp from '~/assets/intune-first-image.jpg';
import sliceBackgroundBarLarge from '~/assets/intune-checkout-large.jpg';
import sliceBackgroundBarPlaceholder from '~/assets/intune-checkout-placeholder.jpg';
import sliceBackgroundBar from '~/assets/intune-checkout.jpg';
import sliceBackgroundLarge from '~/assets/intune-background-large.jpg';
import sliceBackgroundPlaceholder from '~/assets/intune-background-placeholder.jpg';
import sliceBackground from '~/assets/intune-background.jpg';
import sliceIrlPlaceholder from '~/assets/intune-lesson-placeholder.jpg';
import sliceIrl from '~/assets/intune-lesson.jpg';
import sliceSidebarAnnotationsLarge from '~/assets/intune-admin-lesson-large.png';
import sliceSidebarAnnotationsPlaceholder from '~/assets/intune-admin-lesson-placeholder.png';
import sliceSidebarAnnotations from '~/assets/intune-admin-lesson.png';
import sliceSidebarLayersLarge from '~/assets/intune-admin-product.png';
import sliceSidebarLayersPlaceholder from '~/assets/intune-admin-product-placeholder.png';
import sliceSidebarLayers from '~/assets/intune-admin-product.png';
import sliceSlidesLarge from '~/assets/intune-product-large.jpg';
import sliceSlidesPlaceholder from '~/assets/intune-product-placeholder.jpg';
import sliceSlides from '~/assets/intune-product.jpg';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { Fragment } from 'react';
import { media } from '~/utils/style';
import { baseMeta } from '~/utils/meta'; 
import styles from './slice.module.css';

const title = 'Intune';
const description =
  ' Welcome to InTune, your premier destination for all things musical! Our e-commerce website offers a wide array of options, including purchasing, renting, reviewing, and even taking lessons for musical instruments. With an extensive selection to explore, dive into our website today to discover the perfect harmony for your musical aspirations.';
const roles = ['User Research', 'UX Design', 'Interface Design'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const Slice = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.slice}>
        <ProjectBackground
          src={sliceBackground}
          srcSet={`${sliceBackground} 1280w, ${sliceBackgroundLarge} 2560w`}
          width={1280}
          height={800}
          placeholder={sliceBackgroundPlaceholder}
          opacity={0.8}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://www.best.edu.au/s/q2yjjvl7?data=8%404!9%4020303!10%40-15087&version=1"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${sliceApp} 800w, ${sliceAppLarge} 1920w`}
              width={800}
              height={500}
              placeholder={sliceAppPlaceholder}
              alt="The Slice web application showing a selected user annotation."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>User/admin page</ProjectSectionHeading>
              <ProjectSectionText>
              Empowering users with versatile access control, enabling them to seamlessly browse the 
              website for purchasing, renting, reviewing, and accessing lessons. Meanwhile, administrators 
              wield comprehensive control, facilitating actions such as adding instruments, fine-tuning quantities, 
              and crafting or refining lessons with effortless precision.
              </ProjectSectionText>
              <ProjectSectionText>
                {/* if need additional text */}
              </ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={`${sliceSidebarLayers} 350w, ${sliceSidebarLayersLarge} 700w`}
                width={350}
                height={750}
                placeholder={sliceSidebarLayersPlaceholder}
                alt="The layers sidebar design, now with user profiles."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={`${sliceSidebarAnnotations} 350w, ${sliceSidebarAnnotationsLarge} 700w`}
                width={350}
                height={750}
                placeholder={sliceSidebarAnnotationsPlaceholder}
                alt="Multiple user annotations on a shared layer."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Product Page</ProjectSectionHeading>
              <ProjectSectionText>
                The product page showcases a diverse array of instruments currently in stock, 
                complete with detailed descriptions and pricing information. A user-friendly 
                search bar enhances the browsing experience, offering comprehensive filtering 
                options to search by instrument name or select specific instrument families.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${sliceSlides} 800w, ${sliceSlidesLarge} 19w`}
              width={800}
              height={500}
              placeholder={sliceSlidesPlaceholder}
              alt="The new My Slides tab in slice, showing annotated and favorited slides."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection padding="top">
          <ProjectSectionContent className={styles.grid}>
            <div className={styles.gridImage}>
              <div className={styles.gridBackground}>
                <Image
                  srcSet={`${sliceBackgroundBar} 440w, ${sliceBackgroundBarLarge} 880w`}
                  width={440}
                  height={790}
                  placeholder={sliceBackgroundBarPlaceholder}
                  alt=""
                  role="presentation"
                  sizes={`(max-width: ${media.mobile}px) 312px, (max-width: ${media.tablet}px) 408px, 514px`}
                />
              </div>
              <div className={styles.gridForeground}>
                <Image
                  srcSet={`${sliceAnnotation} 440w, ${sliceAnnotationLarge} 880w`}
                  width={440}
                  height={340}
                  placeholder={sliceAnnotationPlaceholder}
                  alt="An annotation preview popover with statistics for shape perimeter and area."
                  sizes={`(max-width: ${media.mobile}px) 584px, (max-width: ${media.tablet}px) 747px, 556px`}
                />
              </div>
            </div>
            <div className={styles.gridText}>
              <ProjectSectionHeading>Cart/Checkout</ProjectSectionHeading>
              <ProjectSectionText>
              Comprehensive shopping cart featuring clear product images, item names, prices, 
              and quantities for a seamless checkout process. The checkout page is designed to 
              accommodate your needs, allowing you to effortlessly input personal information 
              including address, name, and credit card details to finalize your purchase.
              </ProjectSectionText>
            </div>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Lessons</ProjectSectionHeading>
              <ProjectSectionText>
              Explore our lesson page, where you can conveniently schedule sessions with an instructor 
              tailored to your specific instrument. Whether you're a beginner or advanced musician, our 
              platform provides an intuitive interface for arranging personalized lessons that cater to 
              your musical journey.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              src={sliceIrl}
              width={940}
              height={500}
              placeholder={sliceIrlPlaceholder}
              alt="Students at the University of New South Wales using the new collaborative annotation features"
            />
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
