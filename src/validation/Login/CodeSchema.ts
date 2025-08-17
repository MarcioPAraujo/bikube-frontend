import { ONLY_NUMBERS } from '@/utils/regex/regexes';
import * as yup from 'yup';

export type CodeSchemaType = yup.InferType<typeof CodeSchema>;

export const CodeSchema = yup.object().shape({
  code: yup
    .string()
    .required('O código é obrigatório')
    .matches(ONLY_NUMBERS, 'O código deve conter apenas números')
    .min(4, 'O código deve conter 4 dígitos')
    .max(4, 'O código deve conter 4 dígitos'),
});
