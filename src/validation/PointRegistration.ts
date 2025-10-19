import * as yup from 'yup';

export type PointRegistrationData = yup.InferType<
  typeof PointRegistrationSchema
>;

export const PointRegistrationSchema = yup.object().shape({
  entryA: yup.string().required('A entrada A é obrigatória'),
  exitA: yup.string().required('A saída A é obrigatória'),
  entryB: yup.string().required('A entrada B é obrigatória'),
  exitB: yup.string().required('A saída B é obrigatória'),
});
