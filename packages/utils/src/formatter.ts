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
