import axios, { AxiosError } from 'axios';
import { api } from '../api';

type Result =
  | { successFul: boolean; error: null }
  | { successFul: boolean; error: string };

export const sendCode = async (email: string): Promise<Result> => {
  const url = '/codigosenha';

  const body = {
    email,
  };

  try {
    const response = await api.post(url, body);

    console.log(response);

    return { successFul: true, error: null };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { successFul: false, error: axiosError.response.data as string };
      }
    }
    return {
      successFul: false,
      error: 'falha ao enviar o codigo de verificação de email',
    };
  }
};
