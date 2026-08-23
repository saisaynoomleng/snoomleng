'use server';

import {
  ActionResponse,
  TechStackFormInputSchema,
  TechstackFormOutputSchema,
  TechStackFormSchema,
} from '@snoomleng/utils';
import { writeClient } from '@/sanity/writeClient';
import { revalidatePath } from 'next/cache';

export const handleCreateTechStack = async (
  data: TechstackFormOutputSchema,
): Promise<ActionResponse<TechstackFormOutputSchema>> => {
  try {
    const result = TechStackFormSchema.safeParse(data);

    if (!result.success) {
      const err = result.error.issues[0];
      return {
        success: false,
        message: err.message,
        field: err.path.join('.') as keyof TechStackFormInputSchema,
      };
    }

    const { name, slug, iconText, type } = result.data;

    const id = crypto.randomUUID();

    await writeClient.createIfNotExists({
      _id: id,
      _type: 'technology',
      name,
      slug: {
        current: slug,
      },
      icon: iconText,
      type,
    });

    revalidatePath('/technologies');

    return {
      success: true,
      message: 'Added new Technology!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong! Try again later!',
    };
  }
};
