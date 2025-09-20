import axios, { AxiosError, AxiosResponse } from 'axios';
import { Result } from '@/interfaces/apiResult';
import handleError from '@/utils/handleError';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { decryptPassword } from '@/utils/encryptPassword';
import { api } from '../api';

interface IResetpasswordBody {
  email: string;
  senha: string;
}

interface IResetCandidatePasswordBody {
  novasenha: string;
}

export const resetPassword = async (
  body: IResetpasswordBody,
): Promise<Result<string>> => {
  const url = 'usuario/novasenha';

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
    return { data: null, error: 'Falha ao redefinir a senha' };
  }
};

export const resetCandidatePassword = async (
  newPassword: IResetCandidatePasswordBody,
): Promise<Result<boolean>> => {
  const ENDPOINT = 'candidato/trocarSenhaCandidato';

  const email = sessionStorage.getItem(SESSION_STORAGE_KEYS.email);
  if (!email) {
    return { data: null, error: 'Email do candidato inexistente' };
  }

  const decryptedEmail = await decryptPassword(email);

  const body = {
    novasenha: newPassword.novasenha,
    email: decryptedEmail,
  };

  try {
    await api.put(ENDPOINT, body);
    return { data: true, error: null };
  } catch (error: any) {
    return handleError(error, 'Falha ao redefinir a senha do candidato');
  }
};
