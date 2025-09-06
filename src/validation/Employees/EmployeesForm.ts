import {
  CPF_REGEX,
  DDMMYYYY_REGEX,
  EMAIL_REGEX,
  MOBILE_REGEX,
  ONLY_NUMBERS,
  ZIP_CODE_REGEX,
} from '@/utils/regex/regexes';
import * as yup from 'yup';

export type EmployeesFormValues = yup.InferType<typeof EmployeesFormSchema>;

export const EmployeesFormSchema = yup.object().shape({
  nome: yup
    .string()
    .required('O nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  funcao: yup
    .string()
    .required('A função é obrigatória')
    .min(3, 'A função deve ter pelo menos 3 caracteres'),
  data_nascimento: yup
    .string()
    .required('A data de nascimento é obrigatória')
    .matches(
      DDMMYYYY_REGEX,
      'A data de nascimento deve estar no formato DD/MM/AAAA',
    ),
  cpf: yup
    .string()
    .required('O CPF é obrigatório')
    .matches(CPF_REGEX, 'O CPF deve estar no formato XXX.XXX.XXX-XX'),
  email: yup
    .string()
    .email('O e-mail deve ser válido')
    .required('O e-mail é obrigatório')
    .matches(EMAIL_REGEX, 'O e-mail deve estar com o formato correto'),
  cargo: yup.string().required('O cargo é obrigatório'),
  telefone: yup
    .string()
    .required('O telefone é obrigatório')
    .matches(MOBILE_REGEX, 'O telefone deve estar no formato (XX) XXXXX-XXXX'),
  salario: yup
    .string()
    .required('O salário é obrigatório')
    .test('biggerThanZero', 'O salário deve ser maior que zero', value => {
      const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
      return !isNaN(numericValue) && numericValue > 0;
    }),
  contabancaria: yup
    .string()
    .required('A conta bancária é obrigatória')
    .matches(ONLY_NUMBERS, 'A conta bancária deve conter apenas números'),
  dataentrada: yup
    .string()
    .required('A data de admissão é obrigatória')
    .matches(
      DDMMYYYY_REGEX,
      'A data de admissão deve estar no formato DD/MM/AAAA',
    ),
  cep: yup
    .string()
    .required('O CEP é obrigatório')
    .matches(ZIP_CODE_REGEX, 'O CEP deve estar no formato XXXXX-XXX'),
  estado: yup.string().required('O estado é obrigatório'),
  cidade: yup.string().required('A cidade é obrigatória'),
  logradouro: yup.string().required('Informe o logradouro'),
  bairro: yup.string().required('O bairro é obrigatório'),
  numero: yup.string().required('O número é obrigatório'),
  complemento: yup.string().optional(),
  numerosetor: yup
    .string()
    .required('O número do setor é obrigatório')
    .matches(/^\d+$/, 'O número do setor deve conter apenas números'),
});
