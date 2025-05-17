import axios, { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";

interface IResetpasswordBody {
  email: string;
  senha: string;
}

type Result<T> = {data: T; error: null} | {data: null; error: string};

export const resetPassword = async (body: IResetpasswordBody): Promise<Result<string>> => {
  const url = 'usuario/novasenha';

  try {

    const response: AxiosResponse<string> = await api.put(url, body);
    const data = response.data;
    return { data, error: null };

  } catch (error: any) {

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        return { data: null, error: axiosError.response.data as string };
      }
    }
    return { data: null, error: 'Falha ao redefinir a senha' };
  }
};
