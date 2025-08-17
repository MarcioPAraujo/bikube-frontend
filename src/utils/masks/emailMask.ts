/**
 * Email mask function to format email input.
 *
 * Allows all standard special characters in the local part,
 * ensures only one '@', and restricts domain to valid characters.
 * Converts the email to lowercase.
 */
export const emailMask = (value: string): string => {
  // Only allow one '@'
  const parts = value.split('@');
  let local = parts[0] || '';
  let domain = parts[1] || '';

  // Allow valid special characters in local part
  local = local.replace(/[^a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]/g, '');

  // Remove consecutive dots and dots at start/end in local part
  local = local.replace(/\.{2,}/g, '.');

  // Allow only valid domain characters
  domain = domain.replace(/[^a-zA-Z0-9.-]/g, '');

  // Remove consecutive dots and dots at start/end in domain part
  domain = domain.replace(/\.{2,}/g, '.');

  // Recombine, only if user typed '@'
  let masked = local;
  if (value.includes('@')) {
    masked += `@${domain}`;
  }

  return masked.toLowerCase();
};
