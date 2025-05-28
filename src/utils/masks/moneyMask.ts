const moneyMask = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, '');
  if (onlyNumbers === '') return '';
  const numberValue = parseFloat(onlyNumbers) / 100;
  return numberValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};
export default moneyMask;
