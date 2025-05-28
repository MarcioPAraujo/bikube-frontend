const mobileMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '($1) $2') // Area code with parentheses
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
};
export default mobileMask;
