'use client';

import { handleSanityImageUpload } from '@/actions/handleSanityImageUpload';
import { handleEditHero } from '@/actions/Heroes/hadleEditHero';
import { useEditHero } from '@/hooks/useHeroes';
import { HERO_QUERY_RESULT } from '@/sanity/types';
import { EditHeroForm, PortableTextBlock } from '@snoomleng/ui';
import { HeroFormInputSchema } from '@snoomleng/utils';

type EditFormProps = {
  data: NonNullable<HERO_QUERY_RESULT>;
};

export const EditForm = ({ data }: EditFormProps) => {
  const { mutateAsync: action } = useEditHero(data._id);

  const heroData: HeroFormInputSchema = {
    name: data.name || '',
    slug: data.slug || '',
    positions: [
      {
        value: data.position?.join('.') as string,
      },
    ],
    title: data.title ?? '',
    body: data.body as PortableTextBlock[],
    imageAlt: data.imageAlt ?? '',
    imageAssetId: data.imageAssetId ?? '',
    callToActions: data.actions as {
      _key: string;
      label: string;
      href: string;
    }[],
  };

  return (
    <EditHeroForm
      data={heroData}
      action={action}
      imageUploadAction={handleSanityImageUpload}
    />
  );
};
