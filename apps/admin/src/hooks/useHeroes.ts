'use client';

import { handleCreateHero } from '@/actions/Heroes/handleCreateHero';
import { queryKeys } from '@/lib/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useCreateHeroes = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: handleCreateHero,

    onSuccess: async (result) => {
      if (!result.success) return;

      await queryClient.invalidateQueries({
        queryKey: queryKeys.heroes.all,
      });

      router.refresh();
    },

    onError: (error) => {
      console.error(error);
    },
  });
};
