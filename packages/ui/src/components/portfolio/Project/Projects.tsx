import React from 'react';
import { Bounded, SectionTitle } from '../../shared';
import { CallToAction, formatDate } from '@snoomleng/utils';
import { SiGithub } from 'react-icons/si';
import { CiLink } from 'react-icons/ci';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Separator } from '#components/ui/separator';

type ProjectCardProps = {
  className?: string;
  projects: Project[];
  renderAction: (props: CallToAction) => React.ReactElement;
};

type Project = {
  _id: string;
  excerpt: string;
  startedAt: string;
  endedAt: string | null;
  slug: string;
  name: string;
  links: Link[];
  stacks: string[];
};

type Link = {
  _key: string;
  label: string;
  url: string;
};

export const Projects = ({
  className,
  projects,
  renderAction,
}: ProjectCardProps): React.JSX.Element => {
  return (
    <Bounded
      as="div"
      padding="none"
      size="full"
      spacing="lg"
      className={twMerge(clsx('', className))}
    >
      <SectionTitle label="Things i shipped" />

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
                <p className="font-bold  text-brand-primary-800">{p.name}</p>
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
                    <a
                      key={link._key}
                      rel="noreferrer noindex"
                      href={link.url}
                      className="text-fs-500 font-semibold hover:text-primary"
                    >
                      <span>
                        {link.label === 'Repo' ? <SiGithub /> : <CiLink />}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <Separator className="max-w-[80%] md:max-w-[90%] mt-6 mx-auto" />
            </div>
          );
        })}
      </div>
    </Bounded>
  );
};
