import axios, { AxiosError, AxiosResponse } from 'axios';
import handleError from '@/utils/handleError';
import { Result } from '@/interfaces/apiResult';
import { api } from '../api';

export const termsOfUseService = async (
  idfuncionario: string,
): Promise<Result<string>> => {
  const url = '/funcionario/aceitartermo';
  const body = {
    idfuncionario,
  };

  try {
    const response: AxiosResponse<string> = await api.put(url, body);

    const { data } = response;
    return { data, error: null };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { data: null, error: axiosError.response.data as string };
      }
    }
    return { data: null, error: 'Erro ao aceitar termos de uso' };
  }
};

export const candidateAcceptTerms = async (
  id: number,
): Promise<Result<boolean>> => {
  const ENDPOINT = `candidato/aceitartermo/${id}`;

  try {
    await api.post(ENDPOINT);
    return { data: true, error: null };
  } catch (error: any) {
    return handleError(error, 'Erro ao aceitar termos de uso');
  }
};
