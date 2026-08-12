/**
 * Return a string with all first letter capitalized
 * @param title string
 * @returns string
 */
export const formatTitle = (title: string): string => {
  return title
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Return the Date in locale format
 * @param date Date | string
 * @returns string
 */
export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Slugify any string into sanity slug
 * @param name string
 * @returns string
 */
export const nameToSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 200);
};

/**
 * Return year from a date
 * @param date Date | string
 * @returns number
 */
export const formatYear = (date: Date | string): number => {
  return new Date(date).getFullYear();
};

/**
 * Replace any dash(es) with a white space
 * @param input string
 * @returns string
 */
export const replaceDashWithSpace = (input: string): string => {
  return input.replace(/-+/g, ' ');
};

/**
 * Remove any dash(es) and join the string
 * @param input string
 * @returns string
 */
export const replaceDashWithNoSpace = (input: string): string => {
  return input.replace(/-+/g, '');
};

/**
 * Calculate the uploaded file size
 * @param size number
 * @param maxSize number
 * @returns string | boolean
 */
export const maximumImageSize = (
  size: number,
  maxSize: number,
): string | boolean => {
  if (size > maxSize * 1024 * 1024) {
    return `File size cannot exceeds ${maxSize}MB`;
  }

  return true;
};
