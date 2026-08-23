import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TECH_STACK_ICON_MAP,
} from '@snoomleng/ui';
import {
  formatTitle,
  replaceDashWithNoSpace,
  replaceDashWithSpace,
} from '@snoomleng/utils';
import Link from 'next/link';
import React from 'react';
import { IoIosEye } from 'react-icons/io';
import { IoPencil } from 'react-icons/io5';

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
import clsx from 'clsx';

export type TECH_TYPES =
  | 'frontend'
  | 'backend'
  | 'ai'
  | 'tooling'
  | 'devops'
  | 'badge'
  | 'cloud-and-infrastructure';

type TechStackPreviewCardProps = {
  view: 'grid' | 'list';
  slug: string;
  name: string;
  iconText: string;
  type: TECH_TYPES;
};

export const TechStackPreviewCard = ({
  view,
  slug,
  name,
  iconText,
  type,
}: TechStackPreviewCardProps): React.JSX.Element => {
  const Icon =
    TECH_STACK_ICON_MAP[iconText as keyof typeof TECH_STACK_ICON_MAP];

  return (
    <>
      {view === 'grid' ? (
        <div className="flex flex-col gap-y-2 border border-border/20 p-4">
          <Icon className="size-10 self-center mx-auto text-black/20" />
          <p className="font-semibold">{name}</p>
          <p>
            <span>Type: </span>
            <span className="font-semibold">
              {replaceDashWithSpace(formatTitle(type))}
            </span>
          </p>

          <LinkButtons slug={slug} view={view} />
        </div>
      ) : (
        <div className="grid grid-cols-3 items-center  px-2 py-1 border border-border/20">
          <p className="font-semibold">{name}</p>
          <p className="font-semibold place-self-center">
            {replaceDashWithNoSpace(formatTitle(type))}
          </p>

          <LinkButtons slug={slug} view={view} />
        </div>
      )}
    </>
  );
};
const LinkButtons = ({
  slug,
  view,
}: {
  slug: string;
  view: 'grid' | 'list';
}) => {
  return (
    <div
      className={clsx(
        'flex gap-x-1',
        view === 'grid' && 'w-full',
        view === 'list' && 'justify-end',
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant="outline"
            className={clsx(
              'shadow-none! translate-none! border-border/20',
              view === 'grid' && 'flex-1',
            )}
          >
            <Link href={`/technologies/${slug}`}>
              <IoIosEye />
              {view === 'grid' && <span>Preview</span>}
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Preview</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant="outline"
            className={clsx(
              'shadow-none! translate-none! border-border/20',
              view === 'grid' && 'flex-1',
            )}
          >
            <Link href={`/technologies/${slug}/edit`}>
              <IoPencil />
              {view === 'grid' && <span>Edit</span>}
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit</TooltipContent>
      </Tooltip>
    </div>
  );
};
