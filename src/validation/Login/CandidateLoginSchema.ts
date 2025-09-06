import { EMAIL_REGEX } from '@/utils/regex/regexes';
import * as yup from 'yup';

export type CandidateLoginSchemaType = yup.InferType<
  typeof CandidateLoginSchema
>;

export const CandidateLoginSchema = yup.object().shape({
  password: yup.string().required('A senha é obrigatória'),
  email: yup
    .string()
    .required('O email é obrigatório')
    .matches(EMAIL_REGEX, 'Email inválido'),
});
