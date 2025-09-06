import { EMAIL_REGEX } from '@/utils/regex/regexes';
import * as yup from 'yup';

export type CredentialsSchemaType = yup.InferType<typeof CredentialsSchema>;

export const CredentialsSchema = yup.object().shape({
  email: yup
    .string()
    .required('O email é obrigatório')
    .email('Email inválido')
    .matches(EMAIL_REGEX, 'Email inválido'),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .min(8, 'A senha deve ter ao menos 8 caracteres')
    .test(
      'has-uppercase',
      'Deve conter ao menos uma letra maiúscula',
      value => {
        if (!value) return false;
        return /[A-Z]/g.test(value);
      },
    )
    .test(
      'has-lowercase',
      'Deve conter ao menos uma letra minúscula',
      value => {
        if (!value) return false;
        return /[a-z]/g.test(value);
      },
    )
    .test('has-number', 'Deve conter ao menos um número', value => {
      if (!value) return false;
      return /[0-9]/g.test(value);
    })
    .test(
      'has-special-character',
      'Deve conter ao menos um carater especial',
      value => {
        if (!value) return false;
        return /\W|_/g.test(value);
      },
    ),
  confirmPassword: yup
    .string()
    .required('Campo obrigatório')
    .oneOf([yup.ref('password')], 'As senhas estão diferentes'),
});
