import * as yup from 'yup';

export type IApplyLeaveSickSchema = yup.InferType<typeof ApplyLeaveSickSchema>;

export const ApplyLeaveSickSchema = yup.object().shape({
  days: yup
    .string()
    .required('Informe o número de dias de atestado')
    .matches(/^[0-9]+$/, 'Deve ser um número válido')
    .test({
      name: 'minDays',
      message: 'Deve vender no mínimo 1 dia',
      test: function minDaysToSell(value) {
        if (!value) return false;
        return parseInt(value, 10) >= 1;
      },
    }),
});
