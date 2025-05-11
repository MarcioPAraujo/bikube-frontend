import * as yup from 'yup';

export type ILoginSchema = yup.InferType<typeof LoginSchema>;

export const LoginSchema = yup.object().shape({
  register: yup.string().required('O registro é obrigatório').matches(
    /^[A-Z]{6}\d{2}$/,
    'Formato inválido. Ex: AAAAAA01'),
  password: yup.string().required('A senha é obrigatória'),
});
