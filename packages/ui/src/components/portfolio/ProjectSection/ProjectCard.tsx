import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#components/ui/tooltip';
import { SiGithub } from 'react-icons/si';
import { CiLink } from 'react-icons/ci';

import React from 'react';
import { Project } from './ProjectSection';
import { CallToAction, formatDate } from '@snoomleng/utils';

export type ProjectCardProps = {
  projects: Project[];
  renderAction: (props: CallToAction) => React.ReactElement;
};

export const ProjectCard = ({
  projects,
  renderAction,
}: ProjectCardProps): React.JSX.Element => {
  return (
    <div>
      {projects.map((p, index) => {
        const number = `${index + 1}`.padStart(2, '0');

        return (
          <div
            key={p._id}
            className="border-l-2 border-primary pl-8 ml-4 relative pb-4 md:pb-6"
          >
            <p className="tabular-nums p-px bg-brand-primary-600 font-semibold text-fs-300 text-background absolute -left-2.5">
              {number}
            </p>

            <div className="flex flex-col gap-y-3">
              <p className="font-bold  text-brand-primary-800 flex gap-x-2">
                <span>{p.name}</span>
                <span className="text-brand-secondary-600">[ {p.type} ]</span>
              </p>
              <p className="text-fs-300 flex gap-x-3 font-semibold text-muted-foreground">
                <span>{formatDate(p.startedAt)}</span>
                <span>-</span>
                <span>
                  {p.endedAt ? formatDate(p.endedAt) : 'Currently Working'}
                </span>
              </p>

              <p>{p.excerpt}</p>

              <div className="flex flex-wrap gap-1">
                {p.stacks.slice(0, 15).map((stack) => (
                  <p
                    key={stack}
                    className="text-fs-300 border-2 border-muted-foreground p-1"
                  >
                    {stack}
                  </p>
                ))}
              </div>

              <div className="flex gap-x-2">
                {renderAction({
                  label: 'Project Detail',
                  href: `/projects/${p.slug}`,
                })}

                {p.links.map((link) => (
                  <Tooltip key={link._key}>
                    <TooltipTrigger asChild>
                      <a
                        rel="noreferrer noindex"
                        href={link.url}
                        aria-label={link.label}
                        className="text-fs-500 font-semibold hover:text-primary"
                      >
                        <span>
                          {link.label === 'Repo' ? (
                            <SiGithub aria-hidden={true} />
                          ) : (
                            <CiLink aria-hidden={true} />
                          )}
                        </span>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>{link.label}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
