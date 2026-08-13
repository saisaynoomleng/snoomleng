'use client';

import React from 'react';
import { Bounded, SectionTitle } from '../../shared';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#components/ui/tooltip';

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
import { FaAws } from 'react-icons/fa';

type TechStackProps = {
  className?: string;
  techs: TechProps[];
};

type TechProps = {
  _id: string;
  icon: string;
  name: string;
};

const iconMap = {
  storybook: SiStorybook,
  linux: SiLinux,
  nextjs: SiNextdotjs,
  react: SiReact,
  sanity: SiSanity,
  postgresql: SiPostgresql,
  github: SiGithub,
  aws: FaAws,
  nginx: SiNginx,
  docker: SiDocker,
  expressjs: SiExpress,
  neon: SiNeon,
  tanstack: SiTanstack,
  gsap: SiGsap,
  vitest: SiVitest,
  typescript: SiTypescript,
  zod: SiZod,
  tailwindcss: SiTailwindcss,
  shadcn: SiShadcnui,
  reacthookform: SiReacthookform,
  betterauth: SiBetterauth,
  clerk: SiClerk,
  vim: SiVim,
  drizzle: SiDrizzle,
} as const;

export const TechStack = ({
  className,
  techs,
}: TechStackProps): React.JSX.Element => {
  return (
    <Bounded
      size="full"
      padding="none"
      spacing="sm"
      className={twMerge(clsx('', className))}
    >
      <SectionTitle label="Technologies" />

      <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4 place-items-center">
        {techs.map((t) => {
          const Icon = iconMap[t.icon as keyof typeof iconMap];

          return (
            <Tooltip key={t._id}>
              <TooltipTrigger className="w-fit">
                {Icon && (
                  <Icon className="text-fs-600 text-muted-foreground hover:text-primary" />
                )}
              </TooltipTrigger>
              <TooltipContent>{t.name}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </Bounded>
  );
};
