import * as yup from 'yup';

export const SkillSchema = yup.object().shape({
  nome: yup.string().required('O nome da habilidade é obrigatório'),
});

export type SkillFormData = yup.InferType<typeof SkillSchema>;
