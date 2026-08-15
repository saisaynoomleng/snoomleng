import { Media } from '@snoomleng/utils';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { replaceDashWithSpace } from '@snoomleng/utils';

import { RiHotelLine } from 'react-icons/ri';
import { MdHealthAndSafety } from 'react-icons/md';
import { PiShoppingBagFill } from 'react-icons/pi';
import { BsSuitcaseLgFill } from 'react-icons/bs';

export type ProjectDisplayCardProps = {
  className?: string;
  media: Media;
  renderMedia: (props: Media) => React.ReactElement;
  name: string;
  type: keyof typeof projectIconMap;
};

export const projectIconMap = {
  property: RiHotelLine,
  'health-care': MdHealthAndSafety,
  'e-commerce': PiShoppingBagFill,
  portfolio: BsSuitcaseLgFill,
} as const;

export const ProjectDisplayCard = ({
  className,
  media,
  renderMedia,
  name,
  type,
}: ProjectDisplayCardProps): React.JSX.Element => {
  const Icon = projectIconMap[type];

  return (
    <div
      className={twMerge(
        clsx(
          'border-4 group border-primary relative p-2 brand-box-shadow hover:scale-[1.01]',
          className,
        ),
      )}
    >
      <div>{renderMedia({ alt: media.alt, src: media.src })}</div>

      <div className="hidden group-hover:absolute group-hover:flex flex-col gap-y-2 inset-0 bg-background/10 backdrop-blur-lg justify-center items-center">
        <Icon className="text-fs-900" aria-hidden={true} />
      </div>

      <div className="text-center">
        <p className="font-bold">{name.toUpperCase()}</p>
        <p className="font-bold font-heading">{replaceDashWithSpace(type)}</p>
      </div>
    </div>
  );
};
