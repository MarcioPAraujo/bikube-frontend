import { Result } from '@/interfaces/apiResult';
import handleError from '@/utils/handleError';
import { IPendingVacationsListResponse } from '@/interfaces/vacation/pendingVacationListResponse';
import { IEmployeeVacationsListResponse } from '@/interfaces/vacation/employeeVacationsListResponse';
import { IVacationByMonthResponse } from '@/interfaces/vacation/vacationsByMonthReponse';
import { IConflictVacationResponse } from '@/interfaces/vacation/conflictVacationsResponse';
import { api } from '../api';

export interface IVacationBodyRequest {
  idfuncionario: string;
  dataInicio: string;
  dataFim: string;
}
export interface IVacationApproveRefuse {
  idferias: number;
  novoStatus: 'aprovado' | 'reprovado';
}

export const requestVacation = async (
  body: IVacationBodyRequest,
): Promise<Result<boolean>> => {
  const ENDPOINT = '/ferias';

  try {
    await api.post(ENDPOINT, body);
    return { data: true, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao solicitar férias');
  }
};

export const getPendingVacations = async (): Promise<
  Result<IPendingVacationsListResponse[]>
> => {
  const ENDPOINT = '/ferias';

  try {
    const response = await api.get<IPendingVacationsListResponse[]>(ENDPOINT);
    return { data: response.data, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao buscar férias pendentes');
  }
};

export const approveRefuseVacation = async (
  body: IVacationApproveRefuse,
): Promise<Result<boolean>> => {
  const ENDPOINT = '/ferias';

  try {
    await api.put(ENDPOINT, body);
    return { data: true, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao aprovar/reprovar férias');
  }
};

export const getEmployeeVacations = async (
  employeeID: string,
): Promise<Result<IEmployeeVacationsListResponse[]>> => {
  const ENDPOINT = `/ferias/funcionario/${employeeID}`;

  try {
    const response = await api.get<IEmployeeVacationsListResponse[]>(ENDPOINT);
    return { data: response.data, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao buscar férias do funcionário');
  }
};

// Note: month is 1-12
export const getVacationsByMonth = async (
  month: number,
): Promise<Result<IVacationByMonthResponse[]>> => {
  const ENDPOINT = `/ferias/feriasporsetor/${month}`;

  try {
    const response = await api.get<IVacationByMonthResponse[]>(ENDPOINT);
    return { data: response.data, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao buscar férias por mês');
  }
};

export const getConflictVacations = async (
  month: number,
): Promise<Result<IConflictVacationResponse[]>> => {
  const ENDPOINT = `/ferias/feriasConflitantes/${month}`;

  try {
    const response = await api.get<IConflictVacationResponse[] | string>(
      ENDPOINT,
    );

    if (typeof response.data === 'string') {
      return { data: [], error: null };
    }

    return { data: response.data, error: null };
  } catch (error) {
    return handleError(error, 'Erro ao buscar férias conflitantes');
  }
};
