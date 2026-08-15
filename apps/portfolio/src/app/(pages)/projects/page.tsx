import { Bounded, SectionTitle } from '@snoomleng/ui';
import React from 'react';
import type { Metadata } from 'next';
import { sanityFetch } from '@/sanity/live';
import { ALL_PROJECTS_QUERY } from '@/sanity/query';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore projects by Sai Say Noom Leng, including full-stack applications, modern web experiences, and software solutions built with thoughtful architecture and user-focused design.',
};

const ProjectsPage = async (): Promise<React.JSX.Element> => {
  const { data: projects } = await sanityFetch({ query: ALL_PROJECTS_QUERY });

  if (!projects) return notFound();

  return (
    <Bounded>
      <div className="flex flex-col h-100 justify-center items-center text-center gap-y-4 md:gap-y-6">
        <SectionTitle label="Building Ideas Into Digital Experiences" as="h2" />
        <p className="font-semibold text-muted-foreground">
          A collection of projects where I explore product development, modern
          web technologies, and thoughtful engineering. Each project represents
          a journey of solving problems, designing solutions, and building
          reliable experiences from concept to completion.
        </p>
      </div>
    </Bounded>
  );
};

export default ProjectsPage;
