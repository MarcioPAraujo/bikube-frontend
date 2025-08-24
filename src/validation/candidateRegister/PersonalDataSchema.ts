import { DDMMYYYY_REGEX, MOBILE_REGEX } from '@/utils/regex/regexes';
import { differenceInYears, isValid, parse } from 'date-fns';
import * as yup from 'yup';

export type PersonalDataSchemaType = yup.InferType<typeof PersonalDataSchema>;

export const PersonalDataSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatóro'),
  birthday: yup
    .string()
    .required('A data de nascimetno é obrigatória')
    .matches(DDMMYYYY_REGEX, 'Deve estar no formato dd/mm/aaaa')
    .test('invalid-date', 'Data inválida', value => {
      if (!value) return false;
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
      const today = new Date();

      if (!isValid(parsedDate)) {
        return false;
      }

      return parsedDate < today;
    })
    .test('younger', 'A idade minima e 18 anos', value => {
      if (!value) return false;
      const today = new Date();
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
      const years = differenceInYears(today, parsedDate);
      return years >= 18;
    })
    .test('max-age', 'A idade máxima é de 120', value => {
      if (!value) return false;
      const today = new Date();
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
      const years = differenceInYears(today, parsedDate);
      return years <= 120;
    }),
  state: yup.string().required('O estado é obrigatório'),
  city: yup.string().required('A cidade é obrigatória'),
  phoneNumber: yup
    .string()
    .required('O número de telefone é obrigatório')
    .matches(MOBILE_REGEX, 'Número inválido')
    .test('repeated', 'Númeor inválido', value => {
      if (!value) return false;
      const numeric = value.replace(/\D/g, '');
      return !/(.)\1{4}/g.test(numeric);
    }),
  linkedin: yup
    .string()
    .required('O link do perfil do linkedin é obrigatório')
    .matches(/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/, 'Link do LinkedIn inválido'),
  github: yup
    .string()
    .required('o link do perfil do github é obrigatório')
    .matches(/^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/, 'Link do GitHub inválido'),
});
