import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TECH_STACK_ICON_MAP,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
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
import clsx from 'clsx';
import { useRemoveTechStack } from '@/hooks/useTechStack';
import { UseMutateAsyncFunction } from '@tanstack/react-query';

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
  _id: string;
};

export const TechStackPreviewCard = ({
  _id,
  view,
  slug,
  name,
  iconText,
  type,
}: TechStackPreviewCardProps): React.JSX.Element => {
  const Icon =
    TECH_STACK_ICON_MAP[iconText as keyof typeof TECH_STACK_ICON_MAP];
  const { mutateAsync: removeAction } = useRemoveTechStack(_id);

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

          <LinkButtons slug={slug} view={view} removeAction={removeAction} />
        </div>
      ) : (
        <div className="grid grid-cols-3 items-center  px-2 py-1 border border-border/20">
          <p className="font-semibold">{name}</p>
          <p className="font-semibold place-self-center">
            {replaceDashWithNoSpace(formatTitle(type))}
          </p>

          <LinkButtons slug={slug} view={view} removeAction={removeAction} />
        </div>
      )}
    </>
  );
};
const LinkButtons = ({
  slug,
  view,
  removeAction,
}: {
  slug: string;
  view: 'grid' | 'list';
  removeAction: UseMutateAsyncFunction;
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
            <Link href={`/technologies/${slug}`}>
              <IoPencil />
              {view === 'grid' && <span>Edit</span>}
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit</TooltipContent>
      </Tooltip>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className={clsx(
              'shadow-none! translate-none! border-brand-error-600 text-brand-error-600!',
              view === 'grid' && 'flex-1',
            )}
          >
            Remove
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to delete this Tech Stack?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete Tech
              Stack from Content Lake.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => removeAction()} className="">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
