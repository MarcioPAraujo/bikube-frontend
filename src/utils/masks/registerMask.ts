/**
 * Applies a custom mask to a employee's register.
 *
 * - Keeps only letters in the first 6 characters.
 * - Keeps only numbers in the last 2 characters.
 * - Limits the result to 8 characters.
 *
 * @param {string} value - The input string to be masked.
 * @returns {string} The masked string in uppercase.
 *
 */
export const registerMask = (value: string) => {
  console.log('Original value:', value);
  return value
    .replace(/[^a-zA-Z]/g, (match, offset) => (offset < 6 ? '' : match))
    .replace(/[^0-9]/g, (match, offset) => (offset < 6 ? match : ''))
    .slice(0, 8)
    .toLocaleUpperCase();
};
