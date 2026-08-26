'use server';

import { writeClient } from '@/sanity/writeClient';
import {
  ActionResponse,
  HeroFormInputSchema,
  HeroFormOutputSchema,
  HeroFormSchema,
} from '@snoomleng/utils';
import { revalidatePath } from 'next/cache';

export const handleEditHero = async (
  data: HeroFormInputSchema,
  _id: string,
): Promise<ActionResponse<HeroFormOutputSchema>> => {
  try {
    const result = HeroFormSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        message: 'Invalid data',
      };
    }

    const {
      name,
      slug,
      positions,
      title,
      body,
      imageAlt,
      imageAssetId,
      callToActions,
    } = result.data;

    await writeClient
      .patch(_id)
      .set({
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
      })
      .commit();

    revalidatePath(`/heroes/${slug}`);

    return {
      success: true,
      message: 'Hero Page Edited!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};
