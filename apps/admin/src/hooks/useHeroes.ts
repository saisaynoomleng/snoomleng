'use client';

import { handleEditHero } from '@/actions/Heroes/hadleEditHero';
import { handleCreateHero } from '@/actions/Heroes/handleCreateHero';
import { getAllHeroes } from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { HeroFormInputSchema } from '@snoomleng/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useGetHeroes = () => {
  return useQuery({
    queryFn: getAllHeroes,
    queryKey: queryKeys.heroes.all,
  });
};

export const useEditHero = (_id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: HeroFormInputSchema) => handleEditHero(data, _id),

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
