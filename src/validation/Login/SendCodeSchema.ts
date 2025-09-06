import { EMAIL_REGEX } from '@/utils/regex/regexes';
import * as yup from 'yup';

export type SendCodeSchemaType = yup.InferType<typeof SendCodeSchema>;

export const SendCodeSchema = yup.object().shape({
  email: yup
    .string()
    .email('E-mail inválido')
    .required('Campo obrigatório')
    .matches(EMAIL_REGEX, 'E-mail inválido'),
});
