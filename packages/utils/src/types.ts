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
    }
  | { success: false; message: string; field?: keyof T };

/**
 * Validate Image upload response type
 */
export type ImageResponse =
  { success: true; file: File } | { success: false; message: string };
