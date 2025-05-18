import { LOCAL_STORAGE_KEYS } from "@/utils/localStorageKeys";
import { api } from "../api";
import axios, { AxiosError, isAxiosError } from "axios";

type Result = {successFul: boolean; error: null} | {successFul: boolean; error: string};

export const sendCode = async (): Promise<Result> => {
  const url = '/codigosenha'

  const body = {
    email: localStorage.getItem(LOCAL_STORAGE_KEYS.email),
  }

  try {

    const response = await api.post(url, body);

    console.log(response);

    return { successFul: true, error: null };

  } catch(error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { successFul: false, error: axiosError.response.data as string };
      }
    }
    return { successFul: false, error: "falha ao enviar o codigo de verificação de email" };
  }
};
