import React from 'react';
import { Bounded, PortableTextRenderer } from '../../shared';
import type { CallToAction, Media } from '@snoomleng/utils';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Button } from '#components/ui/button';
import { PortableTextBlock } from '@portabletext/react';

type HeroProps = {
  title: string;
  body: PortableTextBlock[];
  actions: CTA[] | CallToAction;
  media: Media;
  renderAction: (props: CallToAction) => React.ReactElement;
  renderMedia: (props: Media) => React.ReactElement;
  className?: string;
  position: string[];
};

export type CTA = CallToAction & { _key: string };

export const Hero = ({
  title,
  body,
  actions,
  media,
  renderAction,
  renderMedia,
  position,
  className,
}: HeroProps): React.JSX.Element => {
  return (
    <Bounded
      size="full"
      padding="none"
      className={twMerge(
        clsx(
          'grid md:grid-cols-2 md:gap-x-6 md:justify-between md:items-center min-h-screen',
          className,
        ),
      )}
    >
      <div className="flex flex-col gap-y-6 md:gap-y-8 md:justify-center">
        <div className="flex gap-x-2 items-baseline">
          <span className="w-3 aspect-square bg-primary"></span>
          {position.map((item, index) => (
            <React.Fragment key={item}>
              {index > 0 && (
                <span aria-hidden="true" className="text-fs-300 text-primary">
                  •
                </span>
              )}

              <p className="font-heading text-fs-300 font-bold uppercase tracking-wider">
                {item}
              </p>
            </React.Fragment>
          ))}
        </div>

        <h1 className="text-fs-600 md:text-fs-700 uppercase">{title}</h1>

        {body && <PortableTextRenderer value={body} />}

        <div className="flex gap-x-4 items-center">
          {Array.isArray(actions) ? (
            actions.map((action, i) => (
              <Button
                asChild
                key={action._key}
                variant={(i + 1) % 2 === 0 ? 'outline' : 'default'}
              >
                {renderAction({ label: action.label, href: action.href })}
              </Button>
            ))
          ) : (
            <Button asChild>
              {renderAction({ label: actions.label, href: actions.href })}
            </Button>
          )}
        </div>
      </div>

      {renderMedia({ src: media.src, alt: media.alt })}
    </Bounded>
  );
};
