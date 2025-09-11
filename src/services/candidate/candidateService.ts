import { Result } from '@/interfaces/apiResult';
import { ICandidateBodyRequest } from '@/interfaces/candidate/candidateBodyRequest';
import { decryptPassword } from '@/utils/encryptPassword';
import { AcademicDataSchemaType } from '@/validation/candidateRegister/AcademicData';
import { CredentialsSchemaType } from '@/validation/candidateRegister/CredentialSchema';
import { PersonalDataSchemaType } from '@/validation/candidateRegister/PersonalDataSchema';
import { ProfessionalSchemaType } from '@/validation/candidateRegister/ProfessionalExperience';
import { SkillsSchemaType } from '@/validation/candidateRegister/SkillSchema';
import { format, parse } from 'date-fns';
import { AxiosError, AxiosResponse } from 'axios';
import { ICandidateDetailsResponse } from '@/interfaces/candidate/cadidateDetailsResponse';
import handleError from '@/utils/handleError';
import { api } from '../api';

export interface ICreateCandidateRequest {
  step1: CredentialsSchemaType;
  step2: PersonalDataSchemaType;
  step3: AcademicDataSchemaType;
  step4: ProfessionalSchemaType;
  step5: SkillsSchemaType;
}

export const registerNewCandidate = async (
  steps: ICreateCandidateRequest,
): Promise<Result<boolean>> => {
  const ENDPOINT = '/candidato';

  const decryptedPassword = await decryptPassword(steps.step1.password);

  const body: ICandidateBodyRequest = {
    email: steps.step1.email,
    password: decryptedPassword,
    cidade: steps.step2.city,
    estado: steps.step2.state,
    nome: steps.step2.name,
    telefone: steps.step2.phoneNumber,
    linkedin: steps.step2.linkedin,
    github: steps.step2.github,
    experiencias: steps.step4.isFirstJob
      ? []
      : steps.step4.experiences.map(item => ({
          empresa: item.company,
          descricao: item.description,
          dataFim: format(
            parse(item.endDate, 'dd/MM/yyyy', new Date()),
            'yyyy-MM-dd',
          ),
          dataInicio: format(
            parse(item.startDate, 'dd/MM/yyyy', new Date()),
            'yyyy-MM-dd',
          ),
        })),
    formacaoAcademica: steps.step3.education
      ? steps.step3.education.map(item => {
          const start = parse(item.startDate, 'dd/MM/yyyy', new Date());
          const end = parse(item.endDate, 'dd/MM/yyyy', new Date());
          return {
            curso: item.course,
            dataFim: format(end, 'yyyy-MM-dd'),
            dataInicio: format(start, 'yyyy-MM-dd'),
            instituicao: item.instituition,
            situacao: start > end ? 'Cursando' : 'Concluído',
          };
        })
      : [],
    habilidades: steps.step5.skills.map(item => ({
      habilidade: item.competency,
      tempoExperiencia: Number(item.periodInMonths),
    })),
    idiomas: steps.step3.languages
      ? steps.step3.languages.map(item => ({
          idioma: item.language,
          nivel: Number(item.level),
        }))
      : [],
  };

  try {
    await api.post(ENDPOINT, body);
    return { data: true, error: null };
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return { data: null, error: axiosError.response.data as string };
    }
    return { data: null, error: 'falha ao cadastrar o perfil' };
  }
};

export const getCandidateById = async (
  id: number,
): Promise<Result<ICandidateDetailsResponse>> => {
  const ENDPOINT = `candidato/perfil/${id}`;

  try {
    const response: AxiosResponse<ICandidateDetailsResponse> = await api.get(
      ENDPOINT,
    );
    return { data: response.data, error: null };
  } catch (error: any) {
    return handleError(error, 'falha ao buscar o candidato');
  }
};

export const DeleteCandidateById = async (
  id: number,
): Promise<Result<boolean>> => {
  const ENDPOINT = `/candidato/${id}`;
  try {
    await api.delete(ENDPOINT);
    return { data: true, error: null };
  } catch (error: any) {
    return handleError(error, 'falha ao deletar o candidato');
  }
};
