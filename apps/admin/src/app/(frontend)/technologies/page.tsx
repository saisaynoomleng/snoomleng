'use client';

import React from 'react';
import {
  useAllTechStacks,
  useRemoveTechStack,
} from '../../../hooks/useTechStack';
import { AdminDashboardSkeleton, Bounded, SectionTitle } from '@snoomleng/ui';
import { notFound } from 'next/navigation';
import { formatTitle, replaceDashWithSpace } from '@snoomleng/utils';
import { ChangeViewButton } from '@/components/ChangeViewButton';
import { useChangeComponentView } from '@/hooks/useChangeComponentView';
import {
  TECH_TYPES,
  TechStackPreviewCard,
} from '@/components/TechStackPreviewCard';
import clsx from 'clsx';
import AddNewButton from '@/components/AddNewButton';

const TechnologyPage = (): React.JSX.Element => {
  const { data: techStacks, isLoading, isError } = useAllTechStacks();
  const { view, setView } = useChangeComponentView();

  if (isLoading) return <AdminDashboardSkeleton />;

  if (isError) return notFound();

  if (!techStacks) return notFound();

  const { techs, total } = techStacks;

  const TECH_TYPES = [
    ['frontend', 'frontendCount'],
    ['backend', 'backendCount'],
    ['ai', 'aiCount'],
    ['tooling', 'toolingCount'],
    ['devops', 'devopsCount'],
    ['badge', 'badgeCount'],
    ['cloud-and-infrastructure', 'cloudCount'],
  ] as const;

  return (
    <Bounded centered={false} size="full" spacing="md">
      <SectionTitle label="Tech Stacks" />

      <div className="flex flex-col gap-y-4 border-2 p-2 border-primary font-heading">
        <p>
          <span className="font-semibold">Total Stack: </span>
          <span>{total}</span>
        </p>

        <div className="grid grid-cols-7 gap-x-3">
          {TECH_TYPES.map(([type, countKey]) => (
            <div
              key={type}
              className="flex flex-col border border-border/10 p-2"
            >
              <p className="font-semibold">
                <span>{replaceDashWithSpace(formatTitle(type))}</span>
              </p>
              <p>
                <span>Total Stack: </span>
                <span>{techStacks[countKey]}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className={clsx(
          'grid gap-3',
          view === 'grid' ? 'grid-cols-4' : 'grid-cols-1',
        )}
      >
        <div className="col-span-full flex justify-between">
          <AddNewButton href="/technologies/create" />
          <ChangeViewButton view={view} setView={setView} />
        </div>

        {techs.map((tech) => (
          <TechStackPreviewCard
            key={tech.slug}
            view={view}
            name={tech.name || ''}
            slug={tech.slug || ''}
            type={tech.type as unknown as TECH_TYPES}
            iconText={tech.iconText || ''}
            _id={tech._id}
          />
        ))}
      </div>
    </Bounded>
  );
};

export default TechnologyPage;
