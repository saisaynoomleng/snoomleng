'use client';

import { handleSanityImageUpload } from '@/actions/handleSanityImageUpload';
import BackTo from '@/components/BackTo';
import { useCreateHeroes } from '@/hooks/useHeroes';
import { Bounded, CreateHeroForm } from '@snoomleng/ui';

const CreateHeroPage = () => {
  const { mutateAsync: action } = useCreateHeroes();

  return (
    <Bounded size="full" spacing="sm">
      <BackTo href="/heroes" label="All Hero Pages" />

      <CreateHeroForm
        action={action}
        imageUploadAction={handleSanityImageUpload}
      />
    </Bounded>
  );
};

export default CreateHeroPage;
