import { format } from 'date-fns';
import { getCurrentTimestamp } from '@/services/pointManagement';
import { useQuery } from '@tanstack/react-query';
import useLiveTime from '@/hooks/useLiveTime';
import { SaveButton, TimeDisplay, WatchContainer } from './styles';

interface WatchProps {
  onSaveTime: (time: Date) => void;
  isRegisteredFullDay: boolean;
  isDisabled: boolean;
}
const Watch: React.FC<WatchProps> = ({
  onSaveTime,
  isRegisteredFullDay,
  isDisabled,
}) => {
  /**
   * Fetches the current server timestamp using React Query
   * This ensures that the time displayed is synchronized with the server
   */
  const { data } = useQuery({
    queryKey: ['current-timestamp'],
    queryFn: getCurrentTimestamp,
    // every 3 minutes, refetch the server time to keep it accurate
    refetchInterval: 1000 * 60 * 3, // 3 minutes
    select: result => result.data,
  });

  /**
   * Uses a custom hook to get live updating time based on the server timestamp
   * This hook updates the time every second to provide a real-time clock display
   * @param initialTime The initial time fetched from the server
   * @returns The current live time
   */
  const time = useLiveTime(data || '');

  return (
    <WatchContainer>
      <TimeDisplay>{format(time, 'HH:mm:ss')}</TimeDisplay>
      {!isRegisteredFullDay && (
        <SaveButton
          type="button"
          onClick={() => onSaveTime(time)}
          disabled={isRegisteredFullDay || isDisabled}
        >
          Registrar ponto
        </SaveButton>
      )}
    </WatchContainer>
  );
};
export default Watch;
