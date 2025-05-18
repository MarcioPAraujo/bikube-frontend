import axios, { AxiosError } from "axios";
import { api } from "../api";
import { LOCAL_STORAGE_KEYS } from "@/utils/localStorageKeys";

type Result = { isValid: boolean, error: null } | { isValid: boolean, error: string };

export const validateCode = async (code: string): Promise<Result> => {
  const url = 'codigosenha/validar';

  try {

    const body = {
      codigo: code,
      email: localStorage.getItem(LOCAL_STORAGE_KEYS.email),
    };

    console.log(body);

    const response = await api.post(url, body);

    console.log(response);

    return { isValid: true, error: null };

  } catch(error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        return { isValid: false, error: axiosError.response.data as string };
      }
    }

    return { isValid: false, error: "falha ao validar o código" };
  }
};
