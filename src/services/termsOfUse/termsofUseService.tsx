import axios, { AxiosError, AxiosResponse } from 'axios';
import { api } from '../api';

type Result<T> = { data: T; error: null } | { data: null; error: string };

export const termsOfUseService = async (
  email: string,
): Promise<Result<string>> => {
  const url = 'funcionario/aceitartermo';
  const body = {
    email,
  };

  try {
    const response: AxiosResponse<string> = await api.post(url, body);

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
