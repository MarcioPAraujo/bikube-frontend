import { ONLY_NUMBERS } from '@/utils/regex/regexes';
import * as yup from 'yup';

export type SkillsSchemaType = yup.InferType<typeof SkillsSchema>;

export const SkillsSchema = yup.object().shape({
  skills: yup
    .array()
    .of(
      yup.object().shape({
        competency: yup.string().required('Insira o nome da competência'),
        periodInMonths: yup
          .string()
          .required('Insira o número de meses')
          .matches(ONLY_NUMBERS, 'Insira apenas números'),
      }),
    )
    .required('Defina ao meno uma habilidade')
    .max(10, 'O limite de habilidades é 10'),
});
