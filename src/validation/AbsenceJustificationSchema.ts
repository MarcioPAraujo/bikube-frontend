import * as yup from 'yup';

export type AbsenceJustificationSchemaType = yup.InferType<
  typeof AbsenceJustificationSchema
>;

export const AbsenceJustificationSchema = yup.object().shape({
  descricao: yup.string().required('A descrição é obrigatória'),
});
