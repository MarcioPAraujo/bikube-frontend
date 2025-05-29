import * as yup from 'yup';

export type ITermsOfUseSchema = yup.InferType<typeof TermsOfUseSchema>;
export const TermsOfUseSchema = yup.object().shape({
  email: yup
    .string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
});
