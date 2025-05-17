import * as yup from 'yup';

export type IResetPasswordSchema = yup.InferType<typeof ResetPasswordSchema>;

export const ResetPasswordSchema = yup.object().shape({
  email: yup.string().email('Insira um email válido').required('Insira o email informado na sua contratação'),
  newPassword: yup
    .string()
    .required('Nova senha é obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .max(16, 'Senha deve ter no máximo 16 caracteres')
    .test(
      'lowercase',
      'Senha deve conter ao menos uma letra minúscula',
      value => {
        return /[a-z]/.test(value);
      },
    )
    .test(
      'uppercase',
      'Senha deve conter ao menos uma letra maiúscula',
      value => {
        return /[A-Z]/.test(value);
      },
    )
    .test('number', 'Senha deve conter ao menos um número', value => {
      return /[0-9]/.test(value);
    })
    .test('nonSequential', 'Senha não pode ser sequencial', value => {
      return !/(012|123|234|345|456|567|678|789)/.test(value);
    })
    .test('nonRepeated', 'Senha não pode ter caracteres repetidos e sequência', value => {
      return !/(.)\1{2,}/.test(value);
    })
    .test(
      'special',
      'Senha deve conter ao menos um caractere especial',
      value => {
        return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value);
      },
    ),
  confirmPassword: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('newPassword')], 'Senhas não conferem'),
});
