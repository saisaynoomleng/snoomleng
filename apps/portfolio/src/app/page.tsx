import { RenderAction } from '@/components/RenderAction';
import { RenderMedia } from '@/components/RenderMedia';
import { sanityFetch } from '@/sanity/live';
import {
  ABOUT_QUERY,
  ALL_EMPLOYMENTS_QUERY,
  ALL_PROJECTS_QUERY,
  MAIN_HERO_QUERY,
  SITE_SETTINGS_QUERY,
  TECHSTACK_QUERY,
} from '@/sanity/query';
import {
  About,
  Bounded,
  ContactForm,
  CTA,
  Employment,
  Employments,
  Hero,
  PortableTextBlock,
  Project,
  Projects,
  Separator,
  TechProps,
  TechStack,
  Workflow,
} from '@snoomleng/ui';

export default async function Home() {
  const { data: hero } = await sanityFetch({ query: MAIN_HERO_QUERY });
  const { data: technologies } = await sanityFetch({ query: TECHSTACK_QUERY });
  const { data: about } = await sanityFetch({ query: ABOUT_QUERY });
  const { data: setting } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const { data: projects } = await sanityFetch({ query: ALL_PROJECTS_QUERY });
  const { data: employments } = await sanityFetch({
    query: ALL_EMPLOYMENTS_QUERY,
  });

  return (
    <Bounded spacing="lg">
      {hero && (
        <Hero
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
        <About
          body={about.body as PortableTextBlock[]}
          workflows={about.workflows as Workflow[]}
          location={
            setting?.contactInfo
              ? `${setting.contactInfo.city}, ${setting.contactInfo.state}`
              : ''
          }
        />
      )}

      <Separator />

      {technologies && <TechStack techs={technologies as TechProps[]} />}

      <Separator />

      {projects && (
        <Projects
          projects={projects as Project[]}
          renderAction={(props) =>
            RenderAction({ props, className: 'hover:text-primary' })
          }
        />
      )}

      <Separator />

      {employments && <Employments employments={employments as Employment[]} />}

      <Separator />

      <ContactForm />
    </Bounded>
  );
}
