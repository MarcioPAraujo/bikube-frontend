import { AxiosError, AxiosResponse } from 'axios';
import { Result } from '@/interfaces/apiResult';
import handleError from '@/utils/handleError';
import { api } from '../api';

export interface ISkillsListResponse {
  id: number;
  habilidade: string;
}

export const getSkills = async (): Promise<Result<ISkillsListResponse[]>> => {
  const ENDPOINT = '/habilidade';

  try {
    const response: AxiosResponse<ISkillsListResponse[]> = await api.get(
      ENDPOINT,
    );
    return { data: response.data, error: null };
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return { data: null, error: axiosError.response.data as string };
    }
    return { data: null, error: 'falha ao buscar habilidades' };
  }
};

export const createSkill = async (skill: string): Promise<Result<boolean>> => {
  const ENDPOINT = '/habilidade';

  const body = { habilidade: skill };

  try {
    await api.post(ENDPOINT, body);
    return { data: true, error: null };
  } catch (error: any) {
    return handleError(error, 'falha ao criar habilidade');
  }
};
