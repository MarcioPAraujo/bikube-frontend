import * as yup from 'yup';

export type ISellVacationSchema = yup.InferType<typeof sellVacationSchema>;

export const sellVacationSchema = yup.object().shape({
  daysToSell: yup
    .string()
    .required('Informe o número de dias a vender')
    .matches(/^[0-9]+$/, 'Deve ser um número válido')
    .test({
      name: 'maxDays',
      message: 'Não é possível vender mais dias do que o saldo disponível',
      test: function maxDaysToSell(value) {
        const maxDays = 10;
        if (!value || !maxDays) return false;
        return parseInt(value, 10) <= maxDays;
      },
    })
    .test({
      name: 'minDays',
      message: 'Deve vender no mínimo 1 dia',
      test: function minDaysToSell(value) {
        if (!value) return false;
        return parseInt(value, 10) >= 1;
      },
    }),
});
