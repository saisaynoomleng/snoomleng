/**
 * Image input data shape
 */
export type Media = {
  src: string;
  alt: string;
};

/**
 * Call to Action Data shape
 */
export type CallToAction = {
  label: string;
  href: string;
};

/**
 * Return Form data shape
 */
export type ActionResponse<T> =
  | {
      success: true;
      message: string;
      data?: T;
    }
  | { success: false; message: string; field?: keyof T };

/**
 * Validate Image upload response type
 */
export type ImageResponse =
  { success: true; file: File } | { success: false; message: string };

/**
 * Slug Params
 */
export type SlugParamsProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Allowed image types for input image field
 */
export const ALLOWED_IMAGE_TYPES = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg',
  'image/avif',
  'image/gif',
];
