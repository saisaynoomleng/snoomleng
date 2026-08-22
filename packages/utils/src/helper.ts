/**
 * Generate a random key for sanity
 * @returns string
 */
export const generateSanityKey = (): string => {
  return crypto.randomUUID().replace(/-/g, '');
};
