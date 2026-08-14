import React from 'react';
import { Bounded, PortableTextRenderer, SectionTitle } from '../../shared';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { PortableTextBlock } from '@portabletext/react';
import { AboutSpec } from './AboutSpec';

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
      <SectionTitle label="About me" />

      <div className="grid gap-y-6 md:grid-cols-2 md:gap-x-6 md:justify-center md:items-center">
        <AboutSpec
          className="place-self-center"
          location={location}
          mode={mode}
          status={status}
        />

        <div className="prose prose-sm w-full">
          {body && <PortableTextRenderer value={body} />}
        </div>
      </div>
    </Bounded>
  );
};
