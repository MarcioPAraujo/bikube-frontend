import { MOBILE_REGEX } from '@/utils/regex/regexes';
import * as yup from 'yup';

export type PersonalDataSchemaType = yup.InferType<typeof PersonalDataSchema>;

export const PersonalDataSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatóro'),
  state: yup.string().required('O estado é obrigatório'),
  city: yup.string().required('A cidade é obrigatória'),
  phoneNumber: yup
    .string()
    .required('O número de telefone é obrigatório')
    .matches(MOBILE_REGEX, 'Número inválido')
    .test('repeated', 'Número inválido', value => {
      if (!value) return false;
      const numeric = value.replace(/\D/g, '');
      return !/(.)\1{4}/g.test(numeric);
    }),
  linkedin: yup
    .string()
    .required('O link do perfil do linkedin é obrigatório')
    .matches(
      /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/,
      'Link do LinkedIn inválido',
    ),
  github: yup
    .string()
    .required('o link do perfil do github é obrigatório')
    .matches(
      /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/,
      'Link do GitHub inválido',
    ),
});
