'use client';

import Entries from '@/components/WatchPoint/Entries/Entries';
import Watch from '@/components/WatchPoint/Watch/Watch';
import { useAuth } from '@/hooks/useAuth';
import { notifyError } from '@/utils/handleToast';
import { useQuery } from '@tanstack/react-query';
import { getCurrentTimestamp } from '@/services/pointManagement';
import { format, parseISO } from 'date-fns';
import { IEmployeeMirrorResponse } from '@/interfaces/mirror/employeeMirrorResponse';
import {
  getEmployeeMirrors,
  markMirror,
} from '@/services/mirror/mirrorService';
import { PageContainer } from './styles';

const Point: React.FC = () => {
  const { user } = useAuth();

  const employeeId = user?.id || '';

  let marksOfDay: IEmployeeMirrorResponse[] = [];
  const { data, refetch } = useQuery({
    queryKey: ['mirror'],
    queryFn: async () => {
      const mirrors = await getEmployeeMirrors(employeeId);
      const currentDate = await getCurrentTimestamp();
      let date = format(new Date(), 'yyyy-MM-dd');
      if (currentDate.data) {
        date = format(parseISO(currentDate.data), 'yyyy-MM-dd');
      }
      if (!mirrors.data) return [];

      const mirrorOfDay = mirrors.data.filter(mirr => {
        return mirr.listaEntradas.some(e => e.data === date);
      });
      return mirrorOfDay;
    },
  });

  if (data) {
    marksOfDay = data;
  }

  const createMark = async () => {
    const response = await markMirror(employeeId);
    if (response.error) {
      notifyError(response.error);
    }
    refetch();
  };

  return (
    <PageContainer>
      <Watch onSaveTime={() => createMark()} />
      <Entries marks={marksOfDay[0]} />
    </PageContainer>
  );
};
export default Point;
