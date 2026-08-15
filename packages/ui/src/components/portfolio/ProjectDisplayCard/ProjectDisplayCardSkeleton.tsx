import { Skeleton } from '#components/ui/skeleton';
import React from 'react';

export const ProjectDisplayCardSkeleton = (): React.JSX.Element => {
  return (
    <div className="w-100 h-100 flex flex-col gap-y-2">
      <Skeleton className="w-100 h-80" />
      <Skeleton className="w-50 h-3 mx-auto" />
      <Skeleton className="w-30 h-3 mx-auto" />
    </div>
  );
};
