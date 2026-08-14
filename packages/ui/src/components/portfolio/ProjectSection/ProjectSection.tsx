import React from 'react';
import { Bounded, SectionTitle } from '../../shared';
import { CallToAction } from '@snoomleng/utils';

import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { ProjectCard } from './ProjectCard';

type ProjectSectionProps = {
  className?: string;
  projects: Project[];
  renderAction: (props: CallToAction) => React.ReactElement;
};

export type Project = {
  _id: string;
  excerpt: string;
  startedAt: string;
  endedAt: string | null;
  slug: string;
  name: string;
  links: Link[];
  stacks: string[];
  type: string;
};

type Link = {
  _key: string;
  label: string;
  url: string;
};

export const ProjectSection = ({
  className,
  projects,
  renderAction,
}: ProjectSectionProps): React.JSX.Element => {
  return (
    <Bounded
      as="div"
      padding="none"
      size="full"
      className={twMerge(clsx('space-y-8', className))}
    >
      <SectionTitle label="Things i shipped" />

      <ProjectCard projects={projects} renderAction={renderAction} />
    </Bounded>
  );
};
