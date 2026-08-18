import { formatDate, Media } from '@snoomleng/utils';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export type BlogCardProps = {
  className?: string;
  name: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  focus: string;
  media: Media;
  renderMedia: (props: Media) => React.ReactElement;
};

export const BlogCard = ({
  className,
  name,
  excerpt,
  publishedAt,
  focus,
  category,
  media,
  renderMedia,
}: BlogCardProps): React.JSX.Element => {
  return (
    <div
      className={twMerge(
        clsx(
          'flex flex-col gap-y-1 border-2 w-75 p-2 md:p-3 border-border brand-box-shadow hover:scale-[1.01] duration-200 transition-transform',
          className,
        ),
      )}
    >
      <div className="overflow-hidden relative w-full aspect-square">
        {renderMedia({ src: media.src, alt: media.alt })}
      </div>

      <div className="flex flex-col gap-y-2 text-fs-300">
        <div className="flex justify-between items-center  font-semibold text-brand-black/60">
          <p className="border border-primary/50 px-2 py-1">{focus}</p>
          <p>{formatDate(publishedAt)}</p>
        </div>

        <p className="font-semibold text-fs-400 text-brand-primary-600 truncate">
          {name}
        </p>
        <p className="font-medium truncate">{excerpt}</p>
        <p>
          <span className="font-semibold">Category: </span>
          <span>{category}</span>
        </p>
      </div>
    </div>
  );
};
