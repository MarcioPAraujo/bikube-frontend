import { Result } from '@/interfaces/apiResult';
import { IVacancyBodyRequest } from '@/interfaces/vacancy/vacancyBodyRequest';
import handleError from '@/utils/handleError';
import { IVacancyListResponse } from '@/interfaces/vacancy/vacancyListResponse';
import { AxiosResponse } from 'axios';
import { IAppliedVacanciesListResponse } from '@/interfaces/vacancy/appliedVacanciesListResponse';
import { ITopApplicantsListResponse } from '@/interfaces/vacancy/topApplicantListResponse';
import { IAmountOfApplicantByStepResponse } from '@/interfaces/vacancy/amountOfApplicantsByStepResponse';
import { IVacancyApplicantsByStepResponse } from '@/interfaces/vacancy/vacancyApplicantsByStepResponse';
import { ICandidateDetailsResponse } from '@/interfaces/candidate/cadidateDetailsResponse';
import { api } from '../api';
import { getCandidateById } from '../candidate/candidateService';

interface ApplyVacancyBody {
  idcandidato: number;
  idvaga: number;
}

interface GiveUpVacancyBody {
  candidatoid: number;
  vagaid: number;
}

interface IApplicantsByStepRequestParams {
  idvaga: number;
  etapa: string; // TRIAGEM, ENTREVISTA, OFERTA, DESISTENCIA, FINALIZADO
}

export const createNewVancancy = async (
  body: IVacancyBodyRequest,
): Promise<Result<boolean>> => {
  const ENDPOINT = '/vaga';

  try {
    await api.post(ENDPOINT, body);
    return { data: true, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao criar nova vaga');
  }
};

export const getAllVacancies = async (): Promise<
  Result<IVacancyListResponse[]>
> => {
  const ENDPOINT = '/vaga';

  try {
    const response: AxiosResponse<IVacancyListResponse[]> = await api.get(
      ENDPOINT,
    );

    return { data: response.data, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao buscar vagas');
  }
};

export const applyToVacancy = async (
  body: ApplyVacancyBody,
): Promise<Result<boolean>> => {
  const ENDPOINT = '/vaga/candidatura';

  try {
    await api.post(ENDPOINT, body);
    return { data: true, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao candidatar-se à vaga');
  }
};

export const giveUpVacancy = async (
  body: GiveUpVacancyBody,
): Promise<Result<boolean>> => {
  const ENDPOINT = '/vaga/desistencia';

  try {
    await api.post(ENDPOINT, body);
    return { data: true, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao desistir da vaga');
  }
};

export const getAppliedVacancies = async (
  candidateId: number,
): Promise<Result<IAppliedVacanciesListResponse[]>> => {
  const ENDPOINT = `/candidato/buscarCandidaturas/${candidateId}`;

  try {
    const response: AxiosResponse<IAppliedVacanciesListResponse[]> =
      await api.get(ENDPOINT);
    // TODO: filter active vacancies only
    return { data: response.data, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao buscar vagas candidatas');
  }
};

export const getApplicantThatMatchWithSkills = async (
  vacancyId: number,
): Promise<Result<string>> => {
  const ENDPOINT = `/vaga/teste/${vacancyId}`;

  try {
    const response: AxiosResponse<string> = await api.get(ENDPOINT);
    const percentage = response.data.replace(/[^\d]/g, '');
    return { data: percentage, error: null };
  } catch (error) {
    return handleError(
      error,
      'Erro ao buscar candidatos que combinam com as habilidades',
    );
  }
};
export const getTopApplicantsForVacancy = async (
  vacancyId: number,
): Promise<Result<ITopApplicantsListResponse[]>> => {
  const ENDPOINT = `/vaga/melhores/${vacancyId}`;

  try {
    const response: AxiosResponse<ITopApplicantsListResponse[]> = await api.get(
      ENDPOINT,
    );
    return { data: response.data, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao buscar os melhores candidatos');
  }
};
export const getAmountOfApplicantsByStep = async (
  vacancyId: number,
): Promise<Result<IAmountOfApplicantByStepResponse>> => {
  const ENDPOINT = `/vaga/etapas/${vacancyId}`;

  try {
    const response: AxiosResponse<IAmountOfApplicantByStepResponse> =
      await api.get(ENDPOINT);
    return { data: response.data, error: null };
  } catch (error) {
    return handleError(
      error,
      'Erro ao buscar a quantidade de candidatos por etapa',
    );
  }
};
export const getVacancyApplicants = async (
  params: IApplicantsByStepRequestParams,
): Promise<Result<IVacancyApplicantsByStepResponse[]>> => {
  const ENDPOINT = '/vaga/listarPorUmaEtapa';

  try {
    const response: AxiosResponse<IVacancyApplicantsByStepResponse[]> =
      await api.get(ENDPOINT, { params });
    return { data: response.data, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao buscar candidatos por etapa');
  }
};

export const getCandidateDetailsInVacancy = async (
  candidateId: number,
  vacancyId: number,
  step: string,
): Promise<
  Result<{ profile: ICandidateDetailsResponse; matchPercentage: number }>
> => {
  // Fetch candidate profile
  const candidateProfile = await getCandidateById(candidateId);
  if (!candidateProfile.data) {
    return { data: null, error: candidateProfile.error };
  }

  const vacancyApplicants = await getVacancyApplicants({
    idvaga: vacancyId,
    etapa: step,
  });

  if (!vacancyApplicants.data) {
    return { data: null, error: vacancyApplicants.error };
  }

  // Find the candidate in the list of applicants for the vacancy
  const candidateInVacancy = vacancyApplicants.data.find(
    item => item.candidato.id === candidateId,
  );

  // If the candidate is not found in the vacancy applicants
  if (!candidateInVacancy) {
    return { data: null, error: 'Candidato não encontrado na vaga' };
  }

  // Return both candidate profile and match percentage
  return {
    data: {
      profile: candidateProfile.data,
      matchPercentage: candidateInVacancy.compatibilidadeEmPorcentagem,
    },
    error: null,
  };
};

export const advanceCadidateToNextStep = async (
  vacancyId: number,
  candidateId: number,
): Promise<Result<boolean>> => {
  const ENDPOINT = '/vaga/avancarEtapa';

  const body = { vagaid: vacancyId, candidatoid: candidateId };

  try {
    await api.post(ENDPOINT, body);
    return { data: true, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao avançar candidato para a próxima etapa');
  }
};

export const closeVacancy = async (
  vacancyId: number,
): Promise<Result<boolean>> => {
  const ENDPOINT = '/vaga/finalizarVaga';

  const body = { vagaid: vacancyId };

  try {
    await api.post(ENDPOINT, body);
    return { data: true, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao encerrar a vaga');
  }
};
