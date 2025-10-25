import { Result } from '@/interfaces/apiResult';
import { AxiosResponse } from 'axios';
import handleError from '@/utils/handleError';
import { api } from './api';

export const getCurrentTimestamp = async (): Promise<Result<string>> => {
  const ENDPOINT = '/espelho/data';

  try {
    const response: AxiosResponse<string> = await api.get(ENDPOINT);
    return { data: response.data, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao obter a hora atual.');
  }
};
