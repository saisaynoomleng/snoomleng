'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#components/ui/tooltip';
import { CiLink } from 'react-icons/ci';
import { SiGithub } from 'react-icons/si';

export type ProjectLinkProps = {
  href: string;
  label: string;
};

export const ProjectLink = ({
  href,
  label,
}: ProjectLinkProps): React.JSX.Element => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          rel="noreferrer noindex"
          href={href}
          aria-label={label}
          className="text-fs-500 font-semibold hover:text-primary"
        >
          <span>
            {label === 'Repo' ? (
              <SiGithub aria-hidden={true} />
            ) : (
              <CiLink aria-hidden={true} />
            )}
          </span>
        </a>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
};
