const mobileMask = (value: string) => {
  let digits = value.replace(/\D/g, '');
  if (digits.length > 2) {
    digits = digits.replace(/^(\d{2})\d/, '$19');
  }

  return digits
    .replace(/^(\d{2})(\d)/, '($1) $2') // Area code with parentheses
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
};
export default mobileMask;
