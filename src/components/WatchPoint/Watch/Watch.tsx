import { format } from 'date-fns';
import { getCurrentTimestamp } from '@/services/pointManagement';
import { useQuery } from '@tanstack/react-query';
import useLiveTime from '@/hooks/useLiveTime';
import { SaveButton, TimeDisplay, WatchContainer } from './styles';

interface WatchProps {
  onSaveTime: (time: Date) => void;
  isRegisteredFullDay: boolean;
}
const Watch: React.FC<WatchProps> = ({ onSaveTime, isRegisteredFullDay }) => {
  const { data } = useQuery({
    queryKey: ['current-timestamp'],
    queryFn: getCurrentTimestamp,
    // every 3 minutes, refetch the server time to keep it accurate
    refetchInterval: 1000 * 60 * 3, // 3 minutes
    select: result => result.data,
  });

  const time = useLiveTime(data || '');

  return (
    <WatchContainer>
      <TimeDisplay>{format(time, 'HH:mm:ss')}</TimeDisplay>
      {!isRegisteredFullDay && (
        <SaveButton
          type="button"
          onClick={() => onSaveTime(time)}
          disabled={isRegisteredFullDay}
        >
          Registrar ponto
        </SaveButton>
      )}
    </WatchContainer>
  );
};
export default Watch;
