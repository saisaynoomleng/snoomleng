'use server';

import { writeClient } from '@/sanity/writeClient';
import {
  ActionResponse,
  TechStackFormInputSchema,
  TechstackFormOutputSchema,
  TechStackFormSchema,
} from '@snoomleng/utils';
import { revalidatePath } from 'next/cache';

export const handleEditTechStack = async (
  data: TechStackFormInputSchema,
  _id: string,
): Promise<ActionResponse<TechstackFormOutputSchema>> => {
  try {
    const result = TechStackFormSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        message: result.error.issues[0].message as string,
        field: result.error.issues[0].path.join(
          '.',
        ) as keyof TechStackFormInputSchema,
      };
    }

    const { name, slug, iconText, type } = result.data;

    await writeClient
      .patch(_id)
      .set({
        name,
        slug: {
          current: slug,
        },
        icon: iconText,
        type,
      })
      .commit();

    revalidatePath(`/technologies/${slug}`);

    return {
      success: true,
      message: 'Tech Stack Edited!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Somthing went wrong!',
    };
  }
};
