import { AxiosError, AxiosResponse } from 'axios';
import { api } from '../api';
import { Result } from '@/interfaces/apiResult';

export interface ISkillsListResponse {
  id: number;
  habilidade: string;
}

export const getSkills = async (): Promise<Result<ISkillsListResponse[]>> => {
  const ENDPOINT = '/habilidade';

  try {
    const response: AxiosResponse<ISkillsListResponse[]> = await api.get(ENDPOINT);
    return { data: response.data, error: null };
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return { data: null, error: axiosError.response.data as string };
    }
    return { data: null, error: 'falha ao buscar habilidades' };
  }
};
