'use client';

import { getAllTechStacks } from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useAllTechStacks = () => {
  return useQuery({
    queryKey: queryKeys.techStacks.all,
    queryFn: getAllTechStacks,
  });
};
