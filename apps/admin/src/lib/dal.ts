'use server';

import { sanityFetch } from '@/sanity/live';
import { ALL_TECH_STACK_QUERY } from '@/sanity/query';

export const getAllTechStacks = async () => {
  const { data } = await sanityFetch({ query: ALL_TECH_STACK_QUERY });

  return data;
};
