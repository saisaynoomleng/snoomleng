import React from 'react';
import { Table, TableBody, TableRow, TableCell } from '../../ui';
import {
  formatDate,
  formatTitle,
  replaceDashWithSpace,
} from '@snoomleng/utils';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export type ProjectDetailTableProps = {
  className?: string;
  name: string;
  startedAt: string;
  endedAt: string;
  type: string;
};

export const ProjectDetailTable = ({
  className,
  name,
  startedAt,
  endedAt,
  type,
}: ProjectDetailTableProps): React.JSX.Element => {
  return (
    <Table className={twMerge(clsx('border-2', className))}>
      <TableBody>
        <TableRow>
          <TableCell>Project Name</TableCell>
          <TableCell className="font-semibold">{name}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Started Date</TableCell>
          {startedAt && (
            <TableCell className="font-semibold">
              {formatDate(startedAt)}
            </TableCell>
          )}
        </TableRow>

        <TableRow>
          <TableCell>Ended Date</TableCell>
          {endedAt ? (
            <TableCell className="font-semibold">
              {formatDate(endedAt)}
            </TableCell>
          ) : (
            <TableCell>Still baking</TableCell>
          )}
        </TableRow>

        <TableRow>
          <TableCell>Project Type</TableCell>
          {type && (
            <TableCell className="font-semibold">
              {replaceDashWithSpace(formatTitle(type))}
            </TableCell>
          )}
        </TableRow>
      </TableBody>
    </Table>
  );
};
