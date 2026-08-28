import React from 'react';
import { Bounded, PortableTextRenderer, SectionTitle } from '../../shared';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { PortableTextBlock } from '@portabletext/react';
import { AboutSpec } from './AboutSpec';
import { AnimateSlideIn } from '#components/animations/index';

type AboutSectionProps = {
  className?: string;
  body: PortableTextBlock[];
  mode: string[];
  location: string;
  status: boolean;
};

export const AboutSection = ({
  className,
  body,
  location,
  status,
  mode,
}: AboutSectionProps): React.JSX.Element => {
  return (
    <Bounded
      className={twMerge(clsx('', className))}
      size="full"
      padding="none"
      spacing="md"
    >
      <AnimateSlideIn direction="top">
        <SectionTitle label="About me" />
      </AnimateSlideIn>

      <div className="grid gap-y-6 md:grid-cols-2 md:gap-x-6 md:justify-center md:items-center">
        <AnimateSlideIn direction="left">
          <AboutSpec
            className="place-self-center"
            location={location}
            mode={mode}
            status={status}
          />
        </AnimateSlideIn>

        <AnimateSlideIn direction="right" className="prose prose-sm w-full">
          {body && <PortableTextRenderer value={body} />}
        </AnimateSlideIn>
      </div>
    </Bounded>
  );
};
