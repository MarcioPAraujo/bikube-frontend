import { regexes } from '@/utils/regex/regexes';
import * as yup from 'yup';

export type ICodeSchema = yup.InferType<typeof CodeSchema>;

export const CodeSchema = yup.object().shape({
  code: yup
    .string()
    .required('O código é obrigatório')
    .matches(regexes.onlyNumbers, 'O código deve conter apenas números')
    .min(4, 'O código deve conter 4 dígitos')
    .max(4, 'O código deve conter 4 dígitos'),
});
