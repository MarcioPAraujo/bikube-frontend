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

  /**
   * State to manage loading status when creating a new mark (entry)
   * It prevents multiple submissions while a request is in progress
   * The user cannot create a new mark until the current request is completed
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetches the current day's mirror entries for the logged-in employee
   * @returns The list of entries (marks) for the current day
   */
  let marksOfDay: Entrada[] = [];
  const { data, refetch } = useQuery({
    queryKey: ['mirror'],
    queryFn: async () => {
      /* Fetches the month's mirror data */
      const response = await getMonthMirror();
      if (response.error || !response.data) return [];

      /* Fetches the current timestamp to determine today's date */
      const currentDateResponse = await getCurrentTimestamp();
      let date = format(new Date(), 'yyyy-MM-dd');
      if (currentDateResponse.data) {
        date = format(parseISO(currentDateResponse.data), 'yyyy-MM-dd');
      }
      /* Finds and returns the entries for the current date */
      return (
        response.data.listaEntradas.find(e => e.data === date)?.entradas || []
      );
    },
  });

  // Stores the marks of the day if available
  if (data) {
    marksOfDay = data;
  }

  // Determines if the full day has been registered (4 marks)
  const isRegisteredFullDay = marksOfDay.length === 4;

  /**
   * Handles the creation of a new mark (entry) for the employee
   */
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
