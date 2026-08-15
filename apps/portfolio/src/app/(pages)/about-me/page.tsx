import { RenderAction } from '@/components/RenderAction';
import { RenderMedia } from '@/components/RenderMedia';
import { sanityFetch } from '@/sanity/live';
import { ABOUT_PAGE_QUERY } from '@/sanity/query';
import {
  Bounded,
  HeroSection,
  PortableTextBlock,
  PortableTextRenderer,
  SectionTitle,
} from '@snoomleng/ui';
import { CallToAction } from '@snoomleng/utils';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Sai Say Noom Leng, a software engineer combining creativity and technology to build thoughtful digital experiences, scalable applications, and modern web solutions.',
};

const AboutPage = async (): Promise<React.JSX.Element> => {
  const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY });
  const { hero, detail } = data;

  if (!detail || !hero) return notFound();

  const { title, body, actions, imageAlt, imageUrl, position } = hero;
  const { workFlow, expertises } = detail;

  return (
    <Bounded spacing="lg">
      {hero && (
        <HeroSection
          title={title || ''}
          body={body as PortableTextBlock[]}
          actions={actions as CallToAction}
          media={{ src: imageUrl || '', alt: imageAlt || '' }}
          renderAction={(props) => RenderAction({ props })}
          renderMedia={(props) =>
            RenderMedia({ className: 'saturate-40', props })
          }
          position={position as string[]}
        />
      )}

      <div className="flex flex-col gap-y-6">
        <SectionTitle label="How I Think" />

        <div className="grid md:grid-cols-3 gap-y-4 md:gap-x-4">
          {workFlow?.map((w) => (
            <div
              key={w._key}
              className="space-y-4 md:space-y-6 border-t-2 border-primary"
            >
              <p className="font-semibold">{w.title}</p>
              <p>{w.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-y-6">
        <div className="space-y-2">
          <SectionTitle label="How You Can Hire Me" />
          <p>
            I help teams transform ideas into reliable, scalable, and
            user-friendly digital products through thoughtful engineering and
            modern web technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-x-4">
          {expertises &&
            expertises.map((e) => (
              <div
                key={e._key}
                className="space-y-2 border-2 p-2 brand-box-shadow"
              >
                <p className="font-semibold">{e.title}</p>
                {e.body && (
                  <div className="prose prose-sm min-w-full">
                    <PortableTextRenderer
                      value={e.body as PortableTextBlock[]}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AboutPage;
