import * as yup from 'yup';

export const languageSchema = yup.object().shape({
  idioma: yup.string().required('O nome do idioma é obrigatório'),
});

export type LanguageFormData = yup.InferType<typeof languageSchema>;
