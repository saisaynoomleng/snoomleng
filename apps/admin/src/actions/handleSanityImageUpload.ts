'use server';

import { writeClient } from '@/sanity/writeClient';

export const handleSanityImageUpload = async (file: File): Promise<string> => {
  try {
    if (!file) {
      return 'Upload an image';
    }

    const assetId = await writeClient.assets.upload('image', file, {
      filename: file.name,
    });

    return assetId._id;
  } catch (error) {
    console.error(error);
    return 'Sanity Image upload fail';
  }
};
