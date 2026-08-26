import { exceedsImageSize } from './formatter';
import { ALLOWED_IMAGE_TYPES, ImageResponse } from './types';

/**
 * Generate a random key for sanity
 * @returns string
 */
export const generateSanityKey = (): string => {
  return crypto.randomUUID().replace(/-/g, '');
};

/**
 * Validate Image File input in Form
 */
export const validateImage = (file?: File): ImageResponse => {
  if (!file) {
    return {
      success: false,
      message: 'Upload an Image',
    };
  }

  if (exceedsImageSize(file.size, 1)) {
    return {
      success: false,
      message: 'Image size cannot exceeds 1 MB',
    };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      success: false,
      message: 'Only accept image types',
    };
  }

  return {
    success: true,
    file,
  };
};
