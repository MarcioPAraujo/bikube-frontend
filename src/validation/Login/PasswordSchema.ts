import * as yup from 'yup';

export type IPasswordSchema = yup.InferType<typeof PasswordSchema>;

export const PasswordSchema = yup.object().shape({
  password: yup.string().required('A senha é obrigatória'),
});
