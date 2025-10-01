import * as yup from 'yup';

export type NewVacancySchemaType = yup.InferType<typeof NewVacancySchema>;

export const NewVacancySchema = yup.object().shape({
  title: yup.string().required('Titulo é obrigatório'),
  workModel: yup.string().required('Modelo de trabalho é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
  contractType: yup
    .object()
    .shape({
      label: yup.string().required('Tipo de contrato é obrigatório'),
      value: yup.string().required('Tipo de contrato é obrigatório'),
    })
    .required('Tipo de contrato é obrigatório'),
  state: yup
    .object()
    .shape({
      label: yup.string().required('Estado é obrigatório'),
      value: yup.string().required('Estado é obrigatório'),
    })
    .required('Estado é obrigatório'),
  city: yup
    .object()
    .shape({
      label: yup.string().required('Cidade é obrigatória'),
      value: yup.string().required('Cidade é obrigatória'),
    })
    .required('Cidade é obrigatória'),
  aditionalInfo: yup.string().notRequired(),
  keyWords: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Pelo menos uma palavra-chave é obrigatória')
    .required('Palavras-chave são obrigatórias'),
  level: yup
    .object()
    .shape({
      label: yup.string().required('Nível é obrigatório'),
      value: yup.string().required('Nível é obrigatório'),
    })
    .required('Nível é obrigatório'),
  skills: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().required('Habilidade é obrigatória'),
        value: yup.string().required('Habilidade é obrigatória'),
      }),
    )
    .min(1, 'Pelo menos uma habilidade é obrigatória')
    .required('Habilidades são obrigatórias'),
});
