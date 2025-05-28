const cpfMask = (value: string) => {
  return value
    .replace(/[^0-9.-]/g, '') // Remove any character that is not a number or dot
    .replace(/\D/g, '') // Remove any non-digit character
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .slice(0, 14); // Limit to 14 characters (11 digits + 2 dots + 1 dash)

};
export default cpfMask;
