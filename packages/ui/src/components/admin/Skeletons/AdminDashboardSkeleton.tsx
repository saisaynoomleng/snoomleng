import { Bounded } from '#components/shared/Bounded/Bounded';
import { Skeleton } from '#components/ui/skeleton';
import React from 'react';

export const AdminDashboardSkeleton = (): React.JSX.Element => {
  return (
    <Bounded spacing="sm">
      <div className="grid grid-cols-3 gap-x-4">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
      </div>

      <div className="grid grid-cols-2 gap-x-4">
        <Skeleton className="w-full h-90" />
        <Skeleton className="w-full h-90" />
      </div>

      <div className="grid grid-cols-4 gap-x-4">
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
      </div>

      <div className="grid grid-cols-6 gap-x-4">
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
      </div>
    </Bounded>
  );
};
