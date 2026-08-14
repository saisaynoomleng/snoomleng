import React from 'react';
import { Bounded, PortableTextRenderer, SectionTitle } from '../../shared';
import { PortableTextBlock } from '@portabletext/react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { formatYear } from '@snoomleng/utils';

export type EmployementSectionProps = {
  className?: string;
  employments: EmploymentProps[];
};

export type EmploymentProps = {
  _id: string;
  body: PortableTextBlock[];
  name: string;
  companyName: string;
  startedAt: string;
  endedAt: string | null;
};

export const EmploymentSection = ({
  className,
  employments,
}: EmployementSectionProps): React.JSX.Element => {
  return (
    <Bounded
      className={twMerge(clsx('', className))}
      size="full"
      padding="none"
      spacing="sm"
    >
      <SectionTitle label="Employment Histories" />

      <div className="flex flex-col gap-y-4">
        {employments.map((e) => (
          <div key={e._id} className="border-b border-border/20 px-4 md:px-6">
            <div className="flex justify-between items-center">
              <p className="font-semibold">
                <span>{e.name}</span>{' '}
                <span className="text-primary text-fs-300">
                  {e.companyName}
                </span>
              </p>
              <p className="text-fs-300 font-semibold text-primary-foreground">
                <span>{formatYear(e.startedAt)}</span>
                <span> — </span>
                <span>
                  {e.endedAt ? `${formatYear(e.endedAt)}` : 'Present'}
                </span>
              </p>
            </div>

            {e.body && (
              <div className="prose prose-sm">
                <PortableTextRenderer value={e.body} />
              </div>
            )}
          </div>
        ))}
      </div>
    </Bounded>
  );
};
