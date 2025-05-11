import { LOCAL_STORAGE_KEYS } from "@/utils/localStorageKeys";
import { api } from "../api";
import axios, { AxiosError, AxiosResponse } from "axios";

interface ILoginBody {
  registro: string;
  senha: string;
}

type Result<T> = {data: T; error: null} | {data: null; error: string};


export const loginAuth = async (body: ILoginBody): Promise<Result<string>> => {
  const url = '/auth/login';
  try {
    const response: AxiosResponse<string> = await api.post(url, body);

    const token = response.data;
    localStorage.setItem(LOCAL_STORAGE_KEYS.token, token);
    return { data: token, error: null };

  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return {data: null, error: axiosError.response.data as string};
      }
    }
    return {data: null, error: "Erro ao fazer login"};
  }
};
