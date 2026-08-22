export const queryKeys = {
  techStacks: {
    all: ['technologies'] as const,
    bySlug: (slug: string) => ['technologies', slug] as const,
  },
};
