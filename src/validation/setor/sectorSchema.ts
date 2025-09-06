import * as yup from 'yup';

export type SectorFormValues = yup.InferType<typeof sectorSchema>;

export const sectorSchema = yup.object().shape({
  nome: yup
    .string()
    .required('O nome do setor é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(50, 'O nome deve ter no máximo 50 caracteres'),
});
