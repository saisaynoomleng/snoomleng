export const queryKeys = {
  techStacks: {
    all: ['technologies'] as const,
    bySlug: (slug: string) => ['technologies', slug] as const,
    byId: (id: string) => ['technologies', id] as const,
  },

  heroes: {
    all: ['heroes'] as const,
  },

  auth: {
    all: ['auth'] as const,
  },
};
