import React from 'react';
import { Bounded, PortableTextRenderer, SectionTitle } from '../../shared';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { PortableTextBlock } from '@portabletext/react';

type AboutProps = {
  className?: string;
  body: PortableTextBlock[];
  workflows: Workflow[];
  location: string;
};

type Workflow = {
  _key: string;
  body: string;
  title: string;
};

export const About = ({
  className,
  body,
  workflows,
  location,
}: AboutProps): React.JSX.Element => {
  return (
    <Bounded
      className={twMerge(clsx('', className))}
      size="full"
      padding="none"
      spacing="md"
    >
      <SectionTitle label="About me" />

      <div className="grid gap-y-6 md:grid-cols-2 md:gap-x-6 md:justify-center">
        <div className="flex flex-col ">
          {body && <PortableTextRenderer value={body} />}
          <p>
            <span className="font-semibold">Location: </span>
            <span className="text-primary text-fs-300 font-semibold">
              {location}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-y-4 md:gap-y-4">
          {workflows.map((w) => (
            <div key={w._key} className="space-y-4">
              <p className="font-semibold underline underline-offset-4 decoration-primary decoration-2 decoration-wavy">
                {w.title}
              </p>
              <p className="text-fs-300 font-semibold text-muted-foreground">
                {w.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};
