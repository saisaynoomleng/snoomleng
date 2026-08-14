'use client';

import { Separator } from '#components/ui/separator';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub, SiLeetcode } from 'react-icons/si';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '#components/ui/tooltip';

export type ContactDetailProps = {
  className?: string;
};

const LINKS = [
  {
    name: 'LinkedIn',
    icon: <FaLinkedin aria-hidden={true} />,
    url: 'https://www.linkedin.com/in/sai-say-noom-leng-72a94031a/',
  },
  {
    name: 'GitHub',
    icon: <SiGithub aria-hidden={true} />,
    url: 'https://github.com/saisaynoomleng',
  },
  {
    name: 'LeetCode',
    icon: <SiLeetcode aria-hidden={true} />,
    url: 'https://leetcode.com/u/saisaynoomleng/',
  },
];

export const ContactDetail = ({
  className,
}: ContactDetailProps): React.JSX.Element => {
  return (
    <div
      className={twMerge(
        clsx(
          'p-4 md:p-6 border-2 brand-box-shadow flex flex-col justify-between gap-y-4',
          className,
        ),
      )}
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-y-2">
          <p className="font-semibold">Direct Contact</p>
          <a
            href="mailto:saileng9723@gmail.com"
            className="hover:underline underline-offset-4 decoration-primary decoration-wavy"
            aria-label="eamil link"
          >
            saileng9723@gmail.com
          </a>
        </div>

        <Separator />

        <div className="flex flex-col gap-y-2">
          <p className="font-semibold">Availability</p>
          <p>
            Open to full-time, part-time, freelance, and contract opportunities.
            Always interested in good people, thoughtful projects, and
            interesting problems.
          </p>
        </div>

        <Separator />
      </div>

      <div className="flex items-end gap-x-4">
        {LINKS.map((link) => (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild className="p-1 border">
              <a
                target="_blank"
                href={link.url}
                aria-label={`${link.name} link`}
                rel="noopener noreferrer"
              >
                <span className="text-fs-500">{link.icon}</span>
              </a>
            </TooltipTrigger>
            <TooltipContent>{link.name}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
