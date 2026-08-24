'use server';

import { writeClient } from '@/sanity/writeClient';
import { revalidatePath } from 'next/cache';

export const hanldeRemoveDocument = async (_id: string, path = '/') => {
  try {
    await writeClient.delete(_id);
    revalidatePath(path);

    return {
      success: true,
      message: 'Successful deletion',
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};
