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
import {
  AnimateSlideIn,
  AnimateSlideInGroup,
} from '#components/animations/index';

export type TechnologySectionProps = {
  className?: string;
  techs: TechnologyProps[];
};

export type TechnologyProps = {
  _id: string;
  icon: string;
  name: string;
};

export const TECH_STACK_ICON_MAP = {
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
  stripe: FaStripe,
  redis: SiRedis,
  nodejs: FaNode,
  go: FaGolang,
} as const;

export const TechnologySection = ({
  className,
  techs,
}: TechnologySectionProps): React.JSX.Element => {
  return (
    <Bounded
      size="full"
      padding="none"
      spacing="sm"
      className={twMerge(clsx('', className))}
    >
      <AnimateSlideIn direction="top">
        <SectionTitle label="Technologies" />
      </AnimateSlideIn>

      <AnimateSlideInGroup
        direction="left"
        className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4 place-items-center"
      >
        {techs.map((t) => {
          const Icon =
            TECH_STACK_ICON_MAP[t.icon as keyof typeof TECH_STACK_ICON_MAP];

          return (
            <Tooltip key={t._id}>
              <TooltipTrigger className="w-fit" asChild>
                {Icon && (
                  <Icon
                    data-animate-item
                    className="text-fs-600 text-muted-foreground hover:text-primary"
                    aria-hidden={true}
                  />
                )}
              </TooltipTrigger>
              <TooltipContent>{t.name}</TooltipContent>
            </Tooltip>
          );
        })}
      </AnimateSlideInGroup>
    </Bounded>
  );
};
