/**
 *
 * @param value code verification received on email
 * @returns return a string containing only numbers with max length of 4
 * @example
 * codeMark('sd1234567');
 * // returns 1234
 */
const codeMask = (value: string) => {
  return value.replace(/\D/g, '').slice(0, 4);
};
export default codeMask;
