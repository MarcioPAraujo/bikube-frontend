import { Result } from '@/interfaces/apiResult';
import { IVacancyBodyRequest } from '@/interfaces/vacancy/vacancyBodyRequest';
import handleError from '@/utils/handleError';
import { IVacancyListResponse } from '@/interfaces/vacancy/vacancyListResponse';
import { AxiosResponse } from 'axios';
import { IAppliedVacanciesListResponse } from '@/interfaces/vacancy/appliedVacanciesListResponse';
import { api } from '../api';

interface ApplyVacancyBody {
  idcandidato: number;
  idvaga: number;
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
  body: ApplyVacancyBody,
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
    return { data: response.data, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao buscar vagas candidatas');
  }
};
