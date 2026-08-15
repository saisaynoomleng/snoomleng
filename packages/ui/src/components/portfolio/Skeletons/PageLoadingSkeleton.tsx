import React from 'react';
import { Bounded } from '../../shared';
import { Skeleton } from '#components/ui/skeleton';

export const PageLoadingSkeleton = (): React.JSX.Element => {
  return (
    <Bounded spacing="sm">
      <Skeleton className="w-full h-100" />

      <div className="grid md:grid-cols-2 gap-4">
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
      </div>

      <Skeleton className="w-full h-30" />
      <Skeleton className="w-full h-30" />

      <div className="grid md:grid-cols-3 gap-4">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
      </div>
    </Bounded>
  );
};
