'use client';

import { handleCreateTechStack } from '@/actions/handleCreateTechStack';
import { getAllTechStacks } from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useAllTechStacks = () => {
  return useQuery({
    queryKey: queryKeys.techStacks.all,
    queryFn: getAllTechStacks,
  });
};

export const useCreateTechStack = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: handleCreateTechStack,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.techStacks.all,
      });

      router.push('/technologies');
    },
  });
};
