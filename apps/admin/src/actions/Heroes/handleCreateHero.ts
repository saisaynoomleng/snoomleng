'use server';

import { writeClient } from '@/sanity/writeClient';
import {
  ActionResponse,
  HeroFormInputSchema,
  HeroFormOutputSchema,
  HeroFormSchema,
} from '@snoomleng/utils';

export const handleCreateHero = async (
  data: HeroFormInputSchema,
): Promise<ActionResponse<HeroFormOutputSchema>> => {
  try {
    const result = HeroFormSchema.safeParse(data);

    if (!result.success) {
      const firstError = result.error.issues[0];

      return {
        success: false,
        message: firstError.message,
        field: firstError.path.join('.') as keyof HeroFormInputSchema,
      };
    }

    const {
      name,
      title,
      slug,
      positions,
      body,
      imageAlt,
      imageAssetId,
      callToActions,
    } = result.data;

    await writeClient.create({
      _type: 'hero',
      _id: crypto.randomUUID(),
      name,
      slug: {
        current: slug,
      },
      position: [...positions.map((p) => p.value)],
      title,
      body,
      mainImage: {
        _type: 'imageWithAlt',
        alt: imageAlt,
        asset: {
          _ref: imageAssetId,
          _type: 'reference',
        },
      },
      actions: [...callToActions],
    });

    return {
      success: true,
      message: 'Page Hero Created',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};
