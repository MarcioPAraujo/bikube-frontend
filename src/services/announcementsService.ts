import { Result } from '@/interfaces/apiResult';
import { AxiosResponse } from 'axios';
import handleError from '@/utils/handleError';
import { IAnnouncementsResponse } from '@/interfaces/anouncement/annoucementsResponse';
import { IAnnouncementBodyRequest } from '@/interfaces/anouncement/announcementsBodyRequest';
import { api } from './api';

export const getMyNotifications = async (
  userId: string,
): Promise<Result<IAnnouncementsResponse[]>> => {
  const END_POINT = `/comunicado/funcionario/${userId}`;

  try {
    const response: AxiosResponse<IAnnouncementsResponse[]> = await api.get(
      END_POINT,
    );
    return { data: response.data, error: null };
  } catch (error) {
    return handleError(error, 'Falha ao recuperar os comunicados');
  }
};

export const sendAnnouncement = async (
  body: IAnnouncementBodyRequest,
): Promise<Result<boolean>> => {
  const END_POINT = '/comunicado';

  try {
    await api.post(END_POINT, body);
    return { data: true, error: null };
  } catch (error) {
    return handleError(error, 'Falha ao enviar o comunicado');
  }
};
