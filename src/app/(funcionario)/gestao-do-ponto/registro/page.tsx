'use client';

import Entries from '@/components/WatchPoint/Entries/Entries';
import Watch from '@/components/WatchPoint/Watch/Watch';
import { useAuth } from '@/hooks/useAuth';
import { notifyError } from '@/utils/handleToast';
import { useQuery } from '@tanstack/react-query';
import { getCurrentTimestamp } from '@/services/pointManagement';
import { format, parseISO } from 'date-fns';
import { Entrada } from '@/interfaces/mirror/employeeMirrorResponse';
import { getMonthMirror, markMirror } from '@/services/mirror/mirrorService';
import { useState } from 'react';
import { PageContainer } from './styles';

const Point: React.FC = () => {
  const { user } = useAuth();
  const employeeId = user?.id || '';

  const [isLoading, setIsLoading] = useState(false);

  let marksOfDay: Entrada[] = [];
  const { data, refetch } = useQuery({
    queryKey: ['mirror'],
    queryFn: async () => {
      const response = await getMonthMirror();
      if (response.error || !response.data) return [];

      const currentDateResponse = await getCurrentTimestamp();
      let date = format(new Date(), 'yyyy-MM-dd');
      if (currentDateResponse.data) {
        date = format(parseISO(currentDateResponse.data), 'yyyy-MM-dd');
      }
      return (
        response.data.listaEntradas.find(e => e.data === date)?.entradas || []
      );
    },
  });

  if (data) {
    marksOfDay = data;
  }

  const isRegisteredFullDay = marksOfDay.length === 4;

  const createMark = async () => {
    setIsLoading(true);
    const response = await markMirror(employeeId);
    if (response.error) {
      notifyError(response.error);
      setIsLoading(false);
      return;
    }
    refetch();
    setIsLoading(false);
  };

  return (
    <PageContainer>
      <Watch
        onSaveTime={() => createMark()}
        isRegisteredFullDay={isRegisteredFullDay}
        isDisabled={isLoading}
      />
      <Entries marks={marksOfDay} />
    </PageContainer>
  );
};
export default Point;
