const cnpjMask = (value: string) => {
  return value
    .replace(/[^0-9.-]/g, '') // Remove any character that is not a number or dot
    .replace(/\D/g, '') // Remove any non-digit character
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 18);
};
export default cnpjMask;
