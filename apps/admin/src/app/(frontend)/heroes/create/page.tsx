'use client';

import { handleSanityImageUpload } from '@/actions/handleSanityImageUpload';
import { useCreateHeroes } from '@/hooks/useHeroes';
import { Bounded, CreateHeroForm } from '@snoomleng/ui';

const CreateHeroPage = () => {
  const { mutateAsync: action } = useCreateHeroes();

  return (
    <Bounded size="full">
      <CreateHeroForm
        action={action}
        imageUploadAction={handleSanityImageUpload}
      />
    </Bounded>
  );
};

export default CreateHeroPage;
