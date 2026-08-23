'use client';

import React from 'react';

type ViewProps = 'grid' | 'list';

export const useChangeComponentView = () => {
  const [view, setView] = React.useState<ViewProps>('grid');

  return { view, setView };
};
