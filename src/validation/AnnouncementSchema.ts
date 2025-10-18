import * as yup from 'yup';

export type AnnouncementFormData = yup.InferType<typeof AnnouncementSchema>;

export const AnnouncementSchema = yup.object().shape({
  type: yup
    .string()
    .required('O tipo de comunicado é obrigatório.')
    .oneOf(['todos', 'setores', 'direcionado'], 'Tipo de comunicado inválido.'),
  title: yup.string().required('O assunto do comunicado é obrigatório.'),
  content: yup.string().required('O conteúdo do comunicado é obrigatório.'),
  sectors: yup
    .array()
    .of(yup.string())
    .min(1, 'Selecione pelo menos um setor para o comunicado.')
    .when('type', {
      is: (type: string) => type === 'setores',
      then: schema =>
        schema.required('Selecione pelo menos um setor para o comunicado.'),
      otherwise: schema => schema.notRequired(),
    }),
  directedEmployees: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .when('type', {
      is: (type: string) => type !== 'direcionado',
      then: schema => schema.nullable().notRequired(),
      otherwise: schema =>
        schema.required('Selecione um funcionário para o comunicado.'),
    }),
});
