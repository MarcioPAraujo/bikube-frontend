import { DDMMYYYY_REGEX } from '@/utils/regex/regexes';
import { parse } from 'date-fns';
import * as yup from 'yup';

export type AcademicDataSchemaType = yup.InferType<typeof AcademicDataSchema>;

export const AcademicDataSchema = yup.object().shape({
  languages: yup
    .array()
    .of(
      yup.object().shape({
        language: yup.string().required('Insira o nome do idioma'),
        level: yup.string().required('Informe o nível de domínio do idioma'),
      }),
    )
    .optional(),
  education: yup.array().of(
    yup.object().shape({
      instituition: yup.string().required('o nome da instituição é obrigatório'),
      course: yup.string().required('O nome do curos é obrigatório'),
      startDate: yup
        .string()
        .required('A data de início é obrigatória')
        .matches(DDMMYYYY_REGEX, 'Data inválida')
        .test('bigger-than-end-date', 'A data de iníco deve ser anterior a date de fim', function isGreatter(value) {
          const { endDate } = this.parent;
          if (!endDate || !value) return false;
          const start = parse(value, 'dd/MM/yyyy', new Date());
          const end = parse(endDate, 'dd/MM/yyyy', new Date());
          return start < end;
        }),
      endDate: yup
        .string()
        .required('A data de encerramento é obrigatória')
        .matches(DDMMYYYY_REGEX, 'Data inválida')
        .test(
          'smaller-than-start-date',
          'A data de fim deve ser posterior a date de início',
          function isGreatter(value) {
            const { startDate } = this.parent;
            if (!startDate || !value) return false;
            const start = parse(startDate, 'dd/MM/yyyy', new Date());
            const end = parse(value, 'dd/MM/yyyy', new Date());
            return start > end;
          },
        ),
    }),
  ),
});
