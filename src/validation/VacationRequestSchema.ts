import * as yup from 'yup';

export type VacationRequestData = yup.InferType<typeof VacationRequestSchema>;

export const VacationRequestSchema = yup.object().shape({
  startDate: yup.string().required('Data de início é obrigatória'),
  endDate: yup.string().required('Data de fim é obrigatória'),
});
