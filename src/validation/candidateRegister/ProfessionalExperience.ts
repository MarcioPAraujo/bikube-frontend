import { DDMMYYYY_REGEX } from '@/utils/regex/regexes';
import { parse } from 'date-fns';
import * as yup from 'yup';

export type ProfessionalSchemaType = yup.InferType<typeof ProfessionalSchema>;

export const ProfessionalSchema = yup.object().shape({
  isFirstJob: yup.boolean().default(false),
  experiences: yup
    .array()
    .of(
      yup.object().shape({
        company: yup.string().required('O nome da empresa é obrigatório'),
        description: yup
          .string()
          .required('Insira uma descrição das atividades realizadas')
          .length(500, 'O máximo de caracteres permitido são 500'),
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
          .required('A data final é obrigatória')
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
    )
    .required('Ao menos uma experiência deve ser incluída')
    .max(3, 'O máximo de experiências permitidas são 3'),
});
