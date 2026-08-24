'use client';

import { handleCreateTechStack } from '@/actions/handleCreateTechStack';
import { hanldeRemoveDocument } from '@/actions/handleRemoveDocument';
import { getAllTechStacks } from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { toast } from '@snoomleng/ui';
import { TechStackFormInputSchema } from '@snoomleng/utils';
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

    onSuccess: async (result) => {
      if (!result.success) {
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: queryKeys.techStacks.all,
      });

      router.push('/technologies');
    },

    onError: (error) => {
      console.error(error);
    },
  });
};

export const useRemoveTechStack = (_id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => hanldeRemoveDocument(_id, '/technologies'),

    onSuccess: async (result) => {
      if (!result.success) {
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: queryKeys.techStacks.all,
      });
      router.push('/technologies');
    },

    onError: (error) => {
      console.error(error);
    },
  });
};
