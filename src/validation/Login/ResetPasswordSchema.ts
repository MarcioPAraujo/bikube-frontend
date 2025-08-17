import * as yup from 'yup';

export type ResetPasswordSchemaType = yup.InferType<typeof ResetPasswordSchema>;

export const ResetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('Nova senha é obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .max(16, 'Senha deve ter no máximo 16 caracteres')
    .test('lowercase', 'A senha deve ter ao menos uma letra minúscula', value => {
      return /[a-z]/.test(value);
    })
    .test('uppercase', 'A senha deve ter ao menos uma letra maiúscula', value => {
      return /[A-Z]/.test(value);
    })
    .test('number', 'A senha deve ter ao menos um número', value => {
      return /[0-9]/.test(value);
    })
    .test('nonSequential', 'A senha não pode ter números sequenciais', value => {
      return !/(012|123|234|345|456|567|678|789)/.test(value);
    })
    .test('nonRepeated', 'Não deve haver caracteres repetidos em sequência', value => {
      return !/(.)\1{2,}/.test(value);
    })
    .test('special', 'A senha deve conter ao menos um caractere especial', value => {
      return /\W|_/.test(value);
    }),
  confirmPassword: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('newPassword')], 'Senhas não conferem'),
});
