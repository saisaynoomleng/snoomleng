'use client';

import {
  Button,
  ButtonGroup,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@snoomleng/ui';
import clsx from 'clsx';
import React, { SetStateAction } from 'react';
import { MdGridView, MdViewList } from 'react-icons/md';

type ViewProps = 'grid' | 'list';

type ChangeViewButtonProps = {
  view: ViewProps;
  setView: React.Dispatch<SetStateAction<ViewProps>>;
};

export const ChangeViewButton = ({ view, setView }: ChangeViewButtonProps) => {
  return (
    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={clsx(
              'shadow-none! translate-none! hover:bg-primary/50 hover:text-background',
              view === 'grid' && 'bg-primary text-background',
            )}
            variant="outline"
            onClick={() => setView('grid')}
          >
            <MdGridView />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Grid View</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={clsx(
              'shadow-none! translate-none! hover:bg-primary/50 hover:text-background',
              view === 'list' && 'bg-primary text-background',
            )}
            variant="outline"
            onClick={() => setView('list')}
          >
            <MdViewList />
          </Button>
        </TooltipTrigger>
        <TooltipContent>List View</TooltipContent>
      </Tooltip>
    </ButtonGroup>
  );
};
