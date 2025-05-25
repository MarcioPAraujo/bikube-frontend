import { IEmployeeResponse } from "@/interfaces/funcionarios/getListOfEmployeesResponse";
import { api } from "../api";
import axios, { AxiosError, AxiosResponse } from "axios";

type Result<T> = { data: T; error: null } | { data: null; error: string };
export const getListOfEmployees = async (): Promise<Result<IEmployeeResponse[]>> => {
  const url = '/funcionario';
  try {
    const response: AxiosResponse<IEmployeeResponse[]> = await api.get(url);

    const data = response.data;
    return { data, error: null };

  } catch (error: any) {
     if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return {data: null, error: axiosError.response.data as string};
      }
    }
    return { data: null, error: "Erro ao buscar funcionários" };
  }

};
