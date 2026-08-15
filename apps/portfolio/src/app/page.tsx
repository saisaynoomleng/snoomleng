import { handleContactForm } from '@/actions/handleContactForm';
import { RenderAction } from '@/components/RenderAction';
import { RenderMedia } from '@/components/RenderMedia';
import { sanityFetch } from '@/sanity/live';
import { HOME_PAGE_QUERY } from '@/sanity/query';
import {
  AboutSection,
  Bounded,
  ContactFormSection,
  CTA,
  EmploymentSection,
  EmploymentProps,
  HeroSection,
  PortableTextBlock,
  Project,
  ProjectSection,
  TechnologySection,
  TechnologyProps,
} from '@snoomleng/ui';

export default async function Home() {
  const { data: homepage } = await sanityFetch({ query: HOME_PAGE_QUERY });

  if (!homepage) return <>Loading...</>;

  const { hero, projects, about, technology, settings, employments } = homepage;

  return (
    <Bounded spacing="lg">
      {hero && (
        <HeroSection
          title={hero.title || ''}
          body={hero.body as PortableTextBlock[]}
          actions={hero.actions as CTA[]}
          media={{ src: hero.imageUrl || '', alt: hero.imageAlt || '' }}
          position={hero.position || []}
          renderAction={(props) => RenderAction({ props })}
          renderMedia={(props) => RenderMedia({ props })}
        />
      )}

      {about && (
        <AboutSection
          body={about.body as PortableTextBlock[]}
          location={
            settings?.contactInfo
              ? `${settings.contactInfo.city}, ${settings.contactInfo.state}`
              : ''
          }
          mode={settings?.mode as string[]}
          status={true}
        />
      )}

      {technology && (
        <TechnologySection techs={technology as TechnologyProps[]} />
      )}

      {projects && (
        <ProjectSection
          projects={projects as Project[]}
          renderAction={(props) =>
            RenderAction({ props, className: 'hover:text-primary' })
          }
        />
      )}

      {employments && (
        <EmploymentSection employments={employments as EmploymentProps[]} />
      )}

      <ContactFormSection action={handleContactForm} />
    </Bounded>
  );
}
