'use client';

import React from 'react';
import { useAllTechStacks } from './hooks';
import {
  AdminDashboardSkeleton,
  Bounded,
  SectionTitle,
  TECH_STACK_ICON_MAP,
} from '@snoomleng/ui';
import { notFound } from 'next/navigation';
import { formatTitle, replaceDashWithSpace } from '@snoomleng/utils';
import Link from 'next/link';

import {
  SiBetterauth,
  SiClerk,
  SiDocker,
  SiDrizzle,
  SiExpress,
  SiGithub,
  SiGsap,
  SiLinux,
  SiNeon,
  SiNextdotjs,
  SiNginx,
  SiPostgresql,
  SiReact,
  SiReacthookform,
  SiRedis,
  SiSanity,
  SiShadcnui,
  SiStorybook,
  SiTailwindcss,
  SiTanstack,
  SiTypescript,
  SiVim,
  SiVitest,
  SiZod,
} from 'react-icons/si';
import { FaGolang, FaNode, FaStripe } from 'react-icons/fa6';
import { FaAws } from 'react-icons/fa';

const TechnologyPage = (): React.JSX.Element => {
  const { data: techStacks, isLoading, isError } = useAllTechStacks();

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

      <div className="grid grid-cols-2 gap-4">
        {techs.map((tech) => (
          <Link
            href={`/technologies/${tech.slug}/edit`}
            key={tech.slug}
            className="flex gap-y-3 justify-between hover:bg-primary hover:text-background px-2 py-1 border border-border/10"
          >
            <p className="font-semibold">{tech.name}</p>
            {tech.type && <p>{replaceDashWithSpace(formatTitle(tech.type))}</p>}
          </Link>
        ))}
      </div>
    </Bounded>
  );
};

export default TechnologyPage;
