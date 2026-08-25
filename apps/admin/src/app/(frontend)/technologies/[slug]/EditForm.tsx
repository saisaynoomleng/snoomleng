'use client';

import { useEditTechStack } from '@/hooks/useTechStack';
import { EditTechStackForm } from '@snoomleng/ui';
import { TechStackFormInputSchema } from '@snoomleng/utils';
import React from 'react';

export const EditForm = ({
  _id,
  techStack,
  slug,
}: {
  _id: string;
  techStack: TechStackFormInputSchema;
  slug: string;
}): React.JSX.Element => {
  const { mutateAsync: action } = useEditTechStack(_id);

  return <EditTechStackForm tech={techStack} action={action} />;
};
