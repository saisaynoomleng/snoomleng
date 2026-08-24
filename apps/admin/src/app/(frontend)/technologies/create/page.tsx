'use client';

import { Bounded, CreateTechStackForm, SectionTitle } from '@snoomleng/ui';
import { useCreateTechStack } from '../../../../hooks/useTechStack';

const CreateTechStackPage = () => {
  const { mutateAsync: action } = useCreateTechStack();

  return (
    <Bounded spacing="sm" centered={false} size="full">
      <SectionTitle label="Create New Tech Stack" />
      <CreateTechStackForm action={action} />
    </Bounded>
  );
};

export default CreateTechStackPage;
